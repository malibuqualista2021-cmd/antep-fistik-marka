import { createHash, createHmac } from "node:crypto";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { mediaSlots } from "@/lib/media-slots";
import { sessionCookieName, verifySessionToken } from "@/lib/admin-auth";

function sanitizeFileName(name: string) {
  const ext = name.includes(".") ? name.slice(name.lastIndexOf(".") + 1) : "jpg";
  const base = name
    .replace(/\.[^.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9-_]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return `${base || "fistik"}-${Date.now()}.${ext}`;
}

export async function POST(req: Request) {
  const store = await cookies();
  const ok = verifySessionToken(store.get(sessionCookieName())?.value);
  if (!ok) return NextResponse.json({ ok: false, message: "Yetkisiz." }, { status: 401 });

  const cloudName = (process.env.CLOUDINARY_CLOUD_NAME || "").trim();
  const apiKey = (process.env.CLOUDINARY_API_KEY || "").trim();
  const apiSecret = (process.env.CLOUDINARY_API_SECRET || "").trim();
  const folder = (process.env.CLOUDINARY_UPLOAD_FOLDER || "antep-fistik-marka").trim();
  if (!cloudName || !apiKey || !apiSecret) {
    return NextResponse.json(
      { ok: false, message: "Cloudinary bilgileri eksik (.env)." },
      { status: 500 },
    );
  }

  const form = await req.formData();
  const file = form.get("file");
  const slot = String(form.get("slot") || "");
  if (!(file instanceof File)) {
    return NextResponse.json({ ok: false, message: "Dosya gerekli." }, { status: 400 });
  }
  if (!mediaSlots().some((x) => x.id === slot)) {
    return NextResponse.json({ ok: false, message: "Geçersiz görsel alanı." }, { status: 400 });
  }
  if (file.size > 10 * 1024 * 1024) {
    return NextResponse.json({ ok: false, message: "Maksimum dosya boyutu 10MB." }, { status: 400 });
  }

  const timestamp = Math.floor(Date.now() / 1000).toString();
  const publicId = `${slot}/${sanitizeFileName(file.name).replace(/\.[^.]+$/, "")}`;
  const signatureBase = `folder=${folder}&public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
  const signature = createHash("sha1").update(signatureBase).digest("hex");

  const uploadData = new FormData();
  uploadData.set("file", file);
  uploadData.set("api_key", apiKey);
  uploadData.set("timestamp", timestamp);
  uploadData.set("folder", folder);
  uploadData.set("public_id", publicId);
  uploadData.set("signature", signature);

  const endpoint = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
  const uploadRes = await fetch(endpoint, { method: "POST", body: uploadData });
  if (!uploadRes.ok) {
    const detail = await uploadRes.text();
    return NextResponse.json(
      { ok: false, message: "Cloudinary yükleme hatası.", detail },
      { status: 502 },
    );
  }

  const payload = (await uploadRes.json()) as { secure_url?: string };
  if (!payload.secure_url) {
    return NextResponse.json(
      { ok: false, message: "Yükleme tamamlandı ama URL dönmedi." },
      { status: 502 },
    );
  }

  // Kullanıcı farklı sekmelerde çalışıyorsa aynı dosya isimlerinde cache çakışmasın
  const cacheBuster = createHmac("sha1", timestamp).update(payload.secure_url).digest("hex").slice(0, 8);
  return NextResponse.json({
    ok: true,
    url: `${payload.secure_url}?v=${cacheBuster}`,
  });
}
