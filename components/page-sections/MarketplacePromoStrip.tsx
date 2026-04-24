import { Container } from "@/components/ui/Container";

const promos = [
  { title: "Perakende paketlerde", value: "1-3 iş günü kargo", tone: "bg-[#FCE8DC]" },
  { title: "Kabuklu ve iç fıstıkta", value: "Gramaj seçeneği", tone: "bg-[#E7F4DF]" },
  { title: "Hediye ve ikram için", value: "Paketli ürünler", tone: "bg-[#E8F0FF]" },
] as const;

export function MarketplacePromoStrip() {
  return (
    <section className="bg-background py-5" aria-label="Kampanya ve avantajlar">
      <Container>
        <div className="grid gap-3 md:grid-cols-3">
          {promos.map((promo) => (
            <div key={promo.title} className={`rounded-[14px] px-5 py-4 text-center ring-1 ring-black/[0.05] ${promo.tone}`}>
              <p className="font-sans text-sm font-semibold text-muted">{promo.title}</p>
              <p className="mt-1 font-serif text-2xl font-semibold text-primary">{promo.value}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
