import type { Language, LocalizedText } from "@/lib/i18n";

export type NavItem = {
  href: string;
  label: LocalizedText;
};

export const navigationItems: NavItem[] = [
  { href: "/about", label: { id: "Tentang", en: "About" } },
  { href: "/brands", label: { id: "Brand", en: "Brands" } },
  { href: "/industries", label: { id: "Industri", en: "Industries" } },
  { href: "/partners", label: { id: "Untuk Partner", en: "For Partners" } },
  { href: "/contact", label: { id: "Kontak", en: "Contact" } }
];

export const company = {
  publicName: "PT Citra Sukses Ekapratama",
  shortName: "CSE",
  longName: "Citra Sukses Ekapratama",
  tagline: "Your Industrial Sourcing Partner",
  email: "cse@citra-sukses.com",
  positioning: {
    id: "Industrial sourcing partner untuk pabrik di Indonesia. CSE membantu procurement dan engineering mencari produk industri dari Jepang dan Asia, mengecek kecocokan teknis, menyediakan alternatif, dan mempercepat proses RFQ.",
    en: "Indonesia's industrial sourcing partner. CSE helps procurement and engineering teams find industrial products from Japan and Asia, check technical fit, provide alternatives, and speed up the RFQ process."
  } satisfies LocalizedText,
  partnerPositioning: {
    id: "CSE membantu brand industrial luar negeri masuk ke Indonesia melalui model distribusi yang ramping, praktis, dan didukung pengalaman 30+ tahun.",
    en: "CSE helps overseas industrial brands enter Indonesia through a lean distribution model backed by 30+ years of automotive and industrial supply experience."
  } satisfies LocalizedText
};

export function languageLabel(lang: Language) {
  return lang === "en" ? "EN" : "ID";
}
