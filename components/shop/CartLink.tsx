"use client";

import Link from "next/link";
import { useCart } from "@/components/shop/CartProvider";
import { formatMoney } from "@/lib/shop-products";

export function CartLink({ className = "", onClick }: { className?: string; onClick?: () => void }) {
  const { count, total } = useCart();

  return (
    <Link
      href="/sepet"
      onClick={onClick}
      className={`inline-flex min-h-[44px] flex-col items-center justify-center rounded-[var(--radius-button)] border border-primary/25 bg-background px-3 py-1.5 font-sans text-sm font-semibold text-primary hover:bg-surface sm:flex-row sm:gap-2 sm:py-2 ${className}`}
      aria-label={count > 0 ? `Sepetim, ${count} ürün, ${formatMoney(total)}` : "Sepetim, boş"}
    >
      <span>Sepetim</span>
      {count > 0 ? (
        <span className="text-price text-xs sm:text-sm">
          {count} ürün · {formatMoney(total)}
        </span>
      ) : (
        <span className="text-xs font-normal text-muted">0 ürün</span>
      )}
    </Link>
  );
}
