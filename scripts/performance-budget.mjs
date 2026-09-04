import assert from "node:assert/strict";
import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const clientRoot = path.join(projectRoot, "dist", "client");
const productAssetRoot = path.join(clientRoot, "assets", "brands", "products", "tohnichi");
const videoPath = path.join(productAssetRoot, "tohnichi-ql-cl-720p.mp4");
const heroPath = path.join(clientRoot, "assets", "company", "hero-background-curated-v2.webp");
const heavyEquipmentPath = path.join(clientRoot, "assets", "industries", "heavy-equipment.webp");
const retiredVideoNames = [
  "Torque Wrench QL CL video english version_1080.mov",
  "Torque Wrench QL CL video english version.mp4",
  "Torque Wrench QL CL video english version_1080.mp4"
];

async function listFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);
    files.push(...(entry.isDirectory() ? await listFiles(entryPath) : [entryPath]));
  }
  return files;
}

function formatBytes(bytes) {
  return `${(bytes / 1024).toFixed(1)} KiB`;
}

const videoBytes = (await stat(videoPath)).size;
const heroBytes = (await stat(heroPath)).size;
const heavyEquipmentBytes = (await stat(heavyEquipmentPath)).size;
assert.ok(videoBytes <= 4_000_000, `TOHNICHI video exceeds 4 MB: ${formatBytes(videoBytes)}`);
assert.ok(heroBytes <= 150_000, `Homepage hero exceeds 150 KB: ${formatBytes(heroBytes)}`);
assert.ok(heavyEquipmentBytes <= 175_000, `Heavy-equipment hero exceeds 175 KB: ${formatBytes(heavyEquipmentBytes)}`);

const publishedProductAssets = await listFiles(productAssetRoot);
const imageAssets = publishedProductAssets.filter((filePath) => /\.(avif|jpe?g|png|webp)$/i.test(filePath));
const imageSizes = await Promise.all(imageAssets.map(async (filePath) => ({ filePath, size: (await stat(filePath)).size })));
const largestImage = imageSizes.sort((left, right) => right.size - left.size)[0];
assert.ok(largestImage.size <= 2_000_000, `Published TOHNICHI image exceeds 2 MB: ${path.basename(largestImage.filePath)} (${formatBytes(largestImage.size)})`);

for (const retiredName of retiredVideoNames) {
  assert.ok(
    !publishedProductAssets.some((filePath) => path.basename(filePath) === retiredName),
    `Retired heavy video is still present in the deploy bundle: ${retiredName}`
  );
}

for (const localizedPrefix of ["", "en"]) {
  const htmlPath = path.join(clientRoot, localizedPrefix, "brands", "tohnichi.html");
  const html = await readFile(htmlPath, "utf8");
  const videoTag = html.match(/<video\b[^>]*>/i)?.[0] ?? "";
  assert.ok(videoTag, `TOHNICHI video tag is missing from ${htmlPath}`);
  assert.ok(!/\bautoplay\b/i.test(videoTag), `Autoplay returned in ${htmlPath}`);
  assert.match(videoTag, /\bpreload="none"/i, `Video must use preload=none in ${htmlPath}`);
  assert.match(videoTag, /\bposter=/i, `Video poster is missing in ${htmlPath}`);
}

console.log(
  `Performance budgets passed: shared hero ${formatBytes(heroBytes)}, heavy-equipment hero ${formatBytes(heavyEquipmentBytes)}, video ${formatBytes(videoBytes)}, largest optimized TOHNICHI image ${formatBytes(largestImage.size)}.`
);
