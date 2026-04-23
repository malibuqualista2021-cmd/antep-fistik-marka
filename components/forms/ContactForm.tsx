"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { inputFieldClass } from "@/lib/form-classes";
import { cta } from "@/lib/cta";

const topics = [
  { value: "perakende", label: "Perakende sipariş / paket" },
  { value: "toptan", label: "Toptan / teklif" },
  { value: "diger", label: "Diğer" },
] as const;

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  if (sent) {
    return (
      <p className="font-sans text-sm text-primary" role="status">
        Teşekkürler. Mesajınız alındı; en kısa sürede size dönüş yapılacaktır.
      </p>
    );
  }

  const cf = cta.contactPage;

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="cf-topic" className="block font-sans text-sm font-medium text-foreground">
          Konu
        </label>
        <select id="cf-topic" name="topic" className={inputFieldClass} defaultValue="perakende">
          {topics.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="cf-name" className="block font-sans text-sm font-medium text-foreground">
          Ad Soyad <span className="text-accent">*</span>
        </label>
        <input
          id="cf-name"
          name="name"
          required
          autoComplete="name"
          className={inputFieldClass}
        />
      </div>
      <div>
        <label htmlFor="cf-email" className="block font-sans text-sm font-medium text-foreground">
          E-posta <span className="text-accent">*</span>
        </label>
        <input
          id="cf-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className={inputFieldClass}
        />
      </div>
      <div>
        <label htmlFor="cf-phone" className="block font-sans text-sm font-medium text-foreground">
          Telefon <span className="text-muted">(isteğe bağlı)</span>
        </label>
        <input
          id="cf-phone"
          name="phone"
          inputMode="tel"
          autoComplete="tel"
          className={inputFieldClass}
        />
      </div>
      <div>
        <label htmlFor="cf-msg" className="block font-sans text-sm font-medium text-foreground">
          Mesaj <span className="text-accent">*</span>
        </label>
        <textarea
          id="cf-msg"
          name="message"
          rows={4}
          required
          className={`${inputFieldClass} min-h-[120px] resize-y`}
        />
      </div>
      <Button type="submit" variant="primary" className="w-full justify-center sm:w-auto">
        {cf.formSubmitLabel}
      </Button>
    </form>
  );
}
