import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { PromoPopupsLayer } from "@/components/layout/PromoPopupsLayer";
import { SitePresentationProvider } from "@/components/layout/SitePresentationContext";
import { SiteShell } from "@/components/layout/SiteShell";
import "./globals.css";
import { getSitePresentation } from "@/lib/site-presentation";
import { site } from "@/lib/site";

/** Tüm vitrin + ürün fiyatları Blob/site ayarından gelsin; statik önbellekte eski fiyat kalmasın (Netlify). */
export const dynamic = "force-dynamic";

const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  variable: "--font-heading",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-body",
  display: "swap",
});

function metadataBaseUrl(): URL | undefined {
  if (!site.url) return undefined;
  try {
    return new URL(site.url);
  } catch {
    return undefined;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const p = await getSitePresentation();
  const base = metadataBaseUrl();
  return {
    metadataBase: base ?? undefined,
    title: {
      default: `${p.branding.name} | Gaziantep Antep Fıstığı — Perakende & Toptan`,
      template: `%s | ${p.branding.name}`,
    },
    description: p.branding.description,
    openGraph: {
      title: p.branding.name,
      description: p.branding.description,
      locale: "tr_TR",
      type: "website",
      ...(site.url ? { url: site.url } : {}),
    },
    icons: {
      icon: [{ url: "/icon.png", sizes: "32x32", type: "image/png" }],
      apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const presentation = await getSitePresentation();

  return (
    <html lang="tr" className={`${playfair.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        {presentation.themeInlineCss ? (
          <style id="site-theme-accent" dangerouslySetInnerHTML={{ __html: presentation.themeInlineCss }} />
        ) : null}
        <SitePresentationProvider value={presentation}>
          <SiteShell presentation={presentation}>{children}</SiteShell>
          <PromoPopupsLayer popups={presentation.promoPopups} />
        </SitePresentationProvider>
      </body>
    </html>
  );
}
