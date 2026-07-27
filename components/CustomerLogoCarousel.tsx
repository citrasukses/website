"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Customer } from "@/data/customers";

const carouselRows = 2;
const desktopColumns = 5;
const desktopPageSize = carouselRows * desktopColumns;

type CustomerLogoCarouselProps = {
  customers: Customer[];
};

function arrangeCustomersForDesktopRows(customers: Customer[]) {
  const arrangedCustomers: Customer[] = [];

  for (let pageStart = 0; pageStart < customers.length; pageStart += desktopPageSize) {
    const page = customers.slice(pageStart, pageStart + desktopPageSize);

    for (let column = 0; column < desktopColumns; column += 1) {
      const topRowCustomer = page[column];
      const bottomRowCustomer = page[column + desktopColumns];

      if (topRowCustomer) {
        arrangedCustomers.push(topRowCustomer);
      }

      if (bottomRowCustomer) {
        arrangedCustomers.push(bottomRowCustomer);
      }
    }
  }

  return arrangedCustomers;
}

export function CustomerLogoCarousel({ customers }: CustomerLogoCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const carousel = carouselRef.current;

    if (!carousel || isPaused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const timer = window.setInterval(() => {
      const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;

      if (maxScrollLeft <= 1) {
        return;
      }

      const isAtEnd = carousel.scrollLeft >= maxScrollLeft - 2;

      carousel.scrollTo({
        left: isAtEnd ? 0 : Math.min(carousel.scrollLeft + carousel.clientWidth, maxScrollLeft),
        behavior: "smooth"
      });
    }, 3000);

    return () => window.clearInterval(timer);
  }, [customers.length, isPaused]);

  if (customers.length === 0) {
    return null;
  }

  const arrangedCustomers = arrangeCustomersForDesktopRows(customers);
  const needsPlaceholder = arrangedCustomers.length % carouselRows !== 0;

  return (
    <div
      ref={carouselRef}
      aria-label="Customer logos"
      className="overflow-x-auto overflow-y-hidden border border-graphite-200 bg-graphite-200 shadow-panel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      <div className="isolate grid min-w-full snap-x snap-mandatory auto-cols-[50%] grid-flow-col grid-rows-2 gap-px bg-graphite-200 sm:auto-cols-[33.333333%] lg:auto-cols-[20%]">
        {arrangedCustomers.map((customer) => (
          <figure
            key={customer.logo}
            className="group relative z-0 flex min-h-32 min-w-0 snap-start items-center justify-center bg-white px-4 py-6 hover:z-10 sm:min-h-36"
          >
            <div className="flex h-20 w-full max-w-48 items-center justify-center overflow-visible">
              <div
                className="flex h-full w-full items-center justify-center"
                style={customer.logoScale ? { transform: `scale(${customer.logoScale})` } : undefined}
              >
                <Image
                  src={customer.logo}
                  alt={`${customer.name} logo`}
                  width={240}
                  height={96}
                  sizes="(max-width: 640px) 42vw, (max-width: 1024px) 28vw, 180px"
                  className="h-full w-full object-contain transition-transform duration-300 ease-out will-change-transform group-hover:scale-105"
                />
              </div>
            </div>
          </figure>
        ))}

        {needsPlaceholder ? (
          <div
            aria-hidden="true"
            className="min-h-32 snap-start bg-white sm:min-h-36"
          />
        ) : null}
      </div>
    </div>
  );
}
