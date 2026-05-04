import { NextResponse } from "next/server";
import {
  createOrderId,
  type BillingInfo,
  type CustomerInfo,
  type OrderRecord,
} from "@/lib/orders";
import type { CartItem } from "@/components/shop/CartProvider";
import type { CheckoutPaymentMethodCode } from "@/lib/payment/types";
import { resolvePaymentAdapter } from "@/lib/payment/resolve-adapter";
import { appendPersistedOrder } from "@/lib/server/orders-store";
import { readSiteSettingsFile } from "@/lib/server/site-settings-store";
import { mergeContentMessages, contentMessage, SITE_MESSAGE_KEYS } from "@/lib/site-content-messages";

const PAYMENT_METHODS: CheckoutPaymentMethodCode[] = [
  "card",
  "bank_transfer",
  "cash_on_delivery",
  "wallet_other",
];

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

function isBillingInfo(value: unknown): value is BillingInfo {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  if (v.invoiceType !== "individual" && v.invoiceType !== "company") return false;
  if (typeof v.sameAsShipping !== "boolean") return false;

  if (v.invoiceType === "company") {
    const title = v.companyTitle;
    const tax = v.taxNumber;
    if (typeof title !== "string" || title.trim() === "") return false;
    if (typeof tax !== "string" || tax.trim() === "") return false;
  }

  if (v.sameAsShipping === false) {
    const fields = [v.billingFullName, v.billingCity, v.billingDistrict, v.billingAddress];
    for (const f of fields) {
      if (typeof f !== "string" || f.trim() === "") return false;
    }
  }

  return true;
}

function isCheckoutPaymentMethod(value: unknown): value is CheckoutPaymentMethodCode {
  return typeof value === "string" && (PAYMENT_METHODS as string[]).includes(value);
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as {
    customer?: unknown;
    billing?: unknown;
    paymentMethod?: unknown;
    items?: unknown;
  } | null;

  if (
    !body ||
    !isCustomerInfo(body.customer) ||
    !isBillingInfo(body.billing) ||
    !isCheckoutPaymentMethod(body.paymentMethod) ||
    !Array.isArray(body.items)
  ) {
    return NextResponse.json({ ok: false, message: "Eksik veya geçersiz sipariş bilgisi." }, { status: 400 });
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

  const orderId = createOrderId();
  const adapter = resolvePaymentAdapter();

  let paymentIntentRef: string | null = null;
  let paymentLastMessage: string | null = null;

  if (typeof adapter.prepareCheckout === "function") {
    const prep = await adapter.prepareCheckout({
      orderId,
      amountTry: total,
      currency: "TRY",
      customerEmail: body.customer.email,
      customerFullName: body.customer.fullName,
    });
    if (prep.status === "pending") {
      paymentIntentRef = prep.providerPaymentRef ?? null;
    } else {
      paymentLastMessage = prep.message;
    }
  }

  const customer: CustomerInfo = {
    ...body.customer,
    note:
      typeof body.customer.note === "string" && body.customer.note.trim() !== ""
        ? body.customer.note.trim()
        : undefined,
  };

  const order: OrderRecord = {
    id: orderId,
    createdAt: new Date().toISOString(),
    customer,
    billing: body.billing,
    items,
    total,
    status: "new",
    paymentProviderId: adapter.id,
    paymentMethod: body.paymentMethod,
    paymentStatus: "pending",
    paymentIntentRef,
    paymentLastMessage,
  };

  const settingsFile = await readSiteSettingsFile();
  const msgMap = mergeContentMessages(settingsFile?.contentMessages);

  try {
    await appendPersistedOrder(order);
  } catch (e) {
    console.error("[api/orders] persist failed", e);
    return NextResponse.json(
      {
        ok: false,
        message: contentMessage(msgMap, SITE_MESSAGE_KEYS.orderPersistFailed),
      },
      { status: 503 },
    );
  }

  return NextResponse.json({ ok: true, order });
}
