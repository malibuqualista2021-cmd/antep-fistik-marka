/**
 * Yeniden üretim: `inal-logo.webp` kenar piksellerinin ortalaması ile
 * `app/globals.css` içindeki --brand-logo-matte uyumunu kontrol eder.
 * Logo kaynağı değişince `npm run verify:brand-matte` — sapma büyükse uyarı.
 */
import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const webp = join(root, "public/images/brand/inal-logo.webp");
const cssPath = join(root, "app/globals.css");

const { data: buf, info } = await sharp(webp).raw().toBuffer({ resolveWithObject: true });
const w = info.width;
const h = info.height;
const ch = info.channels;
let s = [0, 0, 0];
let n = 0;
const add = (x, y) => {
  const i = (y * w + x) * ch;
  s[0] += buf[i];
  s[1] += buf[i + 1];
  s[2] += buf[i + 2];
  n += 1;
};
for (let x = 0; x < w; x++) {
  add(x, 0);
  add(x, 1);
  add(x, h - 1);
  add(x, h - 2);
}
for (let y = 2; y < h - 2; y++) {
  add(0, y);
  add(1, y);
  add(w - 1, y);
  add(w - 2, y);
}
const edgeAvg = s.map((v) => Math.round(v / n));
const edgeHex = "#" + edgeAvg.map((c) => c.toString(16).padStart(2, "0")).join("");

const css = readFileSync(cssPath, "utf8");
const m = css.match(/--brand-logo-matte:\s*([^;]+);/);
const declared = m ? m[1].trim() : null;

if (!declared) {
  console.error("verify-brand-matte: --brand-logo-matte not found in app/globals.css");
  process.exit(1);
}

const dist = (d) => {
  if (!d.startsWith("#") || d.length < 7) return Infinity;
  const r = parseInt(d.slice(1, 3), 16);
  const g = parseInt(d.slice(3, 5), 16);
  const b = parseInt(d.slice(5, 7), 16);
  if ([r, g, b].some(Number.isNaN)) return Infinity;
  return Math.hypot(r - edgeAvg[0], g - edgeAvg[1], b - edgeAvg[2]);
};

const d = dist(declared);
// eslint-disable-next-line no-console
console.log("verify-brand-matte:", { edgeAverageRgb: edgeAvg, edgeHex, cssToken: declared, rgbDistance: d.toFixed(2) });
if (d > 8) {
  // eslint-disable-next-line no-console
  console.warn(
    "verify-brand-matte: Uyumsuzluk. Logo kenarına yakın yeni değer önerisi (edge ortalama): " + edgeHex,
  );
  process.exitCode = 0;
}
