import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { randomBytes } from "node:crypto";
import type { ProductImageUploadResult } from "@/lib/media/upload-contract";

function sanitizeBase(name: string) {
  const base = name
    .replace(/\.[^.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9-_]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return base || "gorsel";
}

/** JPEG / PNG / WebP — ilk baytlara göre */
function detectKind(buf: Buffer): "jpeg" | "png" | "webp" | null {
  if (buf.length >= 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return "jpeg";
  if (
    buf.length >= 8 &&
    buf[0] === 0x89 &&
    buf[1] === 0x50 &&
    buf[2] === 0x4e &&
    buf[3] === 0x47 &&
    buf[4] === 0x0d &&
    buf[5] === 0x0a &&
    buf[6] === 0x1a &&
    buf[7] === 0x0a
  ) {
    return "png";
  }
  if (
    buf.length >= 12 &&
    buf.subarray(0, 4).toString("ascii") === "RIFF" &&
    buf.subarray(8, 12).toString("ascii") === "WEBP"
  ) {
    return "webp";
  }
  return null;
}

/**
 * Admin oturumu olan yükleme route’u için — dosyalar `public/uploads/admin/...` altına yazılır (statik URL).
 * Üretimde kalıcı disk / CDN stratejisi ayrı düşünülmelidir.
 */
export async function saveUploadedImageLocal(opts: {
  file: File;
  /** `public/uploads/admin/<slotSegment>/` */
  slotSegment: string;
}): Promise<ProductImageUploadResult> {
  const buf = Buffer.from(await opts.file.arrayBuffer());
  const kind = detectKind(buf);
  if (!kind) {
    return { ok: false, message: "Desteklenmeyen görsel (yalnızca JPEG, PNG, WebP)." };
  }

  const ext = kind === "jpeg" ? "jpg" : kind;
  const safeSlot = opts.slotSegment.replace(/[^a-z0-9-_]/gi, "-").replace(/(^-|-$)/g, "") || "misc";
  const unique = `${sanitizeBase(opts.file.name)}-${Date.now()}-${randomBytes(4).toString("hex")}.${ext}`;
  const relSegments = ["uploads", "admin", safeSlot, unique];
  const diskPath = path.join(process.cwd(), "public", ...relSegments);

  await mkdir(path.dirname(diskPath), { recursive: true });
  await writeFile(diskPath, buf);

  const url = `/${relSegments.join("/")}`;
  return { ok: true, url };
}
