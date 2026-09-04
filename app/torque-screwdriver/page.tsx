import type { Metadata } from "next";
import { CategoryHubPage } from "@/components/CategoryHubPage";
import { getCategoryHub } from "@/data/category-hubs";
import { staticLanguage, text } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";

const category = getCategoryHub("torque-screwdriver")!;

export function generateMetadata(): Metadata {
  const lang = staticLanguage();
  return buildPageMetadata({
    path: "/torque-screwdriver",
    title: text(category.seoTitle, lang),
    description: text(category.description, lang),
    lang,
    image: category.image,
    imageAlt: text(category.imageAlt, lang)
  });
}

export default function TorqueScrewdriverPage() {
  return <CategoryHubPage category={category} lang={staticLanguage()} />;
}
