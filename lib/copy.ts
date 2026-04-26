/** Ana vitrin — üretici odaklı, sade ve güvenilir ton */

export const heroCopy = {
  kicker: "Doğrudan üretici · Gaziantep Nizip",
  title: "Gaziantep'ten doğrudan üreticiden sofranıza Antep fıstığı.",
  subtitle:
    "Aracı katmanı olmadan; siparişinize göre paketlenen yeni mahsul. Gramajlı perakende veya toptan parti — aynı üretici kontrolü, şeffaf fiyat.",
  producerBadges: [
    "Doğrudan Üreticiden",
    "Gaziantep Menşeli",
    "Taze Paketleme",
    "Aracısız Fiyat Avantajı",
    "Toptan ve Perakende Satış",
  ] as const,
  trustMicro: [
    { label: "Menşe", text: "Gaziantep Nizip — üretici hattı" },
    { label: "Paketleme", text: "Siparişe göre taze hazırlanır" },
    { label: "Fiyat", text: "Aracısız, şeffaf fiyatlandırma" },
  ],
} as const;

/** Hero sonrası — kaynak ve güven özeti (3 kart) */
export const producerSourceTrustSection = {
  title: "Biz üreticiyiz, ürünü kaynağından gönderiyoruz.",
  cards: [
    {
      title: "Bahçeden seçilen ürün",
      text: "Mahsul seçiminden işleme hattına kadar aynı üretici disiplini; neyin sofranıza gittiği net kalır.",
    },
    {
      title: "Siparişe göre taze paketleme",
      text: "Stok bekletmeden, çıkışınıza yakın hazırlık. Perakende gramaj ve toptan parti aynı tazelik ritmiyle.",
    },
    {
      title: "Aracısız doğrudan satış",
      text: "Gereksiz katman yok; maliyet ve iletişim üretici hattında. Sorunuz olursa doğrudan bize yazarsınız.",
    },
  ],
} as const;

/** Ürün detayı ve güven metinleri */
export const producerCopy = {
  pdpPackagingLine:
    "Bu ürün Gaziantep'te üretici kontrolünde hazırlanır ve siparişinize göre taze paketlenir.",
} as const;

export function footerProducerNote(brandName: string): string {
  return `${brandName} olarak Antep fıstığını Gaziantep Nizip'te üretici hattımızdan doğrudan sunuyoruz. Aracı değil, ürünün kaynağıyız; perakende ve toptanda aynı kalite disiplini geçer.`;
}

export const producerWhySection = {
  title: "Neden Üreticiden Almalısınız?",
  subtitle:
    "Aracı yok; ürünü bilen ekip ve net fiyat. Eviniz, ikramınız veya işletmeniz için aynı tazelik ve kontrol standardı.",
  cards: [
    {
      title: "Aracısız satış",
      text: "Fıstık size ulaşmadan önce gereksiz katmanlardan geçmez. Maliyet ve tazelik lehinize çalışır.",
    },
    {
      title: "Tazelik disiplini",
      text: "Partiyi ve paketlemeyi sipariş ritmine göre yürütürüz. Raf stoku için değil, sizin çıkış tarihiniz için hazırlanır.",
    },
    {
      title: "Üretici kalite kontrolü",
      text: "Ayıklama, kavurma ve gramaj hattı üretici gözetiminde. Ne gönderdiğimizi net ve tekrarlanabilir tutarız.",
    },
    {
      title: "Toptan avantajı",
      text: "Aynı ürün hattından koli ve palet. Miktar ve teslim ili netleşince yazılı teklif; sürpriz maliyet yok.",
    },
  ],
} as const;
