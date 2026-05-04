/** Ürün ve ortak görseller için yükleme sonucu — storage backend modülleri bunu üretir */

export type ProductImageUploadResult =
  | { ok: true; url: string }
  | { ok: false; message: string; detail?: string };
