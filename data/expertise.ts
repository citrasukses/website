import type { LocalizedText } from "@/lib/i18n";

export type ExpertiseIcon =
  | "application"
  | "selection"
  | "control"
  | "verification"
  | "sourcing"
  | "maintenance"
  | "quality"
  | "support";

export type ExpertiseStage = {
  id: string;
  icon: ExpertiseIcon;
  title: LocalizedText;
  description: LocalizedText;
};

export type ExpertiseVisualImage = {
  id: string;
  src: string;
  alt: LocalizedText;
  fit?: "contain" | "cover";
};

export type ExpertiseArea = {
  id: string;
  enabled?: boolean;
  eyebrow: LocalizedText;
  title: LocalizedText;
  description: LocalizedText;
  visual: {
    images: [ExpertiseVisualImage, ...ExpertiseVisualImage[]];
    label: LocalizedText;
    sequence: LocalizedText;
    badge?: LocalizedText;
    motif?: "torque-arc" | "none";
  };
  stages: ExpertiseStage[];
  capabilities: Array<{
    id: string;
    label: LocalizedText;
  }>;
  primaryCta: {
    label: LocalizedText;
    href: string;
  };
  secondaryCta?: {
    label: LocalizedText;
    href: string;
  };
};

// Homepage expertise areas are managed here.
// - Add, remove, or reorder entries without changing the renderer.
// - Set enabled to false to temporarily hide an expertise area.
// - Valid stage icons: application, selection, control, verification,
//   sourcing, maintenance, quality, support.
// - visual.badge and visual.motif are optional, so visuals are not torque-specific.
// - visual.images accepts one to four images; use fit: "cover" for photography.
export const expertiseAreas: ExpertiseArea[] = [
  {
    id: "torque-control",
    enabled: true,
    eyebrow: {
      id: "Keahlian torque control",
      en: "Torque control expertise"
    },
    title: {
      id: "Dari kebutuhan tightening hingga hasil yang terverifikasi.",
      en: "From tightening requirements to verified results."
    },
    description: {
      id: "CSE membantu tim produksi dan quality menentukan solusi torque berdasarkan aplikasi, range torsi, proses kerja, serta kebutuhan data dan pencegahan kesalahan.",
      en: "CSE helps production and quality teams define torque solutions around the application, torque range, working process, data requirements, and error prevention."
    },
    visual: {
      images: [
        {
          id: "digital-torque-wrench",
          src: "/assets/company/background-items/tohnichi-digital-torque-wrench.png",
          alt: {
            id: "Digital torque wrench untuk kontrol dan pencatatan proses tightening",
            en: "Digital torque wrench for tightening process control and data capture"
          }
        }
      ],
      label: {
        id: "Partner torque control untuk manufaktur",
        en: "Torque control partner for manufacturing"
      },
      sequence: {
        id: "Target · Tightening · Verifikasi",
        en: "Target · Tightening · Verification"
      },
      badge: { id: "N·m", en: "N·m" }
    },
    stages: [
      {
        id: "define-application",
        icon: "application",
        title: { id: "Definisikan aplikasi", en: "Define the application" },
        description: {
          id: "Pahami jenis joint, target torsi, akses, dan ritme produksi.",
          en: "Review the joint, target torque, access, and production pace."
        }
      },
      {
        id: "select-tools",
        icon: "selection",
        title: { id: "Pilih tools yang tepat", en: "Select the right tools" },
        description: {
          id: "Cocokkan torque wrench, screwdriver, tester, atau system.",
          en: "Match the right torque wrench, screwdriver, tester, or system."
        }
      },
      {
        id: "control-tightening",
        icon: "control",
        title: { id: "Kontrol tightening", en: "Control tightening" },
        description: {
          id: "Bangun proses yang repeatable dengan data capture dan poka-yoke.",
          en: "Build a repeatable process with data capture and poka-yoke."
        }
      },
      {
        id: "verify-result",
        icon: "verification",
        title: { id: "Verifikasi hasil", en: "Verify the result" },
        description: {
          id: "Dukung inspection, pengecekan berkala, dan pengelolaan kalibrasi.",
          en: "Support inspection, periodic checks, and calibration management."
        }
      }
    ],
    capabilities: [
      { id: "assembly", label: { id: "Assembly tightening", en: "Assembly tightening" } },
      { id: "inspection", label: { id: "Inspeksi torsi", en: "Torque inspection" } },
      { id: "verification", label: { id: "Kalibrasi & verifikasi", en: "Calibration & verification" } },
      { id: "error-proofing", label: { id: "Error proofing & traceability", en: "Error proofing & traceability" } }
    ],
    primaryCta: {
      label: { id: "Diskusikan aplikasi torque", en: "Discuss your torque application" },
      href: "/contact"
    },
    secondaryCta: {
      label: { id: "Lihat solusi torque", en: "Explore torque solutions" },
      href: "/brands/tohnichi"
    }
  },
  // Official reference: https://nac-corp.co.jp/en/
  {
    id: "fastening-connections",
    enabled: true,
    eyebrow: {
      id: "Keahlian NAC fastening tools",
      en: "NAC fastening tools expertise"
    },
    title: {
      id: "Connection tools yang tepat untuk setiap titik fastening.",
      en: "The right connection tools for every fastening point."
    },
    description: {
      id: "CSE membantu tim produksi memilih impact socket, driver socket, screwdriver bit, dan quick coupling NAC berdasarkan tool, fastener, akses, serta kebutuhan proses berulang.",
      en: "CSE helps production teams select NAC impact sockets, driver sockets, screwdriver bits, and quick couplings around the tool, fastener, access, and repeated-process requirements."
    },
    visual: {
      images: [
        {
          id: "nac-connection-tools",
          src: "/assets/brands/products/nac/nac_socket.jpg",
          alt: {
            id: "Impact socket, screwdriver bit, dan quick coupling NAC",
            en: "NAC impact sockets, screwdriver bits, and quick couplings"
          },
          fit: "cover"
        }
      ],
      label: {
        id: "Partner connection tools untuk lini produksi",
        en: "Connection tools partner for production lines"
      },
      sequence: {
        id: "Tool drive · Connection · Produksi",
        en: "Tool drive · Connection · Production"
      },
      badge: { id: "NAC", en: "NAC" },
      motif: "none"
    },
    stages: [
      {
        id: "define-fastening-point",
        icon: "application",
        title: { id: "Definisikan titik fastening", en: "Define the fastening point" },
        description: {
          id: "Identifikasi tool, drive size, fastener, akses, dan frekuensi kerja.",
          en: "Identify the tool, drive size, fastener, access, and operating frequency."
        }
      },
      {
        id: "match-connection-tool",
        icon: "selection",
        title: { id: "Cocokkan connection tool", en: "Match the connection tool" },
        description: {
          id: "Pilih impact socket, driver socket, bit, atau quick coupling yang sesuai.",
          en: "Select the appropriate impact socket, driver socket, bit, or quick coupling."
        }
      },
      {
        id: "adapt-production-process",
        icon: "control",
        title: { id: "Sesuaikan dengan proses", en: "Adapt to the process" },
        description: {
          id: "Pertimbangkan durabilitas, changeover, dan kebutuhan standard atau custom-made.",
          en: "Consider durability, changeovers, and standard or custom-made requirements."
        }
      },
      {
        id: "verify-fit-operation",
        icon: "verification",
        title: { id: "Verifikasi fit dan operasi", en: "Verify fit and operation" },
        description: {
          id: "Pastikan koneksi sesuai dengan pneumatic atau electric tool dan kondisi penggunaan.",
          en: "Confirm compatibility with the pneumatic or electric tool and operating conditions."
        }
      }
    ],
    capabilities: [
      { id: "impact-sockets", label: { id: "Impact sockets", en: "Impact sockets" } },
      { id: "driver-bits", label: { id: "Driver sockets & bits", en: "Driver sockets & bits" } },
      { id: "quick-couplings", label: { id: "Quick couplings", en: "Quick couplings" } },
      { id: "custom-tools", label: { id: "Custom-made tools", en: "Custom-made tools" } }
    ],
    primaryCta: {
      label: { id: "Diskusikan aplikasi fastening", en: "Discuss your fastening application" },
      href: "/contact"
    },
    secondaryCta: {
      label: { id: "Lihat solusi NAC", en: "Explore NAC solutions" },
      href: "/brands/nac"
    }
  },
  // Official references: https://en.fujistar.com/ and https://en.fujistar.com/products/
  {
    id: "abrasive-polishing",
    enabled: true,
    eyebrow: {
      id: "Keahlian Sankyo Fujistar abrasive",
      en: "Sankyo Fujistar abrasive expertise"
    },
    title: {
      id: "Abrasive yang tepat dimulai dari material, permukaan, dan target finish.",
      en: "The right abrasive starts with the material, surface, and finish target."
    },
    description: {
      id: "CSE membantu memilih solusi abrasive Fujistar berdasarkan workpiece, bentuk produk, grit, metode sanding, dan kualitas permukaan yang dibutuhkan proses.",
      en: "CSE helps select Fujistar abrasive solutions around the workpiece, product format, grit, sanding method, and surface quality required by the process."
    },
    visual: {
      images: [
        {
          id: "automotive-sanding",
          src: "/assets/brands/products/fuji-star/car_body_abrasive.webp",
          alt: {
            id: "Proses sanding pada panel otomotif",
            en: "Sanding process on an automotive panel"
          },
          fit: "cover"
        }
      ],
      label: {
        id: "Partner abrasive dan polishing untuk manufaktur",
        en: "Abrasive and polishing partner for manufacturing"
      },
      sequence: {
        id: "Material · Abrasive · Surface finish",
        en: "Material · Abrasive · Surface finish"
      },
      badge: { id: "FUJISTAR", en: "FUJISTAR" },
      motif: "none"
    },
    stages: [
      {
        id: "define-surface",
        icon: "application",
        title: { id: "Definisikan material dan surface", en: "Define the material and surface" },
        description: {
          id: "Tentukan substrate, kondisi awal, area kerja, dan target hasil akhir.",
          en: "Determine the substrate, initial condition, working area, and finish target."
        }
      },
      {
        id: "select-abrasive-format",
        icon: "selection",
        title: { id: "Pilih format abrasive", en: "Select the abrasive format" },
        description: {
          id: "Cocokkan sheet, disc, belt, roll, film, atau non-woven dengan proses.",
          en: "Match sheets, discs, belts, rolls, films, or non-wovens to the process."
        }
      },
      {
        id: "match-grit-method",
        icon: "control",
        title: { id: "Cocokkan grit dan metode", en: "Match the grit and method" },
        description: {
          id: "Susun grit progression, backing, serta proses dry atau wet sanding.",
          en: "Define grit progression, backing, and the dry or wet sanding process."
        }
      },
      {
        id: "verify-surface-result",
        icon: "quality",
        title: { id: "Verifikasi surface result", en: "Verify the surface result" },
        description: {
          id: "Evaluasi konsistensi finish, clogging, konsumsi abrasive, dan repeatability.",
          en: "Evaluate finish consistency, clogging, abrasive consumption, and repeatability."
        }
      }
    ],
    capabilities: [
      { id: "sheet-disc-belt", label: { id: "Sheet, disc & belt", en: "Sheet, disc & belt" } },
      { id: "dry-wet", label: { id: "Dry & wet sanding", en: "Dry & wet sanding" } },
      { id: "nonwoven", label: { id: "Non-woven finishing", en: "Non-woven finishing" } },
      { id: "multi-industry", label: { id: "Automotive, steel & high-tech", en: "Automotive, steel & high-tech" } }
    ],
    primaryCta: {
      label: { id: "Diskusikan proses abrasive", en: "Discuss your abrasive process" },
      href: "/contact"
    },
    secondaryCta: {
      label: { id: "Lihat solusi Fujistar", en: "Explore Fujistar solutions" },
      href: "/brands/fuji-star"
    }
  },
  // Official references: https://www.unitbrush.co.jp/english/ and
  // https://www.unitbrush.co.jp/english/brush/index.html
  {
    id: "industrial-brush-engineering",
    enabled: true,
    eyebrow: {
      id: "Keahlian Nippon Unit Corporation",
      en: "Nippon Unit Corporation expertise"
    },
    title: {
      id: "Brush engineering berdasarkan workpiece dan kebutuhan proses.",
      en: "Brush engineering built around the workpiece and process."
    },
    description: {
      id: "CSE membantu mencocokkan bentuk dan material brush Nippon Unit Corporation untuk deburring, polishing, cleaning, dust prevention, conveyor, serta area yang sulit dijangkau.",
      en: "CSE helps match Nippon Unit Corporation brush forms and materials to deburring, polishing, cleaning, dust prevention, conveyors, and hard-to-reach areas."
    },
    visual: {
      images: [
        {
          id: "strip-brushes",
          src: "/assets/brands/products/nippon-unit-brush/strip-brushes.jpg",
          alt: { id: "Strip brushes Nippon Unit", en: "Nippon Unit strip brushes" },
          fit: "cover"
        },
        {
          id: "wheel-brushes",
          src: "/assets/brands/products/nippon-unit-brush/wheel-brushes.jpg",
          alt: { id: "Wheel brushes Nippon Unit", en: "Nippon Unit wheel brushes" },
          fit: "cover"
        },
        {
          id: "special-shape-brushes",
          src: "/assets/brands/products/nippon-unit-brush/special-shape-brushes.jpg",
          alt: { id: "Brush bentuk khusus Nippon Unit", en: "Nippon Unit special-shaped brushes" },
          fit: "cover"
        },
        {
          id: "twisted-brushes",
          src: "/assets/brands/products/nippon-unit-brush/twisted-brushes.jpg",
          alt: { id: "Twisted brushes Nippon Unit", en: "Nippon Unit twisted brushes" },
          fit: "cover"
        }
      ],
      label: {
        id: "Partner industrial brush sesuai aplikasi",
        en: "Application-specific industrial brush partner"
      },
      sequence: {
        id: "Workpiece · Brush form · Surface result",
        en: "Workpiece · Brush form · Surface result"
      },
      badge: { id: "120+ YEARS", en: "120+ YEARS" },
      motif: "none"
    },
    stages: [
      {
        id: "define-brush-task",
        icon: "application",
        title: { id: "Definisikan task dan geometri", en: "Define the task and geometry" },
        description: {
          id: "Petakan burr, permukaan, lubang, conveyor, atau area cleaning yang ditangani.",
          en: "Map the burr, surface, hole, conveyor, or cleaning area being addressed."
        }
      },
      {
        id: "select-brush-form",
        icon: "selection",
        title: { id: "Pilih bentuk brush", en: "Select the brush form" },
        description: {
          id: "Pilih strip, roll, wheel, cup, twisted, atau bentuk khusus sesuai akses.",
          en: "Select strip, roll, wheel, cup, twisted, or special forms around the access."
        }
      },
      {
        id: "match-material-condition",
        icon: "control",
        title: { id: "Cocokkan material dan kondisi", en: "Match material and conditions" },
        description: {
          id: "Pertimbangkan material filamen, contact, speed, dan target surface treatment.",
          en: "Consider filament material, contact, speed, and the surface-treatment target."
        }
      },
      {
        id: "validate-brush-result",
        icon: "verification",
        title: { id: "Validasi hasil dan keselamatan", en: "Validate results and safety" },
        description: {
          id: "Periksa hasil deburring atau cleaning, pola keausan, dan penggunaan protective equipment.",
          en: "Check deburring or cleaning results, wear patterns, and protective-equipment use."
        }
      }
    ],
    capabilities: [
      { id: "deburring", label: { id: "Deburring", en: "Deburring" } },
      { id: "polishing", label: { id: "Polishing", en: "Polishing" } },
      { id: "conveyor-cleaning", label: { id: "Conveyor cleaning", en: "Conveyor cleaning" } },
      { id: "custom-brush", label: { id: "Custom brush forms", en: "Custom brush forms" } }
    ],
    primaryCta: {
      label: { id: "Diskusikan aplikasi brush", en: "Discuss your brush application" },
      href: "/contact"
    },
    secondaryCta: {
      label: { id: "Lihat solusi Nippon Unit", en: "Explore Nippon Unit solutions" },
      href: "/brands/nippon-unit-brush"
    }
  }
];
