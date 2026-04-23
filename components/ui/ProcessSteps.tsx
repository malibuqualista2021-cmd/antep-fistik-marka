type Step = { title: string; text: string };

type Props = {
  id?: string;
  heading: string;
  steps: Step[];
};

export function ProcessSteps({ id, heading, steps }: Props) {
  return (
    <section aria-labelledby={id} className="space-y-6">
      <h2 id={id} className="font-serif text-2xl text-foreground md:text-3xl">
        {heading}
      </h2>
      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <li
            key={s.title}
            className="relative rounded-[var(--radius-card)] border border-black/[0.06] bg-surface/80 p-5 ring-1 ring-black/[0.04]"
          >
            <span
              className="flex h-9 w-9 items-center justify-center rounded-full bg-primary font-sans text-sm font-bold text-[#F7F3EA]"
              aria-hidden
            >
              {i + 1}
            </span>
            <h3 className="mt-3 font-serif text-lg text-foreground">{s.title}</h3>
            <p className="mt-2 font-sans text-sm leading-relaxed text-muted">{s.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
