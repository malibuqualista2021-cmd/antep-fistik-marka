import type { PaymentAdapter } from "@/lib/payment/adapters/contract";
import type { PrepareCheckoutInput, PrepareCheckoutResult } from "@/lib/payment/types";

/**
 * Gerçek sağlayıcı bağlı değilken kullanılan adapter.
 * Tahsilat yapmaz; `pending` ödeme durumu üretir.
 */
export const stubPaymentAdapter: PaymentAdapter = {
  id: "stub",

  async prepareCheckout(_input: PrepareCheckoutInput): Promise<PrepareCheckoutResult> {
    return {
      status: "pending",
      providerPaymentRef: null,
      redirectUrl: null,
      clientPayload: { note: "stub-no-op" },
    };
  },
};
