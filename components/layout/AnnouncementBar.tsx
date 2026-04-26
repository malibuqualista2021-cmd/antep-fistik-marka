"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { announcementMessages } from "@/lib/store-navigation";

const INTERVAL_MS = 5000;

export function AnnouncementBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = window.setInterval(() => {
      setIndex((i) => (i + 1) % announcementMessages.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(t);
  }, []);

  return (
    <div className="border-b border-[var(--border-subtle)] bg-[var(--paper)]">
      <Container className="py-2 text-center">
        <p
          className="font-sans text-[11px] font-medium leading-snug text-muted md:text-xs"
          role="status"
          aria-live="polite"
        >
          <span className="text-[var(--gold-muted)]" aria-hidden>
            ●
          </span>{" "}
          <span key={index} className="inline-block animate-fade-announce">
            {announcementMessages[index]}
          </span>
        </p>
      </Container>
    </div>
  );
}
