import { Container } from "@/components/ui/Container";

const samples = [
  {
    quote: "1 kg kavrulmuş fıstık aldım, tazeliği çok iyiydi. Paketleme sağlamdı.",
    who: "Ayşe K.",
    city: "İstanbul",
    product: "Kavrulmuş tuzlu kabuklu",
  },
  {
    quote: "Baklava için iç fıstık sipariş ettim; renk dengesi beklentime uygundu.",
    who: "Mehmet Y.",
    city: "Gaziantep",
    product: "Baklavalık iç",
  },
] as const;

export function HomeReviewSamples() {
  return (
    <section className="border-b border-[var(--border-subtle)] bg-[var(--cream)]/50 py-10 md:py-14" aria-labelledby="review-samples-heading">
      <Container>
        <h2 id="review-samples-heading" className="font-serif text-[1.65rem] font-semibold text-foreground md:text-[2.05rem]">
          Müşteri deneyimleri
        </h2>
        <p className="mt-2 font-sans text-xs font-medium text-muted">
          Aşağıdaki metinler yalnızca okuma örneğidir; doğrulanmış sipariş yorumları sisteme bağlandığında burada
          gösterilecektir.
        </p>
        <ul className="mt-8 grid gap-4 md:grid-cols-2">
          {samples.map((s) => (
            <li key={s.who} className="rounded-[var(--radius-card)] bg-background p-5 ring-1 ring-[var(--border-subtle)]">
              <p className="font-serif text-lg leading-snug text-foreground">“{s.quote}”</p>
              <p className="mt-4 font-sans text-sm text-muted">
                <span className="font-semibold text-foreground">{s.who}</span> · {s.city} · {s.product}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
