"use client";

import Link from "next/link";
import { useCart } from "@/components/shop/CartProvider";
import { site, waLink } from "@/lib/site";
import { cta } from "@/lib/cta";

export function MobileBottomNav() {
  const { count } = useCart();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-black/10 bg-[var(--cream)] px-3 py-2 shadow-[0_-8px_24px_rgb(31_30_28/0.12)] md:hidden" aria-label="Mobil hızlı menü">
      <div className="mx-auto grid max-w-6xl grid-cols-3 gap-2">
        <Link href="/urunler" className="rounded-[var(--radius-button)] px-2 py-2 text-center font-sans text-xs font-semibold text-primary">
          Ürünler
        </Link>
        <Link href="/sepet" className="rounded-[var(--radius-button)] bg-primary px-2 py-2 text-center font-sans text-xs font-semibold text-[var(--cream)]">
          Sepet{count > 0 ? ` (${count})` : ""}
        </Link>
        <Link href={site.whatsappE164 ? waLink(cta.header.waMessage) : "/iletisim"} className="rounded-[var(--radius-button)] px-2 py-2 text-center font-sans text-xs font-semibold text-primary">
          WhatsApp
        </Link>
      </div>
    </nav>
  );
}
