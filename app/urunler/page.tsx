import type { Metadata } from "next";
import { ProductCard } from "@/components/ui/ProductCard";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { products } from "@/lib/products";
import { cta } from "@/lib/cta";

export const metadata: Metadata = {
  title: "Ürünler",
  description:
    "Antep iç fıstık, kabuklu, boz iç, perakende paketler ve toptan koli/çuval. Kullanım ve paket bilgisiyle karşılaştırın.",
};

const groups = [
  { id: "ic", title: "İç fıstık", slugs: ["antep-ic-fistik"] as const },
  { id: "kabuklu", title: "Kabuklu", slugs: ["kabuklu-antep-fistigi"] as const },
  { id: "boz", title: "Boz iç", slugs: ["boz-ic"] as const },
  { id: "perakende", title: "Perakende paketler", slugs: ["perakende-paketler"] as const },
  {
    id: "toptan",
    title: "Toptan koli & çuval",
    slugs: ["toptan-koli-cuval"] as const,
  },
];

export default function ProductsPage() {
  const intro = cta.productsPage;

  return (
    <main id="icerik" className="pb-16">
      <section className="border-b border-black/5 bg-surface/30 py-10 md:py-14">
        <Container>
          <h1 className="font-serif text-[2rem] font-semibold leading-tight text-foreground md:text-[2.75rem]">
            Ürünler
          </h1>
          <p className="mt-3 max-w-2xl font-sans text-base leading-relaxed text-muted md:text-lg">
            Önce kullanım alanınıza uygun grubu seçin. Her kartta kısa tanım,
            paket seçenekleri ve toptan uygunluk için yönlendirme yer alır.
            Fiyatlar ürün tipi, parti ve miktara göre teklifle netleşir.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button variant="primary" href={intro.introCtaHref}>
              {intro.introCtaLabel}
            </Button>
            <Button variant="secondary" href="/iletisim">
              Form ile talep
            </Button>
          </div>
        </Container>
      </section>

      {groups.map((group) => (
        <section
          key={group.id}
          id={group.id}
          aria-labelledby={`heading-${group.id}`}
          className="scroll-mt-24 border-b border-black/5 py-10 last:border-b-0 md:py-12"
        >
          <Container>
            <h2
              id={`heading-${group.id}`}
              className="font-serif text-2xl text-foreground md:text-3xl"
            >
              {group.title}
            </h2>
            <div className="mt-7 grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
              {group.slugs.map((slug) => {
                const p = products.find((x) => x.slug === slug);
                if (!p) return null;
                return <ProductCard key={p.slug} product={p} />;
              })}
            </div>
          </Container>
        </section>
      ))}
    </main>
  );
}
