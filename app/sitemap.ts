import type { MetadataRoute } from "next";
import { seedCatalog } from "@/data/catalog-seed";
import { isBrandPubliclyAvailable } from "@/lib/brand-visibility";

const baseUrl = "https://cse.co.id";
const tohnichiPath = "/brands/tohnichi";

export const dynamic = "force-static";

function absoluteUrl(path: string) {
  return `${baseUrl}${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const tohnichiLanguageAlternates = {
    "id-ID": absoluteUrl(tohnichiPath),
    en: absoluteUrl(`/en${tohnichiPath}`),
    "x-default": absoluteUrl(tohnichiPath)
  };
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      changeFrequency: "weekly",
      priority: 1
    },
    {
      url: absoluteUrl("/about"),
      changeFrequency: "monthly",
      priority: 0.7
    },
    {
      url: absoluteUrl("/brands"),
      changeFrequency: "weekly",
      priority: 0.9
    },
    {
      url: absoluteUrl("/industries"),
      changeFrequency: "monthly",
      priority: 0.8
    },
    {
      url: absoluteUrl("/partners"),
      changeFrequency: "monthly",
      priority: 0.7
    },
    {
      url: absoluteUrl("/contact"),
      changeFrequency: "monthly",
      priority: 0.8
    }
  ];

  const brandRoutes: MetadataRoute.Sitemap = seedCatalog
    .filter((brand) => brand.published && isBrandPubliclyAvailable(brand.slug))
    .flatMap((brand) => {
      const brandPath = `/brands/${brand.slug}`;
      const primaryRoute: MetadataRoute.Sitemap[number] = {
        url: absoluteUrl(brandPath),
        changeFrequency: "monthly",
        priority: brand.brandType === "represented" ? 0.8 : 0.6
      };

      if (brand.slug !== "tohnichi") {
        return [primaryRoute];
      }

      return [
        {
          ...primaryRoute,
          alternates: { languages: tohnichiLanguageAlternates }
        },
        {
          ...primaryRoute,
          url: absoluteUrl(`/en${brandPath}`),
          alternates: { languages: tohnichiLanguageAlternates }
        }
      ];
    });

  const productRoutes: MetadataRoute.Sitemap = seedCatalog
    .filter((brand) => brand.published && isBrandPubliclyAvailable(brand.slug))
    .flatMap((brand) =>
      brand.productGroups.flatMap((group) =>
        group.products.map((product) => ({
          url: absoluteUrl(`/brands/${brand.slug}/products/${product.slug}`),
          changeFrequency: "monthly" as const,
          priority: 0.7
        }))
      )
    );

  return [...staticRoutes, ...brandRoutes, ...productRoutes];
}
