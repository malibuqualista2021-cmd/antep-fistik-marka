/**
 * Yerelde `data/*.json`, Netlify üretiminde Netlify Blobs (site-wide store).
 * Blobs anahtarı yoksa okuma tarafında repoya gömülü dosyaya düşer (salt okunur seed).
 *
 * Not: Netlify OpenNext handler ortamında `NETLIFY=true` her zaman gelmeyebilir; bu yüzden
 * `NETLIFY_SITE_ID`, `RUNTIME_JSON_USE_BLOBS` vb. ile de algılanır. Disk yazımı `/var/task` gibi
 * salt okunur ortamlarda patlarsa otomatik olarak Blobs denenir.
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

/** Netlify Functions (Lambda) ortamında yerel `public/` yazımı çalışmaz — yükleme için Cloudinary gerekir */
export function isLambdaLikeServerlessRuntime(): boolean {
  return Boolean(process.env.AWS_LAMBDA_FUNCTION_NAME?.trim());
}

/** Netlify Functions / OpenNext ortamında kalıcı yazım için Blobs kullanılmalı */
export function useBlobPersistence(): boolean {
  if (process.env.RUNTIME_JSON_FORCE_FS === "1") return false;
  if (process.env.RUNTIME_JSON_USE_BLOBS === "1") return true;

  const siteId = process.env.NETLIFY_SITE_ID?.trim();
  const localSiteId = process.env.NETLIFY_LOCAL_SITE_ID?.trim();

  return (
    process.env.NETLIFY === "true" ||
    process.env.NETLIFY_DEV === "true" ||
    Boolean(siteId) ||
    Boolean(localSiteId)
  );
}

function diskPath(id: RuntimeJsonDataset): string {
  return path.join(process.cwd(), "data", FILE_NAMES[id]);
}

function blobKey(id: RuntimeJsonDataset): string {
  return FILE_NAMES[id];
}

async function readFromBlob(id: RuntimeJsonDataset): Promise<unknown | null> {
  try {
    const { getStore } = await import("@netlify/blobs");
    const store = getStore({ name: BLOB_STORE_NAME });
    const data = await store.get(blobKey(id), { type: "json" });
    return data ?? null;
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    if (!msg.includes("MissingBlobsEnvironment") && !msg.includes("not been configured to use Netlify Blobs")) {
      console.error(`[runtime-json] blob okuma (${id}):`, err);
    }
    return null;
  }
}

async function writeToBlob(id: RuntimeJsonDataset, value: unknown): Promise<void> {
  const { getStore } = await import("@netlify/blobs");
  const store = getStore({ name: BLOB_STORE_NAME });
  await store.setJSON(blobKey(id), value);
}

async function readFromDisk(id: RuntimeJsonDataset): Promise<unknown | null> {
  try {
    const raw = await fs.readFile(diskPath(id), "utf8");
    return JSON.parse(raw) as unknown;
  } catch {
    return null;
  }
}

function diskFailureLikelyServerless(err: unknown): boolean {
  const msg = err instanceof Error ? err.message : String(err);
  const code =
    err && typeof err === "object" && "code" in err ? String((err as NodeJS.ErrnoException).code) : "";
  return (
    code === "ENOENT" ||
    code === "EROFS" ||
    code === "EACCES" ||
    code === "ENOTSUP" ||
    msg.includes("/var/task") ||
    msg.includes("read-only file system") ||
    msg.includes("EROFS")
  );
}

export async function readRuntimeJsonValue(id: RuntimeJsonDataset): Promise<unknown | null> {
  if (useBlobPersistence()) {
    const blob = await readFromBlob(id);
    if (blob != null) return blob;
    return readFromDisk(id);
  }

  const disk = await readFromDisk(id);
  if (disk != null) return disk;

  return readFromBlob(id);
}

export async function writeRuntimeJsonValue(id: RuntimeJsonDataset, value: unknown): Promise<void> {
  if (useBlobPersistence()) {
    try {
      await writeToBlob(id, value);
      return;
    } catch (err) {
      console.error(`[runtime-json] blob yazma (${id}):`, err);
      throw err instanceof Error ? err : new Error("Blob yazılamadı");
    }
  }

  try {
    await fs.mkdir(path.join(process.cwd(), "data"), { recursive: true });
    await fs.writeFile(diskPath(id), JSON.stringify(value, null, 2), "utf8");
  } catch (err) {
    if (process.env.RUNTIME_JSON_FORCE_FS === "1") throw err;

    if (diskFailureLikelyServerless(err)) {
      console.warn(`[runtime-json] disk yazılamadı (${id}), Blobs deneniyor:`, err);
      try {
        await writeToBlob(id, value);
        return;
      } catch (blobErr) {
        console.error(`[runtime-json] Blob yedek yazım da başarısız (${id}):`, blobErr);
        throw blobErr instanceof Error ? blobErr : new Error("Blob yazılamadı");
      }
    }

    throw err;
  }
}
