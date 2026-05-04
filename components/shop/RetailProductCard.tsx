"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { RetailProduct } from "@/lib/shop-products";
import { formatMoney, kgUnitPriceLine, stockLabel } from "@/lib/shop-products";
import { getMarketplaceRating } from "@/lib/marketplace-ratings";
import { AddToCartButton } from "@/components/shop/AddToCartButton";
import { FavoriteToggle } from "@/components/shop/FavoriteToggle";
import { Button } from "@/components/ui/Button";

function MarketplaceRatingRow({ productId }: { productId: string }) {
  const { rating, reviewCount } = getMarketplaceRating(productId);
  const filled = Math.round(rating);
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="flex items-center gap-0.5 text-[var(--color-gold)]" aria-hidden>
        {"★★★★★".split("").map((s, i) => (
          <span key={i} className={`text-[11px] leading-none ${i < filled ? "opacity-100" : "opacity-20"}`}>
            {s}
          </span>
        ))}
      </span>
      <span className="font-sans text-sm font-bold tabular-nums text-foreground">{rating.toFixed(1)}</span>
      <span className="font-sans text-xs text-muted">({reviewCount} değerlendirme)</span>
    </div>
  );
}

type Props = {
  product: RetailProduct;
  /** Vitrin raylarında alt aksiyonları sadeleştir */
  compactFooter?: boolean;
  /** Vitrinde daha kısa başlık */
  titleOverride?: string;
};

export function RetailProductCard({ product, compactFooter = false, titleOverride }: Props) {
  const [variantId, setVariantId] = useState(product.variants?.[0]?.id ?? "");
  const selectedVariant = product.variants?.find((v) => v.id === variantId);
  const price = selectedVariant?.price ?? product.price;
  const weightLabel = selectedVariant?.weight ?? product.weight;

  const kgLine = useMemo(() => kgUnitPriceLine(price, weightLabel, product.currency), [price, weightLabel, product.currency]);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[0_2px_8px_rgb(var(--ink-shadow)/0.06)] transition-shadow hover:shadow-[0_8px_24px_rgb(var(--ink-shadow)/0.08)]">
      <div className="relative aspect-square bg-[var(--paper)] sm:aspect-[5/6]">
        <Link href={`/urunler/${product.detailSlug}`} className="absolute inset-0 z-0">
          <Image
            src={product.imageSrc}
            alt={product.imageAlt}
            fill
            className="object-cover object-center"
            sizes="(max-width: 640px) 45vw, (max-width: 1024px) 33vw, 280px"
            loading="lazy"
          />
        </Link>
        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between p-2">
          <span className="pointer-events-auto rounded-md bg-[var(--color-surface)]/95 px-2 py-1 font-sans text-[11px] font-bold uppercase tracking-wide text-[var(--color-green-dark)] ring-1 ring-[var(--line-soft)]">
            {stockLabel(product.stockStatus)}
          </span>
          <span className="pointer-events-auto">
            <FavoriteToggle productId={product.id} />
          </span>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent px-2 pb-2 pt-8">
          <div className="pointer-events-auto flex flex-wrap gap-1">
            <span className="rounded-md bg-[var(--color-surface)]/95 px-2 py-0.5 font-sans text-[10px] font-semibold text-foreground ring-1 ring-[var(--line-soft)]">
              Hızlı kargo
            </span>
            <span className="rounded-md bg-[var(--color-green-soft)] px-2 py-0.5 font-sans text-[10px] font-semibold text-[var(--color-green-dark)] ring-1 ring-primary/20">
              Güvenli ödeme
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <MarketplaceRatingRow productId={product.id} />

        <Link href={`/urunler/${product.detailSlug}`} className="mt-2">
          <h3 className="line-clamp-2 min-h-[2.75rem] font-sans text-[15px] font-semibold leading-snug text-foreground hover:text-primary sm:text-base">
            {titleOverride ?? product.name}
          </h3>
        </Link>

        <div className="mt-3 flex flex-wrap items-end justify-between gap-2 border-b border-[var(--line-soft)] pb-3">
          <div>
            <p className="text-price text-[1.35rem] leading-none tracking-tight sm:text-2xl">{formatMoney(price, product.currency)}</p>
            {kgLine ? <p className="mt-1 font-sans text-xs font-medium text-muted">{kgLine}</p> : null}
          </div>
        </div>

        <p className="mt-2 line-clamp-2 font-sans text-xs leading-relaxed text-muted">{product.shortDescription}</p>

        <div className="mt-3 rounded-lg bg-[var(--color-bg)] px-2 py-1.5 font-sans text-[11px] leading-snug text-muted ring-1 ring-[var(--line-soft)]">
          <span className="font-semibold text-[var(--color-text)]">Kargo · WhatsApp destek · </span>
          {product.shippingNote}
        </div>

        <div className="mt-4 mt-auto space-y-3">
          <AddToCartButton
            product={product}
            variantId={variantId}
            onVariantChange={setVariantId}
            layout="buttons"
            prominent
            buttonClassName="!min-h-[54px] !rounded-xl !text-[1.05rem] !font-extrabold shadow-[0_4px_16px_color-mix(in_srgb,var(--cta)_38%,transparent)] sm:!min-h-[52px] sm:!text-base"
          />
          {!compactFooter ? (
            <>
              <Button variant="secondary" href="/toptan-satis#teklif" className="min-h-[44px] w-full justify-center text-sm">
                Toptan teklif al
              </Button>
              <Link
                href={`/urunler/${product.detailSlug}`}
                className="flex min-h-[44px] items-center justify-center rounded-[var(--radius-button)] font-sans text-sm font-semibold text-primary underline-offset-2 hover:underline"
              >
                Ürün detayı
              </Link>
            </>
          ) : (
            <Link
              href={`/urunler/${product.detailSlug}`}
              className="flex min-h-[40px] items-center justify-center font-sans text-sm font-semibold text-primary hover:underline"
            >
              Ürünü incele
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
