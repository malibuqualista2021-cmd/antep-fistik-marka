/**
 * Mağaza navigasyonu ve duyuru metinleri — tek kaynak.
 * Pazaryeri kalabalığı yerine butik gıda mağazası tonu.
 */

export const announcementMessages = [
  "500 TL üzeri ücretsiz kargo",
  "Yeni mahsul Antep fıstığı çeşitleri",
  "Hafta içi 15:00’a kadar verilen siparişler aynı gün kargoda",
  "Güvenli ödeme · Taze paketleme · Kiloluk ve gramajlı satış",
] as const;

export type MegaColumn = {
  title: string;
  links: { label: string; href: string; hint?: string }[];
};

export const megaMenuAntep: MegaColumn[] = [
  {
    title: "Kullanım amacına göre",
    links: [
      { label: "Atıştırmalık fıstık", href: "/urunler?kullanim=atistirmalik" },
      { label: "Baklavalık fıstık", href: "/urunler?kullanim=baklavalik" },
      { label: "Tatlılık fıstık", href: "/urunler?kullanim=tatlilik" },
      { label: "Pastalık fıstık", href: "/urunler?kullanim=pastalik" },
      { label: "Hediyelik fıstık", href: "/urunler?kullanim=hediye" },
    ],
  },
  {
    title: "Türüne göre",
    links: [
      { label: "Kabuklu Antep fıstığı", href: "/urunler?kategori=kabuklu" },
      { label: "İç Antep fıstığı", href: "/urunler?kategori=ic" },
      { label: "Boz iç Antep fıstığı", href: "/urunler?kategori=boz" },
      { label: "Hediye ve paket", href: "/urunler?kategori=paket" },
    ],
  },
  {
    title: "İşlemine göre",
    links: [
      { label: "Kavrulmuş", href: "/urunler?islem=kavrulmus" },
      { label: "Çiğ", href: "/urunler?islem=cig" },
      { label: "Tuzlu", href: "/urunler?islem=tuzlu" },
      { label: "Tuzsuz", href: "/urunler?islem=tuzsuz" },
    ],
  },
  {
    title: "Gramaja göre",
    links: [
      { label: "250 g", href: "/urunler?gramaj=250" },
      { label: "500 g", href: "/urunler?gramaj=500" },
      { label: "1 kg", href: "/urunler?gramaj=1000" },
    ],
  },
];

/** Kurumsal — hover / akordeon alt menü */
export const corporateMega: MegaColumn[] = [
  {
    title: "Sayfalar",
    links: [
      { href: "/hakkimizda", label: "Hakkımızda" },
      { href: "/iletisim", label: "İletişim" },
      { href: "/sikca-sorulan-sorular", label: "Sık sorulan sorular" },
    ],
  },
];

export type TopNavLink = { kind: "link"; href: string; label: string; hint?: string };

export type TopNavMega = {
  kind: "mega";
  id: string;
  label: string;
  href: string;
  columns: MegaColumn[];
};

export type TopNavAccordion = {
  kind: "accordion";
  id: string;
  label: string;
  columns: MegaColumn[];
};

export type TopNavItem = TopNavLink | TopNavMega | TopNavAccordion;

/** Üst header altı — yatay kategori şeridi (sidebar kaldırıldıktan sonra). */
export const headerCategoryStrip: { href: string; label: string }[] = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/urunler?kategori=ic", label: "İç Fıstık" },
  { href: "/urunler?kategori=kabuklu", label: "Kabuklu Fıstık" },
  { href: "/urunler?kategori=boz", label: "Boz İç" },
  { href: "/urunler?islem=kavrulmus", label: "Kavrulmuş Fıstık" },
  { href: "/#vitrin-urunler", label: "Çok Satanlar" },
  { href: "/toptan-satis", label: "Toptan Satış" },
  { href: "/hakkimizda", label: "Kurumsal" },
];

/** Üst menü: az sayıda ana satır; filtreler Antep fıstığı altında toplanır. */
export const topNavItems: TopNavItem[] = [
  { kind: "link", href: "/", label: "Ana Sayfa" },
  { kind: "mega", id: "antep", label: "Antep fıstığı", href: "/urunler", columns: megaMenuAntep },
  { kind: "link", href: "/urunler", label: "Mağaza", hint: "Tüm ürünler" },
  { kind: "link", href: "/#vitrin-urunler", label: "Çok satanlar", hint: "Öne çıkan ürünler" },
  { kind: "link", href: "/toptan-satis", label: "Toptan satış" },
  { kind: "accordion", id: "kurumsal", label: "Kurumsal", columns: corporateMega },
];
