import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { SectionShell } from "@/components/ui/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { waLink } from "@/lib/site";

type CatItem = {
  title: string;
  usage: string;
  desc: string;
  href: string;
  cta: string;
  secondaryLabel: string;
  secondaryHref: string;
  secondaryExternal?: boolean;
};

function buildItems(): CatItem[] {
  return [
    {
      title: "İç fıstık",
      usage: "Baklava, premium kuruyemiş, mutfak",
      desc: "Kavrulmuş veya çiğ; parti bazlı renk ve iç doluluk uyumu.",
      href: "/urunler#ic",
      cta: "İç fıstık ürünlerine git",
      secondaryLabel: "Bu grup için fiyat sor",
      secondaryHref: waLink("Antep iç fıstık için güncel fiyat ve stok soruyorum."),
      secondaryExternal: true,
    },
    {
      title: "Kabuklu",
      usage: "İkram, perakende raf, hediye",
      desc: "Kabuk bütünlüğü ve boyut dengesi; teşhir ve paket seçenekleri.",
      href: "/urunler#kabuklu",
      cta: "Kabuklu ürünlere git",
      secondaryLabel: "Kabuklu için fiyat sor",
      secondaryHref: waLink("Kabuklu Antep fıstığı için fiyat soruyorum."),
      secondaryExternal: true,
    },
    {
      title: "Boz iç",
      usage: "Pastane, dondurma, dolgu",
      desc: "Homojen doku; üretim hattına uygun parti ve numune akışı.",
      href: "/urunler#boz",
      cta: "Boz iç detayları",
      secondaryLabel: "Toplu alım talebi",
      secondaryHref: "/toptan-satis#teklif",
    },
    {
      title: "Perakende paket",
      usage: "Market, e-ticaret, bireysel",
      desc: "Net gramaj ve etiket; raf ve online satışa hazır seriler.",
      href: "/urunler#perakende",
      cta: "Paketleri incele",
      secondaryLabel: "Perakende için yaz",
      secondaryHref: waLink("Perakende paketler için bilgi almak istiyorum."),
      secondaryExternal: true,
    },
    {
      title: "Toptan koli / çuval / palet",
      usage: "Baklavacı, üretici, toptan kuruyemiş",
      desc: "Miktar, ambalaj ve teslim adresine göre teklif; palet seçenekleri.",
      href: "/toptan-satis#teklif",
      cta: "Toplu alım talebi gönder",
      secondaryLabel: "Toptan sürecini oku",
      secondaryHref: "/toptan-satis#surec",
    },
  ];
}

export function CategoryBand() {
  const baseItems = buildItems();

  return (
    <SectionShell tone="muted" className="!bg-surface/25">
      <SectionHeading
        id="categories-heading"
        eyebrow="Ürün grupları"
        title="Kullanım senaryosuna göre seçim"
        subtitle="Önce ihtiyacınıza uygun grubu bulun; kartlar ürün detayına ve doğru iletişim kanalına götürür."
      />
      <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {baseItems.map((item) => (
          <li key={item.title} className="flex">
            <article className="group flex h-full min-h-[268px] w-full flex-col rounded-[var(--radius-xl)] border border-black/[0.06] bg-[var(--cream)] p-5 shadow-[var(--shadow-soft)] transition-[box-shadow,transform,border-color] duration-200 hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-[var(--shadow-lift)] md:min-h-[288px] md:p-6">
              <span className="h-0.5 w-11 rounded-full bg-accent/90" aria-hidden />
              <h3 className="mt-4 font-serif text-xl text-foreground transition-colors group-hover:text-primary md:text-[1.35rem]">
                <Link
                  href={item.href}
                  className="focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  {item.title}
                </Link>
              </h3>
              <p className="mt-1 font-sans text-sm font-medium leading-snug text-secondary">{item.usage}</p>
              <p className="mt-2 flex-1 font-sans text-sm leading-relaxed text-muted">{item.desc}</p>
              <div className="mt-auto flex flex-col gap-3 pt-7">
                <Button variant="primary" href={item.href} className="w-full justify-center">
                  {item.cta}
                </Button>
                {item.secondaryExternal ? (
                  <a
                    href={item.secondaryHref}
                    className="min-h-[44px] text-center font-sans text-sm font-semibold text-primary underline-offset-4 hover:underline"
                    rel="noopener noreferrer"
                  >
                    {item.secondaryLabel}
                  </a>
                ) : (
                  <Link
                    href={item.secondaryHref}
                    className="min-h-[44px] text-center font-sans text-sm font-semibold text-primary underline-offset-4 hover:underline"
                  >
                    {item.secondaryLabel}
                  </Link>
                )}
              </div>
            </article>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}
