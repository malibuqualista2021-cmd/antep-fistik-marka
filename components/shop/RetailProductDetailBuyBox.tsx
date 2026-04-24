"use client";

import { useMemo, useState } from "react";
import type { RetailProduct } from "@/lib/shop-products";
import { formatMoney, stockLabel } from "@/lib/shop-products";
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
  const waQuestionHref = site.whatsappE164
    ? waLink(cta.retailProductDetailQuestion(product.name, gramajLabel))
    : "/iletisim";

  function bumpQuantity(delta: number) {
    setQuantity((q) => Math.max(1, Math.min(99, q + delta)));
  }

  return (
    <div className="rounded-[var(--radius-card)] bg-background p-5 ring-1 ring-black/[0.08] md:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <p className="font-sans text-sm font-semibold text-muted">{stockLabel(product.stockStatus)}</p>
        <p className="font-serif text-3xl font-bold text-primary md:text-[2rem]">
          {formatMoney(selectedProduct.price, product.currency)}
        </p>
      </div>

      {product.variants?.length ? (
        <label className="mt-5 block font-sans text-sm font-medium text-foreground">
          Gramaj seçimi
          <select
            value={variantId}
            onChange={(e) => setVariantId(e.target.value)}
            className="mt-2 w-full min-h-[48px] rounded-[var(--radius-input)] border border-black/15 bg-surface/60 px-3 font-sans text-base text-foreground"
          >
            {product.variants.map((v) => (
              <option key={v.id} value={v.id}>
                {v.label} — {formatMoney(v.price, product.currency)}
              </option>
            ))}
          </select>
        </label>
      ) : null}

      <div className="mt-5">
        <span className="font-sans text-sm font-medium text-foreground">Adet</span>
        <div className="mt-2 flex max-w-[220px] items-center gap-2">
          <button
            type="button"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--radius-button)] border border-black/15 bg-surface font-sans text-lg font-semibold text-foreground hover:bg-background"
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
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--radius-button)] border border-black/15 bg-surface font-sans text-lg font-semibold text-foreground hover:bg-background"
            onClick={() => bumpQuantity(1)}
            aria-label="Adeti artır"
          >
            +
          </button>
        </div>
      </div>

      <p className="mt-4 font-sans text-sm text-muted">
        <span className="font-semibold text-foreground">Kargo:</span>{" "}
        {product.shippingNote || "1–3 iş günü içinde kargo"}
      </p>

      <ul className="mt-4 grid gap-2 font-sans text-xs text-muted sm:grid-cols-3" aria-label="Güven rozetleri">
        <li className="rounded-[10px] bg-surface/80 px-3 py-2 text-center ring-1 ring-black/[0.06]">Güvenli sipariş</li>
        <li className="rounded-[10px] bg-surface/80 px-3 py-2 text-center ring-1 ring-black/[0.06]">Taze paketleme</li>
        <li className="rounded-[10px] bg-surface/80 px-3 py-2 text-center ring-1 ring-black/[0.06]">Türkiye geneli kargo</li>
      </ul>

      <div className="mt-6 flex flex-col gap-3">
        <Button
          type="button"
          variant="primary"
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
