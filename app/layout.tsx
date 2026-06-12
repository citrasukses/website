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
  metadataBase: new URL("https://citra-sukses.com"),
  openGraph: {
    title: "CSE | PT Citra Sukses Ekapratama",
    description:
      "Industrial goods supplier and distribution partner for Indonesia's automotive and industrial sectors.",
    type: "website"
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
