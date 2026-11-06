import type { GuideFlowDefinition } from "@/data/guideflows/types";
import type { LocalizedText } from "@/lib/i18n";

const tr = (id: string, en: string): LocalizedText => ({ id, en });
const sbImage = "/assets/brands/products/tohnichi/SB-FH2.jpg";
const receiverImage = "/assets/brands/products/tohnichi/R-CM+M-FH.jpg";
const transmitterImage = "/assets/brands/products/tohnichi/catalog/interchangeable-head-torque-wrenches/cspfhw.jpg";

const pairingStepIds = [
  "prepare-box", "plan-values", "receiver-setting-mode", "receiver-menu",
  "receiver-main-values", "receiver-seven-id", "transmitter-setting-mode",
  "transmitter-menu", "transmitter-main-values", "transmitter-seven-id", "verify-pair"
];

export const sbFh2GuideFlow = {
  slug: "cara-menggunakan-sb-fh2",
  version: "1.0.0",
  status: "pilot",
  lastReviewed: "2026-10-12",
  source: tr(
    "TOHNICHI SB-FH2 Operating Instruction 02.21.EN, bagian 6-8; video ATI Technologies tentang CSP wrench dan R-CM dipakai sebagai demonstrasi visual.",
    "TOHNICHI SB-FH2 Operating Instruction 02.21.EN, sections 6-8; the ATI Technologies CSP wrench and R-CM video is used as a visual demonstration."
  ),
  references: [
    { label: tr("Manual SB-FH2 resmi", "Official SB-FH2 manual"), href: "https://www.tohnichi.com/wp-content/uploads/manual-SB-FH2.pdf" },
    { label: tr("Video setup CSP wrench dan R-CM", "CSP wrench and R-CM setup video"), href: "https://www.youtube.com/watch?v=w9HqiB4X8NY" }
  ],
  title: tr("Cara Menggunakan TOHNICHI SB-FH2", "How to Use the TOHNICHI SB-FH2"),
  description: tr(
    "Baca dan ubah setting wireless transmitter serta R-CM + M-FH, lalu verifikasi hasilnya satu langkah pada satu waktu.",
    "Read and change wireless settings on a transmitter and R-CM + M-FH, then verify the result one step at a time."
  ),
  scope: tr(
    "Untuk SB-FH2 dengan transmitter FH/FHM/FHW dan receiver R-CM ber-module M-FH. Setting mekanis torque dilakukan terpisah pada wrench.",
    "For SB-FH2 with an FH/FHM/FHW transmitter and an R-CM fitted with M-FH. Mechanical torque adjustment is done separately on the wrench."
  ),
  estimatedTime: tr("15-25 menit", "15-25 minutes"),
  presentation: {
    contactTopic: "sb-fh2-setup",
    hero: {
      label: tr("Alur wireless setting", "Wireless setting route"),
      ariaLabel: tr("SB-FH2 mengatur transmitter dan R-CM + M-FH", "SB-FH2 configures a transmitter and R-CM + M-FH"),
      leftImage: { src: sbImage, alt: tr("Setting box TOHNICHI SB-FH2", "TOHNICHI SB-FH2 setting box") },
      rightImage: { src: receiverImage, alt: tr("Receiver TOHNICHI R-CM dengan M-FH", "TOHNICHI R-CM receiver with M-FH") },
      connectorLabel: tr("2,4 GHz", "2.4 GHz"),
      connectorIcon: "radio"
    },
    completion: {
      eyebrow: tr("Panduan selesai", "Guide complete"),
      title: tr("Setting sudah diverifikasi.", "Settings verified."),
      body: tr(
        "Catat model transmitter, nomor R-CM/output, Group, judgment code, ID yang dipakai, tanggal, dan hasil test sebelum station digunakan.",
        "Record the transmitter model, R-CM/output, Group, judgment code, applicable IDs, date, and test result before using the station."
      )
    }
  },
  stages: [
    { id: "prepare", title: tr("Siapkan setting", "Prepare settings") },
    { id: "receiver", title: tr("Set R-CM", "Configure R-CM") },
    { id: "transmitter", title: tr("Set transmitter", "Configure transmitter") },
    { id: "verify", title: tr("Verifikasi", "Verify") },
    { id: "remote", title: tr("Remote setting", "Remote setting") }
  ],
  tasks: [
    {
      id: "pair-new",
      title: tr("Hubungkan wrench dan R-CM", "Pair a wrench and R-CM"),
      description: tr("Siapkan SB-FH2, set satu output R-CM, set transmitter, lalu test sinyal.", "Prepare SB-FH2, set one R-CM output, set the transmitter, then test the signal."),
      stepIds: pairingStepIds
    },
    {
      id: "change-transmitter",
      title: tr("Ubah satu transmitter", "Change one transmitter"),
      description: tr("Gunakan setting receiver yang sudah dicatat, tulis ke transmitter, dan verifikasi.", "Use recorded receiver settings, write them to the transmitter, and verify."),
      stepIds: ["prepare-box", "plan-values", "transmitter-setting-mode", "transmitter-menu", "transmitter-main-values", "transmitter-seven-id", "verify-pair"]
    },
    {
      id: "remote-rcm",
      title: tr("Set R-CM dari jarak jauh", "Set an R-CM remotely"),
      description: tr("Temukan R-CM + M-FH lewat remote ID, ubah setting, lalu keluar dari setting mode.", "Find an R-CM + M-FH by remote ID, change its settings, then exit setting mode."),
      stepIds: ["prepare-box", "plan-values", "remote-search", "remote-select", "remote-write", "remote-exit"]
    }
  ],
  prerequisites: [
    tr("SB-FH2 dengan baterai alkaline 9 V dan dipole antenna", "SB-FH2 with a 9 V alkaline battery and dipole antenna"),
    tr("Transmitter FH/FHM/FHW dan manual modelnya", "FH/FHM/FHW transmitter and its model manual"),
    tr("R-CM dengan radio module M-FH dan manualnya", "R-CM with an M-FH radio module and its manual"),
    tr("Rencana Group, judgment code, ID, dan output R1-R4", "Planned Group, judgment code, IDs, and R1-R4 output")
  ],
  steps: [
    {
      id: "prepare-box", stageId: "prepare",
      title: tr("Siapkan SB-FH2", "Prepare the SB-FH2"),
      instruction: tr("Pasang baterai alkaline 9 V sesuai polaritas. Pasang dipole antenna dengan memutar bagian ujung berlekuk, bukan antennanya. Tekan power.", "Install a 9 V alkaline battery with correct polarity. Fit the dipole antenna by turning its notched collar, not the antenna body. Press power."),
      expected: tr("Lampu power kuning dan layar MODE SELECT menyala.", "The yellow power light and MODE SELECT screen turn on."),
      successLabel: tr("MODE SELECT tampil", "MODE SELECT is visible"),
      helpLabel: tr("Layar tidak menyala", "The screen is dark"),
      manualRef: "6-1, 6-3, 7-2",
      media: { type: "image", src: sbImage, alt: tr("Tampak depan SB-FH2 dengan antenna dan power switch", "Front of the SB-FH2 with antenna and power switch") },
      quickChecks: [
        tr("Ganti baterai jika lampu kuning atau LCD tidak menyala.", "Replace the battery if the yellow light or LCD does not turn on."),
        tr("Periksa polaritas baterai; jangan memakai tipe selain alkaline 9 V.", "Check battery polarity; use a 9 V alkaline battery."),
        tr("Jauhkan alat dari air, minyak, gas atau uap mudah terbakar.", "Keep the unit away from water, oil, and flammable gas or steam.")
      ],
      issueIds: ["no-power", "unsafe-condition"]
    },
    {
      id: "plan-values", stageId: "prepare",
      title: tr("Catat Group, code, dan ID", "Record the Group, code, and IDs"),
      instruction: tr("Tentukan Group 000-255, judgment code 0-3, ID 3 digit 000-999, dan ID 7 karakter bila digunakan. Nilai yang dipakai harus sesuai pada transmitter dan output R-CM yang dituju.", "Choose a Group from 000-255, judgment code 0-3, a 3-digit ID from 000-999, and a 7-character ID if used. The applicable values must match on the transmitter and intended R-CM output."),
      expected: tr("Satu konfigurasi tertulis untuk transmitter dan output R1-R4 yang dipilih.", "One configuration is recorded for the transmitter and selected R1-R4 output."),
      successLabel: tr("Konfigurasi sudah dicatat", "Settings are recorded"),
      helpLabel: tr("Belum tahu code yang tepat", "I do not know the right code"),
      manualRef: "7-1",
      media: { type: "image", src: receiverImage, alt: tr("Receiver R-CM + M-FH dengan empat output", "R-CM + M-FH receiver with four outputs"), note: tr("Code 0: tanpa identifikasi ID; 1: ID 3 digit; 2: ID 7 karakter; 3: keduanya. Code 0 hanya bila tidak ada transmisi simultan.", "Code 0: no ID identification; 1: 3-digit ID; 2: 7-character ID; 3: both. Use code 0 only without simultaneous transmissions.") },
      quickChecks: [
        tr("Samakan Group dan judgment code pada kedua perangkat.", "Match the Group and judgment code on both devices."),
        tr("Jika code 1, 2, atau 3, samakan ID yang dinilai oleh code tersebut.", "For code 1, 2, or 3, match each ID that code checks."),
        tr("Catat output R-CM mana yang akan menerima signal wrench.", "Record which R-CM output will receive the wrench signal.")
      ],
      issueIds: ["settings-mismatch", "wrong-module"]
    },
    {
      id: "receiver-setting-mode", stageId: "receiver",
      title: tr("Masukkan satu R-CM ke setting mode", "Put one R-CM in setting mode"),
      instruction: tr("Pastikan R-CM memakai M-FH. Masukkan hanya receiver ini ke setting mode sesuai manual R-CM; jangan aktifkan setting mode pada transmitter lain secara bersamaan.", "Confirm the R-CM uses M-FH. Put only this receiver into setting mode using its R-CM manual; do not put another transmitter or receiver in setting mode at the same time."),
      expected: tr("R-CM menampilkan setting mode dan hanya satu target yang aktif.", "The R-CM shows its setting mode and is the only active target."),
      successLabel: tr("R-CM dalam setting mode", "R-CM is in setting mode"),
      helpLabel: tr("R-CM tidak masuk setting mode", "R-CM will not enter setting mode"),
      manualRef: "7-2; R-CM manual",
      media: { type: "image", src: receiverImage, alt: tr("Panel depan receiver R-CM dengan module M-FH", "R-CM front panel with M-FH module") },
      quickChecks: [
        tr("Baca label module: untuk jalur ini harus M-FH.", "Read the module label: this route requires M-FH."),
        tr("Ikuti urutan tombol pada manual R-CM untuk versi receiver yang digunakan.", "Follow the R-CM manual's button sequence for the receiver version in use."),
        tr("Set hanya satu perangkat pada satu waktu.", "Set only one device at a time.")
      ],
      issueIds: ["setting-mode", "wrong-module"]
    },
    {
      id: "receiver-menu", stageId: "receiver",
      title: tr("Pilih R-CM lalu R-CM(M-FH)", "Select R-CM, then R-CM(M-FH)"),
      instruction: tr("Di MODE SELECT SB-FH2, gunakan panah untuk memilih R-CM dan tekan SET. Pada MODEL SELECT pilih R-CM(M-FH) untuk mode komunikasi baru.", "At MODE SELECT on the SB-FH2, use the arrows to choose R-CM and press SET. At MODEL SELECT choose R-CM(M-FH) for the new communication mode."),
      expected: tr("Layar setting R-CM menampilkan pilihan output R1-R4.", "The R-CM settings screen shows output selection R1-R4."),
      successLabel: tr("Menu R-CM tampil", "R-CM menu is visible"),
      helpLabel: tr("Menu yang muncul berbeda", "The menu looks different"),
      manualRef: "7-2-2",
      media: { type: "image", src: sbImage, alt: tr("Layar MODE SELECT dan tombol SB-FH2", "SB-FH2 MODE SELECT screen and keys"), note: tr("R-FH adalah previous mode. Gunakan R-CM(M-FH) hanya bila transmitter juga memakai mode baru R-CM.", "R-FH is the previous mode. Use R-CM(M-FH) when the transmitter also uses the new R-CM mode.") },
      quickChecks: [
        tr("SET adalah tombol tengah pada kelompok tombol panah.", "SET is the center key in the arrow-key cluster."),
        tr("Pastikan mode komunikasi transmitter dan receiver akan sama.", "Confirm the transmitter and receiver will use the same communication mode.")
      ],
      issueIds: ["setting-mode", "settings-mismatch"]
    },
    {
      id: "receiver-main-values", stageId: "receiver",
      title: tr("Tulis Group, code, dan ID pada output", "Write Group, code, and ID to the output"),
      instruction: tr("Pilih output R1-R4 yang dituju. Tekan GET untuk membaca baris atas. Ubah baris bawah NEW untuk Group, judgment code, dan ID 3 digit. Tekan SET; setelah OK, tekan GET lagi untuk readback.", "Select the intended R1-R4 output. Press GET to read the upper row. Edit the lower NEW row for Group, judgment code, and 3-digit ID. Press SET; after OK, press GET again to read back."),
      expected: tr("Baris atas setelah GET sama dengan nilai NEW yang dikirim untuk output tersebut.", "After GET, the upper row matches the NEW values sent to that output."),
      successLabel: tr("Nilai output cocok", "Output values match"),
      helpLabel: tr("Muncul NG atau nilai tidak cocok", "NG appears or values differ"),
      manualRef: "7-1, 7-2-2",
      media: { type: "image", src: sbImage, alt: tr("Tombol GET dan SET pada SB-FH2", "GET and SET keys on the SB-FH2"), note: tr("Baris atas = nilai saat ini; baris NEW = nilai yang akan dikirim. Satu halaman layar dikirim pada satu waktu.", "Upper row = current values; NEW row = values to send. Only the displayed page is sent at a time.") },
      quickChecks: [
        tr("GET berada pada tombol bercincin kuning; SET di tengah tombol panah.", "GET is the yellow-ringed key; SET is at the center of the arrow keys."),
        tr("Jika NG, periksa setting mode target dan ulangi GET atau SET.", "If NG appears, check the target's setting mode and retry GET or SET."),
        tr("Pastikan output R1-R4 yang benar dipilih sebelum menulis.", "Confirm the correct R1-R4 output before writing.")
      ],
      issueIds: ["write-ng", "settings-mismatch"]
    },
    {
      id: "receiver-seven-id", stageId: "receiver",
      title: tr("Periksa ID 7 karakter dan keluar", "Check the 7-character ID and exit"),
      instruction: tr("Jika judgment code 2 atau 3, buka halaman ID 7 karakter untuk output yang sama, ubah NEW, tekan SET, lalu GET untuk readback. Setelah selesai, keluarkan R-CM dari setting mode sesuai manualnya.", "For judgment code 2 or 3, open the 7-character ID page for the same output, edit NEW, press SET, then GET to read back. Afterwards, exit R-CM setting mode using its manual."),
      expected: tr("ID 7 karakter cocok bila dipakai, dan R-CM sudah keluar dari setting mode.", "The 7-character ID matches if used, and the R-CM has left setting mode."),
      successLabel: tr("R-CM selesai diset", "R-CM setting is complete"),
      helpLabel: tr("ID 7 karakter tidak tersimpan", "The 7-character ID did not save"),
      manualRef: "7-1, 7-2-2",
      media: { type: "image", src: receiverImage, alt: tr("R-CM + M-FH yang sedang dikonfigurasi", "R-CM + M-FH being configured") },
      quickChecks: [
        tr("Halaman ID 7 karakter terpisah dari Group/code/ID 3 digit.", "The 7-character ID is on a separate page from Group/code/3-digit ID."),
        tr("Untuk code 0 atau 1, verifikasi field yang dipakai sebelum melanjutkan.", "For code 0 or 1, verify the fields in use before continuing."),
        tr("Jangan masuk setting mode transmitter sampai R-CM sudah keluar.", "Do not enter transmitter setting mode until the R-CM has exited.")
      ],
      issueIds: ["write-ng", "settings-mismatch"]
    },
    {
      id: "transmitter-setting-mode", stageId: "transmitter",
      title: tr("Masukkan transmitter ke setting mode", "Put the transmitter in setting mode"),
      instruction: tr("Ikuti manual model wrench/transmitter untuk masuk setting mode. Pastikan R-CM dan transmitter lain tidak sedang dalam setting mode.", "Use the wrench/transmitter model manual to enter setting mode. Make sure the R-CM and other transmitters are not in setting mode."),
      expected: tr("Hanya transmitter yang dituju berada pada setting mode.", "Only the intended transmitter is in setting mode."),
      successLabel: tr("Transmitter siap", "Transmitter is ready"),
      helpLabel: tr("Tidak bisa masuk setting mode", "It will not enter setting mode"),
      manualRef: "7-2; transmitter manual",
      media: { type: "image", src: transmitterImage, alt: tr("Contoh wrench TOHNICHI dengan transmitter FH", "Example TOHNICHI wrench with FH transmitter"), note: tr("Foto adalah contoh family wrench. Urutan masuk setting mode mengikuti manual model transmitter Anda.", "The photo shows an example wrench family. Use your transmitter model manual for the setting-mode sequence.") },
      quickChecks: [
        tr("Periksa daya dan setting mode transmitter sesuai manual modelnya.", "Check transmitter power and setting mode in its model manual."),
        tr("Jangan set beberapa target bersamaan.", "Do not set multiple targets at once.")
      ],
      issueIds: ["setting-mode", "no-power"]
    },
    {
      id: "transmitter-menu", stageId: "transmitter",
      title: tr("Pilih TRANSMITTER dan mode receiver", "Select TRANSMITTER and receiver mode"),
      instruction: tr("Pada MODE SELECT SB-FH2 pilih TRANSMITTER dan tekan SET. Pada RECEIVER SELECT pilih R-CM untuk komunikasi baru dengan R-CM + M-FH; pilih R-FH hanya untuk previous mode. Lalu buka CH SETTING.", "At MODE SELECT on the SB-FH2 choose TRANSMITTER and press SET. At RECEIVER SELECT choose R-CM for new communication with R-CM + M-FH; choose R-FH only for previous mode. Then open CH SETTING."),
      expected: tr("Layar CH SETTING transmitter menampilkan Group, code, dan ID.", "The transmitter CH SETTING screen shows Group, code, and ID."),
      successLabel: tr("CH SETTING tampil", "CH SETTING is visible"),
      helpLabel: tr("Pilihan mode membingungkan", "The mode choice is unclear"),
      manualRef: "7-2-1",
      media: { type: "image", src: sbImage, alt: tr("Layar dan tombol mode SB-FH2", "SB-FH2 display and mode keys") },
      quickChecks: [
        tr("Samakan mode baru R-CM atau previous mode R-FH dengan setting receiver.", "Match the new R-CM or previous R-FH mode to the receiver setting."),
        tr("Gunakan CH SETTING untuk Group, code, dan ID; FHW SETTING hanya untuk angle FHW.", "Use CH SETTING for Group, code, and ID; FHW SETTING is for FHW angle only.")
      ],
      issueIds: ["settings-mismatch", "setting-mode"]
    },
    {
      id: "transmitter-main-values", stageId: "transmitter",
      title: tr("Tulis Group, code, dan ID transmitter", "Write transmitter Group, code, and ID"),
      instruction: tr("Tekan GET untuk membaca nilai transmitter. Pada baris NEW masukkan Group, judgment code, dan ID 3 digit yang sama dengan output R-CM. Tekan SET, tunggu OK, lalu tekan GET untuk memastikan nilai baru tersimpan.", "Press GET to read transmitter values. In the NEW row enter the same Group, judgment code, and 3-digit ID as the R-CM output. Press SET, wait for OK, then press GET to confirm the new values were stored."),
      expected: tr("Nilai baris atas cocok dengan rencana dan output R-CM.", "The upper-row values match the plan and R-CM output."),
      successLabel: tr("Setting transmitter cocok", "Transmitter values match"),
      helpLabel: tr("NG atau nilai berbeda", "NG or mismatched values"),
      manualRef: "7-1, 7-2-1",
      media: { type: "image", src: sbImage, alt: tr("SB-FH2 membaca dan menulis setting transmitter", "SB-FH2 reading and writing transmitter settings") },
      quickChecks: [
        tr("Baris atas berasal dari GET; baris NEW adalah nilai yang akan dikirim SET.", "The upper row comes from GET; the NEW row is what SET sends."),
        tr("Hanya halaman yang tampil saat SET ditekan yang berubah.", "Only the page displayed when SET is pressed changes."),
        tr("Periksa mode komunikasi dan Group jika nilai receiver tetap tidak cocok.", "Check communication mode and Group if receiver values still differ.")
      ],
      issueIds: ["write-ng", "settings-mismatch"]
    },
    {
      id: "transmitter-seven-id", stageId: "transmitter",
      title: tr("Set ID 7 karakter bila dipakai", "Set the 7-character ID if used"),
      instruction: tr("Jika code 2 atau 3, pindah ke halaman ID 7 karakter, samakan dengan output R-CM, tekan SET, lalu GET untuk readback. Untuk code lain, periksa bahwa ID yang diperlukan sudah cocok.", "For code 2 or 3, move to the 7-character ID page, match the R-CM output, press SET, then GET to read back. For other codes, check that each required ID already matches."),
      expected: tr("Semua field yang dipakai oleh judgment code sudah cocok pada kedua perangkat.", "All fields used by the judgment code match on both devices."),
      successLabel: tr("ID sudah cocok", "IDs match"),
      helpLabel: tr("ID tidak tersimpan", "The ID did not save"),
      manualRef: "7-1, 7-2-1",
      media: { type: "image", src: sbImage, alt: tr("Tombol panah untuk halaman ID 7 karakter", "Arrow keys for the 7-character ID page") },
      quickChecks: [
        tr("ID 7 karakter berada pada halaman terpisah.", "The 7-character ID is on a separate page."),
        tr("GET ulang setelah setiap SET.", "Use GET again after each SET."),
        tr("Jika code 1, periksa ID 3 digit; jika code 3, periksa kedua ID.", "For code 1 check the 3-digit ID; for code 3 check both IDs.")
      ],
      issueIds: ["write-ng", "settings-mismatch"]
    },
    {
      id: "verify-pair", stageId: "verify",
      title: tr("Keluar, test, dan catat hasil", "Exit, test, and record the result"),
      instruction: tr("Keluarkan transmitter dari setting mode sesuai manualnya dan matikan SB-FH2. Lakukan satu test pengencangan yang aman; pastikan output R-CM yang dituju merespons. Catat Group, code, ID, output, dan hasil.", "Exit transmitter setting mode using its manual and switch off the SB-FH2. Make one safe test tightening; confirm the intended R-CM output responds. Record Group, code, IDs, output, and result."),
      expected: tr("R-CM menerima signal dari wrench yang benar dan output yang direncanakan aktif.", "The R-CM receives the intended wrench signal and the planned output responds."),
      successLabel: tr("Test berhasil", "The test passed"),
      helpLabel: tr("Tidak ada respons R-CM", "R-CM did not respond"),
      manualRef: "7-1, 8; receiver/transmitter manuals",
      media: { type: "image", src: receiverImage, alt: tr("Output status pada R-CM + M-FH", "Output status on R-CM + M-FH") },
      quickChecks: [
        tr("Bandingkan Group, judgment code, dan ID yang berlaku pada kedua perangkat.", "Compare Group, judgment code, and applicable IDs on both devices."),
        tr("Periksa apakah output R1-R4 yang benar dipilih.", "Check that the correct R1-R4 output was selected."),
        tr("Jauhkan antenna dari metal dan mesin penghasil noise elektromagnetik.", "Keep antennas away from metal and machines that cause electromagnetic noise.")
      ],
      issueIds: ["settings-mismatch", "radio-environment", "wrong-module"]
    },
    {
      id: "remote-search", stageId: "remote",
      title: tr("Cari R-CM melalui REMOTE SETTING", "Find R-CM via REMOTE SETTING"),
      instruction: tr("Pada MODE SELECT pilih REMOTE SETTING. Masukkan remote setting ID 7 karakter yang tertera di belakang module M-FH jika diketahui, lalu tekan GET untuk mencari target itu. Tanpa ID, GET melakukan sweep Group 000-255.", "At MODE SELECT choose REMOTE SETTING. Enter the 7-character remote setting ID printed on the back of the M-FH module if known, then press GET to query that target. Without an ID, GET sweeps Groups 000-255."),
      expected: tr("R-CM target ditemukan, dengan Group dan remote ID yang dapat diperiksa.", "The target R-CM is found, with a Group and remote ID you can check."),
      successLabel: tr("R-CM target ditemukan", "Target R-CM found"),
      helpLabel: tr("NOT FOUND tampil", "NOT FOUND appears"),
      manualRef: "7-2-3, steps 1-3",
      media: { type: "image", src: receiverImage, alt: tr("Module M-FH pada receiver R-CM", "M-FH module on the R-CM receiver"), note: tr("Remote setting ID berbeda dari ID wrench. Label ID ini berada di belakang module M-FH.", "The remote setting ID differs from the wrench ID. Its label is on the back of the M-FH module.") },
      quickChecks: [
        tr("Pastikan R-CM menyala dalam normal mode.", "Confirm the R-CM is powered on in normal mode."),
        tr("Pastikan R-CM memakai M-FH dan berada dalam jangkauan radio.", "Confirm the R-CM uses M-FH and is within radio range."),
        tr("Jika target tertentu, masukkan remote ID persis sebelum GET.", "For one target, enter its exact remote ID before GET."),
        tr("Jika NOT FOUND, dekatkan SB-FH2 dan ulangi pencarian.", "If NOT FOUND appears, move the SB-FH2 closer and search again.")
      ],
      issueIds: ["remote-not-found", "radio-environment", "wrong-module"]
    },
    {
      id: "remote-select", stageId: "remote",
      title: tr("Pilih target lalu tekan SET", "Select the target and press SET"),
      instruction: tr("Pada hasil pencarian, cocokkan remote ID dengan receiver yang dimaksud. Saat ID target tampil, tekan SET untuk memasukkan R-CM tersebut ke setting mode. Jika QUERY ID dipakai, target dapat masuk otomatis.", "In the search result, match the remote ID to the intended receiver. With its ID displayed, press SET to put that R-CM in setting mode. A queried ID may enter automatically."),
      expected: tr("SB-FH2 berpindah ke layar setting R-CM target, tanpa GET (RF) ERROR!.", "The SB-FH2 moves to the target R-CM settings screen without GET (RF) ERROR!."),
      successLabel: tr("Target siap diset", "Target is ready"),
      helpLabel: tr("Target tidak masuk setting mode", "Target will not enter setting mode"),
      manualRef: "7-2-3, steps 3-4",
      media: { type: "image", src: sbImage, alt: tr("Tombol SET pada SB-FH2 untuk remote setting", "SB-FH2 SET key for remote setting") },
      quickChecks: [
        tr("Cocokkan remote ID sebelum mengubah data agar receiver lain tidak terpilih.", "Match the remote ID before editing so another receiver is not selected."),
        tr("Jika GET (RF) ERROR! atau NOT FOUND muncul, dekatkan alat dan cari ulang.", "If GET (RF) ERROR! or NOT FOUND appears, move closer and search again.")
      ],
      issueIds: ["remote-not-found", "radio-environment"]
    },
    {
      id: "remote-write", stageId: "remote",
      title: tr("Ubah setting output R-CM", "Change the R-CM output settings"),
      instruction: tr("Pada layar R-CM pilih output R1-R4. Tekan GET, ubah baris NEW untuk Group/code/ID 3 digit, tekan SET, lalu GET untuk readback. Jika code 2 atau 3, ulangi pada halaman ID 7 karakter.", "On the R-CM screen select output R1-R4. Press GET, edit the NEW row for Group/code/3-digit ID, press SET, then GET to read back. For code 2 or 3 repeat on the 7-character ID page."),
      expected: tr("Semua nilai output yang dimaksud cocok dengan rencana setelah GET.", "All intended output values match the plan after GET."),
      successLabel: tr("Setting remote cocok", "Remote values match"),
      helpLabel: tr("NG atau nilai salah", "NG or wrong values"),
      manualRef: "7-2-2, 7-2-3 step 4",
      media: { type: "image", src: sbImage, alt: tr("SB-FH2 untuk membaca dan menulis setting R-CM", "SB-FH2 for reading and writing R-CM settings") },
      quickChecks: [
        tr("Hanya halaman yang tampil dikirim oleh SET.", "SET sends only the displayed page."),
        tr("Periksa R1-R4, Group, code, dan ID sebelum konfirmasi.", "Check R1-R4, Group, code, and IDs before confirming."),
        tr("Baca ulang dengan GET setelah setiap penulisan.", "Read back with GET after each write.")
      ],
      issueIds: ["write-ng", "settings-mismatch"]
    },
    {
      id: "remote-exit", stageId: "remote",
      title: tr("Tahan GET untuk keluar", "Hold GET to exit"),
      instruction: tr("Setelah setting dan readback selesai, tahan tombol GET untuk mengeluarkan R-CM dari remote setting mode. Matikan SB-FH2, lalu verifikasi komunikasi dengan transmitter yang sesuai.", "After writing and reading back settings, press and hold GET to exit the R-CM remote setting mode. Switch off the SB-FH2, then verify communication with the matching transmitter."),
      expected: tr("R-CM kembali ke operasi normal dan menerima signal transmitter yang dituju.", "The R-CM returns to normal operation and receives the intended transmitter signal."),
      successLabel: tr("Remote setup selesai", "Remote setup is complete"),
      helpLabel: tr("R-CM belum kembali normal", "R-CM is not back to normal"),
      manualRef: "7-2-3 step 5",
      media: { type: "image", src: receiverImage, alt: tr("Receiver R-CM setelah remote setting", "R-CM receiver after remote setting") },
      quickChecks: [
        tr("Tahan GET; jangan hanya menekannya sebentar.", "Hold GET; a brief tap is not the exit command."),
        tr("Konfirmasi Group, code, dan ID transmitter masih cocok.", "Confirm the transmitter Group, code, and IDs still match."),
        tr("Catat perubahan dan hasil test sebelum station dipakai.", "Record the change and test result before the station is used.")
      ],
      issueIds: ["settings-mismatch", "radio-environment"]
    }
  ],
  issues: [
    {
      id: "no-power",
      label: tr("Layar gelap", "Dark screen"),
      title: tr("SB-FH2 atau transmitter tidak menyala", "SB-FH2 or transmitter has no power"),
      summary: tr("Mulai dari baterai dan polaritas sebelum memeriksa komunikasi.", "Check batteries and polarity before diagnosing radio communication."),
      checks: [
        { title: tr("Baterai SB-FH2", "SB-FH2 battery"), body: tr("Ganti dengan baterai alkaline 9 V baru dan periksa polaritas.", "Fit a new 9 V alkaline battery and check polarity.") },
        { title: tr("Transmitter", "Transmitter"), body: tr("Ikuti pemeriksaan power pada manual transmitter model yang digunakan.", "Follow the power checks in the manual for your transmitter model.") }
      ]
    },
    {
      id: "setting-mode",
      label: tr("Tidak masuk setting mode", "Cannot enter setting mode"),
      title: tr("Target belum siap menerima setting", "The target is not ready for settings"),
      summary: tr("SB-FH2 hanya dapat menulis pada target yang berada pada setting mode dan hanya satu unit boleh aktif.", "The SB-FH2 can write only to a target in setting mode, with only one unit active."),
      checks: [
        { title: tr("Manual target", "Target manual"), body: tr("Ulangi urutan masuk setting mode dari manual R-CM atau transmitter yang tepat.", "Repeat the setting-mode entry sequence in the correct R-CM or transmitter manual.") },
        { title: tr("Satu unit", "One unit"), body: tr("Keluarkan semua target lain dari setting mode sebelum mencoba lagi.", "Exit setting mode on all other targets before retrying.") },
        { title: tr("Coba lagi", "Retry"), body: tr("Saat target sudah siap, tekan GET atau SET lagi pada SB-FH2.", "Once the target is ready, retry GET or SET on the SB-FH2.") }
      ]
    },
    {
      id: "write-ng",
      label: tr("NG saat GET/SET", "NG on GET/SET"),
      title: tr("Read atau write tidak berhasil", "Read or write did not succeed"),
      summary: tr("NG biasanya perlu pemeriksaan setting mode, jumlah target aktif, dan jarak radio.", "NG calls for checking setting mode, number of active targets, and radio range."),
      checks: [
        { title: tr("Setting mode", "Setting mode"), body: tr("Pastikan target yang benar masih dalam setting mode.", "Confirm the intended target is still in setting mode.") },
        { title: tr("Satu target", "One target"), body: tr("Jangan biarkan dua transmitter atau receiver dalam setting mode bersamaan.", "Do not leave two transmitters or receivers in setting mode together.") },
        { title: tr("Readback", "Readback"), body: tr("Dekatkan SB-FH2, ulangi SET, tunggu OK, lalu tekan GET untuk memeriksa nilai.", "Move the SB-FH2 closer, retry SET, wait for OK, then press GET to check values.") }
      ]
    },
    {
      id: "settings-mismatch",
      label: tr("Nilai tidak cocok", "Settings differ"),
      title: tr("Group, code, atau ID tidak cocok", "Group, code, or ID does not match"),
      summary: tr("Receiver dan transmitter harus cocok pada field yang diperiksa oleh judgment code.", "Receiver and transmitter must match on each field checked by the judgment code."),
      checks: [
        { title: tr("Group dan mode", "Group and mode"), body: tr("Samakan Group 000-255 dan mode komunikasi R-CM(M-FH) atau R-FH pada kedua sisi.", "Match Group 000-255 and R-CM(M-FH) or R-FH communication mode on both sides.") },
        { title: tr("Code dan ID", "Code and IDs"), body: tr("Samakan judgment code. Code 1 memeriksa ID 3 digit, 2 memeriksa ID 7 karakter, 3 memeriksa keduanya.", "Match judgment code. Code 1 checks the 3-digit ID, 2 checks the 7-character ID, and 3 checks both.") },
        { title: tr("Output R-CM", "R-CM output"), body: tr("Pastikan Anda menulis ke output R1-R4 yang digunakan oleh station.", "Confirm you wrote to the R1-R4 output used by the station.") }
      ]
    },
    {
      id: "remote-not-found",
      label: tr("NOT FOUND / RF ERROR", "NOT FOUND / RF ERROR"),
      title: tr("R-CM remote tidak ditemukan", "Remote R-CM was not found"),
      summary: tr("Pencarian remote bergantung pada ID module, Group, jarak, dan kondisi radio.", "Remote search depends on the module ID, Group, range, and radio conditions."),
      checks: [
        { title: tr("Remote ID", "Remote ID"), body: tr("Periksa tujuh karakter pada label belakang M-FH; jangan memakai ID wrench.", "Check the seven characters on the back of M-FH; do not use the wrench ID.") },
        { title: tr("Jarak", "Range"), body: tr("Dekatkan SB-FH2 ke R-CM dan ulangi GET.", "Move the SB-FH2 closer to the R-CM and retry GET.") },
        { title: tr("Module", "Module"), body: tr("Pastikan R-CM memakai M-FH pada mode M-FH.", "Confirm the R-CM uses M-FH in M-FH mode.") }
      ]
    },
    {
      id: "radio-environment",
      label: tr("Signal tidak stabil", "Unstable signal"),
      title: tr("Lingkungan mengganggu komunikasi", "The environment disrupts communication"),
      summary: tr("Metal dan noise elektromagnetik dapat memperpendek jangkauan sekitar 10-20 m yang tercantum pada spesifikasi.", "Metal and electromagnetic noise can reduce the specified approximate 10-20 m range."),
      checks: [
        { title: tr("Posisi antenna", "Antenna position"), body: tr("Jauhkan antenna receiver dari pilar metal, kabel listrik, dan pipa besi; hindari posisi sejajar pipa.", "Move the receiver antenna away from metal pillars, electrical wires, and iron pipes; avoid aligning it parallel to pipes.") },
        { title: tr("Sumber noise", "Noise sources"), body: tr("Jauhkan alat dari welding machine, electric discharge machine, dan equipment penghasil noise.", "Move away from welding, electrical-discharge, and other noise-generating equipment.") },
        { title: tr("Group", "Group"), body: tr("Jika setting cocok tetapi komunikasi tetap gagal, pilih Group lain dan set ulang kedua sisi.", "If settings match but communication still fails, choose another Group and rewrite both sides.") }
      ]
    },
    {
      id: "wrong-module",
      label: tr("Module bukan M-FH", "Module is not M-FH"),
      title: tr("Mode dan module receiver tidak sesuai", "Receiver mode and module do not match"),
      summary: tr("Jalur R-CM(M-FH) pada panduan ini memerlukan module M-FH.", "The R-CM(M-FH) route in this guide requires an M-FH module."),
      checks: [
        { title: tr("Baca label", "Read the label"), body: tr("Pastikan module pada R-CM bertuliskan M-FH. M-FD digunakan untuk keluarga FD/FDD.", "Confirm the R-CM module is marked M-FH. M-FD is for the FD/FDD family.") },
        { title: tr("Mode baru", "New mode"), body: tr("Cocokkan pilihan R-CM(M-FH) pada receiver dan R-CM pada menu transmitter.", "Match R-CM(M-FH) on the receiver and R-CM in the transmitter menu.") }
      ]
    },
    {
      id: "unsafe-condition",
      label: tr("Kondisi tidak aman", "Unsafe condition"),
      title: tr("Hentikan penggunaan SB-FH2", "Stop using the SB-FH2"),
      summary: tr("Air, minyak, gas mudah terbakar, benturan, atau bau abnormal perlu ditangani sebelum melanjutkan.", "Water, oil, flammable gas, impact damage, or an abnormal smell must be addressed before continuing."),
      checks: [
        { title: tr("Hentikan", "Stop"), body: tr("Matikan alat dan pindahkan ke tempat aman jika ada bau atau panas abnormal.", "Switch off the unit and move it to a safe place if it smells or heats abnormally.") },
        { title: tr("Bantuan", "Get support"), body: tr("Jangan bongkar atau modifikasi. Hubungi distributor atau TOHNICHI jika masalah berlanjut.", "Do not disassemble or modify it. Contact the distributor or TOHNICHI if the problem persists.") }
      ]
    }
  ]
} satisfies GuideFlowDefinition;
