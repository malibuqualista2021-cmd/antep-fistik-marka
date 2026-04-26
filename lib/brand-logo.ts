/**
 * Marka logosu — `public/images/brand/inal-logo.webp` (`npm run generate:brand`).
 * Kaynak: `public/images/brand/inal-logo-source.png`. Görselde koyu zemin varsa WebP’de de öyle kalır;
 * açık header’da “kutu” istemiyorsan şeffaf zeminli aynı kompozisyonu PNG olarak kaynağa koyup yeniden üret.
 * Oran: kaynak PNG ile aynı (1024×496).
 */
export const brandLogo = {
  fullSrc: "/images/brand/inal-logo.webp",
  iconSrc: "/images/brand/inal-logo-icon.webp",
  width: 1024,
  height: 496,
  alt: "İnal Fıstık logo",
  iconAlt: "İnal Fıstık — fıstık ikonu",
} as const;
