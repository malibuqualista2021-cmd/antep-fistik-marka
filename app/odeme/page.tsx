import type { Metadata } from "next";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { Container } from "@/components/ui/Container";
import { CheckoutPageClient } from "@/components/shop/CheckoutPageClient";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Siparişi tamamla",
  description: `${site.name} perakende checkout: teslimat, fatura, özet ve ödeme yöntemi seçimi.`,
};

export default function CheckoutPage() {
  return (
    <main id="icerik" className="pb-16">
      <section className="border-b border-[var(--line-soft)] bg-surface/30 py-10 md:py-12">
        <Container>
          <div className="flex flex-col gap-3">
            <BrandLogo variant="checkout" />
            <h1 className="font-serif text-[2rem] font-semibold text-foreground md:text-[2.75rem]">
              Siparişi tamamla
            </h1>
          </div>
          <p className="mt-3 max-w-2xl font-sans text-base leading-relaxed text-muted">
            Sepetinizi kontrol edin; teslimat ve fatura bilgilerini adım adım girin. Ödeme altyapısı
            anlaşması tamamlanınca tahsilat adımı bağlanacaktır.
          </p>
        </Container>
      </section>
      <Container className="py-10 md:py-12">
        <CheckoutPageClient />
      </Container>
    </main>
  );
}
