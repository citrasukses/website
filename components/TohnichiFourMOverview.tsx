import { text, type Language, type LocalizedText } from "@/lib/i18n";

type FourMFactorId = "man" | "method" | "machine" | "material";

type FourMFactor = {
  id: FourMFactorId;
  name: string;
  caption: LocalizedText;
  details: LocalizedText[];
};

const fourMFactors: FourMFactor[] = [
  {
    id: "man",
    name: "Man",
    caption: {
      id: "Operator & penggunaan alat",
      en: "Operator & tool use"
    },
    details: [
      { id: "Tightening terlewat", en: "Missed tightening" },
      { id: "Penggunaan alat yang tidak tepat", en: "Improper tightening tool use" }
    ]
  },
  {
    id: "method",
    name: "Method",
    caption: {
      id: "Torque, urutan & prosedur",
      en: "Torque, sequence & procedure"
    },
    details: [
      { id: "Spesifikasi nilai torque salah", en: "Incorrect torque specification" },
      { id: "Prosedur tightening salah", en: "Incorrect tightening procedure" },
      { id: "Pemilihan alat tidak tepat", en: "Incorrect tool selection" }
    ]
  },
  {
    id: "machine",
    name: "Machine",
    caption: {
      id: "Akurasi & kondisi alat",
      en: "Tool accuracy & condition"
    },
    details: [
      { id: "Akurasi alat tidak sesuai", en: "Equipment inaccuracy" },
      { id: "Kerusakan mekanis", en: "Mechanical failure" }
    ]
  },
  {
    id: "material",
    name: "Material",
    caption: {
      id: "Joint, toleransi & pelumasan",
      en: "Joint, tolerance & lubrication"
    },
    details: [
      { id: "Part di luar toleransi", en: "Part out of tolerance" },
      { id: "Material part cacat", en: "Defective part material" },
      { id: "Pelumasan screw joint tidak cukup", en: "Insufficient screw-joint lubricant" }
    ]
  }
];

