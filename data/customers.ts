export type Customer = {
  name: string;
  logo: string;
  logoScale?: number;
};

type CustomerLogoMetadata = {
  name?: string;
  logoScale?: number;
};

export const preferredCustomerLogoOrder = [
  "TMMIN.png",
  "DENSO.png",
  "Suzuki.png",
  "AHM.png",
  "KOMATSU.png",
  "Hyundai Motor Manufacturing Indonesia.png",
  "ISUZU.webp",
  "YANMAR.webp",
  "Akebono.png",
  "Gajah Tunggal.png"
];

export const customerLogoMetadata: Record<string, CustomerLogoMetadata> = {
  "ADM.png": { name: "Astra Daihatsu Motor" },
  "AHM.png": { name: "Astra Honda Motor" },
  "AOP.png": { name: "Astra Otoparts" },
  "ASTEMO.png": { name: "Astemo" },
  "AUTOLINE.webp": { name: "Autoline" },
  "CHEMCO.png": { name: "Chemco", logoScale: 1.55 },
  "CMW.png": { name: "CMW", logoScale: 1.75 },
  "DENSO.png": { name: "Denso", logoScale: 1.28 },
  "Daihatsu Drivetrain.jpeg": { name: "Daihatsu Drivetrain", logoScale: 1.28 },
  "EXEDY.png": { name: "Exedy", logoScale: 1.28 },
  "Fuji Seat Indonesia.jpg": { name: "Fuji Seat Indonesia", logoScale: 1.2 },
  "GS Battery.webp": { name: "GS Battery", logoScale: 1.55 },
  "Gaya Motor.png": { name: "Gaya Motor" },
  "Hyundai Motor Manufacturing Indonesia.png": { name: "Hyundai Motor Manufacturing Indonesia", logoScale: 1.12 },
  "ISUZU.webp": { name: "Isuzu" },
  "KAWASAKI.jpg": { name: "Kawasaki" },
  "KOMATSU.png": { name: "Komatsu" },
  "MAZDA.jpeg": { name: "Mazda", logoScale: 1.12 },
  "MKM.png": { name: "MKM" },
  "National Assemblers.png": { name: "National Assemblers", logoScale: 1.28 },
  "PATCO.jpeg": { name: "Patco", logoScale: 1.5 },
  "SANY.jpeg": { name: "Sany", logoScale: 1.58 },
  "SGMW.jpeg": { name: "SGMW", logoScale: 1.5 },
  "TACI.png": { name: "TACI" },
  "TAM.png": { name: "Toyota Astra Motor", logoScale: 1.8 },
  "TMMIN.png": { name: "Toyota Motor Manufacturing Indonesia" },
  "YANMAR.webp": { name: "Yanmar" }
};

export const stats = [
  { value: "30+", label: { id: "Tahun pengalaman", en: "Years experience" } },
  { value: "50+", label: { id: "Brand industrial", en: "Industrial brands" } },
  { value: "300+", label: { id: "Klien di Indonesia", en: "Clients across Indonesia" } }
];
