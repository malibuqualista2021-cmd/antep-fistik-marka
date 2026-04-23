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
        <p className="font-sans text-sm font-medium uppercase tracking-wider text-accent mb-2">
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={id}
        className="font-serif text-[1.75rem] leading-tight text-foreground sm:text-[2.5rem] md:text-[2.75rem]"
      >
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-3 font-sans text-lg text-muted max-w-2xl">{subtitle}</p>
      ) : null}
    </div>
  );
}
