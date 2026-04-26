import { pistachioImages } from "@/lib/pistachio-images";
import { publicEnv } from "@/lib/env-public";

export type SiteAddress = {
  line1: string;
  line2: string;
};

export type HeroImages = {
  main: string;
  packaging: string;
  logistics: string;
};

export type TrustImages = {
  depot: string;
  packaging: string;
  product: string;
  quality: string;
};

export type Testimonial = { quote: string; attribution: string };

function parseYearsInBusiness(): number | null {
  const raw = publicEnv("NEXT_PUBLIC_YEARS_IN_BUSINESS").trim();
  if (!raw) return null;
  const n = Number(raw);
  if (!Number.isFinite(n) || n <= 0) return null;
  return n;
}

function parseTestimonials(): Testimonial[] {
  const raw = publicEnv("NEXT_PUBLIC_TRUST_TESTIMONIALS_JSON");
  if (!raw.trim()) return [];
  try {
    const data = JSON.parse(raw) as unknown;
    if (!Array.isArray(data)) return [];
    return data
      .filter(
        (x): x is Testimonial =>
          typeof x === "object" &&
          x !== null &&
          "quote" in x &&
          "attribution" in x &&
          typeof (x as Testimonial).quote === "string" &&
          typeof (x as Testimonial).attribution === "string",
      )
      .slice(0, 2);
  } catch {
    return [];
  }
}

const DEFAULT_ADDRESS_LINE1 = "Fırat Mahallesi Caddesi, Demirbilek Sokak No:7, Daire:5";
const DEFAULT_ADDRESS_LINE2 = "Nizip / Gaziantep";
const DEFAULT_MAPS_QUERY = "Fırat Mahallesi, Demirbilek Sokak No:7, Nizip, Gaziantep, Türkiye";
const DEFAULT_PHONE_DISPLAY = "+90 543 383 18 73";
const DEFAULT_PHONE_E164 = "905433831873";

/**
 * İletişim: .env ile üzerine yazılabilir; tanımlı değilse Nizip mağaza adresi ve WhatsApp varsayılanı kullanılır.
 */
export const site = {
  name: publicEnv("NEXT_PUBLIC_SITE_NAME") || "İnal Fıstık",
  shortName: publicEnv("NEXT_PUBLIC_SITE_SHORT_NAME") || "İnal Fıstık",
  description:
    publicEnv("NEXT_PUBLIC_SITE_DESCRIPTION") ||
    "Gaziantep merkezli Antep fıstığı: perakende paketler ve toptan parti tedariki.",
  footerBlurb:
    publicEnv("NEXT_PUBLIC_SITE_FOOTER_BLURB") ||
    "Gaziantep merkezli Antep fıstığı tedariki. Perakende paket ve toptan parti; teklif ve sevkiyat bilgisi net iletişimle paylaşılır.",
  url: publicEnv("NEXT_PUBLIC_SITE_URL").trim(),
  /** Yalnızca .env ile verilirse gösterilir (varsayılan yok). */
  yearsInBusiness: parseYearsInBusiness(),
  phone: publicEnv("NEXT_PUBLIC_PHONE_DISPLAY").trim() || DEFAULT_PHONE_DISPLAY,
  phoneE164: (() => {
    const raw = publicEnv("NEXT_PUBLIC_PHONE_E164").replace(/\s/g, "");
    return raw || DEFAULT_PHONE_E164;
  })(),
  whatsappE164: (() => {
    const raw = publicEnv("NEXT_PUBLIC_WHATSAPP_E164").replace(/\s/g, "");
    return raw || DEFAULT_PHONE_E164;
  })(),
  email: publicEnv("NEXT_PUBLIC_EMAIL").trim(),
  address: {
    line1: publicEnv("NEXT_PUBLIC_ADDRESS_LINE1").trim() || DEFAULT_ADDRESS_LINE1,
    line2: publicEnv("NEXT_PUBLIC_ADDRESS_LINE2").trim() || DEFAULT_ADDRESS_LINE2,
  } satisfies SiteAddress,
  hours: publicEnv("NEXT_PUBLIC_HOURS").trim(),
  /** Ortalama dönüş süresi — boşsa bileşen varsayılan metin kullanır */
  responseTimeHint:
    publicEnv("NEXT_PUBLIC_RESPONSE_TIME_HINT").trim() ||
    "İş günlerinde yazılı taleplere genelde aynı gün içinde ilk yanıt hedeflenir; yoğunluğa göre değişebilir.",
  /** Sertifika / belge açıklaması; boşsa ilgili blok gösterilmez */
  certificatesNote: publicEnv("NEXT_PUBLIC_CERTIFICATES_NOTE").trim(),
  wholesaleFormIntro:
    publicEnv("NEXT_PUBLIC_WHOLESALE_FORM_INTRO").trim() ||
    "İşletme adı, ürün ve yaklaşık miktar yeterlidir. Teklif hazırlığı için ek sorular gerektiğinde aynı kanaldan döneriz.",
  mapsUrl: publicEnv("NEXT_PUBLIC_MAPS_URL").trim(),
  mapsQuery: publicEnv("NEXT_PUBLIC_MAPS_QUERY").trim() || DEFAULT_MAPS_QUERY,
  socialInstagram: publicEnv("NEXT_PUBLIC_INSTAGRAM_URL").trim(),
  heroImages: {
    main:
      publicEnv("NEXT_PUBLIC_HERO_IMAGE_MAIN").trim() || pistachioImages.hero.main,
    packaging:
      publicEnv("NEXT_PUBLIC_HERO_IMAGE_PACKAGING").trim() ||
      pistachioImages.hero.packaging,
    logistics:
      publicEnv("NEXT_PUBLIC_HERO_IMAGE_LOGISTICS").trim() ||
      pistachioImages.hero.logistics,
  } satisfies HeroImages,
  trustImages: {
    depot:
      publicEnv("NEXT_PUBLIC_TRUST_IMAGE_DEPOT").trim() ||
      pistachioImages.trust.depot,
    packaging:
      publicEnv("NEXT_PUBLIC_TRUST_IMAGE_PACKAGING").trim() ||
      pistachioImages.trust.packaging,
    product:
      publicEnv("NEXT_PUBLIC_TRUST_IMAGE_PRODUCT").trim() ||
      pistachioImages.trust.product,
    quality:
      publicEnv("NEXT_PUBLIC_TRUST_IMAGE_QUALITY").trim() ||
      pistachioImages.trust.quality,
  } satisfies TrustImages,
  testimonials: parseTestimonials(),
};

export function waLink(text?: string) {
  if (!site.whatsappE164) return "/iletisim";
  const base = `https://wa.me/${site.whatsappE164}`;
  if (!text) return base;
  return `${base}?text=${encodeURIComponent(text)}`;
}

export function mapsLink(): string {
  if (site.mapsUrl) return site.mapsUrl;
  const q = site.mapsQuery || `${site.address.line1} ${site.address.line2}`.trim();
  if (!q) return "";
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
}

/** Google Haritalar gömülü harita (API anahtarı gerekmez). */
export function mapsEmbedUrl(): string {
  const q = site.mapsQuery || `${site.address.line1} ${site.address.line2}`.trim();
  if (!q) return "";
  return `https://maps.google.com/maps?q=${encodeURIComponent(q)}&hl=tr&z=16&output=embed`;
}
