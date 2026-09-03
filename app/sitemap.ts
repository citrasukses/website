import type { MetadataRoute } from "next";
import { buyerGuides } from "@/data/buyer-guides";
import { categoryHubs } from "@/data/category-hubs";
import { seedCatalog } from "@/data/catalog-seed";
import { industryPages } from "@/data/industry-pages";
import { solutionPages } from "@/data/solution-pages";
import { assertUniqueSeoIntentOwnership, SEO_INTENT_OWNERS } from "@/data/seo-intents";
import { isBrandPubliclyAvailable } from "@/lib/brand-visibility";
import { languageAlternates, localizedPath } from "@/lib/i18n";
import { absoluteUrl } from "@/lib/seo-config";
import { getBrandIndexability, getProductIndexability } from "@/lib/seo-indexability";

export const dynamic = "force-static";

function absoluteLanguageAlternates(path: string) {
  return Object.fromEntries(
    Object.entries(languageAlternates(path)).map(([language, localizedUrl]) => [language, absoluteUrl(localizedUrl)])
  );
}

function localizedRoutes(path: string): MetadataRoute.Sitemap {
  const languages = absoluteLanguageAlternates(path);

  return (["id", "en"] as const).map((lang) => ({
    url: absoluteUrl(localizedPath(path, lang)),
    alternates: { languages }
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  assertUniqueSeoIntentOwnership();

  const staticRoutes = [
    "/",
    "/about",
    "/brands",
    "/industries",
    "/products",
    "/solutions",
    "/guides",
    "/partners",
    "/contact",
    SEO_INTENT_OWNERS.controlledTightening.route
  ].flatMap(localizedRoutes);

  const categoryRoutes: MetadataRoute.Sitemap = categoryHubs.flatMap((category) =>
    localizedRoutes(`/${category.slug}`)
  );

  const industryRoutes: MetadataRoute.Sitemap = industryPages.flatMap((page) =>
    localizedRoutes(`/industries/${page.industrySlug}`)
  );

  const solutionRoutes: MetadataRoute.Sitemap = solutionPages.flatMap((solution) =>
    localizedRoutes(`/solutions/${solution.slug}`)
  );

  const guideRoutes: MetadataRoute.Sitemap = buyerGuides.flatMap((guide) =>
    localizedRoutes(`/guides/${guide.slug}`)
  );

  const brandRoutes: MetadataRoute.Sitemap = seedCatalog
    .filter((brand) =>
      getBrandIndexability({
        published: brand.published,
        publiclyAvailable: isBrandPubliclyAvailable(brand.slug)
      }).index
    )
    .flatMap((brand) => {
      const brandPath = `/brands/${brand.slug}`;
      return localizedRoutes(brandPath);
    });

  const productRoutes: MetadataRoute.Sitemap = seedCatalog
    .flatMap((brand) =>
      brand.productGroups.flatMap((group) =>
        group.products
          .filter((product) =>
            getProductIndexability({
              brandSlug: brand.slug,
              productSlug: product.slug,
              published: brand.published,
              publiclyAvailable: isBrandPubliclyAvailable(brand.slug)
            }).index
          )
          .flatMap((product) => localizedRoutes(`/brands/${brand.slug}/products/${product.slug}`))
      )
    );

  return [
    ...staticRoutes,
    ...categoryRoutes,
    ...industryRoutes,
    ...solutionRoutes,
    ...guideRoutes,
    ...brandRoutes,
    ...productRoutes
  ];
}
