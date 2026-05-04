import type { CartItem } from "@/components/shop/CartProvider";
import type {
  CheckoutPaymentMethodCode,
  LegacyPaymentStatus,
  OrderPaymentStatus,
  PaymentProviderId,
} from "@/lib/payment/types";

export type OrderStatus = "new" | "confirmed" | "preparing" | "shipped" | "cancelled";

/** Teslimat iletişim ve adres */
export type CustomerInfo = {
  fullName: string;
  phone: string;
  email: string;
  city: string;
  district: string;
  address: string;
  note?: string;
};

export type InvoiceType = "individual" | "company";

/** Fatura (efatura / kurumsal) bilgileri */
export type BillingInfo = {
  invoiceType: InvoiceType;
  /** invoiceType === company için zorunlu */
  companyTitle?: string;
  taxOffice?: string;
  taxNumber?: string;
  /** Teslimat adresinden farklı fatura adresi */
  sameAsShipping: boolean;
  billingFullName?: string;
  billingCity?: string;
  billingDistrict?: string;
  billingAddress?: string;
};

export type OrderRecord = {
  id: string;
  createdAt: string;
  customer: CustomerInfo;
  billing: BillingInfo;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  /** Ödeme sağlayıcısı (stub veya ileride iyzico / PayTR / Stripe). */
  paymentProviderId: PaymentProviderId;
  /** Müşterinin seçtiği ödeme kanalı */
  paymentMethod: CheckoutPaymentMethodCode;
  /** Tahsilat durumu — webhook ile güncellenmeye hazır */
  paymentStatus: OrderPaymentStatus;
  /** Sağlayıcı tarafı işlem referansı (payment intent, conversation id vb.) */
  paymentIntentRef?: string | null;
  /** Son ödeme mesajı / hata özeti (sandbox veya log) */
  paymentLastMessage?: string | null;
};

export function createOrderId() {
  return `KA-${Date.now().toString(36).toUpperCase()}`;
}

/** Eski localStorage kayıtları (mock_paid vb.) için güvenli genişletme; geçersiz girdi için `null`. */
export function normalizeLegacyOrder(raw: unknown): OrderRecord | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Partial<OrderRecord> & { paymentStatus?: string };
  if (typeof r.id !== "string" || !r.customer || typeof r.customer !== "object" || !Array.isArray(r.items)) {
    return null;
  }
  const legacyPaid = r.paymentStatus === ("mock_paid" satisfies LegacyPaymentStatus);
  const paymentStatus: OrderPaymentStatus = legacyPaid
    ? "paid"
    : (r.paymentStatus as OrderPaymentStatus) ?? "pending";
  return {
    id: r.id,
    createdAt: typeof r.createdAt === "string" ? r.createdAt : new Date(0).toISOString(),
    customer: r.customer as CustomerInfo,
    billing:
      r.billing ??
      ({
        invoiceType: "individual",
        sameAsShipping: true,
      } satisfies BillingInfo),
    items: r.items as CartItem[],
    total: typeof r.total === "number" ? r.total : 0,
    status: (r.status as OrderStatus) ?? "new",
    paymentProviderId: r.paymentProviderId ?? "stub",
    paymentMethod: r.paymentMethod ?? "card",
    paymentStatus,
    paymentIntentRef: r.paymentIntentRef ?? null,
    paymentLastMessage: r.paymentLastMessage ?? null,
  };
}
