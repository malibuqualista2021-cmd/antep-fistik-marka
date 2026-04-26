"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { site, waLink } from "@/lib/site";
import { cta } from "@/lib/cta";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { CartLink } from "@/components/shop/CartLink";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { MegaNav } from "@/components/layout/MegaNav";
import { NavColumnList } from "@/components/layout/NavColumnList";
import { topNavItems } from "@/lib/store-navigation";

export function Header() {
  const [open, setOpen] = useState(false);
  const h = cta.header;

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border-subtle)] bg-[var(--cream)]/95 backdrop-blur-md">
      <AnnouncementBar />

      <Container className="flex h-[3.65rem] items-center justify-between gap-2 md:h-[4.1rem] md:gap-4">
        <div className="shrink-0 lg:hidden">
          <BrandLogo variant="header" priority onClick={() => setOpen(false)} />
        </div>

        <form action="/urunler" className="hidden max-w-2xl flex-1 md:block" role="search">
          <label className="sr-only" htmlFor="site-search">
            Ürün ara
          </label>
          <input
            id="site-search"
            name="q"
            placeholder="Antep fıstığı, boz iç, kavrulmuş fıstık ara…"
            className="h-11 w-full rounded-full border border-black/10 bg-[var(--paper)] px-4 font-sans text-sm text-foreground placeholder:text-muted/65 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </form>

        <div className="hidden shrink-0 flex-wrap items-center justify-end gap-x-2 gap-y-1 md:flex md:gap-x-3">
          {site.phoneE164 ? (
            <a
              href={`tel:${site.phoneE164}`}
              className="font-sans text-xs font-semibold text-[var(--walnut)] hover:text-primary"
            >
              Telefon
            </a>
          ) : null}
          {site.whatsappE164 ? (
            <a href={waLink(h.waMessage)} className="font-sans text-xs font-semibold text-primary hover:underline">
              WhatsApp
            </a>
          ) : null}
          <Link href="/iletisim" className="font-sans text-xs font-semibold text-foreground hover:text-primary">
            Hesabım
          </Link>
          <Link href="/urunler" className="font-sans text-xs font-semibold text-foreground hover:text-primary">
            Favoriler
          </Link>
          <CartLink />
          <Link href="/iletisim" className="font-sans text-xs font-semibold text-foreground hover:text-primary">
            İletişim
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-[var(--radius-button)] border border-primary/20 bg-[var(--paper)] md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menüyü aç veya kapat</span>
          <span aria-hidden className="text-lg text-primary">
            {open ? "✕" : "☰"}
          </span>
        </button>
      </Container>

      <div className="hidden border-t border-[var(--border-subtle)] bg-[var(--paper)] md:block lg:hidden">
        <Container>
          <nav
            className="flex min-h-[44px] flex-wrap items-center gap-x-4 gap-y-1 overflow-x-auto py-1 font-sans text-sm font-semibold text-foreground/88"
            aria-label="Ana menü"
          >
            {topNavItems.map((item) => {
              if (item.kind === "link") {
                return (
                  <Link
                    key={item.href + item.label}
                    href={item.href}
                    className="nav-label shrink-0 py-2 text-foreground/90 hover:text-primary"
                    title={item.hint ?? undefined}
                  >
                    {item.label}
                  </Link>
                );
              }
              if (item.kind === "mega") {
                return <MegaNav key={item.id} />;
              }
              return (
                <MegaNav
                  key={item.id}
                  columns={item.columns}
                  label={item.label}
                  href="/hakkimizda"
                  ariaLabel="Kurumsal alt menü"
                  compact
                />
              );
            })}
          </nav>
        </Container>
      </div>

      {open ? (
        <div id="mobile-nav" className="max-h-[min(78vh,calc(100dvh-5rem))] overflow-y-auto border-t border-black/5 bg-[var(--cream)] md:hidden">
          <Container className="flex flex-col gap-1 py-3">
            <form action="/urunler" className="mb-2" role="search">
              <label className="sr-only" htmlFor="mobile-site-search">
                Ürün ara
              </label>
              <input
                id="mobile-site-search"
                name="q"
                placeholder="Ürün ara"
                className="min-h-[46px] w-full rounded-[var(--radius-input)] border border-black/10 bg-[var(--paper)] px-3 font-sans text-base"
              />
            </form>

            {topNavItems.map((item) => {
              if (item.kind === "link") {
                return (
                  <Link
                    key={item.href + item.label}
                    href={item.href}
                    className="min-h-[48px] rounded-md px-2 py-3 font-sans font-medium hover:bg-surface/80"
                    onClick={() => setOpen(false)}
                    title={item.hint ?? undefined}
                  >
                    {item.label}
                  </Link>
                );
              }

              if (item.kind === "mega") {
                return (
                  <details key={item.id} className="rounded-md border border-black/[0.06] bg-[var(--paper)]/60">
                    <summary className="cursor-pointer px-3 py-3 font-sans text-sm font-semibold text-foreground marker:text-primary">
                      {item.label}
                    </summary>
                    <div className="border-t border-black/[0.06] px-2 pb-3 pt-1">
                      <Link
                        href={item.href}
                        className="mb-2 block px-2 py-2 font-sans text-xs font-semibold text-primary hover:underline"
                        onClick={() => setOpen(false)}
                      >
                        Mağazaya git →
                      </Link>
                      <NavColumnList
                        columns={item.columns}
                        linkClassName="block min-h-[44px] rounded-md px-3 py-2.5 pl-4 font-sans text-sm hover:bg-surface/80"
                        onNavigate={() => setOpen(false)}
                      />
                    </div>
                  </details>
                );
              }

              return (
                <details key={item.id} className="rounded-md border border-black/[0.06] bg-[var(--paper)]/60">
                  <summary className="cursor-pointer px-3 py-3 font-sans text-sm font-semibold text-foreground marker:text-primary">
                    {item.label}
                  </summary>
                  <div className="border-t border-black/[0.06] px-2 pb-3 pt-1">
                    <NavColumnList
                      columns={item.columns}
                      linkClassName="block min-h-[44px] rounded-md px-3 py-2.5 pl-4 font-sans text-sm hover:bg-surface/80"
                      onNavigate={() => setOpen(false)}
                    />
                  </div>
                </details>
              );
            })}

            <div className="mt-3 flex flex-col gap-2 border-t border-black/5 pt-3">
              <CartLink className="w-full" onClick={() => setOpen(false)} />
              {site.whatsappE164 ? (
                <Button variant="cta" href={waLink(h.waMessage)} className="w-full justify-center" onClick={() => setOpen(false)}>
                  WhatsApp
                </Button>
              ) : null}
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
