"use client";

import Link from "next/link";
import { useCart } from "@/components/shop/CartProvider";

export function CartLink({ className = "", onClick }: { className?: string; onClick?: () => void }) {
  const { count } = useCart();

  return (
    <Link
      href="/sepet"
      onClick={onClick}
      className={`inline-flex min-h-[44px] items-center justify-center rounded-[var(--radius-button)] border border-primary/25 px-3 py-2 font-sans text-sm font-semibold text-primary hover:bg-surface ${className}`}
      aria-label={`Sepet, ${count} ürün`}
    >
      Sepet{count > 0 ? ` (${count})` : ""}
    </Link>
  );
}
