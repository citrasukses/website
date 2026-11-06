import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceDirectory = path.join(root, "source-images/seminars/tohnichi");
const outputDirectory = path.join(root, "public/assets/company/seminars/tohnichi");

// Explicitly reviewed source photos and the face-free crop below. Never scan
// all originals into public: the remaining photos and videos stay outside the web root.
const selectedPhotos = [
  // Use the approved redacted master, never the confidential original label.
  ["hands-on-tightening-redacted", "redacted/hands-on-tightening.png"],
  ["torque-reading", "Toyota/IMG_8875.jpeg"],
  // Crop the GS Battery photo to the hands and measuring tool. The full frame
  // includes a person's head at the left edge, so it must not be published.
  ["torque-measurement", "GS Battery/IMG_8826.jpeg", { left: 658, top: 1723, width: 3257, height: 2443 }],
  ["torque-tool-selection", "Toyota/IMG_8846.jpeg"],
  ["wireless-demo", "Isuzu/IMG_8912.jpeg"],
  ["torque-tester-demo", "Isuzu/IMG_8908.jpeg"],
  // The homepage durability story pairs tools from different generations with
  // a close view of a visibly worn torque wrench.
  ["tohnichi-tools-in-use", "Toyota/IMG_8848.jpeg"],
  ["tohnichi-worn-tool-detail", "Toyota/IMG_8852.jpeg"]
];

await mkdir(outputDirectory, { recursive: true });

for (const [name, source, crop] of selectedPhotos) {
  for (const width of [640, 1440]) {
    // Sharp strips EXIF metadata by default, including GPS and capture information.
    let image = sharp(path.join(sourceDirectory, source)).rotate();
    if (crop) image = image.extract(crop);
    const result = await image
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 80, effort: 6 })
      .toFile(path.join(outputDirectory, `${name}-${width}.webp`));
    console.log(`${name}-${width}.webp: ${result.width}×${result.height}, ${(result.size / 1024).toFixed(1)} KiB`);
  }
}
