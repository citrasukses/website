import Link from "next/link";
import { ArrowRight, BadgeCheck } from "lucide-react";
import { CTAButton } from "@/components/CTAButton";
import { FAQAccordion } from "@/components/FAQAccordion";
import { withLang, type Language } from "@/lib/i18n";

export function TohnichiAuthorization({ lang }: { lang: Language }) {
  return (
    <section aria-label={lang === "en" ? "Official TOHNICHI verification" : "Verifikasi resmi TOHNICHI"} className="border-b border-graphite-200 bg-white">
      <div className="container-page grid gap-5 py-7 lg:grid-cols-[1.2fr_1fr] lg:items-center">
        <div className="flex items-start gap-3">
          <BadgeCheck className="mt-1 h-7 w-7 shrink-0 text-industrial-700" aria-hidden="true" />
          <div>
            <p className="font-bold text-graphite-900">{lang === "en" ? "CSE is listed in TOHNICHI’s official network." : "CSE tercantum dalam jaringan resmi TOHNICHI."}</p>
            <p className="mt-2 text-sm leading-6 text-graphite-500">{lang === "en" ? "PT Citra Sukses Ekapratama is listed as a sales and service agent and an overseas calibration and repair licensee in Indonesia." : "PT Citra Sukses Ekapratama tercantum sebagai agen penjualan dan servis serta licensee kalibrasi dan perbaikan di Indonesia."}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-bold text-industrial-700">
          <a className="focus-ring underline underline-offset-4" href="https://en.global-tohnichi.com/support/distributors.html" target="_blank" rel="noopener noreferrer">{lang === "en" ? "Verify sales & service listing" : "Verifikasi agen penjualan & servis"}</a>
          <a className="focus-ring underline underline-offset-4" href="https://en.global-tohnichi.com/support/" target="_blank" rel="noopener noreferrer">{lang === "en" ? "Verify calibration & repair listing" : "Verifikasi licensee kalibrasi & perbaikan"}</a>
        </div>
      </div>
    </section>
  );
}

