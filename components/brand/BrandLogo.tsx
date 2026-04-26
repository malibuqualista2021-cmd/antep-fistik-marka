import Image from "next/image";
import Link from "next/link";
import { brandLogo } from "@/lib/brand-logo";

export type BrandLogoVariant = "header" | "sidebar" | "footer" | "checkout";

const ratioStyle = { aspectRatio: `${brandLogo.width} / ${brandLogo.height}` } as const;

/** Yükseklik + max genişlik; oran `brandLogo` piksel oranı — esnetme / gölge yok */
const variantClass: Record<BrandLogoVariant, string> = {
  header:
    "relative block h-10 max-h-10 w-auto max-w-[min(12.5rem,50vw)] md:h-11 md:max-h-11 md:max-w-[min(15.5rem,32vw)] lg:max-w-[min(17rem,24vw)]",
  sidebar:
    "relative block h-9 max-h-9 w-auto max-w-[11rem] md:h-10 md:max-h-10",
  footer:
    "relative block h-7 max-h-7 w-auto max-w-[min(9.5rem,78vw)] md:h-8 md:max-h-8 md:max-w-[min(10.5rem,50%)]",
  checkout:
    "relative block h-7 max-h-7 w-auto max-w-[min(9rem,48vw)] md:h-8 md:max-h-8 md:max-w-[min(10.5rem,34vw)]",
};

type Props = {
  variant: BrandLogoVariant;
  /** Ana vitrinde LCP için */
  priority?: boolean;
  className?: string;
  onClick?: () => void;
};

export function BrandLogo({ variant, priority = false, className = "", onClick }: Props) {
  return (
    <Link
      href="/"
      onClick={onClick}
      style={ratioStyle}
      className={`shrink-0 ${variantClass[variant]} ${className}`}
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
