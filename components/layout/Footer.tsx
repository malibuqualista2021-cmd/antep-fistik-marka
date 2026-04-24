import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { mapsLink, site, waLink } from "@/lib/site";

const links = [
  { href: "/urunler", label: "Perakende Ürünler" },
  { href: "/sepet", label: "Sepet" },
  { href: "/kargo-teslimat", label: "Kargo ve teslimat" },
  { href: "/iade-degisim", label: "İade ve değişim" },
];

const corporateLinks = [
  { href: "/toptan-satis", label: "Toptan Satış" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/sikca-sorulan-sorular", label: "SSS" },
  { href: "/iletisim", label: "İletişim" },
];

const legalLinks = [
  { href: "/mesafeli-satis-sozlesmesi", label: "Mesafeli satış" },
  { href: "/on-bilgilendirme-formu", label: "Ön bilgilendirme" },
  { href: "/kvkk-gizlilik", label: "KVKK / gizlilik" },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-black/10 bg-surface/60">
      <Container className="grid gap-10 py-12 md:grid-cols-[1.15fr_0.9fr_0.9fr_1fr_0.9fr]">
        <div>
          <p className="font-serif text-xl font-semibold text-primary">
            {site.name}
          </p>
          <p className="mt-2 max-w-sm font-sans text-sm text-muted">
            {site.footerBlurb}
          </p>
          <p className="mt-3 font-sans text-xs font-semibold uppercase tracking-wide text-muted">
            Gaziantep merkezli · perakende ve toptan tedarik
          </p>
        </div>
        <div>
          <p className="font-sans text-sm font-semibold text-foreground">
            Alışveriş
          </p>
          <ul className="mt-3 space-y-2">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="font-sans text-sm text-muted hover:text-primary">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-sans text-sm font-semibold text-foreground">
            Kurumsal
          </p>
          <ul className="mt-3 space-y-2">
            {corporateLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="font-sans text-sm text-muted hover:text-primary"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-sans text-sm font-semibold text-foreground">
            İletişim
          </p>
          <address className="mt-3 not-italic font-sans text-sm text-muted space-y-1">
            {site.address.line1 ? <p>{site.address.line1}</p> : null}
            {site.address.line2 ? <p>{site.address.line2}</p> : null}
            {mapsLink() ? (
              <p>
                <a
                  className="font-medium text-primary hover:underline"
                  href={mapsLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Konum
                </a>
              </p>
            ) : null}
            {site.phone ? (
              <p>
                <a className="hover:text-primary" href={`tel:${site.phoneE164}`}>
                  {site.phone}
                </a>
              </p>
            ) : null}
            {site.whatsappE164 ? (
              <p>
                <a
                  className="font-medium text-primary hover:text-primary-hover"
                  href={waLink()}
                >
                  WhatsApp ile yaz
                </a>
              </p>
            ) : null}
            {site.email ? (
              <p>
                <a className="hover:text-primary" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
              </p>
            ) : null}
            {site.socialInstagram ? (
              <p>
                <a
                  className="hover:text-primary"
                  href={site.socialInstagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </p>
            ) : null}
          </address>
        </div>
        <div>
          <p className="font-sans text-sm font-semibold text-foreground">
            Güven / Hukuki
          </p>
          <ul className="mt-3 space-y-2">
            {legalLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="font-sans text-sm text-muted hover:text-primary">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
      <div className="border-t border-black/5 bg-background/80">
        <Container className="flex flex-col gap-2 py-4 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. Tüm hakları saklıdır.</p>
          {site.hours ? <p className="text-muted/90">{site.hours}</p> : null}
        </Container>
      </div>
    </footer>
  );
}
