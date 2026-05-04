import path from "path";
import type { SiteSettingsFileV1 } from "@/lib/site-settings-types";
import { readRuntimeJsonValue, writeRuntimeJsonValue } from "@/lib/server/runtime-json-storage";

/** Yerel dosya yolu (referans / geliştirme); Netlify’da kaynak Blobs’tur. */
export const SITE_SETTINGS_PATH = path.join(process.cwd(), "data", "site-settings.json");

function parseSiteSettings(raw: unknown): SiteSettingsFileV1 | null {
  if (!raw || typeof raw !== "object") return null;
  const v = raw as SiteSettingsFileV1;
  if (v.version !== 1) return null;
  return v;
}

export async function readSiteSettingsFile(): Promise<SiteSettingsFileV1 | null> {
  const raw = await readRuntimeJsonValue("siteSettings");
  return parseSiteSettings(raw);
}

export async function writeSiteSettingsFile(data: SiteSettingsFileV1): Promise<void> {
  await writeRuntimeJsonValue("siteSettings", data);
}
