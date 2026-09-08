import type { GuideFlowDefinition } from "@/data/guideflows/types";

const fddImage = "/assets/brands/products/tohnichi/tohnichi_fdd.jpg";
const receiverImage = "/assets/brands/products/tohnichi/catalog/optional-equipment/r-cm.png";
const moduleImage = "/assets/brands/products/tohnichi/catalog/optional-equipment/m-fd.jpg";

export const fddRcmGuideFlow = {
  slug: "cspfdd-r-cm-connection",
  version: "1.0.0",
  status: "pilot",
  lastReviewed: "2026-09-05",
  source: {
    id: "TOHNICHI Wireless Data Transfer Torque Wrench CSPFD/CSPFDD Operating Instruction, bagian 3-7, 9-1, dan 10",
    en: "TOHNICHI Wireless Data Transfer Torque Wrench CSPFD/CSPFDD Operating Instruction, sections 3-7, 9-1, and 10"
  },
  title: {
    id: "Hubungkan FDD ke R-CM + M-FD",
    en: "Connect FDD to R-CM + M-FD"
  },
  description: {
    id: "Ikuti satu tindakan pada satu waktu. Setiap langkah menunjukkan hasil yang harus terlihat dan jalur perbaikan jika hasilnya berbeda.",
    en: "Follow one action at a time. Every step shows the result you should see and a recovery path when the result is different."
  },
  scope: {
    id: "Khusus FDD dengan receiver R-CM yang memakai radio module M-FD. Jangan gunakan M-FH untuk setup ini.",
    en: "For FDD with an R-CM receiver fitted with the M-FD radio module. Do not use M-FH for this setup."
  },
  estimatedTime: { id: "25-35 menit", en: "25-35 minutes" },
  presentation: {
    contactTopic: "cspfdd-rcm-setup",
    hero: {
      label: { id: "Kompatibilitas", en: "Compatibility" },
      ariaLabel: { id: "Koneksi wireless FDD ke R-CM dengan M-FD", en: "FDD wireless link to R-CM with M-FD" },
      leftImage: { src: fddImage, alt: { id: "TOHNICHI FDD", en: "TOHNICHI FDD" } },
      rightImage: { src: receiverImage, alt: { id: "TOHNICHI R-CM", en: "TOHNICHI R-CM" } },
      connectorLabel: { id: "2.4 GHz", en: "2.4 GHz" },
      connectorIcon: "radio"
    },
    completion: {
      eyebrow: { id: "GuideFlow selesai", en: "GuideFlow complete" },
      title: { id: "Koneksi selesai di-commission.", en: "Connection commissioned." },
      body: {
        id: "Catat receiver, Group CH, ID wrench, batas LOW/HIGH, unit, tanggal, dan hasil test sebelum release station.",
        en: "Record the receiver, Group CH, wrench IDs, LOW/HIGH limits, unit, date, and test results before releasing the station."
      }
    }
  },
  stages: [
    { id: "prepare", title: { id: "Siapkan hardware", en: "Prepare hardware" } },
    { id: "fdd", title: { id: "Set FDD", en: "Configure FDD" } },
    { id: "receiver", title: { id: "Set R-CM", en: "Configure R-CM" } },
    { id: "limits", title: { id: "Set judgment", en: "Set judgment" } },
    { id: "commission", title: { id: "Test koneksi", en: "Test connection" } }
  ],
  tasks: [
    {
      id: "new-connection",
      title: { id: "Hubungkan FDD dengan R-CM", en: "Connect FDD with R-CM" },
      description: { id: "Mulai dari pemasangan M-FD sampai commissioning.", en: "Start with M-FD installation and finish with commissioning." },
      startStepId: "power-off"
    },
    {
      id: "add-second-fdd",
      title: { id: "Tambahkan FDD kedua", en: "Add a second FDD" },
      description: { id: "Mulai dari setting Group, ID, dan JGC FDD.", en: "Start at the FDD Group, ID, and JGC settings." },
      startStepId: "turn-on-fdd"
    },
    {
      id: "fix-e01",
      title: { id: "Perbaiki error E01", en: "Resolve an E01 error" },
      description: { id: "Buka Fix Path untuk signal tanpa respons.", en: "Open the Fix Path for a no-response transmission." },
      startStepId: "send-test",
      issueId: "e01"
    }
  ],
  prerequisites: [
    { id: "R-CM, radio module M-FD, dan kedua antenna", en: "R-CM, M-FD radio module, and both antennas" },
    { id: "Satu atau dua FDD dengan ID 3 digit yang unik", en: "One or two FDD wrenches with unique 3-digit IDs" },
    { id: "Power DC 18-36 V untuk R-CM", en: "DC 18-36 V power for R-CM" },
    { id: "Batas torque LOW dan HIGH dari process specification", en: "LOW and HIGH torque limits from the process specification" }
  ],
  steps: [
    {
      id: "power-off",
      stageId: "prepare",
      title: { id: "Matikan sistem", en: "Power the system down" },
      instruction: { id: "Matikan R-CM dan equipment yang terhubung melalui kabel sebelum membuka cover receiver.", en: "Switch off the R-CM and any equipment wired to it before opening the receiver cover." },
      expected: { id: "Display R-CM mati dan tidak ada equipment terhubung yang aktif.", en: "The R-CM display is off and no connected equipment is active." },
      successLabel: { id: "Sistem sudah mati", en: "The system is off" },
      helpLabel: { id: "Sistem tidak bisa dimatikan", en: "I cannot power it down" },
      manualRef: "6-3",
      media: {
        type: "image",
        src: receiverImage,
        alt: { id: "Receiver TOHNICHI R-CM", en: "TOHNICHI R-CM receiver" },
        hotspot: { x: 54, y: 66, label: { id: "Pastikan display mati", en: "Confirm the display is off" }, align: "right" },
        note: { id: "Foto menunjukkan layout R-CM. Module pada unit Anda harus M-FD.", en: "The photo shows the R-CM layout. Your installed module must be M-FD." }
      },
      quickChecks: [
        { id: "Identifikasi sumber power R-CM sebelum melepaskannya.", en: "Identify the R-CM power source before disconnecting it." },
        { id: "Ikuti prosedur lockout atau izin kerja milik site Anda.", en: "Follow your site's lockout or work-permit procedure." }
      ],
      issueIds: ["receiver-power", "unsafe-condition"]
    },
    {
      id: "install-mfd",
      stageId: "prepare",
      title: { id: "Pasang M-FD dan antenna", en: "Install M-FD and the antennas" },
      instruction: { id: "Pasang kedua antenna pada M-FD, lalu seat module pada board R-CM tanpa menjepit metal fitting. Jangan dipaksa.", en: "Attach both antennas to M-FD, then seat the module on the R-CM board without pinching the metal fittings. Do not force it." },
      expected: { id: "Module duduk rata, kedua fitting masuk groove, dan kedua antenna terpasang.", en: "The module sits evenly, both fittings enter their grooves, and both antennas are attached." },
      successLabel: { id: "M-FD terpasang", en: "M-FD is installed" },
      helpLabel: { id: "Module tidak pas", en: "The module does not fit" },
      manualRef: "6-3",
      media: {
        type: "image",
        src: moduleImage,
        alt: { id: "Radio module TOHNICHI M-FD dengan dua antenna", en: "TOHNICHI M-FD radio module with two antennas" },
        hotspot: { x: 50, y: 58, label: { id: "Label harus M-FD", en: "The label must read M-FD" } }
      },
      quickChecks: [
        { id: "Pastikan label module adalah M-FD, bukan M-FH.", en: "Confirm the module label reads M-FD, not M-FH." },
        { id: "Periksa orientasi module dan posisi kedua metal fitting.", en: "Check the module orientation and both metal fittings." },
        { id: "Hentikan pemasangan jika module harus dipaksa.", en: "Stop if the module requires force." }
      ],
      issueIds: ["module-fit", "wrong-module"]
    },
    {
      id: "power-rcm",
      stageId: "prepare",
      title: { id: "Nyalakan R-CM", en: "Power on the R-CM" },
      instruction: { id: "Tutup receiver, hubungkan power DC 18-36 V, lalu nyalakan R-CM dalam normal mode.", en: "Close the receiver, connect DC 18-36 V power, then switch the R-CM on in normal mode." },
      expected: { id: "Display R-CM menyala tanpa error.", en: "The R-CM display turns on without an error." },
      successLabel: { id: "Display R-CM menyala", en: "The R-CM display is on" },
      helpLabel: { id: "R-CM tidak menyala", en: "The R-CM will not turn on" },
      manualRef: "3 / 6-3",
      media: {
        type: "image",
        src: receiverImage,
        alt: { id: "Panel depan receiver TOHNICHI R-CM", en: "Front panel of the TOHNICHI R-CM receiver" },
        hotspot: { x: 50, y: 57, label: { id: "Display harus aktif", en: "The display should be active" } },
        note: { id: "Foto menunjukkan layout R-CM. Gunakan M-FD untuk guide ini.", en: "The photo shows the R-CM layout. Use M-FD for this guide." }
      },
      quickChecks: [
        { id: "Ukur dan konfirmasi supply berada dalam DC 18-36 V.", en: "Measure and confirm the supply is within DC 18-36 V." },
        { id: "Periksa terminal, polarity, dan protective device sesuai wiring site.", en: "Check terminals, polarity, and protective devices against the site wiring." }
      ],
      issueIds: ["receiver-power", "receiver-error"]
    },
    {
      id: "turn-on-fdd",
      stageId: "fdd",
      title: { id: "Nyalakan FDD", en: "Turn on the FDD" },
      instruction: { id: "Tekan tombol POWER pada transmitter FDD.", en: "Press the POWER key on the FDD transmitter." },
      expected: { id: "LCD FDD menyala dan menampilkan normal measurement screen.", en: "The FDD LCD turns on and shows the normal measurement screen." },
      successLabel: { id: "Display FDD menyala", en: "The FDD display is on" },
      helpLabel: { id: "FDD tidak menyala", en: "The FDD will not turn on" },
      manualRef: "9-1 BASIC",
      media: {
        type: "image",
        src: fddImage,
        alt: { id: "Torque wrench TOHNICHI FDD dengan transmitter", en: "TOHNICHI FDD torque wrench with transmitter" },
        hotspot: { x: 54, y: 30, label: { id: "Tekan POWER", en: "Press POWER" }, align: "right" }
      },
      quickChecks: [
        { id: "Pastikan dua battery AAA sejenis terpasang: nickel-metal hydride atau alkaline.", en: "Confirm two matching AAA batteries are installed: nickel-metal hydride or alkaline." },
        { id: "Jangan campur merek, tipe, usia, atau charge state battery.", en: "Do not mix battery brands, types, ages, or charge states." },
        { id: "Perhatikan apakah display sempat menyala atau menunjukkan kode error.", en: "Watch for a brief display or an error code." }
      ],
      issueIds: ["fdd-no-power", "unexpected-screen", "fdd-error"]
    },
    {
      id: "enter-uset",
      stageId: "fdd",
      title: { id: "Masuk ke USET", en: "Enter USET" },
      instruction: { id: "Tahan SET selama 1 detik. Lepaskan saat USET tampil dan LED berkedip.", en: "Hold SET for 1 second. Release it when USET appears and the LED flashes." },
      expected: { id: "Display menunjukkan USET dan LED berkedip.", en: "The display shows USET and the LED flashes." },
      successLabel: { id: "USET tampil", en: "I see USET" },
      helpLabel: { id: "USET tidak tampil", en: "USET does not appear" },
      manualRef: "9-1 BASIC",
      media: {
        type: "image",
        src: fddImage,
        alt: { id: "Panel transmitter FDD", en: "FDD transmitter control panel" },
        hotspot: { x: 47, y: 31, label: { id: "Tahan SET 1 detik", en: "Hold SET for 1 second" }, align: "left" }
      },
      quickChecks: [
        { id: "Mulai dari normal measurement screen.", en: "Start from the normal measurement screen." },
        { id: "Tahan SET penuh selama 1 detik, lalu lepaskan.", en: "Hold SET for a full second, then release it." }
      ],
      issueIds: ["unexpected-screen", "button-response"]
    },
    {
      id: "set-group",
      stageId: "fdd",
      title: { id: "Set Group CH", en: "Set the Group CH" },
      instruction: { id: "Pilih KEY, lalu BASE. Pada GR, masukkan Group CH yang direncanakan dan tekan TEST untuk menyimpan.", en: "Choose KEY, then BASE. At GR, enter the planned Group CH and press TEST to save it." },
      expected: { id: "Nilai GR yang tersimpan sama dengan GROUP pada R-CM yang dituju.", en: "The saved GR value matches the GROUP that will be used on the assigned R-CM." },
      successLabel: { id: "Group CH sudah benar", en: "The Group CH is correct" },
      helpLabel: { id: "Tidak bisa set Group", en: "I cannot set the Group" },
      manualRef: "9-1 BASIC",
      media: {
        type: "image",
        src: fddImage,
        alt: { id: "Display dan tombol transmitter FDD", en: "FDD transmitter display and controls" },
        hotspot: { x: 50, y: 48, label: { id: "GR harus sama dengan R-CM", en: "GR must match the R-CM" } }
      },
      quickChecks: [
        { id: "POWER menaikkan nilai; tahan POWER dan tekan TEST untuk menurunkannya.", en: "POWER counts up; hold POWER and press TEST to count down." },
        { id: "Gunakan Group berbeda untuk setiap receiver yang berdekatan.", en: "Use a different Group for every adjacent receiver." }
      ],
      issueIds: ["unexpected-screen", "group-mismatch"]
    },
    {
      id: "set-id-jgc",
      stageId: "fdd",
      title: { id: "Set ID dan JGC", en: "Set the ID and JGC" },
      instruction: { id: "Masukkan ID 3 digit yang unik. Samakan JGC dengan R-CM. Gunakan JGC 1 agar R-CM dapat membedakan ID1 dan ID2; gunakan JGC 0 hanya bila penerimaan tanpa identifikasi ID memang disengaja.", en: "Enter a unique 3-digit ID and match JGC to the R-CM. Use JGC 1 so the R-CM can distinguish ID1 and ID2; use JGC 0 only when reception without ID identification is intentional." },
      expected: { id: "ID unik tersimpan, JGC sudah ditetapkan, dan FDD kembali ke normal mode.", en: "The unique ID is saved, JGC is set, and the FDD returns to normal mode." },
      successLabel: { id: "ID dan JGC tersimpan", en: "ID and JGC are saved" },
      helpLabel: { id: "Setting tidak tersimpan", en: "The settings will not save" },
      manualRef: "9-1 BASIC",
      media: {
        type: "image",
        src: fddImage,
        alt: { id: "Transmitter FDD untuk setting ID dan JGC", en: "FDD transmitter for ID and JGC setup" },
        hotspot: { x: 51, y: 49, label: { id: "Simpan ID lalu JGC", en: "Save ID, then JGC" } }
      },
      quickChecks: [
        { id: "Catat ID sebelum memasukkannya ke receiver.", en: "Record the ID before entering it on the receiver." },
        { id: "Pastikan tidak ada dua wrench dengan ID sama pada Group tersebut.", en: "Confirm no two wrenches share an ID in that Group." }
      ],
      issueIds: ["id-mismatch", "unexpected-screen"]
    },
    {
      id: "open-rcm-settings",
      stageId: "receiver",
      title: { id: "Buka setting R-CM", en: "Open the R-CM settings" },
      instruction: { id: "Tahan SET selama 2 detik. Tekan SELECT sampai MODEL tampil, lalu tekan SET.", en: "Hold SET for 2 seconds. Press SELECT until MODEL appears, then press SET." },
      expected: { id: "Menu MODEL terbuka pada display R-CM.", en: "The MODEL menu is open on the R-CM display." },
      successLabel: { id: "MODEL tampil", en: "MODEL is displayed" },
      helpLabel: { id: "Menu tidak terbuka", en: "The menu does not open" },
      manualRef: "10-2 MODEL",
      media: {
        type: "image",
        src: receiverImage,
        alt: { id: "Panel SET dan SELECT pada R-CM", en: "SET and SELECT controls on the R-CM" },
        hotspot: { x: 58, y: 61, label: { id: "Tahan SET 2 detik", en: "Hold SET for 2 seconds" } },
        note: { id: "Foto menunjukkan layout R-CM. Gunakan M-FD untuk guide ini.", en: "The photo shows the R-CM layout. Use M-FD for this guide." }
      },
      quickChecks: [
        { id: "Pastikan receiver menyala dan tidak sedang memproses signal.", en: "Confirm the receiver is on and not processing a signal." },
        { id: "Tahan SET penuh selama 2 detik.", en: "Hold SET for a full 2 seconds." }
      ],
      issueIds: ["receiver-error", "button-response"]
    },
    {
      id: "match-radio",
      stageId: "receiver",
      title: { id: "Samakan MODEL, GROUP, dan JGC", en: "Match MODEL, GROUP, and JGC" },
      instruction: { id: "Biarkan MODEL = R-FHD. Set GROUP sama dengan GR pada FDD dan set JGC ke nilai yang sama.", en: "Keep MODEL = R-FHD. Set GROUP to the FDD GR value and set JGC to the same value." },
      expected: { id: "FDD dan R-CM memiliki Group dan JGC yang sama.", en: "The FDD and R-CM now have matching Group and JGC values." },
      successLabel: { id: "Radio setting cocok", en: "The radio settings match" },
      helpLabel: { id: "Nilai tidak cocok", en: "The values do not match" },
      manualRef: "10-2 MODEL",
      media: {
        type: "image",
        src: receiverImage,
        alt: { id: "Display setting R-CM", en: "R-CM settings display" },
        hotspot: { x: 49, y: 56, label: { id: "MODEL R-FHD + GROUP sama", en: "MODEL R-FHD + matching GROUP" }, align: "left" },
        note: { id: "Jangan gunakan kembali Group yang sama pada R-CM yang berdekatan.", en: "Do not reuse the same Group on an adjacent R-CM." }
      },
      quickChecks: [
        { id: "Bandingkan angka Group digit demi digit.", en: "Compare the Group numbers digit by digit." },
        { id: "Untuk profile ID1/ID2, gunakan JGC 1 pada FDD dan receiver. JGC 0 menonaktifkan identifikasi ID.", en: "For ID1/ID2 profiles, use JGC 1 on the FDD and receiver. JGC 0 disables ID identification." }
      ],
      issueIds: ["group-mismatch", "unexpected-screen"]
    },
    {
      id: "assign-ids",
      stageId: "limits",
      title: { id: "Masukkan ID1 dan ID2", en: "Enter ID1 and ID2" },
      instruction: { id: "Buka BASE. Masukkan ID FDD pertama sebagai ID1 dan ID FDD kedua sebagai ID2 bila digunakan.", en: "Open BASE. Enter the first FDD ID as ID1 and the second FDD ID as ID2 when used." },
      expected: { id: "Setiap ID R-CM sama persis dengan ID wrench yang ditugaskan.", en: "Each R-CM ID exactly matches its assigned wrench ID." },
      successLabel: { id: "ID1/ID2 cocok", en: "ID1/ID2 match" },
      helpLabel: { id: "Receiver tidak menerima ID", en: "The receiver will not accept the ID" },
      manualRef: "10-3 BASE",
      media: {
        type: "image",
        src: receiverImage,
        alt: { id: "Display dan tombol receiver R-CM", en: "R-CM receiver display and controls" },
        hotspot: { x: 50, y: 58, label: { id: "Masukkan ID 3 digit", en: "Enter the 3-digit ID" } },
        note: { id: "SELECT mengubah nilai; SET pindah digit dan menyimpan.", en: "SELECT changes the value; SET moves digits and saves." }
      },
      quickChecks: [
        { id: "Cocokkan ketiga digit dengan catatan ID FDD.", en: "Match all three digits to the recorded FDD ID." },
        { id: "Gunakan hanya ID1 bila hanya satu wrench ditugaskan.", en: "Use only ID1 when assigning one wrench." }
      ],
      issueIds: ["id-mismatch", "unexpected-screen"]
    },
    {
      id: "set-limits",
      stageId: "limits",
      title: { id: "Masukkan LOW dan HIGH", en: "Enter LOW and HIGH limits" },
      instruction: { id: "Pilih UNIT dari process specification. Masukkan LO-T dan HI-T untuk setiap ID; HIGH harus lebih besar daripada LOW.", en: "Choose the UNIT from the process specification. Enter LO-T and HI-T for each ID; HIGH must be greater than LOW." },
      expected: { id: "Unit dan acceptance limit pada R-CM sama dengan control plan yang disetujui.", en: "The unit and acceptance limits on the R-CM match the approved control plan." },
      successLabel: { id: "Limit sudah benar", en: "The limits are correct" },
      helpLabel: { id: "Tidak yakin dengan limit", en: "I am unsure about the limits" },
      manualRef: "10-3 BASE",
      media: {
        type: "image",
        src: receiverImage,
        alt: { id: "Panel R-CM untuk setting judgment torque", en: "R-CM panel for torque judgment settings" },
        hotspot: { x: 50, y: 57, label: { id: "LO-T < HI-T", en: "LO-T < HI-T" } },
        note: { id: "Biarkan HI-A/LO-A = 000.0 untuk FDD biasa; field angle digunakan untuk FDD-AD.", en: "Leave HI-A/LO-A at 000.0 for regular FDD; angle fields are for FDD-AD." }
      },
      quickChecks: [
        { id: "Ambil limit dari drawing, customer specification, atau approved control plan.", en: "Use limits from the drawing, customer specification, or approved control plan." },
        { id: "Jangan membuat limit dari rating accuracy wrench.", en: "Do not derive process limits from the wrench accuracy rating." }
      ],
      issueIds: ["limit-uncertain", "unexpected-screen"]
    },
    {
      id: "send-test",
      stageId: "commission",
      title: { id: "Kirim test dari satu FDD", en: "Send a test from one FDD" },
      instruction: { id: "Keluarkan FDD dan R-CM dari setting mode. Gunakan hanya wrench 1, lakukan tightening dalam range, lalu lepaskan load sepenuhnya.", en: "Exit setting mode on the FDD and R-CM. Use wrench 1 only, tighten within range, then fully release the load." },
      expected: { id: "R-CM menerima profile yang benar dan FDD memberi feedback LED.", en: "The R-CM receives the correct profile and the FDD provides LED feedback." },
      successLabel: { id: "R-CM menerima data", en: "The R-CM received the data" },
      helpLabel: { id: "Tidak ada response", en: "There is no response" },
      manualRef: "3 / 10 / 12",
      media: {
        type: "image",
        src: fddImage,
        alt: { id: "FDD mengirim data torque ke receiver", en: "FDD sending torque data to the receiver" },
        hotspot: { x: 49, y: 37, label: { id: "Perhatikan LED dan display", en: "Watch the LED and display" } },
        note: { id: "Biru = OK; merah = judgment NG; merah berkedip + E01 = tidak ada response.", en: "Blue = OK; red = NG judgment; flashing red + E01 = no response." }
      },
      quickChecks: [
        { id: "Pastikan hanya satu FDD yang mengirim saat test.", en: "Confirm only one FDD is transmitting during the test." },
        { id: "Tekan POWER untuk resend nilai yang tampil setelah E01.", en: "Press POWER to resend the displayed value after E01." },
        { id: "Untuk test koneksi, tekan TEST untuk mengirim nilai yang tampil.", en: "For a connection test, press TEST to transmit the displayed value." }
      ],
      issueIds: ["e01", "judgment-ng", "group-mismatch", "id-mismatch"]
    },
    {
      id: "verify-second",
      stageId: "commission",
      title: { id: "Test FDD kedua", en: "Test the second FDD" },
      instruction: { id: "Matikan atau sisihkan wrench 1. Ulangi test dengan wrench 2 dan catat Group, ID, LOW, HIGH, unit, dan hasil.", en: "Power down or set aside wrench 1. Repeat the test with wrench 2 and record Group, ID, LOW, HIGH, unit, and result." },
      expected: { id: "Setiap wrench diterima oleh profile yang benar dan test commissioning tercatat.", en: "Each wrench is received by the correct profile and the commissioning test is recorded." },
      successLabel: { id: "Commissioning selesai", en: "Commissioning is complete" },
      helpLabel: { id: "Wrench kedua gagal", en: "The second wrench fails" },
      manualRef: "3 / 10",
      media: {
        type: "image",
        src: fddImage,
        alt: { id: "Torque wrench FDD yang selesai dikonfigurasi", en: "Configured FDD torque wrench" },
        hotspot: { x: 50, y: 40, label: { id: "Test satu per satu", en: "Test one at a time" } }
      },
      quickChecks: [
        { id: "Pastikan wrench 1 tidak mengirim saat wrench 2 ditest.", en: "Confirm wrench 1 is not transmitting while wrench 2 is tested." },
        { id: "Cocokkan ID wrench 2 dengan ID2 serta LO-T2/HI-T2.", en: "Match wrench 2's ID to ID2 and LO-T2/HI-T2." }
      ],
      issueIds: ["e01", "id-mismatch", "judgment-ng"]
    }
  ],
  issues: [
    {
      id: "fdd-no-power",
      label: { id: "Tidak ada display", en: "No display" },
      title: { id: "FDD tidak menyala", en: "FDD will not power on" },
      summary: { id: "Periksa sumber power FDD sebelum melanjutkan ke setting.", en: "Check the FDD power source before continuing to settings." },
      checks: [
        { title: { id: "Battery", en: "Batteries" }, body: { id: "Gunakan dua AAA nickel-metal hydride atau dua AAA alkaline dengan tipe, merek, dan charge state yang sama; periksa orientasinya.", en: "Use two AAA nickel-metal hydride batteries or two AAA alkaline batteries with matching type, brand, and charge state; check their orientation." } },
        { title: { id: "Kontak", en: "Contacts" }, body: { id: "Periksa contact battery dan pasang kembali cover dengan benar.", en: "Inspect the battery contacts and refit the cover correctly." } },
        { title: { id: "Coba ulang", en: "Retry" }, body: { id: "Tekan POWER dan perhatikan apakah LCD menyala sesaat atau menampilkan error.", en: "Press POWER and watch for a brief LCD response or error." } },
        { title: { id: "Hentikan bila rusak", en: "Stop if damaged" }, body: { id: "Jangan gunakan battery yang bocor, membengkak, panas, atau rusak. Hubungi CSE.", en: "Do not use leaking, swollen, hot, or damaged batteries. Contact CSE." } }
      ]
    },
    {
      id: "e01",
      label: { id: "Error E01 muncul", en: "E01 appeared" },
      title: { id: "E01 - receiver tidak memberi response", en: "E01 - no response from the receiver" },
      summary: { id: "Ubah satu hal pada satu waktu dan resend setelah setiap koreksi.", en: "Change one thing at a time and resend after each correction." },
      checks: [
        { title: { id: "M-FD dan power", en: "M-FD and power" }, body: { id: "Pastikan module adalah M-FD, kedua antenna terpasang, dan R-CM menyala di normal mode.", en: "Confirm the module is M-FD, both antennas are attached, and the R-CM is on in normal mode." } },
        { title: { id: "GROUP dan JGC", en: "GROUP and JGC" }, body: { id: "Samakan Group CH dan JGC pada FDD dengan R-CM. Gunakan JGC 1 bila receiver harus memilih profile ID1 atau ID2; JGC 0 hanya untuk penerimaan tanpa identifikasi ID.", en: "Match the FDD Group CH and JGC to the R-CM. Use JGC 1 when the receiver must select the ID1 or ID2 profile; JGC 0 is only for reception without ID identification." } },
        { title: { id: "ID1 / ID2", en: "ID1 / ID2" }, body: { id: "Cocokkan ID 3 digit FDD dengan profile ID1 atau ID2 pada BASE R-CM.", en: "Match the FDD's 3-digit ID to its ID1 or ID2 profile in R-CM BASE." } },
        { title: { id: "Area radio", en: "Radio area" }, body: { id: "Test pada jarak dekat dan jauhkan antenna dari metal, kabel paralel, welding machine, atau electromagnetic noise kuat.", en: "Test at close range and keep antennas away from metal, parallel wiring, welding machines, or strong electromagnetic noise." } },
        { title: { id: "Resend", en: "Resend" }, body: { id: "Pastikan tidak ada wrench kedua yang mengirim. Tekan POWER untuk resend nilai yang tampil.", en: "Confirm no second wrench is transmitting. Press POWER to resend the displayed value." } }
      ]
    },
    {
      id: "group-mismatch",
      label: { id: "Group tidak cocok", en: "Group does not match" },
      title: { id: "FDD dan R-CM memakai Group berbeda", en: "FDD and R-CM use different Groups" },
      summary: { id: "Group memilih radio network; nilainya harus sama di dalam satu pasangan.", en: "Group selects the radio network; it must match within one assigned set." },
      checks: [
        { title: { id: "Catat FDD GR", en: "Record FDD GR" }, body: { id: "Buka BASIC pada FDD dan catat ketiga digit GR.", en: "Open BASIC on the FDD and record all three GR digits." } },
        { title: { id: "Bandingkan R-CM", en: "Compare R-CM" }, body: { id: "Buka MODEL pada R-CM dan samakan GROUP dengan GR FDD.", en: "Open MODEL on the R-CM and match GROUP to the FDD GR." } },
        { title: { id: "Cek receiver sekitar", en: "Check adjacent receivers" }, body: { id: "Gunakan Group berbeda pada setiap R-CM yang berdekatan untuk mencegah cross-talk.", en: "Use a different Group on every adjacent R-CM to prevent cross-talk." } }
      ]
    },
    {
      id: "id-mismatch",
      label: { id: "ID tidak dikenali", en: "ID is not recognized" },
      title: { id: "ID FDD tidak cocok dengan ID1/ID2", en: "FDD ID does not match ID1/ID2" },
      summary: { id: "Receiver memakai ID untuk memilih profile judgment yang benar.", en: "The receiver uses the ID to select the correct judgment profile." },
      checks: [
        { title: { id: "Catat ID FDD", en: "Record the FDD ID" }, body: { id: "Buka BASIC dan catat ketiga digit ID wrench.", en: "Open BASIC and record all three digits of the wrench ID." } },
        { title: { id: "Cocokkan profile", en: "Match the profile" }, body: { id: "Pada BASE R-CM, masukkan ID tersebut ke ID1 atau ID2.", en: "In R-CM BASE, enter that ID under ID1 or ID2." } },
        { title: { id: "Pastikan unik", en: "Keep it unique" }, body: { id: "Jangan gunakan ID yang sama untuk dua wrench dalam Group yang sama.", en: "Do not use the same ID for two wrenches in the same Group." } }
      ]
    },
    {
      id: "judgment-ng",
      label: { id: "LED merah / NG", en: "Red LED / NG" },
      title: { id: "Komunikasi berhasil tetapi judgment NG", en: "Communication succeeded but judgment is NG" },
      summary: { id: "LED merah berarti data diterima tetapi hasil tidak memenuhi torque atau double-tightening judgment.", en: "A red LED means data was received but failed torque or double-tightening judgment." },
      checks: [
        { title: { id: "Periksa hasil torque", en: "Check torque result" }, body: { id: "Bandingkan nilai aktual dengan LO-T dan HI-T untuk ID tersebut.", en: "Compare the actual value with LO-T and HI-T for that ID." } },
        { title: { id: "Periksa unit", en: "Check the unit" }, body: { id: "Pastikan UNIT pada R-CM sama dengan process specification dan FDD.", en: "Confirm the R-CM UNIT matches the process specification and FDD." } },
        { title: { id: "Double tightening", en: "Double tightening" }, body: { id: "Untuk test koneksi, buat trigger torque atau judgment angle = 0, atau tekan TEST untuk mengirim nilai display.", en: "For a connection test, set trigger torque or judgment angle to 0, or press TEST to send the displayed value." } }
      ]
    },
    {
      id: "receiver-power",
      label: { id: "R-CM tidak menyala", en: "R-CM has no power" },
      title: { id: "Tidak ada power pada R-CM", en: "R-CM has no power" },
      summary: { id: "Verifikasi supply dan wiring sebelum memeriksa komunikasi radio.", en: "Verify the supply and wiring before checking radio communication." },
      checks: [
        { title: { id: "Supply", en: "Supply" }, body: { id: "Konfirmasi supply DC 18-36 V dengan alat ukur yang sesuai.", en: "Confirm a DC 18-36 V supply with an appropriate meter." } },
        { title: { id: "Wiring", en: "Wiring" }, body: { id: "Periksa terminal, polarity, fuse, dan protective device sesuai drawing site.", en: "Check terminals, polarity, fuse, and protective devices against the site drawing." } },
        { title: { id: "Jangan buka saat aktif", en: "Do not open live" }, body: { id: "Matikan dan isolasi power sebelum membuka receiver atau menyentuh board.", en: "Switch off and isolate power before opening the receiver or touching its board." } }
      ]
    },
    {
      id: "wrong-module",
      label: { id: "Module bukan M-FD", en: "The module is not M-FD" },
      title: { id: "Module radio tidak kompatibel", en: "The radio module is incompatible" },
      summary: { id: "FDD memerlukan M-FD pada R-CM; M-FH ditujukan untuk family tool lain.", en: "FDD requires M-FD in the R-CM; M-FH is intended for another tool family." },
      checks: [
        { title: { id: "Baca label", en: "Read the label" }, body: { id: "Pastikan label pada module tertulis M-FD.", en: "Confirm the module label reads M-FD." } },
        { title: { id: "Ganti dengan aman", en: "Replace safely" }, body: { id: "Matikan dan isolasi receiver sebelum mengganti module.", en: "Switch off and isolate the receiver before replacing the module." } }
      ]
    },
    {
      id: "module-fit",
      label: { id: "Module tidak masuk", en: "The module will not seat" },
      title: { id: "M-FD tidak duduk dengan benar", en: "M-FD does not seat correctly" },
      summary: { id: "Jangan paksa module karena fitting atau groove dapat rusak.", en: "Do not force the module because the fittings or grooves may be damaged." },
      checks: [
        { title: { id: "Orientasi", en: "Orientation" }, body: { id: "Keluarkan module, periksa orientasi board, lalu sejajarkan kembali.", en: "Remove the module, check board orientation, and realign it." } },
        { title: { id: "Metal fitting", en: "Metal fittings" }, body: { id: "Pastikan kedua fitting masuk ke groove tanpa terjepit.", en: "Confirm both fittings enter the grooves without being pinched." } },
        { title: { id: "Stop", en: "Stop" }, body: { id: "Jika masih memerlukan force, hentikan pemasangan dan hubungi CSE.", en: "If it still requires force, stop installation and contact CSE." } }
      ]
    },
    {
      id: "unexpected-screen",
      label: { id: "Tampilan berbeda", en: "The screen is different" },
      title: { id: "Menu yang diharapkan tidak tampil", en: "The expected menu does not appear" },
      summary: { id: "Kembali ke normal mode, lalu ulangi urutan tombol dari awal.", en: "Return to normal mode, then repeat the key sequence from the beginning." },
      checks: [
        { title: { id: "Keluar dari menu", en: "Exit the menu" }, body: { id: "Tekan SET sesuai manual sampai device kembali ke normal mode.", en: "Use SET as described in the manual until the device returns to normal mode." } },
        { title: { id: "Ulangi timing", en: "Repeat the timing" }, body: { id: "Ulangi hold SET selama 1 detik pada FDD atau 2 detik pada R-CM.", en: "Repeat the SET hold for 1 second on FDD or 2 seconds on R-CM." } },
        { title: { id: "Catat display", en: "Record the display" }, body: { id: "Jika tetap berbeda, foto display dan kirim bersama model serta serial number ke CSE.", en: "If it remains different, photograph the display and send it with the model and serial number to CSE." } }
      ]
    },
    {
      id: "receiver-error",
      label: { id: "R-CM menampilkan error", en: "R-CM shows an error" },
      title: { id: "R-CM tidak masuk normal mode", en: "R-CM does not enter normal mode" },
      summary: { id: "Catat error sebelum mengubah setting atau power-cycling.", en: "Record the error before changing settings or cycling power." },
      checks: [
        { title: { id: "Catat kode", en: "Record the code" }, body: { id: "Foto display dan catat kapan error muncul.", en: "Photograph the display and note when the error appears." } },
        { title: { id: "Periksa module", en: "Check the module" }, body: { id: "Matikan power, lalu pastikan M-FD terpasang rata dan harness tidak terjepit.", en: "Switch off power, then confirm M-FD is seated evenly and no harness is pinched." } },
        { title: { id: "Eskalasi", en: "Escalate" }, body: { id: "Jika error tetap ada, jangan initialize receiver; hubungi CSE dengan foto dan setting terakhir.", en: "If the error remains, do not initialize the receiver; contact CSE with the photo and last settings." } }
      ]
    },
    {
      id: "button-response",
      label: { id: "Tombol tidak merespons", en: "A button does not respond" },
      title: { id: "Tombol tidak menghasilkan perubahan", en: "A button produces no change" },
      summary: { id: "Pastikan device berada pada mode yang benar dan gunakan durasi tekan yang ditentukan.", en: "Confirm the device is in the correct mode and use the specified press duration." },
      checks: [
        { title: { id: "Normal mode", en: "Normal mode" }, body: { id: "Keluar dari menu yang aktif dan mulai kembali dari normal mode.", en: "Exit the active menu and start again from normal mode." } },
        { title: { id: "Durasi", en: "Duration" }, body: { id: "Gunakan 1 detik untuk FDD dan 2 detik untuk R-CM saat menahan SET.", en: "Use 1 second for FDD and 2 seconds for R-CM when holding SET." } },
        { title: { id: "Kerusakan fisik", en: "Physical damage" }, body: { id: "Jika tombol macet atau rusak, hentikan dan minta inspeksi CSE.", en: "If the button is stuck or damaged, stop and request a CSE inspection." } }
      ]
    },
    {
      id: "fdd-error",
      label: { id: "Kode error muncul", en: "An error code appeared" },
      title: { id: "FDD menampilkan kode error", en: "FDD shows an error code" },
      summary: { id: "Catat kode persis sebelum melakukan reset atau mengganti setting.", en: "Record the exact code before resetting or changing settings." },
      checks: [
        { title: { id: "E01", en: "E01" }, body: { id: "Jika kodenya E01, gunakan Fix Path E01 pada halaman ini.", en: "If the code is E01, use the E01 Fix Path on this page." } },
        { title: { id: "Kode lain", en: "Another code" }, body: { id: "Foto display dan kirim model, serial number, dan kondisi saat error ke CSE.", en: "Photograph the display and send the model, serial number, and error conditions to CSE." } }
      ]
    },
    {
      id: "limit-uncertain",
      label: { id: "Belum tahu LOW/HIGH", en: "LOW/HIGH are unknown" },
      title: { id: "Process limit belum dikonfirmasi", en: "Process limits are not confirmed" },
      summary: { id: "Jangan melanjutkan commissioning dengan limit perkiraan.", en: "Do not commission with estimated limits." },
      checks: [
        { title: { id: "Sumber resmi", en: "Approved source" }, body: { id: "Ambil target dan tolerance dari drawing, customer specification, atau approved control plan.", en: "Get the target and tolerance from the drawing, customer specification, or approved control plan." } },
        { title: { id: "Hitung limit", en: "Calculate limits" }, body: { id: "LOW = target - lower tolerance. HIGH = target + upper tolerance.", en: "LOW = target - lower tolerance. HIGH = target + upper tolerance." } },
        { title: { id: "Approval", en: "Approval" }, body: { id: "Minta engineering atau quality menyetujui nilai sebelum memasukkannya ke R-CM.", en: "Have engineering or quality approve the values before entering them on the R-CM." } }
      ]
    },
    {
      id: "unsafe-condition",
      label: { id: "Kondisi tidak aman", en: "The condition is unsafe" },
      title: { id: "Hentikan pekerjaan dan isolasi equipment", en: "Stop work and isolate the equipment" },
      summary: { id: "Guide ini tidak menggantikan prosedur keselamatan site.", en: "This guide does not replace the site's safety procedure." },
      checks: [
        { title: { id: "Stop", en: "Stop" }, body: { id: "Jangan membuka receiver atau mengubah wiring dalam kondisi energized.", en: "Do not open the receiver or change wiring while energized." } },
        { title: { id: "Ikuti prosedur site", en: "Follow site procedure" }, body: { id: "Gunakan isolation, lockout, dan work permit yang diwajibkan site.", en: "Use the isolation, lockout, and work-permit controls required by the site." } }
      ]
    }
  ]
} satisfies GuideFlowDefinition;
