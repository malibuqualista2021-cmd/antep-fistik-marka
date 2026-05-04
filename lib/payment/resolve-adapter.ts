import type { PaymentAdapter } from "@/lib/payment/adapters/contract";
import { stubPaymentAdapter } from "@/lib/payment/adapters/stub";
import { getActivePaymentProviderId, getPaymentGatewayMode } from "@/lib/payment/config";
import type { PaymentProviderId } from "@/lib/payment/types";

/**
 * Çalışma zamanında kullanılacak adapter.
 *
 * Kural: Gerçek anahtarlar ve production modu bağlanana kadar **her zaman** `stub`
 * döner; `NEXT_PUBLIC_PAYMENT_PROVIDER_TARGET` yalnızca hangi modülün ekleneceğini
 * işaretler (iyzico/paytr/stripe dosyaları ileride burada seçilir).
 *
 * Örnek ileride:
 * ```ts
 * if (mode === "production" && id === "iyzico") return iyzicoPaymentAdapter;
 * ```
 */
export function resolvePaymentAdapter(): PaymentAdapter {
  const mode = getPaymentGatewayMode();
  const target = getActivePaymentProviderId();

  if (mode === "production" && target !== "stub") {
    // Entegrasyon tamamlanınca: return concreteAdapter[target];
    // Şimdilik güvenli düşüş — canlı tahsilat kapalı.
    return stubPaymentAdapter;
  }

  return stubPaymentAdapter;
}

export function describePaymentTargetForLogs(): { mode: ReturnType<typeof getPaymentGatewayMode>; target: PaymentProviderId } {
  return {
    mode: getPaymentGatewayMode(),
    target: getActivePaymentProviderId(),
  };
}
