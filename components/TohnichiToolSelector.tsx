"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Activity,
  ArrowRight,
  Bluetooth,
  Boxes,
  Check,
  ChevronLeft,
  ClipboardCheck,
  Database,
  Gauge,
  Monitor,
  RotateCcw,
  Settings2,
  ShieldCheck,
  Wifi,
  Wrench,
  Zap
} from "lucide-react";
import type { CatalogProduct, CatalogProductGroup } from "@/data/catalog-types";
import { ProductCard } from "@/components/ProductCard";
import { text, type Language, type LocalizedText } from "@/lib/i18n";

type TaskId = "tighten" | "inspect" | "calibrate" | "measure" | "assure" | "accessory";
type CapabilityId = "wireless" | "data" | "proofing" | "digital" | "insulated" | "angle";

type Choice = {
  id: string;
  label: LocalizedText;
  description: LocalizedText;
  icon?: LucideIcon;
  groups?: string[];
  tags?: string[];
  terms?: string[];
};

type TaskChoice = Choice & {
  id: TaskId;
};

type CapabilityChoice = Choice & {
  id: CapabilityId;
};

type IndexedProduct = {
  group: CatalogProductGroup;
  product: CatalogProduct;
  tags: Set<string>;
  searchText: string;
};

type RankedProduct = IndexedProduct & {
  score: number;
  reason: string;
};

const SMART_TAGS = new Set(["wireless", "data management", "error proofing", "pokayoke"]);

const FINDER_PRODUCT_IMAGES = [
  "/assets/brands/products/tohnichi/CES-G Background Removed.png",
  "/assets/brands/products/tohnichi/QL5N+.png",
  "/assets/brands/products/tohnichi/CL2NX6D+.png",
  "/assets/brands/products/tohnichi/tohnichi_collage_ftd_ftds.png"
];

const TASKS: TaskChoice[] = [
  {
    id: "tighten",
    label: { id: "Mengencangkan sekrup atau baut", en: "Tighten screws or bolts" },
    description: { id: "Dari pekerjaan sesekali sampai lini produksi massal.", en: "From occasional work to mass-production lines." },
    icon: Wrench,
    groups: [
      "torque-screwdrivers",
      "torque-wrenches",
      "interchangeable-head-torque-wrenches",
      "power-torque-tools",
      "multiple-units"
    ],
    tags: ["tightening"]
  },
  {
    id: "inspect",
    label: { id: "Menginspeksi hasil pengencangan", en: "Inspect a tightened joint" },
    description: { id: "Baca nilai torsi, lakukan audit, atau cek pass/fail.", en: "Read torque, audit a joint, or check pass/fail." },
    icon: ClipboardCheck,
    groups: ["torque-wrenches", "interchangeable-head-torque-wrenches", "torque-measuring-equipment"],
    tags: ["inspection"]
  },
  {
    id: "calibrate",
    label: { id: "Menguji atau mengalibrasi alat", en: "Test or calibrate a tool" },
    description: { id: "Untuk torque screwdriver, wrench, dan power tool.", en: "For torque screwdrivers, wrenches, and power tools." },
    icon: Gauge,
    groups: ["tester-checker", "torque-measuring-equipment"],
    tags: ["calibration", "tester / checker"]
  },
  {
    id: "measure",
    label: { id: "Mengukur torsi, gaya, atau tension", en: "Measure torque, force, or tension" },
    description: { id: "Sensor, torque meter, dan pengukuran axial force baut.", en: "Sensors, torque meters, and bolt axial-force measurement." },
    icon: Activity,
    groups: ["torque-measuring-equipment", "force-measuring-instruments"],
    tags: ["measurement", "force measurement"]
  },
  {
    id: "assure",
    label: { id: "Mencegah error dan merekam proses", en: "Prevent errors and record the process" },
    description: { id: "Poka-yoke, monitoring, traceability, dan integrasi lini.", en: "Poka-yoke, monitoring, traceability, and line integration." },
    icon: ShieldCheck,
    groups: ["tightening-assurance-systems", "optional-equipment"],
    tags: ["error proofing", "data management", "wireless", "pokayoke"]
  },
  {
    id: "accessory",
    label: { id: "Mencari head, receiver, atau aksesori", en: "Find a head, receiver, or accessory" },
    description: { id: "Head, bit, socket, kabel, receiver, software, dan stand.", en: "Heads, bits, sockets, cables, receivers, software, and stands." },
    icon: Boxes,
    groups: ["optional-equipment", "accessories"],
    tags: ["optional equipment", "accessory"]
  }
];

