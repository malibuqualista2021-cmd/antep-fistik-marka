"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  type RetailProduct,
  type RetailFacetProcess,
  type RetailFacetUsage,
  productMatchesGramajFilter,
} from "@/lib/shop-products";
import type { RetailCategoryDefinition } from "@/lib/site-settings-types";
import { RetailProductCard } from "@/components/shop/RetailProductCard";
import { favoritesSnapshotKey, subscribeFavorites } from "@/lib/favorites-store";

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

function matchesSearch(product: RetailProduct, q: string): boolean {
  if (!q) return true;
  const n = product.name.toLowerCase();
  const d = product.shortDescription.toLowerCase();
  const tags = product.tags?.join(" ").toLowerCase() ?? "";
  return n.includes(q) || d.includes(q) || tags.includes(q);
}

function productMatches(
  product: RetailProduct,
  opts: {
    category: string;
    kullanim: RetailFacetUsage | null;
    islem: RetailFacetProcess | null;
    gramaj: string | null;
    fiyat: Fiyat;
    stokta: boolean;
    q: string;
    favoriteIds: Set<string>;
    favoritesOnly: boolean;
  },
): boolean {
  if (!product.isActive) return false;
  if (opts.favoritesOnly && !opts.favoriteIds.has(product.id)) return false;
  if (!matchesSearch(product, opts.q)) return false;
  if (opts.category !== "all" && product.category !== opts.category) return false;
  if (opts.kullanim && !product.facets?.usage?.includes(opts.kullanim)) return false;
  if (opts.islem && !product.facets?.process?.includes(opts.islem)) return false;
  if (!productMatchesGramajFilter(product, opts.gramaj)) return false;
  if (!matchesFiyat(minProductPrice(product), opts.fiyat)) return false;
  if (opts.stokta && product.stockStatus === "out_of_stock") return false;
  return true;
}

function FilterFieldsets({
  gramaj,
  setGramaj,
  islem,
  setIslem,
  kullanim,
  setKullanim,
  fiyat,
  setFiyat,
  stokta,
  setStokta,
  applyNav,
}: {
  gramaj: string | null;
  setGramaj: (v: string | null) => void;
  islem: RetailFacetProcess | null;
  setIslem: (v: RetailFacetProcess | null) => void;
  kullanim: RetailFacetUsage | null;
  setKullanim: (v: RetailFacetUsage | null) => void;
  fiyat: Fiyat;
  setFiyat: (v: Fiyat) => void;
  stokta: boolean;
  setStokta: (v: boolean) => void;
  applyNav: (next: Record<string, string | undefined>) => void;
}) {
  return (
    <>
      <fieldset className="space-y-2 font-sans text-sm">
        <legend className="font-bold text-foreground">Gramaj</legend>
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
        <legend className="font-bold text-foreground">İşlem türü</legend>
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
        <legend className="font-bold text-foreground">Kullanım</legend>
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
        <legend className="font-bold text-foreground">Fiyat</legend>
        {(
          [
            { id: "" as Fiyat, label: "Tümü" },
            { id: "0-500", label: "0 – 500 TL" },
            { id: "500-1000", label: "500 – 1.000 TL" },
            { id: "1000+", label: "1.000 TL üzeri" },
          ] as const
        ).map((g) => (
          <label key={g.label} className="flex cursor-pointer items-center gap-2">
            <input type="radio" name="fiyat" checked={fiyat === g.id} onChange={() => setFiyat(g.id)} />
            {g.label}
          </label>
        ))}
      </fieldset>

      <label className="mt-5 flex cursor-pointer items-center gap-2 font-sans text-sm">
        <input type="checkbox" checked={stokta} onChange={(e) => setStokta(e.target.checked)} />
        Yalnızca stokta olanlar
      </label>
    </>
  );
}

