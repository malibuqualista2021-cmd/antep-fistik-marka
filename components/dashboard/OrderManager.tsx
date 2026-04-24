"use client";

import { useEffect, useState } from "react";
import type { OrderRecord, OrderStatus } from "@/lib/orders";
import { formatMoney } from "@/lib/shop-products";
import { Button } from "@/components/ui/Button";

const KEY = "koklu-antep-orders-v1";
const statuses: OrderStatus[] = ["new", "confirmed", "preparing", "shipped", "cancelled"];

export function OrderManager() {
  const [orders, setOrders] = useState<OrderRecord[]>([]);

  useEffect(() => {
    try {
      setOrders(JSON.parse(window.localStorage.getItem(KEY) || "[]") as OrderRecord[]);
    } catch {
      setOrders([]);
    }
  }, []);

  function persist(next: OrderRecord[]) {
    setOrders(next);
    window.localStorage.setItem(KEY, JSON.stringify(next));
  }

  return (
    <section className="card-elevated rounded-[var(--radius-card)] p-5 md:p-7">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-serif text-2xl text-foreground">Siparişler</h2>
          <p className="mt-1 font-sans text-sm text-muted">
            Mock ödeme ile oluşan siparişler bu tarayıcıda listelenir.
          </p>
        </div>
        <Button
          variant="secondary"
          onClick={() => navigator.clipboard.writeText(JSON.stringify(orders, null, 2))}
          className="!min-h-[40px] !px-3 !py-2 !text-sm"
        >
          Sipariş JSON kopyala
        </Button>
      </div>
      {orders.length === 0 ? (
        <p className="mt-5 rounded-[var(--radius-input)] bg-background p-4 font-sans text-sm text-muted ring-1 ring-black/5">
          Henüz sipariş yok. Test etmek için bir ürün sepete ekleyip checkout akışını tamamlayın.
        </p>
      ) : (
        <div className="mt-5 space-y-4">
          {orders.map((order) => (
            <article key={order.id} className="rounded-[var(--radius-card)] bg-background p-4 ring-1 ring-black/[0.06]">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <h3 className="font-serif text-xl text-foreground">{order.id}</h3>
                  <p className="mt-1 font-sans text-sm text-muted">
                    {order.customer.fullName} · {order.customer.phone} · {order.customer.city}
                  </p>
                </div>
                <strong className="font-sans text-primary">{formatMoney(order.total)}</strong>
              </div>
              <ul className="mt-3 list-disc pl-5 font-sans text-sm text-muted">
                {order.items.map((item) => (
                  <li key={item.product.id}>
                    {item.product.name} × {item.quantity}
                  </li>
                ))}
              </ul>
              <label className="mt-4 block font-sans text-sm text-muted">
                Durum
                <select
                  value={order.status}
                  onChange={(e) =>
                    persist(
                      orders.map((o) =>
                        o.id === order.id ? { ...o, status: e.target.value as OrderStatus } : o,
                      ),
                    )
                  }
                  className="ml-2 rounded-[var(--radius-input)] border border-black/15 bg-surface px-2 py-2 text-foreground"
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </label>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
