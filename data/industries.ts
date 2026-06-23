import type { LocalizedText } from "@/lib/i18n";

export type Industry = {
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
  image: string;
  applications: LocalizedText[];
};

export const industries: Industry[] = [
  {
    slug: "automotive",
    title: { id: "Otomotif", en: "Automotive" },
    description: {
      id: "Dukungan produk teknis untuk lini produksi, maintenance, quality control, dan assembly otomotif.",
      en: "Technical product support for automotive production lines, maintenance, quality control, and assembly."
    },
    image: "/assets/industries/automotive.jpg",
    applications: [
      { id: "Assembly dan tightening", en: "Assembly and tightening" },
      { id: "Quality inspection", en: "Quality inspection" },
      { id: "Maintenance tools", en: "Maintenance tools" }
    ]
  },
  {
    slug: "heavy-equipment",
    title: { id: "Alat Berat", en: "Heavy Equipment" },
    description: {
      id: "Produk untuk perawatan, perakitan, dan kebutuhan teknis pabrik alat berat dan komponen pendukung.",
      en: "Products for maintenance, assembly, and technical needs across heavy equipment and supporting component plants."
    },
    image: "/assets/industries/heavy_equipment.png",
    applications: [
      { id: "High torque assembly", en: "High torque assembly" },
      { id: "Workshop maintenance", en: "Workshop maintenance" },
      { id: "Inspection tooling", en: "Inspection tooling" }
    ]
  },
  {
    slug: "oil-gas",
    title: { id: "Oil & Gas", en: "Oil & Gas" },
    description: {
      id: "Pengadaan produk industrial dan alat pendukung untuk kebutuhan operasional yang menuntut reliabilitas tinggi.",
      en: "Industrial product sourcing and supporting tools for operations that require high reliability."
    },
    image: "/assets/industries/oil_and_gas.jpg",
    applications: [
      { id: "Field maintenance", en: "Field maintenance" },
      { id: "Safety-critical tooling", en: "Safety-critical tooling" },
      { id: "Replacement parts sourcing", en: "Replacement parts sourcing" }
    ]
  },
  {
    slug: "general-industry",
    title: { id: "General Industry", en: "General Industry" },
    description: {
      id: "Solusi pengadaan untuk pabrik, workshop, dan distributor teknis yang membutuhkan brand industrial terpercaya.",
      en: "Procurement support for factories, workshops, and technical distributors that need trusted industrial brands."
    },
    image: "/assets/brands/products/tohnichi/general_industry.avif",
    applications: [
      { id: "Factory supplies", en: "Factory supplies" },
      { id: "Production tools", en: "Production tools" },
      { id: "Technical consultation", en: "Technical consultation" }
    ]
  }
];
