import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { cta } from "@/lib/cta";
import { heroCopy } from "@/lib/copy";
import { site, waLink } from "@/lib/site";

export function HeroHome() {
  const { heroImages } = site;
  const h = cta.home;

  return (
    <section
      className="hero-wash relative overflow-hidden border-b border-[var(--border-subtle)]"
      aria-labelledby="hero-heading"
    >
      <Container className="grid gap-8 py-10 md:grid-cols-[1.02fr_0.98fr] md:items-center md:gap-12 md:py-14 lg:py-[3.75rem]">
        <div className="order-2 flex min-w-0 flex-col md:order-1">
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--walnut)] sm:text-xs">
            {heroCopy.kicker}
          </p>
          <h1 id="hero-heading" className="heading-hero mt-3 max-w-[22ch] sm:max-w-none">
            {heroCopy.title}
          </h1>
          <p className="mt-4 max-w-xl font-sans text-[0.9375rem] font-normal leading-relaxed text-muted sm:text-base">
            {heroCopy.subtitle}
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button variant="cta" href={h.primaryHref} className="w-full justify-center sm:w-auto sm:min-w-[200px]">
              {h.primaryLabel}
            </Button>
            <Button variant="secondary" href={h.secondaryHref} className="w-full justify-center sm:w-auto sm:min-w-[200px]">
              {h.secondaryLabel}
            </Button>
          </div>
          <p className="mt-3 font-sans text-xs text-muted">
            Perakende: mağazada gramaj seçip sepete eklersiniz. Toptan: ayrı teklif formu ve süreç — üstteki ikinci düğme.
          </p>
          <p className="mt-4 font-sans text-sm text-muted">
            <a href={waLink(h.waPriceMessage)} className="font-semibold text-primary underline-offset-4 hover:underline">
              {h.waPriceLabel}
            </a>
          </p>

          <dl className="mt-8 grid gap-3 border-t border-black/[0.08] pt-6 sm:grid-cols-3">
            {heroCopy.trustMicro.map((row) => (
              <div key={row.label}>
                <dt className="font-sans text-[11px] font-bold uppercase tracking-wide text-muted">{row.label}</dt>
                <dd className="mt-1 font-sans text-sm font-medium text-foreground">{row.text}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="order-1 min-h-0 min-w-0 md:order-2">
          <div className="image-frame bg-gradient-to-b from-[var(--paper)] to-background p-2 md:p-2.5">
            <div className="overflow-hidden rounded-[calc(var(--radius-xl)-6px)] ring-1 ring-black/[0.05]">
              <ImageSlot
                src={heroImages.main}
                alt="Antep fıstığı — vitrin görseli"
                wrapperClassName="aspect-[4/3] w-full md:aspect-[16/11]"
                sizes="(max-width: 768px) 100vw, 46vw"
                priority
              />
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <ImageSlot
                src={heroImages.packaging}
                alt="Paketlenmiş Antep fıstığı"
                wrapperClassName="aspect-[4/3] w-full rounded-[12px]"
                sizes="(max-width: 768px) 50vw, 23vw"
              />
              <ImageSlot
                src={heroImages.logistics}
                alt="Sevkiyat ve depo ortamı"
                wrapperClassName="aspect-[4/3] w-full rounded-[12px]"
                sizes="(max-width: 768px) 50vw, 23vw"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
