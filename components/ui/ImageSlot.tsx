import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  className?: string;
  /** `next/image` fill görseli — örn. object-position */
  imageClassName?: string;
  /** Tailwind aspect wrapper: e.g. "aspect-[16/11] w-full" */
  wrapperClassName: string;
  sizes: string;
  priority?: boolean;
  /** Varsayılan: priority değilse lazy */
  loading?: "eager" | "lazy";
};

/**
 * URL yoksa nötr boş görsel alanı; yerel (/...) veya tam URL kabul eder.
 * Tam URL’ler için native img kullanılır (CDN alan adı next.config’e eklemeniz gerekmez).
 */
export function ImageSlot({
  src,
  alt,
  className = "",
  imageClassName = "object-cover",
  wrapperClassName,
  sizes,
  priority,
  loading,
}: Props) {
  const load = loading ?? (priority ? "eager" : "lazy");
  if (!src.trim()) {
    return (
      <div
        className={`bg-gradient-to-br from-surface via-background to-surface ring-1 ring-inset ring-black/[0.07] ${wrapperClassName} ${className}`}
        aria-hidden
      />
    );
  }

  const isLocal = src.startsWith("/");

  return (
    <div className={`relative overflow-hidden ${wrapperClassName} ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className={imageClassName}
        sizes={sizes}
        priority={priority}
        loading={load}
        unoptimized={!isLocal}
      />
    </div>
  );
}
