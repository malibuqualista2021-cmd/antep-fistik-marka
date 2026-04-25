import { Container } from "@/components/ui/Container";

const promos = [
  { title: "Kargo", value: "500 TL üzeri ücretsiz kargo", tone: "bg-[var(--paper)]" },
  { title: "Paketleme", value: "Taze ve hijyenik paket", tone: "bg-[var(--cream)]" },
  { title: "Ödeme", value: "Güvenli sipariş süreci", tone: "bg-[var(--surface)]" },
] as const;

export function MarketplacePromoStrip() {
  return (
    <section className="border-b border-[var(--border-subtle)] bg-background/90 py-4" aria-label="Hızlı bilgiler">
      <Container>
        <div className="grid gap-3 md:grid-cols-3">
          {promos.map((promo) => (
            <div
              key={promo.title}
              className={`rounded-[14px] px-4 py-3 text-center ring-1 ring-[var(--border-subtle)] ${promo.tone}`}
            >
              <p className="font-sans text-xs font-semibold uppercase tracking-wide text-muted">{promo.title}</p>
              <p className="mt-1 font-serif text-lg font-semibold text-primary md:text-xl">{promo.value}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
