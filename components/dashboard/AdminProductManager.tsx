"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import type {
  RetailFacetProcess,
  RetailFacetUsage,
  RetailProduct,
  RetailProductVariant,
} from "@/lib/shop-products";
import { formatMoney } from "@/lib/shop-products";
import { Button } from "@/components/ui/Button";
import { inputFieldClass } from "@/lib/form-classes";

import type { RetailCategoryDefinition } from "@/lib/site-settings-types";

const FACET_PROCESS_OPTS: { id: RetailFacetProcess; label: string }[] = [
  { id: "kavrulmus", label: "Kavrulmuş" },
  { id: "cig", label: "Çiğ" },
  { id: "tuzlu", label: "Tuzlu" },
  { id: "tuzsuz", label: "Tuzsuz" },
];

const FACET_USAGE_OPTS: { id: RetailFacetUsage; label: string }[] = [
  { id: "atistirmalik", label: "Atıştırmalık" },
  { id: "baklavalik", label: "Baklavalık" },
  { id: "tatlilik", label: "Tatlılık" },
  { id: "pastalik", label: "Pastalık" },
  { id: "hediye", label: "Hediye" },
];

function blankProduct(defaultCategoryId: string): RetailProduct {
  return {
    id: "",
    slug: "yeni-urun-slug",
    detailSlug: "yeni-urun-detay-slug",
    name: "Yeni ürün adı",
    shortDescription: "Kısa vitrin açıklaması",
    description: "",
    ingredients: "",
    allergens: "",
    storage: "",
    imageSrc:
      "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Ürün görseli",
    price: 100,
    currency: "TRY",
    weight: "500 g",
    variants: [{ id: "500g", label: "500 g", weight: "500 g", price: 100 }],
    category: defaultCategoryId,
    stockStatus: "in_stock",
    shippingNote: "1–3 iş günü içinde kargo; şehre göre teslim süresi değişebilir.",
    isActive: true,
    tags: [],
  };
}

