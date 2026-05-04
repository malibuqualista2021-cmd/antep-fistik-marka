import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { mediaSlots } from "@/lib/media-slots";
import { sessionCookieName, verifySessionToken } from "@/lib/admin-auth";
import { isCloudinaryConfigured } from "@/lib/admin/cloudinary-config";
import { buildCatalogProductPublicId, uploadBufferToCloudinary } from "@/lib/media/cloudinary-upload";
import { saveUploadedImageLocal } from "@/lib/media/local-disk-upload";
import { isLambdaLikeServerlessRuntime } from "@/lib/server/runtime-json-storage";
import { readSiteSettingsFile } from "@/lib/server/site-settings-store";
import { mergeContentMessages, contentMessage, SITE_MESSAGE_KEYS } from "@/lib/site-content-messages";

function sanitizeFileName(name: string) {
  const ext = name.includes(".") ? name.slice(name.lastIndexOf(".") + 1) : "jpg";
  const base = name
    .replace(/\.[^.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9-_]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return `${base || "fistik"}-${Date.now()}.${ext}`;
}

function dedupeFiles(files: File[]): File[] {
  const seen = new Set<string>();
  const out: File[] = [];
  for (const f of files) {
    const k = `${f.name}:${f.size}:${f.lastModified}`;
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(f);
  }
  return out;
}

function collectFiles(form: FormData): File[] {
  const raw: File[] = [];
  const single = form.get("file");
  if (single instanceof File && single.size > 0) raw.push(single);
  for (const entry of form.getAll("files")) {
    if (entry instanceof File && entry.size > 0) raw.push(entry);
  }
  return dedupeFiles(raw);
}

const MAX_BYTES = 10 * 1024 * 1024;
const MAX_FILES = 24;

export async function POST(req: Request) {
  const store = await cookies();
  const ok = verifySessionToken(store.get(sessionCookieName())?.value);
  if (!ok) return NextResponse.json({ ok: false, message: "Yetkisiz." }, { status: 401 });

  const folder = (process.env.CLOUDINARY_UPLOAD_FOLDER || "antep-fistik-marka").trim();
  const useCloudinary = isCloudinaryConfigured();

  const settingsFile = await readSiteSettingsFile();
  const msgMap = mergeContentMessages(settingsFile?.contentMessages);

  if (!useCloudinary && isLambdaLikeServerlessRuntime()) {
    return NextResponse.json(
      {
        ok: false,
        message: contentMessage(msgMap, SITE_MESSAGE_KEYS.uploadLambdaNoCloudinary),
      },
      { status: 503 },
    );
  }

  const form = await req.formData();
  const slot = String(form.get("slot") || "");
  const files = collectFiles(form);

  if (files.length === 0) {
    return NextResponse.json({ ok: false, message: "Dosya gerekli." }, { status: 400 });
  }
  if (files.length > MAX_FILES) {
    return NextResponse.json({ ok: false, message: `En fazla ${MAX_FILES} dosya.` }, { status: 400 });
  }

  const urls: string[] = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (file.size > MAX_BYTES) {
      return NextResponse.json({ ok: false, message: `Çok büyük dosya (max 10MB): ${file.name}` }, { status: 400 });
    }

    if (useCloudinary) {
      let publicIdPath: string;
      const uniq = randomBytes(4).toString("hex");
      if (slot === "catalog-product") {
        publicIdPath = `${buildCatalogProductPublicId(file.name)}-${uniq}`;
      } else {
        if (!mediaSlots().some((x) => x.id === slot)) {
          return NextResponse.json({ ok: false, message: "Geçersiz görsel alanı." }, { status: 400 });
        }
        const base = sanitizeFileName(file.name).replace(/\.[^.]+$/, "");
        publicIdPath = `${slot}/${base}-${uniq}`;
      }

      const result = await uploadBufferToCloudinary({ file, folder, publicIdPath });
      if (!result.ok) {
        const status = result.message.includes("eksik") ? 500 : 502;
        return NextResponse.json({ ok: false, message: result.message, detail: result.detail }, { status });
      }
      urls.push(result.url);
    } else {
      const slotSegment = slot === "catalog-product" ? "catalog-products" : slot;
      if (slot !== "catalog-product" && !mediaSlots().some((x) => x.id === slot)) {
        return NextResponse.json({ ok: false, message: "Geçersiz görsel alanı." }, { status: 400 });
      }
      const diskMsg = contentMessage(msgMap, SITE_MESSAGE_KEYS.uploadDiskReadonly);
      const result = await saveUploadedImageLocal({ file, slotSegment, diskReadonlyMessage: diskMsg });
      if (!result.ok) {
        const readonly =
          result.message === diskMsg ||
          result.message.includes("salt okunur") ||
          result.message.includes("/var/task");
        return NextResponse.json({ ok: false, message: result.message }, { status: readonly ? 503 : 400 });
      }
      urls.push(result.url);
    }
  }

  return NextResponse.json({
    ok: true,
    url: urls[0],
    urls,
    storage: useCloudinary ? "cloudinary" : "local",
  });
}
