import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { GuideFlowRunner } from "@/components/guideflow/GuideFlowRunner";
import { sbFh2GuideFlow } from "@/data/guideflows/sb-fh2";
import { text, type Language, withLang } from "@/lib/i18n";

const modeRows = [
  {
    mode: "FH/FD",
    id: "Group, judgment code, dan ID 3 digit untuk perangkat yang memakai mode lama SB-FH256.",
    en: "Group, judgment code, and 3-digit ID for devices using the older SB-FH256 mode."
  },
  {
    mode: "TRANSMITTER",
    id: "Group, code, ID 3 digit dan ID 7 karakter pada T-FHM/T-FH/FHW; FHW SETTING khusus angle double tightening.",
    en: "Group, code, 3-digit and 7-character IDs on T-FHM/T-FH/FHW; FHW SETTING is for double-tightening angle."
  },
  {
    mode: "R-CM",
    id: "Setting tiap output R1-R4 pada receiver R-CM dengan module M-FH.",
    en: "Settings for each R1-R4 output on an R-CM receiver with M-FH."
  },
  {
    mode: "REMOTE SETTING",
    id: "Cari dan atur R-CM + M-FH dari jarak jauh dengan remote ID module.",
    en: "Find and configure R-CM + M-FH remotely using the module's remote ID."
  },
  {
    mode: "R-FHD",
    id: "Setting receiver FD/FDD seperti limit dan serial format; gunakan manual FD/FDD untuk nilai yang benar.",
    en: "FD/FDD receiver settings such as limits and serial format; use the FD/FDD manual for correct values."
  }
];

const setupSteps = [
  {
    id: "Siapkan SB-FH2 dengan baterai alkaline 9 V dan dipole antenna. Catat Group, judgment code, ID yang dipakai, serta output R1-R4 yang dituju.",
    en: "Fit a 9 V alkaline battery and dipole antenna to the SB-FH2. Record the Group, judgment code, applicable IDs, and intended R1-R4 output."
  },
  {
    id: "Masukkan satu R-CM dengan module M-FH ke setting mode. Pada SB-FH2 pilih R-CM, lalu R-CM(M-FH) dan output yang akan dipakai.",
    en: "Put one R-CM with an M-FH module in setting mode. On the SB-FH2, select R-CM, then R-CM(M-FH) and the intended output."
  },
  {
    id: "Tekan GET untuk membaca nilai, ubah baris NEW, lalu tekan SET. Setelah muncul OK, tekan GET lagi untuk memastikan nilai pada R-CM tersimpan.",
    en: "Press GET to read the values, edit the NEW row, then press SET. After OK appears, press GET again to confirm the R-CM values were saved."
  },
  {
    id: "Keluarkan R-CM dari setting mode. Masukkan transmitter ke setting mode, pilih TRANSMITTER lalu R-CM, dan tulis Group, code, serta ID yang sesuai. Verifikasi setiap halaman dengan GET.",
    en: "Exit R-CM setting mode. Put the transmitter in setting mode, select TRANSMITTER then R-CM, and write matching Group, code, and IDs. Verify each page with GET."
  },
  {
    id: "Keluarkan transmitter dari setting mode dan lakukan test pengencangan yang aman. Pastikan output R-CM yang benar merespons.",
    en: "Exit transmitter setting mode and perform a safe tightening test. Confirm that the intended R-CM output responds."
  }
];

const judgmentRows = [
  { code: "0", id: "Tanpa identifikasi ID. Gunakan hanya bila tidak ada transmisi simultan.", en: "No ID identification. Use only when there are no simultaneous transmissions." },
  { code: "1", id: "Identifikasi dengan ID 3 digit.", en: "Identify by 3-digit ID." },
  { code: "2", id: "Identifikasi dengan ID 7 karakter.", en: "Identify by 7-character ID." },
  { code: "3", id: "Identifikasi dengan kedua ID: 3 digit dan 7 karakter.", en: "Identify by both the 3-digit and 7-character IDs." }
];

