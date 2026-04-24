import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { pistachioImages } from "@/lib/pistachio-images";

const categories = [
  {
    title: "Kabuklu",
    href: "/urunler?kategori=kabuklu",
    image: pistachioImages.products.kabuklu,
  },
  {
    title: "İç Fıstık",
    href: "/urunler?kategori=ic",
    image: pistachioImages.products.ic,
  },
  {
    title: "Boz İç",
    href: "/urunler?kategori=boz",
    image: pistachioImages.products.boz,
  },
  {
    title: "Hediye / Paket",
    href: "/urunler?kategori=paket",
    image: pistachioImages.products.perakende,
  },
  {
    title: "Toptan",
    href: "/toptan-satis",
    image: pistachioImages.products.toptan,
  },
] as const;

export function CategoryDiscovery() {
  return (
    <section className="bg-background py-7 md:py-9" aria-labelledby="discover-categories">
      <Container>
        <h2 id="discover-categories" className="font-sans text-base font-semibold text-foreground">
          Kategorilerdeki ürünleri keşfet
        </h2>
        <div className="mt-4 flex gap-4 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Link
              key={category.title}
              href={category.href}
              className="group w-[132px] shrink-0 text-center"
            >
              <div className="relative mx-auto aspect-square overflow-hidden rounded-[18px] bg-surface ring-1 ring-black/[0.06] transition group-hover:ring-primary/25">
                <Image src={category.image} alt={category.title} fill className="object-cover" sizes="132px" />
                <span className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-red-600 font-sans text-xs font-bold text-white">
                  %
                </span>
              </div>
              <span className="mt-2 block font-sans text-sm font-semibold text-foreground group-hover:text-primary">
                {category.title}
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
