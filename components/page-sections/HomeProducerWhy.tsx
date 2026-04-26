import { Container } from "@/components/ui/Container";
import { producerWhySection } from "@/lib/copy";

export function HomeProducerWhy() {
  return (
    <section className="border-b border-[var(--border-subtle)] bg-[var(--paper)]/50 py-10 md:py-14" aria-labelledby="producer-why-heading">
      <Container>
        <h2 id="producer-why-heading" className="font-serif text-[1.6rem] font-semibold tracking-tight text-foreground md:text-[2.05rem]">
          {producerWhySection.title}
        </h2>
        <p className="mt-3 max-w-2xl font-sans text-sm leading-relaxed text-muted md:text-base">{producerWhySection.subtitle}</p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {producerWhySection.cards.map((card) => (
            <li
              key={card.title}
              className="flex flex-col rounded-[var(--radius-card)] bg-[var(--cream)] p-5 ring-1 ring-[var(--border-subtle)]"
            >
              <h3 className="font-serif text-lg font-semibold tracking-tight text-foreground">{card.title}</h3>
              <p className="mt-2 flex-1 font-sans text-sm leading-relaxed text-muted">{card.text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
