/**
 * Site genelinde kullanılan ürün / vitrin görselleri.
 * Kaynak dosyalar: `public/images/site/` — `lib/site-images.ts`.
 */
import { brandPhotos } from "@/lib/site-images";

export const pistachioImages = {
  hero: {
    main: brandPhotos.heroOrchard,
    packaging: brandPhotos.categoryKabuklu,
    logistics: brandPhotos.packagingTaze,
  },
  trust: {
    depot: brandPhotos.wholesaleDepo,
    packaging: brandPhotos.packagingTaze,
    product: brandPhotos.categoryKabuklu,
    quality: brandPhotos.categoryBozBaklavalik,
  },
  about: {
    story: brandPhotos.heroOrchard,
  },
  products: {
    ic: brandPhotos.categoryIc,
    kabuklu: brandPhotos.categoryKabuklu,
    boz: brandPhotos.categoryBozBaklavalik,
    perakende: brandPhotos.storeRange,
    toptan: brandPhotos.wholesaleDepo,
  },
} as const;
