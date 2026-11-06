import { mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const projectRoot = process.cwd();
const defaultInputRoot = path.join(projectRoot, "source-images", "backgrounds");
const defaultOutputRoot = path.join(projectRoot, "public", "assets", "company", "backgrounds");
const supportedExtensions = new Set([
  ".avif",
  ".heic",
  ".heif",
  ".jpeg",
  ".jpg",
  ".png",
  ".tif",
  ".tiff",
  ".webp"
]);

const args = process.argv.slice(2);
const force = args.includes("--force");
const positionalArgs = args.filter((arg) => !arg.startsWith("--"));
const inputRoot = path.resolve(projectRoot, positionalArgs[0] ?? defaultInputRoot);
const outputRoot = path.resolve(projectRoot, positionalArgs[1] ?? defaultOutputRoot);
const maxWidth = Number.parseInt(process.env.BACKGROUND_MAX_WIDTH ?? "2400", 10);
const quality = Number.parseInt(process.env.BACKGROUND_QUALITY ?? "78", 10);
let inputBaseDir = inputRoot;

function slugify(value) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function pathExists(filePath) {
  try {
    await stat(filePath);
    return true;
  } catch (error) {
    if (error.code === "ENOENT") {
      return false;
    }

    throw error;
  }
}

async function listImages(directory) {
  let directoryStats;

  try {
    directoryStats = await stat(directory);
  } catch (error) {
    if (error.code === "ENOENT") {
      return [];
    }

    throw error;
  }

  if (directoryStats.isFile()) {
    inputBaseDir = path.dirname(directory);
    return supportedExtensions.has(path.extname(directory).toLowerCase()) ? [directory] : [];
  }

  if (!directoryStats.isDirectory()) {
    return [];
  }

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

async function shouldConvert(inputPath, outputPath) {
  if (force) {
    return true;
  }

  try {
    const [inputStats, outputStats] = await Promise.all([stat(inputPath), stat(outputPath)]);
    return inputStats.mtimeMs > outputStats.mtimeMs;
  } catch (error) {
    if (error.code === "ENOENT") {
      return true;
    }

    throw error;
  }
}

function outputPathFor(inputPath) {
  const relativePath = path.relative(inputBaseDir, inputPath);
  const parsedPath = path.parse(relativePath);
  const safeDir = parsedPath.dir
    .split(path.sep)
    .filter(Boolean)
    .map(slugify)
    .join(path.sep);
  const fileName = `${slugify(parsedPath.name) || "background"}.webp`;

  return path.join(outputRoot, safeDir, fileName);
}

async function convertImage(inputPath) {
  const outputPath = outputPathFor(inputPath);

  if (!(await shouldConvert(inputPath, outputPath))) {
    return { inputPath, outputPath, status: "unchanged" };
  }

  await mkdir(path.dirname(outputPath), { recursive: true });

  await sharp(inputPath, { limitInputPixels: false })
    .rotate()
    .resize({
      width: maxWidth,
      fit: "inside",
      withoutEnlargement: true
    })
    .webp({
      quality,
      effort: 6,
      smartSubsample: true
    })
    .toFile(outputPath);

  return { inputPath, outputPath, status: "converted" };
}

if (positionalArgs[0] === undefined) {
  await mkdir(inputRoot, { recursive: true });
}
await mkdir(outputRoot, { recursive: true });

const imagePaths = (await listImages(inputRoot)).sort();

if (imagePaths.length === 0) {
  console.log(`No source images found in ${path.relative(projectRoot, inputRoot) || "."}`);
  console.log("Add HEIC/JPG/PNG files there, then run: npm run convert:backgrounds");
  process.exit(0);
}

let convertedCount = 0;
let unchangedCount = 0;
let failedCount = 0;

for (const imagePath of imagePaths) {
  try {
    const result = await convertImage(imagePath);
    const source = path.relative(projectRoot, result.inputPath);
    const output = path.relative(projectRoot, result.outputPath);

    if (result.status === "converted") {
      convertedCount += 1;
      console.log(`Converted ${source} -> ${output}`);
    } else {
      unchangedCount += 1;
      console.log(`Unchanged ${output}`);
    }
  } catch (error) {
    failedCount += 1;
    console.warn(`Failed ${path.relative(projectRoot, imagePath)}: ${error.message}`);
  }
}

console.log(
  `Done. ${convertedCount} converted, ${unchangedCount} unchanged, ${failedCount} failed.`
);

if (failedCount > 0) {
  process.exitCode = 1;
}
