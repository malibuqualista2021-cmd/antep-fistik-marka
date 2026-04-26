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
      className="hero-wash relative overflow-hidden border-b border-[color-mix(in_srgb,var(--walnut)_8%,transparent)]"
      aria-labelledby="hero-heading"
    >
      <Container className="grid gap-6 pt-4 pb-10 md:grid-cols-[1.08fr_0.92fr] md:items-center md:gap-10 md:pt-6 md:pb-12 lg:gap-12 lg:pt-7 lg:pb-14">
        <div className="order-2 flex min-w-0 flex-col md:order-1">
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-primary sm:text-xs">
            {heroCopy.kicker}
          </p>
          <h1 id="hero-heading" className="heading-hero mt-3 max-w-[min(100%,42rem)]">
            {heroCopy.title}
          </h1>
          <p className="mt-4 max-w-xl font-sans text-[0.9375rem] font-normal leading-relaxed text-muted sm:text-base">
            {heroCopy.subtitle}
          </p>

          <ul
            className="mt-5 flex flex-wrap gap-2"
            aria-label="Üretici ve menşe rozetleri"
          >
            {heroCopy.producerBadges.map((label) => (
              <li
                key={label}
                className="rounded-full border border-primary/25 bg-[color-mix(in_srgb,var(--primary)_8%,var(--cream))] px-3 py-1.5 font-sans text-[11px] font-semibold uppercase tracking-wide text-[var(--walnut)] sm:text-xs"
              >
                {label}
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button variant="cta" href={h.primaryHref} className="w-full justify-center sm:w-auto sm:min-w-[200px]">
              {h.primaryLabel}
            </Button>
            <Button variant="secondary" href={h.secondaryHref} className="w-full justify-center sm:w-auto sm:min-w-[200px]">
              {h.secondaryLabel}
            </Button>
          </div>
          <p className="mt-3 font-sans text-xs text-muted">
            Perakende için önce ürünleri inceleyin; mağazada gramaj seçerek sepete eklersiniz. Toptan talepte ikinci düğme ile teklif formuna gidin.
          </p>
          <p className="mt-4 font-sans text-sm text-muted">
            <a href={waLink(h.waPriceMessage)} className="font-semibold text-primary underline-offset-4 hover:underline">
              {h.waPriceLabel}
            </a>
          </p>

          <ul
            className="mt-8 grid gap-3 border-t border-black/[0.08] pt-6 sm:grid-cols-3"
            aria-label="Menşe, paketleme ve fiyat özeti"
          >
            {heroCopy.trustMicro.map((row) => (
              <li
                key={row.label}
                className="flex flex-col rounded-[var(--radius-card)] border border-[color-mix(in_srgb,var(--primary)_18%,var(--border-subtle))] bg-[color-mix(in_srgb,var(--cream)_88%,var(--paper))] p-4 shadow-[0_1px_0_rgb(43_26_18_/0.04)]"
              >
                <span className="font-sans text-[10px] font-bold uppercase tracking-[0.14em] text-primary">{row.label}</span>
                <span className="mt-2 font-sans text-sm font-medium leading-snug text-[var(--walnut)]">{row.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="order-1 min-h-0 min-w-0 md:order-2">
          <div className="image-frame bg-gradient-to-b from-[var(--paper)] to-background p-2 md:p-2.5">
            <div className="overflow-hidden rounded-[calc(var(--radius-xl)-6px)] ring-1 ring-black/[0.05]">
              <ImageSlot
                src={heroImages.main}
                alt={brandPhotoAlts.heroOrchard}
                wrapperClassName="aspect-[4/3] w-full md:aspect-[16/11]"
                sizes="(max-width: 768px) 100vw, 46vw"
                priority
                imageClassName="object-cover object-center"
              />
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <ImageSlot
                src={heroImages.packaging}
                alt={brandPhotoAlts.heroThumbKabuklu}
                wrapperClassName="aspect-[4/3] w-full rounded-[12px]"
                sizes="(max-width: 768px) 50vw, 23vw"
                imageClassName="object-cover object-center"
              />
              <ImageSlot
                src={heroImages.logistics}
                alt={brandPhotoAlts.heroThumbPackaging}
                wrapperClassName="aspect-[4/3] w-full rounded-[12px]"
                sizes="(max-width: 768px) 50vw, 23vw"
                imageClassName="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