const questions = [
  {
    question: { id: "Apakah SB-FH2 mengatur nilai torsi pada torque wrench?", en: "Does the SB-FH2 set torque on the wrench?" },
    answer: { id: "Tidak. SB-FH2 mengatur parameter komunikasi wireless. Setelan torsi mekanis diatur dan diverifikasi sesuai manual wrench yang digunakan.", en: "No. The SB-FH2 configures wireless communication. Set and verify mechanical torque using the manual for the wrench model." }
  },
  {
    question: { id: "Apa fungsi tombol GET dan SET pada SB-FH2?", en: "What do GET and SET do on the SB-FH2?" },
    answer: { id: "GET membaca nilai saat ini ke baris atas. SET mengirim nilai dari baris NEW pada halaman yang sedang tampil. Setelah SET, tekan GET lagi untuk membaca hasilnya.", en: "GET reads current values into the upper row. SET sends the NEW row on the displayed page. Press GET after SET to read the result back." }
  },
  {
    question: { id: "Mengapa SB-FH2 menampilkan NG atau R-CM tidak merespons?", en: "Why does the SB-FH2 show NG or the R-CM fail to respond?" },
    answer: { id: "Periksa apakah target berada dalam setting mode dan hanya satu unit yang aktif. Pastikan module M-FH, mode komunikasi, Group, judgment code, dan ID yang dinilai cocok, lalu ulangi GET atau SET.", en: "Check that the target is in setting mode and only one unit is active. Confirm the M-FH module, communication mode, Group, judgment code, and applicable IDs match, then retry GET or SET." }
  },
  {
    question: { id: "Bisakah R-CM + M-FH diatur dari jarak jauh?", en: "Can an R-CM + M-FH be configured remotely?" },
    answer: { id: "Ya. Pilih REMOTE SETTING pada SB-FH2, cari R-CM memakai remote ID pada module M-FH, lalu baca dan tulis setting target. Setelah selesai, tahan GET untuk keluar dari remote setting mode.", en: "Yes. Select REMOTE SETTING on the SB-FH2, find the R-CM using the remote ID on its M-FH module, then read and write the target settings. Hold GET afterwards to exit remote setting mode." }
  }
];

