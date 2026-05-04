import { Fragment } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { brandPhotoAlts } from "@/lib/site-images";
import type { SitePresentation } from "@/lib/site-presentation";
import { waLink } from "@/lib/site";

export function HeroHome({ presentation }: { presentation: SitePresentation }) {
  const { heroImages } = presentation;
  const h = presentation.heroSection;

  return (
    <Fragment>
      <section
        className="hero-wash relative overflow-hidden border-b border-[color-mix(in_srgb,var(--color-border)_85%,transparent)]"
        aria-labelledby="hero-heading"
      >
        <Container className="grid gap-6 pb-8 pt-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-center md:gap-8 md:pb-10 md:pt-6 lg:gap-10">
          <div className="order-1 flex min-w-0 flex-col md:order-1">
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-primary sm:text-xs">{h.kicker}</p>
            <h1 id="hero-heading" className="heading-hero heading-hero--compact mt-2 max-w-xl md:mt-3">
              {h.title}
            </h1>
            <p className="mt-3 max-w-[34rem] font-sans text-[15px] font-normal leading-relaxed text-[var(--color-muted)] md:text-base">
              {h.subtitle}
            </p>

            <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
              <Button variant="cta" href={h.primaryHref} className="min-h-[48px] w-full justify-center sm:w-auto sm:min-w-[200px]">
                {h.primaryLabel}
              </Button>
              <Button
                variant="secondary"
                href={h.secondaryHref}
                className="min-h-[48px] w-full justify-center sm:w-auto sm:min-w-[200px]"
              >
                {h.secondaryLabel}
              </Button>
            </div>
            <p className="mt-2 font-sans text-xs text-[var(--color-muted)]">
              <a href={waLink(h.waPriceMessage)} className="font-semibold text-primary underline-offset-4 hover:underline">
                {h.waPriceLabel}
              </a>
            </p>
          </div>

          <div className="order-2 min-h-0 min-w-0 md:order-2">
            <div className="overflow-hidden rounded-2xl border border-[var(--color-border)] p-0 shadow-[0_12px_36px_-18px_rgb(var(--ink-shadow)/0.12)] md:rounded-[20px]">
              <ImageSlot
                src={heroImages.main}
                alt={brandPhotoAlts.heroOrchard}
                wrapperClassName="relative min-h-[200px] w-full md:min-h-[240px] lg:min-h-[260px]"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                imageClassName="object-cover object-center"
              />
            </div>
          </div>
        </Container>
      </section>

      <section
        className="border-b border-[color-mix(in_srgb,var(--color-border)_85%,transparent)] bg-[var(--color-bg)] py-6 md:py-8"
        aria-label="Menşe, paketleme ve fiyat özeti"
      >
        <Container>
          <ul className="grid gap-3 sm:grid-cols-3 sm:gap-4">
            {h.trustMicro.map((row) => (
              <li
                key={row.label}
                className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 shadow-[0_1px_3px_rgb(var(--ink-shadow)/0.05)]"
              >
                <span className="font-sans text-[10px] font-bold uppercase tracking-[0.14em] text-primary">{row.label}</span>
                <span className="mt-1 block font-sans text-sm font-medium leading-snug text-[var(--color-text)]">{row.text}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </Fragment>
  );
}
