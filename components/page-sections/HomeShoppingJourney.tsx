import Link from "next/link";
import { Container } from "@/components/ui/Container";

const blocks = [
  {
    title: "Nasıl sipariş verilir?",
    body: "Ürünler sayfasından gramajı seçin, sepete ekleyin ve teslimat bilgilerinizi girerek siparişi tamamlayın. Hazırlık ve kargo bilgisi sipariş sonrası paylaşılır.",
    href: "/urunler",
    cta: "Ürünlere git",
  },
  {
    title: "Taze paketleme ve kargo süreci",
    body: "Siparişler kontrol edildikten sonra paketlenir; Türkiye geneli gönderimde hedef 1–3 iş günü içinde kargoya verilmesidir (yoğunluk ve bölgeye göre değişebilir).",
    href: "/kargo-teslimat",
    cta: "Kargo ve teslimat",
  },
  {
    title: "Neden İnal Fıstık?",
    body: "Gaziantep merkezli seçim ve paketleme yaklaşımı; perakende paketlerde net gramaj ve şeffaf ürün bilgisi, toptanda ise yazılı teklif disiplini.",
    href: "/hakkimizda",
    cta: "Hakkımızda",
  },
  {
    title: "Perakende ve toptan alışveriş farkı",
    body: "Perakendede sepet ve hazır gramajlarla hızlı sipariş; toptanda miktar, ambalaj ve teslim ili ile teklif süreci ayrı yürütülür — iki kanal birbirinin yerine geçmez.",
    href: "/toptan-satis",
    cta: "Toptan süreci",
  },
] as const;

export function HomeShoppingJourney() {
  return (
    <section className="border-b border-black/5 bg-background py-11 md:py-14" aria-labelledby="journey-heading">
      <Container>
        <h2 id="journey-heading" className="font-serif text-[1.65rem] font-semibold text-foreground md:text-[2.1rem]">
          Mağazada bilmeniz gerekenler
        </h2>
        <p className="mt-2 max-w-2xl font-sans text-sm text-muted md:text-base">
          Ürün seçiminden teslimata kadar süreci netleştiren kısa rehber; tekrarlayan vitrin yerine tek bilgilendirme bloğu.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {blocks.map((block) => (
            <article
              key={block.title}
              className="flex flex-col rounded-[var(--radius-card)] bg-surface/60 p-5 ring-1 ring-black/[0.06] md:p-6"
            >
              <h3 className="font-serif text-lg text-foreground md:text-xl">{block.title}</h3>
              <p className="mt-2 flex-1 font-sans text-sm leading-relaxed text-muted">{block.body}</p>
              <Link
                href={block.href}
                className="mt-4 inline-flex min-h-[44px] items-center font-sans text-sm font-semibold text-primary hover:underline"
              >
                {block.cta} →
              </Link>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
