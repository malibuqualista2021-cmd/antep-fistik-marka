"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  retailProducts,
  type RetailProduct,
  type RetailFacetProcess,
  type RetailFacetUsage,
  productMatchesGramajFilter,
} from "@/lib/shop-products";
import { RetailProductCard } from "@/components/shop/RetailProductCard";

const tabs: { id: "all" | RetailProduct["category"]; label: string }[] = [
  { id: "all", label: "Tüm ürünler" },
  { id: "kabuklu", label: "Kabuklu" },
  { id: "ic", label: "İç fıstık" },
  { id: "boz", label: "Boz iç" },
  { id: "paket", label: "Hediye / Paket" },
];

type Fiyat = "" | "0-500" | "500-1000" | "1000+";

function minProductPrice(product: RetailProduct): number {
  const vs = product.variants?.map((v) => v.price) ?? [];
  return Math.min(product.price, ...vs);
}

function matchesFiyat(price: number, f: Fiyat): boolean {
  if (!f) return true;
  if (f === "0-500") return price < 500;
  if (f === "500-1000") return price >= 500 && price < 1000;
  return price >= 1000;
}

function productMatches(
  product: RetailProduct,
  opts: {
    category: (typeof tabs)[number]["id"];
    kullanim: RetailFacetUsage | null;
    islem: RetailFacetProcess | null;
    gramaj: string | null;
    fiyat: Fiyat;
    stokta: boolean;
  },
): boolean {
  if (!product.isActive) return false;
  if (opts.category !== "all" && product.category !== opts.category) return false;
  if (opts.kullanim && !product.facets?.usage?.includes(opts.kullanim)) return false;
  if (opts.islem && !product.facets?.process?.includes(opts.islem)) return false;
  if (!productMatchesGramajFilter(product, opts.gramaj)) return false;
  if (!matchesFiyat(minProductPrice(product), opts.fiyat)) return false;
  if (opts.stokta && product.stockStatus === "out_of_stock") return false;
  return true;
}

