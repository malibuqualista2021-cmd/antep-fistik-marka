"use client";

import { useCallback, useEffect, useState } from "react";
import type { WholesaleLeadAdminStatus, WholesaleLeadRecord } from "@/lib/server/wholesale-leads-store";
import { Button } from "@/components/ui/Button";
import { inputFieldClass } from "@/lib/form-classes";

const adminStatusLabels: Record<WholesaleLeadAdminStatus, string> = {
  new: "Yeni",
  contacted: "İletişime geçildi",
  quoted: "Teklif verildi",
  won: "Kazanıldı",
  lost: "Kaybedildi",
  archived: "Arşiv",
};

const adminStatuses: WholesaleLeadAdminStatus[] = ["new", "contacted", "quoted", "won", "lost", "archived"];

type Draft = { adminStatus: WholesaleLeadAdminStatus; adminNote: string };

export function WholesaleLeadsPanel() {
  const [leads, setLeads] = useState<WholesaleLeadRecord[]>([]);
  const [drafts, setDrafts] = useState<Record<string, Draft>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saveError, setSaveError] = useState("");
  const [savingId, setSavingId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/leads/wholesale", { credentials: "same-origin" });
      const data = (await res.json()) as { ok?: boolean; leads?: WholesaleLeadRecord[] };
      if (!res.ok || !data.leads) {
        setError("Talepler yüklenemedi.");
        return;
      }
      setLeads(data.leads);
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
    const next: Record<string, Draft> = {};
    for (const l of leads) {
      next[l.id] = {
        adminStatus: l.adminStatus ?? "new",
        adminNote: l.adminNote ?? "",
      };
    }
    setDrafts(next);
  }, [leads]);

  async function saveLead(id: string) {
    const d = drafts[id];
    if (!d) return;
    setSaveError("");
    setSavingId(id);
    try {
      const res = await fetch(`/api/admin/leads/wholesale/${encodeURIComponent(id)}`, {
        method: "PATCH",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminStatus: d.adminStatus, adminNote: d.adminNote }),
      });
      const data = (await res.json().catch(() => null)) as { message?: string } | null;
      if (!res.ok) {
        setSaveError(data?.message || "Kaydedilemedi.");
        return;
      }
      await load();
    } catch {
      setSaveError("Bağlantı hatası.");
    } finally {
      setSavingId(null);
    }
  }

  return (
    <section className="card-elevated rounded-[var(--radius-card)] p-5 md:p-7">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-serif text-2xl text-foreground">Toptan teklif talepleri</h2>
          <p className="mt-1 font-sans text-sm text-muted">
            Form gönderimleri{" "}
            <code className="rounded bg-background px-1 py-0.5 text-xs">data/wholesale-leads.json</code> dosyasına eklenir; durum ve iç not
            panelden kalıcı olarak güncellenir.
          </p>
        </div>
        <Button variant="secondary" className="!min-h-[40px] !px-3 !py-2 !text-sm" onClick={() => void load()} disabled={loading}>
          Yenile
        </Button>
      </div>

      {error ? <p className="mt-4 text-sm text-red-700">{error}</p> : null}
      {saveError ? <p className="mt-2 text-sm text-red-700">{saveError}</p> : null}

      {loading ? (
        <p className="mt-6 text-sm text-muted">Yükleniyor…</p>
      ) : leads.length === 0 ? (
        <p className="mt-6 rounded-[var(--radius-input)] bg-background p-4 text-sm text-muted ring-1 ring-[var(--line-soft)]">
          Henüz kayıtlı talep yok. Ziyaretçiler formu gönderdiğinde burada listelenir.
        </p>
      ) : (
        <ul className="mt-5 space-y-4">
          {leads.map((lead) => (
            <li key={lead.id} className="rounded-[var(--radius-card)] bg-background p-4 ring-1 ring-[var(--ring-soft)]">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <p className="font-serif text-lg text-foreground">{lead.name}</p>
                <span className="font-mono text-xs text-muted">{lead.id}</span>
              </div>
              <p className="mt-1 font-sans text-sm text-muted">
                {lead.phone} · {lead.deliveryCity} · {new Date(lead.createdAt).toLocaleString("tr-TR")}
              </p>
              {lead.company ? <p className="mt-1 text-sm text-muted">İşletme: {lead.company}</p> : null}
              <dl className="mt-3 grid gap-1 font-sans text-sm text-foreground md:grid-cols-2">
                <div>
                  <dt className="text-muted">Ürün</dt>
                  <dd>{lead.productType}</dd>
                </div>
                <div>
                  <dt className="text-muted">Miktar</dt>
                  <dd>{lead.quantity}</dd>
                </div>
                <div>
                  <dt className="text-muted">Kullanım</dt>
                  <dd>{lead.usageArea}</dd>
                </div>
                <div>
                  <dt className="text-muted">Talep</dt>
                  <dd>{lead.requestType}</dd>
                </div>
                {lead.targetDate ? (
                  <div>
                    <dt className="text-muted">Hedef tarih</dt>
                    <dd>{lead.targetDate}</dd>
                  </div>
                ) : null}
                <div>
                  <dt className="text-muted">Kaynak</dt>
                  <dd>{lead.source}</dd>
                </div>
              </dl>
              {lead.note ? (
                <p className="mt-3 border-t border-[var(--line-soft)] pt-3 font-sans text-sm text-muted">
                  <span className="font-semibold text-foreground">Müşteri notu: </span>
                  {lead.note}
                </p>
              ) : null}

              <div className="mt-4 border-t border-[var(--line-soft)] pt-4">
                <p className="font-sans text-xs font-semibold uppercase tracking-wide text-muted">Panel takibi</p>
                <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-end">
                  <label className="block shrink-0 font-sans text-sm text-muted">
                    Durum
                    <select
                      className={`${inputFieldClass} mt-1 min-w-[200px]`}
                      value={drafts[lead.id]?.adminStatus ?? "new"}
                      onChange={(e) =>
                        setDrafts((prev) => ({
                          ...prev,
                          [lead.id]: {
                            adminStatus: e.target.value as WholesaleLeadAdminStatus,
                            adminNote: prev[lead.id]?.adminNote ?? "",
                          },
                        }))
                      }
                    >
                      {adminStatuses.map((s) => (
                        <option key={s} value={s}>
                          {adminStatusLabels[s]}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="block min-w-0 flex-1 font-sans text-sm text-muted">
                    İç not (yalnızca panel)
                    <textarea
                      className={`${inputFieldClass} mt-1 min-h-[72px]`}
                      value={drafts[lead.id]?.adminNote ?? ""}
                      onChange={(e) =>
                        setDrafts((prev) => ({
                          ...prev,
                          [lead.id]: {
                            adminStatus: prev[lead.id]?.adminStatus ?? "new",
                            adminNote: e.target.value,
                          },
                        }))
                      }
                      placeholder="Teklif özeti, geri arama tarihi vb."
                    />
                  </label>
                  <Button
                    variant="secondary"
                    className="!min-h-[44px] shrink-0 md:self-end"
                    disabled={savingId === lead.id}
                    onClick={() => void saveLead(lead.id)}
                  >
                    {savingId === lead.id ? "Kaydediliyor…" : "Kaydet"}
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
