import { cp, mkdir, readdir, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const exportDirectory = path.join(projectRoot, "out");
const distributionDirectory = path.join(projectRoot, "dist");
const draftBrandProductDirectories = ["fuji-star", "nippon-unit-brush"];
const publishedProductDirectory = path.join(
  distributionDirectory,
  "client",
  "assets",
  "brands",
  "products",
  "tohnichi"
);

async function listFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await listFiles(entryPath)));
    } else {
      files.push(entryPath);
    }
  }

  return files;
}

async function optimizePublishedProductAssets() {
  const unusedVideoFiles = [
    "Torque Wrench QL CL video english version_1080.mov",
    "Torque Wrench QL CL video english version.mp4",
    "Torque Wrench QL CL video english version_1080.mp4"
  ];

  await Promise.all(
    unusedVideoFiles.map((fileName) =>
      rm(path.join(publishedProductDirectory, fileName), { force: true })
    )
  );

  for (const filePath of await listFiles(publishedProductDirectory)) {
    const extension = path.extname(filePath).toLowerCase();

    if (path.basename(filePath) === ".DS_Store") {
      await rm(filePath, { force: true });
      continue;
    }

    const inputSize = (await stat(filePath)).size;
    let output;

    if (extension === ".jpg" || extension === ".jpeg") {
      output = await sharp(filePath)
        .rotate()
        .resize({
          width: 2000,
          height: 2000,
          fit: "inside",
          withoutEnlargement: true
        })
        .jpeg({ quality: 86, mozjpeg: true })
        .toBuffer();
    } else if (extension === ".png" && inputSize > 750_000) {
      output = await sharp(filePath)
        .resize({
          width: 2400,
          height: 2400,
          fit: "inside",
          withoutEnlargement: true
        })
        .png({ compressionLevel: 9, effort: 10 })
        .toBuffer();
    }

    if (output && output.length < inputSize) {
      await writeFile(filePath, output);
    }
  }
}

await rm(distributionDirectory, { recursive: true, force: true });
await mkdir(path.join(distributionDirectory, "client"), { recursive: true });
await mkdir(path.join(distributionDirectory, "server"), { recursive: true });

await cp(exportDirectory, path.join(distributionDirectory, "client"), { recursive: true });
await Promise.all(
  draftBrandProductDirectories.map((slug) =>
    rm(path.join(distributionDirectory, "client", "assets", "brands", "products", slug), {
      recursive: true,
      force: true
    })
  )
);
await rm(path.join(distributionDirectory, "client", "en", "assets"), {
  recursive: true,
  force: true
});
await Promise.all(
  [
    ["assets", "company", "hero-background-curated-v2.png"],
    ["assets", "company", "hero-background.png"],
    ["assets", "company", "hero", "industrial-workbench-v1.png"],
    ["assets", "industries", "heavy_equipment.png"]
  ].map((segments) => rm(path.join(distributionDirectory, "client", ...segments), { force: true }))
);
await optimizePublishedProductAssets();
await cp(
  path.join(projectRoot, "worker", "static-export.js"),
  path.join(distributionDirectory, "server", "index.js")
);
await mkdir(path.join(distributionDirectory, ".openai"), { recursive: true });
await cp(
  path.join(projectRoot, ".openai", "hosting.json"),
  path.join(distributionDirectory, ".openai", "hosting.json")
);
await cp(
  path.join(projectRoot, "drizzle"),
  path.join(distributionDirectory, ".openai", "drizzle"),
  { recursive: true }
);

console.log("Prepared the static Next.js export for Sites.");
