import { RetailProductGrid } from "@/components/shop/RetailProductGrid";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function HomeRetailShowcase() {
  return (
    <section className="border-b border-black/5 bg-surface/30 py-11 md:py-16" aria-labelledby="home-retail-heading">
      <Container>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="font-sans text-sm font-semibold uppercase tracking-[0.12em] text-accent">
              Perakende mağaza
            </p>
            <h2 id="home-retail-heading" className="mt-2 font-serif text-[1.9rem] leading-tight text-foreground md:text-[2.5rem]">
              Ev, ikram ve hediye için paketli Antep fıstığı
            </h2>
            <p className="mt-3 font-sans text-sm leading-relaxed text-muted md:text-base">
              Kabuklu, iç fıstık, boz iç ve hediye/paket seçeneklerinde gramajı seçin,
              sepete ekleyin ve siparişinizi tamamlayın.
            </p>
          </div>
          <Button href="/urunler">Tüm ürünleri gör</Button>
        </div>
        <div className="mt-8">
          <RetailProductGrid />
        </div>
      </Container>
    </section>
  );
}
