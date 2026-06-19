import Image from "next/image";

type AssetSlotProps = {
  src: string;
  alt: string;
  label?: string;
  className?: string;
  imageClassName?: string;
  sizes?: string;
};

export function AssetSlot({
  src,
  alt,
  label,
  className = "",
  imageClassName = "",
  sizes = "(max-width: 768px) 100vw, 50vw"
}: AssetSlotProps) {
  return (
    <div className={`relative overflow-hidden border border-graphite-200 bg-white ${className}`}>
      {label ? (
        <div className="asset-slot absolute inset-0 flex min-h-[160px] w-full items-center justify-center p-6 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-graphite-500">
            {label}
          </span>
        </div>
      ) : null}
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className={`relative object-cover transition duration-500 ${imageClassName}`}
      />
    </div>
  );
}
