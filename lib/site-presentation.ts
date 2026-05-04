import { unstable_cache } from "next/cache";
import { heroCopy } from "@/lib/copy";
import { cta } from "@/lib/cta";
import { site } from "@/lib/site";
import type { HeroImages, TrustImages } from "@/lib/site";
import { brandPhotoAlts, brandPhotos } from "@/lib/site-images";
import { readSiteSettingsFile } from "@/lib/server/site-settings-store";
import type {
  CommerceTrustItem,
  DiscoveryTileDefinition,
  HeroTrustMicroLine,
  PromoPopupDefinition,
  RetailCategoryDefinition,
  SiteSettingsFileV1,
} from "@/lib/site-settings-types";

export type SitePresentation = {
  branding: {
    name: string;
    shortName: string;
    description: string;
    footerBlurb: string;
  };
  heroImages: HeroImages;
  trustImages: TrustImages;
  heroSection: {
    kicker: string;
    title: string;
    subtitle: string;
    trustMicro: HeroTrustMicroLine[];
    primaryLabel: string;
    primaryHref: string;
    secondaryLabel: string;
    secondaryHref: string;
    waPriceLabel: string;
    waPriceMessage: string;
  };
  campaignBanner: { text: string; linkLabel: string; href: string };
  commerceTrustBar: CommerceTrustItem[];
  shelvesCopy: {
    newHarvestTitle: string;
    newHarvestSubtitle: string;
    valuePacksTitle: string;
    valuePacksSubtitle: string;
    valuePacksCategoryId: string;
  };
  categories: RetailCategoryDefinition[];
  discoveryTiles: DiscoveryTileDefinition[];
  promoPopups: PromoPopupDefinition[];
  footerExtraLinks: { href: string; label: string }[];
  footerTagline: string;
  mediaUrls: Partial<Record<string, string>>;
};

export const DEFAULT_RETAIL_CATEGORIES: RetailCategoryDefinition[] = [
  { id: "kabuklu", label: "Kabuklu", sortOrder: 10 },
  { id: "ic", label: "İç fıstık", sortOrder: 20 },
  { id: "boz", label: "Boz iç", sortOrder: 30 },
  { id: "paket", label: "Hediye / Paket", sortOrder: 40 },
];

const DEFAULT_CAMPAIGN = {
  text: "Hafta içi 15:00'a kadar verilen siparişlerde aynı gün kargo hedefi · Ücretsiz kargo fırsatları ürün bazında",
  linkLabel: "Fırsatları gör",
  href: "/urunler",
} as const;

const DEFAULT_TRUST_BAR: CommerceTrustItem[] = [
  { title: "Hızlı kargo", text: "1–3 iş günü hedefi" },
  { title: "Güvenli ödeme", text: "512 SSL · Kartla ödeme" },
  { title: "WhatsApp destek", text: "Sipariş yardımı" },
  { title: "Taze paketleme", text: "Siparişe göre hazırlık" },
];

const DEFAULT_FOOTER_EXTRAS: { href: string; label: string }[] = [
  { href: "/urunler?kullanim=baklavalik", label: "Baklavalık fıstık" },
  { href: "/urunler?kategori=kabuklu&islem=kavrulmus", label: "Kavrulmuş fıstık" },
  { href: "/urunler?islem=cig", label: "Çiğ fıstık" },
];

const DEFAULT_FOOTER_TAGLINE = "Gaziantep · İnal Fıstık";

export function defaultDiscoveryTiles(): DiscoveryTileDefinition[] {
  return [
    {
      id: "tile-kabuklu",
      title: "Kabuklu Antep Fıstığı",
      blurb: "Kavrulmuş ve tuzlu kabuklu seriler.",
      href: "/urunler?kategori=kabuklu",
      imageSrc: brandPhotos.categoryKabuklu,
      imageAlt: brandPhotoAlts.categoryKabuklu,
      sortOrder: 10,
    },
    {
      id: "tile-ic",
      title: "İç Antep Fıstığı",
      blurb: "Baklava ve tatlı için yeşil iç.",
      href: "/urunler?kategori=ic",
      imageSrc: brandPhotos.categoryIc,
      imageAlt: brandPhotoAlts.categoryIc,
      sortOrder: 20,
    },
    {
      id: "tile-boz",
      title: "Boz İç",
      blurb: "Pastalık ve dolgu için homojen doku.",
      href: "/urunler?kategori=boz",
      imageSrc: brandPhotos.categoryBozBaklavalik,
      imageAlt: brandPhotoAlts.categoryBozBaklavalik,
      sortOrder: 30,
    },
    {
      id: "tile-baklavalik",
      title: "Baklavalık seçimi",
      blurb: "İç ve boz içte baklava üretimine uygun parti.",
      href: "/urunler?kullanim=baklavalik",
      imageSrc: brandPhotos.categoryBozBaklavalik,
      imageAlt: brandPhotoAlts.categoryBozBaklavalik,
      sortOrder: 40,
    },
    {
      id: "tile-kavrulmus",
      title: "Kavrulmuş tuzlu",
      blurb: "İkram ve günlük tüketim.",
      href: "/urunler?kategori=kabuklu&islem=kavrulmus",
      imageSrc: brandPhotos.categoryKabuklu,
      imageAlt: brandPhotoAlts.categoryKabuklu,
      sortOrder: 50,
    },
    {
      id: "tile-cig",
      title: "Çiğ / tuzsuz",
      blurb: "İç ve boz iç çiğ seriler.",
      href: "/urunler?islem=cig",
      imageSrc: brandPhotos.categoryIc,
      imageAlt: brandPhotoAlts.categoryIc,
      sortOrder: 60,
    },
    {
      id: "tile-paket",
      title: "Hediye ve paket",
      blurb: "Hazır paket ve sunum.",
      href: "/urunler?kategori=paket",
      imageSrc: brandPhotos.storeRange,
      imageAlt: brandPhotoAlts.storeRange,
      sortOrder: 70,
    },
  ];
}

