const publicBrandSlugs = new Set(["tohnichi", "nac"]);

export function isBrandPubliclyAvailable(slug: string) {
  return publicBrandSlugs.has(slug);
}

export function canViewBrandDraft(slug: string) {
  return isBrandPubliclyAvailable(slug) || process.env.NODE_ENV === "development";
}
