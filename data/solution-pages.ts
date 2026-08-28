import type { ContentLink } from "@/data/category-hubs";
import type { LocalizedText } from "@/lib/i18n";

export type SolutionPage = {
  slug: "torque-control" | "poka-yoke-tightening" | "torque-calibration-verification" | "industrial-sourcing";
  title: LocalizedText;
  seoTitle: LocalizedText;
  description: LocalizedText;
  eyebrow: LocalizedText;
  image: string;
  imageAlt: LocalizedText;
  highlights: LocalizedText[];
  challengeTitle: LocalizedText;
  challenge: LocalizedText;
  symptoms: Array<{ title: LocalizedText; description: LocalizedText }>;
  approach: Array<{ title: LocalizedText; description: LocalizedText }>;
  deliverablesTitle: LocalizedText;
  deliverables: LocalizedText[];
  inputs: LocalizedText[];
  faqs: Array<{ question: LocalizedText; answer: LocalizedText }>;
  related: ContentLink[];
};

export const solutionPages: SolutionPage[] = [
  {
    slug: "torque-control",
    title: { id: "Torque Control & Tightening System untuk Manufaktur", en: "Torque Control & Tightening Systems for Manufacturing" },
    seoTitle: { id: "Torque Control & Tightening System Indonesia", en: "Torque Control & Tightening Systems Indonesia" },
    description: {
      id: "Susun torque tool, metode tightening, verification, data capture, dan operator workflow sebagai satu sistem yang repeatable.",
      en: "Build torque tools, tightening methods, verification, data capture, and operator workflow into one repeatable system."
    },
    eyebrow: { id: "Solusi torque control", en: "Torque-control solution" },
    image: "/assets/company/background-items/tohnichi-digital-torque-wrench.png",
    imageAlt: { id: "Digital torque wrench untuk torque control", en: "Digital torque wrench for torque control" },
    highlights: [
      { id: "Tool selection", en: "Tool selection" },
      { id: "Process verification", en: "Process verification" },
      { id: "Judgment & traceability", en: "Judgment and traceability" }
    ],
    challengeTitle: { id: "Torque target saja belum cukup untuk mengendalikan proses.", en: "A torque target alone does not control the process." },
    challenge: {
      id: "Joint dapat tetap bermasalah ketika tool tidak sesuai range, akses mengubah posisi kerja, operator melewatkan fastener, atau hasil tidak diverifikasi. Torque control menyatukan requirement joint, pemilihan tool, metode kerja, reaction, judgment, dan inspection plan.",
      en: "A joint can still fail when the tool range is wrong, access changes the working position, an operator misses a fastener, or results are not verified. Torque control connects joint requirements, tool selection, working method, reaction, judgment, and inspection planning."
    },
    symptoms: [
      { title: { id: "Hasil tightening bervariasi", en: "Variable tightening results" }, description: { id: "Target sama tetapi tool, grip, access, atau metode operator berbeda.", en: "The target is identical but tools, grip, access, or operator methods differ." } },
      { title: { id: "Setting mudah berubah", en: "Settings change too easily" }, description: { id: "Adjustable tool digunakan pada station yang seharusnya memakai target tetap.", en: "An adjustable tool is used at a station that should have a fixed target." } },
      { title: { id: "Tidak ada bukti hasil", en: "No result evidence" }, description: { id: "Proses hanya mengandalkan klik tanpa count, judgment, marking, atau data.", en: "The process relies only on a click, without counts, judgment, marking, or data." } },
      { title: { id: "Tool drift tidak terdeteksi", en: "Tool drift goes unnoticed" }, description: { id: "Tidak ada line check atau interval verification yang ditetapkan berdasarkan risiko.", en: "No line check or verification interval is defined around process risk." } }
    ],
    approach: [
      { title: { id: "Definisikan joint dan risiko", en: "Define the joint and risk" }, description: { id: "Catat fastener, material, target, toleransi, sequence, akses, dan consequence of failure.", en: "Record the fastener, material, target, tolerance, sequence, access, and consequence of failure." } },
      { title: { id: "Pilih tool dan interface", en: "Select the tool and interface" }, description: { id: "Cocokkan range, mechanism, head, socket atau bit, reaction, dan cara operator memegang tool.", en: "Match range, mechanism, head, socket or bit, reaction, and how the operator holds the tool." } },
      { title: { id: "Tambahkan process control", en: "Add process control" }, description: { id: "Gunakan preset, counter, wireless, marking, torque-angle, atau interlock sesuai risiko.", en: "Use preset settings, counters, wireless, marking, torque-angle, or interlocks according to risk." } },
      { title: { id: "Verifikasi dan perbaiki", en: "Verify and improve" }, description: { id: "Tetapkan daily check, calibration, reaction plan, dan review data untuk abnormality.", en: "Set daily checks, calibration, reaction plans, and data review for abnormalities." } }
    ],
    deliverablesTitle: { id: "Output yang dapat disiapkan bersama CSE", en: "Outputs CSE can help prepare" },
    deliverables: [
      { id: "Shortlist torque wrench atau screwdriver berdasarkan requirement", en: "Torque-wrench or screwdriver shortlist based on requirements" },
      { id: "Rekomendasi socket, bit, head, dan accessory yang sesuai", en: "Suitable socket, bit, head, and accessory recommendations" },
      { id: "Opsi poka-yoke, judgment, wireless, atau data capture", en: "Poka-yoke, judgment, wireless, or data-capture options" },
      { id: "Rencana checker/tester untuk line dan calibration room", en: "Checker/tester plan for the line and calibration room" },
      { id: "Daftar informasi yang perlu dikonfirmasi principal", en: "List of information requiring principal confirmation" },
      { id: "RFQ terstruktur per workstation atau application", en: "Structured RFQ by workstation or application" }
    ],
    inputs: [
      { id: "Target torque, tolerance, unit, dan direction", en: "Torque target, tolerance, unit, and direction" },
      { id: "Fastener, joint material, dan drawing atau foto", en: "Fastener, joint material, and drawing or photo" },
      { id: "Cycle time, jumlah fastener, dan sequence", en: "Cycle time, fastener count, and sequence" },
      { id: "Akses, posture operator, dan power source", en: "Access, operator posture, and power source" },
      { id: "Kebutuhan judgment, marking, data, dan PLC", en: "Judgment, marking, data, and PLC needs" },
      { id: "Standar verification dan calibration yang digunakan", en: "Applicable verification and calibration standard" }
    ],
    faqs: [
      { question: { id: "Apakah torque control selalu membutuhkan digital tool?", en: "Does torque control always require digital tools?" }, answer: { id: "Tidak. Proses sederhana dapat dikendalikan dengan preset click tool, identifikasi yang baik, dan verification plan. Digital atau wireless diperlukan ketika risiko dan kebutuhan data lebih tinggi.", en: "No. A simple process can be controlled with preset click tools, clear identification, and a verification plan. Digital or wireless tools become useful as risk and data requirements increase." } },
      { question: { id: "Apa data minimum untuk memulai review?", en: "What is the minimum information for a review?" }, answer: { id: "Target torque dan unit, jenis fastener, jumlah fastener per unit, foto akses, cycle time, serta masalah yang ingin dicegah.", en: "Provide the torque target and unit, fastener type, fasteners per unit, access photos, cycle time, and the problem to prevent." } },
      { question: { id: "Apakah sistem dapat dimulai dari satu workstation?", en: "Can the system start with one workstation?" }, answer: { id: "Ya. Pilot satu station membantu memvalidasi tool, feedback operator, data, dan reaction plan sebelum diperluas.", en: "Yes. A one-station pilot helps validate the tool, operator feedback, data, and reaction plan before expansion." } }
    ],
    related: [
      { href: "/torque-wrench", title: { id: "Torque wrench", en: "Torque wrenches" }, description: { id: "Pilih click, preset, indicating, atau digital.", en: "Choose click, preset, indicating, or digital." } },
      { href: "/torque-screwdriver", title: { id: "Torque screwdriver", en: "Torque screwdrivers" }, description: { id: "Kontrol precision screw fastening.", en: "Control precision screw fastening." } },
      { href: "/solutions/poka-yoke-tightening", title: { id: "Poka-yoke tightening", en: "Poka-yoke tightening" }, description: { id: "Tambah count, sequence, dan interlock.", en: "Add counts, sequence, and interlocks." } }
    ]
  },
  {
    slug: "poka-yoke-tightening",
    title: { id: "Poka-Yoke Tightening System untuk Produksi", en: "Poka-Yoke Tightening Systems for Production" },
    seoTitle: { id: "Poka-Yoke Tightening System Indonesia", en: "Poka-Yoke Tightening Systems Indonesia" },
    description: {
      id: "Cegah missed tightening, wrong count, dan salah urutan dengan torque tool, sensor, wireless, marking, counter, dan interlock yang sesuai.",
      en: "Prevent missed tightening, wrong counts, and incorrect sequences with suitable torque tools, sensors, wireless, marking, counters, and interlocks."
    },
    eyebrow: { id: "Solusi error proofing", en: "Error-proofing solution" },
    image: "/assets/brands/products/tohnichi/catalog/torque-screwdrivers/stc2-g-stc2-g-bt.jpg",
    imageAlt: { id: "Torque screwdriver digital untuk poka-yoke tightening", en: "Digital torque screwdriver for poka-yoke tightening" },
    highlights: [
      { id: "Missed-tightening prevention", en: "Missed-tightening prevention" },
      { id: "Count & sequence control", en: "Count and sequence control" },
      { id: "PLC / data integration", en: "PLC and data integration" }
    ],
    challengeTitle: { id: "Klik torque belum membuktikan semua fastener selesai.", en: "A torque click does not prove every fastener was completed." },
    challenge: {
      id: "Operator dapat melewatkan satu titik, mengencangkan fastener yang sama dua kali, atau bekerja di urutan yang salah. Poka-yoke tightening mendeteksi completion signal, menghubungkannya dengan count atau sequence, lalu memberi warning atau interlock ketika kondisi tidak sesuai.",
      en: "An operator can miss one point, tighten the same fastener twice, or work in the wrong sequence. Poka-yoke tightening detects completion signals, connects them to a count or sequence, and issues a warning or interlock when conditions do not match."
    },
    symptoms: [
      { title: { id: "Fastener terlewat", en: "Missed fasteners" }, description: { id: "Produk berpindah station sebelum seluruh titik selesai.", en: "The product leaves the station before all points are complete." } },
      { title: { id: "Double count", en: "Double counting" }, description: { id: "Tool mengirim dua signal untuk satu fastener atau re-hit dihitung sebagai titik baru.", en: "The tool sends two signals for one fastener or a re-hit is counted as a new point." } },
      { title: { id: "Wrong sequence", en: "Wrong sequence" }, description: { id: "Urutan penting untuk seating atau quality tetapi operator tidak mendapat guidance.", en: "Sequence matters for seating or quality but the operator lacks guidance." } },
      { title: { id: "Bypass tidak tercatat", en: "Unrecorded bypasses" }, description: { id: "Rework atau override terjadi tanpa reason code dan review supervisor.", en: "Rework or overrides occur without reason codes and supervisor review." } }
    ],
    approach: [
      { title: { id: "Petakan failure mode", en: "Map the failure mode" }, description: { id: "Tentukan apakah masalah utama adalah missed point, wrong order, cross-thread, over-torque, atau traceability.", en: "Determine whether the main problem is a missed point, wrong order, cross-threading, over-torque, or traceability." } },
      { title: { id: "Pilih completion signal", en: "Choose the completion signal" }, description: { id: "Gunakan limit switch, wireless transmitter, marking, digital judgment, atau sensor sesuai tool.", en: "Use a limit switch, wireless transmitter, marking, digital judgment, or sensor to suit the tool." } },
      { title: { id: "Bangun logic station", en: "Build station logic" }, description: { id: "Atur count, sequence, timeout, re-hit handling, model recipe, dan interlock output.", en: "Configure counts, sequence, timeout, re-hit handling, model recipes, and interlock outputs." } },
      { title: { id: "Validasi abnormal flow", en: "Validate abnormal flows" }, description: { id: "Uji missed point, tool failure, communication loss, rework, bypass, dan supervisor reset.", en: "Test missed points, tool failure, communication loss, rework, bypasses, and supervisor resets." } }
    ],
    deliverablesTitle: { id: "Elemen sistem yang perlu ditentukan", en: "System elements to define" },
    deliverables: [
      { id: "Torque tool dan metode completion detection", en: "Torque tool and completion-detection method" },
      { id: "Controller atau counter per station", en: "Controller or counter by station" },
      { id: "Wireless receiver, I/O, atau PLC interface", en: "Wireless receiver, I/O, or PLC interface" },
      { id: "Model recipe, fastener count, dan sequence rule", en: "Model recipe, fastener count, and sequence rule" },
      { id: "Operator feedback melalui lamp, buzzer, display, atau marking", en: "Operator feedback through lamps, buzzers, displays, or marking" },
      { id: "Rework, bypass, alarm, dan recovery flow", en: "Rework, bypass, alarm, and recovery flow" }
    ],
    inputs: [
      { id: "Layout workstation dan posisi setiap fastener", en: "Workstation layout and every fastener position" },
      { id: "Jumlah fastener, urutan, dan variant model", en: "Fastener count, sequence, and model variants" },
      { id: "Torque target, tolerance, dan tool saat ini", en: "Torque target, tolerance, and current tool" },
      { id: "Cycle time dan takt time station", en: "Station cycle time and takt time" },
      { id: "PLC, I/O, network, dan data requirement", en: "PLC, I/O, network, and data requirements" },
      { id: "Abnormality serta rework flow yang diizinkan", en: "Permitted abnormality and rework flow" }
    ],
    faqs: [
      { question: { id: "Apakah poka-yoke dapat memakai manual torque wrench?", en: "Can poka-yoke use a manual torque wrench?" }, answer: { id: "Ya. Manual torque wrench dapat dilengkapi limit switch, wireless transmitter, marking, atau sensor tergantung model dan tingkat kontrol.", en: "Yes. Depending on the model and required control level, a manual torque wrench can use a limit switch, wireless transmitter, marking, or sensors." } },
      { question: { id: "Apa beda count control dan sequence control?", en: "What is the difference between count and sequence control?" }, answer: { id: "Count control memastikan jumlah completion signal terpenuhi. Sequence control juga memastikan titik dikerjakan dalam urutan yang ditentukan.", en: "Count control confirms that the required number of completion signals occurred. Sequence control also confirms the points were completed in the specified order." } },
      { question: { id: "Bagaimana menangani re-hit atau rework?", en: "How should re-hits or rework be handled?" }, answer: { id: "Logic perlu menentukan kapan re-hit diabaikan, kapan count direset, siapa yang boleh bypass, dan bagaimana alasan rework dicatat.", en: "The logic should define when a re-hit is ignored, when the count resets, who may bypass, and how the rework reason is recorded." } }
    ],
    related: [
      { href: "/guides/mencegah-missed-tightening", title: { id: "Panduan missed tightening", en: "Missed-tightening guide" }, description: { id: "Pilih level kontrol dari visual sampai interlock.", en: "Choose a control level from visual cues to interlocks." } },
      { href: "/torque-screwdriver", title: { id: "Torque screwdriver", en: "Torque screwdrivers" }, description: { id: "Lihat rotary-slip, digital, dan poka-yoke models.", en: "Explore rotary-slip, digital, and poka-yoke models." } },
      { href: "/brands/tohnichi", title: { id: "Katalog TOHNICHI", en: "TOHNICHI catalogue" }, description: { id: "Lihat tool, receiver, controller, dan accessory.", en: "Explore tools, receivers, controllers, and accessories." } }
    ]
  },
  {
    slug: "torque-calibration-verification",
    title: { id: "Torque Calibration & Verification Support", en: "Torque Calibration & Verification Support" },
    seoTitle: { id: "Kalibrasi & Verifikasi Torque Wrench Indonesia", en: "Torque-Wrench Calibration & Verification Indonesia" },
    description: {
      id: "Bangun program verification untuk torque wrench dan torque screwdriver: tool inventory, line check, calibration interval, tester, record, dan out-of-tolerance response.",
      en: "Build a verification program for torque wrenches and screwdrivers covering tool inventory, line checks, calibration intervals, testers, records, and out-of-tolerance response."
    },
    eyebrow: { id: "Layanan technical support", en: "Technical-support service" },
    image: "/assets/brands/products/tohnichi/catalog/tester-checker/tcc2-tcc2-g.jpg",
    imageAlt: { id: "TOHNICHI TCC2 calibration controller", en: "TOHNICHI TCC2 calibration controller" },
    highlights: [
      { id: "Tool inventory", en: "Tool inventory" },
      { id: "Line check & calibration", en: "Line checks and calibration" },
      { id: "Records & reaction plan", en: "Records and reaction plans" }
    ],
    challengeTitle: { id: "Calibration certificate bukan satu-satunya kontrol yang dibutuhkan.", en: "A calibration certificate is not the only control required." },
    challenge: {
      id: "Tool dapat berubah karena jatuh, overload, adjustment, wear, atau kondisi penyimpanan setelah tanggal calibration. Program yang efektif menggabungkan periodic calibration dengan quick check di dekat line, identifikasi tool, record, dan respons yang jelas ketika hasil keluar toleransi.",
      en: "A tool can change after calibration because of drops, overload, adjustment, wear, or storage conditions. An effective program combines periodic calibration with near-line quick checks, tool identification, records, and a clear response when results fall outside tolerance."
    },
    symptoms: [
      { title: { id: "Tool tidak teridentifikasi", en: "Tools are not identified" }, description: { id: "Serial number, station, range, dan due date tidak terhubung dalam satu inventory.", en: "Serial number, station, range, and due date are not connected in one inventory." } },
      { title: { id: "Hanya annual calibration", en: "Only annual calibration" }, description: { id: "Tidak ada quick check setelah tool jatuh atau sebelum production start.", en: "No quick check after a drop or before production starts." } },
      { title: { id: "Loading tidak repeatable", en: "Loading is not repeatable" }, description: { id: "Operator, fixture, speed, dan posisi handle berubah antar pengujian.", en: "Operator, fixture, speed, and handle position vary between tests." } },
      { title: { id: "OOT tanpa containment", en: "OOT without containment" }, description: { id: "Hasil out-of-tolerance tidak memicu evaluasi produk sejak last known good check.", en: "An out-of-tolerance result does not trigger product evaluation from the last known good check." } }
    ],
    approach: [
      { title: { id: "Bangun tool inventory", en: "Build the tool inventory" }, description: { id: "Catat ID, model, range, station, owner, due date, dan criticality.", en: "Record ID, model, range, station, owner, due date, and criticality." } },
      { title: { id: "Pisahkan check dan calibration", en: "Separate checks and calibration" }, description: { id: "Tentukan tujuan, equipment, method, frequency, dan acceptance criteria untuk masing-masing.", en: "Define purpose, equipment, method, frequency, and acceptance criteria for each." } },
      { title: { id: "Standardisasi setup", en: "Standardize the setup" }, description: { id: "Kontrol fixture, adapter, loading point, speed, direction, warm-up, dan jumlah pembebanan.", en: "Control fixtures, adapters, loading point, speed, direction, warm-up, and number of loads." } },
      { title: { id: "Tetapkan reaction plan", en: "Set the reaction plan" }, description: { id: "Definisikan quarantine, recheck, adjustment, repair, product review, dan release authority.", en: "Define quarantine, recheck, adjustment, repair, product review, and release authority." } }
    ],
    deliverablesTitle: { id: "Komponen program verification", en: "Verification-program components" },
    deliverables: [
      { id: "Tool master list dan classification berdasarkan risiko", en: "Tool master list and risk classification" },
      { id: "Pemilihan checker untuk daily atau shift check", en: "Checker selection for daily or shift checks" },
      { id: "Pemilihan tester dan fixture untuk calibration", en: "Tester and fixture selection for calibration" },
      { id: "Work instruction pembebanan dan acceptance", en: "Loading and acceptance work instructions" },
      { id: "Format record, label, due date, dan status tool", en: "Record, label, due-date, and tool-status format" },
      { id: "Out-of-tolerance dan product-containment flow", en: "Out-of-tolerance and product-containment flow" }
    ],
    inputs: [
      { id: "Daftar torque tool, model, range, dan quantity", en: "Torque-tool list, models, ranges, and quantities" },
      { id: "Station dan criticality setiap tool", en: "Station and criticality of every tool" },
      { id: "Standard atau customer requirement", en: "Applicable standard or customer requirement" },
      { id: "Current interval dan history failure", en: "Current interval and failure history" },
      { id: "Tester/checker yang sudah tersedia", en: "Existing testers/checkers" },
      { id: "Kebutuhan certificate, data export, dan audit trail", en: "Certificate, data-export, and audit-trail needs" }
    ],
    faqs: [
      { question: { id: "Seberapa sering torque wrench perlu diverifikasi?", en: "How often should a torque wrench be verified?" }, answer: { id: "Interval ditentukan oleh frekuensi penggunaan, risiko joint, history tool, kejadian abnormal, standard internal, dan requirement customer—bukan satu angka yang sama untuk semua tool.", en: "The interval depends on use frequency, joint risk, tool history, abnormal events, internal standards, and customer requirements rather than one universal number." } },
      { question: { id: "Apa beda verification dan calibration?", en: "What is the difference between verification and calibration?" }, answer: { id: "Verification mengecek apakah tool masih memenuhi acceptance criteria. Calibration membandingkan hasil dengan referensi tertelusur dan dapat mencakup adjustment serta dokumentasi yang lebih formal.", en: "Verification checks whether a tool still meets acceptance criteria. Calibration compares results with a traceable reference and may include adjustment and more formal documentation." } },
      { question: { id: "Kapan tool harus segera diperiksa?", en: "When should a tool be checked immediately?" }, answer: { id: "Setelah jatuh, overload, repair, adjustment, hasil joint abnormal, atau kondisi lain yang dapat memengaruhi performa.", en: "After a drop, overload, repair, adjustment, abnormal joint result, or any condition that may affect performance." } }
    ],
    related: [
      { href: "/torque-tester", title: { id: "Torque tester & checker", en: "Torque testers and checkers" }, description: { id: "Bandingkan equipment berdasarkan tujuan check.", en: "Compare equipment by check purpose." } },
      { href: "/guides/mengapa-torque-wrench-perlu-dikalibrasi", title: { id: "Mengapa kalibrasi diperlukan", en: "Why calibration is needed" }, description: { id: "Pahami drift, risiko, dan interval berbasis evidence.", en: "Understand drift, risk, and evidence-based intervals." } },
      { href: "/brands/tohnichi", title: { id: "TOHNICHI sales & service", en: "TOHNICHI sales and service" }, description: { id: "Lihat katalog dan status dukungan resmi CSE.", en: "View the catalogue and CSE's official support status." } }
    ]
  },
  {
    slug: "industrial-sourcing",
    title: { id: "Pengadaan Barang Industri yang Praktis dan Tepat Sasaran", en: "Practical and Targeted Industrial Procurement" },
    seoTitle: { id: "Industrial Sourcing untuk Procurement Indonesia", en: "Industrial Sourcing & Procurement Support Indonesia" },
    description: {
      id: "CSE membantu mengubah model, drawing, sample, atau spesifikasi yang belum lengkap menjadi RFQ industrial yang dapat diverifikasi ke principal Jepang dan Asia.",
      en: "CSE helps turn models, drawings, samples, or incomplete specifications into industrial RFQs that can be verified with Japanese and Asian principals."
    },
    eyebrow: { id: "Layanan industrial sourcing", en: "Industrial-sourcing service" },
    image: "/assets/company/hero-background-curated-v2.png",
    imageAlt: { id: "Industrial sourcing dan procurement support CSE", en: "CSE industrial sourcing and procurement support" },
    highlights: [
      { id: "Model & specification review", en: "Model and specification review" },
      { id: "Principal confirmation", en: "Principal confirmation" },
      { id: "Alternative comparison", en: "Alternative comparison" }
    ],
    challengeTitle: { id: "RFQ industrial sering dimulai dari informasi yang tidak lengkap.", en: "Industrial RFQs often begin with incomplete information." },
    challenge: {
      id: "Nama item internal, foto lama, model obsolete, atau drawing parsial belum cukup untuk quotation yang aman. Sourcing yang baik memisahkan identitas item, requirement teknis, operating condition, quantity, dan parameter yang tidak boleh berubah sebelum mencari source atau alternatif.",
      en: "An internal item name, old photo, obsolete model, or partial drawing is not enough for a safe quotation. Good sourcing separates item identity, technical requirements, operating conditions, quantity, and parameters that cannot change before looking for a source or alternative."
    },
    symptoms: [
      { title: { id: "Part number tidak lengkap", en: "Incomplete part numbers" }, description: { id: "Suffix, option, voltage, size, material, atau revision tidak tercantum.", en: "Suffix, option, voltage, size, material, or revision is missing." } },
      { title: { id: "Model obsolete", en: "Obsolete models" }, description: { id: "Replacement ada tetapi dimensional dan functional compatibility belum diperiksa.", en: "A replacement exists but dimensional and functional compatibility has not been checked." } },
      { title: { id: "Alternatif hanya dibanding harga", en: "Alternatives compared only by price" }, description: { id: "Material, tolerance, duty, environment, dan lifecycle cost tidak masuk evaluasi.", en: "Material, tolerance, duty, environment, and lifecycle cost are not evaluated." } },
      { title: { id: "Clarification berulang", en: "Repeated clarification" }, description: { id: "Principal harus meminta data yang sama karena RFQ tidak memakai checklist konsisten.", en: "The principal repeatedly asks for the same data because the RFQ lacks a consistent checklist." } }
    ],
    approach: [
      { title: { id: "Identify", en: "Identify" }, description: { id: "Kumpulkan nameplate, model, maker, drawing, sample, foto, dan history purchase.", en: "Collect nameplates, models, makers, drawings, samples, photos, and purchase history." } },
      { title: { id: "Clarify", en: "Clarify" }, description: { id: "Pisahkan must-have requirement, operating condition, interface, dan acceptance criteria.", en: "Separate must-have requirements, operating conditions, interfaces, and acceptance criteria." } },
      { title: { id: "Verify", en: "Verify" }, description: { id: "Konfirmasikan availability, supersession, technical fit, lead time, dan document support.", en: "Confirm availability, supersession, technical fit, lead time, and document support." } },
      { title: { id: "Compare", en: "Compare" }, description: { id: "Tampilkan perbedaan source atau alternatif secara eksplisit sebelum approval.", en: "Make differences between sources or alternatives explicit before approval." } }
    ],
    deliverablesTitle: { id: "Hasil sourcing yang berguna untuk procurement", en: "Sourcing outputs useful to procurement" },
    deliverables: [
      { id: "RFQ summary dengan model, specification, dan application note", en: "RFQ summary with model, specification, and application note" },
      { id: "Daftar clarification yang masih perlu dijawab", en: "List of clarification questions still requiring answers" },
      { id: "Konfirmasi model current, obsolete, atau superseded", en: "Confirmation of current, obsolete, or superseded models" },
      { id: "Comparison table untuk alternatif yang diusulkan", en: "Comparison table for proposed alternatives" },
      { id: "Dokumen pendukung seperti catalogue atau datasheet", en: "Supporting catalogue or datasheet documents" },
      { id: "Quotation dengan scope, assumption, dan exclusion yang jelas", en: "Quotation with clear scope, assumptions, and exclusions" }
    ],
    inputs: [
      { id: "Brand, model, part number, dan suffix lengkap", en: "Brand, model, part number, and full suffix" },
      { id: "Foto nameplate, item, packaging, dan installation", en: "Photos of nameplate, item, packaging, and installation" },
      { id: "Drawing, dimension, material, connection, dan tolerance", en: "Drawing, dimensions, material, connections, and tolerances" },
      { id: "Operating condition dan fungsi item", en: "Operating conditions and item function" },
      { id: "Quantity, required date, dan consumption pattern", en: "Quantity, required date, and consumption pattern" },
      { id: "Alternatif boleh atau tidak serta batas perubahannya", en: "Whether alternatives are allowed and the limits of change" }
    ],
    faqs: [
      { question: { id: "Apakah CSE dapat mencari item tanpa part number?", en: "Can CSE source an item without a part number?" }, answer: { id: "Kadang bisa, tetapi diperlukan bukti tambahan seperti nameplate, drawing, dimension, material, sample, fungsi, dan operating condition. Semakin lengkap data, semakin aman hasilnya.", en: "Sometimes, but additional evidence such as a nameplate, drawing, dimensions, material, sample, function, and operating conditions is needed. More complete data produces a safer result." } },
      { question: { id: "Apakah CSE dapat menawarkan alternatif?", en: "Can CSE propose alternatives?" }, answer: { id: "Ya, bila alternatif diizinkan. Parameter yang tidak boleh berubah harus ditentukan agar comparison tidak hanya berdasarkan bentuk atau harga.", en: "Yes, when alternatives are allowed. Parameters that cannot change must be defined so comparison is not based only on appearance or price." } },
      { question: { id: "Apa yang mempercepat proses quotation?", en: "What speeds up quotation?" }, answer: { id: "Part number lengkap, quantity, foto, datasheet atau drawing, target delivery, serta jawaban jelas tentang application dan alternative acceptance.", en: "A complete part number, quantity, photos, datasheet or drawing, target delivery, and clear answers about the application and alternative acceptance." } }
    ],
    related: [
      { href: "/brands", title: { id: "Direktori brand", en: "Brand directory" }, description: { id: "Cari represented dan general-trading brands.", en: "Search represented and general-trading brands." } },
      { href: "/industries/general-industry", title: { id: "General manufacturing", en: "General manufacturing" }, description: { id: "Lihat alur kebutuhan produksi dan maintenance.", en: "See the production and maintenance workflow." } },
      { href: "/contact", title: { id: "Kirim RFQ", en: "Send an RFQ" }, description: { id: "Lampirkan model, foto, drawing, dan target delivery.", en: "Attach models, photos, drawings, and target delivery." } }
    ]
  }
];

export function getSolutionPage(slug: string) {
  return solutionPages.find((page) => page.slug === slug);
}
