/**
 * Marka logosu — `public/images/brand/inal-logo.webp` (`npm run generate:brand`).
 * Kaynak: `public/images/brand/inal-logo-source.png`. Üst alanla tam uyum için şeffaf zeminli PNG tercih edilir;
 * koyu zeminli dosyada WebP de koyu kalır — `npm run generate:brand` ile yeniden üret.
 * Oran: kaynak PNG ile aynı (1024×576 — `npm run generate:brand` çıktısı).
 */
export const brandLogo = {
  fullSrc: "/images/brand/inal-logo.webp",
  iconSrc: "/images/brand/inal-logo-icon.webp",
  width: 1024,
  height: 576,
  alt: "İnal Fıstık logo",
  iconAlt: "İnal Fıstık — fıstık ikonu",
} as const;
