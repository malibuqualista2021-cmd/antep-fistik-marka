import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

type Props = { product: Product };

/**
 * Perakende sepet ürünü olmayan katalog kalemleri (ör. toptan koli/çuval) —
 * teklif odaklı, mağaza PDP’sinden ayrı tutulur.
 */
export function CatalogWholesaleDetail({ product }: Props) {
  return (
    <main id="icerik" className="pb-16">
      <Container className="grid gap-8 py-9 md:grid-cols-2 md:items-start md:gap-11 md:py-12">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-card)] bg-surface shadow-[var(--shadow-soft)] ring-1 ring-black/5 md:aspect-[4/5]">
          <Image
            src={product.imageSrc}
            alt={product.imageAlt}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 45vw"
          />
        </div>
        <div className="min-w-0">
          <p className="font-sans text-sm font-medium uppercase tracking-wider text-accent">Toptan katalog</p>
          <h1 className="mt-2 font-serif text-[1.85rem] font-semibold leading-tight text-foreground md:text-[2.5rem]">
            {product.name}
          </h1>
          <p className="mt-3 font-sans text-base leading-relaxed text-muted md:text-lg">{product.excerpt}</p>
          <p className="mt-6 font-sans text-sm leading-relaxed text-muted md:text-base">{product.detail}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button variant="primary" href="/toptan-satis#teklif">
              Toptan teklif al
            </Button>
            <Button variant="secondary" href="/urunler">
              Perakende ürünleri gör
            </Button>
            <Button variant="ghost" href="/iletisim">
              İletişim
            </Button>
          </div>
          <p className="mt-6 rounded-[var(--radius-card)] bg-surface/80 p-4 font-sans text-sm text-muted ring-1 ring-black/5">
            Bu kalem doğrudan sepete eklenen perakende gramaj ürünü değildir. Miktar, teslim ili ve ambalaj tercihinize göre
            yazılı teklif hazırlanır.
          </p>
        </div>
      </Container>
      <Container className="border-t border-black/5 pt-10">
        <h2 className="font-serif text-xl text-foreground md:text-2xl">Perakende mağazaya geç</h2>
        <p className="mt-2 max-w-2xl font-sans text-sm text-muted">
          Ev ve hediye için hazır paketleri{" "}
          <Link href="/urunler" className="font-medium text-primary underline">
            ürünler
          </Link>{" "}
          sayfasından inceleyebilirsiniz.
        </p>
      </Container>
    </main>
  );
}
