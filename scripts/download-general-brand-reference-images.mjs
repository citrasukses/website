import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import sharp from "sharp";

const root = process.cwd();
const manifest = JSON.parse(
  readFileSync(join(root, "data/general-brand-reference-images.json"), "utf8")
);
const outputDirectory = join(root, "public/assets/brands/reference");
const temporaryDirectory = mkdtempSync(join(tmpdir(), "cse-brand-reference-"));
const requestedSlugs = new Set(process.argv.slice(2));

mkdirSync(outputDirectory, { recursive: true });

const failures = [];

for (const [slug, entry] of Object.entries(manifest)) {
  if (requestedSlugs.size > 0 && !requestedSlugs.has(slug)) {
    continue;
  }
  const rawPath = join(temporaryDirectory, slug);
  const outputPath = join(outputDirectory, `${slug}.webp`);

  if (existsSync(outputPath) && process.env.CSE_REFRESH_BRAND_IMAGES !== "1") {
    continue;
  }

  try {
    execFileSync(
      "curl",
      [
        "-L",
        "--fail",
        "--silent",
        "--show-error",
        "--max-time",
        "90",
        "--http1.1",
        "--referer",
        entry.sourceUrl,
        "--user-agent",
        "Mozilla/5.0 (compatible; CSE-reference-image-fetch/1.0)",
        entry.imageUrl,
        "--output",
        rawPath
      ],
      { stdio: "pipe" }
    );

    const metadata = await sharp(rawPath).metadata();
    if (!metadata.width || !metadata.height || metadata.width < 180 || metadata.height < 75) {
      throw new Error(`image dimensions are too small (${metadata.width ?? 0}x${metadata.height ?? 0})`);
    }

    await sharp(rawPath)
      .rotate()
      .resize(1200, 800, { fit: "inside", withoutEnlargement: true })
      .webp({ quality: 82, effort: 5 })
      .toFile(outputPath);

    process.stdout.write(`${slug}: ${metadata.width}x${metadata.height}\n`);
  } catch (error) {
    failures.push(`${slug}: ${error instanceof Error ? error.message : String(error)}`);
  }
}

rmSync(temporaryDirectory, { recursive: true, force: true });

if (failures.length > 0) {
  process.stderr.write(`\nFailed images (${failures.length}):\n${failures.join("\n")}\n`);
  process.exitCode = 1;
}
