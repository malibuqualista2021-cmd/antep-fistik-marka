export const FAVORITES_STORAGE_KEY = "inal-favorites-v1";

const listeners = new Set<() => void>();

function readIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (!raw) return [];
    const data = JSON.parse(raw) as unknown;
    if (!Array.isArray(data)) return [];
    return data.filter((x): x is string => typeof x === "string");
  } catch {
    return [];
  }
}

export function subscribeFavorites(onStoreChange: () => void) {
  listeners.add(onStoreChange);
  return () => listeners.delete(onStoreChange);
}

function notify() {
  listeners.forEach((l) => l());
}

/** Hook ile uyumlu anlık liste (SSR: boş). */
export function getFavoriteIdsSnapshot(): string[] {
  return readIds();
}

export function toggleFavoriteProductId(productId: string) {
  const set = new Set(readIds());
  if (set.has(productId)) set.delete(productId);
  else set.add(productId);
  localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify([...set]));
  notify();
}

export function favoritesSnapshotKey(): string {
  return readIds().sort().join("|");
}
