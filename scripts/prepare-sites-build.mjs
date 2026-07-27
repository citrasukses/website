import { cp, mkdir, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const exportDirectory = path.join(projectRoot, "out");
const distributionDirectory = path.join(projectRoot, "dist");

await rm(distributionDirectory, { recursive: true, force: true });
await mkdir(path.join(distributionDirectory, "client"), { recursive: true });
await mkdir(path.join(distributionDirectory, "server"), { recursive: true });

await cp(exportDirectory, path.join(distributionDirectory, "client"), { recursive: true });
await cp(
  path.join(projectRoot, "worker", "static-export.js"),
  path.join(distributionDirectory, "server", "index.js")
);
await mkdir(path.join(distributionDirectory, ".openai"), { recursive: true });
await cp(
  path.join(projectRoot, ".openai", "hosting.json"),
  path.join(distributionDirectory, ".openai", "hosting.json")
);

console.log("Prepared the static Next.js export for Sites.");
