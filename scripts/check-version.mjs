import { readFile } from "node:fs/promises";

const semverPattern = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?(?:\+[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?$/;

async function readJson(path) {
  return JSON.parse(await readFile(new URL(`../${path}`, import.meta.url), "utf8"));
}

const packageJson = await readJson("package.json");
const packageLock = await readJson("package-lock.json");
const versions = {
  "package.json": packageJson.version,
  "package-lock.json": packageLock.version,
  "package-lock.json root package": packageLock.packages?.[""]?.version,
};

const invalid = Object.entries(versions).filter(
  ([, version]) => typeof version !== "string" || !semverPattern.test(version),
);

if (invalid.length > 0) {
  for (const [source, version] of invalid) {
    console.error(`${source} has an invalid Semantic Version: ${String(version)}`);
  }
  process.exit(1);
}

const uniqueVersions = new Set(Object.values(versions));
if (uniqueVersions.size !== 1) {
  for (const [source, version] of Object.entries(versions)) {
    console.error(`${source}: ${version}`);
  }
  console.error("Version fields are not synchronized.");
  process.exit(1);
}

console.log(`Version ${packageJson.version} is valid and synchronized.`);
