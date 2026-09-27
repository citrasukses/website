export type Customer = {
  name: string;
  logo: string;
  logoScale?: number;
  homepageStatus: "shown" | "not_shown";
};

type CustomerLogoMetadata = {
  name: string;
  logoScale?: number;
  homepageStatus: Customer["homepageStatus"];
};

export const preferredCustomerLogoOrder = [
  "TMMIN.png",
  "AHM.png",
  "ADM.png",
  "Suzuki.png",
  "DENSO.png",
  "AOP.png",
  "ASTEMO.png",
  "Hyundai Motor Company.svg",
  "KOMATSU.png",
  "ISUZU.webp",
  "YANMAR.webp",
  "Akebono.png",
  "Gajah Tunggal.png",
  "GS Battery.webp",
  "EXEDY.png",
  "KAWASAKI.jpg",
  "SANY.jpeg",
  "SGMW.jpeg"
];

export const customerLogoMetadata: Record<string, CustomerLogoMetadata> = {
  "ADM.png": { name: "PT Astra Daihatsu Motor", homepageStatus: "shown" },
  "AHM.png": { name: "PT Astra Honda Motor", homepageStatus: "shown" },
  "AOP.png": { name: "PT Astra Otoparts Tbk", homepageStatus: "shown" },
  "ASTEMO.png": { name: "PT Astemo Bekasi Manufacturing", homepageStatus: "shown" },
  "AUTOLINE.webp": { name: "Autoline", homepageStatus: "not_shown" },
  "Akebono.png": { name: "PT Akebono Brake Astra Indonesia", homepageStatus: "shown" },
  "CHEMCO.png": { name: "PT Chemco Harapan Nusantara", logoScale: 1.55, homepageStatus: "not_shown" },
  "CMW.png": { name: "PT Cipta Mandiri Wirasakti", logoScale: 1.75, homepageStatus: "not_shown" },
  "DENSO.png": { name: "PT DENSO Indonesia", logoScale: 1.28, homepageStatus: "shown" },
  "Daihatsu Drivetrain.jpeg": { name: "PT Daihatsu Drivetrain Manufacturing Indonesia", logoScale: 1.28, homepageStatus: "not_shown" },
  "EXEDY.png": { name: "PT EXEDY Manufacturing Indonesia", logoScale: 1.28, homepageStatus: "shown" },
  "Fuji Seat Indonesia.jpg": { name: "PT Fuji Seat Indonesia", logoScale: 1.2, homepageStatus: "not_shown" },
  "GS Battery.webp": { name: "PT GS Battery", logoScale: 1.55, homepageStatus: "shown" },
  "Gajah Tunggal.png": { name: "PT Gajah Tunggal Tbk", homepageStatus: "shown" },
  "Gaya Motor.png": { name: "PT Gaya Motor", homepageStatus: "not_shown" },
  "Hyundai Motor Company.svg": { name: "PT Hyundai Motor Manufacturing Indonesia", logoScale: 1.12, homepageStatus: "shown" },
  "ISUZU.webp": { name: "PT Mesin Isuzu Indonesia", homepageStatus: "shown" },
  "KAWASAKI.jpg": { name: "PT Kawasaki Motor Indonesia", homepageStatus: "shown" },
  "KOMATSU.png": { name: "PT Komatsu Indonesia", homepageStatus: "shown" },
  "MAZDA.jpeg": { name: "Mazda", logoScale: 1.12, homepageStatus: "not_shown" },
  "MKM.png": { name: "PT Mitsubishi Krama Yudha Motors and Manufacturing", homepageStatus: "not_shown" },
  "National Assemblers.png": { name: "PT National Assemblers", logoScale: 1.28, homepageStatus: "not_shown" },
  "Nusahadi.png": { name: "PT Nusahadi Citraharmonis", homepageStatus: "not_shown" },
  "PATCO.jpeg": { name: "PT Patco Elektronik Teknologi", logoScale: 1.5, homepageStatus: "not_shown" },
  "SANY.jpeg": { name: "SANY", logoScale: 1.58, homepageStatus: "shown" },
  "SGMW.jpeg": { name: "PT SGMW Motor Indonesia (Wuling Motors)", logoScale: 1.5, homepageStatus: "shown" },
  "Suzuki.png": { name: "PT Suzuki Indomobil Motor", homepageStatus: "shown" },
  "TACI.png": { name: "PT TD Automotive Compressor Indonesia", homepageStatus: "not_shown" },
  "TAM.png": { name: "PT Toyota-Astra Motor", logoScale: 1.8, homepageStatus: "not_shown" },
  "TMMIN.png": { name: "PT Toyota Motor Manufacturing Indonesia", homepageStatus: "shown" },
  "YANMAR.webp": { name: "PT Yanmar Diesel Indonesia", homepageStatus: "shown" }
};

export const stats = [
  {
    value: { id: "30+", en: "30+" },
    label: { id: "Pengalaman pasokan industri", en: "Industrial supply experience" }
  },
  {
    value: { id: "300+", en: "300+" },
    label: { id: "Pelanggan manufaktur", en: "Manufacturing customers" }
  },
  {
    value: { id: "Distributor resmi", en: "Official distributor" },
    label: {
      id: "Untuk brand industrial Jepang pilihan",
      en: "For selected Japanese industrial brands"
    },
    emphasis: "authorized"
  }
];
