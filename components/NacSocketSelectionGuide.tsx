"use client";

import Image from "next/image";
import { ArrowDown, Check, Magnet, MoveDown, Ruler, Search, Wrench } from "lucide-react";
import { useMemo, useState } from "react";
import type { Language } from "@/lib/i18n";

type DriveKey = "6.35" | "9.52" | "12.7" | "19.0" | "25.4" | "large";
type ProfileKey = "hex6" | "hex12" | "internal" | "special";
type AccessKey = "mini" | "standard" | "deep" | "extension" | "angled";
type RetentionKey = "none" | "bolt" | "bolt-nut";
type FamilyKey = "mini" | "standard" | "deep" | "magnetic" | "special";

type Selection = {
  familyKey: FamilyKey;
  title: string;
  pages: string;
  note: string;
};

const driveOptions: Array<{ value: DriveKey; id: string; en: string; short: string }> = [
  { value: "6.35", id: "1/4 inci - 6,35 mm", en: "1/4 inch - 6.35 mm", short: "1/4\"" },
  { value: "9.52", id: "3/8 inci - 9,52 mm", en: "3/8 inch - 9.52 mm", short: "3/8\"" },
  { value: "12.7", id: "1/2 inci - 12,7 mm", en: "1/2 inch - 12.7 mm", short: "1/2\"" },
  { value: "19.0", id: "3/4 inci - 19,0 mm", en: "3/4 inch - 19.0 mm", short: "3/4\"" },
  { value: "25.4", id: "1 inci - 25,4 mm", en: "1 inch - 25.4 mm", short: "1\"" },
  { value: "large", id: "Large drive - 15,9-63,5 mm", en: "Large drive - 15.9-63.5 mm", short: "Large" }
];

const profileOptions: Array<{ value: ProfileKey; id: string; en: string }> = [
  { value: "hex6", id: "External hex - 6PT", en: "External hex - 6PT" },
  { value: "hex12", id: "External hex - 12PT", en: "External hex - 12PT" },
  { value: "internal", id: "Internal hex", en: "Internal hex" },
  { value: "special", id: "Thread, tap, weld nut, atau khusus", en: "Thread, tap, weld nut, or special" }
];

const accessOptions: Array<{ value: AccessKey; id: string; en: string }> = [
  { value: "mini", id: "Outside clearance minimum", en: "Minimum outside clearance" },
  { value: "standard", id: "Standard reach", en: "Standard reach" },
  { value: "deep", id: "Fastener recessed / stud panjang", en: "Recessed fastener / exposed stud" },
  { value: "extension", id: "Axial reach panjang", en: "Long axial reach" },
  { value: "angled", id: "Akses bersudut", en: "Angled access" }
];

const retentionOptions: Array<{ value: RetentionKey; id: string; en: string }> = [
  { value: "none", id: "Tanpa magnetic retention", en: "No magnetic retention" },
  { value: "bolt", id: "Menahan bolt saja", en: "Hold a bolt only" },
  { value: "bolt-nut", id: "Menahan bolt atau nut + stud clearance", en: "Hold bolt or nut + stud clearance" }
];

const familyOptions: Array<{ key: FamilyKey; id: string; en: string; detailId: string; detailEn: string }> = [
  { key: "mini", id: "Mini", en: "Mini", detailId: "Outside clearance sempit", detailEn: "Tight outside clearance" },
  { key: "standard", id: "Standard", en: "Standard", detailId: "Reach normal", detailEn: "Normal reach" },
  { key: "deep", id: "Deep / extension", en: "Deep / extension", detailId: "Recess atau reach panjang", detailEn: "Recess or long reach" },
  { key: "magnetic", id: "MP / MS / MT", en: "MP / MS / MT", detailId: "Menahan fastener", detailEn: "Fastener retention" },
  { key: "special", id: "Universal / khusus", en: "Universal / special", detailId: "Sudut atau working end khusus", detailEn: "Angle or special working end" }
];

function localized(lang: Language, id: string, en: string) {
  return lang === "en" ? en : id;
}

function optionLabel<T extends { id: string; en: string }>(option: T, lang: Language) {
  return localized(lang, option.id, option.en);
}

