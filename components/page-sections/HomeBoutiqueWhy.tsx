import { Container } from "@/components/ui/Container";

const bullets = [
  "Taze paketleme",
  "Kiloluk ve gramajlı satış",
  "Güvenli ödeme",
  "Hızlı kargo",
  "Gerçek ürün fotoğrafları",
  "Gaziantep yöresinden seçilmiş ürünler",
] as const;

export function HomeBoutiqueWhy() {
  return (
    <section className="border-b border-[var(--border-subtle)] bg-background py-10 md:py-14" aria-labelledby="why-boutique-heading">
      <Container>
        <h2 id="why-boutique-heading" className="font-serif text-[1.65rem] font-semibold text-foreground md:text-[2.1rem]">
          Neden Antep Fıstığını Bizden Almalısınız?
        </h2>
        <p className="mt-3 max-w-2xl font-sans text-sm leading-relaxed text-muted md:text-base">
          Pazaryeri kalabalığı yerine; net gramaj, görünür fiyat ve sade süreç. Sorularınız için doğrudan iletişim
          kanalları açık.
        </p>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {bullets.map((item) => (
            <li
              key={item}
              className="flex items-center gap-3 rounded-[var(--radius-card)] bg-[var(--paper)] px-4 py-3 font-sans text-sm font-medium text-foreground ring-1 ring-[var(--border-subtle)]"
            >
              <span className="flex h-2 w-2 shrink-0 rounded-full bg-primary" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
