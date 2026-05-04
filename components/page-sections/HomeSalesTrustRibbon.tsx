import Link from "next/link";
import { Container } from "@/components/ui/Container";

const ribbonItems = [
  {
    title: "Güvenli sipariş",
    text: "Sepet ve teslimat bilgileriyle kayıt; destek hattı açık.",
    href: "/iletisim" as const,
  },
  {
    title: "Taze paketleme",
    text: "Gramaja göre siparişe yakın hazırlık.",
    href: "/hakkimizda" as const,
  },
  {
    title: "Hızlı kargo",
    text: "Perakende paketlerde hedef 1–3 iş günü.",
    href: "/kargo-teslimat" as const,
  },
  {
    title: "WhatsApp destek",
    text: "Sipariş öncesi ve sonrası hızlı iletişim.",
    href: "/iletisim" as const,
  },
] as const;

/** Ana vitrin altı — kompakt güven şeridi */
export function HomeSalesTrustRibbon() {
  return (
    <section className="border-b border-[var(--line-soft)] bg-[var(--color-surface-alt)]/65 py-6 md:py-8" aria-labelledby="sales-trust-ribbon-heading">
      <Container>
        <h2 id="sales-trust-ribbon-heading" className="sr-only">
          Güven ve teslimat özeti
        </h2>
        <ul className="flex gap-3 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] md:grid md:grid-cols-4 md:gap-4 md:overflow-visible [&::-webkit-scrollbar]:hidden">
          {ribbonItems.map((item) => (
            <li key={item.title} className="min-w-[78vw] shrink-0 sm:min-w-[220px] md:min-w-0">
              <Link
                href={item.href}
                className="flex h-full flex-col rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-[0_1px_3px_rgb(36_23_15_/0.05)] transition-colors hover:border-primary/35 hover:bg-[var(--color-green-soft)]/40 md:p-5"
              >
                <span className="font-serif text-base font-semibold text-foreground md:text-lg">{item.title}</span>
                <span className="mt-1.5 font-sans text-sm leading-snug text-muted">{item.text}</span>
                <span className="mt-3 font-sans text-xs font-semibold text-primary">Detay →</span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
