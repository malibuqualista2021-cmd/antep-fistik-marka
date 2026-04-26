/**
 * Marka fotoğrafları — `public/images/site/` (kullanıcı sağladı).
 * Ortam değişkeni ile üzerine yazma: `lib/site.ts` içindeki `NEXT_PUBLIC_*` anahtarları.
 */
const root = "/images/site";

export const brandPhotos = {
  heroOrchard: `${root}/hero-orchard.png`,
  storeRange: `${root}/store-range.png`,
  bestsellersVariety: `${root}/bestsellers-variety.png`,
  categoryIc: `${root}/category-ic.png`,
  categoryKabuklu: `${root}/category-kabuklu.png`,
  categoryBozBaklavalik: `${root}/category-boz-baklavalik.png`,
  wholesaleDepo: `${root}/wholesale-depo.png`,
  packagingTaze: `${root}/packaging-taze.png`,
} as const;

export const brandPhotoAlts = {
  heroOrchard: "Gaziantep Nizip fıstık bahçesi; dalında olgunlaşan Antep fıstıkları.",
  heroThumbKabuklu: "Kasede kavrulmuş kabuklu Antep fıstığı sunumu.",
  heroThumbPackaging: "Tesiste tartılıp kraft ambalaja paketlenen taze Antep fıstığı.",
  storeRange: "Kabuklu, iç ve hediye paketleriyle Antep fıstığı perakende ürün serisi.",
  bestsellersVariety: "Ahşap sunum tepsisinde dört bölmede iç, kabuklu, boz iç ve öğütülmüş Antep fıstığı.",
  categoryIc: "Keten üzerinde taze ayıklanmış yeşil Antep fıstığı içi.",
  categoryKabuklu: "Kasede ikramlık kabuklu kavrulmuş Antep fıstığı; jüt arka plan.",
  categoryBozBaklavalik: "Baklavalık kullanım için bakır tepsi üzerinde yeşil Antep fıstığı tozu.",
  wholesaleDepo: "Gaziantep tesiste kalite kontrolü ve toplu Antep fıstığı hazırlığı.",
  packagingTaze: "Üretim tesisinde el ile tartılarak kraft torbaya doldurulan Antep fıstığı.",
  aboutProducer: "Gaziantep Nizip’te fıstık bahçesi — üretici menşe ve hasat ortamı.",
} as const;
