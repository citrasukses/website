import type { LocalizedText } from "@/lib/i18n";

export type IndustryCaseStudyStep = {
  brandSlug: string;
  brandName: string;
  phase: LocalizedText;
  application: LocalizedText;
  solution: LocalizedText;
  value: LocalizedText;
};

export type IndustryCaseStudy = {
  industrySlug: string;
  title: LocalizedText;
  scenario: LocalizedText;
  challenge: LocalizedText;
  outcome: LocalizedText;
  steps: IndustryCaseStudyStep[];
};

const automotiveSteps: IndustryCaseStudyStep[] = [
  {
    brandSlug: "viet-nhat",
    brandName: "Viet Nhat",
    phase: { id: "Precision machining", en: "Precision machining" },
    application: {
      id: "Membuat housing, bore, dan komponen drivetrain sesuai drawing produksi.",
      en: "Machine housings, bores, and drivetrain components to the production drawing."
    },
    solution: { id: "Custom carbide tools dan PCD tools", en: "Custom carbide and PCD tools" },
    value: {
      id: "Geometri tool dapat disesuaikan dengan material, cycle time, dan target kualitas komponen.",
      en: "Tool geometry can be matched to the component material, cycle time, and quality target."
    }
  },
  {
    brandSlug: "nippon-unit-brush",
    brandName: "Nippon Unit Brush",
    phase: { id: "Deburring", en: "Deburring" },
    application: {
      id: "Menghilangkan burr pada bore, tepi, dan area internal setelah machining.",
      en: "Remove burrs from bores, edges, and internal areas after machining."
    },
    solution: { id: "Twisted, wheel, dan cup brush", en: "Twisted, wheel, and cup brushes" },
    value: {
      id: "Membersihkan area presisi tanpa mengubah dimensi kritis komponen.",
      en: "Clean precision areas without changing critical component dimensions."
    }
  },
  {
    brandSlug: "fuji-star",
    brandName: "Fuji Star",
    phase: { id: "Surface preparation", en: "Surface preparation" },
    application: {
      id: "Menyiapkan permukaan body, panel, atau komponen sebelum coating dan finishing.",
      en: "Prepare body, panel, or component surfaces before coating and finishing."
    },
    solution: { id: "Abrasive disc dan industrial brush", en: "Abrasive discs and industrial brushes" },
    value: {
      id: "Membantu menghasilkan permukaan yang konsisten untuk proses finishing berikutnya.",
      en: "Help produce a consistent surface for the next finishing process."
    }
  },
  {
    brandSlug: "smbc",
    brandName: "SMBC",
    phase: { id: "Line maintenance", en: "Line maintenance" },
    application: {
      id: "Cleaning jig, fixture, conveyor, dan area kerja selama maintenance rutin.",
      en: "Clean jigs, fixtures, conveyors, and work areas during routine maintenance."
    },
    solution: { id: "Industrial brush dan abrasive consumables", en: "Industrial brushes and abrasive consumables" },
    value: {
      id: "Consumable cost-effective untuk menjaga kesiapan lini produksi harian.",
      en: "Cost-effective consumables that support daily production-line readiness."
    }
  },
  {
    brandSlug: "nac",
    brandName: "NAC",
    phase: { id: "Final assembly", en: "Final assembly" },
    application: {
      id: "Fastening komponen berulang pada station assembly dan rework.",
      en: "Fasten components repeatedly at assembly and rework stations."
    },
    solution: { id: "Industrial socket dan screwdriver bit", en: "Industrial sockets and screwdriver bits" },
    value: {
      id: "Tooling yang sesuai membantu operator menjaga akses dan ritme kerja assembly.",
      en: "Suitable tooling helps operators maintain access and assembly work rhythm."
    }
  },
  {
    brandSlug: "tohnichi",
    brandName: "Tohnichi",
    phase: { id: "Torque assurance", en: "Torque assurance" },
    application: {
      id: "Mengencangkan dan memeriksa sambungan kritis dengan target torque yang jelas.",
      en: "Tighten and inspect critical joints against a defined torque target."
    },
    solution: { id: "Torque wrench dan digital torque system", en: "Torque wrenches and digital torque systems" },
    value: {
      id: "Mendukung kontrol tightening, inspeksi, dan traceability pada final assembly.",
      en: "Support tightening control, inspection, and traceability in final assembly."
    }
  }
];

