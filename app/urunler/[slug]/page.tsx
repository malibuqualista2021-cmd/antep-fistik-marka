import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FaqAccordion } from "@/components/page-sections/FaqAccordion";
import { faqItems } from "@/lib/faq";
import { cta } from "@/lib/cta";
import {
  audienceLabel,
  getProductBySlug,
  getRelatedProducts,
  products,
} from "@/lib/products";
import { site, waLink } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.excerpt,
  };
}

const detailFaq = faqItems.slice(0, 4);

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const isWholesale =
    product.audience === "wholesale" || product.audience === "both";
  const ct = cta.productDetail(product.name);
  const related = getRelatedProducts(slug, 3);

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
          {product.badge ? (
            <span className="absolute left-3 top-3 rounded-full bg-background/95 px-3 py-1 font-sans text-xs font-semibold text-accent ring-1 ring-accent/30">
              {product.badge}
            </span>
          ) : null}
        </div>
        <div className="min-w-0">
          <p className="font-sans text-sm font-medium uppercase tracking-wider text-accent">
            {audienceLabel(product.audience)}
          </p>
          <h1 className="mt-2 font-serif text-[1.85rem] font-semibold leading-tight text-foreground md:text-[2.5rem]">
            {product.name}
          </h1>
          <p className="mt-3 font-sans text-base leading-relaxed text-muted md:text-lg">
            {product.excerpt}
          </p>

          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Ürün etiketleri">
            {product.tags.map((t) => (
              <li
                key={t}
                className="rounded-full bg-surface px-3 py-1 font-sans text-xs font-medium text-foreground/90 ring-1 ring-black/10"
              >
                {t}
              </li>
            ))}
          </ul>

          <section className="mt-8" aria-labelledby="summary-heading">
            <h2 id="summary-heading" className="sr-only">
              Ürün özeti
            </h2>
            <p className="font-sans text-sm leading-relaxed text-muted md:text-base">
              {product.detail}
            </p>
          </section>

          <dl className="mt-8 grid gap-4 font-sans text-sm sm:grid-cols-2">
            <div className="rounded-[var(--radius-card)] bg-surface/90 p-4 ring-1 ring-black/5">
              <dt className="text-muted">Kimler için</dt>
              <dd className="mt-1 text-foreground">{product.forWho}</dd>
            </div>
            <div className="rounded-[var(--radius-card)] bg-surface/90 p-4 ring-1 ring-black/5">
              <dt className="text-muted">Kullanım alanı</dt>
              <dd className="mt-1 text-foreground">{product.usage}</dd>
            </div>
            <div className="rounded-[var(--radius-card)] bg-surface/90 p-4 ring-1 ring-black/5 sm:col-span-2">
              <dt className="text-muted">Paketleme / satış tipi</dt>
              <dd className="mt-1 text-foreground">{product.packages}</dd>
            </div>
          </dl>

          <div className="mt-6 rounded-[var(--radius-card)] border border-primary/15 bg-primary/[0.06] p-4 md:p-5">
            <h2 className="font-serif text-lg text-foreground">Minimum sipariş</h2>
            <p className="mt-2 font-sans text-sm leading-relaxed text-muted">
              {product.minOrder}
            </p>
          </div>
          <div className="mt-3 rounded-[var(--radius-card)] border border-black/[0.06] bg-background p-4 md:p-5">
            <h2 className="font-serif text-lg text-foreground">Fiyat bilgisi</h2>
            <p className="mt-2 font-sans text-sm leading-relaxed text-muted">
              {product.pricingNote}
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button
              variant="primary"
              href={waLink(ct.primaryWaMessage)}
              aria-label={ct.primaryWaAriaLabel}
            >
              {ct.primaryWaLabel}
            </Button>
            <Button variant="secondary" href={ct.secondaryHref}>
              {ct.secondaryLabel}
            </Button>
            {isWholesale ? (
              <Button variant="ghost" href={ct.wholesaleHref}>
                {ct.wholesaleLabel}
              </Button>
            ) : null}
          </div>
          {site.phone ? (
            <p className="mt-5 font-sans text-sm text-muted">
              Telefon:{" "}
              <a
                className="font-medium text-primary underline-offset-2 hover:underline"
                href={`tel:${site.phoneE164}`}
              >
                {site.phone}
              </a>
            </p>
          ) : null}
        </div>
      </Container>

      <Container className="mt-4 border-t border-black/5 pt-10 md:mt-6 md:pt-12">
        <h2 className="font-serif text-xl text-foreground md:text-2xl">
          Bu ürün için sık sorulanlar
        </h2>
        <div className="mt-5 max-w-3xl">
          <FaqAccordion items={detailFaq} />
        </div>
        <p className="mt-4 font-sans text-sm text-muted">
          <Link href="/sikca-sorulan-sorular" className="font-medium text-primary underline">
            Tüm SSS
          </Link>
        </p>
      </Container>

      <Container className="mt-12">
        <h2 className="font-serif text-xl text-foreground md:text-2xl">Benzer ürünler</h2>
        <ul className="mt-6 grid gap-6 md:grid-cols-3">
          {related.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/urunler/${p.slug}`}
                className="group flex gap-4 rounded-[var(--radius-card)] bg-surface/80 p-4 ring-1 ring-black/5 transition hover:ring-primary/20"
              >
                <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-lg bg-background">
                  <Image
                    src={p.imageSrc}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
                <div className="min-w-0">
                  <p className="font-serif text-lg text-foreground group-hover:text-primary">
                    {p.name}
                  </p>
                  <p className="mt-1 line-clamp-2 font-sans text-xs text-muted">
                    {p.excerpt}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </main>
  );
}
