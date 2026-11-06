import type { Metadata } from "next";
import type { Language } from "@/lib/i18n";
import {
  absoluteLanguageAlternates,
  absoluteLocalizedUrl,
  absoluteUrl,
  defaultSocialImage,
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
      { "@type": "ListItem", position: 1, name: "CSE", item: absoluteLocalizedUrl("/", lang) },
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
  const normalizedDescription = summarizeMetaDescription(description);
  const socialImage = image ?? defaultSocialImage.path;
  const socialImageAlt = imageAlt ?? (lang === "en"
    ? "CSE industrial sourcing and authorized distributor services in Indonesia"
    : "Layanan pengadaan industri dan distributor resmi CSE di Indonesia");
  const socialImageDescriptor = {
    url: absoluteUrl(socialImage),
    alt: socialImageAlt,
    ...(image ? {} : { width: defaultSocialImage.width, height: defaultSocialImage.height })
  };

  return {
    title,
    description: normalizedDescription,
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
      description: normalizedDescription,
      url: canonical,
      siteName: siteConfig.legalName,
      locale: lang === "en" ? "en_US" : "id_ID",
      alternateLocale: lang === "en" ? ["id_ID"] : ["en_US"],
      type,
      images: [socialImageDescriptor]
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: normalizedDescription,
      images: [absoluteUrl(socialImage)]
    }
  };
}

/**
 * Keep search snippets concise without replacing verified, visible page copy.
 * Prefer complete sentences; only use an ellipsis when the first sentence is
 * itself too long.
 */
export function summarizeMetaDescription(description: string, maxLength = 160) {
  const normalized = description.replace(/\s+/g, " ").trim();
  if (normalized.length <= maxLength) return normalized;

  let sentenceEnd = -1;
  for (const match of normalized.matchAll(/[.!?](?=\s+[A-ZÀ-Þ]|$)/g)) {
    if ((match.index ?? maxLength) >= maxLength) break;
    sentenceEnd = match.index ?? sentenceEnd;
  }
  if (sentenceEnd >= maxLength * 0.45) return normalized.slice(0, sentenceEnd + 1);

  const cutoff = normalized.slice(0, maxLength - 1);
  const wordBoundary = cutoff.lastIndexOf(" ");
  return `${cutoff.slice(0, wordBoundary > maxLength * 0.7 ? wordBoundary : cutoff.length).trimEnd()}…`;
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
