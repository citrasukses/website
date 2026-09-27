import type { Language, LocalizedText } from "@/lib/i18n";

export type NavItem = {
  href: string;
  label: LocalizedText;
  menu?: {
    description: LocalizedText;
    overviewLabel: LocalizedText;
    sections: Array<{
      title: LocalizedText;
      links: Array<{
        href: string;
        label: LocalizedText;
        description?: LocalizedText;
      }>;
    }>;
  };
};

export const navigationItems: NavItem[] = [
  { href: "/about", label: { id: "Tentang", en: "About" } },
  {
    href: "/brands",
    label: { id: "Brand", en: "Brands" },
    menu: {
      description: {
        id: "Jelajahi principal utama dan kategori produk industrial yang tersedia melalui CSE.",
        en: "Explore key principals and industrial product categories available through CSE."
      },
      overviewLabel: { id: "Lihat semua brand", en: "View all brands" },
      sections: [
        {
          title: { id: "Brand utama", en: "Key brands" },
          links: [
            {
              href: "/brands/tohnichi",
              label: { id: "TOHNICHI", en: "TOHNICHI" },
              description: { id: "Torque tools & tightening systems", en: "Torque tools & tightening systems" }
            },
            {
              href: "/brands/nac",
              label: { id: "NAC", en: "NAC" },
              description: { id: "Socket, bit & quick coupling", en: "Sockets, bits & quick couplings" }
            },
            {
              href: "/brands/fuji-star",
              label: { id: "Sankyo Rikagaku / FUJISTAR", en: "Sankyo Rikagaku / FUJISTAR" },
              description: { id: "Abrasive & surface finishing", en: "Abrasives & surface finishing" }
            }
          ]
        },
        {
          title: { id: "Kategori populer", en: "Popular categories" },
          links: [
            { href: "/torque-wrench", label: { id: "Torque wrench", en: "Torque wrenches" } },
            { href: "/torque-screwdriver", label: { id: "Torque screwdriver", en: "Torque screwdrivers" } },
            { href: "/torque-tester", label: { id: "Torque tester", en: "Torque testers" } },
            { href: "/products", label: { id: "Semua kategori produk", en: "All product categories" } }
          ]
        }
      ]
    }
  },
  { href: "/industries", label: { id: "Industri", en: "Industries" } },
  {
    href: "/solutions",
    label: { id: "Solusi", en: "Solutions" },
    menu: {
      description: {
        id: "Mulai dari masalah aplikasi, lalu temukan sistem, produk, dan panduan yang relevan.",
        en: "Start with the application challenge, then find the relevant system, products, and guidance."
      },
      overviewLabel: { id: "Lihat semua solusi", en: "View all solutions" },
      sections: [
        {
          title: { id: "Solusi manufaktur", en: "Manufacturing solutions" },
          links: [
            { href: "/solutions/torque-control", label: { id: "Torque control", en: "Torque control" } },
            { href: "/solutions/poka-yoke-tightening", label: { id: "Poka-yoke tightening", en: "Poka-yoke tightening" } },
            {
              href: "/solutions/torque-calibration-verification",
              label: { id: "Kalibrasi & verifikasi", en: "Calibration & verification" }
            },
            { href: "/solutions/industrial-sourcing", label: { id: "Industrial sourcing", en: "Industrial sourcing" } }
          ]
        },
        {
          title: { id: "TOHNICHI", en: "TOHNICHI" },
          links: [
            { href: "/brands/tohnichi", label: { id: "Ringkasan TOHNICHI Indonesia", en: "TOHNICHI Indonesia overview" } },
            {
              href: "/tohnichi-torsi-tepat",
              label: { id: "Mengapa kontrol torsi penting", en: "Why torque control matters" }
            },
            {
              href: "/brands/tohnichi/products/fd-fdd",
              label: { id: "FD/FDD wireless torque wrench", en: "FD/FDD wireless torque wrench" }
            },
            {
              href: "/brands/tohnichi/products/r-cm",
              label: { id: "R-CM wireless receiver", en: "R-CM wireless receiver" }
            },
            { href: "/brands/tohnichi/products", label: { id: "Katalog produk TOHNICHI", en: "TOHNICHI product catalog" } }
          ]
        },
        {
          title: { id: "Panduan pemilihan", en: "Selection guides" },
          links: [
            { href: "/torque-wrench", label: { id: "Pilih torque wrench", en: "Choose a torque wrench" } },
            { href: "/torque-screwdriver", label: { id: "Pilih torque screwdriver", en: "Choose a torque screwdriver" } },
            { href: "/torque-tester", label: { id: "Pilih torque tester", en: "Choose a torque tester" } },
            { href: "/guides", label: { id: "Semua buyer guides", en: "All buyer guides" } }
          ]
        }
      ]
    }
  },
  { href: "/partners", label: { id: "Untuk Partner", en: "For Partners" } },
  { href: "/contact", label: { id: "Kontak", en: "Contact" } }
];

export const company = {
  publicName: "PT Citra Sukses Ekapratama",
  shortName: "CSE",
  longName: "Citra Sukses Ekapratama",
  tagline: "Your Industrial Sourcing Partner",
  email: "cse@citra-sukses.com",
  whatsapp: {
    href: "https://wa.me/6281818885121"
  },
  positioning: {
    id: "Industrial sourcing partner untuk pabrik di Indonesia. CSE membantu procurement dan engineering mencari produk industri dari Jepang dan Asia, memeriksa kecocokan teknis, menyediakan alternatif, dan mempercepat proses RFQ.",
    en: "Indonesia's industrial sourcing partner. CSE helps procurement and engineering teams find industrial products from Japan and Asia, check technical fit, provide alternatives, and speed up the RFQ process."
  } satisfies LocalizedText,
  partnerPositioning: {
    id: "CSE membantu brand industrial luar negeri masuk ke Indonesia melalui model distribusi yang ramping, praktis, dan didukung pengalaman 30+ tahun.",
    en: "CSE helps overseas industrial brands enter Indonesia through a lean distribution model backed by 30+ years of automotive and industrial supply experience."
  } satisfies LocalizedText
};

export function languageLabel(lang: Language) {
  return lang === "en" ? "EN" : "ID";
}
