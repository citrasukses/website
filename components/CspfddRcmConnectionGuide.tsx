import Link from "next/link";
import {
  AlertTriangle,
  ArrowDown,
  CheckCircle2,
  FileText,
  Gauge,
  Radio,
  Settings2,
  ShieldCheck,
  Wrench,
  XCircle
} from "lucide-react";
import { AssetSlot } from "@/components/AssetSlot";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CTAButton } from "@/components/CTAButton";
import { text, type Language, type LocalizedText, withLang } from "@/lib/i18n";

const copy = {
  eyebrow: { id: "Panduan setup lapangan", en: "Field setup guide" },
  title: {
    id: "Menghubungkan CSPFDD ke R-CM + M-FD",
    en: "Connect CSPFDD to R-CM + M-FD"
  },
  intro: {
    id: "Gunakan halaman ini untuk setup satu atau dua CSPFDD per receiver, mengatur beberapa receiver di area yang sama, dan menetapkan batas HIGH/LOW tanpa membuat receiver saling menerima signal yang salah.",
    en: "Use this page to set up one or two CSPFDD wrenches per receiver, configure several receivers in the same area, and set HIGH/LOW limits without receivers picking up the wrong tools."
  },
  scope: {
    id: "Khusus CSPFDD dengan receiver R-CM yang memakai radio module M-FD. Jangan gunakan module M-FH untuk setup ini.",
    en: "For CSPFDD with an R-CM receiver fitted with the M-FD radio module. Do not use an M-FH module for this setup."
  },
  start: { id: "Mulai setup", en: "Start setup" },
  fix: { id: "Buka troubleshooting", en: "Open troubleshooting" }
} satisfies Record<string, LocalizedText>;

const faqItems = [
  {
    question: {
      id: "Berapa CSPFDD yang dapat dikelola oleh satu R-CM?",
      en: "How many CSPFDD wrenches can one R-CM manage?"
    },
    answer: {
      id: "Maksimum dua dengan judgment yang terpisah, karena R-CM + M-FD hanya menyediakan ID1/ID2 dan dua set batas HIGH/LOW. Manual juga menyebut mode JGC 0 dapat menerima signal dari beberapa wrench pada Group CH yang sama, tetapi tidak memberi jumlah maksimum dan tetap melarang transmisi bersamaan. Untuk setup yang terkendali, batasi dua wrench per receiver.",
      en: "Two with independent judgment, because R-CM + M-FD provides only ID1/ID2 and two HIGH/LOW limit sets. The manual also says JGC 0 can receive signals from multiple wrenches on the same Group CH, but gives no numeric maximum and still prohibits simultaneous transmission. For a controlled setup, limit each receiver to two wrenches."
    }
  },
  {
    question: {
      id: "Apakah dua CSPFDD boleh dipakai bersamaan?",
      en: "Can two CSPFDD wrenches transmit at the same time?"
    },
    answer: {
      id: "Tidak. Gunakan satu wrench pada satu waktu. Transmisi yang tumpang tindih tidak didukung.",
      en: "No. Use one wrench at a time. Overlapping transmissions are not supported."
    }
  },
  {
    question: {
      id: "Apa perbedaan Group CH dan ID?",
      en: "What is the difference between Group CH and ID?"
    },
    answer: {
      id: "Group CH menentukan radio network yang diterima R-CM. ID membedakan wrench di dalam network tersebut dan menghubungkannya ke profile ID1 atau ID2. Group harus sama di dalam satu pasangan dan berbeda antar receiver yang berdekatan.",
      en: "Group CH selects the radio network heard by the R-CM. ID distinguishes wrenches inside that network and maps them to the ID1 or ID2 judgment profile. The group must match within a set and differ between adjacent receivers."
    }
  },
  {
    question: {
      id: "Mengapa CSPFDD tidak mengirim data walaupun Group dan ID sudah benar?",
      en: "Why does the CSPFDD not transmit even when Group and ID are correct?"
    },
    answer: {
      id: "Jika double-tightening judgment aktif dan sudut tidak mencapai nilai judgment, CSPFDD tidak mengirim signal normal. Untuk test koneksi, matikan fungsi ini dengan membuat trigger torque atau judgment angle menjadi 0, atau tekan TEST untuk mengirim nilai yang tampil.",
      en: "If double-tightening judgment is active and the angle does not reach its judgment value, CSPFDD does not send the normal signal. For a connection test, disable this function by setting either trigger torque or judgment angle to 0, or press TEST to transmit the displayed value."
    }
  }
] satisfies Array<{ question: LocalizedText; answer: LocalizedText }>;

function ManualRef({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 border border-graphite-200 bg-white px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-graphite-500">
      <FileText className="h-3.5 w-3.5" aria-hidden="true" />
      {children}
    </span>
  );
}

function StepNumber({ children }: { children: string }) {
  return (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-signal-500 text-sm font-black text-white">
      {children}
    </span>
  );
}

function SettingRow({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <div className="grid gap-2 border-t border-graphite-200 py-4 first:border-t-0 sm:grid-cols-[0.72fr_1.28fr] sm:items-start">
      <dt className="font-mono text-sm font-black text-industrial-700">{label}</dt>
      <dd className="text-sm leading-6 text-graphite-700">
        <strong className="font-bold text-graphite-900">{value}</strong>
        {note ? <span className="mt-1 block text-graphite-500">{note}</span> : null}
      </dd>
    </div>
  );
}

