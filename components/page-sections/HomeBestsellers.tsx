import Link from "next/link";
import { RetailProductCard } from "@/components/shop/RetailProductCard";
import { Container } from "@/components/ui/Container";
import type { RetailProduct } from "@/lib/shop-products";

const BESTSELLER_IDS = ["retail-kabuklu-500", "retail-ic-250", "retail-boz-250", "retail-paket-1kg"] as const;

const CARD_TITLE: Record<(typeof BESTSELLER_IDS)[number], string> = {
  "retail-ic-250": "İç Antep Fıstığı",
  "retail-kabuklu-500": "Kabuklu Antep Fıstığı",
  "retail-boz-250": "Boz İç Antep Fıstığı",
  "retail-paket-1kg": "Kavrulmuş Antep Fıstığı",
};

export function HomeBestsellers({ catalog }: { catalog: RetailProduct[] }) {
  const items = BESTSELLER_IDS.map((id) => catalog.find((p) => p.id === id)).filter((p): p is RetailProduct => Boolean(p));

  if (!items.length) return null;

  return (
    <section className="border-b border-[var(--line-soft)] bg-[var(--color-bg)] py-8 md:py-10" aria-labelledby="home-bestsellers-heading">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 id="home-bestsellers-heading" className="font-sans text-xl font-bold tracking-tight text-foreground md:text-2xl">
              Çok satanlar
            </h2>
            <p className="mt-1 font-sans text-sm text-muted">En çok sepete eklenen Antep fıstığı ürünleri</p>
          </div>
          <Link href="/urunler" className="font-sans text-sm font-bold text-primary hover:underline">
            Tümünü gör →
          </Link>
        </div>

        <ul className="mt-6 grid list-none grid-cols-2 gap-3 md:grid-cols-4 md:gap-4 lg:gap-5">
          {items.map((product) => (
            <li key={product.id}>
              <RetailProductCard
                product={product}
                compactFooter
                titleOverride={CARD_TITLE[product.id as keyof typeof CARD_TITLE] ?? product.name}
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
