"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AddToCartButton } from "@/components/shop/AddToCartButton";
import { Container } from "@/components/ui/Container";
import type { RetailProduct } from "@/lib/shop-products";
import { formatMoney, kgUnitPriceLine, retailProducts } from "@/lib/shop-products";

/** Vitrin sırası: mevcut `retailProducts` kayıtları (yeni SKU eklemeden). */
const BESTSELLER_IDS = ["retail-ic-250", "retail-kabuklu-500", "retail-boz-250", "retail-paket-1kg"] as const;

const CARD_TITLE: Record<(typeof BESTSELLER_IDS)[number], string> = {
  "retail-ic-250": "İç Antep Fıstığı",
  "retail-kabuklu-500": "Kabuklu Antep Fıstığı",
  "retail-boz-250": "Boz İç Antep Fıstığı",
  "retail-paket-1kg": "Kavrulmuş Antep Fıstığı",
};

/** Kartta gösterilen kısa açıklama (ürün adıyla uyumlu vitrin metni). */
const CARD_BLURB: Partial<Record<(typeof BESTSELLER_IDS)[number], string>> = {
  "retail-paket-1kg": "Kavrulmuş tuzlu seri; hediye ve günlük ikram için hazır gramajlar.",
};

function StarRow() {
  return (
    <div className="mt-3 flex flex-wrap items-center gap-2">
      <span className="flex gap-0.5 text-[var(--gold-muted)]" aria-hidden>
        {"★★★★★".split("").map((ch, i) => (
          <span key={i} className="text-[0.65rem] leading-none opacity-[0.35]">
            {ch}
          </span>
        ))}
      </span>
      <span className="font-sans text-[11px] text-muted">Müşteri değerlendirmeleri yakında</span>
    </div>
  );
}

function BestsellerCard({ product, cardTitle }: { product: RetailProduct; cardTitle: string }) {
  const [variantId, setVariantId] = useState(product.variants?.[0]?.id ?? "");
  const selectedVariant = product.variants?.find((v) => v.id === variantId);
  const price = selectedVariant?.price ?? product.price;
  const weightLabel = selectedVariant?.weight ?? product.weight;
  const kgLine = useMemo(() => kgUnitPriceLine(price, weightLabel, product.currency), [price, weightLabel, product.currency]);
  const blurb = CARD_BLURB[product.id as keyof typeof CARD_BLURB] ?? product.shortDescription;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] bg-[var(--cream)] ring-1 ring-[var(--border-subtle)]">
      <Link href={`/urunler/${product.detailSlug}`} className="relative block aspect-[4/3] shrink-0 bg-[var(--paper)]">
        <Image
          src={product.imageSrc}
          alt={product.imageAlt}
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
          loading="lazy"
        />
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <Link href={`/urunler/${product.detailSlug}`} className="group/title">
          <h3 className="font-serif text-lg font-semibold leading-snug tracking-tight text-foreground group-hover/title:text-primary">
            {cardTitle}
          </h3>
        </Link>
        <p className="mt-2 line-clamp-2 font-sans text-sm leading-relaxed text-muted">{blurb}</p>

        <div className="mt-4 flex flex-wrap items-end justify-between gap-2 gap-y-1">
          <div>
            <p className="font-sans text-[10px] font-bold uppercase tracking-[0.12em] text-muted">Fiyat</p>
            <p className="text-price text-xl font-bold tracking-tight">{formatMoney(price, product.currency)}</p>
          </div>
          {kgLine ? (
            <p className="max-w-[11rem] text-right font-sans text-xs font-medium leading-snug text-[var(--walnut)]">{kgLine}</p>
          ) : null}
        </div>

        <StarRow />

        <div className="mt-4 flex-1 border-t border-[color-mix(in_srgb,var(--walnut)_8%,transparent)] pt-4">
          <AddToCartButton product={product} variantId={variantId} onVariantChange={setVariantId} layout="buttons" />
        </div>
      </div>
    </article>
  );
}

export function HomeBestsellers() {
  const items = useMemo(() => {
    const map = new Map(retailProducts.map((p) => [p.id, p]));
    return BESTSELLER_IDS.map((id) => map.get(id)).filter((p): p is RetailProduct => Boolean(p));
  }, []);

  if (!items.length) return null;

  return (
    <section className="border-b border-[color-mix(in_srgb,var(--walnut)_8%,transparent)] bg-background py-8 md:py-10" aria-labelledby="home-bestsellers-heading">
      <Container>
        <div className="mx-auto max-w-3xl text-center md:mx-0 md:max-w-none md:text-left">
          <h2 id="home-bestsellers-heading" className="font-serif text-2xl font-semibold tracking-tight text-foreground md:text-[1.65rem]">
            Çok Satan Ürünler
          </h2>
          <p className="mt-2 font-sans text-sm leading-relaxed text-muted md:text-base">
            En çok tercih edilen taze Antep fıstığı ürünlerimizi inceleyin.
          </p>
        </div>

        <ul className="mt-8 grid list-none grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {items.map((product) => (
            <li key={product.id}>
              <BestsellerCard product={product} cardTitle={CARD_TITLE[product.id as keyof typeof CARD_TITLE] ?? product.name} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
