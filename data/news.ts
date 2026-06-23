import type { LocalizedText } from "@/lib/i18n";

export type NewsItem = {
  slug: string;
  title: LocalizedText;
  summary: LocalizedText;
  category: LocalizedText;
  publishedAt: string;
  image: string;
  brandName?: string;
  brandSlug?: string;
  productName?: string;
  href?: string;
  tags?: LocalizedText[];
  published?: boolean;
};

export const newsItems: NewsItem[] = [
  // Add new brand or product news here. Example:
  // {
  //   slug: "tohnichi-torque-wrench-focus",
  //   title: {
  //     id: "Product focus: Tohnichi torque wrench untuk lini assembly",
  //     en: "Product focus: Tohnichi torque wrenches for assembly lines"
  //   },
  //   summary: {
  //     id: "Update singkat untuk kebutuhan tightening, inspection, dan torque control di produksi.",
  //     en: "A short update for tightening, inspection, and torque control needs in production."
  //   },
  //   category: { id: "Product news", en: "Product news" },
  //   publishedAt: "2026-06-12",
  //   image: "/assets/brands/products/tohnichi/QL100N4.jpg",
  //   brandName: "Tohnichi",
  //   brandSlug: "tohnichi",
  //   productName: "QL / CL Series",
  //   tags: [
  //     { id: "Torque tools", en: "Torque tools" },
  //     { id: "Assembly", en: "Assembly" }
  //   ]
  // }
];

export const publishedNews = newsItems
  .filter((item) => item.published !== false)
  .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