const heavyEquipmentSteps: IndustryCaseStudyStep[] = [
  {
    brandSlug: "viet-nhat",
    brandName: "Viet Nhat",
    phase: { id: "Component machining", en: "Component machining" },
    application: {
      id: "Machining pin, bushing, bore, dan komponen attachment berdasarkan drawing.",
      en: "Machine pins, bushings, bores, and attachment components from drawings."
    },
    solution: { id: "Custom carbide tools dan reconditioning", en: "Custom carbide tools and reconditioning" },
    value: {
      id: "Tool khusus dan regrinding membantu menjaga proses machining komponen berdimensi besar.",
      en: "Custom tools and regrinding help sustain large-component machining processes."
    }
  },
  {
    brandSlug: "nippon-unit-brush",
    brandName: "Nippon Unit Brush",
    phase: { id: "Edge finishing", en: "Edge finishing" },
    application: {
      id: "Deburring bore, tepi hasil cutting, dan area sulit dijangkau pada komponen.",
      en: "Deburr bores, cut edges, and hard-to-reach areas on components."
    },
    solution: { id: "Twisted dan special-shaped brush", en: "Twisted and special-shaped brushes" },
    value: {
      id: "Bentuk brush dapat dipilih mengikuti geometri komponen dan area kerja.",
      en: "Brush form can be selected around the component geometry and work area."
    }
  },
  {
    brandSlug: "fuji-star",
    brandName: "Fuji Star",
    phase: { id: "Coating preparation", en: "Coating preparation" },
    application: {
      id: "Grinding ringan dan surface preparation sebelum painting atau recoating.",
      en: "Light grinding and surface preparation before painting or recoating."
    },
    solution: { id: "Abrasive disc", en: "Abrasive discs" },
    value: {
      id: "Membantu menyiapkan permukaan yang lebih seragam untuk sistem coating.",
      en: "Help prepare a more uniform surface for the coating system."
    }
  },
  {
    brandSlug: "smbc",
    brandName: "SMBC",
    phase: { id: "Workshop upkeep", en: "Workshop upkeep" },
    application: {
      id: "Membersihkan korosi, deposit, dan permukaan parts saat overhaul.",
      en: "Remove corrosion, deposits, and surface residue from parts during overhaul."
    },
    solution: { id: "Cleaning, deburring, dan sanding brush", en: "Cleaning, deburring, and sanding brushes" },
    value: {
      id: "Pilihan consumable praktis untuk pekerjaan maintenance yang berulang.",
      en: "Practical consumable options for recurring maintenance work."
    }
  },
  {
    brandSlug: "nac",
    brandName: "NAC",
    phase: { id: "Mechanical assembly", en: "Mechanical assembly" },
    application: {
      id: "Assembly dan disassembly fastener pada workshop, chassis, dan attachment.",
      en: "Assemble and remove fasteners in workshops, chassis, and attachments."
    },
    solution: { id: "Industrial socket dan bit attachment", en: "Industrial sockets and bit attachments" },
    value: {
      id: "Socket dan attachment yang tepat mendukung akses pada pekerjaan heavy-duty.",
      en: "The right sockets and attachments support access in heavy-duty work."
    }
  },
  {
    brandSlug: "tohnichi",
    brandName: "Tohnichi",
    phase: { id: "Critical joint check", en: "Critical joint check" },
    application: {
      id: "Final tightening dan inspeksi baut kritis setelah assembly atau overhaul.",
      en: "Final-tighten and inspect critical bolts after assembly or overhaul."
    },
    solution: { id: "High-range torque wrench dan inspection tools", en: "High-range torque wrenches and inspection tools" },
    value: {
      id: "Memberi target torque yang terkontrol untuk sambungan yang menuntut reliabilitas.",
      en: "Provide a controlled torque target for joints that demand reliability."
    }
  }
];

