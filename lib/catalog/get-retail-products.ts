import { unstable_cache } from "next/cache";
import type { RetailProduct } from "@/lib/shop-products";
import { readRetailCatalogFromDisk } from "@/lib/catalog/catalog-fs";

const cachedRetailCatalog = unstable_cache(
  async (): Promise<RetailProduct[]> => readRetailCatalogFromDisk(),
  ["retail-catalog-v1"],
  { tags: ["retail-catalog"] },
);

export async function getRetailProducts(): Promise<RetailProduct[]> {
  return cachedRetailCatalog();
}
