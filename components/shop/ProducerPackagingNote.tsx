import { producerCopy } from "@/lib/copy";

type Props = { className?: string };

/** Perakende / toptan ürün detaylarında üretici + taze paket vurgusu */
export function ProducerPackagingNote({ className = "" }: Props) {
  return (
    <p
      className={`rounded-[var(--radius-card)] border border-primary/20 bg-[color-mix(in_srgb,var(--primary)_7%,var(--cream))] px-4 py-3.5 font-sans text-sm leading-relaxed text-foreground ring-1 ring-black/[0.04] ${className}`}
    >
      <span className="font-semibold text-primary">Üreticiden · </span>
      {producerCopy.pdpPackagingLine}
    </p>
  );
}
