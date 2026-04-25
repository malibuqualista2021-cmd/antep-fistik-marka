"use client";

import { useEffect, useState } from "react";
import { retailProducts, formatMoney, type RetailProduct } from "@/lib/shop-products";
import { Button } from "@/components/ui/Button";
import { LS, readWithLegacyMigrate } from "@/lib/storage-keys";

const KEY = LS.dashboardProducts.key;

export function ProductManager() {
  const [products, setProducts] = useState<RetailProduct[]>(retailProducts);

  useEffect(() => {
    try {
      const raw = readWithLegacyMigrate(KEY, LS.dashboardProducts.legacy);
      if (raw) setProducts(JSON.parse(raw) as RetailProduct[]);
    } catch {
      setProducts(retailProducts);
    }
  }, []);

  function persist(next: RetailProduct[]) {
    setProducts(next);
    window.localStorage.setItem(KEY, JSON.stringify(next));
  }

  return (
    <section className="card-elevated rounded-[var(--radius-card)] p-5 md:p-7">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-serif text-2xl text-foreground">Perakende ürünler</h2>
          <p className="mt-1 max-w-2xl font-sans text-sm text-muted">
            Ürün yönetimi Airtable/Sheet kolonlarına
            aktarılabilecek alan adlarıyla hazırlanmıştır.
          </p>
        </div>
        <Button
          variant="secondary"
          onClick={() => navigator.clipboard.writeText(JSON.stringify(products, null, 2))}
          className="!min-h-[40px] !px-3 !py-2 !text-sm"
        >
          JSON kopyala
        </Button>
      </div>
      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[760px] border-separate border-spacing-y-2 font-sans text-sm">
          <thead className="text-left text-xs uppercase tracking-wide text-muted">
            <tr>
              <th className="px-3 py-2">Ürün</th>
              <th className="px-3 py-2">Gramaj</th>
              <th className="px-3 py-2">Fiyat</th>
              <th className="px-3 py-2">Stok</th>
              <th className="px-3 py-2">Durum</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="bg-background ring-1 ring-black/[0.05]">
                <td className="rounded-l-[10px] px-3 py-3 font-medium text-foreground">{product.name}</td>
                <td className="px-3 py-3 text-muted">{product.weight}</td>
                <td className="px-3 py-3 text-foreground">{formatMoney(product.price)}</td>
                <td className="px-3 py-3 text-muted">{product.stockStatus}</td>
                <td className="rounded-r-[10px] px-3 py-3">
                  <button
                    type="button"
                    className="font-semibold text-primary underline-offset-4 hover:underline"
                    onClick={() =>
                      persist(
                        products.map((p) =>
                          p.id === product.id ? { ...p, isActive: !p.isActive } : p,
                        ),
                      )
                    }
                  >
                    {product.isActive ? "Aktif" : "Pasif"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