export function CspfddRcmConnectionGuide({ lang }: { lang: Language }) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: text(copy.title, lang),
      description: text(copy.intro, lang),
      image: "/assets/brands/products/tohnichi/tohnichi_cspfdd100n3.jpg",
      inLanguage: lang === "en" ? "en-US" : "id-ID",
      totalTime: "PT30M",
      step: [
        text({ id: "Rencanakan Group CH dan ID", en: "Plan Group CH and IDs" }, lang),
        text({ id: "Set Group, ID, dan JGC pada CSPFDD", en: "Set Group, ID, and JGC on the CSPFDD" }, lang),
        text({ id: "Set MODEL dan Group pada R-CM", en: "Set MODEL and Group on the R-CM" }, lang),
        text({ id: "Masukkan ID1/ID2 serta HIGH/LOW", en: "Enter ID1/ID2 and HIGH/LOW limits" }, lang),
        text({ id: "Test setiap wrench satu per satu", en: "Test each wrench one at a time" }, lang)
      ].map((name, index) => ({ "@type": "HowToStep", position: index + 1, name }))
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: text(item.question, lang),
        acceptedAnswer: { "@type": "Answer", text: text(item.answer, lang) }
      }))
    }
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumb
        homeHref={withLang("/", lang)}
        items={[
          { href: withLang("/brands/tohnichi", lang), label: "TOHNICHI" },
          { label: text(copy.title, lang) }
        ]}
      />

      <main>
        <section className="overflow-hidden border-y border-graphite-200 bg-graphite-950 text-white">
          <div className="container-page grid gap-10 py-12 lg:grid-cols-[1.12fr_0.88fr] lg:items-center lg:py-16">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-signal-400">{text(copy.eyebrow, lang)}</p>
              <h1 className="mt-4 max-w-4xl text-4xl font-black leading-[1.05] tracking-tight md:text-6xl">
                {text(copy.title, lang)}
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-8 text-white/75 md:text-lg">{text(copy.intro, lang)}</p>
              <div className="mt-6 flex gap-3 border-l-4 border-signal-500 bg-white/5 p-4 text-sm font-semibold leading-6 text-white/90">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-signal-400" aria-hidden="true" />
                <p>{text(copy.scope, lang)}</p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="#setup" className="focus-ring inline-flex min-h-11 items-center bg-signal-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-signal-600">
                  {text(copy.start, lang)}
                </Link>
                <Link href="#troubleshooting" className="focus-ring inline-flex min-h-11 items-center border border-white/30 px-5 py-3 text-sm font-bold text-white transition hover:border-white hover:bg-white/10">
                  {text(copy.fix, lang)}
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-[1fr_auto_0.72fr] items-center gap-3" aria-label={lang === "en" ? "CSPFDD wireless connection to R-CM with M-FD" : "Koneksi wireless CSPFDD ke R-CM dengan M-FD"}>
              <div>
                <AssetSlot
                  src="/assets/brands/products/tohnichi/tohnichi_cspfdd100n3.jpg"
                  alt="TOHNICHI CSPFDD torque wrench"
                  className="aspect-[4/5] border-white/15"
                  imageClassName="p-4"
                  fit="contain"
                  priority
                  sizes="(max-width: 1024px) 44vw, 24vw"
                />
                <p className="mt-3 text-center text-xs font-black uppercase tracking-[0.12em] text-white/70">CSPFDD</p>
              </div>
              <div className="flex flex-col items-center gap-2 text-center">
                <Radio className="h-7 w-7 text-signal-400" aria-hidden="true" />
                <span className="text-[10px] font-black uppercase tracking-[0.14em] text-white/60">2.4 GHz</span>
              </div>
              <div>
                <AssetSlot
                  src="/assets/brands/products/tohnichi/catalog/optional-equipment/r-cm.png"
                  alt="TOHNICHI R-CM receiver"
                  className="aspect-[4/5] border-white/15"
                  imageClassName="p-4"
                  fit="contain"
                  priority
                  sizes="(max-width: 1024px) 32vw, 18vw"
                />
                <p className="mt-3 text-center text-xs font-black uppercase tracking-[0.12em] text-white/70">R-CM + M-FD</p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-graphite-200 bg-white">
          <div className="container-page grid divide-y divide-graphite-200 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
            {[
              { value: "2", label: lang === "en" ? "managed CSPFDD max. per R-CM" : "maks. CSPFDD terkelola per R-CM" },
              { value: "1", label: lang === "en" ? "transmission at a time" : "transmisi pada satu waktu" },
              { value: "000-255", label: lang === "en" ? "available Group CH" : "pilihan Group CH" },
              { value: "10-20 m", label: lang === "en" ? "typical range, environment dependent" : "jarak tipikal, tergantung lingkungan" }
            ].map((item) => (
              <div key={item.value} className="px-5 py-6 text-center">
                <p className="text-2xl font-black text-industrial-700">{item.value}</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-graphite-500">{item.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-graphite-50 py-14">
          <div className="container-page">
            <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-signal-600">{lang === "en" ? "The rule that prevents cross-talk" : "Aturan agar signal tidak tertukar"}</p>
                <h2 className="mt-3 text-3xl font-black text-graphite-950">{lang === "en" ? "Same receiver, same group. Adjacent receiver, different group." : "Receiver yang sama, Group sama. Receiver berdekatan, Group berbeda."}</h2>
                <p className="mt-4 text-base leading-7 text-graphite-600">
                  {lang === "en"
                    ? "Each wrench must use the Group CH of its assigned R-CM. Give every adjacent R-CM its own Group CH, then use unique 3-digit IDs for the two wrench profiles inside that group."
                    : "Setiap wrench harus memakai Group CH milik R-CM yang dituju. Berikan Group CH tersendiri pada setiap R-CM yang berdekatan, lalu gunakan ID 3 digit yang berbeda untuk dua profile wrench di dalam group tersebut."}
                </p>
                <div className="mt-5"><ManualRef>{lang === "en" ? "Manual: Specifications note 5" : "Manual: Specification catatan 5"}</ManualRef></div>
              </div>

              <div className="overflow-x-auto border border-graphite-200 bg-white">
                <table className="min-w-[680px] w-full border-collapse text-left text-sm">
                  <thead className="bg-graphite-950 text-white">
                    <tr>
                      {[lang === "en" ? "Receiver" : "Receiver", "Group CH", "ID1", "ID2", lang === "en" ? "Use" : "Penggunaan"].map((header) => (
                        <th key={header} scope="col" className="border-r border-white/15 px-4 py-3 font-bold last:border-r-0">{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-graphite-200">
                      <th scope="row" className="px-4 py-4 font-black text-graphite-950">R-CM A</th>
                      <td className="px-4 py-4 font-mono font-black text-industrial-700">010</td>
                      <td className="px-4 py-4 font-mono">101</td>
                      <td className="px-4 py-4 font-mono">102</td>
                      <td className="px-4 py-4 text-graphite-600">{lang === "en" ? "Station A tools" : "Tool station A"}</td>
                    </tr>
                    <tr className="border-t border-graphite-200 bg-graphite-50">
                      <th scope="row" className="px-4 py-4 font-black text-graphite-950">R-CM B</th>
                      <td className="px-4 py-4 font-mono font-black text-industrial-700">020</td>
                      <td className="px-4 py-4 font-mono">201</td>
                      <td className="px-4 py-4 font-mono">202</td>
                      <td className="px-4 py-4 text-graphite-600">{lang === "en" ? "Station B tools" : "Tool station B"}</td>
                    </tr>
                  </tbody>
                </table>
                <p className="border-t border-graphite-200 px-4 py-3 text-xs leading-5 text-graphite-500">
                  {lang === "en" ? "Example only. Record your actual Group and ID plan before entering settings." : "Hanya contoh. Catat rencana Group dan ID aktual sebelum memasukkan setting."}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="setup" className="scroll-mt-24 bg-white py-16">
          <div className="container-page">
            <div className="max-w-3xl">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-signal-600">{lang === "en" ? "Five-step setup" : "Setup lima langkah"}</p>
              <h2 className="mt-3 text-4xl font-black text-graphite-950">{lang === "en" ? "Configure the system in this order." : "Konfigurasikan sistem dengan urutan ini."}</h2>
              <p className="mt-4 text-base leading-7 text-graphite-600">
                {lang === "en" ? "Set only one wrench or receiver at a time. Finish and return it to normal mode before putting the next device into setting mode." : "Set hanya satu wrench atau receiver pada satu waktu. Selesaikan dan kembalikan ke normal mode sebelum memasukkan device berikutnya ke setting mode."}
              </p>
            </div>

            <div className="mt-10 space-y-10">
              <article className="grid gap-7 border border-graphite-200 p-6 md:p-8 lg:grid-cols-[0.72fr_1.28fr]">
                <div>
                  <div className="flex items-center gap-4"><StepNumber>1</StepNumber><ShieldCheck className="h-7 w-7 text-industrial-700" aria-hidden="true" /></div>
                  <h3 className="mt-5 text-2xl font-black text-graphite-950">{lang === "en" ? "Prepare and install M-FD" : "Siapkan dan pasang M-FD"}</h3>
                  <p className="mt-3 text-sm leading-6 text-graphite-600">{lang === "en" ? "Skip the module installation only if M-FD is already correctly fitted." : "Lewati pemasangan module hanya jika M-FD sudah terpasang dengan benar."}</p>
                  <div className="mt-5"><ManualRef>{lang === "en" ? "Manual: 6-3" : "Manual: 6-3"}</ManualRef></div>
                </div>
                <ol className="grid gap-3 text-sm leading-6 text-graphite-700">
                  {[
                    lang === "en" ? "Switch off the R-CM and any equipment wired to it." : "Matikan R-CM dan equipment yang terhubung melalui kabel.",
                    lang === "en" ? "Attach both antennas to the M-FD module." : "Pasang kedua antenna pada module M-FD.",
                    lang === "en" ? "Open the R-CM front cover and seat M-FD on the board without pinching the metal fittings." : "Buka cover depan R-CM dan pasang M-FD pada board tanpa menjepit metal fitting.",
                    lang === "en" ? "Push the module inward only until both metal fittings enter its grooves. Do not force it." : "Dorong module hanya sampai kedua metal fitting masuk ke groove. Jangan dipaksa.",
                    lang === "en" ? "Power R-CM with DC 18-36 V. Keep antennas away from metal poles, wiring, and parallel pipework." : "Gunakan power DC 18-36 V pada R-CM. Jauhkan antenna dari tiang logam, kabel, dan pipa yang sejajar."
                  ].map((item, index) => (
                    <li key={item} className="flex gap-3 bg-graphite-50 p-4"><span className="font-black text-signal-600">{index + 1}.</span><span>{item}</span></li>
                  ))}
                </ol>
              </article>

              <div className="flex justify-center text-graphite-300"><ArrowDown className="h-7 w-7" aria-hidden="true" /></div>

              <article className="grid gap-7 border border-graphite-200 p-6 md:p-8 lg:grid-cols-[0.72fr_1.28fr]">
                <div>
                  <div className="flex items-center gap-4"><StepNumber>2</StepNumber><Wrench className="h-7 w-7 text-industrial-700" aria-hidden="true" /></div>
                  <h3 className="mt-5 text-2xl font-black text-graphite-950">{lang === "en" ? "Set each CSPFDD" : "Set setiap CSPFDD"}</h3>
                  <p className="mt-3 text-sm leading-6 text-graphite-600">{lang === "en" ? "Repeat for each wrench, using the Group and ID written in your plan." : "Ulangi untuk setiap wrench dengan Group dan ID yang sudah dicatat."}</p>
                  <div className="mt-5"><ManualRef>{lang === "en" ? "Manual: 9-1 BASIC" : "Manual: 9-1 BASIC"}</ManualRef></div>
                </div>
                <div>
                  <ol className="grid gap-3 text-sm leading-6 text-graphite-700 sm:grid-cols-2">
                    {[
                      lang === "en" ? "Turn on the wrench. Hold SET for 1 second; release when USET appears and the LED flashes." : "Nyalakan wrench. Tahan SET 1 detik; lepaskan saat USET muncul dan LED berkedip.",
                      lang === "en" ? "Press TEST to choose KEY, then press TEST again to choose BASE." : "Tekan TEST untuk memilih KEY, lalu tekan TEST lagi untuk memilih BASE.",
                      lang === "en" ? "At GR, use POWER to count up. Hold POWER and press TEST to count down. Press TEST to save the planned Group CH." : "Pada GR, gunakan POWER untuk naik. Tahan POWER dan tekan TEST untuk turun. Tekan TEST untuk menyimpan Group CH.",
                      lang === "en" ? "At ID, enter the planned unique 3-digit wrench ID and press TEST to save." : "Pada ID, masukkan ID wrench 3 digit yang unik dan tekan TEST untuk menyimpan.",
                      lang === "en" ? "At JGC, choose 0 when this R-CM serves two CSPFDD wrenches. The R-CM must use the same JGC." : "Pada JGC, pilih 0 jika R-CM melayani dua CSPFDD. R-CM harus memakai JGC yang sama.",
                      lang === "en" ? "Set APT as required, finish the menu, then press SET to return to normal operation." : "Set APT sesuai kebutuhan, selesaikan menu, lalu tekan SET untuk kembali ke normal operation."
                    ].map((item, index) => (
                      <li key={item} className="border border-graphite-200 bg-graphite-50 p-4"><span className="mr-2 font-black text-signal-600">{index + 1}.</span>{item}</li>
                    ))}
                  </ol>
                  <div className="mt-5 border-l-4 border-industrial-600 bg-industrial-50 p-4 text-sm leading-6 text-graphite-700">
                    <strong className="text-graphite-950">{lang === "en" ? "One-to-one option:" : "Opsi satu-ke-satu:"}</strong>{" "}
                    {lang === "en" ? "JGC 1 activates 3-digit ID identification for a single wrench. Set JGC 1 and the same ID on both sides. For a mixed system, the simpler standard is unique Group CH per R-CM and JGC 0 for every one- or two-wrench receiver." : "JGC 1 mengaktifkan identification ID 3 digit untuk satu wrench. Set JGC 1 dan ID yang sama di kedua sisi. Untuk sistem campuran, standard yang lebih sederhana adalah Group CH unik per R-CM dan JGC 0 untuk setiap receiver dengan satu atau dua wrench."}
                  </div>
                </div>
              </article>

              <div className="flex justify-center text-graphite-300"><ArrowDown className="h-7 w-7" aria-hidden="true" /></div>

              <article className="grid gap-7 border border-graphite-200 p-6 md:p-8 lg:grid-cols-[0.72fr_1.28fr]">
                <div>
                  <div className="flex items-center gap-4"><StepNumber>3</StepNumber><Radio className="h-7 w-7 text-industrial-700" aria-hidden="true" /></div>
                  <h3 className="mt-5 text-2xl font-black text-graphite-950">{lang === "en" ? "Match the R-CM radio settings" : "Samakan radio setting R-CM"}</h3>
                  <p className="mt-3 text-sm leading-6 text-graphite-600">{lang === "en" ? "This tells the receiver which radio group to listen to." : "Langkah ini menentukan radio group yang diterima receiver."}</p>
                  <div className="mt-5"><ManualRef>{lang === "en" ? "Manual: 10-2 MODEL" : "Manual: 10-2 MODEL"}</ManualRef></div>
                </div>
                <div>
                  <ol className="grid gap-3 text-sm leading-6 text-graphite-700">
                    {[
                      lang === "en" ? "Turn on R-CM and hold SET for 2 seconds." : "Nyalakan R-CM dan tahan SET selama 2 detik.",
                      lang === "en" ? "Press SELECT until MODEL appears, then press SET." : "Tekan SELECT sampai MODEL tampil, lalu tekan SET.",
                      lang === "en" ? "Keep MODEL = R-FHD, then advance with SET." : "Biarkan MODEL = R-FHD, lalu lanjutkan dengan SET.",
                      lang === "en" ? "Set GROUP to exactly the same Group CH as its assigned CSPFDD wrench(es)." : "Set GROUP sama persis dengan Group CH pada CSPFDD yang ditugaskan.",
                      lang === "en" ? "Set JGC to the same value as the wrench(es). Use JGC 0 for two wrenches on this receiver." : "Set JGC sama dengan wrench. Gunakan JGC 0 untuk dua wrench pada receiver ini.",
                      lang === "en" ? "Use SELECT to change a displayed value and SET to save/advance." : "Gunakan SELECT untuk mengubah nilai dan SET untuk menyimpan/melanjutkan."
                    ].map((item, index) => (
                      <li key={item} className="flex gap-3 border border-graphite-200 p-4"><span className="font-black text-signal-600">{index + 1}.</span><span>{item}</span></li>
                    ))}
                  </ol>
                  <div className="mt-5 flex gap-3 bg-signal-50 p-4 text-sm font-semibold leading-6 text-graphite-800">
                    <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-signal-600" aria-hidden="true" />
                    <p>{lang === "en" ? "If another R-CM is physically adjacent, do not reuse this Group CH on that receiver." : "Jika ada R-CM lain yang berdekatan secara fisik, jangan gunakan kembali Group CH ini pada receiver tersebut."}</p>
                  </div>
                </div>
              </article>

              <div className="flex justify-center text-graphite-300"><ArrowDown className="h-7 w-7" aria-hidden="true" /></div>

              <article className="grid gap-7 border border-graphite-200 p-6 md:p-8 lg:grid-cols-[0.72fr_1.28fr]">
                <div>
                  <div className="flex items-center gap-4"><StepNumber>4</StepNumber><Gauge className="h-7 w-7 text-industrial-700" aria-hidden="true" /></div>
                  <h3 className="mt-5 text-2xl font-black text-graphite-950">{lang === "en" ? "Assign IDs and HIGH/LOW limits" : "Tetapkan ID dan batas HIGH/LOW"}</h3>
                  <p className="mt-3 text-sm leading-6 text-graphite-600">{lang === "en" ? "The R-CM judges each received torque against the profile mapped to that wrench ID." : "R-CM membandingkan torque yang diterima dengan profile milik ID wrench tersebut."}</p>
                  <div className="mt-5"><ManualRef>{lang === "en" ? "Manual: 10-3 BASE" : "Manual: 10-3 BASE"}</ManualRef></div>
                </div>
                <div>
                  <p className="text-sm leading-6 text-graphite-700">{lang === "en" ? "Hold SET for 2 seconds, press SELECT to BASE, then SET. Keep unrelated communication settings unchanged and advance until UNIT, ID1, and the torque limits appear." : "Tahan SET 2 detik, tekan SELECT ke BASE, lalu SET. Biarkan communication setting lain tetap dan lanjutkan sampai UNIT, ID1, dan torque limit tampil."}</p>
                  <dl className="mt-5 border-y border-graphite-200">
                    <SettingRow label="UNIT" value={lang === "en" ? "Choose the engineering unit used by the approved torque specification." : "Pilih engineering unit yang dipakai pada specification torque."} />
                    <SettingRow label="ID1" value={lang === "en" ? "Enter wrench 1's exact 3-digit ID." : "Masukkan ID 3 digit wrench 1 secara persis."} />
                    <SettingRow label="HI-T1" value={lang === "en" ? "Enter wrench 1 HIGH torque limit." : "Masukkan batas HIGH torque wrench 1."} note={lang === "en" ? "Must be higher than LO-T1." : "Harus lebih besar daripada LO-T1."} />
                    <SettingRow label="LO-T1" value={lang === "en" ? "Enter wrench 1 LOW torque limit." : "Masukkan batas LOW torque wrench 1."} note={lang === "en" ? "Must be lower than HI-T1." : "Harus lebih kecil daripada HI-T1."} />
                    <SettingRow label="HI-A1 / LO-A1" value="000.0" note={lang === "en" ? "Leave angle limits at zero for regular CSPFDD; these fields are only for the FDD-AD torque-and-angle output model." : "Biarkan angle limit nol untuk CSPFDD biasa; field ini hanya untuk model FDD-AD torque-and-angle output."} />
                    <SettingRow label="ID2" value={lang === "en" ? "Enter wrench 2's exact 3-digit ID, or leave unused if only one wrench is assigned." : "Masukkan ID 3 digit wrench 2 secara persis, atau biarkan tidak digunakan bila hanya ada satu wrench."} />
                    <SettingRow label="HI-T2 / LO-T2" value={lang === "en" ? "Enter wrench 2 HIGH and LOW limits." : "Masukkan batas HIGH dan LOW wrench 2."} />
                    <SettingRow label="HI-A2 / LO-A2" value="000.0" note={lang === "en" ? "Leave at zero for regular CSPFDD." : "Biarkan nol untuk CSPFDD biasa."} />
                    <SettingRow label="DFLT" value="no" note={lang === "en" ? "Do not initialize the receiver after entering your settings." : "Jangan initialize receiver setelah memasukkan setting."} />
                  </dl>
                  <p className="mt-4 text-xs leading-5 text-graphite-500">{lang === "en" ? "On R-CM, SELECT changes the value; SET moves to the next digit and saves/advances from the rightmost digit." : "Pada R-CM, SELECT mengubah nilai; SET berpindah digit dan menyimpan/melanjutkan dari digit paling kanan."}</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="bg-industrial-800 py-16 text-white">
          <div className="container-page grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-signal-300">{lang === "en" ? "How to set HIGH and LOW" : "Cara set HIGH dan LOW"}</p>
              <h2 className="mt-3 text-4xl font-black">{lang === "en" ? "Use the approved process limits - not the wrench accuracy." : "Gunakan process limit yang disetujui - bukan akurasi wrench."}</h2>
              <p className="mt-5 text-base leading-8 text-white/75">{lang === "en" ? "HIGH is the largest acceptable tightening result. LOW is the smallest acceptable result. Obtain both from the engineering drawing, customer specification, or approved control plan." : "HIGH adalah hasil tightening terbesar yang diterima. LOW adalah hasil terkecil yang diterima. Ambil keduanya dari engineering drawing, customer specification, atau control plan yang disetujui."}</p>
            </div>
            <div className="border border-white/15 bg-white/5 p-6 md:p-8">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-signal-300">{lang === "en" ? "Worked example" : "Contoh"}</p>
              <p className="mt-3 text-lg font-bold">{lang === "en" ? "Approved target: 50.0 N·m with tolerance -2.5 / +2.5 N·m" : "Target disetujui: 50.0 N·m dengan tolerance -2.5 / +2.5 N·m"}</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="border-l-4 border-signal-400 bg-black/15 p-5">
                  <p className="font-mono text-xs font-black uppercase tracking-[0.14em] text-white/60">LO-T1</p>
                  <p className="mt-2 text-4xl font-black">47.5</p>
                  <p className="mt-2 text-xs text-white/60">50.0 - 2.5</p>
                </div>
                <div className="border-l-4 border-signal-400 bg-black/15 p-5">
                  <p className="font-mono text-xs font-black uppercase tracking-[0.14em] text-white/60">HI-T1</p>
                  <p className="mt-2 text-4xl font-black">52.5</p>
                  <p className="mt-2 text-xs text-white/60">50.0 + 2.5</p>
                </div>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <div className="flex items-center gap-3 border border-red-300/30 bg-red-950/20 p-4"><XCircle className="h-5 w-5 text-red-300" aria-hidden="true" /><span className="text-sm"><strong>46.9</strong> - NG LOW</span></div>
                <div className="flex items-center gap-3 border border-emerald-300/30 bg-emerald-950/20 p-4"><CheckCircle2 className="h-5 w-5 text-emerald-300" aria-hidden="true" /><span className="text-sm"><strong>50.2</strong> - OK</span></div>
                <div className="flex items-center gap-3 border border-red-300/30 bg-red-950/20 p-4"><XCircle className="h-5 w-5 text-red-300" aria-hidden="true" /><span className="text-sm"><strong>53.0</strong> - NG HIGH</span></div>
              </div>
              <div className="mt-5 flex gap-3 border-t border-white/15 pt-5 text-sm leading-6 text-white/70">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-signal-300" aria-hidden="true" />
                <p>{lang === "en" ? "Do not invent limits from the CSPFDD accuracy rating. Tool accuracy and process acceptance tolerance are different controls." : "Jangan membuat limit dari rating akurasi CSPFDD. Akurasi tool dan process acceptance tolerance adalah kontrol yang berbeda."}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="container-page">
            <article className="grid gap-7 border border-graphite-200 p-6 md:p-8 lg:grid-cols-[0.72fr_1.28fr]">
              <div>
                <div className="flex items-center gap-4"><StepNumber>5</StepNumber><CheckCircle2 className="h-7 w-7 text-industrial-700" aria-hidden="true" /></div>
                <h2 className="mt-5 text-3xl font-black text-graphite-950">{lang === "en" ? "Commission one wrench at a time" : "Commission satu wrench pada satu waktu"}</h2>
                <p className="mt-3 text-sm leading-6 text-graphite-600">{lang === "en" ? "Do not release the station until every tool passes this check." : "Jangan release station sebelum setiap tool lulus pengecekan ini."}</p>
              </div>
              <ol className="grid gap-4 text-sm leading-6 text-graphite-700">
                {[
                  lang === "en" ? "Exit setting mode on the CSPFDD and R-CM. Confirm the intended R-CM is powered and in RUN/normal mode." : "Keluar dari setting mode pada CSPFDD dan R-CM. Pastikan R-CM yang dituju menyala dan berada di RUN/normal mode.",
                  lang === "en" ? "Test wrench 1 only. Make one tightening inside its approved LOW/HIGH range, then fully release the load so CSPFDD transmits." : "Test hanya wrench 1. Lakukan satu tightening di dalam range LOW/HIGH, lalu lepaskan beban sepenuhnya agar CSPFDD mengirim data.",
                  lang === "en" ? "Confirm the R-CM receives the correct ID/profile and the CSPFDD blue LED lights for OK. Red means the received result was NG." : "Pastikan R-CM menerima ID/profile yang benar dan LED biru CSPFDD menyala untuk OK. Merah berarti hasil yang diterima adalah NG.",
                  lang === "en" ? "Repeat with a value below LOW and above HIGH if your commissioning procedure permits, confirming NG judgment." : "Jika prosedur commissioning mengizinkan, ulangi dengan nilai di bawah LOW dan di atas HIGH untuk mengonfirmasi judgment NG.",
                  lang === "en" ? "Power down or set aside wrench 1. Repeat the test for wrench 2. Never transmit from both at the same time." : "Matikan atau sisihkan wrench 1. Ulangi test untuk wrench 2. Jangan pernah mengirim dari keduanya secara bersamaan.",
                  lang === "en" ? "Record receiver, Group CH, wrench ID, LOW, HIGH, unit, date, and test result on the station setup sheet." : "Catat receiver, Group CH, wrench ID, LOW, HIGH, unit, tanggal, dan hasil test pada station setup sheet."
                ].map((item, index) => (
                  <li key={item} className="grid grid-cols-[2.25rem_1fr] items-start gap-3"><span className="flex h-9 w-9 items-center justify-center bg-graphite-950 text-xs font-black text-white">{index + 1}</span><span className="border-b border-graphite-200 pb-4 pt-1.5">{item}</span></li>
                ))}
              </ol>
            </article>

            <div className="mt-8 grid gap-5 md:grid-cols-3">
              <div className="border-t-4 border-emerald-500 bg-emerald-50 p-5"><p className="font-black text-emerald-900">{lang === "en" ? "Blue LED" : "LED biru"}</p><p className="mt-2 text-sm leading-6 text-emerald-950/75">{lang === "en" ? "Communication returned an OK judgment." : "Communication mengembalikan judgment OK."}</p></div>
              <div className="border-t-4 border-red-500 bg-red-50 p-5"><p className="font-black text-red-900">{lang === "en" ? "Red LED" : "LED merah"}</p><p className="mt-2 text-sm leading-6 text-red-950/75">{lang === "en" ? "Communication succeeded, but torque or double-tightening judgment was NG." : "Communication berhasil, tetapi torque atau double-tightening judgment NG."}</p></div>
              <div className="border-t-4 border-amber-500 bg-amber-50 p-5"><p className="font-black text-amber-900">{lang === "en" ? "Flashing red + E01" : "Merah berkedip + E01"}</p><p className="mt-2 text-sm leading-6 text-amber-950/75">{lang === "en" ? "No response from R-CM. Press POWER to resend the measured value, then troubleshoot below." : "Tidak ada response dari R-CM. Tekan POWER untuk mengirim ulang nilai, lalu ikuti troubleshooting."}</p></div>
            </div>
          </div>
        </section>

        <section id="troubleshooting" className="scroll-mt-24 bg-graphite-50 py-16">
          <div className="container-page grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-signal-600">{lang === "en" ? "Troubleshooting" : "Troubleshooting"}</p>
              <h2 className="mt-3 text-4xl font-black text-graphite-950">{lang === "en" ? "If the wrench shows E01, check in this order." : "Jika wrench menampilkan E01, cek dengan urutan ini."}</h2>
              <p className="mt-4 text-base leading-7 text-graphite-600">{lang === "en" ? "Change one thing at a time and resend after each correction." : "Ubah satu hal pada satu waktu dan kirim ulang setelah setiap koreksi."}</p>
            </div>
            <ol className="grid gap-3 sm:grid-cols-2">
              {[
                { title: "M-FD", body: lang === "en" ? "Confirm the module is M-FD, fully seated, and both antennas are attached." : "Pastikan module adalah M-FD, terpasang penuh, dan kedua antenna terpasang." },
                { title: "POWER", body: lang === "en" ? "Confirm R-CM receives DC 18-36 V and is in normal mode." : "Pastikan R-CM menerima DC 18-36 V dan berada di normal mode." },
                { title: "GROUP", body: lang === "en" ? "CSPFDD Group CH must exactly match its assigned R-CM." : "Group CH CSPFDD harus sama persis dengan R-CM yang dituju." },
                { title: "JGC", body: lang === "en" ? "JGC must match on both sides. For two wrenches, use 0." : "JGC harus sama pada kedua sisi. Untuk dua wrench, gunakan 0." },
                { title: "ID1 / ID2", body: lang === "en" ? "Each wrench ID must be unique and exactly match its R-CM BASE profile." : "Setiap ID wrench harus unik dan sama persis dengan profile BASE R-CM." },
                { title: "ONE AT A TIME", body: lang === "en" ? "Stop any second wrench from transmitting during the test." : "Pastikan tidak ada wrench kedua yang mengirim saat test." },
                { title: "DOUBLE TIGHTENING", body: lang === "en" ? "For a connection test, set trigger torque or judgment angle to 0, or press TEST to force the displayed value to transmit." : "Untuk test koneksi, set trigger torque atau judgment angle ke 0, atau tekan TEST untuk mengirim nilai yang tampil." },
                { title: "RADIO AREA", body: lang === "en" ? "Move away from metal, parallel pipes, welding machines, electrical discharge machines, and strong electromagnetic noise." : "Jauhkan dari logam, pipa sejajar, welding machine, electrical discharge machine, dan electromagnetic noise yang kuat." }
              ].map((item, index) => (
                <li key={item.title} className="border border-graphite-200 bg-white p-5"><p className="font-mono text-xs font-black text-signal-600">{String(index + 1).padStart(2, "0")} / {item.title}</p><p className="mt-3 text-sm leading-6 text-graphite-700">{item.body}</p></li>
              ))}
            </ol>
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="container-page">
            <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
              <div>
                <Settings2 className="h-8 w-8 text-industrial-700" aria-hidden="true" />
                <h2 className="mt-5 text-3xl font-black text-graphite-950">{lang === "en" ? "Important receiver options" : "Opsi receiver yang penting"}</h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="border border-graphite-200 p-5"><h3 className="font-black text-graphite-950">{lang === "en" ? "No external equipment" : "Tanpa external equipment"}</h3><p className="mt-2 text-sm leading-6 text-graphite-600">{lang === "en" ? "Set FLOW to OFF in Communication settings." : "Set FLOW ke OFF pada Communication settings."}</p></div>
                <div className="border border-graphite-200 p-5"><h3 className="font-black text-graphite-950">{lang === "en" ? "External equipment judges OK/NG" : "External equipment menentukan OK/NG"}</h3><p className="mt-2 text-sm leading-6 text-graphite-600">{lang === "en" ? "Set both R-CM torque HIGH and LOW values to 000.0." : "Set kedua nilai HIGH dan LOW torque R-CM ke 000.0."}</p></div>
                <div className="border border-graphite-200 p-5"><h3 className="font-black text-graphite-950">AUTO RESET TIMER</h3><p className="mt-2 text-sm leading-6 text-graphite-600">{lang === "en" ? "If ART is 0.0 seconds, the R-CM does not output an OK signal. Use a non-zero value when the OK relay output is required." : "Jika ART 0.0 detik, R-CM tidak mengeluarkan signal OK. Gunakan nilai selain nol bila OK relay output dibutuhkan."}</p></div>
                <div className="border border-graphite-200 p-5"><h3 className="font-black text-graphite-950">SB-FH2 + PC</h3><p className="mt-2 text-sm leading-6 text-graphite-600">{lang === "en" ? "For larger commissioning jobs, Pokayoke Tool Setting Software can GET and SEND Channel and Judgment settings through SB-FH2. Put only one receiver in setting mode at a time." : "Untuk commissioning yang lebih besar, Pokayoke Tool Setting Software dapat GET dan SEND Channel serta Judgment settings melalui SB-FH2. Masukkan hanya satu receiver ke setting mode pada satu waktu."}</p></div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-graphite-50 py-16">
          <div className="container-page grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
            <div><p className="text-xs font-black uppercase tracking-[0.2em] text-signal-600">FAQ</p><h2 className="mt-3 text-3xl font-black text-graphite-950">{lang === "en" ? "Questions that cause most setup errors" : "Pertanyaan yang paling sering menyebabkan setup error"}</h2></div>
            <div className="divide-y divide-graphite-200 border-y border-graphite-200">
              {faqItems.map((item) => (
                <details key={item.question.en} className="group py-5">
                  <summary className="focus-ring flex cursor-pointer list-none items-center justify-between gap-4 font-black text-graphite-950">
                    {text(item.question, lang)}
                    <span className="text-xl text-signal-600 transition group-open:rotate-45" aria-hidden="true">+</span>
                  </summary>
                  <p className="mt-4 max-w-3xl text-sm leading-7 text-graphite-600">{text(item.answer, lang)}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-14">
          <div className="container-page flex flex-col gap-6 border-l-4 border-industrial-700 bg-graphite-50 p-7 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-black text-graphite-950">{lang === "en" ? "Source used for this guide" : "Sumber panduan"}</p>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-graphite-600">{lang === "en" ? "TOHNICHI Data Transfer Torque Wrench CSPFD/CSPFDD Operating Instruction: Specifications, M-FD installation, BASIC settings, R-CM MODEL/BASE settings, and R-CM software settings (manual sections 3, 6-3, 9-1, 10, and 12)." : "TOHNICHI Data Transfer Torque Wrench CSPFD/CSPFDD Operating Instruction: Specifications, pemasangan M-FD, BASIC settings, R-CM MODEL/BASE settings, dan R-CM software settings (bagian 3, 6-3, 9-1, 10, dan 12)."}</p>
            </div>
            <CTAButton href={withLang("/contact?topic=cspfdd-rcm-setup", lang)}>{lang === "en" ? "Ask CSE to review a setup" : "Minta CSE review setup"}</CTAButton>
          </div>
        </section>
      </main>
    </>
  );
}
