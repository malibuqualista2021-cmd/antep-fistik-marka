import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { SectionShell } from "@/components/ui/SectionShell";
import { retailPath, wholesalePath } from "@/lib/home-sections";

export function RetailWholesaleSplit() {
  return (
    <SectionShell tone="muted" className="!bg-[color-mix(in_srgb,var(--surface)_65%,var(--background))]">
      <div className="max-w-3xl">
        <p className="font-sans text-sm font-medium uppercase tracking-[0.14em] text-accent">
          Perakende ve toptan
        </p>
        <h2 className="mt-2 font-serif text-[1.85rem] leading-tight text-foreground sm:text-[2.25rem] md:text-[2.65rem]">
          İki farklı alıcı, iki net akış
        </h2>
        <p className="mt-3 max-w-2xl font-sans text-base text-muted md:text-lg">
          Aynı ürün disiplini; farklı ambalaj ve teklif dili. Aşağıda hangi yoldan
          ilerlemeniz gerektiğini seçin — mesaj veya form her zaman şeffaf kalır.
        </p>
      </div>

      <div className="mt-10 grid gap-5 lg:grid-cols-2 lg:gap-6">
        <article className="card-elevated flex flex-col rounded-[var(--radius-xl)] p-6 md:p-8">
          <p className="font-sans text-xs font-semibold uppercase tracking-wider text-primary">
            {retailPath.eyebrow}
          </p>
          <h3 className="mt-2 font-serif text-2xl text-foreground">{retailPath.title}</h3>
          <p className="mt-3 font-sans text-sm leading-relaxed text-muted md:text-[0.95rem]">
            {retailPath.body}
          </p>
          <ul className="mt-4 space-y-2 font-sans text-sm text-foreground/90">
            {retailPath.bullets.map((b) => (
              <li key={b} className="flex gap-2">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden />
                {b}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button variant="primary" href={retailPath.ctaHref}>
              {retailPath.ctaLabel}
            </Button>
            <Button variant="secondary" href="/sepet">
              Sepeti görüntüle
            </Button>
          </div>
        </article>

        <article className="flex flex-col rounded-[var(--radius-xl)] border border-primary/20 bg-primary p-6 text-[var(--cream)] md:p-8">
          <p className="font-sans text-xs font-semibold uppercase tracking-wider text-[var(--cream)]/75">
            {wholesalePath.eyebrow}
          </p>
          <h3 className="mt-2 font-serif text-2xl leading-snug md:text-[1.65rem] lg:text-[1.85rem]">
            {wholesalePath.title}
          </h3>
          <p className="mt-3 font-sans text-sm leading-relaxed text-[var(--cream)]/88 md:text-[0.95rem]">
            {wholesalePath.body}
          </p>
          <ul className="mt-4 space-y-2 font-sans text-sm text-[var(--cream)]/90">
            {wholesalePath.bullets.map((b) => (
              <li key={b} className="flex gap-2">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden />
                {b}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button variant="cream" href={wholesalePath.ctaHref}>
              {wholesalePath.ctaLabel}
            </Button>
            <Button variant="outlineLight" href={wholesalePath.secondaryHref}>
              {wholesalePath.secondaryLabel}
            </Button>
          </div>
        </article>
      </div>
    </SectionShell>
  );
}
