import type { Metadata } from "next";
import Link from "next/link";
import { WholesaleLeadForm } from "@/components/forms/WholesaleLeadForm";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ProcessRail } from "@/components/ui/ProcessRail";
import { b2bProcessSteps } from "@/lib/b2b-process";
import { cta } from "@/lib/cta";
import { site, waLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Toptan satış",
  description:
    "Antep fıstığı toplu alım: yazılı teklif, numune, paketleme ve sevkiyat. Baklavacı, kuruyemişçi ve üreticiler.",
};

export default function WholesalePage() {
  const w = cta.wholesalePage;

  return (
    <main id="icerik" className="pb-16">
      <section className="border-b border-black/[0.08] bg-primary py-11 text-[var(--cream)] md:py-16">
        <Container>
          <p className="font-sans text-sm font-semibold uppercase tracking-[0.14em] text-[var(--cream)]/70">
            Toptan · B2B vitrin
          </p>
          <h1 className="mt-3 max-w-4xl font-serif text-[2.05rem] font-semibold leading-[1.06] tracking-tight sm:text-[2.45rem] md:text-[3rem]">
            Toplu alımda yazılı teklif, şeffaf kalemleme, planlı sevkiyat
          </h1>
          <p className="mt-5 max-w-2xl font-sans text-base leading-relaxed text-[var(--cream)]/88 md:text-lg">
            Baklavacı, üretici ve toptan kuruyemiş için iç fıstık, kabuklu ve boz içte
            torba, koli ve palet. Minimum ve birim fiyat ürün ve rotaya göre teklifte
            açılır; nakliye kalemi ayrı satırda yer alır.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button variant="cream" href="#teklif">
              {w.formAnchorLabel}
            </Button>
            {site.whatsappE164 ? (
              <Button variant="outlineLight" href={waLink(w.waMessage)}>
                {w.waLabel}
              </Button>
            ) : null}
            {site.phone && site.phoneE164 ? (
              <Button variant="outlineLight" href={`tel:${site.phoneE164}`}>
                {w.phoneLabel}
              </Button>
            ) : null}
          </div>
        </Container>
      </section>

      <Container className="py-11 md:py-14">
        <ProcessRail
          id="surec"
          heading="Tekliften sevkiyata süreç"
          intro="Her adımda yazılı özet; sözlü vaat yerine teklif dokümanı."
          steps={b2bProcessSteps}
          layout="vertical"
        />
      </Container>

      <Container className="grid gap-10 pb-14 md:grid-cols-[1fr_400px] md:items-start md:gap-12">
        <div className="min-w-0 space-y-12">
          <section aria-labelledby="kimlere" className="max-w-3xl">
            <h2 id="kimlere" className="font-serif text-2xl text-foreground md:text-[2.15rem]">
              Kimlere hizmet veriyoruz?
            </h2>
            <ul className="mt-4 space-y-2 font-sans text-muted md:text-[1.02rem]">
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                Baklavacı ve tatlı üreticileri — iç fıstık ve boz iç ağırlıklı.
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                Kuruyemiş perakende ve toptan satın alma hatları.
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                Gıda üretimi ve dolgu kullanan işletmeler.
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                Düzenli tonajlı alım yapan üretici veya zincir.
              </li>
            </ul>
          </section>

          <section aria-labelledby="urun-gruplari" className="max-w-3xl">
            <h2 id="urun-gruplari" className="font-serif text-2xl text-foreground md:text-[2.15rem]">
              Ürün ve parti mantığı
            </h2>
            <p className="mt-3 font-sans text-muted md:text-[1.02rem]">
              Kabuklu, iç fıstık ve boz iç için farklı eleme ve ambalaj seçenekleri vardır.
              Hangi hattın üretiminize oturduğunu görmek için{" "}
              <Link href="/urunler" className="font-semibold text-primary underline underline-offset-2">
                ürün vitrinine
              </Link>{" "}
              göz atın; ardından bu sayfadaki form veya WhatsApp ile miktar iletin.
            </p>
          </section>

          <section
            id="numune"
            className="scroll-mt-28 max-w-3xl rounded-[var(--radius-xl)] border border-primary/15 bg-primary/[0.04] p-6 md:p-8"
            aria-labelledby="numune-heading"
          >
            <h2 id="numune-heading" className="font-serif text-2xl text-foreground md:text-[2.05rem]">
              Numune ve deneme partisi
            </h2>
            <p className="mt-3 font-sans text-sm leading-relaxed text-muted md:text-base">
              İlk iş birliğinde ürünü sahada görmek için numune veya küçük deneme partisi
              talepleri ürün grubuna göre değerlendirilir. Formda veya mesajda ürün adı ve
              yaklaşık aylık ihtiyaç yazmanız yeterlidir.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button variant="primary" href="#teklif">
                Talep formunu aç
              </Button>
              {site.whatsappE164 ? (
                <Button variant="secondary" href={waLink(cta.home.sampleWaMessage)}>
                  Numune için WhatsApp
                </Button>
              ) : null}
            </div>
          </section>

          <section aria-labelledby="paket" className="max-w-3xl">
            <h2 id="paket" className="font-serif text-2xl text-foreground md:text-[2.15rem]">
              Paketleme ve sevkiyat
            </h2>
            <p className="mt-3 font-sans text-muted md:text-[1.02rem]">
              Torba, koli ve palet seçenekleri ürün ve rotaya göre önerilir. Şehir içi,
              ambar hattı veya paletli teslim kalemleri teklifte ayrı açılır; sigorta ve
              yükleme ihtiyacı varsa satır olarak eklenir.
            </p>
          </section>

          <section aria-labelledby="guven" className="max-w-3xl">
            <h2 id="guven" className="font-serif text-2xl text-foreground md:text-[2.15rem]">
              Güven ve şeffaflık
            </h2>
            <p className="mt-3 font-sans text-muted md:text-[1.02rem]">
              Çıkış öncesi parti bilgisi ve teslim penceresi yazılı özetle paylaşılır.
              İsimli müşteri referansı yalnızca izin olduğunda verilir; aksi halde ürün ve
              numune ile ilerlenir. Sertifika veya belge metni .env ile eklenebilir.
            </p>
          </section>
        </div>

        <aside
          id="teklif"
          className="card-elevated scroll-mt-28 h-fit rounded-[var(--radius-xl)] p-6 md:sticky md:top-28 md:p-8"
        >
          <h2 className="font-serif text-2xl text-foreground">Toplu alım talebi</h2>
          <p className="mt-2 font-sans text-sm leading-relaxed text-muted">{site.wholesaleFormIntro}</p>
          <p className="mt-2 font-sans text-sm text-muted">{site.responseTimeHint}</p>
          <div className="mt-6">
            <WholesaleLeadForm source="toptan-satis" />
          </div>
        </aside>
      </Container>
    </main>
  );
}
