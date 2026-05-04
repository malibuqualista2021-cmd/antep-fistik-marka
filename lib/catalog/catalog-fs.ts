import path from "path";
import type {
  RetailFacetProcess,
  RetailFacetUsage,
  RetailProduct,
  RetailProductVariant,
} from "@/lib/shop-products";
import { defaultRetailProducts } from "@/lib/shop-products";
import { readRuntimeJsonValue, writeRuntimeJsonValue } from "@/lib/server/runtime-json-storage";

export const DATA_DIR = path.join(process.cwd(), "data");
export const RETAIL_CATALOG_PATH = path.join(DATA_DIR, "retail-catalog.json");

const stockStatuses = ["in_stock", "limited", "out_of_stock"] as const;

function isRetailCategoryId(v: unknown): v is string {
  if (typeof v !== "string") return false;
  const s = v.trim().toLowerCase();
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(s) && s.length <= 48;
}

function isStock(v: unknown): v is (typeof stockStatuses)[number] {
  return typeof v === "string" && (stockStatuses as readonly string[]).includes(v);
}

const FACET_PROCESS_VALUES: readonly RetailFacetProcess[] = ["kavrulmus", "cig", "tuzlu", "tuzsuz"];
const FACET_USAGE_VALUES: readonly RetailFacetUsage[] = [
  "atistirmalik",
  "baklavalik",
  "tatlilik",
  "pastalik",
  "hediye",
];

function sanitizeFacets(raw: unknown): RetailProduct["facets"] | undefined {
  if (!raw || typeof raw !== "object") return undefined;
  const f = raw as Record<string, unknown>;
  let process: RetailFacetProcess[] | undefined;
  let usage: RetailFacetUsage[] | undefined;
  if (Array.isArray(f.process)) {
    const p = f.process.filter(
      (x): x is RetailFacetProcess =>
        typeof x === "string" && (FACET_PROCESS_VALUES as readonly string[]).includes(x),
    );
    process = p.length ? p : undefined;
  }
  if (Array.isArray(f.usage)) {
    const u = f.usage.filter(
      (x): x is RetailFacetUsage =>
        typeof x === "string" && (FACET_USAGE_VALUES as readonly string[]).includes(x),
    );
    usage = u.length ? u : undefined;
  }
  if (!process && !usage) return undefined;
  return { process, usage };
}

function normalizeVariant(raw: unknown): RetailProductVariant | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;
  if (typeof r.id !== "string" || typeof r.label !== "string" || typeof r.weight !== "string") return null;
  const price = typeof r.price === "number" ? r.price : Number(r.price);
  if (!Number.isFinite(price)) return null;
  return { id: r.id, label: r.label, weight: r.weight, price };
}

function sanitizeExtraImages(raw: unknown): string[] | undefined {
  if (!Array.isArray(raw)) return undefined;
  const xs = raw.filter(
    (x): x is string =>
      typeof x === "string" &&
      (x.startsWith("https://") || x.startsWith("http://") || x.startsWith("/")),
  );
  return xs.length ? xs : undefined;
}

export function coerceRetailProduct(raw: unknown): RetailProduct | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;
  if (typeof r.id !== "string" || typeof r.slug !== "string" || typeof r.detailSlug !== "string") return null;
  if (typeof r.name !== "string" || typeof r.shortDescription !== "string") return null;
  if (typeof r.imageSrc !== "string" || typeof r.imageAlt !== "string") return null;
  const price = typeof r.price === "number" ? r.price : Number(r.price);
  if (!Number.isFinite(price)) return null;
  if (typeof r.weight !== "string") return null;
  if (!isRetailCategoryId(r.category)) return null;
  if (!isStock(r.stockStatus)) return null;
  if (typeof r.shippingNote !== "string") return null;
  if (typeof r.isActive !== "boolean") return null;
  if (r.currency !== "TRY") return null;

  let variants: RetailProduct["variants"];
  if (Array.isArray(r.variants)) {
    const vs = r.variants.map(normalizeVariant).filter(Boolean) as RetailProductVariant[];
    variants = vs.length ? vs : undefined;
  }

  return {
    id: r.id,
    slug: r.slug,
    detailSlug: r.detailSlug,
    name: r.name,
    shortDescription: r.shortDescription,
    description: typeof r.description === "string" ? r.description : undefined,
    ingredients: typeof r.ingredients === "string" ? r.ingredients : undefined,
    allergens: typeof r.allergens === "string" ? r.allergens : undefined,
    storage: typeof r.storage === "string" ? r.storage : undefined,
    imageSrc: r.imageSrc,
    imageAlt: r.imageAlt,
    price,
    currency: "TRY",
    weight: r.weight,
    variants,
    category: (r.category as string).trim().toLowerCase(),
    stockStatus: r.stockStatus,
    shippingNote: r.shippingNote,
    isActive: r.isActive,
    tags: Array.isArray(r.tags) ? r.tags.filter((t): t is string => typeof t === "string") : undefined,
    facets: sanitizeFacets(r.facets),
    extraImages: sanitizeExtraImages(r.extraImages),
  };
}

export async function readRetailCatalogFromDisk(): Promise<RetailProduct[]> {
  try {
    const parsed = await readRuntimeJsonValue("retailCatalog");
    if (!Array.isArray(parsed)) return defaultRetailProducts;
    const items = parsed.map(coerceRetailProduct).filter(Boolean) as RetailProduct[];
    return items.length ? items : defaultRetailProducts;
  } catch {
    return defaultRetailProducts;
  }
}

export async function writeRetailCatalogToDisk(products: RetailProduct[]): Promise<void> {
  await writeRuntimeJsonValue("retailCatalog", products);
}
