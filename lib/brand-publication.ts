const productionRepresentedBrandSlugs = new Set(["tohnichi", "nac", "fuji-star"]);

const draftRepresentedBrandSlugs = new Set([
  "nippon-unit-brush",
  "fuji-denshi",
  "smbc",
  "viet-nhat"
]);

const confirmationOnlyBrandSlugs = new Set([
  "smbc",
  "japan-control",
  "giken",
  "le-champ",
  "nittu-densi",
  "sanyu",
  "pop-sanko",
  "tolihan",
  "kataoka"
]);

export function isConfirmationOnlyBrand(slug: string) {
  return confirmationOnlyBrandSlugs.has(slug);
}

export function shouldPublishBrand(slug: string) {
  if (process.env.NODE_ENV !== "production") {
    return true;
  }

  if (productionRepresentedBrandSlugs.has(slug)) {
    return true;
  }

  return !draftRepresentedBrandSlugs.has(slug) && !isConfirmationOnlyBrand(slug);
}
