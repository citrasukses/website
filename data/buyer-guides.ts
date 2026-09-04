import type { ContentLink } from "@/data/category-hubs";
import type { LocalizedText } from "@/lib/i18n";

export type GuideSection = {
  title: LocalizedText;
  body: LocalizedText;
  bullets?: LocalizedText[];
};

export type GuideTagGroup = "brands" | "topics" | "applications";

export const GUIDE_TAXONOMY: Record<GuideTagGroup, Record<string, LocalizedText>> = {
  brands: {
    tohnichi: { id: "TOHNICHI", en: "TOHNICHI" }
  },
  topics: {
    "tool-selection": { id: "Pemilihan alat", en: "Tool selection" },
    "calibration-verification": { id: "Kalibrasi & verifikasi", en: "Calibration & verification" },
    "data-traceability": { id: "Data & traceability", en: "Data & traceability" },
    "process-control": { id: "Kontrol proses", en: "Process control" },
    "poka-yoke": { id: "Poka-yoke", en: "Poka-yoke" },
    "torque-measurement": { id: "Pengukuran torsi", en: "Torque measurement" }
  },
  applications: {
    assembly: { id: "Perakitan", en: "Assembly" },
    maintenance: { id: "Maintenance", en: "Maintenance" },
    "quality-inspection": { id: "Quality & inspeksi", en: "Quality & inspection" },
    "mass-production": { id: "Produksi massal", en: "Mass production" },
    "calibration-lab": { id: "Laboratorium kalibrasi", en: "Calibration lab" }
  }
};

export const GUIDE_BRAND_LOGOS: Record<string, string> = {
  tohnichi: "/assets/brands/logos/tohnichi--nobg.png"
};

export function getGuideTagLabel(group: GuideTagGroup, slug: string): LocalizedText {
  return GUIDE_TAXONOMY[group][slug] ?? { id: slug, en: slug };
}

export type BuyerGuide = {
  slug:
    | "cara-memilih-torque-wrench"
    | "torque-wrench-vs-torque-screwdriver"
    | "mengapa-torque-wrench-perlu-dikalibrasi"
    | "click-vs-digital-torque-wrench"
    | "apa-itu-torque-angle"
    | "mencegah-missed-tightening"
    | "cspfdd-r-cm-connection"
    | "cara-memilih-torque-tester"
    | "preset-vs-adjustable-torque-wrench";
  title: LocalizedText;
  seoTitle: LocalizedText;
  description: LocalizedText;
  brands: string[];
  topics: string[];
  applications: string[];
  eyebrow: LocalizedText;
  image: string;
  imageAlt: LocalizedText;
  answer: LocalizedText;
  sections: GuideSection[];
  comparison?: {
    headers: LocalizedText[];
    rows: LocalizedText[][];
  };
  checklist: LocalizedText[];
  faqs: Array<{ question: LocalizedText; answer: LocalizedText }>;
  related: ContentLink[];
};

export type GuideEditorial = {
  format: LocalizedText;
  audience: LocalizedText;
  readingMinutes: number;
  cta: {
    title: LocalizedText;
    description: LocalizedText;
    label: LocalizedText;
    href: string;
  };
};