function sortCategories(xs: RetailCategoryDefinition[]): RetailCategoryDefinition[] {
  return [...xs].sort((a, b) => a.sortOrder - b.sortOrder || a.label.localeCompare(b.label, "tr"));
}

function normalizeCategories(raw: RetailCategoryDefinition[] | undefined): RetailCategoryDefinition[] {
  const base = raw?.length ? raw : DEFAULT_RETAIL_CATEGORIES;
  const seen = new Set<string>();
  const out: RetailCategoryDefinition[] = [];
  for (const c of sortCategories(base)) {
    const id = (c.id || "").trim().toLowerCase();
    if (!id || seen.has(id)) continue;
    seen.add(id);
    out.push({
      id,
      label: (c.label || id).trim() || id,
      sortOrder: typeof c.sortOrder === "number" ? c.sortOrder : out.length * 10,
    });
  }
  return out.length ? sortCategories(out) : DEFAULT_RETAIL_CATEGORIES;
}

function mergeHeroImages(file: SiteSettingsFileV1 | null): HeroImages {
  const m = file?.mediaUrls ?? {};
  return {
    main: (m["hero-main"] || "").trim() || site.heroImages.main,
    packaging: (m["hero-packaging"] || "").trim() || site.heroImages.packaging,
    logistics: (m["hero-logistics"] || "").trim() || site.heroImages.logistics,
  };
}

function mergeTrustImages(file: SiteSettingsFileV1 | null): TrustImages {
  const m = file?.mediaUrls ?? {};
  return {
    depot: (m["trust-depot"] || "").trim() || site.trustImages.depot,
    packaging: (m["trust-packaging"] || "").trim() || site.trustImages.packaging,
    product: (m["trust-product"] || "").trim() || site.trustImages.product,
    quality: (m["trust-quality"] || "").trim() || site.trustImages.quality,
  };
}

