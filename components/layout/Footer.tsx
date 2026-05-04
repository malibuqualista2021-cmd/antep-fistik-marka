import Link from "next/link";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { Container } from "@/components/ui/Container";
import { footerProducerNote } from "@/lib/copy";
import { mapsEmbedUrlResolved, mapsLinkResolved, waLinkResolved } from "@/lib/storefront-contact";
import type { SitePresentation } from "@/lib/site-presentation";

const alisveris = [
  { href: "/urunler", label: "Antep fıstığı mağazası" },
  { href: "/sepet", label: "Sepet" },
  { href: "/odeme", label: "Ödeme" },
];

const kurumsal = [
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/iletisim", label: "İletişim" },
  { href: "/sikca-sorulan-sorular", label: "Sık sorulan sorular" },
  { href: "/toptan-satis", label: "Toptan satış" },
];

/** Kargo, iade, KVKK, mesafeli satış ve işletme — vitrin altı standart bağlantılar */
const yasalVeIsletme = [
  { href: "/kargo-teslimat", label: "Kargo ve teslimat" },
  { href: "/iade-degisim", label: "İade ve değişim" },
  { href: "/kvkk-gizlilik", label: "KVKK / gizlilik" },
  { href: "/mesafeli-satis-sozlesmesi", label: "Mesafeli satış sözleşmesi" },
  { href: "/on-bilgilendirme-formu", label: "Ön bilgilendirme formu" },
  { href: "/hakkimizda#isletme-bilgileri", label: "İşletme bilgileri" },
] as const;

export function Footer({ presentation }: { presentation: SitePresentation }) {
  const brand = presentation.branding;
  const c = presentation.contact;
  const mapHref = mapsLinkResolved(c);
  const embedHref = mapsEmbedUrlResolved(c);
  const categoryLinks = presentation.categories.map((cat) => ({
    href: `/urunler?kategori=${encodeURIComponent(cat.id)}`,
    label: cat.label,
  }));
  const footerCategoryNav = [...categoryLinks, ...presentation.footerExtraLinks];

  return (
    <footer className="mt-auto border-t border-[var(--border-subtle)] bg-[var(--surface)]/80">
      <Container className="grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-7">
        <div className="lg:col-span-2">
          <BrandLogo variant="footer" className="max-w-full" />
          <p className="sr-only">{brand.name}</p>
          <p className="mt-2 max-w-sm font-sans text-sm leading-relaxed text-muted">{brand.footerBlurb}</p>
          <p className="mt-3 max-w-sm font-sans text-xs leading-relaxed text-[var(--ink-soft)]">{footerProducerNote(brand.name)}</p>
          <p className="mt-3 font-sans text-xs font-semibold uppercase tracking-wide text-[var(--walnut)]">{presentation.footerTagline}</p>
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
            {footerCategoryNav.map((l) => (
              <li key={`${l.href}-${l.label}`}>
                <Link href={l.href} className="font-sans text-sm text-muted hover:text-primary">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-sans text-sm font-semibold text-foreground">Yasal ve işletme</p>
          <ul className="mt-3 space-y-2">
            {yasalVeIsletme.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="font-sans text-sm text-muted hover:text-primary">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-4 font-sans text-xs leading-relaxed text-muted">Güvenli ödeme · Taze paketleme · Şeffaf gramaj</p>
        </div>
        <div>
          <p className="font-sans text-sm font-semibold text-foreground">İletişim</p>
          <address className="mt-3 not-italic font-sans text-sm text-muted space-y-1">
            {c.phoneDisplay ? (
              <p>
                <a className="hover:text-primary" href={`tel:${c.phoneE164}`}>
                  {c.phoneDisplay}
                </a>
              </p>
            ) : (
              <p>Telefon: İletişim formundan paylaşılır</p>
            )}
            {c.whatsappE164 ? (
              <p>
                <a className="font-medium text-primary hover:underline" href={waLinkResolved(c)}>
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
            {c.email ? (
              <p>
                <a className="hover:text-primary" href={`mailto:${c.email}`}>
                  {c.email}
                </a>
              </p>
            ) : (
              <p>
                <Link className="hover:text-primary" href="/iletisim">
                  E-posta bilgisi için iletişime geçin
                </Link>
              </p>
            )}
            {c.address.line1 || c.address.line2 ? (
              <p>
                {c.address.line1} {c.address.line2}
              </p>
            ) : (
              <p>Gaziantep merkezli sevkiyat noktası</p>
            )}
            {mapHref ? (
              <p>
                <a className="font-medium text-primary hover:underline" href={mapHref} target="_blank" rel="noopener noreferrer">
                  Haritada aç
                </a>
              </p>
            ) : null}
            {c.socialInstagram ? (
              <p>
                <a className="hover:text-primary" href={c.socialInstagram} target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
              </p>
            ) : null}
            {c.hours ? <p>{c.hours}</p> : null}
          </address>
        </div>
      </Container>

      <div className="border-t border-[var(--border-subtle)] bg-[var(--paper)]/90">
        <Container className="grid gap-8 py-10 md:grid-cols-2 md:items-stretch md:gap-10">
          <div>
            <h2 className="font-serif text-xl font-semibold text-foreground md:text-2xl">Adres</h2>
            <p className="mt-2 font-sans text-sm text-muted">Gaziantep, Nizip</p>
            <address className="mt-4 not-italic font-sans text-sm leading-relaxed text-foreground">
              <p>{c.address.line1}</p>
              <p className="mt-1">{c.address.line2}</p>
            </address>
            <p className="mt-5 font-sans text-sm font-semibold text-foreground">WhatsApp</p>
            <p className="mt-1 font-sans text-sm">
              <a href={waLinkResolved(c)} className="font-medium text-primary underline-offset-2 hover:underline" target="_blank" rel="noopener noreferrer">
                {c.phoneDisplay}
              </a>
            </p>
            {mapHref ? (
              <p className="mt-4">
                <a
                  className="inline-flex font-sans text-sm font-semibold text-[var(--walnut)] underline-offset-2 hover:text-primary hover:underline"
                  href={mapHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google Haritalar’da aç
                </a>
              </p>
            ) : null}
          </div>
          <div className="min-h-[220px] overflow-hidden rounded-[var(--radius-card)] ring-1 ring-[var(--border-subtle)] md:min-h-[280px]">
            {embedHref ? (
              <iframe
                title={`${brand.name} — Nizip mağaza konumu`}
                src={embedHref}
                className="h-[min(55vh,22rem)] w-full border-0 md:h-full md:min-h-[280px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            ) : null}
          </div>
        </Container>
      </div>

      <div className="border-t border-[var(--line-soft)] bg-[var(--cream)]/90">
        <Container className="flex flex-col gap-2 py-4 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {brand.name}. Tüm hakları saklıdır.
          </p>
        </Container>
      </div>
    </footer>
  );
}
