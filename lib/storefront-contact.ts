import { site, type SiteAddress } from "@/lib/site";
import type { SiteContactOverrides } from "@/lib/site-settings-types";

export type ResolvedStorefrontContact = {
  phoneDisplay: string;
  phoneE164: string;
  whatsappE164: string;
  email: string;
  address: SiteAddress;
  hours: string;
  mapsUrl: string;
  mapsQuery: string;
  socialInstagram: string;
  responseTimeHint: string;
  wholesaleFormIntro: string;
  certificatesNote: string;
};

function digits(s: string): string {
  return s.replace(/\s/g, "");
}

export function resolveStorefrontContact(overrides: SiteContactOverrides | undefined): ResolvedStorefrontContact {
  const x = overrides ?? {};
  const phoneE164 = digits(x.phoneE164 ?? "") || site.phoneE164;
  const whatsappE164 = digits(x.whatsappE164 ?? "") || phoneE164;
  return {
    phoneDisplay: x.phoneDisplay?.trim() || site.phone,
    phoneE164,
    whatsappE164,
    email: x.email?.trim() || site.email,
    address: {
      line1: x.addressLine1?.trim() || site.address.line1,
      line2: x.addressLine2?.trim() || site.address.line2,
    },
    hours: x.hours?.trim() || site.hours,
    mapsUrl: x.mapsUrl?.trim() || site.mapsUrl,
    mapsQuery: x.mapsQuery?.trim() || site.mapsQuery,
    socialInstagram: x.socialInstagram?.trim() || site.socialInstagram,
    responseTimeHint: x.responseTimeHint?.trim() || site.responseTimeHint,
    wholesaleFormIntro: x.wholesaleFormIntro?.trim() || site.wholesaleFormIntro,
    certificatesNote: x.certificatesNote?.trim() || site.certificatesNote,
  };
}

export function waLinkResolved(c: ResolvedStorefrontContact, text?: string): string {
  if (!c.whatsappE164) return "/iletisim";
  const base = `https://wa.me/${c.whatsappE164}`;
  if (!text) return base;
  return `${base}?text=${encodeURIComponent(text)}`;
}

export function mapsLinkResolved(c: ResolvedStorefrontContact): string {
  if (c.mapsUrl) return c.mapsUrl;
  const q = c.mapsQuery || `${c.address.line1} ${c.address.line2}`.trim();
  if (!q) return "";
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
}

export function mapsEmbedUrlResolved(c: ResolvedStorefrontContact): string {
  const q = c.mapsQuery || `${c.address.line1} ${c.address.line2}`.trim();
  if (!q) return "";
  return `https://maps.google.com/maps?q=${encodeURIComponent(q)}&hl=tr&z=16&output=embed`;
}
