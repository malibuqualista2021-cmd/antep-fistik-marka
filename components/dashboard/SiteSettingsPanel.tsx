"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import type { SiteSettingsFileV1 } from "@/lib/site-settings-types";
import { Button } from "@/components/ui/Button";
import { inputFieldClass } from "@/lib/form-classes";
import { mergeContentMessages, diffContentMessagesFromDefaults, contentMessageDefaultsForAdmin } from "@/lib/site-content-messages";

const MEDIA_FIELDS: { id: string; label: string }[] = [
  { id: "hero-main", label: "Hero ana görsel" },
  { id: "hero-packaging", label: "Hero paket" },
  { id: "hero-logistics", label: "Hero lojistik" },
  { id: "trust-depot", label: "Güven — depo" },
  { id: "trust-packaging", label: "Güven — paketleme" },
  { id: "trust-product", label: "Güven — ürün" },
  { id: "trust-quality", label: "Güven — kalite" },
];

export function SiteSettingsPanel() {
  const router = useRouter();
  const [model, setModel] = useState<SiteSettingsFileV1 | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/site-settings", { credentials: "same-origin" });
      const data = (await res.json()) as {
        ok?: boolean;
        file?: SiteSettingsFileV1 | null;
        defaults?: SiteSettingsFileV1;
      };
      if (!res.ok || !data.defaults) {
        setError("Ayarlar yüklenemedi.");
        return;
      }
      const base = structuredClone(data.defaults);
      const merged: SiteSettingsFileV1 = data.file ? deepMerge(base, data.file) : base;
      merged.contentMessages = mergeContentMessages(merged.contentMessages);
      setModel(merged);
    } catch {
      setError("Bağlantı hatası.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function save() {
    if (!model) return;
    setSaving(true);
    setError("");
    setNotice("");
    try {
      const mergedMsgs = model.contentMessages ?? mergeContentMessages();
      const diff = diffContentMessagesFromDefaults(mergedMsgs);
      const { contentMessages: _drop, ...rest } = model;
      const payload: SiteSettingsFileV1 =
        diff !== undefined ? { ...rest, contentMessages: diff } : rest;

      const res = await fetch("/api/admin/site-settings", {
        method: "PUT",
        credentials: "same-origin",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { ok?: boolean; message?: string };
      if (!res.ok || !data.ok) {
        setError(data.message || "Kaydedilemedi.");
        return;
      }
      setNotice("Kaydedildi. Vitrin güncelleniyor…");
      await load();
      router.refresh();
    } catch {
      setError("Kayıt sırasında bağlantı hatası.");
    } finally {
      setSaving(false);
    }
  }

  if (loading || !model) {
    return <p className="text-sm text-muted">{loading ? "Ayarlar yükleniyor…" : "Veri yok."}</p>;
  }

  const br = model.branding ?? {};
  const hero = model.heroSection ?? {};
  const camp = model.campaignBanner ?? {};
  const shelves = model.shelvesCopy ?? {};
  const trust = model.commerceTrustBar ?? [];

  return (
    <section className="card-elevated space-y-8 rounded-[var(--radius-card)] p-5 md:p-7">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-serif text-2xl text-foreground">Site & vitrin</h2>
          <p className="mt-1 max-w-2xl text-sm text-muted">
            Kategoriler mağaza filtresi ve ürün kaydıyla eşleşir (küçük harf, tire ile kelime arası). Görseller Cloudinary veya{" "}
            <code className="rounded bg-background px-1 text-xs">/uploads/...</code> URL olabilir. Popup&apos;lar{" "}
            <code className="rounded bg-background px-1 text-xs">matchRoutes</code> ile sayfa seçer (örn. <code>/</code> veya{" "}
            <code>/*</code>).
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" type="button" className="!min-h-[40px]" onClick={() => void load()} disabled={loading}>
            Yenile
          </Button>
          <Button variant="primary" type="button" className="!min-h-[40px]" onClick={() => void save()} disabled={saving}>
            {saving ? "Kaydediliyor…" : "Tümünü kaydet"}
          </Button>
        </div>
      </div>

      {error ? <p className="text-sm text-red-700">{error}</p> : null}
      {notice ? <p className="text-sm text-primary">{notice}</p> : null}

      <details open className="rounded-[var(--radius-input)] bg-background p-4 ring-1 ring-[var(--line-soft)]">
        <summary className="cursor-pointer font-serif text-lg text-foreground">İletişim &amp; kanallar</summary>
        <p className="mt-2 text-xs text-muted">
          Boş bıraktığınız alanlarda site{" "}
          <code className="rounded bg-background px-1 text-[11px]">NEXT_PUBLIC_*</code> ortam değişkenleri kullanılır.
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {(
            [
              ["phoneDisplay", "Telefon (görünen)"],
              ["phoneE164", "Telefon E.164 (ülke kodu ile, boşluksuz)"],
              ["whatsappE164", "WhatsApp E.164"],
              ["email", "E-posta"],
              ["socialInstagram", "Instagram URL"],
              ["hours", "Çalışma saatleri"],
              ["mapsUrl", "Harita linki (Google Maps vb.)"],
              ["mapsQuery", "Harita arama metni (mapsUrl yoksa)"],
            ] as const
          ).map(([key, label]) => (
            <label key={key} className={key === "mapsQuery" || key === "mapsUrl" ? "md:col-span-2" : ""}>
              <span className="text-xs text-muted">{label}</span>
              <input
                className={`${inputFieldClass} mt-1 font-mono text-[13px]`}
                value={(model.contact ?? {})[key] ?? ""}
                onChange={(e) =>
                  setModel({
                    ...model,
                    contact: { ...(model.contact ?? {}), [key]: e.target.value },
                  })
                }
              />
            </label>
          ))}
          <label className="md:col-span-2">
            <span className="text-xs text-muted">Adres satırı 1</span>
            <input
              className={`${inputFieldClass} mt-1`}
              value={model.contact?.addressLine1 ?? ""}
              onChange={(e) => setModel({ ...model, contact: { ...(model.contact ?? {}), addressLine1: e.target.value } })}
            />
          </label>
          <label className="md:col-span-2">
            <span className="text-xs text-muted">Adres satırı 2</span>
            <input
              className={`${inputFieldClass} mt-1`}
              value={model.contact?.addressLine2 ?? ""}
              onChange={(e) => setModel({ ...model, contact: { ...(model.contact ?? {}), addressLine2: e.target.value } })}
            />
          </label>
          <label className="md:col-span-2">
            <span className="text-xs text-muted">Yanıt süresi ipucu (formlar)</span>
            <textarea
              className={`${inputFieldClass} mt-1 min-h-[56px]`}
              value={model.contact?.responseTimeHint ?? ""}
              onChange={(e) => setModel({ ...model, contact: { ...(model.contact ?? {}), responseTimeHint: e.target.value } })}
            />
          </label>
          <label className="md:col-span-2">
            <span className="text-xs text-muted">Toptan form giriş metni</span>
            <textarea
              className={`${inputFieldClass} mt-1 min-h-[56px]`}
              value={model.contact?.wholesaleFormIntro ?? ""}
              onChange={(e) => setModel({ ...model, contact: { ...(model.contact ?? {}), wholesaleFormIntro: e.target.value } })}
            />
          </label>
          <label className="md:col-span-2">
            <span className="text-xs text-muted">Sertifika / belge notu (Hakkımızda güven bandı)</span>
            <textarea
              className={`${inputFieldClass} mt-1 min-h-[48px]`}
              value={model.contact?.certificatesNote ?? ""}
              onChange={(e) => setModel({ ...model, contact: { ...(model.contact ?? {}), certificatesNote: e.target.value } })}
            />
          </label>
        </div>
      </details>

      <details className="rounded-[var(--radius-input)] bg-background p-4 ring-1 ring-[var(--line-soft)]">
        <summary className="cursor-pointer font-serif text-lg text-foreground">Tema — CTA turuncusu</summary>
        <p className="mt-2 text-xs text-muted">
          Yalnızca <code className="rounded bg-background px-1">#RRGGBB</code> (ör. #d9732f). Boş bırakırsanız site varsayılanı kullanılır.
        </p>
        <div className="mt-4 flex flex-wrap items-end gap-4">
          <label className="text-xs text-muted">
            Hex
            <input
              className={`${inputFieldClass} mt-1 font-mono`}
              placeholder="#d9732f"
              value={model.theme?.ctaAccentHex ?? ""}
              onChange={(e) =>
                setModel({
                  ...model,
                  theme: { ...model.theme, ctaAccentHex: e.target.value },
                })
              }
            />
          </label>
          <label className="flex items-center gap-2 text-xs text-muted">
            Renk seçici
            <input
              type="color"
              className="mt-1 h-10 w-14 cursor-pointer rounded border border-[var(--line-soft)] bg-background p-1"
              value={/^#[0-9A-Fa-f]{6}$/.test(model.theme?.ctaAccentHex ?? "") ? model.theme!.ctaAccentHex! : "#d9732f"}
              onChange={(e) =>
                setModel({
                  ...model,
                  theme: { ...model.theme, ctaAccentHex: e.target.value },
                })
              }
            />
          </label>
        </div>
      </details>

      <details className="rounded-[var(--radius-input)] bg-background p-4 ring-1 ring-[var(--line-soft)]">
        <summary className="cursor-pointer font-serif text-lg text-foreground">Sistem mesajları</summary>
        <p className="mt-2 text-xs text-muted">
          Müşteri veya panelde beklenmeyen durumlarda gösterilen metinler. Varsayılanlar kodda tanımlıdır; yalnızca değiştirdikleriniz JSON’a yazılır.
        </p>
        <div className="mt-4 space-y-4">
          {contentMessageDefaultsForAdmin().map((row) => (
            <label key={row.key} className="block text-xs text-muted">
              <span className="font-medium text-foreground">{row.label}</span>
              <span className="mt-0.5 block text-[11px] opacity-90">{row.hint}</span>
              <textarea
                className={`${inputFieldClass} mt-1 min-h-[72px] font-sans text-sm`}
                value={model.contentMessages?.[row.key] ?? ""}
                onChange={(e) =>
                  setModel({
                    ...model,
                    contentMessages: { ...(model.contentMessages ?? mergeContentMessages()), [row.key]: e.target.value },
                  })
                }
              />
            </label>
          ))}
        </div>
      </details>

      <details open className="rounded-[var(--radius-input)] bg-background p-4 ring-1 ring-[var(--line-soft)]">
        <summary className="cursor-pointer font-serif text-lg text-foreground">Mağaza kategorileri</summary>
        <p className="mt-2 text-xs text-muted">
          Ürün formunda seçim listesi buradan gelir. Kimlik değişince mevcut ürünlerde slug güncellemeniz gerekir.
        </p>
        <div className="mt-4 space-y-3">
          {(model.categories ?? []).map((row, idx) => (
            <div key={idx} className="grid gap-2 rounded-lg border border-[var(--line-soft)] p-3 md:grid-cols-[1fr_2fr_auto_auto] md:items-center">
              <label className="text-xs text-muted">
                Kimlik (slug)
                <input
                  className={`${inputFieldClass} mt-1 font-mono text-sm`}
                  value={row.id}
                  onChange={(e) => {
                    const next = [...(model.categories ?? [])];
                    next[idx] = { ...row, id: e.target.value.trim().toLowerCase() };
                    setModel({ ...model, categories: next });
                  }}
                />
              </label>
              <label className="text-xs text-muted">
                Etiket
                <input
                  className={`${inputFieldClass} mt-1`}
                  value={row.label}
                  onChange={(e) => {
                    const next = [...(model.categories ?? [])];
                    next[idx] = { ...row, label: e.target.value };
                    setModel({ ...model, categories: next });
                  }}
                />
              </label>
              <label className="text-xs text-muted">
                Sıra
                <input
                  type="number"
                  className={`${inputFieldClass} mt-1`}
                  value={row.sortOrder}
                  onChange={(e) => {
                    const next = [...(model.categories ?? [])];
                    next[idx] = { ...row, sortOrder: Number(e.target.value) };
                    setModel({ ...model, categories: next });
                  }}
                />
              </label>
              <Button
                variant="ghost"
                type="button"
                className="!min-h-[40px] md:justify-self-end"
                onClick={() => {
                  const next = (model.categories ?? []).filter((_, i) => i !== idx);
                  setModel({ ...model, categories: next });
                }}
              >
                Sil
              </Button>
            </div>
          ))}
          <Button
            variant="secondary"
            type="button"
            onClick={() =>
              setModel({
                ...model,
                categories: [...(model.categories ?? []), { id: `yeni-${Date.now()}`, label: "Yeni kategori", sortOrder: 90 }],
              })
            }
          >
            Kategori ekle
          </Button>
        </div>
      </details>

      <details open className="rounded-[var(--radius-input)] bg-background p-4 ring-1 ring-[var(--line-soft)]">
        <summary className="cursor-pointer font-serif text-lg text-foreground">Vitrin görselleri (URL)</summary>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {MEDIA_FIELDS.map((mf) => (
            <label key={mf.id} className="block text-xs text-muted">
              {mf.label}
              <input
                className={`${inputFieldClass} mt-1 font-mono text-[13px]`}
                value={model.mediaUrls?.[mf.id] ?? ""}
                placeholder="Boş bırakırsanız .env varsayılanı kullanılır"
                onChange={(e) =>
                  setModel({
                    ...model,
                    mediaUrls: { ...(model.mediaUrls ?? {}), [mf.id]: e.target.value },
                  })
                }
              />
            </label>
          ))}
        </div>
      </details>

      <details className="rounded-[var(--radius-input)] bg-background p-4 ring-1 ring-[var(--line-soft)]">
        <summary className="cursor-pointer font-serif text-lg text-foreground">Marka metinleri</summary>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {(
            [
              ["siteName", "Site adı"],
              ["shortName", "Kısa ad"],
              ["description", "SEO / vitrin açıklaması"],
              ["footerBlurb", "Footer özet"],
            ] as const
          ).map(([key, label]) => (
            <label key={key} className={key === "description" || key === "footerBlurb" ? "md:col-span-2" : ""}>
              <span className="text-xs text-muted">{label}</span>
              {key === "description" || key === "footerBlurb" ? (
                <textarea
                  className={`${inputFieldClass} mt-1 min-h-[72px]`}
                  value={(br[key] as string | undefined) ?? ""}
                  onChange={(e) => setModel({ ...model, branding: { ...br, [key]: e.target.value } })}
                />
              ) : (
                <input
                  className={`${inputFieldClass} mt-1`}
                  value={(br[key] as string | undefined) ?? ""}
                  onChange={(e) => setModel({ ...model, branding: { ...br, [key]: e.target.value } })}
                />
              )}
            </label>
          ))}
        </div>
      </details>

      <details className="rounded-[var(--radius-input)] bg-background p-4 ring-1 ring-[var(--line-soft)]">
        <summary className="cursor-pointer font-serif text-lg text-foreground">Hero & kampanya şeridi</summary>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <label className="md:col-span-2">
            <span className="text-xs text-muted">Üst satır (kicker)</span>
            <input className={`${inputFieldClass} mt-1`} value={hero.kicker ?? ""} onChange={(e) => patchHero(model, setModel, { kicker: e.target.value })} />
          </label>
          <label className="md:col-span-2">
            <span className="text-xs text-muted">Başlık</span>
            <input className={`${inputFieldClass} mt-1`} value={hero.title ?? ""} onChange={(e) => patchHero(model, setModel, { title: e.target.value })} />
          </label>
          <label className="md:col-span-2">
            <span className="text-xs text-muted">Alt başlık</span>
            <textarea className={`${inputFieldClass} mt-1 min-h-[80px]`} value={hero.subtitle ?? ""} onChange={(e) => patchHero(model, setModel, { subtitle: e.target.value })} />
          </label>
          <label>
            <span className="text-xs text-muted">Birincil düğme</span>
            <input className={`${inputFieldClass} mt-1`} value={hero.primaryLabel ?? ""} onChange={(e) => patchHero(model, setModel, { primaryLabel: e.target.value })} />
          </label>
          <label>
            <span className="text-xs text-muted">Birincil link</span>
            <input className={`${inputFieldClass} mt-1 font-mono text-sm`} value={hero.primaryHref ?? ""} onChange={(e) => patchHero(model, setModel, { primaryHref: e.target.value })} />
          </label>
          <label>
            <span className="text-xs text-muted">İkincil düğme</span>
            <input className={`${inputFieldClass} mt-1`} value={hero.secondaryLabel ?? ""} onChange={(e) => patchHero(model, setModel, { secondaryLabel: e.target.value })} />
          </label>
          <label>
            <span className="text-xs text-muted">İkincil link</span>
            <input className={`${inputFieldClass} mt-1 font-mono text-sm`} value={hero.secondaryHref ?? ""} onChange={(e) => patchHero(model, setModel, { secondaryHref: e.target.value })} />
          </label>
          <label>
            <span className="text-xs text-muted">WA etiket</span>
            <input className={`${inputFieldClass} mt-1`} value={hero.waPriceLabel ?? ""} onChange={(e) => patchHero(model, setModel, { waPriceLabel: e.target.value })} />
          </label>
          <label className="md:col-span-2">
            <span className="text-xs text-muted">WA ön mesaj</span>
            <textarea className={`${inputFieldClass} mt-1 min-h-[60px]`} value={hero.waPriceMessage ?? ""} onChange={(e) => patchHero(model, setModel, { waPriceMessage: e.target.value })} />
          </label>
          <p className="md:col-span-2 text-xs font-semibold text-muted">Hero alt üç kutu</p>
          {(hero.trustMicro ?? []).map((row, i) => (
            <div key={i} className="contents">
              <label>
                <span className="text-xs text-muted">Etiket {i + 1}</span>
                <input
                  className={`${inputFieldClass} mt-1`}
                  value={row.label}
                  onChange={(e) => patchTrustMicro(model, setModel, i, { ...row, label: e.target.value })}
                />
              </label>
              <label className="md:col-span-1">
                <span className="text-xs text-muted">Metin {i + 1}</span>
                <input
                  className={`${inputFieldClass} mt-1`}
                  value={row.text}
                  onChange={(e) => patchTrustMicro(model, setModel, i, { ...row, text: e.target.value })}
                />
              </label>
            </div>
          ))}
          <p className="md:col-span-2 mt-4 text-xs font-semibold text-muted">Turuncu kampanya şeridi</p>
          <label className="md:col-span-2">
            <span className="text-xs text-muted">Metin</span>
            <textarea className={`${inputFieldClass} mt-1 min-h-[56px]`} value={camp.text ?? ""} onChange={(e) => setModel({ ...model, campaignBanner: { ...camp, text: e.target.value } })} />
          </label>
          <label>
            <span className="text-xs text-muted">Düğme</span>
            <input className={`${inputFieldClass} mt-1`} value={camp.linkLabel ?? ""} onChange={(e) => setModel({ ...model, campaignBanner: { ...camp, linkLabel: e.target.value } })} />
          </label>
          <label>
            <span className="text-xs text-muted">Link</span>
            <input className={`${inputFieldClass} mt-1 font-mono text-sm`} value={camp.href ?? ""} onChange={(e) => setModel({ ...model, campaignBanner: { ...camp, href: e.target.value } })} />
          </label>
        </div>
      </details>

      <details className="rounded-[var(--radius-input)] bg-background p-4 ring-1 ring-[var(--line-soft)]">
        <summary className="cursor-pointer font-serif text-lg text-foreground">Üst güven dörtlüsü & raflar</summary>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {trust.map((row, i) => (
            <div key={i} className="rounded-lg border border-[var(--line-soft)] p-3 md:col-span-2 md:grid md:grid-cols-2 md:gap-3">
              <label>
                <span className="text-xs text-muted">Başlık {i + 1}</span>
                <input
                  className={`${inputFieldClass} mt-1`}
                  value={row.title}
                  onChange={(e) => patchTrustBar(model, setModel, i, { ...row, title: e.target.value })}
                />
              </label>
              <label>
                <span className="text-xs text-muted">Metin {i + 1}</span>
                <input className={`${inputFieldClass} mt-1`} value={row.text} onChange={(e) => patchTrustBar(model, setModel, i, { ...row, text: e.target.value })} />
              </label>
            </div>
          ))}
          <label className="md:col-span-2">
            <span className="text-xs text-muted">Yeni mahsul başlık</span>
            <input className={`${inputFieldClass} mt-1`} value={shelves.newHarvestTitle ?? ""} onChange={(e) => patchShelves(model, setModel, { newHarvestTitle: e.target.value })} />
          </label>
          <label className="md:col-span-2">
            <span className="text-xs text-muted">Yeni mahsul alt başlık</span>
            <input className={`${inputFieldClass} mt-1`} value={shelves.newHarvestSubtitle ?? ""} onChange={(e) => patchShelves(model, setModel, { newHarvestSubtitle: e.target.value })} />
          </label>
          <label className="md:col-span-2">
            <span className="text-xs text-muted">Paket rafı başlık</span>
            <input className={`${inputFieldClass} mt-1`} value={shelves.valuePacksTitle ?? ""} onChange={(e) => patchShelves(model, setModel, { valuePacksTitle: e.target.value })} />
          </label>
          <label className="md:col-span-2">
            <span className="text-xs text-muted">Paket rafı alt başlık</span>
            <input className={`${inputFieldClass} mt-1`} value={shelves.valuePacksSubtitle ?? ""} onChange={(e) => patchShelves(model, setModel, { valuePacksSubtitle: e.target.value })} />
          </label>
          <label>
            <span className="text-xs text-muted">Paket rafı — öncelik kategori id</span>
            <input className={`${inputFieldClass} mt-1 font-mono`} value={shelves.valuePacksCategoryId ?? ""} onChange={(e) => patchShelves(model, setModel, { valuePacksCategoryId: e.target.value })} />
          </label>
        </div>
      </details>

      <details className="rounded-[var(--radius-input)] bg-background p-4 ring-1 ring-[var(--line-soft)]">
        <summary className="cursor-pointer font-serif text-lg text-foreground">Keşfet kartları (ana sayfa)</summary>
        <div className="mt-4 space-y-4">
          {(model.discoveryTiles ?? []).map((tile, idx) => (
            <div key={`${tile.id}-${idx}`} className="grid gap-2 rounded-lg border border-[var(--line-soft)] p-3 md:grid-cols-2">
              <label className="text-xs text-muted">
                Kimlik
                <input
                  className={`${inputFieldClass} mt-1 font-mono`}
                  value={tile.id}
                  onChange={(e) => patchTile(model, setModel, idx, { ...tile, id: e.target.value })}
                />
              </label>
              <label className="text-xs text-muted">
                Sıra
                <input
                  type="number"
                  className={`${inputFieldClass} mt-1`}
                  value={tile.sortOrder}
                  onChange={(e) => patchTile(model, setModel, idx, { ...tile, sortOrder: Number(e.target.value) })}
                />
              </label>
              <label className="text-xs text-muted md:col-span-2">
                Başlık
                <input className={`${inputFieldClass} mt-1`} value={tile.title} onChange={(e) => patchTile(model, setModel, idx, { ...tile, title: e.target.value })} />
              </label>
              <label className="text-xs text-muted md:col-span-2">
                Açıklama
                <input className={`${inputFieldClass} mt-1`} value={tile.blurb} onChange={(e) => patchTile(model, setModel, idx, { ...tile, blurb: e.target.value })} />
              </label>
              <label className="text-xs text-muted md:col-span-2">
                Link (href)
                <input className={`${inputFieldClass} mt-1 font-mono text-sm`} value={tile.href} onChange={(e) => patchTile(model, setModel, idx, { ...tile, href: e.target.value })} />
              </label>
              <label className="text-xs text-muted md:col-span-2">
                Görsel URL
                <input className={`${inputFieldClass} mt-1 font-mono text-sm`} value={tile.imageSrc} onChange={(e) => patchTile(model, setModel, idx, { ...tile, imageSrc: e.target.value })} />
              </label>
              <label className="text-xs text-muted md:col-span-2">
                Alt metin
                <input className={`${inputFieldClass} mt-1`} value={tile.imageAlt} onChange={(e) => patchTile(model, setModel, idx, { ...tile, imageAlt: e.target.value })} />
              </label>
              <Button variant="ghost" type="button" onClick={() => removeTile(model, setModel, idx)}>
                Kartı sil
              </Button>
            </div>
          ))}
          <Button
            variant="secondary"
            type="button"
            onClick={() =>
              setModel({
                ...model,
                discoveryTiles: [
                  ...(model.discoveryTiles ?? []),
                  {
                    id: `tile-${Date.now()}`,
                    title: "Yeni kart",
                    blurb: "Kısa açıklama",
                    href: "/urunler",
                    imageSrc: "/images/site/store-range.png",
                    imageAlt: "",
                    sortOrder: 99,
                  },
                ],
              })
            }
          >
            Kart ekle
          </Button>
        </div>
      </details>

      <details className="rounded-[var(--radius-input)] bg-background p-4 ring-1 ring-[var(--line-soft)]">
        <summary className="cursor-pointer font-serif text-lg text-foreground">Promo popup&apos;lar</summary>
        <p className="mt-2 text-xs text-muted">
          routes: virgülle <code>/</code>, <code>/urunler</code>, <code>/*</code>
        </p>
        <div className="mt-4 space-y-4">
          {(model.promoPopups ?? []).map((pop, idx) => (
            <div key={pop.id} className="grid gap-2 rounded-lg border border-[var(--line-soft)] p-3 md:grid-cols-2">
              <label className="flex items-center gap-2 md:col-span-2">
                <input type="checkbox" checked={pop.enabled} onChange={(e) => patchPopup(model, setModel, idx, { ...pop, enabled: e.target.checked })} />
                <span className="text-sm font-medium">Açık</span>
              </label>
              <label className="text-xs text-muted">
                Kimlik
                <input className={`${inputFieldClass} mt-1 font-mono`} value={pop.id} onChange={(e) => patchPopup(model, setModel, idx, { ...pop, id: e.target.value })} />
              </label>
              <label className="text-xs text-muted">
                storageKey (benzersiz)
                <input className={`${inputFieldClass} mt-1 font-mono`} value={pop.storageKey} onChange={(e) => patchPopup(model, setModel, idx, { ...pop, storageKey: e.target.value })} />
              </label>
              <label className="text-xs text-muted md:col-span-2">
                Başlık
                <input className={`${inputFieldClass} mt-1`} value={pop.title} onChange={(e) => patchPopup(model, setModel, idx, { ...pop, title: e.target.value })} />
              </label>
              <label className="text-xs text-muted md:col-span-2">
                Metin
                <textarea className={`${inputFieldClass} mt-1 min-h-[56px]`} value={pop.body} onChange={(e) => patchPopup(model, setModel, idx, { ...pop, body: e.target.value })} />
              </label>
              <label className="text-xs text-muted md:col-span-2">
                Görsel URL
                <input className={`${inputFieldClass} mt-1 font-mono text-sm`} value={pop.imageSrc} onChange={(e) => patchPopup(model, setModel, idx, { ...pop, imageSrc: e.target.value })} />
              </label>
              <label className="text-xs text-muted md:col-span-2">
                Görsel alt
                <input className={`${inputFieldClass} mt-1`} value={pop.imageAlt} onChange={(e) => patchPopup(model, setModel, idx, { ...pop, imageAlt: e.target.value })} />
              </label>
              <label className="text-xs text-muted">
                Yerleşim
                <select
                  className={`${inputFieldClass} mt-1`}
                  value={pop.layout}
                  onChange={(e) =>
                    patchPopup(model, setModel, idx, {
                      ...pop,
                      layout: e.target.value as typeof pop.layout,
                    })
                  }
                >
                  <option value="image-right">Görsel sağda</option>
                  <option value="image-left">Görsel solda</option>
                  <option value="image-top">Görsel üstte</option>
                </select>
              </label>
              <label className="text-xs text-muted">
                Gecikme (ms)
                <input type="number" className={`${inputFieldClass} mt-1`} value={pop.delayMs} onChange={(e) => patchPopup(model, setModel, idx, { ...pop, delayMs: Number(e.target.value) })} />
              </label>
              <label className="text-xs text-muted">
                Hatırlatma (gün)
                <input type="number" className={`${inputFieldClass} mt-1`} value={pop.dismissDays} onChange={(e) => patchPopup(model, setModel, idx, { ...pop, dismissDays: Number(e.target.value) })} />
              </label>
              <label className="text-xs text-muted md:col-span-2">
                Routes (virgülle)
                <input
                  className={`${inputFieldClass} mt-1 font-mono text-sm`}
                  value={(pop.matchRoutes ?? []).join(", ")}
                  onChange={(e) =>
                    patchPopup(model, setModel, idx, {
                      ...pop,
                      matchRoutes: e.target.value
                        .split(",")
                        .map((s) => s.trim())
                        .filter(Boolean),
                    })
                  }
                />
              </label>
              <label className="text-xs text-muted">
                CTA yazısı
                <input className={`${inputFieldClass} mt-1`} value={pop.ctaLabel} onChange={(e) => patchPopup(model, setModel, idx, { ...pop, ctaLabel: e.target.value })} />
              </label>
              <label className="text-xs text-muted">
                CTA link
                <input className={`${inputFieldClass} mt-1 font-mono text-sm`} value={pop.ctaHref} onChange={(e) => patchPopup(model, setModel, idx, { ...pop, ctaHref: e.target.value })} />
              </label>
              <Button variant="ghost" type="button" className="md:col-span-2" onClick={() => removePopup(model, setModel, idx)}>
                Popup sil
              </Button>
            </div>
          ))}
          <Button
            variant="secondary"
            type="button"
            onClick={() =>
              setModel({
                ...model,
                promoPopups: [
                  ...(model.promoPopups ?? []),
                  {
                    id: `pop-${Date.now()}`,
                    enabled: true,
                    title: "Kampanya",
                    body: "",
                    imageSrc: "",
                    imageAlt: "",
                    layout: "image-right",
                    ctaLabel: "Ürünlere git",
                    ctaHref: "/urunler",
                    matchRoutes: ["/"],
                    delayMs: 3000,
                    dismissDays: 7,
                    storageKey: `kampanya-${Date.now()}`,
                  },
                ],
              })
            }
          >
            Popup ekle
          </Button>
        </div>
      </details>

      <details className="rounded-[var(--radius-input)] bg-background p-4 ring-1 ring-[var(--line-soft)]">
        <summary className="cursor-pointer font-serif text-lg text-foreground">Footer</summary>
        <label className="mt-4 block text-xs text-muted">
          Tek satır damga
          <input className={`${inputFieldClass} mt-1`} value={model.footerTagline ?? ""} onChange={(e) => setModel({ ...model, footerTagline: e.target.value })} />
        </label>
        <p className="mt-4 text-xs font-semibold text-muted">Ek bağlantılar (kategori linklerinden sonra)</p>
        {(model.footerExtraLinks ?? []).map((link, idx) => (
          <div key={idx} className="mt-2 grid gap-2 md:grid-cols-[1fr_2fr_auto] md:items-end">
            <label className="text-xs text-muted">
              Etiket
              <input className={`${inputFieldClass} mt-1`} value={link.label} onChange={(e) => patchFooterExtra(model, setModel, idx, { ...link, label: e.target.value })} />
            </label>
            <label className="text-xs text-muted">
              URL
              <input className={`${inputFieldClass} mt-1 font-mono text-sm`} value={link.href} onChange={(e) => patchFooterExtra(model, setModel, idx, { ...link, href: e.target.value })} />
            </label>
            <Button variant="ghost" type="button" onClick={() => removeFooterExtra(model, setModel, idx)}>
              Sil
            </Button>
          </div>
        ))}
        <Button
          variant="secondary"
          type="button"
          className="mt-3"
          onClick={() =>
            setModel({
              ...model,
              footerExtraLinks: [...(model.footerExtraLinks ?? []), { label: "Yeni bağlantı", href: "/urunler" }],
            })
          }
        >
          Bağlantı ekle
        </Button>
      </details>
    </section>
  );
}

function deepMerge(base: SiteSettingsFileV1, patch: SiteSettingsFileV1): SiteSettingsFileV1 {
  const heroBase = base.heroSection ?? {};
  const heroPatch = patch.heroSection ?? {};
  return {
    ...base,
    ...patch,
    contact: { ...(base.contact ?? {}), ...(patch.contact ?? {}) },
    theme: { ...(base.theme ?? {}), ...(patch.theme ?? {}) },
    contentMessages: { ...(base.contentMessages ?? {}), ...(patch.contentMessages ?? {}) },
    branding: { ...base.branding, ...patch.branding },
    heroSection: {
      ...heroBase,
      ...heroPatch,
      trustMicro: heroPatch.trustMicro?.length ? heroPatch.trustMicro : heroBase.trustMicro,
    },
    campaignBanner: { ...base.campaignBanner, ...patch.campaignBanner },
    commerceTrustBar: patch.commerceTrustBar?.length ? patch.commerceTrustBar : base.commerceTrustBar,
    shelvesCopy: { ...base.shelvesCopy, ...patch.shelvesCopy },
    categories: patch.categories?.length ? patch.categories : base.categories,
    discoveryTiles: patch.discoveryTiles?.length ? patch.discoveryTiles : base.discoveryTiles,
    promoPopups: patch.promoPopups ?? base.promoPopups,
    footerExtraLinks: patch.footerExtraLinks?.length ? patch.footerExtraLinks : base.footerExtraLinks,
    footerTagline: patch.footerTagline ?? base.footerTagline,
    mediaUrls: { ...base.mediaUrls, ...patch.mediaUrls },
  };
}

function patchHero(model: SiteSettingsFileV1, set: (m: SiteSettingsFileV1) => void, partial: NonNullable<SiteSettingsFileV1["heroSection"]>) {
  set({ ...model, heroSection: { ...(model.heroSection ?? {}), ...partial } });
}

function patchTrustMicro(
  model: SiteSettingsFileV1,
  set: (m: SiteSettingsFileV1) => void,
  i: number,
  row: { label: string; text: string },
) {
  const list = [...(model.heroSection?.trustMicro ?? [])];
  list[i] = row;
  set({ ...model, heroSection: { ...(model.heroSection ?? {}), trustMicro: list } });
}

function patchTrustBar(
  model: SiteSettingsFileV1,
  set: (m: SiteSettingsFileV1) => void,
  i: number,
  row: { title: string; text: string },
) {
  const list = [...(model.commerceTrustBar ?? [])];
  list[i] = row;
  set({ ...model, commerceTrustBar: list });
}

function patchShelves(model: SiteSettingsFileV1, set: (m: SiteSettingsFileV1) => void, partial: NonNullable<SiteSettingsFileV1["shelvesCopy"]>) {
  set({ ...model, shelvesCopy: { ...(model.shelvesCopy ?? {}), ...partial } });
}

function patchTile(model: SiteSettingsFileV1, set: (m: SiteSettingsFileV1) => void, idx: number, tile: NonNullable<SiteSettingsFileV1["discoveryTiles"]>[number]) {
  const list = [...(model.discoveryTiles ?? [])];
  list[idx] = tile;
  set({ ...model, discoveryTiles: list });
}

function removeTile(model: SiteSettingsFileV1, set: (m: SiteSettingsFileV1) => void, idx: number) {
  set({ ...model, discoveryTiles: (model.discoveryTiles ?? []).filter((_, i) => i !== idx) });
}

function patchPopup(model: SiteSettingsFileV1, set: (m: SiteSettingsFileV1) => void, idx: number, pop: NonNullable<SiteSettingsFileV1["promoPopups"]>[number]) {
  const list = [...(model.promoPopups ?? [])];
  list[idx] = pop;
  set({ ...model, promoPopups: list });
}

function removePopup(model: SiteSettingsFileV1, set: (m: SiteSettingsFileV1) => void, idx: number) {
  set({ ...model, promoPopups: (model.promoPopups ?? []).filter((_, i) => i !== idx) });
}

function patchFooterExtra(model: SiteSettingsFileV1, set: (m: SiteSettingsFileV1) => void, idx: number, link: { href: string; label: string }) {
  const list = [...(model.footerExtraLinks ?? [])];
  list[idx] = link;
  set({ ...model, footerExtraLinks: list });
}

function removeFooterExtra(model: SiteSettingsFileV1, set: (m: SiteSettingsFileV1) => void, idx: number) {
  set({ ...model, footerExtraLinks: (model.footerExtraLinks ?? []).filter((_, i) => i !== idx) });
}
