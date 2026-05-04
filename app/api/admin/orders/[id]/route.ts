import { NextResponse } from "next/server";
import type { OrderStatus } from "@/lib/orders";
import type { PaymentSettlementStatus } from "@/lib/payment/types";
import { unauthorizedUnlessAdmin } from "@/lib/admin/assert-admin";
import { updatePersistedOrderPatch } from "@/lib/server/orders-store";

const orderStatuses: OrderStatus[] = ["new", "confirmed", "preparing", "shipped", "cancelled"];
const settlementStatuses: PaymentSettlementStatus[] = ["pending", "paid", "failed", "cancelled", "refunded"];

type Params = { params: Promise<{ id: string }> };

export async function PATCH(req: Request, ctx: Params) {
  const denied = await unauthorizedUnlessAdmin();
  if (denied) return denied;

  const { id } = await ctx.params;
  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body || typeof body !== "object") {
    return NextResponse.json({ ok: false, message: "Geçersiz gövde." }, { status: 400 });
  }

  const patch: { status?: OrderStatus; paymentStatus?: PaymentSettlementStatus } = {};

  if (typeof body.status === "string" && orderStatuses.includes(body.status as OrderStatus)) {
    patch.status = body.status as OrderStatus;
  }
  if (typeof body.paymentStatus === "string" && settlementStatuses.includes(body.paymentStatus as PaymentSettlementStatus)) {
    patch.paymentStatus = body.paymentStatus as PaymentSettlementStatus;
  }

  if (patch.status === undefined && patch.paymentStatus === undefined) {
    return NextResponse.json({ ok: false, message: "Geçerli alan yok." }, { status: 400 });
  }

  try {
    const ok = await updatePersistedOrderPatch(id, patch);
    if (!ok) return NextResponse.json({ ok: false, message: "Sipariş dosyada bulunamadı." }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, message: "Dosyaya yazılamadı." }, { status: 500 });
  }
}
