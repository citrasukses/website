import fs from "node:fs/promises";
import path from "node:path";
import { put } from "@vercel/blob";
import { isCatalogAdmin } from "@/lib/catalog-auth";
import { slugify } from "@/data/catalog-seed";

export const runtime = "nodejs";

const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"]);

export async function POST(request: Request) {
  if (!(await isCatalogAdmin())) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const formData = await request.formData();
  const file = formData.get("file");
  const brandSlug = slugify(String(formData.get("brandSlug") || "brand"));
  if (!(file instanceof File) || !allowedTypes.has(file.type) || file.size > 8 * 1024 * 1024) {
    return Response.json({ error: "Upload a JPG, PNG, WebP, GIF, or SVG up to 8 MB." }, { status: 400 });
  }

  const extension = path.extname(file.name).toLowerCase() || ".bin";
  const baseName = slugify(path.basename(file.name, extension)) || "image";
  const objectName = `catalog/${brandSlug}/${baseName}${extension}`;

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const blob = await put(objectName, file, { access: "public", addRandomSuffix: true });
    return Response.json({ url: blob.url });
  }

  if (process.env.VERCEL) return Response.json({ error: "BLOB_READ_WRITE_TOKEN is not configured." }, { status: 503 });
  const outputDirectory = path.join(process.cwd(), "public", "assets", "catalog", brandSlug);
  await fs.mkdir(outputDirectory, { recursive: true });
  const localName = `${baseName}-${Date.now()}${extension}`;
  await fs.writeFile(path.join(outputDirectory, localName), Buffer.from(await file.arrayBuffer()));
  return Response.json({ url: `/assets/catalog/${brandSlug}/${localName}` });
}

