import Link from "next/link";
import { ChevronRight } from "lucide-react";

type BreadcrumbItem = {
  href?: string;
  label: string;
};

export function Breadcrumb({ items, homeHref = "/" }: { items: BreadcrumbItem[]; homeHref?: string }) {
  return (
    <nav aria-label="Breadcrumb" className="container-page pt-6 text-sm text-graphite-500">
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link href={homeHref} className="hover:text-industrial-700">CSE</Link>
        </li>
        {items.map((item) => (
          <li key={item.label} className="flex items-center gap-2">
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
            {item.href ? (
              <Link href={item.href} className="hover:text-industrial-700">{item.label}</Link>
            ) : (
              <span className="font-medium text-graphite-700">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
