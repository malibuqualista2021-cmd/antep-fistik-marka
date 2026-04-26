import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { RetailStore } from "@/components/shop/RetailStore";
import { brandPhotoAlts, brandPhotos } from "@/lib/site-images";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Ürünler",
  description:
    "Perakende: gramaj seçip sepete ekleyerek sipariş. Toptan: koli ve palet için ayrı teklif formu — iki akış birbirinden bağımsızdır.",
};

export default function ProductsPage() {
  return (
    <main id="icerik" className="pb-16">
      <section className="border-b border-black/5 bg-surface/30 py-10 md:py-14">
        <Container>
          <p className="font-sans text-sm font-semibold uppercase tracking-[0.12em] text-accent">
            {site.shortName} Mağazası
          </p>
          <h1 className="font-serif text-[2rem] font-semibold leading-tight text-foreground md:text-[2.75rem]">
            Perakende Ürünler
          </h1>
          <p className="mt-3 max-w-2xl font-sans text-base leading-relaxed text-muted md:text-lg">
            Ev, ikram ve hediye için uygun gramajı seçin, ürünleri sepete ekleyin
            ve siparişinizi tamamlayın.
          </p>
          <div className="mt-5 grid gap-3 font-sans text-sm text-muted sm:grid-cols-3">
            <div className="rounded-[12px] bg-background px-4 py-3 ring-1 ring-black/5">Güvenli sipariş</div>
            <div className="rounded-[12px] bg-background px-4 py-3 ring-1 ring-black/5">1-3 iş günü kargo</div>
            <div className="rounded-[12px] bg-background px-4 py-3 ring-1 ring-black/5">WhatsApp destek</div>
          </div>

          <div className="relative mt-8 aspect-[2/1] w-full max-h-[min(26rem,48vh)] min-h-0 overflow-hidden rounded-[var(--radius-xl)] ring-1 ring-[var(--border-subtle)] md:aspect-[21/9]">
            <Image
              src={brandPhotos.storeRange}
              alt={brandPhotoAlts.storeRange}
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, min(1200px, 92vw)"
              loading="lazy"
            />
          </div>

          <div className="mt-8 flex flex-col gap-4 rounded-[var(--radius-card)] bg-[var(--paper)] p-5 ring-1 ring-[var(--border-subtle)] md:flex-row md:items-center md:justify-between md:p-6">
            <div className="min-w-0">
              <p className="font-sans text-[11px] font-bold uppercase tracking-wide text-[var(--walnut)]">Toptan satış</p>
              <p className="mt-2 max-w-xl font-sans text-sm leading-relaxed text-muted md:text-base">
                Bu sayfadaki ürünler perakende sepet akışı içindir. İşletme alımlarında miktar, ambalaj ve teslim ili için{" "}
                <strong className="font-semibold text-foreground">ayrı teklif</strong> alınır; sepete eklemezsiniz.
              </p>
            </div>
            <Button variant="secondary" href="/toptan-satis#teklif" className="w-full shrink-0 justify-center md:w-auto md:min-w-[200px]">
              Toptan teklif al
            </Button>
          </div>
        </Container>
      </section>

      <section
        id="perakende-satin-al"
        className="scroll-mt-24 border-b border-black/5 py-10 md:py-12"
        aria-labelledby="perakende-heading"
      >
        <Container>
          <div className="max-w-3xl">
            <p className="font-sans text-sm font-semibold uppercase tracking-[0.12em] text-accent">
              Perakende satış
            </p>
            <h2 id="perakende-heading" className="mt-2 font-serif text-2xl text-foreground md:text-[2.35rem]">
              Perakende: sepete ekle, siparişi tamamla
            </h2>
            <p className="mt-3 font-sans text-sm leading-relaxed text-muted md:text-base">
              Ev, ikram ve hediye için uygun gramajı seçin, sepetinize ekleyin ve
              teslimat bilgileriyle siparişinizi tamamlayın. Kargo ve ödeme bilgileri
              sipariş adımında net şekilde gösterilir.
            </p>
          </div>
          <div className="mt-8">
            <Suspense fallback={<div className="min-h-[320px] animate-pulse rounded-[var(--radius-xl)] bg-[var(--paper)] ring-1 ring-[var(--border-subtle)]" />}>
              <RetailStore />
            </Suspense>
          </div>
        </Container>
      </section>
    </main>
  );
}
