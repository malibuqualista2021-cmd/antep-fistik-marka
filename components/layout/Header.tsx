"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { site, waLink } from "@/lib/site";
import { cta } from "@/lib/cta";
import { brandLogo } from "@/lib/brand-logo";
import { CartLink } from "@/components/shop/CartLink";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { headerCategoryStrip } from "@/lib/store-navigation";

function SiteSearch({ id, className = "" }: { id: string; className?: string }) {
  return (
    <form action="/urunler" className={className} role="search">
      <label className="sr-only" htmlFor={id}>
        Ürün ara
      </label>
      <input
        id={id}
        name="q"
        placeholder="Antep fıstığı, boz iç, kavrulmuş fıstık ara…"
        className="h-11 w-full rounded-full border border-black/10 bg-[var(--paper)] px-4 font-sans text-sm text-foreground placeholder:text-muted/65 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
      />
    </form>
  );
}

const utilityLinkClass =
  "font-sans text-xs font-semibold text-foreground hover:text-primary min-[380px]:text-[0.8125rem] md:text-xs";

/** Masaüstü üst sağ — sepet dahil */
function HeaderActionsBar() {
  const { waMessage } = cta.header;
  return (
    <div className="hidden shrink-0 flex-wrap items-center justify-end gap-x-2 gap-y-1 md:flex md:gap-x-3">
      {site.phoneE164 ? (
        <a
          href={`tel:${site.phoneE164}`}
          className="font-sans text-xs font-semibold text-[var(--walnut)] hover:text-primary min-[380px]:text-[0.8125rem]"
        >
          Telefon
        </a>
      ) : null}
      {site.whatsappE164 ? (
        <a href={waLink(waMessage)} className="font-sans text-xs font-semibold text-primary hover:underline min-[380px]:text-[0.8125rem]">
          WhatsApp
        </a>
      ) : null}
      <Link href="/iletisim" className={utilityLinkClass}>
        Hesabım
      </Link>
      <Link href="/urunler" className={utilityLinkClass}>
        Favoriler
      </Link>
      <CartLink />
      <Link href="/iletisim" className={utilityLinkClass}>
        İletişim
      </Link>
    </div>
  );
}

/** Mobil menü — sepet hariç (sepet altta ayrı) */
function HeaderDrawerUtilities({ onNavigate }: { onNavigate: () => void }) {
  const { waMessage } = cta.header;
  return (
    <div className="flex flex-col gap-2 border-b border-black/5 pb-3">
      {site.phoneE164 ? (
        <a
          href={`tel:${site.phoneE164}`}
          className="min-h-[44px] rounded-md px-2 py-3 font-sans text-sm font-semibold text-[var(--walnut)] hover:bg-surface/80"
          onClick={onNavigate}
        >
          Telefon
        </a>
      ) : null}
      {site.whatsappE164 ? (
        <a
          href={waLink(waMessage)}
          className="min-h-[44px] rounded-md px-2 py-3 font-sans text-sm font-semibold text-primary hover:bg-surface/80"
          onClick={onNavigate}
        >
          WhatsApp
        </a>
      ) : null}
      <Link href="/iletisim" className="min-h-[44px] rounded-md px-2 py-3 font-sans text-sm font-medium hover:bg-surface/80" onClick={onNavigate}>
        Hesabım
      </Link>
      <Link href="/urunler" className="min-h-[44px] rounded-md px-2 py-3 font-sans text-sm font-medium hover:bg-surface/80" onClick={onNavigate}>
        Favoriler
      </Link>
      <Link href="/iletisim" className="min-h-[44px] rounded-md px-2 py-3 font-sans text-sm font-medium hover:bg-surface/80" onClick={onNavigate}>
        İletişim
      </Link>
    </div>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border-subtle)] bg-[var(--cream)]/95 backdrop-blur-md">
      <AnnouncementBar />

      {/* Marka şeridi: kırpma yok (contain) — görseldeki yazılar her ekranda okunabilir ölçekte */}
      <Link
        href="/"
        onClick={close}
        className="relative isolate block w-full overflow-hidden border-b border-black/20 bg-[#0c0c0c] outline-none ring-inset focus-visible:ring-2 focus-visible:ring-primary"
      >
        <Container className="py-2.5 sm:py-3 md:py-3.5">
          <div className="relative h-[clamp(7.25rem,28vw,12.25rem)] w-full sm:h-[clamp(7.75rem,24vw,13rem)] md:h-[clamp(8rem,20vw,13.5rem)] lg:h-[clamp(8.5rem,17vw,14.25rem)]">
            <Image
              src={brandLogo.fullSrc}
              alt={brandLogo.alt}
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1152px"
              className="object-contain object-center"
            />
          </div>
        </Container>
      </Link>

      <Container className="py-2.5 md:py-3">
        {/* Araç şeridi: arama — sağ aksiyonlar; logo kapak şeridinde */}
        <div className="flex w-full flex-col gap-2">
          <div className="flex w-full min-w-0 items-center gap-2 sm:gap-3 md:min-h-[2.75rem] md:items-center">
            <SiteSearch id="site-search-desktop" className="hidden min-w-0 flex-1 md:block" />
            <HeaderActionsBar />
            <button
              type="button"
              className="ml-auto inline-flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-[var(--radius-button)] border border-primary/20 bg-[var(--paper)] md:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="sr-only">Menüyü aç veya kapat</span>
              <span aria-hidden className="text-lg text-primary">
                {open ? "✕" : "☰"}
              </span>
            </button>
          </div>
          <SiteSearch id="site-search-mobile" className="w-full min-w-0 md:hidden" />
        </div>
      </Container>

      <div className="hidden border-t border-[var(--border-subtle)] bg-[var(--paper)] md:block">
        <Container>
          <nav
            className="flex min-h-[44px] items-center gap-x-1 overflow-x-auto py-1.5 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-x-2 [&::-webkit-scrollbar]:hidden"
            aria-label="Kategoriler"
          >
            {headerCategoryStrip.map((item) => (
              <Link
                key={item.href + item.label}
                href={item.href}
                className="nav-label shrink-0 whitespace-nowrap rounded-[10px] px-2.5 py-2 text-foreground/90 hover:bg-[color-mix(in_srgb,var(--cream)_70%,var(--paper))] hover:text-primary sm:px-3"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </Container>
      </div>

      {open ? (
        <div id="mobile-nav" className="max-h-[min(78vh,calc(100dvh-5rem))] overflow-y-auto border-t border-black/5 bg-[var(--cream)] md:hidden">
          <Container className="flex flex-col gap-1 py-3">
            <HeaderDrawerUtilities onNavigate={close} />
            <p className="px-1 pt-2 font-sans text-[11px] font-bold uppercase tracking-wide text-muted">Kategoriler</p>
            <nav className="flex flex-col" aria-label="Kategoriler">
              {headerCategoryStrip.map((item) => (
                <Link
                  key={`m-${item.href}-${item.label}`}
                  href={item.href}
                  className="min-h-[48px] rounded-md px-2 py-3 font-sans text-sm font-medium hover:bg-surface/80"
                  onClick={close}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-3 flex flex-col gap-2 border-t border-black/5 pt-3">
              <CartLink className="w-full" onClick={close} />
              {site.whatsappE164 ? (
                <Button variant="cta" href={waLink(cta.header.waMessage)} className="w-full justify-center" onClick={close}>
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
