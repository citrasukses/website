import type { ContentLink } from "@/data/category-hubs";
import type { LocalizedText } from "@/lib/i18n";

export type IndustryPageContent = {
  industrySlug: "automotive" | "heavy-equipment" | "general-industry";
  seoTitle: LocalizedText;
  seoDescription: LocalizedText;
  eyebrow: LocalizedText;
  introTitle: LocalizedText;
  intro: LocalizedText;
  priorities: Array<{ title: LocalizedText; description: LocalizedText }>;
  buyerChecklist: LocalizedText[];
  related: ContentLink[];
};

export const industryPages: IndustryPageContent[] = [
  {
    industrySlug: "automotive",
    seoTitle: { id: "Industrial Tools untuk Industri Otomotif Indonesia", en: "Industrial Tools for Automotive Manufacturing Indonesia" },
    seoDescription: {
      id: "Solusi machining, deburring, surface preparation, fastening, torque control, dan quality inspection untuk manufaktur otomotif Indonesia.",
      en: "Machining, deburring, surface preparation, fastening, torque control, and quality-inspection solutions for automotive manufacturing in Indonesia."
    },
    eyebrow: { id: "Solusi industri otomotif", en: "Automotive industry solutions" },
    introTitle: { id: "Satu alur dari machining komponen sampai final torque assurance.", en: "One workflow from component machining to final torque assurance." },
    intro: {
      id: "Kebutuhan otomotif jarang berhenti pada satu tool. Komponen perlu dikerjakan sesuai drawing, burr dibersihkan, surface disiapkan, fastener dihubungkan dengan tooling yang tepat, lalu tightening diverifikasi. CSE membantu menghubungkan kebutuhan antarproses agar procurement tidak menilai setiap item secara terpisah.",
      en: "Automotive requirements rarely stop at one tool. Components must be machined to drawing, burrs removed, surfaces prepared, fasteners connected with suitable tooling, and tightening verified. CSE helps connect requirements across the process so procurement does not evaluate every item in isolation."
    },
    priorities: [
      { title: { id: "Repeatability di line", en: "Line repeatability" }, description: { id: "Tooling, consumable, dan metode kerja perlu menghasilkan output yang stabil antar shift.", en: "Tooling, consumables, and methods must produce stable output across shifts." } },
      { title: { id: "Traceability fastening", en: "Fastening traceability" }, description: { id: "Joint kritis dapat membutuhkan count, judgment, marking, atau data hasil tightening.", en: "Critical joints may require counts, judgment, marking, or tightening-result data." } },
      { title: { id: "Perubahan model", en: "Model changeovers" }, description: { id: "Pemilihan tool harus mempertimbangkan variant product, access, dan kontrol recipe.", en: "Tool selection should account for product variants, access, and recipe control." } },
      { title: { id: "Quality containment", en: "Quality containment" }, description: { id: "Sediakan verification point untuk mendeteksi perubahan tool sebelum menjadi defect berulang.", en: "Place verification points to detect tool drift before it creates repeated defects." } }
    ],
    buyerChecklist: [
      { id: "Drawing atau foto komponen dan titik kerja", en: "Drawing or photo of the component and work point" },
      { id: "Material, coating, dan kondisi surface", en: "Material, coating, and surface condition" },
      { id: "Target cycle time dan jumlah unit per shift", en: "Target cycle time and units per shift" },
      { id: "Fastener, target torque, sequence, dan toleransi", en: "Fastener, torque target, sequence, and tolerance" },
      { id: "Kebutuhan data, marking, interlock, atau PLC", en: "Data, marking, interlock, or PLC requirements" },
      { id: "Standar inspeksi dan interval verifikasi", en: "Inspection standard and verification interval" }
    ],
    related: [
      { href: "/solutions/torque-control", title: { id: "Torque control untuk assembly", en: "Torque control for assembly" }, description: { id: "Tool, tester, dan data dalam satu proses.", en: "Tools, testers, and data in one process." } },
      { href: "/solutions/poka-yoke-tightening", title: { id: "Poka-yoke tightening", en: "Poka-yoke tightening" }, description: { id: "Kurangi missed tightening dan wrong sequence.", en: "Reduce missed tightening and wrong sequence." } },
      { href: "/torque-wrench", title: { id: "Torque wrench industrial", en: "Industrial torque wrenches" }, description: { id: "Bandingkan click, preset, indicating, dan digital.", en: "Compare click, preset, indicating, and digital tools." } }
    ]
  },
  {
    industrySlug: "heavy-equipment",
    seoTitle: { id: "Industrial Tools untuk Industri Alat Berat Indonesia", en: "Industrial Tools for Heavy Equipment Indonesia" },
    seoDescription: {
      id: "Tooling machining, deburring, surface preparation, industrial sockets, dan high-range torque control untuk produksi serta overhaul alat berat.",
      en: "Machining, deburring, surface preparation, industrial sockets, and high-range torque-control tooling for heavy-equipment production and overhaul."
    },
    eyebrow: { id: "Solusi industri alat berat", en: "Heavy-equipment industry solutions" },
    introTitle: { id: "Tooling untuk komponen besar, akses sulit, dan critical joint.", en: "Tooling for large components, difficult access, and critical joints." },
    intro: {
      id: "Produksi dan overhaul alat berat menggabungkan machining komponen berdimensi besar, finishing area berat, disassembly, reassembly, dan final torque check. Pemilihan tool perlu mempertimbangkan kapasitas, reaksi gaya, keselamatan operator, akses, serta kemampuan mempertahankan hasil pada kondisi workshop.",
      en: "Heavy-equipment production and overhaul combine large-component machining, demanding surface work, disassembly, reassembly, and final torque checks. Tool selection must account for capacity, reaction forces, operator safety, access, and the ability to maintain results under workshop conditions."
    },
    priorities: [
      { title: { id: "Kapasitas dan reaction", en: "Capacity and reaction" }, description: { id: "High torque membutuhkan posisi kerja, reaction point, dan tool handling yang direncanakan.", en: "High torque requires planned work position, reaction points, and tool handling." } },
      { title: { id: "Durability workshop", en: "Workshop durability" }, description: { id: "Debu, benturan, korosi, dan frekuensi overhaul memengaruhi pilihan tool serta consumable.", en: "Dust, impact, corrosion, and overhaul frequency affect tool and consumable selection." } },
      { title: { id: "Akses fastener", en: "Fastener access" }, description: { id: "Socket, extension, universal joint, dan head perlu dievaluasi sebagai satu assembly.", en: "Sockets, extensions, universal joints, and heads should be evaluated as one assembly." } },
      { title: { id: "Post-overhaul verification", en: "Post-overhaul verification" }, description: { id: "Critical joint memerlukan target, metode tightening, dan bukti pemeriksaan yang jelas.", en: "Critical joints require clear targets, tightening methods, and inspection evidence." } }
    ],
    buyerChecklist: [
      { id: "Ukuran fastener, grade, dan target torque", en: "Fastener size, grade, and torque target" },
      { id: "Foto area kerja dan clearance di sekeliling fastener", en: "Work-area photos and clearance around the fastener" },
      { id: "Jenis power tool, square drive, dan reaction point", en: "Power-tool type, square drive, and reaction point" },
      { id: "Material komponen dan kondisi korosi atau coating", en: "Component material and corrosion or coating condition" },
      { id: "Frekuensi assembly, disassembly, atau overhaul", en: "Assembly, disassembly, or overhaul frequency" },
      { id: "Metode inspection dan record setelah pekerjaan", en: "Inspection method and post-work records" }
    ],
    related: [
      { href: "/torque-wrench", title: { id: "High-range torque wrench", en: "High-range torque wrenches" }, description: { id: "Pilih range, head, dan metode kerja sesuai joint.", en: "Match range, head, and operating method to the joint." } },
      { href: "/brands/nac", title: { id: "NAC industrial sockets", en: "NAC industrial sockets" }, description: { id: "Socket dan attachment untuk powered fastening.", en: "Sockets and attachments for powered fastening." } },
      { href: "/solutions/torque-calibration-verification", title: { id: "Verification torque tools", en: "Torque-tool verification" }, description: { id: "Bangun check berkala untuk tool workshop.", en: "Build periodic checks for workshop tools." } }
    ]
  },
  {
    industrySlug: "general-industry",
    seoTitle: { id: "Industrial Tools untuk General Manufacturing Indonesia", en: "Industrial Tools for General Manufacturing Indonesia" },
    seoDescription: {
      id: "Dukungan industrial sourcing untuk machining, deburring, sanding, assembly, maintenance, dan quality control di pabrik serta workshop Indonesia.",
      en: "Industrial sourcing support for machining, deburring, sanding, assembly, maintenance, and quality control in Indonesian factories and workshops."
    },
    eyebrow: { id: "Solusi general manufacturing", en: "General-manufacturing solutions" },
    introTitle: { id: "Satukan kebutuhan produksi, maintenance, dan spare-part sourcing.", en: "Connect production, maintenance, and spare-part sourcing." },
    intro: {
      id: "General manufacturing sering membutuhkan campuran standard tools, custom items, consumable, dan replacement parts dari beberapa principal. CSE membantu mengubah daftar kebutuhan yang tersebar menjadi RFQ yang dapat diverifikasi berdasarkan model, drawing, material, aplikasi, dan target proses.",
      en: "General manufacturing often needs a mix of standard tools, custom items, consumables, and replacement parts from several principals. CSE helps turn scattered requirements into verifiable RFQs based on model, drawing, material, application, and process target."
    },
    priorities: [
      { title: { id: "Technical equivalence", en: "Technical equivalence" }, description: { id: "Alternatif harus dibandingkan melalui function, dimension, material, dan operating condition.", en: "Alternatives should be compared by function, dimensions, material, and operating conditions." } },
      { title: { id: "Consumable consistency", en: "Consumable consistency" }, description: { id: "Abrasive dan brush perlu distandardisasi agar finish serta lifetime dapat dibandingkan.", en: "Abrasives and brushes should be standardized so finish and lifetime can be compared." } },
      { title: { id: "Maintenance readiness", en: "Maintenance readiness" }, description: { id: "Critical spares dan tools perlu diidentifikasi sebelum breakdown atau shutdown.", en: "Critical spares and tools should be identified before a breakdown or shutdown." } },
      { title: { id: "RFQ clarity", en: "RFQ clarity" }, description: { id: "Model, drawing, quantity, dan application note mempercepat konfirmasi principal.", en: "Models, drawings, quantities, and application notes speed principal confirmation." } }
    ],
    buyerChecklist: [
      { id: "Brand, model, part number, atau drawing yang tersedia", en: "Available brand, model, part number, or drawing" },
      { id: "Fungsi item di mesin atau proses", en: "The item's function in the machine or process" },
      { id: "Material, dimension, connection, dan operating condition", en: "Material, dimensions, connection, and operating conditions" },
      { id: "Kuantitas, target delivery, dan pola konsumsi", en: "Quantity, target delivery, and consumption pattern" },
      { id: "Apakah alternatif diperbolehkan dan parameter yang tidak boleh berubah", en: "Whether alternatives are allowed and which parameters cannot change" },
      { id: "Foto nameplate, packaging, dan item lama bila tersedia", en: "Photos of the nameplate, packaging, and old item when available" }
    ],
    related: [
      { href: "/solutions/industrial-sourcing", title: { id: "Industrial sourcing service", en: "Industrial sourcing service" }, description: { id: "Dari RFQ tidak lengkap sampai shortlist yang dapat diverifikasi.", en: "From incomplete RFQ to a verifiable shortlist." } },
      { href: "/brands", title: { id: "Brand directory", en: "Brand directory" }, description: { id: "Cari represented dan general-trading brands CSE.", en: "Search CSE represented and general-trading brands." } },
      { href: "/solutions/torque-control", title: { id: "Torque control", en: "Torque control" }, description: { id: "Standardisasi tightening dan quality check.", en: "Standardize tightening and quality checks." } }
    ]
  }
];

export function getIndustryPageContent(slug: string) {
  return industryPages.find((page) => page.industrySlug === slug);
}
