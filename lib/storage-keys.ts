/**
 * Tarayıcı localStorage anahtarları — marka değişiminde eski anahtarlardan tek seferlik taşıma.
 */
export const LS = {
  cart: { key: "inal-fistik-cart-v1", legacy: "koklu-antep-cart-v1" },
  orders: { key: "inal-fistik-orders-v1", legacy: "koklu-antep-orders-v1" },
  dashboardProducts: { key: "inal-fistik-dashboard-products-v1", legacy: "koklu-antep-dashboard-products-v1" },
} as const;

/** Önce `key`, yoksa `legacy` okunur; legacy doluysa `key`e kopyalanır ve legacy silinir. */
export function readWithLegacyMigrate(key: string, legacyKey: string): string | null {
  if (typeof window === "undefined") return null;
  const current = window.localStorage.getItem(key);
  if (current !== null && current !== "") return current;
  const legacy = window.localStorage.getItem(legacyKey);
  if (legacy !== null && legacy !== "") {
    window.localStorage.setItem(key, legacy);
    window.localStorage.removeItem(legacyKey);
    return legacy;
  }
  return current;
}
