"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/components/shop/CartProvider";
import { formatMoney } from "@/lib/shop-products";
import { inputFieldClass } from "@/lib/form-classes";
import type { BillingInfo, CustomerInfo, OrderRecord } from "@/lib/orders";
import { normalizeLegacyOrder } from "@/lib/orders";
import { LS, readWithLegacyMigrate } from "@/lib/storage-keys";
import type { CheckoutPaymentMethodCode } from "@/lib/payment/types";
import { getPaymentGatewayMode } from "@/lib/payment/config";

const ORDERS_KEY = LS.orders.key;

const STEPS = [
  { id: 1 as const, label: "Teslimat" },
  { id: 2 as const, label: "Fatura" },
  { id: 3 as const, label: "Özet" },
  { id: 4 as const, label: "Ödeme" },
];

const PAYMENT_OPTIONS: { code: CheckoutPaymentMethodCode; label: string; hint: string }[] = [
  { code: "card", label: "Kredi / banka kartı", hint: "Ödeme altyapısı bağlandığında güvenli ödeme sayfasına yönlendirilirsiniz." },
  { code: "bank_transfer", label: "Havale / EFT", hint: "IBAN ve sipariş referansı sipariş sonrası iletilecek." },
  { code: "cash_on_delivery", label: "Kapıda ödeme", hint: "Teslimatta nakit veya POS ile ödeme." },
  { code: "wallet_other", label: "Mobil cüzdan / diğer", hint: "Sağlayıcı anlaşmasına göre seçenekler eklenecek." },
];

function trimNote(note: string): string | undefined {
  const t = note.trim();
  return t === "" ? undefined : t;
}

function validateCustomer(c: CustomerInfo): string | null {
  if (!c.fullName.trim()) return "Ad soyad zorunludur.";
  if (!c.phone.trim()) return "Telefon zorunludur.";
  if (!c.email.trim()) return "E-posta zorunludur.";
  if (!c.city.trim()) return "İl zorunludur.";
  if (!c.district.trim()) return "İlçe zorunludur.";
  if (!c.address.trim()) return "Açık adres zorunludur.";
  return null;
}

function validateBilling(b: BillingInfo): string | null {
  if (b.invoiceType === "company") {
    if (!b.companyTitle?.trim()) return "Şirket ünvanı zorunludur.";
    if (!b.taxNumber?.trim()) return "Vergi numarası zorunludur.";
  }
  if (!b.sameAsShipping) {
    if (!b.billingFullName?.trim()) return "Fatura adı soyadı zorunludur.";
    if (!b.billingCity?.trim()) return "Fatura ili zorunludur.";
    if (!b.billingDistrict?.trim()) return "Fatura ilçesi zorunludur.";
    if (!b.billingAddress?.trim()) return "Fatura adresi zorunludur.";
  }
  return null;
}

function PaymentInfraBanner() {
  const mode = getPaymentGatewayMode();
  if (mode === "sandbox") {
    return (
      <div className="rounded-[var(--radius-input)] border border-amber-200 bg-amber-50 px-4 py-3 font-sans text-sm text-amber-950">
        <strong className="font-semibold">Test / sandbox modu:</strong> gerçek tahsilat yapılmaz; sipariş ödeme durumu{" "}
        <span className="font-medium">beklemede</span> olarak kaydedilir.
      </div>
    );
  }
  return (
    <div className="rounded-[var(--radius-input)] border border-[var(--line-medium)] bg-surface px-4 py-3 font-sans text-sm text-muted">
      <strong className="font-semibold text-foreground">Ödeme altyapısı yakında aktif olacaktır.</strong> Siparişiniz kaydedilir;
      ödeme tamamlandığında durum güncellenecektir.
    </div>
  );
}