export function RetailStore() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [category, setCategory] = useState<(typeof tabs)[number]["id"]>("all");
  const [sort, setSort] = useState("popular");
  const [kullanim, setKullanim] = useState<RetailFacetUsage | null>(null);
  const [islem, setIslem] = useState<RetailFacetProcess | null>(null);
  const [gramaj, setGramaj] = useState<string | null>(null);
  const [fiyat, setFiyat] = useState<Fiyat>("");
  const [stokta, setStokta] = useState(false);

  useEffect(() => {
    const kat = searchParams.get("kategori");
    if (kat === "kabuklu" || kat === "ic" || kat === "boz" || kat === "paket") setCategory(kat);
    else if (!kat) setCategory("all");

    const ku = searchParams.get("kullanim") as RetailFacetUsage | null;
    if (ku && ["atistirmalik", "baklavalik", "tatlilik", "pastalik", "hediye"].includes(ku)) setKullanim(ku);
    else setKullanim(null);

    const is = searchParams.get("islem") as RetailFacetProcess | null;
    if (is && ["kavrulmus", "cig", "tuzlu", "tuzsuz"].includes(is)) setIslem(is);
    else setIslem(null);

    const g = searchParams.get("gramaj");
    setGramaj(g && ["250", "500", "1000"].includes(g) ? g : null);
  }, [searchParams]);

  const products = useMemo(() => {
    const filtered = retailProducts.filter((product) =>
      productMatches(product, { category, kullanim, islem, gramaj, fiyat, stokta }),
    );
    return [...filtered].sort((a, b) => {
      if (sort === "price-asc") return minProductPrice(a) - minProductPrice(b);
      if (sort === "price-desc") return minProductPrice(b) - minProductPrice(a);
      if (sort === "stock") return a.stockStatus.localeCompare(b.stockStatus);
      return 0;
    });
  }, [category, sort, kullanim, islem, gramaj, fiyat, stokta]);

  function applyNav(next: Record<string, string | undefined>) {
    const p = new URLSearchParams(searchParams.toString());
    Object.entries(next).forEach(([k, v]) => {
      if (v === undefined || v === "") p.delete(k);
      else p.set(k, v);
    });
    router.replace(`/urunler?${p.toString()}`, { scroll: false });
  }

  return (
    <div className="rounded-[var(--radius-xl)] bg-[var(--paper)]/80 p-3 ring-1 ring-[var(--border-subtle)] md:p-5">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        {/* Sol: dikey kategori sekmeleri */}
        <nav
          className="w-full shrink-0 lg:sticky lg:top-[5.5rem] lg:w-[200px] lg:self-start xl:w-[220px]"
          aria-label="Ürün kategorileri"
        >
          <p className="mb-2 font-sans text-xs font-bold uppercase tracking-wide text-[var(--walnut)]">Kategoriler</p>
          <div
            className="flex flex-col gap-1 rounded-[var(--radius-card)] bg-[var(--cream)] p-2 ring-1 ring-[var(--border-subtle)] lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto"
            role="tablist"
            aria-orientation="vertical"
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={category === tab.id}
                onClick={() => {
                  setCategory(tab.id);
                  applyNav({
                    kategori: tab.id === "all" ? undefined : tab.id,
                  });
                }}
                className={`min-h-[48px] w-full rounded-[10px] px-4 py-3 text-left font-sans text-sm font-semibold transition ${
                  category === tab.id
                    ? "bg-primary text-[var(--cream)] shadow-sm"
                    : "text-foreground hover:bg-[var(--paper)]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </nav>

        {/* Sağ: sıralama + filtreler + ürünler */}
        <div className="min-w-0 flex-1">
          <div className="mb-4 flex flex-col gap-3 border-b border-black/10 pb-4 sm:flex-row sm:items-center sm:justify-end">
            <label className="flex w-full shrink-0 items-center justify-end gap-2 font-sans text-sm text-muted sm:w-auto">
              Sırala
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="min-h-[42px] max-w-full rounded-full border border-black/10 bg-background px-3 text-foreground"
              >
                <option value="popular">Çok satanlar</option>
                <option value="price-asc">Fiyata göre artan</option>
                <option value="price-desc">Fiyata göre azalan</option>
                <option value="stock">Stok durumu</option>
              </select>
            </label>
          </div>

          <div className="grid gap-5 lg:grid-cols-[240px_1fr]">
            <aside className="hidden rounded-[var(--radius-card)] bg-[var(--cream)] p-4 ring-1 ring-[var(--border-subtle)] lg:block">
          <p className="font-sans text-sm font-semibold text-[var(--walnut)]">Filtreler</p>

          <fieldset className="mt-4 space-y-2 font-sans text-sm">
            <legend className="font-semibold text-foreground">Gramaj</legend>
            {[
              { id: "", label: "Tümü" },
              { id: "250", label: "250 g" },
              { id: "500", label: "500 g" },
              { id: "1000", label: "1 kg" },
            ].map((g) => (
              <label key={g.id || "all"} className="flex cursor-pointer items-center gap-2">
                <input
                  type="radio"
                  name="gramaj"
                  checked={g.id === "" ? gramaj === null : gramaj === g.id}
                  onChange={() => {
                    const next = g.id === "" ? null : g.id;
                    setGramaj(next);
                    applyNav({ gramaj: next ?? undefined });
                  }}
                />
                {g.label}
              </label>
            ))}
          </fieldset>

          <fieldset className="mt-5 space-y-2 font-sans text-sm">
            <legend className="font-semibold text-foreground">İşlem türü</legend>
            {[
              { id: null as RetailFacetProcess | null, label: "Tümü" },
              { id: "kavrulmus" as const, label: "Kavrulmuş" },
              { id: "cig" as const, label: "Çiğ" },
              { id: "tuzlu" as const, label: "Tuzlu" },
              { id: "tuzsuz" as const, label: "Tuzsuz" },
            ].map((g) => (
              <label key={g.label} className="flex cursor-pointer items-center gap-2">
                <input
                  type="radio"
                  name="islem"
                  checked={islem === g.id}
                  onChange={() => {
                    setIslem(g.id);
                    applyNav({ islem: g.id ?? undefined });
                  }}
                />
                {g.label}
              </label>
            ))}
          </fieldset>

          <fieldset className="mt-5 space-y-2 font-sans text-sm">
            <legend className="font-semibold text-foreground">Kullanım</legend>
            {[
              { id: null as RetailFacetUsage | null, label: "Tümü" },
              { id: "atistirmalik" as const, label: "Atıştırmalık" },
              { id: "baklavalik" as const, label: "Baklavalık" },
              { id: "tatlilik" as const, label: "Tatlılık" },
              { id: "pastalik" as const, label: "Pastalık" },
              { id: "hediye" as const, label: "Hediyelik" },
            ].map((g) => (
              <label key={g.label} className="flex cursor-pointer items-center gap-2">
                <input
                  type="radio"
                  name="kullanim"
                  checked={kullanim === g.id}
                  onChange={() => {
                    setKullanim(g.id);
                    applyNav({ kullanim: g.id ?? undefined });
                  }}
                />
                {g.label}
              </label>
            ))}
          </fieldset>

          <fieldset className="mt-5 space-y-2 font-sans text-sm">
            <legend className="font-semibold text-foreground">Fiyat</legend>
            {(
              [
                { id: "" as Fiyat, label: "Tümü" },
                { id: "0-500", label: "0 – 500 TL" },
                { id: "500-1000", label: "500 – 1.000 TL" },
                { id: "1000+", label: "1.000 TL üzeri" },
              ] as const
            ).map((g) => (
              <label key={g.label} className="flex cursor-pointer items-center gap-2">
                <input
                  type="radio"
                  name="fiyat"
                  checked={fiyat === g.id}
                  onChange={() => setFiyat(g.id)}
                />
                {g.label}
              </label>
            ))}
          </fieldset>

          <label className="mt-5 flex cursor-pointer items-center gap-2 font-sans text-sm">
            <input type="checkbox" checked={stokta} onChange={(e) => setStokta(e.target.checked)} />
            Yalnızca stokta olanlar
          </label>
            </aside>

            <div>
          <div className="mb-4 rounded-[12px] bg-[var(--cream)] p-3 font-sans text-sm text-muted ring-1 ring-black/[0.05] lg:hidden">
            <p className="font-semibold text-foreground">Filtreler</p>
            <p className="mt-1 text-xs">
              Büyük ekranda solda kategori sekmeleri, ürünlerin solunda ise gramaj ve diğer filtreler yer alır.
            </p>
          </div>
          <div className="mb-4 flex items-center justify-between font-sans text-sm text-muted">
            <span>{products.length} ürün</span>
            <span className="hidden sm:inline">Gramajını seçin, fiyatı görün, güvenle sipariş verin.</span>
          </div>
          {products.length === 0 ? (
            <p className="rounded-[var(--radius-card)] bg-surface/60 p-6 text-center font-sans text-sm text-muted ring-1 ring-black/5">
              Bu filtrelerle eşleşen ürün bulunamadı. Filtreleri sıfırlayıp tekrar deneyin.
            </p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {products.map((product) => (
                <RetailProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
