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

export type KitDifficulty = "Gentle" | "Moderate" | "Stretch" | "Ambitious";

export type KitGoalTag = "creativity" | "stem" | "ai-literacy" | "career" | "confidence" | "portfolio";
export type KitSettingTag = "home" | "classroom" | "workshop" | "club";

/** Extended kit definition for marketing + commerce surfaces */
export type KitProduct = {
  id: string;
  name: string;
  tagline: string;
  blurb: string;
  tier: string;
  contents: KitContentsItem[];
  /** Tailwind gradient / ring utility fragment for card chrome */
  accent: string;
  ageRange: string;
  bestFor: string;
  /** Typical minutes for mission 1 */
  firstMissionMinutes: number;
  /** Mission 01 title + hook for marketing surfaces */
  firstMissionTitle: string;
  firstMissionSummary: string;
  dailyMissionCount: number;
  finalArtifact: string;
  skillOutcomes: string[];
  difficulty: KitDifficulty;
  /** Plain-language outcome learners ship */
  whatLearnerBuilds: string;
  /** Catalog filters (/kits) — inclusive age span, approximate from positioning copy */
  filterGoals: KitGoalTag[];
  filterSettings: KitSettingTag[];
  filterAgeMin: number;
  filterAgeMax: number;
};

export const KITS: KitProduct[] = [
  {
    id: "launch-pad-core",
    name: "Launch Pad Core",
    tagline: "Orient · build · ship",
    blurb:
      "A welcoming first journey—clear rituals, tiny wins, and a rhythm families can repeat without burnout.",
    tier: "Starter",
    accent: "from-amber-400/35 via-stone-200/20 to-orange-300/25 ring-amber-300/40",
    ageRange: "8–14 (families can adapt)",
    bestFor: "First-time kit families, homerooms, and soft pilots",
    firstMissionMinutes: 25,
    firstMissionTitle: "Mission 01 · Open the box with intention",
    firstMissionSummary:
      "Set up a calm build zone, name one constraint you’ll honor this week, and ship a micro-artifact that proves you started—not just unboxed.",
    dailyMissionCount: 21,
    finalArtifact: "A personal learning journal + first showcase build",
    skillOutcomes: ["Confidence", "Routines", "Reflection", "Presentation basics"],
    difficulty: "Gentle",
    whatLearnerBuilds:
      "A daily reflection habit, one showcase artifact, and a repeatable “plan → build → share” loop.",
    filterGoals: ["creativity", "confidence", "portfolio"],
    filterSettings: ["home", "classroom"],
    filterAgeMin: 8,
    filterAgeMax: 14,
    contents: [
      { label: "Starter components & safe tools", icon: Box },
      { label: "Guided opener deck", icon: BookOpen },
      { label: "QR onboarding path", icon: QrCode },
      { label: "Progress stickers & badges", icon: Sparkles },
      { label: "AI coach prompts (light)", icon: Bot },
      { label: "Family & classroom guide", icon: Layers },
    ],
  },
  {
    id: "design-sprint-kit",
    name: "Design Sprint Kit",
    tagline: "Sketch · prototype · test",
    blurb:
      "Turn messy ideas into tangible prototypes—iterate fast with critique-ready artifacts and caring structure.",
    tier: "Discovery",
    accent: "from-amber-500/30 via-orange-400/15 to-rose-400/20 ring-amber-400/35",
    ageRange: "10–17",
    bestFor: "Creative confidence, design thinking, and portfolio pieces",
    firstMissionMinutes: 35,
    firstMissionTitle: "Mission 01 · Frame the problem in the physical world",
    firstMissionSummary:
      "Turn a fuzzy idea into a tangible brief—sketch, label users, and pick one risky assumption to test with a cardboard-first prototype.",
    dailyMissionCount: 18,
    finalArtifact: "Prototype pack + critique storyboard",
    skillOutcomes: ["Ideation", "Feedback", "Iteration", "Storytelling"],
    difficulty: "Moderate",
    whatLearnerBuilds:
      "A tested prototype arc—sketches, lo-fi models, “what changed” narrative, and a share-ready demo.",
    filterGoals: ["creativity", "portfolio", "career", "stem"],
    filterSettings: ["home", "classroom", "workshop"],
    filterAgeMin: 10,
    filterAgeMax: 17,
    contents: [
      { label: "Tool-grade consumables", icon: Box },
      { label: "Scale rulers & grids", icon: Ruler },
      { label: "Layered brief cards", icon: Layers },
      { label: "Presentation mat", icon: Sparkles },
      { label: "AI critique prompts", icon: Bot },
      { label: "Ship checklist", icon: Target },
    ],
  },
  {
    id: "signal-lab",
    name: "Signal Lab",
    tagline: "Sense · map · explain",
    blurb:
      "Learners wire simple inputs into readable outcomes—building intuition for how real systems behave.",
    tier: "Explorer",
    accent: "from-violet-500/25 via-amber-400/15 to-sky-500/20 ring-violet-400/30",
    ageRange: "11–18",
    bestFor: "STEM curiosity, makers, and clubs exploring signals & sensing",
    firstMissionMinutes: 40,
    firstMissionTitle: "Mission 01 · Name your first signal",
    firstMissionSummary:
      "Pick one input you can observe, log two honest readings, and draw the simplest chain from cause to what you see—no jargon, just evidence.",
    dailyMissionCount: 24,
    finalArtifact: "Signal story + annotated observation log",
    skillOutcomes: ["Observation", "Systems thinking", "Documentation", "Explanation"],
    difficulty: "Stretch",
    whatLearnerBuilds:
      "A field notebook of observations, a mapped signal chain, and an explanation of cause and effect.",
    filterGoals: ["stem", "ai-literacy", "confidence", "portfolio"],
    filterSettings: ["home", "classroom", "workshop", "club"],
    filterAgeMin: 11,
    filterAgeMax: 18,
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
    id: "systems-navigator",
    name: "Systems Navigator",
    tagline: "Model · decide · defend",
    blurb:
      "For learners ready to own trade-offs—feedback loops, stakeholder narratives, and evidence-backed choices.",
    tier: "Advanced",
    accent: "from-sky-500/25 via-slate-500/10 to-emerald-500/20 ring-sky-400/30",
    ageRange: "14–20+",
    bestFor: "Career pathways, advanced cohorts, and capstone-style depth",
    firstMissionMinutes: 45,
    firstMissionTitle: "Mission 01 · Map the system you’re entering",
    firstMissionSummary:
      "Stakeholders, incentives, and feedback loops on one page—then write a one-paragraph thesis a skeptical mentor could challenge kindly.",
    dailyMissionCount: 16,
    finalArtifact: "Systems brief + defense portfolio entry",
    skillOutcomes: ["Decision-making", "Stakeholder reasoning", "Evidence", "Ethics"],
    difficulty: "Ambitious",
    whatLearnerBuilds:
      "A defendable systems map, scenario decisions with rationale, and a portfolio-ready executive summary.",
    filterGoals: ["career", "stem", "portfolio", "ai-literacy"],
    filterSettings: ["classroom", "workshop", "home"],
    filterAgeMin: 14,
    filterAgeMax: 22,
    contents: [
      { label: "Systems map board", icon: Map },
      { label: "Scenario tokens", icon: Zap },
      { label: "Stakeholder cards", icon: BookOpen },
      { label: "Evidence binder", icon: Layers },
      { label: "AI red-team prompts", icon: Bot },
      { label: "Rubric + self-audit", icon: Target },
    ],
  },
];

export function getKitById(id: string): KitProduct | undefined {
  return KITS.find((k) => k.id === id);
}

export const FEATURED_KIT_IDS = [
  "launch-pad-core",
  "design-sprint-kit",
  "signal-lab",
  "systems-navigator",
] as const;
