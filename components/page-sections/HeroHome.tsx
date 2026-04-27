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
      <Container className="grid gap-4 pt-3 pb-6 md:grid-cols-[1fr_0.92fr] md:items-start md:gap-6 md:pt-4 md:pb-8 lg:gap-8 lg:pt-5 lg:pb-10">
        <div className="order-2 flex min-w-0 flex-col md:order-1 md:max-w-[min(100%,36rem)] lg:max-w-none">
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-primary sm:text-xs">
            {heroCopy.kicker}
          </p>
          <h1 id="hero-heading" className="heading-hero mt-2 max-w-[min(100%,40rem)] md:mt-2.5">
            {heroCopy.title}
          </h1>
          <p className="mt-3 max-w-xl font-sans text-[0.9375rem] font-normal leading-relaxed text-muted sm:text-base">
            {heroCopy.subtitle}
          </p>

          <ul
            className="mt-3 flex flex-wrap gap-1.5 sm:gap-2"
            aria-label="Üretici ve menşe rozetleri"
          >
            {heroCopy.producerBadges.map((label) => (
              <li
                key={label}
                className="rounded-full border border-primary/25 bg-[color-mix(in_srgb,var(--primary)_8%,var(--cream))] px-2.5 py-1 font-sans text-[10px] font-semibold uppercase tracking-wide text-[var(--walnut)] sm:px-3 sm:py-1.5 sm:text-xs"
              >
                {label}
              </li>
            ))}
          </ul>

          <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-3">
            <Button variant="cta" href={h.primaryHref} className="w-full justify-center sm:w-auto sm:min-w-[180px]">
              {h.primaryLabel}
            </Button>
            <Button variant="secondary" href={h.secondaryHref} className="w-full justify-center sm:w-auto sm:min-w-[180px]">
              {h.secondaryLabel}
            </Button>
          </div>
          <p className="mt-2 max-w-xl font-sans text-[11px] leading-snug text-muted sm:text-xs">
            Perakende için önce ürünleri inceleyin; mağazada gramaj seçerek sepete eklersiniz. Toptan talepte ikinci düğme ile teklif formuna gidin.
          </p>
          <p className="mt-2.5 font-sans text-xs text-muted sm:text-sm">
            <a href={waLink(h.waPriceMessage)} className="font-semibold text-primary underline-offset-4 hover:underline">
              {h.waPriceLabel}
            </a>
          </p>

          <ul
            className="mt-5 grid gap-2 border-t border-black/[0.08] pt-4 sm:grid-cols-3 sm:gap-2.5"
            aria-label="Menşe, paketleme ve fiyat özeti"
          >
            {heroCopy.trustMicro.map((row) => (
              <li
                key={row.label}
                className="flex flex-col rounded-[var(--radius-card)] border border-[color-mix(in_srgb,var(--primary)_18%,var(--border-subtle))] bg-[color-mix(in_srgb,var(--cream)_88%,var(--paper))] p-3 shadow-[0_1px_0_rgb(43_26_18_/0.04)] sm:p-3.5"
              >
                <span className="font-sans text-[10px] font-bold uppercase tracking-[0.14em] text-primary">{row.label}</span>
                <span className="mt-1.5 font-sans text-xs font-medium leading-snug text-[var(--walnut)] sm:text-sm">{row.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="order-1 min-h-0 min-w-0 md:order-2">
          <div className="image-frame bg-gradient-to-b from-[var(--paper)] to-background p-1.5 sm:p-2 md:p-2">
            <div className="overflow-hidden rounded-[calc(var(--radius-xl)-6px)] ring-1 ring-black/[0.05]">
              <ImageSlot
                src={heroImages.main}
                alt={brandPhotoAlts.heroOrchard}
                wrapperClassName="aspect-[5/4] w-full max-h-[min(52vw,15.5rem)] sm:max-h-[min(48vw,17rem)] md:aspect-[21/9] md:max-h-[min(26vh,15rem)] lg:max-h-[min(28vh,16.5rem)]"
                sizes="(max-width: 768px) 100vw, 42vw"
                priority
                imageClassName="object-cover object-center"
              />
            </div>
            <div className="mt-1.5 grid grid-cols-2 gap-1.5 sm:mt-2 sm:gap-2">
              <ImageSlot
                src={heroImages.packaging}
                alt={brandPhotoAlts.heroThumbKabuklu}
                wrapperClassName="aspect-[3/2] w-full max-h-[7.5rem] rounded-[10px] sm:max-h-[8.5rem] md:max-h-[6.5rem] md:rounded-[12px]"
                sizes="(max-width: 768px) 50vw, 21vw"
                imageClassName="object-cover object-center"
              />
              <ImageSlot
                src={heroImages.logistics}
                alt={brandPhotoAlts.heroThumbPackaging}
                wrapperClassName="aspect-[3/2] w-full max-h-[7.5rem] rounded-[10px] sm:max-h-[8.5rem] md:max-h-[6.5rem] md:rounded-[12px]"
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
