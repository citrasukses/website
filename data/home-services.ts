import type { LocalizedText } from "@/lib/i18n";

type HomeService = {
  id: "procurement" | "consultation" | "representation";
  href: string;
  title: LocalizedText;
  description: LocalizedText;
  action: LocalizedText;
};

export const homeServices: HomeService[] = [
  {
    id: "procurement",
    href: "/brands",
    title: { id: "Pengadaan Barang", en: "Industrial Procurement" },
    description: {
      id: "Temukan brand, model, dan produk industri dari Jepang dan Asia melalui satu jalur pengadaan yang jelas.",
      en: "Source industrial brands, models, and products from Japan and Asia through one clear procurement path."
    },
    action: { id: "Temukan brand & produk", en: "Find brands & products" }
  },
  {
    id: "consultation",
    href: "/contact",
    title: { id: "Konsultasi Teknis", en: "Technical Consultation" },
    description: {
      id: "Pilih alat sesuai aplikasi, rentang torsi, dan kebutuhan proses Anda dengan dukungan teknis CSE.",
      en: "Choose tools for your application, torque range, and production process with technical support from CSE."
    },
    action: { id: "Diskusikan aplikasi Anda", en: "Discuss your application" }
  },
  {
    id: "representation",
    href: "/partners",
    title: { id: "Representasi Brand", en: "Brand Representation" },
    description: {
      id: "Hubungkan brand industrial luar negeri dengan pasar Indonesia melalui kemitraan distribusi bersama CSE.",
      en: "Connect your overseas industrial brand with the Indonesian market through a distribution partnership with CSE."
    },
    action: { id: "Jelajahi kemitraan", en: "Explore a partnership" }
  }
];
