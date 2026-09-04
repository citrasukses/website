import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IndustryDetailPage } from "@/components/IndustryDetailPage";
import { industries } from "@/data/industries";
import { industryCaseStudies } from "@/data/industry-case-studies";
import { getIndustryPageContent, industryPages } from "@/data/industry-pages";
import { staticLanguage, text } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return industryPages.map((page) => ({ slug: page.industrySlug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const lang = staticLanguage();
  const industry = industries.find((item) => item.slug === slug);
  const content = getIndustryPageContent(slug);
  if (!industry || !content) return {};

  return buildPageMetadata({
    path: `/industries/${slug}`,
    title: text(content.seoTitle, lang),
    description: text(content.seoDescription, lang),
    lang,
    image: industry.image,
    imageAlt: text(industry.title, lang)
  });
}

export default async function IndustryPage({ params }: PageProps) {
  const { slug } = await params;
  const industry = industries.find((item) => item.slug === slug);
  const caseStudy = industryCaseStudies.find((item) => item.industrySlug === slug);
  const content = getIndustryPageContent(slug);
  if (!industry || !caseStudy || !content) notFound();

  return <IndustryDetailPage industry={industry} caseStudy={caseStudy} content={content} lang={staticLanguage()} />;
}
