import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { RetailProductCard } from "@/components/shop/RetailProductCard";
import { retailProducts } from "@/lib/shop-products";

export function MarketplaceProductRail() {
  const products = retailProducts.filter((product) => product.isActive);

  return (
    <section id="vitrin-urunler" className="scroll-mt-28 bg-background py-7 md:py-9" aria-labelledby="marketplace-rail-heading">
      <Container>
        <div className="rounded-[18px] bg-[var(--paper)]/90 p-4 ring-1 ring-[var(--border-subtle)] md:p-5">
          <div className="flex items-center justify-between gap-3">
            <h2 id="marketplace-rail-heading" className="font-sans text-base font-bold text-foreground md:text-lg">
              Çok satanlar
            </h2>
            <Link href="/urunler" className="font-sans text-sm font-semibold text-primary hover:underline">
              Tümünü gör
            </Link>
          </div>
          <div className="mt-4 flex gap-4 overflow-x-auto pb-2">
            {products.map((product) => (
              <div key={product.id} className="w-[260px] shrink-0">
                <RetailProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
