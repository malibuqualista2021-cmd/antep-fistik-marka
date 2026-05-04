/** İstemci yükleme route'unun çalışması için gerekli ortam değişkenleri */
export function isCloudinaryConfigured(): boolean {
  const name = (process.env.CLOUDINARY_CLOUD_NAME || "").trim();
  const key = (process.env.CLOUDINARY_API_KEY || "").trim();
  const secret = (process.env.CLOUDINARY_API_SECRET || "").trim();
  return Boolean(name && key && secret);
}
