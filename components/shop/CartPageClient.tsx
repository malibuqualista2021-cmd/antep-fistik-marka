"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/components/shop/CartProvider";
import { formatMoney, retailProducts } from "@/lib/shop-products";
import { RetailProductCard } from "@/components/shop/RetailProductCard";

export function CartPageClient() {
  const { items, total, updateQuantity, removeItem } = useCart();

  if (items.length === 0) {
    return (
      <div className="space-y-8">
        <div className="card-elevated rounded-[var(--radius-card)] p-6 md:p-8">
          <h2 className="font-serif text-2xl text-foreground">Sepetiniz boş</h2>
          <p className="mt-2 font-sans text-sm text-muted">
            Popüler ürünlerden birini seçerek alışverişe başlayabilirsiniz.
          </p>
          <ul className="mt-5 grid gap-3 font-sans text-sm text-muted sm:grid-cols-2 lg:grid-cols-4">
            {["Güvenli sipariş", "Taze paketleme", "Türkiye geneli kargo", "WhatsApp destek"].map((badge) => (
              <li key={badge} className="rounded-[12px] bg-background px-3 py-2 text-center ring-1 ring-black/5">
                {badge}
              </li>
            ))}
          </ul>
          <Button href="/urunler#perakende-satin-al" className="mt-5">
            Ürünlere git
          </Button>
        </div>
        <section aria-labelledby="popular-empty-cart">
          <h2 id="popular-empty-cart" className="font-serif text-2xl text-foreground">
            Popüler ürünler
          </h2>
          <div className="mt-5 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {retailProducts.slice(0, 4).map((product) => (
              <RetailProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_340px] lg:items-start">
      <div className="space-y-4">
        {items.map((item) => (
          <article
            key={item.product.id}
            className="card-elevated grid gap-4 rounded-[var(--radius-card)] p-4 sm:grid-cols-[120px_1fr] md:p-5"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-[12px] bg-background">
              <Image src={item.product.imageSrc} alt={item.product.imageAlt} fill className="object-cover" sizes="120px" />
            </div>
            <div className="min-w-0">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className="font-serif text-xl text-foreground">{item.product.name}</h2>
                  <p className="mt-1 font-sans text-sm text-muted">{item.product.weight}</p>
                </div>
                <p className="text-price text-base">{formatMoney(item.product.price * item.quantity, item.product.currency)}</p>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <label className="font-sans text-sm text-muted">
                  Adet{" "}
                  <input
                    type="number"
                    min={1}
                    max={99}
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.product.id, Number(e.target.value))}
                    className="ml-2 w-20 rounded-[var(--radius-input)] border border-black/15 bg-background px-2 py-2 text-foreground"
                  />
                </label>
                <button
                  type="button"
                  onClick={() => removeItem(item.product.id)}
                  className="min-h-[40px] font-sans text-sm font-semibold text-primary underline-offset-4 hover:underline"
                >
                  Kaldır
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
      <aside className="card-elevated rounded-[var(--radius-card)] p-5 md:p-6 lg:sticky lg:top-28">
        <h2 className="font-serif text-2xl text-foreground">Sipariş özeti</h2>
        <div className="mt-4 flex items-center justify-between border-t border-black/10 pt-4 font-sans">
          <span className="text-muted">Toplam</span>
          <strong className="text-price text-lg">{formatMoney(total)}</strong>
        </div>
        <p className="mt-3 font-sans text-xs leading-relaxed text-muted">
          Kargo bedeli ve tahmini çıkış bilgisi teslimat adresiyle birlikte netleşir.
          Sipariş sonrası WhatsApp destek hattından bilgi alabilirsiniz.
        </p>
        <Button href="/odeme" className="mt-5 w-full justify-center">
          Siparişi tamamla
        </Button>
        <Link href="/urunler#perakende-satin-al" className="mt-3 inline-flex min-h-[44px] items-center font-sans text-sm font-semibold text-primary hover:underline">
          Alışverişe devam et
        </Link>
      </aside>
    </div>
  );
}
