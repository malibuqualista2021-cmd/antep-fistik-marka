"use client";

import { useSyncExternalStore } from "react";
import { favoritesSnapshotKey, subscribeFavorites, toggleFavoriteProductId } from "@/lib/favorites-store";

type Props = {
  productId: string;
  className?: string;
  label?: string;
};

export function FavoriteToggle({ productId, className = "", label = "Favorilere ekle" }: Props) {
  const snap = useSyncExternalStore(subscribeFavorites, favoritesSnapshotKey, () => "");
  const active = snap ? snap.split("|").filter(Boolean).includes(productId) : false;

  return (
    <button
      type="button"
      onClick={() => toggleFavoriteProductId(productId)}
      className={`inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-[var(--line-soft)] bg-[var(--color-surface)] text-lg shadow-sm transition hover:border-primary/40 hover:bg-[var(--color-green-soft)] ${active ? "text-[var(--color-orange)]" : "text-[var(--color-muted)]"} ${className}`}
      aria-pressed={active}
      aria-label={active ? "Favorilerden çıkar" : label}
    >
      <span aria-hidden>{active ? "♥" : "♡"}</span>
    </button>
  );
}
