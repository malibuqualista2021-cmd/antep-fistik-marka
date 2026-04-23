import { pistachioImages } from "@/lib/pistachio-images";

export type ProductAudience = "retail" | "wholesale" | "both";

export type Product = {
  slug: string;
  name: string;
  excerpt: string;
  usage: string;
  packages: string;
  audience: ProductAudience;
  detail: string;
  forWho: string;
  imageSrc: string;
  imageAlt: string;
  badge?: string;
  /** Karar verdirici kısa etiketler */
  tags: string[];
  /** Minimum / toptan eşiği — dürüst, teklifle netleşir */
  minOrder: string;
  /** Fiyatın neden teklifle verildiği */
  pricingNote: string;
};

export const products: Product[] = [
  {
    slug: "antep-ic-fistik",
    name: "Antep İç Fıstık",
    excerpt:
      "Baklava ve kuruyemiş için parti bazlı renk ve doluluk uyumu; kavrulmuş veya çiğ seçenek.",
    usage: "Baklavacılık, kuruyemiş rafı, mutfak, dolgu",
    packages: "Perakende poşet / kutu · Toptan torba · palet (miktara göre)",
    audience: "both",
    detail:
      "Eleme ve renk uyumu parti bazında kontrol edilir. Aynı ürün kodunda sürpriz yaşamamanız için çıkış öncesi parti özeti paylaşılır; kırım oranı ve tazelik beklentiniz teklif aşamasında netleşir.",
    forWho:
      "Baklavacılar, üreticiler, premium kuruyemiş rafları ve düzenli mutfak kullanımı.",
    imageSrc: pistachioImages.products.ic,
    imageAlt: "Yeşil Antep iç fıstığı çekimi",
    badge: "Çok talep görür",
    tags: ["Baklavacılar için", "Toptan uygun", "Premium kalite", "Perakende paketlenebilir"],
    minOrder:
      "Perakende gramaja göre minimum yoktur. Toptanda ürün tipi ve ambalaja göre minimum miktar teklifle yazılır.",
    pricingNote:
      "Fiyat; işleme (çiğ/kavrulmuş), parti, gramaj ve teslim şekline göre değişir. Net teklif için ürün kodu ve miktar yeterlidir.",
  },
  {
    slug: "kabuklu-antep-fistigi",
    name: "Kabuklu Antep Fıstığı",
    excerpt:
      "Doğal kabukta; ikram, hediye ve raf satışına uygun seçilmiş boyut ve kabuk bütünlüğü.",
    usage: "Perakende, ikram, hediye, kuruyemiş teşhiri",
    packages: "500 g · 1 kg · Toptan çuval / koli",
    audience: "both",
    detail:
      "Kabuk bütünlüğü ve boyut dağılığı seçilir. Kurutma dengesi tazelik hissini korur; kampanya veya sezonluk serilerde parti bilgisi isteğe bağlı paylaşılır.",
    forWho:
      "Son kullanıcı, ofis ikramı, kuruyemişçiler ve kampanyalı satışlar.",
    imageSrc: pistachioImages.products.kabuklu,
    imageAlt: "Kasede kabuklu kavrulmuş Antep fıstığı",
    tags: ["İkramlık", "Perakende satışa uygun", "Toptan uygun", "Hediye sunumuna uygun"],
    minOrder:
      "Perakende için hazır paketlerde standart gramajlar geçerlidir. Toptan çuval/kolide minimum miktar teklifle belirlenir.",
    pricingNote:
      "Gramaj, parti ve kabuk kalitesi fiyatı etkiler. Raf veya toptan için ayrı teklif satırları kullanılabilir.",
  },
  {
    slug: "boz-ic",
    name: "Boz İç",
    excerpt:
      "Pastacılık, dondurma ve dolgu için homojen doku; üretim hattına uygun parti bilgisi.",
    usage: "Pastane, dondurma, krema, endüstriyel dolgu",
    packages: "Endüstriyel torba · numune · parti bazlı",
    audience: "wholesale",
    detail:
      "Öğütme ve karıştırma davranışı tutarlı boz iç; numune ve teknik bilgi ile üretim denemesine uygun sunulur. Parti değişiminde önceden bilgilendirme yapılır.",
    forWho: "Pastaneler, dondurma üreticileri ve dolgu kullanan gıda işletmeleri.",
    imageSrc: pistachioImages.products.boz,
    imageAlt: "Boz iç fıstık doku yakın çekim",
    tags: ["Endüstriyel kullanım", "Baklavacılar için", "Toptan uygun"],
    minOrder:
      "Genelde endüstriyel kullanımda minimum miktar ürün ve ambalaja göre teklifle netleşir. Numune talebi ürün grubuna göre değerlendirilir.",
    pricingNote:
      "Tonaj ve parti homojenliği fiyatı belirler. İlk iş birliğinde küçük deneme partisi seçenekleri görüşülür.",
  },
  {
    slug: "perakende-paketler",
    name: "Perakende Paketler",
    excerpt:
      "Raf ve online satış için hazır gramajlar; okunaklı etiket ve paket tipi seçenekleri.",
    usage: "Market, e-ticaret, bireysel, kurumsal hediye",
    packages: "250 g · 500 g · 1 kg (seriye göre)",
    audience: "retail",
    detail:
      "Paketleme bilgisi ve son kullanma takibi ile düzenli seri. Görünür pencere veya tam kapak gibi satış kanalınıza uygun seçenekler konuşulur.",
    forWho: "Bireysel müşteriler, marketler ve küçük işletme hediyeleri.",
    imageSrc: pistachioImages.products.perakende,
    imageAlt: "Kavanozda perakende Antep fıstığı sunumu",
    tags: ["Perakende satışa uygun", "İkramlık"],
    minOrder:
      "Hazır paketlerde tek ürün satın alımı mümkündür. Toplu kampanya alımlarında iskonto yapısı miktara göre tekliflenir.",
    pricingNote:
      "Gramaj ve etiket / ambalaj tipi fiyatı etkiler. Stoklu ürünlerde güncel liste WhatsApp veya telefonla paylaşılır.",
  },
  {
    slug: "toptan-koli-cuval",
    name: "Toptan Koli & Çuval",
    excerpt:
      "İşletme planına göre koli, çuval ve palet; teslimat penceresi teklifle bağlanır.",
    usage: "Baklavacı, üretici, toptan kuruyemiş, düzenli alım",
    packages: "Koli · çuval · palet",
    audience: "wholesale",
    detail:
      "Minimum miktar ve teslimat ili teklifle netleşir. Sevkiyat öncesi çıkış teyidi ve yükleme fotoğrafı ihtiyaca göre paylaşılır.",
    forWho: "Baklavacılar, kuruyemiş toptancıları ve üretim hatları.",
    imageSrc: pistachioImages.products.toptan,
    imageAlt: "Toptan satış — çuval ve dükkân stoğu",
    tags: ["Toptan uygun", "Baklavacılar için", "Endüstriyel kullanım"],
    minOrder:
      "Ürün ve ambalaj tipine göre değişir; yaklaşık aylık veya seferlik miktarı yazmanız doğru teklif için yeterlidir.",
    pricingNote:
      "Toplu alımlarda parti bazlı birim fiyat uygulanır. Nakliye ve sigorta kalemleri teslim şekline göre teklif satırında açılır.",
  },
];

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(slug: string, limit = 3) {
  return products.filter((p) => p.slug !== slug).slice(0, limit);
}

export function audienceLabel(audience: ProductAudience): string {
  if (audience === "retail") return "Perakende";
  if (audience === "wholesale") return "Toptan";
  return "Perakende ve toptan";
}
