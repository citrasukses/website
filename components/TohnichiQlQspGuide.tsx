import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { AssetSlot } from "@/components/AssetSlot";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CTAButton } from "@/components/CTAButton";
import { getBuyerGuide } from "@/data/buyer-guides";
import { text, type Language, withLang } from "@/lib/i18n";
import { buildBreadcrumbJsonLd, organizationReference } from "@/lib/seo";
import { absoluteLocalizedUrl } from "@/lib/seo-config";

const path = "/guides/tohnichi-ql-vs-qsp";

const tools = [
  {
    model: "QL",
    type: { id: "Adjustable", en: "Adjustable" },
    image: "/assets/brands/products/tohnichi/catalog/torque-wrenches/ql-qle2.jpg",
    imageAlt: { id: "Torque wrench TOHNICHI QL dengan skala penyetelan", en: "TOHNICHI QL torque wrench with an adjustment scale" },
    sentence: {
      id: "Putar gagang, baca skalanya, lalu kencangkan sampai terdengar klik.",
      en: "Turn the handle, read the scale, then tighten until it clicks."
    },
    note: { id: "Untuk target yang berganti", en: "For changing targets" },
    href: "/brands/tohnichi/products/ql-qle2"
  },
  {
    model: "QSP",
    type: { id: "Preset", en: "Preset" },
    image: "/assets/brands/products/tohnichi/catalog/torque-wrenches/qsp-qsp-mh.jpg",
    imageAlt: { id: "Torque wrench preset TOHNICHI QSP", en: "TOHNICHI QSP preset torque wrench" },
    sentence: {
      id: "Nilai torsi disetel dengan alat khusus dan tester; operator tinggal mengencangkan sampai klik.",
      en: "The torque is set with a special tool and tester; the operator tightens until it clicks."
    },
    note: { id: "Untuk satu target berulang", en: "For one repeated target" },
    href: "/brands/tohnichi/products/qsp-qsp-mh"
  }
] as const;

const comparison = [
  {
    label: { id: "Mengubah torsi", en: "Changing torque" },
    ql: { id: "Langsung lewat skala di gagang", en: "At the handle scale" },
    qsp: { id: "Perlu alat penyetel dan tester", en: "Needs a setting tool and tester" }
  },
  {
    label: { id: "Pekerjaan yang pas", en: "Best fit" },
    ql: { id: "Beberapa nilai torsi; maintenance atau pekerjaan campuran", en: "Several torque values; maintenance or mixed work" },
    qsp: { id: "Satu nilai yang diulang di station produksi", en: "One value repeated at a production station" }
  },
  {
    label: { id: "Risiko yang perlu dijaga", en: "What to control" },
    ql: { id: "Pastikan skala disetel ke nilai yang benar setiap kali berubah", en: "Check the scale whenever the target changes" },
    qsp: { id: "Pastikan wrench yang diambil sesuai dengan target station", en: "Make sure the wrench matches the station target" }
  }
] as const;

