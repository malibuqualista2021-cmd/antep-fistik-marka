type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  id?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  id,
}: Props) {
  const alignCls = align === "center" ? "text-center mx-auto" : "";
  return (
    <div className={`max-w-3xl ${alignCls}`}>
      {eyebrow ? (
        <p className="mb-2 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-primary sm:text-sm">
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={id}
        className="font-serif text-[clamp(1.4rem,2.2vw+0.85rem,2.65rem)] font-semibold leading-[1.15] tracking-tight text-foreground"
      >
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-3 max-w-2xl font-sans text-base font-normal leading-relaxed text-muted sm:text-lg">{subtitle}</p>
      ) : null}
    </div>
  );
}
