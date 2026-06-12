import { NewsCard } from "@/components/NewsCard";
import { SectionHeader } from "@/components/SectionHeader";
import type { NewsItem } from "@/data/news";
import { publishedNews } from "@/data/news";
import type { Language } from "@/lib/i18n";

type NewsSectionProps = {
  lang: Language;
  items?: NewsItem[];
  limit?: number;
  className?: string;
};

export function NewsSection({ lang, items = publishedNews, limit = 3, className = "bg-graphite-50 py-16" }: NewsSectionProps) {
  const visibleItems = items.slice(0, limit);

  if (visibleItems.length === 0) {
    return null;
  }

  return (
    <section className={className}>
      <div className="container-page">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            eyebrow={lang === "en" ? "News" : "Berita"}
            title={lang === "en" ? "Latest brand and product updates." : "Update terbaru brand dan produk."}
            description={
              lang === "en"
                ? "Short updates for new represented brands, product focus items, and sourcing notes from CSE."
                : "Update singkat untuk brand baru, product focus, dan catatan sourcing dari CSE."
            }
          />
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {visibleItems.map((item) => (
            <NewsCard key={item.slug} item={item} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  );
}
