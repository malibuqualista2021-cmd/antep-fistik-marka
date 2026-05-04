/** Panelden düzenlenebilir kullanıcı/API mesaj anahtarları */
export const SITE_MESSAGE_KEYS = {
  orderPersistFailed: "order.persistFailed",
  uploadLambdaNoCloudinary: "upload.lambdaNoCloudinary",
  uploadDiskReadonly: "upload.diskReadonly",
  leadPersistFailed: "lead.persistFailed",
} as const;

type MsgKey = (typeof SITE_MESSAGE_KEYS)[keyof typeof SITE_MESSAGE_KEYS];

const DEFAULTS: Record<MsgKey, string> = {
  [SITE_MESSAGE_KEYS.orderPersistFailed]:
    "Sipariş şu an kaydedilemedi. Lütfen bir süre sonra tekrar deneyin veya WhatsApp üzerinden sipariş verin.",
  [SITE_MESSAGE_KEYS.uploadLambdaNoCloudinary]:
    "Bu ortamda sunucuya dosya yazılamıyor. Görseller için Netlify ortamında Cloudinary ayarlarını tanımlayın (CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET) veya görseli harici URL olarak yapıştırın.",
  [SITE_MESSAGE_KEYS.uploadDiskReadonly]:
    "Sunucu dosya sistemine yazılamıyor (salt okunur ortam). Cloudinary kullanın veya görseli URL ile verin.",
  [SITE_MESSAGE_KEYS.leadPersistFailed]:
    "Talep şu an kaydedilemedi. Lütfen bir süre sonra tekrar deneyin veya WhatsApp ile ulaşın.",
};

export function diffContentMessagesFromDefaults(merged: Record<string, string>): Record<string, string> | undefined {
  const out: Record<string, string> = {};
  for (const key of Object.values(SITE_MESSAGE_KEYS)) {
    const v = merged[key]?.trim();
    if (v && v !== DEFAULTS[key]) out[key] = v;
  }
  return Object.keys(out).length ? out : undefined;
}

export function mergeContentMessages(overrides?: Record<string, string>): Record<string, string> {
  return { ...DEFAULTS, ...(overrides ?? {}) };
}

export function contentMessage(map: Record<string, string>, key: MsgKey): string {
  const v = map[key]?.trim();
  return v || DEFAULTS[key];
}

export function contentMessageDefaultsForAdmin(): { key: MsgKey; label: string; hint: string }[] {
  return [
    {
      key: SITE_MESSAGE_KEYS.orderPersistFailed,
      label: "Ödeme — sipariş kaydı başarısız",
      hint: "Kalıcı depo (Blobs/disk) yazılamadığında müşteriye gösterilir.",
    },
    {
      key: SITE_MESSAGE_KEYS.uploadLambdaNoCloudinary,
      label: "Admin yükleme — Cloudinary yok (sunucu)",
      hint: "Üretim ortamında görsel yükleme reddedildiğinde.",
    },
    {
      key: SITE_MESSAGE_KEYS.uploadDiskReadonly,
      label: "Admin yükleme — disk salt okunur",
      hint: "Yerel diske yazılamadığında (ör. sunucusuz salt okunur FS).",
    },
    {
      key: SITE_MESSAGE_KEYS.leadPersistFailed,
      label: "Toptan talep — kayıt başarısız",
      hint: "Toptan formu gönderildi ama lead dosyaya yazılamadığında.",
    },
  ];
}
