/**
 * Yerelde `data/*.json`, Netlify üretiminde Netlify Blobs (site-wide store).
 * Blobs anahtarı yoksa okuma tarafında repoya gömülü dosyaya düşer (salt okunur seed).
 */
import { promises as fs } from "fs";
import path from "path";

const BLOB_STORE_NAME = "inal-shop-runtime-v1";

export type RuntimeJsonDataset = "siteSettings" | "retailCatalog" | "orders" | "wholesaleLeads";

const FILE_NAMES: Record<RuntimeJsonDataset, string> = {
  siteSettings: "site-settings.json",
  retailCatalog: "retail-catalog.json",
  orders: "orders.json",
  wholesaleLeads: "wholesale-leads.json",
};

export function useBlobPersistence(): boolean {
  if (process.env.RUNTIME_JSON_FORCE_FS === "1") return false;
  return process.env.NETLIFY === "true" || process.env.NETLIFY_DEV === "true";
}

function diskPath(id: RuntimeJsonDataset): string {
  return path.join(process.cwd(), "data", FILE_NAMES[id]);
}

function blobKey(id: RuntimeJsonDataset): string {
  return FILE_NAMES[id];
}

async function readFromDisk(id: RuntimeJsonDataset): Promise<unknown | null> {
  try {
    const raw = await fs.readFile(diskPath(id), "utf8");
    return JSON.parse(raw) as unknown;
  } catch {
    return null;
  }
}

export async function readRuntimeJsonValue(id: RuntimeJsonDataset): Promise<unknown | null> {
  if (useBlobPersistence()) {
    try {
      const { getStore } = await import("@netlify/blobs");
      const store = getStore({ name: BLOB_STORE_NAME });
      const data = await store.get(blobKey(id), { type: "json" });
      if (data != null) return data;
    } catch (err) {
      console.error(`[runtime-json] blob okuma (${id}):`, err);
    }
    return readFromDisk(id);
  }
  return readFromDisk(id);
}

export async function writeRuntimeJsonValue(id: RuntimeJsonDataset, value: unknown): Promise<void> {
  if (useBlobPersistence()) {
    try {
      const { getStore } = await import("@netlify/blobs");
      const store = getStore({ name: BLOB_STORE_NAME });
      await store.setJSON(blobKey(id), value);
      return;
    } catch (err) {
      console.error(`[runtime-json] blob yazma (${id}):`, err);
      throw err instanceof Error ? err : new Error("Blob yazılamadı");
    }
  }
  await fs.mkdir(path.join(process.cwd(), "data"), { recursive: true });
  await fs.writeFile(diskPath(id), JSON.stringify(value, null, 2), "utf8");
}
