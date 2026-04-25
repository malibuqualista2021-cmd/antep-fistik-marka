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
    <section className="border-b border-[var(--border-subtle)] bg-[var(--paper)]/40 py-9 md:py-12" aria-labelledby="retail-trust-heading">
      <Container>
        <h2 id="retail-trust-heading" className="font-serif text-xl font-semibold text-foreground md:text-2xl">
          Paketleme ve güven
        </h2>
        <p className="mt-2 max-w-2xl font-sans text-sm text-muted">
          Yakın çekim ürün görselleri, paketleme disiplini ve kargo hazırlığı; gerçek satıcı hissi için vitrin ile aynı
          dili konuşuruz.
        </p>
        <ul className="mt-8 grid gap-4 md:grid-cols-4">
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
