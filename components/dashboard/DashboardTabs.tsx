"use client";

import { useState } from "react";
import type { MediaSlot } from "@/lib/media-slots";
import { MediaDashboard } from "@/components/dashboard/MediaDashboard";
import { AdminProductManager } from "@/components/dashboard/AdminProductManager";
import { OrderManager } from "@/components/dashboard/OrderManager";
import { WholesaleLeadsPanel } from "@/components/dashboard/WholesaleLeadsPanel";
import { Button } from "@/components/ui/Button";

type Tab = "products" | "site" | "media" | "orders" | "leads";

const tabs: { id: Tab; label: string }[] = [
  { id: "products", label: "Ürün yönetimi" },
  { id: "site", label: "Site & vitrin" },
  { id: "media", label: "Fotoğraf yükleme" },
  { id: "orders", label: "Siparişler" },
  { id: "leads", label: "Toptan talepleri" },
];

import type { RetailCategoryDefinition } from "@/lib/site-settings-types";
import { SiteSettingsPanel } from "@/components/dashboard/SiteSettingsPanel";

export function DashboardTabs({
  slots,
  cloudinaryConfigured,
  categories,
}: {
  slots: MediaSlot[];
  cloudinaryConfigured: boolean;
  categories: RetailCategoryDefinition[];
}) {
  const [tab, setTab] = useState<Tab>("products");

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.reload();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Yönetim sekmeleri">
          {tabs.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`dashboard-tab-${item.id}`}
              aria-selected={tab === item.id}
              tabIndex={tab === item.id ? 0 : -1}
              onClick={() => setTab(item.id)}
              className={`min-h-[44px] rounded-[var(--radius-button)] px-4 py-2 font-sans text-sm font-semibold ring-1 ring-primary/20 ${
                tab === item.id ? "bg-primary text-[var(--cream)]" : "bg-background text-primary"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <Button variant="ghost" className="!min-h-[40px]" onClick={() => void logout()}>
          Çıkış yap
        </Button>
      </div>
      {tab === "products" ? <AdminProductManager categories={categories} cloudinaryConfigured={cloudinaryConfigured} /> : null}
      {tab === "site" ? <SiteSettingsPanel /> : null}
      {tab === "media" ? <MediaDashboard slots={slots} cloudinaryConfigured={cloudinaryConfigured} /> : null}
      {tab === "orders" ? <OrderManager /> : null}
      {tab === "leads" ? <WholesaleLeadsPanel /> : null}
    </div>
  );
}
