import type { KitDifficulty, KitProduct } from "@/lib/kits-catalog";
import { KITS } from "@/lib/kits-catalog";

export type MissionCategory = "build" | "observe" | "explain" | "share";

export type MissionLibraryItem = {
  id: string;
  kitId: string;
  kitName: string;
  title: string;
  summary: string;
  minutes: number;
  difficulty: KitDifficulty;
  category: MissionCategory;
  output: string;
  reflectionPrompt: string;
  badgeHint: string;
};

const KIT_CATEGORY: Record<string, MissionCategory> = {
  "launch-pad-core": "build",
  "design-sprint-kit": "build",
  "signal-lab": "observe",
  "systems-navigator": "explain",
};

function categoryForKit(id: string): MissionCategory {
  return KIT_CATEGORY[id] ?? "build";
}

function reflectionForKit(kit: KitProduct): string {
  return `After this mission: what changed in your thinking—and what would you test on day two? (${kit.name})`;
}

export function buildMissionLibraryFromCatalog(): MissionLibraryItem[] {
  return KITS.map((kit) => ({
    id: `${kit.id}-mission-01`,
    kitId: kit.id,
    kitName: kit.name,
    title: kit.firstMissionTitle,
    summary: kit.firstMissionSummary,
    minutes: kit.firstMissionMinutes,
    difficulty: kit.difficulty,
    category: categoryForKit(kit.id),
    output: `Upload: photo, short note, or clip showing your artifact—plus one sentence on what surprised you.`,
    reflectionPrompt: reflectionForKit(kit),
    badgeHint: `${kit.tier} path · Mission 01 complete`,
  }));
}

/** Extra bite-sized missions that aren’t tied to a single SKU — keeps the library feeling “alive”. */
export const GENERIC_MISSIONS: MissionLibraryItem[] = [
  {
    id: "library-share-01",
    kitId: "library",
    kitName: "Any kit",
    title: "Share · Explain your build to a skeptic",
    summary:
      "Record a 60-second explanation as if a thoughtful critic is in the room—state one claim, one piece of evidence, and one thing you’d revisit.",
    minutes: 20,
    difficulty: "Moderate",
    category: "share",
    output: "Short video or voice memo + a written caption with your main takeaway.",
    reflectionPrompt: "Where would a kind critic push back—and how would you strengthen your evidence?",
    badgeHint: "Communication streak +1",
  },
  {
    id: "library-observe-01",
    kitId: "library",
    kitName: "Field notebook",
    title: "Observe · Capture three honest readings",
    summary:
      "Pick one signal in the world around you. Log three readings with timestamps—no smoothing, no hero numbers.",
    minutes: 25,
    difficulty: "Gentle",
    category: "observe",
    output: "Three bullets in your journal + one photo of the setup.",
    reflectionPrompt: "Which reading surprised you—and what hypothesis does it suggest?",
    badgeHint: "Observation habit · Day starter",
  },
];

export function allMissionLibraryItems(): MissionLibraryItem[] {
  return [...buildMissionLibraryFromCatalog(), ...GENERIC_MISSIONS];
}
