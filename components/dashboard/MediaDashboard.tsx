"use client";

import { useMemo, useState } from "react";
import type { MediaSlot } from "@/lib/media-slots";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

type Props = {
  slots: MediaSlot[];
};

type UploadResult = {
  slotId: string;
  envKey: string;
  url: string;
};

export function MediaDashboard({ slots }: Props) {
  const [selectedSlotId, setSelectedSlotId] = useState(slots[0]?.id ?? "");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<UploadResult | null>(null);

  const selectedSlot = useMemo(
    () => slots.find((s) => s.id === selectedSlotId) ?? null,
    [slots, selectedSlotId],
  );

  async function upload(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setResult(null);
    if (!selectedSlot || !file) {
      setError("Önce alan ve dosya seçin.");
      return;
    }
    setLoading(true);
    try {
      const body = new FormData();
      body.set("slot", selectedSlot.id);
      body.set("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body });
      const data = (await res.json()) as {
        ok: boolean;
        message?: string;
        url?: string;
      };
      if (!res.ok || !data.ok || !data.url) {
        setError(data.message || "Yükleme başarısız.");
        return;
      }
      setResult({ slotId: selectedSlot.id, envKey: selectedSlot.envKey, url: data.url });
      setFile(null);
    } catch {
      setError("Yükleme sırasında bağlantı hatası.");
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.reload();
  }

  const envLine = result ? `${result.envKey}=${result.url}` : "";

  return (
    <div className="space-y-6">
      <div className="card-elevated rounded-[var(--radius-card)] p-5 md:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-serif text-2xl text-foreground">Foto yükleme dashboard</h2>
            <p className="mt-1 text-sm text-muted">
              Yüklenen dosyayı Cloudinary&apos;ye gönderir, ilgili <code>NEXT_PUBLIC_*</code>{" "}
              satırını üretir.
            </p>
          </div>
          <Button variant="ghost" onClick={logout}>
            Çıkış yap
          </Button>
        </div>

        <form className="mt-6 grid gap-4 md:grid-cols-[1fr_1fr_auto]" onSubmit={upload}>
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-foreground">Görsel alanı</span>
            <select
              value={selectedSlotId}
              onChange={(e) => setSelectedSlotId(e.target.value)}
              className="w-full rounded-[var(--radius-input)] border border-black/15 bg-background px-3 py-2 text-sm"
            >
              {slots.map((slot) => (
                <option key={slot.id} value={slot.id}>
                  {slot.title}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-foreground">Dosya</span>
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              className="w-full rounded-[var(--radius-input)] border border-black/15 bg-background px-3 py-2 text-sm"
              required
            />
          </label>

          <div className="flex items-end">
            <Button type="submit" variant="primary" className="w-full justify-center md:w-auto">
              {loading ? "Yükleniyor..." : "Yükle"}
            </Button>
          </div>
        </form>

        {selectedSlot ? (
          <p className="mt-3 text-xs text-muted">
            <strong>{selectedSlot.title}:</strong> {selectedSlot.description}
          </p>
        ) : null}
        {error ? <p className="mt-3 text-sm text-red-700">{error}</p> : null}

        {result ? (
          <div className="mt-5 rounded-[var(--radius-input)] border border-primary/20 bg-primary/[0.06] p-4">
            <p className="text-sm font-medium text-foreground">Yeni URL üretildi</p>
            <p className="mt-1 break-all text-xs text-muted">{result.url}</p>
            <p className="mt-3 font-mono text-xs text-foreground">{envLine}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Button
                variant="secondary"
                onClick={() => navigator.clipboard.writeText(envLine)}
                className="!min-h-[40px] !px-3 !py-2 !text-sm"
              >
                ENV satırını kopyala
              </Button>
              <Button
                variant="ghost"
                onClick={() => navigator.clipboard.writeText(result.url)}
                className="!min-h-[40px] !px-3 !py-2 !text-sm"
              >
                Sadece URL kopyala
              </Button>
            </div>
          </div>
        ) : null}
      </div>

      <section className="grid gap-4 md:grid-cols-2">
        {slots.map((slot) => (
          <article key={slot.id} className="card-elevated rounded-[var(--radius-card)] p-4">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-serif text-lg text-foreground">{slot.title}</h3>
              <Badge tone="primary">{slot.id}</Badge>
            </div>
            <p className="mt-1 text-sm text-muted">{slot.description}</p>
            <p className="mt-2 text-xs text-muted">ENV: {slot.envKey}</p>
            <p className="mt-2 break-all text-xs text-foreground">{slot.currentUrl}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
