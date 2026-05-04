import { NextResponse } from "next/server";
import { unauthorizedUnlessAdmin } from "@/lib/admin/assert-admin";
import {
  updateWholesaleLeadPatch,
  type WholesaleLeadAdminStatus,
} from "@/lib/server/wholesale-leads-store";

const adminStatuses: WholesaleLeadAdminStatus[] = ["new", "contacted", "quoted", "won", "lost", "archived"];

type Params = { params: Promise<{ id: string }> };

export async function PATCH(req: Request, ctx: Params) {
  const denied = await unauthorizedUnlessAdmin();
  if (denied) return denied;

  const { id } = await ctx.params;
  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body || typeof body !== "object") {
    return NextResponse.json({ ok: false, message: "Geçersiz gövde." }, { status: 400 });
  }

  const patch: { adminStatus?: WholesaleLeadAdminStatus; adminNote?: string } = {};

  if (typeof body.adminStatus === "string" && adminStatuses.includes(body.adminStatus as WholesaleLeadAdminStatus)) {
    patch.adminStatus = body.adminStatus as WholesaleLeadAdminStatus;
  }
  if (typeof body.adminNote === "string") {
    patch.adminNote = body.adminNote;
  }

  if (patch.adminStatus === undefined && patch.adminNote === undefined) {
    return NextResponse.json({ ok: false, message: "Geçerli alan yok." }, { status: 400 });
  }

  try {
    const ok = await updateWholesaleLeadPatch(id, patch);
    if (!ok) return NextResponse.json({ ok: false, message: "Kayıt bulunamadı." }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, message: "Dosyaya yazılamadı." }, { status: 500 });
  }
}
