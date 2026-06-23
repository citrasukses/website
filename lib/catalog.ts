import "server-only";

import fs from "node:fs/promises";
import path from "node:path";
import { neon, type NeonQueryFunction } from "@neondatabase/serverless";
import { seedCatalog } from "@/data/catalog-seed";
import type { CatalogBrand } from "@/data/catalog-types";

const localCatalogPath = path.join(process.cwd(), "data", "catalog.local.json");
let sqlClient: NeonQueryFunction<false, false> | null = null;
let databaseReady: Promise<void> | null = null;

function getSql() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) return null;
  if (!sqlClient) sqlClient = neon(databaseUrl);
  return sqlClient;
}

async function ensureDatabase() {
  const sql = getSql();
  if (!sql) return;
  if (!databaseReady) {
    databaseReady = (async () => {
      await sql`
        CREATE TABLE IF NOT EXISTS catalog_brands (
          slug TEXT PRIMARY KEY,
          payload JSONB NOT NULL,
          popularity_rank INTEGER,
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `;
      await sql`
        INSERT INTO catalog_brands (slug, payload, popularity_rank)
        SELECT
          item->>'slug',
          item,
          NULLIF(item->>'popularityRank', '')::INTEGER
        FROM jsonb_array_elements(${JSON.stringify(seedCatalog)}::jsonb) AS item
        ON CONFLICT (slug) DO NOTHING
      `;
    })();
  }
  await databaseReady;
}

function sortCatalog(brands: CatalogBrand[]) {
  return brands.sort(
    (a, b) =>
      (a.popularityRank ?? Number.MAX_SAFE_INTEGER) - (b.popularityRank ?? Number.MAX_SAFE_INTEGER) ||
      a.name.localeCompare(b.name)
  );
}

async function readLocalCatalog() {
  try {
    const contents = await fs.readFile(localCatalogPath, "utf8");
    return JSON.parse(contents) as CatalogBrand[];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return structuredClone(seedCatalog);
    throw error;
  }
}

async function writeLocalCatalog(brands: CatalogBrand[]) {
  if (process.env.VERCEL) {
    throw new Error("Catalog editing requires DATABASE_URL in the deployed environment.");
  }
  const temporaryPath = `${localCatalogPath}.tmp`;
  await fs.writeFile(temporaryPath, `${JSON.stringify(sortCatalog(brands), null, 2)}\n`, "utf8");
  await fs.rename(temporaryPath, localCatalogPath);
}

export function catalogStorageMode() {
  return process.env.DATABASE_URL ? "database" : process.env.VERCEL ? "read-only" : "local-file";
}

export async function getCatalogBrands(options: { includeUnpublished?: boolean } = {}) {
  const sql = getSql();
  let brands: CatalogBrand[];

  if (sql) {
    await ensureDatabase();
    const rows = await sql`
      SELECT payload
      FROM catalog_brands
      ORDER BY popularity_rank NULLS LAST, LOWER(payload->>'name')
    `;
    brands = rows.map((row) => row.payload as CatalogBrand);
  } else {
    brands = await readLocalCatalog();
  }

  return sortCatalog(options.includeUnpublished ? brands : brands.filter((brand) => brand.published));
}

export async function getCatalogBrandBySlug(slug: string, options: { includeUnpublished?: boolean } = {}) {
  const brands = await getCatalogBrands(options);
  return brands.find((brand) => brand.slug === slug);
}

export async function saveCatalogBrand(brand: CatalogBrand, previousSlug?: string) {
  const sql = getSql();

  if (sql) {
    await ensureDatabase();
    if (previousSlug && previousSlug !== brand.slug) {
      await sql`DELETE FROM catalog_brands WHERE slug = ${previousSlug}`;
    }
    await sql`
      INSERT INTO catalog_brands (slug, payload, popularity_rank, updated_at)
      VALUES (${brand.slug}, ${JSON.stringify(brand)}::jsonb, ${brand.popularityRank ?? null}, NOW())
      ON CONFLICT (slug) DO UPDATE SET
        payload = EXCLUDED.payload,
        popularity_rank = EXCLUDED.popularity_rank,
        updated_at = NOW()
    `;
    return;
  }

  const brands = await readLocalCatalog();
  const next = brands.filter((candidate) => candidate.slug !== brand.slug && candidate.slug !== previousSlug);
  next.push(brand);
  await writeLocalCatalog(next);
}

export async function deleteCatalogBrand(slug: string) {
  const sql = getSql();
  if (sql) {
    await ensureDatabase();
    await sql`DELETE FROM catalog_brands WHERE slug = ${slug}`;
    return;
  }

  const brands = await readLocalCatalog();
  await writeLocalCatalog(brands.filter((brand) => brand.slug !== slug));
}

export async function syncCatalogFromPopularBrands() {
  const current = await getCatalogBrands({ includeUnpublished: true });
  const currentBySlug = new Map(current.map((brand) => [brand.slug, brand]));
  const merged = seedCatalog.map((seedBrand) => {
    const existing = currentBySlug.get(seedBrand.slug);
    if (!existing) return seedBrand;
    currentBySlug.delete(seedBrand.slug);
    return { ...existing, popularityRank: seedBrand.popularityRank };
  });
  merged.push(...currentBySlug.values());

  const sql = getSql();
  if (sql) {
    for (const brand of merged) await saveCatalogBrand(brand);
  } else {
    await writeLocalCatalog(merged);
  }
  return merged.length;
}

