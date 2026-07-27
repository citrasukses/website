"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail } from "lucide-react";
import { company, navigationItems } from "@/data/navigation";
import { staticLanguage, text, withLang } from "@/lib/i18n";

export function Footer() {
  const lang = staticLanguage();

  return (
    <footer className="relative overflow-hidden bg-graphite-900 text-white">
      <div className="absolute left-0 top-0 h-1 w-40 bg-signal-500" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:34px_34px] opacity-30" />
      <div className="container-page relative grid gap-10 py-12 md:grid-cols-[1.3fr_0.7fr_0.8fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center overflow-hidden border border-white/15 bg-white">
              <Image src="/assets/company/cse_logo.png" alt="CSE logo" width={48} height={48} className="h-full w-full object-contain" />
            </span>
            <div>
              <p className="font-bold">{company.publicName}</p>
              <p className="text-sm text-graphite-200">{text(company.positioning, lang)}</p>
            </div>
          </div>
          <p className="mt-6 max-w-xl text-sm leading-6 text-graphite-200">
            {lang === "en"
              ? "Industrial sourcing, brand representation, and technical product support for Indonesia's manufacturing supply chain."
              : "Pengadaan industrial, representasi brand, dan dukungan produk teknis untuk rantai pasok manufaktur Indonesia."}
          </p>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-graphite-200">Navigation</p>
          <div className="mt-4 grid gap-3">
            {navigationItems.map((item) => (
              <Link key={item.href} href={withLang(item.href, lang)} className="text-sm text-graphite-200 transition hover:text-white">
                {text(item.label, lang)}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-graphite-200">Contact</p>
          <a href={`mailto:${company.email}`} className="mt-4 inline-flex items-center gap-2 text-sm text-white">
            <Mail className="h-4 w-4" aria-hidden="true" />
            {company.email}
          </a>
          <p className="mt-4 text-sm leading-6 text-graphite-200">
            {lang === "en"
              ? "Send product requests, model questions, or partnership inquiries by email."
              : "Kirim kebutuhan produk, pertanyaan model, atau inquiry partnership melalui email."}
          </p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-page relative py-5 text-xs text-graphite-200">
          © {new Date().getFullYear()} {company.publicName}
        </div>
      </div>
    </footer>
  );
}
