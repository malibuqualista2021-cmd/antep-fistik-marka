import { SectionShell } from "@/components/ui/SectionShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { whyUsPillars } from "@/lib/home-sections";

export function WhyUs() {
  return (
    <SectionShell tone="default">
      <SectionHeading
        id="why-heading"
        eyebrow="Neden biz"
        title="Ticari akıl: vaat değil, ölçülebilir söz"
        subtitle="Satın alma ve üretim tarafında aynı sorulara net cevap: parti ne, teklif nasıl yazılıyor, sevkiyat ne zaman çıkıyor."
      />
      <ul className="mt-10 grid gap-5 md:grid-cols-2 md:gap-6">
        {whyUsPillars.map((p) => (
          <li
            key={p.title}
            className="card-elevated rounded-[var(--radius-card)] p-5 transition-shadow duration-200 hover:shadow-[var(--shadow-lift)] md:p-6"
          >
            <h3 className="font-serif text-xl text-foreground md:text-[1.35rem]">{p.title}</h3>
            <p className="mt-2 font-sans text-sm leading-relaxed text-muted">{p.text}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {p.marks.map((m) => (
                <li
                  key={m}
                  className="rounded-full bg-primary/[0.07] px-2.5 py-1 font-sans text-[11px] font-medium text-primary ring-1 ring-primary/15"
                >
                  {m}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}
