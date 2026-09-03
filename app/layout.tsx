import type { Metadata } from "next";
import { Suspense, type ReactNode } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AttributionInitializer } from "@/components/AttributionInitializer";
import { staticLanguage } from "@/lib/i18n";
import { absoluteLocalizedUrl, absoluteUrl, siteConfig } from "@/lib/seo-config";
import "./globals.css";

export function generateMetadata(): Metadata {
  const lang = staticLanguage();
  const description =
    lang === "en"
      ? "PT Citra Sukses Ekapratama supplies industrial goods from Japan and overseas manufacturers to Indonesia's automotive and industrial sectors."
      : "PT Citra Sukses Ekapratama memasok produk industri dari Jepang dan manufacturer luar negeri untuk sektor otomotif dan industri Indonesia.";

  return {
    applicationName: "CSE",
    icons: {
      icon: [
        {
          url: "/icon.png",
          type: "image/png",
          sizes: "512x512"
        }
      ],
      shortcut: "/icon.png"
    },
    title: {
      default: "CSE | PT Citra Sukses Ekapratama",
      template: "%s | CSE"
    },
    description,
    metadataBase: new URL(siteConfig.url),
    openGraph: {
      title: "CSE | PT Citra Sukses Ekapratama",
      description,
      url: absoluteLocalizedUrl("/", lang),
      siteName: siteConfig.legalName,
      images: [
        {
          url: absoluteUrl("/assets/company/og-authorized-distributor.png"),
          width: 1200,
          height: 630,
        alt: "CSE authorized distributor for TOHNICHI, NAC, Sankyo Rikagaku, Nippon Unit and Fujidenshi products"
        }
      ],
      locale: lang === "en" ? "en_US" : "id_ID",
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: "CSE | PT Citra Sukses Ekapratama",
      description,
      images: [absoluteUrl("/assets/company/og-authorized-distributor.png")]
    }
  };
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const lang = staticLanguage();

  return (
    <html lang={lang}>
      <body>
        <AttributionInitializer />
        <Suspense fallback={<div className="h-16 border-b border-graphite-200 bg-white" />}>
          <Navbar />
        </Suspense>
        <main>{children}</main>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </body>
    </html>
  );
}
