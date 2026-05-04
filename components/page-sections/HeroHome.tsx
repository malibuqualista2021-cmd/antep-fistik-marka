import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { cta } from "@/lib/cta";
import { heroCopy } from "@/lib/copy";
import { brandPhotoAlts } from "@/lib/site-images";
import { site, waLink } from "@/lib/site";

export function HeroHome() {
  const { heroImages } = site;
  const h = cta.home;

  return (
    <section
      className="hero-wash relative overflow-hidden border-b border-[color-mix(in_srgb,var(--color-border)_85%,transparent)]"
      aria-labelledby="hero-heading"
    >
      <Container className="grid gap-8 pb-12 pt-8 md:grid-cols-[minmax(0,52%)_minmax(0,48%)] md:items-start md:gap-10 md:pb-14 md:pt-10 lg:gap-12 lg:pb-[4.5rem] lg:pt-12">
        <div className="order-2 flex min-w-0 flex-col md:order-1">
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-primary sm:text-xs">
            {heroCopy.kicker}
          </p>
          <h1 id="hero-heading" className="heading-hero mt-3 max-w-[min(100%,40rem)] md:mt-4">
            {heroCopy.title}
          </h1>
          <p className="mt-4 max-w-[620px] font-sans text-[17px] font-normal leading-[1.62] text-[var(--color-muted)] sm:text-[17.5px] md:text-lg">
            {heroCopy.subtitle}
          </p>

          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Üretici ve menşe rozetleri">
            {heroCopy.producerBadges.map((label) => (
              <li key={label} className="hero-trust-pill">
                {label}
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button variant="cta" href={h.primaryHref} className="w-full justify-center shadow-sm sm:w-auto sm:min-w-[200px]">
              {h.primaryLabel}
            </Button>
            <Button variant="secondary" href={h.secondaryHref} className="w-full justify-center shadow-sm sm:w-auto sm:min-w-[200px]">
              {h.secondaryLabel}
            </Button>
          </div>
          <p className="mt-3 max-w-xl font-sans text-[15px] leading-relaxed text-[var(--color-muted)]">
            {heroCopy.ctaNote}
          </p>
          <p className="mt-4 font-sans text-sm text-[var(--color-muted)]">
            <a href={waLink(h.waPriceMessage)} className="font-semibold text-primary underline-offset-4 hover:underline">
              {h.waPriceLabel}
            </a>
          </p>

          <ul
            className="mt-8 grid gap-4 border-t border-[color-mix(in_srgb,var(--color-border)_90%,transparent)] pt-8 sm:grid-cols-3 sm:gap-4"
            aria-label="Menşe, paketleme ve fiyat özeti"
          >
            {heroCopy.trustMicro.map((row) => (
              <li key={row.label} className="hero-trust-card flex flex-col">
                <span className="font-sans text-[10px] font-bold uppercase tracking-[0.14em] text-primary">{row.label}</span>
                <span className="mt-2 font-sans text-[15px] font-medium leading-snug text-[var(--color-text)]">{row.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="order-1 min-h-0 min-w-0 md:order-2">
          <div className="rounded-[20px] border border-[color-mix(in_srgb,var(--color-border)_88%,transparent)] bg-[var(--color-surface)] p-2 shadow-[0_8px_28px_rgb(42_27_18_/0.06)] sm:p-2.5 md:p-3">
            <div className="overflow-hidden rounded-[18px] ring-1 ring-[color-mix(in_srgb,var(--color-border)_70%,transparent)]">
              <ImageSlot
                src={heroImages.main}
                alt={brandPhotoAlts.heroOrchard}
                wrapperClassName="aspect-[5/4] w-full max-h-[min(52vw,16rem)] sm:aspect-[4/3] sm:max-h-[min(48vw,18rem)] md:aspect-[16/11] md:max-h-[min(34vh,17rem)] lg:max-h-[min(36vh,18rem)]"
                sizes="(max-width: 768px) 100vw, 42vw"
                priority
                imageClassName="object-cover object-center"
              />
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2 sm:mt-2.5 sm:gap-2.5">
              <ImageSlot
                src={heroImages.packaging}
                alt={brandPhotoAlts.heroThumbKabuklu}
                wrapperClassName="aspect-[3/2] w-full overflow-hidden rounded-[14px] ring-1 ring-[color-mix(in_srgb,var(--color-border)_65%,transparent)] sm:rounded-[16px]"
                sizes="(max-width: 768px) 50vw, 21vw"
                imageClassName="object-cover object-center"
              />
              <ImageSlot
                src={heroImages.logistics}
                alt={brandPhotoAlts.heroThumbPackaging}
                wrapperClassName="aspect-[3/2] w-full overflow-hidden rounded-[14px] ring-1 ring-[color-mix(in_srgb,var(--color-border)_65%,transparent)] sm:rounded-[16px]"
                sizes="(max-width: 768px) 50vw, 21vw"
                imageClassName="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
