"use client";

import { useState } from "react";
import type { MediaSlot } from "@/lib/media-slots";
import { MediaDashboard } from "@/components/dashboard/MediaDashboard";
import { ProductManager } from "@/components/dashboard/ProductManager";
import { OrderManager } from "@/components/dashboard/OrderManager";

type Tab = "media" | "products" | "orders";

const tabs: { id: Tab; label: string }[] = [
  { id: "media", label: "Görseller" },
  { id: "products", label: "Perakende ürünler" },
  { id: "orders", label: "Siparişler" },
];

export function DashboardTabs({ slots }: { slots: MediaSlot[] }) {
  const [tab, setTab] = useState<Tab>("media");

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {tabs.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setTab(item.id)}
            className={`min-h-[44px] rounded-[var(--radius-button)] px-4 py-2 font-sans text-sm font-semibold ring-1 ring-primary/20 ${
              tab === item.id ? "bg-primary text-[var(--cream)]" : "bg-background text-primary"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      {tab === "media" ? <MediaDashboard slots={slots} /> : null}
      {tab === "products" ? <ProductManager /> : null}
      {tab === "orders" ? <OrderManager /> : null}
    </div>
  );
}
