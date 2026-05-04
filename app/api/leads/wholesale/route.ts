import { NextResponse } from "next/server";
import { appendWholesaleLead, type WholesaleLeadRecord } from "@/lib/server/wholesale-leads-store";
import { readSiteSettingsFile } from "@/lib/server/site-settings-store";
import { mergeContentMessages, contentMessage, SITE_MESSAGE_KEYS } from "@/lib/site-content-messages";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body || typeof body !== "object") {
    return NextResponse.json({ ok: false, message: "Geçersiz talep." }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const productType = typeof body.productType === "string" ? body.productType.trim() : "";
  const quantity = typeof body.quantity === "string" ? body.quantity.trim() : "";
  const usageArea = typeof body.usageArea === "string" ? body.usageArea.trim() : "";
  const deliveryCity = typeof body.deliveryCity === "string" ? body.deliveryCity.trim() : "";
  const requestType = typeof body.requestType === "string" ? body.requestType.trim() : "";
  const source = typeof body.source === "string" ? body.source.trim() : "unknown";

  if (!name || !phone || !productType || !quantity || !usageArea || !deliveryCity || !requestType) {
    return NextResponse.json({ ok: false, message: "Zorunlu alanlar eksik." }, { status: 400 });
  }

  const record: WholesaleLeadRecord = {
    id: `WL-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`.toUpperCase(),
    createdAt: new Date().toISOString(),
    adminStatus: "new",
    source,
    name,
    phone,
    company: typeof body.company === "string" ? body.company.trim() || undefined : undefined,
    productType,
    quantity,
    usageArea,
    deliveryCity,
    targetDate: typeof body.targetDate === "string" ? body.targetDate.trim() || undefined : undefined,
    requestType,
    note: typeof body.note === "string" ? body.note.trim() || undefined : undefined,
  };

  try {
    await appendWholesaleLead(record);
  } catch (e) {
    console.error("[api/leads/wholesale] persist failed", e);
    const file = await readSiteSettingsFile();
    const msgMap = mergeContentMessages(file?.contentMessages);
    return NextResponse.json(
      { ok: false, message: contentMessage(msgMap, SITE_MESSAGE_KEYS.leadPersistFailed) },
      { status: 503 },
    );
  }

  return NextResponse.json({ ok: true, id: record.id });
}
