"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronDown, Languages, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { company, navigationItems } from "@/data/navigation";
import { staticLanguage, text, withLang } from "@/lib/i18n";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [openDesktopMenu, setOpenDesktopMenu] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const desktopMenuButtons = useRef<Record<string, HTMLButtonElement | null>>({});
  const pathname = usePathname();
  const lang = staticLanguage();
  const nextLanguage = lang === "id" ? "en" : "id";
  const languagePath =
    pathname === "/en" ? "/" : pathname.startsWith("/en/") ? pathname.slice(3) : pathname;
  const languageHref = withLang(languagePath, nextLanguage);
  const languageLabel = nextLanguage === "en" ? "English" : "Bahasa Indonesia";

  useEffect(() => {
    setOpen(false);
    setOpenDesktopMenu(null);
  }, [pathname]);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setOpenDesktopMenu(null);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || !openDesktopMenu) return;
      const menuHref = openDesktopMenu;
      setOpenDesktopMenu(null);
      desktopMenuButtons.current[menuHref]?.focus();
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [openDesktopMenu]);

  return (
    <header ref={headerRef} className="sticky top-0 z-50 border-b border-graphite-200 bg-white/95 shadow-sm backdrop-blur-xl">
      <div className="container-page flex min-h-[4.5rem] items-center justify-between gap-4 py-2">
        <Link
          href={withLang("/", lang)}
          className="focus-ring flex min-w-0 items-center gap-3"
          aria-label={lang === "en" ? "CSE home" : "Beranda CSE"}
        >
          <Image
            src="/assets/company/cse_logo.png"
            alt="CSE"
            width={120}
            height={60}
            priority
            className="h-10 w-auto shrink-0 object-contain sm:h-11"
          />
          <span className="hidden min-w-0 flex-col sm:flex xl:hidden 2xl:flex">
            <span className="truncate text-lg font-extrabold leading-none tracking-[-0.03em] text-cse-500 2xl:text-xl">
              {company.longName}
            </span>
            <span className="mt-1 self-end text-[10px] italic leading-none text-cse-500">
              {company.tagline}
            </span>
          </span>
        </Link>

        <nav className="relative hidden items-stretch gap-1 xl:flex" aria-label={lang === "en" ? "Main navigation" : "Navigasi utama"}>
          {navigationItems.map((item) => {
            const active =
              languagePath === item.href || languagePath.startsWith(`${item.href}/`);
            const menuOpen = openDesktopMenu === item.href;

            if (item.menu) {
              const menuId = `desktop-nav-${item.href.slice(1)}`;
              return (
                <div
                  key={item.href}
                  className="relative flex"
                  onMouseEnter={() => setOpenDesktopMenu(item.href)}
                  onMouseLeave={() => setOpenDesktopMenu(null)}
                  onFocus={() => setOpenDesktopMenu(item.href)}
                  onBlur={(event) => {
                    const menuContainer = event.currentTarget;
                    window.requestAnimationFrame(() => {
                      if (!menuContainer.contains(document.activeElement)) setOpenDesktopMenu(null);
                    });
                  }}
                >
                  <button
                    ref={(node) => {
                      desktopMenuButtons.current[item.href] = node;
                    }}
                    type="button"
                    className={`focus-ring relative inline-flex items-center gap-1.5 px-2 py-5 text-sm font-semibold transition hover:text-industrial-700 ${
                      active
                        ? "text-industrial-700 after:absolute after:inset-x-2 after:bottom-0 after:h-0.5 after:bg-signal-500"
                        : "text-graphite-700"
                    }`}
                    aria-expanded={menuOpen}
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={() => setOpenDesktopMenu(item.href)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        setOpenDesktopMenu(item.href);
                      }

                      if (event.key === "ArrowDown") {
                        event.preventDefault();
                        setOpenDesktopMenu(item.href);
                        window.requestAnimationFrame(() => {
                          document.querySelector<HTMLAnchorElement>(`#${menuId} a`)?.focus();
                        });
                      }
                    }}
                  >
                    {text(item.label, lang)}
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform ${menuOpen ? "rotate-180" : ""}`}
                      aria-hidden="true"
                    />
                  </button>

                  <div
                    id={menuId}
                    className={`absolute left-1/2 top-full w-[min(56rem,calc(100vw-2rem))] -translate-x-1/2 pt-2 transition duration-150 ${
                      menuOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 pointer-events-none opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden border border-graphite-200 bg-white shadow-panel">
                      <div className="grid grid-cols-[15rem_1fr]">
                        <div className="bg-industrial-800 p-6 text-white">
                          <p className="text-xs font-bold uppercase tracking-[0.18em] text-industrial-100">
                            {text(item.label, lang)}
                          </p>
                          <p className="mt-3 text-sm leading-6 text-white/80">
                            {text(item.menu.description, lang)}
                          </p>
                          <Link
                            href={withLang(item.href, lang)}
                            className="focus-ring mt-6 inline-flex items-center gap-2 text-sm font-bold text-white hover:text-signal-200"
                          >
                            {text(item.menu.overviewLabel, lang)}
                            <ArrowRight className="h-4 w-4" aria-hidden="true" />
                          </Link>
                        </div>
                        <div className={`grid gap-7 p-6 ${item.menu.sections.length === 3 ? "grid-cols-3" : "grid-cols-2"}`}>
                          {item.menu.sections.map((section) => (
                            <section key={text(section.title, lang)} aria-labelledby={`${menuId}-${section.title.en.replace(/\s+/g, "-").toLowerCase()}`}>
                              <h2
                                id={`${menuId}-${section.title.en.replace(/\s+/g, "-").toLowerCase()}`}
                                className="border-b border-graphite-200 pb-2 text-xs font-bold uppercase tracking-[0.15em] text-graphite-500"
                              >
                                {text(section.title, lang)}
                              </h2>
                              <div className="mt-2 grid gap-1">
                                {section.links.map((link) => (
                                  <Link
                                    key={link.href}
                                    href={withLang(link.href, lang)}
                                    className="focus-ring -mx-2 block px-2 py-2.5 transition hover:bg-industrial-50 hover:text-industrial-800"
                                  >
                                    <span className="block text-sm font-semibold">{text(link.label, lang)}</span>
                                    {link.description ? (
                                      <span className="mt-0.5 block text-xs leading-5 text-graphite-500">
                                        {text(link.description, lang)}
                                      </span>
                                    ) : null}
                                  </Link>
                                ))}
                              </div>
                            </section>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={item.href}
                href={withLang(item.href, lang)}
                className={`focus-ring relative px-2 py-5 text-sm font-semibold transition hover:text-industrial-700 ${
                  active ? "text-industrial-700 after:absolute after:inset-x-2 after:bottom-0 after:h-0.5 after:bg-signal-500" : "text-graphite-700"
                }`}
              >
                {text(item.label, lang)}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 xl:flex">
          <Link
            href={withLang("/contact", lang)}
            className="focus-ring inline-flex h-10 items-center justify-center bg-signal-500 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-signal-600"
          >
            WhatsApp
          </Link>
          <a
            href={languageHref}
            className="focus-ring inline-flex h-10 items-center gap-2 border border-graphite-300 bg-white px-3 text-sm font-semibold text-graphite-700 transition hover:border-industrial-600 hover:text-industrial-700"
            aria-label={`Switch language to ${languageLabel}`}
            title={`Switch to ${languageLabel}`}
          >
            <Languages className="h-4 w-4" aria-hidden="true" />
            {nextLanguage.toUpperCase()}
          </a>
        </div>

        <button
          type="button"
          className="focus-ring inline-flex h-11 w-11 items-center justify-center border border-graphite-300 bg-white xl:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? (lang === "en" ? "Close navigation" : "Tutup navigasi") : (lang === "en" ? "Open navigation" : "Buka navigasi")}
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </div>

      <div
        id="mobile-navigation"
        className={`grid border-t border-graphite-200 bg-white transition-[grid-template-rows,visibility] duration-200 xl:hidden ${
          open ? "visible grid-rows-[1fr]" : "invisible grid-rows-[0fr]"
        }`}
        aria-hidden={!open}
      >
        <div className="overflow-hidden">
          <nav className="container-page max-h-[calc(100dvh-4.5rem)] overflow-y-auto py-3" aria-label={lang === "en" ? "Mobile navigation" : "Navigasi mobile"}>
            {navigationItems.map((item) =>
              item.menu ? (
                <details key={item.href} className="group border-b border-graphite-100">
                  <summary className="focus-ring flex cursor-pointer list-none items-center justify-between py-4 text-sm font-semibold text-graphite-800 [&::-webkit-details-marker]:hidden">
                    {text(item.label, lang)}
                    <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" aria-hidden="true" />
                  </summary>
                  <div className="pb-4 pl-3">
                    <Link
                      href={withLang(item.href, lang)}
                      className="focus-ring inline-flex items-center gap-2 py-2 text-sm font-bold text-industrial-700"
                      onClick={() => setOpen(false)}
                    >
                      {text(item.menu.overviewLabel, lang)}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                    <div className="mt-2 grid gap-5 sm:grid-cols-2">
                      {item.menu.sections.map((section) => (
                        <section key={text(section.title, lang)}>
                          <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-graphite-500">
                            {text(section.title, lang)}
                          </h2>
                          <div className="mt-1 grid">
                            {section.links.map((link) => (
                              <Link
                                key={link.href}
                                href={withLang(link.href, lang)}
                                className="focus-ring py-2 text-sm text-graphite-700 hover:text-industrial-700"
                                onClick={() => setOpen(false)}
                              >
                                {text(link.label, lang)}
                              </Link>
                            ))}
                          </div>
                        </section>
                      ))}
                    </div>
                  </div>
                </details>
              ) : (
                <Link
                  key={item.href}
                  href={withLang(item.href, lang)}
                  className="focus-ring block border-b border-graphite-100 py-4 text-sm font-semibold text-graphite-800"
                  onClick={() => setOpen(false)}
                >
                  {text(item.label, lang)}
                </Link>
              )
            )}
            <div className="mt-4 flex gap-3">
              <Link
                href={withLang("/contact", lang)}
                className="focus-ring inline-flex h-10 items-center bg-signal-500 px-4 text-sm font-semibold text-white"
                onClick={() => setOpen(false)}
              >
                WhatsApp
              </Link>
              <a
                href={languageHref}
                className="focus-ring inline-flex h-10 items-center gap-2 border border-graphite-300 bg-white px-3 text-sm font-semibold text-graphite-700"
                aria-label={`Switch language to ${languageLabel}`}
              >
                <Languages className="h-4 w-4" aria-hidden="true" />
                {nextLanguage.toUpperCase()}
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
