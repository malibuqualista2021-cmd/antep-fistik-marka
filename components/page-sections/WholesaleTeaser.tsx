import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { WholesaleLeadForm } from "@/components/forms/WholesaleLeadForm";
import { ProcessRail } from "@/components/ui/ProcessRail";
import { b2bProcessSteps } from "@/lib/b2b-process";
import { site, waLink } from "@/lib/site";
import { cta } from "@/lib/cta";

export function WholesaleTeaser() {
  const w = cta.wholesalePage;

  return (
    <section
      className="border-y border-black/[0.07] bg-[color-mix(in_srgb,var(--primary)_6%,var(--background))] py-11 md:py-16"
      aria-labelledby="wholesale-home-heading"
    >
      <Container>
        <div className="max-w-3xl">
          <p className="font-sans text-sm font-semibold uppercase tracking-[0.12em] text-accent">
            Toptan · B2B
          </p>
          <h2
            id="wholesale-home-heading"
            className="mt-2 font-serif text-[1.75rem] leading-[1.08] text-foreground sm:text-[2.1rem] md:text-[2.45rem]"
          >
            Yazılı teklif ve sevkiyat takvimi birlikte kurulur
          </h2>
          <p className="mt-4 font-sans text-base leading-relaxed text-muted md:text-lg">
            İşletme adı, ürün kodu ve yaklaşık miktar ile talep açılır; parti özeti ve
            fiyat kalemleri teklif dokümanında görünür. Numune veya deneme partisi ürün
            grubuna göre değerlendirilir.
          </p>
        </div>

        <div className="mt-10">
          <ProcessRail
            id="home-b2b-process"
            heading="Toptan süreç özeti"
            intro="Ana sayfada sürecin iskeleti; ayrıntı ve form toptan sayfasında."
            steps={b2bProcessSteps}
            layout="horizontal"
          />
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_400px] lg:items-start lg:gap-10">
          <div className="min-w-0 space-y-4 font-sans text-sm leading-relaxed text-muted md:text-[0.95rem]">
            <p className="text-foreground/95">
              <strong className="font-semibold text-foreground">Teklif taslağı: </strong>
              Ürün + miktar + teslim ili → birim fiyat, minimum, nakliye satırları.
            </p>
            <p>
              <strong className="font-semibold text-foreground">Sevkiyat: </strong>
              Onay sonrası çıkış tarihi ve taşıma şekli özetlenir; paletli gönderimde
              yükleme teyidi isteğe bağlı paylaşılır.
            </p>
            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap">
              <Button variant="primary" href="/toptan-satis#surec" className="w-full justify-center sm:w-auto">
                Toptan sayfasının tamamı
              </Button>
              <Button variant="secondary" href="/toptan-satis#teklif" className="w-full justify-center sm:w-auto">
                Talep formuna git
              </Button>
              {site.whatsappE164 ? (
                <a
                  href={waLink(w.waMessage)}
                  className="inline-flex min-h-[48px] items-center justify-center font-sans text-sm font-semibold text-primary underline-offset-4 hover:underline"
                >
                  {w.waLabel}
                </a>
              ) : null}
            </div>
          </div>

          <aside className="card-elevated rounded-[var(--radius-xl)] p-6 md:p-8" id="home-wholesale-form">
            <h3 className="font-serif text-xl text-foreground">Kısa toptan talep</h3>
            <p className="mt-2 font-sans text-sm leading-relaxed text-muted">{site.wholesaleFormIntro}</p>
            <p className="mt-2 font-sans text-xs text-muted">
              Numune için{" "}
              <Link href="/toptan-satis#numune" className="font-semibold text-primary underline">
                bu bağlantı
              </Link>
              .
            </p>
            <div className="mt-6">
              <WholesaleLeadForm source="home" />
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
