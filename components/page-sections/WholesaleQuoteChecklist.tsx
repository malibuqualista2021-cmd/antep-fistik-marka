import { Container } from "@/components/ui/Container";

const ITEMS = [
  {
    title: "İşletme ve iletişim",
    text: "Unvan veya işletme adı, yetkili adı, telefon veya WhatsApp.",
  },
  {
    title: "Ürün ve kullanım",
    text: "Ürün grubu (iç / kabuklu / boz iç / paket) ve kullanım alanı (ör. baklava hattı, raf, dolgu).",
  },
  {
    title: "Miktar ve ambalaj",
    text: "Yaklaşık miktar (aylık veya seferlik), tercih edilen ambalaj (torba, koli, palet).",
  },
  {
    title: "Teslim",
    text: "Teslim ili veya bölge, istenen tarih penceresi, nakliye tercihi (varsa).",
  },
] as const;

export function WholesaleQuoteChecklist() {
  return (
    <section className="border-b border-black/[0.06] bg-surface/40 py-10 md:py-12" aria-labelledby="teklif-4-heading">
      <Container>
        <h2 id="teklif-4-heading" className="font-serif text-2xl text-foreground md:text-[2.1rem]">
          Teklif için gereken 4 bilgi
        </h2>
        <p className="mt-3 max-w-3xl font-sans text-sm leading-relaxed text-muted md:text-base">
          Bu dört başlık yazılı teklif taslağını hızlandırır; eksik kalan tek satır bile sonradan tek mesajla
          tamamlanabilir.
        </p>
        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map((item, i) => (
            <li
              key={item.title}
              className="card-elevated flex flex-col rounded-[var(--radius-card)] p-5 md:p-6"
            >
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary font-sans text-sm font-semibold text-[var(--cream)]"
                aria-hidden
              >
                {i + 1}
              </span>
              <h3 className="mt-4 font-serif text-lg text-foreground">{item.title}</h3>
              <p className="mt-2 flex-1 font-sans text-sm leading-relaxed text-muted">{item.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
