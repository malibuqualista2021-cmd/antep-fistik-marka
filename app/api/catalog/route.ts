import { NextResponse } from "next/server";
import { getRetailProducts } from "@/lib/catalog/get-retail-products";

export const dynamic = "force-dynamic";

export async function GET() {
  const products = await getRetailProducts();
  return NextResponse.json({ products });
}
