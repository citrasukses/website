import { spawn } from "node:child_process";
import { cp, mkdir, mkdtemp, readdir, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputDirectory = path.join(projectRoot, "out");
const nextDirectory = path.join(projectRoot, ".next");
const temporaryDirectory = await mkdtemp(path.join(os.tmpdir(), "cse-bilingual-build-"));
const indonesianOutput = path.join(temporaryDirectory, "id");
const englishOutput = path.join(temporaryDirectory, "en");

function runNextBuild(language) {
  return new Promise((resolve, reject) => {
    const nextBinary = path.join(projectRoot, "node_modules", "next", "dist", "bin", "next");
    const child = spawn(process.execPath, [nextBinary, "build"], {
      cwd: projectRoot,
      env: {
        ...process.env,
        NEXT_PUBLIC_SITE_LANGUAGE: language
      },
      stdio: "inherit"
    });

    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Next.js ${language} build exited with code ${code}`));
      }
    });
  });
}

async function createLanguageExport(language, destination) {
  await rm(nextDirectory, { recursive: true, force: true });
  await rm(outputDirectory, { recursive: true, force: true });
  await runNextBuild(language);
  await cp(outputDirectory, destination, { recursive: true });
}

try {
  await createLanguageExport("id", indonesianOutput);
  await createLanguageExport("en", englishOutput);

  await rm(outputDirectory, { recursive: true, force: true });
  await cp(indonesianOutput, outputDirectory, { recursive: true });
  await mkdir(path.join(outputDirectory, "en"), { recursive: true });

  for (const entry of await readdir(englishOutput)) {
    if (entry === "_next") {
      continue;
    }

    await cp(path.join(englishOutput, entry), path.join(outputDirectory, "en", entry), {
      recursive: true
    });
  }

  await cp(path.join(englishOutput, "_next"), path.join(outputDirectory, "_next"), {
    recursive: true,
    force: true
  });

  console.log("Prepared Indonesian and English static exports.");
} finally {
  await rm(temporaryDirectory, { recursive: true, force: true });
}
