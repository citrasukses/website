"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowDown,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Clock3,
  FileText,
  Flag,
  Gauge,
  LifeBuoy,
  ListChecks,
  Play,
  Radio,
  RotateCcw,
  ShieldAlert,
  Wrench,
  Zap
} from "lucide-react";
import type { GuideFlowDefinition, GuideFlowMedia } from "@/data/guideflows/types";
import { text, type Language, withLang } from "@/lib/i18n";

const taskIcons = [Wrench, Zap, LifeBuoy] as const;

function scrollToId(id: string) {
  window.requestAnimationFrame(() => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

function GuideMedia({ media, lang }: { media: GuideFlowMedia; lang: Language }) {
  const hotspot = media.hotspot;

  return (
    <figure className="overflow-hidden border border-graphite-200 bg-white">
      <div className="relative aspect-[16/10] overflow-hidden bg-graphite-50">
        {media.type === "video" ? (
          <video
            className={`h-full w-full ${media.fit === "cover" ? "object-cover" : "object-contain"}`}
            controls
            muted
            playsInline
            preload="metadata"
          >
            <source src={media.src} />
          </video>
        ) : (
          <Image
            src={media.src}
            alt={text(media.alt, lang)}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 54vw"
            className={media.fit === "cover" ? "object-cover" : "object-contain p-6 sm:p-10"}
          />
        )}

        {hotspot ? (
          <div
            className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
            aria-hidden="true"
          >
            <span className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal-500/25 motion-safe:animate-ping motion-reduce:animate-none" />
            <span className="relative block h-7 w-7 rounded-full border-[5px] border-white bg-signal-500 shadow-[0_0_0_2px_rgba(21,26,34,0.3)]" />
            <span
              className={`absolute top-1/2 w-max max-w-44 -translate-y-1/2 bg-graphite-900 px-3 py-2 text-[10px] font-black uppercase tracking-[0.12em] text-white shadow-lg ${
                hotspot.align === "left" ? "right-10 text-right" : "left-10"
              }`}
            >
              {text(hotspot.label, lang)}
            </span>
          </div>
        ) : null}
      </div>
      {media.note ? (
        <figcaption className="flex gap-2 border-t border-graphite-200 bg-amber-50 px-4 py-3 text-xs font-semibold leading-5 text-amber-950">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" aria-hidden="true" />
          {text(media.note, lang)}
        </figcaption>
      ) : null}
    </figure>
  );
}

export function GuideFlowRunner({ guide, lang }: { guide: GuideFlowDefinition; lang: Language }) {
  const [currentStepId, setCurrentStepId] = useState(guide.steps[0]?.id ?? "");
  const [hasStarted, setHasStarted] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [selectedIssueId, setSelectedIssueId] = useState<string | null>(null);
  const [completedStepIds, setCompletedStepIds] = useState<string[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const issueById = useMemo(
    () => new Map(guide.issues.map((issue) => [issue.id, issue])),
    [guide.issues]
  );
  const currentIndex = Math.max(0, guide.steps.findIndex((step) => step.id === currentStepId));
  const currentStep = guide.steps[currentIndex];
  const currentStageIndex = Math.max(
    0,
    guide.stages.findIndex((stage) => stage.id === currentStep?.stageId)
  );
  const currentStage = guide.stages[currentStageIndex];
  const selectedIssue = selectedIssueId ? issueById.get(selectedIssueId) : undefined;
  const progress = isFinished ? 100 : ((currentIndex + 1) / guide.steps.length) * 100;
  const HeroConnectorIcon = guide.presentation.hero.connectorIcon === "radio" ? Radio : Gauge;
  const contactPath = `/contact?topic=${encodeURIComponent(guide.presentation.contactTopic)}`;

  if (!currentStep || !currentStage) return null;

  function startTask(startStepId?: string, issueId?: string) {
    const nextStepId = startStepId ?? guide.steps[0]?.id;
    if (!nextStepId) return;
    setCurrentStepId(nextStepId);
    setCompletedStepIds([]);
    setIsFinished(false);
    setHasStarted(true);
    setHelpOpen(Boolean(issueId));
    setSelectedIssueId(issueId ?? null);
    scrollToId(issueId ? "guideflow-fix-path" : "guideflow-runner");
  }

  function chooseStep(stepId: string) {
    setCurrentStepId(stepId);
    setHelpOpen(false);
    setSelectedIssueId(null);
    setIsFinished(false);
    scrollToId("guideflow-runner");
  }

  function completeCurrentStep() {
    setCompletedStepIds((completed) =>
      completed.includes(currentStep.id) ? completed : [...completed, currentStep.id]
    );
    setHelpOpen(false);
    setSelectedIssueId(null);

    const nextStep = guide.steps[currentIndex + 1];
    if (nextStep) {
      setCurrentStepId(nextStep.id);
      scrollToId("guideflow-runner");
      return;
    }

    setIsFinished(true);
    scrollToId("guideflow-runner");
  }

  function openIssue(issueId: string) {
    setSelectedIssueId(issueId);
    scrollToId("guideflow-fix-path");
  }

  function resumeStep() {
    setSelectedIssueId(null);
    setHelpOpen(false);
    scrollToId("guideflow-runner");
  }

  function restart() {
    setCurrentStepId(guide.steps[0]?.id ?? "");
    setCompletedStepIds([]);
    setSelectedIssueId(null);
    setHelpOpen(false);
    setIsFinished(false);
    setHasStarted(true);
    scrollToId("guideflow-runner");
  }

  return (
    <main className="bg-graphite-50">
      <section className="border-y border-graphite-200 bg-graphite-900 text-white">
        <div className="container-page grid gap-8 py-9 lg:grid-cols-[1.12fr_0.88fr] lg:items-center">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-[10px] font-black uppercase tracking-[0.16em]">
            </div>
            <h1 className="mt-5 max-w-4xl text-4xl font-black leading-[1.04] tracking-tight md:text-5xl">
              {text(guide.title, lang)}
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-white/70">{text(guide.description, lang)}</p>
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-xs font-bold text-white/65">
              <span className="inline-flex items-center gap-2"><Clock3 className="h-4 w-4 text-signal-500" aria-hidden="true" />{text(guide.estimatedTime, lang)}</span>
              <span className="inline-flex items-center gap-2"><ListChecks className="h-4 w-4 text-signal-500" aria-hidden="true" />{guide.steps.length} {lang === "en" ? "guided steps" : "guided step"}</span>
              <span className="inline-flex items-center gap-2"><FileText className="h-4 w-4 text-signal-500" aria-hidden="true" />{lang === "en" ? "Manual-linked" : "Terhubung ke manual"}</span>
            </div>
          </div>

          <div className="border border-white/15 bg-white/[0.04] p-5">
            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-signal-500">
              {text(guide.presentation.hero.label, lang)}
            </p>
            <p className="mt-3 text-sm font-semibold leading-6 text-white/85">{text(guide.scope, lang)}</p>
            <div className="mt-5 grid grid-cols-[1fr_auto_1fr] items-center gap-3" aria-label={text(guide.presentation.hero.ariaLabel, lang)}>
              <div className="relative aspect-[16/7] bg-white p-2">
                <Image src={guide.presentation.hero.leftImage.src} alt={text(guide.presentation.hero.leftImage.alt, lang)} fill sizes="220px" className="object-contain p-2" priority />
              </div>
              <div className="grid justify-items-center gap-1 text-signal-500">
                <HeroConnectorIcon className="h-5 w-5" aria-hidden="true" />
                <span className="text-center text-[9px] font-black uppercase tracking-[0.08em]">{text(guide.presentation.hero.connectorLabel, lang)}</span>
              </div>
              <div className="relative aspect-[16/7] bg-white p-2">
                <Image src={guide.presentation.hero.rightImage.src} alt={text(guide.presentation.hero.rightImage.alt, lang)} fill sizes="220px" className="object-contain p-2" priority />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-graphite-200 bg-white py-10">
        <div className="container-page">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-signal-600">
                {lang === "en" ? "Choose a task" : "Pilih yang ingin dilakukan"}
              </p>
              <h2 className="mt-2 text-3xl font-black text-graphite-900">
                {lang === "en" ? "What do you need to do?" : "Apa yang ingin Anda lakukan?"}
              </h2>
            </div>
          </div>
          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {guide.tasks.map((task, index) => {
              const Icon = taskIcons[index] ?? Play;
              return (
                <button
                  key={task.id}
                  type="button"
                  onClick={() => startTask(task.startStepId, task.issueId)}
                  className="focus-ring group flex min-h-36 items-start gap-4 border border-graphite-200 bg-white p-5 text-left transition hover:border-industrial-600 hover:bg-graphite-50 hover:shadow-panel"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-industrial-700 text-white transition group-hover:bg-signal-500">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block font-black text-graphite-900">{text(task.title, lang)}</span>
                    <span className="mt-2 block text-sm leading-6 text-graphite-500">{text(task.description, lang)}</span>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-[0.1em] text-industrial-700">
                      {task.issueId ? (lang === "en" ? "Open Fix Path" : "Buka Fix Path") : (lang === "en" ? "Start" : "Mulai")}
                      <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section id="guideflow-runner" className="scroll-mt-24 py-12 lg:py-16">
        <div className="container-page">
          {!hasStarted ? (
            <div className="grid gap-6 border border-graphite-200 bg-white p-6 shadow-panel md:grid-cols-[0.72fr_1.28fr] md:p-8">
              <div>
                <span className="flex h-12 w-12 items-center justify-center bg-graphite-900 text-white"><Flag className="h-5 w-5" aria-hidden="true" /></span>
                <h2 className="mt-5 text-3xl font-black text-graphite-900">{lang === "en" ? "Before you start" : "Sebelum mulai"}</h2>
                <p className="mt-3 text-sm leading-6 text-graphite-500">{lang === "en" ? "Prepare these items, then choose a task above." : "Siapkan item berikut, lalu pilih task di atas."}</p>
              </div>
              <ul className="grid gap-3 sm:grid-cols-2">
                {guide.prerequisites.map((item) => (
                  <li key={item.en} className="flex gap-3 border border-graphite-200 bg-graphite-50 p-4 text-sm font-semibold leading-6 text-graphite-700">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
                    {text(item, lang)}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="overflow-hidden border border-graphite-200 bg-white shadow-panel">
              <div className="border-b border-graphite-200 bg-graphite-900 px-5 py-4 text-white sm:px-7">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-black">{text(currentStage.title, lang)}</p>
                  </div>
                  <p className="text-xs font-bold text-white/60">
                    {lang === "en" ? `Step ${currentIndex + 1} of ${guide.steps.length}` : `Step ${currentIndex + 1} dari ${guide.steps.length}`}
                  </p>
                </div>
                <div className="mt-4 h-1.5 bg-white/15" role="progressbar" aria-label={lang === "en" ? "Guide progress" : "Progress guide"} aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress)}>
                  <div className="h-full bg-signal-500 transition-[width] duration-300 motion-reduce:transition-none" style={{ width: `${progress}%` }} />
                </div>
              </div>

              <div className="grid lg:grid-cols-[230px_minmax(0,1fr)]">
                <aside className="border-b border-graphite-200 bg-graphite-50 p-4 lg:border-b-0 lg:border-r lg:p-5" aria-label={lang === "en" ? "Guide stages" : "Stage guide"}>
                  <ol className="grid grid-cols-2 gap-2 sm:grid-cols-5 lg:grid-cols-1">
                    {guide.stages.map((stage, stageIndex) => {
                      const firstStep = guide.steps.find((step) => step.stageId === stage.id);
                      const stageComplete = guide.steps
                        .filter((step) => step.stageId === stage.id)
                        .every((step) => completedStepIds.includes(step.id));
                      const active = stage.id === currentStage.id && !isFinished;
                      return (
                        <li key={stage.id}>
                          <button
                            type="button"
                            disabled={!firstStep}
                            onClick={() => firstStep && chooseStep(firstStep.id)}
                            className={`focus-ring flex min-h-14 w-full items-center gap-3 border px-3 py-2 text-left text-xs font-bold transition ${
                              active
                                ? "border-industrial-700 bg-industrial-700 text-white"
                                : "border-graphite-200 bg-white text-graphite-700 hover:border-industrial-500"
                            }`}
                            aria-current={active ? "step" : undefined}
                          >
                            <span className={`flex h-7 w-7 shrink-0 items-center justify-center text-[10px] ${active ? "bg-white text-industrial-700" : stageComplete ? "bg-emerald-600 text-white" : "bg-graphite-100 text-graphite-700"}`}>
                              {stageComplete ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : stageIndex + 1}
                            </span>
                            <span>{text(stage.title, lang)}</span>
                          </button>
                        </li>
                      );
                    })}
                  </ol>
                </aside>

                <div className="min-w-0">
                  {isFinished ? (
                    <div className="grid min-h-[620px] place-items-center p-7 text-center">
                      <div className="max-w-xl">
                        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700"><CheckCircle2 className="h-8 w-8" aria-hidden="true" /></span>
                        <p className="mt-6 text-xs font-black uppercase tracking-[0.18em] text-emerald-700">{text(guide.presentation.completion.eyebrow, lang)}</p>
                        <h2 className="mt-3 text-4xl font-black text-graphite-900">{text(guide.presentation.completion.title, lang)}</h2>
                        <p className="mt-4 text-base leading-7 text-graphite-500">{text(guide.presentation.completion.body, lang)}</p>
                        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                          <button type="button" onClick={restart} className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 bg-industrial-700 px-5 text-sm font-bold text-white hover:bg-industrial-800"><RotateCcw className="h-4 w-4" aria-hidden="true" />{lang === "en" ? "Restart guide" : "Ulangi guide"}</button>
                          <Link href={withLang(contactPath, lang)} className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 border border-graphite-300 bg-white px-5 text-sm font-bold text-graphite-800 hover:border-signal-500"><LifeBuoy className="h-4 w-4" aria-hidden="true" />{lang === "en" ? "Ask CSE to review" : "Minta CSE review"}</Link>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-5 sm:p-7 lg:p-8" aria-live="polite">
                      <div className="grid gap-8 xl:grid-cols-[1.12fr_0.88fr] xl:items-start">
                        <GuideMedia media={currentStep.media} lang={lang} />

                        <div id={currentStep.id} className="scroll-mt-32">
                          <h2 className="text-3xl font-black leading-tight text-graphite-900">{text(currentStep.title, lang)}</h2>
                          <p className="mt-4 text-base font-semibold leading-7 text-graphite-700">{text(currentStep.instruction, lang)}</p>

                          <div className="mt-6 border-l-4 border-industrial-600 bg-blue-50 p-4">
                            <p className="text-[10px] font-black uppercase tracking-[0.14em] text-industrial-700">{lang === "en" ? "Expected result" : "Hasil yang diharapkan"}</p>
                            <p className="mt-2 text-sm font-bold leading-6 text-graphite-900">{text(currentStep.expected, lang)}</p>
                          </div>

                          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                            <button type="button" onClick={completeCurrentStep} className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 bg-emerald-700 px-5 text-sm font-black text-white transition hover:bg-emerald-800">
                              <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                              {text(currentStep.successLabel, lang)}
                            </button>
                            <button type="button" onClick={() => setHelpOpen((open) => !open)} className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 border border-signal-500 bg-white px-5 text-sm font-black text-signal-600 transition hover:bg-red-50" aria-expanded={helpOpen} aria-controls="guideflow-quick-checks">
                              <CircleHelp className="h-5 w-5" aria-hidden="true" />
                              {text(currentStep.helpLabel, lang)}
                            </button>
                          </div>

                          <div className="mt-5 flex items-center justify-between gap-3 border-t border-graphite-200 pt-5">
                            <button type="button" onClick={() => chooseStep(guide.steps[Math.max(0, currentIndex - 1)].id)} disabled={currentIndex === 0} className="focus-ring inline-flex min-h-11 items-center gap-1.5 text-sm font-bold text-graphite-500 hover:text-industrial-700 disabled:cursor-not-allowed disabled:opacity-35"><ChevronLeft className="h-4 w-4" aria-hidden="true" />{lang === "en" ? "Previous" : "Sebelumnya"}</button>
                            <button type="button" onClick={() => setHasStarted(false)} className="focus-ring text-xs font-black uppercase tracking-[0.12em] text-graphite-500 hover:text-signal-600">{lang === "en" ? "Exit to tasks" : "Kembali ke task"}</button>
                          </div>
                        </div>
                      </div>

                      {helpOpen ? (
                        <section id="guideflow-quick-checks" className="mt-8 border border-amber-300 bg-amber-50 p-5 sm:p-6">
                          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
                            <div>
                              <span className="flex h-10 w-10 items-center justify-center bg-amber-600 text-white"><ShieldAlert className="h-5 w-5" aria-hidden="true" /></span>
                              <h3 className="mt-4 text-2xl font-black text-graphite-900">{lang === "en" ? "Quick Checks" : "Pemeriksaan cepat"}</h3>
                              <p className="mt-2 text-sm leading-6 text-graphite-600">{lang === "en" ? "Check these before opening a detailed Fix Path." : "Periksa ini sebelum membuka Fix Path yang lebih detail."}</p>
                            </div>
                            <div>
                              <ol className="grid gap-2">
                                {currentStep.quickChecks.map((check, index) => (
                                  <li key={check.en} className="grid grid-cols-[2rem_1fr] gap-3 bg-white px-4 py-3 text-sm font-semibold leading-6 text-graphite-700">
                                    <span className="flex h-8 w-8 items-center justify-center bg-graphite-900 text-xs font-black text-white">{index + 1}</span>
                                    <span className="pt-1">{text(check, lang)}</span>
                                  </li>
                                ))}
                              </ol>
                              <p className="mt-5 text-[10px] font-black uppercase tracking-[0.14em] text-graphite-500">{lang === "en" ? "What happened?" : "Apa yang terjadi?"}</p>
                              <div className="mt-3 flex flex-wrap gap-2">
                                {currentStep.issueIds.map((issueId) => {
                                  const issue = issueById.get(issueId);
                                  return issue ? (
                                    <button key={issue.id} type="button" onClick={() => openIssue(issue.id)} className="focus-ring inline-flex min-h-11 items-center gap-2 border border-graphite-300 bg-white px-3 py-2 text-left text-xs font-bold text-graphite-800 transition hover:border-signal-500 hover:text-signal-600">
                                      {text(issue.label, lang)}<ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
                                    </button>
                                  ) : null;
                                })}
                              </div>
                            </div>
                          </div>
                        </section>
                      ) : null}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section id="guideflow-fix-path" className="scroll-mt-24 border-y border-graphite-200 bg-white py-12 lg:py-16">
        <div className="container-page">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-signal-600">Fix Path</p>
              <h2 className="mt-3 text-3xl font-black text-graphite-900">
                {selectedIssue ? text(selectedIssue.title, lang) : (lang === "en" ? "Troubleshooting opens here." : "Troubleshooting akan ditampilkan di bagian ini.")}
              </h2>
              <p className="mt-4 text-sm leading-7 text-graphite-500">
                {selectedIssue ? text(selectedIssue.summary, lang) : (lang === "en" ? "Choose “Not yet - help me” in a step, then select the symptom you can observe." : "Pilih tombol bantuan pada sebuah step, lalu pilih gejala yang dapat Anda lihat.")}
              </p>
              {selectedIssue ? (
                <div className="mt-6 border-l-4 border-industrial-700 bg-graphite-50 p-4 text-xs leading-5 text-graphite-600">
                  <p className="font-black text-graphite-900">{lang === "en" ? "Blocked step" : "Step yang terhenti"}</p>
                  <p className="mt-1">{text(currentStep.title, lang)} · {currentStep.manualRef}</p>
                </div>
              ) : null}
            </div>

            {selectedIssue ? (
              <div>
                <ol className="grid gap-3">
                  {selectedIssue.checks.map((check, index) => (
                    <li key={check.title.en} className="grid gap-3 border border-graphite-200 bg-graphite-50 p-5 sm:grid-cols-[3rem_0.7fr_1.3fr] sm:items-start">
                      <span className="flex h-10 w-10 items-center justify-center bg-signal-500 text-sm font-black text-white">{index + 1}</span>
                      <h3 className="font-black text-graphite-900">{text(check.title, lang)}</h3>
                      <p className="text-sm leading-6 text-graphite-600">{text(check.body, lang)}</p>
                    </li>
                  ))}
                </ol>
                <div className="mt-6 grid gap-3 border-t border-graphite-200 pt-6 sm:grid-cols-2">
                  <button type="button" onClick={resumeStep} className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 bg-industrial-700 px-5 text-sm font-black text-white hover:bg-industrial-800"><CheckCircle2 className="h-5 w-5" aria-hidden="true" />{lang === "en" ? "Fixed - resume step" : "Sudah diperbaiki - kembali ke step"}</button>
                  <Link href={withLang(`${contactPath}&issue=${selectedIssue.id}&step=${currentStep.id}`, lang)} className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 border border-signal-500 bg-white px-5 text-sm font-black text-signal-600 hover:bg-red-50"><LifeBuoy className="h-5 w-5" aria-hidden="true" />{lang === "en" ? "Still unresolved - contact CSE" : "Belum selesai - hubungi CSE"}</Link>
                </div>
              </div>
            ) : (
              <div className="grid place-items-center border border-dashed border-graphite-300 bg-graphite-50 p-10 text-center">
                <div className="max-w-sm">
                  <CircleHelp className="mx-auto h-9 w-9 text-graphite-400" aria-hidden="true" />
                  <p className="mt-4 text-sm font-bold leading-6 text-graphite-600">{lang === "en" ? "A selected symptom will reveal only the troubleshooting checks relevant to that step." : "Gejala yang dipilih akan membuka hanya pemeriksaan yang relevan untuk step tersebut."}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="bg-graphite-900 py-10 text-white">
        <div className="container-page flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-signal-500">{lang === "en" ? "Versioned technical content" : "Konten teknis berversi"}</p>
            <p className="mt-2 text-sm leading-6 text-white/65">{text(guide.source, lang)} · {lang === "en" ? "Last reviewed" : "Terakhir direview"} {guide.lastReviewed}</p>
          </div>
          <Link href={withLang(contactPath, lang)} className="focus-ring inline-flex min-h-12 shrink-0 items-center justify-center gap-2 bg-signal-500 px-5 text-sm font-black text-white hover:bg-signal-600"><LifeBuoy className="h-4 w-4" aria-hidden="true" />{lang === "en" ? "Ask CSE technical support" : "Hubungi technical support CSE"}</Link>
        </div>
      </section>
    </main>
  );
}
