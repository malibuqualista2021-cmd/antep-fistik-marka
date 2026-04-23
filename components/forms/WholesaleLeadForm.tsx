"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { site, waLink } from "@/lib/site";
import { inputFieldClass } from "@/lib/form-classes";
import { cta } from "@/lib/cta";

type Props = {
  source?: string;
};

export function WholesaleLeadForm({ source = "page" }: Props) {
  const [sent, setSent] = useState(false);
  const submitLabel = cta.wholesalePage.formSubmitLabel;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  if (sent) {
    return (
      <div className="space-y-3" role="status">
        <p className="font-sans text-sm font-medium text-primary">
          Teşekkürler. Talebiniz alındı. {site.responseTimeHint}
        </p>
        <p className="font-sans text-sm text-muted">
          Ek bilgi için{" "}
          <Link
            href={waLink("Toptan talep formu doldurdum, devam etmek istiyorum.")}
            className="font-semibold text-primary underline-offset-2 hover:underline"
          >
            WhatsApp
          </Link>{" "}
          kullanabilirsiniz.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input type="hidden" name="source" value={source} />
        <div>
          <label htmlFor="wl-name" className="block font-sans text-sm font-medium text-foreground">
            Ad Soyad <span className="text-accent">*</span>
          </label>
          <input
            id="wl-name"
            name="name"
            required
            autoComplete="name"
            className={inputFieldClass}
          />
        </div>
        <div>
          <label htmlFor="wl-phone" className="block font-sans text-sm font-medium text-foreground">
            Telefon <span className="text-accent">*</span>
          </label>
          <input
            id="wl-phone"
            name="phone"
            required
            inputMode="tel"
            autoComplete="tel"
            className={inputFieldClass}
          />
        </div>
        <div>
          <label htmlFor="wl-co" className="block font-sans text-sm font-medium text-foreground">
            İşletme adı <span className="text-muted">(isteğe bağlı)</span>
          </label>
          <input
            id="wl-co"
            name="company"
            autoComplete="organization"
            className={inputFieldClass}
          />
        </div>
        <div>
          <label htmlFor="wl-note" className="block font-sans text-sm font-medium text-foreground">
            Ürün / miktar / teslim ili <span className="text-accent">*</span>
          </label>
          <textarea
            id="wl-note"
            name="note"
            required
            rows={4}
            className={`${inputFieldClass} min-h-[120px] resize-y`}
          />
        </div>
        <Button type="submit" variant="primary" className="w-full justify-center text-base">
          {submitLabel}
        </Button>
      </form>
      {site.whatsappE164 ? (
        <p className="text-center font-sans text-sm text-muted">
          <a
            href={waLink(cta.wholesalePage.waMessage)}
            className="font-semibold text-primary underline-offset-2 hover:underline"
          >
            {cta.wholesalePage.waLabel}
          </a>
        </p>
      ) : null}
      {site.phone ? (
        <div className="rounded-[var(--radius-card)] border border-primary/10 bg-background/80 px-4 py-3 text-center font-sans text-sm text-muted">
          <span className="font-medium text-foreground">Hızlı hat: </span>
          <a
            href={`tel:${site.phoneE164}`}
            className="font-semibold text-primary underline-offset-2 hover:underline"
          >
            {site.phone}
          </a>
        </div>
      ) : null}
    </div>
  );
}
