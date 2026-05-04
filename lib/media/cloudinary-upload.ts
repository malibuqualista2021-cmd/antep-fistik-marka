import { createHash, createHmac } from "node:crypto";
import type { ProductImageUploadResult } from "@/lib/media/upload-contract";

function sanitizeFileName(name: string) {
  const ext = name.includes(".") ? name.slice(name.lastIndexOf(".") + 1) : "jpg";
  const base = name
    .replace(/\.[^.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9-_]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return `${base || "upload"}-${Date.now()}.${ext}`;
}

/**
 * Cloudinary yükleme — `/api/admin/upload` tarafından kullanılır.
 * İleride S3/R2 vb. için ayrı modül + ortak arayüz kullanılabilir.
 */
export async function uploadBufferToCloudinary(opts: {
  file: File;
  folder: string;
  /** Üst klasör altında public_id göreli yolu */
  publicIdPath: string;
}): Promise<ProductImageUploadResult> {
  const cloudName = (process.env.CLOUDINARY_CLOUD_NAME || "").trim();
  const apiKey = (process.env.CLOUDINARY_API_KEY || "").trim();
  const apiSecret = (process.env.CLOUDINARY_API_SECRET || "").trim();
  if (!cloudName || !apiKey || !apiSecret) {
    return { ok: false, message: "Cloudinary bilgileri eksik (.env)." };
  }

  const timestamp = Math.floor(Date.now() / 1000).toString();
  const publicId = opts.publicIdPath.replace(/\.[^.]+$/, "");
  const signatureBase = `folder=${opts.folder}&public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
  const signature = createHash("sha1").update(signatureBase).digest("hex");

  const uploadData = new FormData();
  uploadData.set("file", opts.file);
  uploadData.set("api_key", apiKey);
  uploadData.set("timestamp", timestamp);
  uploadData.set("folder", opts.folder);
  uploadData.set("public_id", publicId);
  uploadData.set("signature", signature);

  const endpoint = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
  const uploadRes = await fetch(endpoint, { method: "POST", body: uploadData });
  if (!uploadRes.ok) {
    const detail = await uploadRes.text();
    return { ok: false, message: "Cloudinary yükleme hatası.", detail };
  }

  const payload = (await uploadRes.json()) as { secure_url?: string };
  if (!payload.secure_url) {
    return { ok: false, message: "Yükleme tamamlandı ama URL dönmedi." };
  }

  const cacheBuster = createHmac("sha1", timestamp).update(payload.secure_url).digest("hex").slice(0, 8);
  return { ok: true, url: `${payload.secure_url}?v=${cacheBuster}` };
}

export function buildCatalogProductPublicId(originalFileName: string): string {
  const base = sanitizeFileName(originalFileName).replace(/\.[^.]+$/, "");
  return `catalog-products/${base}`;
}
