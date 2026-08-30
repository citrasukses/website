import type { LocalizedText } from "@/lib/i18n";
import tohnichiProductGroups from "@/data/tohnichi-products.json";
import specificationSource from "@/data/tohnichi-specifications.json";

export type TohnichiModelRow = {
  key: string;
  siModel?: string;
  siRange?: string;
  siGraduation?: string;
  metricModel?: string;
  metricRange?: string;
  metricGraduation?: string;
  americanModel: string;
  americanRange: string;
  americanGraduation: string;
  overallLengthMm: string;
  weightG: string;
};

export type TohnichiTechnicalDetail = {
  label: string;
  value: string;
};

export type TohnichiSpecificationRow = {
  key: string;
  model: string;
  values: string[];
  details: TohnichiTechnicalDetail[];
};

export type TohnichiSpecificationTable = {
  title: string;
  accuracy: string;
  columns: string[];
  rows: TohnichiSpecificationRow[];
  commonSpecifications?: TohnichiTechnicalDetail[];
};

export type TohnichiProductFamilyDetail = {
  overview: LocalizedText;
  seoDescription: LocalizedText;
  seoKeywords: string[];
  features: LocalizedText[];
  images: string[];
  accuracy: string;
  catalogueReference: LocalizedText;
  officialUrl: string;
  models: TohnichiModelRow[];
  specificationTables: TohnichiSpecificationTable[];
  notes: LocalizedText[];
  standardAccessories: LocalizedText[];
};

type GeneratedSpecificationProduct = {
  sourceUrl: string;
  sourceTitle: string;
  cataloguePages: number[];
  catalogueSectionPages: string;
  applicationsEn: string[];
  featuresEn: string[];
  specificationTables: TohnichiSpecificationTable[];
};

