"use client";

import { useId, useState } from "react";
import type { FaqItem } from "@/lib/faq";

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const id = useId();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-black/[0.06] rounded-[var(--radius-card)] border border-black/[0.06] bg-background">
      {items.map((item, i) => {
        const panelId = `${id}-panel-${i}`;
        const headerId = `${id}-header-${i}`;
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <button
              type="button"
              id={headerId}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className="flex w-full items-center justify-between gap-4 px-4 py-3.5 text-left font-sans text-[0.9375rem] font-medium text-foreground hover:bg-surface/40 sm:px-5 sm:py-4"
              onClick={() => setOpen(isOpen ? null : i)}
            >
              {item.q}
              <span className="shrink-0 text-primary tabular-nums" aria-hidden>
                {isOpen ? "−" : "+"}
              </span>
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={headerId}
              hidden={!isOpen}
              className={isOpen ? "px-4 pb-4 sm:px-5 sm:pb-4" : "hidden"}
            >
              <p className="font-sans text-sm leading-relaxed text-muted">
                {item.a}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