export function CheckoutPageClient() {
  const router = useRouter();
  const { items, total, clearCart } = useCart();
  const [step, setStep] = useState<(typeof STEPS)[number]["id"]>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [customer, setCustomer] = useState<CustomerInfo>({
    fullName: "",
    phone: "",
    email: "",
    city: "",
    district: "",
    address: "",
    note: "",
  });

  const [billing, setBilling] = useState<BillingInfo>({
    invoiceType: "individual",
    companyTitle: "",
    taxOffice: "",
    taxNumber: "",
    sameAsShipping: true,
    billingFullName: "",
    billingCity: "",
    billingDistrict: "",
    billingAddress: "",
  });

  const [paymentMethod, setPaymentMethod] = useState<CheckoutPaymentMethodCode>("card");
  const [legalAccepted, setLegalAccepted] = useState(false);

  const customerPayload = useMemo(
    () => ({
      ...customer,
      note: trimNote(customer.note ?? ""),
    }),
    [customer],
  );

  function goNext() {
    setError("");
    if (step === 1) {
      const msg = validateCustomer({ ...customerPayload, note: customerPayload.note ?? "" });
      if (msg) {
        setError(msg);
        return;
      }
    }
    if (step === 2) {
      const msg = validateBilling(billing);
      if (msg) {
        setError(msg);
        return;
      }
    }
    setStep((s) => (s < 4 ? ((s + 1) as (typeof STEPS)[number]["id"]) : s));
  }

  function goBack() {
    setError("");
    setStep((s) => (s > 1 ? ((s - 1) as (typeof STEPS)[number]["id"]) : s));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (items.length === 0) {
      setError("Sepetiniz boş.");
      return;
    }
    const cErr = validateCustomer({ ...customerPayload, note: customerPayload.note ?? "" });
    const bErr = validateBilling(billing);
    if (cErr || bErr) {
      setError(cErr || bErr || "");
      return;
    }
    if (!legalAccepted) {
      setError("Devam etmek için sözleşmeleri onaylamanız gerekir.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          customer: customerPayload,
          billing,
          paymentMethod,
          items,
        }),
      });
      const data = (await res.json()) as { ok: boolean; order?: OrderRecord; message?: string };
      if (!res.ok || !data.ok || !data.order) {
        setError(data.message || "Sipariş oluşturulamadı.");
        return;
      }

      readWithLegacyMigrate(ORDERS_KEY, LS.orders.legacy);
      const rawExisting = JSON.parse(window.localStorage.getItem(ORDERS_KEY) || "[]") as unknown;
      const existingList = Array.isArray(rawExisting) ? rawExisting : [];
      const existing = existingList
        .map((row) => normalizeLegacyOrder(row))
        .filter((o): o is OrderRecord => o !== null);
      window.localStorage.setItem(ORDERS_KEY, JSON.stringify([data.order, ...existing]));
      clearCart();
      router.push(`/siparis-basarili?order=${encodeURIComponent(data.order.id)}`);
    } catch {
      setError("Bağlantı hatası. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="card-elevated rounded-[var(--radius-card)] p-6">
        <p className="font-sans text-sm text-muted">Ödeme adımına geçmek için önce sepete ürün ekleyin.</p>
        <Button href="/urunler#perakende-satin-al" className="mt-4">
          Ürünlere git
        </Button>
      </div>
    );
  }

  const aside = (
    <aside className="card-elevated rounded-[var(--radius-card)] p-5 md:p-6 lg:sticky lg:top-28">
      <h2 className="font-serif text-2xl text-foreground">Sepet</h2>
      <ul className="mt-4 space-y-3 border-t border-[var(--line-medium)] pt-4">
        {items.map((item) => (
          <li key={item.product.id} className="flex justify-between gap-3 font-sans text-sm">
            <span className="text-muted">
              {item.product.name} × {item.quantity}
            </span>
            <span className="text-price text-sm">{formatMoney(item.product.price * item.quantity, item.product.currency)}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex justify-between border-t border-[var(--line-medium)] pt-4 font-sans">
        <span className="text-muted">Ara toplam</span>
        <strong className="text-price text-lg">{formatMoney(total)}</strong>
      </div>
      <p className="mt-3 font-sans text-xs text-muted">Kargo ve vergi satırı ödeme sağlayıcısı bağlandığında netleştirilebilir.</p>
    </aside>
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_340px] lg:items-start">
      <div className="card-elevated rounded-[var(--radius-card)] p-6 md:p-8">
        <nav aria-label="Checkout adımları" className="flex flex-wrap gap-2 border-b border-[var(--line-soft)] pb-4">
          {STEPS.map((s) => {
            const active = step === s.id;
            const done = step > s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  if (done || active) {
                    setError("");
                    setStep(s.id);
                  }
                }}
                disabled={!done && !active}
                className={`rounded-full px-3 py-1.5 font-sans text-sm transition ${
                  active
                    ? "bg-primary text-[var(--on-primary)]"
                    : done
                      ? "bg-surface text-foreground ring-1 ring-[var(--line-medium)] hover:bg-background"
                      : "cursor-not-allowed text-muted opacity-60"
                }`}
              >
                {s.id}. {s.label}
              </button>
            );
          })}
        </nav>

        {step === 1 ? (
          <div className="mt-6 space-y-4">
            <h2 className="font-serif text-2xl text-foreground">Teslimat bilgileri</h2>
            <p className="font-sans text-sm text-muted">Sipariş ve kargo iletişimi için kullanılacaktır.</p>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="block">
                <span className="text-sm font-medium text-foreground">Ad Soyad *</span>
                <input
                  value={customer.fullName}
                  onChange={(e) => setCustomer((c) => ({ ...c, fullName: e.target.value }))}
                  required
                  autoComplete="name"
                  className={inputFieldClass}
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-foreground">Telefon *</span>
                <input
                  value={customer.phone}
                  onChange={(e) => setCustomer((c) => ({ ...c, phone: e.target.value }))}
                  required
                  inputMode="tel"
                  autoComplete="tel"
                  className={inputFieldClass}
                />
              </label>
              <label className="block md:col-span-2">
                <span className="text-sm font-medium text-foreground">E-posta *</span>
                <input
                  value={customer.email}
                  onChange={(e) => setCustomer((c) => ({ ...c, email: e.target.value }))}
                  required
                  type="email"
                  autoComplete="email"
                  className={inputFieldClass}
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-foreground">İl *</span>
                <input value={customer.city} onChange={(e) => setCustomer((c) => ({ ...c, city: e.target.value }))} required className={inputFieldClass} />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-foreground">İlçe *</span>
                <input
                  value={customer.district}
                  onChange={(e) => setCustomer((c) => ({ ...c, district: e.target.value }))}
                  required
                  className={inputFieldClass}
                />
              </label>
              <label className="block md:col-span-2">
                <span className="text-sm font-medium text-foreground">Açık adres *</span>
                <textarea
                  value={customer.address}
                  onChange={(e) => setCustomer((c) => ({ ...c, address: e.target.value }))}
                  required
                  rows={3}
                  className={`${inputFieldClass} min-h-[110px] resize-y`}
                />
              </label>
              <label className="block md:col-span-2">
                <span className="text-sm font-medium text-foreground">Teslimat notu</span>
                <textarea
                  value={customer.note ?? ""}
                  onChange={(e) => setCustomer((c) => ({ ...c, note: e.target.value }))}
                  rows={2}
                  className={`${inputFieldClass} min-h-[88px] resize-y`}
                />
              </label>
            </div>
          </div>
        ) : null}

        {step === 2 ? (
          <div className="mt-6 space-y-4">
            <h2 className="font-serif text-2xl text-foreground">Fatura bilgileri</h2>
            <fieldset className="space-y-3 font-sans text-sm">
              <legend className="sr-only">Fatura tipi</legend>
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="radio"
                  name="invoiceType"
                  checked={billing.invoiceType === "individual"}
                  onChange={() => setBilling((b) => ({ ...b, invoiceType: "individual" }))}
                  className="h-4 w-4 accent-primary"
                />
                Bireysel fatura
              </label>
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="radio"
                  name="invoiceType"
                  checked={billing.invoiceType === "company"}
                  onChange={() => setBilling((b) => ({ ...b, invoiceType: "company" }))}
                  className="h-4 w-4 accent-primary"
                />
                Kurumsal fatura
              </label>
            </fieldset>

            {billing.invoiceType === "company" ? (
              <div className="grid gap-4 md:grid-cols-2">
                <label className="block md:col-span-2">
                  <span className="text-sm font-medium text-foreground">Şirket ünvanı *</span>
                  <input
                    value={billing.companyTitle ?? ""}
                    onChange={(e) => setBilling((b) => ({ ...b, companyTitle: e.target.value }))}
                    className={inputFieldClass}
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-foreground">Vergi dairesi</span>
                  <input value={billing.taxOffice ?? ""} onChange={(e) => setBilling((b) => ({ ...b, taxOffice: e.target.value }))} className={inputFieldClass} />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-foreground">Vergi no *</span>
                  <input value={billing.taxNumber ?? ""} onChange={(e) => setBilling((b) => ({ ...b, taxNumber: e.target.value }))} className={inputFieldClass} />
                </label>
              </div>
            ) : null}

            <label className="flex cursor-pointer items-start gap-3 font-sans text-sm text-muted">
              <input
                type="checkbox"
                checked={billing.sameAsShipping}
                onChange={(e) => setBilling((b) => ({ ...b, sameAsShipping: e.target.checked }))}
                className="mt-1 h-4 w-4 accent-primary"
              />
              <span>Fatura adresi teslimat adresi ile aynı</span>
            </label>

            {!billing.sameAsShipping ? (
              <div className="grid gap-4 md:grid-cols-2">
                <label className="block md:col-span-2">
                  <span className="text-sm font-medium text-foreground">Fatura adı soyadı / unvan *</span>
                  <input
                    value={billing.billingFullName ?? ""}
                    onChange={(e) => setBilling((b) => ({ ...b, billingFullName: e.target.value }))}
                    className={inputFieldClass}
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-foreground">Fatura ili *</span>
                  <input value={billing.billingCity ?? ""} onChange={(e) => setBilling((b) => ({ ...b, billingCity: e.target.value }))} className={inputFieldClass} />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-foreground">Fatura ilçesi *</span>
                  <input
                    value={billing.billingDistrict ?? ""}
                    onChange={(e) => setBilling((b) => ({ ...b, billingDistrict: e.target.value }))}
                    className={inputFieldClass}
                  />
                </label>
                <label className="block md:col-span-2">
                  <span className="text-sm font-medium text-foreground">Fatura adresi *</span>
                  <textarea
                    value={billing.billingAddress ?? ""}
                    onChange={(e) => setBilling((b) => ({ ...b, billingAddress: e.target.value }))}
                    rows={3}
                    className={`${inputFieldClass} min-h-[100px] resize-y`}
                  />
                </label>
              </div>
            ) : null}
          </div>
        ) : null}

        {step === 3 ? (
          <div className="mt-6 space-y-6 font-sans text-sm">
            <h2 className="font-serif text-2xl text-foreground">Sipariş özeti</h2>
            <div className="rounded-[var(--radius-input)] bg-background p-4 ring-1 ring-[var(--line-soft)]">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-foreground">Teslimat</h3>
                <button type="button" className="text-primary underline" onClick={() => setStep(1)}>
                  Düzenle
                </button>
              </div>
              <p className="mt-2 text-muted">
                {customer.fullName} · {customer.phone}
                <br />
                {customer.email}
                <br />
                {customer.district} / {customer.city}
                <br />
                {customer.address}
                {customer.note?.trim() ? (
                  <>
                    <br />
                    <span className="italic">Not: {customer.note}</span>
                  </>
                ) : null}
              </p>
            </div>
            <div className="rounded-[var(--radius-input)] bg-background p-4 ring-1 ring-[var(--line-soft)]">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-foreground">Fatura</h3>
                <button type="button" className="text-primary underline" onClick={() => setStep(2)}>
                  Düzenle
                </button>
              </div>
              <p className="mt-2 text-muted">
                {billing.invoiceType === "individual" ? "Bireysel" : "Kurumsal"}
                {billing.invoiceType === "company" ? (
                  <>
                    <br />
                    {billing.companyTitle}
                    <br />
                    VD: {billing.taxOffice || "—"} · VN: {billing.taxNumber}
                  </>
                ) : null}
                <br />
                {billing.sameAsShipping ? (
                  "Fatura adresi: teslimat ile aynı"
                ) : (
                  <>
                    {billing.billingFullName}
                    <br />
                    {billing.billingDistrict} / {billing.billingCity}
                    <br />
                    {billing.billingAddress}
                  </>
                )}
              </p>
            </div>
          </div>
        ) : null}

        {step === 4 ? (
          <form className="mt-6 space-y-6" onSubmit={submit}>
            <h2 className="font-serif text-2xl text-foreground">Ödeme yöntemi</h2>
            <PaymentInfraBanner />
            <fieldset className="space-y-3">
              <legend className="sr-only">Ödeme seçimi</legend>
              {PAYMENT_OPTIONS.map((opt) => (
                <label
                  key={opt.code}
                  className={`flex cursor-pointer gap-3 rounded-[var(--radius-input)] border p-4 transition ${
                    paymentMethod === opt.code ? "border-primary bg-primary/5 ring-1 ring-primary/30" : "border-[var(--line-medium)] hover:bg-surface/50"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === opt.code}
                    onChange={() => setPaymentMethod(opt.code)}
                    className="mt-1 h-4 w-4 accent-primary"
                  />
                  <span>
                    <span className="block font-medium text-foreground">{opt.label}</span>
                    <span className="mt-1 block text-xs text-muted">{opt.hint}</span>
                  </span>
                </label>
              ))}
            </fieldset>
            <label className="flex gap-3 font-sans text-sm text-muted">
              <input type="checkbox" checked={legalAccepted} onChange={(e) => setLegalAccepted(e.target.checked)} className="mt-1 h-4 w-4 accent-primary" />
              <span>
                <a href="/kvkk-gizlilik" className="font-semibold text-primary underline">
                  KVKK ve gizlilik
                </a>{" "}
                metnini,{" "}
                <a href="/mesafeli-satis-sozlesmesi" className="font-semibold text-primary underline">
                  mesafeli satış sözleşmesini
                </a>{" "}
                ve{" "}
                <a href="/on-bilgilendirme-formu" className="font-semibold text-primary underline">
                  ön bilgilendirme formunu
                </a>{" "}
                okudum, onaylıyorum.
              </span>
            </label>
            {error ? <p className="text-sm text-red-700">{error}</p> : null}
            <div className="flex flex-wrap gap-3">
              <Button type="submit" disabled={loading}>
                {loading ? "Sipariş oluşturuluyor..." : "Siparişi onayla"}
              </Button>
            </div>
          </form>
        ) : null}

        {step < 4 ? (
          <div className="mt-8 flex flex-wrap gap-3 border-t border-[var(--line-soft)] pt-6">
            {step > 1 ? (
              <Button type="button" variant="secondary" onClick={goBack}>
                Geri
              </Button>
            ) : null}
            <Button type="button" onClick={goNext}>
              Devam
            </Button>
            {error ? <p className="w-full text-sm text-red-700">{error}</p> : null}
          </div>
        ) : null}
      </div>

      {aside}
    </div>
  );
}
