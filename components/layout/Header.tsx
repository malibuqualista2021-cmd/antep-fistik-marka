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
import { CategoryNavDesktop, MobileCategoryChips } from "@/components/layout/HeaderCategoryNav";

function SiteSearch({ id, className = "" }: { id: string; className?: string }) {
  return (
    <form action="/urunler" className={className} role="search">
      <label className="sr-only" htmlFor={id}>
        Ürün ara
      </label>
      <input
        id={id}
        name="q"
        placeholder="Antep fıstığı, boz iç, kavrulmuş fıstık ara"
        className="h-11 w-full rounded-full border border-[color-mix(in_srgb,var(--color-border)_92%,transparent)] bg-[color-mix(in_srgb,var(--color-bg)_40%,var(--color-surface))] px-4 font-sans text-sm text-foreground placeholder:text-muted/65 focus:border-[color-mix(in_srgb,var(--primary)_55%,var(--color-border))] focus:outline-none focus:ring-2 focus:ring-primary/18"
      />
    </form>
  );
}

const utilityLinkClass =
  "font-sans text-sm font-semibold text-[color-mix(in_srgb,var(--color-text)_93%,var(--color-muted))] transition-colors hover:text-primary";

/** Masaüstü üst sağ — gap ~16–20px, 14px tipografi */
function HeaderActionsBar() {
  const { waMessage } = cta.header;
  return (
    <div className="hidden shrink-0 flex-wrap items-center justify-end gap-x-4 lg:gap-x-5 md:flex">
      {site.phoneE164 ? (
        <a href={`tel:${site.phoneE164}`} className={utilityLinkClass}>
          Telefon
        </a>
      ) : null}
      {site.whatsappE164 ? (
        <a href={waLink(waMessage)} className={`${utilityLinkClass} text-primary hover:underline`}>
          WhatsApp
        </a>
      ) : null}
      <Link href="/iletisim" className={utilityLinkClass}>
        Hesabım
      </Link>
      <Link href="/urunler" className={utilityLinkClass}>
        Favoriler
      </Link>
      <CartLink variant="header" />
      <Link href="/iletisim" className={utilityLinkClass}>
        İletişim
      </Link>
    </div>
  );
}

function HeaderDrawerUtilities({ onNavigate }: { onNavigate: () => void }) {
  const { waMessage } = cta.header;
  return (
    <div className="flex flex-col gap-2 border-b border-[color-mix(in_srgb,var(--color-border)_75%,transparent)] pb-3">
      {site.phoneE164 ? (
        <a
          href={`tel:${site.phoneE164}`}
          className="min-h-[44px] rounded-md px-2 py-3 font-sans text-sm font-semibold text-[var(--color-text)] hover:bg-[color-mix(in_srgb,var(--color-green-soft)_55%,var(--color-surface))]"
          onClick={onNavigate}
        >
          Telefon
        </a>
      ) : null}
      {site.whatsappE164 ? (
        <a
          href={waLink(waMessage)}
          className="min-h-[44px] rounded-md px-2 py-3 font-sans text-sm font-semibold text-primary hover:bg-[color-mix(in_srgb,var(--color-green-soft)_55%,var(--color-surface))]"
          onClick={onNavigate}
        >
          WhatsApp
        </a>
      ) : null}
      <Link href="/iletisim" className="min-h-[44px] rounded-md px-2 py-3 font-sans text-sm font-medium hover:bg-[color-mix(in_srgb,var(--color-green-soft)_45%,var(--color-surface))]" onClick={onNavigate}>
        Hesabım
      </Link>
      <Link href="/urunler" className="min-h-[44px] rounded-md px-2 py-3 font-sans text-sm font-medium hover:bg-[color-mix(in_srgb,var(--color-green-soft)_45%,var(--color-surface))]" onClick={onNavigate}>
        Favoriler
      </Link>
      <Link href="/iletisim" className="min-h-[44px] rounded-md px-2 py-3 font-sans text-sm font-medium hover:bg-[color-mix(in_srgb,var(--color-green-soft)_45%,var(--color-surface))]" onClick={onNavigate}>
        İletişim
      </Link>
    </div>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[color-mix(in_srgb,var(--color-border)_78%,transparent)] bg-[var(--color-surface)] shadow-[0_1px_0_rgb(42_27_18_/0.04)]">
      <AnnouncementBar />

      <Container className="py-3 md:py-3.5">
        <div className="flex flex-col gap-3">
          <div className="flex w-full min-w-0 items-center gap-3 lg:gap-6">
            <Link
              href="/"
              onClick={close}
              className="relative shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface)]"
            >
              <Image
                src={brandLogo.fullSrc}
                alt={brandLogo.alt}
                width={brandLogo.width}
                height={brandLogo.height}
                priority
                sizes="(max-width: 768px) 120px, 130px"
                className="h-auto w-[clamp(6.875rem,26vw,8.125rem)] max-h-[52px] object-contain object-left md:max-h-[56px]"
              />
              <span className="sr-only">{site.name}</span>
            </Link>

            <div className="hidden min-w-0 flex-1 justify-center px-2 md:flex">
              <SiteSearch
                id="site-search-desktop"
                className="w-full min-w-[280px] max-w-[480px] lg:min-w-[320px]"
              />
            </div>

            <HeaderActionsBar />

            <div className="ml-auto flex shrink-0 items-center gap-2 md:hidden">
              <CartLink variant="headerMobile" onClick={close} />
              <button
                type="button"
                className="inline-flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--primary)_28%,transparent)] bg-[var(--color-surface-alt)] text-primary"
                aria-expanded={open}
                aria-controls="mobile-nav"
                onClick={() => setOpen((v) => !v)}
              >
                <span className="sr-only">Menüyü aç veya kapat</span>
                <span aria-hidden className="text-lg">
                  {open ? "✕" : "☰"}
                </span>
              </button>
            </div>
          </div>

          <SiteSearch id="site-search-mobile" className="w-full min-w-0 md:hidden" />

          <div className="md:hidden">
            <MobileCategoryChips />
          </div>
        </div>
      </Container>

      <div className="hidden border-t border-[color-mix(in_srgb,var(--color-border)_80%,transparent)] bg-[var(--color-surface)] md:block">
        <Container>
          <CategoryNavDesktop />
        </Container>
      </div>

      {open ? (
        <div
          id="mobile-nav"
          className="max-h-[min(78vh,calc(100dvh-5rem))] overflow-y-auto border-t border-[color-mix(in_srgb,var(--color-border)_78%,transparent)] bg-[var(--color-surface)] md:hidden"
        >
          <Container className="flex flex-col gap-1 py-3">
            <HeaderDrawerUtilities onNavigate={close} />
            <p className="px-1 pt-2 font-sans text-[11px] font-bold uppercase tracking-wide text-muted">Kategoriler</p>
            <nav className="flex flex-col" aria-label="Kategoriler mobil liste">
              {headerCategoryStrip.map((item) => (
                <Link
                  key={`m-${item.href}-${item.label}`}
                  href={item.href}
                  className="min-h-[48px] rounded-md px-2 py-3 font-sans text-sm font-medium hover:bg-[color-mix(in_srgb,var(--color-green-soft)_45%,var(--color-surface))]"
                  onClick={close}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-3 flex flex-col gap-2 border-t border-[color-mix(in_srgb,var(--color-border)_78%,transparent)] pt-3">
              <CartLink className="w-full justify-center" onClick={close} />
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
