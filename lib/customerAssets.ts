import { readdirSync } from "node:fs";
import path from "node:path";
import { customerLogoMetadata, preferredCustomerLogoOrder, type Customer } from "@/data/customers";

const customerLogoDirectory = path.join(process.cwd(), "public", "assets", "customers");
const supportedLogoExtensions = new Set([".jpeg", ".jpg", ".png", ".webp"]);
const preferredLogoIndex = new Map(preferredCustomerLogoOrder.map((fileName, index) => [fileName, index]));
let cachedCustomerLogos: Customer[] | null = null;

function formatCustomerName(fileName: string) {
  return fileName
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function sortCustomerLogoFiles(fileNameA: string, fileNameB: string) {
  const orderA = preferredLogoIndex.get(fileNameA) ?? Number.POSITIVE_INFINITY;
  const orderB = preferredLogoIndex.get(fileNameB) ?? Number.POSITIVE_INFINITY;

  if (orderA !== orderB) {
    return orderA - orderB;
  }

  return fileNameA.localeCompare(fileNameB, "en", { sensitivity: "base" });
}

export function getCustomerLogos(): Customer[] {
  if (cachedCustomerLogos) {
    return cachedCustomerLogos;
  }

  cachedCustomerLogos = readdirSync(customerLogoDirectory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && supportedLogoExtensions.has(path.extname(entry.name).toLowerCase()))
    .map((entry) => entry.name)
    .sort(sortCustomerLogoFiles)
    .map((fileName) => {
      const metadata = customerLogoMetadata[fileName];

      return {
        name: metadata?.name ?? formatCustomerName(fileName),
        logo: `/assets/customers/${fileName}`,
        logoScale: metadata?.logoScale
      };
    });

  return cachedCustomerLogos;
}
