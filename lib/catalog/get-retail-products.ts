import type { RetailProduct } from "@/lib/shop-products";
import { readRetailCatalogFromDisk } from "@/lib/catalog/catalog-fs";

/**
 * Katalog Netlify Blobs'tan okunur. Burada `unstable_cache` kullanılmaz:
 * Netlify/OpenNext ortamında tag ile invalidation güvenilir olmayabiliyor ve sayfalar
 * derleme anındaki fiyatla statikleniyordu; admin güncellemesi vitrine yansımıyordu.
 */
export async function getRetailProducts(): Promise<RetailProduct[]> {
  return readRetailCatalogFromDisk();
}
