"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { announcementMessages } from "@/lib/store-navigation";

const INTERVAL_MS = 6000;

export function AnnouncementBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = window.setInterval(() => {
      setIndex((i) => (i + 1) % announcementMessages.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(t);
  }, []);

  return (
    <div className="announcement-bar">
      <Container className="flex min-h-[2rem] items-center justify-center py-1 sm:min-h-[2.25rem]">
        <p
          className="text-center font-sans text-[13px] font-medium leading-tight tracking-wide text-[var(--announcement-fg)]"
          role="status"
          aria-live="polite"
        >
          <span className="text-[var(--color-gold)]" aria-hidden>
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
