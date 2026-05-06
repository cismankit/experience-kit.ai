"use client";

import { useId, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, RefreshCw } from "lucide-react";
import {
  type KitFinderAnswers,
  type KitFinderAge,
  type KitFinderGoal,
  type KitFinderPace,
  type KitFinderPersona,
  type KitFinderSetting,
  recommendKits,
} from "@/lib/kit-finder-logic";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const personas: { id: KitFinderPersona; label: string }[] = [
  { id: "parent", label: "Parent / guardian" },
  { id: "school", label: "School / district" },
  { id: "learner", label: "Learner" },
  { id: "educator", label: "Educator / facilitator" },
];

const ages: { id: KitFinderAge; label: string }[] = [
  { id: "5-10", label: "5–10" },
  { id: "10-15", label: "10–15" },
  { id: "15-20", label: "15–20" },
  { id: "20+", label: "20+" },
];

const goals: { id: KitFinderGoal; label: string }[] = [
  { id: "creativity", label: "Creativity" },
  { id: "stem", label: "STEM" },
  { id: "ai", label: "AI literacy" },
  { id: "career", label: "Career skills" },
  { id: "confidence", label: "Confidence" },
  { id: "portfolio", label: "Portfolio" },
];

const settings: { id: KitFinderSetting; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "classroom", label: "Classroom" },
  { id: "workshop", label: "Workshop" },
  { id: "club", label: "Club" },
];

const paces: { id: KitFinderPace; label: string }[] = [
  { id: "weekend", label: "Weekend blocks" },
  { id: "daily", label: "Daily rhythm" },
  { id: "sprint", label: "30-day sprint" },
];

const comforts: { id: import("@/lib/kit-finder-logic").KitFinderComfort; label: string }[] = [
  { id: "first-kit", label: "First hands-on kit" },
  { id: "some-builds", label: "Some build experience" },
  { id: "ready-deep", label: "Ready for depth" },
];

const empty: KitFinderAnswers = {
  persona: "",
  age: "",
  goal: "",
  setting: "",
  pace: "",
  comfort: "",
};

const WIZARD_STEPS = [
  { key: "persona" as const, legend: "Who is this for?", options: personas },
  { key: "age" as const, legend: "Age group", options: ages },
  { key: "goal" as const, legend: "Main learning goal?", options: goals },
  { key: "setting" as const, legend: "Where will it be used?", options: settings },
  { key: "pace" as const, legend: "Preferred pace", options: paces },
  { key: "comfort" as const, legend: "Comfort level", options: comforts },
];

