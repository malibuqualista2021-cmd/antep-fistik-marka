import { pistachioImages } from "@/lib/pistachio-images";

export type RetailFacetProcess = "kavrulmus" | "cig" | "tuzlu" | "tuzsuz";
export type RetailFacetUsage = "atistirmalik" | "baklavalik" | "tatlilik" | "pastalik" | "hediye";

export type RetailProduct = {
  id: string;
  slug: string;
  detailSlug: string;
  name: string;
  shortDescription: string;
  /** Perakende ürün sayfası — tam açıklama (dashboard eski kayıtlarında olmayabilir) */
  description?: string;
  ingredients?: string;
  allergens?: string;
  storage?: string;
  imageSrc: string;
  imageAlt: string;
  price: number;
  currency: "TRY";
  weight: string;
  variants?: { id: string; label: string; weight: string; price: number }[];
  category: "ic" | "kabuklu" | "boz" | "paket";
  stockStatus: "in_stock" | "limited" | "out_of_stock";
  shippingNote: string;
  isActive: boolean;
  /** Küçük etiketler: Yeni mahsul, Tuzlu, vb. */
  tags?: string[];
  facets?: {
    process?: RetailFacetProcess[];
    usage?: RetailFacetUsage[];
  };
};

export const retailProducts: RetailProduct[] = [
  {
    id: "retail-kabuklu-500",
    slug: "kabuklu-kavrulmus-500g",
    detailSlug: "kabuklu-antep-fistigi",
    name: "Yeni Mahsul Kavrulmuş Tuzlu Antep Fıstığı",
    shortDescription: "Günlük tüketim ve ikram için kabuklu, taze kavrulmuş tuzlu seri.",
    tags: ["Yeni mahsul", "Kavrulmuş", "Tuzlu", "Kabuklu", "Çok satan"],
    facets: { process: ["kavrulmus", "tuzlu"], usage: ["atistirmalik", "hediye"] },
    description:
      "Taze kavrulmuş, tuzlu, kabuklu Antep fıstığıdır. Günlük tüketim ve ikramlık kullanım için uygundur. Sipariş sonrası hijyenik şekilde paketlenerek gönderilir.",
    ingredients: "Antep fıstığı (kabuklu), tuz.",
    allergens: "Antep fıstığı (Pistacia vera) içerir. Aynı üretim ortamında süt, gluten, yer fıstığı ve kuru yemiş ürünleriyle temas ihtimali bulunabilir.",
    storage:
      "Serin, kuru ve güneş görmeyen yerde saklayınız. Paketi açtıktan sonra hava almayacak şekilde kapatmanız önerilir.",
    imageSrc: pistachioImages.products.kabuklu,
    imageAlt: "Kabuklu kavrulmuş Antep fıstığı yakın çekim",
    price: 390,
    currency: "TRY",
    weight: "500 g",
    variants: [
      { id: "500g", label: "500 g", weight: "500 g", price: 390 },
      { id: "1kg", label: "1 kg", weight: "1 kg", price: 740 },
    ],
    category: "kabuklu",
    stockStatus: "in_stock",
    shippingNote: "1–3 iş günü içinde kargo; şehre göre teslim süresi değişebilir.",
    isActive: true,
  },
  {
    id: "retail-ic-250",
    slug: "ic-fistik-250g",
    detailSlug: "antep-ic-fistik",
    name: "Baklavalık Yeşil İç Antep Fıstığı",
    shortDescription: "Tatlı ve baklava üretimi için seçilmiş yeşil iç Antep fıstığı.",
    tags: ["Baklavalık", "İç fıstık", "Tatlılık", "Yeni mahsul"],
    facets: { process: ["cig", "tuzsuz"], usage: ["baklavalik", "tatlilik"] },
    description:
      "Baklava ve tatlı üretiminde homojen renk ve dolgunluk hedeflenerek seçilir. Parti bilgisi talep edildiğinde sipariş sürecinde paylaşılır.",
    ingredients: "Antep iç fıstığı (Pistacia vera).",
    allergens: "Fıstık içerir. Aynı üretim ortamında süt, gluten, yer fıstığı ve kuru yemiş ürünleriyle temas ihtimali bulunabilir.",
    storage:
      "Serin ve kuru yerde, kapalı ambalajda saklayın. Nem ve koku almamasına dikkat edin.",
    imageSrc: pistachioImages.products.ic,
    imageAlt: "Yeşil iç Antep fıstığı",
    price: 520,
    currency: "TRY",
    weight: "250 g",
    variants: [
      { id: "250g", label: "250 g", weight: "250 g", price: 520 },
      { id: "500g", label: "500 g", weight: "500 g", price: 990 },
    ],
    category: "ic",
    stockStatus: "limited",
    shippingNote: "1–3 iş günü içinde kargo; şehre göre teslim süresi değişebilir.",
    isActive: true,
  },
  {
    id: "retail-boz-250",
    slug: "boz-ic-250g",
    detailSlug: "boz-ic",
    name: "Boz İç Antep Fıstığı — Pastalık ve dolgu",
    shortDescription: "Pastane, dondurma ve dolgu için homojen doku sunan boz iç.",
    tags: ["Boz iç", "Pastalık", "Baklavalık"],
    facets: { process: ["cig", "tuzsuz"], usage: ["pastalik", "baklavalik"] },
    description:
      "Öğütme ve karıştırma davranışı tutarlı boz iç; krema ve dolgu uygulamalarına uygundur. Taze paketlenerek gönderilir.",
    ingredients: "Antep boz iç fıstığı (Pistacia vera).",
    allergens: "Fıstık içerir. Aynı üretim ortamında süt, gluten, yer fıstığı ve kuru yemiş ürünleriyle temas ihtimali bulunabilir.",
    storage: "Serin ve kuru ortamda, kapalı ambalajında saklayın.",
    imageSrc: pistachioImages.products.boz,
    imageAlt: "Boz iç Antep fıstığı yakın çekim",
    price: 480,
    currency: "TRY",
    weight: "250 g",
    variants: [
      { id: "250g", label: "250 g", weight: "250 g", price: 480 },
      { id: "500g", label: "500 g", weight: "500 g", price: 920 },
    ],
    category: "boz",
    stockStatus: "limited",
    shippingNote: "1–3 iş günü içinde kargo; şehre göre teslim süresi değişebilir.",
    isActive: true,
  },
  {
    id: "retail-paket-1kg",
    slug: "perakende-paket-1kg",
    detailSlug: "perakende-paketler",
    name: "Perakende Paket Antep Fıstığı — Hediye ve ikram",
    shortDescription: "Raf, hediye ve ev kullanımı için hazır paket; net etiket.",
    tags: ["Hediye", "Paket", "İkram"],
    facets: { process: ["kavrulmus", "tuzlu"], usage: ["hediye", "atistirmalik"] },
    description:
      "Hediye ve ikram için hazırlanmış perakende paket; güvenli kapanış ve okunaklı etiket ile gönderilir.",
    ingredients: "Antep fıstığı (ürün etiketinde belirtilen forma göre).",
    allergens: "Fıstık içerir. Aynı üretim ortamında diğer alerjenlerle temas ihtimali bulunabilir.",
    storage: "Serin ve kuru yerde saklayın; açıldıktan sonra hava almayan kapta muhafaza edin.",
    imageSrc: pistachioImages.products.perakende,
    imageAlt: "Perakende Antep fıstığı sunum görseli",
    price: 690,
    currency: "TRY",
    weight: "1 kg",
    variants: [
      { id: "500g", label: "500 g", weight: "500 g", price: 360 },
      { id: "1kg", label: "1 kg", weight: "1 kg", price: 690 },
    ],
    category: "paket",
    stockStatus: "in_stock",
    shippingNote: "1–3 iş günü içinde kargo; şehre göre teslim süresi değişebilir.",
    isActive: true,
  },
];

