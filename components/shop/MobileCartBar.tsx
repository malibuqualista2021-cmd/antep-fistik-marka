"use client";

import Link from "next/link";
import { useCart } from "@/components/shop/CartProvider";
import { formatMoney } from "@/lib/shop-products";

export function MobileCartBar() {
  const { count, total } = useCart();
  if (count === 0) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-black/10 bg-[var(--cream)] px-4 py-3 shadow-[0_-8px_24px_rgb(31_30_28/0.12)] md:hidden">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
        <div className="font-sans text-sm">
          <p className="font-semibold text-foreground">Sepet ({count})</p>
          <p className="text-primary">{formatMoney(total)}</p>
        </div>
        <Link
          href="/sepet"
          className="inline-flex min-h-[44px] items-center rounded-[var(--radius-button)] bg-primary px-4 py-2 font-sans text-sm font-semibold text-[var(--cream)]"
        >
          Sepete git
        </Link>
      </div>
    </div>
  );
}