export function SbFh2Guide({ lang }: { lang: Language }) {
  const pairingStepIds = sbFh2GuideFlow.tasks[0].stepIds;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: text(sbFh2GuideFlow.title, lang),
    description: text(sbFh2GuideFlow.description, lang),
    totalTime: "PT25M",
    supply: sbFh2GuideFlow.prerequisites.map((item) => ({
      "@type": "HowToSupply",
      name: text(item, lang)
    })),
    step: sbFh2GuideFlow.steps
      .filter((step) => pairingStepIds.includes(step.id))
      .map((step) => ({
        "@type": "HowToStep",
        name: text(step.title, lang),
        text: text(step.instruction, lang),
        image: step.media.src,
        url: `${withLang(`/guides/${sbFh2GuideFlow.slug}`, lang)}#${step.id}`
      }))
  };

  return (
    <>
      <script
        id="sb-fh2-guideflow-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Breadcrumb
        homeHref={withLang("/", lang)}
        items={[
          { href: withLang("/guides", lang), label: lang === "en" ? "Guides" : "Panduan" },
          { label: text(sbFh2GuideFlow.title, lang) }
        ]}
      />
      <GuideFlowRunner guide={sbFh2GuideFlow} lang={lang} />
      <section className="cse-section border-t border-graphite-200 bg-white" aria-labelledby="sb-fh2-setup-summary">
        <div className="container-page">
          <p className="cse-eyebrow font-black text-signal-600">
            {lang === "en" ? "Setup summary" : "Ringkasan setup"}
          </p>
          <h2 id="sb-fh2-setup-summary" className="cse-heading mt-4 max-w-4xl font-black text-graphite-900">
            {lang === "en" ? "How to set up a TOHNICHI SB-FH2 with R-CM + M-FH" : "Cara setting TOHNICHI SB-FH2 dengan R-CM + M-FH"}
          </h2>
          <p className="mt-4 max-w-4xl text-sm leading-7 text-graphite-700">
            {lang === "en"
              ? "The SB-FH2 is a wireless setting box for compatible TOHNICHI transmitters and receivers. For an FH/FHM/FHW transmitter and an R-CM receiver fitted with M-FH, configure the intended R-CM output and transmitter with matching communication settings. Use the model manuals to enter and exit setting mode."
              : "SB-FH2 adalah setting box wireless untuk transmitter dan receiver TOHNICHI yang kompatibel. Pada jalur transmitter FH/FHM/FHW dan receiver R-CM dengan module M-FH, samakan setting komunikasi pada output R-CM yang dituju dan transmitter. Ikuti manual tiap model untuk masuk dan keluar dari setting mode."}
          </p>
          <ol className="mt-7 grid gap-3 lg:grid-cols-2">
            {setupSteps.map((step, index) => (
              <li key={index} className="flex gap-4 border border-graphite-200 bg-graphite-50 px-5 py-4 text-sm leading-6 text-graphite-700">
                <span className="font-mono font-black text-industrial-700">{String(index + 1).padStart(2, "0")}</span>
                <span>{step[lang]}</span>
              </li>
            ))}
          </ol>
          <p className="mt-5 text-sm leading-7 text-graphite-700">
            {lang === "en"
              ? "If judgment code 2 or 3 uses a 7-character ID, write that ID on its separate page for both devices. SET sends only the page currently shown."
              : "Jika judgment code 2 atau 3 memakai ID 7 karakter, tulis ID tersebut pada halaman terpisah di kedua perangkat. SET hanya mengirim halaman yang sedang tampil."}
          </p>
          <a href="#guideflow-runner" className="mt-6 inline-flex border border-graphite-900 bg-graphite-900 px-5 py-3 text-sm font-black text-white hover:bg-industrial-700">
            {lang === "en" ? "Open the guided setup" : "Buka panduan langkah demi langkah"}
          </a>
        </div>
      </section>
      <section className="cse-section border-t border-graphite-200 bg-white" aria-labelledby="sb-fh2-judgment-code">
        <div className="container-page">
          <h2 id="sb-fh2-judgment-code" className="cse-heading font-black text-graphite-900">
            {lang === "en" ? "SB-FH2 judgment code: 0, 1, 2, or 3" : "Arti judgment code 0, 1, 2, dan 3 pada SB-FH2"}
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-graphite-700">
            {lang === "en"
              ? "The judgment code determines which transmitter ID the receiver checks. Match the Group, judgment code, and any checked IDs on the transmitter and intended R-CM output."
              : "Judgment code menentukan ID transmitter yang diperiksa receiver. Samakan Group, judgment code, dan ID yang dinilai pada transmitter dan output R-CM yang dituju."}
          </p>
          <div className="mt-6 overflow-x-auto border border-graphite-200">
            <table className="w-full min-w-[540px] border-collapse text-left text-sm">
              <thead className="bg-graphite-900 text-white">
                <tr>
                  <th scope="col" className="w-28 px-5 py-4 font-black">Code</th>
                  <th scope="col" className="px-5 py-4 font-black">{lang === "en" ? "ID check" : "Pemeriksaan ID"}</th>
                </tr>
              </thead>
              <tbody>
                {judgmentRows.map((row) => (
                  <tr key={row.code} className="border-t border-graphite-200 align-top">
                    <th scope="row" className="px-5 py-4 font-mono font-black text-industrial-700">{row.code}</th>
                    <td className="px-5 py-4 leading-6 text-graphite-700">{row[lang]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <section className="cse-section border-t border-graphite-200 bg-paper-100" aria-labelledby="sb-fh2-mode-reference">
        <div className="container-page">
          <p className="cse-eyebrow font-black text-signal-600">
            {lang === "en" ? "Control reference" : "Referensi tombol dan mode"}
          </p>
          <h2 id="sb-fh2-mode-reference" className="cse-heading mt-4 font-black text-graphite-900">
            {lang === "en" ? "Choose the right SB-FH2 mode" : "Pilih mode SB-FH2 yang tepat"}
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-graphite-600">
            {lang === "en"
              ? "The yellow-ringed GET key reads the current settings into the upper row. The center SET key writes the lower NEW row. Always read back with GET after writing; the other settings page is not sent automatically."
              : "Tombol GET bercincin kuning membaca setting saat ini ke baris atas. Tombol SET di tengah menulis baris bawah NEW. Setelah menulis, baca ulang dengan GET; halaman setting lain tidak ikut terkirim otomatis."}
          </p>
          <div className="mt-7 overflow-x-auto border border-graphite-200 bg-white">
            <table className="w-full min-w-[580px] border-collapse text-left text-sm">
              <thead className="bg-graphite-900 text-white">
                <tr>
                  <th scope="col" className="w-48 px-5 py-4 font-black">{lang === "en" ? "Mode" : "Mode"}</th>
                  <th scope="col" className="px-5 py-4 font-black">{lang === "en" ? "Use" : "Kegunaan"}</th>
                </tr>
              </thead>
              <tbody>
                {modeRows.map((row) => (
                  <tr key={row.mode} className="border-t border-graphite-200 align-top">
                    <th scope="row" className="px-5 py-4 font-mono text-xs font-bold text-industrial-700">{row.mode}</th>
                    <td className="px-5 py-4 leading-6 text-graphite-700">{row[lang]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-5 text-xs leading-6 text-graphite-500">
            {lang === "en" ? "PC setup uses an RS232C straight cable and TOHNICHI's dedicated configuration software." : "Setup melalui PC memakai kabel RS232C straight dan software konfigurasi khusus dari TOHNICHI."}
            {" "}
            <Link href={withLang("/guides/cspfdd-r-cm-connection", lang)} className="font-bold text-industrial-700 underline underline-offset-4 hover:text-signal-600">
              {lang === "en" ? "For FDD + M-FD, use the separate FDD guide." : "Untuk FDD + M-FD, gunakan panduan FDD yang terpisah."}
            </Link>
          </p>
        </div>
      </section>
      <section className="cse-section border-t border-graphite-200 bg-white" aria-labelledby="sb-fh2-faq">
        <div className="container-page">
          <h2 id="sb-fh2-faq" className="cse-heading font-black text-graphite-900">
            {lang === "en" ? "SB-FH2 setup questions" : "Pertanyaan umum tentang setting SB-FH2"}
          </h2>
          <div className="mt-7 grid gap-5 lg:grid-cols-2">
            {questions.map((item) => (
              <div key={item.question.id} className="border-t-2 border-industrial-700 pt-4">
                <h3 className="text-lg font-black text-graphite-900">{text(item.question, lang)}</h3>
                <p className="mt-2 text-sm leading-7 text-graphite-700">{text(item.answer, lang)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
