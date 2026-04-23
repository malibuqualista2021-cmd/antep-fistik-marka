import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { mapsLink, site, waLink } from "@/lib/site";

const links = [
  { href: "/urunler", label: "Ürünler" },
  { href: "/toptan-satis", label: "Toptan satış" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/sikca-sorulan-sorular", label: "SSS" },
  { href: "/iletisim", label: "İletişim" },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-black/10 bg-surface/60">
      <Container className="grid gap-10 py-12 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <p className="font-serif text-xl font-semibold text-primary">
            {site.name}
          </p>
          <p className="mt-2 max-w-sm font-sans text-sm text-muted">
            {site.footerBlurb}
          </p>
        </div>
        <div>
          <p className="font-sans text-sm font-semibold text-foreground">
            Sayfalar
          </p>
          <ul className="mt-3 space-y-2">
            {links.map((l) => (
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
            {site.email ? (
              <p>
                <a className="hover:text-primary" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
              </p>
            ) : null}
            {site.whatsappE164 ? (
              <p>
                <a
                  className="font-medium text-primary hover:text-primary-hover"
                  href={waLink()}
                >
                  WhatsApp
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
