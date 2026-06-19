import type { LocalizedText } from "@/lib/i18n";

export type Product = {
  name: string;
  model?: string;
  image: string;
  summary: LocalizedText;
  tags: LocalizedText[];
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
  featured?: boolean;
  searchTerms?: string[];
};

export const sea_brands: Brand[] = [
  
]

export const brands: Brand[] = [
  {
    slug: "tohnichi",
    name: "Tohnichi",
    countryCode: "JP",
    country: "Japan",
    category: {
      id: "Torque tools, torque wrench, dan sistem tightening",
      en: "Torque tools, torque wrenches, and tightening systems"
    },
    logo: "/assets/brands/tohnichi/logo.png",
    heroImage: "/assets/brands/tohnichi/products/CL100NX15D.jpg",
    featured: true,
    summary: {
      id: "Solusi torque control Jepang untuk assembly, inspection, calibration, dan error proofing.",
      en: "Japanese torque control solutions for assembly, inspection, calibration, and error proofing."
    },
    description: {
      id: "CSE mendukung kebutuhan Tohnichi untuk pabrik yang membutuhkan tightening akurat, quality control yang konsisten, dan traceability proses assembly.",
      en: "CSE supports Tohnichi needs for factories that require accurate tightening, consistent quality control, and assembly process traceability."
    },
    strengths: [
      { id: "Produk torque untuk produksi dan inspection", en: "Torque products for production and inspection" },
      { id: "Dukungan pemilihan model sesuai aplikasi", en: "Model selection support by application" },
      { id: "Cocok untuk lini otomotif dan industrial assembly", en: "Suitable for automotive and industrial assembly lines" }
    ],
    searchTerms: [
      "tonichi",
      "torque tools",
      "torque wrench",
      "torque screwdriver",
      "tightening",
      "calibration",
      "error proofing",
      "assembly"
    ],
    productGroups: [
      {
        slug: "inspection",
        title: { id: "Proses Inspeksi", en: "Inspection Process" },
        description: {
          id: "Ukur torsi, lihat hasil pada dial atau display, dan dokumentasikan pengecekan kualitas.",
          en: "Measure torque, read results on a dial or display, and document quality checks."
        },
        products: [
          {
            name: "DB / CDB Series",
            image: "/assets/brands/tohnichi/products/DB100N-S.jpg",
            summary: {
              id: "Dial indicating torque wrench untuk pembacaan torque pada inspeksi dan pengukuran.",
              en: "Dial indicating torque wrench for torque reading during inspection and measurement."
            },
            tags: [
              { id: "QC", en: "QC" },
              { id: "Inspection", en: "Inspection" }
            ]
          },
          {
            name: "CEM3-G",
            image: "/assets/brands/tohnichi/products/CEM3-BTLA.jpg",
            summary: {
              id: "Digital torque wrench untuk pencatatan data dan kontrol proses tightening.",
              en: "Digital torque wrench for data recording and tightening process control."
            },
            tags: [
              { id: "Traceability", en: "Traceability" },
              { id: "Digital", en: "Digital" }
            ]
          },
          {
            name: "CES-G",
            image: "/assets/brands/tohnichi/products/CES-G Background Removed.png",
            summary: {
              id: "Solusi digital untuk tightening dengan kebutuhan integrasi dan quality assurance.",
              en: "Digital tightening solution for integration and quality assurance needs."
            },
            tags: [
              { id: "Assembly line", en: "Assembly line" },
              { id: "Data capture", en: "Data capture" }
            ]
          }
        ]
      },
      {
        slug: "assembly",
        title: { id: "Proses Perakitan", en: "Assembly Process" },
        description: {
          id: "Kencangkan hingga bunyi click, rekam data proses, dan kurangi risiko miss-tightening.",
          en: "Tighten until click, record process data, and reduce miss-tightening risk."
        },
        products: [
          {
            name: "QL / CL Series",
            image: "/assets/brands/tohnichi/products/QL100N4.jpg",
            summary: {
              id: "Click type torque wrench untuk pengencangan harian dengan target torque yang jelas.",
              en: "Click type torque wrench for daily tightening with defined torque targets."
            },
            tags: [
              { id: "Assembly", en: "Assembly" },
              { id: "Manual tightening", en: "Manual tightening" }
            ]
          },
          {
            name: "CSPFDD-AD",
            image: "/assets/brands/tohnichi/products/CSPFDD100N3x15D-AD.jpg",
            summary: {
              id: "Torque wrench digital dengan data capture untuk proses pengencangan yang membutuhkan bukti.",
              en: "Digital torque wrench with data capture for tightening processes that need evidence."
            },
            tags: [
              { id: "Error proof", en: "Error proof" },
              { id: "Traceability", en: "Traceability" }
            ]
          },
          {
            name: "FDD Series",
            image: "/assets/brands/tohnichi/products/tohnichi_fdd.jpg",
            summary: {
              id: "Model digital untuk pengencangan dan pencatatan data di lini perakitan.",
              en: "Digital model for tightening and data recording on assembly lines."
            },
            tags: [
              { id: "Digital", en: "Digital" },
              { id: "Assembly line", en: "Assembly line" }
            ]
          }
        ]
      },
      {
        slug: "torque-screwdrivers",
        title: { id: "Obeng Torsi", en: "Torque Screwdrivers" },
        description: {
          id: "Obeng torsi manual dan digital untuk aplikasi torsi kecil, inspeksi, dan pekerjaan berulang.",
          en: "Manual and digital torque screwdrivers for small torque applications, inspection, and repeated work."
        },
        products: [
          {
            name: "RTD / RTDFH",
            image: "/assets/brands/tohnichi/products/RTD120CN.jpg",
            summary: {
              id: "Torque screwdriver dan tester pendukung untuk aplikasi torque kecil.",
              en: "Torque screwdrivers and supporting testers for low torque applications."
            },
            tags: [
              { id: "Calibration", en: "Calibration" },
              { id: "Small torque", en: "Small torque" }
            ]
          },
          {
            name: "RNTD Series",
            image: "/assets/brands/tohnichi/products/tohnichi_rntd120cn.jpg",
            summary: {
              id: "Tipe preset untuk membantu mencegah perubahan setting yang tidak disengaja.",
              en: "Preset type to help prevent accidental setting changes."
            },
            tags: [
              { id: "Preset", en: "Preset" },
              { id: "Manual", en: "Manual" }
            ]
          },
          {
            name: "FTD / FTD-S",
            image: "/assets/brands/tohnichi/products/20FTD2-A-S.jpg",
            summary: {
              id: "Obeng torsi inspeksi manual untuk pengecekan dan pengukuran.",
              en: "Manual inspection torque screwdriver for checking and measurement."
            },
            tags: [
              { id: "Inspection", en: "Inspection" },
              { id: "Small torque", en: "Small torque" }
            ]
          },
          {
            name: "STC2-G",
            image: "/assets/brands/tohnichi/products/STC50CN.jpg",
            summary: {
              id: "Solusi digital untuk inspeksi torsi kecil dengan kebutuhan pencatatan.",
              en: "Digital solution for small torque inspection with recording needs."
            },
            tags: [
              { id: "Digital", en: "Digital" },
              { id: "QC", en: "QC" }
            ]
          }
        ]
      },
      {
        slug: "calibration",
        title: { id: "Kalibrasi", en: "Calibration" },
        description: {
          id: "Peralatan pendukung untuk kalibrasi, pengecekan berkala, dan verifikasi torque tools.",
          en: "Supporting equipment for calibration, periodic checks, and torque tool verification."
        },
        products: [
          {
            name: "TCC2-G",
            image: "/assets/brands/tohnichi/products/Tohnichi TCC2-G.jpg",
            summary: {
              id: "Perangkat pendukung untuk pengelolaan dan pengecekan kalibrasi torque tools.",
              en: "Supporting equipment for torque tool calibration management and checks."
            },
            tags: [
              { id: "Calibration", en: "Calibration" },
              { id: "Verification", en: "Verification" }
            ]
          },
          {
            name: "DOTE-G",
            image: "/assets/brands/tohnichi/products/DOTE100N4-G.jpg",
            summary: {
              id: "Tester untuk pengecekan dan verifikasi alat torsi secara berkala.",
              en: "Tester for periodic torque tool checking and verification."
            },
            tags: [
              { id: "Tester", en: "Tester" },
              { id: "Maintenance", en: "Maintenance" }
            ]
          }
        ]
      },
      {
        slug: "error-proofing",
        title: { id: "Error Proofing", en: "Error Proofing" },
        description: {
          id: "Sistem pendukung untuk mengurangi human error, missed tightening, dan kesalahan proses.",
          en: "Supporting systems to reduce human error, missed tightening, and process mistakes."
        },
        products: [
          {
            name: "R-CM / M-FH",
            image: "/assets/brands/tohnichi/products/R-CM+M-FH.jpg",
            summary: {
              id: "Receiver dan perangkat komunikasi untuk proses tightening assurance.",
              en: "Receiver and communication devices for tightening assurance processes."
            },
            tags: [
              { id: "Wireless", en: "Wireless" },
              { id: "Poka-yoke", en: "Poka-yoke" }
            ]
          },
          {
            name: "TME Series",
            image: "/assets/brands/tohnichi/products/TME200CN3-BTL.jpg",
            summary: {
              id: "Perangkat pendukung untuk monitoring dan pengendalian proses tightening.",
              en: "Supporting device for tightening process monitoring and control."
            },
            tags: [
              { id: "Monitoring", en: "Monitoring" },
              { id: "Line control", en: "Line control" }
            ]
          }
        ]
      }
    ]
  },
  {
    slug: "nac",
    name: "NAC",
    countryCode: "JP",
    country: "Japan",
    category: {
      id: "Industrial tools dan socket",
      en: "Industrial tools and sockets"
    },
    logo: "/assets/brands/nac/products/NAC Cover Img.jpg",
    heroImage: "/assets/brands/nac/products/NAC Cover Img.jpg",
    summary: {
      id: "Brand industrial Jepang untuk kebutuhan tools dan socket di lingkungan produksi.",
      en: "Japanese industrial brand for tool and socket needs in production environments."
    },
    description: {
      id: "NAC tersedia sebagai bagian dari portofolio brand CSE untuk kebutuhan procurement industrial.",
      en: "NAC is available as part of CSE's industrial procurement brand portfolio."
    },
    strengths: [
      { id: "Produk untuk workshop dan produksi", en: "Products for workshops and production" },
      { id: "Kebutuhan tooling industrial", en: "Industrial tooling needs" }
    ],
    searchTerms: [
      "socket",
      "sockets",
      "industrial socket",
      "bit",
      "bits",
      "screwdriver bit",
      "attachment",
      "tooling",
      "maintenance"
    ],
    productGroups: [
      {
        slug: "socket-tools",
        title: { id: "Socket & Bit Tools", en: "Socket & Bit Tools" },
        description: {
          id: "Socket, bit, dan attachment untuk kebutuhan tooling di lini produksi dan workshop.",
          en: "Sockets, bits, and attachments for production line and workshop tooling needs."
        },
        products: [
          {
            name: "Industrial Sockets",
            image: "/assets/brands/nac/products/NAC socket.jpg",
            summary: {
              id: "Socket industrial untuk pekerjaan fastening dan maintenance.",
              en: "Industrial sockets for fastening and maintenance work."
            },
            tags: [
              { id: "Tooling", en: "Tooling" },
              { id: "Maintenance", en: "Maintenance" }
            ]
          },
          {
            name: "Screwdriver Bit Attachments",
            image: "/assets/brands/nac/products/NAC_ScrewdriverBit_Attachments_image1-300x300.jpg",
            summary: {
              id: "Attachment bit untuk kebutuhan assembly dan pekerjaan berulang.",
              en: "Bit attachments for assembly needs and repeated work."
            },
            tags: [
              { id: "Assembly", en: "Assembly" },
              { id: "Workshop", en: "Workshop" }
            ]
          }
        ]
      }
    ]
  },
  {
    slug: "fuji-star",
    name: "Fuji Star",
    countryCode: "JP",
    country: "Japan",
    category: {
      id: "Abrasive dan industrial supplies",
      en: "Abrasives and industrial supplies"
    },
    logo: "/assets/brands/fuji-star/logo.png",
    heroImage: "/assets/brands/fuji-star/products/Fujistar - Abrasive.jpg",
    summary: {
      id: "Produk abrasive dan supplies untuk proses produksi dan finishing.",
      en: "Abrasive products and supplies for production and finishing processes."
    },
    description: {
      id: "Fuji Star melengkapi pilihan brand CSE untuk kebutuhan pabrik dan general industry.",
      en: "Fuji Star expands CSE's brand options for factory and general industry requirements."
    },
    strengths: [
      { id: "Abrasive untuk proses produksi", en: "Abrasives for production processes" },
      { id: "Dukungan kebutuhan finishing", en: "Finishing needs support" }
    ],
    searchTerms: [
      "abrasive",
      "abrasives",
      "sandpaper",
      "sanding",
      "finishing",
      "surface preparation",
      "brush"
    ],
    productGroups: [
      {
        slug: "abrasives",
        title: { id: "Abrasive & Finishing", en: "Abrasive & Finishing" },
        description: {
          id: "Abrasive dan brush untuk proses finishing, body repair, dan preparation.",
          en: "Abrasives and brushes for finishing, body repair, and preparation processes."
        },
        products: [
          {
            name: "Abrasive Disc",
            image: "/assets/brands/fuji-star/products/Fujistar - Abrasive.jpg",
            summary: {
              id: "Produk abrasive untuk kebutuhan grinding, finishing, dan surface preparation.",
              en: "Abrasive products for grinding, finishing, and surface preparation needs."
            },
            tags: [
              { id: "Finishing", en: "Finishing" },
              { id: "Production supplies", en: "Production supplies" }
            ]
          },
          {
            name: "Industrial Brush",
            image: "/assets/brands/fuji-star/products/industrial brush.webp",
            summary: {
              id: "Brush industrial untuk pembersihan permukaan dan pekerjaan finishing.",
              en: "Industrial brushes for surface cleaning and finishing work."
            },
            tags: [
              { id: "Surface prep", en: "Surface prep" },
              { id: "General industry", en: "General industry" }
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
    logo: "/assets/brands/nippon-unit-brush/logo.gif",
    heroImage: "/assets/brands/nippon-unit-brush/logo.svg",
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
            image: "/assets/brands/nippon-unit-brush/logo.svg",
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
            image: "/assets/brands/nippon-unit-brush/logo.svg",
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
            image: "/assets/brands/nippon-unit-brush/logo.svg",
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
            image: "/assets/brands/nippon-unit-brush/logo.svg",
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
            image: "/assets/brands/nippon-unit-brush/logo.svg",
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
    slug: "smbc",
    name: "SMBC",
    countryCode: "TH",
    country: "Thailand",
    category: {
      id: "Brush industri dan solusi amplas untuk kebutuhan produksi dan maintenance",
      en: "Industrial brushes and sanding solutions for production and maintenance needs"
    },
    logo: "/assets/brands/smbc/logo.png",
    heroImage: "/assets/brands/smbc/logo.png",
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
            image: "/assets/brands/smbc/logo.png",
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
            image: "/assets/brands/smbc/logo.png",
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
            image: "/assets/brands/smbc/logo.png",
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
    logo: "/assets/brands/viet-nhat/logo.svg",
    heroImage: "/assets/brands/viet-nhat/logo.svg",
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
            image: "/assets/brands/viet-nhat/logo.svg",
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
            image: "/assets/brands/viet-nhat/logo.svg",
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
            image: "/assets/brands/viet-nhat/logo.svg",
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
            image: "/assets/brands/viet-nhat/logo.svg",
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
