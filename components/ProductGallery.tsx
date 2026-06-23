"use client";

import { useState } from "react";
import { AssetSlot } from "@/components/AssetSlot";

export function ProductGallery({ images, productName }: { images: string[]; productName: string }) {
  const availableImages = Array.from(new Set(images.filter(Boolean)));
  const [selected, setSelected] = useState(availableImages[0] ?? "");

  return (
    <div>
      <AssetSlot
        src={selected}
        alt={productName}
        label={productName}
        className="aspect-square border-graphite-200 bg-graphite-50"
        imageClassName="object-contain p-8"
        sizes="(max-width: 1024px) 100vw, 50vw"
      />
      {availableImages.length > 1 ? (
        <div className="mt-3 grid grid-cols-4 gap-3">
          {availableImages.map((image) => (
            <button key={image} type="button" onClick={() => setSelected(image)} className={`border bg-white ${selected === image ? "border-signal-500" : "border-graphite-200"}`}>
              <AssetSlot src={image} alt="" className="aspect-square border-0" imageClassName="object-contain p-2" sizes="120px" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

