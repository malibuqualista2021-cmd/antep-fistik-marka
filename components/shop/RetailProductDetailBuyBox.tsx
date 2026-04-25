"use client";

import { useMemo, useState } from "react";
import type { RetailProduct } from "@/lib/shop-products";
import { formatMoney, kgUnitPriceLine, stockLabel } from "@/lib/shop-products";
import { useCart } from "@/components/shop/CartProvider";
import { Button } from "@/components/ui/Button";
import { site, waLink } from "@/lib/site";
import { cta } from "@/lib/cta";

type Props = { product: RetailProduct };

export function RetailProductDetailBuyBox({ product }: Props) {
  const { addItem } = useCart();
  const [variantId, setVariantId] = useState(product.variants?.[0]?.id ?? "");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const disabled = product.stockStatus === "out_of_stock";

  const selectedVariant = product.variants?.find((v) => v.id === variantId);
  const selectedProduct = useMemo(
    () =>
      selectedVariant
        ? {
            ...product,
            id: `${product.id}-${selectedVariant.id}`,
            price: selectedVariant.price,
            weight: selectedVariant.weight,
          }
        : product,
    [product, selectedVariant],
  );

  const gramajLabel = selectedVariant?.label ?? product.weight;
  const kgLine = useMemo(
    () => kgUnitPriceLine(selectedProduct.price, selectedProduct.weight, product.currency),
    [selectedProduct.price, selectedProduct.weight, product.currency],
  );

  const waQuestionHref = site.whatsappE164
    ? waLink(cta.retailProductDetailQuestion(product.name, gramajLabel))
    : "/iletisim";

  function bumpQuantity(delta: number) {
    setQuantity((q) => Math.max(1, Math.min(99, q + delta)));
  }

  return (
    <div className="rounded-[var(--radius-card)] bg-[var(--cream)] p-5 ring-1 ring-[var(--border-subtle)] md:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <p className="font-sans text-sm font-semibold text-muted">{stockLabel(product.stockStatus)}</p>
        <p className="font-serif text-3xl font-bold text-primary md:text-[2rem]">{formatMoney(selectedProduct.price, product.currency)}</p>
      </div>
      {kgLine ? <p className="mt-1 font-sans text-sm text-muted">{kgLine}</p> : null}

      <p className="mt-3 font-sans text-sm leading-relaxed text-muted">
        Taze paketleme, net gramaj ve güvenli ambalaj ile gönderim.
      </p>

      {product.variants?.length ? (
        <div className="mt-5">
          <span className="font-sans text-sm font-semibold text-foreground">Gramaj seçimi</span>
          <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label="Gramaj">
            {product.variants.map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => setVariantId(v.id)}
                className={`min-h-[44px] rounded-full px-4 py-2 font-sans text-sm font-semibold ring-1 transition ${
                  variantId === v.id
                    ? "bg-primary text-[var(--cream)] ring-primary"
                    : "bg-background text-foreground ring-black/10 hover:ring-primary/25"
                }`}
              >
                {v.label}
                <span className="ml-1.5 text-xs font-bold opacity-95">{formatMoney(v.price, product.currency)}</span>
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <div className="mt-5">
        <span className="font-sans text-sm font-semibold text-foreground">Adet</span>
        <div className="mt-2 flex max-w-[240px] items-center gap-2">
          <button
            type="button"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--radius-button)] border border-black/15 bg-background font-sans text-lg font-semibold text-foreground hover:bg-surface"
            onClick={() => bumpQuantity(-1)}
            aria-label="Adeti azalt"
          >
            −
          </button>
          <input
            type="number"
            min={1}
            max={99}
            value={quantity}
            onChange={(e) => {
              const n = Number(e.target.value);
              if (!Number.isFinite(n)) return;
              setQuantity(Math.max(1, Math.min(99, Math.floor(n))));
            }}
            className="h-12 w-full rounded-[var(--radius-input)] border border-black/15 bg-background text-center font-sans text-base font-semibold text-foreground"
            aria-label="Adet"
          />
          <button
            type="button"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--radius-button)] border border-black/15 bg-background font-sans text-lg font-semibold text-foreground hover:bg-surface"
            onClick={() => bumpQuantity(1)}
            aria-label="Adeti artır"
          >
            +
          </button>
        </div>
      </div>

      <p className="mt-4 font-sans text-sm text-muted">
        <span className="font-semibold text-foreground">Kargo:</span> {product.shippingNote || "1–3 iş günü içinde kargo"}
      </p>

      <ul className="mt-4 grid gap-2 font-sans text-xs text-[var(--ink-soft)] sm:grid-cols-2" aria-label="Güven">
        <li className="rounded-[10px] bg-[var(--paper)] px-3 py-2 ring-1 ring-black/[0.05]">Güvenli ödeme</li>
        <li className="rounded-[10px] bg-[var(--paper)] px-3 py-2 ring-1 ring-black/[0.05]">Taze paketleme</li>
        <li className="rounded-[10px] bg-[var(--paper)] px-3 py-2 ring-1 ring-black/[0.05]">Hızlı kargo</li>
        <li className="rounded-[10px] bg-[var(--paper)] px-3 py-2 ring-1 ring-black/[0.05]">
          <a href="/iade-degisim" className="font-medium text-primary underline-offset-2 hover:underline">
            İade / değişim bilgisi
          </a>
        </li>
      </ul>

      <div className="mt-6 flex flex-col gap-3">
        <Button
          type="button"
          variant="cta"
          className="w-full justify-center"
          disabled={disabled}
          onClick={() => {
            if (disabled) return;
            addItem(selectedProduct, quantity);
            setAdded(true);
            window.setTimeout(() => setAdded(false), 1600);
          }}
        >
          {disabled ? "Stokta yok" : added ? "Sepete eklendi" : "Sepete ekle"}
        </Button>
        <Button variant="secondary" href={waQuestionHref} className="w-full justify-center">
          WhatsApp’tan sor
        </Button>
        <Button variant="ghost" href="/sepet" className="w-full justify-center text-sm">
          Sepete git
        </Button>
      </div>
    </div>
  );
}
