"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { useSitePresentation } from "@/components/layout/SitePresentationContext";
import { waLinkResolved } from "@/lib/storefront-contact";
import { cta } from "@/lib/cta";
import { brandLogo } from "@/lib/brand-logo";
import { CartLink } from "@/components/shop/CartLink";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { headerCategoryStrip } from "@/lib/store-navigation";
import { CategoryNavDesktop, MobileCategoryChips } from "@/components/layout/HeaderCategoryNav";

function SiteSearch({ id, className = "", prominent = false }: { id: string; className?: string; prominent?: boolean }) {
  const inputCls = prominent
    ? "h-12 w-full rounded-xl border-2 border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 font-sans text-base text-foreground shadow-inner placeholder:text-muted/70 focus:border-[var(--color-orange)] focus:outline-none focus:ring-4 focus:ring-[color-mix(in_srgb,var(--color-orange)_22%,transparent)] md:h-[3.25rem] md:text-[1.05rem]"
    : "h-11 w-full rounded-full border border-[color-mix(in_srgb,var(--color-border)_92%,transparent)] bg-[color-mix(in_srgb,var(--color-bg)_40%,var(--color-surface))] px-4 font-sans text-sm text-foreground placeholder:text-muted/65 focus:border-[color-mix(in_srgb,var(--primary)_55%,var(--color-border))] focus:outline-none focus:ring-2 focus:ring-primary/18";
  return (
    <form action="/urunler" className={className} role="search">
      <label className="sr-only" htmlFor={id}>
        Ürün ara
      </label>
      <input id={id} name="q" placeholder="Ürün, kategori veya gramaj ara…" className={inputCls} />
    </form>
  );
}

const utilityLinkClass =
  "font-sans text-sm font-semibold text-[color-mix(in_srgb,var(--color-text)_93%,var(--color-muted))] transition-colors hover:text-primary";

/** Masaüstü üst sağ — gap ~16–20px, 14px tipografi */
function HeaderActionsBar() {
  const { waMessage } = cta.header;
  const { contact } = useSitePresentation();
  return (
    <div className="hidden shrink-0 flex-wrap items-center justify-end gap-x-4 lg:gap-x-5 md:flex">
      {contact.phoneE164 ? (
        <a href={`tel:${contact.phoneE164}`} className={utilityLinkClass}>
          Telefon
        </a>
      ) : null}
      {contact.whatsappE164 ? (
        <a href={waLinkResolved(contact, waMessage)} className={`${utilityLinkClass} text-primary hover:underline`}>
          WhatsApp
        </a>
      ) : null}
      <Link href="/iletisim" className={utilityLinkClass}>
        Hesabım
      </Link>
      <Link href="/urunler?favoriler=1" className={utilityLinkClass}>
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
  const { contact } = useSitePresentation();
  return (
    <div className="flex flex-col gap-2 border-b border-[color-mix(in_srgb,var(--color-border)_75%,transparent)] pb-3">
      {contact.phoneE164 ? (
        <a
          href={`tel:${contact.phoneE164}`}
          className="min-h-[44px] rounded-md px-2 py-3 font-sans text-sm font-semibold text-[var(--color-text)] hover:bg-[color-mix(in_srgb,var(--color-green-soft)_55%,var(--color-surface))]"
          onClick={onNavigate}
        >
          Telefon
        </a>
      ) : null}
      {contact.whatsappE164 ? (
        <a
          href={waLinkResolved(contact, waMessage)}
          className="min-h-[44px] rounded-md px-2 py-3 font-sans text-sm font-semibold text-primary hover:bg-[color-mix(in_srgb,var(--color-green-soft)_55%,var(--color-surface))]"
          onClick={onNavigate}
        >
          WhatsApp
        </a>
      ) : null}
      <Link href="/iletisim" className="min-h-[44px] rounded-md px-2 py-3 font-sans text-sm font-medium hover:bg-[color-mix(in_srgb,var(--color-green-soft)_45%,var(--color-surface))]" onClick={onNavigate}>
        Hesabım
      </Link>
      <Link href="/urunler?favoriler=1" className="min-h-[44px] rounded-md px-2 py-3 font-sans text-sm font-medium hover:bg-[color-mix(in_srgb,var(--color-green-soft)_45%,var(--color-surface))]" onClick={onNavigate}>
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
  const { branding, contact } = useSitePresentation();

  return (
    <header className="sticky top-0 z-50 border-b border-[color-mix(in_srgb,var(--color-border)_78%,transparent)] bg-[var(--color-surface)] shadow-[0_1px_0_rgb(36_23_15_/0.04)]">
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
                sizes="(max-width: 768px) 100px, 110px"
                className="h-auto w-[clamp(5.625rem,18vw,6.875rem)] max-h-[48px] object-contain object-left md:max-h-[52px]"
              />
              <span className="sr-only">{branding.name}</span>
            </Link>

            <div className="hidden min-w-0 flex-1 justify-center px-2 md:flex">
              <SiteSearch id="site-search-desktop" prominent className="w-full min-w-[300px] max-w-[580px] lg:min-w-[360px]" />
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

          <SiteSearch id="site-search-mobile" prominent className="w-full min-w-0 md:hidden" />

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
              {contact.whatsappE164 ? (
                <Button variant="cta" href={waLinkResolved(contact, cta.header.waMessage)} className="w-full justify-center" onClick={close}>
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
