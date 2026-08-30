import type { Metadata } from "next";
import { CspfddRcmConnectionGuide } from "@/components/CspfddRcmConnectionGuide";
import { staticLanguage } from "@/lib/i18n";

export function generateMetadata(): Metadata {
  const lang = staticLanguage();

  return {
    title: lang === "en" ? "How to Connect FDD to R-CM + M-FD" : "Cara Menghubungkan FDD ke R-CM + M-FD",
    description: lang === "en"
      ? "A step-by-step guide to FDD Group CH, R-CM ID1/ID2, HIGH/LOW torque limits, multiple receivers, testing, and troubleshooting."
      : "Panduan langkah demi langkah untuk Group CH FDD, ID1/ID2 R-CM, torque limit HIGH/LOW, beberapa receiver, testing, dan troubleshooting."
  };
}

export default function CspfddRcmConnectionPage() {
  return <CspfddRcmConnectionGuide lang={staticLanguage()} />;
}
