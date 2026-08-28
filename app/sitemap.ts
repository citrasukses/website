import type { MetadataRoute } from "next";
import { buyerGuides } from "@/data/buyer-guides";
import { categoryHubs } from "@/data/category-hubs";
import { seedCatalog } from "@/data/catalog-seed";
import { industryPages } from "@/data/industry-pages";
import { solutionPages } from "@/data/solution-pages";
import { isBrandPubliclyAvailable } from "@/lib/brand-visibility";
import { languageAlternates, localizedPath } from "@/lib/i18n";

const baseUrl = "https://cse.co.id";
const tohnichiSeoLastModified = "2026-08-05";
const contentArchitectureLastModified = "2026-08-28";

export const dynamic = "force-static";

function absoluteUrl(path: string) {
  return `${baseUrl}${path}`;
}

function absoluteLanguageAlternates(path: string) {
  return Object.fromEntries(
    Object.entries(languageAlternates(path)).map(([language, localizedUrl]) => [language, absoluteUrl(localizedUrl)])
  );
}

function localizedRoutes(
  path: string,
  options: Omit<MetadataRoute.Sitemap[number], "url" | "alternates">
): MetadataRoute.Sitemap {
  const languages = absoluteLanguageAlternates(path);

  return (["id", "en"] as const).map((lang) => ({
    ...options,
    url: absoluteUrl(localizedPath(path, lang)),
    alternates: { languages }
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    ...localizedRoutes("/", {
      changeFrequency: "weekly",
      priority: 1
    }),
    ...localizedRoutes("/about", {
      changeFrequency: "monthly",
      priority: 0.7
    }),
    ...localizedRoutes("/brands", {
      changeFrequency: "weekly",
      priority: 0.9
    }),
    ...localizedRoutes("/industries", {
      changeFrequency: "monthly",
      priority: 0.8
    }),
    ...localizedRoutes("/products", {
      changeFrequency: "monthly",
      priority: 0.9,
      lastModified: contentArchitectureLastModified
    }),
    ...localizedRoutes("/solutions", {
      changeFrequency: "monthly",
      priority: 0.85,
      lastModified: contentArchitectureLastModified
    }),
    ...localizedRoutes("/guides", {
      changeFrequency: "monthly",
      priority: 0.8,
      lastModified: contentArchitectureLastModified
    }),
    ...localizedRoutes("/partners", {
      changeFrequency: "monthly",
      priority: 0.7
    }),
    ...localizedRoutes("/contact", {
      changeFrequency: "monthly",
      priority: 0.8
    })
  ];

  const categoryRoutes: MetadataRoute.Sitemap = categoryHubs.flatMap((category) =>
    localizedRoutes(`/${category.slug}`, {
      changeFrequency: "monthly",
      priority: 0.9,
      lastModified: contentArchitectureLastModified
    })
  );

  const industryRoutes: MetadataRoute.Sitemap = industryPages.flatMap((page) =>
    localizedRoutes(`/industries/${page.industrySlug}`, {
      changeFrequency: "monthly",
      priority: 0.8,
      lastModified: contentArchitectureLastModified
    })
  );

  const solutionRoutes: MetadataRoute.Sitemap = solutionPages.flatMap((solution) =>
    localizedRoutes(`/solutions/${solution.slug}`, {
      changeFrequency: "monthly",
      priority: 0.85,
      lastModified: contentArchitectureLastModified
    })
  );

  const guideRoutes: MetadataRoute.Sitemap = buyerGuides.flatMap((guide) =>
    localizedRoutes(`/guides/${guide.slug}`, {
      changeFrequency: "monthly",
      priority: 0.75,
      lastModified: contentArchitectureLastModified
    })
  );

  const brandRoutes: MetadataRoute.Sitemap = seedCatalog
    .filter((brand) => brand.published && isBrandPubliclyAvailable(brand.slug))
    .flatMap((brand) => {
      const brandPath = `/brands/${brand.slug}`;
      return localizedRoutes(brandPath, {
        changeFrequency: "monthly",
        priority: brand.brandType === "represented" ? 0.8 : 0.6,
        lastModified: brand.slug === "tohnichi" ? tohnichiSeoLastModified : undefined
      });
    });

  const productRoutes: MetadataRoute.Sitemap = seedCatalog
    .filter((brand) => brand.published && isBrandPubliclyAvailable(brand.slug))
    .flatMap((brand) =>
      brand.productGroups.flatMap((group) =>
        group.products.flatMap((product) =>
          localizedRoutes(`/brands/${brand.slug}/products/${product.slug}`, {
            changeFrequency: "monthly",
            priority: 0.7
          })
        )
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
