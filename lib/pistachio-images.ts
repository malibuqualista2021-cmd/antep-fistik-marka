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

export const pistachioImages = {
  /** Yalnızca marka fıstık görselleri — stok dışı URL kullanmayın (yanlış ürün riski). .env `NEXT_PUBLIC_HERO_IMAGE_*` ile üzerine yazılır. */
  hero: {
    main: stock.kabukluKavrulmus,
    packaging: stock.icFistikKase,
    logistics: stock.paketleme,
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
