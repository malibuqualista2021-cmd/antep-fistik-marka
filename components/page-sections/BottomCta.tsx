"use client";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { useSitePresentation } from "@/components/layout/SitePresentationContext";
import { cta } from "@/lib/cta";
import { waLinkResolved } from "@/lib/storefront-contact";

const ghostOnGreen =
  "!min-h-[48px] !border !border-[color-mix(in_srgb,var(--color-fg-on-green)_52%,transparent)] !bg-transparent !px-5 !text-[var(--color-fg-on-green)] hover:!bg-[color-mix(in_srgb,var(--color-fg-on-green)_12%,transparent)]";

const outlineOnGreen =
  "!min-h-[48px] !border-2 !border-[color-mix(in_srgb,var(--color-fg-on-green)_82%,transparent)] !bg-transparent !px-5 !text-[var(--color-fg-on-green)] hover:!bg-[color-mix(in_srgb,var(--color-fg-on-green)_10%,transparent)]";

const secondaryOnGreen =
  "!min-h-[48px] !border-2 !border-[var(--color-fg-on-green)] !bg-[var(--color-fg-on-green)] !px-5 !text-primary hover:!bg-[var(--color-surface-on-green-hover)]";

export function BottomCta() {
  const b = cta.bottomCta;
  const { contact } = useSitePresentation();

  return (
    <section className="pb-12 pt-2 md:pb-16" aria-labelledby="bottom-cta-heading">
      <Container>
        <div className="rounded-[var(--radius-card)] bg-primary px-5 py-9 text-center shadow-[var(--shadow-soft)] md:px-12 md:py-12">
          <h2 id="bottom-cta-heading" className="font-serif text-[1.5rem] leading-tight text-on-green sm:text-[1.95rem] md:text-[2.25rem]">
            {b.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-sans text-sm leading-relaxed text-on-green-muted sm:text-base">
            {b.subtitle}
          </p>
          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
            <Button variant="cta" href="/urunler" className="w-full justify-center shadow-[0_2px_14px_color-mix(in_srgb,var(--cta)_42%,transparent)] sm:w-auto">
              Perakende ürünleri gör
            </Button>
            {contact.whatsappE164 ? (
              <Button
                variant="secondary"
                href={waLinkResolved(contact, b.primaryWaMessage)}
                className={`${secondaryOnGreen} w-full sm:w-auto`}
                aria-label={b.primaryWaLabel}
              >
                {b.primaryWaLabel}
              </Button>
            ) : null}
            {contact.phoneDisplay && contact.phoneE164 ? (
              <Button
                variant="secondary"
                href={`tel:${contact.phoneE164}`}
                className={`${outlineOnGreen} w-full sm:w-auto`}
                aria-label={`${b.phoneLabel}: ${contact.phoneDisplay}`}
              >
                {b.phoneLabel}
              </Button>
            ) : null}
            <Button variant="ghost" href={b.formHref} className={`${ghostOnGreen} w-full sm:w-auto`}>
              {b.formLabel}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
