import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { site, mapsLink, waLink } from "@/lib/site";

/** Bento ızgarası: ürün 2×2, yan hücreler depo/paket, alt şerit kalite */
const bentoCells: {
  key: "product" | "depot" | "packaging" | "quality";
  label: string;
  className: string;
}[] = [
  {
    key: "product",
    label: "Ürün seçimi",
    className: "col-span-2 row-span-2 min-h-[200px] md:min-h-0",
  },
  { key: "depot", label: "Stok & düzen", className: "col-start-3 row-start-1 min-h-[120px]" },
  { key: "packaging", label: "Parti / paket", className: "col-start-3 row-start-2 min-h-[120px]" },
  {
    key: "quality",
    label: "İç kalite",
    className: "col-span-3 row-start-3 min-h-[100px] md:min-h-[120px]",
  },
];

export function TrustBand() {
  const ti = site.trustImages;
  const srcMap = {
    depot: ti.depot,
    packaging: ti.packaging,
    product: ti.product,
    quality: ti.quality,
  };
  const altMap = {
    depot: "Toptan stok ve dükkân düzeni",
    packaging: "Taze parti ve paketleme hazırlığı",
    product: "Antep fıstığı ürün seçimi yakın çekim",
    quality: "İç fıstık renk ve doku uyumu",
  };

  return (
    <section className="section-y border-t border-black/[0.07] bg-[color-mix(in_srgb,var(--cream)_40%,var(--background))]" aria-labelledby="trust-heading">
      <Container>
        <div className="max-w-3xl">
          <p className="font-sans text-sm font-semibold uppercase tracking-[0.12em] text-accent">
            Güven katmanı
          </p>
          <h2
            id="trust-heading"
            className="mt-2 font-serif text-[1.85rem] leading-[1.08] text-foreground sm:text-[2.25rem] md:text-[2.65rem]"
          >
            Gerçek operasyon, açık iletişim
          </h2>
          <p className="mt-4 font-sans text-base leading-relaxed text-muted md:text-lg">
            Görseller ürün ve sahayı anlatır; metinler ise nasıl çalıştığımızı ve hangi
            bilgilerin teklifte yazıldığını netleştirir. İsimli referans yalnızca izinle
            paylaşılır — önce ürün ve numune ile ilerlemenizi öneririz.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-start">
          <div className="card-elevated space-y-5 rounded-[var(--radius-xl)] p-6 md:p-8">
            <div>
              <h3 className="font-serif text-xl text-foreground">İşletme kartı</h3>
              <p className="mt-2 font-sans text-sm leading-relaxed text-muted">
                {site.yearsInBusiness != null ? (
                  <>
                    {site.yearsInBusiness}+ yıldır Gaziantep merkezli fıstık ticareti;
                    perakende ve toptan aynı seçim disiplininde.
                  </>
                ) : (
                  <>
                    Gaziantep merkezli Antep fıstığı ticareti; perakende paket ve toptan
                    parti tedariki.
                  </>
                )}
              </p>
            </div>
            {site.address.line1 || site.address.line2 ? (
              <dl className="grid gap-3 font-sans text-sm">
                <div className="rounded-[12px] bg-background/90 px-4 py-3 ring-1 ring-black/[0.06]">
                  <dt className="text-muted">Açık adres</dt>
                  <dd className="mt-1 text-foreground">
                    {site.address.line1}
                    {site.address.line2 ? (
                      <>
                        <br />
                        {site.address.line2}
                      </>
                    ) : null}
                  </dd>
                </div>
                {site.phone ? (
                  <div className="rounded-[12px] bg-background/90 px-4 py-3 ring-1 ring-black/[0.06]">
                    <dt className="text-muted">Telefon</dt>
                    <dd className="mt-1">
                      <a className="font-semibold text-primary hover:underline" href={`tel:${site.phoneE164}`}>
                        {site.phone}
                      </a>
                    </dd>
                  </div>
                ) : null}
                {site.hours ? (
                  <div className="rounded-[12px] bg-background/90 px-4 py-3 ring-1 ring-black/[0.06]">
                    <dt className="text-muted">Çalışma saatleri</dt>
                    <dd className="mt-1 text-foreground">{site.hours}</dd>
                  </div>
                ) : null}
              </dl>
            ) : (
              <p className="rounded-[12px] bg-background/90 px-4 py-3 font-sans text-sm text-muted ring-1 ring-black/[0.06]">
                Ziyaret ve konum bilgisi randevu/onay sonrası paylaşılır. Şimdilik{" "}
                <Link href="/iletisim" className="font-semibold text-primary underline">
                  iletişim
                </Link>{" "}
                üzerinden ulaşın.
              </p>
            )}
            <p className="font-sans text-sm text-muted">
              Depo ziyareti{" "}
              <strong className="font-medium text-foreground">randevu ve onay</strong> ile.
            </p>
            <div className="flex flex-wrap gap-5 font-sans text-sm font-semibold text-primary">
              <Link href="/iletisim" className="underline-offset-4 hover:underline">
                İletişim
              </Link>
              {mapsLink() ? (
                <a href={mapsLink()} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">
                  Haritada aç
                </a>
              ) : null}
            </div>
          </div>

          <div>
            <p className="font-sans text-xs font-semibold uppercase tracking-wide text-muted">
              Operasyon bento
            </p>
            <ul className="mt-3 grid min-h-[280px] grid-cols-3 grid-rows-3 gap-2 md:min-h-[360px] md:gap-3">
              {bentoCells.map((cell) => (
                <li
                  key={cell.key}
                  className={`overflow-hidden rounded-[14px] bg-background ring-1 ring-black/[0.06] ${cell.className}`}
                >
                  <figure className="flex h-full min-h-0 flex-col">
                    <div className="relative min-h-0 flex-1">
                      <ImageSlot
                        src={srcMap[cell.key]}
                        alt={altMap[cell.key]}
                        wrapperClassName="absolute inset-0 h-full w-full min-h-[96px]"
                        sizes="(max-width: 768px) 33vw, 18vw"
                      />
                    </div>
                    <figcaption className="shrink-0 border-t border-black/[0.06] px-2 py-1.5 text-center font-sans text-[11px] font-medium text-muted">
                      {cell.label}
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 md:gap-6">
          <div className="card-elevated rounded-[var(--radius-card)] p-6 md:p-7">
            <h3 className="font-serif text-xl text-foreground">Sevkiyat özeti</h3>
            <p className="mt-3 font-sans text-sm leading-relaxed text-muted">
              Çıkış öncesi parti ve miktar teyidi, taşıma şekli ve teslim penceresi yazılı
              sipariş özetinde yer alır. Düzenli alımlarda takvim ortak planlanır.
            </p>
          </div>
          <div className="card-elevated rounded-[var(--radius-card)] p-6 md:p-7">
            <h3 className="font-serif text-xl text-foreground">Referans dürüstlüğü</h3>
            {site.testimonials.length > 0 ? (
              <div className="mt-4 space-y-6">
                {site.testimonials.map((t, i) => (
                  <figure key={i}>
                    <blockquote className="border-l-[3px] border-accent pl-3 font-sans text-sm not-italic leading-relaxed text-muted">
                      “{t.quote}”
                    </blockquote>
                    <figcaption className="mt-2 font-sans text-xs text-foreground/90">— {t.attribution}</figcaption>
                  </figure>
                ))}
              </div>
            ) : (
              <p className="mt-3 font-sans text-sm leading-relaxed text-muted">
                İsim veya şirket adı içeren referanslar yalnızca izinli müşterilerde paylaşılır.
                İlk iş birliğinde numune veya küçük deneme partisi ile ürünü sahada görmenizi
                öneririz.
              </p>
            )}
            {site.certificatesNote ? (
              <p className="mt-4 rounded-[10px] bg-surface/90 px-3 py-2 font-sans text-sm text-foreground ring-1 ring-black/[0.06]">
                {site.certificatesNote}
              </p>
            ) : null}
            <a
              href={waLink("Numune veya referans süreci hakkında bilgi almak istiyorum.")}
              className="mt-5 inline-flex min-h-[44px] items-center font-sans text-sm font-semibold text-primary underline-offset-4 hover:underline"
            >
              Numune / referans süreci
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
