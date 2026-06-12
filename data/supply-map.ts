import { brands } from "@/data/brands";
import type { LocalizedText } from "@/lib/i18n";

export type SupplyMapBrand = {
  name: string;
  slug?: string;
};

export type SupplyMapCountry = {
  code: string;
  name: LocalizedText;
  mapPath: string;
  label: {
    x: number;
    y: number;
  };
  marker: {
    x: number;
    y: number;
  };
  brands: SupplyMapBrand[];
};

type SupplyMapCountryDefinition = Omit<SupplyMapCountry, "brands"> & {
  extraBrands?: SupplyMapBrand[];
};

// Add future origins here. Brands with a matching countryCode in data/brands.ts are included automatically.
const countryDefinitions: SupplyMapCountryDefinition[] = [
  {
    code: "JP",
    name: { id: "Jepang", en: "Japan" },
    label: { x: 505, y: 81 },
    marker: { x: 485, y: 89 },
    mapPath:
      "M508.1 74.4L502 79.2L502.1 84L499.6 87.8L500.8 90.2L497.3 93.5L488.9 95.7L477.3 96L467.8 101.3L463.4 99.5L463.1 96L436.1 99.4L442.8 102.8L438.4 110.8L434.1 112.8L430.9 111L432.5 106.7L428.3 105.4L425.7 102.1L431.9 100.7L446.9 92.1L460 90.7L467.1 91.6L474 83.3L478.4 85.5L491.9 79L496 73.2L494.9 67.9L497.7 65L504.7 64.1L508.3 70.6L508.1 74.4Z M526.1 51.9L530.8 50L532.3 55.2L522.5 56.5L516.7 61.2L506.3 58L502.7 63.1L495.4 63.2L494.4 58.5L497.7 54.9L504.8 54.6L508.7 44.5L516.4 49.4L526.1 51.9Z M445.2 101.3L448.9 98.5L452.6 99.1L455.4 97.1L460.2 98.1L461.1 99.7L457.3 102.6L454.6 101.1L451.2 102.2L449.5 104.9L445.2 103.6L445.2 101.3Z"
  },
  {
    code: "TH",
    name: { id: "Thailand", en: "Thailand" },
    label: { x: 166, y: 194 },
    marker: { x: 238, y: 186 },
    mapPath:
      "M265.8 191.7L251.1 191.9L246.8 195.8L248.4 201.5L242.5 199.3L236.8 199.4L237.8 195.7L232 195.7L231.4 200.9L225.7 211.9L226.2 215.3L230.5 215.5L234.3 223.9L245.5 229.5L243.3 231.5L238.9 232L238.4 229.6L233 227.6L231.9 228.4L221.4 219.4L220.3 222.1L219.1 219.5L221.7 212.1L228.6 202.9L225.3 193.8L219.4 187.7L221.6 186.8L224.1 182.7L214 172L216.8 171.2L219.8 166.1L224.4 165.9L232.1 162.7L234.9 164.2L235.3 167L239.8 167.2L238.3 176.4L245.3 173.6L251.1 174.3L252.5 172.7L257.5 173L262.5 176.8L262.9 181.5L268.2 185.6L267.9 189.5L265.8 191.7Z",
    extraBrands: [{ name: "SMBC" }]
  },
  {
    code: "VN",
    name: { id: "Vietnam", en: "Vietnam" },
    label: { x: 285, y: 149 },
    marker: { x: 267, y: 157 },
    mapPath:
      "M259.9 209.5L272.6 207.2L269.7 204.4L280.8 200.8L281.6 195.1L280.1 192L281.3 187.3L279.6 184L265 171L257.1 168.2L263.2 165.2L260.6 161.1L252.5 161.1L245.6 153.1L260.9 151.4L266.5 148.9L275.8 151.6L274.7 154.3L277.9 156.2L284.5 157.4L275.7 161.4L270.2 165.9L268.7 169.1L280 180.2L290 186.9L293 195.6L292.1 203.9L265.4 218.4L263 215.3L264.9 212.1L259.9 209.5Z",
    extraBrands: [{ name: "Vietnhat" }]
  }
];

function catalogBrandsForCountry(countryCode: string): SupplyMapBrand[] {
  return brands
    .filter((brand) => brand.countryCode === countryCode)
    .map((brand) => ({
      name: brand.name,
      slug: brand.slug
    }));
}

function mergeBrands(countryCode: string, extraBrands: SupplyMapBrand[] = []) {
  const byName = new Map<string, SupplyMapBrand>();

  for (const brand of [...catalogBrandsForCountry(countryCode), ...extraBrands]) {
    const key = brand.name.toLowerCase();

    if (!byName.has(key)) {
      byName.set(key, brand);
    }
  }

  return Array.from(byName.values());
}

export const supplyCountries: SupplyMapCountry[] = countryDefinitions.map(({ extraBrands, ...country }) => ({
  ...country,
  brands: mergeBrands(country.code, extraBrands)
}));
