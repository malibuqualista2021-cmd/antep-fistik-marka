import { site } from "@/lib/site";

export type MediaSlot = {
  id: string;
  title: string;
  description: string;
  envKey: string;
  currentUrl: string;
};

export function mediaSlots(): MediaSlot[] {
  return [
    {
      id: "hero-main",
      title: "Hero ana görsel",
      description: "Ana sayfa ilk ekran büyük ürün görseli",
      envKey: "NEXT_PUBLIC_HERO_IMAGE_MAIN",
      currentUrl: site.heroImages.main,
    },
    {
      id: "hero-packaging",
      title: "Hero paket/sunum",
      description: "Ana sayfa ikinci görsel (paketli sunum)",
      envKey: "NEXT_PUBLIC_HERO_IMAGE_PACKAGING",
      currentUrl: site.heroImages.packaging,
    },
    {
      id: "hero-logistics",
      title: "Hero toptan/stok",
      description: "Ana sayfa üçüncü görsel (stok/sevkiyat)",
      envKey: "NEXT_PUBLIC_HERO_IMAGE_LOGISTICS",
      currentUrl: site.heroImages.logistics,
    },
    {
      id: "trust-depot",
      title: "Güven bandı depo",
      description: "Operasyon/depo görseli",
      envKey: "NEXT_PUBLIC_TRUST_IMAGE_DEPOT",
      currentUrl: site.trustImages.depot,
    },
    {
      id: "trust-packaging",
      title: "Güven bandı paketleme",
      description: "Paketleme/çıkış görseli",
      envKey: "NEXT_PUBLIC_TRUST_IMAGE_PACKAGING",
      currentUrl: site.trustImages.packaging,
    },
    {
      id: "trust-product",
      title: "Güven bandı ürün",
      description: "Ürün yakın plan görseli",
      envKey: "NEXT_PUBLIC_TRUST_IMAGE_PRODUCT",
      currentUrl: site.trustImages.product,
    },
    {
      id: "trust-quality",
      title: "Güven bandı kalite",
      description: "Kalite/eleme anlatan görsel",
      envKey: "NEXT_PUBLIC_TRUST_IMAGE_QUALITY",
      currentUrl: site.trustImages.quality,
    },
  ];
}
