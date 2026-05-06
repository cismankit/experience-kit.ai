import type { KitProduct } from "@/lib/kits-catalog";
import { KITS } from "@/lib/kits-catalog";

export type KitFinderPersona = "parent" | "school" | "learner" | "educator";

export type KitFinderAge = "5-10" | "10-15" | "15-20" | "20+";

export type KitFinderGoal =
  | "creativity"
  | "stem"
  | "ai"
  | "career"
  | "confidence"
  | "portfolio";

export type KitFinderSetting = "home" | "classroom" | "workshop" | "club";

export type KitFinderPace = "weekend" | "daily" | "sprint";

export type KitFinderAnswers = {
  persona: KitFinderPersona | "";
  age: KitFinderAge | "";
  goal: KitFinderGoal | "";
  setting: KitFinderSetting | "";
  pace: KitFinderPace | "";
};

function scoreKit(
  kit: KitProduct,
  a: KitFinderAnswers,
): { kit: KitProduct; score: number; reasons: string[] } {
  let score = 0;
  const reasons: string[] = [];

  const bump = (n: number, why: string) => {
    score += n;
    reasons.push(why);
  };

  if (a.persona === "parent" && kit.id === "launch-pad-core") bump(4, "Friendly pacing for families starting out.");
  if (a.persona === "school" && (kit.id === "systems-navigator" || kit.id === "signal-lab"))
    bump(3, "Strong fit for cohorts, labs, and structured pilots.");
  if (a.persona === "learner" && kit.id === "design-sprint-kit") bump(3, "Built for hands-on projects and portfolio artifacts.");
  if (a.persona === "educator" && kit.id === "systems-navigator") bump(3, "Includes guides, rubrics, and classroom-ready structure.");

  if (a.age === "5-10" && kit.id === "launch-pad-core") bump(5, "Age-friendly rituals and gentle difficulty.");
  if (a.age === "10-15" && (kit.id === "design-sprint-kit" || kit.id === "launch-pad-core"))
    bump(3, "Matches typical middle-years curiosity and stamina.");
  if (a.age === "15-20" && (kit.id === "signal-lab" || kit.id === "systems-navigator"))
    bump(4, "Depth and narrative complexity fit older learners.");
  if (a.age === "20+") {
    if (kit.id === "systems-navigator") bump(5, "Capstone-style reasoning and portfolio outputs.");
  }

  if (a.goal === "creativity" && kit.id === "design-sprint-kit") bump(5, "Prototype-forward missions with critique loops.");
  if (a.goal === "stem" && kit.id === "signal-lab") bump(5, "Hands-on sensing, mapping, and explanation.");
  if (a.goal === "ai" && (kit.id === "signal-lab" || kit.id === "systems-navigator"))
    bump(3, "AI prompts anchor reflection and defense—not passive chat.");
  if (a.goal === "career" && kit.id === "systems-navigator") bump(5, "Stakeholder narratives and evidence habits.");
  if (a.goal === "confidence" && kit.id === "launch-pad-core") bump(4, "Tiny wins and repeatable routines.");
  if (a.goal === "portfolio" && (kit.id === "design-sprint-kit" || kit.id === "systems-navigator"))
    bump(4, "Artifacts designed to collect as portfolio entries.");

  if (a.setting === "home" && kit.id === "launch-pad-core") bump(2, "Designed for kitchen-table rhythm.");
  if (a.setting === "classroom" && (kit.id === "systems-navigator" || kit.id === "launch-pad-core"))
    bump(2, "Facilitator-friendly scaffolding for classroom pacing.");
  if (a.setting === "workshop" && kit.id === "design-sprint-kit") bump(3, "Fast iteration cadence for intensives.");
  if (a.setting === "club" && kit.id === "signal-lab") bump(3, "Team-friendly builds and shared missions.");

  if (a.pace === "daily" && kit.dailyMissionCount >= 18) bump(2, "Mission cadence matches a daily habit.");
  if (a.pace === "weekend" && kit.firstMissionMinutes <= 35) bump(2, "First mission fits a focused weekend block.");
  if (a.pace === "sprint" && kit.id === "design-sprint-kit") bump(4, "Sprint-shaped prompts and shipping rituals.");

  return { kit, score, reasons };
}

export function recommendKits(
  answers: KitFinderAnswers,
): { kit: KitProduct; score: number; reasons: string[] }[] {
  const ranked = KITS.map((kit) => scoreKit(kit, answers)).sort((a, b) => b.score - a.score);
  const meaningful = ranked.filter((r) => r.score > 0);
  const picked = meaningful.length > 0 ? meaningful.slice(0, 3) : ranked.slice(0, 2);
  return picked.map((r) => ({
    ...r,
    reasons:
      r.reasons.length > 0
        ? r.reasons
        : ["Balanced starting point—adjust answers above for a tighter match."],
  }));
}
