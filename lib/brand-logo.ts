/**
 * Marka logosu — `public/images/brand/inal-logo.webp` (scripts/generate-brand-assets.mjs).
 * Şeffaf zeminli kaynak için `inal-logo-source.png` kullanın; siyah blok varsa bu PNG’yi değiştirin.
 * Oran: kaynak PNG ile aynı (güncel: 1024×496 — `npm run generate:brand` çıktısına göre).
 */
export const brandLogo = {
  fullSrc: "/images/brand/inal-logo.webp",
  iconSrc: "/images/brand/inal-logo-icon.webp",
  width: 1024,
  height: 496,
  alt: "İnal Fıstık logo",
  iconAlt: "İnal Fıstık — fıstık ikonu",
} as const;
