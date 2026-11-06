import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Handshake, PackageCheck, Wrench } from "lucide-react";
import { homeServices } from "@/data/home-services";
import { text, withLang, type Language } from "@/lib/i18n";

const serviceIcons = {
  procurement: PackageCheck,
  consultation: Wrench,
  representation: Handshake
};

export function WhyCseSection({ lang }: { lang: Language }) {
  const en = lang === "en";

  return (
    <section id="why-cse" aria-labelledby="why-cse-title" className="cse-section scroll-mt-24 bg-white">
      <div className="container-page">
        <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16">
          <div>
            <p className="cse-eyebrow text-signal-600">
              {en ? "Why CSE" : "Mengapa CSE"}
            </p>
            <h2 id="why-cse-title" className="cse-heading mt-4 text-graphite-900">
              <span className="block">{en ? "Reliable supply." : "Pengadaan andal."}</span>
              <span className="block">{en ? "Practical expertise." : "Dukungan teknis nyata."}</span>
            </h2>
          </div>
          <p className="max-w-lg text-base leading-7 text-graphite-500 lg:pb-1">
            {en
              ? "From finding a brand to selecting the right tool, we connect purchasing needs with engineering insight. One partner who understands both."
              : "Dari pencarian brand hingga pemilihan alat, kami menghubungkan kebutuhan purchasing dengan ketepatan engineering. Satu partner yang memahami keduanya."}
          </p>
        </div>

        <div className="mt-8 grid gap-7 lg:mt-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
          <figure className="flex min-w-0 flex-col overflow-hidden rounded-brand bg-graphite-900">
            <div className="relative aspect-[16/10] min-h-0 flex-1 lg:aspect-auto lg:min-h-[300px]">
              <Image
                src="/assets/company/background-items/nac-socket-set.jpg"
                alt={en
                  ? "NAC sockets, couplings, and screwdriver bits arranged on a dark surface."
                  : "Socket, coupling, dan mata obeng NAC tersusun di atas permukaan gelap."}
                fill
                sizes="(max-width: 1023px) calc(100vw - 32px), 510px"
                loading="lazy"
                className="object-cover object-center"
              />
              <span aria-hidden="true" className="absolute bottom-0 left-6 h-1 w-12 bg-signal-500 sm:left-7" />
            </div>
            <figcaption className="px-6 py-6 sm:px-7">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/65">Purchasing + Engineering</p>
              <p className="mt-2 text-xl font-semibold tracking-[-0.02em] text-white sm:text-2xl">
                {en ? "More than a supply partner." : "Lebih dari sekadar supply."}
              </p>
              <p className="mt-2 max-w-sm text-sm leading-6 text-white/75">
                {en
                  ? "The right product starts with understanding how you work."
                  : "Produk yang tepat dimulai dari memahami cara Anda bekerja."}
              </p>
            </figcaption>
          </figure>

          <ul className="grid min-w-0 divide-y divide-graphite-200 border-y border-graphite-200">
            {homeServices.map((service, index) => {
              const Icon = serviceIcons[service.id];

              return (
                <li key={service.id} className="min-w-0">
                  <Link
                    href={withLang(service.href, lang)}
                    className="focus-ring group grid h-full grid-cols-[2.5rem_minmax(0,1fr)] items-start gap-x-4 py-6 transition-colors hover:bg-paper-50 focus-visible:bg-paper-50 sm:grid-cols-[3rem_minmax(0,1fr)_2rem] sm:gap-x-5 sm:py-7"
                  >
                    <span aria-hidden="true" className="flex flex-col items-center gap-3 pt-0.5">
                      <span className="cse-icon">
                        <Icon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.6} />
                      </span>
                      <span className="font-mono text-[10px] tracking-[0.08em] text-graphite-500">0{index + 1}</span>
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-lg font-bold tracking-[-0.02em] text-graphite-900 sm:text-xl">{text(service.title, lang)}</h3>
                      <p className="mt-2 max-w-md text-sm leading-6 text-graphite-500">{text(service.description, lang)}</p>
                      <span className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-industrial-700 group-hover:underline group-focus-visible:underline">
                        {text(service.action, lang)}
                        <ArrowRight className="h-3.5 w-3.5 sm:hidden" aria-hidden="true" />
                      </span>
                    </div>
                    <span aria-hidden="true" className="cse-control mt-1 hidden border-graphite-200 text-industrial-700 group-hover:border-industrial-700 group-hover:bg-industrial-700 group-hover:text-white group-focus-visible:border-industrial-700 group-focus-visible:bg-industrial-700 group-focus-visible:text-white sm:flex">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
