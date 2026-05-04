import { NextResponse } from "next/server";
import { unauthorizedUnlessAdmin } from "@/lib/admin/assert-admin";
import { revalidateSiteSettings } from "@/lib/catalog/revalidate-site-settings";
import { normalizeSiteSettingsForDisk, createDefaultSiteSettingsFile } from "@/lib/site-presentation";
import type { SiteSettingsFileV1 } from "@/lib/site-settings-types";
import { readSiteSettingsFile, writeSiteSettingsFile } from "@/lib/server/site-settings-store";

export async function GET() {
  const denied = await unauthorizedUnlessAdmin();
  if (denied) return denied;
  const file = await readSiteSettingsFile();
  return NextResponse.json({ ok: true, file, defaults: createDefaultSiteSettingsFile() });
}

export async function PUT(req: Request) {
  const denied = await unauthorizedUnlessAdmin();
  if (denied) return denied;

  const body = (await req.json().catch(() => null)) as unknown;
  if (!body || typeof body !== "object" || (body as SiteSettingsFileV1).version !== 1) {
    return NextResponse.json({ ok: false, message: "Geçersiz ayar gövdesi (version: 1 gerekli)." }, { status: 400 });
  }

  try {
    const normalized = normalizeSiteSettingsForDisk(body as SiteSettingsFileV1);
    await writeSiteSettingsFile(normalized);
    revalidateSiteSettings();
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[site-settings] PUT", e);
    const detail = e instanceof Error ? e.message : String(e);
    return NextResponse.json(
      { ok: false, message: `Kayıt başarısız (${detail}). Netlify kullanıyorsanız Blobs erişiminin açık olduğundan emin olun.` },
      { status: 500 },
    );
  }
}
