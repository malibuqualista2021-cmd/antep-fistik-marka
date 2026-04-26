"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/components/shop/CartProvider";
import { formatMoney } from "@/lib/shop-products";
import { inputFieldClass } from "@/lib/form-classes";
import type { OrderRecord } from "@/lib/orders";
import { LS, readWithLegacyMigrate } from "@/lib/storage-keys";

const ORDERS_KEY = LS.orders.key;

export function CheckoutPageClient() {
  const router = useRouter();
  const { items, total, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    if (items.length === 0) {
      setError("Sepetiniz boş.");
      return;
    }

    const form = new FormData(e.currentTarget);
    setLoading(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          customer: Object.fromEntries(form.entries()),
          items,
        }),
      });
      const data = (await res.json()) as { ok: boolean; order?: OrderRecord; message?: string };
      if (!res.ok || !data.ok || !data.order) {
        setError(data.message || "Sipariş oluşturulamadı.");
        return;
      }

      readWithLegacyMigrate(ORDERS_KEY, LS.orders.legacy);
      const existing = JSON.parse(window.localStorage.getItem(ORDERS_KEY) || "[]") as OrderRecord[];
      window.localStorage.setItem(ORDERS_KEY, JSON.stringify([data.order, ...existing]));
      clearCart();
      router.push(`/siparis-basarili?order=${encodeURIComponent(data.order.id)}`);
    } catch {
      setError("Bağlantı hatası. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="card-elevated rounded-[var(--radius-card)] p-6">
        <p className="font-sans text-sm text-muted">Ödeme adımına geçmek için önce sepete ürün ekleyin.</p>
        <Button href="/urunler#perakende-satin-al" className="mt-4">
          Ürünlere git
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_340px] lg:items-start">
      <form className="card-elevated rounded-[var(--radius-card)] p-6 md:p-8" onSubmit={submit}>
        <h2 className="font-serif text-2xl text-foreground">Teslimat ve ödeme bilgileri</h2>
        <p className="mt-2 font-sans text-sm leading-relaxed text-muted">
          Siparişiniz güvenli şekilde kaydedilir. Ödeme bağlantısı ve kesin kargo bilgisi
          sipariş bilgileriniz kontrol edildikten sonra paylaşılır.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="text-sm font-medium text-foreground">Ad Soyad *</span>
            <input name="fullName" required autoComplete="name" className={inputFieldClass} />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-foreground">Telefon *</span>
            <input name="phone" required inputMode="tel" autoComplete="tel" className={inputFieldClass} />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-foreground">E-posta *</span>
            <input name="email" required type="email" autoComplete="email" className={inputFieldClass} />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-foreground">İl *</span>
            <input name="city" required className={inputFieldClass} />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-foreground">İlçe *</span>
            <input name="district" required className={inputFieldClass} />
          </label>
          <label className="block md:col-span-2">
            <span className="text-sm font-medium text-foreground">Açık adres *</span>
            <textarea name="address" required rows={3} className={`${inputFieldClass} min-h-[110px] resize-y`} />
          </label>
          <label className="block md:col-span-2">
            <span className="text-sm font-medium text-foreground">Teslimat notu</span>
            <textarea name="note" rows={3} className={`${inputFieldClass} min-h-[100px] resize-y`} />
          </label>
        </div>
        <label className="mt-5 flex gap-3 font-sans text-sm text-muted">
          <input type="checkbox" required className="mt-1 h-4 w-4 accent-primary" />
          <span>
            <a href="/kvkk-gizlilik" className="font-semibold text-primary underline">
              KVKK ve gizlilik
            </a>{" "}
            metnini,{" "}
            <a href="/mesafeli-satis-sozlesmesi" className="font-semibold text-primary underline">
              mesafeli satış sözleşmesini
            </a>{" "}
            ve{" "}
            <a href="/on-bilgilendirme-formu" className="font-semibold text-primary underline">
              ön bilgilendirme formunu
            </a>{" "}
            okudum, onaylıyorum.
          </span>
        </label>
        {error ? <p className="mt-4 text-sm text-red-700">{error}</p> : null}
        <Button type="submit" className="mt-6 w-full justify-center md:w-auto" disabled={loading}>
          {loading ? "Sipariş oluşturuluyor..." : "Güvenli siparişi oluştur"}
        </Button>
      </form>

      <aside className="card-elevated rounded-[var(--radius-card)] p-5 md:p-6 lg:sticky lg:top-28">
        <h2 className="font-serif text-2xl text-foreground">Sipariş özeti</h2>
        <ul className="mt-4 space-y-3 border-t border-black/10 pt-4">
          {items.map((item) => (
            <li key={item.product.id} className="flex justify-between gap-3 font-sans text-sm">
              <span className="text-muted">{item.product.name} × {item.quantity}</span>
              <span className="text-price text-sm">{formatMoney(item.product.price * item.quantity, item.product.currency)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex justify-between border-t border-black/10 pt-4 font-sans">
          <span className="text-muted">Toplam</span>
          <strong className="text-price text-lg">{formatMoney(total)}</strong>
        </div>
      </aside>
    </div>
  );
}
