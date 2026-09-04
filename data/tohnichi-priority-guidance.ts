import type { TohnichiPriorityProductSlug } from "@/data/tohnichi-seo";
import type { LocalizedText } from "@/lib/i18n";

export type TohnichiPriorityGuidance = {
  bestFor: LocalizedText;
  decision: LocalizedText;
  chooseBy: LocalizedText[];
  rfqChecklist: LocalizedText[];
};

const localized = (id: string, en: string): LocalizedText => ({ id, en });

/**
 * Buyer-facing selection context for every TOHNICHI family promoted for indexing.
 * The guidance is derived from the official applications, features, and model
 * tables stored in `tohnichi-specifications.json`; it does not add price,
 * availability, certification, or compatibility claims.
 */
export const TOHNICHI_PRIORITY_GUIDANCE = {
  "ql-qle2": {
    bestFor: localized(
      "Pengencangan umum dengan target torsi yang berubah, dari pekerjaan assembly sampai maintenance, ketika ratchet head tetap sesuai dengan akses fastener.",
      "General tightening with changing torque targets, from assembly to maintenance, where a fixed ratchet head suits the fastener access."
    ),
    decision: localized(
      "Pilih QL/QLE2 ketika fleksibilitas setelan lebih penting daripada mengunci satu nilai. Untuk satu target berulang di lini produksi, bandingkan dengan keluarga preset seperti QSP.",
      "Choose QL/QLE2 when setting flexibility matters more than locking one value. For one repeated production target, compare a preset family such as QSP."
    ),
    chooseBy: [
      localized("Tempatkan target di dalam rentang kerja model dan gunakan satuan yang sama dengan spesifikasi proses.", "Place the target inside the model's working range and use the same unit as the process specification."),
      localized("Cocokkan square drive, ukuran socket, swing ratchet, dan ruang di sekitar fastener.", "Match the square drive, socket size, ratchet swing, and clearance around the fastener."),
      localized("Bandingkan panjang efektif, gaya tangan maksimum, berat, dan kebutuhan extension handle untuk pekerjaan bertorsi besar.", "Compare effective length, maximum hand force, weight, and extension-handle needs for higher-torque work.")
    ],
    rfqChecklist: [
      localized("Target torsi, toleransi, dan satuan", "Torque target, tolerance, and unit"),
      localized("Jenis fastener, ukuran socket, dan square drive", "Fastener, socket size, and square drive"),
      localized("Ruang akses dan frekuensi perubahan setelan", "Available clearance and setting-change frequency"),
      localized("Kuantitas tool dan kebutuhan kalibrasi atau verifikasi", "Tool quantity and calibration or verification needs")
    ]
  },
  ql: {
    bestFor: localized(
      "Pengencangan bertorsi rendah di area dengan swing arc, lebar, atau tinggi yang terbatas, ketika operator tetap membutuhkan setelan adjustable.",
      "Low-torque tightening where swing arc, width, or height is restricted and the operator still needs an adjustable setting."
    ),
    decision: localized(
      "QL+ memprioritaskan bentuk ringkas, skala yang mudah dibaca, dan ratchet 48 gigi. Gunakan QL/QLE2 bila kebutuhan range lebih luas atau konfigurasi standar sudah memadai.",
      "QL+ prioritizes a compact form, readable scale, and 48-tooth ratchet. Use QL/QLE2 when a broader range or conventional configuration is more suitable."
    ),
    chooseBy: [
      localized("Pastikan target berada di antara nilai minimum dan maksimum model QL+ yang dipilih.", "Confirm the target sits between the minimum and maximum values of the selected QL+ model."),
      localized("Ukur clearance kepala, tinggi tool, dan swing yang tersedia pada posisi pengencangan.", "Measure head clearance, tool height, and the swing available at the tightening position."),
      localized("Periksa square drive, ukuran socket, berat, dan kenyamanan skala untuk operator.", "Check the square drive, socket size, weight, and scale visibility for the operator.")
    ],
    rfqChecklist: [
      localized("Target torsi dan satuan", "Torque target and unit"),
      localized("Batas ruang di sekitar baut atau mur", "Clearance limits around the bolt or nut"),
      localized("Ukuran socket dan square drive", "Socket size and square drive"),
      localized("Frekuensi kerja dan jumlah tool", "Operating frequency and tool quantity")
    ]
  },
  "qsp-qsp-mh": {
    bestFor: localized(
      "Assembly massal atau pemasangan anchor bolt dengan satu target torsi berulang yang tidak boleh diubah bebas oleh operator.",
      "Mass-production assembly or anchor-bolt installation with one repeated torque target that operators should not change freely."
    ),
    decision: localized(
      "QSP/QSP-MH adalah preset click wrench. Pilih keluarga ini untuk standardisasi workstation; pilih QL bila operator memang perlu mengganti target melalui skala.",
      "QSP/QSP-MH is a preset click wrench. Choose it to standardize a workstation; choose QL when operators genuinely need to change targets on a scale."
    ),
    chooseBy: [
      localized("Tetapkan satu target, toleransi proses, dan siapa yang berwenang melakukan setting ulang.", "Define one target, the process tolerance, and who is authorized to reset the tool."),
      localized("Cocokkan square drive, socket, ukuran bolt, dan swing ratchet dengan workstation.", "Match the square drive, socket, bolt size, and ratchet swing to the workstation."),
      localized("Tentukan kebutuhan setting tool, identifikasi tool, dan interval verifikasi.", "Define the setting-tool, tool-identification, and verification-interval requirements.")
    ],
    rfqChecklist: [
      localized("Nilai preset dan toleransi", "Preset value and tolerance"),
      localized("Fastener, socket, dan square drive", "Fastener, socket, and square drive"),
      localized("Jumlah workstation dan tool cadangan", "Number of workstations and spare tools"),
      localized("Metode setting serta pemeriksaan berkala", "Setting method and periodic checks")
    ]
  },
  "cl-cle2": {
    bestFor: localized(
      "Proses yang membutuhkan satu torque-wrench body dengan beberapa bentuk head seperti ratchet, open end, ring, atau hex.",
      "Processes that need one torque-wrench body with several head forms such as ratchet, open end, ring, or hex."
    ),
    decision: localized(
      "Pilih CL/CLE2 bila akses atau profil fastener membutuhkan interchangeable head dan target perlu adjustable. Gunakan QL/QLE2 jika ratchet head tetap sudah mencukupi.",
      "Choose CL/CLE2 when access or fastener profile requires interchangeable heads and the target must remain adjustable. Use QL/QLE2 if a fixed ratchet head is sufficient."
    ),
    chooseBy: [
      localized("Cocokkan target torsi dengan range body serta ukuran diameter root head yang kompatibel.", "Match the torque target to the body range and the compatible head root diameter."),
      localized("Tentukan bentuk, ukuran, dan orientasi head dari fastener serta clearance aktual.", "Define the head form, size, and orientation from the fastener and actual clearance."),
      localized("Konfirmasikan panjang efektif kombinasi body dan head sebelum menetapkan model akhir.", "Confirm the effective length of the body-and-head combination before finalizing the model.")
    ],
    rfqChecklist: [
      localized("Target torsi, toleransi, dan satuan", "Torque target, tolerance, and unit"),
      localized("Bentuk dan ukuran head yang dibutuhkan", "Required head form and size"),
      localized("Foto atau dimensi ruang akses", "Photo or dimensions of the available access"),
      localized("Jumlah body dan jumlah setiap head", "Quantity of bodies and each head")
    ]
  },
  rtd: {
    bestFor: localized(
      "Pengencangan sekrup kecil dengan target yang berubah, ketika mekanisme rotary-slip diperlukan untuk membantu membatasi over-torque.",
      "Small-screw tightening with changing targets where a rotary-slip mechanism is needed to help limit over-torque."
    ),
    decision: localized(
      "RTD dapat disetel melalui skala dan melakukan slip setelah target tercapai. Untuk satu nilai tetap pada produksi berulang, bandingkan dengan RNTD preset.",
      "RTD is scale-adjustable and slips after reaching the target. For one fixed value in repetitive production, compare the preset RNTD."
    ),
    chooseBy: [
      localized("Cocokkan target dan satuan cN·m atau N·m dengan range model.", "Match the target and cN·m or N·m unit to the model range."),
      localized("Tentukan profil dan ukuran bit 6,35 HEX yang sesuai dengan recess sekrup.", "Define the 6.35 HEX bit profile and size that fits the screw recess."),
      localized("Periksa arah pengencangan, grip, ruang kerja, serta kebutuhan auxiliary tool pada model tertentu.", "Check tightening direction, grip, workspace, and any auxiliary-tool need for the selected model.")
    ],
    rfqChecklist: [
      localized("Target torsi, satuan, dan toleransi", "Torque target, unit, and tolerance"),
      localized("Jenis, ukuran, dan material sekrup", "Screw type, size, and material"),
      localized("Profil bit dan arah pengencangan", "Bit profile and tightening direction"),
      localized("Frekuensi kerja dan pergantian target", "Operating frequency and target changes")
    ]
  },
  rntd: {
    bestFor: localized(
      "Pengencangan sekrup kecil berulang pada satu nilai preset di produksi massal atau maintenance terstandar.",
      "Repeated small-screw tightening at one preset value in mass production or standardized maintenance."
    ),
    decision: localized(
      "RNTD menggabungkan preset tersembunyi dengan rotary-slip untuk mengurangi perubahan setting dan over-tightening. Pilih RTD bila target perlu sering diubah.",
      "RNTD combines a concealed preset with rotary slip to reduce setting changes and over-tightening. Choose RTD when the target must change frequently."
    ),
    chooseBy: [
      localized("Tetapkan nilai preset, toleransi, dan metode setting oleh personel yang berwenang.", "Define the preset value, tolerance, and setting method used by authorized personnel."),
      localized("Cocokkan range model dengan ukuran sekrup dan bit yang dipakai.", "Match the model range to the screw size and bit in use."),
      localized("Tentukan kebutuhan tool per station, tool cadangan, dan pemeriksaan sebelum shift.", "Define tools per station, spare tools, and pre-shift checks.")
    ],
    rfqChecklist: [
      localized("Nilai preset dan toleransi proses", "Preset value and process tolerance"),
      localized("Sekrup, bit, dan arah pengencangan", "Screw, bit, and tightening direction"),
      localized("Jumlah workstation dan volume siklus", "Number of workstations and cycle volume"),
      localized("Rencana setting dan verifikasi", "Setting and verification plan")
    ]
  },
  "db-dbe-dbr": {
    bestFor: localized(
      "Inspeksi atau pengencangan yang membutuhkan pembacaan torsi aktual pada dial, termasuk aplikasi range besar pada varian tertentu.",
      "Inspection or tightening that requires an actual torque reading on a dial, including higher-range applications on selected variants."
    ),
    decision: localized(
      "Gunakan DB/DBE untuk pembacaan langsung dengan operasi manual dan DBR bila metode pembebanan range besar memerlukan lever block atau winch. Gunakan click wrench jika hanya sinyal target yang dibutuhkan.",
      "Use DB/DBE for direct manual readings and DBR where higher-range loading uses a lever block or winch. Use a click wrench when only a target signal is required."
    ),
    chooseBy: [
      localized("Pilih range dan graduation yang memberi resolusi cukup untuk batas inspeksi.", "Choose a range and graduation that provide enough resolution for the inspection limit."),
      localized("Tentukan apakah memory pointer diperlukan untuk menangkap nilai maksimum.", "Decide whether a memory pointer is needed to retain the maximum reading."),
      localized("Periksa square drive, panjang efektif, arah pembacaan, dan metode pembebanan.", "Check the square drive, effective length, reading direction, and loading method.")
    ],
    rfqChecklist: [
      localized("Rentang ukur, unit, dan resolusi", "Measurement range, unit, and resolution"),
      localized("Tujuan inspection atau tightening", "Inspection or tightening purpose"),
      localized("Square drive dan akses fastener", "Square drive and fastener access"),
      localized("Kebutuhan memory pointer atau loading khusus", "Memory-pointer or special-loading requirement")
    ]
  },
  "ql-mh": {
    bestFor: localized(
      "Pengencangan adjustable di garage atau area kerja berminyak yang membutuhkan metal handle dan knob yang mudah dioperasikan.",
      "Adjustable tightening in garages or oily work areas that benefit from a metal handle and an easy-to-operate setting knob."
    ),
    decision: localized(
      "QL-MH membawa fungsi adjustable click QL ke handle logam untuk kondisi berminyak. Pilih QL biasa bila resin grip dan lingkungan kerja bersih lebih sesuai.",
      "QL-MH brings QL adjustable-click operation to a metal handle for greasy conditions. Choose standard QL where a resin grip and cleaner environment are more suitable."
    ),
    chooseBy: [
      localized("Cocokkan target dengan range, graduation, dan square drive model.", "Match the target to the model range, graduation, and square drive."),
      localized("Konfirmasikan paparan oli atau bahan kimia dan prosedur pembersihan tool.", "Confirm oil or chemical exposure and the tool-cleaning procedure."),
      localized("Periksa panjang, gaya tangan, serta ruang swing ratchet di area kerja.", "Check length, hand force, and ratchet-swing clearance in the work area.")
    ],
    rfqChecklist: [
      localized("Target torsi dan satuan", "Torque target and unit"),
      localized("Jenis fluida atau kondisi berminyak", "Fluid type or greasy condition"),
      localized("Socket, square drive, dan clearance", "Socket, square drive, and clearance"),
      localized("Frekuensi penggunaan dan jumlah tool", "Use frequency and tool quantity")
    ]
  },
  "cl-mh": {
    bestFor: localized(
      "Area kerja berminyak yang membutuhkan metal handle sekaligus pilihan interchangeable head untuk beberapa profil fastener.",
      "Greasy work areas that need both a metal handle and interchangeable heads for several fastener profiles."
    ),
    decision: localized(
      "CL-MH tepat ketika kondisi kerja mendorong penggunaan handle logam dan ratchet head tetap tidak cukup. Pilih QL-MH bila hanya socket ratchet yang digunakan.",
      "CL-MH fits when working conditions favor a metal handle and a fixed ratchet head is insufficient. Choose QL-MH when only ratchet sockets are used."
    ),
    chooseBy: [
      localized("Cocokkan range body dengan target dan diameter root interchangeable head.", "Match the body range to the target and interchangeable-head root diameter."),
      localized("Tentukan head, ukuran fastener, orientasi, dan clearance aktual.", "Define the head, fastener size, orientation, and actual clearance."),
      localized("Konfirmasikan kondisi oli atau kimia serta panjang efektif kombinasi body dan head.", "Confirm oil or chemical conditions and the effective length of the body-and-head combination.")
    ],
    rfqChecklist: [
      localized("Target torsi dan range", "Torque target and range"),
      localized("Bentuk, ukuran, dan jumlah head", "Head form, size, and quantity"),
      localized("Kondisi lingkungan kerja", "Working-environment conditions"),
      localized("Dimensi akses dan jumlah body", "Access dimensions and body quantity")
    ]
  },
  "csp-csp-mh": {
    bestFor: localized(
      "Assembly massal dengan satu nilai preset tetapi membutuhkan interchangeable head untuk menyesuaikan bentuk atau akses fastener.",
      "Mass-production assembly with one preset value that also needs interchangeable heads for fastener form or access."
    ),
    decision: localized(
      "CSP/CSP-MH mengutamakan kontrol preset dan fleksibilitas head. Pilih CL/CLE2 jika target harus adjustable oleh pengguna, atau QSP jika ratchet head tetap sudah cukup.",
      "CSP/CSP-MH prioritizes preset control and head flexibility. Choose CL/CLE2 when users must adjust the target, or QSP when a fixed ratchet head is sufficient."
    ),
    chooseBy: [
      localized("Tetapkan nilai preset, toleransi, dan otoritas setting tool.", "Define the preset value, tolerance, and setting authority."),
      localized("Cocokkan diameter root, bentuk head, ukuran fastener, dan panjang efektif.", "Match root diameter, head form, fastener size, and effective length."),
      localized("Tentukan kebutuhan metal handle, tool identification, dan interval line check.", "Define metal-handle, tool-identification, and line-check requirements.")
    ],
    rfqChecklist: [
      localized("Nilai preset dan toleransi", "Preset value and tolerance"),
      localized("Head, ukuran fastener, dan clearance", "Head, fastener size, and clearance"),
      localized("Jumlah station, body, dan head", "Number of stations, bodies, and heads"),
      localized("Metode setting serta verifikasi", "Setting and verification method")
    ]
  },
  "sp-sp2-sp2-mh": {
    bestFor: localized(
      "Assembly satu ukuran bolt dengan open-end head dan nilai preset tetap, terutama ketika socket atau ring head tidak dapat digunakan.",
      "Assembly of one bolt size with an open-end head and fixed preset value, especially where a socket or ring head cannot be used."
    ),
    decision: localized(
      "SP/SP2/SP2-MH adalah dedicated preset open-end wrench. Gunakan CSP dengan interchangeable head jika satu body perlu melayani beberapa bentuk head.",
      "SP/SP2/SP2-MH is a dedicated preset open-end wrench. Use CSP with interchangeable heads when one body must serve several head forms."
    ),
    chooseBy: [
      localized("Kunci pemilihan adalah nilai preset, ukuran opening head, dan bentuk sambungan.", "The key selection inputs are preset value, head opening size, and joint form."),
      localized("Ukur clearance samping dan sudut pendekatan karena open-end head harus masuk ke fastener.", "Measure side clearance and approach angle because the open-end head must reach the fastener."),
      localized("Tentukan versi handle yang sesuai dengan lingkungan serta metode identifikasi tool per station.", "Choose the handle version for the environment and the tool-identification method at each station.")
    ],
    rfqChecklist: [
      localized("Nilai preset dan toleransi", "Preset value and tolerance"),
      localized("Ukuran across-flats fastener", "Fastener across-flats size"),
      localized("Foto joint dan ruang akses", "Joint photo and available clearance"),
      localized("Jumlah station dan kebutuhan setting", "Number of stations and setting needs")
    ]
  },
  "rsp2-rsp2-mh": {
    bestFor: localized(
      "Assembly atau produksi massal dengan ring head dedicated, satu ukuran fastener, dan satu nilai torsi preset.",
      "Assembly or mass production with a dedicated ring head, one fastener size, and one preset torque value."
    ),
    decision: localized(
      "RSP2/RSP2-MH memberi engagement ring yang mengelilingi fastener. Pilih SP untuk akses open-end atau CSP bila head perlu diganti.",
      "RSP2/RSP2-MH provides a ring engagement around the fastener. Choose SP for open-end access or CSP when heads must be interchangeable."
    ),
    chooseBy: [
      localized("Cocokkan nilai preset dan range model dengan standar pengencangan.", "Match the preset value and model range to the tightening standard."),
      localized("Pastikan ukuran ring, ruang masuk dari atas, dan tinggi komponen sesuai.", "Confirm ring size, top access, and component height."),
      localized("Tentukan handle, tool setting, identifikasi, dan pemeriksaan berkala.", "Define the handle, tool setting, identification, and periodic checks.")
    ],
    rfqChecklist: [
      localized("Nilai preset dan toleransi", "Preset value and tolerance"),
      localized("Ukuran hex atau nut", "Hex or nut size"),
      localized("Arah masuk dan clearance ring", "Ring approach and clearance"),
      localized("Volume produksi dan jumlah tool", "Production volume and tool quantity")
    ]
  },
  "cem3-cem3-g": {
    bestFor: localized(
      "Inspection atau tightening yang membutuhkan pembacaan digital, pass/fail judgment, dan opsi pencatatan hasil melalui varian yang sesuai.",
      "Inspection or tightening that needs a digital reading, pass/fail judgment, and result-recording options through the appropriate variant."
    ),
    decision: localized(
      "CEM3/CEM3-G sesuai ketika nilai aktual dan judgment diperlukan pada torque wrench berkepala interchangeable. Gunakan click wrench mekanis jika proses hanya membutuhkan sinyal target tanpa data.",
      "CEM3/CEM3-G fits when actual values and judgment are needed on an interchangeable-head torque wrench. Use a mechanical click wrench if the process only needs a target signal without data."
    ),
    chooseBy: [
      localized("Cocokkan range, accuracy, dan arah pengukuran dengan batas proses.", "Match range, accuracy, and measurement direction to the process limits."),
      localized("Tentukan head, ukuran fastener, dan panjang efektif konfigurasi.", "Define the head, fastener size, and effective length of the configuration."),
      localized("Konfirmasikan kebutuhan memory, output, judgment, serta model G atau non-G yang tersedia.", "Confirm memory, output, judgment, and the required G or non-G model configuration.")
    ],
    rfqChecklist: [
      localized("Range, unit, tolerance, dan arah torque", "Range, unit, tolerance, and torque direction"),
      localized("Head serta ukuran fastener", "Head and fastener size"),
      localized("Mode tightening atau inspection", "Tightening or inspection mode"),
      localized("Data output, perangkat penerima, dan jumlah tool", "Data output, receiving device, and tool quantity")
    ]
  },
  "ctb2-ctb2-g": {
    bestFor: localized(
      "Quality inspection untuk memperkirakan original tightening torque pada baut yang sudah dikencangkan menggunakan metode retightening T-point.",
      "Quality inspection that estimates original tightening torque on an already-tightened bolt using the T-point retightening method."
    ),
    decision: localized(
      "CTB2/CTB2-G adalah alat inspection, bukan pengganti torque wrench produksi. Pilih keluarga ini ketika prosedur quality menggunakan retightening untuk mengevaluasi joint yang sudah terpasang.",
      "CTB2/CTB2-G is an inspection tool, not a production torque-wrench replacement. Choose it when the quality procedure uses retightening to evaluate an assembled joint."
    ),
    chooseBy: [
      localized("Pastikan metode retightening sesuai dengan joint, standar internal, dan tujuan evaluasi.", "Confirm that the retightening method suits the joint, internal standard, and evaluation purpose."),
      localized("Cocokkan range, head, ukuran fastener, dan arah inspeksi.", "Match the range, head, fastener size, and inspection direction."),
      localized("Tentukan kebutuhan judgment, memory, output data, dan identitas hasil.", "Define judgment, memory, data-output, and result-identification needs.")
    ],
    rfqChecklist: [
      localized("Jenis joint dan prosedur retightening", "Joint type and retightening procedure"),
      localized("Perkiraan range serta toleransi evaluasi", "Expected range and evaluation tolerance"),
      localized("Head, fastener, dan akses", "Head, fastener, and access"),
      localized("Format data dan volume inspeksi", "Data format and inspection volume")
    ]
  },
  "cta2-cta2-g": {
    bestFor: localized(
      "Pengencangan torque-plus-angle pada small-lot production, maintenance, after-sales service, atau backup proses nutrunner angle tightening.",
      "Torque-plus-angle tightening in small-lot production, maintenance, after-sales service, or as backup for an angle-tightening nutrunner process."
    ),
    decision: localized(
      "CTA2/CTA2-G digunakan ketika prosedur menetapkan snug torque lalu sudut putar. Jangan memilihnya hanya untuk target torque biasa yang tidak memiliki spesifikasi angle.",
      "CTA2/CTA2-G is used when the procedure specifies a snug torque followed by a rotation angle. Do not select it for an ordinary torque-only target without an angle specification."
    ),
    chooseBy: [
      localized("Konfirmasikan snug torque, target angle, toleransi, dan urutan pengencangan.", "Confirm snug torque, target angle, tolerance, and tightening sequence."),
      localized("Cocokkan range, interchangeable head, fastener, dan clearance gerak.", "Match the range, interchangeable head, fastener, and movement clearance."),
      localized("Tentukan kebutuhan judgment, memory, output, dan pencatatan torque-angle.", "Define judgment, memory, output, and torque-angle recording requirements.")
    ],
    rfqChecklist: [
      localized("Snug torque, angle, serta toleransi", "Snug torque, angle, and tolerances"),
      localized("Pola bolt dan urutan tightening", "Bolt pattern and tightening sequence"),
      localized("Head, fastener, dan ruang gerak", "Head, fastener, and movement space"),
      localized("Kebutuhan data serta jumlah tool", "Data requirements and tool quantity")
    ]
  },
  "stc2-g-stc2-g-bt": {
    bestFor: localized(
      "Precision screw tightening dan inspection yang membutuhkan nilai digital, visual pass/fail judgment, serta opsi pengiriman data pada model Bluetooth.",
      "Precision screw tightening and inspection that needs a digital value, visual pass/fail judgment, and optional data transmission on the Bluetooth model."
    ),
    decision: localized(
      "STC2-G cocok untuk pembacaan dan judgment lokal; STC2-G-BT dipilih ketika hasil perlu diteruskan ke sistem pengelolaan tightening yang kompatibel.",
      "STC2-G suits local readings and judgment; STC2-G-BT is selected when results must be sent to a compatible tightening-management system."
    ),
    chooseBy: [
      localized("Cocokkan range torsi, bit, ukuran sekrup, dan mode tightening atau inspection.", "Match torque range, bit, screw size, and tightening or inspection mode."),
      localized("Tetapkan batas pass/fail, arah kerja, dan cara operator membaca LED serta display.", "Set pass/fail limits, working direction, and how the operator reads the LED and display."),
      localized("Untuk BT, konfirmasikan receiver, software, identitas pekerjaan, dan alur penyimpanan data.", "For BT, confirm the receiver, software, work identity, and data-storage flow.")
    ],
    rfqChecklist: [
      localized("Target atau range inspeksi dan toleransi", "Target or inspection range and tolerance"),
      localized("Sekrup, bit, dan arah operasi", "Screw, bit, and operating direction"),
      localized("Kebutuhan judgment serta data", "Judgment and data requirements"),
      localized("Perangkat penerima dan jumlah station", "Receiving device and number of stations")
    ]
  },
  ftd: {
    bestFor: localized(
      "Inspection dan tightening sekrup kecil yang membutuhkan pembacaan torque indicating serta pemeriksaan dua arah dengan skala yang sesuai.",
      "Inspection and tightening of small screws that requires an indicating torque reading and suitable bidirectional scale checks."
    ),
    decision: localized(
      "FTD menampilkan nilai aktual dan menggunakan pre-load knob untuk membantu operasi. Pilih RTD atau RNTD jika tujuan utamanya membatasi over-torque pada target, bukan membaca hasil.",
      "FTD displays the actual value and uses a pre-load knob to assist operation. Choose RTD or RNTD when the main goal is limiting over-torque at a target rather than reading a result."
    ),
    chooseBy: [
      localized("Cocokkan range dan graduation dengan nilai yang akan diperiksa.", "Match the range and graduation to the value being inspected."),
      localized("Tentukan profil bit, ukuran sekrup, dan arah retightening atau measurement.", "Define the bit profile, screw size, and retightening or measurement direction."),
      localized("Periksa posisi pembacaan skala, grip, dan kebutuhan pencatatan hasil manual.", "Check scale-reading position, grip, and manual result-recording needs.")
    ],
    rfqChecklist: [
      localized("Range, unit, dan resolusi pembacaan", "Range, unit, and reading resolution"),
      localized("Tujuan inspection atau tightening", "Inspection or tightening purpose"),
      localized("Sekrup, bit, dan arah", "Screw, bit, and direction"),
      localized("Frekuensi pemeriksaan dan jumlah alat", "Inspection frequency and tool quantity")
    ]
  },
  "dote4-dote4-g": {
    bestFor: localized(
      "Calibration room atau workshop yang melakukan kalibrasi dan adjustment torque wrench dengan loading terkontrol dan color judgment.",
      "Calibration rooms or workshops that calibrate and adjust torque wrenches with controlled loading and color judgment."
    ),
    decision: localized(
      "DOTE4/DOTE4-G adalah calibration tester. Untuk quick check dekat lini produksi, bandingkan dengan LC3; untuk pengelolaan range dan data terpusat, bandingkan dengan TCC2.",
      "DOTE4/DOTE4-G is a calibration tester. For quick line-side checks compare LC3; for centralized range and data management compare TCC2."
    ),
    chooseBy: [
      localized("Daftarkan seluruh torque wrench, range, square drive, dan panjang efektif yang harus diuji.", "List every torque wrench, range, square drive, and effective length to be tested."),
      localized("Pilih kapasitas, inlet drive, dan manual atau motorized loading sesuai volume kerja.", "Choose capacity, inlet drive, and manual or motorized loading for the workload."),
      localized("Tentukan batas judgment, jumlah pengulangan, output data, kabel, dan printer atau PC.", "Define judgment limits, repeat count, data output, cables, and printer or PC needs.")
    ],
    rfqChecklist: [
      localized("Daftar tool dan seluruh range", "Tool list and all ranges"),
      localized("Square drive serta panjang efektif maksimum", "Square drives and maximum effective lengths"),
      localized("Volume kalibrasi dan metode loading", "Calibration volume and loading method"),
      localized("Output data, software, kabel, dan sertifikat", "Data output, software, cables, and certificate needs")
    ]
  },
  "tcc2-tcc2-g": {
    bestFor: localized(
      "Fasilitas kalibrasi terpusat yang mengelola banyak torque wrench, membutuhkan range luas, workflow ISO 6789, dan histori data.",
      "Central calibration facilities managing many torque wrenches that need wide range coverage, an ISO 6789 workflow, and data history."
    ),
    decision: localized(
      "TCC2/TCC2-G menggabungkan calibrator dan controller untuk cakupan serta pengelolaan yang lebih terpusat. DOTE4 lebih sesuai untuk setup tester yang lebih sederhana atau kapasitas tertentu.",
      "TCC2/TCC2-G combines a calibrator and controller for broader centralized coverage and management. DOTE4 better suits a simpler tester setup or a specific capacity."
    ),
    chooseBy: [
      localized("Buat inventory tool lengkap beserta range, unit, square drive, dan panjang efektif.", "Build a complete tool inventory with ranges, units, square drives, and effective lengths."),
      localized("Tentukan prosedur calibration, toleransi, interval, user role, dan volume harian.", "Define calibration procedures, tolerances, intervals, user roles, and daily volume."),
      localized("Petakan identitas tool, format record, integrasi data, dan kebutuhan report.", "Map tool identity, record format, data integration, and reporting needs.")
    ],
    rfqChecklist: [
      localized("Inventory torque wrench dan range", "Torque-wrench inventory and ranges"),
      localized("Prosedur, standar, serta toleransi", "Procedures, standards, and tolerances"),
      localized("Volume kalibrasi dan operator", "Calibration volume and operators"),
      localized("Data, report, dan integrasi sistem", "Data, reporting, and system integration")
    ]
  },
  "tdt3-tdt3-g": {
    bestFor: localized(
      "Kalibrasi dan adjustment torque screwdriver serta torque wrench kecil dengan loading yang menjaga posisi tool lebih konsisten.",
      "Calibration and adjustment of torque screwdrivers and small torque wrenches with loading that keeps tool positioning more consistent."
    ),
    decision: localized(
      "TDT3/TDT3-G ditujukan terutama untuk torque drivers dan tool bertorsi kecil. Gunakan DOTE4 atau TCC2 untuk torque wrench dengan range serta fixture yang lebih besar.",
      "TDT3/TDT3-G is intended mainly for torque drivers and small-torque tools. Use DOTE4 or TCC2 for torque wrenches needing larger ranges and fixtures."
    ),
    chooseBy: [
      localized("Cocokkan range seluruh screwdriver dengan kapasitas tester dan inlet drive.", "Match every screwdriver range to the tester capacity and inlet drive."),
      localized("Tentukan bit, grip diameter, grip height, adapter, dan arah pengujian.", "Define bit, grip diameter, grip height, adapter, and test direction."),
      localized("Atur pass/fail limits, memory, output, dan jumlah pengulangan pengujian.", "Set pass/fail limits, memory, output, and number of test repetitions.")
    ],
    rfqChecklist: [
      localized("Daftar screwdriver dan range", "Screwdriver list and ranges"),
      localized("Bit, grip, serta adapter", "Bits, grips, and adapters"),
      localized("Arah, toleransi, dan metode test", "Direction, tolerance, and test method"),
      localized("Output data dan volume pengujian", "Data output and test volume")
    ]
  },
  "lc3-lc3-g": {
    bestFor: localized(
      "Pemeriksaan rutin atau pre-start torque wrench di dekat production line untuk mendeteksi penyimpangan sebelum pekerjaan berjalan.",
      "Routine or pre-start torque-wrench checks near the production line to detect deviation before work begins."
    ),
    decision: localized(
      "LC3/LC3-G adalah line checker untuk verifikasi cepat dan preventive maintenance. Ia melengkapi, bukan otomatis menggantikan, prosedur calibration tester yang terkontrol.",
      "LC3/LC3-G is a line checker for quick verification and preventive maintenance. It complements rather than automatically replaces a controlled calibration-tester procedure."
    ),
    chooseBy: [
      localized("Cocokkan range tool, square drive, dan adapter dengan kapasitas checker.", "Match tool ranges, square drives, and adapters to checker capacity."),
      localized("Tetapkan frekuensi check, jumlah pengulangan, serta batas pass/fail per tool.", "Set check frequency, repeat count, and pass/fail limits for each tool."),
      localized("Tentukan lokasi station, identitas tool, output data, dan respons saat hasil NG.", "Define station location, tool identity, data output, and the response to an NG result.")
    ],
    rfqChecklist: [
      localized("Daftar tool, range, dan square drive", "Tool list, ranges, and square drives"),
      localized("Frekuensi daily check dan toleransi", "Daily-check frequency and tolerance"),
      localized("Adapter dan lokasi line-side", "Adapters and line-side location"),
      localized("Pencatatan data serta alur NG", "Data recording and NG workflow")
    ]
  },
  "dlc-dlc-g": {
    bestFor: localized(
      "Quick daily check torque screwdriver sebelum produksi, dengan pemeriksaan singkat dan color pass/fail judgment.",
      "Quick daily checks of torque screwdrivers before production, with short tests and color pass/fail judgment."
    ),
    decision: localized(
      "DLC/DLC-G berfokus pada pemeriksaan harian yang cepat. Pilih TDT3 bila kebutuhan mencakup calibration, adjustment, dan setup pengujian yang lebih lengkap.",
      "DLC/DLC-G focuses on fast daily verification. Choose TDT3 when the requirement includes calibration, adjustment, and a more complete test setup."
    ),
    chooseBy: [
      localized("Cocokkan range screwdriver dan adapter dengan kapasitas DLC.", "Match screwdriver ranges and adapters to DLC capacity."),
      localized("Tetapkan upper/lower limits serta jumlah check sebelum shift atau pergantian model.", "Set upper and lower limits and the number of checks before a shift or model change."),
      localized("Tentukan apakah hasil perlu disimpan atau dikirim ke PC melalui output yang sesuai.", "Decide whether results must be stored or sent to a PC through the appropriate output.")
    ],
    rfqChecklist: [
      localized("Daftar screwdriver dan target", "Screwdriver list and targets"),
      localized("Bit atau adapter yang digunakan", "Bits or adapters in use"),
      localized("Toleransi dan frekuensi check", "Tolerance and check frequency"),
      localized("Kebutuhan memory serta data output", "Memory and data-output needs")
    ]
  },
  "atge-atge-g": {
    bestFor: localized(
      "Pengukuran, inspection, atau tightening pada torsi sangat kecil untuk precision machinery, electronics, dan komponen assembly.",
      "Very-small-torque measurement, inspection, or tightening for precision machinery, electronics, and assembly components."
    ),
    decision: localized(
      "ATGE/ATGE-G dapat digunakan handheld, tabletop, atau dengan fixture sebagai torque meter. Pilih BTGE bila bentuk handheld mini dengan built-in adjustable display lebih sesuai.",
      "ATGE/ATGE-G can be used handheld, tabletop, or with a fixture as a torque meter. Choose BTGE when a mini handheld form with a built-in adjustable display is more suitable."
    ),
    chooseBy: [
      localized("Cocokkan rentang sangat kecil, unit, resolusi, dan accuracy dengan benda uji.", "Match the very small range, unit, resolution, and accuracy to the test piece."),
      localized("Tentukan penggunaan handheld, tabletop, fixture, serta ukuran chuck grip.", "Define handheld, tabletop, or fixture use and the chuck-grip size."),
      localized("Pilih mode peak/run, arah, memory, statistik, dan kebutuhan transfer USB.", "Choose peak/run mode, direction, memory, statistics, and USB-transfer needs.")
    ],
    rfqChecklist: [
      localized("Range, unit, dan resolusi", "Range, unit, and resolution"),
      localized("Benda uji dan ukuran chuck", "Test piece and chuck size"),
      localized("Mode handheld, tabletop, atau fixture", "Handheld, tabletop, or fixture mode"),
      localized("Memory, statistik, dan data output", "Memory, statistics, and data output")
    ]
  },
  "btge-btge-g": {
    bestFor: localized(
      "Pengukuran torsi sangat kecil secara handheld dengan body ringkas dan display built-in yang dapat diatur posisinya.",
      "Handheld very-small-torque measurement with a compact body and a built-in display whose position can be adjusted."
    ),
    decision: localized(
      "BTGE/BTGE-G mengutamakan portabilitas dan pembacaan built-in. Bandingkan ATGE bila setup memerlukan pilihan tabletop atau fixture yang lebih eksplisit.",
      "BTGE/BTGE-G prioritizes portability and a built-in reading. Compare ATGE when the setup needs more explicit tabletop or fixture configurations."
    ),
    chooseBy: [
      localized("Cocokkan range, unit, resolusi, dan accuracy dengan torque minimum serta maksimum.", "Match range, unit, resolution, and accuracy to the minimum and maximum torque."),
      localized("Periksa ukuran chuck, bentuk benda uji, posisi display, dan ergonomi pengukuran.", "Check chuck size, test-piece form, display position, and measurement ergonomics."),
      localized("Tentukan arah, mode measurement, memory, statistik, dan transfer USB.", "Define direction, measurement mode, memory, statistics, and USB transfer.")
    ],
    rfqChecklist: [
      localized("Range, unit, serta resolusi", "Range, unit, and resolution"),
      localized("Bentuk dan ukuran benda uji", "Test-piece form and size"),
      localized("Posisi kerja serta kebutuhan handheld", "Working position and handheld requirement"),
      localized("Memory, output, dan jumlah alat", "Memory, output, and instrument quantity")
    ]
  },
  "tme3-g": {
    bestFor: localized(
      "Pengukuran opening torque bottle cap, cosmetic container, medicine-container screw, dan benda uji rotary serupa.",
      "Opening-torque measurement for bottle caps, cosmetic containers, medicine-container screws, and similar rotary test pieces."
    ),
    decision: localized(
      "TME3-G adalah torque meter untuk benda uji yang dijepit, bukan torque wrench checker. Gunakan ATGE atau BTGE untuk komponen kecil yang lebih sesuai dengan chuck torque gauge.",
      "TME3-G is a torque meter for clamped test pieces, not a torque-wrench checker. Use ATGE or BTGE for small components better suited to a torque-gauge chuck."
    ),
    chooseBy: [
      localized("Cocokkan opening atau rotary torque dengan range, unit, resolusi, dan accuracy meter.", "Match opening or rotary torque to the meter range, unit, resolution, and accuracy."),
      localized("Ukur diameter serta bentuk container agar empat pole dapat menjepit benda uji dengan benar.", "Measure container diameter and form so the four poles can hold the test piece correctly."),
      localized("Tentukan primary/secondary peak, arah, waveform, data output, kabel, dan software.", "Define primary/secondary peak, direction, waveform, data output, cables, and software.")
    ],
    rfqChecklist: [
      localized("Jenis container atau benda uji", "Container or test-piece type"),
      localized("Diameter, bentuk, dan material", "Diameter, form, and material"),
      localized("Perkiraan torque, arah, dan peak yang dicari", "Expected torque, direction, and required peak"),
      localized("Waveform, software, kabel, dan format data", "Waveform, software, cables, and data format")
    ]
  }
} as const satisfies Record<TohnichiPriorityProductSlug, TohnichiPriorityGuidance>;

export function getTohnichiPriorityGuidance(slug: string) {
  return TOHNICHI_PRIORITY_GUIDANCE[slug as TohnichiPriorityProductSlug];
}
