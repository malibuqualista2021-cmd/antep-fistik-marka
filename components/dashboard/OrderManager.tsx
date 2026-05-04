"use client";

import { useCallback, useEffect, useState } from "react";
import type { OrderRecord, OrderStatus } from "@/lib/orders";
import { normalizeLegacyOrder } from "@/lib/orders";
import type { PaymentSettlementStatus } from "@/lib/payment/types";
import { formatMoney } from "@/lib/shop-products";
import { Button } from "@/components/ui/Button";
import { LS, readWithLegacyMigrate } from "@/lib/storage-keys";

const KEY = LS.orders.key;
const statuses: OrderStatus[] = ["new", "confirmed", "preparing", "shipped", "cancelled"];

const settlementStatuses: PaymentSettlementStatus[] = ["pending", "paid", "failed", "cancelled", "refunded"];

const paymentStatusLabels: Record<PaymentSettlementStatus, string> = {
  pending: "Ödeme beklemede",
  paid: "Ödendi",
  failed: "Ödeme başarısız",
  cancelled: "Ödeme iptal",
  refunded: "İade edildi",
};

function mergeOrders(server: OrderRecord[], local: OrderRecord[]): OrderRecord[] {
  const serverIdSet = new Set(server.map((o) => o.id));
  const map = new Map<string, OrderRecord>();
  for (const o of server) map.set(o.id, o);
  for (const o of local) {
    const s = map.get(o.id);
    if (!s) map.set(o.id, o);
    else if (!serverIdSet.has(o.id)) {
      map.set(o.id, { ...s, status: o.status, paymentStatus: o.paymentStatus });
    }
  }
  return [...map.values()].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function OrderManager() {
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [serverIds, setServerIds] = useState<Set<string>>(new Set());
  const [loadError, setLoadError] = useState("");
  const [patchError, setPatchError] = useState("");

  const hydrate = useCallback(async () => {
    setLoadError("");
    let server: OrderRecord[] = [];
    try {
      const res = await fetch("/api/admin/orders", { credentials: "same-origin" });
      if (res.ok) {
        const data = (await res.json()) as { orders?: OrderRecord[] };
        server = Array.isArray(data.orders) ? data.orders : [];
      } else if (res.status !== 401) {
        setLoadError("Sunucu siparişleri yüklenemedi.");
      }
    } catch {
      setLoadError("Sunucu siparişleri için bağlantı hatası.");
    }

    setServerIds(new Set(server.map((o) => o.id)));

    let local: OrderRecord[] = [];
    try {
      readWithLegacyMigrate(KEY, LS.orders.legacy);
      const raw = JSON.parse(window.localStorage.getItem(KEY) || "[]") as unknown;
      const list = Array.isArray(raw) ? raw : [];
      local = list.map((row) => normalizeLegacyOrder(row)).filter((o): o is OrderRecord => o !== null);
    } catch {
      local = [];
    }

    setOrders(mergeOrders(server, local));
  }, []);

  useEffect(() => {
    void hydrate();
  }, [hydrate]);

  async function updateOrder(orderId: string, patch: Partial<Pick<OrderRecord, "status" | "paymentStatus">>) {
    setPatchError("");
    const prev = orders;
    const next = orders.map((o) => (o.id === orderId ? { ...o, ...patch } : o));
    setOrders(next);
    const localOnly = next.filter((o) => !serverIds.has(o.id));
    try {
      window.localStorage.setItem(KEY, JSON.stringify(localOnly));
    } catch {
      /* ignore quota */
    }

    if (!serverIds.has(orderId)) return;

    try {
      const res = await fetch(`/api/admin/orders/${encodeURIComponent(orderId)}`, {
        method: "PATCH",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      const body = (await res.json().catch(() => null)) as { message?: string } | null;
      if (!res.ok) {
        setOrders(prev);
        setPatchError(body?.message || "Sunucuya yazılamadı; seçim geri alındı.");
        void hydrate();
        return;
      }
      await hydrate();
    } catch {
      setOrders(prev);
      setPatchError("Bağlantı hatası; seçim geri alındı.");
      void hydrate();
    }
  }

  return (
    <section className="card-elevated rounded-[var(--radius-card)] p-5 md:p-7">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-serif text-2xl text-foreground">Siparişler</h2>
          <p className="mt-1 font-sans text-sm text-muted">
            Sunucuda kayıtlı siparişlerde durum değişiklikleri{" "}
            <code className="rounded bg-background px-1 py-0.5 text-xs">data/orders.json</code> dosyasına yazılır. Yalnızca yerelde olan
            kayıtlar tarayıcıda saklanır.
          </p>
          {loadError ? <p className="mt-2 text-xs text-amber-800">{loadError}</p> : null}
          {patchError ? <p className="mt-2 text-xs text-red-700">{patchError}</p> : null}
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" className="!min-h-[40px] !px-3 !py-2 !text-sm" onClick={() => void hydrate()}>
            Yenile
          </Button>
          <Button
            variant="secondary"
            onClick={() => navigator.clipboard.writeText(JSON.stringify(orders, null, 2))}
            className="!min-h-[40px] !px-3 !py-2 !text-sm"
          >
            Sipariş JSON kopyala
          </Button>
        </div>
      </div>
      {orders.length === 0 ? (
        <p className="mt-5 rounded-[var(--radius-input)] bg-background p-4 font-sans text-sm text-muted ring-1 ring-[var(--line-soft)]">
          Henüz sipariş yok. Test etmek için bir ürün sepete ekleyip checkout akışını tamamlayın.
        </p>
      ) : (
        <div className="mt-5 space-y-4">
          {orders.map((order) => (
            <article key={order.id} className="rounded-[var(--radius-card)] bg-background p-4 ring-1 ring-[var(--ring-soft)]">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-serif text-xl text-foreground">{order.id}</h3>
                    {serverIds.has(order.id) ? (
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 font-sans text-[10px] font-bold uppercase tracking-wide text-primary">
                        Sunucu
                      </span>
                    ) : (
                      <span className="rounded-full bg-muted/40 px-2 py-0.5 font-sans text-[10px] font-bold uppercase tracking-wide text-muted">
                        Yerel
                      </span>
                    )}
                  </div>
                  <p className="mt-1 font-sans text-sm text-muted">
                    {order.customer.fullName} · {order.customer.phone} · {order.customer.city}
                  </p>
                  <p className="mt-1 font-sans text-xs text-muted">
                    Ödeme yöntemi: <span className="text-foreground">{order.paymentMethod}</span> · Sağlayıcı:{" "}
                    <span className="text-foreground">{order.paymentProviderId}</span>
                    {order.paymentIntentRef ? (
                      <>
                        {" "}
                        · Ref: <span className="font-mono text-foreground">{order.paymentIntentRef}</span>
                      </>
                    ) : null}
                  </p>
                  {order.paymentLastMessage ? (
                    <p className="mt-1 font-sans text-xs text-amber-800">Ödeme notu: {order.paymentLastMessage}</p>
                  ) : null}
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
              <div className="mt-4 flex flex-wrap gap-4 font-sans text-sm text-muted">
                <label className="block">
                  Sipariş durumu
                  <select
                    value={order.status}
                    onChange={(e) =>
                      void updateOrder(order.id, { status: e.target.value as OrderStatus })
                    }
                    className="ml-2 rounded-[var(--radius-input)] border border-[var(--input-border)] bg-surface px-2 py-2 text-foreground"
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  Ödeme durumu
                  <select
                    value={
                      order.paymentStatus === "mock_paid"
                        ? "paid"
                        : (order.paymentStatus as PaymentSettlementStatus)
                    }
                    onChange={(e) =>
                      void updateOrder(order.id, {
                        paymentStatus: e.target.value as PaymentSettlementStatus,
                      })
                    }
                    className="ml-2 rounded-[var(--radius-input)] border border-[var(--input-border)] bg-surface px-2 py-2 text-foreground"
                  >
                    {settlementStatuses.map((ps) => (
                      <option key={ps} value={ps}>
                        {paymentStatusLabels[ps]}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
