import Link from "next/link";
import { ArrowUpRight, CalendarDays } from "lucide-react";
import { AssetSlot } from "@/components/AssetSlot";
import type { NewsItem } from "@/data/news";
import { text, type Language, withLang } from "@/lib/i18n";

type NewsCardProps = {
  item: NewsItem;
  lang: Language;
};

function formatNewsDate(value: string, lang: Language) {
  return new Intl.DateTimeFormat(lang === "en" ? "en-US" : "id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).format(new Date(`${value}T00:00:00`));
}

export function NewsCard({ item, lang }: NewsCardProps) {
  const href = item.href ?? (item.brandSlug ? `/brands/${item.brandSlug}` : "/contact");
  const isExternal = href.startsWith("http");
  const cardHref = isExternal ? href : withLang(href, lang);
  const meta = [item.brandName, item.productName].filter(Boolean).join(" / ");

  const content = (
    <article className="group grid h-full overflow-hidden border border-graphite-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-industrial-600 hover:shadow-panel md:grid-cols-[0.82fr_1fr]">
      <AssetSlot
        src={item.image}
        alt={text(item.title, lang)}
        label={item.brandName ?? text(item.category, lang)}
        className="min-h-[210px] border-0 border-b border-graphite-200 bg-graphite-50 md:border-b-0 md:border-r"
        imageClassName="object-cover transition duration-500 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, 38vw"
      />
      <div className="flex min-w-0 flex-col p-6">
        <div className="flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[0.16em] text-graphite-500">
          <span className="text-signal-600">{text(item.category, lang)}</span>
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
            {formatNewsDate(item.publishedAt, lang)}
          </span>
        </div>
        {meta ? (
          <p className="mt-4 text-xs font-bold uppercase tracking-[0.16em] text-industrial-700">{meta}</p>
        ) : null}
        <h3 className="mt-2 text-2xl font-bold leading-tight text-graphite-900">{text(item.title, lang)}</h3>
        <p className="mt-4 text-sm leading-6 text-graphite-500">{text(item.summary, lang)}</p>
        {item.tags?.length ? (
          <div className="mt-5 flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span key={text(tag, lang)} className="border border-graphite-200 bg-graphite-50 px-2.5 py-1 text-xs font-semibold text-graphite-600">
                {text(tag, lang)}
              </span>
            ))}
          </div>
        ) : null}
        <span className="mt-6 inline-flex h-9 w-9 items-center justify-center border border-graphite-200 bg-graphite-50 transition group-hover:border-industrial-600 group-hover:bg-industrial-700">
          <ArrowUpRight className="h-4 w-4 text-graphite-500 transition group-hover:text-white" aria-hidden="true" />
        </span>
      </div>
    </article>
  );

  if (isExternal) {
    return (
      <a href={cardHref} target="_blank" rel="noreferrer" className="block h-full">
        {content}
      </a>
    );
  }

  return (
    <Link href={cardHref} className="block h-full">
      {content}
    </Link>
  );
}
