"use client";

import Link from "next/link";
import { useCart } from "@/components/shop/CartProvider";
import { formatMoney } from "@/lib/shop-products";

type CartVariant = "default" | "header" | "headerMobile";

const variantStyles: Record<CartVariant, string> = {
  default:
    "inline-flex min-h-[44px] flex-col items-center justify-center rounded-[var(--radius-button)] border border-[color-mix(in_srgb,var(--primary)_30%,var(--color-border))] bg-[var(--color-surface)] px-3 py-1.5 font-sans text-sm font-semibold text-primary hover:bg-[var(--color-green-soft)] sm:flex-row sm:gap-2 sm:py-2",
  header:
    "inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 rounded-full border border-[color-mix(in_srgb,var(--primary)_38%,var(--color-border))] bg-[var(--color-surface-alt)] px-4 py-2 font-sans text-sm font-semibold text-primary transition-colors hover:bg-[var(--color-green-soft)]",
  headerMobile:
    "inline-flex min-h-[44px] shrink-0 items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--primary)_38%,var(--color-border))] bg-[var(--color-surface-alt)] px-3 py-2 font-sans text-xs font-semibold text-primary transition-colors hover:bg-[var(--color-green-soft)]",
};

export function CartLink({
  className = "",
  onClick,
  variant = "default",
}: {
  className?: string;
  onClick?: () => void;
  variant?: CartVariant;
}) {
  const { count, total } = useCart();
  const base = variantStyles[variant];

  return (
    <Link
      href="/sepet"
      onClick={onClick}
      className={`${base} ${className}`}
      aria-label={count > 0 ? `Sepetim, ${count} ürün, ${formatMoney(total)}` : "Sepetim, boş"}
    >
      <span>Sepetim</span>
      {count > 0 ? (
        <span className={`text-price tabular-nums ${variant === "headerMobile" ? "text-xs" : "text-xs sm:text-sm"}`}>
          {variant === "headerMobile" ? (
            <span className="rounded-full bg-[color-mix(in_srgb,var(--primary)_14%,transparent)] px-2 py-0.5 font-sans text-[11px] font-bold">
              {count}
            </span>
          ) : (
            <>
              {count} ürün · {formatMoney(total)}
            </>
          )}
        </span>
      ) : variant === "headerMobile" ? (
        <span className="rounded-full bg-[color-mix(in_srgb,var(--primary)_10%,transparent)] px-2 py-0.5 font-sans text-[11px] font-semibold text-muted">
          0
        </span>
      ) : (
        <span className="text-xs font-normal text-muted">0 ürün</span>
      )}
    </Link>
  );
}
