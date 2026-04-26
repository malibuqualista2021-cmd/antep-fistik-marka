"use client";

import Link from "next/link";
import { useState } from "react";
import { NavColumnList } from "@/components/layout/NavColumnList";
import { site } from "@/lib/site";
import { topNavItems } from "@/lib/store-navigation";

/**
 * Masaüstü (lg+): sol menü — az ana satır, detaylar alt sekme (akordeon) içinde.
 */
export function MainSidebar() {
  const [openId, setOpenId] = useState<string | null>(null);

  const linkClass =
    "nav-label block min-h-[44px] rounded-[10px] px-3 py-2.5 text-foreground/90 hover:bg-[var(--paper)] hover:text-primary";

  function toggle(id: string) {
    setOpenId((cur) => (cur === id ? null : id));
  }

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
          {topNavItems.map((item) => {
            if (item.kind === "link") {
              return (
                <Link key={item.href + item.label} href={item.href} className={linkClass} title={item.hint ?? undefined}>
                  {item.label}
                </Link>
              );
            }

            if (item.kind === "mega") {
              const expanded = openId === item.id;
              return (
                <div key={item.id} className="rounded-[10px] ring-1 ring-transparent">
                  <button
                    type="button"
                    className="nav-label flex w-full min-h-[44px] items-center justify-between rounded-[10px] px-3 py-2.5 text-left text-foreground/90 hover:bg-[var(--paper)] hover:text-primary"
                    aria-expanded={expanded}
                    aria-controls={`sidebar-panel-${item.id}`}
                    id={`sidebar-trigger-${item.id}`}
                    onClick={() => toggle(item.id)}
                  >
                    {item.label}
                    <span className="text-[10px] text-muted" aria-hidden>
                      {expanded ? "▴" : "▾"}
                    </span>
                  </button>
                  {expanded ? (
                    <div
                      id={`sidebar-panel-${item.id}`}
                      role="region"
                      aria-labelledby={`sidebar-trigger-${item.id}`}
                      className="border-t border-black/[0.06] px-2 pb-2 pt-1"
                    >
                      <p className="px-1 pt-1 font-sans text-[11px] text-muted">
                        <Link href={item.href} className="font-semibold text-primary hover:underline">
                          Mağazaya git →
                        </Link>
                      </p>
                      <NavColumnList columns={item.columns} />
                    </div>
                  ) : null}
                </div>
              );
            }

            const expanded = openId === item.id;
            return (
              <div key={item.id} className="rounded-[10px] ring-1 ring-transparent">
                <button
                  type="button"
                  className="nav-label flex w-full min-h-[44px] items-center justify-between rounded-[10px] px-3 py-2.5 text-left text-foreground/90 hover:bg-[var(--paper)] hover:text-primary"
                  aria-expanded={expanded}
                  aria-controls={`sidebar-panel-${item.id}`}
                  id={`sidebar-trigger-${item.id}`}
                  onClick={() => toggle(item.id)}
                >
                  {item.label}
                  <span className="text-[10px] text-muted" aria-hidden>
                    {expanded ? "▴" : "▾"}
                  </span>
                </button>
                {expanded ? (
                  <div
                    id={`sidebar-panel-${item.id}`}
                    role="region"
                    aria-labelledby={`sidebar-trigger-${item.id}`}
                    className="border-t border-black/[0.06] px-2 pb-2 pt-1"
                  >
                    <NavColumnList columns={item.columns} />
                  </div>
                ) : null}
              </div>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