type GeneratedSpecificationData = {
  products: Record<string, GeneratedSpecificationProduct>;
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function catalogueReference(
  productName: string,
  source: GeneratedSpecificationProduct
): LocalizedText {
  const exactPage = source.cataloguePages[0];
  if (exactPage) {
    return {
      id: `Data model dirangkum dari TOHNICHI Reference Guide 2025.10 halaman ${exactPage} dan dicocokkan dengan data produk resmi TOHNICHI.`,
      en: `Model data is summarized from the TOHNICHI Reference Guide 2025.10 page ${exactPage} and cross-checked with official TOHNICHI product data.`
    };
  }
  return {
    id: `${productName} tercakup dalam bagian katalog halaman ${source.catalogueSectionPages}; opsi dan spesifikasi dicocokkan dengan data produk resmi TOHNICHI.`,
    en: `${productName} is covered in the catalogue section on pages ${source.catalogueSectionPages}; options and specifications are cross-checked with official TOHNICHI product data.`
  };
}

function genericFeatures({
  productName,
  groupTitle,
  tags,
  hasTables
}: {
  productName: string;
  groupTitle: LocalizedText;
  tags: LocalizedText[];
  hasTables: boolean;
}): LocalizedText[] {
  const tagId = tags.slice(0, 3).map((tag) => tag.id).join(", ");
  const tagEn = tags.slice(0, 3).map((tag) => tag.en).join(", ");
  return [
    {
      id: `${productName} merupakan bagian dari lini ${groupTitle.id} TOHNICHI${tagId ? ` untuk kebutuhan ${tagId.toLowerCase()}` : ""}.`,
      en: `${productName} is part of the TOHNICHI ${groupTitle.en} lineup${tagEn ? ` for ${tagEn.toLowerCase()} requirements` : ""}.`
    },
    hasTables
      ? {
          id: "Pilihan model, rentang kerja, dimensi, kapasitas, dan parameter teknis lain dapat dibandingkan pada tabel spesifikasi di bawah.",
          en: "Available models, operating ranges, dimensions, capacities, and other technical parameters can be compared in the specification tables below."
        }
      : {
          id: "Konfigurasi akhir ditentukan berdasarkan aplikasi, alat yang terhubung, metode kerja, dan kebutuhan quality control.",
          en: "The final configuration is selected according to the application, connected tools, working method, and quality-control requirements."
        }
  ];
}

function seoDescription({
  productName,
  groupTitle,
  summary
}: {
  productName: string;
  groupTitle: LocalizedText;
  summary: LocalizedText;
}): LocalizedText {
  const firstSentenceId = summary.id.split(/(?<=[.!?])\s/)[0];
  const firstSentenceEn = summary.en.split(/(?<=[.!?])\s/)[0];
  const candidates = {
    id: `${firstSentenceId} Lihat model dan spesifikasi TOHNICHI ${productName} untuk industri Indonesia.`,
    en: `${firstSentenceEn} Compare TOHNICHI ${productName} models and specifications for industrial use in Indonesia.`
  };
  return {
    id:
      candidates.id.length <= 180
        ? candidates.id
        : `TOHNICHI ${productName} ${groupTitle.id}: model, spesifikasi, range, dimensi, opsi, dan aplikasi industri Indonesia.`,
    en:
      candidates.en.length <= 180
        ? candidates.en
        : `TOHNICHI ${productName} ${groupTitle.en}: models, specifications, ranges, dimensions, options, and industrial applications in Indonesia.`
  };
}

const generatedData = specificationSource as GeneratedSpecificationData;

const generatedDetails: Record<string, TohnichiProductFamilyDetail> = {};

for (const group of tohnichiProductGroups) {
  for (const product of group.products) {
    const slug = slugify(product.name);
    const source = generatedData.products[slug];
    if (!source) continue;
    const hasTables = source.specificationTables.length > 0;
    const keywords = Array.from(
      new Set([
        `TOHNICHI ${product.name} Indonesia`,
        `${product.name} ${group.title.id}`,
        `${product.name} ${group.title.en}`,
        `spesifikasi ${product.name}`,
        `model ${product.name}`,
        `supplier TOHNICHI Indonesia`,
        `distributor TOHNICHI Indonesia`,
        ...product.tags.flatMap((tag) => [tag.id, tag.en])
      ])
    );

    generatedDetails[slug] = {
      overview: product.summary,
      seoDescription: seoDescription({
        productName: product.name,
        groupTitle: group.title,
        summary: product.summary
      }),
      seoKeywords: keywords,
      features: genericFeatures({
        productName: product.name,
        groupTitle: group.title,
        tags: product.tags,
        hasTables
      }),
      images: [product.image],
      accuracy:
        source.specificationTables.find((table) => table.accuracy)?.accuracy ?? "",
      catalogueReference: catalogueReference(product.name, source),
      officialUrl: source.sourceUrl,
      models: [],
      specificationTables: source.specificationTables,
      notes: hasTables
        ? [
            {
              id: "Nilai, kompatibilitas, dan ketersediaan model dapat berubah; konfirmasikan kode model akhir sebelum memesan.",
              en: "Values, compatibility, and model availability may change; confirm the final model code before ordering."
            }
          ]
        : [
            {
              id: "Family ini berupa sistem, aksesori, atau solusi berbasis aplikasi; tabel model individual tidak dipublikasikan pada halaman produk resmi.",
              en: "This family is an application-based system, accessory, or solution; an individual model table is not published on the official product page."
            }
          ],
      standardAccessories: []
    };
  }
}

function buildRcmWirelessModuleDetail({
  model,
  image,
  officialUrl,
  overview,
  features,
  compatibilityNote
}: {
  model: "M-FD" | "M-FH";
  image: string;
  officialUrl: string;
  overview: LocalizedText;
  features: LocalizedText[];
  compatibilityNote: LocalizedText;
}): TohnichiProductFamilyDetail {
  const rcmDetail = generatedDetails["r-cm"];
  const sourceTable = rcmDetail?.specificationTables.find((table) =>
    table.rows.some((row) => row.model === model)
  );
  const moduleRow = sourceTable?.rows.find((row) => row.model === model);

  if (!rcmDetail || !sourceTable || !moduleRow) {
    throw new Error(`Missing R-CM specification data for ${model}`);
  }

  return {
    overview,
    seoDescription: {
      id: `TOHNICHI ${model} adalah module radio 2,4 GHz yang dapat ditukar untuk receiver R-CM. Lihat kompatibilitas, spesifikasi, dan aplikasi ${model} di Indonesia.`,
      en: `TOHNICHI ${model} is an exchangeable 2.4 GHz radio module for the R-CM receiver. See ${model} compatibility, specifications, and applications in Indonesia.`
    },
    seoKeywords: [
      `TOHNICHI ${model} Indonesia`,
      `${model} R-CM`,
      `${model} wireless module`,
      `module radio ${model}`,
      "TOHNICHI R-CM Indonesia",
      "supplier TOHNICHI Indonesia",
      "distributor TOHNICHI Indonesia"
    ],
    features,
    images: [image],
    accuracy: "",
    catalogueReference: {
      id: `Spesifikasi ${model} mengikuti halaman resmi TOHNICHI R-CM dan halaman produk ${model}.`,
      en: `${model} specifications follow the official TOHNICHI R-CM page and the dedicated ${model} product page.`
    },
    officialUrl,
    models: [],
    specificationTables: [
      {
        ...sourceTable,
        title: `${model} wireless module specifications`,
        rows: [moduleRow]
      }
    ],
    notes: [
      compatibilityNote,
      {
        id: `${model} adalah module untuk R-CM, bukan receiver mandiri. Konfirmasikan kombinasi tool, receiver, standard radio, dan kode model akhir sebelum memesan.`,
        en: `${model} is a module for R-CM, not a standalone receiver. Confirm the tool, receiver, radio-standard, and final model combination before ordering.`
      }
    ],
    standardAccessories: []
  };
}

generatedDetails["m-fd"] = buildRcmWirelessModuleDetail({
  model: "M-FD",
  image: "/assets/brands/products/tohnichi/catalog/optional-equipment/m-fd.jpg",
  officialUrl:
    "https://www.tohnichi.com/products/optional-equipment/torque-error-proofing-equipment/r-cm-wireless-module-exchangeable-receiver/m-fd/",
  overview: {
    id: "M-FD adalah module radio FHSS 2,4 GHz yang dapat ditukar untuk receiver R-CM. Module ini menerima dan meneruskan data nilai torsi dari torque wrench FD/FDD dan data torsi serta sudut dari FDD-AD untuk judgment dan traceability proses pengencangan.",
    en: "M-FD is an exchangeable 2.4 GHz FHSS radio module for the R-CM receiver. It receives and passes torque-value data from FD/FDD torque wrenches and torque-and-angle data from FDD-AD for tightening judgment and traceability."
  },
  features: [
    {
      id: "Dirancang untuk komunikasi R-CM dengan torque wrench FD/FDD dan FDD-AD.",
      en: "Designed for R-CM communication with FD/FDD and FDD-AD torque wrenches."
    },
    {
      id: "Menggunakan komunikasi spread spectrum frequency hopping pada band 2,402–2,479 GHz.",
      en: "Uses frequency-hopping spread-spectrum communication in the 2.402–2.479 GHz band."
    },
    {
      id: "Diversity antenna membantu meningkatkan performa komunikasi pada sistem pengencangan nirkabel.",
      en: "A diversity-antenna arrangement helps improve communication performance in wireless tightening systems."
    }
  ],
  compatibilityNote: {
    id: "Gunakan M-FD untuk FD/FDD dan FDD-AD. Jangan menggantinya dengan M-FH, karena M-FH ditujukan untuk keluarga tool FHM/FH.",
    en: "Use M-FD for FD/FDD and FDD-AD. Do not substitute M-FH, which is intended for the FHM/FH tool family."
  }
});

generatedDetails["m-fh"] = buildRcmWirelessModuleDetail({
  model: "M-FH",
  image: "/assets/brands/products/tohnichi/catalog/optional-equipment/m-fh.jpg",
  officialUrl:
    "https://www.tohnichi.com/products/optional-equipment/torque-error-proofing-equipment/r-cm-wireless-module-exchangeable-receiver/m-fh/",
  overview: {
    id: "M-FH adalah module radio FHSS 2,4 GHz yang dapat ditukar untuk receiver R-CM. Module ini menerima sinyal dari torque tool Pokayoke keluarga FHM/FH untuk membantu mencegah pengencangan terlewat dan mendukung identifikasi tool.",
    en: "M-FH is an exchangeable 2.4 GHz FHSS radio module for the R-CM receiver. It receives signals from FHM/FH-family Pokayoke torque tools to help prevent missed tightening and support tool identification."
  },
  features: [
    {
      id: "Dirancang untuk komunikasi R-CM dengan torque wrench dan torque screwdriver Pokayoke keluarga FHM/FH.",
      en: "Designed for R-CM communication with FHM/FH-family Pokayoke torque wrenches and torque screwdrivers."
    },
    {
      id: "Mendukung mode komunikasi baru dan lama untuk membantu upgrade dari sistem receiver R-FH256.",
      en: "Supports new and legacy communication modes to help upgrade systems that use the R-FH256 receiver."
    },
    {
      id: "Diversity antenna membantu meningkatkan performa komunikasi pada sistem Pokayoke nirkabel.",
      en: "A diversity-antenna arrangement helps improve communication performance in wireless Pokayoke systems."
    }
  ],
  compatibilityNote: {
    id: "Gunakan M-FH untuk keluarga FHM/FH. Untuk torque wrench FD/FDD atau FDD-AD yang mengirim data nilai torsi, gunakan M-FD.",
    en: "Use M-FH for the FHM/FH family. For FD/FDD or FDD-AD torque wrenches that transmit torque-value data, use M-FD."
  }
});

generatedDetails.rtd = {
  ...generatedDetails.rtd,
  overview: {
    id: "RTD adalah keluarga obeng torsi adjustable tipe rotary-slip untuk pengencangan terkontrol, mulai dari produksi massal hingga pekerjaan maintenance. Ketika torsi yang disetel tercapai, mekanisme ratchet berputar bebas sehingga torsi tambahan tidak diteruskan ke fastener dan risiko over-torque dapat dikurangi.",
    en: "RTD is an adjustable rotary-slip torque screwdriver family for controlled tightening, from mass production to maintenance work. When the set torque is reached, the ratcheting mechanism rotates freely so additional torque is not transferred to the fastener, helping reduce over-torque."
  },
  seoDescription: {
    id: "TOHNICHI RTD adalah obeng torsi adjustable rotary-slip. Bandingkan model RTD, rentang torsi, panjang, berat, dan spesifikasi untuk industri Indonesia.",
    en: "TOHNICHI RTD is an adjustable rotary-slip torque screwdriver. Compare RTD models, torque ranges, lengths, weights, and specifications for Indonesia."
  },
  features: [
    {
      id: "Mekanisme rotary-slip membantu mencegah over-torque setelah nilai torsi target tercapai.",
      en: "The rotary-slip mechanism helps prevent over-torque after the target torque is reached."
    },
    {
      id: "Nilai torsi mudah disetel dan diperiksa melalui skala eksternal.",
      en: "Torque is easy to set and check using the external scale."
    }
  ],
  images: [
    "/assets/brands/products/tohnichi/catalog/torque-screwdrivers/rtd-60cn.png",
    "/assets/brands/products/tohnichi/catalog/torque-screwdrivers/rtd-120cn.png"
  ],
  accuracy: "±3%",
  catalogueReference: {
    id: "Data model mengikuti TOHNICHI Reference Guide 2025.10, halaman 5.",
    en: "Model data follows the TOHNICHI Reference Guide 2025.10, page 5."
  },
  models: [
    {
      key: "rtd20z",
      americanModel: "RTD20Z",
      americanRange: "6-20 ozf·in",
      americanGraduation: "0.2 ozf·in",
      overallLengthMm: "100",
      weightG: "50"
    },
    {
      key: "rtd40z",
      americanModel: "RTD40Z",
      americanRange: "15-40 ozf·in",
      americanGraduation: "0.5 ozf·in",
      overallLengthMm: "100",
      weightG: "50"
    },
    {
      key: "rtd80z",
      americanModel: "RTD80Z",
      americanRange: "20-80 ozf·in",
      americanGraduation: "1 ozf·in",
      overallLengthMm: "110",
      weightG: "80"
    },
    {
      key: "rtd150z",
      americanModel: "RTD150Z",
      americanRange: "30-150 ozf·in",
      americanGraduation: "2 ozf·in",
      overallLengthMm: "130",
      weightG: "160"
    },
    {
      key: "rtd15cn",
      siModel: "RTD15CN",
      siRange: "2-15",
      siGraduation: "0.1",
      metricModel: "1.5RTD",
      metricRange: "0.2-1.5",
      metricGraduation: "0.01",
      americanModel: "RTD1.3I",
      americanRange: "0.2-1.3 lbf·in",
      americanGraduation: "0.01 lbf·in",
      overallLengthMm: "100",
      weightG: "50"
    },
    {
      key: "rtd30cn",
      siModel: "RTD30CN",
      siRange: "4-30",
      siGraduation: "0.2",
      metricModel: "3RTD",
      metricRange: "0.4-3",
      metricGraduation: "0.02",
      americanModel: "RTD2.6I",
      americanRange: "0.4-2.6 lbf·in",
      americanGraduation: "0.02 lbf·in",
      overallLengthMm: "100",
      weightG: "50"
    },
    {
      key: "rtd60cn",
      siModel: "RTD60CN",
      siRange: "10-60",
      siGraduation: "0.5",
      metricModel: "6RTD",
      metricRange: "1-6",
      metricGraduation: "0.05",
      americanModel: "RTD5I",
      americanRange: "1-5 lbf·in",
      americanGraduation: "0.05 lbf·in",
      overallLengthMm: "110",
      weightG: "80"
    },
    {
      key: "rtd120cn",
      siModel: "RTD120CN",
      siRange: "20-120",
      siGraduation: "1",
      metricModel: "12RTD",
      metricRange: "2-12",
      metricGraduation: "0.1",
      americanModel: "RTD10I",
      americanRange: "2-10 lbf·in",
      americanGraduation: "0.1 lbf·in",
      overallLengthMm: "130",
      weightG: "160"
    },
    {
      key: "rtd260cn",
      siModel: "RTD260CN",
      siRange: "60-260",
      siGraduation: "2",
      metricModel: "26RTD",
      metricRange: "6-26",
      metricGraduation: "0.2",
      americanModel: "RTD22I",
      americanRange: "6-22 lbf·in",
      americanGraduation: "0.2 lbf·in",
      overallLengthMm: "150",
      weightG: "270"
    },
    {
      key: "rtd500cn",
      siModel: "RTD500CN",
      siRange: "100-500",
      siGraduation: "5",
      metricModel: "50RTD",
      metricRange: "10-50",
      metricGraduation: "0.5",
      americanModel: "RTD40I",
      americanRange: "10-40 lbf·in",
      americanGraduation: "0.5 lbf·in",
      overallLengthMm: "155",
      weightG: "320"
    }
  ],
  notes: [
    {
      id: "Auxiliary tightening tool untuk RTD500CN dijual terpisah.",
      en: "The auxiliary tightening tool for RTD500CN is sold separately."
    },
    {
      id: "Bit dijual terpisah; pilih bit 6.35 HEX yang sesuai dengan fastener.",
      en: "Bits are sold separately; select a suitable 6.35 HEX bit for the fastener."
    }
  ],
  standardAccessories: [
    {
      id: "Hook spanner untuk RTD260CN dan RTD500CN.",
      en: "Hook spanner for RTD260CN and RTD500CN."
    },
    {
      id: "Resin grip untuk RTD120CN dan RTD260CN.",
      en: "Resin grip for RTD120CN and RTD260CN."
    }
  ]
};

generatedDetails.ltd = {
  ...generatedDetails.ltd,
  overview: {
    id: "LTD adalah keluarga obeng torsi adjustable tipe klik untuk pengencangan fastener kecil dalam proses produksi, perakitan, dan maintenance. Saat torsi yang disetel tercapai, mekanisme toggle clutch menghasilkan bunyi dan sensasi klik sebagai tanda pengencangan selesai.",
    en: "LTD is an adjustable click-type torque screwdriver family for tightening small fasteners in production, assembly, and maintenance. When the preset torque is reached, its toggle-clutch mechanism produces an audible and tactile click to signal completion."
  },
  seoDescription: {
    id: "TOHNICHI LTD adalah obeng torsi adjustable tipe klik. Bandingkan model LTD, rentang torsi, panjang, berat, dan spesifikasi untuk industri Indonesia.",
    en: "TOHNICHI LTD is an adjustable click-type torque screwdriver. Compare LTD models, torque ranges, lengths, weights, and specifications for Indonesia."
  },
  features: [
    {
      id: "Mekanisme toggle clutch memberikan sinyal klik ketika nilai torsi yang disetel tercapai.",
      en: "The toggle-clutch mechanism gives a click signal when the preset torque is reached."
    },
    {
      id: "Nilai torsi mudah disetel melalui skala eksternal, dan mekanisme pengunci membantu mencegah perubahan setelan saat digunakan.",
      en: "Torque is easy to set using the external scale, and the locking mechanism helps prevent setting changes during use."
    }
  ],
  images: [
    "/assets/brands/products/tohnichi/catalog/torque-screwdrivers/ltd-60cn.png",
    "/assets/brands/products/tohnichi/catalog/torque-screwdrivers/ltd.png"
  ],
  accuracy: "±3%",
  catalogueReference: {
    id: "Data model mengikuti TOHNICHI Reference Guide 2025.10, halaman 5.",
    en: "Model data follows the TOHNICHI Reference Guide 2025.10, page 5."
  },
  models: [
    {
      key: "ltd20z",
      americanModel: "LTD20Z",
      americanRange: "6-20 ozf·in",
      americanGraduation: "0.2 ozf·in",
      overallLengthMm: "100",
      weightG: "50"
    },
    {
      key: "ltd40z",
      americanModel: "LTD40Z",
      americanRange: "15-40 ozf·in",
      americanGraduation: "0.5 ozf·in",
      overallLengthMm: "100",
      weightG: "50"
    },
    {
      key: "ltd80z",
      americanModel: "LTD80Z",
      americanRange: "20-80 ozf·in",
      americanGraduation: "1 ozf·in",
      overallLengthMm: "110",
      weightG: "80"
    },
    {
      key: "ltd150z",
      americanModel: "LTD150Z",
      americanRange: "30-150 ozf·in",
      americanGraduation: "2 ozf·in",
      overallLengthMm: "130",
      weightG: "130"
    },
    {
      key: "ltd15cn",
      siModel: "LTD15CN",
      siRange: "2-15",
      siGraduation: "0.1",
      metricModel: "1.5LTD",
      metricRange: "0.2-1.5",
      metricGraduation: "0.01",
      americanModel: "LTD1.3I",
      americanRange: "0.2-1.3 lbf·in",
      americanGraduation: "0.01 lbf·in",
      overallLengthMm: "100",
      weightG: "50"
    },
    {
      key: "ltd30cn",
      siModel: "LTD30CN",
      siRange: "4-30",
      siGraduation: "0.2",
      metricModel: "3LTD",
      metricRange: "0.4-3",
      metricGraduation: "0.02",
      americanModel: "LTD2.6I",
      americanRange: "0.4-2.6 lbf·in",
      americanGraduation: "0.02 lbf·in",
      overallLengthMm: "100",
      weightG: "50"
    },
    {
      key: "ltd60cn",
      siModel: "LTD60CN",
      siRange: "10-60",
      siGraduation: "0.5",
      metricModel: "6LTD",
      metricRange: "1-6",
      metricGraduation: "0.05",
      americanModel: "LTD5I",
      americanRange: "1-5 lbf·in",
      americanGraduation: "0.05 lbf·in",
      overallLengthMm: "110",
      weightG: "80"
    },
    {
      key: "ltd120cn",
      siModel: "LTD120CN",
      siRange: "20-120",
      siGraduation: "1",
      metricModel: "12LTD",
      metricRange: "2-12",
      metricGraduation: "0.1",
      americanModel: "LTD10I",
      americanRange: "2-10 lbf·in",
      americanGraduation: "0.1 lbf·in",
      overallLengthMm: "130",
      weightG: "130"
    },
    {
      key: "ltd260cn",
      siModel: "LTD260CN",
      siRange: "60-260",
      siGraduation: "2",
      metricModel: "26LTD",
      metricRange: "6-26",
      metricGraduation: "0.2",
      americanModel: "LTD22I",
      americanRange: "6-22 lbf·in",
      americanGraduation: "0.2 lbf·in",
      overallLengthMm: "150",
      weightG: "220"
    },
    {
      key: "ltd500cn",
      siModel: "LTD500CN",
      siRange: "100-500",
      metricModel: "50LTD",
      metricRange: "10-50",
      americanModel: "LTD40I",
      americanRange: "10-40 lbf·in",
      americanGraduation: "",
      overallLengthMm: "155",
      weightG: "330"
    },
    {
      key: "ltd1000cn",
      siModel: "LTD1000CN",
      siRange: "200-1000",
      siGraduation: "5",
      metricModel: "100LTD",
      metricRange: "20-100",
      metricGraduation: "0.5",
      americanModel: "LTD90I",
      americanRange: "20-90 lbf·in",
      americanGraduation: "0.5 lbf·in",
      overallLengthMm: "185",
      weightG: "580"
    },
    {
      key: "ltd2000cn2",
      siModel: "LTD2000CN2",
      siRange: "400-2000",
      metricModel: "LTD200M2",
      metricRange: "40-200",
      americanModel: "LTD180I2",
      americanRange: "40-180 lbf·in",
      americanGraduation: "",
      overallLengthMm: "255",
      weightG: "1150"
    }
  ],
  notes: [
    {
      id: "Auxiliary tightening tool untuk LTD500CN dan LTD1000CN tersedia dan dijual terpisah.",
      en: "An auxiliary tightening tool for LTD500CN and LTD1000CN is available and sold separately."
    },
    {
      id: "Bit dijual terpisah; pilih bit 6.35 HEX yang sesuai dengan fastener.",
      en: "Bits are sold separately; select a suitable 6.35 HEX bit for the fastener."
    },
    {
      id: "LTD2000CN2 serta model metrik dan Amerika yang setara menggunakan kepala square drive 9.53 mm.",
      en: "LTD2000CN2 and the equivalent metric and American models use a 9.53 mm square-drive head."
    }
  ],
  standardAccessories: [
    {
      id: "Hook spanner untuk LTD260CN sampai LTD2000CN2.",
      en: "Hook spanner for LTD260CN through LTD2000CN2."
    },
    {
      id: "LTD2000CN2 dilengkapi auxiliary tightening tool.",
      en: "LTD2000CN2 includes an auxiliary tightening tool."
    },
    {
      id: "Resin grip untuk LTD120CN dan LTD260CN.",
      en: "Resin grip for LTD120CN and LTD260CN."
    }
  ]
};

export const tohnichiProductDetails = generatedDetails;
