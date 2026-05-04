/**
 * Ödeme sağlayıcı kimlikleri — gerçek entegrasyon modülleri bu anahtarlarla eşleşir.
 * Şimdilik yalnızca `stub` kullanılır; iyzico / PayTR / Stripe vb. için adapter eklenecek.
 */
export type PaymentProviderId = "stub" | "iyzico" | "paytr" | "stripe";

/** Ortam: canlı ödeme kapalı veya sandbox hazırlığı (API anahtarı yok). */
export type PaymentGatewayMode = "disabled" | "sandbox" | "production";

/** Checkout’ta müşterinin seçtiği yöntem (sağlayıcıya map edilir). */
export type CheckoutPaymentMethodCode =
  | "card"
  | "bank_transfer"
  | "cash_on_delivery"
  | "wallet_other";

/** Sipariş kalemi için ödeme yerleşim durumu — webhook / sağlayıcı yanıtı ile güncellenir. */
export type PaymentSettlementStatus = "pending" | "paid" | "failed" | "cancelled" | "refunded";

/** Eski demo siparişler (localStorage). Yeni siparişlerde kullanılmaz. */
export type LegacyPaymentStatus = "mock_paid";

export type OrderPaymentStatus = PaymentSettlementStatus | LegacyPaymentStatus;

/** Sağlayıcıya gönderilecek özet (ileride genişletilir). */
export type PrepareCheckoutInput = {
  orderId: string;
  amountTry: number;
  currency: "TRY";
  customerEmail: string;
  customerFullName: string;
};

/** Ödeme oturumu oluşturma sonucu — gerçek entegrasyonda redirect URL veya client token döner. */
export type PrepareCheckoutResult =
  | {
      status: "pending";
      providerPaymentRef?: string | null;
      redirectUrl?: string | null;
      clientPayload?: Record<string, unknown>;
    }
  | {
      status: "unavailable";
      message: string;
    };
