import "server-only";

import { seedCatalog } from "@/data/catalog-seed";
import type { CatalogBrand } from "@/data/catalog-types";

function sortCatalog(brands: CatalogBrand[]) {
  return brands.sort(
    (a, b) =>
      (a.popularityRank ?? Number.MAX_SAFE_INTEGER) - (b.popularityRank ?? Number.MAX_SAFE_INTEGER) ||
      a.name.localeCompare(b.name)
  );
}

export async function getCatalogBrands(options: { includeUnpublished?: boolean } = {}) {
  const brands = structuredClone(seedCatalog);
  return sortCatalog(options.includeUnpublished ? brands : brands.filter((brand) => brand.published));
}

export async function getCatalogBrandBySlug(slug: string, options: { includeUnpublished?: boolean } = {}) {
  const brands = await getCatalogBrands(options);
  return brands.find((brand) => brand.slug === slug);
}
