import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

const choices = [
  {
    title: "Ev / Bireysel Alışveriş",
    text: "250 g, 500 g ve 1 kg paketleri sepete ekleyip sipariş verebilirsiniz.",
    cta: "Perakende ürünlere git",
    href: "/urunler",
  },
  {
    title: "Toptan / İşletme Alımı",
    text: "Koli, çuval ve palet alımlarında miktar ve teslim iline göre yazılı teklif alın.",
    cta: "Toptan teklif al",
    href: "/toptan-satis#teklif",
  },
] as const;

export function AudienceChoice() {
  return (
    <section className="border-b border-black/[0.06] bg-background py-8 md:py-10" aria-labelledby="audience-choice-heading">
      <Container>
        <h2 id="audience-choice-heading" className="sr-only">
          Alışveriş türünü seçin
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {choices.map((choice) => (
            <article key={choice.title} className="card-elevated rounded-[var(--radius-xl)] p-6 md:p-8">
              <h3 className="font-serif text-2xl text-foreground">{choice.title}</h3>
              <p className="mt-3 font-sans text-sm leading-relaxed text-muted md:text-base">{choice.text}</p>
              <Button href={choice.href} className="mt-5">
                {choice.cta}
              </Button>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
