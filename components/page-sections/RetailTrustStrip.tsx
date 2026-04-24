import { Container } from "@/components/ui/Container";

const items = [
  {
    title: "Güvenli sipariş",
    text: "Sepet ve teslimat bilgileriyle sipariş kaydı alınır; destek hattı açıktır.",
  },
  {
    title: "Taze paketleme",
    text: "Ürünler gramaj ve paket tipine göre hazırlanır; stok bilgisi sipariş sürecinde korunur.",
  },
  {
    title: "Türkiye geneli kargo",
    text: "Perakende paketlerde 1-3 iş günü içinde kargo hedeflenir.",
  },
  {
    title: "WhatsApp destek",
    text: "Sipariş öncesi ve sonrası destek için hızlı iletişim kanalı.",
  },
] as const;

export function RetailTrustStrip() {
  return (
    <section className="border-b border-black/5 bg-background py-9 md:py-12" aria-labelledby="retail-trust-heading">
      <Container>
        <h2 id="retail-trust-heading" className="sr-only">
          Perakende alışveriş güven unsurları
        </h2>
        <ul className="grid gap-4 md:grid-cols-4">
          {items.map((item) => (
            <li key={item.title} className="card-elevated rounded-[var(--radius-card)] p-5">
              <h3 className="font-serif text-xl text-foreground">{item.title}</h3>
              <p className="mt-2 font-sans text-sm leading-relaxed text-muted">{item.text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
