import { shouldPublishBrand } from "@/lib/brand-publication";

export function isBrandPubliclyAvailable(slug: string) {
  return shouldPublishBrand(slug);
}

export function canViewBrandDraft(slug: string) {
  return process.env.NODE_ENV !== "production" || isBrandPubliclyAvailable(slug);
}
