"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { company, navigationItems } from "@/data/navigation";
import { staticLanguage, text, withLang } from "@/lib/i18n";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const lang = staticLanguage();

  return (
    <header className="sticky top-0 z-50 border-b border-graphite-200 bg-white/90 backdrop-blur-xl">
      <div className="container-page flex min-h-[4.5rem] items-center justify-between gap-5 py-2">
        <Link
  href={withLang("/", lang)}
  className="flex items-center gap-4"
>
  <Image
    src="/assets/company/cse_logo.png"
    alt="CSE logo"
    width={140}
    height={70}
    priority
    className="h-12 w-auto object-contain"
  />

  <div className="flex flex-col">
    <span className="text-[30px] font-extrabold leading-[0.9] tracking-[-0.03em] text-cse-500">
      {company.longName}
    </span>

    <span className="mt-1 self-end text-[12px] italic leading-none text-cse-500">
      {company.tagline}
    </span>
  </div>
</Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main navigation">
          {navigationItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={withLang(item.href, lang)}
                className={`relative py-6 text-sm font-semibold transition hover:text-industrial-700 ${
                  active ? "text-industrial-700 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-signal-500" : "text-graphite-700"
                }`}
              >
                {text(item.label, lang)}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href={withLang("/contact", lang)}
            className="focus-ring inline-flex h-10 items-center justify-center bg-signal-500 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-signal-600"
          >
            RFQ
          </Link>
        </div>

        <button
          type="button"
          className="focus-ring inline-flex h-10 w-10 items-center justify-center border border-graphite-300 bg-white lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-graphite-200 bg-white lg:hidden">
          <nav className="container-page flex flex-col py-4" aria-label="Mobile navigation">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={withLang(item.href, lang)}
                className="border-b border-graphite-100 py-4 text-sm font-semibold text-graphite-800"
                onClick={() => setOpen(false)}
              >
                {text(item.label, lang)}
              </Link>
            ))}
            <div className="mt-4 flex gap-3">
              <Link
                href={withLang("/contact", lang)}
                className="focus-ring inline-flex h-10 items-center bg-signal-500 px-4 text-sm font-semibold text-white"
              >
                RFQ
              </Link>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
