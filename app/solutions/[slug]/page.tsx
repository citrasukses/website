import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SolutionDetailPage } from "@/components/SolutionDetailPage";
import { getSolutionPage, solutionPages } from "@/data/solution-pages";
import { staticLanguage, text } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return solutionPages.map((solution) => ({ slug: solution.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolutionPage(slug);
  const lang = staticLanguage();
  if (!solution) return {};

  return buildPageMetadata({
    path: `/solutions/${solution.slug}`,
    title: text(solution.seoTitle, lang),
    description: text(solution.description, lang),
    lang,
    image: solution.image,
    imageAlt: text(solution.imageAlt, lang)
  });
}

export default async function SolutionPageRoute({ params }: PageProps) {
  const { slug } = await params;
  const solution = getSolutionPage(slug);
  if (!solution) notFound();
  return <SolutionDetailPage solution={solution} lang={staticLanguage()} />;
}
