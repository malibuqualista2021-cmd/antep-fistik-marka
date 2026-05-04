import { NextResponse } from "next/server";
import { coerceRetailProduct, readRetailCatalogFromDisk, writeRetailCatalogToDisk } from "@/lib/catalog/catalog-fs";
import { unauthorizedUnlessAdmin } from "@/lib/admin/assert-admin";
import { revalidateRetailCatalog } from "@/lib/catalog/revalidate-catalog";
import type { RetailProduct } from "@/lib/shop-products";

function duplicateConflict(products: RetailProduct[], candidate: RetailProduct): string | null {
  if (products.some((p) => p.slug === candidate.slug && p.id !== candidate.id)) {
    return "Bu URL slug başka bir üründe kullanılıyor.";
  }
  if (products.some((p) => p.detailSlug === candidate.detailSlug && p.id !== candidate.id)) {
    return "Bu detay slug başka bir üründe kullanılıyor.";
  }
  return null;
}

type Params = { params: Promise<{ id: string }> };

export async function PUT(req: Request, ctx: Params) {
  const denied = await unauthorizedUnlessAdmin();
  if (denied) return denied;

  const { id } = await ctx.params;
  const body = (await req.json().catch(() => null)) as unknown;
  if (!body || typeof body !== "object") {
    return NextResponse.json({ ok: false, message: "Geçersiz gövde." }, { status: 400 });
  }

  const draft = { ...(body as Record<string, unknown>), id };
  const product = coerceRetailProduct(draft);
  if (!product) {
    return NextResponse.json({ ok: false, message: "Ürün doğrulanamadı." }, { status: 400 });
  }

  const products = await readRetailCatalogFromDisk();
  const idx = products.findIndex((p) => p.id === id);
  if (idx === -1) {
    return NextResponse.json({ ok: false, message: "Ürün bulunamadı." }, { status: 404 });
  }

  const dup = duplicateConflict(products, product);
  if (dup) return NextResponse.json({ ok: false, message: dup }, { status: 409 });

  const next = [...products];
  next[idx] = product;
  try {
    await writeRetailCatalogToDisk(next);
  } catch (e) {
    console.error("[admin/catalog] PUT write failed", e);
    const msg = e instanceof Error ? e.message : "Yazma hatası";
    return NextResponse.json({ ok: false, message: `Katalog kaydedilemedi: ${msg}` }, { status: 500 });
  }
  revalidateRetailCatalog();

  return NextResponse.json({ ok: true, product });
}

export async function DELETE(_req: Request, ctx: Params) {
  const denied = await unauthorizedUnlessAdmin();
  if (denied) return denied;

  const { id } = await ctx.params;
  const products = await readRetailCatalogFromDisk();
  const next = products.filter((p) => p.id !== id);
  if (next.length === products.length) {
    return NextResponse.json({ ok: false, message: "Ürün bulunamadı." }, { status: 404 });
  }

  try {
    await writeRetailCatalogToDisk(next);
  } catch (e) {
    console.error("[admin/catalog] DELETE write failed", e);
    const msg = e instanceof Error ? e.message : "Yazma hatası";
    return NextResponse.json({ ok: false, message: `Katalog kaydedilemedi: ${msg}` }, { status: 500 });
  }
  revalidateRetailCatalog();

  return NextResponse.json({ ok: true });
}
