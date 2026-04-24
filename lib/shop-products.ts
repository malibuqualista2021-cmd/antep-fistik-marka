import { pistachioImages } from "@/lib/pistachio-images";

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
};

export const retailProducts: RetailProduct[] = [
  {
    id: "retail-kabuklu-500",
    slug: "kabuklu-kavrulmus-500g",
    detailSlug: "kabuklu-antep-fistigi",
    name: "Kabuklu Kavrulmuş Antep Fıstığı",
    shortDescription: "İkram ve günlük tüketim için kavrulmuş kabuklu seri.",
    description:
      "Gaziantep menşeli kabuklu Antep fıstığı; günlük tüketim ve ikram için dengeli kavurma ve kabuk bütünlüğüyle hazırlanır. Raf veya ev kullanımında pratik tazelik sunar.",
    ingredients: "Antep fıstığı (kabuklu), tuz (kavrulmuş seri).",
    allergens: "Fıstık (yer fıstığı değil; Antep fıstığı / Pistacia vera) içerir. Aynı üretim ortamında süt, gluten, yer fıstığı ve kuru yemiş ürünleriyle temas ihtimali bulunabilir.",
    storage:
      "Serin ve kuru yerde, doğrudan güneşten uzak tutun. Açıldıktan sonra hava almayan kapta saklayın ve kısa sürede tüketin.",
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
    shippingNote: "1-3 iş günü içinde kargo",
    isActive: true,
  },
  {
    id: "retail-ic-250",
    slug: "ic-fistik-250g",
    detailSlug: "antep-ic-fistik",
    name: "Antep İç Fıstık",
    shortDescription: "Tatlı, mutfak ve premium kuruyemiş kullanımı için iç fıstık.",
    description:
      "Seçilmiş Antep iç fıstığı; tatlı, mutfak ve premium kuruyemiş kullanımına uygun renk ve dolgunluk dengesiyle sunulur. Parti bazlı kalite yaklaşımıyla hazırlanır.",
    ingredients: "Antep iç fıstığı (Pistacia vera).",
    allergens: "Fıstık içerir. Aynı üretim ortamında süt, gluten, yer fıstığı ve kuru yemiş ürünleriyle temas ihtimali bulunabilir.",
    storage:
      "Serin ve kuru yerde saklayın. Açıldıktan sonra buzdolabında veya serin ortamda, kapalı kapta muhafaza edin; nem ve koku almamasına dikkat edin.",
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
    shippingNote: "1-3 iş günü içinde kargo",
    isActive: true,
  },
  {
    id: "retail-boz-250",
    slug: "boz-ic-250g",
    detailSlug: "boz-ic",
    name: "Boz İç",
    shortDescription: "Pastane, dolgu ve özel tarifler için boz iç serisi.",
    description:
      "Pastacılık ve dolgu uygulamaları için homojen doku sunan boz iç serisi; öğütme ve karıştırma davranışı tutarlılığı hedeflenerek hazırlanır.",
    ingredients: "Antep boz iç fıstığı (Pistacia vera).",
    allergens: "Fıstık içerir. Aynı üretim ortamında süt, gluten, yer fıstığı ve kuru yemiş ürünleriyle temas ihtimali bulunabilir.",
    storage:
      "Serin ve kuru ortamda, kapalı ambalajında saklayın. Nem ve ısı değişiminden koruyun; açıldıktan sonra kısa sürede kullanım önerilir.",
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
    shippingNote: "1-3 iş günü içinde kargo",
    isActive: true,
  },
  {
    id: "retail-paket-1kg",
    slug: "perakende-paket-1kg",
    detailSlug: "perakende-paketler",
    name: "Perakende Paket Antep Fıstığı",
    shortDescription: "Raf, hediye ve ev kullanımı için hazır paket.",
    description:
      "Hediye, ikram ve ev kullanımı için hazırlanmış perakende paket; okunabilir etiket ve güvenli kapanışla gönderime uygundur.",
    ingredients: "Antep fıstığı (ürün etiketinde belirtilen forma göre: kabuklu veya iç).",
    allergens: "Fıstık içerir. Aynı üretim ortamında süt, gluten, yer fıstığı ve kuru yemiş ürünleriyle temas ihtimali bulunabilir.",
    storage:
      "Serin ve kuru yerde saklayın. Paket bütünlüğünü koruyun; açıldıktan sonra hava almayan kapta ve kısa sürede tüketim önerilir.",
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
    shippingNote: "1-3 iş günü içinde kargo",
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

export function getRetailProductByDetailSlug(slug: string): RetailProduct | undefined {
  return retailProducts.find((product) => product.detailSlug === slug && product.isActive);
}

export function getSimilarRetailProducts(current: RetailProduct, limit = 4): RetailProduct[] {
  const others = retailProducts.filter((product) => product.isActive && product.id !== current.id);
  const sameCategory = others.filter((product) => product.category === current.category);
  const otherCategories = others.filter((product) => product.category !== current.category);
  return [...sameCategory, ...otherCategories].slice(0, limit);
}
