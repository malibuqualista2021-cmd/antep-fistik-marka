import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { getLegalPage, legalPages } from "@/lib/legal-pages";
import { getSellerLegalBlock, legalPagesWithSellerBox } from "@/lib/seller-legal";

type Props = { params: Promise<{ legal: string }> };

export function generateStaticParams() {
  return legalPages.map((page) => ({ legal: page.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { legal } = await params;
  const page = getLegalPage(legal);
  if (!page) return {};
  return {
    title: page.title,
    description: page.description,
  };
}

export default async function LegalPage({ params }: Props) {
  const { legal } = await params;
  const page = getLegalPage(legal);
  if (!page) notFound();

  const sellerBox = legalPagesWithSellerBox().has(legal) ? getSellerLegalBlock() : null;

  return (
    <main id="icerik" className="pb-16">
      <section className="border-b border-black/5 bg-surface/30 py-10 md:py-14">
        <Container>
          <h1 className="font-serif text-[2rem] font-semibold text-foreground md:text-[2.75rem]">
            {page.title}
          </h1>
          <p className="mt-3 max-w-2xl font-sans text-base leading-relaxed text-muted">
            {page.description}
          </p>
        </Container>
      </section>
      <Container className="max-w-3xl py-10 md:py-12">
        <div className="space-y-7">
          {page.sections.map((section) => (
            <section key={section.title} className="rounded-[var(--radius-card)] bg-surface/70 p-5 ring-1 ring-black/5">
              <h2 className="font-serif text-xl text-foreground">{section.title}</h2>
              <p className="mt-2 font-sans text-sm leading-relaxed text-muted md:text-base">
                {section.text}
              </p>
            </section>
          ))}
          {sellerBox ? (
            <section className="rounded-[var(--radius-card)] bg-background p-5 ring-1 ring-primary/15" aria-labelledby="seller-legal-heading">
              <h2 id="seller-legal-heading" className="font-serif text-xl text-foreground">
                {sellerBox.title}
              </h2>
              <ul className="mt-3 list-inside list-disc space-y-2 font-sans text-sm leading-relaxed text-muted md:text-base">
                {sellerBox.lines.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
      </Container>
    </main>
  );
}
