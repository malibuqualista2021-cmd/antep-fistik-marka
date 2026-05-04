/**
 * Ödeme entegrasyon katmanı — özet
 *
 * 1. `resolvePaymentAdapter()` → şu an her zaman `stub` (tahsilat yok).
 * 2. `getPaymentGatewayMode()` → env ile disabled | sandbox | production (production’da bile adapter bağlı değilse stub).
 * 3. Yeni sağlayıcı: `lib/payment/adapters/<isim>.ts` içinde `PaymentAdapter` uygula,
 *    ardından `resolvePaymentAdapter` içinde mode + env ile seç.
 *
 * API anahtarları: yalnızca sunucu env (`process.env.IYZICO_*` vb.); istemciye koyma.
 */

export type {
  CheckoutPaymentMethodCode,
  LegacyPaymentStatus,
  OrderPaymentStatus,
  PaymentGatewayMode,
  PaymentProviderId,
  PaymentSettlementStatus,
  PrepareCheckoutInput,
  PrepareCheckoutResult,
} from "@/lib/payment/types";

export { getPaymentGatewayMode, getActivePaymentProviderId, isPaymentCaptureEnabled } from "@/lib/payment/config";
export { resolvePaymentAdapter, describePaymentTargetForLogs } from "@/lib/payment/resolve-adapter";
export type { PaymentAdapter } from "@/lib/payment/adapters/contract";
