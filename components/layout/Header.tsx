"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { site, waLink } from "@/lib/site";
import { cta } from "@/lib/cta";
import { CartLink } from "@/components/shop/CartLink";

const marketTabs = [
  { href: "/urunler", label: "Tüm Ürünler" },
  { href: "/urunler?kategori=kabuklu", label: "Kabuklu" },
  { href: "/urunler?kategori=ic", label: "İç Fıstık" },
  { href: "/urunler?kategori=boz", label: "Boz İç" },
  { href: "/urunler?kategori=paket", label: "Hediye & Paket" },
  { href: "/toptan-satis", label: "Toptan" },
  { href: "/kargo-teslimat", label: "Kargo & İade" },
  { href: "/sikca-sorulan-sorular", label: "SSS" },
  { href: "/hakkimizda", label: "Hakkımızda" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const h = cta.header;

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-background/90 backdrop-blur-md">
      <div className="hidden border-b border-black/5 bg-surface/70 md:block">
        <Container className="flex min-h-[34px] items-center justify-between gap-3 py-1">
          <p className="font-sans text-xs font-medium text-foreground/85">Gaziantep merkezli</p>
          <div className="flex items-center gap-4 font-sans text-xs">
            {site.phone ? (
              <a href={`tel:${site.phoneE164}`} className="font-semibold text-primary hover:underline">
                {site.phone}
              </a>
            ) : null}
            {site.whatsappE164 ? (
              <a href={waLink(h.waMessage)} className="font-semibold text-primary hover:underline">
                WhatsApp
              </a>
            ) : null}
          </div>
        </Container>
      </div>
      <Container className="flex h-[3.75rem] items-center justify-between gap-3 md:h-[4.25rem]">
        <Link
          href="/"
          className="min-h-[44px] shrink-0 font-serif text-lg font-semibold tracking-tight text-primary min-[380px]:text-xl md:text-2xl"
          onClick={() => setOpen(false)}
        >
          {site.shortName}
        </Link>

        <form action="/urunler" className="hidden max-w-2xl flex-1 md:block" role="search">
          <label className="sr-only" htmlFor="site-search">
            Ürün ara
          </label>
          <input
            id="site-search"
            name="q"
            placeholder="Antep fıstığı, iç fıstık, kabuklu ara"
            className="h-11 w-full rounded-full border border-black/10 bg-surface/80 px-4 font-sans text-sm text-foreground placeholder:text-muted/70 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </form>

        <div className="hidden shrink-0 flex-wrap items-center justify-end gap-x-3 gap-y-1 md:flex">
          <Link href="/iletisim" className="font-sans text-xs font-semibold text-foreground hover:text-primary">
            Hesabım
          </Link>
          <Link href="/urunler" className="font-sans text-xs font-semibold text-foreground hover:text-primary">
            Favorilerim
          </Link>
          <CartLink />
          <Link href="/iletisim" className="font-sans text-xs font-semibold text-foreground hover:text-primary">
            İletişim
          </Link>
          {site.whatsappE164 ? (
            <Button
              variant="primary"
              href={waLink(h.waMessage)}
              className="!min-h-[44px] !px-3 !py-2 !text-sm"
              aria-label={h.waLabel}
            >
              {h.waLabel}
            </Button>
          ) : site.phoneE164 ? (
            <Button variant="primary" href={`tel:${site.phoneE164}`} className="!min-h-[44px] !px-3 !py-2 !text-sm">
              Ara
            </Button>
          ) : null}
        </div>

        <button
          type="button"
          className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-[var(--radius-button)] border border-primary/20 bg-surface md:hidden"
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

      <div className="hidden border-t border-black/5 bg-[var(--cream)] md:block">
        <Container>
          <nav
            className="flex min-h-[42px] items-center gap-5 overflow-x-auto font-sans text-sm font-semibold text-foreground/85"
            aria-label="Mağaza ve site menüsü"
          >
            {marketTabs.map((item) => (
              <Link key={item.href} href={item.href} className="shrink-0 py-2 hover:text-primary">
                {item.label}
              </Link>
            ))}
          </nav>
        </Container>
      </div>

      {open ? (
        <div id="mobile-nav" className="border-t border-black/5 bg-background md:hidden">
          <Container className="flex max-h-[min(70vh,calc(100dvh-5rem))] flex-col gap-1 overflow-y-auto py-3">
            <form action="/urunler" className="mb-2" role="search">
              <label className="sr-only" htmlFor="mobile-site-search">
                Ürün ara
              </label>
              <input
                id="mobile-site-search"
                name="q"
                placeholder="Ürün ara"
                className="min-h-[46px] w-full rounded-[var(--radius-input)] border border-black/10 bg-surface px-3 font-sans text-base"
              />
            </form>
            <p className="px-1 font-sans text-xs font-semibold uppercase tracking-wide text-muted">Menü</p>
            {marketTabs.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="min-h-[48px] rounded-[var(--radius-button)] px-3 py-3 font-sans text-base font-medium text-foreground hover:bg-surface"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-2 border-t border-black/5 pt-3">
              <Link
                href="/iletisim"
                className="min-h-[48px] rounded-[var(--radius-button)] px-3 py-3 font-sans text-base font-medium text-foreground hover:bg-surface"
                onClick={() => setOpen(false)}
              >
                İletişim
              </Link>
              <Link
                href="/iletisim"
                className="min-h-[48px] rounded-[var(--radius-button)] px-3 py-3 font-sans text-base font-medium text-foreground hover:bg-surface"
                onClick={() => setOpen(false)}
              >
                Hesabım
              </Link>
              <Link
                href="/urunler"
                className="min-h-[48px] rounded-[var(--radius-button)] px-3 py-3 font-sans text-base font-medium text-foreground hover:bg-surface"
                onClick={() => setOpen(false)}
              >
                Favorilerim
              </Link>
              <CartLink className="w-full" onClick={() => setOpen(false)} />
              <Button variant="secondary" href="/urunler" className="w-full justify-center" onClick={() => setOpen(false)}>
                Perakende ürünleri gör
              </Button>
              {site.whatsappE164 ? (
                <Button
                  variant="primary"
                  href={waLink(h.waMessage)}
                  className="w-full justify-center"
                  aria-label={h.waLabel}
                  onClick={() => setOpen(false)}
                >
                  {h.waLabel}
                </Button>
              ) : site.phoneE164 ? (
                <Button variant="primary" href={`tel:${site.phoneE164}`} className="w-full justify-center" onClick={() => setOpen(false)}>
                  Telefonu ara
                </Button>
              ) : null}
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