const SITUATIONS: Record<TaskId, Choice[]> = {
  tighten: [
    {
      id: "small-screws",
      label: { id: "Sekrup kecil", en: "Small screws" },
      description: { id: "Elektronik, instrumen, dan assembly ringan.", en: "Electronics, instruments, and light assembly." },
      groups: ["torque-screwdrivers"],
      tags: ["power torque screwdriver"],
      terms: ["screwdriver", "screw"]
    },
    {
      id: "bolts-nuts",
      label: { id: "Baut atau mur", en: "Bolts or nuts" },
      description: { id: "Assembly, maintenance, otomotif, dan struktur.", en: "Assembly, maintenance, automotive, and structures." },
      groups: ["torque-wrenches", "interchangeable-head-torque-wrenches"],
      tags: ["power torque wrench", "torque wrench"]
    },
    {
      id: "restricted-access",
      label: { id: "Akses sempit atau head khusus", en: "Tight access or a special head" },
      description: { id: "Butuh open-end, ring, ratchet, atau custom head.", en: "Needs an open-end, ring, ratchet, or custom head." },
      groups: ["interchangeable-head-torque-wrenches"],
      tags: ["interchangeable head"]
    },
    {
      id: "multi-fastener",
      label: { id: "Beberapa fastener sekaligus", en: "Several fasteners at once" },
      description: { id: "Pengencangan serentak dengan multi-spindle.", en: "Simultaneous tightening with multiple spindles." },
      groups: ["multiple-units"],
      tags: ["multiple unit"]
    }
  ],
  inspect: [
    {
      id: "joint-audit",
      label: { id: "Audit baut atau mur", en: "Audit a bolt or nut" },
      description: { id: "Periksa residual torque langsung di sambungan.", en: "Check residual torque directly on the joint." },
      groups: ["torque-wrenches", "interchangeable-head-torque-wrenches"],
      tags: ["inspection"]
    },
    {
      id: "small-fastener-audit",
      label: { id: "Audit sekrup kecil", en: "Audit a small screw" },
      description: { id: "Pembacaan presisi pada komponen kecil.", en: "Precision reading on small components." },
      groups: ["torque-screwdrivers"],
      tags: ["indicating", "inspection"]
    },
    {
      id: "digital-record",
      label: { id: "Inspeksi digital dengan bukti data", en: "Digital inspection with a data record" },
      description: { id: "Simpan atau kirim hasil pengukuran.", en: "Save or transmit measurement results." },
      tags: ["inspection", "data management"],
      terms: ["digital", "data"]
    },
    {
      id: "pass-fail",
      label: { id: "Judgment pass/fail", en: "Pass/fail judgment" },
      description: { id: "Operator mendapat indikasi hasil yang jelas.", en: "Give the operator a clear result indication." },
      tags: ["inspection", "error proofing"],
      terms: ["judgment", "indicator"]
    }
  ],
  calibrate: [
    {
      id: "screwdriver-test",
      label: { id: "Torque screwdriver", en: "Torque screwdriver" },
      description: { id: "Tester atau checker untuk torsi kecil.", en: "A tester or checker for small torque." },
      groups: ["tester-checker"],
      tags: ["torque screwdriver tester", "torque screwdriver checker"]
    },
    {
      id: "wrench-test",
      label: { id: "Torque wrench", en: "Torque wrench" },
      description: { id: "Checker, tester, atau calibration kit untuk wrench.", en: "A checker, tester, or calibration kit for wrenches." },
      groups: ["tester-checker"],
      tags: ["torque wrench tester", "torque wrench checker", "calibration kit"]
    },
    {
      id: "power-tool-test",
      label: { id: "Power tool atau line tool", en: "Power tool or line tool" },
      description: { id: "Sensor dan bench system untuk alat bertenaga.", en: "Sensors and bench systems for powered tools." },
      groups: ["tester-checker", "torque-measuring-equipment"],
      tags: ["torque sensor", "torque meter"]
    },
    {
      id: "calibration-lab",
      label: { id: "Lab kalibrasi lengkap", en: "Complete calibration lab" },
      description: { id: "Controller, calibrator, dan manajemen hasil.", en: "Controllers, calibrators, and result management." },
      tags: ["calibration", "data management", "calibration kit"]
    }
  ],
  measure: [
    {
      id: "torque-measurement",
      label: { id: "Torsi putar", en: "Rotational torque" },
      description: { id: "Torque meter, gauge, sensor, atau attachment.", en: "Torque meter, gauge, sensor, or attachment." },
      groups: ["torque-measuring-equipment"],
      tags: ["torque meter", "torque gauge", "torque sensor", "torque attachment"]
    },
    {
      id: "bolt-tension",
      label: { id: "Axial force atau tension baut", en: "Bolt axial force or tension" },
      description: { id: "Evaluasi gaya jepit dan kondisi baut.", en: "Evaluate clamping force and bolt condition." },
      groups: ["force-measuring-instruments"],
      tags: ["force measurement", "tension meter"]
    },
    {
      id: "machine-sensor",
      label: { id: "Sensor untuk mesin atau jig", en: "A sensor for a machine or jig" },
      description: { id: "Transducer dan indicator untuk integrasi alat.", en: "Transducers and indicators for equipment integration." },
      tags: ["torque sensor", "torque indicator"],
      terms: ["sensor", "transducer", "indicator"]
    },
    {
      id: "portable-measurement",
      label: { id: "Pengukuran portabel", en: "Portable measurement" },
      description: { id: "Bawa alat ukur ke area kerja.", en: "Bring the measuring tool to the work area." },
      tags: ["measurement"],
      terms: ["portable", "handheld"]
    }
  ],
  assure: [
    {
      id: "manual-line",
      label: { id: "Lini dengan alat manual", en: "A line using manual tools" },
      description: { id: "Deteksi klik, hitung pekerjaan, dan cegah proses terlewat.", en: "Detect clicks, count operations, and prevent missed work." },
      groups: ["torque-wrenches", "torque-screwdrivers", "tightening-assurance-systems"],
      tags: ["pokayoke", "error proofing"]
    },
    {
      id: "powered-line",
      label: { id: "Lini elektrik atau pneumatik", en: "An electric or pneumatic line" },
      description: { id: "Kontrol power tool dan integrasi station.", en: "Control power tools and integrate the station." },
      groups: ["power-torque-tools", "tightening-assurance-systems"],
      tags: ["power tool", "system solution"]
    },
    {
      id: "monitoring-system",
      label: { id: "Monitoring dan traceability", en: "Monitoring and traceability" },
      description: { id: "Kirim hasil, simpan history, dan hubungkan proses.", en: "Transmit results, store history, and connect the process." },
      groups: ["tightening-assurance-systems", "optional-equipment"],
      tags: ["data management", "wireless"]
    },
    {
      id: "standalone-proofing",
      label: { id: "Poka-yoke sederhana di satu station", en: "Simple poka-yoke at one station" },
      description: { id: "Receiver, buzzer, atau I/O tanpa sistem besar.", en: "A receiver, buzzer, or I/O without a large system." },
      groups: ["optional-equipment"],
      tags: ["torque verification equipment", "error proofing"]
    }
  ],
  accessory: [
    {
      id: "head-bit-socket",
      label: { id: "Head, bit, atau socket", en: "Head, bit, or socket" },
      description: { id: "Sesuaikan koneksi tool dengan fastener.", en: "Match the tool connection to the fastener." },
      groups: ["accessories"],
      terms: ["head", "bit", "socket"]
    },
    {
      id: "receiver-io",
      label: { id: "Receiver, buzzer, atau I/O", en: "Receiver, buzzer, or I/O" },
      description: { id: "Bangun koneksi nirkabel dan judgment station.", en: "Build wireless connectivity and station judgment." },
      groups: ["optional-equipment"],
      tags: ["torque verification equipment"],
      terms: ["receiver", "buzzer", "i/o"]
    },
    {
      id: "software-data",
      label: { id: "Software atau pengolahan data", en: "Software or data processing" },
      description: { id: "Kumpulkan, ekspor, dan kelola hasil.", en: "Collect, export, and manage results." },
      groups: ["optional-equipment"],
      tags: ["data processing equipment", "data management"]
    },
    {
      id: "support-equipment",
      label: { id: "Stand, kabel, baterai, atau alat bantu", en: "Stand, cable, battery, or support item" },
      description: { id: "Perlengkapan penggunaan dan perawatan tool.", en: "Equipment for tool use and maintenance." },
      groups: ["accessories", "optional-equipment"],
      tags: ["auxiliary equipment"]
    }
  ]
};

