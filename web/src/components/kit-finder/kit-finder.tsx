"use client";

import { useId, useMemo, useState } from "react";
import { RefreshCw } from "lucide-react";
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
  { id: "parent", label: "Parent" },
  { id: "school", label: "School" },
  { id: "learner", label: "Learner" },
  { id: "educator", label: "Educator" },
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

const empty: KitFinderAnswers = {
  persona: "",
  age: "",
  goal: "",
  setting: "",
  pace: "",
};

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
    <fieldset className="space-y-2">
      <legend className="text-sm font-semibold text-slate-900">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const selected = value === opt.id;
          return (
            <label
              key={opt.id}
              className={cn(
                "cursor-pointer rounded-xl border px-3 py-2 text-sm font-medium transition-colors focus-within:ring-2 focus-within:ring-amber-500 focus-within:ring-offset-2",
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

export function KitFinder() {
  const formId = useId();
  const [answers, setAnswers] = useState<KitFinderAnswers>(empty);
  const results = useMemo(() => recommendKits(answers), [answers]);

  const update = <K extends keyof KitFinderAnswers>(key: K, val: KitFinderAnswers[K]) => {
    setAnswers((a) => ({ ...a, [key]: val }));
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-12">
      <form
        id={formId}
        className="space-y-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
        onSubmit={(e) => e.preventDefault()}
        noValidate
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-slate-600">
            Answer a few questions—we&apos;ll suggest a learning path. Use arrow keys inside groups where supported.
          </p>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
            onClick={() => setAnswers(empty)}
          >
            <RefreshCw className="h-4 w-4" aria-hidden />
            Reset
          </button>
        </div>

        <ChoiceGroup
          legend="Who is this kit for?"
          name={`persona-${formId}`}
          options={personas}
          value={answers.persona}
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
      </form>

      <aside
        className="flex flex-col rounded-2xl border border-amber-100 bg-gradient-to-b from-amber-50/80 to-white p-6 shadow-inner sm:p-8"
        aria-live="polite"
      >
        <h3 className="text-lg font-semibold text-slate-900">Suggested kits</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          Recommendations shift as you adjust answers. Each match includes a short reason you can verify with your
          learner, classroom, or leadership team.
        </p>
        <ul className="mt-6 space-y-5">
          {results.map(({ kit, reasons }) => (
            <li key={kit.id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-widest text-amber-800">{kit.tier}</p>
              <p className="mt-1 text-base font-semibold text-slate-900">{kit.name}</p>
              <p className="mt-2 text-sm text-slate-600">
                <span className="font-semibold text-slate-800">Recommended because: </span>
                {reasons.join(" ")}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button variant="outline" size="sm" href={`/kits#${kit.id}`} className="bg-white">
                  View journey
                </Button>
                <Button variant="secondary" size="sm" href="/#contact">
                  Talk to us
                </Button>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-xs text-slate-500">
          Mapping: Starter → Launch Pad Core · Discovery → Design Sprint Kit · Explorer → Signal Lab · Advanced →
          Systems Navigator.
        </p>
      </aside>
    </div>
  );
}
