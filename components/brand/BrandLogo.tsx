import Image from "next/image";
import Link from "next/link";
import { brandLogo } from "@/lib/brand-logo";

export type BrandLogoVariant = "header" | "sidebar" | "footer" | "checkout";

/** Yükseklik sabit, genişlik orandan gelir; max-w ile taşma önlenir — esnetme yok, gölge yok */
const variantClass: Record<BrandLogoVariant, string> = {
  header:
    "relative block h-8 max-h-8 w-auto max-w-[min(10.25rem,44vw)] aspect-[1024/576] min-[380px]:h-[2.125rem] min-[380px]:max-h-[2.125rem] md:h-9 md:max-h-9 md:max-w-[min(11.75rem,30vw)]",
  sidebar:
    "relative block h-8 max-h-8 w-auto max-w-[10rem] aspect-[1024/576] md:h-9 md:max-h-9",
  footer:
    "relative block h-7 max-h-7 w-auto max-w-[min(9rem,78vw)] aspect-[1024/576] md:h-8 md:max-h-8 md:max-w-[min(10rem,50%)]",
  checkout:
    "relative block h-7 max-h-7 w-auto max-w-[min(8.75rem,48vw)] aspect-[1024/576] md:h-8 md:max-h-8 md:max-w-[min(10rem,34vw)]",
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
    <Link href="/" onClick={onClick} className={`shrink-0 ${variantClass[variant]} ${className}`}>
      <Image
        src={brandLogo.fullSrc}
        alt={brandLogo.alt}
        fill
        priority={priority}
        sizes="(max-width: 768px) 140px, 200px"
        className="object-contain object-left"
      />
    </Link>
  );
}