export function TohnichiLocalServices({ lang }: { lang: Language }) {
  const en = lang === "en";
  const services = en ? [
    { title: "Product selection & quotations", body: "Find a torque wrench, screwdriver, or tester for your application. Share the model if known, target torque, quantity, and required delivery date for a quotation review.", detail: "Confirm the model, price, availability, and delivery estimate with CSE before ordering." },
    { title: "Calibration & verification", body: "Discuss calibration for your TOHNICHI tools and equipment for routine checks. Send the model, serial number, torque range, last calibration record if available, and your documentation requirements.", detail: "Confirm the supported range, method, documents, and schedule for your specific tool before sending it." },
    { title: "Repair & technical support", body: "Describe the fault or application issue and include the tool model, serial number, and photographs by WhatsApp or email. Note any overload, drop, or previous repair to help the review.", detail: "Confirm inspection arrangements, parts availability, and the proposed work with CSE before shipping the tool." }
  ] : [
    { title: "Pemilihan produk & penawaran", body: "Temukan kunci torsi, obeng torsi, atau tester sesuai aplikasi. Kirim model jika sudah diketahui, target torsi, jumlah, dan kebutuhan tanggal pengiriman untuk ditinjau dalam penawaran.", detail: "Konfirmasikan model, harga, ketersediaan, dan estimasi pengiriman dengan CSE sebelum memesan." },
    { title: "Kalibrasi & verifikasi", body: "Diskusikan kalibrasi alat TOHNICHI dan pemilihan peralatan untuk pemeriksaan rutin. Sertakan model, nomor seri, rentang torsi, catatan kalibrasi terakhir jika tersedia, dan kebutuhan dokumen.", detail: "Konfirmasikan rentang yang didukung, metode, dokumen, dan jadwal untuk alat Anda sebelum mengirimkannya." },
    { title: "Perbaikan & dukungan teknis", body: "Jelaskan kerusakan atau kendala aplikasi, lalu kirim model, nomor seri, dan foto melalui WhatsApp atau email. Sertakan riwayat jatuh, kelebihan beban, atau perbaikan untuk membantu peninjauan.", detail: "Konfirmasikan pengaturan inspeksi, ketersediaan suku cadang, dan usulan pekerjaan dengan CSE sebelum mengirim alat." }
  ];
  return (
    <section id="tohnichi-services" className="scroll-mt-24 bg-white py-16">
      <div className="container-page">
        <p className="border-l-2 border-signal-500 pl-3 text-xs font-bold uppercase tracking-[0.2em] text-signal-600">{en ? "TOHNICHI support in Indonesia" : "Dukungan TOHNICHI di Indonesia"}</p>
        <h2 className="mt-4 max-w-3xl text-3xl font-bold text-graphite-900 md:text-4xl">{en ? "Purchase, calibrate, and service your tools through CSE." : "Pembelian, kalibrasi, dan servis alat melalui CSE."}</h2>
        <div className="mt-9 grid gap-5 lg:grid-cols-3">
          {services.map((service, index) => (
            <div key={service.title} className="border border-graphite-200 bg-graphite-50 p-6">
              <p className="font-mono text-sm font-bold text-signal-600">0{index + 1}</p>
              <h3 className="mt-4 text-xl font-bold text-graphite-900">{service.title}</h3>
              <p className="mt-4 text-sm leading-7 text-graphite-700">{service.body}</p>
              <p className="mt-5 border-t border-graphite-200 pt-4 text-sm leading-6 text-graphite-700">{service.detail}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-6">
          <CTAButton href={withLang("/contact?brand=tohnichi", lang)}>{en ? "Discuss products or service" : "Diskusikan produk atau servis"}</CTAButton>
          <Link href={withLang("/solutions/torque-calibration-verification", lang)} className="focus-ring font-bold text-industrial-700 underline underline-offset-4">{en ? "Explore calibration & verification support" : "Pelajari dukungan kalibrasi & verifikasi"}</Link>
        </div>
      </div>
    </section>
  );
}

export function TohnichiTechnicalExpertise({ lang }: { lang: Language }) {
  const en = lang === "en";
  const steps = en ? [
    { title: "Define the joint", body: "Start with the specified torque and tolerance, fastener, access, and production cycle. The tool must match the engineering requirement." },
    { title: "Select the control", body: "Compare adjustable or preset tools and decide whether completion signals, counting, or recorded results are needed." },
    { title: "Plan the verification", body: "Include tool checks, calibration records, and the response to an out-of-tolerance result in the selection discussion." }
  ] : [
    { title: "Tentukan kebutuhan sambungan", body: "Mulai dari torsi dan toleransi yang ditetapkan, fastener, akses kerja, serta siklus produksi. Alat harus sesuai dengan persyaratan engineering." },
    { title: "Pilih tingkat kontrol", body: "Bandingkan alat adjustable atau preset, lalu tentukan kebutuhan sinyal pengencangan selesai, penghitungan, atau pencatatan hasil." },
    { title: "Rencanakan verifikasi", body: "Sertakan pemeriksaan alat, catatan kalibrasi, dan tindakan saat hasil keluar toleransi dalam pembahasan pemilihan alat." }
  ];
  return (
    <section id="tohnichi-expertise" className="scroll-mt-24 border-y border-graphite-200 bg-[#f3f1ec] py-16">
      <div className="container-page grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="border-l-2 border-signal-500 pl-3 text-xs font-bold uppercase tracking-[0.2em] text-signal-600">{en ? "Technical selection with CSE" : "Pemilihan teknis bersama CSE"}</p>
          <h2 className="mt-4 text-3xl font-bold text-graphite-900 md:text-4xl">{en ? "Connect the tool choice to your production process." : "Sesuaikan pilihan alat dengan proses produksi Anda."}</h2>
          <p className="mt-5 text-base leading-7 text-graphite-700">{en ? "Use these three checks to prepare a technical discussion with CSE. Our TOHNICHI guides cover model selection, tightening control, and verification so procurement and engineering can work from the same requirements." : "Gunakan tiga langkah ini untuk menyiapkan diskusi teknis dengan CSE. Panduan TOHNICHI kami membahas pemilihan model, kontrol pengencangan, dan verifikasi agar procurement dan engineering menggunakan kebutuhan yang sama."}</p>
          <Link className="focus-ring mt-6 inline-flex items-center gap-2 font-bold text-industrial-700 underline underline-offset-4" href={withLang("/solutions/torque-control", lang)}>{en ? "Explore torque-control applications" : "Pelajari aplikasi torque control"}<ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" /></Link>
        </div>
        <ol className="divide-y divide-graphite-200 border-y border-graphite-200">
          {steps.map((step, index) => <li key={step.title} className="flex gap-5 py-6"><span className="font-mono text-lg font-bold text-industrial-700">0{index + 1}</span><div><h3 className="text-lg font-bold text-graphite-900">{step.title}</h3><p className="mt-2 text-sm leading-7 text-graphite-700">{step.body}</p></div></li>)}
        </ol>
      </div>
    </section>
  );
}

export function TohnichiBuyerQuestions({ lang }: { lang: Language }) {
  const en = lang === "en";
  const items = en ? [
    { question: "Is CSE an official TOHNICHI distributor in Indonesia?", answer: "Yes. TOHNICHI lists PT Citra Sukses Ekapratama in its sales and service agent directory and overseas calibration and repair licensee list for Indonesia. Use the manufacturer verification links near the top of this page to check both listings." },
    { question: "How do I buy TOHNICHI products through CSE?", answer: "Open the quotation link on this page and share the model or product family, quantity, application, and delivery requirement. CSE can review your request; confirm the model, quotation, availability, and delivery terms before placing an order." },
    { question: "How can I check prices and stock?", answer: "Request a quotation for the exact model and quantity. A catalogue listing is product information; it does not confirm stock. Ask CSE to confirm current pricing, availability, and estimated delivery for your request." },
    { question: "Can I ask for help if I do not know the model?", answer: "Yes. Share the specified torque and tolerance, fastener or drive size, access constraints, and whether the task is assembly or inspection. Include any requirement for counting or recorded results so CSE can discuss a suitable product family." },
    { question: "How do I request calibration or repair?", answer: "Contact CSE with the model, serial number, torque range, tool condition, and any previous calibration record. For repairs, include a description and photographs of the fault. Confirm service scope, required documents, quotation, schedule, and shipping arrangements before sending the tool." },
    { question: "What information should I provide for calibration documentation?", answer: "Share your internal or customer requirements, the measurement points and tolerances if specified, and any traceability or certificate requirements. Ask CSE to confirm which documents and service scope are available for your tool before proceeding." }
  ] : [
    { question: "Apakah CSE distributor resmi TOHNICHI di Indonesia?", answer: "Ya. TOHNICHI mencantumkan PT Citra Sukses Ekapratama dalam direktori agen penjualan dan servis serta daftar licensee kalibrasi dan perbaikan untuk Indonesia. Gunakan tautan verifikasi manufacturer di bagian atas halaman ini untuk memeriksa kedua daftar tersebut." },
    { question: "Bagaimana cara membeli produk TOHNICHI melalui CSE?", answer: "Buka tautan permintaan penawaran di halaman ini, lalu sertakan model atau keluarga produk, jumlah, aplikasi, dan kebutuhan pengiriman. CSE dapat meninjau permintaan Anda; konfirmasikan model, penawaran, ketersediaan, dan ketentuan pengiriman sebelum memesan." },
    { question: "Bagaimana cara mengetahui harga dan stok TOHNICHI?", answer: "Minta penawaran untuk model dan jumlah yang dibutuhkan. Produk yang tercantum di katalog merupakan informasi produk, bukan konfirmasi stok. Minta CSE mengonfirmasi harga, ketersediaan, dan estimasi pengiriman terkini sesuai permintaan Anda." },
    { question: "Bisakah saya meminta bantuan jika belum mengetahui modelnya?", answer: "Bisa. Sertakan torsi dan toleransi yang ditetapkan, ukuran fastener atau drive, keterbatasan akses, serta pekerjaan assembly atau inspeksi. Jelaskan kebutuhan penghitungan atau pencatatan hasil agar CSE dapat membahas keluarga produk yang sesuai." },
    { question: "Bagaimana cara mengajukan kalibrasi atau perbaikan?", answer: "Hubungi CSE dengan model, nomor seri, rentang torsi, kondisi alat, dan catatan kalibrasi sebelumnya jika ada. Untuk perbaikan, sertakan penjelasan dan foto kerusakan. Konfirmasikan lingkup servis, dokumen yang dibutuhkan, penawaran, jadwal, dan pengaturan pengiriman sebelum mengirim alat." },
    { question: "Informasi apa yang diperlukan untuk dokumen kalibrasi?", answer: "Sampaikan persyaratan internal atau pelanggan, titik ukur dan toleransi jika telah ditetapkan, serta kebutuhan ketertelusuran atau sertifikat. Minta CSE mengonfirmasi dokumen dan lingkup layanan yang tersedia untuk alat Anda sebelum melanjutkan." }
  ];
  return (
    <section id="tohnichi-faq" className="scroll-mt-24 bg-white py-16">
      <div className="container-page max-w-5xl">
        <p className="border-l-2 border-signal-500 pl-3 text-xs font-bold uppercase tracking-[0.2em] text-signal-600">{en ? "Before you contact CSE" : "Sebelum menghubungi CSE"}</p>
        <h2 className="mb-8 mt-4 text-3xl font-bold text-graphite-900 md:text-4xl">{en ? "TOHNICHI purchasing & service questions" : "Pertanyaan pembelian & servis TOHNICHI"}</h2>
        <FAQAccordion items={items} />
      </div>
    </section>
  );
}
