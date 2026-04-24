import { NextResponse } from "next/server";
import { createOrderId, type CustomerInfo, type OrderRecord } from "@/lib/orders";
import type { CartItem } from "@/components/shop/CartProvider";

function isCustomerInfo(value: unknown): value is CustomerInfo {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.fullName === "string" &&
    typeof v.phone === "string" &&
    typeof v.email === "string" &&
    typeof v.city === "string" &&
    typeof v.district === "string" &&
    typeof v.address === "string"
  );
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as {
    customer?: unknown;
    items?: unknown;
  } | null;

  if (!body || !isCustomerInfo(body.customer) || !Array.isArray(body.items)) {
    return NextResponse.json({ ok: false, message: "Eksik sipariş bilgisi." }, { status: 400 });
  }

  const items = body.items as CartItem[];
  if (items.length === 0) {
    return NextResponse.json({ ok: false, message: "Sepet boş." }, { status: 400 });
  }

  const total = items.reduce((sum, item) => {
    const price = Number(item.product?.price || 0);
    const quantity = Number(item.quantity || 0);
    return sum + price * quantity;
  }, 0);

  const order: OrderRecord = {
    id: createOrderId(),
    createdAt: new Date().toISOString(),
    customer: body.customer,
    items,
    total,
    status: "new",
    paymentStatus: "mock_paid",
  };

  return NextResponse.json({ ok: true, order });
}
