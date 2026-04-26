/**
 * Marka görselleri: `public/images/pistachio/`.
 * Kullanıcının verdiği ürün fotoğrafları yerel dosya olarak tutulur.
 * Ortam değişkeni (`NEXT_PUBLIC_*`) doluysa site.ts üzerinden üzerine yazılır.
 */
const base = "/images/pistachio";

const stock = {
  /** İç fıstık - parçalı yeşil ürün dokusu */
  icFistikParca: `${base}/ic-fistik-parca.png`,
  /** İç fıstık / perakende sunum - kase kompozisyonu */
  icFistikKase: `${base}/ic-fistik-kase.png`,
  /** Boz iç - bütün iç ürün dokusu */
  bozIcButun: `${base}/boz-ic-butun.png`,
  /** Kabuklu / kavrulmuş fıstık yakın plan */
  kabukluKavrulmus: `${base}/kabuklu-kavrulmus.png`,
  /** Toptan / sevkiyat görseli */
  toptanCuval: `${base}/toptan-cuval-dukkan.png`,
  /** Paketleme / raf hissi */
  paketleme: `${base}/kutu-taze-hasat.png`,
} as const;

/** Hero kolajı: net, iştah açıcı ürün görselleri (Next `images.remotePatterns` ile uyumlu). .env ile tek tek üzerine yazılabilir. */
const heroUnsplash = {
  main: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=88&w=2000",
  packaging: "https://images.unsplash.com/photo-1526318896980-cf78c088247c?auto=format&fit=crop&q=88&w=1400",
  logistics: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&q=88&w=1400",
} as const;

export const pistachioImages = {
  hero: {
    main: heroUnsplash.main,
    packaging: heroUnsplash.packaging,
    logistics: heroUnsplash.logistics,
  },
  trust: {
    depot: stock.toptanCuval,
    packaging: stock.paketleme,
    product: stock.kabukluKavrulmus,
    quality: stock.bozIcButun,
  },
  about: {
    story: stock.icFistikKase,
  },
  products: {
    ic: stock.icFistikParca,
    kabuklu: stock.kabukluKavrulmus,
    boz: stock.bozIcButun,
    perakende: stock.icFistikKase,
    toptan: stock.toptanCuval,
  },
} as const;
