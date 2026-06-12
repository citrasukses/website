"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
  const viewportRef = useRef<HTMLDivElement>(null);
  const arrangedCustomers = useMemo(() => arrangeCustomersForDesktopRows(customers), [customers]);
  const [carouselState, setCarouselState] = useState({
    activePage: 0,
    canGoNext: false,
    canGoPrevious: false,
    pageCount: 1
  });

  const updateCarouselState = useCallback(() => {
    const viewport = viewportRef.current;

    if (!viewport) {
      return;
    }

    const maxScrollLeft = Math.max(viewport.scrollWidth - viewport.clientWidth, 0);
    const pageCount = maxScrollLeft > 0 ? Math.ceil(maxScrollLeft / viewport.clientWidth) + 1 : 1;
    const activePage = maxScrollLeft - viewport.scrollLeft <= 2
      ? pageCount - 1
      : Math.min(Math.floor(viewport.scrollLeft / viewport.clientWidth), pageCount - 1);

    setCarouselState({
      activePage,
      canGoNext: viewport.scrollLeft < maxScrollLeft - 2,
      canGoPrevious: viewport.scrollLeft > 2,
      pageCount
    });
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;

    if (!viewport) {
      return;
    }

    updateCarouselState();
    viewport.addEventListener("scroll", updateCarouselState, { passive: true });
    window.addEventListener("resize", updateCarouselState);

    return () => {
      viewport.removeEventListener("scroll", updateCarouselState);
      window.removeEventListener("resize", updateCarouselState);
    };
  }, [customers.length, updateCarouselState]);

  const scrollCustomerLogos = useCallback((direction: -1 | 1) => {
    const viewport = viewportRef.current;

    if (!viewport) {
      return;
    }

    viewport.scrollBy({
      behavior: "smooth",
      left: direction * viewport.clientWidth
    });
  }, []);

  if (customers.length === 0) {
    return null;
  }

  const needsPlaceholder = arrangedCustomers.length % carouselRows !== 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-end gap-3">
        <p aria-live="polite" className="text-xs font-bold uppercase tracking-[0.16em] text-graphite-500">
          {carouselState.activePage + 1} / {carouselState.pageCount}
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Previous customers"
            onClick={() => scrollCustomerLogos(-1)}
            disabled={!carouselState.canGoPrevious}
            className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-sm border border-graphite-300 bg-white text-graphite-900 transition hover:border-industrial-600 hover:text-industrial-700 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-graphite-300 disabled:hover:text-graphite-900"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Next customers"
            onClick={() => scrollCustomerLogos(1)}
            disabled={!carouselState.canGoNext}
            className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-sm border border-graphite-300 bg-white text-graphite-900 transition hover:border-industrial-600 hover:text-industrial-700 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-graphite-300 disabled:hover:text-graphite-900"
          >
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div
        ref={viewportRef}
        className="overflow-x-auto overflow-y-hidden border border-graphite-200 bg-graphite-200 shadow-panel [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <div className="grid min-w-full auto-cols-[50%] grid-flow-col grid-rows-2 gap-px bg-graphite-200 sm:auto-cols-[33.333333%] lg:auto-cols-[20%]">
          {arrangedCustomers.map((customer) => (
            <figure
              key={customer.logo}
              className="group flex min-h-32 min-w-0 items-center justify-center bg-white px-4 py-6 transition hover:bg-graphite-50 sm:min-h-36"
            >
              <div className="flex h-20 w-full max-w-48 items-center justify-center overflow-hidden">
                <Image
                  src={customer.logo}
                  alt={`${customer.name} logo`}
                  width={240}
                  height={96}
                  sizes="(max-width: 640px) 42vw, (max-width: 1024px) 28vw, 180px"
                  className="h-full w-full object-contain grayscale transition duration-300 group-hover:grayscale-0"
                  style={customer.logoScale ? { transform: `scale(${customer.logoScale})` } : undefined}
                />
              </div>
            </figure>
          ))}

          {needsPlaceholder ? (
            <div
              aria-hidden="true"
              className="min-h-32 bg-white sm:min-h-36"
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