export function TohnichiQlQspGuide({ lang }: { lang: Language }) {
  const guide = getBuyerGuide("tohnichi-ql-vs-qsp");
  if (!guide) return null;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: text(guide.title, lang),
      description: text(guide.description, lang),
      inLanguage: lang === "en" ? "en-US" : "id-ID",
      mainEntityOfPage: absoluteLocalizedUrl(path, lang),
      author: organizationReference(),
      publisher: organizationReference()
    },
    buildBreadcrumbJsonLd({
      lang,
      items: [
        { name: lang === "en" ? "Guides" : "Panduan", path: "/guides" },
        { name: text(guide.title, lang), path }
      ]
    })
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumb
        homeHref={withLang("/", lang)}
        items={[
          { href: withLang("/guides", lang), label: lang === "en" ? "Guides" : "Panduan" },
          { label: text(guide.title, lang) }
        ]}
      />

      <main>
        <header className="border-y border-graphite-200 bg-paper-100">
          <div className="container-page grid gap-9 py-12 md:py-16 lg:grid-cols-[minmax(0,1.3fr)_minmax(290px,0.7fr)] lg:items-end">
            <div>
              <p className="cse-eyebrow font-black text-signal-600">
                {lang === "en" ? "TOHNICHI / buyer’s guide" : "TOHNICHI / panduan pembeli"}
              </p>
              <h1 className="cse-title mt-4 max-w-3xl text-graphite-900">
                {text(guide.title, lang)}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-graphite-600">
                {lang === "en"
                  ? "They look similar and both click at the set torque. The difference is who changes that setting—and how."
                  : "Sekilas mirip, dan keduanya berbunyi klik saat nilai torsi tercapai. Bedanya ada pada cara mengubah setelannya."}
              </p>
            </div>
            <div className="border-l-4 border-signal-500 bg-white px-6 py-6 shadow-sm">
              <p className="cse-eyebrow font-black text-signal-600">
                {lang === "en" ? "The short answer" : "Jawaban singkat"}
              </p>
              <p className="mt-3 text-xl font-bold leading-8 text-graphite-900">
                {text(guide.answer, lang)}
              </p>
            </div>
          </div>
        </header>

        <article>
          <section className="cse-section bg-white" aria-labelledby="models-title">
            <div className="container-page">
              <div className="max-w-2xl">
                <p className="cse-eyebrow font-black text-signal-600">
                  {lang === "en" ? "Side by side" : "Berdampingan"}
                </p>
                <h2 id="models-title" className="cse-heading mt-4 font-black text-graphite-900">
                  {lang === "en" ? "The difference in your hands" : "Bedanya saat dipakai"}
                </h2>
              </div>
              <div className="mt-8 grid gap-5 md:grid-cols-2">
                {tools.map((tool) => (
                  <div key={tool.model} className="flex flex-col overflow-hidden border border-graphite-200 bg-white">
                    <div className="relative border-b border-graphite-200 bg-[#f7f7f5]">
                      <div className="absolute left-5 top-5 z-10 bg-graphite-900 px-3 py-1.5 text-xs font-black uppercase tracking-[0.15em] text-white">
                        {text(tool.type, lang)}
                      </div>
                      <AssetSlot
                        src={tool.image}
                        alt={text(tool.imageAlt, lang)}
                        className="aspect-[4/3] border-0"
                        imageClassName="p-10 sm:p-12"
                        fit="contain"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-6 sm:p-8">
                      <div className="flex items-baseline justify-between gap-4">
                        <h3 className="text-4xl font-black tracking-tight text-graphite-900">{tool.model}</h3>
                        <span className="text-xs font-bold uppercase tracking-[0.1em] text-industrial-700">{text(tool.note, lang)}</span>
                      </div>
                      <p className="mt-4 flex-1 text-base leading-7 text-graphite-600">{text(tool.sentence, lang)}</p>
                      <Link href={withLang(tool.href, lang)} className="focus-ring mt-7 inline-flex items-center gap-2 self-start border-b border-industrial-700 pb-1 text-sm font-bold text-industrial-700 hover:text-industrial-900">
                        {lang === "en" ? `View ${tool.model} models` : `Lihat model ${tool.model}`}
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="cse-section border-y border-graphite-200 bg-graphite-50" aria-labelledby="comparison-title">
            <div className="container-page max-w-5xl">
              <p className="cse-eyebrow font-black text-signal-600">
                {lang === "en" ? "At a glance" : "Sekilas"}
              </p>
              <h2 id="comparison-title" className="cse-heading mt-4 font-black text-graphite-900">
                {lang === "en" ? "What changes in practice" : "Apa yang berubah dalam praktik"}
              </h2>
              <div className="mt-8 overflow-x-auto border-t-2 border-graphite-900">
                <table className="w-full min-w-[650px] border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-graphite-200 text-graphite-900">
                      <th scope="col" className="w-[27%] py-4 pr-5 font-black">{lang === "en" ? "Question" : "Pertanyaan"}</th>
                      <th scope="col" className="w-[36%] px-5 py-4 font-black">QL</th>
                      <th scope="col" className="w-[37%] py-4 pl-5 font-black">QSP</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparison.map((row) => (
                      <tr key={row.label.en} className="border-b border-graphite-200 align-top">
                        <th scope="row" className="py-5 pr-5 font-bold text-graphite-900">{text(row.label, lang)}</th>
                        <td className="px-5 py-5 leading-6 text-graphite-600">{text(row.ql, lang)}</td>
                        <td className="py-5 pl-5 leading-6 text-graphite-600">{text(row.qsp, lang)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-5 max-w-3xl text-sm leading-6 text-graphite-600">
                {lang === "en"
                  ? "Both are click type ratchet wrenches for tightening. The click signals that the set torque has been reached; neither wrench displays the torque actually applied to the joint."
                  : "Keduanya tipe klik dengan kepala ratchet untuk pengencangan. Bunyi klik menandakan setelan torsi tercapai; keduanya tidak menampilkan nilai torsi aktual pada sambungan."}
              </p>
            </div>
          </section>

          <section className="cse-section bg-white" aria-labelledby="choice-title">
            <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
              <div>
                <p className="cse-eyebrow font-black text-signal-600">
                  {lang === "en" ? "A simple example" : "Contoh sederhana"}
                </p>
                <h2 id="choice-title" className="cse-heading mt-4 font-black text-graphite-900">
                  {lang === "en" ? "Suppose the job calls for 50 N·m." : "Misalnya targetnya 50 N·m."}
                </h2>
                <p className="mt-5 text-base leading-7 text-graphite-600">
                  {lang === "en"
                    ? "With a QL, the user sets 50 N·m on its scale. With a QSP, the wrench is set to 50 N·m using the appropriate setting tool and tester before it goes to the station."
                    : "Pada QL, pengguna mengatur 50 N·m lewat skalanya. Pada QSP, wrench disetel ke 50 N·m memakai alat penyetel dan tester sebelum dibawa ke station."}
                </p>
              </div>
              <div className="border-l-4 border-industrial-700 bg-paper-100 p-6 sm:p-9">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-industrial-700">
                  {lang === "en" ? "Before ordering" : "Sebelum memesan"}
                </p>
                <p className="mt-4 text-lg font-semibold leading-8 text-graphite-900">
                  {lang === "en"
                    ? "Check the target against the exact model’s range and square drive. For QSP, tell the supplier the operating torque you need; Tohnichi specifically asks for it when ordering."
                    : "Cocokkan target dengan range dan ukuran square drive model yang dipilih. Untuk QSP, sebutkan nilai torsi kerja saat memesan; Tohnichi memang memintanya."}
                </p>
                <p className="mt-5 border-t border-graphite-200 pt-5 text-sm leading-6 text-graphite-600">
                  {lang === "en"
                    ? "A QSP can be reset later. It simply takes a setting tool and tester, so changing values is a controlled task rather than a turn of the handle."
                    : "QSP tetap bisa disetel ulang. Hanya saja, prosesnya perlu alat penyetel dan tester, bukan cukup memutar gagang."}
                </p>
              </div>
            </div>
          </section>

          <section className="border-t border-graphite-200 bg-white pb-16">
            <div className="container-page max-w-5xl border-t border-graphite-200 pt-6 text-xs leading-6 text-graphite-500">
              <span className="font-bold text-graphite-700">{lang === "en" ? "Product references:" : "Referensi produk:"}</span>{" "}
              <a href="https://en.global-tohnichi.com/products/detail/24" target="_blank" rel="noopener noreferrer" className="focus-ring inline-flex items-center gap-1 underline underline-offset-2 hover:text-industrial-700">Tohnichi QL/QLE2 <ArrowUpRight className="h-3 w-3" aria-hidden="true" /></a>
              <span aria-hidden="true"> · </span>
              <a href="https://en.global-tohnichi.com/products/detail/37" target="_blank" rel="noopener noreferrer" className="focus-ring inline-flex items-center gap-1 underline underline-offset-2 hover:text-industrial-700">Tohnichi QSP/QSP-MH <ArrowUpRight className="h-3 w-3" aria-hidden="true" /></a>
            </div>
          </section>
        </article>

        <section className="cse-section bg-industrial-700 text-white">
          <div className="container-page flex max-w-5xl flex-col gap-7 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="cse-heading font-black">{lang === "en" ? "Need the right QL or QSP model?" : "Perlu memilih model QL atau QSP?"}</h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/75">
                {lang === "en"
                  ? "Send the torque target, square-drive size, and whether the value changes between jobs. CSE can help narrow the model."
                  : "Kirim target torsi, ukuran square drive, dan apakah nilainya berubah antarpekerjaan. CSE bisa membantu mempersempit pilihan model."}
              </p>
            </div>
            <CTAButton href={withLang("/contact?topic=ql-vs-qsp", lang)}>{lang === "en" ? "Ask CSE" : "Tanya CSE"}</CTAButton>
          </div>
        </section>
      </main>
    </>
  );
}
