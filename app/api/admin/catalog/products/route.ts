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

export async function POST(req: Request) {
  const denied = await unauthorizedUnlessAdmin();
  if (denied) return denied;

  const body = (await req.json().catch(() => null)) as unknown;
  if (!body || typeof body !== "object") {
    return NextResponse.json({ ok: false, message: "Geçersiz gövde." }, { status: 400 });
  }

  const draft = { ...(body as Record<string, unknown>) };
  if (typeof draft.id !== "string" || draft.id.trim() === "") {
    draft.id = `retail-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
  }

  const product = coerceRetailProduct(draft);
  if (!product) {
    return NextResponse.json({ ok: false, message: "Ürün doğrulanamadı. Zorunlu alanları kontrol edin." }, { status: 400 });
  }

  const products = await readRetailCatalogFromDisk();
  if (products.some((p) => p.id === product.id)) {
    return NextResponse.json({ ok: false, message: "Bu kimlik zaten var." }, { status: 409 });
  }

  const dup = duplicateConflict(products, product);
  if (dup) return NextResponse.json({ ok: false, message: dup }, { status: 409 });

  try {
    await writeRetailCatalogToDisk([...products, product]);
  } catch (e) {
    console.error("[admin/catalog] POST write failed", e);
    const msg = e instanceof Error ? e.message : "Yazma hatası";
    return NextResponse.json({ ok: false, message: `Katalog kaydedilemedi: ${msg}` }, { status: 500 });
  }
  revalidateRetailCatalog();

  return NextResponse.json({ ok: true, product });
}
