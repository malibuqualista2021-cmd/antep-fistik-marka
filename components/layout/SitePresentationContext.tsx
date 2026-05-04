"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { SitePresentation } from "@/lib/site-presentation";

const SitePresentationContext = createContext<SitePresentation | null>(null);

export function SitePresentationProvider({ value, children }: { value: SitePresentation; children: ReactNode }) {
  return <SitePresentationContext.Provider value={value}>{children}</SitePresentationContext.Provider>;
}

export function useSitePresentation(): SitePresentation {
  const ctx = useContext(SitePresentationContext);
  if (!ctx) {
    throw new Error("useSitePresentation yalnızca SitePresentationProvider içinde kullanılabilir.");
  }
  return ctx;
}
