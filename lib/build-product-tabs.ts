import type { RetailProduct } from "@/lib/shop-products";
import { stockLabel } from "@/lib/shop-products";
import type { ProductDetailTab } from "@/lib/product-detail-types";

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function catLabel(c: RetailProduct["category"]): string {
  if (c === "kabuklu") return "Kabuklu Antep fıstığı";
  if (c === "ic") return "İç Antep fıstığı";
  if (c === "boz") return "Boz iç";
  return "Hediye / paket";
}

function joinFacets(product: RetailProduct): string {
  if (!product.facets?.process?.length && !product.facets?.usage?.length) return "—";
  const p = product.facets?.process
    ?.map((x) => {
      if (x === "kavrulmus") return "Kavrulmuş";
      if (x === "cig") return "Çiğ";
      if (x === "tuzlu") return "Tuzlu";
      if (x === "tuzsuz") return "Tuzsuz";
      return x;
    })
    .join(", ");
  const u = product.facets?.usage
    ?.map((x) => {
      if (x === "atistirmalik") return "Atıştırmalık";
      if (x === "baklavalik") return "Baklavalık";
      if (x === "tatlilik") return "Tatlılık";
      if (x === "pastalik") return "Pastalık";
      if (x === "hediye") return "Hediyelik";
      return x;
    })
    .join(", ");
  return [p, u].filter(Boolean).join(" · ") || "—";
}

export function buildProductDetailTabs(product: RetailProduct): ProductDetailTab[] {
  const description = esc(product.description ?? product.shortDescription);
  const gramajlar =
    product.variants?.map((v) => v.label).join(", ") ?? product.weight;

  const specs = `
<table>
<tbody>
<tr><th>Ürün türü</th><td>${catLabel(product.category)}</td></tr>
<tr><th>İşlem / tuz</th><td>${joinFacets(product)}</td></tr>
<tr><th>Gramaj seçenekleri</th><td>${gramajlar}</td></tr>
<tr><th>Stok</th><td>${stockLabel(product.stockStatus)}</td></tr>
<tr><th>Ambalaj</th><td>Hijyenik perakende paket; ürün tipine göre kilitli veya standart poşet/kutu.</td></tr>
<tr><th>Alerjen</th><td>Antep fıstığı içerir.</td></tr>
</tbody>
</table>`;

  const kargo = `
<p>Siparişler stok durumuna göre hazırlanır ve kargoya teslim edilir. Tahmini süre: <strong>${esc(product.shippingNote)}</strong>. Bulunduğunuz şehre ve taşıyıcıya göre teslim süresi değişebilir.</p>
<p>Hasarlı teslimat durumunda aynı gün fotoğrafla iletişime geçmeniz önerilir.</p>`;

  const saklama = `<p>${esc(product.storage ?? "Serin ve kuru yerde, kapalı ambalajda saklayın.")}</p>`;

  const yorum = `
<p>Henüz doğrulanmış müşteri yorumu bulunmuyor. Siparişlerinizden sonra ilk yorumlar burada listelenecektir.</p>`;

  const sss = `
<ul>
<li><strong>Bu ürün tuzlu mu?</strong> Ürün etiketindeki işlem bilgisine göre tuzlu veya tuzsuz seçenekler sunulur.</li>
<li><strong>Çiğ mi kavrulmuş mu?</strong> Ürün kartında işlem türü ve gramaj fiyatı birlikte gösterilir.</li>
<li><strong>Baklava için uygun mu?</strong> Baklavalık olarak işaretlenen iç ve boz iç seriler tatlı üretimine uygundur.</li>
<li><strong>1 kg tek paket mi?</strong> Seçtiğiniz gramaj tek paket olarak gönderilir.</li>
</ul>`;

  const icindekiler = product.ingredients
    ? `<p class="mt-4"><strong>İçindekiler:</strong> ${esc(product.ingredients)}</p>`
    : "";
  const alerjen = product.allergens
    ? `<p class="mt-2"><strong>Alerjen uyarısı:</strong> ${esc(product.allergens)}</p>`
    : "";

  return [
    {
      id: "aciklama",
      label: "Ürün açıklaması",
      content: `<p>${description}</p>${icindekiler}${alerjen}`,
    },
    { id: "ozellik", label: "Ürün özellikleri", content: specs },
    { id: "kargo", label: "Kargo ve teslimat", content: kargo },
    { id: "saklama", label: "Saklama koşulları", content: saklama },
    { id: "yorum", label: "Yorumlar", content: yorum },
    { id: "sss", label: "Ürün SSS", content: sss },
  ];
}
