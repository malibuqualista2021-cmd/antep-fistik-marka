import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function WholesaleMiniCta() {
  return (
    <section
      className="border-t border-[var(--line-soft)] bg-primary py-10 text-[var(--color-fg-on-green)] md:py-12"
      aria-labelledby="wholesale-mini-heading"
    >
      <Container className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <p className="font-sans text-sm font-semibold uppercase tracking-[0.12em] text-on-green-muted">
            Toptan alım
          </p>
          <h2 id="wholesale-mini-heading" className="mt-2 font-serif text-2xl leading-tight text-on-green md:text-[2.1rem]">
            İşletme alımları için ayrı teklif süreci
          </h2>
          <p className="mt-3 font-sans text-sm leading-relaxed text-on-green-muted md:text-base">
            Koli, çuval ve palet alımlarında ürün türü, miktar ve teslim iline göre yazılı teklif alın.
          </p>
        </div>
        <Button
          variant="cta"
          href="/toptan-satis#teklif"
          className="w-full justify-center shadow-[0_2px_14px_color-mix(in_srgb,var(--cta)_42%,transparent)] md:w-auto"
        >
          Toptan teklif al
        </Button>
      </Container>
    </section>
  );
}
