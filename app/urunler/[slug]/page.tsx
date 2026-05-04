import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FaqAccordion } from "@/components/page-sections/FaqAccordion";
import { faqItems } from "@/lib/faq";
import { getProductBySlug, products } from "@/lib/products";
import { formatMoney, getRetailProductByDetailSlug, getSimilarRetailProducts } from "@/lib/shop-products";
import { getRetailProducts } from "@/lib/catalog/get-retail-products";
import { ProducerPackagingNote } from "@/components/shop/ProducerPackagingNote";
import { RetailProductDetailBuyBox } from "@/components/shop/RetailProductDetailBuyBox";
import { RetailProductGallery } from "@/components/shop/RetailProductGallery";
import { RetailProductCard } from "@/components/shop/RetailProductCard";
import { CatalogWholesaleDetail } from "@/components/shop/CatalogWholesaleDetail";
import { ProductDetailTabs } from "@/components/shop/ProductDetailTabs";
import { buildProductDetailTabs } from "@/lib/build-product-tabs";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const retailCatalog = await getRetailProducts();
  const slugs = new Set([...products.map((p) => p.slug), ...retailCatalog.map((p) => p.detailSlug)]);
  return Array.from(slugs).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const retailCatalog = await getRetailProducts();
  const retail = getRetailProductByDetailSlug(retailCatalog, slug);
  const wholesaleCatalogProduct = getProductBySlug(slug);
  const title = retail?.name ?? wholesaleCatalogProduct?.name;
  const description = retail?.shortDescription ?? wholesaleCatalogProduct?.excerpt;
  if (!title) return {};
  return {
    title,
    description: description ?? undefined,
  };
}

const detailFaq = faqItems.slice(0, 4);

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const retailCatalog = await getRetailProducts();
  const retail = getRetailProductByDetailSlug(retailCatalog, slug);
  const wholesaleCatalogProduct = getProductBySlug(slug);

  if (!retail && !wholesaleCatalogProduct) notFound();

  if (!retail && wholesaleCatalogProduct) {
    return <CatalogWholesaleDetail product={wholesaleCatalogProduct} />;
  }

  if (!retail) notFound();

  const similar = getSimilarRetailProducts(retailCatalog, retail, 4);
  const detailTabs = buildProductDetailTabs(retail);

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
          <RetailProductGallery imageSrc={retail.imageSrc} imageAlt={retail.imageAlt} extraImages={retail.extraImages} />
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

          <ProducerPackagingNote className="mt-2" />

          <aside
            className="rounded-[var(--radius-card)] border border-[var(--line-medium)] bg-surface/50 p-4 md:p-5"
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

      <Container className="mt-12 max-w-4xl md:mt-16">
        <ProductDetailTabs tabs={detailTabs} />
      </Container>

      <Container className="mt-12 md:mt-14">
        <h2 className="font-serif text-xl text-foreground md:text-2xl">Benzer ürünler</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {similar.map((p) => (
            <RetailProductCard key={p.id} product={p} />
          ))}
        </div>
      </Container>

      <Container className="mt-12 border-t border-[var(--line-soft)] pt-10 md:mt-14 md:pt-12">
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