const WORK_PATTERNS: Record<TaskId, Choice[]> = {
  tighten: [
    {
      id: "few",
      label: { id: "Sesekali · di bawah 50/hari", en: "Occasional · under 50/day" },
      description: { id: "Manual dan adjustable biasanya paling praktis.", en: "Manual and adjustable is usually the practical start." },
      icon: Wrench,
      tags: ["adjustable", "click type", "indicating"]
    },
    {
      id: "repeated",
      label: { id: "Berulang · 50–500/hari", en: "Repeated · 50–500/day" },
      description: { id: "Preset, pre-lock, atau semi-automatic mengurangi variasi.", en: "Preset, pre-lock, or semi-automatic reduces variation." },
      icon: Settings2,
      tags: ["preset", "pre-lock", "pokayoke", "power torque screwdriver"]
    },
    {
      id: "mass",
      label: { id: "Produksi tinggi · di atas 500/hari", en: "High production · over 500/day" },
      description: { id: "Power tool, pneumatik, dan multi-spindle lebih efisien.", en: "Powered, pneumatic, and multi-spindle tools are more efficient." },
      icon: Zap,
      groups: ["power-torque-tools", "multiple-units"],
      tags: ["power tool", "multiple unit", "system solution"]
    }
  ],
  inspect: [
    {
      id: "spot-check",
      label: { id: "Spot check sesekali", en: "Occasional spot checks" },
      description: { id: "Pembacaan sederhana langsung di lapangan.", en: "A straightforward reading in the field." },
      icon: Gauge,
      tags: ["indicating", "dial indicating", "beam type"]
    },
    {
      id: "routine-audit",
      label: { id: "Audit rutin", en: "Routine audits" },
      description: { id: "Digital judgment dan memori membantu konsistensi.", en: "Digital judgment and memory improve consistency." },
      icon: ClipboardCheck,
      tags: ["inspection", "data management"]
    },
    {
      id: "connected-inspection",
      label: { id: "Inspeksi terhubung", en: "Connected inspection" },
      description: { id: "Kirim hasil ke PC, app, atau sistem quality.", en: "Send results to a PC, app, or quality system." },
      icon: Wifi,
      tags: ["wireless", "data management"]
    }
  ],
  calibrate: [
    {
      id: "quick-check",
      label: { id: "Quick check di area kerja", en: "Quick check in the work area" },
      description: { id: "Checker ringkas untuk verifikasi berkala.", en: "A compact checker for periodic verification." },
      icon: Gauge,
      tags: ["checker", "tester / checker"]
    },
    {
      id: "bench-test",
      label: { id: "Bench testing terjadwal", en: "Scheduled bench testing" },
      description: { id: "Tester stabil untuk banyak tool.", en: "A stable tester for many tools." },
      icon: Settings2,
      tags: ["tester / checker", "calibration"]
    },
    {
      id: "documented-calibration",
      label: { id: "Kalibrasi dengan laporan data", en: "Calibration with data reports" },
      description: { id: "Simpan hasil dan kelola riwayat alat.", en: "Save results and manage tool history." },
      icon: Database,
      tags: ["calibration", "data management", "data processing equipment"]
    }
  ],
  measure: [
    {
      id: "portable",
      label: { id: "Dibawa ke lapangan", en: "Taken into the field" },
      description: { id: "Prioritaskan alat portabel dan pembacaan langsung.", en: "Prioritize portability and direct readout." },
      icon: Activity,
      terms: ["portable", "digital", "meter", "gauge"]
    },
    {
      id: "bench",
      label: { id: "Dipasang di bench atau jig", en: "Mounted on a bench or jig" },
      description: { id: "Sensor, attachment, dan indicator terpisah.", en: "Separate sensors, attachments, and indicators." },
      icon: Settings2,
      tags: ["torque sensor", "torque attachment", "torque indicator"]
    },
    {
      id: "logged",
      label: { id: "Hasil harus direkam", en: "Results must be recorded" },
      description: { id: "Pilih output dan pengolahan data.", en: "Choose data output and processing." },
      icon: Database,
      tags: ["data management", "data processing equipment"]
    }
  ],
  assure: [
    {
      id: "one-station",
      label: { id: "Satu station", en: "One station" },
      description: { id: "Mulai dari receiver atau verification unit sederhana.", en: "Start with a simple receiver or verification unit." },
      icon: Monitor,
      groups: ["optional-equipment"],
      tags: ["torque verification equipment"]
    },
    {
      id: "production-line",
      label: { id: "Beberapa station produksi", en: "Several production stations" },
      description: { id: "Butuh urutan kerja, history, dan integrasi lini.", en: "Needs work sequence, history, and line integration." },
      icon: ShieldCheck,
      groups: ["tightening-assurance-systems"],
      tags: ["system solution", "tightening assurance"]
    },
    {
      id: "factory-data",
      label: { id: "Terhubung ke data pabrik", en: "Connected to factory data" },
      description: { id: "Prioritaskan komunikasi dan data management.", en: "Prioritize communications and data management." },
      icon: Database,
      tags: ["wireless", "data management", "data processing equipment"]
    }
  ],
  accessory: [
    {
      id: "for-manual",
      label: { id: "Untuk tool manual", en: "For a manual tool" },
      description: { id: "Head, bit, socket, receiver, dan alat setting.", en: "Heads, bits, sockets, receivers, and setting tools." },
      icon: Wrench,
      terms: ["manual", "head", "bit", "socket", "receiver"]
    },
    {
      id: "for-powered",
      label: { id: "Untuk power tool", en: "For a powered tool" },
      description: { id: "Kabel, baterai, stand, dan perlengkapan mesin.", en: "Cables, batteries, stands, and machine equipment." },
      icon: Zap,
      terms: ["power", "battery", "cable", "stand"]
    },
    {
      id: "for-system",
      label: { id: "Untuk sistem data atau poka-yoke", en: "For a data or poka-yoke system" },
      description: { id: "Receiver, I/O, software, printer, dan interface.", en: "Receivers, I/O, software, printers, and interfaces." },
      icon: Wifi,
      tags: ["wireless", "data management", "error proofing", "data processing equipment"]
    }
  ]
};

