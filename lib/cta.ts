/**
 * Niyet odaklı CTA metinleri ve WhatsApp ön mesajları — tek kaynak.
 */
export const cta = {
  home: {
    primaryHref: "/urunler",
    primaryLabel: "Ürünleri incele",
    secondaryHref: "/toptan-satis#teklif",
    secondaryLabel: "Toptan teklif al",
    waPriceLabel: "Güncel fiyat sor",
    waPriceMessage:
      "Merhaba, güncel Antep fıstığı fiyatı ve stok durumu hakkında bilgi almak istiyorum.",
    sampleHref: "/toptan-satis#numune",
    sampleLabel: "Numune talep et",
    sampleWaMessage:
      "Merhaba, toptan alım öncesi numune / deneme parti talebim var. Ürün ve yaklaşık miktarı paylaşacağım.",
  },
  header: {
    waLabel: "WhatsApp ile yaz",
    waMessage:
      "Merhaba, Antep fıstığı (perakende veya toptan) için bilgi almak istiyorum.",
  },
  floatingWa: {
    label: "WhatsApp",
    message:
      "Merhaba, Antep fıstığı için bilgi veya fiyat teklifi almak istiyorum.",
  },
  productsPage: {
    introCtaHref: "/toptan-satis#teklif",
    introCtaLabel: "Toptan teklif al",
  },
  productDetail: (productName: string) => ({
    primaryWaLabel: "Bu ürün için fiyat sor",
    primaryWaAriaLabel: `${productName} için güncel fiyat ve paket seçenekleri sor`,
    primaryWaMessage: `Merhaba, "${productName}" için güncel fiyat ve paket seçenekleri hakkında bilgi almak istiyorum.`,
    secondaryHref: "/iletisim",
    secondaryLabel: "Form ile yaz",
    wholesaleHref: "/toptan-satis#teklif",
    wholesaleLabel: "Toplu alım talebi",
  }),
  wholesalePage: {
    formAnchorLabel: "Talep formuna git",
    formSubmitLabel: "Toplu alım talebi gönder",
    waLabel: "WhatsApp ile hızlı hat",
    waMessage:
      "Merhaba, toplu alım / toptan Antep fıstığı teklifi için yazıyorum. Ürün ve yaklaşık miktarı mesajda paylaşacağım.",
    phoneLabel: "Telefonu ara",
  },
  contactPage: {
    waLabel: "WhatsApp ile yaz",
    waMessage:
      "Merhaba, iletişim sayfasından yazıyorum. Talep / soru konusu: ",
    formSubmitLabel: "Formu gönder",
  },
  bottomCta: {
    title: "Uygun ürün için bizimle iletişime geçin",
    subtitle:
      "Kullanım alanınızı ve yaklaşık miktarı yazmanız yeterli; hangi ürün kodunun işinize oturduğunu birlikte netleştiririz. Yazılı teklif ve teslim penceresi için form; hızlı fiyat ve stok için WhatsApp daha pratik olabilir.",
    primaryWaLabel: "WhatsApp ile yaz",
    primaryWaMessage:
      "Merhaba, Antep fıstığı siparişi veya fiyat bilgisi için yazıyorum.",
    phoneLabel: "Telefonu ara",
    formLabel: "İletişim formu",
    formHref: "/iletisim",
  },
} as const;
