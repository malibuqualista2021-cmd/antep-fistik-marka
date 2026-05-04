import Link from "next/link";
import { RetailProductCard } from "@/components/shop/RetailProductCard";
import { Container } from "@/components/ui/Container";
import type { SitePresentation } from "@/lib/site-presentation";
import type { RetailProduct } from "@/lib/shop-products";

/** Üst vitrin — kampanya / avantaj şeridi */
export function HomeCampaignBanner({ presentation }: { presentation: SitePresentation }) {
  const b = presentation.campaignBanner;
  return (
    <section className="border-b border-[var(--line-soft)] bg-[var(--color-orange)] py-3 md:py-3.5" aria-label="Kampanya ve avantajlar">
      <Container className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-sans text-sm font-bold text-[var(--color-surface)] md:text-base">{b.text}</p>
        <Link
          href={b.href}
          className="inline-flex min-h-[44px] shrink-0 items-center justify-center rounded-full bg-[var(--color-surface)] px-5 font-sans text-sm font-bold text-[var(--color-orange)] shadow-sm hover:bg-[var(--color-bg)]"
        >
          {b.linkLabel}
        </Link>
      </Container>
    </section>
  );
}

/** Ürün ızgarası üstü — pazaryeri güven şeridi */
export function HomeCommerceTrustBar({ presentation }: { presentation: SitePresentation }) {
  const items = presentation.commerceTrustBar;
  return (
    <section className="border-b border-[var(--color-border)] bg-[var(--color-surface)] py-3 md:py-4" aria-label="Alışveriş avantajları">
      <Container>
        <ul className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
          {items.map((item) => (
            <li
              key={item.title}
              className="rounded-lg border border-[var(--line-soft)] bg-[var(--color-bg)] px-3 py-2.5 text-center md:px-4 md:py-3 md:text-left"
            >
              <p className="font-sans text-xs font-bold text-foreground md:text-sm">{item.title}</p>
              <p className="mt-0.5 font-sans text-[11px] text-muted md:text-xs">{item.text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

function Shelf({
  id,
  title,
  subtitle,
  products,
  seeAllHref,
}: {
  id: string;
  title: string;
  subtitle: string;
  products: RetailProduct[];
  seeAllHref: string;
}) {
  if (!products.length) return null;

  return (
    <section className="border-b border-[var(--line-soft)] bg-[var(--color-bg)] py-8 md:py-10" aria-labelledby={id}>
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 id={id} className="font-sans text-xl font-bold tracking-tight text-foreground md:text-2xl">
              {title}
            </h2>
            <p className="mt-1 font-sans text-sm text-muted">{subtitle}</p>
          </div>
          <Link href={seeAllHref} className="font-sans text-sm font-bold text-primary hover:underline">
            Tümünü gör →
          </Link>
        </div>
        <ul className="mt-6 grid list-none grid-cols-2 gap-3 md:grid-cols-4 md:gap-4 lg:gap-5">
          {products.map((product) => (
            <li key={product.id}>
              <RetailProductCard product={product} compactFooter />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/** Yeni mahsul etiketli aktif ürünler */
export function HomeNewHarvestShelf({
  catalog,
  presentation,
}: {
  catalog: RetailProduct[];
  presentation: SitePresentation;
}) {
  const products = catalog.filter(
    (p) => p.isActive && p.tags?.some((t) => t.toLowerCase().includes("yeni mahsul") || t.toLowerCase().includes("yeni")),
  );
  const s = presentation.shelvesCopy;
  return (
    <Shelf
      id="yeni-mahsul-heading"
      title={s.newHarvestTitle}
      subtitle={s.newHarvestSubtitle}
      products={products}
      seeAllHref="/urunler?islem=cig"
    />
  );
}

/** Hediye paket ve çoklu gramaj avantajları */
export function HomeValuePacksShelf({
  catalog,
  presentation,
}: {
  catalog: RetailProduct[];
  presentation: SitePresentation;
}) {
  const catId = presentation.shelvesCopy.valuePacksCategoryId;
  const products = catalog.filter(
    (p) =>
      p.isActive &&
      (p.category === catId || p.tags?.some((t) => t.includes("Hediye") || t.includes("Paket"))),
  );
  const s = presentation.shelvesCopy;
  return (
    <Shelf
      id="avantajli-paket-heading"
      title={s.valuePacksTitle}
      subtitle={s.valuePacksSubtitle}
      products={products}
      seeAllHref={`/urunler?kategori=${encodeURIComponent(catId)}`}
    />
  );
}
