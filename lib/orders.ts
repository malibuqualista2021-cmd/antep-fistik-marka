import type { CartItem } from "@/components/shop/CartProvider";

export type OrderStatus = "new" | "confirmed" | "preparing" | "shipped" | "cancelled";

export type CustomerInfo = {
  fullName: string;
  phone: string;
  email: string;
  city: string;
  district: string;
  address: string;
  note?: string;
};

export type OrderRecord = {
  id: string;
  createdAt: string;
  customer: CustomerInfo;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  paymentStatus: "mock_paid";
};

export function createOrderId() {
  return `KA-${Date.now().toString(36).toUpperCase()}`;
}
