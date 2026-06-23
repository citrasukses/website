import type { HomeBackgroundImage, HomeBackgroundItem } from "@/data/home-background";

type HomeBackgroundItemsProps = {
  items: HomeBackgroundItem[];
  singleImage?: HomeBackgroundImage | null;
};

export function HomeBackgroundItems({ items, singleImage }: HomeBackgroundItemsProps) {
  if (singleImage) {
    return (
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url("${singleImage.src}")`,
            backgroundPosition: singleImage.position
          }}
        />
        <div
          className={`absolute inset-0 ${
            singleImage.overlayClassName ?? "bg-gradient-to-r from-white/95 via-white/80 to-white/40"
          }`}
        />
      </div>
    );
  }

  const visibleItems = items.filter((item) => item.enabled !== false);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-white/30" />
      <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 gap-3 px-4 py-8 md:grid-cols-12 md:gap-6 lg:gap-8">
        {visibleItems.map((item) => (
          <div key={item.id} className={`relative min-h-0 min-w-0 overflow-hidden ${item.slotClassName}`}>
            <div
              className={`absolute inset-0 bg-center bg-no-repeat ${item.imageClassName}`}
              style={{ backgroundImage: `url("${item.src}")` }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
