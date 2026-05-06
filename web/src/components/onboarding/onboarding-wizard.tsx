"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { cardSurface } from "@/lib/ui";
import { cn } from "@/lib/utils";

type WizardState = {
  objective: "modernize" | "launch" | "scale" | "stabilize" | "transform" | "";
  teamSize: "solo" | "small" | "mid" | "large" | "";
  deliveryCadence: "ad_hoc" | "monthly" | "biweekly" | "weekly" | "daily" | "";
  testingMaturity: "none" | "manual" | "partial" | "automated" | "continuous" | "";
  securityPosture: "reactive" | "baseline" | "policy" | "integrated" | "zero_trust" | "";
  observability: "none" | "logs" | "metrics" | "alerts" | "slo" | "";
  changeManagement: "informal" | "defined" | "repeatable" | "program" | "portfolio" | "";
  budgetBand: "starter" | "growth" | "scale" | "enterprise" | "";
  timelineDays: 30 | 90 | 180 | 365 | 0;
};

type PlanResponse = {
  maturity: {
    score: number;
    level: string;
    capabilities: Record<string, number>;
  };
  context: {
    seatPressurePercent: number;
    seatsUsed: number;
    seatsPurchased: number;
    openTickets: number;
    recentOrders: number;
  };
  targetStatePlan: {
    phases: { title: string; activities: string[] }[];
    paymentRecommendation: string;
    nextActions: string[];
    journeyLinks?: {
      onboarding: string;
      kitFinder: string;
      missions: string;
      support: string;
    };
  };
  recommendation?: { kitId: string };
  persistence?: {
    planId: string;
    version: number;
    savedAt: string;
  };
};

const initial: WizardState = {
  objective: "",
  teamSize: "",
  deliveryCadence: "",
  testingMaturity: "",
  securityPosture: "",
  observability: "",
  changeManagement: "",
  budgetBand: "",
  timelineDays: 0,
};

const steps = [
  {
    key: "objective",
    title: "What outcome matters most now?",
    options: [
      { value: "modernize", label: "Modernize delivery stack" },
      { value: "launch", label: "Launch a new platform capability" },
      { value: "scale", label: "Scale usage and reliability" },
      { value: "stabilize", label: "Stabilize quality and operations" },
      { value: "transform", label: "Drive full transformation program" },
    ],
  },
  {
    key: "teamSize",
    title: "Team footprint",
    options: [
      { value: "solo", label: "1–2 builders" },
      { value: "small", label: "3–8 cross-functional team" },
      { value: "mid", label: "9–25 program team" },
      { value: "large", label: "25+ enterprise contributors" },
    ],
  },
  {
    key: "deliveryCadence",
    title: "Current delivery cadence",
    options: [
      { value: "ad_hoc", label: "Ad-hoc releases" },
      { value: "monthly", label: "Monthly cycles" },
      { value: "biweekly", label: "Biweekly releases" },
      { value: "weekly", label: "Weekly shipping" },
      { value: "daily", label: "Daily flow" },
    ],
  },
  {
    key: "testingMaturity",
    title: "Testing maturity",
    options: [
      { value: "none", label: "No structured testing" },
      { value: "manual", label: "Manual checks only" },
      { value: "partial", label: "Partial automation" },
      { value: "automated", label: "Automated regression gates" },
      { value: "continuous", label: "Continuous quality system" },
    ],
  },
  {
    key: "securityPosture",
    title: "Security posture",
    options: [
      { value: "reactive", label: "Reactive security handling" },
      { value: "baseline", label: "Baseline controls in place" },
      { value: "policy", label: "Policy-led reviews" },
      { value: "integrated", label: "Security integrated in delivery" },
      { value: "zero_trust", label: "Zero-trust maturity" },
    ],
  },
  {
    key: "observability",
    title: "Operational observability",
    options: [
      { value: "none", label: "No formal observability" },
      { value: "logs", label: "Logs-first visibility" },
      { value: "metrics", label: "Metrics dashboards" },
      { value: "alerts", label: "Alerting + response loops" },
      { value: "slo", label: "SLO-driven operations" },
    ],
  },
  {
    key: "changeManagement",
    title: "Transformation governance",
    options: [
      { value: "informal", label: "Informal adoption effort" },
      { value: "defined", label: "Defined transformation process" },
      { value: "repeatable", label: "Repeatable change playbook" },
      { value: "program", label: "Program-level orchestration" },
      { value: "portfolio", label: "Portfolio-wide governance" },
    ],
  },
  {
    key: "budgetBand",
    title: "Investment band",
    options: [
      { value: "starter", label: "Starter" },
      { value: "growth", label: "Growth" },
      { value: "scale", label: "Scale" },
      { value: "enterprise", label: "Enterprise" },
    ],
  },
  {
    key: "timelineDays",
    title: "Target timeline",
    options: [
      { value: 30, label: "30 days" },
      { value: 90, label: "90 days" },
      { value: 180, label: "180 days" },
      { value: 365, label: "12 months" },
    ],
  },
] as const;

