import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  Bot,
  Box,
  Cable,
  Cpu,
  Layers,
  Map,
  PenTool,
  QrCode,
  Ruler,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";

export type KitContentsItem = { label: string; icon: LucideIcon };

export type KitProduct = {
  id: string;
  name: string;
  tagline: string;
  blurb: string;
  tier: string;
  contents: KitContentsItem[];
  /** Tailwind gradient / ring utility fragment for card chrome */
  accent: string;
};

export const KITS: KitProduct[] = [
  {
    id: "signal-lab",
    name: "Signal Lab",
    tagline: "Sense · map · explain",
    blurb: "Builds that behave like real systems—inputs, signals, and readable outcomes.",
    tier: "Explorer",
    accent: "from-violet-500/25 via-amber-400/15 to-sky-500/20 ring-violet-400/30",
    contents: [
      { label: "Modular sensor tiles", icon: Cpu },
      { label: "Patch cables & bus", icon: Cable },
      { label: "Challenge deck (20)", icon: BookOpen },
      { label: "QR journey spine", icon: QrCode },
      { label: "AI reflection prompts", icon: Bot },
      { label: "Field notebook", icon: PenTool },
    ],
  },
  {
    id: "design-sprint-kit",
    name: "Design Sprint Kit",
    tagline: "Sketch · prototype · test",
    blurb: "Premium physical + digital prompts for rapid iteration and critique-ready artifacts.",
    tier: "Discovery",
    accent: "from-amber-500/30 via-orange-400/15 to-rose-400/20 ring-amber-400/35",
    contents: [
      { label: "Tool-grade consumables", icon: Box },
      { label: "Scale rulers & grids", icon: Ruler },
      { label: "Layered brief cards", icon: Layers },
      { label: "Presentation mat", icon: Sparkles },
      { label: "AI critique mode", icon: Bot },
      { label: "Ship checklist", icon: Target },
    ],
  },
  {
    id: "systems-navigator",
    name: "Systems Navigator",
    tagline: "Model · decide · defend",
    blurb: "For learners ready to own tradeoffs, feedback loops, and stakeholder-ready narratives.",
    tier: "Advanced",
    accent: "from-sky-500/25 via-slate-500/10 to-emerald-500/20 ring-sky-400/30",
    contents: [
      { label: "Systems map board", icon: Map },
      { label: "Scenario tokens", icon: Zap },
      { label: "Stakeholder cards", icon: BookOpen },
      { label: "Evidence binder", icon: Layers },
      { label: "AI red-team prompts", icon: Bot },
      { label: "Rubric + self-audit", icon: Target },
    ],
  },
  {
    id: "launch-pad-core",
    name: "Launch Pad Core",
    tagline: "Orient · build · ship",
    blurb: "The on-ramp kit—foundations, habits, and first wins without overwhelming the room.",
    tier: "Starter",
    accent: "from-amber-400/35 via-stone-200/20 to-orange-300/25 ring-amber-300/40",
    contents: [
      { label: "Starter components", icon: Box },
      { label: "Guided opener deck", icon: BookOpen },
      { label: "QR onboarding path", icon: QrCode },
      { label: "Progress stickers", icon: Sparkles },
      { label: "AI coach (light)", icon: Bot },
      { label: "Family / class guide", icon: Layers },
    ],
  },
];

export function getKitById(id: string): KitProduct | undefined {
  return KITS.find((k) => k.id === id);
}

export const FEATURED_KIT_IDS = ["signal-lab", "design-sprint-kit", "systems-navigator"] as const;
