import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BuyerGuidePage } from "@/components/BuyerGuidePage";
import { buyerGuides, getBuyerGuide } from "@/data/buyer-guides";
import { staticLanguage, text } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return buyerGuides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getBuyerGuide(slug);
  const lang = staticLanguage();
  if (!guide) return {};

  return buildPageMetadata({
    path: `/guides/${guide.slug}`,
    title: text(guide.seoTitle, lang),
    description: text(guide.description, lang),
    lang,
    image: guide.image,
    imageAlt: text(guide.imageAlt, lang),
    type: "article"
  });
}

export default async function BuyerGuideRoute({ params }: PageProps) {
  const { slug } = await params;
  const guide = getBuyerGuide(slug);
  if (!guide) notFound();
  return <BuyerGuidePage guide={guide} lang={staticLanguage()} />;
}
