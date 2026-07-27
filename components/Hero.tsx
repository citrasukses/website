import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { CTAButton } from "@/components/CTAButton";

type HeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  image?: string;
  imageLabel?: string;
  imageClassName?: string;
  highlights?: string[];
};

export function Hero({
  eyebrow,
  title,
  description,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  image,
  imageLabel,
  imageClassName = "",
  highlights = []
}: HeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-graphite-900 text-white">
      {image ? (
        <Image
          src={image}
          alt={imageLabel ?? ""}
          fill
          priority
          sizes="100vw"
          className={`absolute inset-0 -z-20 object-cover ${imageClassName}`}
        />
      ) : null}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-graphite-900 via-graphite-900/90 to-graphite-900/45" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:36px_36px] opacity-40" />
      <div className="absolute bottom-0 left-0 h-1 w-28 bg-signal-500 md:w-48" />

      <div className="container-page flex min-h-[560px] flex-col justify-end py-12 md:min-h-[600px] lg:py-16">
        <div className="max-w-4xl">
          <p className="mb-4 inline-flex border-l-2 border-signal-500 pl-3 text-xs font-bold uppercase tracking-[0.22em] text-white/75">
            {eyebrow}
          </p>
          <h1 className="max-w-4xl text-balance text-2xl font-bold leading-tight tracking-normal text-white sm:text-4xl md:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/80 md:text-lg md:leading-8">{description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <CTAButton href={primaryHref}>
              <span className="inline-flex items-center gap-2">
                {primaryLabel}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </CTAButton>
            {secondaryHref && secondaryLabel ? (
              <CTAButton href={secondaryHref} variant="ghost">{secondaryLabel}</CTAButton>
            ) : null}
          </div>
        </div>

        {highlights.length > 0 ? (
          <div className="mt-10 grid max-w-4xl border-y border-white/20 text-sm font-semibold text-white/75 sm:grid-cols-3">
            {highlights.map((highlight, index) => (
              <div
                key={highlight}
                className={`py-4 ${
                  index === 0 ? "sm:pr-5" : "border-t border-white/20 sm:border-t-0 sm:px-5"
                } ${index < highlights.length - 1 ? "sm:border-r sm:border-white/20" : ""}`}
              >
                {highlight}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
