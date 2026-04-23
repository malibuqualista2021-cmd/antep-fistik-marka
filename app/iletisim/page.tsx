import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/ContactForm";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { mapsLink, site, waLink } from "@/lib/site";
import { cta } from "@/lib/cta";

export const metadata: Metadata = {
  title: "İletişim",
  description: "Telefon, WhatsApp, adres ve iletişim formu — perakende ve toptan talepler.",
};

export default function ContactPage() {
  const mapHref = mapsLink();
  const c = cta.contactPage;

  return (
    <main id="icerik" className="pb-16">
      <section className="border-b border-black/5 bg-surface/30 py-10 md:py-12">
        <Container>
          <h1 className="font-serif text-[2rem] font-semibold text-foreground md:text-[2.75rem]">
            İletişim
          </h1>
          <p className="mt-3 max-w-2xl font-sans text-base leading-relaxed text-muted md:text-lg">
            Perakende sipariş, toptan teklif veya genel sorularınız için aşağıdaki
            kanallardan birini kullanın. {site.responseTimeHint}
          </p>
        </Container>
      </section>

      <Container className="grid gap-10 py-10 md:grid-cols-2 md:gap-12 md:py-12">
        <div className="space-y-8">
          <section aria-labelledby="channels-heading">
            <h2 id="channels-heading" className="font-serif text-xl text-foreground">
              Kanallar
            </h2>
            <address className="mt-4 space-y-5 not-italic font-sans text-sm text-muted">
              {site.address.line1 || site.address.line2 ? (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-foreground">
                    Adres
                  </p>
                  {site.address.line1 ? <p className="mt-1">{site.address.line1}</p> : null}
                  {site.address.line2 ? <p>{site.address.line2}</p> : null}
                  {mapHref ? (
                    <a
                      className="mt-2 inline-flex min-h-[44px] items-center text-sm font-medium text-primary hover:underline"
                      href={mapHref}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Haritada aç
                    </a>
                  ) : null}
                </div>
              ) : (
                <p className="rounded-[var(--radius-card)] bg-background p-4 text-sm ring-1 ring-black/5">
                  Adres satırları yapılandırıldığında burada görünecek. Şimdilik
                  telefon veya mesaj ile konum paylaşılabilir.
                </p>
              )}
              {site.phone ? (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-foreground">
                    Telefon
                  </p>
                  <a className="mt-1 inline-flex min-h-[44px] items-center font-medium text-primary hover:underline" href={`tel:${site.phoneE164}`}>
                    {site.phone}
                  </a>
                </div>
              ) : null}
              {site.whatsappE164 ? (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-foreground">
                    WhatsApp
                  </p>
                  <Button variant="primary" href={waLink(c.waMessage)} className="mt-2 !text-sm">
                    {c.waLabel}
                  </Button>
                </div>
              ) : null}
              {site.email ? (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-foreground">
                    E-posta
                  </p>
                  <a className="mt-1 break-all font-medium text-primary hover:underline" href={`mailto:${site.email}`}>
                    {site.email}
                  </a>
                </div>
              ) : null}
              {site.hours ? (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-foreground">
                    Çalışma saatleri
                  </p>
                  <p className="mt-1">{site.hours}</p>
                </div>
              ) : null}
            </address>
          </section>

          <section
            className="rounded-[var(--radius-card)] border border-black/[0.06] bg-background p-5 ring-1 ring-black/[0.04]"
            aria-labelledby="yonlendirme-heading"
          >
            <h2 id="yonlendirme-heading" className="font-serif text-lg text-foreground">
              Neyi nereden sorabilirsiniz?
            </h2>
            <ul className="mt-3 space-y-3 font-sans text-sm leading-relaxed text-muted">
              <li>
                <strong className="text-foreground">Perakende (gramaj, paket, stok):</strong>{" "}
                WhatsApp veya telefon — hızlı yanıt için uygundur.
              </li>
              <li>
                <strong className="text-foreground">Toptan (miktar, palet, teklif):</strong>{" "}
                Önce{" "}
                <a href="/toptan-satis#teklif" className="font-medium text-primary underline">
                  toptan formu
                </a>
                ; ek belge gerekiyorsa e-posta veya form.
              </li>
              <li>
                <strong className="text-foreground">Yazılı özet / ek dosya:</strong> bu
                sayfadaki form.
              </li>
            </ul>
          </section>
        </div>

        <div className="rounded-[var(--radius-card)] bg-surface/80 p-6 ring-1 ring-black/5 md:p-8">
          <h2 className="font-serif text-xl text-foreground">Kısa mesaj formu</h2>
          <p className="mt-2 font-sans text-sm text-muted">
            Ad, iletişim ve tek paragraf mesaj yeterlidir. Toptan için mümkünse{" "}
            <a href="/toptan-satis#teklif" className="font-medium text-primary underline">
              toptan talep formunu
            </a>{" "}
            kullanın; alanlar işletme ihtiyacına göre optimize edilmiştir.
          </p>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>
      </Container>
    </main>
  );
}
