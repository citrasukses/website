import { Breadcrumb } from "@/components/Breadcrumb";
import { GuideFlowRunner } from "@/components/guideflow/GuideFlowRunner";
import { doteCalibrationGuideFlow } from "@/data/guideflows/dote-calibration";
import { text, type Language, withLang } from "@/lib/i18n";

// Review-only component. It is intentionally not imported by the public route.
export function DoteCalibrationGuide({ lang }: { lang: Language }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: text(doteCalibrationGuideFlow.title, lang),
    description: text(doteCalibrationGuideFlow.description, lang),
    totalTime: "PT60M",
    supply: doteCalibrationGuideFlow.prerequisites.map((item) => ({
      "@type": "HowToSupply",
      name: text(item, lang)
    })),
    step: doteCalibrationGuideFlow.steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: text(step.title, lang),
      text: text(step.instruction, lang),
      image: step.media.type === "image" ? step.media.src : undefined,
      url: `${withLang(`/guides/${doteCalibrationGuideFlow.slug}`, lang)}#${step.id}`
    }))
  };

  return (
    <>
      <script
        id="dote-calibration-guideflow-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Breadcrumb
        homeHref={withLang("/", lang)}
        items={[
          { href: withLang("/guides", lang), label: lang === "en" ? "Guides" : "Panduan" },
          { label: text(doteCalibrationGuideFlow.title, lang) }
        ]}
      />
      <GuideFlowRunner guide={doteCalibrationGuideFlow} lang={lang} />
    </>
  );
}
