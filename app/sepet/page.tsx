import type { Metadata } from "next";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { Container } from "@/components/ui/Container";
import { CartPageClient } from "@/components/shop/CartPageClient";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sepet",
  description: `${site.name} perakende ürün sepeti.`,
};

export default function CartPage() {
  return (
    <main id="icerik" className="pb-16">
      <section className="border-b border-black/5 bg-surface/30 py-10 md:py-12">
        <Container>
          <div className="flex flex-col gap-3">
            <BrandLogo variant="checkout" />
            <h1 className="font-serif text-[2rem] font-semibold text-foreground md:text-[2.75rem]">
              Sepet
            </h1>
          </div>
          <p className="mt-3 max-w-2xl font-sans text-base leading-relaxed text-muted">
            Ürün adetlerini kontrol edin, ardından teslimat bilgileriyle siparişi tamamlayın.
          </p>
        </Container>
      </section>
      <Container className="py-10 md:py-12">
        <CartPageClient />
      </Container>
    </main>
  );
}
