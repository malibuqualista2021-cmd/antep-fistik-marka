/**
 * Marka logosu — `public/images/brand/inal-logo.webp` (`npm run generate:brand`).
 * Kaynak: `public/images/brand/inal-logo-source.png`. Görselde koyu zemin varsa WebP’de de öyle kalır;
 * açık header’da “kutu” istemiyorsan şeffaf zeminli aynı kompozisyonu PNG olarak kaynağa koyup yeniden üret.
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
