import type { OrderRecord, OrderStatus } from "@/lib/orders";
import type { OrderPaymentStatus } from "@/lib/payment/types";
import { readRuntimeJsonValue, writeRuntimeJsonValue } from "@/lib/server/runtime-json-storage";

async function readOrdersList(): Promise<OrderRecord[]> {
  const raw = await readRuntimeJsonValue("orders");
  if (!Array.isArray(raw)) return [];
  return raw.filter(Boolean) as OrderRecord[];
}

async function writeOrdersList(list: OrderRecord[]): Promise<void> {
  await writeRuntimeJsonValue("orders", list);
}

export async function appendPersistedOrder(order: OrderRecord): Promise<void> {
  const list = await readOrdersList();
  list.unshift(order);
  await writeOrdersList(list);
}

export async function readPersistedOrders(): Promise<OrderRecord[]> {
  return readOrdersList();
}

export async function updatePersistedOrderPatch(
  orderId: string,
  patch: { status?: OrderStatus; paymentStatus?: OrderPaymentStatus },
): Promise<boolean> {
  const list = await readOrdersList();
  const idx = list.findIndex((o) => o.id === orderId);
  if (idx === -1) return false;
  list[idx] = { ...list[idx], ...patch };
  await writeOrdersList(list);
  return true;
}
