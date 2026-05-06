export const SUPPORT_CATEGORY_IDS = [
  "parent_help",
  "learner_help",
  "school_pilot",
  "order_issue",
  "kit_replacement",
  "partnership",
] as const;

export type SupportCategoryId = (typeof SUPPORT_CATEGORY_IDS)[number];

export type SupportCategoryDef = {
  id: SupportCategoryId;
  title: string;
  description: string;
  intent: "family" | "school" | "other";
  defaultRole: string;
  messageHint: string;
};

export const SUPPORT_CATEGORIES: readonly SupportCategoryDef[] = [
  {
    id: "parent_help",
    title: "Parent help",
    description: "Kit fit, pacing, or what to expect in the first week.",
    intent: "family",
    defaultRole: "Parent",
    messageHint: "Learner age, setting (home/class), and what you’re trying to solve.",
  },
  {
    id: "learner_help",
    title: "Learner help",
    description: "Stuck on a mission, reflection, or uploading proof.",
    intent: "family",
    defaultRole: "Learner",
    messageHint: "Which kit path and mission—you can describe it in your own words.",
  },
  {
    id: "school_pilot",
    title: "School pilot",
    description: "Cohorts, timelines, facilitator guides, and rollout.",
    intent: "school",
    defaultRole: "School Leader",
    messageHint: "Approximate cohort size, sites, and when you’d like to start.",
  },
  {
    id: "order_issue",
    title: "Order issue",
    description: "Wrong address, delay, or status questions.",
    intent: "other",
    defaultRole: "Parent",
    messageHint: "What you ordered and what’s going wrong—we’ll cross-check with tracking.",
  },
  {
    id: "kit_replacement",
    title: "Kit replacement",
    description: "Missing piece, damage, or swap request.",
    intent: "other",
    defaultRole: "Parent",
    messageHint: "What arrived and what needs replacing—photos help if you have them.",
  },
  {
    id: "partnership",
    title: "Partnership / custom kits",
    description: "Bundles, custom journeys, or multi-site programs.",
    intent: "other",
    defaultRole: "Partner",
    messageHint: "Timing, learner count, and what a good outcome looks like for your org.",
  },
] as const;

export function getSupportCategory(
  id: SupportCategoryId | "" | null | undefined,
): SupportCategoryDef | null {
  if (!id) return null;
  return SUPPORT_CATEGORIES.find((c) => c.id === id) ?? null;
}
