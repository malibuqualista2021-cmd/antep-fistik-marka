"use client";

import Link from "next/link";
import { useState } from "react";
import { site } from "@/lib/site";
import { megaMenuAntep, mainNavLinks } from "@/lib/store-navigation";

/**
 * Masaüstü (lg+): site geneli ana menü — yatay şerit yerine sol sütunda.
 */
export function MainSidebar() {
  const [megaOpen, setMegaOpen] = useState(true);
  const stripLinks = mainNavLinks.filter((l) => l.href !== "/");

  const linkClass =
    "block min-h-[44px] rounded-[10px] px-3 py-2.5 font-sans text-sm font-semibold text-foreground/90 hover:bg-[var(--paper)] hover:text-primary";

  return (
    <aside
      className="hidden w-[min(17.5rem,20vw)] max-w-[280px] shrink-0 flex-col border-r border-[var(--border-subtle)] bg-[var(--cream)] lg:flex lg:sticky lg:top-0 lg:h-[100dvh] lg:min-h-0 lg:overflow-y-auto"
      aria-label="Site menüsü"
    >
      <div className="flex flex-col gap-1 p-4 pb-8">
        <Link
          href="/"
          className="font-serif text-[1.35rem] font-semibold leading-tight tracking-tight text-primary hover:opacity-90"
        >
          {site.shortName}
        </Link>

        <nav className="mt-5 flex flex-col gap-0.5" aria-label="Ana menü">
          <Link href="/" className={linkClass}>
            Ana Sayfa
          </Link>

          <div className="rounded-[10px] ring-1 ring-transparent">
            <button
              type="button"
              className="flex w-full min-h-[44px] items-center justify-between rounded-[10px] px-3 py-2.5 text-left font-sans text-sm font-semibold text-foreground/90 hover:bg-[var(--paper)] hover:text-primary"
              aria-expanded={megaOpen}
              aria-controls="sidebar-mega-antep"
              id="sidebar-mega-trigger"
              onClick={() => setMegaOpen((v) => !v)}
            >
              Antep Fıstığı
              <span className="text-[10px] text-muted" aria-hidden>
                {megaOpen ? "▴" : "▾"}
              </span>
            </button>
            {megaOpen ? (
              <div
                id="sidebar-mega-antep"
                role="region"
                aria-labelledby="sidebar-mega-trigger"
                className="border-t border-black/[0.06] px-2 pb-2 pt-1"
              >
                {megaMenuAntep.map((col) => (
                  <div key={col.title} className="mt-3 first:mt-2">
                    <p className="px-1 font-sans text-[10px] font-bold uppercase tracking-wide text-[var(--walnut)]">
                      {col.title}
                    </p>
                    <ul className="mt-1 space-y-0.5">
                      {col.links.map((link) => (
                        <li key={link.href + link.label}>
                          <Link
                            href={link.href}
                            className="block rounded-md py-1.5 pl-2 pr-1 font-sans text-[13px] text-foreground/85 hover:bg-[var(--paper)] hover:text-primary"
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
            ) : null}
          </div>

          {stripLinks.map((item) => (
            <Link key={item.href + item.label} href={item.href} className={linkClass} title={item.hint ?? undefined}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}
