import type { Brand } from "@/data/brands";
import type { BrandCardBrand } from "@/components/BrandCard";
import { text } from "@/lib/i18n";

export type SearchableBrandCard = {
  brand: BrandCardBrand;
  searchIndex: string;
};

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function compact(values: Array<string | undefined>) {
  return values.filter(Boolean).join(" ");
}

export function buildRepresentedBrandSearchIndex(brand: Brand) {
  const productText = brand.productGroups
    .flatMap((group) => [
      group.slug,
      text(group.title, "id"),
      text(group.title, "en"),
      text(group.description, "id"),
      text(group.description, "en"),
      ...group.products.flatMap((product) => [
        product.name,
        product.model,
        text(product.summary, "id"),
        text(product.summary, "en"),
        ...product.tags.flatMap((tag) => [text(tag, "id"), text(tag, "en")])
      ])
    ])
    .join(" ");

  return normalize(
    compact([
      brand.name,
      brand.slug,
      brand.country,
      brand.countryCode,
      text(brand.category, "id"),
      text(brand.category, "en"),
      text(brand.summary, "id"),
      text(brand.summary, "en"),
      text(brand.description, "id"),
      text(brand.description, "en"),
      ...brand.strengths.flatMap((strength) => [text(strength, "id"), text(strength, "en")]),
      ...(brand.searchTerms ?? []),
      productText
    ])
  );
}

export function toSearchableBrandCard(brand: Brand): SearchableBrandCard {
  return {
    brand: {
      slug: brand.slug,
      name: brand.name,
      country: brand.country,
      category: brand.category,
      heroImage: brand.heroImage,
      summary: brand.summary
    },
    searchIndex: buildRepresentedBrandSearchIndex(brand)
  };
}
