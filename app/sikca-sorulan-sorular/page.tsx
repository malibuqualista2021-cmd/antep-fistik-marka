import type { Metadata } from "next";
import { FaqAccordion } from "@/components/page-sections/FaqAccordion";
import { Container } from "@/components/ui/Container";
import { faqItems } from "@/lib/faq";

export const metadata: Metadata = {
  title: "Sıkça sorulan sorular",
  description:
    "Tazelik, minimum sipariş, gönderim, ödeme ve teklif süreci hakkında cevaplar.",
};

export default function FaqPage() {
  return (
    <main id="icerik" className="pb-16">
      <section className="border-b border-black/5 bg-surface/30 py-12 md:py-14">
        <Container>
          <h1 className="font-serif text-[2.25rem] font-semibold text-foreground md:text-[3rem]">
            Sıkça sorulan sorular
          </h1>
          <p className="mt-3 max-w-2xl font-sans text-lg text-muted">
            Gerçek müşteri sorularına kısa ve net yanıtlar.
          </p>
        </Container>
      </section>
      <Container className="py-10 md:py-12">
        <FaqAccordion items={faqItems} />
      </Container>
    </main>
  );
}
