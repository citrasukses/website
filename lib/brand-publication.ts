const confirmationOnlyBrandSlugs = new Set([
  "fujidensi",
  "smbc",
  "japan-control",
  "giken",
  "le-champ",
  "nittu-densi",
  "sanyu",
  "pop-sanko",
  "chubu",
  "tolihan",
  "kataoka"
]);

export function isConfirmationOnlyBrand(slug: string) {
  return confirmationOnlyBrandSlugs.has(slug);
}

export function shouldPublishBrand(slug: string) {
  return process.env.NODE_ENV !== "production" || !isConfirmationOnlyBrand(slug);
}