const generalIndustrySteps: IndustryCaseStudyStep[] = [
  {
    brandSlug: "viet-nhat",
    brandName: "Viet Nhat",
    phase: { id: "Custom part production", en: "Custom part production" },
    application: {
      id: "Membuat spare part dan komponen proses berdasarkan drawing atau sample.",
      en: "Produce process components and spare parts from drawings or samples."
    },
    solution: { id: "Custom drills, reamers, dan milling cutters", en: "Custom drills, reamers, and milling cutters" },
    value: {
      id: "Solusi tooling fleksibel untuk kebutuhan machining yang tidak selalu tersedia sebagai produk standar.",
      en: "Flexible tooling for machining needs not always served by standard products."
    }
  },
  {
    brandSlug: "nippon-unit-brush",
    brandName: "Nippon Unit Brush",
    phase: { id: "Deburr & polish", en: "Deburr & polish" },
    application: {
      id: "Deburring, polishing, cleaning, dan dust prevention di area produksi.",
      en: "Deburr, polish, clean, and prevent dust in production areas."
    },
    solution: { id: "Strip, roll, wheel, dan custom brush", en: "Strip, roll, wheel, and custom brushes" },
    value: {
      id: "Material dan bentuk brush dapat disesuaikan dengan fungsi pada proses produksi.",
      en: "Brush material and form can be matched to the production-process function."
    }
  },
  {
    brandSlug: "fuji-star",
    brandName: "Fuji Star",
    phase: { id: "Surface finishing", en: "Surface finishing" },
    application: {
      id: "Grinding, sanding, dan surface preparation pada fabrikasi atau repair.",
      en: "Grind, sand, and prepare surfaces during fabrication or repair."
    },
    solution: { id: "Abrasive disc dan brush", en: "Abrasive discs and brushes" },
    value: {
      id: "Mendukung hasil finishing yang lebih konsisten pada pekerjaan produksi dan perbaikan.",
      en: "Support more consistent finishing in production and repair work."
    }
  },
  {
    brandSlug: "smbc",
    brandName: "SMBC",
    phase: { id: "Daily maintenance", en: "Daily maintenance" },
    application: {
      id: "Cleaning mesin, surface preparation, dan penggantian consumable rutin.",
      en: "Clean machines, prepare surfaces, and replace routine consumables."
    },
    solution: { id: "Industrial brush dan sanding solution", en: "Industrial brushes and sanding solutions" },
    value: {
      id: "Alternatif regional cost-effective dengan lead time praktis untuk pemakaian harian.",
      en: "A cost-effective regional alternative with practical lead times for daily use."
    }
  },
  {
    brandSlug: "nac",
    brandName: "NAC",
    phase: { id: "Assembly & repair", en: "Assembly & repair" },
    application: {
      id: "Fastening pada assembly station, workshop, dan pekerjaan repair.",
      en: "Fasten parts at assembly stations, workshops, and repair jobs."
    },
    solution: { id: "Industrial socket dan screwdriver bit", en: "Industrial sockets and screwdriver bits" },
    value: {
      id: "Satu pilihan tooling untuk pekerjaan fastening produksi maupun maintenance.",
      en: "One tooling option for both production and maintenance fastening work."
    }
  },
  {
    brandSlug: "tohnichi",
    brandName: "Tohnichi",
    phase: { id: "Process verification", en: "Process verification" },
    application: {
      id: "Mengontrol tightening dan memeriksa torque pada assembly kritis.",
      en: "Control tightening and inspect torque on critical assemblies."
    },
    solution: { id: "Click, dial, dan digital torque tools", en: "Click, dial, and digital torque tools" },
    value: {
      id: "Membantu standardisasi pekerjaan, quality check, dan dokumentasi proses.",
      en: "Help standardize work, quality checks, and process documentation."
    }
  }
];

export const industryCaseStudies: IndustryCaseStudy[] = [
  {
    industrySlug: "automotive",
    title: { id: "Alur produksi komponen hingga final assembly", en: "Component production through final assembly" },
    scenario: { id: "Contoh aplikasi: lini komponen drivetrain otomotif", en: "Application example: automotive drivetrain component line" },
    challenge: {
      id: "Menjaga machining, finishing, fastening, dan quality assurance tetap konsisten dari satu proses ke proses berikutnya.",
      en: "Keep machining, finishing, fastening, and quality assurance consistent from one process to the next."
    },
    outcome: {
      id: "Enam brand mengisi tahapan yang berbeda dalam satu alur produksi yang saling terhubung.",
      en: "Six brands cover distinct stages in one connected production workflow."
    },
    steps: automotiveSteps
  },
  {
    industrySlug: "heavy-equipment",
    title: { id: "Dari component machining hingga inspeksi joint", en: "From component machining to joint inspection" },
    scenario: { id: "Contoh aplikasi: produksi dan overhaul alat berat", en: "Application example: heavy-equipment production and overhaul" },
    challenge: {
      id: "Menangani komponen besar, permukaan berat, dan sambungan kritis dengan tooling yang sesuai pada setiap tahap.",
      en: "Handle large components, demanding surfaces, and critical joints with suitable tooling at every stage."
    },
    outcome: {
      id: "Workflow menghubungkan kebutuhan workshop, fabrikasi, assembly, dan inspeksi akhir.",
      en: "The workflow connects workshop, fabrication, assembly, and final-inspection needs."
    },
    steps: heavyEquipmentSteps
  },
  {
    industrySlug: "general-industry",
    title: { id: "Tooling lintas proses untuk pabrik dan workshop", en: "Cross-process tooling for factories and workshops" },
    scenario: { id: "Contoh aplikasi: produksi, maintenance, dan repair", en: "Application example: production, maintenance, and repair" },
    challenge: {
      id: "Menggabungkan kebutuhan custom part, consumable harian, assembly, dan quality check dalam satu supply plan.",
      en: "Combine custom-part, daily-consumable, assembly, and quality-check needs in one supply plan."
    },
    outcome: {
      id: "Setiap brand memiliki peran yang jelas dari pembuatan komponen sampai verifikasi proses.",
      en: "Each brand has a clear role from component creation through process verification."
    },
    steps: generalIndustrySteps
  }
];