export function formatMoney(amount: number, currency: RetailProduct["currency"] = "TRY") {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function stockLabel(status: RetailProduct["stockStatus"]) {
  if (status === "in_stock") return "Stokta";
  if (status === "limited") return "Sınırlı stok";
  return "Stokta yok";
}

/** "500 g" / "1 kg" → kilogram */
export function parseWeightToKg(weightLabel: string): number | null {
  const t = weightLabel.trim().toLowerCase().replace(/\s+/g, " ");
  const m = t.match(/^([\d.,]+)\s*(g|kg)$/);
  if (!m) return null;
  const n = Number.parseFloat(m[1].replace(",", "."));
  if (!Number.isFinite(n) || n <= 0) return null;
  if (m[2] === "kg") return n;
  return n / 1000;
}

export function kgUnitPriceLine(price: number, weightLabel: string, currency: RetailProduct["currency"] = "TRY"): string | null {
  const kg = parseWeightToKg(weightLabel);
  if (!kg) return null;
  const perKg = Math.round(price / kg);
  return `Kg fiyatı: ${formatMoney(perKg, currency)} / kg`;
}

export function getRetailProductByDetailSlug(slug: string): RetailProduct | undefined {
  return retailProducts.find((product) => product.detailSlug === slug && product.isActive);
}

export function getSimilarRetailProducts(current: RetailProduct, limit = 4): RetailProduct[] {
  const others = retailProducts.filter((product) => product.isActive && product.id !== current.id);
  const sameCategory = others.filter((product) => product.category === current.category);
  const otherCategories = others.filter((product) => product.category !== current.category);
  return [...sameCategory, ...otherCategories].slice(0, limit);
}

export function productMatchesGramajFilter(product: RetailProduct, gramaj: string | null): boolean {
  if (!gramaj) return true;
  const target = Number.parseInt(gramaj, 10);
  if (!Number.isFinite(target)) return true;
  const weights = [
    product.weight,
    ...(product.variants?.map((v) => v.weight) ?? []),
  ];
  return weights.some((w) => {
    const g = parseWeightToKg(w);
    if (!g) return false;
    return Math.round(g * 1000) === target;
  });
}
