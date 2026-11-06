import type { GuideFlowDefinition } from "@/data/guideflows/types";

const doteImage = "/assets/brands/products/tohnichi/Tohnichi DOTE4.png";
const doteBenchImage = "/assets/brands/products/tohnichi/DOTE100N4-G.jpg";
const clickWrenchImage = "/assets/brands/products/tohnichi/catalog/torque-wrenches/ql-qle2.jpg";
const directReadingImage = "/assets/brands/products/tohnichi/catalog/torque-wrenches/db-dbe-dbr.png";

export const doteCalibrationGuideFlow = {
  slug: "calibrate-torque-wrench-with-dote",
  version: "1.0.0",
  // Review-only content. Do not add this slug to the public buyer-guide registry
  // or route table until its technical and editorial review is approved.
  status: "review",
  lastReviewed: "2026-09-07",
  source: {
    id: "TOHNICHI Digital Torque Wrench Tester DOTE4-G Operating Instruction, bagian 5 dan 7",
    en: "TOHNICHI Digital Torque Wrench Tester DOTE4-G Operating Instruction, sections 5 and 7"
  },
  title: {
    id: "Kalibrasi Torque Wrench dengan DOTE",
    en: "Calibrate a Torque Wrench with DOTE"
  },
  description: {
    id: "Siapkan tester, pilih mode sesuai jenis wrench, jaga geometri pembebanan, lalu simpan dan periksa setiap hasil melalui alur terpandu.",
    en: "Prepare the tester, choose the mode for the wrench type, control the loading geometry, then save and review each result in a guided workflow."
  },
  scope: {
    id: "Untuk seri DOTE4-G dan torque wrench click atau direct-reading yang berada di dalam range tester. Alur ini membantu pengukuran; adjustment wrench, acceptance criteria, traceability, dan penerbitan sertifikat tetap mengikuti prosedur quality Anda.",
    en: "For DOTE4-G testers and click or direct-reading torque wrenches within the tester range. This flow supports measurement; wrench adjustment, acceptance criteria, traceability, and certificate issuance remain governed by your quality procedure."
  },
  estimatedTime: { id: "45-60 menit termasuk stabilisasi", en: "45-60 minutes including stabilization" },
  presentation: {
    contactTopic: "dote-calibration",
    hero: {
      label: { id: "Cakupan", en: "Scope" },
      ariaLabel: { id: "DOTE mengukur torque wrench", en: "DOTE measuring a torque wrench" },
      leftImage: { src: doteImage, alt: { id: "TOHNICHI DOTE4-G", en: "TOHNICHI DOTE4-G" } },
      rightImage: { src: clickWrenchImage, alt: { id: "TOHNICHI click torque wrench", en: "TOHNICHI click torque wrench" } },
      connectorLabel: { id: "Ukur", en: "Measure" },
      connectorIcon: "calibration"
    },
    completion: {
      eyebrow: { id: "Rangkaian pengukuran selesai", en: "Measurement run complete" },
      title: { id: "Hasil siap direview.", en: "Results are ready for review." },
      body: {
        id: "Catat identitas tool dan tester, kondisi lingkungan, arah, target, hasil, judgment, tanggal, serta operator. Terapkan keputusan lulus, adjustment, atau karantina sesuai prosedur quality yang disetujui.",
        en: "Record the tool and tester IDs, environment, direction, target, results, judgment, date, and operator. Apply pass, adjustment, or quarantine decisions under the approved quality procedure."
      }
    }
  },
  stages: [
    { id: "plan", title: { id: "Tentukan metode", en: "Define the method" } },
    { id: "prepare", title: { id: "Siapkan DOTE", en: "Prepare DOTE" } },
    { id: "configure", title: { id: "Set fungsi", en: "Set functions" } },
    { id: "position", title: { id: "Posisikan wrench", en: "Position the wrench" } },
    { id: "measure", title: { id: "Ukur & review", en: "Measure & review" } }
  ],
  tasks: [
    {
      id: "full-calibration",
      title: { id: "Jalankan alur lengkap", en: "Run the full workflow" },
      description: { id: "Mulai dari metode dan kondisi sampai review data.", en: "Start with the method and conditions, then finish with data review." },
      startStepId: "confirm-method"
    },
    {
      id: "set-dote",
      title: { id: "Set mode dan memory", en: "Set mode and memory" },
      description: { id: "Langsung ke fungsi RUN/PEAK, limit, dan penyimpanan.", en: "Jump to RUN/PEAK, limits, and result storage." },
      startStepId: "choose-mode"
    },
    {
      id: "fix-err9",
      title: { id: "Atasi Err9 atau zero gagal", en: "Resolve Err9 or a bad zero" },
      description: { id: "Buka pemeriksaan untuk zero yang tidak stabil.", en: "Open checks for a zero that will not settle." },
      startStepId: "zero-tester",
      issueId: "zero-error"
    }
  ],
  prerequisites: [
    { id: "DOTE4-G dengan kapasitas yang mencakup target torque", en: "A DOTE4-G whose capacity covers the target torque" },
    { id: "Plate, Pole Holder Assembly, adapter atau socket yang sesuai", en: "The correct plate, pole-holder assembly, adapter, or socket" },
    { id: "AC adapter bawaan dan supply AC 100-240 V", en: "The supplied AC adapter and an AC 100-240 V supply" },
    { id: "Identitas wrench, arah uji, target, toleransi, dan jumlah titik", en: "Wrench ID, test direction, targets, tolerances, and number of points" },
    { id: "Workbench kokoh, rata, dan area bebas gangguan", en: "A sturdy, level workbench with a clear work area" },
    { id: "Form atau sistem pencatatan sesuai prosedur quality", en: "A recording form or system approved by quality" }
  ],
  steps: [
    {
      id: "confirm-method",
      stageId: "plan",
      title: { id: "Konfirmasi metode sebelum menyentuh setting", en: "Confirm the method before changing settings" },
      instruction: {
        id: "Catat model, serial number, range, arah, target torque, toleransi, jumlah pengulangan, dan aturan lulus/gagal. Pastikan seluruh target berada di dalam kapasitas DOTE.",
        en: "Record the model, serial number, range, direction, torque targets, tolerances, repetitions, and pass/fail rule. Confirm every target is inside the DOTE capacity."
      },
      expected: { id: "Worksheet lengkap dan tidak ada target di luar range tester.", en: "The worksheet is complete and no target lies outside the tester range." },
      successLabel: { id: "Metode sudah disetujui", en: "The method is approved" },
      helpLabel: { id: "Metode belum lengkap", en: "The method is incomplete" },
      manualRef: "5 / 7-1",
      media: {
        type: "image",
        src: doteImage,
        alt: { id: "Tester torque wrench TOHNICHI DOTE4-G", en: "TOHNICHI DOTE4-G torque wrench tester" },
        hotspot: { x: 54, y: 46, label: { id: "Cocokkan range tester", en: "Match the tester range" } },
        note: { id: "Jangan membuat tolerance dari display DOTE; gunakan acceptance criteria yang disetujui.", en: "Do not invent a tolerance from the DOTE display; use approved acceptance criteria." }
      },
      quickChecks: [
        { id: "Pastikan unit target dan unit tester dapat disamakan.", en: "Confirm the target and tester can use the same unit." },
        { id: "Bedakan kalibrasi, adjustment, dan keputusan release pada record.", en: "Keep calibration, adjustment, and release decisions distinct in the record." }
      ],
      issueIds: ["method-gap", "range-mismatch"]
    },
    {
      id: "control-environment",
      stageId: "plan",
      title: { id: "Stabilkan kondisi pengukuran", en: "Stabilize the measurement conditions" },
      instruction: {
        id: "Gunakan workbench yang kokoh dan horizontal. Jaga suhu ruang antara 18 dan 28°C; selama pekerjaan, batasi perubahannya dalam rentang total 2°C (±1°C dari kondisi awal). Inspeksi tester, kabel, adapter, dan wrench dari kerusakan.",
        en: "Use a sturdy, level workbench. Keep the room between 18 and 28°C and limit drift during the work to a 2°C band (±1°C from the starting condition). Inspect the tester, cable, adapter, and wrench for damage."
      },
      expected: { id: "Kondisi tercatat, alat stabil, dan tidak ada kerusakan yang terlihat.", en: "Conditions are recorded, the equipment is stable, and no visible damage is present." },
      successLabel: { id: "Kondisi siap", en: "Conditions are ready" },
      helpLabel: { id: "Kondisi tidak stabil", en: "Conditions are unstable" },
      manualRef: "7-1-1 / 7-1-2",
      media: {
        type: "image",
        src: doteBenchImage,
        alt: { id: "DOTE terpasang di workbench", en: "DOTE installed on a workbench" },
        fit: "cover",
        hotspot: { x: 47, y: 72, label: { id: "Workbench rata & kokoh", en: "Level, sturdy bench" } }
      },
      quickChecks: [
        { id: "Jangan gunakan unit yang basah, terkontaminasi, atau pernah jatuh sebelum diperiksa.", en: "Do not use a wet, contaminated, or dropped unit before inspection." },
        { id: "Singkirkan benda yang dapat menghalangi plate, handle, atau pole holder.", en: "Clear anything that could obstruct the plate, handle, or pole holder." }
      ],
      issueIds: ["environment", "unsafe-condition"]
    },
    {
      id: "assemble-tester",
      stageId: "prepare",
      title: { id: "Pasang plate dan pole holder", en: "Install the plate and pole holder" },
      instruction: {
        id: "Bersihkan permukaan pemasangan. Dudukkan plate pada DOTE, kencangkan set screw di sisi unit, lalu pasang Pole Holder Assembly pada alur plate.",
        en: "Clean the mounting surfaces. Seat the plate on the DOTE, secure the side set screw, then place the pole-holder assembly in the plate track."
      },
      expected: { id: "Plate terkunci, pole holder bergerak pada alurnya, dan tidak ada kotoran terjepit.", en: "The plate is secured, the pole holder moves along its track, and no debris is trapped." },
      successLabel: { id: "Hardware terpasang", en: "Hardware is installed" },
      helpLabel: { id: "Plate atau holder tidak pas", en: "The plate or holder does not fit" },
      manualRef: "7-3 (1-4)",
      media: {
        type: "image",
        src: doteImage,
        alt: { id: "DOTE4-G dengan plate dan pole holder", en: "DOTE4-G with plate and pole holder" },
        hotspot: { x: 72, y: 46, label: { id: "Plate & pole holder", en: "Plate & pole holder" }, align: "left" },
        note: { id: "Jangan memaksa komponen bila permukaan pemasangan tidak duduk rata.", en: "Do not force a component when its mounting surface will not sit flat." }
      },
      quickChecks: [
        { id: "Periksa serpihan pada inlet drive dan permukaan plate.", en: "Check the inlet drive and plate surfaces for debris." },
        { id: "Pastikan set screw menahan plate tanpa merusak ulir.", en: "Confirm the set screw secures the plate without damaging its thread." }
      ],
      issueIds: ["fixture-fit", "unsafe-condition"]
    },
    {
      id: "power-stabilize",
      stageId: "prepare",
      title: { id: "Hubungkan power lalu tunggu 30 menit", en: "Connect power, then allow 30 minutes" },
      instruction: {
        id: "Dengan switch DOTE pada posisi OFF, hubungkan AC adapter bawaan ke tester lalu ke receptacle. Nyalakan tester dan biarkan powered selama sekurangnya 30 menit sebelum pengukuran.",
        en: "With the DOTE switch OFF, connect the supplied AC adapter to the tester and then to the outlet. Switch the tester on and leave it powered for at least 30 minutes before measuring."
      },
      expected: { id: "Display menyala normal dan waktu stabilisasi 30 menit sudah terpenuhi.", en: "The display starts normally and the full 30-minute stabilization period has elapsed." },
      successLabel: { id: "DOTE sudah stabil", en: "DOTE is stabilized" },
      helpLabel: { id: "DOTE tidak menyala", en: "DOTE will not power on" },
      manualRef: "7-3 (5-6)",
      media: {
        type: "image",
        src: doteImage,
        alt: { id: "Panel dan power DOTE4-G", en: "DOTE4-G panel and power connection" },
        hotspot: { x: 25, y: 48, label: { id: "Power OFF saat menghubungkan", en: "Connect while OFF" } }
      },
      quickChecks: [
        { id: "Gunakan AC adapter yang disertakan untuk unit.", en: "Use the AC adapter supplied for the unit." },
        { id: "Catat waktu power-on agar stabilisasi dapat dibuktikan.", en: "Record the power-on time so stabilization can be verified." }
      ],
      issueIds: ["power", "error-code", "unsafe-condition"]
    },
    {
      id: "choose-mode",
      stageId: "configure",
      title: { id: "Pilih PEAK untuk click atau RUN untuk indicating", en: "Choose PEAK for click or RUN for indicating" },
      instruction: {
        id: "Tekan MD untuk mengganti mode. Gunakan PEAK pada wrench click seperti QL atau SP agar nilai tertinggi tetap tampil setelah load dilepas. Gunakan RUN pada wrench direct-reading seperti CEM, DB, atau F agar display mengikuti perubahan load secara langsung.",
        en: "Press MD to change modes. Use PEAK for click wrenches such as QL or SP so the highest reading remains after release. Use RUN for direct-reading wrenches such as CEM, DB, or F so the display follows the applied load continuously."
      },
      expected: { id: "Penanda segitiga berada di PEAK untuk click atau RUN untuk direct-reading.", en: "The triangular indicator points to PEAK for click or RUN for direct-reading." },
      successLabel: { id: "Mode sudah cocok", en: "The mode matches" },
      helpLabel: { id: "Mode membingungkan", en: "The mode is unclear" },
      manualRef: "5-1 / 5-2 / 7-3 (9)",
      media: {
        type: "image",
        src: doteImage,
        alt: { id: "Panel kontrol DOTE4-G", en: "DOTE4-G control panel" },
        hotspot: { x: 45, y: 49, label: { id: "Tekan MD", en: "Press MD" } },
        note: { id: "Click = PEAK. Direct-reading/indicating = RUN.", en: "Click = PEAK. Direct-reading/indicating = RUN." }
      },
      quickChecks: [
        { id: "Identifikasi mekanisme wrench sebelum memilih mode.", en: "Identify the wrench mechanism before selecting the mode." },
        { id: "Jangan mengandalkan bentuk wrench saja; periksa model dan cara baca hasilnya.", en: "Do not rely on appearance alone; check the model and how its result is read." }
      ],
      issueIds: ["wrong-mode", "button-response"]
    },
    {
      id: "set-result-handling",
      stageId: "configure",
      title: { id: "Tentukan limit dan cara menyimpan hasil", en: "Set limits and result handling" },
      instruction: {
        id: "Jika prosedur memakai judgment DOTE, pilih set upper/lower limit yang sudah disetujui dengan menahan MD selama 2 detik, pilih set dengan tombol panah, lalu konfirmasi memakai STAT. Tentukan manual Memory/Reset atau auto reset yang sudah dikonfigurasi. Jangan menghapus data lama tanpa otorisasi.",
        en: "If the procedure uses DOTE judgment, select the approved upper/lower-limit set by holding MD for 2 seconds, choosing the set with the arrow keys, and confirming with STAT. Use the configured manual Memory/Reset or automatic reset method. Do not delete existing data without authorization."
      },
      expected: { id: "Set limit, unit, dan metode penyimpanan cocok dengan worksheet; data lama sudah diamankan bila perlu.", en: "The limit set, unit, and storage method match the worksheet; existing data is protected when required." },
      successLabel: { id: "Data handling siap", en: "Result handling is ready" },
      helpLabel: { id: "Limit atau memory belum jelas", en: "Limits or memory are unclear" },
      manualRef: "5-3 / 5-4 / 5-5 / 5-6",
      media: {
        type: "image",
        src: doteImage,
        alt: { id: "Display, MD, STAT, dan Memory Reset DOTE", en: "DOTE display, MD, STAT, and Memory Reset controls" },
        hotspot: { x: 52, y: 52, label: { id: "MD · STAT · MEMORY/RESET", en: "MD · STAT · MEMORY/RESET" }, align: "left" },
        note: { id: "Penghapusan data tidak dapat dianggap sebagai langkah rutin; pastikan record yang wajib dipertahankan sudah dipindahkan.", en: "Treat deletion as a controlled action; first preserve every record that must be retained." }
      },
      quickChecks: [
        { id: "OK berarti hasil berada di antara lower dan upper limit, termasuk kedua batas.", en: "OK means the result lies between the lower and upper limits, including both boundaries." },
        { id: "HI berarti di atas upper limit; LO berarti di bawah lower limit.", en: "HI means above the upper limit; LO means below the lower limit." },
        { id: "Pastikan perilaku auto memory/reset telah diuji sebelum run resmi.", en: "Test the automatic memory/reset behavior before the official run." }
      ],
      issueIds: ["method-gap", "data-risk", "button-response"]
    },
    {
      id: "zero-tester",
      stageId: "configure",
      title: { id: "Zero-kan tester tanpa load", en: "Zero the unloaded tester" },
      instruction: {
        id: "Pastikan inlet drive bebas dari torque, lalu tekan C. Lanjutkan hanya setelah display kembali ke nol tanpa pesan error.",
        en: "Remove all torque from the inlet drive, then press C. Continue only after the display returns to zero without an error message."
      },
      expected: { id: "Display menunjukkan nol dan tidak ada load pada drive.", en: "The display shows zero and the drive is unloaded." },
      successLabel: { id: "Zero stabil", en: "Zero is stable" },
      helpLabel: { id: "Err9 atau zero tidak stabil", en: "Err9 or an unstable zero" },
      manualRef: "5-8 / 7-3 (10)",
      media: {
        type: "image",
        src: doteImage,
        alt: { id: "Tombol clear pada DOTE4-G", en: "Clear key on the DOTE4-G" },
        hotspot: { x: 55, y: 42, label: { id: "Tekan C tanpa load", en: "Press C with no load" } }
      },
      quickChecks: [
        { id: "Lepaskan wrench atau gaya samping yang masih membebani drive.", en: "Remove the wrench or any side force still loading the drive." },
        { id: "Jika Err9 tetap tampil setelah zero dan power cycle, hentikan penggunaan.", en: "If Err9 remains after zeroing and a power cycle, stop using the tester." }
      ],
      issueIds: ["zero-error", "error-code", "unsafe-condition"]
    },
    {
      id: "fit-wrench",
      stageId: "position",
      title: { id: "Pilih adapter dan pasang wrench", en: "Choose the adapter and fit the wrench" },
      instruction: {
        id: "Pilih adapter atau socket yang sesuai dengan drive wrench. Pasang sampai interface duduk penuh tanpa celah atau kemiringan yang tidak wajar.",
        en: "Choose the adapter or socket that matches the wrench drive. Fit it fully so the interface has no gap or abnormal tilt."
      },
      expected: { id: "Drive terpasang penuh, tidak longgar, dan target tidak melampaui kapasitas adapter maupun tester.", en: "The drive is fully seated, has no looseness, and the target is within both adapter and tester capacity." },
      successLabel: { id: "Wrench terpasang", en: "The wrench is fitted" },
      helpLabel: { id: "Adapter tidak cocok", en: "The adapter does not match" },
      manualRef: "7-3 (8)",
      media: {
        type: "image",
        src: clickWrenchImage,
        alt: { id: "Torque wrench click TOHNICHI", en: "TOHNICHI click torque wrench" },
        hotspot: { x: 22, y: 54, label: { id: "Cocokkan drive", en: "Match the drive" } }
      },
      quickChecks: [
        { id: "Bandingkan ukuran square drive wrench, adapter, dan inlet.", en: "Compare the square-drive sizes of the wrench, adapter, and inlet." },
        { id: "Jangan menyusun adapter tambahan yang menambah kelonggaran.", en: "Do not stack unnecessary adapters that add play." }
      ],
      issueIds: ["fixture-fit", "range-mismatch"]
    },
    {
      id: "align-loading-point",
      stageId: "position",
      title: { id: "Atur effective length dan posisi horizontal", en: "Set effective length and horizontal alignment" },
      instruction: {
        id: "Geser pole holder ke effective length wrench, lalu atur tinggi support sampai wrench horizontal. Tempatkan support di pusat grip atau loading mark yang ditentukan dan pastikan stroke pengukuran cukup sebelum mulai.",
        en: "Slide the pole holder to the wrench's effective length, then adjust its height until the wrench is horizontal. Support the center of the grip or the specified loading mark and confirm adequate measuring stroke before starting."
      },
      expected: { id: "Wrench lurus, titik load benar, handle tidak terjepit, dan stroke tersedia sampai target.", en: "The wrench is level, the loading point is correct, the handle is not clamped, and sufficient stroke remains to reach the target." },
      successLabel: { id: "Geometri sudah benar", en: "Geometry is correct" },
      helpLabel: { id: "Wrench miring atau tidak pas", en: "The wrench is tilted or misaligned" },
      manualRef: "7-1-2 (5) / 7-3 (11-12)",
      media: {
        type: "image",
        src: doteBenchImage,
        alt: { id: "Torque wrench diposisikan pada DOTE", en: "Torque wrench positioned on DOTE" },
        fit: "cover",
        hotspot: { x: 67, y: 48, label: { id: "Support di pusat grip", en: "Support at grip center" }, align: "left" },
        note: { id: "Kesalahan effective length atau sudut load dapat menggeser hasil walaupun display terlihat stabil.", en: "An incorrect effective length or loading angle can bias the result even when the display looks stable." }
      },
      quickChecks: [
        { id: "Gunakan loading mark pada wrench bila tersedia.", en: "Use the wrench loading mark when one is provided." },
        { id: "Pastikan gaya diterapkan tanpa dorongan menyamping.", en: "Make sure the force is applied without side thrust." }
      ],
      issueIds: ["geometry", "fixture-fit"]
    },
    {
      id: "condition-wrench",
      stageId: "position",
      title: { id: "Lakukan warm-up wrench", en: "Condition the wrench" },
      instruction: {
        id: "Untuk wrench click, lakukan lima pembebanan sampai torque maksimum model pada kedua arah yang akan diuji. Untuk direct-reading, lakukan satu pembebanan maksimum pada kedua arah, lalu pastikan pointer atau display kembali ke nol.",
        en: "For a click wrench, apply five full-range conditioning loads in both test directions. For a direct-reading wrench, apply one full-range load in each direction, then verify that its pointer or display returns to zero."
      },
      expected: { id: "Warm-up selesai dan wrench kembali ke kondisi tanpa load; indicating wrench kembali ke nol.", en: "Conditioning is complete and the wrench is unloaded; an indicating wrench has returned to zero." },
      successLabel: { id: "Warm-up selesai", en: "Conditioning is complete" },
      helpLabel: { id: "Wrench tidak kembali ke zero", en: "The wrench does not return to zero" },
      manualRef: "7-1-2 (3-4)",
      media: {
        type: "image",
        src: directReadingImage,
        alt: { id: "Direct-reading torque wrench TOHNICHI", en: "TOHNICHI direct-reading torque wrench" },
        hotspot: { x: 28, y: 42, label: { id: "Cek kembali ke zero", en: "Check return to zero" } }
      },
      quickChecks: [
        { id: "Jangan mencatat warm-up sebagai hasil kalibrasi resmi.", en: "Do not record conditioning pulls as official calibration results." },
        { id: "Bebaskan load sepenuhnya di antara setiap siklus.", en: "Fully unload between each conditioning cycle." }
      ],
      issueIds: ["wrench-zero", "range-mismatch", "repeatability"]
    },
    {
      id: "apply-load",
      stageId: "measure",
      title: { id: "Terapkan load dengan teknik yang sesuai", en: "Apply load with the correct technique" },
      instruction: {
        id: "Click wrench: dekati 80% target, lalu selesaikan 20% terakhir secara halus selama 1-3 detik sampai mekanisme click. Bila wrench adjustable, dekati target setting dari nilai lebih rendah. Direct-reading: naikkan load perlahan menuju titik ukur tanpa melewati target; bila terlewat, lepaskan sampai nol dan ulangi dari awal.",
        en: "Click wrench: approach 80% of target, then apply the final 20% smoothly over 1-3 seconds until the mechanism clicks. For an adjustable wrench, approach the setting from below. Direct-reading: increase load slowly toward the point without overshooting; if you pass it, unload to zero and restart the pull."
      },
      expected: { id: "Load naik terkendali, geometri tetap lurus, dan target dicapai tanpa shock atau overshoot.", en: "Load rises under control, alignment stays true, and the target is reached without shock or overshoot." },
      successLabel: { id: "Pembebanan valid", en: "The pull is valid" },
      helpLabel: { id: "Overshoot atau load tidak mulus", en: "Overshoot or uneven loading" },
      manualRef: "7-2 / 7-3 (13)",
      media: {
        type: "image",
        src: doteBenchImage,
        alt: { id: "Pengoperasian handwheel DOTE", en: "Operating the DOTE handwheel" },
        fit: "cover",
        hotspot: { x: 38, y: 61, label: { id: "Putar halus & merata", en: "Turn smoothly" } },
        note: { id: "Display yang berkedip menandakan over-torque; hentikan pembebanan dan periksa kapasitas.", en: "A flashing display signals over-torque; stop loading and verify capacity." }
      },
      quickChecks: [
        { id: "Jangan hentakkan handwheel untuk memicu click.", en: "Do not jerk the handwheel to trigger the click." },
        { id: "Pada direct-reading, baca skala atau dial tegak lurus untuk menghindari parallax.", en: "For direct-reading tools, view the scale or dial straight on to avoid parallax." }
      ],
      issueIds: ["over-torque", "geometry", "repeatability"]
    },
    {
      id: "store-result",
      stageId: "measure",
      title: { id: "Simpan hasil dan baca judgment", en: "Store the result and read the judgment" },
      instruction: {
        id: "Click wrench: setelah click, lepaskan load. Pada mode manual tekan MEMORY/RESET untuk menyimpan; pada auto memory/reset, pastikan tester menyimpan setelah load turun. Direct-reading: saat titik ukur tercapai, tekan MEMORY/RESET lalu lepaskan load. Catat nilai serta status OK, HI, atau LO.",
        en: "Click wrench: after the click, release the load. In manual operation press MEMORY/RESET to store it; with automatic memory/reset, verify that storage occurs after unloading. Direct-reading: at the measuring point, press MEMORY/RESET, then unload. Record the value and its OK, HI, or LO status."
      },
      expected: { id: "Counter maju satu, hasil tersimpan satu kali, dan judgment cocok dengan limit aktif.", en: "The counter advances once, one result is stored, and the judgment matches the active limits." },
      successLabel: { id: "Hasil tersimpan", en: "The result is stored" },
      helpLabel: { id: "Counter atau judgment salah", en: "Counter or judgment is wrong" },
      manualRef: "5-4 / 5-5 / 7-3 (14-15)",
      media: {
        type: "image",
        src: doteImage,
        alt: { id: "Memory Reset dan display DOTE", en: "DOTE Memory Reset control and display" },
        hotspot: { x: 39, y: 60, label: { id: "MEMORY/RESET", en: "MEMORY/RESET" } }
      },
      quickChecks: [
        { id: "Pastikan satu pembebanan menghasilkan satu record, bukan dua.", en: "Confirm one pull creates one record, not two." },
        { id: "Status warna hanya membantu; record tetap harus memuat nilai numerik dan limit yang digunakan.", en: "Color is only an aid; the record still needs the numeric value and the limits used." }
      ],
      issueIds: ["wrong-mode", "data-risk", "result-ng"]
    },
    {
      id: "review-run",
      stageId: "measure",
      title: { id: "Ulangi lalu review n, HI, Lo, dan Av", en: "Repeat, then review n, HI, Lo, and Av" },
      instruction: {
        id: "Ulangi pembebanan sesuai jumlah yang disetujui. Untuk ringkasan di DOTE, tampilkan hasil terakhir dengan tombol panah, tekan STAT sampai Stt, pilih hasil pertama, lalu gunakan STAT untuk meninjau jumlah sampel, nilai tertinggi, nilai terendah, dan rata-rata. Salin hasil ke record resmi.",
        en: "Repeat the pull for the approved sample count. To review a DOTE summary, display the last result with the arrow keys, press STAT until Stt appears, select the first result, then use STAT to review sample count, maximum, minimum, and mean. Transfer the results to the official record."
      },
      expected: { id: "Jumlah sampel benar, tidak ada record ganda, dan ringkasan cocok dengan hasil yang dicatat.", en: "The sample count is correct, no result is duplicated, and the summary agrees with the recorded values." },
      successLabel: { id: "Run selesai dan direview", en: "The run is reviewed" },
      helpLabel: { id: "Hasil tidak konsisten", en: "Results are inconsistent" },
      manualRef: "5-7 / 7-3 (16)",
      media: {
        type: "image",
        src: doteImage,
        alt: { id: "Tombol STAT pada DOTE4-G", en: "STAT key on the DOTE4-G" },
        hotspot: { x: 52, y: 49, label: { id: "STAT untuk ringkasan", en: "STAT for summary" }, align: "left" },
        note: { id: "Ringkasan DOTE mendukung review, tetapi tidak menggantikan persyaratan traceability dan approval organisasi Anda.", en: "The DOTE summary supports review but does not replace your organization's traceability and approval requirements." }
      },
      quickChecks: [
        { id: "Bandingkan n dengan jumlah pembebanan valid.", en: "Compare n with the number of valid pulls." },
        { id: "Selidiki spread yang tidak wajar sebelum menyatakan run selesai.", en: "Investigate an unusual spread before closing the run." },
        { id: "Jangan menghapus hasil sampai retention atau transfer data dikonfirmasi.", en: "Do not delete results until retention or transfer is confirmed." }
      ],
      issueIds: ["repeatability", "data-risk", "result-ng"]
    }
  ],
  issues: [
    {
      id: "method-gap",
      label: { id: "Metode belum lengkap", en: "Method is incomplete" },
      title: { id: "Acceptance criteria belum siap", en: "Acceptance criteria are not ready" },
      summary: { id: "Jangan mulai run resmi sebelum target, toleransi, titik, arah, dan jumlah sampel disetujui.", en: "Do not start an official run until targets, tolerances, points, directions, and sample count are approved." },
      checks: [
        { title: { id: "Worksheet", en: "Worksheet" }, body: { id: "Isi tool ID, model, range, target, arah, unit, tolerance, dan jumlah pengulangan.", en: "Enter tool ID, model, range, targets, directions, unit, tolerance, and repetitions." } },
        { title: { id: "Approval", en: "Approval" }, body: { id: "Minta quality atau metrology mengesahkan metode dan keputusan lulus/gagal.", en: "Have quality or metrology approve the method and pass/fail rule." } },
        { title: { id: "Scope", en: "Scope" }, body: { id: "Pisahkan pengukuran DOTE dari instruksi adjustment khusus model wrench.", en: "Keep DOTE measurement separate from model-specific wrench adjustment instructions." } }
      ]
    },
    {
      id: "range-mismatch",
      label: { id: "Target di luar range", en: "Target is outside range" },
      title: { id: "Tester, adapter, atau wrench tidak cocok", en: "Tester, adapter, or wrench range is unsuitable" },
      summary: { id: "Seluruh load path harus memiliki kapasitas yang sesuai target.", en: "Every part of the load path must be rated for the target." },
      checks: [
        { title: { id: "DOTE", en: "DOTE" }, body: { id: "Bandingkan target tertinggi dengan range model DOTE.", en: "Compare the highest target with the DOTE model range." } },
        { title: { id: "Adapter", en: "Adapter" }, body: { id: "Konfirmasi drive size, kapasitas, dan kondisi adapter atau socket.", en: "Confirm the drive size, capacity, and condition of the adapter or socket." } },
        { title: { id: "Stop", en: "Stop" }, body: { id: "Jangan mencoba mencapai target di luar kapasitas; pilih setup yang sesuai.", en: "Do not attempt an out-of-capacity target; select a suitable setup." } }
      ]
    },
    {
      id: "environment",
      label: { id: "Suhu berubah", en: "Temperature is drifting" },
      title: { id: "Kondisi ruangan belum stabil", en: "Room conditions are not stable" },
      summary: { id: "Stabilkan kondisi sebelum memulai atau melanjutkan hasil resmi.", en: "Stabilize the conditions before starting or continuing official results." },
      checks: [
        { title: { id: "Ukur", en: "Measure" }, body: { id: "Catat suhu aktual dan perubahannya sejak awal pekerjaan.", en: "Record the current temperature and its change since the work began." } },
        { title: { id: "Tunggu", en: "Wait" }, body: { id: "Biarkan tester dan wrench mencapai kondisi ruangan yang stabil.", en: "Allow the tester and wrench to reach stable room conditions." } },
        { title: { id: "Restart run", en: "Restart the run" }, body: { id: "Jika kondisi keluar dari batas metode, tandai hasil terdampak dan ulangi setelah stabil.", en: "If conditions leave the method limits, flag affected results and repeat them after stabilization." } }
      ]
    },
    {
      id: "unsafe-condition",
      label: { id: "Kondisi tidak aman", en: "Unsafe condition" },
      title: { id: "Hentikan dan isolasi equipment", en: "Stop and isolate the equipment" },
      summary: { id: "Kerusakan, cairan, bau, panas, atau bunyi abnormal memerlukan penghentian segera.", en: "Damage, liquid ingress, odor, heat, or abnormal noise requires an immediate stop." },
      checks: [
        { title: { id: "Lepaskan load", en: "Unload" }, body: { id: "Kembalikan handwheel dengan terkendali sampai seluruh torque terlepas.", en: "Return the handwheel under control until all torque is removed." } },
        { title: { id: "Power off", en: "Power off" }, body: { id: "Matikan DOTE dan cabut AC adapter bila aman dilakukan.", en: "Switch off the DOTE and disconnect the AC adapter when safe." } },
        { title: { id: "Karantina", en: "Quarantine" }, body: { id: "Beri label pada unit dan minta inspeksi; jangan membongkar tester.", en: "Label the unit and request inspection; do not disassemble the tester." } }
      ]
    },
    {
      id: "fixture-fit",
      label: { id: "Fixture tidak pas", en: "Fixture does not fit" },
      title: { id: "Plate, holder, atau adapter tidak duduk benar", en: "The plate, holder, or adapter is not seated correctly" },
      summary: { id: "Jangan memaksa komponen karena geometri dan keselamatan load path dapat terganggu.", en: "Do not force components because load-path geometry and safety may be compromised." },
      checks: [
        { title: { id: "Bersihkan", en: "Clean" }, body: { id: "Lepaskan load dan power, lalu bersihkan permukaan pemasangan.", en: "Remove load and power, then clean the mounting surfaces." } },
        { title: { id: "Cocokkan", en: "Match" }, body: { id: "Periksa part number, drive size, orientasi, dan kapasitas.", en: "Check part number, drive size, orientation, and capacity." } },
        { title: { id: "Inspeksi", en: "Inspect" }, body: { id: "Hentikan bila ada ulir rusak, deformasi, atau kelonggaran.", en: "Stop if threads are damaged or if deformation or looseness is present." } }
      ]
    },
    {
      id: "power",
      label: { id: "Tidak ada display", en: "No display" },
      title: { id: "DOTE tidak menerima power", en: "DOTE is not receiving power" },
      summary: { id: "Periksa sumber power tanpa membuka atau memodifikasi tester.", en: "Check the power source without opening or modifying the tester." },
      checks: [
        { title: { id: "Adapter", en: "Adapter" }, body: { id: "Pastikan adapter bawaan tersambung penuh dan tidak rusak.", en: "Confirm the supplied adapter is fully connected and undamaged." } },
        { title: { id: "Receptacle", en: "Outlet" }, body: { id: "Verifikasi receptacle dan supply sesuai rating menggunakan cara aman.", en: "Verify the outlet and supply against the rating using a safe method." } },
        { title: { id: "Service", en: "Service" }, body: { id: "Jika display tetap mati, lepaskan unit dari penggunaan dan hubungi CSE.", en: "If the display remains off, remove the unit from service and contact CSE." } }
      ]
    },
    {
      id: "error-code",
      label: { id: "Kode error tampil", en: "An error code appears" },
      title: { id: "Self-diagnosis mendeteksi masalah", en: "Self-diagnosis detected a problem" },
      summary: { id: "Catat kode persis sebelum reset atau power cycle.", en: "Record the exact code before resetting or cycling power." },
      checks: [
        { title: { id: "Catat", en: "Record" }, body: { id: "Foto display dan catat kondisi load saat pesan muncul.", en: "Photograph the display and note the load condition when it appeared." } },
        { title: { id: "Err9", en: "Err9" }, body: { id: "Gunakan Fix Path zero: hilangkan load, tekan C, lalu power cycle hanya bila pesan tetap ada.", en: "Use the zero Fix Path: remove load, press C, then power-cycle only if the message remains." } },
        { title: { id: "Kode lain", en: "Other code" }, body: { id: "Hentikan run dan gunakan tabel error manual atau minta dukungan CSE.", en: "Stop the run and consult the manual error table or request CSE support." } }
      ]
    },
    {
      id: "button-response",
      label: { id: "Tombol tidak merespons", en: "A key does not respond" },
      title: { id: "DOTE tidak berada pada layar yang diharapkan", en: "DOTE is not on the expected screen" },
      summary: { id: "Kembali ke measurement screen tanpa load, lalu ulangi input satu per satu.", en: "Return to the unloaded measurement screen, then repeat the inputs one at a time." },
      checks: [
        { title: { id: "Bebaskan load", en: "Unload" }, body: { id: "Pastikan drive tidak sedang menerima torque.", en: "Confirm the drive is not under torque." } },
        { title: { id: "Kembali", en: "Return" }, body: { id: "Keluar ke measurement screen, lalu ulangi urutan tombol dan durasinya.", en: "Return to the measurement screen, then repeat the key sequence and timing." } },
        { title: { id: "Kerusakan", en: "Damage" }, body: { id: "Jika tombol macet atau rusak, hentikan penggunaan dan minta inspeksi.", en: "If a key is stuck or damaged, stop using the unit and request inspection." } }
      ]
    },
    {
      id: "wrong-mode",
      label: { id: "Hasil tidak tertahan / tidak live", en: "Reading does not hold / is not live" },
      title: { id: "Mode pengukuran tidak cocok dengan wrench", en: "The measurement mode does not match the wrench" },
      summary: { id: "PEAK menahan nilai maksimum; RUN mengikuti load secara kontinu.", en: "PEAK retains the maximum; RUN follows load continuously." },
      checks: [
        { title: { id: "Click", en: "Click" }, body: { id: "Pilih PEAK bila hasil perlu tertahan setelah mekanisme click dan load dilepas.", en: "Choose PEAK when the result must remain after the click and unloading." } },
        { title: { id: "Direct-reading", en: "Direct-reading" }, body: { id: "Pilih RUN bila nilai harus bergerak bersama load saat titik ukur didekati.", en: "Choose RUN when the value must track the load while approaching the point." } },
        { title: { id: "Ulangi", en: "Repeat" }, body: { id: "Batalkan hasil dari mode yang salah, zero-kan tanpa load, lalu ulangi pembebanan.", en: "Invalidate the wrong-mode result, zero without load, then repeat the pull." } }
      ]
    },
    {
      id: "data-risk",
      label: { id: "Data bisa hilang atau ganda", en: "Data may be lost or duplicated" },
      title: { id: "Kontrol memory sebelum melanjutkan", en: "Control the memory before continuing" },
      summary: { id: "Pastikan setiap pull valid menghasilkan tepat satu record dan data lama tetap terlindungi.", en: "Ensure each valid pull creates exactly one record and prior data remains protected." },
      checks: [
        { title: { id: "Counter", en: "Counter" }, body: { id: "Catat counter awal dan cek kenaikan satu per pull.", en: "Record the starting counter and verify an increment of one per pull." } },
        { title: { id: "Mode reset", en: "Reset mode" }, body: { id: "Uji manual atau auto memory/reset dengan satu pembebanan percobaan.", en: "Test manual or automatic memory/reset with one trial pull." } },
        { title: { id: "Jangan hapus", en: "Do not delete" }, body: { id: "Pindahkan dan verifikasi data yang wajib disimpan sebelum melakukan deletion apa pun.", en: "Transfer and verify required records before performing any deletion." } }
      ]
    },
    {
      id: "zero-error",
      label: { id: "Err9 tetap tampil", en: "Err9 remains" },
      title: { id: "Zero tidak dapat dipulihkan", en: "Zero cannot be restored" },
      summary: { id: "Err9 saat zero biasanya berarti drive masih terbebani atau tester perlu diperiksa.", en: "Err9 during zero usually means the drive is still loaded or the tester needs inspection." },
      checks: [
        { title: { id: "Hilangkan load", en: "Remove load" }, body: { id: "Lepaskan wrench dan semua gaya dari inlet drive, lalu tekan C.", en: "Remove the wrench and all force from the inlet drive, then press C." } },
        { title: { id: "Power cycle", en: "Power cycle" }, body: { id: "Jika pesan masih ada, matikan lalu nyalakan kembali tanpa load.", en: "If the message remains, switch off and on again with no load." } },
        { title: { id: "Stop", en: "Stop" }, body: { id: "Jika Err9 muncul kembali, hentikan penggunaan; sensor atau rangkaian dapat bermasalah.", en: "If Err9 returns, stop using the tester; the sensor or electronics may be faulty." } }
      ]
    },
    {
      id: "geometry",
      label: { id: "Posisi berubah saat load", en: "Position shifts under load" },
      title: { id: "Geometri pembebanan tidak stabil", en: "Loading geometry is unstable" },
      summary: { id: "Perbaiki effective length, ketinggian, dan titik support sebelum mengulang.", en: "Correct effective length, height, and support point before repeating." },
      checks: [
        { title: { id: "Horizontal", en: "Horizontal" }, body: { id: "Atur tinggi pole holder sampai wrench rata sepanjang stroke.", en: "Adjust pole-holder height so the wrench stays level through the stroke." } },
        { title: { id: "Loading point", en: "Loading point" }, body: { id: "Letakkan support di pusat grip atau loading mark yang ditentukan.", en: "Place the support at the center of the grip or specified loading mark." } },
        { title: { id: "Side load", en: "Side load" }, body: { id: "Hilangkan dorongan menyamping, contact yang mengganjal, dan clamp pada handle.", en: "Remove side thrust, obstructing contact, and any clamp on the handle." } }
      ]
    },
    {
      id: "wrench-zero",
      label: { id: "Wrench tidak kembali ke zero", en: "Wrench will not return to zero" },
      title: { id: "Direct-reading wrench belum siap diukur", en: "The direct-reading wrench is not ready to measure" },
      summary: { id: "Jangan mengoreksi offset secara informal atau melanjutkan run seolah-olah normal.", en: "Do not informally compensate for an offset or continue as though it were normal." },
      checks: [
        { title: { id: "Unload", en: "Unload" }, body: { id: "Pastikan wrench bebas dari gaya dan tidak menyentuh support secara menekan.", en: "Make sure the wrench is free of force and not pressing against the support." } },
        { title: { id: "Warm-up ulang", en: "Repeat conditioning" }, body: { id: "Ulangi conditioning yang disyaratkan lalu periksa zero lagi.", en: "Repeat the required conditioning, then check zero again." } },
        { title: { id: "Karantina", en: "Quarantine" }, body: { id: "Jika pointer atau display tetap offset, hentikan dan serahkan untuk inspeksi atau adjustment resmi.", en: "If the pointer or display remains offset, stop and submit it for inspection or authorized adjustment." } }
      ]
    },
    {
      id: "over-torque",
      label: { id: "Display berkedip", en: "The display flashes" },
      title: { id: "Peringatan over-torque aktif", en: "The over-torque warning is active" },
      summary: { id: "Display berkedip saat load melewati 110% kapasitas maksimum tester.", en: "The display flashes when load exceeds 110% of the tester's maximum capacity." },
      checks: [
        { title: { id: "Lepaskan", en: "Unload" }, body: { id: "Kurangi load secara terkendali sampai nol; jangan memutar lebih jauh.", en: "Reduce load under control to zero; do not turn farther." } },
        { title: { id: "Periksa kapasitas", en: "Check capacity" }, body: { id: "Bandingkan target, setting wrench, adapter, dan model DOTE.", en: "Compare the target, wrench setting, adapter, and DOTE model." } },
        { title: { id: "Inspeksi", en: "Inspect" }, body: { id: "Tandai kejadian dan ikuti prosedur inspeksi setelah overload sebelum melanjutkan.", en: "Record the event and follow the post-overload inspection procedure before continuing." } }
      ]
    },
    {
      id: "repeatability",
      label: { id: "Hasil menyebar", en: "Results are scattered" },
      title: { id: "Pengulangan belum konsisten", en: "Repeated results are not consistent" },
      summary: { id: "Pisahkan variasi teknik, geometri, wrench, dan tester sebelum mengambil keputusan.", en: "Separate technique, geometry, wrench, and tester variation before deciding the outcome." },
      checks: [
        { title: { id: "Teknik", en: "Technique" }, body: { id: "Gunakan operator, arah, kecepatan, dan pendekatan target yang konsisten.", en: "Use consistent operator technique, direction, speed, and target approach." } },
        { title: { id: "Geometri", en: "Geometry" }, body: { id: "Periksa horizontal, effective length, loading point, dan kelonggaran adapter.", en: "Check level, effective length, loading point, and adapter play." } },
        { title: { id: "Pisahkan sumber", en: "Isolate the source" }, body: { id: "Uji dengan wrench atau standard lain yang diketahui bila prosedur mengizinkan, lalu minta review metrology.", en: "Use another known wrench or standard when the procedure permits, then request metrology review." } }
      ]
    },
    {
      id: "result-ng",
      label: { id: "HI, LO, atau hasil NG", en: "HI, LO, or an NG result" },
      title: { id: "Hasil berada di luar limit aktif", en: "The result is outside the active limits" },
      summary: { id: "Jangan langsung mengubah wrench sebelum memastikan setup dan limit benar.", en: "Do not adjust the wrench until the setup and active limits have been verified." },
      checks: [
        { title: { id: "Limit & unit", en: "Limits & unit" }, body: { id: "Cocokkan set limit aktif dan unit dengan worksheet yang disetujui.", en: "Match the active limit set and unit to the approved worksheet." } },
        { title: { id: "Setup", en: "Setup" }, body: { id: "Periksa mode, zero, adapter, effective length, posisi, dan teknik pembebanan.", en: "Check mode, zero, adapter, effective length, position, and loading technique." } },
        { title: { id: "Reaction plan", en: "Reaction plan" }, body: { id: "Jika hasil valid tetap NG, karantina wrench dan ikuti prosedur adjustment atau out-of-tolerance.", en: "If a valid result remains NG, quarantine the wrench and follow the adjustment or out-of-tolerance procedure." } }
      ]
    }
  ]
} satisfies GuideFlowDefinition;
