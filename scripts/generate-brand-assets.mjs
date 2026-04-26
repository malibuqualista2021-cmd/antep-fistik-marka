/**
 * Kaynak: public/images/brand/inal-logo-source.png
 * Çıktı: inal-logo.webp, inal-logo-icon.webp, app/icon.png, app/apple-icon.png
 */
import sharp from "sharp";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const input = join(root, "public/images/brand/inal-logo-source.png");

const meta = await sharp(input).metadata();
const W = meta.width ?? 1600;
const H = meta.height ?? 900;

await sharp(input).webp({ quality: 92, effort: 4 }).toFile(join(root, "public/images/brand/inal-logo.webp"));

const cropW = Math.round(W * 0.34);
const cropH = H;
const iconBuffer = await sharp(input).extract({ left: 0, top: 0, width: cropW, height: cropH }).png().toBuffer();

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
