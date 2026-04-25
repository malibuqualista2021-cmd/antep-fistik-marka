import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { pistachioImages } from "@/lib/pistachio-images";

const categories = [
  {
    title: "Kabuklu Antep Fıstığı",
    blurb: "Kavrulmuş ve tuzlu kabuklu seriler.",
    href: "/urunler?kategori=kabuklu",
    image: pistachioImages.products.kabuklu,
  },
  {
    title: "İç Antep Fıstığı",
    blurb: "Baklava ve tatlı için yeşil iç.",
    href: "/urunler?kategori=ic",
    image: pistachioImages.products.ic,
  },
  {
    title: "Boz İç",
    blurb: "Pastalık ve dolgu için homojen doku.",
    href: "/urunler?kategori=boz",
    image: pistachioImages.products.boz,
  },
  {
    title: "Baklavalık seçimi",
    blurb: "İç ve boz içte baklava üretimine uygun parti.",
    href: "/urunler?kullanim=baklavalik",
    image: pistachioImages.products.ic,
  },
  {
    title: "Kavrulmuş tuzlu",
    blurb: "İkram ve günlük tüketim.",
    href: "/urunler?kategori=kabuklu&islem=kavrulmus",
    image: pistachioImages.products.kabuklu,
  },
  {
    title: "Çiğ / tuzsuz",
    blurb: "İç ve boz iç çiğ seriler.",
    href: "/urunler?islem=cig",
    image: pistachioImages.products.boz,
  },
  {
    title: "Hediye ve paket",
    blurb: "Hazır paket ve sunum.",
    href: "/urunler?kategori=paket",
    image: pistachioImages.products.perakende,
  },
] as const;

export function CategoryDiscovery() {
  return (
    <section className="border-b border-[var(--border-subtle)] bg-[var(--paper)]/60 py-9 md:py-11" aria-labelledby="discover-categories">
      <Container>
        <h2 id="discover-categories" className="font-serif text-xl font-semibold text-foreground md:text-2xl">
          Kategoriler
        </h2>
        <p className="mt-2 max-w-2xl font-sans text-sm text-muted">
          Aradığınız ürünü gramaj ve kullanım amacına göre bulun; vitrin kalabalığı olmadan net seçim yapın.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((category) => (
            <article
              key={category.title}
              className="flex flex-col overflow-hidden rounded-[var(--radius-card)] bg-[var(--cream)] ring-1 ring-[var(--border-subtle)]"
            >
              <Link href={category.href} className="group relative aspect-[4/3] bg-[var(--paper)]">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover transition duration-300 group-hover:scale-[1.02]"
                  sizes="(max-width:640px) 100vw, 33vw"
                />
              </Link>
              <div className="flex flex-1 flex-col p-4">
                <h3 className="font-serif text-lg text-foreground">{category.title}</h3>
                <p className="mt-1 flex-1 font-sans text-sm text-muted">{category.blurb}</p>
                <Button href={category.href} variant="secondary" className="mt-4 w-full justify-center text-sm">
                  İncele
                </Button>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
