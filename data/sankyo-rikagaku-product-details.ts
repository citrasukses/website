import sankyoRikagakuProducts from "@/data/sankyo-rikagaku-products.json";
import type { LocalizedText } from "@/lib/i18n";

export type SankyoRikagakuModel = {
  slug: string;
  name: string;
  image: string;
  officialUrl: string;
  type: string;
  formats: string[];
  applications: string[];
};

export type SankyoRikagakuSelectionItem = {
  label: LocalizedText;
  value: LocalizedText;
};

export type SankyoRikagakuFamilyDetail = {
  overview: LocalizedText;
  features: LocalizedText[];
  images: string[];
  models: SankyoRikagakuModel[];
  selectionChecklist: SankyoRikagakuSelectionItem[];
  notes: LocalizedText[];
  seoDescription: LocalizedText;
  seoKeywords: string[];
};

const models = sankyoRikagakuProducts as Record<string, SankyoRikagakuModel[]>;

export const sankyoRikagakuProductDetails: Record<string, SankyoRikagakuFamilyDetail> = {
  "sheet-products": {
    overview: {
      id: "Sheet products Sankyo Rikagaku mencakup abrasive paper tahan air dan kering, abrasive cloth, film, hook-and-loop, pressure-sensitive, serta non-woven FUJISTAR. Format lembar cocok untuk hand sanding, block sanding, dan mesin dengan pad sesuai bentuk serta ukuran produk.",
      en: "Sankyo Rikagaku sheet products include waterproof and dry abrasive paper, abrasive cloth, film, hook-and-loop, pressure-sensitive, and non-woven FUJISTAR products. Sheet formats support hand sanding, block sanding, and machines with matching pad shapes and sizes."
    },
    features: [
      {
        id: "Pilihan backing paper, cloth, film, dan non-woven membantu menyesuaikan fleksibilitas, ketahanan, serta konsistensi finish.",
        en: "Paper, cloth, film, and non-woven backings help match flexibility, durability, and finish consistency."
      },
      {
        id: "Pilihan dry, waterproof, hook-and-loop, serta pressure-sensitive tersedia untuk metode kerja dan attachment yang berbeda.",
        en: "Dry, waterproof, hook-and-loop, and pressure-sensitive options support different working methods and attachment systems."
      },
      {
        id: "Produk digunakan pada automotive, body repair, woodworking, steel, stainless steel, dan pekerjaan high-tech.",
        en: "Products serve automotive, body repair, woodworking, steel, stainless steel, and high-tech work."
      }
    ],
    images: [
      "/assets/brands/products/fuji-star/catalog/wet-dry-sanding-paper.jpg",
      "/assets/brands/products/fuji-star/catalog/abrasive-cloth-sheet.png",
      "/assets/brands/products/fuji-star/catalog/frnz.png"
    ],
    models: models["sheet-products"],
    selectionChecklist: [
      {
        label: { id: "Material workpiece", en: "Workpiece material" },
        value: { id: "Cat, metal, stainless steel, kayu, resin, komposit, atau komponen optik.", en: "Paint, metal, stainless steel, wood, resin, composites, or optical components." }
      },
      {
        label: { id: "Target proses", en: "Process target" },
        value: { id: "Material removal, surface preparation, scratch refinement, atau final finishing.", en: "Material removal, surface preparation, scratch refinement, or final finishing." }
      },
      {
        label: { id: "Backing & attachment", en: "Backing & attachment" },
        value: { id: "Paper, cloth, film, non-woven, hook-and-loop, pressure-sensitive, atau plain sheet.", en: "Paper, cloth, film, non-woven, hook-and-loop, pressure-sensitive, or plain sheet." }
      },
      {
        label: { id: "Ukuran & grit", en: "Size & grit" },
        value: { id: "Konfirmasi dimensi lembar, hole pattern bila ada, abrasive grain, dan grit sequence.", en: "Confirm sheet dimensions, hole pattern when applicable, abrasive grain, and grit sequence." }
      }
    ],
    notes: [
      {
        id: "Satu produk dapat tersedia sebagai sheet sekaligus disc atau roll; halaman ini mengikuti pengelompokan resmi Sankyo Rikagaku.",
        en: "A product may be available as a sheet as well as a disc or roll; this page follows Sankyo Rikagaku's official grouping."
      },
      {
        id: "Konfirmasikan grit, ukuran, backing, jumlah per kemasan, dan kondisi penggunaan basah atau kering sebelum memesan.",
        en: "Confirm grit, size, backing, pack quantity, and wet or dry operating conditions before ordering."
      }
    ],
    seoDescription: {
      id: "Katalog sheet abrasive Sankyo Rikagaku FUJISTAR Indonesia: abrasive paper, cloth, film, hook-and-loop, PS, dan non-woven untuk sanding dan finishing.",
      en: "Sankyo Rikagaku FUJISTAR sheet abrasive catalogue for Indonesia: paper, cloth, film, hook-and-loop, PS, and non-woven sanding and finishing products."
    },
    seoKeywords: [
      "Sankyo Rikagaku sheet abrasive",
      "FUJISTAR sandpaper Indonesia",
      "abrasive paper",
      "waterproof abrasive paper",
      "dry abrasive paper",
      "abrasive film",
      "hook and loop sandpaper"
    ]
  },
  "disc-products": {
    overview: {
      id: "Disc products Sankyo Rikagaku adalah abrasive berbentuk lingkaran untuk random orbital sander, disc sander, grinder, dan proses manual dengan pad yang sesuai. Katalog FUJISTAR mencakup film disc, hook-and-loop, pressure-sensitive, paper disc, serta fiber disc.",
      en: "Sankyo Rikagaku disc products are circular abrasives for random orbital sanders, disc sanders, grinders, and hand work with matching pads. The FUJISTAR catalogue includes film, hook-and-loop, pressure-sensitive, paper, and fiber discs."
    },
    features: [
      {
        id: "Sistem attachment mencakup hook-and-loop dan pressure-sensitive untuk pemasangan cepat pada pad.",
        en: "Attachment systems include hook-and-loop and pressure-sensitive formats for fast pad mounting."
      },
      {
        id: "Pilihan paper, film, dan fiber membantu menyesuaikan fleksibilitas, cutting power, serta kualitas finish.",
        en: "Paper, film, and fiber choices help match flexibility, cutting power, and finish quality."
      },
      {
        id: "Pilihan produk mencakup body repair, paint preparation, woodworking, metal, resin, dan shipbuilding.",
        en: "Product options cover body repair, paint preparation, woodworking, metal, resin, and shipbuilding."
      }
    ],
    images: [
      "/assets/brands/products/fuji-star/catalog/econo-disc.jpg",
      "/assets/brands/products/fuji-star/catalog/frnz.png",
      "/assets/brands/products/fuji-star/catalog/q-disc.jpg"
    ],
    models: models["disc-products"],
    selectionChecklist: [
      {
        label: { id: "Mesin & pad", en: "Machine & pad" },
        value: { id: "Diameter pad, orbit atau action, RPM, serta kebutuhan dust extraction.", en: "Pad diameter, orbit or action, RPM, and dust-extraction requirements." }
      },
      {
        label: { id: "Attachment", en: "Attachment" },
        value: { id: "Hook-and-loop, pressure-sensitive, center hole, atau fiber-disc mounting.", en: "Hook-and-loop, pressure-sensitive, center hole, or fiber-disc mounting." }
      },
      {
        label: { id: "Diameter & hole", en: "Diameter & holes" },
        value: { id: "Konfirmasi diameter disc dan hole pattern agar cocok dengan pad dan extractor.", en: "Confirm disc diameter and hole pattern to match the pad and extractor." }
      },
      {
        label: { id: "Cut & finish", en: "Cut & finish" },
        value: { id: "Pilih abrasive grain dan grit sequence berdasarkan removal rate dan target scratch.", en: "Choose abrasive grain and grit sequence by removal rate and target scratch." }
      }
    ],
    notes: [
      {
        id: "Jangan menggunakan disc di atas kecepatan maksimum mesin atau pad yang direkomendasikan.",
        en: "Do not operate a disc above the recommended machine or pad speed."
      },
      {
        id: "Pastikan seluruh permukaan attachment menempel rata dan pad dalam kondisi baik sebelum mesin dijalankan.",
        en: "Ensure the attachment surface is fully seated and the pad is in good condition before starting the machine."
      }
    ],
    seoDescription: {
      id: "Katalog abrasive disc Sankyo Rikagaku FUJISTAR Indonesia: film, hook-and-loop, pressure-sensitive, paper, dan fiber disc untuk sanding dan polishing.",
      en: "Sankyo Rikagaku FUJISTAR abrasive disc catalogue for Indonesia: film, hook-and-loop, pressure-sensitive, paper, and fiber discs."
    },
    seoKeywords: [
      "Sankyo Rikagaku abrasive disc",
      "FUJISTAR sanding disc Indonesia",
      "hook and loop disc",
      "PS abrasive disc",
      "fiber disc",
      "automotive sanding disc"
    ]
  },
  "belt-products": {
    overview: {
      id: "Belt products Sankyo Rikagaku mencakup abrasive belt berbasis cloth, paper, dan non-woven untuk belt sander, wide belt sander, stroke sander, serta finishing kontur. Setiap belt perlu dipilih berdasarkan ukuran mesin, material backing, abrasive grain, joint, dan target proses.",
      en: "Sankyo Rikagaku belt products include cloth, paper, and non-woven abrasive belts for belt sanders, wide-belt sanders, stroke sanders, and contour finishing. Each belt must be selected by machine size, backing, abrasive grain, joint, and process target."
    },
    features: [
      {
        id: "Cloth belt tersedia untuk metal, stainless steel, aluminium, faucet, woodworking, dan curved-surface finishing.",
        en: "Cloth belts cover metal, stainless steel, aluminum, faucet, woodworking, and curved-surface finishing."
      },
      {
        id: "Paper belt mendukung coating, board, instrument, serta wide-belt sanding dengan pilihan karakter cut dan clog resistance.",
        en: "Paper belts support coating, board, instrument, and wide-belt sanding with different cut and clog-resistance characteristics."
      },
      {
        id: "Narrow, wide, flexible, cork, dan dedicated series membantu menyesuaikan kontak, pressure, serta target surface.",
        en: "Narrow, wide, flexible, cork, and dedicated series help match contact, pressure, and surface targets."
      }
    ],
    images: [
      "/assets/brands/products/fuji-star/catalog/abrasive-cloth-belt-rseries.jpg",
      "/assets/brands/products/fuji-star/catalog/abrasive-cloth-belt-narrow.jpg",
      "/assets/brands/products/fuji-star/catalog/abrasive-cloth-belt-cork.jpg"
    ],
    models: models["belt-products"],
    selectionChecklist: [
      {
        label: { id: "Ukuran belt", en: "Belt size" },
        value: { id: "Lebar × panjang keliling sesuai nameplate dan tracking range mesin.", en: "Width × circumference to match the machine nameplate and tracking range." }
      },
      {
        label: { id: "Material & bentuk", en: "Material & geometry" },
        value: { id: "Steel, stainless, aluminium, wood, coating, flat surface, edge, atau contour.", en: "Steel, stainless, aluminum, wood, coating, flat surface, edge, or contour." }
      },
      {
        label: { id: "Backing & joint", en: "Backing & joint" },
        value: { id: "Paper atau cloth weight, fleksibilitas, joint style, dan arah belt.", en: "Paper or cloth weight, flexibility, joint style, and belt direction." }
      },
      {
        label: { id: "Grain & grit", en: "Grain & grit" },
        value: { id: "Sesuaikan abrasive grain, coating density, dan grit dengan stock removal serta finish.", en: "Match abrasive grain, coating density, and grit to stock removal and finish." }
      }
    ],
    notes: [
      {
        id: "Gunakan belt dengan arah rotasi yang benar dan lakukan tracking check sebelum membebani belt.",
        en: "Install the belt in the correct running direction and check tracking before applying load."
      },
      {
        id: "Konfirmasikan belt joint dan dimensi aktual; nama series saja belum cukup untuk menentukan part number.",
        en: "Confirm the belt joint and actual dimensions; a series name alone is not enough to determine the part number."
      }
    ],
    seoDescription: {
      id: "Katalog abrasive belt Sankyo Rikagaku FUJISTAR Indonesia: cloth, paper, narrow, wide, flexible, dan cork belt untuk metal serta woodworking.",
      en: "Sankyo Rikagaku FUJISTAR abrasive belt catalogue for Indonesia: cloth, paper, narrow, wide, flexible, and cork belts."
    },
    seoKeywords: [
      "Sankyo Rikagaku abrasive belt",
      "FUJISTAR sanding belt Indonesia",
      "cloth abrasive belt",
      "paper sanding belt",
      "wide belt sander abrasive",
      "narrow abrasive belt"
    ]
  },
  "rolled-products": {
    overview: {
      id: "Rolled products Sankyo Rikagaku menyediakan abrasive dalam format roll untuk dipotong sesuai panjang kerja, dipasang pada file atau sander, atau digunakan pada proses berulang. Pilihan FUJISTAR mencakup hook-and-loop, pressure-sensitive, clog-resistant, mesh, dan slitted roll.",
      en: "Sankyo Rikagaku rolled products supply abrasives in roll form for cutting to working length, mounting on files or sanders, or repeated processing. FUJISTAR options include hook-and-loop, pressure-sensitive, clog-resistant, mesh, and slitted rolls."
    },
    features: [
      {
        id: "Format roll membantu mengurangi waste ketika panjang abrasive perlu disesuaikan dengan tool atau area kerja.",
        en: "Roll formats help reduce waste when abrasive length must be matched to the tool or work area."
      },
      {
        id: "Hook-and-loop dan pressure-sensitive backing tersedia untuk berbagai hand file, block, dan machine pad.",
        en: "Hook-and-loop and pressure-sensitive backings support a range of hand files, blocks, and machine pads."
      },
      {
        id: "Pilihan digunakan pada automotive repair, woodworking, furniture, resin parts, coating, dan general industry.",
        en: "Options serve automotive repair, woodworking, furniture, resin parts, coating, and general industry."
      }
    ],
    images: [
      "/assets/brands/products/fuji-star/catalog/hipitch-roll.jpg",
      "/assets/brands/products/fuji-star/catalog/slit-roll.jpg",
      "/assets/brands/products/fuji-star/catalog/auto-net.jpg"
    ],
    models: models["rolled-products"],
    selectionChecklist: [
      {
        label: { id: "Lebar & panjang", en: "Width & length" },
        value: { id: "Konfirmasi lebar roll, panjang total, dan panjang potong per penggunaan.", en: "Confirm roll width, total length, and cut length per use." }
      },
      {
        label: { id: "Attachment", en: "Attachment" },
        value: { id: "Plain, hook-and-loop, pressure-sensitive, atau mesh sesuai tool dan pad.", en: "Plain, hook-and-loop, pressure-sensitive, or mesh to match the tool and pad." }
      },
      {
        label: { id: "Backing", en: "Backing" },
        value: { id: "Paper, film, atau mesh berdasarkan fleksibilitas dan kebutuhan dust extraction.", en: "Paper, film, or mesh based on flexibility and dust-extraction needs." }
      },
      {
        label: { id: "Grit sequence", en: "Grit sequence" },
        value: { id: "Susun grit dari preparation hingga finish agar scratch sebelumnya terhapus konsisten.", en: "Plan grit progression from preparation to finish so previous scratches are removed consistently." }
      }
    ],
    notes: [
      {
        id: "Simpan roll dalam kemasan dan kondisi kering untuk mengurangi curl, kontaminasi, serta perubahan pada backing atau adhesive.",
        en: "Store rolls packaged and dry to reduce curl, contamination, and changes to the backing or adhesive."
      },
      {
        id: "Periksa kompatibilitas adhesive atau hook-and-loop dengan pad sebelum penggunaan produksi.",
        en: "Check adhesive or hook-and-loop compatibility with the pad before production use."
      }
    ],
    seoDescription: {
      id: "Katalog abrasive roll Sankyo Rikagaku FUJISTAR Indonesia: hook-and-loop, pressure-sensitive, clog-resistant, mesh, dan slitted roll.",
      en: "Sankyo Rikagaku FUJISTAR abrasive roll catalogue for Indonesia: hook-and-loop, pressure-sensitive, clog-resistant, mesh, and slitted rolls."
    },
    seoKeywords: [
      "Sankyo Rikagaku abrasive roll",
      "FUJISTAR sanding roll Indonesia",
      "hook and loop abrasive roll",
      "pressure sensitive abrasive roll",
      "slitted abrasive roll"
    ]
  },
  "non-woven-products": {
    overview: {
      id: "Non-woven abrasive Sankyo Rikagaku mencakup keluarga Kenmaron dan produk conditioning FUJISTAR dalam bentuk sheet, pad, belt, disc, wheel, cup, serta laminated product. Struktur serat terbuka cocok untuk cleaning, rust removal, deburring ringan, blending, dan finishing tanpa agresivitas abrasive konvensional.",
      en: "Sankyo Rikagaku non-woven abrasives include the Kenmaron family and FUJISTAR conditioning products in sheet, pad, belt, disc, wheel, cup, and laminated forms. Their open fiber structure supports cleaning, rust removal, light deburring, blending, and finishing with less aggressive action than conventional abrasives."
    },
    features: [
      {
        id: "Kenmaron tersedia dalam beberapa density dan finish level untuk cleaning, blending, hairline, serta surface preparation.",
        en: "Kenmaron is available in several densities and finish levels for cleaning, blending, hairline work, and surface preparation."
      },
      {
        id: "Bentuk sheet, belt, wheel, cup, disc, dan pad membantu mengikuti permukaan datar, contour, edge, serta area lokal.",
        en: "Sheet, belt, wheel, cup, disc, and pad forms support flat surfaces, contours, edges, and localized areas."
      },
      {
        id: "Cocok untuk automotive, steel, stainless steel, woodworking, body frame, dan pekerjaan maintenance.",
        en: "Suitable for automotive, steel, stainless steel, woodworking, body-frame, and maintenance work."
      }
    ],
    images: [
      "/assets/brands/products/fuji-star/catalog/kenmalon-super.jpg",
      "/assets/brands/products/fuji-star/catalog/hipitch-kenmalon.jpg",
      "/assets/brands/products/fuji-star/catalog/ml-cup-ml-disc.jpg"
    ],
    models: models["non-woven-products"],
    selectionChecklist: [
      {
        label: { id: "Tujuan proses", en: "Process purpose" },
        value: { id: "Cleaning, rust removal, blending, deburring ringan, hairline, atau preparation.", en: "Cleaning, rust removal, blending, light deburring, hairline finishing, or preparation." }
      },
      {
        label: { id: "Bentuk produk", en: "Product form" },
        value: { id: "Sheet, hand pad, belt, disc, flap wheel, cup, atau laminated wheel.", en: "Sheet, hand pad, belt, disc, flap wheel, cup, or laminated wheel." }
      },
      {
        label: { id: "Density & grade", en: "Density & grade" },
        value: { id: "Sesuaikan density, abrasive grade, dan flexibility dengan pressure serta target finish.", en: "Match density, abrasive grade, and flexibility to pressure and finish target." }
      },
      {
        label: { id: "Mesin & kecepatan", en: "Machine & speed" },
        value: { id: "Konfirmasi mounting, diameter, RPM, arah rotasi, dan area kontak.", en: "Confirm mounting, diameter, RPM, rotation direction, and contact area." }
      }
    ],
    notes: [
      {
        id: "Non-woven menghasilkan pola finish yang berbeda dari coated abrasive; lakukan trial pada workpiece representatif.",
        en: "Non-woven products create a different finish pattern from coated abrasives; trial them on a representative workpiece."
      },
      {
        id: "Gunakan guard dan PPE yang sesuai untuk wheel, cup, disc, dan belt yang berputar.",
        en: "Use appropriate guards and PPE for rotating wheels, cups, discs, and belts."
      }
    ],
    seoDescription: {
      id: "Katalog non-woven abrasive Sankyo Rikagaku FUJISTAR Indonesia: Kenmaron sheet, pad, belt, disc, wheel, cup, dan laminated products.",
      en: "Sankyo Rikagaku FUJISTAR non-woven abrasive catalogue for Indonesia: Kenmaron sheets, pads, belts, discs, wheels, cups, and laminated products."
    },
    seoKeywords: [
      "Sankyo Rikagaku non woven abrasive",
      "FUJISTAR Kenmaron Indonesia",
      "non woven abrasive pad",
      "non woven abrasive wheel",
      "surface conditioning abrasive",
      "stainless steel finishing pad"
    ]
  },
  "other-products": {
    overview: {
      id: "Supporting products Sankyo Rikagaku melengkapi proses sanding dan polishing dengan sander, polisher, pad, hand file, buff, compound, coating material, masking products, serta wiping cloth. Keluarga ini membantu menyusun proses dari surface preparation hingga final finish dengan komponen yang saling sesuai.",
      en: "Sankyo Rikagaku supporting products complete sanding and polishing processes with sanders, polishers, pads, hand files, buffs, compounds, coating materials, masking products, and wiping cloths. This family helps build a compatible process from surface preparation through final finishing."
    },
    features: [
      {
        id: "Sander dan polisher tersedia untuk body repair, polishing, woodworking, serta general finishing.",
        en: "Sanders and polishers cover body repair, polishing, woodworking, and general finishing."
      },
      {
        id: "Pad, block, file, dan tape membantu attachment, pressure distribution, edge control, serta hand sanding.",
        en: "Pads, blocks, files, and tapes support attachment, pressure distribution, edge control, and hand sanding."
      },
      {
        id: "Buff, compound, coating, masker, dan wiping products melengkapi tahap preparation sampai final appearance.",
        en: "Buffs, compounds, coatings, masking, and wiping products complete preparation through final appearance."
      }
    ],
    images: [
      "/assets/brands/products/fuji-star/catalog/cordless-polisher-eb351-6-21.jpg",
      "/assets/brands/products/fuji-star/catalog/frnz-black-cutter.png",
      "/assets/brands/products/fuji-star/catalog/cross-wool-65.jpg"
    ],
    models: models["other-products"],
    selectionChecklist: [
      {
        label: { id: "Tahap proses", en: "Process stage" },
        value: { id: "Preparation, sanding, polishing, buffing, masking, coating, atau cleanup.", en: "Preparation, sanding, polishing, buffing, masking, coating, or cleanup." }
      },
      {
        label: { id: "Tool compatibility", en: "Tool compatibility" },
        value: { id: "Diameter pad, thread atau mounting, orbit, speed, air supply, dan dust extraction.", en: "Pad diameter, thread or mounting, orbit, speed, air supply, and dust extraction." }
      },
      {
        label: { id: "System pairing", en: "System pairing" },
        value: { id: "Cocokkan sander, pad, abrasive, compound, dan buff sebagai satu proses.", en: "Match the sander, pad, abrasive, compound, and buff as one process." }
      },
      {
        label: { id: "Area & finish", en: "Area & finish" },
        value: { id: "Konfirmasi material, luas area, contour, defect, dan target gloss atau texture.", en: "Confirm material, area size, contour, defect, and target gloss or texture." }
      }
    ],
    notes: [
      {
        id: "Tidak semua buff, compound, pad, dan machine dapat dipertukarkan; lakukan compatibility check sebelum proses produksi.",
        en: "Not every buff, compound, pad, and machine is interchangeable; perform a compatibility check before production use."
      },
      {
        id: "Ikuti petunjuk SDS, ventilasi, PPE, serta speed limit untuk chemical product dan rotating accessories.",
        en: "Follow SDS, ventilation, PPE, and speed-limit instructions for chemical products and rotating accessories."
      }
    ],
    seoDescription: {
      id: "Katalog sander, polisher, pad, buff, compound, masking, dan finishing supplies Sankyo Rikagaku FUJISTAR untuk industri Indonesia.",
      en: "Sankyo Rikagaku FUJISTAR sanders, polishers, pads, buffs, compounds, masking, and finishing supplies for Indonesia."
    },
    seoKeywords: [
      "Sankyo Rikagaku polisher",
      "FUJISTAR sander Indonesia",
      "automotive buffing pad",
      "polishing compound",
      "sanding pad",
      "automotive masking products"
    ]
  }
};
