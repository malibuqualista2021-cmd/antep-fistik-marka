"use client";

import { useState } from "react";
import type { ProductDetailTab } from "@/lib/product-detail-types";

export function ProductDetailTabs({ tabs }: { tabs: ProductDetailTab[] }) {
  const [active, setActive] = useState(tabs[0]?.id ?? "");

  if (!tabs.length) return null;

  return (
    <div className="rounded-[var(--radius-card)] bg-[var(--cream)] ring-1 ring-[var(--border-subtle)]">
      <div
        className="flex gap-1 overflow-x-auto border-b border-black/[0.08] px-2 pt-2"
        role="tablist"
        aria-label="Ürün bilgileri"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={active === tab.id}
            onClick={() => setActive(tab.id)}
            className={`shrink-0 rounded-t-[10px] px-4 py-2.5 font-sans text-sm font-semibold transition ${
              active === tab.id ? "bg-background text-primary ring-1 ring-black/[0.06]" : "text-muted hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="bg-background p-5 md:p-6" role="tabpanel">
        {(() => {
          const tab = tabs.find((t) => t.id === active);
          if (!tab) return null;
          return (
            <div
              key={tab.id}
              className="prose-article font-sans text-sm leading-relaxed text-muted md:text-base [&_table]:w-full [&_table]:border-collapse [&_th]:border [&_th]:border-black/10 [&_th]:bg-surface/80 [&_th]:p-2 [&_th]:text-left [&_th]:text-xs [&_th]:font-semibold [&_th]:text-foreground [&_td]:border [&_td]:border-black/10 [&_td]:p-2 [&_td]:text-sm [&_ul]:mt-2 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mt-1"
              dangerouslySetInnerHTML={{ __html: tab.content }}
            />
          );
        })()}
      </div>
    </div>
  );
}