const CAPABILITIES: CapabilityChoice[] = [
  {
    id: "wireless",
    label: { id: "Wireless / Bluetooth", en: "Wireless / Bluetooth" },
    description: { id: "Tanpa kabel untuk mengirim hasil atau sinyal tool.", en: "Cable-free result or tool-signal transmission." },
    icon: Bluetooth,
    tags: ["wireless"],
    terms: ["bluetooth", "wireless lan", "-bt", "-wf"]
  },
  {
    id: "proofing",
    label: { id: "Poka-yoke / anti salah", en: "Poka-yoke / error proofing" },
    description: { id: "Cegah pengencangan terlewat, salah urutan, atau salah hasil.", en: "Prevent missed, out-of-sequence, or failed tightening." },
    icon: ShieldCheck,
    tags: ["error proofing", "pokayoke"]
  },
  {
    id: "data",
    label: { id: "Kirim atau simpan data", en: "Send or save data" },
    description: { id: "Untuk traceability, laporan, atau integrasi quality.", en: "For traceability, reporting, or quality integration." },
    icon: Database,
    tags: ["data management", "data processing equipment"],
    terms: ["data transfer", "data logging", "memory"]
  },
  {
    id: "digital",
    label: { id: "Layar dan judgment digital", en: "Digital display and judgment" },
    description: { id: "Nilai torsi dan status lebih mudah dibaca.", en: "Make torque values and status easier to read." },
    icon: Monitor,
    tags: ["indicating"],
    terms: ["digital", "display", "judgment"]
  },
  {
    id: "insulated",
    label: { id: "Insulated untuk area listrik", en: "Insulated for electrical work" },
    description: { id: "Perlindungan tambahan untuk aplikasi berisiko listrik.", en: "Additional protection for electrically hazardous work." },
    icon: Zap,
    terms: ["insulated", "electrical-shock", "rtdz", "rntdz", "pqlz", "qspz"]
  },
  {
    id: "angle",
    label: { id: "Pengukuran sudut", en: "Angle measurement" },
    description: { id: "Untuk metode torque + angle.", en: "For torque-plus-angle methods." },
    icon: Activity,
    tags: ["angle"],
    terms: ["angle"]
  }
];

