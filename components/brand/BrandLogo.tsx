import Image from "next/image";
import Link from "next/link";
import { brandLogo } from "@/lib/brand-logo";

export type BrandLogoVariant = "header" | "sidebar" | "footer" | "checkout";

const variantWidths: Record<BrandLogoVariant, string> = {
  /** Mobil küçük; tablet ve üstü kademeli genişler — oran sabit, esnetme yok */
  header: "w-[min(8.75rem,42vw)] min-[380px]:w-[min(9.75rem,40vw)] md:w-[min(11.25rem,32vw)]",
  sidebar: "w-full max-w-[10.5rem]",
  footer: "w-[min(13.5rem,88vw)] md:w-[min(15rem,92%)]",
  checkout: "w-[min(8.5rem,46vw)] md:w-[min(9.5rem,32vw)]",
};

type Props = {
  variant: BrandLogoVariant;
  /** Ana vitrinde LCP için */
  priority?: boolean;
  className?: string;
  onClick?: () => void;
};

export function BrandLogo({ variant, priority = false, className = "", onClick }: Props) {
  const ratio = `${brandLogo.width} / ${brandLogo.height}`;

  return (
    <Link
      href="/"
      onClick={onClick}
      className={`relative block shrink-0 ${variantWidths[variant]} ${className}`}
      style={{ aspectRatio: ratio }}
    >
      <Image
        src={brandLogo.fullSrc}
        alt={brandLogo.alt}
        fill
        priority={priority}
        sizes="(max-width: 768px) 160px, 220px"
        className="object-contain object-left"
      />
    </Link>
  );
}
