export type LegalPage = {
  slug: string;
  title: string;
  description: string;
  sections: { title: string; text: string }[];
};

export const legalPages: LegalPage[] = [
  {
    slug: "kargo-teslimat",
    title: "Kargo ve Teslimat",
    description: "Perakende siparişlerde teslimat, paketleme ve çıkış süreci.",
    sections: [
      { title: "Teslimat süreci", text: "Siparişler ürün, stok ve teslimat adresi kontrolünden sonra hazırlanır. Tahmini çıkış bilgisi sipariş sonrası paylaşılır." },
      { title: "Kargo bedeli", text: "Kargo bedeli teslimat adresi, paket ağırlığı ve taşıma seçeneğine göre netleşir. Sipariş özetinde ayrıca belirtilir." },
      { title: "Hasar bildirimi", text: "Teslimatta paket hasarı görülürse fotoğraf ve tutanakla aynı gün iletişime geçmeniz önerilir." },
    ],
  },
  {
    slug: "iade-degisim",
    title: "İade ve Değişim",
    description: "Gıda ürünlerinde iade/değişim yaklaşımı ve hasarlı teslimat süreci.",
    sections: [
      { title: "Gıda ürünü hassasiyeti", text: "Açılmış, kullanılmış veya saklama koşulu bozulmuş gıda ürünlerinde iade/değişim değerlendirmesi ürün güvenliği dikkate alınarak yapılır." },
      { title: "Yanlış veya hasarlı ürün", text: "Yanlış ürün veya taşıma hasarı durumunda teslimat fotoğraflarıyla birlikte destek hattına başvurabilirsiniz." },
      { title: "Değerlendirme", text: "Her talep sipariş kaydı, ürün durumu ve teslimat bilgisine göre ayrı değerlendirilir." },
    ],
  },
  {
    slug: "mesafeli-satis-sozlesmesi",
    title: "Mesafeli Satış Sözleşmesi",
    description: "Online perakende siparişlerde sözleşme çerçevesi.",
    sections: [
      {
        title: "Taraflar ve konu",
        text: "Alıcı bilgileri sipariş sırasında paylaştığınız verilerle; satıcıya ilişkin ticari kimlik ve iletişim bilgileri ise sipariş teyidi, fatura veya elektronik iletişim kayıtları üzerinden oluşur. Bu sözleşme metni, uzaktan kurulan perakende satış ilişkisinin genel çerçevesini açıklar.",
      },
      { title: "Ürün ve ödeme", text: "Sipariş konusu ürün, adet, fiyat ve teslimat bilgileri sipariş özetinde yer alır." },
      { title: "Teslimat ve cayma", text: "Teslimat ve iade talepleri ürünün gıda niteliği, paket durumu ve teslimat kaydı dikkate alınarak değerlendirilir." },
    ],
  },
  {
    slug: "on-bilgilendirme-formu",
    title: "Ön Bilgilendirme Formu",
    description: "Sipariş öncesi ürün, fiyat ve teslimat bilgilendirmesi; onay adımında gösterilen özet ile birlikte değerlendirilir.",
    sections: [
      { title: "Ürün bilgisi", text: "Ürün adı, gramaj, adet ve fiyat sipariş özetinde gösterilir." },
      { title: "Teslimat bilgisi", text: "Teslimat adresi ve kargo bilgisi sipariş sırasında kullanıcıdan alınır." },
      { title: "Destek", text: "Sipariş öncesi ve sonrası destek için iletişim sayfasındaki kanallar kullanılabilir." },
    ],
  },
  {
    slug: "kvkk-gizlilik",
    title: "KVKK ve Gizlilik",
    description: "Kişisel verilerin işlenmesi, saklanması ve haklarınız hakkında özet bilgilendirme.",
    sections: [
      { title: "Veri kullanımı", text: "Ad, telefon, e-posta ve adres bilgileri siparişin oluşturulması, teslimat ve destek süreçleri için kullanılır." },
      { title: "Saklama", text: "Sipariş ve iletişim bilgileri operasyonel gereklilikler ve yasal süreler kapsamında saklanır." },
      { title: "İletişim", text: "Kişisel verilerle ilgili talepler için iletişim sayfasındaki kanallar kullanılabilir." },
    ],
  },
];

export function getLegalPage(slug: string) {
  return legalPages.find((page) => page.slug === slug);
}
