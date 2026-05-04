import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import type { DiscoveryTileDefinition } from "@/lib/site-settings-types";

export function CategoryDiscovery({ tiles }: { tiles: DiscoveryTileDefinition[] }) {
  const ordered = [...tiles].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
  return (
    <section className="border-b border-[var(--border-subtle)] bg-[var(--paper)]/60 py-9 md:py-11" aria-labelledby="discover-categories">
      <Container>
        <h2 id="discover-categories" className="font-serif text-xl font-semibold text-foreground md:text-2xl">
          Kategoriler
        </h2>
        <p className="mt-2 max-w-2xl font-sans text-sm text-muted">
          Aradığınız ürünü gramaj ve kullanım amacına göre bulun; vitrin kalabalığı olmadan net seçim yapın.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {ordered.map((category) => (
            <article
              key={category.id}
              className="flex min-h-0 flex-col overflow-hidden rounded-[var(--radius-card)] bg-[var(--cream)] ring-1 ring-[var(--border-subtle)]"
            >
              <Link href={category.href} className="group relative aspect-[4/3] min-h-0 shrink-0 bg-[var(--paper)]">
                <Image
                  src={category.imageSrc}
                  alt={category.imageAlt}
                  fill
                  className="object-cover object-center transition duration-300 group-hover:opacity-95"
                  sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
                  loading="lazy"
                />
              </Link>
              <div className="flex flex-1 flex-col p-4">
                <h3 className="font-serif text-lg text-foreground">{category.title}</h3>
                <p className="mt-1 flex-1 font-sans text-sm text-muted">{category.blurb}</p>
                <Button href={category.href} variant="secondary" className="mt-4 w-full justify-center text-sm">
                  İncele
                </Button>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
