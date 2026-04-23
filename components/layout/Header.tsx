"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { site, waLink } from "@/lib/site";
import { cta } from "@/lib/cta";

const nav = [
  { href: "/urunler", label: "Ürünler" },
  { href: "/toptan-satis", label: "Toptan" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/sikca-sorulan-sorular", label: "SSS" },
  { href: "/iletisim", label: "İletişim" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const h = cta.header;

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-background/90 backdrop-blur-md">
      <Container className="flex h-[3.75rem] items-center justify-between gap-3 md:h-[4.25rem]">
        <Link
          href="/"
          className="min-h-[44px] font-serif text-lg font-semibold tracking-tight text-primary min-[380px]:text-xl md:text-2xl"
          onClick={() => setOpen(false)}
        >
          {site.shortName}
        </Link>

        <nav className="hidden items-center gap-6 lg:gap-8 md:flex" aria-label="Ana menü">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-sans text-sm font-medium text-foreground/90 hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button variant="secondary" href="/urunler" className="!min-h-[44px] !px-3 !py-2 !text-sm">
            Ürünler
          </Button>
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
          ) : (
            <Button variant="primary" href="/iletisim" className="!min-h-[44px] !px-3 !py-2 !text-sm">
              İletişim
            </Button>
          )}
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

      {open ? (
        <div id="mobile-nav" className="border-t border-black/5 bg-background md:hidden">
          <Container className="flex max-h-[min(70vh,calc(100dvh-5rem))] flex-col gap-1 overflow-y-auto py-3">
            {nav.map((item) => (
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
              <Button variant="secondary" href="/urunler" className="w-full justify-center">
                Ürünleri incele
              </Button>
              {site.whatsappE164 ? (
                <Button
                  variant="primary"
                  href={waLink(h.waMessage)}
                  className="w-full justify-center"
                  aria-label={h.waLabel}
                >
                  {h.waLabel}
                </Button>
              ) : site.phoneE164 ? (
                <Button variant="primary" href={`tel:${site.phoneE164}`} className="w-full justify-center">
                  Telefonu ara
                </Button>
              ) : (
                <Button variant="primary" href="/iletisim" className="w-full justify-center">
                  İletişim
                </Button>
              )}
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