const STEP_LABELS: LocalizedText[] = [
  { id: "Tujuan", en: "Job" },
  { id: "Aplikasi", en: "Application" },
  { id: "Cara kerja", en: "Work pattern" },
  { id: "Fitur pintar", en: "Smart features" }
];

function normalize(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function matchesChoice(item: IndexedProduct, choice: Choice) {
  const groupMatch = choice.groups?.includes(item.group.slug) ?? false;
  const tagMatch = choice.tags?.some((tag) => item.tags.has(normalize(tag))) ?? false;
  const termMatch = choice.terms?.some((term) => item.searchText.includes(normalize(term))) ?? false;
  return groupMatch || tagMatch || termMatch;
}

function capabilityMatches(item: IndexedProduct, capability: CapabilityChoice) {
  return matchesChoice(item, capability);
}

function getTask(taskId: TaskId | "") {
  return TASKS.find((task) => task.id === taskId);
}

function SelectionCard({
  choice,
  selected,
  onSelect,
  lang
}: {
  choice: Choice;
  selected: boolean;
  onSelect: () => void;
  lang: Language;
}) {
  const Icon = choice.icon;

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`focus-ring group flex min-h-28 w-full items-start gap-4 border p-4 text-left transition sm:p-5 ${
        selected
          ? "border-industrial-700 bg-industrial-700 text-white shadow-panel"
          : "border-graphite-200 bg-white text-graphite-900 hover:-translate-y-0.5 hover:border-industrial-600 hover:shadow-panel"
      }`}
    >
      {Icon ? (
        <span
          className={`flex h-11 w-11 shrink-0 items-center justify-center border ${
            selected ? "border-white/30 bg-white/10" : "border-industrial-200 bg-industrial-50 text-industrial-700"
          }`}
        >
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
      ) : null}
      <span className="min-w-0">
        <span className="flex items-start justify-between gap-2 text-base font-bold">
          {text(choice.label, lang)}
          <span
            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
              selected ? "border-white bg-white text-industrial-700" : "border-graphite-300 text-transparent group-hover:border-industrial-600"
            }`}
          >
            <Check className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
        </span>
        <span className={`mt-1.5 block text-sm leading-5 ${selected ? "text-white/75" : "text-graphite-500"}`}>
          {text(choice.description, lang)}
        </span>
      </span>
    </button>
  );
}

export function TohnichiToolSelector({
  groups,
  lang,
  brandSlug
}: {
  groups: CatalogProductGroup[];
  lang: Language;
  brandSlug: string;
}) {
  const [step, setStep] = useState(1);
  const [taskId, setTaskId] = useState<TaskId | "">("");
  const [situationId, setSituationId] = useState("");
  const [workPatternId, setWorkPatternId] = useState("");
  const [capabilityIds, setCapabilityIds] = useState<CapabilityId[]>([]);
  const [showResults, setShowResults] = useState(false);

  const indexedProducts = useMemo<IndexedProduct[]>(
    () =>
      groups.flatMap((group) =>
        group.products.map((product) => ({
          group,
          product,
          tags: new Set(product.tags.map((tag) => normalize(tag.en))),
          searchText: normalize(
            [
              product.name,
              product.model ?? "",
              product.summary.en,
              product.summary.id,
              ...product.tags.flatMap((tag) => [tag.en, tag.id])
            ].join(" ")
          )
        }))
      ),
    [groups]
  );

  const selectedTask = getTask(taskId);
  const situationChoices = taskId ? SITUATIONS[taskId] : [];
  const workPatternChoices = taskId ? WORK_PATTERNS[taskId] : [];
  const selectedSituation = situationChoices.find((choice) => choice.id === situationId);
  const selectedWorkPattern = workPatternChoices.find((choice) => choice.id === workPatternId);
  const selectedCapabilities = CAPABILITIES.filter((capability) => capabilityIds.includes(capability.id));

  const rankedProducts = useMemo<RankedProduct[]>(() => {
    if (!selectedTask) return [];

    const taskCandidates = indexedProducts.filter((item) => matchesChoice(item, selectedTask));
    const situationCandidates = selectedSituation
      ? taskCandidates.filter((item) => matchesChoice(item, selectedSituation))
      : taskCandidates;
    const scopedCandidates = situationCandidates.length > 0 ? situationCandidates : taskCandidates;
    const exactCapabilityCandidates =
      selectedCapabilities.length > 0
        ? scopedCandidates.filter((item) => selectedCapabilities.every((capability) => capabilityMatches(item, capability)))
        : scopedCandidates;
    const candidates = exactCapabilityCandidates.length > 0 ? exactCapabilityCandidates : scopedCandidates;

    return candidates
      .map((item) => {
        let score = 0;
        const reasons: string[] = [];

        if (selectedTask.groups?.includes(item.group.slug)) score += 48;
        if (selectedTask.tags?.some((tag) => item.tags.has(normalize(tag)))) score += 18;

        if (selectedSituation && matchesChoice(item, selectedSituation)) {
          score += 36;
          reasons.push(text(selectedSituation.label, lang));
        }

        if (selectedWorkPattern && matchesChoice(item, selectedWorkPattern)) {
          score += 22;
          reasons.push(text(selectedWorkPattern.label, lang).split("·")[0].trim());
        }

        const matchedCapabilities = selectedCapabilities.filter((capability) => capabilityMatches(item, capability));
        score += matchedCapabilities.length * 30;
        reasons.push(...matchedCapabilities.map((capability) => text(capability.label, lang)));

        const smartFeatureCount = [...item.tags].filter((tag) => SMART_TAGS.has(tag)).length;
        score += smartFeatureCount * 2;

        return {
          ...item,
          score,
          reason:
            reasons.slice(0, 3).join(" · ") ||
            (lang === "en" ? `Matches ${text(selectedTask.label, lang).toLowerCase()}` : `Cocok untuk ${text(selectedTask.label, lang).toLowerCase()}`)
        };
      })
      .sort((a, b) => b.score - a.score || a.product.name.localeCompare(b.product.name))
      .slice(0, 6);
  }, [indexedProducts, lang, selectedCapabilities, selectedSituation, selectedTask, selectedWorkPattern]);

  const exactCapabilityMatchCount = useMemo(() => {
    if (!selectedTask || selectedCapabilities.length === 0) return 0;
    return indexedProducts.filter(
      (item) =>
        matchesChoice(item, selectedTask) &&
        (!selectedSituation || matchesChoice(item, selectedSituation)) &&
        selectedCapabilities.every((capability) => capabilityMatches(item, capability))
    ).length;
  }, [indexedProducts, selectedCapabilities, selectedSituation, selectedTask]);

  function chooseTask(nextTaskId: TaskId) {
    setTaskId(nextTaskId);
    setSituationId("");
    setWorkPatternId("");
    setCapabilityIds([]);
    setShowResults(false);
    setStep(2);
  }

  function chooseSituation(nextSituationId: string) {
    setSituationId(nextSituationId);
    setWorkPatternId("");
    setShowResults(false);
    setStep(3);
  }

  function chooseWorkPattern(nextWorkPatternId: string) {
    setWorkPatternId(nextWorkPatternId);
    setShowResults(false);
    setStep(4);
  }

  function toggleCapability(capabilityId: CapabilityId) {
    setCapabilityIds((current) =>
      current.includes(capabilityId) ? current.filter((id) => id !== capabilityId) : [...current, capabilityId]
    );
    setShowResults(false);
  }

  function resetSelector() {
    setStep(1);
    setTaskId("");
    setSituationId("");
    setWorkPatternId("");
    setCapabilityIds([]);
    setShowResults(false);
  }

  const question =
    step === 1
      ? lang === "en"
        ? "What do you need the tool to do?"
        : "Apa yang harus dilakukan alatnya?"
      : step === 2
        ? lang === "en"
          ? "What are you working on?"
          : "Apa yang sedang Anda kerjakan?"
        : step === 3
          ? lang === "en"
            ? "How will the tool be used?"
            : "Bagaimana alat akan digunakan?"
          : lang === "en"
            ? "Which smart features matter?"
            : "Fitur pintar apa yang dibutuhkan?";

  return (
    <section aria-labelledby="tohnichi-selector-title" className="overflow-hidden border border-graphite-200 bg-white shadow-panel">
      <div className="tohnichi-finder-backdrop relative isolate overflow-hidden px-5 py-7 text-white md:px-8 md:py-8">
        <div className="relative z-10 max-w-3xl lg:max-w-[58%]">
          <p className="inline-flex border-l-2 border-signal-500 pl-3 text-xs font-bold uppercase tracking-[0.22em] text-white/75">
            {lang === "en" ? "TOHNICHI guided tool finder" : "Panduan pemilihan TOHNICHI"}
          </p>
          <h2 id="tohnichi-selector-title" className="mt-3 max-w-2xl text-3xl font-bold leading-tight md:text-4xl">
            {lang === "en" ? "Find the right tool without knowing the model name." : "Temukan alat yang tepat tanpa harus tahu nama model."}
          </h2>
        </div>
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-4 right-6 hidden w-[36%] grid-cols-2 gap-2 lg:grid">
          {FINDER_PRODUCT_IMAGES.map((src) => (
            <div key={src} className="relative">
              <Image src={src} alt="" fill sizes="18vw" className="tohnichi-finder-product-image object-contain p-1" />
            </div>
          ))}
        </div>
      </div>

      <div className="border-b border-graphite-200 bg-graphite-50 px-4 py-4 sm:px-6">
        <ol className="grid grid-cols-4 gap-2" aria-label={lang === "en" ? "Selection progress" : "Progres pemilihan"}>
          {STEP_LABELS.map((label, index) => {
            const stepNumber = index + 1;
            const completed = stepNumber < step;
            const active = stepNumber === step;
            const canOpen = stepNumber === 1 || (stepNumber === 2 && taskId) || (stepNumber === 3 && situationId) || (stepNumber === 4 && workPatternId);

            return (
              <li key={label.en}>
                <button
                  type="button"
                  disabled={!canOpen}
                  onClick={() => setStep(stepNumber)}
                  aria-current={active ? "step" : undefined}
                  className={`focus-ring flex min-h-12 w-full flex-col items-center justify-center gap-1 border px-1 text-center text-xs font-bold sm:flex-row sm:justify-start sm:gap-2 sm:px-3 sm:text-left ${
                    active
                      ? "border-industrial-700 bg-industrial-700 text-white"
                      : completed
                        ? "border-industrial-200 bg-white text-industrial-700"
                        : "border-graphite-200 bg-white text-graphite-400 disabled:cursor-not-allowed"
                  }`}
                >
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[11px] ${
                      active
                        ? "border-white/40"
                        : completed
                          ? "border-industrial-700 bg-industrial-700 text-white"
                          : "border-graphite-300"
                    }`}
                  >
                    {completed ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : stepNumber}
                  </span>
                  <span className="max-w-full truncate text-[9px] leading-none sm:text-xs sm:leading-normal">{text(label, lang)}</span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="p-5 md:p-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-signal-600">
              {lang === "en" ? `Question ${step} of 4` : `Pertanyaan ${step} dari 4`}
            </p>
            <h3 className="mt-2 text-2xl font-bold text-graphite-900">{question}</h3>
            <p className="mt-2 text-sm leading-6 text-graphite-500">
              {step === 4
                ? lang === "en"
                  ? "Choose any that matter, or continue without a smart feature."
                  : "Pilih semua yang penting, atau lanjutkan tanpa fitur tambahan."
                : lang === "en"
                  ? "Pick the answer that is closest. You can go back at any time."
                  : "Pilih jawaban yang paling mendekati. Anda dapat kembali kapan saja."}
            </p>
          </div>
          {taskId ? (
            <button
              type="button"
              onClick={resetSelector}
              className="focus-ring inline-flex shrink-0 items-center gap-2 self-start text-sm font-bold text-graphite-500 hover:text-signal-600"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              {lang === "en" ? "Start over" : "Mulai ulang"}
            </button>
          ) : null}
        </div>

        {step === 1 ? (
          <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {TASKS.map((task) => (
              <SelectionCard key={task.id} choice={task} selected={taskId === task.id} onSelect={() => chooseTask(task.id)} lang={lang} />
            ))}
          </div>
        ) : null}

        {step === 2 ? (
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {situationChoices.map((choice) => (
              <SelectionCard
                key={choice.id}
                choice={choice}
                selected={situationId === choice.id}
                onSelect={() => chooseSituation(choice.id)}
                lang={lang}
              />
            ))}
          </div>
        ) : null}

        {step === 3 ? (
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {workPatternChoices.map((choice) => (
              <SelectionCard
                key={choice.id}
                choice={choice}
                selected={workPatternId === choice.id}
                onSelect={() => chooseWorkPattern(choice.id)}
                lang={lang}
              />
            ))}
          </div>
        ) : null}

        {step === 4 ? (
          <>
            <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {CAPABILITIES.map((capability) => (
                <SelectionCard
                  key={capability.id}
                  choice={capability}
                  selected={capabilityIds.includes(capability.id)}
                  onSelect={() => toggleCapability(capability.id)}
                  lang={lang}
                />
              ))}
            </div>
            <div className="mt-6 flex flex-col gap-3 border-t border-graphite-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm leading-6 text-graphite-500">
                {capabilityIds.length > 0
                  ? lang === "en"
                    ? `${capabilityIds.length} smart feature${capabilityIds.length === 1 ? "" : "s"} selected.`
                    : `${capabilityIds.length} fitur pintar dipilih.`
                  : lang === "en"
                    ? "No smart feature is required—standard tools will remain in the shortlist."
                    : "Tidak wajib memilih fitur pintar—tool standar tetap akan direkomendasikan."}
              </p>
              <button
                type="button"
                onClick={() => setShowResults(true)}
                className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 bg-signal-600 px-6 text-sm font-bold text-white transition hover:bg-signal-500"
              >
                {lang === "en" ? "Show my recommendations" : "Tampilkan rekomendasi"}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </>
        ) : null}

        {step > 1 ? (
          <button
            type="button"
            onClick={() => setStep((current) => Math.max(1, current - 1))}
            className="focus-ring mt-6 inline-flex items-center gap-2 text-sm font-bold text-industrial-700 hover:text-signal-600"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            {lang === "en" ? "Back one question" : "Kembali satu pertanyaan"}
          </button>
        ) : null}
      </div>

      {showResults && selectedTask ? (
        <div className="border-t-4 border-signal-600 bg-graphite-50 px-5 py-8 md:px-8 md:py-10" aria-live="polite">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-signal-600">
                {lang === "en" ? "Recommended starting points" : "Rekomendasi awal"}
              </p>
              <h3 className="mt-2 max-w-3xl text-2xl font-bold text-graphite-900 md:text-3xl">
                {lang === "en" ? "These series are the closest fit." : "Seri ini paling mendekati kebutuhan Anda."}
              </h3>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-graphite-500">
                {selectedCapabilities.length > 0 && exactCapabilityMatchCount === 0
                  ? lang === "en"
                    ? "No single series combines every selected feature, so these are the closest components to combine in a system."
                    : "Belum ada satu seri yang menggabungkan semua fitur pilihan, jadi berikut komponen terdekat untuk dirangkai sebagai sistem."
                  : lang === "en"
                    ? "Use this shortlist to start. Final selection still depends on torque range, fastener size, access, and process conditions."
                    : "Gunakan shortlist ini sebagai awal. Pemilihan final tetap bergantung pada rentang torsi, ukuran fastener, akses, dan kondisi proses."}
              </p>
            </div>
            <a
              href="#tohnichi-catalog-search"
              className="focus-ring inline-flex min-h-11 shrink-0 items-center justify-center gap-2 border border-industrial-700 bg-white px-5 text-sm font-bold text-industrial-700 hover:bg-industrial-700 hover:text-white"
            >
              {lang === "en" ? "Search the full catalogue" : "Cari di katalog lengkap"}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          <div className="mt-7 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {rankedProducts.map(({ group, product, reason }) => (
              <ProductCard
                key={`${group.slug}-${product.slug}`}
                product={product}
                brandSlug={brandSlug}
                lang={lang}
                eyebrow={text(group.title, lang)}
                reason={reason}
              />
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
