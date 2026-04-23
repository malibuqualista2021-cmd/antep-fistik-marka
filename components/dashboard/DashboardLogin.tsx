"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

type Props = {
  ready: boolean;
};

export function DashboardLogin({ ready }: Props) {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await res.json()) as { ok: boolean; message?: string };
      if (!res.ok || !data.ok) {
        setError(data.message || "Giriş başarısız.");
        return;
      }
      window.location.reload();
    } catch {
      setError("Bağlantı hatası. Tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card-elevated mx-auto w-full max-w-md rounded-[var(--radius-card)] p-6 md:p-8">
      <h2 className="font-serif text-2xl text-foreground">Dashboard girişi</h2>
      <p className="mt-2 text-sm text-muted">
        Foto yükleme paneli yalnızca şifre ile açılır.
      </p>

      {!ready ? (
        <p className="mt-4 rounded-[var(--radius-input)] border border-red-400/30 bg-red-100/60 p-3 text-sm text-red-900">
          Dashboard yapılandırması eksik. <code>ADMIN_DASHBOARD_PASSWORD</code> ve
          Cloudinary değişkenlerini doldurun.
        </p>
      ) : null}

      <form className="mt-6 space-y-4" onSubmit={onSubmit}>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-foreground">Şifre</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-[var(--radius-input)] border border-black/15 bg-background px-3 py-2 text-sm text-foreground"
            autoComplete="current-password"
            required
          />
        </label>
        {error ? <p className="text-sm text-red-700">{error}</p> : null}
        <Button type="submit" variant="primary" className="w-full justify-center">
          {loading ? "Kontrol ediliyor..." : "Giriş yap"}
        </Button>
      </form>
    </div>
  );
}
