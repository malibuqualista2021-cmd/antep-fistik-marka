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

export type MainNavLink = { href: string; label: string; hint?: string };

/** Masaüstü ana menü (mega hariç düz linkler) */
export const mainNavLinks: MainNavLink[] = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/urunler?kategori=kabuklu", label: "Kabuklu Fıstık" },
  { href: "/urunler?kategori=ic", label: "İç Antep Fıstığı" },
  { href: "/urunler?kullanim=baklavalik", label: "Baklavalık Fıstık", hint: "İç ve boz iç vitrin" },
  { href: "/urunler?kategori=kabuklu&islem=kavrulmus", label: "Kavrulmuş Fıstık" },
  { href: "/urunler?kategori=kabuklu&islem=cig", label: "Çiğ / Tuzsuz Fıstık", hint: "Kabuklu çiğ seri" },
  { href: "/urunler", label: "Kuruyemiş Çeşitleri", hint: "Antep fıstığı vitrinimiz" },
  { href: "/#vitrin-urunler", label: "Kampanyalar", hint: "Öne çıkan ürünler" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/iletisim", label: "İletişim" },
];
