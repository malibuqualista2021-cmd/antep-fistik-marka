"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import type { RetailProduct } from "@/lib/shop-products";
import { formatMoney, kgUnitPriceLine, stockLabel } from "@/lib/shop-products";
import { AddToCartButton } from "@/components/shop/AddToCartButton";
import { Button } from "@/components/ui/Button";

export function RetailProductCard({ product }: { product: RetailProduct }) {
  const [variantId, setVariantId] = useState(product.variants?.[0]?.id ?? "");
  const selectedVariant = product.variants?.find((v) => v.id === variantId);
  const price = selectedVariant?.price ?? product.price;
  const weightLabel = selectedVariant?.weight ?? product.weight;

  const kgLine = useMemo(() => kgUnitPriceLine(price, weightLabel, product.currency), [price, weightLabel, product.currency]);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] bg-[var(--cream)] shadow-[var(--shadow-soft)] ring-1 ring-[var(--border-subtle)] transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]">
      <div className="relative aspect-[4/3] bg-[var(--paper)]">
        <Image
          src={product.imageSrc}
          alt={product.imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <span className="absolute left-3 top-3 max-w-[85%] rounded-full bg-background/95 px-3 py-1 font-sans text-[11px] font-semibold text-[var(--walnut)] ring-1 ring-black/10">
          {stockLabel(product.stockStatus)}
        </span>
        <span className="absolute right-3 top-3 rounded-full bg-primary/92 px-2.5 py-1 font-sans text-[10px] font-semibold text-[var(--cream)]">
          Hızlı kargo
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        {product.tags?.length ? (
          <ul className="flex flex-wrap gap-1.5" aria-label="Ürün etiketleri">
            {product.tags.slice(0, 4).map((tag) => (
              <li
                key={tag}
                className="rounded-full bg-surface/90 px-2 py-0.5 font-sans text-[10px] font-semibold uppercase tracking-wide text-[var(--walnut)] ring-1 ring-black/[0.06]"
              >
                {tag}
              </li>
            ))}
          </ul>
        ) : null}
        <h3 className="mt-2 font-serif text-lg leading-snug text-foreground group-hover:text-primary">{product.name}</h3>
        <p className="mt-1 font-sans text-xs text-muted">{weightLabel}</p>
        <dl className="mt-3 grid grid-cols-2 gap-2 rounded-[10px] bg-[var(--paper)] p-2.5 ring-1 ring-black/[0.06]">
          <div>
            <dt className="font-sans text-[10px] font-semibold uppercase tracking-wide text-muted">Fiyat</dt>
            <dd className="font-sans text-sm font-bold text-primary">{formatMoney(price, product.currency)}</dd>
          </div>
          <div>
            <dt className="font-sans text-[10px] font-semibold uppercase tracking-wide text-muted">Kg fiyatı</dt>
            <dd className="font-sans text-xs font-medium text-foreground">{kgLine ? kgLine.replace("Kg fiyatı: ", "") : "-"}</dd>
          </div>
          <div>
            <dt className="font-sans text-[10px] font-semibold uppercase tracking-wide text-muted">Stok</dt>
            <dd className="font-sans text-xs font-medium text-foreground">{stockLabel(product.stockStatus)}</dd>
          </div>
          <div>
            <dt className="font-sans text-[10px] font-semibold uppercase tracking-wide text-muted">Gramaj</dt>
            <dd className="font-sans text-xs font-medium text-foreground">{weightLabel}</dd>
          </div>
        </dl>
        <div className="mt-2 flex flex-wrap items-baseline justify-between gap-2">
          <p className="font-serif text-xl font-bold text-primary">{formatMoney(price, product.currency)}</p>
          {kgLine ? <p className="max-w-[12rem] text-right font-sans text-[11px] text-muted">{kgLine}</p> : null}
        </div>
        <p className="mt-2 font-sans text-xs text-muted">Henüz yorum yok</p>
        <p className="mt-2 line-clamp-2 font-sans text-sm leading-relaxed text-muted">{product.shortDescription}</p>
        <p className="mt-2 font-sans text-[11px] leading-snug text-muted">{product.shippingNote}</p>
        <div className="mt-3 rounded-[10px] bg-[var(--paper)] px-3 py-2 font-sans text-[11px] text-[var(--ink-soft)] ring-1 ring-black/[0.05]">
          Güvenli ödeme · Taze paketleme · Türkiye geneli kargo
        </div>
        <div className="mt-4 flex-1" />
        <AddToCartButton product={product} variantId={variantId} onVariantChange={setVariantId} layout="buttons" />
        <Button variant="secondary" href="/toptan-satis#teklif" className="mt-2 w-full justify-center text-sm">
          Toptan teklif al
        </Button>
        <Button variant="secondary" href={`/urunler/${product.detailSlug}`} className="mt-2 w-full justify-center text-sm">
          Detayları Gör
        </Button>
      </div>
    </article>
  );
}
