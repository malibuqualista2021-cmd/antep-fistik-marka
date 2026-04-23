import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "cream" | "outlineLight";

const base =
  "inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] px-5 py-3 text-base font-medium transition-colors duration-200 min-h-[48px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary active:scale-[0.99]";

const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-[var(--cream)] shadow-sm hover:bg-primary-hover focus-visible:outline-primary-hover",
  secondary:
    "border-2 border-primary bg-background text-primary hover:bg-surface",
  ghost: "border border-transparent text-primary hover:bg-surface/80",
  cream:
    "bg-[var(--cream)] text-primary shadow-sm hover:bg-[color-mix(in_srgb,var(--cream)_92%,var(--primary)_8%)]",
  outlineLight:
    "border-2 border-[var(--cream)]/55 bg-transparent text-[var(--cream)] hover:bg-[color-mix(in_srgb,var(--cream)_12%,transparent)]",
};

type Props = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  href?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  "aria-label"?: string;
};

export function Button({
  children,
  variant = "primary",
  className = "",
  href,
  type = "button",
  onClick,
  "aria-label": ariaLabel,
}: Props) {
  const cls = `${base} ${variants[variant]} ${className}`;
  if (href) {
    return (
      <Link href={href} className={cls} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} className={cls} onClick={onClick} aria-label={ariaLabel}>
      {children}
    </button>
  );
}
