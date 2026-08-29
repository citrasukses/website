import type { Metadata } from "next";
import type { Language } from "@/lib/i18n";
import {
  absoluteLanguageAlternates,
  absoluteLocalizedUrl,
  absoluteUrl,
  ORGANIZATION_ID,
  siteConfig
} from "@/lib/seo-config";
import type { IndexabilityDecision } from "@/lib/seo-indexability";

type PageMetadataInput = {
  path: string;
  title: string;
  description: string;
  lang: Language;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  indexability?: IndexabilityDecision;
};

type CollectionJsonLdInput = {
  path: string;
  title: string;
  description: string;
  lang: Language;
  items: Array<{ name: string; path: string }>;
};

type BreadcrumbJsonLdInput = {
  lang: Language;
  items: Array<{ name: string; path: string }>;
};

export function organizationReference() {
  return {
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: siteConfig.legalName,
    url: absoluteUrl("/")
  };
}

export function buildBreadcrumbJsonLd({ lang, items }: BreadcrumbJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "CSE", item: absoluteUrl("/") },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: item.name,
        item: absoluteLocalizedUrl(item.path, lang)
      }))
    ]
  };
}

export function buildPageMetadata({
  path,
  title,
  description,
  lang,
  image,
  imageAlt,
  type = "website",
  indexability
}: PageMetadataInput): Metadata {
  const canonical = absoluteLocalizedUrl(path, lang);
  const socialTitle = title.endsWith("| CSE") ? title : `${title} | CSE`;

  return {
    title,
    description,
    robots: indexability && !indexability.index
      ? {
          index: false,
          follow: indexability.follow,
          googleBot: {
            index: false,
            follow: indexability.follow
          }
        }
      : undefined,
    alternates: {
      canonical,
      languages: absoluteLanguageAlternates(path)
    },
    openGraph: {
      title: socialTitle,
      description,
      url: canonical,
      locale: lang === "en" ? "en_US" : "id_ID",
      type,
      images: image ? [{ url: absoluteUrl(image), alt: imageAlt ?? title }] : undefined
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: image ? [absoluteUrl(image)] : undefined
    }
  };
}

export function buildCollectionJsonLd({ path, title, description, lang, items }: CollectionJsonLdInput) {
  const url = absoluteLocalizedUrl(path, lang);

  return [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: title,
      description,
      url,
      inLanguage: lang === "en" ? "en-US" : "id-ID",
      provider: organizationReference(),
      mainEntity: {
        "@type": "ItemList",
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          url: absoluteLocalizedUrl(item.path, lang)
        }))
      }
    },
    buildBreadcrumbJsonLd({ lang, items: [{ name: title, path }] })
  ];
}
