import type { Metadata } from "next";
import { Suspense, type ReactNode } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "CSE | PT Citra Sukses Ekapratama",
    template: "%s | CSE"
  },
  description:
    "PT Citra Sukses Ekapratama supplies industrial goods from Japan and overseas manufacturers to Indonesia's automotive and industrial sectors.",
  metadataBase: new URL("https://cse.co.id"),
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "CSE | PT Citra Sukses Ekapratama",
    description:
      "Industrial goods supplier and distribution partner for Indonesia's automotive and industrial sectors.",
    url: "https://cse.co.id",
    siteName: "PT Citra Sukses Ekapratama",
    images: [
      {
        url: "/assets/company/og-authorized-distributor.png",
        width: 1200,
        height: 630,
        alt: "CSE authorized distributor for Tohnichi, NAC, Fuji Star, and Nippon Unit"
      }
    ],
    locale: "id_ID",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "CSE | PT Citra Sukses Ekapratama",
    description:
      "Industrial goods supplier and distribution partner for Indonesia's automotive and industrial sectors.",
    images: ["/assets/company/og-authorized-distributor.png"]
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id">
      <body>
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
