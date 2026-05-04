"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { PromoPopupDefinition } from "@/lib/site-settings-types";

function routeMatches(pathname: string, patterns: string[]): boolean {
  return patterns.some((pat) => {
    const p = pat.trim();
    if (!p || p === "*" || p === "/*") return true;
    if (p.endsWith("/*")) return pathname.startsWith(p.slice(0, -1));
    return pathname === p;
  });
}

export function PromoPopupsLayer({ popups }: { popups: PromoPopupDefinition[] }) {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState<PromoPopupDefinition | null>(null);

  useEffect(() => {
    const candidates = popups.filter((p) => p.enabled && routeMatches(pathname, p.matchRoutes));
    if (!candidates.length) return;

    const p = candidates[0];
    const storageKey = `promo_dismiss_${p.storageKey}`;
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const until = Number(raw);
        if (Number.isFinite(until) && Date.now() < until) return;
      }
    } catch {
      /* ignore */
    }

    const t = window.setTimeout(() => setOpen(p), p.delayMs);
    return () => window.clearTimeout(t);
  }, [pathname, popups]);

  function dismiss(p: PromoPopupDefinition) {
    setOpen(null);
    try {
      const until = Date.now() + p.dismissDays * 86400000;
      localStorage.setItem(`promo_dismiss_${p.storageKey}`, String(until));
    } catch {
      /* ignore */
    }
  }

  if (!open) return null;

  const rowClass =
    open.layout === "image-top"
      ? "flex flex-col gap-4"
      : "flex flex-col gap-4 md:flex-row md:items-center md:gap-6";

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end justify-center bg-black/45 p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby={`promo-${open.id}-title`}
    >
      <button type="button" className="absolute inset-0 cursor-default" aria-label="Arka plan" onClick={() => dismiss(open)} />
      <div className="relative z-[201] w-full max-w-lg rounded-[var(--radius-card)] bg-[var(--cream)] p-5 shadow-2xl ring-2 ring-primary/25 md:max-w-2xl md:p-7">
        <button
          type="button"
          className="absolute right-3 top-3 rounded-full bg-background/90 px-2 py-1 font-sans text-xs font-bold text-muted ring-1 ring-[var(--line-soft)] hover:text-foreground"
          onClick={() => dismiss(open)}
        >
          ✕
        </button>
        <div className={open.layout === "image-left" ? `${rowClass} md:flex-row-reverse` : rowClass}>
          {open.imageSrc ? (
            <div
              className={`relative mx-auto w-full overflow-hidden rounded-xl bg-[var(--paper)] ring-1 ring-[var(--line-soft)] ${
                open.layout === "image-top" ? "aspect-[16/9] max-h-52" : "aspect-video max-w-md md:w-2/5"
              }`}
            >
              <Image src={open.imageSrc} alt={open.imageAlt || ""} fill className="object-cover" sizes="(max-width:768px) 100vw, 400px" />
            </div>
          ) : null}
          <div className="min-w-0 flex-1">
            <h2 id={`promo-${open.id}-title`} className="font-serif text-xl text-foreground md:text-2xl">
              {open.title}
            </h2>
            {open.body ? (
              <p className="mt-3 whitespace-pre-wrap font-sans text-sm leading-relaxed text-muted">{open.body}</p>
            ) : null}
            <div className="mt-5 flex flex-wrap gap-2">
              <Link
                href={open.ctaHref}
                className="inline-flex min-h-[44px] items-center justify-center rounded-[var(--radius-button)] bg-primary px-5 font-sans text-sm font-semibold text-[var(--cream)] hover:opacity-95"
                onClick={() => dismiss(open)}
              >
                {open.ctaLabel}
              </Link>
              <button
                type="button"
                className="inline-flex min-h-[44px] items-center justify-center rounded-[var(--radius-button)] px-4 font-sans text-sm font-semibold text-muted underline-offset-4 hover:underline"
                onClick={() => dismiss(open)}
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
