"use client";

import { useMemo, useState } from "react";
import { retailProducts, type RetailProduct } from "@/lib/shop-products";
import { RetailProductCard } from "@/components/shop/RetailProductCard";

const tabs: { id: "all" | RetailProduct["category"]; label: string }[] = [
  { id: "all", label: "Tüm ürünler" },
  { id: "kabuklu", label: "Kabuklu" },
  { id: "ic", label: "İç fıstık" },
  { id: "boz", label: "Boz iç" },
  { id: "paket", label: "Hediye / Paket" },
];

export function RetailStore() {
  const [category, setCategory] = useState<(typeof tabs)[number]["id"]>("all");
  const [sort, setSort] = useState("popular");
  const products = useMemo(
    () => {
      const filtered = retailProducts.filter(
        (product) => product.isActive && (category === "all" || product.category === category),
      );
      return [...filtered].sort((a, b) => {
        if (sort === "price-asc") return a.price - b.price;
        if (sort === "price-desc") return b.price - a.price;
        if (sort === "stock") return a.stockStatus.localeCompare(b.stockStatus);
        return 0;
      });
    },
    [category, sort],
  );

  return (
    <div className="rounded-[var(--radius-xl)] bg-surface/45 p-3 ring-1 ring-black/[0.06] md:p-5">
      <div className="flex flex-col gap-4 border-b border-black/10 pb-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1" role="tablist" aria-label="Ürün kategorileri">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setCategory(tab.id)}
              className={`min-h-[44px] shrink-0 rounded-full px-5 py-2 font-sans text-sm font-semibold shadow-sm ring-1 ring-primary/20 ${
                category === tab.id ? "bg-primary text-[var(--cream)]" : "bg-background text-primary hover:bg-[var(--cream)]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <label className="flex shrink-0 items-center gap-2 font-sans text-sm text-muted">
          Sırala
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="min-h-[42px] rounded-full border border-black/10 bg-background px-3 text-foreground"
          >
            <option value="popular">Önerilen</option>
            <option value="price-asc">Artan fiyat</option>
            <option value="price-desc">Azalan fiyat</option>
            <option value="stock">Stok durumu</option>
          </select>
        </label>
      </div>
      <div className="mt-5 grid gap-5 lg:grid-cols-[220px_1fr]">
        <aside className="hidden rounded-[var(--radius-card)] bg-background p-4 ring-1 ring-black/[0.06] lg:block">
          <p className="font-sans text-sm font-semibold text-foreground">Filtreler</p>
          <div className="mt-4 space-y-4 font-sans text-sm text-muted">
            <div>
              <p className="font-semibold text-foreground">Gramaj</p>
              <ul className="mt-2 space-y-1">
                <li>250 g</li>
                <li>500 g</li>
                <li>1 kg</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-foreground">Avantajlar</p>
              <ul className="mt-2 space-y-1">
                <li>1-3 iş günü kargo</li>
                <li>WhatsApp destek</li>
                <li>Güvenli sipariş</li>
              </ul>
            </div>
          </div>
        </aside>
        <div>
          <div className="mb-4 flex items-center justify-between font-sans text-sm text-muted">
            <span>{products.length} ürün listeleniyor</span>
            <span className="hidden sm:inline">Gaziantep’ten taze paketler</span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <RetailProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
