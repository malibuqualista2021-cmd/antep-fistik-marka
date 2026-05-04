"use client";

import { useMemo, useState } from "react";
import type { MediaSlot } from "@/lib/media-slots";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

type Props = {
  slots: MediaSlot[];
  cloudinaryConfigured: boolean;
};

type UploadResult = {
  slotId: string;
  envKey: string;
  url: string;
};

/** Ürün kartları panelden yüklenir; vitrin ENV alanları burada listelenir */
function vitrinSlots(slots: MediaSlot[]) {
  return slots.filter((s) => s.id !== "catalog-product");
}

export function MediaDashboard({ slots, cloudinaryConfigured }: Props) {
  const slotChoices = useMemo(() => vitrinSlots(slots), [slots]);
  const [selectedSlotId, setSelectedSlotId] = useState(slotChoices[0]?.id ?? "");
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [results, setResults] = useState<UploadResult[]>([]);

  const selectedSlot = useMemo(
    () => slotChoices.find((s) => s.id === selectedSlotId) ?? null,
    [slotChoices, selectedSlotId],
  );

  async function upload(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setResults([]);
    if (!selectedSlot || files.length === 0) {
      setError("Önce alan ve en az bir dosya seçin.");
      return;
    }
    setLoading(true);
    try {
      const body = new FormData();
      body.set("slot", selectedSlot.id);
      files.forEach((f) => body.append("files", f));
      const res = await fetch("/api/admin/upload", { method: "POST", body, credentials: "same-origin" });
      const data = (await res.json()) as {
        ok: boolean;
        message?: string;
        urls?: string[];
        url?: string;
        storage?: string;
      };
      const urls = data.urls?.length ? data.urls : data.url ? [data.url] : [];
      if (!res.ok || !data.ok || urls.length === 0) {
        setError(data.message || "Yükleme başarısız.");
        return;
      }
      setResults(
        urls.map((url) => ({
          slotId: selectedSlot.id,
          envKey: selectedSlot.envKey,
          url,
        })),
      );
      setFiles([]);
    } catch {
      setError("Yükleme sırasında bağlantı hatası.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="card-elevated rounded-[var(--radius-card)] p-5 md:p-7">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="font-serif text-2xl text-foreground">Fotoğraf yükleme</h2>
            <p className="mt-1 text-sm text-muted">
              Sabit vitrin alanları için doğrudan yükleme. Cloudinary tanımlıysa CDN&apos;e gider; tanımlı değilse dosyalar projeye (
              <code className="rounded bg-background px-1">public/uploads/admin/</code>) yazılır. Ürün kartları için{" "}
              <strong className="text-foreground">Ürün yönetimi</strong> sekmesini kullanın.
            </p>
            {!cloudinaryConfigured ? (
              <div className="mt-4 rounded-[var(--radius-input)] border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950">
                <p className="font-semibold text-foreground">Yerel yükleme aktif</p>
                <p className="mt-2 text-xs leading-relaxed">
                  CDN için <code className="rounded bg-white/70 px-1">CLOUDINARY_*</code> ekleyebilirsiniz. Yerel dosyalar üretimde kalıcı disk
                  olmadan kaybolabilir; tek görsel kullanan ENV alanları için çoklu yüklemeden bir URL seçmeniz gerekir.
                </p>
              </div>
            ) : null}
          </div>
        </div>

        <form className="mt-6 grid gap-4 md:grid-cols-[1fr_1fr_auto]" onSubmit={upload}>
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-foreground">Görsel alanı</span>
            <select
              value={selectedSlotId}
              onChange={(e) => setSelectedSlotId(e.target.value)}
              className="w-full rounded-[var(--radius-input)] border border-[var(--input-border)] bg-background px-3 py-2 text-sm"
            >
              {slotChoices.map((slot) => (
                <option key={slot.id} value={slot.id}>
                  {slot.title}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-foreground">Dosyalar</span>
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              multiple
              onChange={(e) => setFiles(Array.from(e.target.files ?? []))}
              className="w-full rounded-[var(--radius-input)] border border-[var(--input-border)] bg-background px-3 py-2 text-sm"
            />
          </label>

          <div className="flex items-end">
            <Button type="submit" variant="primary" className="w-full justify-center md:w-auto" disabled={loading}>
              {loading ? "Yükleniyor..." : "Yükle"}
            </Button>
          </div>
        </form>

        {selectedSlot ? (
          <p className="mt-3 text-xs text-muted">
            <strong>{selectedSlot.title}:</strong> {selectedSlot.description}
          </p>
        ) : null}
        {files.length > 0 ? (
          <p className="mt-2 text-xs text-muted">{files.length} dosya seçildi.</p>
        ) : null}
        {error ? <p className="mt-3 text-sm text-red-700">{error}</p> : null}

        {results.length > 0 ? (
          <div className="mt-5 space-y-3 rounded-[var(--radius-input)] border border-primary/20 bg-primary/[0.06] p-4">
            <p className="text-sm font-medium text-foreground">
              {results.length === 1 ? "Yeni URL üretildi" : `${results.length} URL üretildi`}
            </p>
            {results.length > 1 ? (
              <p className="text-xs text-muted">
                Her ENV anahtarı tek görsel kullanır; ihtiyacınız olan satırı kopyalayın (aynı alan için bir URL seçin).
              </p>
            ) : null}
            <ul className="space-y-4">
              {results.map((r, idx) => {
                const envLine = `${r.envKey}=${r.url}`;
                return (
                  <li key={`${r.url}-${idx}`} className="border-t border-primary/10 pt-3 first:border-t-0 first:pt-0">
                    <p className="break-all text-xs text-muted">{r.url}</p>
                    <p className="mt-2 font-mono text-xs text-foreground">{envLine}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <Button
                        variant="secondary"
                        onClick={() => navigator.clipboard.writeText(envLine)}
                        className="!min-h-[40px] !px-3 !py-2 !text-sm"
                      >
                        ENV satırını kopyala
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => navigator.clipboard.writeText(r.url)}
                        className="!min-h-[40px] !px-3 !py-2 !text-sm"
                      >
                        Sadece URL
                      </Button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}
      </div>

      <section className="grid gap-4 md:grid-cols-2">
        {slotChoices.map((slot) => (
          <article key={slot.id} className="card-elevated rounded-[var(--radius-card)] p-4">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-serif text-lg text-foreground">{slot.title}</h3>
              <Badge tone="primary">{slot.id}</Badge>
            </div>
            <p className="mt-1 text-sm text-muted">{slot.description}</p>
            <p className="mt-2 text-xs text-muted">ENV: {slot.envKey}</p>
            <p className="mt-2 break-all text-xs text-foreground">{slot.currentUrl || "—"}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
