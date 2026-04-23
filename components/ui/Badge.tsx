import type { ReactNode } from "react";

type Tone = "neutral" | "accent" | "primary";

const tones: Record<Tone, string> = {
  neutral:
    "bg-background/90 text-foreground/90 ring-1 ring-black/[0.08]",
  accent: "bg-accent/12 text-foreground ring-1 ring-accent/25",
  primary: "bg-primary/10 text-primary ring-1 ring-primary/20",
};

type Props = {
  children: ReactNode;
  tone?: Tone;
  className?: string;
};

export function Badge({ children, tone = "neutral", className = "" }: Props) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-sans text-[11px] font-semibold uppercase tracking-wide ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
