import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FaqAccordion } from "@/components/page-sections/FaqAccordion";
import { faqItems } from "@/lib/faq";
import { getProductBySlug, products } from "@/lib/products";
import { formatMoney, getRetailProductByDetailSlug, getSimilarRetailProducts } from "@/lib/shop-products";
import { RetailProductDetailBuyBox } from "@/components/shop/RetailProductDetailBuyBox";
import { RetailProductCard } from "@/components/shop/RetailProductCard";
import { CatalogWholesaleDetail } from "@/components/shop/CatalogWholesaleDetail";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const retail = getRetailProductByDetailSlug(slug);
  const catalog = getProductBySlug(slug);
  const title = retail?.name ?? catalog?.name;
  const description = retail?.shortDescription ?? catalog?.excerpt;
  if (!title) return {};
  return {
    title,
    description: description ?? undefined,
  };
}

const detailFaq = faqItems.slice(0, 4);

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const retail = getRetailProductByDetailSlug(slug);
  const catalog = getProductBySlug(slug);

  if (!catalog) notFound();

  if (!retail) {
    return <CatalogWholesaleDetail product={catalog} />;
  }

  const similar = getSimilarRetailProducts(retail, 4);
  const description = retail.description ?? retail.shortDescription;
  const ingredients = retail.ingredients ?? "Antep fıstığı (ürün tipine göre etiket bilgisi geçerlidir).";
  const allergens =
    retail.allergens ??
    "Fıstık içerir; aynı ortamda diğer kuru yemiş ve alerjenlerle temas ihtimali bulunabilir.";
  const storage =
    retail.storage ??
    "Serin ve kuru yerde, kapalı ambalajda saklayın; açıldıktan sonra kısa sürede tüketin.";

  return (
    <main id="icerik" className="pb-16">
      <Container className="py-6 md:py-8">
        <nav className="font-sans text-sm text-muted" aria-label="Sayfa konumu">
          <Link href="/" className="hover:text-primary">
            Ana sayfa
          </Link>
          <span className="mx-2 text-muted/60">/</span>
          <Link href="/urunler" className="hover:text-primary">
            Ürünler
          </Link>
          <span className="mx-2 text-muted/60">/</span>
          <span className="text-foreground">{retail.name}</span>
        </nav>
      </Container>

      <Container className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(300px,380px)] md:items-start md:gap-10 lg:gap-12">
        <div>
          <div className="relative aspect-square w-full overflow-hidden rounded-[var(--radius-card)] bg-surface shadow-[var(--shadow-soft)] ring-1 ring-black/5 md:aspect-[5/6]">
            <Image
              src={retail.imageSrc}
              alt={retail.imageAlt}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 55vw"
            />
          </div>
        </div>

        <div className="min-w-0 space-y-6">
          <div>
            <p className="font-sans text-sm font-semibold text-accent">Perakende</p>
            <h1 className="mt-2 font-serif text-[1.85rem] font-semibold leading-tight text-foreground md:text-[2.35rem]">
              {retail.name}
            </h1>
            <p className="mt-3 font-sans text-base leading-relaxed text-muted">{retail.shortDescription}</p>
            <p className="mt-2 font-sans text-sm text-muted">
              Başlangıç fiyatı:{" "}
              <span className="font-semibold text-foreground">{formatMoney(retail.price, retail.currency)}</span>{" "}
              ({retail.weight}) — gramaj seçimine göre güncellenir.
            </p>
          </div>

          <RetailProductDetailBuyBox product={retail} />

          <aside
            className="rounded-[var(--radius-card)] border border-black/[0.08] bg-surface/50 p-4 md:p-5"
            aria-labelledby="wholesale-cta-title"
          >
            <h2 id="wholesale-cta-title" className="font-serif text-lg text-foreground">
              Bu ürünü toptan almak ister misiniz?
            </h2>
            <p className="mt-2 font-sans text-sm leading-relaxed text-muted">
              Koli, çuval veya palet ihtiyaçlarınız için miktar ve teslim iline göre yazılı teklif alabilirsiniz.
            </p>
            <Button href="/toptan-satis#teklif" variant="secondary" className="mt-4 w-full justify-center sm:w-auto">
              Toptan teklif alın
            </Button>
          </aside>
        </div>
      </Container>

      <Container className="mt-12 max-w-4xl space-y-10 md:mt-16">
        <section aria-labelledby="desc-heading">
          <h2 id="desc-heading" className="font-serif text-xl text-foreground md:text-2xl">
            Ürün açıklaması
          </h2>
          <p className="mt-3 font-sans text-sm leading-relaxed text-muted md:text-base">{description}</p>
        </section>

        <div className="grid gap-6 md:grid-cols-3">
          <section className="rounded-[var(--radius-card)] bg-surface/70 p-4 ring-1 ring-black/5" aria-labelledby="ing-heading">
            <h2 id="ing-heading" className="font-serif text-lg text-foreground">
              İçindekiler
            </h2>
            <p className="mt-2 font-sans text-sm leading-relaxed text-muted">{ingredients}</p>
          </section>
          <section className="rounded-[var(--radius-card)] bg-surface/70 p-4 ring-1 ring-black/5" aria-labelledby="allergen-heading">
            <h2 id="allergen-heading" className="font-serif text-lg text-foreground">
              Alerjen uyarısı
            </h2>
            <p className="mt-2 font-sans text-sm leading-relaxed text-muted">{allergens}</p>
          </section>
          <section className="rounded-[var(--radius-card)] bg-surface/70 p-4 ring-1 ring-black/5" aria-labelledby="storage-heading">
            <h2 id="storage-heading" className="font-serif text-lg text-foreground">
              Saklama koşulları
            </h2>
            <p className="mt-2 font-sans text-sm leading-relaxed text-muted">{storage}</p>
          </section>
        </div>

        <section className="rounded-[var(--radius-card)] bg-background p-5 ring-1 ring-black/[0.06] md:p-6" aria-labelledby="reviews-heading">
          <h2 id="reviews-heading" className="font-serif text-xl text-foreground">
            Müşteri yorumları
          </h2>
          <p className="mt-3 font-sans text-sm leading-relaxed text-muted">
            Henüz yorum yok. İlk doğrulanmış müşteri yorumları siparişlerden sonra eklenecektir.
          </p>
        </section>
      </Container>

      <Container className="mt-12 md:mt-14">
        <h2 className="font-serif text-xl text-foreground md:text-2xl">Benzer ürünler</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {similar.map((p) => (
            <RetailProductCard key={p.id} product={p} />
          ))}
        </div>
      </Container>

      <Container className="mt-12 border-t border-black/5 pt-10 md:mt-14 md:pt-12">
        <h2 className="font-serif text-xl text-foreground md:text-2xl">Sık sorulanlar</h2>
        <div className="mt-5 max-w-3xl">
          <FaqAccordion items={detailFaq} />
        </div>
        <p className="mt-4 font-sans text-sm text-muted">
          <Link href="/sikca-sorulan-sorular" className="font-medium text-primary underline">
            Tüm SSS
          </Link>
        </p>
      </Container>
    </main>
  );
}
