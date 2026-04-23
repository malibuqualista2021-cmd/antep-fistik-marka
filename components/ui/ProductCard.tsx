import Image from "next/image";
import type { Product } from "@/lib/products";
import { audienceLabel } from "@/lib/products";
import { Button } from "@/components/ui/Button";
import { waLink } from "@/lib/site";

function wholesaleHint(audience: Product["audience"]) {
  if (audience === "retail") return "Toptan: hayır";
  if (audience === "wholesale") return "Toptan: evet";
  return "Toptan: evet (koşullu)";
}

export function ProductCard({ product }: { product: Product }) {
  const waMsg = `${product.name} için güncel fiyat ve paket bilgisi almak istiyorum.`;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] bg-surface shadow-[var(--shadow-soft)] ring-1 ring-black/5">
      <div className="relative aspect-[4/3] w-full bg-background">
        <Image
          src={product.imageSrc}
          alt={product.imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        {product.badge ? (
          <span className="absolute left-3 top-3 rounded-full bg-background/95 px-3 py-1 font-sans text-xs font-semibold text-accent ring-1 ring-accent/30">
            {product.badge}
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="font-sans text-xs font-medium uppercase tracking-wide text-muted">
          {audienceLabel(product.audience)}
        </p>
        <h3 className="mt-1 font-serif text-xl text-foreground">{product.name}</h3>
        <p className="mt-2 font-sans text-sm leading-relaxed text-muted">{product.excerpt}</p>
        <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Ürün etiketleri">
          {product.tags.slice(0, 4).map((t) => (
            <li
              key={t}
              className="rounded-full bg-background/90 px-2 py-0.5 font-sans text-[11px] font-medium text-foreground/85 ring-1 ring-black/10"
            >
              {t}
            </li>
          ))}
        </ul>
        <dl className="mt-4 space-y-2 font-sans text-sm text-foreground/90">
          <div>
            <dt className="text-muted">Kimler için</dt>
            <dd className="mt-0.5 leading-snug">{product.forWho}</dd>
          </div>
          <div>
            <dt className="text-muted">Kullanım</dt>
            <dd className="mt-0.5 leading-snug">{product.usage}</dd>
          </div>
          <div>
            <dt className="text-muted">Paket</dt>
            <dd className="mt-0.5 leading-snug">{product.packages}</dd>
          </div>
          <div>
            <dt className="text-muted">Toptan uygunluk</dt>
            <dd className="mt-0.5">{wholesaleHint(product.audience)}</dd>
          </div>
        </dl>
        <div className="mt-6 flex flex-col gap-2">
          <Button variant="primary" href={`/urunler/${product.slug}`} className="w-full justify-center">
            Ürün detayı
          </Button>
          <a
            href={waLink(waMsg)}
            className="min-h-[44px] text-center font-sans text-sm font-semibold text-primary underline-offset-4 hover:underline"
          >
            Bu ürün için fiyat sor
          </a>
        </div>
      </div>
    </article>
  );
}
