const productionBrandSlugs = new Set(["tohnichi", "nac"]);

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
  return process.env.NODE_ENV !== "production" || productionBrandSlugs.has(slug);
}