function FourMVisualization({
  factor,
  label
}: {
  factor: FourMFactorId;
  label: string;
}) {
  const sharedProps = {
    viewBox: "0 0 240 160",
    role: "img",
    "aria-label": label,
    className: "h-full w-full",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2.25,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const
  };

  if (factor === "man") {
    return (
      <svg {...sharedProps}>
        <path d="M83 59c2-24 16-39 37-39s35 15 37 39" />
        <path d="M76 59h88" className="text-signal-500" />
        <path d="M91 60v16c0 19 13 34 29 34s29-15 29-34V60" />
        <path d="M105 110v10l15 14 15-14v-10" />
        <path d="M61 145c5-18 19-29 44-31" />
        <path d="M179 145c-5-18-19-29-44-31" />
        <path d="M85 122l19 23M155 122l-19 23" />
        <path d="M79 145h82" opacity="0.25" />
        <path d="M110 74h20" opacity="0.45" />
      </svg>
    );
  }

  if (factor === "method") {
    return (
      <svg {...sharedProps}>
        <rect x="65" y="24" width="110" height="112" rx="2" />
        <path d="M101 24v-9h38v9" />
        <rect x="101" y="15" width="38" height="18" rx="2" />
        <rect x="83" y="52" width="12" height="12" />
        <path d="M85 58l4 4 8-10" className="text-signal-500" />
        <path d="M108 58h44" />
        <rect x="83" y="79" width="12" height="12" />
        <path d="M85 85l4 4 8-10" className="text-signal-500" />
        <path d="M108 85h34" />
        <path d="M83 116c19-3 25-18 39-20 12-2 18 7 34-15" className="text-signal-500" />
        <path d="M149 82l8-2-1 8" className="text-signal-500" />
      </svg>
    );
  }

  if (factor === "machine") {
    return (
      <svg {...sharedProps}>
        <circle cx="48" cy="80" r="25" />
        <rect x="39" y="71" width="18" height="18" rx="2" />
        <path d="M73 68h22v24H73" />
        <rect x="95" y="58" width="82" height="44" rx="4" />
        <rect x="108" y="68" width="34" height="18" rx="2" />
        <path d="M113 80l7-6 6 4 10-8" className="text-signal-500" />
        <path d="M153 70h13M153 78h13M153 86h8" opacity="0.55" />
        <path d="M177 67h27c8 0 14 6 14 13s-6 13-14 13h-27" />
        <path d="M187 72v16M195 72v16M203 72v16" opacity="0.35" />
        <path d="M28 119h190" opacity="0.25" />
      </svg>
    );
  }

  return (
    <svg {...sharedProps}>
      <path d="M35 61h170v29H35z" />
      <path d="M35 96h170v29H35z" />
      <path d="M35 90h170M35 96h170" opacity="0.18" />
      <path d="M35 76h66M139 76h66M35 111h68M141 111h64" opacity="0.22" />

      <path d="M103 24h34l10 12-10 12h-34L93 36z" />
      <path d="M108 48v77h24V48" />
      <path d="M99 55h42" opacity="0.45" />
      <path d="M101 125h38l9 11-9 11h-38l-9-11z" />

      <path d="M101 61v29M139 61v29" opacity="0.35" />
      <path d="M103 96v29M141 96v29" opacity="0.35" />
      <path d="M98 84h9M98 102h9" className="text-signal-500" />
      <path d="M98 84l4-4M98 84l4 4M98 102l4-4M98 102l4 4" className="text-signal-500" />

      <path d="M166 61l-8 10 10 7-7 9 12 9-7 9" className="text-signal-500" />
      <path d="M111 105l17 8M111 113l17 8M112 121l14 6" opacity="0.45" />
      <path d="M120 8v144" strokeDasharray="3 7" opacity="0.16" />
      <path
        d="M201 38c0 9-6 15-14 15-7 0-12-5-12-12 0-8 12-21 12-21s14 11 14 18z"
        className="text-signal-500"
      />
      <path d="M181 42c1 3 4 5 7 5" className="text-signal-500" />
      <path d="M135 105c3 2 4 5 4 8" className="text-signal-500" />
    </svg>
  );
}

export function TohnichiFourMOverview({ lang }: { lang: Language }) {
  return (
    <section
      className="mt-14 lg:mt-18"
      aria-labelledby="tohnichi-four-m-title"
    >
      <div className="border-b border-graphite-900/15 pb-4">
        <h3
          id="tohnichi-four-m-title"
          className="mt-2 text-xl font-bold leading-tight text-graphite-900 sm:text-2xl"
        >
          {lang === "en" ? "Sources of tightening defects" : "Penyebab defect tightening"}
        </h3>
      </div>

      <ol className="grid grid-cols-2 gap-x-5 gap-y-8 pt-6 sm:gap-x-8 lg:grid-cols-4">
        {fourMFactors.map((factor) => {
          return (
            <li key={factor.id} className="min-w-0">
              <div className="flex aspect-[4/3] items-center justify-center bg-[#f3f1ec] px-1 text-industrial-700 sm:px-3">
                <FourMVisualization
                  factor={factor.id}
                  label={`${factor.name}: ${text(factor.caption, lang)}`}
                />
              </div>

              <div className="mt-3 border-t border-graphite-900/15 pt-3">
                <h4 className="text-base font-bold uppercase tracking-[0.08em] text-graphite-900 sm:text-lg">
                  {factor.name}
                </h4>
                <p className="mt-1 text-xs leading-5 text-graphite-500 sm:text-sm">
                  {text(factor.caption, lang)}
                </p>

                <ul className="mt-3 space-y-1.5 border-t border-graphite-900/10 pt-3">
                  {factor.details.map((detail) => (
                    <li
                      key={detail.en}
                      className="grid grid-cols-[auto_1fr] gap-2 text-[11px] leading-4 text-graphite-700 sm:text-xs sm:leading-5"
                    >
                      <span className="mt-[0.45em] h-1.5 w-1.5 bg-signal-500" aria-hidden="true" />
                      <span>{text(detail, lang)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
