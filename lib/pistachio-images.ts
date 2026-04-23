/**
 * Yerel marka görselleri: `public/images/pistachio/` (yüksek çözünürlüklü PNG).
 * Ortam değişkeni (`NEXT_PUBLIC_*`) doluysa site.ts üzerinden üzerine yazılır.
 */
const base = "/images/pistachio";

export const pistachioImages = {
  hero: {
    /** Kavrulmuş kabuklu — yoğun ürün çerçevesi */
    main: `${base}/kavrulmus-kabuklu-yigin.png`,
    /** Tabakta kabuklu, iç ve öğütülmüş — çeşit / sunum */
    packaging: `${base}/premium-urun-serimi.png`,
    /** Toptan: çuval ve dükkân stoğu */
    logistics: `${base}/toptan-cuval-dukkan.png`,
  },
  trust: {
    depot: `${base}/toptan-cuval-dukkan.png`,
    packaging: `${base}/kutu-taze-hasat.png`,
    product: `${base}/kavrulmus-kabuklu-yigin.png`,
    quality: `${base}/ic-yesil-cekirdek.png`,
  },
  about: {
    /** Dal üzerinde ham ürün — köken / güven */
    story: `${base}/dal-agac-orchard.png`,
  },
  products: {
    ic: `${base}/ic-yesil-cekirdek.png`,
    kabuklu: `${base}/tas-kase-rustik.png`,
    boz: `${base}/kirkbacak-doku.png`,
    perakende: `${base}/kavanoz-ahsap.png`,
    toptan: `${base}/toptan-cuval-dukkan.png`,
  },
} as const;
