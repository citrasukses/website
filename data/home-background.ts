export type HomeBackgroundItem = {
  id: string;
  label: string;
  src: string;
  slotClassName: string;
  imageClassName: string;
  enabled?: boolean;
};

export type HomeBackgroundImage = {
  src: string;
  position?: string;
  overlayClassName?: string;
};

// Set this to an image configuration to replace the product collage with one
// full-bleed hero image. Keep it null to use homeBackgroundItems below.
// Example:
// {
//   src: "/assets/company/hero-background.jpg",
//   position: "center",
//   overlayClassName: "bg-gradient-to-r from-white/95 via-white/80 to-white/40"
// }

export const homeBackgroundImage: HomeBackgroundImage | null = {
  src: "assets/company/hero-background.png",
  position: "center",
  overlayClassName: "bg-gradient-to-r from-white/95 via-white/80 to-white/40"
};

// export const homeBackgroundImage: HomeBackgroundImage | null = null;

// Add or tune homepage background products here.
// - src: image path under /public.
// - slotClassName: responsive grid cell, rotation, opacity, and visibility.
// - imageClassName: background-size, rotation, and visual treatment such as grayscale.
// - enabled: set false to hide an item without deleting its configuration.
// The renderer places items in a 6-column mobile grid and 12-column desktop grid.
// Prefer moving items between grid cells instead of using absolute top/right/left classes.
export const homeBackgroundItems: HomeBackgroundItem[] = [
  {
    id: "tohnichi-digital-torque-wrench",
    label: "Tohnichi digital torque wrench",
    src: "/assets/company/background-items/tohnichi-digital-torque-wrench.png",
    slotClassName:
      "col-start-3 col-span-4 row-start-2 row-span-2 opacity-[0.10] md:col-start-6 md:col-span-7 md:row-start-1 md:row-span-2 lg:col-start-6 lg:col-span-7",
    imageClassName: "rotate-[-5deg] bg-contain"
  },
  {
    id: "tohnichi-click-torque-wrench",
    label: "Tohnichi click torque wrench",
    src: "/assets/company/background-items/tohnichi-click-torque-wrench.jpg",
    slotClassName:
      "hidden opacity-[0.08] md:col-start-2 md:col-span-5 md:row-start-4 md:row-span-1 md:block lg:col-start-3 lg:col-span-4",
    imageClassName: "rotate-[7deg] bg-contain grayscale"
  },
  {
    id: "nac-socket-set",
    label: "NAC socket set",
    src: "/assets/company/background-items/nac-socket-set.jpg",
    slotClassName:
      "col-start-5 col-span-2 row-start-4 row-span-2 opacity-[0.08] md:col-start-7 md:col-span-2 md:row-start-3 md:row-span-2 lg:col-start-7",
    imageClassName: "rotate-[9deg] bg-cover grayscale"
  },
  {
    id: "nac-screwdriver-bit-attachments",
    label: "NAC screwdriver bit attachments",
    src: "/assets/company/background-items/nac-screwdriver-bit-attachments.jpg",
    slotClassName:
      "hidden opacity-[0.09] md:col-start-10 md:col-span-2 md:row-start-3 md:row-span-2 md:block lg:col-start-10",
    imageClassName: "rotate-[-10deg] bg-contain grayscale"
  },
  {
    id: "tohnichi-dial-torque-gauge",
    label: "Tohnichi dial torque gauge",
    src: "/assets/company/background-items/tohnichi-dial-torque-gauge.jpg",
    slotClassName:
      "hidden opacity-[0.08] md:col-start-9 md:col-span-2 md:row-start-5 md:row-span-2 md:block lg:col-start-9",
    imageClassName: "rotate-[6deg] bg-contain grayscale"
  },
  {
    id: "fuji-star-wire-brushes",
    label: "Fuji-Star wire brushes",
    src: "/assets/company/background-items/fuji-star-wire-brushes.jpg",
    slotClassName:
      "hidden opacity-[0.08] lg:col-start-11 lg:col-span-2 lg:row-start-5 lg:row-span-2 lg:block",
    imageClassName: "rotate-[-8deg] bg-contain grayscale"
  },
  {
    id: "fuji-star-abrasive-application",
    label: "Fuji-Star abrasive application",
    src: "/assets/company/background-items/fuji-star-abrasive-application.jpg",
    slotClassName:
      "hidden opacity-[0.08] lg:col-start-5 lg:col-span-4 lg:row-start-5 lg:row-span-2 lg:block",
    imageClassName: "rotate-[-3deg] bg-cover grayscale"
  }
];
