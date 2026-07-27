import { readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const projectRoot = process.cwd();
const publicRoot = path.join(projectRoot, "public");
const productImagesRoot = path.join(publicRoot, "assets", "brands", "products");
const outputPath = path.join(projectRoot, "data", "image-backgrounds.json");
const supportedExtensions = new Set([".avif", ".gif", ".jpeg", ".jpg", ".png", ".webp"]);
const sampleSize = 48;
const borderWidth = 5;
const concurrency = 8;

async function listImages(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nestedFiles = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        return listImages(entryPath);
      }

      return supportedExtensions.has(path.extname(entry.name).toLowerCase()) ? [entryPath] : [];
    })
  );

  return nestedFiles.flat();
}

function median(values) {
  const sorted = values.sort((left, right) => left - right);
  return sorted[Math.floor(sorted.length / 2)];
}

function toHex(red, green, blue) {
  return `#${[red, green, blue]
    .map((channel) => channel.toString(16).padStart(2, "0"))
    .join("")}`;
}

async function sampleBackground(filePath) {
  const { data, info } = await sharp(filePath, { animated: false })
    .resize(sampleSize, sampleSize, { fit: "fill" })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const pixels = [];
  let borderPixelCount = 0;

  for (let y = 0; y < info.height; y += 1) {
    for (let x = 0; x < info.width; x += 1) {
      const isBorder =
        x < borderWidth ||
        x >= info.width - borderWidth ||
        y < borderWidth ||
        y >= info.height - borderWidth;

      if (!isBorder) {
        continue;
      }

      borderPixelCount += 1;
      const offset = (y * info.width + x) * info.channels;
      const alpha = data[offset + 3];

      if (alpha >= 230) {
        pixels.push([data[offset], data[offset + 1], data[offset + 2]]);
      }
    }
  }

  // Transparent cut-outs should keep the site's existing neutral card treatment.
  if (pixels.length < borderPixelCount * 0.3) {
    return null;
  }

  const buckets = new Map();

  for (const pixel of pixels) {
    const key = `${pixel[0] >> 4},${pixel[1] >> 4},${pixel[2] >> 4}`;
    const bucket = buckets.get(key);

    if (bucket) {
      bucket.push(pixel);
    } else {
      buckets.set(key, [pixel]);
    }
  }

  const dominantPixels = [...buckets.values()].sort(
    (left, right) => right.length - left.length
  )[0];

  // Only use a color when the image actually has a consistent edge/background.
  if (!dominantPixels || dominantPixels.length < pixels.length * 0.25) {
    return null;
  }

  return toHex(
    median(dominantPixels.map((pixel) => pixel[0])),
    median(dominantPixels.map((pixel) => pixel[1])),
    median(dominantPixels.map((pixel) => pixel[2]))
  );
}

async function mapWithConcurrency(items, worker) {
  const results = new Array(items.length);
  let nextIndex = 0;

  async function runWorker() {
    while (nextIndex < items.length) {
      const index = nextIndex;
      nextIndex += 1;
      results[index] = await worker(items[index]);
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(concurrency, items.length) }, () => runWorker())
  );

  return results;
}

const imagePaths = (await listImages(productImagesRoot)).sort();
const sampledImages = await mapWithConcurrency(imagePaths, async (filePath) => {
  try {
    return [filePath, await sampleBackground(filePath)];
  } catch (error) {
    console.warn(`Skipped ${path.relative(projectRoot, filePath)}: ${error.message}`);
    return [filePath, null];
  }
});

const backgrounds = Object.fromEntries(
  sampledImages
    .filter(([, background]) => background)
    .map(([filePath, background]) => {
      const publicPath = `/${path.relative(publicRoot, filePath).split(path.sep).join("/")}`;
      return [publicPath, background];
    })
);

await writeFile(outputPath, `${JSON.stringify(backgrounds, null, 2)}\n`);
console.log(
  `Generated ${Object.keys(backgrounds).length} image background colors from ${imagePaths.length} product images.`
);
