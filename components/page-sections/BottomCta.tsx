import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { cta } from "@/lib/cta";
import { site, waLink } from "@/lib/site";

export function BottomCta() {
  const b = cta.bottomCta;

  return (
    <section
      className="pb-12 pt-2 md:pb-16"
      aria-labelledby="bottom-cta-heading"
    >
      <Container>
        <div className="rounded-[var(--radius-card)] bg-primary px-5 py-9 text-center shadow-[var(--shadow-soft)] md:px-12 md:py-12">
          <h2
            id="bottom-cta-heading"
            className="font-serif text-[1.5rem] leading-tight text-[#F7F3EA] sm:text-[1.95rem] md:text-[2.25rem]"
          >
            {b.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-sans text-sm leading-relaxed text-[#F7F3EA]/92 sm:text-base">
            {b.subtitle}
          </p>
          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
            <Button
              variant="secondary"
              href="/urunler"
              className="!min-h-[48px] !border-2 !border-[#F7F3EA] !bg-[#F7F3EA] !px-5 !text-primary hover:!bg-[#EFE7D6]"
            >
              Perakende ürünleri gör
            </Button>
            {site.whatsappE164 ? (
              <Button
                variant="secondary"
                href={waLink(b.primaryWaMessage)}
                className="!min-h-[48px] !border-2 !border-[#F7F3EA] !bg-[#F7F3EA] !px-5 !text-primary hover:!bg-[#EFE7D6]"
                aria-label={b.primaryWaLabel}
              >
                {b.primaryWaLabel}
              </Button>
            ) : null}
            {site.phone && site.phoneE164 ? (
              <Button
                variant="secondary"
                href={`tel:${site.phoneE164}`}
                className="!min-h-[48px] !border-2 !border-[#F7F3EA]/80 !bg-transparent !px-5 !text-[#F7F3EA] hover:!bg-[#F7F3EA]/10"
                aria-label={`${b.phoneLabel}: ${site.phone}`}
              >
                {b.phoneLabel}
              </Button>
            ) : null}
            <Button
              variant="ghost"
              href={b.formHref}
              className="!min-h-[48px] !border !border-[#F7F3EA]/45 !text-[#F7F3EA] hover:!bg-[#F7F3EA]/10"
            >
              {b.formLabel}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
