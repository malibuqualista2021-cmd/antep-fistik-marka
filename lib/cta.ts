/**
 * Niyet odaklı CTA metinleri ve WhatsApp ön mesajları — tek kaynak.
 */
export const cta = {
  home: {
    primaryHref: "/urunler",
    primaryLabel: "Sepete ekle (Perakende)",
    secondaryHref: "/toptan-satis#teklif",
    secondaryLabel: "Toptan teklif al",
    waPriceLabel: "WhatsApp destek",
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
      "Merhaba, perakende sipariş veya toptan teklif hakkında destek almak istiyorum.",
  },
  productsPage: {
    introCtaHref: "/toptan-satis#teklif",
    introCtaLabel: "Toptan teklif al",
  },
  productDetail: (productName: string) => ({
    primaryWaLabel: "Perakende ürünlere git",
    primaryWaAriaLabel: `${productName} için perakende ürün seçeneklerine git`,
    primaryWaMessage: `Merhaba, "${productName}" hakkında destek almak istiyorum.`,
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
      "Merhaba, sipariş veya toptan teklif hakkında destek almak istiyorum. Konu: ",
    formSubmitLabel: "Formu gönder",
  },
  /** Ürün detay — WhatsApp’tan sor ön mesajı */
  retailProductDetailQuestion: (productName: string, gramaj: string) =>
    `Merhaba, "${productName}" (${gramaj}) ürünü hakkında bilgi almak istiyorum.`,
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
