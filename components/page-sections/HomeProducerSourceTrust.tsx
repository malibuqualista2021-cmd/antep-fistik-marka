import { Container } from "@/components/ui/Container";
import { producerSourceTrustSection } from "@/lib/copy";

export function HomeProducerSourceTrust() {
  return (
    <section
      className="border-b border-[var(--border-subtle)] bg-[color-mix(in_srgb,var(--paper)_65%,var(--cream))] py-9 md:py-11"
      aria-labelledby="producer-source-trust-heading"
    >
      <Container>
        <h2
          id="producer-source-trust-heading"
          className="max-w-3xl font-serif text-[1.45rem] font-semibold tracking-tight text-foreground md:text-[1.85rem]"
        >
          {producerSourceTrustSection.title}
        </h2>
        <ul className="mt-7 grid gap-4 sm:grid-cols-3">
          {producerSourceTrustSection.cards.map((card) => (
            <li
              key={card.title}
              className="flex flex-col rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--cream)] p-5 shadow-[var(--shadow-soft)] ring-1 ring-black/[0.03]"
            >
              <span
                className="mb-3 h-0.5 w-10 rounded-full bg-primary"
                aria-hidden
              />
              <h3 className="font-serif text-lg font-semibold tracking-tight text-foreground">{card.title}</h3>
              <p className="mt-2 font-sans text-sm leading-relaxed text-muted">{card.text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