export function OnboardingWizard() {
  const [state, setState] = useState<WizardState>(initial);
  const [step, setStep] = useState(0);
  const [pending, setPending] = useState(false);
  const [savingDraft, setSavingDraft] = useState(false);
  const [loadingResume, setLoadingResume] = useState(true);
  const [error, setError] = useState("");
  const [plan, setPlan] = useState<PlanResponse | null>(null);
  const [draftMeta, setDraftMeta] = useState<{ version: number; updatedAt: string } | null>(null);

  const current = steps[step];
  const total = steps.length;
  const currentValue = state[current.key as keyof WizardState];
  const stepComplete = currentValue !== "" && currentValue !== 0;

  const completion = useMemo(() => {
    const values = Object.values(state);
    const answered = values.filter((v) => v !== "" && v !== 0).length;
    return Math.round((answered / values.length) * 100);
  }, [state]);

  useEffect(() => {
    let mounted = true;
    async function loadExisting() {
      try {
        const res = await fetch("/api/onboarding/plan", { cache: "no-store" });
        const json = await res.json();
        if (!mounted || !res.ok) return;

        const draft = json?.draft as
          | { version: number; updatedAt: string; inputState: WizardState }
          | null
          | undefined;
        const latestPlan = json?.latestPlan as
          | { resultState: PlanResponse; version: number; updatedAt: string }
          | null
          | undefined;

        if (draft?.inputState) {
          setState(draft.inputState);
          const values = Object.values(draft.inputState);
          const firstIncomplete = values.findIndex((v) => v === "" || v === 0);
          setStep(firstIncomplete === -1 ? steps.length - 1 : firstIncomplete);
          setDraftMeta({ version: draft.version, updatedAt: draft.updatedAt });
        }

        if (latestPlan?.resultState) {
          setPlan(latestPlan.resultState);
        }
      } finally {
        if (mounted) setLoadingResume(false);
      }
    }
    void loadExisting();
    return () => {
      mounted = false;
    };
  }, []);

  async function saveDraft() {
    setSavingDraft(true);
    setError("");
    try {
      const res = await fetch("/api/onboarding/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: "draft", payload: state }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(typeof json?.error === "string" ? json.error : "Could not save progress.");
        return;
      }
      setDraftMeta({ version: json.version as number, updatedAt: new Date().toISOString() });
      void fetch("/api/journey/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentStage: "onboarding", completedStages: ["onboarding"] }),
      });
    } catch {
      setError("Network issue while saving onboarding progress.");
    } finally {
      setSavingDraft(false);
    }
  }

  async function generatePlan() {
    setPending(true);
    setError("");
    try {
      const res = await fetch("/api/onboarding/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: "generate", payload: state }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(typeof json?.error === "string" ? json.error : "Could not generate plan.");
        return;
      }
      setPlan(json as PlanResponse);
      void fetch("/api/journey/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentStage: "kit",
          completedStages: ["onboarding"],
          recommendedKitId: (json as PlanResponse).recommendation?.kitId,
        }),
      });
    } catch {
      setError("Network issue while generating your target-state plan.");
    } finally {
      setPending(false);
    }
  }

  return (
    <main id="top" className="flex-1 border-b border-slate-200/80 bg-gradient-to-b from-white via-stone-50/30 to-white">
      <Container className="py-10 sm:py-12 lg:py-14">
        <div className="ek-reveal-up max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Guided onboarding</p>
          <h1 className="mt-2 text-balance text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Assess your current state and generate a transformation plan
          </h1>
          <p className="mt-3 text-base leading-relaxed text-slate-600">
            This wizard scores delivery, quality, security, and operational readiness, then returns a tenant-aware
            target-state roadmap with payment and scale recommendations.
          </p>
          {loadingResume ? null : draftMeta ? (
            <p className="mt-3 inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-900">
              Resume available · version {draftMeta.version}
            </p>
          ) : null}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)]">
          <section className={cn(cardSurface(), "ek-reveal-up ek-reveal-up-delay-1 rounded-2xl p-6 sm:p-7")} aria-labelledby="onboarding-step-heading">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                Step {step + 1} of {total}
              </p>
              <p className="text-xs font-medium text-slate-600">{completion}% complete</p>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-sky-500" style={{ width: `${completion}%` }} />
            </div>

            <h2 id="onboarding-step-heading" className="mt-6 text-xl font-semibold text-slate-900">
              {current.title}
            </h2>
            <div className="mt-4 space-y-2">
              {current.options.map((o) => {
                const selected = currentValue === (o.value as never);
                return (
                  <button
                    key={String(o.value)}
                    type="button"
                    className={cn(
                      "w-full rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2",
                      selected
                        ? "border-emerald-300 bg-emerald-50 text-emerald-900"
                        : "border-slate-200 bg-white text-slate-800 hover:border-slate-300",
                    )}
                    onClick={() =>
                      setState((s) => ({ ...s, [current.key]: o.value } as WizardState))
                    }
                  >
                    {o.label}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-5">
              <Button variant="outline" size="sm" onClick={() => setStep((v) => Math.max(0, v - 1))} disabled={step === 0 || pending}>
                Back
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => void saveDraft()}
                disabled={pending || savingDraft || completion === 0}
              >
                {savingDraft ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : null}
                Save progress
              </Button>
              {step < total - 1 ? (
                <Button variant="primary" size="sm" onClick={() => setStep((v) => Math.min(total - 1, v + 1))} disabled={!stepComplete || pending}>
                  Next
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Button>
              ) : (
                <Button variant="primary" size="sm" onClick={() => void generatePlan()} disabled={!stepComplete || pending || savingDraft}>
                  {pending ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : null}
                  Generate target-state plan
                </Button>
              )}
            </div>
            {error ? <p className="mt-3 text-sm font-medium text-red-600">{error}</p> : null}
          </section>

          <aside className={cn(cardSurface(), "ek-reveal-up ek-reveal-up-delay-2 rounded-2xl p-6 sm:p-7")} aria-live="polite">
            <h2 className="text-xl font-semibold text-slate-900">Recommended target state</h2>
            {!plan ? (
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Complete the steps to generate your maturity score, phase-by-phase roadmap, and payment/seat guidance.
              </p>
            ) : (
              <>
                <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-xs uppercase tracking-[0.15em] text-slate-500">Maturity score</p>
                  <p className="mt-2 text-3xl font-semibold text-slate-900">{plan.maturity.score}/100</p>
                  <p className="mt-1 text-sm text-emerald-800 capitalize">{plan.maturity.level} maturity</p>
                </div>

                <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-xs uppercase tracking-[0.15em] text-slate-500">Tenant + payment context</p>
                  <p className="mt-2 text-sm text-slate-700">
                    Seats: {plan.context.seatsUsed}/{plan.context.seatsPurchased} · Pressure {plan.context.seatPressurePercent}%
                  </p>
                  <p className="mt-1 text-sm text-slate-700">
                    Open tickets: {plan.context.openTickets} · Recent orders: {plan.context.recentOrders}
                  </p>
                  <p className="mt-2 text-sm font-medium text-slate-900">{plan.targetStatePlan.paymentRecommendation}</p>
                </div>

                <ol className="mt-4 space-y-3">
                  {plan.targetStatePlan.phases.map((phase, idx) => (
                    <li key={phase.title} className="rounded-xl border border-slate-200 bg-white p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">Phase {idx + 1}</p>
                      <p className="mt-1 text-sm font-semibold text-slate-900">{phase.title}</p>
                      <ul className="mt-2 space-y-1.5 text-sm text-slate-700">
                        {phase.activities.map((a) => (
                          <li key={a} className="flex items-start gap-2">
                            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-700" aria-hidden />
                            <span>{a}</span>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ol>

                <div className="mt-4 rounded-xl border border-emerald-100 bg-emerald-50/70 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-emerald-800">Next actions</p>
                  <ul className="mt-2 space-y-1 text-sm text-emerald-900">
                    {plan.targetStatePlan.nextActions.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button
                    variant="primary"
                    size="sm"
                    href={plan.targetStatePlan.journeyLinks?.kitFinder ?? "/find-my-kit"}
                  >
                    Continue to kit selection
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    href={plan.targetStatePlan.journeyLinks?.missions ?? "/missions"}
                  >
                    Start mission track
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    href={plan.targetStatePlan.journeyLinks?.support ?? "/support"}
                  >
                    Get onboarding support
                  </Button>
                </div>
              </>
            )}
          </aside>
        </div>
      </Container>
    </main>
  );
}