function resolveSelection(
  drive: DriveKey,
  profile: ProfileKey,
  access: AccessKey,
  retention: RetentionKey,
  lang: Language
): Selection {
  const driveName = driveOptions.find((option) => option.value === drive)?.short ?? drive;
  const baseNote = localized(
    lang,
    "Filter tabel model berdasarkan H, D1, D2, dan L sebelum mengonfirmasi part number.",
    "Filter the model table by H, D1, D2, and L before confirming the part number."
  );
  const standardPages: Record<DriveKey, string> = {
    "6.35": "P2",
    "9.52": "P3",
    "12.7": "P7",
    "19.0": "P15",
    "25.4": "P15",
    large: "P17"
  };

  let result: Selection = {
    familyKey: "standard",
    title: `${driveName} ${localized(lang, "standard socket - single hex", "standard socket - single hex")}`,
    pages: standardPages[drive],
    note: baseNote
  };

  if (profile === "special") {
    result = {
      familyKey: "special",
      title: localized(lang, "Special-purpose socket", "Special-purpose socket"),
      pages: "P13-P14",
      note: localized(
        lang,
        "Pilih tabel tap holding, stud bolt, weld nut, atau working end khusus yang sesuai.",
        "Choose the matching tap-holding, stud-bolt, weld-nut, or special working-end table."
      )
    };
  } else if (profile === "internal") {
    result = {
      familyKey: "special",
      title: `${driveName} ${localized(lang, "hexagon wrench socket", "hexagon wrench socket")}`,
      pages: drive === "19.0" || drive === "25.4" ? "P16" : "P11",
      note: localized(
        lang,
        "Gunakan H sebagai ukuran internal hex, lalu verifikasi D2 dan panjang L.",
        "Use H as the internal-hex size, then verify D2 and overall length L."
      )
    };
  } else if (access === "angled") {
    result = {
      familyKey: "special",
      title: localized(lang, "Universal atau universal-extension socket", "Universal or universal-extension socket"),
      pages: "P12",
      note: localized(
        lang,
        "Katalog mencantumkan swivel sekitar 15 derajat; verifikasi drive, H, D1, D2, dan L.",
        "The catalog lists approximately 15 degrees of swivel; verify drive, H, D1, D2, and L."
      )
    };
  } else if (retention === "bolt") {
    const body = access === "extension" ? "extension" : access === "deep" ? "deep" : access === "mini" ? "mini" : "standard";
    result = {
      familyKey: "magnetic",
      title: `${driveName} MP ${body} socket`,
      pages: drive === "12.7" ? "P9" : drive === "9.52" ? "P5" : localized(lang, "Verifikasi", "Verify"),
      note: localized(
        lang,
        "MP memakai magnet fixed dan dirancang khusus untuk bolt.",
        "MP uses a fixed magnet and is designed for bolts only."
      )
    };
  } else if (retention === "bolt-nut") {
    const body = access === "extension" ? "extension" : access === "deep" ? "deep" : "socket";
    result = {
      familyKey: "magnetic",
      title: `${driveName} MS floating / MT tube ${body}`,
      pages: drive === "12.7" ? "P10" : drive === "9.52" ? "P6" : localized(lang, "Verifikasi", "Verify"),
      note: localized(
        lang,
        "MS dan MT memberi bolt clearance; bandingkan geometri magnet serta ukuran model yang tersedia.",
        "MS and MT provide bolt clearance; compare magnet geometry and available model sizes."
      )
    };
  } else if (profile === "hex12") {
    result = {
      familyKey: "standard",
      title: `${driveName} ${localized(lang, "standard socket - double hex 12PT", "standard socket - double hex 12PT")}`,
      pages: drive === "12.7" ? "P7" : drive === "9.52" ? "P3" : localized(lang, "Custom / verifikasi", "Custom / verify"),
      note: localized(
        lang,
        "Model 12PT katalog tersedia pada drive 3/8 dan 1/2 inci tertentu; verifikasi ukuran H.",
        "Catalog 12PT models are available for selected 3/8- and 1/2-inch drives; verify the H size."
      )
    };
  } else if (access === "mini") {
    result = {
      familyKey: "mini",
      title: `${driveName} ${localized(lang, "mini socket - single hex", "mini socket - single hex")}`,
      pages: drive === "12.7" ? "P7" : drive === "9.52" ? "P3" : localized(lang, "Verifikasi", "Verify"),
      note: baseNote
    };
  } else if (access === "deep" || access === "extension") {
    const isExtension = access === "extension";
    result = {
      familyKey: "deep",
      title: `${driveName} ${localized(lang, isExtension ? "extension socket - single hex" : "deep socket - single hex", isExtension ? "extension socket - single hex" : "deep socket - single hex")}`,
      pages:
        drive === "6.35"
          ? isExtension
            ? localized(lang, "Verifikasi", "Verify")
            : "P2"
          : drive === "9.52"
            ? "P4"
            : drive === "12.7"
              ? "P8"
              : drive === "19.0" || drive === "25.4"
                ? isExtension
                  ? localized(lang, "Verifikasi", "Verify")
                  : "P16"
                : localized(lang, "Verifikasi", "Verify"),
      note: baseNote
    };
  }

  if ((drive === "19.0" || drive === "25.4" || drive === "large") && retention !== "none") {
    result.pages = localized(lang, "Custom / verifikasi", "Custom / verify");
    result.note = localized(
      lang,
      "Keluarga MP/MS/MT ditampilkan untuk drive 3/8 dan 1/2 inci; konfirmasikan opsi custom untuk drive lebih besar.",
      "MP/MS/MT families are shown for 3/8- and 1/2-inch drives; confirm a custom option for the larger drive."
    );
  }

  if (drive === "large" && (profile !== "hex6" || access !== "standard" || retention !== "none")) {
    result.pages = localized(lang, "Custom / verifikasi", "Custom / verify");
    result.note = localized(
      lang,
      "P17 mencantumkan large-drive standard single-hex; kombinasi lain perlu dikonfirmasi dengan CSE.",
      "P17 lists large-drive standard single-hex sockets; other combinations need confirmation with CSE."
    );
  }

  return result;
}

