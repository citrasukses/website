import type { LocalizedText } from "@/lib/i18n";

export type NacFamilyOption = {
  key: string;
  option: LocalizedText;
  series: string;
  toolInterface: string;
  workingEnd: string;
  lengths: string;
  application: LocalizedText;
};

export type NacSelectionItem = {
  label: LocalizedText;
  value: LocalizedText;
};

export type NacProductFamilyDetail = {
  overview: LocalizedText;
  features: LocalizedText[];
  images: string[];
  catalogueReference: string;
  options: NacFamilyOption[];
  selectionChecklist: NacSelectionItem[];
  notes: LocalizedText[];
};

export const nacProductDetails: Record<string, NacProductFamilyDetail> = {
  "square-drive-sockets": {
    overview: {
      id: "Square Drive Sockets NAC adalah keluarga socket untuk bolt dan nut dengan square drive 6.35 hingga 63.5 mm. Katalog mencakup mini, standard, deep, extension, single hex 6PT, double hex 12PT, magnetic, universal, dan bentuk khusus untuk menyesuaikan kapasitas tool, ukuran fastener, kedalaman, serta ruang kerja.",
      en: "NAC Square Drive Sockets are socket families for bolts and nuts with square drives from 6.35 to 63.5 mm. The catalogue covers mini, standard, deep, extension, single-hex 6PT, double-hex 12PT, magnetic, universal, and special forms to match tool capacity, fastener size, reach, and working clearance."
    },
    features: [
      {
        id: "Drive tersedia dari 1/4 hingga 2-1/2 inci untuk pekerjaan assembly ringan sampai fastener industrial berukuran besar.",
        en: "Drive sizes run from 1/4 through 2-1/2 inches for light assembly through large industrial fasteners."
      },
      {
        id: "Pilihan mini, standard, deep, dan extension membantu menyesuaikan diameter luar, stud clearance, dan reach.",
        en: "Mini, standard, deep, and extension options help match outside diameter, stud clearance, and reach."
      },
      {
        id: "Varian MP, MS, dan MT memberikan tiga mekanisme magnetic retention untuk geometri bolt dan nut yang berbeda.",
        en: "MP, MS, and MT variants provide three magnetic-retention arrangements for different bolt and nut geometries."
      }
    ],
    images: [
      "/assets/brands/products/nac/NAC socket.jpg",
      "/assets/brands/products/nac/nac_socket.jpg"
    ],
    catalogueReference: "NAC Fastener Tools 8, P2-P17",
    options: [
      {
        key: "quarter-drive",
        option: { id: "Socket 1/4 inci", en: "1/4-inch sockets" },
        series: "207-212 / 20750-21270 / S2",
        toolInterface: "6.35 mm square",
        workingEnd: "7-12 mm, PH2-PH3, SL7",
        lengths: "25 / 50 / 70 mm",
        application: {
          id: "Fastener kecil, body ringkas, dan area dengan clearance terbatas.",
          en: "Small fasteners, compact bodies, and restricted-clearance work."
        }
      },
      {
        key: "three-eighth-drive",
        option: { id: "Socket 3/8 inci", en: "3/8-inch sockets" },
        series: "3xx / 3xxD / 3xxMP-MS-MT / 3xxEX",
        toolInterface: "9.52 mm square",
        workingEnd: "7-27 mm; 6PT / 12PT",
        lengths: "20-300 mm",
        application: {
          id: "Assembly umum, automotive, recessed fastener, dan magnetic bolt holding.",
          en: "General assembly, automotive work, recessed fasteners, and magnetic bolt holding."
        }
      },
      {
        key: "half-drive",
        option: { id: "Socket 1/2 inci", en: "1/2-inch sockets" },
        series: "4xx / 4xxD / 4xxMP-MS-MT / 4xxEX",
        toolInterface: "12.7 mm square",
        workingEnd: "8-36 mm; 6PT / 12PT",
        lengths: "38-300 mm",
        application: {
          id: "Fastener menengah-besar dengan kebutuhan strength, reach, atau retention.",
          en: "Medium-to-large fasteners requiring strength, reach, or retention."
        }
      },
      {
        key: "universal-and-hex",
        option: { id: "Universal dan hexagon wrench sockets", en: "Universal and hexagon-wrench sockets" },
        series: "3xxU / 4xxU / 3C-4C families",
        toolInterface: "9.52 / 12.7 mm square",
        workingEnd: "Hex fastener and internal hex",
        lengths: "Standard / extension",
        application: {
          id: "Akses tidak lurus dan socket untuk hexagon socket-head fastener.",
          en: "Non-linear access and internal-hex socket-head fasteners."
        }
      },
      {
        key: "industrial-drive",
        option: { id: "Socket 3/4 dan 1 inci", en: "3/4- and 1-inch sockets" },
        series: "6xx / 8xx families",
        toolInterface: "19.0 / 25.4 mm square",
        workingEnd: "Standard / deep / hexagon",
        lengths: "Standard / deep",
        application: {
          id: "Fastener industrial dengan torque dan ukuran lebih besar.",
          en: "Industrial fasteners with higher torque and larger dimensions."
        }
      },
      {
        key: "large-drive",
        option: { id: "Large-drive sockets", en: "Large-drive sockets" },
        series: "5xx / 12xx / 14xx / 16xx / 24xx",
        toolInterface: "15.9-63.5 mm square",
        workingEnd: "5/8 to 2-1/2-inch drive classes",
        lengths: "By model",
        application: {
          id: "Peralatan berat dan fastener besar; sebagian model diproduksi berdasarkan pesanan.",
          en: "Heavy equipment and large fasteners; some models are produced to order."
        }
      }
    ],
    selectionChecklist: [
      {
        label: { id: "Square drive tool", en: "Tool square drive" },
        value: { id: "6.35, 9.52, 12.7, 15.9, 19.0, 25.4 mm atau lebih besar.", en: "6.35, 9.52, 12.7, 15.9, 19.0, 25.4 mm, or larger." }
      },
      {
        label: { id: "Profil fastener", en: "Fastener profile" },
        value: { id: "Single hex 6PT, double hex 12PT, internal hex, atau profil khusus.", en: "Single hex 6PT, double hex 12PT, internal hex, or a special profile." }
      },
      {
        label: { id: "Body dan reach", en: "Body and reach" },
        value: { id: "Mini, standard, deep, extension, atau universal.", en: "Mini, standard, deep, extension, or universal." }
      },
      {
        label: { id: "Retention", en: "Retention" },
        value: { id: "Non-magnetic, MP fixed, MS floating, atau MT tube magnet.", en: "Non-magnetic, MP fixed, MS floating, or MT tube magnet." }
      }
    ],
    notes: [
      {
        id: "Pilih socket berdasarkan square drive, ukuran fastener, diameter luar, dan panjang kerja - bukan ukuran fastener saja.",
        en: "Select a socket by square drive, fastener size, outside diameter, and working length - not by fastener size alone."
      },
      {
        id: "Model bertanda bintang pada katalog dapat memiliki stok terbatas atau dibuat berdasarkan pesanan.",
        en: "Models marked with a star in the catalogue may have limited stock or be made to order."
      }
    ]
  },
  "adapters-extension-bars-universal-joints": {
    overview: {
      id: "Keluarga adapter, extension bar, dan universal joint NAC mengubah ukuran square drive, menambah jangkauan aksial, atau memberi akses bersudut. Konfigurasi yang tepat menjaga rangkaian tool sesingkat dan sekaku mungkin sambil tetap mencapai fastener.",
      en: "NAC adapters, extension bars, and universal joints convert square-drive sizes, add axial reach, or provide angular access. The correct configuration keeps the tool stack as short and rigid as practical while still reaching the fastener."
    },
    features: [
      {
        id: "Adapter mencakup konversi square drive dari 6.35 hingga 38.1 mm pada sisi tool.",
        en: "Adapters cover square-drive conversion with tool-side drives from 6.35 through 38.1 mm."
      },
      {
        id: "Extension bar tersedia dalam panjang 50 hingga 300 mm tergantung drive.",
        en: "Extension bars are available from 50 through 300 mm depending on drive size."
      },
      {
        id: "Universal joint memberi swivel angle sekitar 15 derajat untuk akses yang tidak lurus.",
        en: "Universal joints provide approximately 15 degrees of swivel for non-linear access."
      }
    ],
    images: ["/assets/brands/products/nac/catalog-adapters-joints.png"],
    catalogueReference: "NAC Fastener Tools 8, P18",
    options: [
      {
        key: "adapters",
        option: { id: "Adapter", en: "Adapters" },
        series: "203A-148A / NB variants",
        toolInterface: "Sq.1 6.35-38.1 mm",
        workingEnd: "Sq.2 9.52-25.4 mm",
        lengths: "25-100 mm",
        application: {
          id: "Konversi antara tool drive dan socket dengan square drive berbeda.",
          en: "Converting between a tool drive and a socket with a different square drive."
        }
      },
      {
        key: "extension-bars",
        option: { id: "Extension bar", en: "Extension bars" },
        series: "250E-1430E / NB variants",
        toolInterface: "6.35-38.1 mm square",
        workingEnd: "Matching square output",
        lengths: "50-300 mm",
        application: {
          id: "Menjangkau fastener yang recessed sambil mempertahankan pilihan socket.",
          en: "Reaching recessed fasteners while retaining socket flexibility."
        }
      },
      {
        key: "universal-joints",
        option: { id: "Universal joint", en: "Universal joints" },
        series: "303U-2424U / NB variants",
        toolInterface: "9.52-63.5 mm square",
        workingEnd: "Matching square output",
        lengths: "52-310 mm",
        application: {
          id: "Akses bersudut hingga sekitar 15 derajat saat jalur lurus terhalang.",
          en: "Angular access up to approximately 15 degrees when a straight path is obstructed."
        }
      }
    ],
    selectionChecklist: [
      {
        label: { id: "Drive input", en: "Input drive" },
        value: { id: "Square drive pada tool atau power tool.", en: "The square drive on the tool or power tool." }
      },
      {
        label: { id: "Drive output", en: "Output drive" },
        value: { id: "Square drive yang dibutuhkan socket.", en: "The square drive required by the socket." }
      },
      {
        label: { id: "Reach minimum", en: "Minimum reach" },
        value: { id: "Pilih panjang terpendek yang tetap mencapai fastener.", en: "Choose the shortest length that still reaches the fastener." }
      },
      {
        label: { id: "Sudut kerja", en: "Working angle" },
        value: { id: "Gunakan universal joint hanya ketika akses lurus tidak tersedia.", en: "Use a universal joint only when straight access is unavailable." }
      }
    ],
    notes: [
      {
        id: "Setiap interface tambahan menambah stack length dan kemungkinan movement; hindari rangkaian yang lebih panjang dari kebutuhan.",
        en: "Every additional interface adds stack length and potential movement; avoid a longer assembly than the application requires."
      },
      {
        id: "Suffix NB menandai variasi ball-retained pada model yang tersedia.",
        en: "The NB suffix identifies ball-retained variants where listed."
      }
    ]
  },
  "special-custom-parts": {
    overview: {
      id: "Special & Custom Parts NAC dibuat ketika socket atau bit standar tidak dapat memenuhi profil fastener, ruang akses, retention, perlindungan permukaan, atau interface mesin. Katalog menunjukkan custom socket, driver socket, bit, anti-vibration tool, magnet, nylon atau urethane protection, dan bentuk khusus berdasarkan drawing atau sample.",
      en: "NAC Special & Custom Parts are used when a standard socket or bit cannot meet the fastener profile, access envelope, retention, surface-protection, or machine interface. The catalogue shows custom sockets, driver sockets, bits, anti-vibration tools, magnets, nylon or urethane protection, and special forms made from a drawing or sample."
    },
    features: [
      {
        id: "Profil tersedia meliputi single/double hex, surface drive, TORX drive, square, fast lead, flank drive, spline, slotted, dan oval.",
        en: "Available profiles include single/double hex, surface drive, TORX drive, square, fast lead, flank drive, spline, slotted, and oval."
      },
      {
        id: "Fitur khusus dapat mencakup side holes, side cuts, magnet, mar-resistance, nylon cap, urethane, dan custom guide.",
        en: "Special features can include side holes, side cuts, magnets, mar resistance, nylon caps, urethane, and custom guides."
      },
      {
        id: "NAC meminta kondisi penggunaan, drawing, atau sample untuk menentukan bentuk dan dimensi akhir.",
        en: "NAC uses operating conditions, drawings, or samples to determine the final form and dimensions."
      }
    ],
    images: ["/assets/brands/products/nac/catalog-special-parts.png"],
    catalogueReference: "NAC Fastener Tools 8, P19-P29",
    options: [
      {
        key: "custom-profiles",
        option: { id: "Custom socket profiles", en: "Custom socket profiles" },
        series: "6PT / 12PT / surface / flank / spline / square",
        toolInterface: "Square or driver interface",
        workingEnd: "Made to fastener",
        lengths: "Made to requirement",
        application: {
          id: "Fastener dengan profil non-standard atau kebutuhan contact geometry tertentu.",
          en: "Non-standard fasteners or applications requiring a specific contact geometry."
        }
      },
      {
        key: "clearance-protection",
        option: { id: "Clearance dan surface protection", en: "Clearance and surface protection" },
        series: "Side-hole / side-cut / nylon / urethane",
        toolInterface: "By tool",
        workingEnd: "Custom body and opening",
        lengths: "Made to requirement",
        application: {
          id: "Body interference, akses samping, dan perlindungan permukaan assembly.",
          en: "Body interference, side access, and protection of assembly surfaces."
        }
      },
      {
        key: "magnetic-custom",
        option: { id: "Custom magnetic sockets", en: "Custom magnetic sockets" },
        series: "MP / MS / MT custom forms",
        toolInterface: "Square or B-series",
        workingEnd: "Bolt / nut specific",
        lengths: "Made to requirement",
        application: {
          id: "Retention bolt atau nut dengan clearance dan protrusion khusus.",
          en: "Bolt or nut retention with application-specific clearance and protrusion."
        }
      },
      {
        key: "anti-vibration",
        option: { id: "Anti-vibration tools", en: "Anti-vibration tools" },
        series: "AV adapters / sockets / extensions / universal",
        toolInterface: "Power-tool specific",
        workingEnd: "Custom socket",
        lengths: "Made to requirement",
        application: {
          id: "Mengurangi runout pada tool panjang atau konfigurasi khusus untuk power tool.",
          en: "Reducing runout in long tools or special power-tool configurations."
        }
      },
      {
        key: "custom-bits",
        option: { id: "Custom driver sockets dan bits", en: "Custom driver sockets and bits" },
        series: "PH / slotted / hex / custom point",
        toolInterface: "B-30 / B-40 / B-10 / machine shank",
        workingEnd: "Made to screw",
        lengths: "Made to requirement",
        application: {
          id: "Screw khusus, machine holder tertentu, atau point geometry yang tidak tersedia sebagai produk standar.",
          en: "Special screws, machine-specific holders, or point geometries not available as standard products."
        }
      }
    ],
    selectionChecklist: [
      {
        label: { id: "Drawing atau sample", en: "Drawing or sample" },
        value: { id: "Berikan fastener dan interface tool aktual bila memungkinkan.", en: "Provide the actual fastener and tool interface where possible." }
      },
      {
        label: { id: "Kondisi kerja", en: "Operating condition" },
        value: { id: "Torque, speed, duty cycle, access, dan arah operasi.", en: "Torque, speed, duty cycle, access, and operating direction." }
      },
      {
        label: { id: "Dimensi kritis", en: "Critical dimensions" },
        value: { id: "Drive, point size, outside diameter, guide, dan total length.", en: "Drive, point size, outside diameter, guide, and total length." }
      },
      {
        label: { id: "Fungsi tambahan", en: "Additional function" },
        value: { id: "Magnet, anti-vibration, mar protection, atau angular access.", en: "Magnet, anti-vibration, mar protection, or angular access." }
      }
    ],
    notes: [
      {
        id: "Custom item memerlukan review drawing dan kondisi penggunaan sebelum quotation dan produksi.",
        en: "Custom items require a drawing and operating-condition review before quotation and production."
      },
      {
        id: "Jangan memodifikasi, memanaskan, atau menggerinda ulang socket dan bit karena dapat menurunkan kualitas material.",
        en: "Do not modify, reheat, or regrind sockets and bits because this can reduce material quality."
      }
    ]
  },
  "bit-through-sockets": {
    overview: {
      id: "Bit Through Sockets NAC memungkinkan operator berpindah dari screw-fastening ke bolt atau nut fastening tanpa melepas bit dari driver. Keluarga ini tersedia sebagai single, double, magnetic double, press-in magnet, tube magnet, dan one-touch slide untuk mempercepat changeover di assembly.",
      en: "NAC Bit Through Sockets let an operator move from screw fastening to bolt or nut fastening without removing the bit from the driver. The family includes single, double, magnetic double, press-in magnet, tube magnet, and one-touch slide versions for faster assembly changeover."
    },
    features: [
      {
        id: "Interface H6.35 melewatkan bit melalui socket sehingga satu driver dapat menangani screw serta bolt atau nut.",
        en: "The H6.35 interface passes the bit through the socket so one driver can handle screws as well as bolts or nuts."
      },
      {
        id: "Magnetic variants membantu mencegah bolt atau nut jatuh selama positioning.",
        en: "Magnetic variants help prevent bolts or nuts from dropping during positioning."
      },
      {
        id: "One-touch slide mempercepat perpindahan mode tanpa changeover terpisah.",
        en: "One-touch slide versions speed up mode changes without a separate tool change."
      }
    ],
    images: ["/assets/brands/products/nac/catalog-bit-through-sockets.png"],
    catalogueReference: "NAC Fastener Tools 8, P43",
    options: [
      {
        key: "double",
        option: { id: "Double type", en: "Double type" },
        series: "BTW0810 / BTW1012",
        toolInterface: "H6.35 bit-through",
        workingEnd: "8 x 10 / 10 x 12 mm",
        lengths: "60 / 70 mm",
        application: {
          id: "Dua ukuran hex dalam satu socket untuk changeover cepat.",
          en: "Two hex sizes in one socket for quick changeover."
        }
      },
      {
        key: "magnetic-double",
        option: { id: "Magnetic double type", en: "Magnetic double type" },
        series: "BTWSM0810 / BTWSM1012",
        toolInterface: "H6.35 bit-through",
        workingEnd: "8 x 10 / 10 x 12 mm",
        lengths: "70 / 80 mm",
        application: {
          id: "Double socket dengan side magnets untuk retention dan bolt clearance.",
          en: "Double socket with side magnets for retention and bolt clearance."
        }
      },
      {
        key: "single",
        option: { id: "Single type", en: "Single type" },
        series: "BTS08 / BTS10 / BTS12 / BTS14",
        toolInterface: "H6.35 bit-through",
        workingEnd: "8 / 10 / 12 / 14 mm",
        lengths: "60 mm",
        application: {
          id: "Satu ukuran hex dengan one-touch change dari screw ke bolt atau nut.",
          en: "One hex size with one-touch change from screw to bolt or nut."
        }
      },
      {
        key: "press-in-magnet",
        option: { id: "Press-in magnetic single", en: "Press-in magnetic single" },
        series: "BTSM08 / BTSM10 / BTSM12 / BTSM14",
        toolInterface: "H6.35 bit-through",
        workingEnd: "8 / 10 / 12 / 14 mm",
        lengths: "60 mm",
        application: {
          id: "Magnet press-in untuk membantu menahan bolt atau nut.",
          en: "Press-in magnet to help retain a bolt or nut."
        }
      },
      {
        key: "tube-magnet",
        option: { id: "Tube-magnet single", en: "Tube-magnet single" },
        series: "BTSMT08 / BTSMT10 / BTSMT12 / BTSMT14",
        toolInterface: "H6.35 bit-through",
        workingEnd: "8 / 10 / 12 / 14 mm",
        lengths: "60 mm",
        application: {
          id: "Tube magnet menjaga internal clearance untuk protruding bolt.",
          en: "A tube magnet preserves internal clearance for a protruding bolt."
        }
      },
      {
        key: "one-touch-slide",
        option: { id: "One-touch slide", en: "One-touch slide" },
        series: "BTS10RMS / BTS12RMS",
        toolInterface: "H6.35 bit-through",
        workingEnd: "10 / 12 mm",
        lengths: "36 mm socket body",
        application: {
          id: "Slide ring magnet untuk perpindahan screw dan nut/bolt yang cepat.",
          en: "Sliding ring magnet for rapid screw and nut/bolt transitions."
        }
      }
    ],
    selectionChecklist: [
      {
        label: { id: "Ukuran bolt atau nut", en: "Bolt or nut size" },
        value: { id: "8, 10, 12, 14 mm atau kombinasi double.", en: "8, 10, 12, 14 mm, or a double-size combination." }
      },
      {
        label: { id: "Bit yang lewat", en: "Through bit" },
        value: { id: "Konfirmasikan H6.35 bit dan working length.", en: "Confirm the H6.35 bit and working length." }
      },
      {
        label: { id: "Kebutuhan magnet", en: "Magnet requirement" },
        value: { id: "Tanpa magnet, side magnet, press-in, tube, atau ring slide.", en: "Non-magnetic, side magnet, press-in, tube, or sliding ring." }
      },
      {
        label: { id: "Pola changeover", en: "Changeover pattern" },
        value: { id: "Single, double, atau one-touch slide.", en: "Single, double, or one-touch slide." }
      }
    ],
    notes: [
      {
        id: "Periksa bolt clearance sebelum memilih fixed magnet; gunakan side atau tube magnet ketika protrusion harus melewati socket.",
        en: "Check bolt clearance before selecting a fixed magnet; use side or tube magnets when protrusion must pass through the socket."
      }
    ]
  },
  "fastening-attachments": {
    overview: {
      id: "Fastening Attachments NAC mencakup die holder, tap holder, socket adapter, tap-holder bit, dan die bit. Attachment ini menangani re-threading, thread cleaning, perubahan ukuran socket, serta pekerjaan repair atau assembly khusus dengan interface yang terdokumentasi.",
      en: "NAC Fastening Attachments include die holders, tap holders, socket adapters, tap-holder bits, and die bits. These attachments support re-threading, thread cleaning, socket-size conversion, and specialized repair or assembly work with documented interfaces."
    },
    features: [
      {
        id: "Die holder dan die bit membantu memperbaiki thread eksternal pada bolt.",
        en: "Die holders and die bits support repair of external bolt threads."
      },
      {
        id: "Tap holder dan tap-holder bit membantu tapping serta membersihkan internal thread.",
        en: "Tap holders and tap-holder bits support tapping and cleaning internal threads."
      },
      {
        id: "Socket adapter memudahkan pekerjaan pada dua ukuran bolt tanpa mengganti rangkaian tool utama.",
        en: "Socket adapters make it easier to work across two bolt sizes without changing the primary tool assembly."
      }
    ],
    images: ["/assets/brands/products/nac/NAC_ScrewdriverBit_Attachments_image1-300x300.jpg"],
    catalogueReference: "NAC Fastener Tools 8, P44",
    options: [
      {
        key: "die-holders",
        option: { id: "Die holders", en: "Die holders" },
        series: "DHM5 / DHM6 / DHM8 / DHM10",
        toolInterface: "20 or 25 mm body",
        workingEnd: "M5-M10 dies",
        lengths: "40 mm",
        application: {
          id: "Re-threading bolt dengan die yang sesuai.",
          en: "Re-threading bolts with a matching die."
        }
      },
      {
        key: "tap-holders",
        option: { id: "Tap holders", en: "Tap holders" },
        series: "TH-5 / 6 / 8 / 10 / 7/16 / 12",
        toolInterface: "Socket-driven holder",
        workingEnd: "M5-M12 / 7/16 UNF taps",
        lengths: "20 mm holder",
        application: {
          id: "Tapping dan thread cleaning; tap dijual terpisah.",
          en: "Tapping and thread cleaning; the tap is sold separately."
        }
      },
      {
        key: "socket-adapters",
        option: { id: "Socket adapters", en: "Socket adapters" },
        series: "SA0810-SA1714",
        toolInterface: "8-17 mm socket input",
        workingEnd: "8-17 mm socket output",
        lengths: "40 mm",
        application: {
          id: "Mengubah ukuran hex yang ditangani pada area kerja berbeda.",
          en: "Changing the handled hex size across different work positions."
        }
      },
      {
        key: "tap-holder-bits",
        option: { id: "Tap-holder bits", en: "Tap-holder bits" },
        series: "3BTH5M / 6M / 8M / 10M",
        toolInterface: "H6.35",
        workingEnd: "M5-M10 taps",
        lengths: "55 mm",
        application: {
          id: "Menggunakan tap pada driver H6.35 untuk tapping atau thread cleaning.",
          en: "Using a tap with an H6.35 driver for tapping or thread cleaning."
        }
      },
      {
        key: "die-bits",
        option: { id: "Die bits", en: "Die bits" },
        series: "3B6MD75 / 3B8MD75",
        toolInterface: "H6.35",
        workingEnd: "M6 / M8 dies",
        lengths: "75 mm",
        application: {
          id: "Re-threading bolt M6 atau M8 menggunakan driver.",
          en: "Driver-assisted re-threading of M6 or M8 bolts."
        }
      }
    ],
    selectionChecklist: [
      {
        label: { id: "Jenis pekerjaan", en: "Task type" },
        value: { id: "External thread, internal thread, atau socket-size conversion.", en: "External thread, internal thread, or socket-size conversion." }
      },
      {
        label: { id: "Ukuran thread", en: "Thread size" },
        value: { id: "Konfirmasikan metric pitch atau UNF.", en: "Confirm the metric pitch or UNF size." }
      },
      {
        label: { id: "Interface tool", en: "Tool interface" },
        value: { id: "Socket-driven holder atau H6.35 bit.", en: "Socket-driven holder or H6.35 bit." }
      },
      {
        label: { id: "Tap atau die", en: "Tap or die" },
        value: { id: "Aksesori pemotong tidak selalu termasuk; konfirmasikan scope supply.", en: "The cutting accessory is not always included; confirm the supply scope." }
      }
    ],
    notes: [
      {
        id: "Tap harus dikunci kuat dengan M4 cap screw pada holder yang sesuai.",
        en: "The tap must be secured firmly with the M4 cap screw in the matching holder."
      },
      {
        id: "Gunakan attachment hanya untuk fungsi dan ukuran thread yang ditentukan.",
        en: "Use each attachment only for its specified function and thread size."
      }
    ]
  },
  "b-30": {
    overview: {
      id: "B-30 adalah sistem driver socket dan bit NAC dengan shank H6.35 mm serta posisi drive 23 mm. Keluarga ini mencakup socket single/double hex, magnetic MP/MS/MT, universal, adapter, extension, Phillips, slotted, turn-down, double-ended, countersunk, hexagon, B-35 angle tools, dan B-38 insert-bit holder.",
      en: "B-30 is NAC's driver-socket and bit system with an H6.35 mm shank and 23 mm drive position. The family covers single/double-hex sockets, MP/MS/MT magnetic forms, universal sockets, adapters, extensions, Phillips, slotted, turn-down, double-ended, countersunk, hexagon, B-35 angle tools, and the B-38 insert-bit holder."
    },
    features: [
      {
        id: "Satu interface H6.35 mencakup driver socket, screw bit, hexagon bit, adapter, dan extension.",
        en: "One H6.35 interface covers driver sockets, screw bits, hexagon bits, adapters, and extensions."
      },
      {
        id: "Magnetic MP, MS, dan MT memberi pilihan fixed, floating, dan tube retention.",
        en: "MP, MS, and MT magnetic families provide fixed, floating, and tube retention."
      },
      {
        id: "B-35 dan B-38 menambah angle tools serta insert-bit holder pada ekosistem B-30.",
        en: "B-35 and B-38 add angle tools and an insert-bit holder to the B-30 ecosystem."
      }
    ],
    images: ["/assets/brands/products/nac/catalog-b30-driver-sockets.png"],
    catalogueReference: "NAC Fastener Tools 8, P31-P35",
    options: [
      {
        key: "standard-sockets",
        option: { id: "Standard driver sockets", en: "Standard driver sockets" },
        series: "3B / 3BD / 3BDMP",
        toolInterface: "H6.35, 23 mm",
        workingEnd: "5-17 mm; 6PT / 12PT",
        lengths: "50-200 mm",
        application: {
          id: "Hex bolt dan nut dengan pilihan single atau double hex.",
          en: "Hex bolts and nuts with single- or double-hex options."
        }
      },
      {
        key: "magnetic-sockets",
        option: { id: "Magnetic driver sockets", en: "Magnetic driver sockets" },
        series: "3BMP / 3BMS / 3BMT",
        toolInterface: "H6.35, 23 mm",
        workingEnd: "5.5-14 mm",
        lengths: "50-200 mm",
        application: {
          id: "Fixed, floating, atau tube magnet untuk retention dan bolt clearance.",
          en: "Fixed, floating, or tube magnets for retention and bolt clearance."
        }
      },
      {
        key: "universal",
        option: { id: "Universal driver sockets", en: "Universal driver sockets" },
        series: "3BU",
        toolInterface: "H6.35, 23 mm",
        workingEnd: "8 / 10 / 12 / 14 mm",
        lengths: "100 / 150 / 200 mm",
        application: {
          id: "Fastener hex dengan akses tidak lurus.",
          en: "Hex fasteners with non-linear access."
        }
      },
      {
        key: "adapters-extensions",
        option: { id: "Driver adapters dan bit extensions", en: "Driver adapters and bit extensions" },
        series: "3DA / 3BHD",
        toolInterface: "H6.35, 23 mm",
        workingEnd: "6.35 / 9.52 / 12.7 mm square",
        lengths: "50-200 mm",
        application: {
          id: "Menggunakan square-drive socket atau menambah jangkauan bit.",
          en: "Using square-drive sockets or adding bit reach."
        }
      },
      {
        key: "screw-bits",
        option: { id: "Phillips, slotted, dan special screw bits", en: "Phillips, slotted, and special screw bits" },
        series: "3S / 3M / 3TD / 3W / 3WY",
        toolInterface: "H6.35, 23 mm",
        workingEnd: "PH0-PH3 / SL4.8-SL8",
        lengths: "30-300 mm",
        application: {
          id: "Screw standard, turn-down, double-ended, dan countersunk.",
          en: "Standard, turn-down, double-ended, and countersunk screws."
        }
      },
      {
        key: "hex-bits",
        option: { id: "Hexagon driver bits", en: "Hexagon driver bits" },
        series: "3C",
        toolInterface: "H6.35, 23 mm",
        workingEnd: "1.5-8 mm hex",
        lengths: "70 / 100 / 150 mm",
        application: {
          id: "Internal-hex screw pada assembly machinery.",
          en: "Internal-hex screws in machinery assembly."
        }
      },
      {
        key: "b35-b38",
        option: { id: "B-35 angle dan B-38 insert-bit system", en: "B-35 angle and B-38 insert-bit system" },
        series: "35B / 35S / 3BHM75 / 38S",
        toolInterface: "H6.35",
        workingEnd: "5.5-12 mm / PH1-PH3",
        lengths: "23-75 mm",
        application: {
          id: "Right-angle access dan penggantian insert bit 25.4 mm.",
          en: "Right-angle access and replaceable 25.4 mm insert bits."
        }
      }
    ],
    selectionChecklist: [
      {
        label: { id: "Holder", en: "Holder" },
        value: { id: "Pastikan H6.35 dan posisi groove/drive 23 mm sesuai tool.", en: "Confirm H6.35 and the 23 mm groove/drive position match the tool." }
      },
      {
        label: { id: "Working end", en: "Working end" },
        value: { id: "Hex size, PH/SL point, atau internal hex.", en: "Hex size, PH/SL point, or internal hex." }
      },
      {
        label: { id: "Length", en: "Length" },
        value: { id: "Pilih working length terpendek yang memenuhi akses.", en: "Choose the shortest working length that satisfies access." }
      },
      {
        label: { id: "Retention atau angle", en: "Retention or angle" },
        value: { id: "MP/MS/MT, universal, atau B-35 bila diperlukan.", en: "MP/MS/MT, universal, or B-35 where required." }
      }
    ],
    notes: [
      {
        id: "B-30 dan B-40 sama-sama H6.35, tetapi dimensi posisi drive berbeda; konfirmasikan holder sebelum memesan.",
        en: "B-30 and B-40 both use H6.35, but their drive-position dimensions differ; confirm the holder before ordering."
      }
    ]
  },
  "b-40": {
    overview: {
      id: "B-40 adalah keluarga driver socket dan bit H6.35 mm dengan posisi drive 25 mm dan body 13 mm. Lineup mencakup driver socket standard dan magnetic, universal, adapter, extension, double-ended bit, tapping-screw bit, countersunk-screw bit, slotted bit, dan hexagon driver bit.",
      en: "B-40 is an H6.35 mm driver-socket and bit family with a 25 mm drive position and 13 mm body. The lineup covers standard and magnetic driver sockets, universal sockets, adapters, extensions, double-ended bits, tapping-screw bits, countersunk-screw bits, slotted bits, and hexagon driver bits."
    },
    features: [
      {
        id: "Driver socket mencakup ukuran hex 5.5 hingga 17 mm dengan panjang hingga 200 mm.",
        en: "Driver sockets cover hex sizes from 5.5 through 17 mm with lengths up to 200 mm."
      },
      {
        id: "MP fixed magnet dan MS floating magnet tersedia untuk retention.",
        en: "MP fixed-magnet and MS floating-magnet versions are available for retention."
      },
      {
        id: "Bit khusus tapping dan countersunk melengkapi double-ended, slotted, dan hexagon bits.",
        en: "Tapping and countersunk bits complement the double-ended, slotted, and hexagon-bit ranges."
      }
    ],
    images: ["/assets/brands/products/nac/catalog-b40-driver-bits.png"],
    catalogueReference: "NAC Fastener Tools 8, P36-P38",
    options: [
      {
        key: "standard",
        option: { id: "Driver sockets", en: "Driver sockets" },
        series: "4B",
        toolInterface: "H6.35, 25 mm",
        workingEnd: "5.5-17 mm",
        lengths: "55-200 mm",
        application: {
          id: "Hex bolt dan nut pada powered assembly.",
          en: "Hex bolts and nuts in powered assembly."
        }
      },
      {
        key: "magnetic",
        option: { id: "Magnetic driver sockets", en: "Magnetic driver sockets" },
        series: "4BMP / 4BMS",
        toolInterface: "H6.35, 25 mm",
        workingEnd: "8-12 mm",
        lengths: "55-200 mm",
        application: {
          id: "Fixed atau floating magnetic bolt retention.",
          en: "Fixed or floating magnetic bolt retention."
        }
      },
      {
        key: "universal",
        option: { id: "Universal driver sockets", en: "Universal driver sockets" },
        series: "4BU",
        toolInterface: "H6.35, 25 mm",
        workingEnd: "8 / 10 / 12 / 14 mm",
        lengths: "100 mm",
        application: {
          id: "Fastening hex pada sudut terbatas.",
          en: "Hex fastening at a restricted angle."
        }
      },
      {
        key: "adapters",
        option: { id: "Driver adapters dan extensions", en: "Driver adapters and extensions" },
        series: "4DA / 4BHD",
        toolInterface: "H6.35, 25 mm",
        workingEnd: "6.35 / 9.52 / 12.7 mm square",
        lengths: "50 / 70 mm",
        application: {
          id: "Square-drive socket compatibility dan tambahan reach.",
          en: "Square-drive socket compatibility and added reach."
        }
      },
      {
        key: "screw-bits",
        option: { id: "Double, tapping, countersunk, dan slotted bits", en: "Double, tapping, countersunk, and slotted bits" },
        series: "4W / 4WT / 4WY / 4M",
        toolInterface: "H6.35, 25 mm",
        workingEnd: "PH1-PH3 / SL4.8-SL8",
        lengths: "45-300 mm",
        application: {
          id: "Screw standard, tapping, dan countersunk pada assembly.",
          en: "Standard, tapping, and countersunk screws in assembly."
        }
      },
      {
        key: "hex",
        option: { id: "Hexagon driver bits", en: "Hexagon driver bits" },
        series: "4C",
        toolInterface: "H6.35, 25 mm",
        workingEnd: "2-6 mm hex",
        lengths: "70 / 100 mm",
        application: {
          id: "Internal-hex screw dan machine assembly.",
          en: "Internal-hex screws and machine assembly."
        }
      }
    ],
    selectionChecklist: [
      {
        label: { id: "Holder", en: "Holder" },
        value: { id: "H6.35 dengan posisi drive B-40 25 mm.", en: "H6.35 with the B-40 25 mm drive position." }
      },
      {
        label: { id: "Fastener", en: "Fastener" },
        value: { id: "Hex, Phillips, slotted, tapping, countersunk, atau internal hex.", en: "Hex, Phillips, slotted, tapping, countersunk, or internal hex." }
      },
      {
        label: { id: "Length", en: "Length" },
        value: { id: "45 hingga 300 mm tergantung sub-family.", en: "45 through 300 mm depending on subfamily." }
      },
      {
        label: { id: "Retention", en: "Retention" },
        value: { id: "Standard, MP fixed magnet, atau MS floating magnet.", en: "Standard, MP fixed magnet, or MS floating magnet." }
      }
    ],
    notes: [
      {
        id: "Perhatikan perbedaan posisi drive dan ball groove antara B-series walaupun shank sama-sama H6.35.",
        en: "Pay attention to drive position and ball-groove differences between B-series even when both use H6.35."
      }
    ]
  },
  "b-10": {
    overview: {
      id: "B-10 adalah keluarga driver socket dan bit NAC dengan shank H5 mm. Sistem yang lebih kecil ini mencakup driver socket, hexagon bit, single dan double Phillips bit, slotted bit, turn-down bit, serta bit untuk automatic assembly machine.",
      en: "B-10 is NAC's driver-socket and bit family with an H5 mm shank. This smaller system covers driver sockets, hexagon bits, single and double Phillips bits, slotted bits, turn-down bits, and bits for automatic assembly machines."
    },
    features: [
      {
        id: "Shank H5 mm dirancang untuk holder yang tidak menggunakan interface H6.35 B-30/B-40.",
        en: "The H5 mm shank is intended for holders that do not use the H6.35 B-30/B-40 interface."
      },
      {
        id: "Driver socket tersedia dari 5 hingga 14 mm dengan panjang 70 atau 100 mm.",
        en: "Driver sockets are available from 5 through 14 mm in 70 or 100 mm lengths."
      },
      {
        id: "Single, double, slotted, turn-down, dan automatic-machine bits menangani berbagai screw dan access condition.",
        en: "Single, double, slotted, turn-down, and automatic-machine bits cover multiple screws and access conditions."
      }
    ],
    images: ["/assets/brands/products/nac/catalog-b10-driver-sockets.png"],
    catalogueReference: "NAC Fastener Tools 8, P39-P40",
    options: [
      {
        key: "driver-sockets",
        option: { id: "Driver sockets", en: "Driver sockets" },
        series: "1B",
        toolInterface: "H5, 24 mm",
        workingEnd: "5-14 mm",
        lengths: "70 / 100 mm",
        application: {
          id: "Hex bolt dan nut dengan holder H5.",
          en: "Hex bolts and nuts with an H5 holder."
        }
      },
      {
        key: "hex",
        option: { id: "Hexagon driver bits", en: "Hexagon driver bits" },
        series: "1C",
        toolInterface: "H5, 24 mm",
        workingEnd: "1.5-5 mm hex",
        lengths: "70 / 100 mm",
        application: {
          id: "Internal-hex screw berukuran kecil.",
          en: "Small internal-hex screws."
        }
      },
      {
        key: "double",
        option: { id: "Double-ended Phillips bits", en: "Double-ended Phillips bits" },
        series: "1W",
        toolInterface: "H5",
        workingEnd: "PH1 / PH2",
        lengths: "70-300 mm",
        application: {
          id: "Double-ended bits dengan beberapa working length.",
          en: "Double-ended bits in several working lengths."
        }
      },
      {
        key: "single",
        option: { id: "Single Phillips bits", en: "Single Phillips bits" },
        series: "1S",
        toolInterface: "H5, 24 mm",
        workingEnd: "PH0-PH3",
        lengths: "50-300 mm",
        application: {
          id: "General screw fastening pada holder H5.",
          en: "General screw fastening with an H5 holder."
        }
      },
      {
        key: "slotted",
        option: { id: "Slotted bits", en: "Slotted bits" },
        series: "1M",
        toolInterface: "H5, 24 mm",
        workingEnd: "SL4.8 / SL6",
        lengths: "50-100 mm",
        application: {
          id: "Slotted screw yang sesuai dengan width dan thickness bit.",
          en: "Slotted screws matching the bit width and thickness."
        }
      },
      {
        key: "turn-down",
        option: { id: "Turn-down bits", en: "Turn-down bits" },
        series: "1TD",
        toolInterface: "H5, 24 mm",
        workingEnd: "PH1 / PH2",
        lengths: "70 / 100 mm",
        application: {
          id: "Recessed screw atau clearance kecil di sekitar screw head.",
          en: "Recessed screws or limited clearance around the screw head."
        }
      },
      {
        key: "automatic",
        option: { id: "Automatic-machine bits", en: "Automatic-machine bits" },
        series: "1V1105 / 1V2105",
        toolInterface: "H5",
        workingEnd: "PH1 / PH2",
        lengths: "105 mm",
        application: {
          id: "Bit khusus automatic assembly machine.",
          en: "Bits dedicated to automatic assembly machines."
        }
      }
    ],
    selectionChecklist: [
      {
        label: { id: "Holder H5", en: "H5 holder" },
        value: { id: "Konfirmasikan shank 5 mm dan dimensi retention holder.", en: "Confirm the 5 mm shank and holder-retention dimensions." }
      },
      {
        label: { id: "Point atau hex", en: "Point or hex" },
        value: { id: "Pilih ukuran hex, PH, atau slotted yang tepat.", en: "Choose the correct hex, PH, or slotted size." }
      },
      {
        label: { id: "Working length", en: "Working length" },
        value: { id: "50 hingga 300 mm tergantung series.", en: "50 through 300 mm depending on series." }
      },
      {
        label: { id: "Manual atau machine", en: "Manual or machine" },
        value: { id: "Bedakan bit produksi umum dan 1V automatic-machine.", en: "Distinguish general-production bits from 1V automatic-machine bits." }
      }
    ],
    notes: [
      {
        id: "H5 tidak interchangeable dengan H6.35 atau H8; gunakan holder sesuai dimensi katalog.",
        en: "H5 is not interchangeable with H6.35 or H8; use the holder dimensions specified in the catalogue."
      }
    ]
  },
  "b-37-b-45": {
    overview: {
      id: "B-37 dan B-45 adalah bit untuk power tool dengan dua interface berbeda. B-37 menggunakan H6.35 mm untuk rechargeable drill dan driver, sedangkan B-45 memakai H8 mm untuk double-ended Phillips bits.",
      en: "B-37 and B-45 are power-tool bit families with two different interfaces. B-37 uses H6.35 mm for rechargeable drills and drivers, while B-45 uses H8 mm for double-ended Phillips bits."
    },
    features: [
      {
        id: "B-37 menyediakan single Phillips dan slotted bits dengan H6.35 mm.",
        en: "B-37 provides single Phillips and slotted bits with an H6.35 mm interface."
      },
      {
        id: "B-45 menyediakan double-ended PH2 dan PH3 dengan shank H8 mm.",
        en: "B-45 provides double-ended PH2 and PH3 bits with an H8 mm shank."
      },
      {
        id: "Katalog memperingatkan untuk memeriksa bentuk insertion dan posisi ball groove pada power tool.",
        en: "The catalogue warns users to check the insertion form and ball-groove position on the power tool."
      }
    ],
    images: ["/assets/brands/products/nac/catalog-b37-b45-power-bits.png"],
    catalogueReference: "NAC Fastener Tools 8, P41",
    options: [
      {
        key: "b37-phillips",
        option: { id: "B-37 Phillips single bits", en: "B-37 Phillips single bits" },
        series: "37S145-37S2200 / 37S245",
        toolInterface: "H6.35",
        workingEnd: "PH1 / PH2",
        lengths: "45-200 mm",
        application: {
          id: "Rechargeable drill dan driver untuk screw PH1 atau PH2.",
          en: "Rechargeable drills and drivers for PH1 or PH2 screws."
        }
      },
      {
        key: "b37-slotted",
        option: { id: "B-37 slotted bits", en: "B-37 slotted bits" },
        series: "37M3075 / 37M4075 / 37M050",
        toolInterface: "H6.35",
        workingEnd: "SL3 / SL4 / SL6.35",
        lengths: "50 / 75 mm",
        application: {
          id: "Slotted screw pada rechargeable driver.",
          en: "Slotted screws with a rechargeable driver."
        }
      },
      {
        key: "b45-double",
        option: { id: "B-45 double-ended bits", en: "B-45 double-ended bits" },
        series: "45W2065 / 45W3065",
        toolInterface: "H8",
        workingEnd: "PH2 / PH3",
        lengths: "65 mm",
        application: {
          id: "Power tool dengan holder H8 untuk double-ended Phillips bit.",
          en: "Power tools with an H8 holder for double-ended Phillips bits."
        }
      }
    ],
    selectionChecklist: [
      {
        label: { id: "Shank", en: "Shank" },
        value: { id: "H6.35 untuk B-37 atau H8 untuk B-45.", en: "H6.35 for B-37 or H8 for B-45." }
      },
      {
        label: { id: "Ball groove", en: "Ball groove" },
        value: { id: "Cocokkan posisi groove dengan chuck atau holder.", en: "Match the groove position to the chuck or holder." }
      },
      {
        label: { id: "Point", en: "Point" },
        value: { id: "PH1, PH2, PH3, atau slotted.", en: "PH1, PH2, PH3, or slotted." }
      },
      {
        label: { id: "Panjang", en: "Length" },
        value: { id: "45 hingga 200 mm sesuai akses.", en: "45 through 200 mm to suit access." }
      }
    ],
    notes: [
      {
        id: "Jangan memilih hanya berdasarkan point size; shank dan ball-groove position harus sesuai power tool.",
        en: "Do not select by point size alone; the shank and ball-groove position must match the power tool."
      }
    ]
  },
  "automatic-assembly-machine-bits": {
    overview: {
      id: "Automatic Assembly Machine Bits NAC mencakup H4, H5, DB, dan threaded XY/NXY bits untuk electric screwdriver, screw-feeding equipment, dan robot fastening. Machine-side interface, groove position, point size, diameter, dan panjang merupakan bagian dari spesifikasi utama.",
      en: "NAC Automatic Assembly Machine Bits include H4, H5, DB, and threaded XY/NXY bits for electric screwdrivers, screw-feeding equipment, and robotic fastening. The machine-side interface, groove position, point size, diameter, and length are all primary specifications."
    },
    features: [
      {
        id: "H4, H5, dan DB memakai diameter shank serta geometry retention yang berbeda.",
        en: "H4, H5, and DB use different shank diameters and retention geometries."
      },
      {
        id: "VXY dan NXY memakai threaded M5 atau M6 interface untuk automatic assembly machine.",
        en: "VXY and NXY use threaded M5 or M6 interfaces for automatic assembly machines."
      },
      {
        id: "Custom production tersedia berdasarkan drawing atau sample untuk holder dan screw tertentu.",
        en: "Custom production is available from a drawing or sample for a specific holder and screw."
      }
    ],
    images: ["/assets/brands/products/nac/catalog-automatic-assembly-bits.png"],
    catalogueReference: "NAC Fastener Tools 8, P42",
    options: [
      {
        key: "h4",
        option: { id: "H4 electric-screwdriver bits", en: "H4 electric-screwdriver bits" },
        series: "H4-0x40-2 / H4-1x40-3 / H4-2x40-4",
        toolInterface: "H4, 4 mm",
        workingEnd: "PH0 / PH1 / PH2",
        lengths: "40 mm",
        application: {
          id: "Electric screwdriver dengan holder H4.",
          en: "Electric screwdrivers with an H4 holder."
        }
      },
      {
        key: "h5",
        option: { id: "H5 electric-screwdriver bits", en: "H5 electric-screwdriver bits" },
        series: "H5-1x60 / H5-1x100 / H5-2x60 / H5-2x100",
        toolInterface: "H5, 5 mm",
        workingEnd: "PH1 / PH2",
        lengths: "60 / 100 mm",
        application: {
          id: "Electric screwdriver dengan holder H5.",
          en: "Electric screwdrivers with an H5 holder."
        }
      },
      {
        key: "db",
        option: { id: "DB electric-screwdriver bits", en: "DB electric-screwdriver bits" },
        series: "DB0x44-DB2x64",
        toolInterface: "DB, 4 mm",
        workingEnd: "PH0 / PH1 / PH2",
        lengths: "44 / 64 mm",
        application: {
          id: "Machine holder DB dengan diameter point body 1.8 hingga 4.0 mm.",
          en: "DB machine holders with point-body diameters from 1.8 through 4.0 mm."
        }
      },
      {
        key: "vxy",
        option: { id: "VXY threaded robot bits", en: "VXY threaded robot bits" },
        series: "VXY5174 / VXY5274 / VXY6274",
        toolInterface: "M5 P0.8 / M6 P1.0",
        workingEnd: "PH1 / PH2",
        lengths: "74 mm",
        application: {
          id: "Automatic screw-fastening machine dengan threaded bit mount.",
          en: "Automatic screw-fastening machines with a threaded bit mount."
        }
      },
      {
        key: "nxy",
        option: { id: "NXY threaded robot bit", en: "NXY threaded robot bit" },
        series: "NXY6210",
        toolInterface: "M6 P1.0",
        workingEnd: "PH2",
        lengths: "100 mm",
        application: {
          id: "Automatic assembly machine yang membutuhkan M6 threaded mount dan reach lebih panjang.",
          en: "Automatic assembly machines requiring an M6 threaded mount and longer reach."
        }
      }
    ],
    selectionChecklist: [
      {
        label: { id: "Machine holder", en: "Machine holder" },
        value: { id: "H4, H5, DB, M5 threaded, atau M6 threaded.", en: "H4, H5, DB, M5 threaded, or M6 threaded." }
      },
      {
        label: { id: "Retention geometry", en: "Retention geometry" },
        value: { id: "Ukur groove, shoulder, thread, dan insertion depth.", en: "Measure the groove, shoulder, thread, and insertion depth." }
      },
      {
        label: { id: "Screw point", en: "Screw point" },
        value: { id: "PH0, PH1, atau PH2 dengan diameter body yang sesuai.", en: "PH0, PH1, or PH2 with the correct body diameter." }
      },
      {
        label: { id: "Process", en: "Process" },
        value: { id: "Electric screwdriver, feeder, robot, speed, dan duty cycle.", en: "Electric screwdriver, feeder, robot, speed, and duty cycle." }
      }
    ],
    notes: [
      {
        id: "Untuk automated equipment, sample holder dan screw sangat membantu verifikasi sebelum produksi.",
        en: "For automated equipment, a holder and screw sample greatly improves verification before production."
      }
    ]
  },
  torx: {
    overview: {
      id: "TORX Sockets & Driver Bits NAC mencakup internal T-type, external E-type, tamper-resistant bits, power-tool bits, magnetic screw holder, dan custom TORX tools. Lineup tersedia untuk square drive 1/4, 3/8, 1/2 inci serta shank H4, H5, DB, B1, B3, dan B4.",
      en: "NAC TORX Sockets & Driver Bits cover internal T-type, external E-type, tamper-resistant bits, power-tool bits, magnetic screw holders, and custom TORX tools. The lineup includes 1/4-, 3/8-, and 1/2-inch square drives plus H4, H5, DB, B1, B3, and B4 shanks."
    },
    features: [
      {
        id: "Internal TORX tersedia dari T5 hingga T60 tergantung drive atau shank.",
        en: "Internal TORX sizes run from T5 through T60 depending on drive or shank."
      },
      {
        id: "External TORX sockets tersedia dari E5 hingga E20 pada square-drive dan B3 families.",
        en: "External TORX sockets are available from E5 through E20 across square-drive and B3 families."
      },
      {
        id: "Tamper-resistant H variants serta MSH magnetic screw holder tersedia untuk screw dan process khusus.",
        en: "Tamper-resistant H variants and the MSH magnetic screw holder are available for special screws and processes."
      }
    ],
    images: ["/assets/brands/products/nac/catalog-torx-tools.png"],
    catalogueReference: "NAC Fastener Tools 8, P46-P55",
    options: [
      {
        key: "s2",
        option: { id: "S2 TORX sockets", en: "S2 TORX sockets" },
        series: "S2-T / S2-E",
        toolInterface: "6.35 mm square",
        workingEnd: "T15-T40 / E5-E10",
        lengths: "25-90 mm",
        application: {
          id: "Internal atau external TORX pada 1/4-inch square drive.",
          en: "Internal or external TORX with a 1/4-inch square drive."
        }
      },
      {
        key: "s3",
        option: { id: "S3 TORX sockets", en: "S3 TORX sockets" },
        series: "S3-T / S3-E",
        toolInterface: "9.52 mm square",
        workingEnd: "T25-T55 / E5-E16",
        lengths: "32-100 mm",
        application: {
          id: "Internal atau external TORX pada 3/8-inch square drive.",
          en: "Internal or external TORX with a 3/8-inch square drive."
        }
      },
      {
        key: "s4",
        option: { id: "S4 TORX sockets", en: "S4 TORX sockets" },
        series: "S4-T / S4-E",
        toolInterface: "12.7 mm square",
        workingEnd: "T30-T60 / E10-E20",
        lengths: "40-100 mm",
        application: {
          id: "Internal atau external TORX pada 1/2-inch square drive.",
          en: "Internal or external TORX with a 1/2-inch square drive."
        }
      },
      {
        key: "small-shank",
        option: { id: "H4, H5, DB, dan B1 TORX bits", en: "H4, H5, DB, and B1 TORX bits" },
        series: "H4-T / H5-T / DB-T / B1-T",
        toolInterface: "4 mm / 5 mm machine shanks",
        workingEnd: "T5-T25",
        lengths: "40-100 mm",
        application: {
          id: "Electric screwdriver dan machine holder berukuran kecil.",
          en: "Electric screwdrivers and smaller machine holders."
        }
      },
      {
        key: "b3-internal",
        option: { id: "B3 internal TORX bits", en: "B3 internal TORX bits" },
        series: "B3-T",
        toolInterface: "H6.35, 23 mm",
        workingEnd: "T8-T50",
        lengths: "50-200 mm",
        application: {
          id: "Power tool dengan B-30 style H6.35 interface.",
          en: "Power tools using the B-30-style H6.35 interface."
        }
      },
      {
        key: "b3-security-external",
        option: { id: "B3 security dan external TORX", en: "B3 security and external TORX" },
        series: "B3-TH / B3-E",
        toolInterface: "H6.35, 23 mm",
        workingEnd: "T10H-T40H / E5-E10",
        lengths: "50-100 mm",
        application: {
          id: "Tamper-resistant screw atau external TORX bolt.",
          en: "Tamper-resistant screws or external TORX bolts."
        }
      },
      {
        key: "b4",
        option: { id: "B4 internal TORX bits", en: "B4 internal TORX bits" },
        series: "B4-T",
        toolInterface: "H6.35, 25 mm",
        workingEnd: "T20-T40",
        lengths: "75 / 100 mm",
        application: {
          id: "Power tool dengan B-40 style drive position.",
          en: "Power tools using the B-40-style drive position."
        }
      },
      {
        key: "custom-msh",
        option: { id: "Custom TORX dan magnetic holder", en: "Custom TORX and magnetic holder" },
        series: "Types A-H / MSH / GR-T",
        toolInterface: "By tool or H6.35",
        workingEnd: "T20-T40 and made-to-order",
        lengths: "75 / 100 mm or custom",
        application: {
          id: "Long, extension, universal, magnet, stud-guide, torque-wrench head, atau screw-retention tooling.",
          en: "Long, extension, universal, magnet, stud-guide, torque-wrench-head, or screw-retention tooling."
        }
      }
    ],
    selectionChecklist: [
      {
        label: { id: "TORX type", en: "TORX type" },
        value: { id: "Internal T, security TH, atau external E.", en: "Internal T, security TH, or external E." }
      },
      {
        label: { id: "Drive atau shank", en: "Drive or shank" },
        value: { id: "S2/S3/S4 square drive atau H4/H5/DB/B1/B3/B4.", en: "S2/S3/S4 square drive or H4/H5/DB/B1/B3/B4." }
      },
      {
        label: { id: "Ukuran dan panjang", en: "Size and length" },
        value: { id: "Konfirmasikan T/E size serta total length dari aplikasi.", en: "Confirm the T/E size and total length from the application." }
      },
      {
        label: { id: "Fitur khusus", en: "Special feature" },
        value: { id: "Tamper hole, magnet, guide, universal, atau anti-vibration.", en: "Tamper hole, magnet, guide, universal, or anti-vibration." }
      }
    ],
    notes: [
      {
        id: "Tabel ukuran screw pada katalog adalah panduan umum; selalu verifikasi TORX drive size pada fastener aktual.",
        en: "The catalogue screw-size table is a general guide; always verify the TORX drive size on the actual fastener."
      },
      {
        id: "TORX dan TORX PLUS adalah merek dagang terdaftar dari Acument Intellectual Properties, LLC.",
        en: "TORX and TORX PLUS are registered trademarks of Acument Intellectual Properties, LLC."
      }
    ]
  },
  "magnetic-rings-magnetizer": {
    overview: {
      id: "Magnetic Rings & Magnetizer NAC membantu menahan screw pada ujung screwdriver bit. MRB detachable rings memusatkan flux magnetic pada point bit, sedangkan BMD200 dapat magnetize atau demagnetize steel bits melalui satu push switch.",
      en: "NAC Magnetic Rings & Magnetizer products help retain screws at the screwdriver-bit tip. MRB detachable rings concentrate magnetic flux at the bit point, while the BMD200 can magnetize or demagnetize steel bits with one push switch."
    },
    features: [
      {
        id: "MRB600, MRB700, dan MRB710 dapat dilepas dan dipasang pada bit yang sesuai.",
        en: "MRB600, MRB700, and MRB710 are detachable and fit their specified bits."
      },
      {
        id: "BMD200 menggunakan AC100V, 125W dan memiliki thermal cutoff 80°C ±5°C.",
        en: "The BMD200 uses AC100V at 125W and includes an 80°C ±5°C thermal cutoff."
      },
      {
        id: "Bit dimagnetisasi dengan memasukkan bit lalu menekan switch; demagnetisasi dilakukan dengan menarik bit saat switch ditekan.",
        en: "A bit is magnetized by inserting it and pressing the switch; it is demagnetized by withdrawing it while the switch remains pressed."
      }
    ],
    images: ["/assets/brands/products/nac/catalog-magnetic-rings.png"],
    catalogueReference: "NAC Fastener Tools 8, P45",
    options: [
      {
        key: "mrb600",
        option: { id: "Detachable magnetic ring", en: "Detachable magnetic ring" },
        series: "MRB600",
        toolInterface: "Ring Ø13 / bit Ø6",
        workingEnd: "Applicable bit body Ø5",
        lengths: "13 mm ring",
        application: {
          id: "Memusatkan magnet pada tip bit yang sesuai.",
          en: "Concentrating magnetic force at a matching bit tip."
        }
      },
      {
        key: "mrb700",
        option: { id: "Detachable magnetic ring", en: "Detachable magnetic ring" },
        series: "MRB700 / MRB710",
        toolInterface: "Ring Ø14 / bit Ø7",
        workingEnd: "Applicable H6.35-class bits",
        lengths: "13 mm ring",
        application: {
          id: "Screw retention pada screwdriver bit berukuran lebih besar.",
          en: "Screw retention on larger screwdriver bits."
        }
      },
      {
        key: "bmd200",
        option: { id: "Magnetizer / demagnetizer", en: "Magnetizer / demagnetizer" },
        series: "BMD200",
        toolInterface: "Ø15 x 50 mm insertion hole",
        workingEnd: "Steel bits up to insertion size",
        lengths: "73 x 115 x 55 mm body",
        application: {
          id: "Magnetize atau demagnetize ordinary steel driver bits di workstation.",
          en: "Magnetizing or demagnetizing ordinary steel driver bits at the workstation."
        }
      }
    ],
    selectionChecklist: [
      {
        label: { id: "Diameter bit", en: "Bit diameter" },
        value: { id: "Cocokkan MRB600 atau MRB700/710 dengan body bit.", en: "Match MRB600 or MRB700/710 to the bit body." }
      },
      {
        label: { id: "Retention need", en: "Retention need" },
        value: { id: "Gunakan ring bila bantuan magnet permanen dibutuhkan saat operasi.", en: "Use a ring when persistent magnetic assistance is needed during operation." }
      },
      {
        label: { id: "Workstation supply", en: "Workstation supply" },
        value: { id: "BMD200 pada katalog menggunakan AC100V 50/60Hz.", en: "The catalogue BMD200 uses AC100V 50/60Hz." }
      },
      {
        label: { id: "Material bit", en: "Bit material" },
        value: { id: "Magnetizer ditujukan untuk steel bits yang kompatibel.", en: "The magnetizer is intended for compatible steel bits." }
      }
    ],
    notes: [
      {
        id: "Konfirmasikan voltage requirement BMD200 untuk instalasi lokal sebelum memesan.",
        en: "Confirm the BMD200 voltage requirement for the local installation before ordering."
      },
      {
        id: "BMD200 memiliki berat sekitar 450 g dan magnet power 18 g pada steel SC Ø6 mm bit menurut katalog.",
        en: "The BMD200 weighs approximately 450 g and is rated at 18 g magnet power with a steel SC Ø6 mm bit according to the catalogue."
      }
    ]
  }
};
