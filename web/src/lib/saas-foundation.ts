import type { KitFinderPersona } from "@/lib/kit-finder-logic";

export type SsoProvider = "google" | "microsoft" | "email_magic_link";
export type WorkspaceType = "family" | "school";
export type PlanTier = "starter" | "growth" | "district";

export type SaasWorkspace = {
  id: string;
  name: string;
  type: WorkspaceType;
  plan: PlanTier;
  seatsUsed: number;
  seatsTotal: number;
};

export type SaasMetric = {
  label: string;
  value: string;
  change: string;
};

export const AUTH_PROVIDERS: { id: SsoProvider; label: string }[] = [
  { id: "google", label: "Google SSO" },
  { id: "microsoft", label: "Microsoft Entra" },
  { id: "email_magic_link", label: "Email magic link" },
];

export const PERSONA_ROLES: { id: KitFinderPersona; label: string; onboardingPath: string }[] = [
  { id: "learner", label: "Learner", onboardingPath: "/find-my-kit?persona=learner" },
  { id: "parent", label: "Parent / guardian", onboardingPath: "/find-my-kit?persona=parent" },
  { id: "educator", label: "Educator", onboardingPath: "/find-my-kit?persona=educator" },
  { id: "school", label: "School admin", onboardingPath: "/find-my-kit?persona=school" },
];

export const WORKSPACES: SaasWorkspace[] = [
  { id: "fam-001", name: "Rivers Family", type: "family", plan: "starter", seatsUsed: 2, seatsTotal: 4 },
  { id: "sch-101", name: "North Ridge Middle School", type: "school", plan: "growth", seatsUsed: 122, seatsTotal: 180 },
];

export const PLATFORM_METRICS: SaasMetric[] = [
  { label: "Active learners (7d)", value: "1,482", change: "+12%" },
  { label: "Mission completion", value: "78%", change: "+5 pts" },
  { label: "Copilot reflection quality", value: "4.6/5", change: "+0.3" },
  { label: "Support first response", value: "2h 11m", change: "-38m" },
];