function buildPresentationInner(file: SiteSettingsFileV1 | null): SitePresentation {
  const b = file?.branding ?? {};
  const heroImages = mergeHeroImages(file);
  const trustImages = mergeTrustImages(file);
  const hc = file?.heroSection ?? {};
  const h = cta.home;

  const heroSection = {
    kicker: hc.kicker?.trim() || heroCopy.kicker,
    title: hc.title?.trim() || heroCopy.title,
    subtitle: hc.subtitle?.trim() || heroCopy.subtitle,
    trustMicro: hc.trustMicro?.length ? hc.trustMicro : [...heroCopy.trustMicro],
    primaryLabel: hc.primaryLabel?.trim() || h.primaryLabel,
    primaryHref: hc.primaryHref?.trim() || h.primaryHref,
    secondaryLabel: hc.secondaryLabel?.trim() || h.secondaryLabel,
    secondaryHref: hc.secondaryHref?.trim() || h.secondaryHref,
    waPriceLabel: hc.waPriceLabel?.trim() || h.waPriceLabel,
    waPriceMessage: hc.waPriceMessage?.trim() || h.waPriceMessage,
  };

  const cb = file?.campaignBanner ?? {};
  const campaignBanner = {
    text: cb.text?.trim() || DEFAULT_CAMPAIGN.text,
    linkLabel: cb.linkLabel?.trim() || DEFAULT_CAMPAIGN.linkLabel,
    href: cb.href?.trim() || DEFAULT_CAMPAIGN.href,
  };

  const rawBar = file?.commerceTrustBar?.filter((x) => x.title?.trim() && x.text?.trim());
  const commerceTrustBar =
    rawBar && rawBar.length >= 2 && rawBar.length <= 8 ? (rawBar as CommerceTrustItem[]) : DEFAULT_TRUST_BAR;

  const sh = file?.shelvesCopy ?? {};
  const shelvesCopy = {
    newHarvestTitle: sh.newHarvestTitle?.trim() || "Yeni mahsul",
    newHarvestSubtitle:
      sh.newHarvestSubtitle?.trim() || "Sezonun taze partileri — stok ve gramaj seçenekleriyle",
    valuePacksTitle: sh.valuePacksTitle?.trim() || "Avantajlı paketler",
    valuePacksSubtitle:
      sh.valuePacksSubtitle?.trim() || "Hediye ve ikram için seçilmiş paketler ve gramajlar",
    valuePacksCategoryId: (sh.valuePacksCategoryId || "paket").trim().toLowerCase() || "paket",
  };

  const categories = normalizeCategories(file?.categories);
  const discoveryTiles = sortDiscovery(file?.discoveryTiles);
  const promoPopups = sanitizePopups(file?.promoPopups);

  return {
    branding: {
      name: b.siteName?.trim() || site.name,
      shortName: b.shortName?.trim() || site.shortName,
      description: b.description?.trim() || site.description,
      footerBlurb: b.footerBlurb?.trim() || site.footerBlurb,
    },
    heroImages,
    trustImages,
    heroSection,
    campaignBanner,
    commerceTrustBar,
    shelvesCopy,
    categories,
    discoveryTiles,
    promoPopups,
    footerExtraLinks: file?.footerExtraLinks?.filter((l) => l.href?.trim() && l.label?.trim()).length
      ? file!.footerExtraLinks!
      : DEFAULT_FOOTER_EXTRAS,
    footerTagline: file?.footerTagline?.trim() || DEFAULT_FOOTER_TAGLINE,
    mediaUrls: { ...(file?.mediaUrls ?? {}) },
  };
}

function sortDiscovery(raw: DiscoveryTileDefinition[] | undefined): DiscoveryTileDefinition[] {
  const base = raw?.length ? raw : defaultDiscoveryTiles();
  return [...base]
    .filter((t) => t.id?.trim() && t.title?.trim() && t.href?.trim() && t.imageSrc?.trim())
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
}

function sanitizePopups(raw: PromoPopupDefinition[] | undefined): PromoPopupDefinition[] {
  if (!raw?.length) return [];
  return raw
    .filter((p) => p.id?.trim() && p.title?.trim() && p.storageKey?.trim())
    .map((p) => ({
      ...p,
      id: p.id.trim(),
      title: p.title.trim(),
      body: (p.body || "").trim(),
      imageSrc: (p.imageSrc || "").trim(),
      imageAlt: (p.imageAlt || "").trim(),
      layout: p.layout === "image-left" || p.layout === "image-top" ? p.layout : "image-right",
      ctaLabel: (p.ctaLabel || "İncele").trim(),
      ctaHref: (p.ctaHref || "/urunler").trim(),
      matchRoutes: Array.isArray(p.matchRoutes) && p.matchRoutes.length ? p.matchRoutes.map((x) => x.trim()).filter(Boolean) : ["/"],
      delayMs: Math.min(Math.max(Number(p.delayMs) || 2500, 0), 60000),
      dismissDays: Math.min(Math.max(Number(p.dismissDays) || 7, 1), 365),
      storageKey: p.storageKey.trim(),
      enabled: Boolean(p.enabled),
    }));
}

