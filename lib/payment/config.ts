import { publicEnv } from "@/lib/env-public";
import type { PaymentGatewayMode, PaymentProviderId } from "@/lib/payment/types";

/**
 * `NEXT_PUBLIC_PAYMENT_GATEWAY_MODE`: `disabled` | `sandbox` | `production`
 * Varsayılan: disabled — gerçek tahsilat yok.
 *
 * `NEXT_PUBLIC_PAYMENT_PROVIDER_TARGET`: hedef sağlayıcı (yalnızca dokümantasyon / hazırlık).
 * Gerçek anahtarlar eklenene kadar işlem yapmaz.
 */
export function getPaymentGatewayMode(): PaymentGatewayMode {
  const raw = publicEnv("NEXT_PUBLIC_PAYMENT_GATEWAY_MODE").toLowerCase();
  if (raw === "sandbox" || raw === "production") return raw;
  return "disabled";
}

/** Şu an çalışan adapter kimliği — gateway kapalıyken bile `stub` ile akış test edilir. */
export function getActivePaymentProviderId(): PaymentProviderId {
  const target = publicEnv("NEXT_PUBLIC_PAYMENT_PROVIDER_TARGET").toLowerCase();
  if (target === "iyzico" || target === "paytr" || target === "stripe") {
    return target;
  }
  return "stub";
}

export function isPaymentCaptureEnabled(): boolean {
  return getPaymentGatewayMode() === "production";
}
