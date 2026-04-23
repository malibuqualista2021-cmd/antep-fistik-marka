import type { b2bProcessSteps } from "@/lib/b2b-process";

type Step = (typeof b2bProcessSteps)[number];

type Props = {
  id: string;
  heading: string;
  intro?: string;
  steps: readonly Step[] | Step[];
  /** `vertical`: çizgili adım hattı; `horizontal`: kompakt kart şeridi */
  layout?: "vertical" | "horizontal";
};

export function ProcessRail({ id, heading, intro, steps, layout = "vertical" }: Props) {
  const list = [...steps];

  if (layout === "horizontal") {
    return (
      <section className="w-full" aria-labelledby={id}>
        <div className="mb-4 flex flex-col gap-1 md:flex-row md:items-end md:justify-between">
          <h2 id={id} className="font-serif text-xl text-foreground md:text-2xl">
            {heading}
          </h2>
          {intro ? (
            <p className="max-w-xl font-sans text-sm text-muted md:text-right">{intro}</p>
          ) : null}
        </div>
        <div className="-mx-1 flex gap-3 overflow-x-auto pb-1 pt-1 [scrollbar-width:thin] md:mx-0 md:grid md:grid-cols-4 md:gap-4 md:overflow-visible">
          {list.map((s, i) => (
            <article
              key={s.title}
              className="card-elevated min-w-[min(100%,280px)] shrink-0 snap-start rounded-[var(--radius-card)] p-4 md:min-w-0"
            >
              <span
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary font-sans text-sm font-semibold text-[var(--cream)]"
                aria-hidden
              >
                {i + 1}
              </span>
              <h3 className="mt-3 font-serif text-lg leading-snug text-foreground">{s.title}</h3>
              <p className="mt-2 font-sans text-sm leading-relaxed text-muted">{s.text}</p>
            </article>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="w-full" aria-labelledby={id}>
      <div className="max-w-3xl">
        <h2 id={id} className="font-serif text-2xl text-foreground md:text-[2.25rem]">
          {heading}
        </h2>
        {intro ? <p className="mt-3 font-sans text-muted md:text-lg">{intro}</p> : null}
      </div>
      <ol className="mt-10 max-w-2xl list-none space-y-0 p-0">
        {list.map((s, i) => (
          <li key={s.title} className="flex gap-4 md:gap-5">
            <div className="flex w-11 shrink-0 flex-col items-center md:w-12">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-primary/40 bg-background font-sans text-sm font-semibold text-primary md:h-10 md:w-10">
                {i + 1}
              </span>
              {i < list.length - 1 ? (
                <span
                  className="my-1 w-px flex-1 min-h-[2.5rem] bg-primary/20"
                  aria-hidden
                />
              ) : null}
            </div>
            <div className={i < list.length - 1 ? "pb-10" : ""}>
              <h3 className="font-serif text-xl text-foreground md:text-[1.35rem]">{s.title}</h3>
              <p className="mt-2 max-w-xl font-sans text-sm leading-relaxed text-muted md:text-base">
                {s.text}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