export function normalizeSiteSettingsForDisk(input: SiteSettingsFileV1): SiteSettingsFileV1 {
  const d = createDefaultSiteSettingsFile();
  const cats = normalizeCategories(input.categories?.length ? input.categories : d.categories);
  const tiles = sortDiscovery(input.discoveryTiles?.length ? input.discoveryTiles : d.discoveryTiles);
  const barRaw = input.commerceTrustBar?.filter((x) => x.title?.trim() && x.text?.trim());
  const commerceTrustBar =
    barRaw && barRaw.length >= 2 && barRaw.length <= 8
      ? barRaw.map((x) => ({ title: x.title.trim(), text: x.text.trim() }))
      : d.commerceTrustBar;

  const hs = input.heroSection ?? {};
  const heroSection = {
    ...d.heroSection,
    ...hs,
    trustMicro: (() => {
      const tm = hs.trustMicro?.filter((x) => x.label?.trim() && x.text?.trim()) ?? [];
      if (tm.length >= 2 && tm.length <= 5) return tm.map((x) => ({ label: x.label.trim(), text: x.text.trim() }));
      return d.heroSection!.trustMicro!;
    })(),
  };

  const cb = input.campaignBanner ?? {};
  const campaignBanner = {
    text: (cb.text ?? d.campaignBanner?.text ?? DEFAULT_CAMPAIGN.text).trim(),
    linkLabel: (cb.linkLabel ?? d.campaignBanner?.linkLabel ?? DEFAULT_CAMPAIGN.linkLabel).trim(),
    href: (cb.href ?? d.campaignBanner?.href ?? DEFAULT_CAMPAIGN.href).trim(),
  };

  const sh = input.shelvesCopy ?? {};
  const ds = d.shelvesCopy ?? {};
  const shelvesCopy = {
    newHarvestTitle: (sh.newHarvestTitle ?? ds.newHarvestTitle ?? "Yeni mahsul").trim(),
    newHarvestSubtitle: (sh.newHarvestSubtitle ?? ds.newHarvestSubtitle ?? "Sezonun taze partileri — stok ve gramaj seçenekleriyle").trim(),
    valuePacksTitle: (sh.valuePacksTitle ?? ds.valuePacksTitle ?? "Avantajlı paketler").trim(),
    valuePacksSubtitle: (sh.valuePacksSubtitle ?? ds.valuePacksSubtitle ?? "Hediye ve ikram için seçilmiş paketler ve gramajlar").trim(),
    valuePacksCategoryId: (sh.valuePacksCategoryId ?? ds.valuePacksCategoryId ?? "paket").trim().toLowerCase() || "paket",
  };

  const branding = {
    siteName: input.branding?.siteName?.trim(),
    shortName: input.branding?.shortName?.trim(),
    description: input.branding?.description?.trim(),
    footerBlurb: input.branding?.footerBlurb?.trim(),
  };

  const extras = input.footerExtraLinks?.filter((l) => l.href?.trim() && l.label?.trim()).length
    ? input.footerExtraLinks!.map((l) => ({ href: l.href.trim(), label: l.label.trim() }))
    : d.footerExtraLinks!;

  return {
    version: 1,
    categories: cats,
    mediaUrls: { ...input.mediaUrls },
    branding,
    heroSection,
    campaignBanner,
    commerceTrustBar,
    shelvesCopy,
    discoveryTiles: tiles.map((t) => ({
      id: t.id.trim(),
      title: t.title.trim(),
      blurb: t.blurb.trim(),
      href: t.href.trim(),
      imageSrc: t.imageSrc.trim(),
      imageAlt: t.imageAlt.trim(),
      sortOrder: t.sortOrder ?? 0,
    })),
    promoPopups: sanitizePopups(input.promoPopups).slice(0, 5),
    footerExtraLinks: extras,
    footerTagline: (input.footerTagline ?? d.footerTagline ?? DEFAULT_FOOTER_TAGLINE).trim(),
  };
}

async function loadPresentation(): Promise<SitePresentation> {
  const file = await readSiteSettingsFile();
  return buildPresentationInner(file);
}

export const getSitePresentation = unstable_cache(loadPresentation, ["site-presentation-v1"], {
  tags: ["site-settings"],
});

export function createDefaultSiteSettingsFile(): SiteSettingsFileV1 {
  const h = cta.home;
  return {
    version: 1,
    categories: DEFAULT_RETAIL_CATEGORIES.map((c) => ({ ...c })),
    mediaUrls: {},
    branding: {},
    heroSection: {
      kicker: heroCopy.kicker,
      title: heroCopy.title,
      subtitle: heroCopy.subtitle,
      trustMicro: heroCopy.trustMicro.map((x) => ({ label: x.label, text: x.text })),
      primaryLabel: h.primaryLabel,
      primaryHref: h.primaryHref,
      secondaryLabel: h.secondaryLabel,
      secondaryHref: h.secondaryHref,
      waPriceLabel: h.waPriceLabel,
      waPriceMessage: h.waPriceMessage,
    },
    campaignBanner: { ...DEFAULT_CAMPAIGN },
    commerceTrustBar: DEFAULT_TRUST_BAR.map((x) => ({ ...x })),
    shelvesCopy: {
      newHarvestTitle: "Yeni mahsul",
      newHarvestSubtitle: "Sezonun taze partileri — stok ve gramaj seçenekleriyle",
      valuePacksTitle: "Avantajlı paketler",
      valuePacksSubtitle: "Hediye ve ikram için seçilmiş paketler ve gramajlar",
      valuePacksCategoryId: "paket",
    },
    discoveryTiles: defaultDiscoveryTiles().map((t) => ({ ...t })),
    promoPopups: [],
    footerExtraLinks: DEFAULT_FOOTER_EXTRAS.map((x) => ({ ...x })),
    footerTagline: DEFAULT_FOOTER_TAGLINE,
  };
}