function ChoiceGroup<T extends string>({
  legend,
  name,
  options,
  value,
  onChange,
}: {
  legend: string;
  name: string;
  options: { id: T; label: string }[];
  value: T | "";
  onChange: (v: T) => void;
}) {
  return (
    <fieldset className="space-y-3">
      <legend className="text-sm font-semibold text-slate-900">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const selected = value === opt.id;
          return (
            <label
              key={opt.id}
              className={cn(
                "ek-card-lift cursor-pointer rounded-xl border px-3 py-2.5 text-sm font-medium transition-colors focus-within:ring-2 focus-within:ring-amber-500 focus-within:ring-offset-2",
                selected
                  ? "border-amber-400 bg-amber-50 text-amber-950"
                  : "border-slate-200 bg-white text-slate-800 hover:border-slate-300",
              )}
            >
              <input
                type="radio"
                name={name}
                value={opt.id}
                checked={selected}
                onChange={() => onChange(opt.id)}
                className="sr-only"
              />
              {opt.label}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

export type KitFinderProps = {
  variant?: "wizard" | "full";
  /** When set from persona selector, keeps kit finder aligned with home context. */
  syncPersona?: KitFinderPersona | null;
};

export function KitFinder({ variant = "wizard", syncPersona = null }: KitFinderProps) {
  const formId = useId();
  const [answers, setAnswers] = useState<KitFinderAnswers>(empty);
  const [step, setStep] = useState(0);
  const mergedForScoring = useMemo(
    (): KitFinderAnswers => ({
      ...answers,
      persona: (answers.persona || (syncPersona ?? "")) as KitFinderAnswers["persona"],
    }),
    [answers, syncPersona],
  );
  const results = useMemo(() => recommendKits(mergedForScoring), [mergedForScoring]);

  const update = <K extends keyof KitFinderAnswers>(key: K, val: KitFinderAnswers[K]) => {
    setAnswers((a) => ({ ...a, [key]: val }));
  };

  const resetAll = () => {
    setAnswers(empty);
    setStep(0);
  };

  if (variant === "full") {
    return (
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-12">
        <form
          id={formId}
          className="space-y-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
          onSubmit={(e) => e.preventDefault()}
          noValidate
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-slate-600">Adjust any answer—recommendations update instantly.</p>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
              onClick={resetAll}
            >
              <RefreshCw className="h-4 w-4" aria-hidden />
              Reset
            </button>
          </div>
          <ChoiceGroup
            legend="Who is this for?"
            name={`persona-${formId}`}
            options={personas}
            value={mergedForScoring.persona}
            onChange={(v) => update("persona", v)}
          />
          <ChoiceGroup
            legend="Age group"
            name={`age-${formId}`}
            options={ages}
            value={answers.age}
            onChange={(v) => update("age", v)}
          />
          <ChoiceGroup
            legend="Main goal"
            name={`goal-${formId}`}
            options={goals}
            value={answers.goal}
            onChange={(v) => update("goal", v)}
          />
          <ChoiceGroup
            legend="Use setting"
            name={`setting-${formId}`}
            options={settings}
            value={answers.setting}
            onChange={(v) => update("setting", v)}
          />
          <ChoiceGroup
            legend="Preferred pace"
            name={`pace-${formId}`}
            options={paces}
            value={answers.pace}
            onChange={(v) => update("pace", v)}
          />
          <ChoiceGroup
            legend="Comfort level"
            name={`comfort-${formId}`}
            options={comforts}
            value={answers.comfort}
            onChange={(v) => update("comfort", v)}
          />
        </form>
        <ResultsAside results={results} persona={mergedForScoring.persona} />
      </div>
    );
  }

  const current = WIZARD_STEPS[step];
  const stepAnswered = (key: (typeof WIZARD_STEPS)[number]["key"]) =>
    key === "persona" ? mergedForScoring.persona !== "" : answers[key] !== "";
  const stepComplete = stepAnswered(current.key);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start lg:gap-10">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Guided match</p>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            onClick={resetAll}
          >
            <RefreshCw className="h-3.5 w-3.5" aria-hidden />
            Start over
          </button>
        </div>

        <div
          className="mt-5 flex gap-1.5"
          role="tablist"
          aria-label="Kit finder steps"
        >
          {WIZARD_STEPS.map((s, i) => {
            const done = stepAnswered(s.key);
            const active = i === step;
            return (
              <button
                key={s.key}
                type="button"
                role="tab"
                aria-selected={active}
                aria-current={active ? "step" : undefined}
                className={cn(
                  "h-2 min-w-8 flex-1 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2",
                  active ? "bg-amber-500" : done ? "bg-amber-200" : "bg-slate-200",
                )}
                onClick={() => setStep(i)}
              >
                <span className="sr-only">
                  {s.legend}
                  {done ? " (answered)" : ""}
                </span>
              </button>
            );
          })}
        </div>

        <p className="mt-3 text-sm text-slate-500">
          Step {step + 1} of {WIZARD_STEPS.length} · Tap a dot to jump back and edit.
        </p>

        <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()} noValidate>
          <ChoiceGroup
            legend={current.legend}
            name={`${current.key}-${formId}`}
            options={current.options}
            value={current.key === "persona" ? mergedForScoring.persona : answers[current.key]}
            onChange={(v) => update(current.key, v)}
          />

          <div className="flex flex-col gap-4 border-t border-slate-100 pt-6 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between">
            <button
              type="button"
              className="inline-flex items-center gap-1 self-start rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
            >
              <ChevronLeft className="h-4 w-4" aria-hidden />
              Back
            </button>
            {step < WIZARD_STEPS.length - 1 ? (
              <button
                type="button"
                className="inline-flex items-center gap-1 self-end rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 sm:self-start"
                onClick={() => setStep((s) => Math.min(WIZARD_STEPS.length - 1, s + 1))}
                disabled={!stepComplete}
              >
                Next
                <ChevronRight className="h-4 w-4" aria-hidden />
              </button>
            ) : (
              <div className="flex w-full flex-col gap-2 sm:max-w-xs sm:items-end">
                <Button
                  type="button"
                  variant="primary"
                  size="md"
                  className="w-full justify-center sm:w-auto"
                  disabled={!stepComplete}
                  onClick={() => {
                    const el = document.getElementById("kit-finder-results");
                    el?.scrollIntoView({ behavior: "smooth", block: "start" });
                    window.setTimeout(() => {
                      el?.focus({ preventScroll: true });
                    }, 450);
                  }}
                >
                  See my recommendation
                </Button>
                <p className="text-center text-sm leading-snug text-slate-600 sm:text-right">
                  Nothing else to submit—your match updates live. On a phone, this jumps to your result below.
                </p>
              </div>
            )}
          </div>
        </form>
      </div>

      <div className="lg:sticky lg:top-28">
        <ResultsAside results={results} compactSummary={results[0] != null} persona={mergedForScoring.persona} />
      </div>
    </div>
  );
}

function ResultsAside({
  results,
  compactSummary,
  persona,
}: {
  results: ReturnType<typeof recommendKits>;
  compactSummary?: boolean;
  persona: import("@/lib/kit-finder-logic").KitFinderPersona | "";
}) {
  const top = results[0];
  const next = results[1];

  return (
    <aside
      id="kit-finder-results"
      tabIndex={-1}
      className="flex scroll-mt-28 flex-col rounded-2xl border border-amber-100 bg-gradient-to-b from-amber-50/80 to-white p-6 shadow-inner outline-none sm:p-7"
      aria-live="polite"
    >
      <h3 className="text-lg font-semibold text-slate-900">Your best fit</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">
        {compactSummary && top
          ? "We weight your pathway, goals, and setting—then surface the strongest match with a clear reason."
          : "Answer the quick prompts—your top match and alternates appear here as you go."}
      </p>

      {top ? (
        <div className="mt-6 rounded-2xl border border-amber-200/80 bg-white p-5 shadow-sm">
          <p className="text-[10px] font-bold uppercase tracking-widest text-amber-800">{top.kit.tier}</p>
          <p className="mt-1 text-lg font-semibold text-slate-900">{top.kit.name}</p>
          <p className="mt-3 text-sm text-slate-700">
            <span className="font-semibold text-slate-900">Why it fits: </span>
            {top.reasons[0]}
            {top.reasons[1] ? ` ${top.reasons[1]}` : ""}
          </p>
          <div className="mt-4 rounded-xl border border-slate-100 bg-stone-50/80 px-3 py-3 text-sm">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">First mission</p>
            <p className="mt-1 font-medium text-slate-900">{top.kit.firstMissionTitle}</p>
            <p className="mt-1 text-xs leading-snug text-slate-600">{top.kit.firstMissionSummary}</p>
          </div>
          <div className="mt-3 rounded-xl border border-slate-100 bg-white px-3 py-3 text-sm">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">What learners build</p>
            <p className="mt-1 text-slate-800">{top.kit.whatLearnerBuilds}</p>
          </div>
          {next ? (
            <p className="mt-3 text-xs text-slate-600">
              <span className="font-semibold text-slate-800">Suggested next path: </span>
              <a href={`/kits#${next.kit.id}`} className="font-semibold text-amber-900 underline-offset-2 hover:underline">
                {next.kit.name}
              </a>
            </p>
          ) : null}
          <div className="mt-5 flex flex-wrap gap-2">
            <Button variant="primary" size="sm" href={`/kits#${top.kit.id}`}>
              View journey
            </Button>
            <Button variant="outline" size="sm" href="/kits" className="bg-white">
              Compare kits
            </Button>
            {persona === "school" ? (
              <Button variant="secondary" size="sm" href="/schools#contact">
                Request school pilot
              </Button>
            ) : null}
          </div>
        </div>
      ) : (
        <p className="mt-6 rounded-xl border border-dashed border-slate-200 bg-white/60 px-4 py-6 text-center text-sm text-slate-500">
          Keep going—your recommendation sharpens after the first few choices.
        </p>
      )}

      {results.length > 1 ? (
        <details className="mt-6 group rounded-xl border border-slate-200 bg-white/80 p-4">
          <summary className="cursor-pointer list-none text-sm font-semibold text-slate-900 marker:content-none [&::-webkit-details-marker]:hidden">
            <span className="flex items-center justify-between gap-2">
              Other strong options
              <span className="text-xs font-normal text-slate-500 group-open:hidden">Show</span>
              <span className="hidden text-xs font-normal text-slate-500 group-open:inline">Hide</span>
            </span>
          </summary>
          <ul className="mt-4 space-y-3">
            {results.slice(1).map(({ kit, reasons }) => (
              <li
                key={kit.id}
                className="rounded-lg border border-slate-100 bg-stone-50/80 px-3 py-3 text-sm"
              >
                <p className="font-semibold text-slate-900">{kit.name}</p>
                <p className="mt-1 text-slate-600">{reasons[0]}</p>
                <Button variant="ghost" size="sm" className="mt-2 h-auto px-0 text-amber-900" href={`/kits#${kit.id}`}>
                  Open kit →
                </Button>
              </li>
            ))}
          </ul>
        </details>
      ) : null}

      <p className="mt-6 text-xs text-slate-500">
        Mapping: Starter → Launch Pad · Discovery → Design Sprint · Explorer → Signal Lab · Advanced → Systems Navigator.
      </p>
    </aside>
  );
}
