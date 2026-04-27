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
        className="h-11 w-full rounded-full border border-[color-mix(in_srgb,var(--walnut)_10%,transparent)] bg-[color-mix(in_srgb,var(--paper)_92%,var(--cream))] px-4 font-sans text-sm text-foreground placeholder:text-muted/65 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15"
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
    <div className="flex flex-col gap-2 border-b border-[color-mix(in_srgb,var(--walnut)_8%,transparent)] pb-3">
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
    <header className="sticky top-0 z-50 border-b border-[color-mix(in_srgb,var(--walnut)_6%,transparent)] bg-[var(--cream)]">
      <AnnouncementBar />

      {/* Marka: duyuru→mat köprü; logo alanı tek mat (raster zeminle aynı); alt şerit sadece kreme yumuşatır */}
      <Link
        href="/"
        onClick={close}
        className="relative isolate block w-full outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--cream)]"
      >
        <div className="header-brand-announcement-bridge h-2.5 w-full shrink-0" aria-hidden />
        <div className="header-brand-matte-block">
          <Container className="py-4 sm:py-5 md:py-6">
            <div
              className="relative mx-auto w-full max-w-[min(100%,26rem)] overflow-hidden rounded-sm bg-[var(--brand-logo-matte)] sm:max-w-[min(100%,32rem)] md:max-w-[min(100%,40rem)] lg:max-w-[min(100%,44rem)]"
              style={{ aspectRatio: `${brandLogo.width} / ${brandLogo.height}` }}
            >
              <Image
                src={brandLogo.fullSrc}
                alt={brandLogo.alt}
                fill
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 640px"
                className="object-contain object-center"
              />
            </div>
          </Container>
        </div>
        <div className="header-brand-heel w-full shrink-0" aria-hidden />
      </Link>

      {/* Araç satırı: ortada arama, sağda aksiyonlar; üst şeritle aynı krem zemin */}
      <Container className="bg-[var(--cream)] py-2.5 md:py-3">
        <div className="flex w-full flex-col gap-2">
          <div className="flex w-full min-w-0 items-center justify-end gap-2 md:grid md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-4">
            <span className="hidden md:block" aria-hidden />
            <SiteSearch
              id="site-search-desktop"
              className="hidden min-w-0 md:block md:w-full md:min-w-[18rem] md:max-w-2xl md:justify-self-center"
            />
            <div className="flex w-full min-w-0 items-center justify-end gap-2 md:col-start-3 md:row-start-1 md:flex md:justify-end">
              <HeaderActionsBar />
              <button
                type="button"
                className="inline-flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-[var(--radius-button)] border border-primary/20 bg-[var(--paper)] md:hidden"
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
          </div>
          <SiteSearch id="site-search-mobile" className="w-full min-w-0 md:hidden" />
        </div>
      </Container>

      <div className="hidden border-t border-[color-mix(in_srgb,var(--walnut)_7%,transparent)] bg-[var(--cream)] md:block">
        <Container>
          <nav
            className="flex min-h-[48px] flex-wrap items-center justify-center gap-x-5 gap-y-2 py-2 sm:gap-x-6 md:gap-x-7"
            aria-label="Kategoriler"
          >
            {headerCategoryStrip.map((item) => (
              <Link
                key={item.href + item.label}
                href={item.href}
                className="nav-label whitespace-nowrap rounded-[10px] px-1 py-2 text-[color-mix(in_srgb,var(--walnut)_88%,var(--foreground))] transition-colors hover:bg-[color-mix(in_srgb,var(--primary)_8%,var(--cream))] hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </Container>
      </div>

      {open ? (
        <div id="mobile-nav" className="max-h-[min(78vh,calc(100dvh-5rem))] overflow-y-auto border-t border-[color-mix(in_srgb,var(--walnut)_8%,transparent)] bg-[var(--cream)] md:hidden">
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
            <div className="mt-3 flex flex-col gap-2 border-t border-[color-mix(in_srgb,var(--walnut)_8%,transparent)] pt-3">
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
