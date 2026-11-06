import { Breadcrumb } from "@/components/Breadcrumb";
import { GuideFlowRunner } from "@/components/guideflow/GuideFlowRunner";
import { fddRcmGuideFlow } from "@/data/guideflows/fdd-rcm";
import { text, type Language, withLang } from "@/lib/i18n";

export function CspfddRcmConnectionGuide({ lang }: { lang: Language }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: text(fddRcmGuideFlow.title, lang),
    description: text(fddRcmGuideFlow.description, lang),
    totalTime: "PT35M",
    supply: fddRcmGuideFlow.prerequisites.map((item) => ({
      "@type": "HowToSupply",
      name: text(item, lang)
    })),
    step: fddRcmGuideFlow.steps.map((step) => ({
      "@type": "HowToStep",
      name: text(step.title, lang),
      text: text(step.instruction, lang),
      image: step.media.type === "image" ? step.media.src : undefined,
      url: `${withLang(`/guides/${fddRcmGuideFlow.slug}`, lang)}#${step.id}`
    }))
  };

  return (
    <>
      <script
        id="fdd-guideflow-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Breadcrumb
        homeHref={withLang("/", lang)}
        items={[
          { href: withLang("/guides", lang), label: lang === "en" ? "Guides" : "Panduan" },
          { label: text(fddRcmGuideFlow.title, lang) }
        ]}
      />
      <GuideFlowRunner guide={fddRcmGuideFlow} lang={lang} />
    </>
  );
}
