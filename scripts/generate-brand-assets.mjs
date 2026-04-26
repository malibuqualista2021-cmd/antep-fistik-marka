/**
 * Kaynak: public/images/brand/inal-logo-source.png
 * Çıktı: inal-logo.webp, inal-logo-icon.webp, app/icon.png, app/apple-icon.png
 *
 * Ana logo: şeffaf/açık zemin için kaynak PNG’yi alpha koruyarak WebP’ye çevirir.
 * Favicon: sol taraftaki fıstık dalı bölgesini dar kırpım + kare resize.
 */
import sharp from "sharp";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const input = join(root, "public/images/brand/inal-logo-source.png");

const meta = await sharp(input).metadata();
const W = meta.width ?? 1024;
const H = meta.height ?? 576;

await sharp(input).webp({ quality: 92, effort: 4 }).toFile(join(root, "public/images/brand/inal-logo.webp"));

const iw = Math.round(W * 0.26);
const ih = Math.round(H * 0.68);
const it = Math.max(0, Math.floor((H - ih) / 2));
const iconBuffer = await sharp(input).extract({ left: 0, top: it, width: iw, height: ih }).png().toBuffer();

await sharp(iconBuffer).resize(32, 32, { fit: "cover", position: "centre" }).png().toFile(join(root, "app/icon.png"));
await sharp(iconBuffer).resize(180, 180, { fit: "cover", position: "centre" }).png().toFile(join(root, "app/apple-icon.png"));
await sharp(iconBuffer).resize(128, 128, { fit: "cover" }).webp({ quality: 90 }).toFile(join(root, "public/images/brand/inal-logo-icon.webp"));

const webpMeta = await sharp(join(root, "public/images/brand/inal-logo.webp")).metadata();
// eslint-disable-next-line no-console
console.log(
  JSON.stringify(
    {
      fullWidth: webpMeta.width,
      fullHeight: webpMeta.height,
      sourceWidth: W,
      sourceHeight: H,
    },
    null,
    2,
  ),
);
