import { ProductCard } from "@/components/ui/ProductCard";
import { SectionShell } from "@/components/ui/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { featuredProductSlugs } from "@/lib/home-sections";
import { products } from "@/lib/products";

export function FeaturedProducts() {
  const list = featuredProductSlugs
    .map((slug) => products.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <SectionShell tone="muted">
      <SectionHeading
        id="featured-heading"
        eyebrow="Öne çıkanlar"
        title="En sık sorulan ürün hatları"
        subtitle="Kataloğun tamamı ürünler sayfasında; burada en çok talep gören dört hattı yan yana koyduk — karşılaştırıp doğrudan detaya geçin."
      />
      <ul className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {list.map((p) => (
          <li key={p.slug}>
            <ProductCard product={p} />
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}
