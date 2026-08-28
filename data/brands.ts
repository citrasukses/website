import type { LocalizedText } from "@/lib/i18n";
import nacProductGroups from "@/data/nac-products.json";
import tohnichiProductGroups from "@/data/tohnichi-products.json";

export type Product = {
  slug?: string;
  name: string;
  model?: string;
  image: string;
  summary: LocalizedText;
  tags: LocalizedText[];
  officialUrl?: string;
};

export type ProductGroup = {
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
  products: Product[];
};

export type Brand = {
  slug: string;
  name: string;
  countryCode: string;
  country: string;
  category: LocalizedText;
  logo: string;
  heroImage: string;
  summary: LocalizedText;
  description: LocalizedText;
  strengths: LocalizedText[];
  productGroups: ProductGroup[];
  officialWebsite?: string;
  popularProducts?: LocalizedText[];
  researchStatus?: "verified" | "unresolved";
  researchNote?: LocalizedText;
  featured?: boolean;
  searchTerms?: string[];
};

export const sea_brands: Brand[] = [
  
]

export const brands: Brand[] = [
  {
    slug: "tohnichi",
    name: "TOHNICHI",
    countryCode: "JP",
    country: "Japan",
    category: {
      id: "Torque tools, torque wrench, dan sistem tightening",
      en: "Torque tools, torque wrenches, and tightening systems"
    },
    logo: "/assets/brands/logos/tohnichi--nobg.png",
    heroImage: "/assets/brands/products/tohnichi/tohnichi_torque-wrench.jpg",
    officialWebsite: "https://en.global-tohnichi.com/",
    popularProducts: [
      { id: "QL adjustable torque wrench", en: "QL adjustable torque wrench" },
      { id: "QSP preset torque wrench", en: "QSP preset torque wrench" },
      { id: "CEM3 digital torque wrench", en: "CEM3 digital torque wrench" },
      { id: "Torque tester dan calibration equipment", en: "Torque testers and calibration equipment" }
    ],
    researchStatus: "verified",
    featured: true,
    summary: {
      id: "PT Citra Sukses Ekapratama (CSE) adalah agen penjualan dan servis TOHNICHI di Indonesia untuk torque wrench, torque screwdriver, tester, kalibrasi, dan sistem tightening.",
      en: "PT Citra Sukses Ekapratama (CSE) is a TOHNICHI sales and service agent in Indonesia for torque wrenches, torque screwdrivers, testers, calibration, and tightening systems."
    },
    description: {
      id: "CSE mendukung kebutuhan TOHNICHI untuk pabrik yang membutuhkan tightening akurat, quality control yang konsisten, dan traceability proses assembly.",
      en: "CSE supports TOHNICHI needs for factories that require accurate tightening, consistent quality control, and assembly process traceability."
    },
    strengths: [
      {
        id: "Spesialis torque control Jepang sejak 1949",
        en: "Japanese torque-control specialist since 1949"
      },
      {
        id: "Lini lengkap untuk tightening, inspection, dan calibration",
        en: "Complete range for tightening, inspection, and calibration"
      },
      {
        id: "Tightening Assurance System untuk poka-yoke dan traceability",
        en: "Tightening Assurance System for poka-yoke and traceability"
      }
    ],
    searchTerms: [
      "tonichi",
      "TOHNICHI Indonesia",
      "TOHNICHI CSE",
      "CSE TOHNICHI",
      "distributor TOHNICHI Indonesia",
      "agen TOHNICHI Indonesia",
      "kunci torsi TOHNICHI",
      "torque tools",
      "torque wrench",
      "torque screwdriver",
      "tightening",
      "calibration",
      "error proofing",
      "assembly"
    ],
    productGroups: tohnichiProductGroups
  },
  {
    slug: "nac",
    name: "NAC",
    countryCode: "JP",
    country: "Japan",
    category: {
      id: "Custom-made socket, industrial bits, dan quick couplings",
      en: "Custom-made sockets, industrial bits, and quick couplings"
    },
    logo: "/assets/brands/products/nac/NAC Cover Img.jpg",
    heroImage: "/assets/brands/products/nac/NAC Cover Img.jpg",
    officialWebsite: "https://nac-corp.co.jp/en/",
    popularProducts: [
      { id: "Custom impact sockets", en: "Custom impact sockets" },
      { id: "Driver sockets dan bits", en: "Driver sockets and bits" },
      { id: "CAL quick couplings", en: "CAL quick couplings" },
      { id: "CSPE non-drip couplings", en: "CSPE non-drip couplings" }
    ],
    researchStatus: "verified",
    summary: {
      id: "NAC adalah brand Nagahori Industry Co., Ltd., spesialis Jepang untuk quality socket—terutama custom-made socket volume rendah—industrial bits, dan quick couplings.",
      en: "NAC is the brand of Nagahori Industry Co., Ltd., a Japanese specialist in quality sockets—especially low-volume custom-made sockets—industrial bits, and quick couplings."
    },
    description: {
      id: "Nagahori Industry memasarkan fastening tools dan quick coupling dengan brand NAC. CSE membantu kebutuhan di Indonesia, termasuk custom-made socket dalam jumlah kecil dan quick coupling untuk berbagai fluida, pressure range, serta metode koneksi.",
      en: "Nagahori Industry markets fastening tools and quick couplings under the NAC brand. CSE supports Indonesian requirements, including low-volume custom-made sockets and quick couplings for different fluids, pressure ranges, and connection methods."
    },
    strengths: [
      { id: "Custom-made socket, termasuk kebutuhan volume rendah", en: "Custom-made sockets, including low-volume requirements" },
      { id: "Standard socket, industrial bits, dan special fastening tools", en: "Standard sockets, industrial bits, and special fastening tools" },
      { id: "Quick couplings low, medium, high pressure, vacuum, dan non-drip", en: "Low-, medium-, and high-pressure, vacuum, and non-drip quick couplings" }
    ],
    searchTerms: [
      "NAC Indonesia",
      "Nagahori",
      "Nagahori Indonesia",
      "Nagahori Industry",
      "Nagahori Industry Indonesia",
      "socket",
      "sockets",
      "industrial socket",
      "bit",
      "bits",
      "screwdriver bit",
      "attachment",
      "tooling",
      "maintenance",
      "square drive",
      "extension bar",
      "universal joint",
      "b-30",
      "b-40",
      "b-10",
      "torx",
      "automatic assembly",
      "quick coupling",
      "couplings",
      "cal",
      "cat",
      "ctl",
      "cns",
      "non-drip",
      "cspe",
      "csp",
      "high pressure",
      "vacuum",
      "mold coolant",
      "custom socket",
      "low quantity"
    ],
    productGroups: nacProductGroups
  },
  {
    slug: "fuji-star",
    name: "Sankyo Rikagaku",
    countryCode: "JP",
    country: "Japan",
    category: {
      id: "Abrasive FUJISTAR, polishing tools, dan surface-finishing systems",
      en: "FUJISTAR abrasives, polishing tools, and surface-finishing systems"
    },
    logo: "/assets/brands/logos/fuji-star.png",
    heroImage: "/assets/brands/products/fuji-star/car_body_abrasive.webp",
    officialWebsite: "https://en.fujistar.com/",
    popularProducts: [
      { id: "Abrasive sheets", en: "Abrasive sheets" },
      { id: "Abrasive discs", en: "Abrasive discs" },
      { id: "Abrasive belts", en: "Abrasive belts" },
      { id: "Kenmalon non-woven abrasives", en: "Kenmalon non-woven abrasives" }
    ],
    researchStatus: "verified",
    featured: true,
    summary: {
      id: "Produsen Jepang di balik FUJISTAR, dengan abrasive paper, cloth, film, belt, non-woven, polishing tools, dan finishing supplies sejak 1930.",
      en: "The Japanese manufacturer behind FUJISTAR, with abrasive paper, cloth, film, belts, non-woven products, polishing tools, and finishing supplies since 1930."
    },
    description: {
      id: "CSE membantu memilih produk Sankyo Rikagaku berdasarkan material workpiece, target removal dan finish, grit, backing, bentuk produk, attachment, mesin, serta kondisi proses. FUJISTAR digunakan sebagai identitas lini abrasive dari Sankyo Rikagaku.",
      en: "CSE helps select Sankyo Rikagaku products by workpiece material, removal and finish target, grit, backing, product form, attachment, machine, and process conditions. FUJISTAR identifies Sankyo Rikagaku's abrasive product line."
    },
    strengths: [
      { id: "Enam keluarga produk dengan katalog model yang lengkap", en: "Six product families with complete model catalogues" },
      { id: "Solusi dari surface preparation hingga final finish", en: "Solutions from surface preparation through final finishing" },
      { id: "Untuk automotive, steel, woodworking, electronics, dan general industry", en: "For automotive, steel, woodworking, electronics, and general industry" }
    ],
    searchTerms: [
      "SANKYO",
      "SANKYO Indonesia",
      "sankyo rikagaku",
      "Sankyo Rikagaku Indonesia",
      "sankyo chemical",
      "fujistar",
      "fuji star",
      "abrasive",
      "abrasives",
      "sandpaper",
      "sanding",
      "finishing",
      "surface preparation",
      "polishing",
      "abrasive paper",
      "abrasive disc",
      "abrasive belt",
      "abrasive roll",
      "non-woven abrasive",
      "kenmaron"
    ],
    productGroups: [
      {
        slug: "abrasive-product-formats",
        title: { id: "Format Produk Abrasive", en: "Abrasive Product Formats" },
        description: {
          id: "Pilih keluarga berdasarkan bentuk produk, metode attachment, mesin, dan area kerja. Setiap halaman menampilkan model dan pilihan resmi di dalam keluarga tersebut.",
          en: "Choose a family by product form, attachment method, machine, and working area. Every page shows the official models and options within that family."
        },
        products: [
          {
            slug: "sheet-products",
            name: "Sheet Products / Abrasive Sheets",
            image: "/assets/brands/products/fuji-star/catalog/wet-dry-sanding-paper.jpg",
            summary: {
              id: "Abrasive paper, cloth, film, hook-and-loop, pressure-sensitive, dan non-woven dalam format sheet.",
              en: "Abrasive paper, cloth, film, hook-and-loop, pressure-sensitive, and non-woven products in sheet form."
            },
            tags: [
              { id: "Hand sanding", en: "Hand sanding" },
              { id: "Dry & wet", en: "Dry & wet" },
              { id: "Surface preparation", en: "Surface preparation" }
            ]
          },
          {
            slug: "disc-products",
            name: "Disc Products / Abrasive Discs",
            image: "/assets/brands/products/fuji-star/catalog/econo-disc.jpg",
            summary: {
              id: "Film, hook-and-loop, pressure-sensitive, paper, dan fiber disc untuk sander serta grinder.",
              en: "Film, hook-and-loop, pressure-sensitive, paper, and fiber discs for sanders and grinders."
            },
            tags: [
              { id: "Machine sanding", en: "Machine sanding" },
              { id: "Automotive repair", en: "Automotive repair" },
              { id: "Paint & metal", en: "Paint & metal" }
            ]
          },
          {
            slug: "belt-products",
            name: "Belt Products / Abrasive Belts",
            image: "/assets/brands/products/fuji-star/catalog/abrasive-cloth-belt-rseries.jpg",
            summary: {
              id: "Cloth, paper, narrow, wide, flexible, dan cork belts untuk metal, woodworking, serta contour finishing.",
              en: "Cloth, paper, narrow, wide, flexible, and cork belts for metal, woodworking, and contour finishing."
            },
            tags: [
              { id: "Belt sanding", en: "Belt sanding" },
              { id: "Steel & aluminium", en: "Steel & aluminum" },
              { id: "Woodworking", en: "Woodworking" }
            ]
          },
          {
            slug: "rolled-products",
            name: "Rolled Products / Abrasive Rolls",
            image: "/assets/brands/products/fuji-star/catalog/hipitch-roll.jpg",
            summary: {
              id: "Hook-and-loop, pressure-sensitive, clog-resistant, mesh, dan slitted roll untuk dipotong sesuai kebutuhan.",
              en: "Hook-and-loop, pressure-sensitive, clog-resistant, mesh, and slitted rolls cut to the required length."
            },
            tags: [
              { id: "Cut to length", en: "Cut to length" },
              { id: "Hand file & pad", en: "Hand file & pad" },
              { id: "Body repair", en: "Body repair" }
            ]
          },
          {
            slug: "non-woven-products",
            name: "Non-woven Abrasives",
            image: "/assets/brands/products/fuji-star/catalog/kenmalon-super.jpg",
            summary: {
              id: "Kenmaron sheet, pad, belt, disc, wheel, cup, dan laminated products untuk conditioning serta finishing.",
              en: "Kenmaron sheets, pads, belts, discs, wheels, cups, and laminated products for conditioning and finishing."
            },
            tags: [
              { id: "Cleaning & blending", en: "Cleaning & blending" },
              { id: "Light deburring", en: "Light deburring" },
              { id: "Stainless finishing", en: "Stainless finishing" }
            ]
          }
        ]
      },
      {
        slug: "polishing-tools-and-supplies",
        title: { id: "Polishing Tools & Finishing Supplies", en: "Polishing Tools & Finishing Supplies" },
        description: {
          id: "Machine, accessory, dan consumable pendukung untuk menyusun proses sanding, polishing, buffing, masking, coating, serta cleanup.",
          en: "Supporting machines, accessories, and consumables for sanding, polishing, buffing, masking, coating, and cleanup processes."
        },
        products: [
          {
            slug: "other-products",
            name: "Other Products / Finishing Support",
            image: "/assets/brands/products/fuji-star/catalog/cordless-polisher-eb351-6-21.jpg",
            summary: {
              id: "Sander, polisher, pad, hand file, buff, compound, coating material, masking products, dan wiping cloth.",
              en: "Sanders, polishers, pads, hand files, buffs, compounds, coating materials, masking products, and wiping cloths."
            },
            tags: [
              { id: "Sanding & polishing", en: "Sanding & polishing" },
              { id: "Pads & buffing", en: "Pads & buffing" },
              { id: "Masking & compounds", en: "Masking & compounds" }
            ]
          }
        ]
      }
    ]
  },
  {
    slug: "nippon-unit-brush",
    name: "Nippon Unit Brush",
    countryCode: "JP",
    country: "Japan",
    category: {
      id: "Brush industri presisi untuk deburring, polishing, cleaning, dan surface treatment",
      en: "Precision industrial brushes for deburring, polishing, cleaning, and surface treatment"
    },
    logo: "/assets/brands/logos/nippon-unit-brush.gif",
    heroImage: "/assets/brands/logos/nippon-unit-brush--vector.svg",
    officialWebsite: "https://www.unitbrush.co.jp/english/",
    popularProducts: [
      { id: "Strip brushes", en: "Strip brushes" },
      { id: "Wheel dan cup brushes", en: "Wheel and cup brushes" },
      { id: "Twisted brushes", en: "Twisted brushes" },
      { id: "Custom-shaped industrial brushes", en: "Custom-shaped industrial brushes" }
    ],
    researchStatus: "verified",
    featured: true,
    summary: {
      id: "Brand Jepang dengan sejarah panjang dalam industrial brush, dikenal untuk channel brush, abrasive nylon brush, dan solusi brush untuk kebutuhan manufaktur.",
      en: "A Japanese brand with a long history in industrial brushes, known for channel brushes, abrasive nylon brushes, and brush solutions for manufacturing needs."
    },
    description: {
      id: "CSE mendukung kebutuhan Nippon Unit Brush untuk pabrik yang membutuhkan brush industri berkualitas Jepang untuk deburring, polishing, cleaning, dust prevention, conveyor cleaning, dan surface treatment. Brand ini cocok untuk aplikasi manufaktur yang membutuhkan performa stabil, material brush yang tepat, dan solusi brush yang dapat disesuaikan dengan kebutuhan proses.",
      en: "CSE supports Nippon Unit Brush needs for factories requiring Japanese-quality industrial brushes for deburring, polishing, cleaning, dust prevention, conveyor cleaning, and surface treatment. The brand is suitable for manufacturing applications that require stable performance, proper brush material selection, and brush solutions tailored to the production process."
    },
    strengths: [
      {
        id: "Lebih dari 120 tahun pengalaman dalam industrial brush",
        en: "More than 120 years of industrial brush experience"
      },
      {
        id: "Keahlian kuat dalam channel brush dan brush untuk kebutuhan manufaktur",
        en: "Strong expertise in channel brushes and brushes for manufacturing needs"
      },
      {
        id: "Cocok untuk deburring, polishing, cleaning, dan surface treatment",
        en: "Suitable for deburring, polishing, cleaning, and surface treatment"
      },
      {
        id: "Digunakan pada aplikasi otomotif, komponen, elektronik, dan general manufacturing",
        en: "Used in automotive, component, electronics, and general manufacturing applications"
      }
    ],
    searchTerms: [
      "brush",
      "industrial brush",
      "channel brush",
      "strip brush",
      "deburring",
      "polishing",
      "cleaning",
      "surface treatment"
    ],
    productGroups: [
      {
        slug: "industrial-brushes",
        title: { id: "Industrial Brushes", en: "Industrial Brushes" },
        description: {
          id: "Brush industri untuk proses deburring, polishing, cleaning, dust prevention, conveyor cleaning, dan finishing pada lini produksi.",
          en: "Industrial brushes for deburring, polishing, cleaning, dust prevention, conveyor cleaning, and finishing in production lines."
        },
        products: [
          {
            name: "Strip Brushes",
            image: "/assets/brands/logos/nippon-unit-brush--vector.svg",
            summary: {
              id: "Channel atau strip brush untuk dust prevention, sealing, conveyor cleaning, dan aplikasi cleaning di area produksi.",
              en: "Channel or strip brushes for dust prevention, sealing, conveyor cleaning, and cleaning applications in production areas."
            },
            tags: [
              { id: "Dust prevention", en: "Dust prevention" },
              { id: "Conveyor cleaning", en: "Conveyor cleaning" }
            ]
          },
          {
            name: "Roll / Scratch Brushes",
            image: "/assets/brands/logos/nippon-unit-brush--vector.svg",
            summary: {
              id: "Roll brush untuk cleaning, polishing, dan surface treatment pada workpiece dengan permukaan relatif datar.",
              en: "Roll brushes for cleaning, polishing, and surface treatment on relatively flat workpiece surfaces."
            },
            tags: [
              { id: "Cleaning", en: "Cleaning" },
              { id: "Surface treatment", en: "Surface treatment" }
            ]
          },
          {
            name: "Wheel & Cup Brushes",
            image: "/assets/brands/logos/nippon-unit-brush--vector.svg",
            summary: {
              id: "Wheel brush dan cup brush untuk deburring, polishing, rust removal, dan finishing permukaan.",
              en: "Wheel brushes and cup brushes for deburring, polishing, rust removal, and surface finishing."
            },
            tags: [
              { id: "Deburring", en: "Deburring" },
              { id: "Polishing", en: "Polishing" }
            ]
          },
          {
            name: "Twisted Brushes",
            image: "/assets/brands/logos/nippon-unit-brush--vector.svg",
            summary: {
              id: "Twisted brush untuk deburring dan polishing pada lubang, area dalam, dan bagian yang sulit dijangkau setelah proses machining.",
              en: "Twisted brushes for deburring and polishing holes, internal areas, and hard-to-reach sections after machining."
            },
            tags: [
              { id: "Internal deburring", en: "Internal deburring" },
              { id: "Machining", en: "Machining" }
            ]
          },
          {
            name: "Cylindrical, Umbrella & Flat Brushes",
            image: "/assets/brands/logos/nippon-unit-brush--vector.svg",
            summary: {
              id: "Brush dengan bentuk khusus untuk detailed deburring, cleaning, polishing, dan finishing pada komponen industri.",
              en: "Special-shaped brushes for detailed deburring, cleaning, polishing, and finishing of industrial components."
            },
            tags: [
              { id: "Special shape", en: "Special shape" },
              { id: "Finishing", en: "Finishing" }
            ]
          }
        ]
      }
    ]
  },
  {
    slug: "fuji-denshi",
    name: "FUJI-DENSHI",
    countryCode: "JP",
    country: "Japan",
    category: {
      id: "Sistem induction hardening, high-frequency heating, dan layanan heat-treatment",
      en: "Induction-hardening systems, high-frequency heating, and heat-treatment services"
    },
    logo: "/assets/brands/logos/fuji-denshi.svg",
    heroImage: "/assets/brands/products/fuji-denshi/induction-hardening-equipment.jpg",
    officialWebsite: "https://www.fujidenshi.co.jp/en/",
    popularProducts: [
      { id: "Custom induction-hardening equipment", en: "Custom induction-hardening equipment" },
      { id: "FOCUS transistor converters", en: "FOCUS transistor converters" },
      { id: "FIT compact converters", en: "FIT compact converters" },
      { id: "FD-ioT equipment monitoring", en: "FD-ioT equipment monitoring" }
    ],
    researchStatus: "verified",
    featured: true,
    summary: {
      id: "FUJI-DENSHI adalah spesialis Jepang untuk desain dan produksi sistem induction hardening custom, converter high-frequency, contract hardening, serta pengembangan proses heat-treatment.",
      en: "FUJI-DENSHI is a Japanese specialist in custom induction-hardening systems, high-frequency converters, contract hardening, and heat-treatment process development."
    },
    description: {
      id: "Sebagai authorized distributor FUJI-DENSHI, CSE mendukung kebutuhan equipment baru, review aplikasi dan spesifikasi, converter, coil, monitoring FD-ioT, serta koordinasi layanan engineering untuk proses induction heating dan hardening di Indonesia.",
      en: "As an authorized FUJI-DENSHI distributor, CSE supports new equipment requirements, application and specification reviews, converters, coils, FD-ioT monitoring, and engineering-service coordination for induction-heating and hardening processes in Indonesia."
    },
    strengths: [
      {
        id: "Equipment induction hardening custom dari manual loading hingga fully automated",
        en: "Custom induction-hardening equipment from manual loading to fully automated systems"
      },
      {
        id: "FOCUS dan FIT transistor converter untuk berbagai output dan frequency band",
        en: "FOCUS and FIT transistor converters across a wide range of outputs and frequencies"
      },
      {
        id: "Dukungan contract hardening, prototyping, co-development, dan heating simulation",
        en: "Contract hardening, prototyping, co-development, and heating-simulation support"
      },
      {
        id: "FD-ioT untuk monitoring, diagnostics, predictive maintenance, dan traceability",
        en: "FD-ioT for monitoring, diagnostics, predictive maintenance, and traceability"
      }
    ],
    searchTerms: [
      "fujidenshi",
      "fuji denshi",
      "fuji electronics industry",
      "fujidensi",
      "induction hardening",
      "induction heating",
      "heat treatment",
      "FOCUS converter",
      "FIT converter",
      "FD-ioT",
      "contract hardening"
    ],
    productGroups: [
      {
        slug: "induction-heating-solutions",
        title: { id: "Induction Heating Solutions", en: "Induction Heating Solutions" },
        description: {
          id: "Equipment, power conversion, dan digital support untuk proses induction heating dan hardening.",
          en: "Equipment, power conversion, and digital support for induction-heating and hardening processes."
        },
        products: [
          {
            name: "Custom Induction-Hardening Equipment",
            image: "/assets/brands/products/fuji-denshi/induction-hardening-equipment.jpg",
            officialUrl: "https://www.fujidenshi.co.jp/en/device/configuration/",
            summary: {
              id: "Sistem heat-treatment yang dirancang sesuai workpiece, quality standard, pre/post-process, dan target cycle time.",
              en: "Heat-treatment systems designed around the workpiece, quality standard, pre/post-processes, and target cycle time."
            },
            tags: [
              { id: "Custom equipment", en: "Custom equipment" },
              { id: "Induction hardening", en: "Induction hardening" }
            ]
          },
          {
            name: "FOCUS & FIT Transistor Converters",
            image: "/assets/brands/products/fuji-denshi/induction-hardening-equipment.jpg",
            officialUrl: "https://www.fujidenshi.co.jp/en/device/oscillator/",
            summary: {
              id: "Converter high-frequency untuk hardening, heating, brazing, shrink-fitting, dan annealing.",
              en: "High-frequency converters for hardening, heating, brazing, shrink-fitting, and annealing."
            },
            tags: [
              { id: "High frequency", en: "High frequency" },
              { id: "Power conversion", en: "Power conversion" }
            ]
          },
          {
            name: "FD-ioT",
            image: "/assets/brands/products/fuji-denshi/induction-hardening-equipment.jpg",
            officialUrl: "https://www.fujidenshi.co.jp/en/service/fd-iot/",
            summary: {
              id: "Monitoring equipment, diagnostics report, remote repair support, predictive maintenance, dan production traceability.",
              en: "Equipment monitoring, diagnostic reporting, remote repair support, predictive maintenance, and production traceability."
            },
            tags: [
              { id: "Monitoring", en: "Monitoring" },
              { id: "Predictive maintenance", en: "Predictive maintenance" }
            ]
          }
        ]
      }
    ]
  },
  {
    slug: "smbc",
    name: "SMBC",
    countryCode: "TH",
    country: "Thailand",
    category: {
      id: "Brush industri dan solusi amplas untuk kebutuhan produksi dan maintenance",
      en: "Industrial brushes and sanding solutions for production and maintenance needs"
    },
    logo: "/assets/brands/logos/smbc.png",
    heroImage: "/assets/brands/logos/smbc.png",
    popularProducts: [
      { id: "End brushes", en: "End brushes" },
      { id: "Roller polishing brushes", en: "Roller polishing brushes" },
      { id: "Disc brushes", en: "Disc brushes" },
      { id: "Custom abrasive brushes", en: "Custom abrasive brushes" }
    ],
    researchStatus: "unresolved",
    researchNote: {
      id: "Produk SMBC industrial brush asal Thailand dapat ditemukan, tetapi website resmi manufacturer tidak ditemukan melalui pencarian sederhana.",
      en: "Thailand-origin SMBC industrial brush products can be found, but a manufacturer-owned official website was not found through a simple search."
    },
    featured: true,
    summary: {
      id: "Brand Thailand untuk brush industri dan solusi abrasif yang cost-effective dengan lead time lebih cepat.",
      en: "A Thailand-based brand for industrial brushes and abrasive solutions, offering cost-effective supply with faster lead times."
    },
    description: {
      id: "CSE mendukung kebutuhan SMBC untuk pabrik yang membutuhkan brush industri, produk abrasif, dan consumable maintenance dengan harga kompetitif, ketersediaan lebih cepat, dan pilihan produk yang sesuai untuk kebutuhan produksi harian.",
      en: "CSE supports SMBC needs for factories requiring industrial brushes, abrasive products, and maintenance consumables with competitive pricing, faster availability, and product options suited for daily production needs."
    },
    strengths: [
      {
        id: "Alternatif cost-effective untuk kebutuhan brush industri",
        en: "Cost-effective alternative for industrial brush needs"
      },
      {
        id: "Lead time lebih cepat dibandingkan banyak produk impor Jepang",
        en: "Faster lead time compared with many Japanese imported products"
      },
      {
        id: "Cocok untuk kebutuhan produksi, cleaning, deburring, finishing, dan maintenance",
        en: "Suitable for production, cleaning, deburring, finishing, and maintenance needs"
      }
    ],
    searchTerms: [
      "brush",
      "industrial brush",
      "abrasive",
      "sanding",
      "cleaning",
      "deburring",
      "finishing",
      "maintenance"
    ],
    productGroups: [
      {
        slug: "industrial-brushes",
        title: { id: "Brush Industri", en: "Industrial Brushes" },
        description: {
          id: "Brush untuk proses cleaning, deburring, surface preparation, finishing, dan maintenance mesin produksi.",
          en: "Brushes for cleaning, deburring, surface preparation, finishing, and production machine maintenance."
        },
        products: [
          {
            name: "Industrial Brush",
            image: "/assets/brands/logos/smbc.png",
            summary: {
              id: "Brush industri untuk membantu proses pembersihan, finishing, dan perawatan komponen maupun mesin.",
              en: "Industrial brushes for cleaning, finishing, and maintaining components or machinery."
            },
            tags: [
              { id: "Cleaning", en: "Cleaning" },
              { id: "Maintenance", en: "Maintenance" }
            ]
          },
          {
            name: "Deburring Brush",
            image: "/assets/brands/logos/smbc.png",
            summary: {
              id: "Brush untuk membantu menghilangkan burr dan merapikan permukaan komponen setelah proses machining atau cutting.",
              en: "Brushes for removing burrs and improving component surfaces after machining or cutting processes."
            },
            tags: [
              { id: "Deburring", en: "Deburring" },
              { id: "Finishing", en: "Finishing" }
            ]
          },
          {
            name: "Sanding / Abrasive Solution",
            image: "/assets/brands/logos/smbc.png",
            summary: {
              id: "Solusi abrasif dan amplas untuk surface finishing, preparation, dan kebutuhan maintenance.",
              en: "Abrasive and sanding solutions for surface finishing, preparation, and maintenance needs."
            },
            tags: [
              { id: "Abrasive", en: "Abrasive" },
              { id: "Surface finish", en: "Surface finish" }
            ]
          }
        ]
      }
    ]
  },
  {
    slug: "viet-nhat",
    name: "Viet Nhat Special Tools",
    countryCode: "VN",
    country: "Vietnam",
    category: {
      id: "Cutting tools khusus dan solusi tooling presisi untuk kebutuhan machining industri",
      en: "Custom cutting tools and precision tooling solutions for industrial machining needs"
    },
    logo: "/assets/brands/logos/viet-nhat.svg",
    heroImage: "/assets/brands/logos/viet-nhat.svg",
    officialWebsite: "https://vn-specialtools.com/",
    popularProducts: [
      { id: "Custom drills", en: "Custom drills" },
      { id: "Reamers dan end mills", en: "Reamers and end mills" },
      { id: "PCD cutting tools", en: "PCD cutting tools" },
      { id: "Pin gauges", en: "Pin gauges" }
    ],
    researchStatus: "verified",
    featured: true,
    summary: {
      id: "Produsen cutting tools Vietnam dengan kualitas terpercaya, digunakan oleh manufaktur Jepang di Vietnam dan mendukung kebutuhan ekspor ke Jepang.",
      en: "A Vietnamese cutting tools manufacturer with trusted quality, used by Japanese manufacturers in Vietnam and supporting export needs to Japan."
    },
    description: {
      id: "CSE mendukung kebutuhan Viet Nhat untuk pabrik yang membutuhkan cutting tools khusus, carbide tools, PCD tools, reconditioning, dan solusi tooling presisi berdasarkan drawing, sample, atau spesifikasi pelanggan. Brand ini cocok untuk perusahaan yang membutuhkan kualitas tinggi dengan fleksibilitas supply, biaya, dan lead time yang lebih kompetitif dibandingkan sourcing penuh dari Jepang.",
      en: "CSE supports Viet Nhat needs for factories requiring custom cutting tools, carbide tools, PCD tools, reconditioning, and precision tooling solutions based on customer drawings, samples, or specifications. The brand is suitable for companies that need reliable quality with more competitive supply flexibility, cost, and lead time compared with full sourcing from Japan."
    },
    strengths: [
      {
        id: "Custom cutting tools berdasarkan drawing, sample, atau spesifikasi pelanggan",
        en: "Custom cutting tools based on customer drawings, samples, or specifications"
      },
      {
        id: "Dipercaya oleh manufaktur Jepang dan Japanese-affiliated factories di Vietnam",
        en: "Trusted by Japanese and Japanese-affiliated manufacturers in Vietnam"
      },
      {
        id: "Kemampuan produksi carbide dan PCD untuk kebutuhan machining presisi",
        en: "Carbide and PCD production capability for precision machining needs"
      },
      {
        id: "Alternatif lebih fleksibel untuk biaya dan lead time dibandingkan sourcing penuh dari Jepang",
        en: "More flexible alternative for cost and lead time compared with full sourcing from Japan"
      }
    ],
    searchTerms: [
      "cutting tool",
      "cutting tools",
      "custom tool",
      "carbide",
      "pcd",
      "drill",
      "reamer",
      "milling",
      "regrinding",
      "machining"
    ],
    productGroups: [
      {
        slug: "custom-cutting-tools",
        title: { id: "Custom Cutting Tools", en: "Custom Cutting Tools" },
        description: {
          id: "Cutting tools khusus untuk proses drilling, reaming, milling, turning, PCD machining, dan kebutuhan tooling presisi lainnya.",
          en: "Custom cutting tools for drilling, reaming, milling, turning, PCD machining, and other precision tooling needs."
        },
        products: [
          {
            name: "Custom Carbide Tools",
            image: "/assets/brands/logos/viet-nhat.svg",
            summary: {
              id: "Cutting tools carbide yang dapat dibuat sesuai drawing, sample, atau spesifikasi proses machining pelanggan.",
              en: "Carbide cutting tools that can be manufactured based on customer drawings, samples, or machining process specifications."
            },
            tags: [
              { id: "Carbide", en: "Carbide" },
              { id: "Custom tool", en: "Custom tool" }
            ]
          },
          {
            name: "PCD Tools",
            image: "/assets/brands/logos/viet-nhat.svg",
            summary: {
              id: "Solusi PCD tools untuk machining presisi, terutama pada aplikasi yang membutuhkan cutting performance dan tool life yang stabil.",
              en: "PCD tooling solutions for precision machining, especially for applications requiring stable cutting performance and tool life."
            },
            tags: [
              { id: "PCD", en: "PCD" },
              { id: "Precision machining", en: "Precision machining" }
            ]
          },
          {
            name: "Drills, Reamers & Milling Cutters",
            image: "/assets/brands/logos/viet-nhat.svg",
            summary: {
              id: "Mata bor, reamer, milling cutter, dan special cutter untuk kebutuhan produksi machining industri.",
              en: "Drills, reamers, milling cutters, and special cutters for industrial machining production needs."
            },
            tags: [
              { id: "Drilling", en: "Drilling" },
              { id: "Milling", en: "Milling" }
            ]
          },
          {
            name: "Tool Regrinding & Reconditioning",
            image: "/assets/brands/logos/viet-nhat.svg",
            summary: {
              id: "Layanan regrinding dan reconditioning untuk memperpanjang umur pakai tools dan menjaga performa cutting.",
              en: "Regrinding and reconditioning services to extend tool life and maintain cutting performance."
            },
            tags: [
              { id: "Regrinding", en: "Regrinding" },
              { id: "Tool life", en: "Tool life" }
            ]
          }
        ]
      }
    ]
  }
];

export function getBrandBySlug(slug: string) {
  return brands.find((brand) => brand.slug === slug);
}

export const featuredBrands = brands.filter((brand) => brand.featured);
