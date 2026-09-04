import type { Metadata } from "next";
import { CategoryHubPage } from "@/components/CategoryHubPage";
import { getCategoryHub } from "@/data/category-hubs";
import { SEO_INTENT_OWNERS } from "@/data/seo-intents";
import { staticLanguage, text } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";

const category = getCategoryHub("torque-wrench")!;

export function generateMetadata(): Metadata {
  const lang = staticLanguage();
  const intent = SEO_INTENT_OWNERS.torqueWrenchCategory;
  return buildPageMetadata({
    path: intent.route,
    title: intent.title[lang],
    description: intent.description[lang],
    lang,
    image: category.image,
    imageAlt: text(category.imageAlt, lang)
  });
}

export default function TorqueWrenchPage() {
  return <CategoryHubPage category={category} lang={staticLanguage()} />;
}