export function NacSocketSelectionGuide({ lang }: { lang: Language }) {
  const [drive, setDrive] = useState<DriveKey>("9.52");
  const [profile, setProfile] = useState<ProfileKey>("hex6");
  const [access, setAccess] = useState<AccessKey>("standard");
  const [retention, setRetention] = useState<RetentionKey>("none");
  const selection = useMemo(
    () => resolveSelection(drive, profile, access, retention, lang),
    [access, drive, lang, profile, retention]
  );

  const selectedDrive = driveOptions.find((option) => option.value === drive);
  const selectedProfile = profileOptions.find((option) => option.value === profile);
  const selectedAccess = accessOptions.find((option) => option.value === access);
  const selectedRetention = retentionOptions.find((option) => option.value === retention);
  const steps = [
    {
      label: localized(lang, "Cocokkan tool", "Match the tool"),
      value: selectedDrive ? optionLabel(selectedDrive, lang) : drive,
      icon: Wrench
    },
    {
      label: localized(lang, "Cocokkan fastener", "Match the fastener"),
      value: selectedProfile ? optionLabel(selectedProfile, lang) : profile,
      icon: Search
    },
    {
      label: localized(lang, "Periksa akses", "Check access"),
      value: selectedAccess ? optionLabel(selectedAccess, lang) : access,
      icon: MoveDown
    },
    {
      label: localized(lang, "Pilih retention", "Choose retention"),
      value: selectedRetention ? optionLabel(selectedRetention, lang) : retention,
      icon: Magnet
    }
  ];

  return (
    <section id="socket-selection-guide" className="border-y border-graphite-200 bg-white py-14">
      <div className="container-page">
        <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-signal-600">
              {localized(lang, "Alur pemilihan socket", "Socket selection flow")}
            </p>
            <h2 className="mt-3 text-balance text-3xl font-bold text-graphite-900 md:text-4xl">
              {localized(lang, "Tentukan kategori sebelum mencari part number.", "Choose the family before finding a part number.")}
            </h2>
          </div>
        </div>

        <div className="mt-8 grid gap-4 border border-graphite-200 bg-graphite-50 p-5 sm:grid-cols-2 lg:grid-cols-4 lg:p-6">
          <label className="text-sm font-bold text-graphite-800">
            {localized(lang, "Square drive tool", "Tool square drive")}
            <select
              value={drive}
              onChange={(event) => setDrive(event.target.value as DriveKey)}
              className="focus-ring mt-2 min-h-11 w-full border border-graphite-300 bg-white px-3 py-2 text-sm font-medium text-graphite-800"
            >
              {driveOptions.map((option) => (
                <option key={option.value} value={option.value}>{optionLabel(option, lang)}</option>
              ))}
            </select>
          </label>

          <label className="text-sm font-bold text-graphite-800">
            {localized(lang, "Profil fastener", "Fastener profile")}
            <select
              value={profile}
              onChange={(event) => setProfile(event.target.value as ProfileKey)}
              className="focus-ring mt-2 min-h-11 w-full border border-graphite-300 bg-white px-3 py-2 text-sm font-medium text-graphite-800"
            >
              {profileOptions.map((option) => (
                <option key={option.value} value={option.value}>{optionLabel(option, lang)}</option>
              ))}
            </select>
          </label>

          <label className="text-sm font-bold text-graphite-800">
            {localized(lang, "Body dan reach", "Body and reach")}
            <select
              value={access}
              onChange={(event) => setAccess(event.target.value as AccessKey)}
              className="focus-ring mt-2 min-h-11 w-full border border-graphite-300 bg-white px-3 py-2 text-sm font-medium text-graphite-800"
            >
              {accessOptions.map((option) => (
                <option key={option.value} value={option.value}>{optionLabel(option, lang)}</option>
              ))}
            </select>
          </label>

          <label className="text-sm font-bold text-graphite-800">
            {localized(lang, "Retention", "Retention")}
            <select
              value={retention}
              onChange={(event) => setRetention(event.target.value as RetentionKey)}
              className="focus-ring mt-2 min-h-11 w-full border border-graphite-300 bg-white px-3 py-2 text-sm font-medium text-graphite-800"
            >
              {retentionOptions.map((option) => (
                <option key={option.value} value={option.value}>{optionLabel(option, lang)}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="relative mt-8">
          <div className="absolute left-[12.5%] right-[12.5%] top-5 hidden h-px bg-graphite-300 lg:block" aria-hidden="true" />
          <ol className="relative grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <li key={step.label} className="border border-graphite-200 bg-white p-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="relative inline-flex h-10 w-10 shrink-0 items-center justify-center bg-industrial-800 text-white">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                      <span className="sr-only">{index + 1}</span>
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-bold uppercase tracking-[0.1em] text-signal-600">
                        {index + 1}. {step.label}
                      </p>
                      <p className="mt-1 text-sm font-semibold leading-5 text-graphite-800">{step.value}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
          <ArrowDown className="mx-auto mt-4 h-6 w-6 text-industrial-700" aria-hidden="true" />
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {familyOptions.map((family) => {
            const isActive = family.key === selection.familyKey;
            return (
              <div
                key={family.key}
                className={`border-t-4 px-3 py-4 text-center transition ${
                  isActive
                    ? "border-signal-500 bg-[#fff8f6] text-graphite-900"
                    : "border-graphite-200 bg-graphite-50 text-graphite-500"
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  {isActive ? <Check className="h-4 w-4 text-signal-600" aria-hidden="true" /> : null}
                  <p className="text-sm font-bold">{optionLabel(family, lang)}</p>
                </div>
                <p className="mt-1 text-xs leading-5">{localized(lang, family.detailId, family.detailEn)}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-5 grid gap-5 bg-industrial-800 p-5 text-white md:grid-cols-[1fr_auto] md:items-center md:p-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-industrial-100">
              {localized(lang, "Rekomendasi keluarga katalog", "Recommended catalog family")}
            </p>
            <h3 className="mt-2 text-xl font-bold">{selection.title}</h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-industrial-50">{selection.note}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3 md:justify-end">
            <span className="border border-white/25 px-3 py-2 text-sm font-bold">{selection.pages}</span>
            <a
              href="#catalogue-model-options"
              className="focus-ring inline-flex min-h-11 items-center justify-center bg-white px-4 py-2 text-sm font-bold text-industrial-800 hover:bg-industrial-50"
            >
              {localized(lang, "Lihat tabel katalog", "View catalog tables")}
            </a>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.78fr_1.22fr]">
          <figure className="border border-graphite-200 bg-white">
            <div className="border-b border-graphite-200 px-5 py-4">
              <div className="flex items-center gap-3">
                <Ruler className="h-5 w-5 text-signal-600" aria-hidden="true" />
                <h3 className="text-lg font-bold text-graphite-900">
                  {localized(lang, "Baca dimensi socket", "Read the socket dimensions")}
                </h3>
              </div>
            </div>
            <div className="bg-white p-4">
              <Image
                src="/assets/brands/products/nac/catalog-socket-dimensions.png"
                alt={localized(
                  lang,
                  "Diagram katalog NAC untuk bentuk A, B, C serta dimensi L, H, D1, D2, dan square drive",
                  "NAC catalog diagram showing types A, B, and C with L, H, D1, D2, and square-drive dimensions"
                )}
                width={1138}
                height={720}
                sizes="(max-width: 1024px) 100vw, 44vw"
                className="h-auto w-full"
              />
            </div>
            <figcaption className="grid grid-cols-2 gap-x-4 gap-y-2 border-t border-graphite-200 px-5 py-4 text-xs leading-5 text-graphite-600">
              <span><strong className="text-graphite-900">H</strong> - {localized(lang, "ukuran fastener", "fastener size")}</span>
              <span><strong className="text-graphite-900">L</strong> - {localized(lang, "panjang keseluruhan", "overall length")}</span>
              <span><strong className="text-graphite-900">D1</strong> - {localized(lang, "diameter working end", "working-end diameter")}</span>
              <span><strong className="text-graphite-900">D2 / Sq</strong> - {localized(lang, "sisi tool", "tool side")}</span>
            </figcaption>
          </figure>

          <figure className="border border-graphite-200 bg-white">
            <div className="border-b border-graphite-200 px-5 py-4">
              <div className="flex items-center gap-3">
                <Magnet className="h-5 w-5 text-signal-600" aria-hidden="true" />
                <h3 className="text-lg font-bold text-graphite-900">
                  {localized(lang, "Pilih magnetic retention", "Choose magnetic retention")}
                </h3>
              </div>
            </div>
            <div className="bg-white p-4">
              <Image
                src="/assets/brands/products/nac/catalog-magnetic-types-mp-ms-mt.png"
                alt={localized(
                  lang,
                  "Diagram asli katalog NAC yang membandingkan MP fixed, MS floating, dan MT tube magnetic sockets",
                  "Original NAC catalog diagram comparing MP fixed, MS floating, and MT tube magnetic sockets"
                )}
                width={2088}
                height={805}
                sizes="(max-width: 1024px) 100vw, 62vw"
                className="h-auto w-full"
              />
            </div>
            <figcaption className="grid gap-px border-t border-graphite-200 bg-graphite-200 sm:grid-cols-3">
              <div className="bg-white p-4">
                <p className="text-sm font-bold text-graphite-900">MP - Fixed</p>
                <p className="mt-1 text-xs leading-5 text-graphite-600">{localized(lang, "Bolt saja; tanpa stud clearance.", "Bolt only; no stud clearance.")}</p>
              </div>
              <div className="bg-white p-4">
                <p className="text-sm font-bold text-graphite-900">MS - Floating</p>
                <p className="mt-1 text-xs leading-5 text-graphite-600">{localized(lang, "Bolt atau nut; magnet bergeser untuk clearance.", "Bolt or nut; the magnet slides for clearance.")}</p>
              </div>
              <div className="bg-white p-4">
                <p className="text-sm font-bold text-graphite-900">MT - Tube</p>
                <p className="mt-1 text-xs leading-5 text-graphite-600">{localized(lang, "Bolt atau nut; tube magnet memberi clearance.", "Bolt or nut; the tube magnet provides clearance.")}</p>
              </div>
            </figcaption>
          </figure>
        </div>

        <div className="mt-10">
          <h3 className="text-lg font-bold text-graphite-900">
            {localized(lang, "Kelompokkan tabel website mengikuti katalog", "Group the website tables like the catalog")}
          </h3>
          <div className="mt-4 grid gap-1 sm:grid-cols-[1fr_4fr_4fr_4fr_3fr]">
            {[
              ["P2", "1/4\""],
              ["P3-P6", "3/8\""],
              ["P7-P10", "1/2\""],
              ["P11-P14", localized(lang, "Khusus", "Specialty")],
              ["P15-P17", "3/4\"-2 1/2\""]
            ].map(([pages, label], index) => (
              <div
                key={pages}
                className={`border-t-4 px-3 py-4 text-center ${
                  index % 2 === 0 ? "border-industrial-700 bg-industrial-50" : "border-signal-500 bg-[#fff8f6]"
                }`}
              >
                <p className="text-sm font-bold text-graphite-900">{pages}</p>
                <p className="mt-1 text-xs text-graphite-600">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
