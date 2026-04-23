import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const segments = [
  {
    title: "Baklavacı ve tatlı üreticileri",
    text: "İç fıstık ve boz içte parti uyumu; üretim takvimine göre sevkiyat penceresi.",
  },
  {
    title: "Kuruyemiş perakende ve toptan",
    text: "Kabuklu ve iç üründe raf veya teşhir ihtiyacına göre paket ve gramaj.",
  },
  {
    title: "Gıda üretimi ve ikram",
    text: "Dolgu, dondurma ve endüstriyel kullanım için torba / parti yapısı.",
  },
  {
    title: "Bireysel ve online satış",
    text: "Hazır perakende paketler; etiket ve son kullanıcı bilgisiyle düzenli seri.",
  },
] as const;

export function TrustClientSegments() {
  return (
    <section className="py-10 md:py-14" aria-labelledby="segments-heading">
      <Container>
        <SectionHeading
          id="segments-heading"
          eyebrow="Müşteri profili"
          title="Kimlerle çalışıyoruz?"
          subtitle="Logo veya isim paylaşmadan, sık talep aldığımız işletme tipleri. Referans veya ziyaret talepleri doğrudan iletişimle değerlendirilir."
        />
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {segments.map((s) => (
            <li
              key={s.title}
              className="rounded-[var(--radius-card)] border border-black/[0.06] bg-background p-4 ring-1 ring-black/[0.04]"
            >
              <h3 className="font-serif text-lg text-foreground">{s.title}</h3>
              <p className="mt-2 font-sans text-sm leading-relaxed text-muted">{s.text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