export function AdminProductManager({
  categories,
  cloudinaryConfigured,
}: {
  categories: RetailCategoryDefinition[];
  cloudinaryConfigured: boolean;
}) {
  const [products, setProducts] = useState<RetailProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [notice, setNotice] = useState("");
  const [rowBusyId, setRowBusyId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [draft, setDraft] = useState<RetailProduct>(blankProduct("ic"));
  const [tagsInput, setTagsInput] = useState("");
  const [uploadBusy, setUploadBusy] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/catalog", { credentials: "same-origin" });
      const data = (await res.json()) as { ok?: boolean; products?: RetailProduct[]; message?: string };
      if (!res.ok || !data.products) {
        setError(data.message || "Katalog yüklenemedi.");
        return;
      }
      setProducts(data.products);
    } catch {
      setError("Bağlantı hatası.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => {
    if (!notice) return;
    const t = window.setTimeout(() => setNotice(""), 4000);
    return () => window.clearTimeout(t);
  }, [notice]);

  const sortedCategoryDefs = useMemo(
    () => [...categories].sort((a, b) => a.sortOrder - b.sortOrder || a.label.localeCompare(b.label, "tr")),
    [categories],
  );

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return products;
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.slug.toLowerCase().includes(q) ||
        p.detailSlug.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q),
    );
  }, [products, searchQuery]);

  function openCreate() {
    const defCat = categories[0]?.id ?? "ic";
    const b = blankProduct(defCat);
    setDraft(b);
    setTagsInput((b.tags ?? []).join(", "));
    setCreating(true);
    setModalOpen(true);
  }

  function openEdit(p: RetailProduct) {
    setDraft({ ...p });
    setTagsInput((p.tags ?? []).join(", "));
    setCreating(false);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setError("");
  }

  function toggleFacetProcess(optId: RetailFacetProcess) {
    setDraft((d) => {
      const cur = new Set(d.facets?.process ?? []);
      if (cur.has(optId)) cur.delete(optId);
      else cur.add(optId);
      const process = [...cur];
      const usage = d.facets?.usage;
      const next: RetailProduct["facets"] = {};
      if (process.length) next.process = process;
      if (usage?.length) next.usage = usage;
      return { ...d, facets: Object.keys(next).length ? next : undefined };
    });
  }

  function toggleFacetUsage(optId: RetailFacetUsage) {
    setDraft((d) => {
      const cur = new Set(d.facets?.usage ?? []);
      if (cur.has(optId)) cur.delete(optId);
      else cur.add(optId);
      const usage = [...cur];
      const process = d.facets?.process;
      const next: RetailProduct["facets"] = {};
      if (process?.length) next.process = process;
      if (usage.length) next.usage = usage;
      return { ...d, facets: Object.keys(next).length ? next : undefined };
    });
  }

  async function saveDraft() {
    setError("");
    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    const payload = { ...draft, tags };

    try {
      if (creating) {
        const body = { ...payload, id: "" };
        const res = await fetch("/api/admin/catalog/products", {
          method: "POST",
          credentials: "same-origin",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(body),
        });
        const data = (await res.json()) as { ok?: boolean; message?: string };
        if (!res.ok || !data.ok) {
          setError(data.message || "Ürün oluşturulamadı.");
          return;
        }
      } else {
        const res = await fetch(`/api/admin/catalog/products/${encodeURIComponent(draft.id)}`, {
          method: "PUT",
          credentials: "same-origin",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = (await res.json()) as { ok?: boolean; message?: string };
        if (!res.ok || !data.ok) {
          setError(data.message || "Ürün güncellenemedi.");
          return;
        }
      }
      closeModal();
      setNotice(creating ? "Ürün oluşturuldu." : "Ürün kaydedildi.");
      await load();
    } catch {
      setError("Kayıt sırasında bağlantı hatası.");
    }
  }

  async function removeProduct(id: string) {
    if (!window.confirm("Bu ürünü silmek istediğinize emin misiniz?")) return;
    setError("");
    try {
      const res = await fetch(`/api/admin/catalog/products/${encodeURIComponent(id)}`, {
        method: "DELETE",
        credentials: "same-origin",
      });
      const data = (await res.json()) as { ok?: boolean; message?: string };
      if (!res.ok || !data.ok) {
        setError(data.message || "Silinemedi.");
        return;
      }
      await load();
      setNotice("Ürün silindi.");
    } catch {
      setError("Silme sırasında bağlantı hatası.");
    }
  }

  async function quickToggleActive(p: RetailProduct) {
    const payload = { ...p, isActive: !p.isActive };
    setRowBusyId(p.id);
    setError("");
    try {
      const res = await fetch(`/api/admin/catalog/products/${encodeURIComponent(p.id)}`, {
        method: "PUT",
        credentials: "same-origin",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { ok?: boolean; message?: string };
      if (!res.ok || !data.ok) {
        setError(data.message || "Durum güncellenemedi.");
        return;
      }
      setNotice(payload.isActive ? "Ürün yayına alındı." : "Ürün vitrinden kaldırıldı.");
      await load();
    } catch {
      setError("Durum güncellenirken bağlantı hatası.");
    } finally {
      setRowBusyId(null);
    }
  }

  async function quickUpdateStock(p: RetailProduct, stockStatus: RetailProduct["stockStatus"]) {
    if (p.stockStatus === stockStatus) return;
    setRowBusyId(p.id);
    setError("");
    try {
      const res = await fetch(`/api/admin/catalog/products/${encodeURIComponent(p.id)}`, {
        method: "PUT",
        credentials: "same-origin",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...p, stockStatus }),
      });
      const data = (await res.json()) as { ok?: boolean; message?: string };
      if (!res.ok || !data.ok) {
        setError(data.message || "Stok güncellenemedi.");
        return;
      }
      setNotice("Stok durumu güncellendi.");
      await load();
    } catch {
      setError("Stok güncellenirken bağlantı hatası.");
    } finally {
      setRowBusyId(null);
    }
  }

  async function uploadProductImages(files: FileList | File[] | null) {
    const list = files ? Array.from(files) : [];
    if (list.length === 0) return;
    setUploadBusy(true);
    setError("");
    try {
      const body = new FormData();
      body.set("slot", "catalog-product");
      list.forEach((f) => body.append("files", f));
      const res = await fetch("/api/admin/upload", { method: "POST", body, credentials: "same-origin" });
      const data = (await res.json()) as { ok?: boolean; urls?: string[]; url?: string; message?: string };
      const urls = data.urls?.length ? data.urls : data.url ? [data.url] : [];
      if (!res.ok || !data.ok || urls.length === 0) {
        setError(data.message || "Görsel yüklenemedi.");
        return;
      }
      const first = urls[0];
      const rest = urls.slice(1);
      setDraft((d) => {
        const merged = [...new Set([...(d.extraImages ?? []), ...rest])];
        return {
          ...d,
          imageSrc: first,
          extraImages: merged.length ? merged : undefined,
        };
      });
      setNotice(
        urls.length > 1
          ? `${urls.length} görsel yüklendi; ilki kapak, diğerleri galeride. Kaydet ile kataloğa yazın.`
          : "Görsel yüklendi. Kaydet ile kataloğa yazın.",
      );
    } catch {
      setError("Yükleme hatası.");
    } finally {
      setUploadBusy(false);
    }
  }

  function removeGalleryImage(src: string) {
    setDraft((d) => {
      const next = (d.extraImages ?? []).filter((x) => x !== src);
      return { ...d, extraImages: next.length ? next : undefined };
    });
  }

  function updateVariant(index: number, patch: Partial<RetailProductVariant>) {
    setDraft((d) => {
      const variants = [...(d.variants ?? [])];
      variants[index] = { ...variants[index], ...patch };
      return { ...d, variants };
    });
  }

  function addVariant() {
    setDraft((d) => ({
      ...d,
      variants: [...(d.variants ?? []), { id: `v-${Date.now()}`, label: "Yeni", weight: "500 g", price: d.price }],
    }));
  }

  function syncPrimaryVariantPrice() {
    const first = draft.variants?.[0];
    if (!first) {
      setNotice("Önce en az bir gramaj satırı ekleyin.");
      return;
    }
    setDraft((d) => ({ ...d, price: first.price, weight: first.weight }));
    setNotice("Ana fiyat ve gramaj, ilk seçenekle eşitlendi — Kaydet ile saklayın.");
  }

  function removeVariant(index: number) {
    setDraft((d) => ({
      ...d,
      variants: (d.variants ?? []).filter((_, i) => i !== index),
    }));
  }

  return (
    <section className="card-elevated rounded-[var(--radius-card)] p-5 md:p-7">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-serif text-2xl text-foreground">Ürün yönetimi</h2>
          <p className="mt-1 max-w-2xl font-sans text-sm text-muted">
            Fiyat, stok, gramaj seçenekleri ve açıklamalar sunucuda{" "}
            <code className="rounded bg-background px-1 py-0.5 text-xs">data/retail-catalog.json</code> dosyasına
            yazılır (yazılabilir disk gerekir). Görseller doğrudan yüklenebilir: Cloudinary tanımlıysa CDN’e, değilse{" "}
            <code className="rounded bg-background px-1 py-0.5 text-xs">public/uploads/admin/</code> altına kaydedilir.
          </p>
          {!cloudinaryConfigured ? (
            <p className="mt-3 rounded-[var(--radius-input)] border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-950">
              <strong>Cloudinary yok:</strong> yükleme klasörüne kaydedilir. Üretimde kalıcı disk veya Cloudinary önerilir; görselleri yine de URL ile değiştirebilirsiniz.
            </p>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" className="!min-h-[40px] !px-3 !py-2 !text-sm" onClick={() => void load()} disabled={loading}>
            Yenile
          </Button>
          <Button className="!min-h-[40px] !px-3 !py-2 !text-sm" onClick={openCreate}>
            Yeni ürün
          </Button>
        </div>
      </div>

      {notice ? (
        <p className="mt-4 rounded-[var(--radius-input)] border border-primary/25 bg-primary/[0.07] px-3 py-2 text-sm text-foreground" role="status">
          {notice}
        </p>
      ) : null}

      {error && !modalOpen ? <p className="mt-4 text-sm text-red-700">{error}</p> : null}

      {loading ? (
        <p className="mt-6 font-sans text-sm text-muted">Yükleniyor…</p>
      ) : (
        <div className="mt-5 space-y-3">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <label className="block max-w-md flex-1 font-sans text-sm text-muted">
              Ara (ad, slug, kod)
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Örn: kabuklu, retail-ic…"
                className={`${inputFieldClass} mt-1`}
              />
            </label>
            <p className="font-sans text-xs text-muted sm:text-right">
              {filteredProducts.length} / {products.length} ürün
            </p>
          </div>
          <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] border-separate border-spacing-y-2 font-sans text-sm">
            <thead className="text-left text-xs uppercase tracking-wide text-muted">
              <tr>
                <th className="px-2 py-2">Görsel</th>
                <th className="px-3 py-2">Ürün</th>
                <th className="px-3 py-2">Slug</th>
                <th className="px-3 py-2">Fiyat</th>
                <th className="px-3 py-2">Gramaj</th>
                <th className="px-3 py-2">Stok</th>
                <th className="px-3 py-2">Durum</th>
                <th className="px-3 py-2">İşlem</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className="bg-background ring-1 ring-[var(--line-soft)]">
                  <td className="rounded-l-[10px] px-2 py-2">
                    <Image
                      src={product.imageSrc}
                      alt=""
                      width={44}
                      height={44}
                      className="rounded-lg object-cover ring-1 ring-[var(--line-soft)]"
                    />
                  </td>
                  <td className="px-3 py-3 font-medium text-foreground">{product.name}</td>
                  <td className="px-3 py-3 text-muted">{product.slug}</td>
                  <td className="px-3 py-3 text-foreground">{formatMoney(product.price)}</td>
                  <td className="px-3 py-3 text-muted">{product.weight}</td>
                  <td className="px-3 py-3">
                    <select
                      value={product.stockStatus}
                      disabled={rowBusyId === product.id}
                      onChange={(e) =>
                        void quickUpdateStock(product, e.target.value as RetailProduct["stockStatus"])
                      }
                      className="max-w-[140px] rounded-[var(--radius-input)] border border-[var(--input-border)] bg-surface px-2 py-1.5 text-xs text-foreground"
                      aria-label={`${product.name} stok durumu`}
                    >
                      <option value="in_stock">Stokta</option>
                      <option value="limited">Sınırlı</option>
                      <option value="out_of_stock">Yok</option>
                    </select>
                  </td>
                  <td className="px-3 py-3">
                    <button
                      type="button"
                      disabled={rowBusyId === product.id}
                      className="font-semibold text-primary underline-offset-4 hover:underline disabled:opacity-50"
                      onClick={() => void quickToggleActive(product)}
                    >
                      {rowBusyId === product.id ? "…" : product.isActive ? "Aktif" : "Pasif"}
                    </button>
                  </td>
                  <td className="rounded-r-[10px] px-3 py-3">
                    <div className="flex flex-wrap gap-2">
                      <button type="button" className="font-semibold text-primary underline" onClick={() => openEdit(product)}>
                        Düzenle
                      </button>
                      <button type="button" className="font-semibold text-red-700 underline" onClick={() => void removeProduct(product.id)}>
                        Sil
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      )}

      {modalOpen ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 sm:items-center">
          <div
            className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[var(--radius-card)] bg-background p-5 shadow-xl md:p-8"
            role="dialog"
            aria-modal="true"
            aria-labelledby="admin-product-editor-title"
          >
            <div className="flex items-start justify-between gap-3">
              <h3 id="admin-product-editor-title" className="font-serif text-xl text-foreground">
                {creating ? "Yeni ürün" : "Ürün düzenle"}
              </h3>
              <button type="button" className="font-sans text-sm font-semibold text-muted hover:text-foreground" onClick={closeModal}>
                Kapat
              </button>
            </div>

            <p className="mt-3 rounded-[var(--radius-input)] bg-surface/80 px-3 py-2 text-xs leading-relaxed text-muted">
              <span className="font-semibold text-foreground">Başlık:</span> Ürün adı vitrin ve ürün sayfasında görünür.{" "}
              <span className="font-semibold text-foreground">Liste slug</span> mağaza bağlantılarıyla uyumlu kısa adres;{" "}
              <span className="font-semibold text-foreground">detay slug</span> tam ürün sayfasının URL&apos;sidir — değiştirirken
              eski bağlantılar kırılabilir.
            </p>

            {error ? <p className="mt-3 text-sm text-red-700">{error}</p> : null}

            <div className="mt-6 border-t border-[var(--line-soft)] pt-5">
              <h4 className="font-serif text-lg text-foreground">Temel bilgiler</h4>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <label className="block md:col-span-2">
                <span className="text-sm font-medium text-foreground">Ürün adı *</span>
                <input className={inputFieldClass} value={draft.name} onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))} />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-foreground">Liste slug * (URL)</span>
                <input className={inputFieldClass} value={draft.slug} onChange={(e) => setDraft((d) => ({ ...d, slug: e.target.value }))} />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-foreground">Detay slug *</span>
                <input
                  className={inputFieldClass}
                  value={draft.detailSlug}
                  onChange={(e) => setDraft((d) => ({ ...d, detailSlug: e.target.value }))}
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-foreground">Kategori *</span>
                <select
                  className={inputFieldClass}
                  value={draft.category}
                  onChange={(e) => setDraft((d) => ({ ...d, category: e.target.value }))}
                >
                  {sortedCategoryDefs.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.label}
                    </option>
                  ))}
                  {!sortedCategoryDefs.some((c) => c.id === draft.category) ? (
                    <option value={draft.category}>{draft.category} (site ayarında yok)</option>
                  ) : null}
                </select>
              </label>
              <label className="block">
                <span className="text-sm font-medium text-foreground">Stok durumu *</span>
                <select
                  className={inputFieldClass}
                  value={draft.stockStatus}
                  onChange={(e) => setDraft((d) => ({ ...d, stockStatus: e.target.value as RetailProduct["stockStatus"] }))}
                >
                  <option value="in_stock">Stokta</option>
                  <option value="limited">Sınırlı</option>
                  <option value="out_of_stock">Yok</option>
                </select>
              </label>
              <label className="block">
                <span className="text-sm font-medium text-foreground">Varsayılan fiyat (TRY) *</span>
                <input
                  type="number"
                  min={0}
                  className={inputFieldClass}
                  value={draft.price}
                  onChange={(e) => setDraft((d) => ({ ...d, price: Number(e.target.value) }))}
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-foreground">Varsayılan gramaj etiketi *</span>
                <input className={inputFieldClass} value={draft.weight} onChange={(e) => setDraft((d) => ({ ...d, weight: e.target.value }))} />
              </label>
              <label className="flex items-center gap-2 md:col-span-2">
                <input type="checkbox" checked={draft.isActive} onChange={(e) => setDraft((d) => ({ ...d, isActive: e.target.checked }))} />
                <span className="text-sm text-foreground">Ürün vitrinde aktif</span>
              </label>
              <label className="block md:col-span-2">
                <span className="text-sm font-medium text-foreground">Görsel URL *</span>
                <input className={inputFieldClass} value={draft.imageSrc} onChange={(e) => setDraft((d) => ({ ...d, imageSrc: e.target.value }))} />
              </label>
              <div className="md:col-span-2">
                <span className="text-sm font-medium text-foreground">Görsel yükle</span>
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  multiple
                  disabled={uploadBusy}
                  className="mt-1 w-full rounded-[var(--radius-input)] border border-[var(--input-border)] bg-background px-3 py-2 text-sm"
                  onChange={(e) => {
                    const fl = e.target.files;
                    if (fl?.length) void uploadProductImages(fl);
                    e.target.value = "";
                  }}
                />
                <p className="mt-1 text-xs text-muted">
                  Birden fazla seçebilirsiniz: sıradaki ilk dosya kapak (URL alanı), kalanlar ürün detayında küçük galeri olarak listelenir.
                  Kaydet&apos;i unutmayın.
                </p>
              </div>
              <label className="block md:col-span-2">
                <span className="text-sm font-medium text-foreground">Görsel alt metni *</span>
                <input className={inputFieldClass} value={draft.imageAlt} onChange={(e) => setDraft((d) => ({ ...d, imageAlt: e.target.value }))} />
              </label>
              {(draft.extraImages ?? []).length > 0 ? (
                <div className="md:col-span-2 rounded-[var(--radius-input)] bg-surface/40 p-4 ring-1 ring-[var(--line-soft)]">
                  <p className="text-sm font-medium text-foreground">Ek galeri görselleri</p>
                  <p className="mt-1 text-xs text-muted">Ürün detayında kapak görselinin altında seçilebilir küçük önizlemeler olarak görünür.</p>
                  <ul className="mt-3 space-y-2 font-mono text-[11px] text-muted">
                    {(draft.extraImages ?? []).map((src) => (
                      <li key={src} className="flex flex-wrap items-center gap-2">
                        <span className="min-w-0 flex-1 break-all text-foreground">{src}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          className="!min-h-[32px] shrink-0 !px-2 !py-1 !text-xs"
                          onClick={() => removeGalleryImage(src)}
                        >
                          Kaldır
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              <label className="block md:col-span-2">
                <span className="text-sm font-medium text-foreground">Kısa açıklama *</span>
                <textarea
                  className={`${inputFieldClass} min-h-[80px]`}
                  value={draft.shortDescription}
                  onChange={(e) => setDraft((d) => ({ ...d, shortDescription: e.target.value }))}
                />
              </label>
              <label className="block md:col-span-2">
                <span className="text-sm font-medium text-foreground">Uzun açıklama</span>
                <textarea
                  className={`${inputFieldClass} min-h-[120px]`}
                  value={draft.description ?? ""}
                  onChange={(e) => setDraft((d) => ({ ...d, description: e.target.value }))}
                />
              </label>
              <label className="block md:col-span-2">
                <span className="text-sm font-medium text-foreground">İçindekiler</span>
                <textarea
                  className={`${inputFieldClass} min-h-[72px]`}
                  value={draft.ingredients ?? ""}
                  onChange={(e) => setDraft((d) => ({ ...d, ingredients: e.target.value }))}
                />
              </label>
              <label className="block md:col-span-2">
                <span className="text-sm font-medium text-foreground">Alerjen uyarısı</span>
                <textarea
                  className={`${inputFieldClass} min-h-[72px]`}
                  value={draft.allergens ?? ""}
                  onChange={(e) => setDraft((d) => ({ ...d, allergens: e.target.value }))}
                />
              </label>
              <label className="block md:col-span-2">
                <span className="text-sm font-medium text-foreground">Saklama önerisi</span>
                <textarea
                  className={`${inputFieldClass} min-h-[72px]`}
                  value={draft.storage ?? ""}
                  onChange={(e) => setDraft((d) => ({ ...d, storage: e.target.value }))}
                />
              </label>
              <label className="block md:col-span-2">
                <span className="text-sm font-medium text-foreground">Kargo notu *</span>
                <textarea
                  className={`${inputFieldClass} min-h-[72px]`}
                  value={draft.shippingNote}
                  onChange={(e) => setDraft((d) => ({ ...d, shippingNote: e.target.value }))}
                />
              </label>
              <label className="block md:col-span-2">
                <span className="text-sm font-medium text-foreground">Etiketler (virgülle)</span>
                <input className={inputFieldClass} value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} />
              </label>
              <div className="md:col-span-2 rounded-[var(--radius-input)] bg-surface/40 p-4 ring-1 ring-[var(--line-soft)]">
                <p className="text-sm font-medium text-foreground">Mağaza filtreleri</p>
                <p className="mt-1 text-xs text-muted">Ürünler sayfasındaki kullanım ve işlem filtreleriyle eşleşir.</p>
                <div className="mt-3">
                  <p className="text-xs font-semibold text-muted">İşlem / tip</p>
                  <div className="mt-2 flex flex-wrap gap-3">
                    {FACET_PROCESS_OPTS.map((opt) => (
                      <label key={opt.id} className="flex cursor-pointer items-center gap-2 font-sans text-sm text-foreground">
                        <input
                          type="checkbox"
                          checked={(draft.facets?.process ?? []).includes(opt.id)}
                          onChange={() => toggleFacetProcess(opt.id)}
                          className="h-4 w-4 accent-primary"
                        />
                        {opt.label}
                      </label>
                    ))}
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-xs font-semibold text-muted">Kullanım</p>
                  <div className="mt-2 flex flex-wrap gap-3">
                    {FACET_USAGE_OPTS.map((opt) => (
                      <label key={opt.id} className="flex cursor-pointer items-center gap-2 font-sans text-sm text-foreground">
                        <input
                          type="checkbox"
                          checked={(draft.facets?.usage ?? []).includes(opt.id)}
                          onChange={() => toggleFacetUsage(opt.id)}
                          className="h-4 w-4 accent-primary"
                        />
                        {opt.label}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 border-t border-[var(--line-soft)] pt-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h4 className="font-serif text-lg text-foreground">Gramaj / fiyat seçenekleri</h4>
                <div className="flex flex-wrap gap-2">
                  <Button type="button" variant="ghost" className="!min-h-[36px] !text-sm" onClick={syncPrimaryVariantPrice}>
                    Ana fiyatı 1. seçenekle eşitle
                  </Button>
                  <Button type="button" variant="secondary" className="!min-h-[36px] !text-sm" onClick={addVariant}>
                    Satır ekle
                  </Button>
                </div>
              </div>
              <ul className="mt-3 space-y-3">
                {(draft.variants ?? []).map((v, i) => (
                  <li key={v.id} className="grid gap-2 rounded-lg bg-surface/40 p-3 ring-1 ring-[var(--line-soft)] md:grid-cols-[1fr_1fr_1fr_auto_auto] md:items-end">
                    <label className="block text-xs">
                      Kimlik
                      <input className={`${inputFieldClass} mt-1`} value={v.id} onChange={(e) => updateVariant(i, { id: e.target.value })} />
                    </label>
                    <label className="block text-xs">
                      Etiket
                      <input className={`${inputFieldClass} mt-1`} value={v.label} onChange={(e) => updateVariant(i, { label: e.target.value })} />
                    </label>
                    <label className="block text-xs">
                      Gramaj
                      <input className={`${inputFieldClass} mt-1`} value={v.weight} onChange={(e) => updateVariant(i, { weight: e.target.value })} />
                    </label>
                    <label className="block text-xs">
                      Fiyat
                      <input
                        type="number"
                        className={`${inputFieldClass} mt-1`}
                        value={v.price}
                        onChange={(e) => updateVariant(i, { price: Number(e.target.value) })}
                      />
                    </label>
                    <button type="button" className="font-sans text-sm text-red-700 underline md:pb-2" onClick={() => removeVariant(i)}>
                      Sil
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button type="button" onClick={() => void saveDraft()}>
                Kaydet
              </Button>
              <Button type="button" variant="secondary" onClick={closeModal}>
                İptal
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
