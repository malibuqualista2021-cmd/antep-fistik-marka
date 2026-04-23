import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";

type Tone = "default" | "muted" | "line";

const tones: Record<Tone, string> = {
  default: "bg-background",
  muted: "bg-surface/35",
  line: "bg-background border-y border-black/[0.06]",
};

type Props = {
  children: ReactNode;
  tone?: Tone;
  /** Ek section sınıfları */
  className?: string;
  containerClassName?: string;
};

export function SectionShell({
  children,
  tone = "default",
  className = "",
  containerClassName = "",
}: Props) {
  return (
    <div className={`section-y ${tones[tone]} ${className}`}>
      <Container className={containerClassName}>{children}</Container>
    </div>
  );
}
