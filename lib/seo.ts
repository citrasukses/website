import type { Metadata } from "next";
import { languageAlternates, localizedPath, type Language } from "@/lib/i18n";

type PageMetadataInput = {
  path: string;
  title: string;
  description: string;
  lang: Language;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
};

type CollectionJsonLdInput = {
  path: string;
  title: string;
  description: string;
  lang: Language;
  items: Array<{ name: string; path: string }>;
};

const siteUrl = "https://cse.co.id";

function absoluteLocalizedUrl(path: string, lang: Language) {
  const localized = localizedPath(path, lang);
  return /^https?:\/\//.test(localized) ? localized : new URL(localized, siteUrl).toString();
}

export function buildPageMetadata({
  path,
  title,
  description,
  lang,
  image,
  imageAlt,
  type = "website"
}: PageMetadataInput): Metadata {
  const canonical = localizedPath(path, lang);

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: languageAlternates(path)
    },
    openGraph: {
      title: `${title} | CSE`,
      description,
      url: canonical,
      locale: lang === "en" ? "en_US" : "id_ID",
      type,
      images: image ? [{ url: image, alt: imageAlt ?? title }] : undefined
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | CSE`,
      description,
      images: image ? [image] : undefined
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
      provider: {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "PT Citra Sukses Ekapratama",
        url: siteUrl
      },
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
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "CSE", item: siteUrl },
        { "@type": "ListItem", position: 2, name: title, item: url }
      ]
    }
  ];
}
