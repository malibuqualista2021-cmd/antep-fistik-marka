import { NextResponse } from "next/server";
import { unauthorizedUnlessAdmin } from "@/lib/admin/assert-admin";
import { readPersistedOrders } from "@/lib/server/orders-store";

export async function GET() {
  const denied = await unauthorizedUnlessAdmin();
  if (denied) return denied;
  const orders = await readPersistedOrders();
  return NextResponse.json({ ok: true, orders });
}
