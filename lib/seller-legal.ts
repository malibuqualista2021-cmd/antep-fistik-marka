import { publicEnv } from "@/lib/env-public";

/**
 * Hukuki sayfalarda “satıcı” kutusu — yalnızca env ile anlamlı biçimde doldurulduğunda gösterilir.
 * Eksik alanlar için asla yarım cümle veya “güncellenecek” metni üretmez.
 */
export function getSellerLegalBlock(): { title: string; lines: string[] } | null {
  const tradeName = publicEnv("NEXT_PUBLIC_LEGAL_TRADE_NAME").trim();
  const line1 = publicEnv("NEXT_PUBLIC_LEGAL_ADDRESS_LINE1").trim();
  const line2 = publicEnv("NEXT_PUBLIC_LEGAL_ADDRESS_LINE2").trim();
  const phone = publicEnv("NEXT_PUBLIC_PHONE_DISPLAY").trim();
  const email = publicEnv("NEXT_PUBLIC_EMAIL").trim();
  const mersis = publicEnv("NEXT_PUBLIC_LEGAL_MERSIS").trim();
  const taxOffice = publicEnv("NEXT_PUBLIC_LEGAL_TAX_OFFICE").trim();
  const taxNo = publicEnv("NEXT_PUBLIC_LEGAL_TAX_NUMBER").trim();

  if (!tradeName) return null;
  if (!phone && !email) return null;

  const lines: string[] = [`Ticari ünvan: ${tradeName}`];
  const address = [line1, line2].filter(Boolean).join(" ");
  if (address) lines.push(`Adres: ${address}`);
  if (mersis) lines.push(`MERSİS: ${mersis}`);
  if (taxOffice && taxNo) lines.push(`Vergi dairesi / numara: ${taxOffice} / ${taxNo}`);
  else if (taxNo) lines.push(`Vergi numarası: ${taxNo}`);
  if (phone) lines.push(`Telefon: ${phone}`);
  if (email) lines.push(`E-posta: ${email}`);

  return { title: "Satıcı bilgileri", lines };
}

export function legalPagesWithSellerBox(): Set<string> {
  return new Set(["mesafeli-satis-sozlesmesi", "on-bilgilendirme-formu", "kvkk-gizlilik"]);
}
