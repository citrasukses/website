import type { LocalizedText } from "@/lib/i18n";

export type TradingBrand = {
  name: string;
  country?: string;
  category: LocalizedText;
  searchTerms: string[];
  priority?: number;
};

export const tradingBrandCount = 300;

export const tradingBrands: TradingBrand[] = [
  {
    name: "Genius",
    country: "Taiwan",
    category: { id: "Socket, hand tools, dan workshop tools", en: "Sockets, hand tools, and workshop tools" },
    searchTerms: ["socket", "sockets", "ratchet", "wrench", "hand tools", "workshop tools"],
    priority: 10
  },
  {
    name: "Ko-ken",
    country: "Japan",
    category: { id: "Socket dan impact socket", en: "Sockets and impact sockets" },
    searchTerms: ["socket", "impact socket", "ratchet", "hand tools", "automotive tools"],
    priority: 9
  },
  {
    name: "TONE",
    country: "Japan",
    category: { id: "Hand tools, socket, dan torque tools", en: "Hand tools, sockets, and torque tools" },
    searchTerms: ["socket", "torque tools", "torque wrench", "ratchet", "hand tools"],
    priority: 8
  },
  {
    name: "KTC",
    country: "Japan",
    category: { id: "Hand tools dan automotive tools", en: "Hand tools and automotive tools" },
    searchTerms: ["socket", "wrench", "spanner", "ratchet", "automotive tools"],
    priority: 8
  },
  {
    name: "Vessel",
    country: "Japan",
    category: { id: "Screwdriver, bit, dan fastening tools", en: "Screwdrivers, bits, and fastening tools" },
    searchTerms: ["screwdriver", "bit", "bits", "fastening", "air screwdriver", "electric screwdriver"],
    priority: 8
  },
  {
    name: "Ohmi",
    country: "Japan",
    category: { id: "Screwdriver bit dan precision bits", en: "Screwdriver bits and precision bits" },
    searchTerms: ["bit", "bits", "screwdriver bit", "precision bit", "fastening"],
    priority: 7
  },
  {
    name: "Mitutoyo",
    country: "Japan",
    category: { id: "Measuring tools dan precision instruments", en: "Measuring tools and precision instruments" },
    searchTerms: ["measuring", "measurement", "caliper", "micrometer", "gauge", "inspection"],
    priority: 7
  },
  {
    name: "Niigata Seiki",
    country: "Japan",
    category: { id: "Measuring tools, gauge, dan inspection tools", en: "Measuring tools, gauges, and inspection tools" },
    searchTerms: ["measuring", "gauge", "inspection", "caliper", "pin gauge"],
    priority: 6
  },
  {
    name: "OSG",
    country: "Japan",
    category: { id: "Cutting tools, tap, dan end mill", en: "Cutting tools, taps, and end mills" },
    searchTerms: ["cutting tools", "tap", "end mill", "drill", "threading", "machining"],
    priority: 7
  },
  {
    name: "Yamawa",
    country: "Japan",
    category: { id: "Tap, die, dan threading tools", en: "Taps, dies, and threading tools" },
    searchTerms: ["tap", "die", "threading", "cutting tools", "machining"],
    priority: 6
  },
  {
    name: "Nachi",
    country: "Japan",
    category: { id: "Drill, end mill, bearing, dan cutting tools", en: "Drills, end mills, bearings, and cutting tools" },
    searchTerms: ["drill", "end mill", "cutting tools", "bearing", "machining"],
    priority: 6
  },
  {
    name: "Mitsubishi Materials",
    country: "Japan",
    category: { id: "Insert, holder, dan carbide cutting tools", en: "Inserts, holders, and carbide cutting tools" },
    searchTerms: ["insert", "carbide", "cutting tools", "turning", "milling", "machining"],
    priority: 6
  },
  {
    name: "Kyocera",
    country: "Japan",
    category: { id: "Insert, cutting tools, dan tooling", en: "Inserts, cutting tools, and tooling" },
    searchTerms: ["insert", "carbide", "cutting tools", "turning", "milling", "machining"],
    priority: 6
  },
  {
    name: "NS Tool",
    country: "Japan",
    category: { id: "End mill dan micro machining tools", en: "End mills and micro machining tools" },
    searchTerms: ["end mill", "micro end mill", "cutting tools", "milling", "precision machining"],
    priority: 5
  },
  {
    name: "Nitto Kohki",
    country: "Japan",
    category: { id: "Coupler, pump, dan industrial tools", en: "Couplers, pumps, and industrial tools" },
    searchTerms: ["coupler", "quick coupler", "pump", "air tools", "industrial tools"],
    priority: 5
  },
  {
    name: "SMC",
    country: "Japan",
    category: { id: "Pneumatic components dan automation parts", en: "Pneumatic components and automation parts" },
    searchTerms: ["pneumatic", "cylinder", "valve", "fitting", "air preparation", "automation"],
    priority: 5
  },
  {
    name: "CKD",
    country: "Japan",
    category: { id: "Pneumatic, valve, dan automation components", en: "Pneumatics, valves, and automation components" },
    searchTerms: ["pneumatic", "valve", "cylinder", "fitting", "automation"],
    priority: 5
  },
  {
    name: "THK",
    country: "Japan",
    category: { id: "Linear motion dan guide components", en: "Linear motion and guide components" },
    searchTerms: ["linear guide", "lm guide", "linear motion", "bearing", "actuator"],
    priority: 5
  },
  {
    name: "IKO",
    country: "Japan",
    category: { id: "Bearing dan linear motion components", en: "Bearings and linear motion components" },
    searchTerms: ["bearing", "needle bearing", "linear guide", "linear motion"],
    priority: 5
  },
  {
    name: "NTN",
    country: "Japan",
    category: { id: "Bearing dan mechanical components", en: "Bearings and mechanical components" },
    searchTerms: ["bearing", "ball bearing", "roller bearing", "mechanical components"],
    priority: 5
  },
  {
    name: "NSK",
    country: "Japan",
    category: { id: "Bearing dan motion components", en: "Bearings and motion components" },
    searchTerms: ["bearing", "ball bearing", "roller bearing", "linear guide", "motion"],
    priority: 5
  },
  {
    name: "Oriental Motor",
    country: "Japan",
    category: { id: "Motor, driver, dan motion control", en: "Motors, drivers, and motion control" },
    searchTerms: ["motor", "stepper motor", "driver", "motion control", "automation"],
    priority: 5
  },
  {
    name: "Omron",
    country: "Japan",
    category: { id: "Sensor, relay, PLC, dan automation control", en: "Sensors, relays, PLCs, and automation control" },
    searchTerms: ["sensor", "relay", "plc", "switch", "automation", "control"],
    priority: 5
  },
  {
    name: "Keyence",
    country: "Japan",
    category: { id: "Sensor, vision, dan measuring systems", en: "Sensors, vision, and measuring systems" },
    searchTerms: ["sensor", "vision", "measurement", "laser", "inspection", "automation"],
    priority: 5
  },
  {
    name: "Yokogawa",
    country: "Japan",
    category: { id: "Instrumentasi, measurement, dan control", en: "Instrumentation, measurement, and control" },
    searchTerms: ["instrumentation", "measurement", "recorder", "control", "process"],
    priority: 4
  },
  {
    name: "Fuji Electric",
    country: "Japan",
    category: { id: "Electrical control dan factory automation", en: "Electrical control and factory automation" },
    searchTerms: ["inverter", "control", "electrical", "automation", "power"],
    priority: 4
  },
  {
    name: "Schneider Electric",
    country: "France",
    category: { id: "Electrical control dan automation", en: "Electrical control and automation" },
    searchTerms: ["electrical", "breaker", "contactor", "plc", "automation", "control"],
    priority: 4
  },
  {
    name: "Siemens",
    country: "Germany",
    category: { id: "Automation, electrical control, dan drive", en: "Automation, electrical control, and drives" },
    searchTerms: ["plc", "inverter", "drive", "automation", "electrical", "control"],
    priority: 4
  },
  {
    name: "3M",
    country: "United States",
    category: { id: "Abrasive, tape, adhesive, dan safety supplies", en: "Abrasives, tapes, adhesives, and safety supplies" },
    searchTerms: ["abrasive", "tape", "adhesive", "safety", "masking", "finishing"],
    priority: 4
  },
  {
    name: "Loctite",
    country: "Germany",
    category: { id: "Adhesive, threadlocker, dan sealant", en: "Adhesives, threadlockers, and sealants" },
    searchTerms: ["adhesive", "threadlocker", "sealant", "bonding", "maintenance"],
    priority: 4
  },
  {
    name: "SKF",
    country: "Sweden",
    category: { id: "Bearing, seal, dan lubrication products", en: "Bearings, seals, and lubrication products" },
    searchTerms: ["bearing", "seal", "lubrication", "maintenance", "mechanical components"],
    priority: 4
  },
  {
    name: "Festo",
    country: "Germany",
    category: { id: "Pneumatic dan automation components", en: "Pneumatic and automation components" },
    searchTerms: ["pneumatic", "cylinder", "valve", "fitting", "automation"],
    priority: 4
  }
];
