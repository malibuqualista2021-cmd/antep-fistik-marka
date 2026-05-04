"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type Props = {
  imageSrc: string;
  imageAlt: string;
  extraImages?: string[];
};

export function RetailProductGallery({ imageSrc, imageAlt, extraImages }: Props) {
  const ordered = useMemo(() => [...new Set([imageSrc, ...(extraImages ?? [])])], [imageSrc, extraImages]);
  const [active, setActive] = useState(imageSrc);

  useEffect(() => {
    setActive(imageSrc);
  }, [imageSrc]);

  if (ordered.length <= 1) {
    return (
      <div className="relative aspect-square w-full overflow-hidden rounded-[var(--radius-card)] bg-surface shadow-[var(--shadow-soft)] ring-1 ring-[var(--line-soft)] md:aspect-[5/6]">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 55vw"
        />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="relative aspect-square w-full overflow-hidden rounded-[var(--radius-card)] bg-surface shadow-[var(--shadow-soft)] ring-1 ring-[var(--line-soft)] md:aspect-[5/6]">
        <Image
          src={active}
          alt={imageAlt}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 55vw"
        />
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Ürün görselleri">
        {ordered.map((src, i) => (
          <button
            key={src}
            type="button"
            role="tab"
            aria-selected={active === src}
            aria-label={`Görsel ${i + 1}`}
            onClick={() => setActive(src)}
            className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-lg ring-2 transition-[box-shadow] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
              active === src ? "ring-primary" : "ring-transparent hover:ring-primary/40"
            }`}
          >
            <Image src={src} alt="" fill className="object-cover" sizes="64px" />
          </button>
        ))}
      </div>
    </div>
  );
}
