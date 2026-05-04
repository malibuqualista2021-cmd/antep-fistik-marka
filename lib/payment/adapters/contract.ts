import type { PaymentProviderId } from "@/lib/payment/types";
import type { PrepareCheckoutInput, PrepareCheckoutResult } from "@/lib/payment/types";

/**
 * Tüm ödeme sağlayıcı adapter’ları bu sözleşmeyi uygular.
 * Entegrasyon sırasında:
 * - `prepareCheckout`: ödeme oturumu / hosted page / client secret üretir.
 * - `verifyWebhook`: sağlayıcı imzalı webhook ile durumu doğrular (ayrı route).
 *
 * Şimdilik `stub` adapter yalnızca `pending` döner; ağ çağrısı yok.
 */
export interface PaymentAdapter {
  readonly id: PaymentProviderId;

  /** Sipariş oluşturulduktan sonra ödeme adımına geçiş (ileride). */
  prepareCheckout?(input: PrepareCheckoutInput): Promise<PrepareCheckoutResult>;
}
