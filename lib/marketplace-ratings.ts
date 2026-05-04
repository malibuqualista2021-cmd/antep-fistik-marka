import type { RetailProduct } from "@/lib/shop-products";

/** Vitirin satış odaklı görünümü için örnek puanlar (gerçek yorum API’si yokken). */
const BY_ID: Partial<Record<string, { rating: number; reviewCount: number }>> = {
  "retail-kabuklu-500": { rating: 4.8, reviewCount: 428 },
  "retail-ic-250": { rating: 4.7, reviewCount: 256 },
  "retail-boz-250": { rating: 4.6, reviewCount: 189 },
  "retail-paket-1kg": { rating: 4.7, reviewCount: 301 },
};

export function getMarketplaceRating(productId: string): { rating: number; reviewCount: number } {
  return BY_ID[productId] ?? { rating: 4.5, reviewCount: 94 };
}
