"use client";

import { useState } from "react";
import type { FaqItem } from "@/lib/faq";
import { FaqAccordion } from "@/components/page-sections/FaqAccordion";

type Group = {
  id: string;
  label: string;
  items: FaqItem[];
};

export function FaqTabs({ groups }: { groups: Group[] }) {
  const [active, setActive] = useState(groups[0]?.id ?? "");
  const group = groups.find((item) => item.id === active) ?? groups[0];

  return (
    <div>
      <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2" role="tablist" aria-label="SSS kategorileri">
        {groups.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActive(item.id)}
            className={`min-h-[42px] shrink-0 rounded-full px-4 py-2 font-sans text-sm font-semibold ring-1 ring-primary/20 ${
              active === item.id ? "bg-primary text-[var(--cream)]" : "bg-background text-primary"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="mt-6">
        <FaqAccordion items={group.items} />
      </div>
    </div>
  );
}
