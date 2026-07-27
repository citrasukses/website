import Image from "next/image";
import imageBackgrounds from "@/data/image-backgrounds.json";

const backgroundByImage = imageBackgrounds as Record<string, string>;

type AssetSlotProps = {
  src: string;
  alt: string;
  label?: string;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  fit?: "cover" | "contain";
  priority?: boolean;
};

export function AssetSlot({
  src,
  alt,
  label,
  className = "",
  imageClassName = "",
  sizes = "(max-width: 768px) 100vw, 50vw",
  fit = "cover",
  priority = false
}: AssetSlotProps) {
  const fitClassName = fit === "contain" ? "object-contain" : "object-cover";
  const imageBackground = fit === "contain" && src ? backgroundByImage[src] : undefined;
  const backgroundStyle = imageBackground ? { backgroundColor: imageBackground } : undefined;

  return (
    <div
      className={`relative overflow-hidden border border-graphite-200 bg-white ${className}`}
      style={backgroundStyle}
    >
      {!src && label ? (
        <div
          className="asset-slot absolute inset-0 flex min-h-[160px] w-full items-center justify-center p-6 text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-graphite-500">
            {label}
          </span>
        </div>
      ) : null}
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={`relative ${fitClassName} transition duration-500 ${imageClassName}`}
        />
      ) : null}
    </div>
  );
}
