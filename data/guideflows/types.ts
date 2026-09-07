import type { LocalizedText } from "@/lib/i18n";

export type GuideFlowHotspot = {
  x: number;
  y: number;
  label: LocalizedText;
  align?: "left" | "right";
};

export type GuideFlowMedia = {
  type: "image" | "video";
  src: string;
  alt: LocalizedText;
  fit?: "contain" | "cover";
  hotspot?: GuideFlowHotspot;
  note?: LocalizedText;
};

export type GuideFlowStep = {
  id: string;
  stageId: string;
  title: LocalizedText;
  instruction: LocalizedText;
  expected: LocalizedText;
  successLabel: LocalizedText;
  helpLabel: LocalizedText;
  manualRef: string;
  media: GuideFlowMedia;
  quickChecks: LocalizedText[];
  issueIds: string[];
};

export type GuideFlowIssue = {
  id: string;
  label: LocalizedText;
  title: LocalizedText;
  summary: LocalizedText;
  checks: Array<{
    title: LocalizedText;
    body: LocalizedText;
  }>;
};

export type GuideFlowTask = {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  startStepId?: string;
  issueId?: string;
};

export type GuideFlowDefinition = {
  slug: string;
  version: string;
  status: "pilot" | "published" | "archived";
  lastReviewed: string;
  source: LocalizedText;
  title: LocalizedText;
  description: LocalizedText;
  scope: LocalizedText;
  estimatedTime: LocalizedText;
  stages: Array<{ id: string; title: LocalizedText }>;
  tasks: GuideFlowTask[];
  prerequisites: LocalizedText[];
  steps: GuideFlowStep[];
  issues: GuideFlowIssue[];
};
