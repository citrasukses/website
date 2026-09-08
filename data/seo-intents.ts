import type { LocalizedText } from "@/lib/i18n";

type SeoIntentOwner = {
  route: string;
  primaryIntent: string;
  indexability: "index" | "noindex" | "selective";
  title: LocalizedText;
  description: LocalizedText;
};

/**
 * One canonical owner for each TOHNICHI search-intent cluster.
 *
 * Keep broad brand, category, educational, catalogue, and model-family intent
 * separate. This prevents metadata drift from making several CSE pages target
 * the same query and gives editors one place to review ownership.
 */
export const SEO_INTENT_OWNERS = {
  tohnichiDistributor: {
    route: "/brands/tohnichi",
    primaryIntent: "official TOHNICHI distributor, sales, service, and calibration in Indonesia",
    indexability: "index",
    title: {
      id: "TOHNICHI Indonesia | Distributor Resmi & Service",
      en: "TOHNICHI Indonesia | Official Distributor & Service"
    },
    description: {
      id: "PT Citra Sukses Ekapratama adalah distributor resmi, agen penjualan dan servis TOHNICHI di Indonesia.",
      en: "PT Citra Sukses Ekapratama is an official TOHNICHI distributor, sales and service agent in Indonesia."
    }
  },
  torqueWrenchCategory: {
    route: "/torque-wrench",
    primaryIntent: "industrial torque wrench selection in Indonesia",
    indexability: "index",
    title: {
      id: "Kunci Torsi TOHNICHI Indonesia | Torque Wrench",
      en: "Industrial Torque Wrenches Indonesia | TOHNICHI"
    },
    description: {
      id: "Kunci torsi TOHNICHI untuk produksi, maintenance, dan inspeksi. CSE adalah agen penjualan dan servis resmi TOHNICHI di Indonesia. Temukan tipe click, preset, dial, digital, dan wireless.",
      en: "Choose a TOHNICHI torque wrench for assembly, maintenance, or inspection in Indonesia, from click and preset tools to dial and digital models."
    }
  },
  controlledTightening: {
    route: "/tohnichi-torsi-tepat",
    primaryIntent: "how to achieve consistent bolt and screw tightening",
    indexability: "index",
    title: {
      id: "Cara Mengencangkan Baut dengan Torsi Tepat | TOHNICHI",
      en: "Bolt & Screw Tightening Guide | TOHNICHI"
    },
    description: {
      id: "Pelajari cara mengurangi variasi pengencangan baut dan sekrup dengan target torsi yang jelas, torque wrench TOHNICHI QL, dan torque screwdriver RTD.",
      en: "Learn how clear torque targets, TOHNICHI QL torque wrenches, and RTD torque screwdrivers help reduce variation in bolt and screw tightening."
    }
  },
  tohnichiCatalogue: {
    route: "/brands/tohnichi/products",
    primaryIntent: "browse or search the complete TOHNICHI product catalogue",
    indexability: "noindex",
    title: {
      id: "Katalog Produk TOHNICHI Indonesia Lengkap",
      en: "Complete TOHNICHI Product Catalogue Indonesia"
    },
    description: {
      id: "Cari katalog lengkap TOHNICHI melalui CSE berdasarkan keluarga produk, model, tugas, dan aplikasi.",
      en: "Search the complete TOHNICHI catalogue available through CSE by product family, model, task, and application."
    }
  },
  tohnichiProductFamily: {
    route: "/brands/tohnichi/products/[productSlug]",
    primaryIntent: "TOHNICHI product-family model numbers and specifications",
    indexability: "selective",
    title: {
      id: "{product} TOHNICHI - Model & Spesifikasi",
      en: "{product} TOHNICHI - Models & Specifications"
    },
    description: {
      id: "Setiap keluarga produk memiliki deskripsi unik berdasarkan aplikasi, model, dan spesifikasi resminya.",
      en: "Each product family has a unique description based on its official application, models, and specifications."
    }
  }
} as const satisfies Record<string, SeoIntentOwner>;

export function assertUniqueSeoIntentOwnership() {
  const seenRoutes = new Set<string>();
  const seenIntents = new Set<string>();

  for (const owner of Object.values(SEO_INTENT_OWNERS)) {
    if (seenRoutes.has(owner.route)) {
      throw new Error(`Duplicate SEO intent route owner: ${owner.route}`);
    }
    if (seenIntents.has(owner.primaryIntent)) {
      throw new Error(`Duplicate SEO primary intent owner: ${owner.primaryIntent}`);
    }
    seenRoutes.add(owner.route);
    seenIntents.add(owner.primaryIntent);
  }
}

export function tohnichiProductFamilyTitle(productName: string, lang: keyof LocalizedText) {
  return SEO_INTENT_OWNERS.tohnichiProductFamily.title[lang].replace("{product}", productName);
}
