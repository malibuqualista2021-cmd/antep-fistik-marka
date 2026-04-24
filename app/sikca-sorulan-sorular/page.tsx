import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { faqItems } from "@/lib/faq";
import { FaqTabs } from "@/components/page-sections/FaqTabs";

export const metadata: Metadata = {
  title: "Sıkça sorulan sorular",
  description:
    "Tazelik, minimum sipariş, gönderim, ödeme ve teklif süreci hakkında cevaplar.",
};

export default function FaqPage() {
  const groups = [
    {
      id: "retail",
      label: "Perakende Sipariş",
      items: faqItems.filter((item) =>
        [
          "Sitede fiyat görmüyorum; nasıl teklif alırım?",
          "Form mu, WhatsApp mı daha hızlı?",
          "Türkiye geneline gönderim yapıyor musunuz?",
          "Ödeme seçenekleri nelerdir?",
          "Kargo veya ambar hasarında süreç nasıl ilerler?",
          "Kurumsal hediye veya etiketli paket yapılır mı?",
          "Siparişten sonra ortalama çıkış süresi nedir?",
        ].includes(item.q),
      ),
    },
    {
      id: "wholesale",
      label: "Toptan Satış",
      items: faqItems.filter((item) =>
        [
          "Toptan için minimum sipariş var mı?",
          "Numune gönderiyor musunuz?",
          "Numune ücretli mi?",
          "Toptan siparişte fatura kesiliyor mu?",
          "Düzenli alımda aynı parti/kalite sürekliliği nasıl planlanır?",
          "Fiyat teklifi ne kadar süre geçerlidir?",
        ].includes(item.q),
      ),
    },
    {
      id: "product",
      label: "Ürün & Saklama",
      items: faqItems.filter((item) =>
        [
          "Ürünler ne kadar taze?",
          "Ürün fotoğrafları gerçek parti mi, temsilî mi?",
          "Ürünleri nasıl saklamalıyım?",
        ].includes(item.q),
      ),
    },
    {
      id: "shipping",
      label: "Kargo & İade",
      items: faqItems.filter((item) =>
        [
          "Türkiye geneline gönderim yapıyor musunuz?",
          "Kargo veya ambar hasarında süreç nasıl ilerler?",
          "Ürünleri nasıl saklamalıyım?",
        ].includes(item.q),
      ),
    },
  ];

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
        <FaqTabs groups={groups} />
      </Container>
    </main>
  );
}
