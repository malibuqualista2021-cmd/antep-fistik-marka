import { SectionShell } from "@/components/ui/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { approachPillars } from "@/lib/home-sections";

export function ApproachStrip() {
  return (
    <SectionShell tone="line">
      <SectionHeading
        id="approach-heading"
        eyebrow="Operasyon"
        title="Kalite, seçim ve sevkiyat: tek çizgide anlatım"
        subtitle="Görseller süs değil; hangi kabukta hangi kullanım için çıktığını ve hangi ambalajda hangi rotaya gittiğini düşünerek seçilir."
      />
      <ul className="mt-10 grid gap-5 md:grid-cols-3 md:gap-6">
        {approachPillars.map((p, i) => (
          <li
            key={p.title}
            className="card-elevated rounded-[var(--radius-card)] p-5 transition-shadow duration-200 hover:shadow-[var(--shadow-lift)] md:p-6"
          >
            <div
              className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/[0.1] font-serif text-lg font-semibold text-primary ring-1 ring-primary/20"
              aria-hidden
            >
              {i + 1}
            </div>
            <h3 className="mt-4 font-serif text-xl text-foreground">{p.title}</h3>
            <p className="mt-2 font-sans text-sm leading-relaxed text-muted">{p.text}</p>
          </li>
        ))}
      </ul>
      <p className="mx-auto mt-10 max-w-3xl text-center font-sans text-sm leading-relaxed text-muted">
        Fiyat; işleme durumu, parti, gramaj veya torba ağırlığı, teslim ili ve nakliye
        seçimine göre değişir. Net teklif için ürün adı ve yaklaşık miktar yeterlidir;
        toplu alımlarda parti bazlı birim iyileşmesi mümkündür.
      </p>
    </SectionShell>
  );
}
