import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { footerProducerNote } from "@/lib/copy";
import { mapsEmbedUrl, mapsLink, site, waLink } from "@/lib/site";

const alisveris = [
  { href: "/urunler", label: "Antep fıstığı mağazası" },
  { href: "/sepet", label: "Sepet" },
  { href: "/kargo-teslimat", label: "Kargo ve teslimat" },
  { href: "/iade-degisim", label: "İade ve değişim" },
  { href: "/mesafeli-satis-sozlesmesi", label: "Mesafeli satış sözleşmesi" },
  { href: "/on-bilgilendirme-formu", label: "Ön bilgilendirme formu" },
];

const kurumsal = [
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/iletisim", label: "İletişim" },
  { href: "/sikca-sorulan-sorular", label: "Sık sorulan sorular" },
  { href: "/toptan-satis", label: "Toptan satış" },
];

const kategoriler = [
  { href: "/urunler?kategori=kabuklu", label: "Kabuklu Antep fıstığı" },
  { href: "/urunler?kategori=ic", label: "İç Antep fıstığı" },
  { href: "/urunler?kategori=boz", label: "Boz iç" },
  { href: "/urunler?kullanim=baklavalik", label: "Baklavalık fıstık" },
  { href: "/urunler?kategori=kabuklu&islem=kavrulmus", label: "Kavrulmuş fıstık" },
  { href: "/urunler?islem=cig", label: "Çiğ fıstık" },
];

const guven = [
  { href: "/kvkk-gizlilik", label: "KVKK / gizlilik" },
  { href: "/kargo-teslimat", label: "Kargo şartları" },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-[var(--border-subtle)] bg-[var(--surface)]/80">
      <Container className="grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-6">
        <div className="lg:col-span-2">
          <p className="font-serif text-xl font-semibold text-primary">{site.name}</p>
          <p className="mt-2 max-w-sm font-sans text-sm leading-relaxed text-muted">{site.footerBlurb}</p>
          <p className="mt-3 max-w-sm font-sans text-xs leading-relaxed text-[var(--ink-soft)]">{footerProducerNote(site.name)}</p>
          <p className="mt-3 font-sans text-xs font-semibold uppercase tracking-wide text-[var(--walnut)]">
            Gaziantep · İnal Fıstık
          </p>
        </div>
        <div>
          <p className="font-sans text-sm font-semibold text-foreground">Alışveriş</p>
          <ul className="mt-3 space-y-2">
            {alisveris.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="font-sans text-sm text-muted hover:text-primary">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-sans text-sm font-semibold text-foreground">Kurumsal</p>
          <ul className="mt-3 space-y-2">
            {kurumsal.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="font-sans text-sm text-muted hover:text-primary">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-sans text-sm font-semibold text-foreground">Kategoriler</p>
          <ul className="mt-3 space-y-2">
            {kategoriler.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="font-sans text-sm text-muted hover:text-primary">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-sans text-sm font-semibold text-foreground">İletişim</p>
          <address className="mt-3 not-italic font-sans text-sm text-muted space-y-1">
            {site.phone ? (
              <p>
                <a className="hover:text-primary" href={`tel:${site.phoneE164}`}>
                  {site.phone}
                </a>
              </p>
            ) : (
              <p>Telefon: İletişim formundan paylaşılır</p>
            )}
            {site.whatsappE164 ? (
              <p>
                <a className="font-medium text-primary hover:underline" href={waLink()}>
                  WhatsApp
                </a>
              </p>
            ) : (
              <p>
                <Link className="font-medium text-primary hover:underline" href="/iletisim">
                  WhatsApp desteği için yazın
                </Link>
              </p>
            )}
            {site.email ? (
              <p>
                <a className="hover:text-primary" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
              </p>
            ) : (
              <p>
                <Link className="hover:text-primary" href="/iletisim">
                  E-posta bilgisi için iletişime geçin
                </Link>
              </p>
            )}
            {site.address.line1 || site.address.line2 ? (
              <p>
                {site.address.line1} {site.address.line2}
              </p>
            ) : (
              <p>Gaziantep merkezli sevkiyat noktası</p>
            )}
            {mapsLink() ? (
              <p>
                <a className="font-medium text-primary hover:underline" href={mapsLink()} target="_blank" rel="noopener noreferrer">
                  Haritada aç
                </a>
              </p>
            ) : null}
            {site.socialInstagram ? (
              <p>
                <a className="hover:text-primary" href={site.socialInstagram} target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
              </p>
            ) : null}
            {site.hours ? <p>{site.hours}</p> : null}
          </address>
        </div>
        <div>
          <p className="font-sans text-sm font-semibold text-foreground">Güven</p>
          <ul className="mt-3 space-y-2">
            {guven.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="font-sans text-sm text-muted hover:text-primary">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-4 font-sans text-xs text-muted">Güvenli ödeme · Taze paketleme · SSL ile korunan iletişim</p>
        </div>
      </Container>

      <div className="border-t border-[var(--border-subtle)] bg-[var(--paper)]/90">
        <Container className="grid gap-8 py-10 md:grid-cols-2 md:items-stretch md:gap-10">
          <div>
            <h2 className="font-serif text-xl font-semibold text-foreground md:text-2xl">Adres</h2>
            <p className="mt-2 font-sans text-sm text-muted">Gaziantep, Nizip</p>
            <address className="mt-4 not-italic font-sans text-sm leading-relaxed text-foreground">
              <p>{site.address.line1}</p>
              <p className="mt-1">{site.address.line2}</p>
            </address>
            <p className="mt-5 font-sans text-sm font-semibold text-foreground">WhatsApp</p>
            <p className="mt-1 font-sans text-sm">
              <a href={waLink()} className="font-medium text-primary underline-offset-2 hover:underline" target="_blank" rel="noopener noreferrer">
                {site.phone}
              </a>
            </p>
            {mapsLink() ? (
              <p className="mt-4">
                <a
                  className="inline-flex font-sans text-sm font-semibold text-[var(--walnut)] underline-offset-2 hover:text-primary hover:underline"
                  href={mapsLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google Haritalar’da aç
                </a>
              </p>
            ) : null}
          </div>
          <div className="min-h-[220px] overflow-hidden rounded-[var(--radius-card)] ring-1 ring-[var(--border-subtle)] md:min-h-[280px]">
            {mapsEmbedUrl() ? (
              <iframe
                title={`${site.name} — Nizip mağaza konumu`}
                src={mapsEmbedUrl()}
                className="h-[min(55vh,22rem)] w-full border-0 md:h-full md:min-h-[280px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            ) : null}
          </div>
        </Container>
      </div>

      <div className="border-t border-black/5 bg-[var(--cream)]/90">
        <Container className="flex flex-col gap-2 py-4 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. Tüm hakları saklıdır.
          </p>
        </Container>
      </div>
    </footer>
  );
}
