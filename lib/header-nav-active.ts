/** Aktif kategori linki — pathname + query eşleşmesi (`/#...` hariç). */
export function navItemIsActive(href: string, pathname: string, search: URLSearchParams): boolean {
  if (href.includes("#")) return false;
  try {
    const u = new URL(href, "http://local.example");
    if (u.pathname !== pathname) return false;
    const keys = [...u.searchParams.keys()];
    if (keys.length === 0) return [...search.keys()].length === 0;
    for (const [k, v] of u.searchParams.entries()) {
      if (search.get(k) !== v) return false;
    }
    return true;
  } catch {
    return false;
  }
}