function CategoryBlock({
  tabDefs,
  category,
  setCategory,
  applyNav,
}: {
  tabDefs: { id: string; label: string }[];
  category: string;
  setCategory: (id: string) => void;
  applyNav: (next: Record<string, string | undefined>) => void;
}) {
  return (
    <div>
      <p className="mb-2 font-sans text-xs font-bold uppercase tracking-wide text-muted">Kategori</p>
      <div className="flex flex-col gap-1" role="tablist">
        {tabDefs.map((tab) => (
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
            className={`min-h-[44px] w-full rounded-lg border px-3 py-2.5 text-left font-sans text-sm font-semibold transition ${
              category === tab.id
                ? "border-primary bg-[var(--color-green-soft)] text-primary"
                : "border-transparent bg-[var(--color-surface)] text-foreground hover:bg-[var(--color-bg)]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function RetailStore({
  catalog,
  categories,
}: {
  catalog: RetailProduct[];
  categories: RetailCategoryDefinition[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tabDefs = useMemo(() => {
    const sorted = [...categories].sort((a, b) => a.sortOrder - b.sortOrder || a.label.localeCompare(b.label, "tr"));
    return [{ id: "all", label: "Tüm ürünler" }, ...sorted.map((c) => ({ id: c.id, label: c.label }))];
  }, [categories]);

  const [category, setCategory] = useState<string>("all");
  const [sort, setSort] = useState("popular");
  const [kullanim, setKullanim] = useState<RetailFacetUsage | null>(null);
  const [islem, setIslem] = useState<RetailFacetProcess | null>(null);
  const [gramaj, setGramaj] = useState<string | null>(null);
  const [fiyat, setFiyat] = useState<Fiyat>("");
  const [stokta, setStokta] = useState(false);

  const favSnap = useSyncExternalStore(subscribeFavorites, favoritesSnapshotKey, () => "");
  const favoriteIds = useMemo(() => new Set(favSnap.split("|").filter(Boolean)), [favSnap]);

  const qRaw = searchParams.get("q")?.trim().toLowerCase() ?? "";
  const favoritesOnly = searchParams.get("favoriler") === "1";

  useEffect(() => {
    const kat = searchParams.get("kategori");
    const validIds = new Set(categories.map((c) => c.id));
    if (kat && validIds.has(kat)) setCategory(kat);
    else if (!kat) setCategory("all");

    const ku = searchParams.get("kullanim") as RetailFacetUsage | null;
    if (ku && ["atistirmalik", "baklavalik", "tatlilik", "pastalik", "hediye"].includes(ku)) setKullanim(ku);
    else setKullanim(null);

    const is = searchParams.get("islem") as RetailFacetProcess | null;
    if (is && ["kavrulmus", "cig", "tuzlu", "tuzsuz"].includes(is)) setIslem(is);
    else setIslem(null);

    const g = searchParams.get("gramaj");
    setGramaj(g && ["250", "500", "1000"].includes(g) ? g : null);
  }, [searchParams, categories]);

  function applyNav(next: Record<string, string | undefined>) {
    const p = new URLSearchParams(searchParams.toString());
    Object.entries(next).forEach(([k, v]) => {
      if (v === undefined || v === "") p.delete(k);
      else p.set(k, v);
    });
    router.replace(`/urunler?${p.toString()}`, { scroll: false });
  }

  const products = useMemo(() => {
    const filtered = catalog.filter((product) =>
      productMatches(product, {
        category,
        kullanim,
        islem,
        gramaj,
        fiyat,
        stokta,
        q: qRaw,
        favoriteIds,
        favoritesOnly,
      }),
    );
    return [...filtered].sort((a, b) => {
      if (sort === "price-asc") return minProductPrice(a) - minProductPrice(b);
      if (sort === "price-desc") return minProductPrice(b) - minProductPrice(a);
      if (sort === "stock") return a.stockStatus.localeCompare(b.stockStatus);
      return 0;
    });
  }, [catalog, category, sort, kullanim, islem, gramaj, fiyat, stokta, qRaw, favoriteIds, favoritesOnly]);

  const filterNodes = (
    <FilterFieldsets
      gramaj={gramaj}
      setGramaj={setGramaj}
      islem={islem}
      setIslem={setIslem}
      kullanim={kullanim}
      setKullanim={setKullanim}
      fiyat={fiyat}
      setFiyat={setFiyat}
      stokta={stokta}
      setStokta={setStokta}
      applyNav={applyNav}
    />
  );

  return (
    <div className="rounded-xl bg-[var(--color-surface)] p-3 shadow-[var(--shadow-soft)] ring-1 ring-[var(--color-border)] md:p-5">
      <div className="mb-4 rounded-lg border border-[var(--line-soft)] bg-[var(--color-bg)] px-3 py-2 font-sans text-xs text-muted md:text-sm">
        <span className="font-semibold text-foreground">Kargo 1–3 iş günü · Güvenli ödeme · WhatsApp destek · Taze paketleme</span>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        {/* Mobil: filtreleri açılır panel */}
        <details className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-3 lg:hidden">
          <summary className="cursor-pointer font-sans text-base font-bold text-foreground">Kategori ve filtreler</summary>
          <div className="mt-4 space-y-6 border-t border-[var(--line-soft)] pt-4">
            <CategoryBlock tabDefs={tabDefs} category={category} setCategory={setCategory} applyNav={applyNav} />
            {filterNodes}
          </div>
        </details>

        {/* Masaüstü: sol filtre paneli */}
        <aside
          className="hidden w-full shrink-0 lg:block lg:sticky lg:top-24 lg:w-[280px] lg:self-start"
          aria-label="Filtreler"
        >
          <div className="space-y-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4">
            <CategoryBlock tabDefs={tabDefs} category={category} setCategory={setCategory} applyNav={applyNav} />
            <div className="border-t border-[var(--line-soft)] pt-4">
              <p className="mb-3 font-sans text-xs font-bold uppercase tracking-wide text-muted">Detaylı filtre</p>
              {filterNodes}
            </div>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-3 border-b border-[var(--line-medium)] pb-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-sans text-sm font-semibold text-foreground">
              {products.length} ürün listeleniyor
              {qRaw ? (
                <span className="text-muted">
                  {" "}
                  · “{qRaw}” araması
                </span>
              ) : null}
              {favoritesOnly ? <span className="text-primary"> · Favoriler</span> : null}
            </p>
            <label className="flex w-full items-center gap-2 font-sans text-sm text-muted sm:w-auto sm:justify-end">
              Sırala
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="min-h-[44px] max-w-full rounded-lg border border-[var(--input-border)] bg-[var(--color-surface)] px-3 font-semibold text-foreground"
              >
                <option value="popular">Çok satanlar</option>
                <option value="price-asc">Fiyat artan</option>
                <option value="price-desc">Fiyat azalan</option>
                <option value="stock">Stok durumu</option>
              </select>
            </label>
          </div>

          {products.length === 0 ? (
            <p className="mt-8 rounded-xl bg-[var(--color-bg)] p-8 text-center font-sans text-sm text-muted ring-1 ring-[var(--line-soft)]">
              {favoritesOnly && favoriteIds.size === 0
                ? "Henüz favori ürün eklemediniz. Ürün kartındaki kalp ikonunu kullanın."
                : "Bu kriterlerle ürün bulunamadı. Filtreleri genişletip tekrar deneyin."}
            </p>
          ) : (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {products.map((product) => (
                <RetailProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
