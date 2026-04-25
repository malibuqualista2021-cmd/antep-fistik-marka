import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { CheckoutPageClient } from "@/components/shop/CheckoutPageClient";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Siparişi tamamla",
  description: `${site.name} perakende sipariş bilgileri ve mock ödeme adımı.`,
};

export default function CheckoutPage() {
  return (
    <main id="icerik" className="pb-16">
      <section className="border-b border-black/5 bg-surface/30 py-10 md:py-12">
        <Container>
          <h1 className="font-serif text-[2rem] font-semibold text-foreground md:text-[2.75rem]">
            Siparişi tamamla
          </h1>
          <p className="mt-3 max-w-2xl font-sans text-base leading-relaxed text-muted">
            Teslimat bilgilerini girin, sipariş özetini kontrol edin ve güvenli sipariş
            kaydınızı oluşturun.
          </p>
        </Container>
      </section>
      <Container className="py-10 md:py-12">
        <CheckoutPageClient />
      </Container>
    </main>
  );
}
