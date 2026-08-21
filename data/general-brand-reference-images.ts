import referenceImageManifest from "@/data/general-brand-reference-images.json";

export type BrandReferenceImage = {
  src: string;
  alt: string;
  sourceUrl: string;
};

type ReferenceImageManifestEntry = {
  imageUrl: string;
  sourceUrl: string;
  alt: string;
};

export const generalBrandReferenceImages = Object.fromEntries(
  Object.entries(referenceImageManifest as Record<string, ReferenceImageManifestEntry>).map(
    ([slug, image]) => [
      slug,
      [
        {
          src: `/assets/brands/reference/${slug}.webp`,
          alt: image.alt,
          sourceUrl: image.sourceUrl
        }
      ]
    ]
  )
) as Record<string, BrandReferenceImage[]>;