export const buyerGuides: BuyerGuide[] = [
  {
    slug: "cspfdd-r-cm-connection",
    brands: ["tohnichi"],
    topics: ["data-traceability", "process-control", "poka-yoke"],
    applications: ["assembly", "mass-production"],
    title: { id: "Panduan Menghubungkan FDD ke R-CM + M-FD", en: "FDD to R-CM + M-FD Connection Guide" },
    seoTitle: { id: "Cara Menghubungkan FDD ke R-CM + M-FD", en: "How to Connect FDD to R-CM + M-FD" },
    description: { id: "Panduan langkah demi langkah untuk Group CH, ID1/ID2, beberapa R-CM, HIGH/LOW torque limit, test koneksi, dan troubleshooting FDD.", en: "A step-by-step guide to Group CH, ID1/ID2, multiple R-CM receivers, HIGH/LOW torque limits, connection testing, and FDD troubleshooting." },
    eyebrow: { id: "FDD setup guide", en: "FDD setup guide" },
    image: "/assets/brands/products/tohnichi/tohnichi_cspfdd100n3.jpg",
    imageAlt: { id: "TOHNICHI FDD wireless data transfer torque wrench", en: "TOHNICHI FDD wireless data transfer torque wrench" },
    answer: { id: "Samakan Group CH antara FDD dan R-CM + M-FD, gunakan Group berbeda untuk setiap receiver yang berdekatan, petakan maksimal dua ID wrench ke ID1/ID2, lalu masukkan batas torque HIGH/LOW masing-masing.", en: "Match Group CH between FDD and R-CM + M-FD, use a different group for every adjacent receiver, map no more than two wrench IDs to ID1/ID2, then enter each profile's HIGH/LOW torque limits." },
    sections: [
      { title: { id: "Batasi dua wrench per receiver", en: "Limit each receiver to two wrenches" }, body: { id: "R-CM + M-FD menyediakan dua set judgment torque melalui ID1 dan ID2. Gunakan satu wrench pada satu waktu.", en: "R-CM + M-FD provides two torque-judgment sets through ID1 and ID2. Use one wrench at a time." } },
      { title: { id: "Rencanakan Group dan ID", en: "Plan groups and IDs" }, body: { id: "Wrench dan receiver yang berpasangan harus memakai Group CH yang sama. Receiver berdekatan harus memakai Group CH berbeda.", en: "Paired wrenches and receivers must use the same Group CH. Adjacent receivers must use different Group CH values." } },
      { title: { id: "Set dan test batas torque", en: "Set and test torque limits" }, body: { id: "Petakan ID wrench ke ID1/ID2, masukkan HIGH di atas LOW, lalu test setiap wrench secara terpisah.", en: "Map wrench IDs to ID1/ID2, enter HIGH above LOW, then test each wrench separately." } }
    ],
    checklist: [
      { id: "R-CM memakai module M-FD dan dua antenna", en: "R-CM has the M-FD module and two antennas" },
      { id: "Group CH setiap receiver dan wrench sudah dicatat", en: "Every receiver and wrench Group CH is recorded" },
      { id: "ID 3 digit unik untuk setiap wrench", en: "A unique 3-digit ID for every wrench" },
      { id: "UNIT, LOW, dan HIGH berasal dari process specification", en: "UNIT, LOW, and HIGH come from the process specification" },
      { id: "Setiap wrench ditest satu per satu", en: "Every wrench is tested one at a time" },
      { id: "Hasil commissioning dicatat", en: "Commissioning results are recorded" }
    ],
    faqs: [
      { question: { id: "Berapa FDD yang dapat dikelola oleh satu R-CM?", en: "How many FDD wrenches can one R-CM manage?" }, answer: { id: "Dua dengan judgment terpisah melalui ID1 dan ID2. Gunakan satu wrench pada satu waktu.", en: "Two with independent judgment through ID1 and ID2. Use one wrench at a time." } },
      { question: { id: "Apa perbedaan Group CH dan ID?", en: "What is the difference between Group CH and ID?" }, answer: { id: "Group CH memilih radio network; ID membedakan wrench dan profile judgment di dalam network tersebut.", en: "Group CH selects the radio network; ID distinguishes wrenches and judgment profiles inside that network." } }
    ],
    related: [
      { href: "/brands/tohnichi", title: { id: "TOHNICHI Indonesia", en: "TOHNICHI Indonesia" }, description: { id: "Lihat produk dan support TOHNICHI dari CSE.", en: "Explore TOHNICHI products and support from CSE." } },
      { href: "/solutions/poka-yoke-tightening", title: { id: "Poka-yoke tightening", en: "Poka-yoke tightening" }, description: { id: "Hubungkan tool, receiver, logic, dan interlock.", en: "Connect tools, receivers, logic, and interlocks." } },
      { href: "/contact", title: { id: "Technical support", en: "Technical support" }, description: { id: "Minta review Group, ID, dan limit setting.", en: "Request a review of Group, ID, and limit settings." } }
    ]
  },
  {
    slug: "cara-memilih-torque-wrench",
    brands: ["tohnichi"],
    topics: ["tool-selection"],
    applications: ["assembly", "maintenance"],
    title: { id: "Cara Memilih Torque Wrench Berdasarkan Range dan Aplikasi", en: "How to Choose a Torque Wrench by Range and Application" },
    seoTitle: { id: "Cara Memilih Torque Wrench yang Tepat", en: "How to Choose the Right Torque Wrench" },
    description: { id: "Checklist memilih torque wrench berdasarkan target, range, head, mekanisme, access, proses, data, dan verification.", en: "A torque-wrench selection checklist covering target, range, head, mechanism, access, process, data, and verification." },
    eyebrow: { id: "Buyer guide torque wrench", en: "Torque-wrench buyer guide" },
    image: "/assets/brands/products/tohnichi/catalog/torque-wrenches/ql-qle2.jpg",
    imageAlt: { id: "TOHNICHI QL adjustable torque wrench", en: "TOHNICHI QL adjustable torque wrench" },
    answer: { id: "Mulai dari target torque dan toleransi, lalu pilih range kerja yang sesuai, head yang dapat mencapai fastener, mekanisme yang cocok dengan frekuensi perubahan setting, serta level feedback dan data yang dibutuhkan proses.", en: "Start with the torque target and tolerance, then select a suitable working range, a head that reaches the fastener, a mechanism that matches setting-change frequency, and the level of feedback and data required by the process." },
    sections: [
      { title: { id: "1. Tentukan target, unit, dan toleransi", en: "1. Define target, unit, and tolerance" }, body: { id: "Tuliskan nilai target, batas atas-bawah, satuan, dan direction. Jangan mengandalkan konversi spontan di line. Bila beberapa model memakai target berbeda, susun daftar per product variant.", en: "Document the target value, upper and lower limits, unit, and direction. Do not rely on ad-hoc conversion on the line. If product variants use different targets, list them by variant." }, bullets: [{ id: "Target nominal dan tolerance", en: "Nominal target and tolerance" }, { id: "N·m, cN·m, kgf·cm, atau unit lain yang dikendalikan", en: "N·m, cN·m, kgf·cm, or another controlled unit" }, { id: "Clockwise, counterclockwise, atau keduanya", en: "Clockwise, counterclockwise, or both" }] },
      { title: { id: "2. Cocokkan range dan jenis pekerjaan", en: "2. Match the range and job type" }, body: { id: "Tool dengan kapasitas terbesar belum tentu paling tepat. Periksa apakah target berada pada bagian range yang praktis, tool tidak terlalu besar untuk operator, dan feedback tetap jelas. Pisahkan tightening tool dari inspection tool bila output yang dibutuhkan berbeda.", en: "The highest-capacity tool is not automatically the best choice. Check that the target sits in a practical part of the range, the tool is not oversized for the operator, and feedback remains clear. Separate tightening and inspection tools when their required outputs differ." } },
      { title: { id: "3. Tentukan head, access, dan workflow", en: "3. Define head, access, and workflow" }, body: { id: "Foto area kerja sering lebih berguna daripada hanya ukuran fastener. Konfirmasikan ratchet, open end, ring, interchangeable head, extension, atau special head; lalu evaluasi apakah tambahan length mengubah setting atau handling.", en: "A photo of the work area is often more useful than fastener size alone. Confirm the ratchet, open end, ring, interchangeable head, extension, or special head, then evaluate whether added length changes setting or handling." } },
      { title: { id: "4. Pilih adjustable, preset, indicating, atau digital", en: "4. Choose adjustable, preset, indicating, or digital" }, body: { id: "Adjustable cocok untuk beberapa target; preset untuk target tetap; indicating untuk membaca hasil; digital untuk judgment, torque-angle, atau data. Pilihan harus mengikuti risiko dan workflow, bukan fitur sebanyak mungkin.", en: "Adjustable tools suit several targets; preset tools suit fixed targets; indicating tools show results; digital tools add judgment, torque-angle, or data. Choose around risk and workflow rather than the longest feature list." } }
    ],
    comparison: {
      headers: [{ id: "Kebutuhan", en: "Need" }, { id: "Pilihan awal", en: "Starting choice" }, { id: "Alasan", en: "Reason" }],
      rows: [
        [{ id: "Maintenance dengan target berubah", en: "Maintenance with changing targets" }, { id: "Adjustable click", en: "Adjustable click" }, { id: "Range fleksibel dan setting terbaca", en: "Flexible range and readable setting" }],
        [{ id: "Produksi massal satu target", en: "Mass production at one target" }, { id: "Preset click", en: "Preset click" }, { id: "Mengurangi perubahan setting oleh operator", en: "Reduces operator setting changes" }],
        [{ id: "Inspection", en: "Inspection" }, { id: "Dial / digital indicating", en: "Dial / digital indicating" }, { id: "Menampilkan hasil aktual", en: "Displays actual results" }],
        [{ id: "Traceability", en: "Traceability" }, { id: "Digital / wireless", en: "Digital / wireless" }, { id: "Judgment dan data dapat dihubungkan", en: "Judgment and data can be connected" }]
      ]
    },
    checklist: [{ id: "Target, tolerance, unit, dan direction", en: "Target, tolerance, unit, and direction" }, { id: "Fastener serta foto access", en: "Fastener and access photo" }, { id: "Jumlah target dan frekuensi perubahan", en: "Number of targets and change frequency" }, { id: "Cycle time serta jumlah fastener", en: "Cycle time and fastener count" }, { id: "Feedback, count, marking, atau data", en: "Feedback, count, marking, or data" }, { id: "Metode daily check dan calibration", en: "Daily-check and calibration method" }],
    faqs: [
      { question: { id: "Apakah satu torque wrench dapat dipakai untuk semua target?", en: "Can one torque wrench cover every target?" }, answer: { id: "Secara range mungkin, tetapi ukuran, access, resolution, workflow, dan risiko setting dapat membuat beberapa tool lebih tepat.", en: "The range may allow it, but size, access, resolution, workflow, and setting risk can make several tools more appropriate." } },
      { question: { id: "Apakah extension selalu mengubah torque?", en: "Does an extension always change torque?" }, answer: { id: "Extension yang hanya memanjangkan square drive secara aksial biasanya berbeda efeknya dari adaptor yang menambah effective lever length. Konfigurasinya perlu dikonfirmasi.", en: "An axial square-drive extension behaves differently from an adapter that increases effective lever length. Confirm the configuration." } }
    ],
    related: [{ href: "/torque-wrench", title: { id: "Kategori torque wrench", en: "Torque-wrench category" }, description: { id: "Bandingkan family dan aplikasi utama.", en: "Compare families and primary uses." } }, { href: "/guides/preset-vs-adjustable-torque-wrench", title: { id: "Preset vs adjustable", en: "Preset vs adjustable" }, description: { id: "Pilih berdasarkan perubahan target dan kontrol setting.", en: "Choose by target changes and setting control." } }, { href: "/solutions/torque-control", title: { id: "Torque control", en: "Torque control" }, description: { id: "Hubungkan tool dengan process verification.", en: "Connect tools with process verification." } }]
  },
  {
    slug: "torque-wrench-vs-torque-screwdriver",
    brands: ["tohnichi"],
    topics: ["tool-selection"],
    applications: ["assembly", "maintenance"],
    title: { id: "Torque Wrench vs Torque Screwdriver: Mana yang Tepat?", en: "Torque Wrench vs Torque Screwdriver: Which Is Right?" },
    seoTitle: { id: "Torque Wrench vs Torque Screwdriver: Perbedaan", en: "Torque Wrench vs Torque Screwdriver" },
    description: { id: "Perbedaan torque wrench dan torque screwdriver berdasarkan fastener, drive, range, mekanisme, ergonomi, serta aplikasi.", en: "Compare torque wrenches and torque screwdrivers by fastener, drive, range, mechanism, ergonomics, and application." },
    eyebrow: { id: "Comparison guide", en: "Comparison guide" },
    image: "/assets/company/background-items/tohnichi-click-torque-wrench.jpg",
    imageAlt: { id: "Torque wrench dan torque screwdriver untuk tightening", en: "Torque wrench and torque screwdriver for tightening" },
    answer: { id: "Gunakan torque screwdriver untuk sekrup kecil yang digerakkan melalui bit dan target torque rendah. Gunakan torque wrench untuk baut atau mur yang membutuhkan socket atau interchangeable head, torque lebih tinggi, dan leverage lebih besar.", en: "Use a torque screwdriver for small bit-driven screws and lower torque targets. Use a torque wrench for bolts or nuts requiring sockets or interchangeable heads, higher torque, and greater leverage." },
    sections: [
      { title: { id: "Fastener dan interface adalah pembeda pertama", en: "Fastener and interface are the first distinction" }, body: { id: "Torque screwdriver memakai bit seperti Phillips, hex, TORX, atau slotted. Torque wrench memakai square drive, ratchet, open end, ring, atau interchangeable head. Pilih berdasarkan interface aktual, bukan nama proses.", en: "A torque screwdriver uses bits such as Phillips, hex, TORX, or slotted. A torque wrench uses square drives, ratchets, open ends, rings, or interchangeable heads. Choose by the actual interface, not the process name." } },
      { title: { id: "Range dan ergonomi mengikuti ukuran joint", en: "Range and ergonomics follow joint size" }, body: { id: "Screwdriver memberi kontrol jari dan pergelangan untuk torque kecil. Wrench memberi lever arm agar torque lebih tinggi dapat dicapai dengan beban operator yang terkendali.", en: "A screwdriver provides finger and wrist control for lower torque. A wrench provides leverage so higher torque can be reached with controlled operator effort." } },
      { title: { id: "Keduanya dapat mendukung tightening, inspection, dan poka-yoke", en: "Both can support tightening, inspection, and poka-yoke" }, body: { id: "Jangan menganggap screwdriver hanya manual sederhana atau wrench hanya click type. Keduanya tersedia sebagai preset, indicating, digital, wireless, dan error-proofing variants.", en: "Do not assume a screwdriver is only a basic manual tool or a wrench is only a click type. Both are available in preset, indicating, digital, wireless, and error-proofing variants." } }
    ],
    comparison: { headers: [{ id: "Faktor", en: "Factor" }, { id: "Torque screwdriver", en: "Torque screwdriver" }, { id: "Torque wrench", en: "Torque wrench" }], rows: [[{ id: "Fastener", en: "Fastener" }, { id: "Sekrup kecil melalui bit", en: "Small screws through bits" }, { id: "Baut atau mur", en: "Bolts or nuts" }], [{ id: "Interface", en: "Interface" }, { id: "Bit shank / blade", en: "Bit shank / blade" }, { id: "Square drive / head", en: "Square drive / head" }], [{ id: "Operator input", en: "Operator input" }, { id: "Grip dan wrist", en: "Grip and wrist" }, { id: "Lever arm", en: "Lever arm" }], [{ id: "Aplikasi umum", en: "Typical application" }, { id: "Electronics, precision assembly", en: "Electronics, precision assembly" }, { id: "Automotive, machinery, maintenance", en: "Automotive, machinery, maintenance" }]] },
    checklist: [{ id: "Apakah fastener digerakkan dengan bit atau socket?", en: "Is the fastener driven by a bit or socket?" }, { id: "Berapa target dan unit torque?", en: "What are the torque target and unit?" }, { id: "Apakah access lurus, bersudut, atau terbatas?", en: "Is access straight, angled, or restricted?" }, { id: "Apakah target tetap atau berubah?", en: "Is the target fixed or changing?" }, { id: "Apakah hasil perlu dibaca atau hanya dicapai?", en: "Must the result be read or only achieved?" }, { id: "Apakah count, marking, atau data diperlukan?", en: "Are counts, marking, or data required?" }],
    faqs: [{ question: { id: "Bisakah torque wrench dipakai untuk sekrup?", en: "Can a torque wrench be used for screws?" }, answer: { id: "Bisa bila interface, range, dan access sesuai, tetapi torque screwdriver biasanya lebih ergonomis untuk sekrup kecil dan precision work.", en: "It can when interface, range, and access fit, but a torque screwdriver is usually more ergonomic for small screws and precision work." } }, { question: { id: "Mana yang lebih akurat?", en: "Which is more accurate?" }, answer: { id: "Akurasi bergantung pada model, range, kondisi, dan metode penggunaan—bukan hanya bentuk wrench atau screwdriver.", en: "Accuracy depends on the model, range, condition, and operating method rather than wrench or screwdriver form alone." } }],
    related: [{ href: "/torque-wrench", title: { id: "Torque wrench", en: "Torque wrenches" }, description: { id: "Lihat pilihan untuk bolt dan nut.", en: "Explore options for bolts and nuts." } }, { href: "/torque-screwdriver", title: { id: "Torque screwdriver", en: "Torque screwdrivers" }, description: { id: "Lihat pilihan untuk precision screws.", en: "Explore options for precision screws." } }, { href: "/contact", title: { id: "Konfirmasi aplikasi", en: "Confirm the application" }, description: { id: "Kirim foto fastener, access, dan target.", en: "Send fastener photos, access, and target." } }]
  },
  {
    slug: "mengapa-torque-wrench-perlu-dikalibrasi",
    brands: ["tohnichi"],
    topics: ["calibration-verification"],
    applications: ["quality-inspection", "maintenance"],
    title: { id: "Mengapa Torque Wrench Perlu Dikalibrasi?", en: "Why Does a Torque Wrench Need Calibration?" },
    seoTitle: { id: "Mengapa Torque Wrench Perlu Kalibrasi?", en: "Why Torque Wrenches Need Calibration" },
    description: { id: "Pahami drift, verification, calibration interval, traceability, dan tindakan ketika torque wrench keluar toleransi.", en: "Understand drift, verification, calibration intervals, traceability, and what to do when a torque wrench is out of tolerance." },
    eyebrow: { id: "Calibration guide", en: "Calibration guide" },
    image: "/assets/brands/products/tohnichi/catalog/tester-checker/dote4-dote4-g.png",
    imageAlt: { id: "Torque wrench tester untuk kalibrasi", en: "Torque-wrench tester for calibration" },
    answer: { id: "Torque wrench perlu dikalibrasi karena spring, mechanism, sensor, lubrication, wear, overload, impact, dan penggunaan dapat mengubah hubungan antara setting dan torque aktual. Calibration membandingkan hasil tool dengan referensi tertelusur dan memberi evidence apakah tool masih sesuai acceptance criteria.", en: "Torque wrenches need calibration because springs, mechanisms, sensors, lubrication, wear, overload, impact, and use can change the relationship between the setting and actual torque. Calibration compares tool output with a traceable reference and provides evidence that the tool still meets acceptance criteria." },
    sections: [
      { title: { id: "Calibration dan verification memiliki peran berbeda", en: "Calibration and verification play different roles" }, body: { id: "Calibration adalah perbandingan terkontrol dengan referensi dan menghasilkan record formal. Verification atau checker test adalah konfirmasi cepat bahwa tool masih berada dalam acceptance limit sebelum digunakan.", en: "Calibration is a controlled comparison with a reference and produces a formal record. Verification or a checker test is a quick confirmation that the tool remains within acceptance limits before use." } },
      { title: { id: "Interval harus berbasis risiko dan evidence", en: "Intervals should be based on risk and evidence" }, body: { id: "Frekuensi penggunaan, criticality joint, history result, storage, handling, dan customer requirement menentukan interval. Tool yang jatuh, overload, atau diperbaiki perlu diperiksa tanpa menunggu due date.", en: "Use frequency, joint criticality, result history, storage, handling, and customer requirements determine the interval. A tool that is dropped, overloaded, or repaired should be checked without waiting for its due date." } },
      { title: { id: "Out-of-tolerance memerlukan product review", en: "Out-of-tolerance requires product review" }, body: { id: "Bila tool keluar toleransi, tentukan last known good check, produk yang terpengaruh, kebutuhan reinspection, adjustment atau repair tool, dan authority untuk release.", en: "When a tool is out of tolerance, identify the last known good check, affected product, reinspection needs, tool adjustment or repair, and release authority." } }
    ],
    comparison: { headers: [{ id: "Aktivitas", en: "Activity" }, { id: "Tujuan", en: "Purpose" }, { id: "Frekuensi", en: "Frequency" }], rows: [[{ id: "Daily / shift check", en: "Daily / shift check" }, { id: "Deteksi perubahan cepat", en: "Detect rapid change" }, { id: "Sesuai risiko line", en: "According to line risk" }], [{ id: "Periodic calibration", en: "Periodic calibration" }, { id: "Perbandingan tertelusur dan record", en: "Traceable comparison and record" }, { id: "Berdasarkan program calibration", en: "Based on the calibration program" }], [{ id: "Event check", en: "Event check" }, { id: "Konfirmasi setelah drop, overload, repair", en: "Confirm after drop, overload, or repair" }, { id: "Segera setelah kejadian", en: "Immediately after the event" }]] },
    checklist: [{ id: "Tool ID, model, range, dan station", en: "Tool ID, model, range, and station" }, { id: "Criticality dan consequence of failure", en: "Criticality and consequence of failure" }, { id: "History calibration dan verification", en: "Calibration and verification history" }, { id: "Kejadian drop, overload, repair, atau adjustment", en: "Drop, overload, repair, or adjustment events" }, { id: "Acceptance criteria dan method", en: "Acceptance criteria and method" }, { id: "Reaction plan untuk out-of-tolerance", en: "Out-of-tolerance reaction plan" }],
    faqs: [{ question: { id: "Apakah calibration interval selalu satu tahun?", en: "Is the calibration interval always one year?" }, answer: { id: "Tidak. Interval perlu mengikuti risiko, penggunaan, history, standard internal, dan customer requirement.", en: "No. The interval should follow risk, use, history, internal standards, and customer requirements." } }, { question: { id: "Apakah tool baru perlu diverifikasi?", en: "Should a new tool be verified?" }, answer: { id: "Incoming verification dapat memastikan tool, model, range, setting, dan record sesuai sebelum dilepas ke line.", en: "Incoming verification can confirm the tool, model, range, setting, and records before release to the line." } }],
    related: [{ href: "/solutions/torque-calibration-verification", title: { id: "Program calibration & verification", en: "Calibration and verification program" }, description: { id: "Susun inventory, interval, method, dan reaction plan.", en: "Plan inventory, intervals, methods, and reaction plans." } }, { href: "/torque-tester", title: { id: "Torque tester", en: "Torque testers" }, description: { id: "Bandingkan tester, checker, dan system.", en: "Compare testers, checkers, and systems." } }, { href: "/brands/tohnichi", title: { id: "TOHNICHI support", en: "TOHNICHI support" }, description: { id: "Lihat katalog dan dukungan resmi CSE.", en: "View the catalogue and CSE's official support." } }]
  },
  {
    slug: "click-vs-digital-torque-wrench",
    brands: ["tohnichi"],
    topics: ["tool-selection", "data-traceability"],
    applications: ["assembly", "quality-inspection"],
    title: { id: "Click Torque Wrench vs Digital Torque Wrench", en: "Click Torque Wrench vs Digital Torque Wrench" },
    seoTitle: { id: "Click vs Digital Torque Wrench: Perbandingan", en: "Click vs Digital Torque Wrench" },
    description: { id: "Bandingkan click dan digital torque wrench dari sisi feedback, data, training, maintenance, cost, serta risiko proses.", en: "Compare click and digital torque wrenches by feedback, data, training, maintenance, cost, and process risk." },
    eyebrow: { id: "Torque wrench comparison", en: "Torque-wrench comparison" },
    image: "/assets/company/background-items/tohnichi-digital-torque-wrench.png",
    imageAlt: { id: "Digital torque wrench TOHNICHI", en: "TOHNICHI digital torque wrench" },
    answer: { id: "Click torque wrench tepat untuk proses yang membutuhkan feedback mekanis sederhana dan tidak memerlukan data per fastener. Digital torque wrench lebih sesuai ketika operator perlu nilai aktual, pass/fail, torque-angle, memory, wireless, atau traceability.", en: "A click torque wrench suits processes needing simple mechanical feedback without per-fastener data. A digital torque wrench is better where operators need actual values, pass/fail, torque-angle, memory, wireless, or traceability." },
    sections: [
      { title: { id: "Click tool unggul dalam kesederhanaan", en: "Click tools excel in simplicity" }, body: { id: "Feedback mekanis mudah dipahami, setup dapat cepat, dan power source tidak diperlukan. Namun klik hanya menunjukkan mechanism mencapai setting; proses tetap membutuhkan kontrol count, setting, dan verification.", en: "Mechanical feedback is easy to understand, setup can be quick, and no power source is needed. However, a click only shows that the mechanism reached its setting; the process still needs count, setting, and verification controls." } },
      { title: { id: "Digital tool memberi visibility lebih besar", en: "Digital tools provide greater visibility" }, body: { id: "Display, LED, buzzer, memory, timestamp, wireless, dan angle measurement dapat membantu operator serta quality. Manfaatnya hanya tercapai bila recipe, user access, battery, data flow, dan abnormal handling dirancang.", en: "Displays, LEDs, buzzers, memory, timestamps, wireless, and angle measurement can help operators and quality teams. The benefit depends on well-designed recipes, user access, battery management, data flow, and abnormal handling." } },
      { title: { id: "Pilih berdasarkan evidence yang dibutuhkan", en: "Choose by the evidence required" }, body: { id: "Jika proses hanya perlu target tetap dengan low-to-medium risk, preset click plus checker mungkin cukup. Jika customer atau process risk membutuhkan hasil per joint, digital menjadi lebih relevan.", en: "If the process only needs a fixed target at low-to-medium risk, a preset click tool plus a checker may be enough. If customer or process risk requires per-joint results, digital becomes more relevant." } }
    ],
    comparison: { headers: [{ id: "Faktor", en: "Factor" }, { id: "Click", en: "Click" }, { id: "Digital", en: "Digital" }], rows: [[{ id: "Feedback", en: "Feedback" }, { id: "Mekanis / audible", en: "Mechanical / audible" }, { id: "Display, LED, buzzer", en: "Display, LED, buzzer" }], [{ id: "Nilai aktual", en: "Actual value" }, { id: "Umumnya tidak", en: "Usually no" }, { id: "Ya", en: "Yes" }], [{ id: "Data", en: "Data" }, { id: "Perlu sistem tambahan", en: "Requires additional system" }, { id: "Memory atau wireless options", en: "Memory or wireless options" }], [{ id: "Complexity", en: "Complexity" }, { id: "Lebih rendah", en: "Lower" }, { id: "Lebih tinggi", en: "Higher" }], [{ id: "Best fit", en: "Best fit" }, { id: "Simple controlled tightening", en: "Simple controlled tightening" }, { id: "Judgment, traceability, torque-angle", en: "Judgment, traceability, torque-angle" }]] },
    checklist: [{ id: "Apakah nilai aktual perlu ditampilkan?", en: "Must the actual value be displayed?" }, { id: "Apakah hasil per fastener perlu disimpan?", en: "Must each fastener result be stored?" }, { id: "Apakah torque-angle diwajibkan?", en: "Is torque-angle required?" }, { id: "Bagaimana battery dan charging dikelola?", en: "How will battery and charging be managed?" }, { id: "Siapa yang boleh mengubah recipe?", en: "Who may change recipes?" }, { id: "Bagaimana hasil abnormal ditangani?", en: "How will abnormal results be handled?" }],
    faqs: [{ question: { id: "Apakah digital selalu lebih akurat?", en: "Is digital always more accurate?" }, answer: { id: "Tidak otomatis. Bandingkan specification model, range, method, dan kondisi calibration. Digital memberi data lebih banyak tetapi tetap harus digunakan dengan benar.", en: "Not automatically. Compare model specifications, range, method, and calibration condition. Digital provides more data but still requires correct use." } }, { question: { id: "Apakah click wrench bisa masuk poka-yoke?", en: "Can a click wrench be part of poka-yoke?" }, answer: { id: "Ya, model dengan limit switch, wireless transmitter, marking, atau sensor dapat memberi completion signal.", en: "Yes. Models with limit switches, wireless transmitters, marking, or sensors can provide completion signals." } }],
    related: [{ href: "/torque-wrench", title: { id: "Torque wrench category", en: "Torque-wrench category" }, description: { id: "Lihat click, indicating, dan digital families.", en: "Explore click, indicating, and digital families." } }, { href: "/solutions/torque-control", title: { id: "Torque control", en: "Torque control" }, description: { id: "Tentukan level evidence dan integration.", en: "Define evidence and integration levels." } }, { href: "/guides/apa-itu-torque-angle", title: { id: "Apa itu torque + angle", en: "What is torque plus angle" }, description: { id: "Pahami kapan angle menjadi bagian specification.", en: "Understand when angle is part of the specification." } }]
  },
  {
    slug: "apa-itu-torque-angle",
    brands: ["tohnichi"],
    topics: ["process-control"],
    applications: ["assembly", "quality-inspection"],
    title: { id: "Apa Itu Torque + Angle?", en: "What Is Torque Plus Angle?" },
    seoTitle: { id: "Apa Itu Torque + Angle Tightening?", en: "What Is Torque Plus Angle Tightening?" },
    description: { id: "Penjelasan torque-angle tightening, mengapa sudut dipakai setelah snug torque, data yang dibutuhkan, dan risiko implementasinya.", en: "An explanation of torque-angle tightening, why angle follows snug torque, required data, and implementation risks." },
    eyebrow: { id: "Technical guide", en: "Technical guide" },
    image: "/assets/brands/products/tohnichi/catalog/interchangeable-head-torque-wrenches/cta2-cta2-g.png",
    imageAlt: { id: "CTA2 digital torque-angle wrench", en: "CTA2 digital torque-angle wrench" },
    answer: { id: "Torque + angle adalah metode tightening yang terlebih dahulu membawa joint ke torque awal atau snug point, lalu memutar fastener dengan sudut tertentu. Metode ini digunakan ketika specification joint mengendalikan tahap rotasi setelah seating, bukan hanya final torque.", en: "Torque plus angle is a tightening method that first brings the joint to an initial torque or snug point, then rotates the fastener by a specified angle. It is used when the joint specification controls rotation after seating rather than final torque alone." },
    sections: [
      { title: { id: "Torque awal membentuk reference point", en: "Initial torque establishes a reference point" }, body: { id: "Angle measurement hanya bermakna setelah joint mencapai kondisi awal yang repeatable. Snug torque, seating behavior, friction, dan joint stiffness perlu dipahami agar reference point konsisten.", en: "Angle measurement is meaningful only after the joint reaches a repeatable initial condition. Snug torque, seating behavior, friction, and joint stiffness must be understood to keep the reference point consistent." } },
      { title: { id: "Angle mengendalikan rotasi setelah seating", en: "Angle controls rotation after seating" }, body: { id: "Tool mengukur tambahan sudut setelah threshold. Specification harus menjelaskan threshold, target angle, tolerance, direction, maximum torque, dan tindakan bila batas terlampaui.", en: "The tool measures additional rotation after a threshold. The specification should define the threshold, target angle, tolerance, direction, maximum torque, and action if a limit is exceeded." } },
      { title: { id: "Joint engineering tetap menjadi sumber specification", en: "Joint engineering remains the source of the specification" }, body: { id: "Torque-angle tidak boleh ditentukan hanya dari feeling atau trial operator. Gunakan drawing, engineering standard, customer requirement, atau validated tightening study.", en: "Torque-angle should not be defined from operator feel or ad-hoc trials. Use drawings, engineering standards, customer requirements, or a validated tightening study." } }
    ],
    comparison: { headers: [{ id: "Tahap", en: "Stage" }, { id: "Parameter", en: "Parameter" }, { id: "Tujuan", en: "Purpose" }], rows: [[{ id: "1. Seating", en: "1. Seating" }, { id: "Snug / threshold torque", en: "Snug / threshold torque" }, { id: "Mencapai reference condition", en: "Reach a reference condition" }], [{ id: "2. Rotation", en: "2. Rotation" }, { id: "Target angle dan tolerance", en: "Target angle and tolerance" }, { id: "Mengendalikan rotasi setelah seating", en: "Control rotation after seating" }], [{ id: "3. Judgment", en: "3. Judgment" }, { id: "Final torque / angle limits", en: "Final torque / angle limits" }, { id: "Mendeteksi hasil abnormal", en: "Detect abnormal results" }]] },
    checklist: [{ id: "Snug atau threshold torque", en: "Snug or threshold torque" }, { id: "Target angle dan tolerance", en: "Target angle and tolerance" }, { id: "Maximum/minimum final torque", en: "Maximum/minimum final torque" }, { id: "Direction dan zeroing method", en: "Direction and zeroing method" }, { id: "Tool head, access, dan reaction", en: "Tool head, access, and reaction" }, { id: "Judgment, record, dan abnormal flow", en: "Judgment, record, and abnormal flow" }],
    faqs: [{ question: { id: "Apakah torque-angle lebih baik dari torque saja?", en: "Is torque-angle better than torque alone?" }, answer: { id: "Bukan secara universal. Torque-angle digunakan ketika joint specification dan validation memang membutuhkannya.", en: "Not universally. Torque-angle is used when the joint specification and validation require it." } }, { question: { id: "Bisakah angle diukur dengan manual wrench biasa?", en: "Can angle be measured with a basic manual wrench?" }, answer: { id: "Diperlukan alat atau accessory yang dapat mengukur sudut dan menjaga reference. Digital torque-angle wrench menyatukan torque, angle, dan judgment.", en: "A tool or accessory capable of measuring angle and maintaining a reference is required. A digital torque-angle wrench combines torque, angle, and judgment." } }],
    related: [{ href: "/brands/tohnichi/products/cta2-cta2-g", title: { id: "CTA2/CTA2-G", en: "CTA2/CTA2-G" }, description: { id: "Lihat digital torque-angle wrench.", en: "View the digital torque-angle wrench." } }, { href: "/solutions/torque-control", title: { id: "Torque control", en: "Torque control" }, description: { id: "Tempatkan torque-angle dalam workflow lengkap.", en: "Place torque-angle in a complete workflow." } }, { href: "/contact", title: { id: "Review specification", en: "Review the specification" }, description: { id: "Kirim target torque, angle, dan joint drawing.", en: "Send torque, angle, and joint drawings." } }]
  },
  {
    slug: "mencegah-missed-tightening",
    brands: ["tohnichi"],
    topics: ["poka-yoke", "process-control"],
    applications: ["assembly", "mass-production"],
    title: { id: "Cara Mencegah Missed Tightening di Assembly Line", en: "How to Prevent Missed Tightening on an Assembly Line" },
    seoTitle: { id: "Cara Mencegah Missed Tightening", en: "How to Prevent Missed Tightening" },
    description: { id: "Level poka-yoke untuk mencegah fastener terlewat: visual standard, preset tool, completion signal, count, sequence, marking, dan interlock.", en: "Poka-yoke levels for preventing missed fasteners: visual standards, preset tools, completion signals, counts, sequence, marking, and interlocks." },
    eyebrow: { id: "Poka-yoke guide", en: "Poka-yoke guide" },
    image: "/assets/brands/products/tohnichi/catalog/torque-screwdrivers/rtdfh-rntdfh.jpg",
    imageAlt: { id: "Wireless torque screwdriver untuk missed tightening prevention", en: "Wireless torque screwdriver for missed-tightening prevention" },
    answer: { id: "Mulai dengan standard work dan tool yang tepat, lalu tambahkan completion signal, fastener count, sequence control, marking, atau PLC interlock sesuai risiko. Sistem harus membedakan completion valid, re-hit, rework, bypass, dan communication loss.", en: "Start with standard work and the right tool, then add completion signals, fastener counts, sequence control, marking, or PLC interlocks according to risk. The system must distinguish valid completion, re-hits, rework, bypasses, and communication loss." },
    sections: [
      { title: { id: "Level 1: buat pekerjaan mudah dilakukan dengan benar", en: "Level 1: make the job easy to do correctly" }, body: { id: "Gunakan clear work instruction, fastener presentation, tool balancer, socket atau bit yang benar, preset setting, dan visual identification. Ini mengurangi error tetapi belum mendeteksi missed point.", en: "Use clear work instructions, fastener presentation, tool balancers, correct sockets or bits, preset settings, and visual identification. This reduces error but does not yet detect a missed point." } },
      { title: { id: "Level 2: deteksi completion dan count", en: "Level 2: detect completion and count" }, body: { id: "Limit switch, wireless transmitter, digital judgment, atau marking memberi signal. Counter membandingkan signal valid dengan jumlah fastener per unit.", en: "A limit switch, wireless transmitter, digital judgment, or marking provides a signal. A counter compares valid signals with the fastener count per unit." } },
      { title: { id: "Level 3: kendalikan sequence dan interlock", en: "Level 3: control sequence and interlocks" }, body: { id: "Position guidance, model recipe, PLC, dan conveyor interlock mencegah unit berpindah sebelum semua condition terpenuhi. Abnormal flow harus dirancang sama seriusnya dengan normal flow.", en: "Position guidance, model recipes, PLCs, and conveyor interlocks prevent a unit from moving before all conditions are met. Abnormal flow must be designed as carefully as normal flow." } }
    ],
    comparison: { headers: [{ id: "Level", en: "Level" }, { id: "Kontrol", en: "Control" }, { id: "Bukti", en: "Evidence" }], rows: [[{ id: "Visual", en: "Visual" }, { id: "Work instruction, color, fixture", en: "Work instruction, color, fixture" }, { id: "Operator confirmation", en: "Operator confirmation" }], [{ id: "Completion", en: "Completion" }, { id: "Switch, wireless, digital, marking", en: "Switch, wireless, digital, marking" }, { id: "Signal per tightening", en: "Signal per tightening" }], [{ id: "Count", en: "Count" }, { id: "Controller compares required quantity", en: "Controller compares required quantity" }, { id: "OK/NG per unit", en: "OK/NG per unit" }], [{ id: "Sequence / interlock", en: "Sequence / interlock" }, { id: "Position or PLC logic", en: "Position or PLC logic" }, { id: "Controlled release and trace", en: "Controlled release and trace" }]] },
    checklist: [{ id: "Fastener count per model", en: "Fastener count per model" }, { id: "Required sequence and position", en: "Required sequence and position" }, { id: "Definition of a valid completion signal", en: "Definition of a valid completion signal" }, { id: "Re-hit and duplicate-signal logic", en: "Re-hit and duplicate-signal logic" }, { id: "Rework, bypass, and supervisor authority", en: "Rework, bypass, and supervisor authority" }, { id: "Communication-loss and tool-failure response", en: "Communication-loss and tool-failure response" }],
    faqs: [{ question: { id: "Apakah counter saja cukup?", en: "Is a counter alone enough?" }, answer: { id: "Counter memastikan jumlah signal, tetapi tidak selalu memastikan posisi atau urutan. Risiko proses menentukan apakah position atau sequence control juga diperlukan.", en: "A counter confirms signal quantity but not always position or order. Process risk determines whether position or sequence control is also needed." } }, { question: { id: "Bagaimana mencegah double count?", en: "How can double counts be prevented?" }, answer: { id: "Atur debounce, minimum time, re-hit logic, reset condition, dan bila perlu position confirmation agar satu fastener tidak dihitung dua kali.", en: "Configure debounce, minimum time, re-hit logic, reset conditions, and, where needed, position confirmation so one fastener is not counted twice." } }],
    related: [{ href: "/solutions/poka-yoke-tightening", title: { id: "Poka-yoke solution", en: "Poka-yoke solution" }, description: { id: "Susun tool, signal, logic, dan abnormal flow.", en: "Plan tools, signals, logic, and abnormal flow." } }, { href: "/torque-screwdriver", title: { id: "Poka-yoke torque screwdrivers", en: "Poka-yoke torque screwdrivers" }, description: { id: "Lihat limit-switch, wireless, dan digital options.", en: "Explore limit-switch, wireless, and digital options." } }, { href: "/industries/automotive", title: { id: "Automotive workflow", en: "Automotive workflow" }, description: { id: "Lihat torque assurance dalam production flow.", en: "See torque assurance in a production flow." } }]
  },
  {
    slug: "cara-memilih-torque-tester",
    brands: ["tohnichi"],
    topics: ["torque-measurement", "calibration-verification"],
    applications: ["quality-inspection", "calibration-lab"],
    title: { id: "Cara Memilih Torque Tester atau Checker", en: "How to Choose a Torque Tester or Checker" },
    seoTitle: { id: "Cara Memilih Torque Tester", en: "How to Choose a Torque Tester" },
    description: { id: "Pilih torque tester berdasarkan tool, range, direction, loading, fixture, judgment, data, standard, dan lokasi penggunaan.", en: "Choose a torque tester by tool, range, direction, loading, fixtures, judgment, data, standards, and use location." },
    eyebrow: { id: "Tester buyer guide", en: "Tester buyer guide" },
    image: "/assets/brands/products/tohnichi/catalog/tester-checker/tcc2-tcc2-g.jpg",
    imageAlt: { id: "Torque calibration controller TOHNICHI TCC2", en: "TOHNICHI TCC2 torque calibration controller" },
    answer: { id: "Tentukan dahulu apakah kebutuhan Anda quick check di line atau calibration dan adjustment. Setelah itu cocokkan jenis tool, range, direction, fixture, loading method, acceptance judgment, data output, dan standard kerja.", en: "First decide whether you need a quick line check or calibration and adjustment. Then match the tool type, range, direction, fixture, loading method, acceptance judgment, data output, and working standard." },
    sections: [
      { title: { id: "Pisahkan checker dan tester", en: "Separate checkers and testers" }, body: { id: "Checker mengonfirmasi tool dengan cepat dekat line. Tester mendukung pembebanan lebih terkontrol, adjustment, repeated measurements, dan record calibration.", en: "A checker confirms a tool quickly near the line. A tester supports more controlled loading, adjustment, repeated measurements, and calibration records." } },
      { title: { id: "Mulai dari tool list, bukan satu model tester", en: "Start with the tool list, not one tester model" }, body: { id: "Daftar seluruh wrench, screwdriver, powered tool, range, drive, direction, quantity, dan criticality. Satu tester mungkin tidak mencakup seluruh range atau fixture.", en: "List every wrench, screwdriver, powered tool, range, drive, direction, quantity, and criticality. One tester may not cover every range or fixture." } },
      { title: { id: "Loading dan fixture menentukan repeatability", en: "Loading and fixtures determine repeatability" }, body: { id: "Periksa adapter, reaction, handle position, loading speed, preload, number of runs, dan warm-up. Motorized loading dapat membantu ketika consistency operator sulit dijaga.", en: "Check adapters, reaction, handle position, loading speed, preload, number of runs, and warm-up. Motorized loading can help when operator consistency is difficult to maintain." } }
    ],
    comparison: { headers: [{ id: "Kebutuhan", en: "Need" }, { id: "Equipment", en: "Equipment" }, { id: "Contoh output", en: "Typical output" }], rows: [[{ id: "Pre-shift check", en: "Pre-shift check" }, { id: "Checker", en: "Checker" }, { id: "Peak atau pass/fail", en: "Peak or pass/fail" }], [{ id: "Screwdriver calibration", en: "Screwdriver calibration" }, { id: "Screwdriver tester + bit fixture", en: "Screwdriver tester + bit fixture" }, { id: "Repeated results dan adjustment", en: "Repeated results and adjustment" }], [{ id: "Wrench calibration", en: "Wrench calibration" }, { id: "Wrench tester + reaction fixture", en: "Wrench tester + reaction fixture" }, { id: "Series, average, judgment", en: "Series, average, judgment" }], [{ id: "Multi-tool management", en: "Multi-tool management" }, { id: "Controller / data system", en: "Controller / data system" }, { id: "Tool ID, history, report", en: "Tool ID, history, report" }]] },
    checklist: [{ id: "Tool type, model, range, and quantity", en: "Tool type, model, range, and quantity" }, { id: "Clockwise/counterclockwise requirement", en: "Clockwise/counterclockwise requirement" }, { id: "Drive, bit, head, and adapter", en: "Drive, bit, head, and adapter" }, { id: "Manual or motorized loading", en: "Manual or motorized loading" }, { id: "Tolerance, runs, judgment, and statistics", en: "Tolerance, runs, judgment, and statistics" }, { id: "Record, software, export, and audit trail", en: "Record, software, export, and audit trail" }],
    faqs: [{ question: { id: "Bisakah satu tester menguji wrench dan screwdriver?", en: "Can one tester cover wrenches and screwdrivers?" }, answer: { id: "Tergantung range, sensor, fixture, dan method. Sering kali diperlukan setup berbeda untuk menjaga loading dan interface sesuai tool.", en: "It depends on range, sensor, fixtures, and method. Different setups are often required to maintain suitable loading and interfaces." } }, { question: { id: "Apakah motorized tester wajib?", en: "Is a motorized tester mandatory?" }, answer: { id: "Tidak selalu. Motorized loading berguna ketika volume, repeatability, atau standard memerlukan speed dan position yang lebih konsisten.", en: "Not always. Motorized loading is useful when volume, repeatability, or standards require more consistent speed and position." } }],
    related: [{ href: "/torque-tester", title: { id: "Torque tester category", en: "Torque-tester category" }, description: { id: "Lihat DOTE4, TCC2, TDT3, DOT, dan DLC.", en: "Explore DOTE4, TCC2, TDT3, DOT, and DLC." } }, { href: "/solutions/torque-calibration-verification", title: { id: "Verification program", en: "Verification program" }, description: { id: "Hubungkan equipment dengan method dan record.", en: "Connect equipment with methods and records." } }, { href: "/contact", title: { id: "Kirim tool list", en: "Send a tool list" }, description: { id: "Minta shortlist tester berdasarkan inventory.", en: "Request a tester shortlist based on inventory." } }]
  },
  {
    slug: "preset-vs-adjustable-torque-wrench",
    brands: ["tohnichi"],
    topics: ["tool-selection", "process-control"],
    applications: ["mass-production", "maintenance"],
    title: { id: "Preset vs Adjustable Torque Wrench untuk Produksi", en: "Preset vs Adjustable Torque Wrenches for Production" },
    seoTitle: { id: "Preset vs Adjustable Torque Wrench untuk Produksi", en: "Preset vs Adjustable Torque Wrench" },
    description: { id: "Pilih preset atau adjustable torque wrench berdasarkan product variant, setting control, changeover, training, line check, dan traceability.", en: "Choose preset or adjustable torque wrenches by product variants, setting control, changeovers, training, line checks, and traceability." },
    eyebrow: { id: "Production selection guide", en: "Production selection guide" },
    image: "/assets/brands/products/tohnichi/catalog/torque-wrenches/qsp-qsp-mh.jpg",
    imageAlt: { id: "Preset torque wrench TOHNICHI QSP", en: "TOHNICHI QSP preset torque wrench" },
    answer: { id: "Preset torque wrench lebih tepat untuk workstation dengan satu target tetap dan risiko setting harus dikendalikan. Adjustable torque wrench lebih tepat bila satu tool perlu melayani beberapa target, maintenance, atau model change—dengan kontrol recipe dan verification yang memadai.", en: "A preset torque wrench is better for a workstation with one fixed target where setting risk must be controlled. An adjustable torque wrench is better when one tool covers several targets, maintenance, or model changes, provided recipe and verification controls are adequate." },
    sections: [
      { title: { id: "Preset mengurangi variation dari setting", en: "Preset reduces setting variation" }, body: { id: "Nilai disetel oleh authorized person dengan setting equipment, lalu tidak terlihat atau mudah diubah operator. Tool ID dan target perlu ditampilkan jelas agar tool tidak tertukar antar station.", en: "An authorized person sets the value with setting equipment, after which it is concealed or not easily changed by operators. Tool ID and target must be clear so tools are not mixed between stations." } },
      { title: { id: "Adjustable memberi fleksibilitas dengan control burden", en: "Adjustable adds flexibility and control burden" }, body: { id: "Scale memungkinkan perubahan target, tetapi membutuhkan work instruction, access control, double-check, dan model recipe yang jelas. Risiko salah setting meningkat bila changeover sering dan visual management lemah.", en: "A scale allows target changes but requires clear work instructions, access control, double-checks, and model recipes. Wrong-setting risk increases with frequent changeovers and weak visual management." } },
      { title: { id: "Hybrid strategy sering paling praktis", en: "A hybrid strategy is often most practical" }, body: { id: "Gunakan preset untuk high-volume fixed stations, adjustable untuk rework dan maintenance, serta digital untuk variant process yang membutuhkan recipe atau data. Standardisasi checker dan tool ID di seluruh strategi.", en: "Use preset tools for high-volume fixed stations, adjustable tools for rework and maintenance, and digital tools for variant processes requiring recipes or data. Standardize checkers and tool IDs across the strategy." } }
    ],
    comparison: { headers: [{ id: "Faktor", en: "Factor" }, { id: "Preset", en: "Preset" }, { id: "Adjustable", en: "Adjustable" }], rows: [[{ id: "Target", en: "Target" }, { id: "Satu nilai tetap", en: "One fixed value" }, { id: "Beberapa nilai", en: "Several values" }], [{ id: "Operator change", en: "Operator change" }, { id: "Dibatasi", en: "Restricted" }, { id: "Mudah melalui scale", en: "Easy through scale" }], [{ id: "Best fit", en: "Best fit" }, { id: "Mass production", en: "Mass production" }, { id: "Maintenance / mixed models", en: "Maintenance / mixed models" }], [{ id: "Control focus", en: "Control focus" }, { id: "Tool identity dan setting room", en: "Tool identity and setting room" }, { id: "Recipe dan double-check", en: "Recipe and double-check" }]] },
    checklist: [{ id: "Jumlah target per station", en: "Targets per station" }, { id: "Frequency dan risk of changeover", en: "Changeover frequency and risk" }, { id: "Siapa yang boleh mengubah setting", en: "Who may change the setting" }, { id: "Tool identification dan storage", en: "Tool identification and storage" }, { id: "Method untuk setting dan line check", en: "Setting and line-check method" }, { id: "Rework dan maintenance strategy", en: "Rework and maintenance strategy" }],
    faqs: [{ question: { id: "Bagaimana preset wrench disetel?", en: "How is a preset wrench set?" }, answer: { id: "Authorized person menyetel tool dengan tester atau setting equipment, mengunci setting sesuai model, lalu mencatat identitas dan target.", en: "An authorized person sets the tool with a tester or setting equipment, locks it according to the model, and records its identity and target." } }, { question: { id: "Apakah adjustable dilarang untuk produksi?", en: "Are adjustable tools unsuitable for production?" }, answer: { id: "Tidak. Adjustable dapat digunakan bila model variant membutuhkan beberapa target dan setting change dikendalikan melalui instruction, verification, atau recipe management.", en: "No. Adjustable tools can be used where variants require several targets and setting changes are controlled through instructions, verification, or recipe management." } }],
    related: [{ href: "/brands/tohnichi/products/qsp-qsp-mh", title: { id: "QSP preset wrench", en: "QSP preset wrench" }, description: { id: "Lihat family preset click.", en: "View the preset-click family." } }, { href: "/brands/tohnichi/products/ql-qle2", title: { id: "QL adjustable wrench", en: "QL adjustable wrench" }, description: { id: "Lihat family adjustable click.", en: "View the adjustable-click family." } }, { href: "/solutions/torque-control", title: { id: "Torque-control strategy", en: "Torque-control strategy" }, description: { id: "Susun tool mix dan verification plan.", en: "Plan the tool mix and verification strategy." } }]
  }
];

