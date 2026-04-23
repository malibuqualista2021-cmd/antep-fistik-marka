import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { Badge } from "@/components/ui/Badge";
import { cta } from "@/lib/cta";
import { heroCopy } from "@/lib/copy";
import { site, waLink } from "@/lib/site";

const BADGES = ["Seçilmiş parti", "Gaziantep", "Türkiye geneli sevkiyat"] as const;

export function HeroHome() {
  const { heroImages } = site;
  const h = cta.home;

  return (
    <section
      className="hero-wash relative overflow-hidden border-b border-black/[0.06]"
      aria-labelledby="hero-heading"
    >
      <Container className="grid gap-8 py-10 md:grid-cols-[1.02fr_0.98fr] md:items-center md:gap-12 md:py-14 lg:py-[4.25rem]">
        <div className="order-2 flex min-w-0 flex-col md:order-1">
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-accent sm:text-xs">
            {heroCopy.kicker}
          </p>
          <h1
            id="hero-heading"
            className="mt-3 max-w-[20ch] font-serif text-[1.85rem] font-semibold leading-[1.08] tracking-tight text-foreground sm:max-w-none sm:text-[2.15rem] md:text-[2.55rem] lg:text-[2.85rem]"
          >
            {heroCopy.title}
          </h1>
          <p className="mt-4 max-w-xl font-sans text-[0.95rem] leading-relaxed text-muted sm:text-base md:text-[1.05rem]">
            {heroCopy.subtitle}
          </p>

          <ul className="mt-6 space-y-2.5 border-l-[3px] border-primary/30 pl-4 font-sans text-sm leading-snug text-foreground sm:text-[0.95rem]">
            <li>
              <span className="font-semibold text-primary">Ne? </span>
              İç, kabuklu, boz iç ve hazır perakende paketler.
            </li>
            <li>
              <span className="font-semibold text-primary">Kime? </span>
              Raf ve bireyselden baklavacı ve üreticiye.
            </li>
            <li>
              <span className="font-semibold text-primary">Nasıl? </span>
              Ürünü seçin; fiyat ve toptan için mesaj veya form ile netleştirin.
            </li>
          </ul>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button variant="primary" href={h.primaryHref} className="w-full justify-center sm:w-auto sm:min-w-[188px]">
              {h.primaryLabel}
            </Button>
            <Button variant="secondary" href={h.secondaryHref} className="w-full justify-center sm:w-auto sm:min-w-[188px]">
              {h.secondaryLabel}
            </Button>
          </div>
          <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8">
            <a
              href={waLink(h.waPriceMessage)}
              className="min-h-[44px] font-sans text-sm font-semibold text-primary underline-offset-4 hover:underline"
            >
              {h.waPriceLabel}
            </a>
            <Link
              href={h.sampleHref}
              className="min-h-[44px] font-sans text-sm font-semibold text-foreground underline decoration-primary/35 decoration-2 underline-offset-4 hover:text-primary"
            >
              {h.sampleLabel}
            </Link>
          </div>

          <dl className="mt-8 grid gap-3 border-t border-black/[0.08] pt-6 sm:grid-cols-3">
            {heroCopy.trustMicro.map((row) => (
              <div key={row.label}>
                <dt className="font-sans text-[11px] font-bold uppercase tracking-wide text-muted">
                  {row.label}
                </dt>
                <dd className="mt-1 font-sans text-sm font-medium text-foreground">{row.text}</dd>
              </div>
            ))}
          </dl>

          <ul className="mt-6 flex flex-wrap gap-2">
            {BADGES.map((b) => (
              <li key={b}>
                <Badge tone="accent">{b}</Badge>
              </li>
            ))}
          </ul>
        </div>

        <div className="order-1 min-h-0 min-w-0 md:order-2">
          <div className="image-frame bg-gradient-to-b from-surface/80 to-background p-2 md:p-2.5">
            <div className="overflow-hidden rounded-[calc(var(--radius-xl)-6px)] ring-1 ring-black/[0.05]">
              <ImageSlot
                src={heroImages.main}
                alt="Seçilmiş parti Antep fıstığı — ürün yakın çekim"
                wrapperClassName="aspect-[4/3] w-full md:aspect-[16/11]"
                sizes="(max-width: 768px) 100vw, 46vw"
                priority
              />
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <ImageSlot
                src={heroImages.packaging}
                alt="Paketlenmiş Antep fıstığı serisi"
                wrapperClassName="aspect-[4/3] w-full rounded-[12px]"
                sizes="(max-width: 768px) 50vw, 23vw"
              />
              <ImageSlot
                src={heroImages.logistics}
                alt="Toptan stok ve sevkiyat ortamı"
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
