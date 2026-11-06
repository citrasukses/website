import type { LocalizedText } from "@/lib/i18n";

export type TohnichiFieldPhoto = {
  slug: string;
  width: number;
  height: number;
  title: LocalizedText;
  caption: LocalizedText;
  alt: LocalizedText;
};

// Only use the face-free images explicitly selected in prepare-seminar-images.
// Client names, event dates, and testimonials require confirmed event notes.
export const tohnichiFieldPhotos: TohnichiFieldPhoto[] = [
  {
    slug: "hands-on-tightening-redacted",
    width: 1440,
    height: 1080,
    title: { id: "Praktik pengencangan", en: "Hands-on tightening" },
    caption: {
      id: "Demonstrasi penggunaan kunci torsi pada sambungan komponen.",
      en: "Demonstrating a torque wrench on a component joint."
    },
    alt: {
      id: "Tangan menggunakan kunci torsi TOHNICHI pada komponen di stand demonstrasi.",
      en: "Hands using a TOHNICHI torque wrench on a component mounted on a demonstration stand."
    }
  },
  {
    slug: "torque-reading",
    width: 1440,
    height: 1080,
    title: { id: "Kalibrasi kunci torsi", en: "Torque wrench calibration" },
    caption: {
      id: "Kalibrasi kunci torsi digital menggunakan TOHNICHI DOTE.",
      en: "Calibrating a digital torque wrench using a TOHNICHI DOTE."
    },
    alt: {
      id: "Tangan menunjuk display TOHNICHI DOTE saat kalibrasi kunci torsi digital.",
      en: "A hand pointing to the TOHNICHI DOTE display during digital torque wrench calibration."
    }
  },
  {
    slug: "torque-measurement",
    width: 1440,
    height: 1080,
    title: { id: "Pengukuran", en: "Measurement" },
    caption: {
      id: "Pengukuran destruktif dengan alat digital di area produksi.",
      en: "Measurement with a digital tool in the production area."
    },
    alt: {
      id: "Tangan memegang alat ukur digital di dekat komponen pada area produksi.",
      en: "Hands holding a digital measuring tool near components in a production area."
    }
  },
  {
    slug: "torque-tool-selection",
    width: 1440,
    height: 1080,
    title: { id: "Mengenal pilihan alat", en: "Exploring the tools" },
    caption: {
      id: "Detail kunci torsi TOHNICHI yang digunakan dalam sesi teknis.",
      en: "A closer look at TOHNICHI torque wrenches used in the technical session."
    },
    alt: {
      id: "Kepala ratchet dan dial kunci torsi TOHNICHI di atas meja demonstrasi hijau.",
      en: "TOHNICHI torque-wrench ratchet heads and a dial on a green demonstration bench."
    }
  },
  {
    slug: "wireless-demo",
    width: 1440,
    height: 1080,
    title: { id: "Perangkat wireless", en: "Wireless equipment" },
    caption: {
      id: "Perangkat wireless untuk memudahkan setting alat.",
      en: "Wireless equipment to facilitate tool settings."
    },
    alt: {
      id: "RF setting box TOHNICHI dengan antena dan alat wireless di meja demonstrasi.",
      en: "A TOHNICHI RF setting box with an antenna and wireless tool on a demonstration table."
    }
  },
  {
    slug: "torque-tester-demo",
    width: 1440,
    height: 733,
    title: { id: "Memastikan akurasi nutrunner", en: "Ensuring Nutrunner Accuracy" },
    caption: {
      id: "Memastikan nutrunner berfungsi dengan baik dengan TOHNICHI Spin Tork",
      en: "Ensuring nutrunners function properly with the TOHNICHI Spin Tork."
    },
    alt: {
      id: "Torque tester TOHNICHI ST500N3-G dan perangkat pendukung di atas kotak peralatan.",
      en: "A TOHNICHI ST500N3-G torque tester and supporting equipment on an equipment case."
    }
  }
];

export const tohnichiDurabilityPhotos: TohnichiFieldPhoto[] = [
  {
    slug: "tohnichi-worn-tool-detail",
    width: 1440,
    height: 1920,
    title: { id: "Jejak pemakaian di lapangan", en: "Signs of everyday use" },
    caption: {
      id: "Detail skala kunci torsi TOHNICHI yang menunjukkan jejak pemakaian.",
      en: "A closer look at the worn scale of a TOHNICHI torque wrench."
    },
    alt: {
      id: "Detail kunci torsi TOHNICHI dengan skala merah yang menunjukkan jejak pemakaian.",
      en: "Close-up of a TOHNICHI torque wrench with a visibly worn red scale."
    }
  },
  {
    slug: "tohnichi-tools-in-use",
    width: 1440,
    height: 1080,
    title: { id: "Analog dan digital, berdampingan", en: "Analog and digital, side by side" },
    caption: {
      id: "Beragam alat torsi TOHNICHI di meja kerja pelanggan.",
      en: "A selection of TOHNICHI torque tools on a customer's workbench."
    },
    alt: {
      id: "Kunci torsi analog dan digital TOHNICHI di atas meja kerja hijau.",
      en: "Analog and digital TOHNICHI torque tools laid out together on a green workbench."
    }
  }
];