export const GUIDE_EDITORIAL: Record<BuyerGuide["slug"], GuideEditorial> = {
  "cspfdd-r-cm-connection": {
    format: { id: "Panduan setup lapangan", en: "Field setup guide" },
    audience: { id: "Engineering & integrator", en: "Engineering & integrators" },
    readingMinutes: 12,
    cta: {
      title: { id: "Perlu review Group, ID, dan limit setting?", en: "Need a review of your Group, ID, and limit settings?" },
      description: { id: "Kirim konfigurasi receiver dan jumlah FDD yang akan digunakan.", en: "Send the receiver configuration and number of FDD wrenches in the system." },
      label: { id: "Minta review setup", en: "Request a setup review" },
      href: "/contact?topic=fdd-setup"
    }
  },
  "cara-memilih-torque-wrench": {
    format: { id: "Panduan pemilihan", en: "Selection guide" },
    audience: { id: "Procurement, maintenance & produksi", en: "Procurement, maintenance & production" },
    readingMinutes: 7,
    cta: {
      title: { id: "Kirim target torque dan foto area baut.", en: "Send the torque target and a photo of the fastener area." },
      description: { id: "Dua data itu biasanya cukup untuk memulai shortlist range, head, dan jenis wrench yang masuk akal.", en: "Those two details are usually enough to begin a practical shortlist of ranges, heads, and wrench types." },
      label: { id: "Minta rekomendasi model", en: "Request a model recommendation" },
      href: "/contact?topic=torque-wrench-selection"
    }
  },
  "torque-wrench-vs-torque-screwdriver": {
    format: { id: "Panduan perbandingan", en: "Comparison guide" },
    audience: { id: "Procurement & engineering", en: "Procurement & engineering" },
    readingMinutes: 5,
    cta: {
      title: { id: "Belum yakin membutuhkan wrench atau screwdriver?", en: "Not sure whether the job needs a wrench or screwdriver?" },
      description: { id: "Kirim foto fastener, target torque, dan kondisi aksesnya agar kami dapat memeriksa interface yang tepat.", en: "Send the fastener photo, torque target, and access condition so we can check the right interface." },
      label: { id: "Konfirmasi jenis tool", en: "Confirm the tool type" },
      href: "/contact?topic=tool-type"
    }
  },
  "mengapa-torque-wrench-perlu-dikalibrasi": {
    format: { id: "Catatan teknis", en: "Technical note" },
    audience: { id: "Quality, metrology & maintenance", en: "Quality, metrology & maintenance" },
    readingMinutes: 6,
    cta: {
      title: { id: "Sedang menyusun program check dan calibration?", en: "Building a checking and calibration program?" },
      description: { id: "Beritahu kami jenis tool, jumlah unit, interval saat ini, dan record yang dibutuhkan.", en: "Tell us the tool types, quantities, current interval, and records you need." },
      label: { id: "Diskusikan metode verification", en: "Discuss a verification method" },
      href: "/contact?topic=calibration-verification"
    }
  },
  "click-vs-digital-torque-wrench": {
    format: { id: "Panduan perbandingan", en: "Comparison guide" },
    audience: { id: "Produksi, quality & procurement", en: "Production, quality & procurement" },
    readingMinutes: 6,
    cta: {
      title: { id: "Bandingkan kebutuhan line, bukan hanya fitur tool.", en: "Compare line requirements, not only tool features." },
      description: { id: "Kirim target, jumlah fastener, kebutuhan judgment, dan data yang harus disimpan.", en: "Send the target, fastener count, judgment needs, and data that must be retained." },
      label: { id: "Minta perbandingan model", en: "Request a model comparison" },
      href: "/contact?topic=click-vs-digital"
    }
  },
  "apa-itu-torque-angle": {
    format: { id: "Penjelasan teknis", en: "Technical explainer" },
    audience: { id: "Process & quality engineering", en: "Process & quality engineering" },
    readingMinutes: 6,
    cta: {
      title: { id: "Punya specification torque + angle untuk divalidasi?", en: "Have a torque-and-angle specification to validate?" },
      description: { id: "Kirim target torque, target angle, drawing joint, dan batas akhir yang diwajibkan.", en: "Send the torque target, angle target, joint drawing, and required final limits." },
      label: { id: "Review aplikasinya", en: "Review the application" },
      href: "/contact?topic=torque-angle"
    }
  },
  "mencegah-missed-tightening": {
    format: { id: "Panduan kontrol proses", en: "Process-control guide" },
    audience: { id: "Production & process engineering", en: "Production & process engineering" },
    readingMinutes: 7,
    cta: {
      title: { id: "Review satu station yang paling berisiko.", en: "Review the station with the highest tightening risk." },
      description: { id: "Kirim jumlah fastener, urutan kerja, signal tool, serta kondisi rework dan bypass.", en: "Send the fastener count, work sequence, tool signal, and rework and bypass conditions." },
      label: { id: "Minta review station", en: "Request a station review" },
      href: "/contact?topic=poka-yoke-review"
    }
  },
  "cara-memilih-torque-tester": {
    format: { id: "Panduan pemilihan", en: "Selection guide" },
    audience: { id: "Quality, calibration & maintenance", en: "Quality, calibration & maintenance" },
    readingMinutes: 7,
    cta: {
      title: { id: "Mulai dari daftar tool yang akan diuji.", en: "Start with the tools that need to be tested." },
      description: { id: "Kirim model, range, drive, arah, jumlah unit, dan kebutuhan report untuk setiap tool.", en: "Send the model, range, drive, direction, quantity, and reporting need for each tool." },
      label: { id: "Minta shortlist tester", en: "Request a tester shortlist" },
      href: "/contact?topic=torque-tester-selection"
    }
  },
  "preset-vs-adjustable-torque-wrench": {
    format: { id: "Panduan perbandingan", en: "Comparison guide" },
    audience: { id: "Production engineering & maintenance", en: "Production engineering & maintenance" },
    readingMinutes: 6,
    cta: {
      title: { id: "Cocokkan jenis wrench dengan variasi produksi.", en: "Match the wrench type to production variation." },
      description: { id: "Kirim jumlah target per station, frekuensi changeover, dan siapa yang boleh mengubah setting.", en: "Send the number of targets per station, changeover frequency, and who may change settings." },
      label: { id: "Review kebutuhan line", en: "Review line requirements" },
      href: "/contact?topic=preset-vs-adjustable"
    }
  }
};

export function getGuideEditorial(slug: BuyerGuide["slug"]) {
  return GUIDE_EDITORIAL[slug];
}

export function getBuyerGuide(slug: string) {
  return buyerGuides.find((guide) => guide.slug === slug);
}
