/** İstemci ve sunucuda kullanılabilen NEXT_PUBLIC_* değişkenleri */
export function publicEnv(key: string): string {
  if (typeof process !== "undefined" && process.env[key]) {
    return process.env[key] as string;
  }
  return "";
}
