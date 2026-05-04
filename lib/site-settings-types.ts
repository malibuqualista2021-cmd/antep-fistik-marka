/** Diskteki site-settings.json ile sunulan vitrin birleşimi için tipler */

/** .env üzerine yazılır; boş alanlar ortam varsayılanına düşer */
export type SiteContactOverrides = {
  phoneDisplay?: string;
  phoneE164?: string;
  whatsappE164?: string;
  email?: string;
  addressLine1?: string;
  addressLine2?: string;
  hours?: string;
  mapsUrl?: string;
  mapsQuery?: string;
  socialInstagram?: string;
  responseTimeHint?: string;
  wholesaleFormIntro?: string;
  certificatesNote?: string;
};

/** CSS `--color-orange` / `--cta` — yalnızca #RRGGBB */
export type SiteThemeOverrides = {
  ctaAccentHex?: string;
};

export type RetailCategoryDefinition = {
  id: string;
  label: string;
  sortOrder: number;
};

export type DiscoveryTileDefinition = {
  id: string;
  title: string;
  blurb: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  sortOrder: number;
};

export type CommerceTrustItem = {
  title: string;
  text: string;
};

/** Hero altı üç kutu — etiket + metin */
export type HeroTrustMicroLine = {
  label: string;
  text: string;
};

/** Kampanya / promo diyalogları — istemci katmanında gösterilir */
export type PromoPopupDefinition = {
  id: string;
  enabled: boolean;
  title: string;
  body: string;
  imageSrc: string;
  imageAlt: string;
  layout: "image-right" | "image-left" | "image-top";
  ctaLabel: string;
  ctaHref: string;
  /** Örn. ["/"] yalnızca ana sayfa; ["/*"] tüm sayfalar */
  matchRoutes: string[];
  delayMs: number;
  dismissDays: number;
  storageKey: string;
};

export type SiteSettingsFileV1 = {
  version: 1;
  categories?: RetailCategoryDefinition[];
  /** mediaSlots id → URL */
  mediaUrls?: Partial<Record<string, string>>;
  contact?: SiteContactOverrides;
  theme?: SiteThemeOverrides;
  /** API ve vitrin mesajları — lib/site-content-messages.ts anahtarları */
  contentMessages?: Record<string, string>;
  branding?: {
    siteName?: string;
    shortName?: string;
    description?: string;
    footerBlurb?: string;
  };
  heroSection?: {
    kicker?: string;
    title?: string;
    subtitle?: string;
    trustMicro?: HeroTrustMicroLine[];
    primaryLabel?: string;
    primaryHref?: string;
    secondaryLabel?: string;
    secondaryHref?: string;
    waPriceLabel?: string;
    waPriceMessage?: string;
  };
  campaignBanner?: {
    text?: string;
    linkLabel?: string;
    href?: string;
  };
  commerceTrustBar?: CommerceTrustItem[];
  shelvesCopy?: {
    newHarvestTitle?: string;
    newHarvestSubtitle?: string;
    valuePacksTitle?: string;
    valuePacksSubtitle?: string;
    valuePacksCategoryId?: string;
  };
  discoveryTiles?: DiscoveryTileDefinition[];
  promoPopups?: PromoPopupDefinition[];
  footerExtraLinks?: { href: string; label: string }[];
  footerTagline?: string;
};
