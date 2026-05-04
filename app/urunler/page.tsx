import type { Metadata } from "next";
import { Suspense } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { RetailStore } from "@/components/shop/RetailStore";
import { getRetailProducts } from "@/lib/catalog/get-retail-products";
import { getSitePresentation } from "@/lib/site-presentation";

export const metadata: Metadata = {
  title: "Ürünler",
  description:
    "Gramaj seçin, sepete ekleyin. Antep fıstığı perakende mağaza — kargo, güvenli ödeme ve WhatsApp destek.",
};

export default async function ProductsPage() {
  const catalog = await getRetailProducts();
  const presentation = await getSitePresentation();

  return (
    <main id="icerik" className="pb-16">
      <section className="border-b border-[var(--line-soft)] bg-[var(--color-surface)] py-6 md:py-8">
        <Container className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="min-w-0">
            <p className="font-sans text-xs font-bold uppercase tracking-wide text-primary">{presentation.branding.shortName} Mağazası</p>
            <h1 className="mt-1 font-sans text-2xl font-bold tracking-tight text-foreground md:text-3xl">Tüm ürünler</h1>
            <p className="mt-2 max-w-2xl font-sans text-sm text-muted md:text-base">
              Soldan filtreleyin; gramaj ve fiyatı görün, turuncu düğmeyle sepete ekleyin. Toptan alımlar için ayrı teklif formu kullanılır.
            </p>
          </div>
          <Button variant="secondary" href="/toptan-satis#teklif" className="w-full shrink-0 justify-center md:w-auto md:min-w-[200px]">
            Toptan teklif al
          </Button>
        </Container>
      </section>

      <section id="perakende-satin-al" className="scroll-mt-24 py-8 md:py-10" aria-labelledby="perakende-heading">
        <Container>
          <h2 id="perakende-heading" className="sr-only">
            Ürün listesi ve filtreler
          </h2>
          <Suspense
            fallback={<div className="min-h-[320px] animate-pulse rounded-xl bg-[var(--paper)] ring-1 ring-[var(--border-subtle)]" />}
          >
            <RetailStore catalog={catalog} categories={presentation.categories} />
          </Suspense>
        </Container>
      </section>
    </main>
  );
}
