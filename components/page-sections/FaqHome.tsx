import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FaqAccordion } from "@/components/page-sections/FaqAccordion";
import { faqItems } from "@/lib/faq";

export function FaqHome() {
  const preview = faqItems.slice(0, 5);

  return (
    <section
      className="border-t border-black/5 bg-background py-11 md:py-16"
      aria-labelledby="faq-home-heading"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
          <div>
            <SectionHeading
              id="faq-home-heading"
              eyebrow="SSS"
              title="Sık sorulanlar"
              subtitle="Perakende sipariş, kargo, iade ve toptan teklif süreçleri için kısa yanıtlar."
            />
            <Link
              href="/sikca-sorulan-sorular"
              className="mt-6 inline-flex min-h-[44px] items-center font-sans text-sm font-semibold text-primary underline-offset-4 hover:underline"
            >
              Tüm sorulara git
            </Link>
          </div>
          <FaqAccordion items={preview} />
        </div>
      </Container>
    </section>
  );
}
