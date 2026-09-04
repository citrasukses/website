import type { LocalizedText } from "@/lib/i18n";

export type ContentLink = {
  href: string;
  title: LocalizedText;
  description: LocalizedText;
};

export type CategoryProduct = ContentLink & {
  image: string;
  useFor: LocalizedText;
};

export type CategoryHub = {
  slug: "torque-wrench" | "torque-screwdriver" | "torque-tester";
  title: LocalizedText;
  seoTitle: LocalizedText;
  description: LocalizedText;
  eyebrow: LocalizedText;
  image: string;
  imageAlt: LocalizedText;
  highlights: LocalizedText[];
  introTitle: LocalizedText;
  intro: LocalizedText;
  useCases: Array<{ title: LocalizedText; description: LocalizedText }>;
  criteria: Array<{ title: LocalizedText; description: LocalizedText }>;
  products: CategoryProduct[];
  comparison: {
    title: LocalizedText;
    description: LocalizedText;
    headers: LocalizedText[];
    rows: LocalizedText[][];
  };
  faqs: Array<{ question: LocalizedText; answer: LocalizedText }>;
  related: ContentLink[];
};

export const categoryHubs: CategoryHub[] = [
  {
    slug: "torque-wrench",
    title: { id: "Torque Wrench Industrial Indonesia", en: "Industrial Torque Wrenches in Indonesia" },
    seoTitle: { id: "Torque Wrench Industrial Indonesia | TOHNICHI", en: "Industrial Torque Wrenches Indonesia | TOHNICHI" },
    description: {
      id: "Panduan memilih torque wrench TOHNICHI untuk assembly, maintenance, dan inspeksi di Indonesia—mulai dari tipe click, preset, dial, hingga digital.",
      en: "Choose a TOHNICHI torque wrench for assembly, maintenance, or inspection in Indonesia, from click and preset tools to dial and digital models."
    },
    eyebrow: { id: "Kategori torque tools", en: "Torque tool category" },
    image: "/assets/brands/products/tohnichi/catalog/torque-wrenches/ql-qle2.jpg",
    imageAlt: { id: "Torque wrench TOHNICHI QL untuk aplikasi industri", en: "TOHNICHI QL torque wrench for industrial applications" },
    highlights: [
      { id: "Agen penjualan & servis TOHNICHI", en: "TOHNICHI sales & service agent" },
      { id: "Pemilihan berdasarkan aplikasi", en: "Application-based selection" },
      { id: "Dukungan kalibrasi & repair", en: "Calibration & repair support" }
    ],
    introTitle: { id: "Pilih berdasarkan proses, bukan hanya angka torsi.", en: "Select around the process, not only the torque value." },
    intro: {
      id: "Torque wrench yang tepat harus mencakup target torque di bagian kerja skala yang sesuai, cocok dengan akses fastener, dan mendukung cara operator bekerja. Untuk produksi berulang, kontrol setelan dan error-proofing lebih penting daripada fleksibilitas. Untuk maintenance, range dan kemudahan perubahan setelan sering menjadi prioritas.",
      en: "The right torque wrench should place the target torque in a suitable part of its working range, fit the fastener access, and support the operator's workflow. Repetitive production usually prioritizes setting control and error proofing, while maintenance work often values range and easy adjustment."
    },
    useCases: [
      {
        title: { id: "Assembly produksi", en: "Production assembly" },
        description: { id: "Pengencangan berulang dengan target tetap atau beberapa target terkontrol.", en: "Repeated tightening with a fixed target or a controlled set of targets." }
      },
      {
        title: { id: "Maintenance dan overhaul", en: "Maintenance and overhaul" },
        description: { id: "Satu tool adjustable untuk berbagai fastener dan pekerjaan lapangan atau workshop.", en: "An adjustable tool for varied fasteners in field or workshop work." }
      },
      {
        title: { id: "Inspection dan quality check", en: "Inspection and quality checks" },
        description: { id: "Pembacaan torque aktual, judgment, atau pencatatan data hasil pemeriksaan.", en: "Actual torque readings, judgment, or data capture for inspection results." }
      }
    ],
    criteria: [
      {
        title: { id: "Target dan range torsi", en: "Target and torque range" },
        description: { id: "Hindari memilih tool hanya karena nilai maksimum mencukupi; cek rentang kerja dan satuan yang dipakai.", en: "Do not select only because the maximum value is sufficient; check the working range and required unit." }
      },
      {
        title: { id: "Jenis head dan akses", en: "Head type and access" },
        description: { id: "Pilih ratchet tetap, interchangeable head, open end, atau bentuk khusus sesuai clearance.", en: "Choose a fixed ratchet, interchangeable head, open end, or special form to suit the available clearance." }
      },
      {
        title: { id: "Adjustable atau preset", en: "Adjustable or preset" },
        description: { id: "Adjustable cocok untuk target berubah; preset membantu mengunci satu standar pada produksi massal.", en: "Adjustable tools suit changing targets; preset tools help lock one production standard." }
      },
      {
        title: { id: "Click, indicating, atau digital", en: "Click, indicating, or digital" },
        description: { id: "Click memberi sinyal tercapai, indicating menampilkan hasil, dan digital dapat menambah judgment atau data.", en: "Click tools signal completion, indicating tools show the result, and digital tools can add judgment or data." }
      },
      {
        title: { id: "Kontrol proses", en: "Process control" },
        description: { id: "Pertimbangkan counter, wireless, marking, torque + angle, dan traceability sejak awal.", en: "Consider counters, wireless, marking, torque-plus-angle, and traceability from the start." }
      },
      {
        title: { id: "Verifikasi berkala", en: "Periodic verification" },
        description: { id: "Siapkan checker atau tester, interval pemeriksaan, dan catatan kalibrasi yang sesuai risiko proses.", en: "Plan the checker or tester, inspection interval, and calibration records around process risk." }
      }
    ],
    products: [
      {
        href: "/brands/tohnichi/products/ql-qle2",
        title: { id: "QL/QLE2 — adjustable click", en: "QL/QLE2 — adjustable click" },
        description: { id: "Torque wrench ratchet adjustable untuk assembly dan maintenance umum.", en: "Adjustable ratchet torque wrench for general assembly and maintenance." },
        useFor: { id: "Target torque berubah dan operator perlu skala yang mudah disetel.", en: "Changing torque targets where the operator needs a readable adjustment scale." },
        image: "/assets/brands/products/tohnichi/catalog/torque-wrenches/ql-qle2.jpg"
      },
      {
        href: "/brands/tohnichi/products/qsp-qsp-mh",
        title: { id: "QSP/QSP-MH — preset click", en: "QSP/QSP-MH — preset click" },
        description: { id: "Torque wrench preset untuk pekerjaan produksi berulang dengan target tetap.", en: "Preset torque wrench for repetitive production work at a fixed target." },
        useFor: { id: "Mencegah perubahan setelan yang tidak diperlukan di line assembly.", en: "Preventing unnecessary setting changes on an assembly line." },
        image: "/assets/brands/products/tohnichi/catalog/torque-wrenches/qsp-qsp-mh.jpg"
      },
      {
        href: "/brands/tohnichi/products/dql-dqle2",
        title: { id: "DQL/DQLE2 — dial indicating", en: "DQL/DQLE2 — dial indicating" },
        description: { id: "Tipe dial untuk membaca torque pada tightening atau inspection.", en: "Dial-indicating tool for reading torque during tightening or inspection." },
        useFor: { id: "Quality check yang membutuhkan nilai aktual, bukan hanya sinyal klik.", en: "Quality checks that require an actual value rather than only a click signal." },
        image: "/assets/brands/products/tohnichi/catalog/torque-wrenches/dql-dqle2.png"
      },
      {
        href: "/brands/tohnichi/products/db-dbe-dbr",
        title: { id: "DB/DBE/DBR — beam & dial", en: "DB/DBE/DBR — beam and dial" },
        description: { id: "Keluarga indicating torque wrench untuk inspeksi dan pembacaan torque.", en: "An indicating torque-wrench family for inspection and torque readings." },
        useFor: { id: "Pemeriksaan sambungan atau proses yang membutuhkan pembacaan kontinu.", en: "Joint inspection or processes that need continuous readings." },
        image: "/assets/brands/products/tohnichi/catalog/torque-wrenches/db-dbe-dbr.png"
      },
      {
        href: "/brands/tohnichi/products/cta2-cta2-g",
        title: { id: "CTA2/CTA2-G — torque + angle", en: "CTA2/CTA2-G — torque plus angle" },
        description: { id: "Digital torque wrench untuk proses yang menentukan torque sekaligus sudut putar.", en: "Digital torque wrench for processes specified by both torque and rotation angle." },
        useFor: { id: "Fastener kritis dengan prosedur torque-angle dan kebutuhan judgment.", en: "Critical fasteners with a torque-angle procedure and judgment requirements." },
        image: "/assets/brands/products/tohnichi/catalog/interchangeable-head-torque-wrenches/cta2-cta2-g.png"
      }
    ],
    comparison: {
      title: { id: "Ringkasan tipe torque wrench", en: "Torque-wrench type summary" },
      description: { id: "Gunakan tabel ini untuk mempersempit pilihan sebelum menentukan model dan range.", en: "Use this table to narrow the choice before selecting a model and range." },
      headers: [{ id: "Tipe", en: "Type" }, { id: "Kegunaan utama", en: "Primary use" }, { id: "Kelebihan", en: "Strength" }, { id: "Perlu diperhatikan", en: "Watch for" }],
      rows: [
        [{ id: "Adjustable click", en: "Adjustable click" }, { id: "Maintenance, multi-model assembly", en: "Maintenance, multi-model assembly" }, { id: "Fleksibel untuk beberapa target", en: "Flexible across several targets" }, { id: "Kontrol perubahan setelan", en: "Control setting changes" }],
        [{ id: "Preset click", en: "Preset click" }, { id: "Produksi berulang", en: "Repetitive production" }, { id: "Target tidak mudah diubah operator", en: "Target is not easily changed by operators" }, { id: "Perlu alat setting dan identifikasi tool", en: "Needs setting equipment and tool identification" }],
        [{ id: "Dial / beam", en: "Dial / beam" }, { id: "Inspection dan pembacaan", en: "Inspection and readings" }, { id: "Menampilkan nilai aktual", en: "Shows the actual value" }, { id: "Teknik membaca dan arah kerja", en: "Reading technique and working direction" }],
        [{ id: "Digital", en: "Digital" }, { id: "Judgment, data, torque-angle", en: "Judgment, data, torque-angle" }, { id: "Feedback dan integrasi proses", en: "Feedback and process integration" }, { id: "Format data, baterai, dan workflow", en: "Data format, battery, and workflow" }]
      ]
    },
    faqs: [
      { question: { id: "Apakah torque wrench dengan range terbesar selalu lebih baik?", en: "Is the widest-range torque wrench always better?" }, answer: { id: "Tidak. Target harus berada dalam range kerja yang sesuai dan tool tetap harus nyaman, cukup sensitif, serta cocok dengan akses fastener.", en: "No. The target must sit within a suitable working range, and the tool must remain comfortable, sensitive enough, and compatible with fastener access." } },
      { question: { id: "Apa perbedaan torque wrench tightening dan inspection?", en: "What is the difference between tightening and inspection torque wrenches?" }, answer: { id: "Tool tightening memberi sinyal atau berhenti pada target. Tool inspection menampilkan torque aktual saat sambungan diperiksa. Beberapa model digital dapat melakukan keduanya.", en: "A tightening tool signals or stops at the target. An inspection tool displays actual torque as a joint is checked. Some digital models can support both." } },
      { question: { id: "Apakah CSE dapat membantu menentukan model TOHNICHI?", en: "Can CSE help select a TOHNICHI model?" }, answer: { id: "Ya. Sertakan target torque, unit, jenis fastener, ruang akses, frekuensi kerja, dan kebutuhan data agar pilihan dapat dipersempit.", en: "Yes. Share the torque target, unit, fastener, available access, operating frequency, and data requirements so the options can be narrowed." } }
    ],
    related: [
      { href: "/tohnichi-torsi-tepat", title: { id: "Mengapa baut kencang belum tentu tepat", en: "Why tight is not always right" }, description: { id: "Lihat bagaimana mekanisme click dan rotary-slip membantu membuat pengencangan lebih konsisten.", en: "See how click and rotary-slip mechanisms help make tightening more consistent." } },
      { href: "/solutions/torque-control", title: { id: "Sistem torque control", en: "Torque-control systems" }, description: { id: "Susun tool, verifikasi, dan data sebagai satu proses.", en: "Combine tools, verification, and data into one process." } },
      { href: "/solutions/poka-yoke-tightening", title: { id: "Poka-yoke tightening", en: "Poka-yoke tightening" }, description: { id: "Kurangi missed tightening dan salah urutan kerja.", en: "Reduce missed tightening and incorrect work sequences." } },
      { href: "/guides/cara-memilih-torque-wrench", title: { id: "Panduan memilih torque wrench", en: "Torque-wrench selection guide" }, description: { id: "Checklist teknis sebelum meminta quotation.", en: "A technical checklist before requesting a quotation." } }
    ]
  },
  {
    slug: "torque-screwdriver",
    title: { id: "Torque Screwdriver Indonesia", en: "Torque Screwdrivers in Indonesia" },
    seoTitle: { id: "Torque Screwdriver Indonesia | TOHNICHI", en: "Torque Screwdrivers Indonesia | TOHNICHI" },
    description: {
      id: "Torque screwdriver TOHNICHI untuk pengencangan sekrup kecil, produksi elektronik, precision assembly, inspection, dan poka-yoke.",
      en: "TOHNICHI torque screwdrivers for small-fastener tightening, electronics production, precision assembly, inspection, and poka-yoke."
    },
    eyebrow: { id: "Kategori precision tightening", en: "Precision-tightening category" },
    image: "/assets/brands/products/tohnichi/catalog/torque-screwdrivers/rtd.png",
    imageAlt: { id: "Torque screwdriver TOHNICHI RTD", en: "TOHNICHI RTD torque screwdriver" },
    highlights: [
      { id: "Rotary-slip mencegah over-torque", en: "Rotary slip helps prevent over-torque" },
      { id: "Adjustable dan preset", en: "Adjustable and preset options" },
      { id: "Inspection & poka-yoke", en: "Inspection and poka-yoke" }
    ],
    introTitle: { id: "Kontrol pengencangan tanpa mengandalkan insting operator.", en: "Control small fasteners without relying on operator feel." },
    intro: {
      id: "Torque screwdriver digunakan ketika torque target lebih kecil dan fastener digerakkan melalui bit. Mekanisme rotary-slip sangat berguna pada tightening karena tool akan slip setelah target tercapai, membantu mencegah penambahan torque. Untuk inspection atau data, pilih tipe indicating atau digital.",
      en: "A torque screwdriver is used where the torque target is lower and the fastener is driven through a bit. Rotary-slip mechanisms are valuable for tightening because the tool slips after reaching the target, helping prevent additional torque. Choose indicating or digital types for inspection or data."
    },
    useCases: [
      { title: { id: "Elektronik dan instrumen", en: "Electronics and instruments" }, description: { id: "Sekrup kecil pada PCB, terminal, enclosure, dan komponen presisi.", en: "Small screws on PCBs, terminals, enclosures, and precision components." } },
      { title: { id: "Produksi masal", en: "Mass production" }, description: { id: "Preset torque dan rotary-slip untuk pekerjaan yang sama berulang kali.", en: "Preset torque and rotary slip for the same repeated operation." } },
      { title: { id: "Inspeksi kualitas", en: "Quality inspection" }, description: { id: "Pembacaan torque saat menguji screw, cap, atau komponen kecil.", en: "Torque readings while checking screws, caps, or small components." } }
    ],
    criteria: [
      { title: { id: "Range dalam cN·m atau N·m", en: "Range in cN·m or N·m" }, description: { id: "Pastikan satuan dan target sesuai; kesalahan konversi berisiko besar pada sekrup kecil.", en: "Confirm the unit and target; conversion mistakes are significant on small fasteners." } },
      { title: { id: "Bit dan bentuk fastener", en: "Bit and fastener profile" }, description: { id: "Tentukan Phillips, hex, TORX, slotted, atau custom serta ukuran bit yang tepat.", en: "Define Phillips, hex, TORX, slotted, or custom profiles and the correct bit size." } },
      { title: { id: "Grip dan arah kerja", en: "Grip and working direction" }, description: { id: "Cek posisi operator, bentuk handle, dan kebutuhan right/left tightening.", en: "Check operator position, handle form, and right/left tightening requirements." } },
      { title: { id: "Rotary-slip atau click", en: "Rotary slip or click" }, description: { id: "Rotary-slip membantu membatasi over-torque; click memberi feedback target yang jelas.", en: "Rotary slip helps limit over-torque; click provides clear target feedback." } },
      { title: { id: "Preset atau adjustable", en: "Preset or adjustable" }, description: { id: "Preset untuk standar tetap; adjustable untuk maintenance atau pergantian model.", en: "Preset for fixed standards; adjustable for maintenance or model changes." } },
      { title: { id: "Counter dan wireless", en: "Counters and wireless" }, description: { id: "Tambahkan limit switch, transmitter, atau digital output jika missed tightening harus dicegah.", en: "Add a limit switch, transmitter, or digital output where missed tightening must be prevented." } }
    ],
    products: [
      { href: "/brands/tohnichi/products/rtd", title: { id: "RTD — adjustable rotary-slip", en: "RTD — adjustable rotary slip" }, description: { id: "Torque screwdriver adjustable untuk produksi dan maintenance.", en: "Adjustable torque screwdriver for production and maintenance." }, useFor: { id: "Target berubah tetapi over-torque tetap perlu dibatasi.", en: "Changing targets where over-torque still needs to be limited." }, image: "/assets/brands/products/tohnichi/catalog/torque-screwdrivers/rtd.png" },
      { href: "/brands/tohnichi/products/rntd", title: { id: "RNTD — preset rotary-slip", en: "RNTD — preset rotary slip" }, description: { id: "Preset untuk tightening berulang dengan setelan tersembunyi.", en: "Preset tool for repetitive tightening with a concealed setting." }, useFor: { id: "Satu target tetap pada workstation produksi.", en: "One fixed target at a production workstation." }, image: "/assets/brands/products/tohnichi/catalog/torque-screwdrivers/rntd.jpg" },
      { href: "/brands/tohnichi/products/stc2-g-stc2-g-bt", title: { id: "STC2-G — digital", en: "STC2-G — digital" }, description: { id: "Torque screwdriver digital untuk tightening dan inspection presisi.", en: "Digital torque screwdriver for precision tightening and inspection." }, useFor: { id: "Judgment visual/audible dan kebutuhan pembacaan aktual.", en: "Visual/audible judgment and actual-value readings." }, image: "/assets/brands/products/tohnichi/catalog/torque-screwdrivers/stc2-g-stc2-g-bt.jpg" },
      { href: "/brands/tohnichi/products/ftd", title: { id: "FTD — indicating", en: "FTD — indicating" }, description: { id: "Torque screwdriver indicating untuk pengukuran dan inspeksi.", en: "Indicating torque screwdriver for measurement and inspection." }, useFor: { id: "Membaca torque pada komponen kecil atau proses quality check.", en: "Reading torque on small components or in quality checks." }, image: "/assets/brands/products/tohnichi/catalog/torque-screwdrivers/ftd.jpg" },
      { href: "/brands/tohnichi/products/ftd-s", title: { id: "FTD-S — dial with memory pointer", en: "FTD-S — dial with memory pointer" }, description: { id: "Tipe dial untuk menangkap peak pada inspeksi torque kecil.", en: "Dial type for capturing peak torque during small-torque inspection." }, useFor: { id: "Pemeriksaan hasil dengan pembacaan peak yang perlu dicatat.", en: "Checks where a peak reading needs to be recorded." }, image: "/assets/brands/products/tohnichi/catalog/torque-screwdrivers/ftd-s.jpg" }
    ],
    comparison: {
      title: { id: "Adjustable, preset, dan indicating", en: "Adjustable, preset, and indicating" },
      description: { id: "Tiga keputusan ini TOHNICHI paling cepat mempersempit pilihan torque screwdriver.", en: "These three decisions usually narrow a torque-screwdriver shortlist fastest." },
      headers: [{ id: "Tipe", en: "Type" }, { id: "Target", en: "Target" }, { id: "Cocok untuk", en: "Best for" }, { id: "Output", en: "Output" }],
      rows: [
        [{ id: "Adjustable rotary-slip", en: "Adjustable rotary slip" }, { id: "Sering berubah", en: "Changes often" }, { id: "Maintenance, mixed production", en: "Maintenance, mixed production" }, { id: "Slip setelah target", en: "Slips after target" }],
        [{ id: "Preset rotary-slip", en: "Preset rotary slip" }, { id: "Tetap", en: "Fixed" }, { id: "Mass production", en: "Mass production" }, { id: "Slip, setelan terkunci", en: "Slip, controlled setting" }],
        [{ id: "Indicating / digital", en: "Indicating / digital" }, { id: "Dibaca sebagai hasil", en: "Read as a result" }, { id: "Inspection dan development", en: "Inspection and development" }, { id: "Nilai, judgment, atau data", en: "Value, judgment, or data" }]
      ]
    },
    faqs: [
      { question: { id: "Kapan memakai torque screwdriver, bukan torque wrench?", en: "When should I use a torque screwdriver instead of a torque wrench?" }, answer: { id: "Gunakan torque screwdriver untuk fastener kecil yang digerakkan dengan bit dan target torque rendah. Torque wrench lebih sesuai untuk baut atau mur dengan socket atau interchangeable head.", en: "Use a torque screwdriver for small bit-driven fasteners and lower torque targets. A torque wrench is better suited to bolts or nuts driven by sockets or interchangeable heads." } },
      { question: { id: "Apa manfaat rotary-slip?", en: "What is the benefit of rotary slip?" }, answer: { id: "Setelah target tercapai, mekanisme slip membantu mencegah operator terus menambah torque pada fastener.", en: "After the target is reached, the slip mechanism helps prevent the operator from continuing to add torque to the fastener." } },
      { question: { id: "Apakah torque screwdriver dapat masuk sistem poka-yoke?", en: "Can a torque screwdriver be used in a poka-yoke system?" }, answer: { id: "Ya. Tipe dengan limit switch, wireless transmitter, marking, counter, atau output digital dapat dipilih sesuai tingkat kontrol yang dibutuhkan.", en: "Yes. Models with limit switches, wireless transmitters, marking, counters, or digital outputs can be selected for the required level of control." } }
    ],
    related: [
      { href: "/solutions/poka-yoke-tightening", title: { id: "Poka-yoke untuk screw tightening", en: "Poka-yoke for screw tightening" }, description: { id: "Hubungkan tool, count, dan judgment pada workstation.", en: "Connect the tool, count, and judgment at the workstation." } },
      { href: "/guides/torque-wrench-vs-torque-screwdriver", title: { id: "Torque wrench vs torque screwdriver", en: "Torque wrench vs torque screwdriver" }, description: { id: "Pilih berdasarkan fastener, drive, dan range.", en: "Choose based on fastener, drive, and range." } },
      { href: "/torque-tester", title: { id: "Tester dan checker", en: "Testers and checkers" }, description: { id: "Verifikasi screwdriver sebelum dan selama produksi.", en: "Verify screwdrivers before and during production." } }
    ]
  },
  {
    slug: "torque-tester",
    title: { id: "Torque Tester & Calibration Equipment Indonesia", en: "Torque Testers & Calibration Equipment in Indonesia" },
    seoTitle: { id: "Torque Wrench Tester & Calibration Equipment | CSE", en: "Torque Wrench Testers & Calibration Equipment | CSE" },
    description: {
      id: "Torque tester, checker, dan calibration equipment TOHNICHI untuk torque wrench dan torque screwdriver—dengan pilihan judgment dan data management.",
      en: "TOHNICHI torque testers, checkers, and calibration equipment for torque wrenches and screwdrivers, with judgment and data-management options."
    },
    eyebrow: { id: "Kategori verifikasi torque", en: "Torque-verification category" },
    image: "/assets/brands/products/tohnichi/catalog/tester-checker/dote4-dote4-g.png",
    imageAlt: { id: "Torque wrench tester TOHNICHI DOTE4", en: "TOHNICHI DOTE4 torque-wrench tester" },
    highlights: [
      { id: "Tester untuk kalibrasi & adjustment", en: "Testers for calibration and adjustment" },
      { id: "Checker untuk pemeriksaan harian", en: "Checkers for daily verification" },
      { id: "Judgment dan pengelolaan data", en: "Judgment and data management" }
    ],
    introTitle: { id: "Bedakan calibration tester dan line checker sejak awal.", en: "Separate calibration testers from line checkers at the start." },
    intro: {
      id: "Tester digunakan untuk mengevaluasi dan menyetel torque tools secara terkontrol, TOHNICHI dengan pembebanan yang stabil dan pencatatan hasil. Checker mendukung pemeriksaan cepat sebelum atau selama produksi. Pilihan akhir bergantung pada jenis tool, range, arah torque, metode loading, standar kerja, dan format data.",
      en: "A tester evaluates and adjusts torque tools under controlled loading, usually with stable operation and recorded results. A checker supports quick verification before or during production. The choice depends on tool type, range, torque direction, loading method, work standard, and data format."
    },
    useCases: [
      { title: { id: "Calibration room", en: "Calibration room" }, description: { id: "Pemeriksaan terjadwal, adjustment, dan sertifikat atau catatan hasil internal.", en: "Scheduled checks, adjustment, and internal certificates or result records." } },
      { title: { id: "Production line", en: "Production line" }, description: { id: "Daily check sebelum shift atau setelah kejadian yang dapat memengaruhi tool.", en: "Daily checks before a shift or after events that may affect the tool." } },
      { title: { id: "Tool crib", en: "Tool crib" }, description: { id: "Kontrol status banyak tool, identifikasi, dan histori pemeriksaan.", en: "Status control, identification, and verification history for many tools." } }
    ],
    criteria: [
      { title: { id: "Jenis tool yang diuji", en: "Tool under test" }, description: { id: "Torque wrench, torque screwdriver, powered tool, atau sensor membutuhkan fixture dan cara loading berbeda.", en: "Torque wrenches, screwdrivers, powered tools, and sensors need different fixtures and loading methods." } },
      { title: { id: "Range dan arah torque", en: "Range and torque direction" }, description: { id: "Pilih kapasitas yang menutup range tool dan pastikan clockwise/counterclockwise sesuai kebutuhan.", en: "Choose capacity that covers the tool range and confirm clockwise/counterclockwise requirements." } },
      { title: { id: "Manual atau motorized", en: "Manual or motorized" }, description: { id: "Motorized loading membantu menjaga kecepatan dan posisi pembebanan lebih konsisten.", en: "Motorized loading helps maintain more consistent loading speed and position." } },
      { title: { id: "Fixture dan adapter", en: "Fixtures and adapters" }, description: { id: "Socket, bit, reaction arm, dan adapter harus cocok tanpa menambah play yang tidak perlu.", en: "Sockets, bits, reaction arms, and adapters must fit without unnecessary play." } },
      { title: { id: "Judgment dan toleransi", en: "Judgment and tolerance" }, description: { id: "Tentukan apakah operator perlu pass/fail, statistik beberapa kali pembebanan, atau hanya nilai peak.", en: "Decide whether the operator needs pass/fail, statistics across several loads, or only a peak value." } },
      { title: { id: "Data dan traceability", en: "Data and traceability" }, description: { id: "Pastikan output, software, identitas tool, format laporan, dan retensi data sesuai sistem quality.", en: "Align outputs, software, tool identity, report format, and data retention with the quality system." } }
    ],
    products: [
      { href: "/brands/tohnichi/products/dote4-dote4-g", title: { id: "DOTE4/DOTE4-G", en: "DOTE4/DOTE4-G" }, description: { id: "Digital torque-wrench tester dengan color judgment untuk calibration dan adjustment.", en: "Digital torque-wrench tester with color judgment for calibration and adjustment." }, useFor: { id: "Workshop atau calibration room yang menangani torque wrench.", en: "Workshops or calibration rooms handling torque wrenches." }, image: "/assets/brands/products/tohnichi/catalog/tester-checker/dote4-dote4-g.png" },
      { href: "/brands/tohnichi/products/tcc2-tcc2-g", title: { id: "TCC2/TCC2-G", en: "TCC2/TCC2-G" }, description: { id: "Calibrator dan controller untuk calibration torque tool serta data management.", en: "Calibrator and controller for torque-tool calibration and data management." }, useFor: { id: "Sistem yang membutuhkan kontrol terpusat dan histori tool.", en: "Systems requiring centralized control and tool history." }, image: "/assets/brands/products/tohnichi/catalog/tester-checker/tcc2-tcc2-g.jpg" },
      { href: "/brands/tohnichi/products/tdt3-tdt3-g", title: { id: "TDT3/TDT3-G", en: "TDT3/TDT3-G" }, description: { id: "Tester untuk calibration dan adjustment torque screwdriver.", en: "Tester for torque-screwdriver calibration and adjustment." }, useFor: { id: "Torque screwdriver click, rotary-slip, dan tipe terkait.", en: "Click, rotary-slip, and related torque screwdrivers." }, image: "/assets/brands/products/tohnichi/catalog/tester-checker/tdt3-tdt3-g.png" },
      { href: "/brands/tohnichi/products/dot", title: { id: "DOT", en: "DOT" }, description: { id: "Torque-wrench tester untuk calibration dan adjustment.", en: "Torque-wrench tester for calibration and adjustment." }, useFor: { id: "Pemeriksaan torque wrench dengan setup tester dedicated.", en: "Torque-wrench checks with a dedicated tester setup." }, image: "/assets/brands/products/tohnichi/catalog/tester-checker/dot.jpg" },
      { href: "/brands/tohnichi/products/dlc-dlc-g", title: { id: "DLC/DLC-G", en: "DLC/DLC-G" }, description: { id: "Checker torque screwdriver untuk pemeriksaan cepat harian.", en: "Torque-screwdriver checker for quick daily checks." }, useFor: { id: "Verifikasi dekat production line sebelum pekerjaan dimulai.", en: "Near-line verification before production starts." }, image: "/assets/brands/products/tohnichi/catalog/tester-checker/dlc-dlc-g.jpg" }
    ],
    comparison: {
      title: { id: "Tester, checker, atau calibration system?", en: "Tester, checker, or calibration system?" },
      description: { id: "Pilih berdasarkan tujuan pemeriksaan dan siapa yang akan menjalankannya.", en: "Choose based on the purpose of the check and who will perform it." },
      headers: [{ id: "Peralatan", en: "Equipment" }, { id: "Tujuan", en: "Purpose" }, { id: "Lokasi", en: "Location" }, { id: "Hasil", en: "Result" }],
      rows: [
        [{ id: "Checker", en: "Checker" }, { id: "Konfirmasi cepat", en: "Quick confirmation" }, { id: "Dekat line", en: "Near the line" }, { id: "Nilai atau pass/fail", en: "Value or pass/fail" }],
        [{ id: "Tester", en: "Tester" }, { id: "Calibration dan adjustment", en: "Calibration and adjustment" }, { id: "Tool room / lab", en: "Tool room / lab" }, { id: "Serangkaian hasil terkontrol", en: "Controlled series of results" }],
        [{ id: "Calibration system", en: "Calibration system" }, { id: "Kelola banyak tool", en: "Manage many tools" }, { id: "Central calibration", en: "Central calibration" }, { id: "Record, judgment, dan histori", en: "Records, judgment, and history" }]
      ]
    },
    faqs: [
      { question: { id: "Apakah checker dapat menggantikan calibration tester?", en: "Can a checker replace a calibration tester?" }, answer: { id: "Tidak selalu. Checker cocok untuk konfirmasi cepat, sedangkan calibration tester mendukung prosedur pembebanan, adjustment, dan record yang lebih terkontrol.", en: "Not always. A checker suits quick confirmation, while a calibration tester supports more controlled loading, adjustment, and records." } },
      { question: { id: "Mengapa fixture dan adapter penting?", en: "Why do fixtures and adapters matter?" }, answer: { id: "Fixture yang tidak tepat dapat mengubah posisi pembebanan, menambah play, atau membuat hasil kurang repeatable. Setup harus sesuai jenis dan drive tool.", en: "An unsuitable fixture can alter loading position, add play, or reduce repeatability. The setup must match the tool type and drive." } },
      { question: { id: "Data apa yang perlu disiapkan untuk memilih tester?", en: "What information is needed to select a tester?" }, answer: { id: "Daftar tool, range, unit, arah, tipe drive atau bit, jumlah tool, frekuensi check, toleransi, dan kebutuhan export data.", en: "Prepare the tool list, range, unit, direction, drive or bit type, tool quantity, check frequency, tolerance, and data-export needs." } }
    ],
    related: [
      { href: "/solutions/torque-calibration-verification", title: { id: "Program calibration & verification", en: "Calibration and verification program" }, description: { id: "Susun tester, interval, record, dan respons terhadap hasil out-of-tolerance.", en: "Plan testers, intervals, records, and the response to out-of-tolerance results." } },
      { href: "/guides/cara-memilih-torque-tester", title: { id: "Cara memilih torque tester", en: "How to choose a torque tester" }, description: { id: "Checklist dari tool list sampai data output.", en: "A checklist from tool list through data output." } },
      { href: "/guides/mengapa-torque-wrench-perlu-dikalibrasi", title: { id: "Mengapa torque tools perlu dikalibrasi", en: "Why torque tools need calibration" }, description: { id: "Hubungkan risiko proses dengan interval verifikasi.", en: "Connect process risk with verification intervals." } }
    ]
  }
];

export function getCategoryHub(slug: string) {
  return categoryHubs.find((category) => category.slug === slug);
}
