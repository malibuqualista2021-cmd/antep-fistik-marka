/** Üretimde panel adresi `/yonnetim/{slug}` olur; slug tahmin edilmemeli (uzun rastgele dizi). */

export function adminPanelSlug(): string | undefined {
  const s = process.env.ADMIN_PANEL_SLUG?.trim();
  return s || undefined;
}

export function adminPanelUsesSecretPath(): boolean {
  return Boolean(adminPanelSlug());
}
