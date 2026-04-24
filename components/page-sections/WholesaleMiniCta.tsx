import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function WholesaleMiniCta() {
  return (
    <section className="border-t border-black/5 bg-primary py-10 text-[var(--cream)] md:py-12" aria-labelledby="wholesale-mini-heading">
      <Container className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <p className="font-sans text-sm font-semibold uppercase tracking-[0.12em] text-[var(--cream)]/75">
            Toptan alım
          </p>
          <h2 id="wholesale-mini-heading" className="mt-2 font-serif text-2xl leading-tight md:text-[2.1rem]">
            İşletme alımları için ayrı teklif süreci
          </h2>
          <p className="mt-3 font-sans text-sm leading-relaxed text-[var(--cream)]/85 md:text-base">
            Koli, çuval ve palet alımlarında ürün türü, miktar ve teslim iline göre yazılı teklif alın.
          </p>
        </div>
        <Button variant="cream" href="/toptan-satis#teklif" className="w-full justify-center md:w-auto">
          Toptan teklif al
        </Button>
      </Container>
    </section>
  );
}
