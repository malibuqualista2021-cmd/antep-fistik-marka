import { NextResponse } from "next/server";
import { readRetailCatalogFromDisk } from "@/lib/catalog/catalog-fs";
import { unauthorizedUnlessAdmin } from "@/lib/admin/assert-admin";

export async function GET() {
  const denied = await unauthorizedUnlessAdmin();
  if (denied) return denied;
  const products = await readRetailCatalogFromDisk();
  return NextResponse.json({ ok: true, products });
}
