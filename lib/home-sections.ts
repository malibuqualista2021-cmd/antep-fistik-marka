/** Ana sayfa bölümleri — tek kaynak, düzenlenebilir ticari içerik */

export const retailPath = {
  eyebrow: "Perakende",
  title: "Gramajlı paket, net etiket, hızlı sor–cevap",
  body:
    "Ev, ofis ikramı, hediye veya raf satışı için kabuklu ve iç ürünlerde hazır paketler. Ürün kartından kullanım alanını okuyun; gramaj ve stok için tek mesaj yeter.",
  bullets: [
    "Ürün görselleri gerçek parti mantığıyla seçilir",
    "Fiyat: ürün + gramaj + işleme durumuna göre tekliflenir",
  ],
  ctaHref: "/urunler#perakende",
  ctaLabel: "Perakende ürünlere git",
  waPreset:
    "Merhaba, perakende Antep fıstığı (gramaj / paket tipi) için fiyat ve stok soruyorum.",
} as const;

export const wholesalePath = {
  eyebrow: "Toptan · B2B",
  title: "Tonaj, ambalaj ve sevkiyat satırı birlikte planlanır",
  body:
    "Baklavacı, üretici ve toptan kuruyemiş için iç fıstık, kabuklu ve boz içte torba, koli ve palet. Talepte işletme adı ve yaklaşık miktar; teklifte parti özeti ve teslim penceresi.",
  bullets: [
    "Numune veya deneme partisi ürün grubuna göre",
    "Palet, ambar veya kargo kalemleri teklifte ayrı açılır",
  ],
  ctaHref: "/toptan-satis#teklif",
  ctaLabel: "Toplu alım talebi",
  secondaryHref: "/toptan-satis#surec",
  secondaryLabel: "Toptan sürecini gör",
} as const;

export const approachPillars = [
  {
    title: "Seçim disiplini",
    text: "Renk, boyut, kabuk bütünlüğü ve iç doluluk ürün koduna göre tarif edilir; aynı kodda tekrarlanabilirlik hedeflenir.",
  },
  {
    title: "Şeffaf teklif",
    text: "Fiyatı etkileyen kalemler (işleme, parti, ambalaj, nakliye) yazılı teklifte görünür; sürpriz satır bırakılmaz.",
  },
  {
    title: "Sevkiyat dili",
    text: "Çıkış öncesi onay, teslim penceresi ve taşıma şekli sipariş özetinde yer alır; düzenli alımlarda takvim paylaşılır.",
  },
] as const;

export const featuredProductSlugs = [
  "antep-ic-fistik",
  "kabuklu-antep-fistigi",
  "perakende-paketler",
  "toptan-koli-cuval",
] as const;

export const whyUsPillars = [
  {
    title: "Aynı dilde eleme ve parti",
    text: "Ürün kodu neyi vaat ediyorsa teklif ve çıkışta da aynı dil kullanılır; renk, boyut ve kabuk bütünlüğü parti özetiyle yazılır.",
    marks: ["Ölçülebilir kriterler", "Tekrarlanabilir parti"],
  },
  {
    title: "Ticari yazı: teklif ve özet",
    text: "Toptanda fiyat, minimum, nakliye ve vade kalemleri ayrı satırda; perakendede gramaj ve son kullanıcı bilgisi net.",
    marks: ["Şeffaf kalemleme", "Ödeme ve teslim netliği"],
  },
  {
    title: "Sevkiyatı planla, sonra çık",
    text: "Onay sonrası çıkış tarihi ve taşıma şekli özetlenir; palet fotoğrafı veya yükleme teyidi ihtiyaca göre paylaşılır.",
    marks: ["Çıkış öncesi onay", "Rota ve pencere"],
  },
  {
    title: "Doğrudan hat",
    text: "Telefon ve WhatsApp aynı işletme hattıdır; form resmi kayıt ve ek dosya için. Talep türüne göre kanal önerilir.",
    marks: ["Hızlı ilk yanıt hedefi", "Form + mesaj"],
  },
] as const;
