"use client";

import Link from "next/link";
import type { MegaColumn } from "@/lib/store-navigation";
import { megaMenuAntep } from "@/lib/store-navigation";

type Props = {
  columns?: MegaColumn[];
  label?: string;
  href?: string;
  ariaLabel?: string;
  /** Kurumsal gibi tek sütunlu dar panel */
  compact?: boolean;
};

export function MegaNav({
  columns = megaMenuAntep,
  label = "Antep fıstığı",
  href = "/urunler",
  ariaLabel = "Antep fıstığı alt menü",
  compact = false,
}: Props) {
  const panelWidth = compact
    ? "w-[min(17.5rem,calc(100vw-1.5rem))]"
    : "w-[min(100vw-1.5rem,56rem)]";
  const gridClass = compact ? "grid grid-cols-1 gap-0" : "grid gap-0 md:grid-cols-4";

  return (
    <div className="group relative">
      <Link
        href={href}
        className="inline-flex min-h-[42px] items-center whitespace-nowrap py-2 font-sans text-sm font-semibold text-foreground/90 hover:text-primary"
      >
        {label}
        <span className="ml-1 text-[10px] text-muted group-hover:text-primary" aria-hidden>
          ▾
        </span>
      </Link>
      <div
        className={`pointer-events-none invisible absolute left-0 top-full z-[60] ${panelWidth} translate-y-1 opacity-0 shadow-[var(--shadow-lift)] transition duration-200 group-hover:pointer-events-auto group-hover:visible group-hover:translate-y-0 group-hover:opacity-100`}
        role="navigation"
        aria-label={ariaLabel}
      >
        <div
          className={`mt-1 ${gridClass} rounded-[14px] border border-[var(--border-subtle)] bg-[var(--cream)] p-4 ring-1 ring-black/[0.04] md:p-5`}
        >
          {columns.map((col) => (
            <div
              key={col.title}
              className="border-b border-black/[0.06] px-1 py-3 last:border-b-0 md:border-b-0 md:py-0 md:pr-3"
            >
              <p className="font-sans text-[11px] font-bold uppercase tracking-wide text-[var(--walnut)]">{col.title}</p>
              <ul className="mt-2 space-y-1.5">
                {col.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="block rounded-md py-1.5 font-sans text-sm text-foreground/90 hover:bg-surface/80 hover:text-primary"
                      title={link.hint ?? undefined}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
