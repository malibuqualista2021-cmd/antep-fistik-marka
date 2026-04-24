import Image from "next/image";
import type { RetailProduct } from "@/lib/shop-products";
import { formatMoney, stockLabel } from "@/lib/shop-products";
import { AddToCartButton } from "@/components/shop/AddToCartButton";
import { Button } from "@/components/ui/Button";

export function RetailProductCard({ product }: { product: RetailProduct }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] bg-background shadow-[var(--shadow-soft)] ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]">
      <div className="relative aspect-[4/3] bg-background">
        <Image
          src={product.imageSrc}
          alt={product.imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <span className="absolute left-3 top-3 rounded-full bg-background/95 px-3 py-1 font-sans text-xs font-semibold text-primary ring-1 ring-primary/20">
          {product.weight}
        </span>
        <span className="absolute right-3 top-3 rounded-full bg-primary px-2.5 py-1 font-sans text-[11px] font-semibold text-[var(--cream)]">
          1-3 gün kargo
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-sans text-xs font-semibold uppercase tracking-wide text-muted">
              {stockLabel(product.stockStatus)}
            </p>
            <h3 className="mt-1 font-serif text-lg leading-snug text-foreground group-hover:text-primary">{product.name}</h3>
          </div>
          <p className="shrink-0 font-sans text-lg font-bold text-primary">
            {formatMoney(product.price, product.currency)}
          </p>
        </div>
        <p className="mt-2 font-sans text-xs text-muted">Henüz yorum yok</p>
        <p className="mt-3 font-sans text-sm leading-relaxed text-muted">{product.shortDescription}</p>
        <p className="mt-3 font-sans text-xs leading-relaxed text-muted">{product.shippingNote}</p>
        <div className="mt-3 rounded-[10px] bg-background/85 px-3 py-2 font-sans text-xs text-muted ring-1 ring-black/[0.06]">
          Güvenli sipariş · WhatsApp destek · Türkiye geneli kargo
        </div>
        <p className="mt-2 font-sans text-[11px] leading-snug text-muted/90">
          İlk doğrulanmış müşteri yorumları siparişlerden sonra eklenecektir.
        </p>
        <div className="mt-6 flex flex-col gap-2">
          <AddToCartButton product={product} />
          <Button variant="secondary" href={`/urunler/${product.detailSlug}`} className="w-full justify-center">
            Ürünü incele
          </Button>
        </div>
      </div>
    </article>
  );
}
