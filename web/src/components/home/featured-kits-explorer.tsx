"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Clock, Package, Sparkles, Target } from "lucide-react";
import { FadeIn } from "@/components/fade-in";
import { useHomePersona } from "@/components/home/persona-provider";
import { Button } from "@/components/ui/button";
import { FEATURED_KIT_IDS, getKitById, type KitProduct } from "@/lib/kits-catalog";
import type { KitFinderPersona } from "@/lib/kit-finder-logic";
import { cn } from "@/lib/utils";

const PRIORITY: Record<KitFinderPersona, readonly string[]> = {
  parent: ["launch-pad-core", "design-sprint-kit", "signal-lab", "systems-navigator"],
  school: ["launch-pad-core", "signal-lab", "systems-navigator", "design-sprint-kit"],
  learner: ["design-sprint-kit", "signal-lab", "launch-pad-core", "systems-navigator"],
  educator: ["signal-lab", "systems-navigator", "design-sprint-kit", "launch-pad-core"],
};

function orderedKitIds(persona: KitFinderPersona | null): string[] {
  const base = [...FEATURED_KIT_IDS] as string[];
  if (!persona) return [...FEATURED_KIT_IDS];
  const pref = PRIORITY[persona] as readonly string[];
  return [...pref.filter((id) => base.includes(id)), ...base.filter((id) => !pref.includes(id))];
}

type FeaturedKitsExplorerProps = {
  /** When true, omit outer heading row (parent section supplies it). */
  compactHeader?: boolean;
};

export function FeaturedKitsExplorer(props: FeaturedKitsExplorerProps) {
  const { persona } = useHomePersona();
  return <FeaturedKitsExplorerInner key={persona ?? "all"} {...props} persona={persona} />;
}

function FeaturedKitsExplorerInner({
  compactHeader = false,
  persona,
}: FeaturedKitsExplorerProps & { persona: KitFinderPersona | null }) {
  const reduce = useReducedMotion();
  const ids = useMemo(() => orderedKitIds(persona), [persona]);
  const kits = useMemo(
    () => ids.map((id) => getKitById(id)).filter((k): k is KitProduct => Boolean(k)),
    [ids],
  );
  const [pickedTab, setPickedTab] = useState<string | null>(null);
  const [mobileIdx, setMobileIdx] = useState(0);

  const activeId = useMemo(() => {
    const first = kits[0]?.id ?? "";
    if (pickedTab && kits.some((k) => k.id === pickedTab)) return pickedTab;
    return first;
  }, [kits, pickedTab]);

  const active = kits.find((k) => k.id === activeId) ?? kits[0];
  const mobileKit = kits[Math.min(mobileIdx, Math.max(0, kits.length - 1))] ?? kits[0];

  return (
    <div>
      {!compactHeader ? (
        <FadeIn>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-800">Featured kits</p>
              <h2 className="mt-2 text-balance text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                Compare journeys
              </h2>
              <p className="mt-2 max-w-xl text-pretty text-sm text-slate-600 sm:text-base">
                One detail panel at a time—pick a kit, expand specs only if you need them.
              </p>
            </div>
            <Button variant="outline" size="sm" href="/kits" className="shrink-0 bg-white">
              Full catalog
            </Button>
          </div>
        </FadeIn>
      ) : (
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-800">Featured kits</p>
            <h3 className="mt-1 text-lg font-semibold text-slate-900 sm:text-xl">Compare journeys</h3>
          </div>
          <Button variant="outline" size="sm" href="/kits" className="shrink-0 bg-white">
            Catalog
          </Button>
        </div>
      )}

      {/* Mobile: picker + single panel */}
      <div className="mt-6 lg:hidden">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-800 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 disabled:opacity-40"
            aria-label="Previous kit"
            disabled={mobileIdx <= 0}
            onClick={() => setMobileIdx((i) => Math.max(0, i - 1))}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex min-w-0 flex-1 flex-wrap justify-center gap-2">
            {kits.map((k, i) => (
              <button
                key={k.id}
                type="button"
                className={cn(
                  "max-w-[10rem] truncate rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500",
                  i === mobileIdx
                    ? "border-amber-400 bg-amber-50 text-amber-950"
                    : "border-slate-200 bg-white text-slate-700",
                )}
                onClick={() => setMobileIdx(i)}
              >
                {k.name.replace(" Kit", "")}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-800 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 disabled:opacity-40"
            aria-label="Next kit"
            disabled={mobileIdx >= kits.length - 1}
            onClick={() => setMobileIdx((i) => Math.min(kits.length - 1, i + 1))}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
        <div className="mt-3 flex justify-center gap-1.5" aria-hidden>
          {kits.map((k, i) => (
            <span
              key={k.id}
              className={cn("h-1.5 w-1.5 rounded-full", i === mobileIdx ? "bg-amber-500" : "bg-slate-200")}
            />
          ))}
        </div>
        {mobileKit ? (
          <motion.div
            key={mobileKit.id}
            className="mt-6"
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22 }}
          >
            <FeaturedKitPanels kit={mobileKit} />
          </motion.div>
        ) : null}
      </div>

      {/* Desktop */}
      <div className="mt-8 hidden lg:block">
        <div
          className="flex flex-wrap gap-2 border-b border-slate-200/80 pb-3"
          role="tablist"
          aria-label="Featured kits"
        >
          {kits.map((k) => {
            const selected = active?.id === k.id;
            return (
              <button
                key={k.id}
                type="button"
                role="tab"
                aria-selected={selected}
                id={`tab-${k.id}`}
                aria-controls={`panel-${k.id}`}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500",
                  selected
                    ? "border-amber-400 bg-amber-50 text-amber-950"
                    : "border-transparent bg-white text-slate-700 hover:border-slate-200",
                )}
                onClick={() => {
                  setPickedTab(k.id);
                  const idx = kits.findIndex((x) => x.id === k.id);
                  if (idx >= 0) setMobileIdx(idx);
                }}
              >
                {k.name}
              </button>
            );
          })}
        </div>

        {active ? (
          <motion.div
            key={active.id}
            role="tabpanel"
            id={`panel-${active.id}`}
            aria-labelledby={`tab-${active.id}`}
            className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]"
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <KitDetailPanel kit={active} showActions={false} />
            <MissionAside kit={active} />
          </motion.div>
        ) : null}
      </div>
    </div>
  );
}

function MissionAside({ kit }: { kit: KitProduct }) {
  return (
    <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">First mission</p>
      <p className="mt-3 text-lg font-semibold text-slate-900">{kit.firstMissionTitle}</p>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{kit.firstMissionSummary}</p>
      <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-slate-700">
        <span className="inline-flex items-center gap-1 rounded-full bg-stone-100 px-2.5 py-1">
          <Clock className="h-3.5 w-3.5" aria-hidden />
          ~{kit.firstMissionMinutes} min
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-stone-100 px-2.5 py-1">
          <Sparkles className="h-3.5 w-3.5" aria-hidden />
          {kit.dailyMissionCount} missions in arc
        </span>
      </div>
      <Button variant="primary" className="mt-6 w-full sm:w-auto" href={`/kits#${kit.id}`}>
        Open full journey
      </Button>
    </aside>
  );
}

function FeaturedKitPanels({ kit }: { kit: KitProduct }) {
  return (
    <div className="grid gap-6">
      <KitDetailPanel kit={kit} showActions={false} />
      <MissionAside kit={kit} />
    </div>
  );
}

function KitDetailPanel({
  kit,
  showActions = true,
}: {
  kit: KitProduct;
  showActions?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-[10px] font-bold uppercase tracking-widest text-amber-800">{kit.tier}</p>
      <p className="mt-1 text-lg font-semibold text-slate-900">{kit.name}</p>
      <p className="mt-3 text-sm font-medium text-slate-800">{kit.blurb}</p>
      <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
        <div className="flex gap-2 rounded-xl bg-stone-50 px-3 py-2">
          <Target className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" aria-hidden />
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Best for</dt>
            <dd className="text-slate-800">{kit.bestFor}</dd>
          </div>
        </div>
        <div className="flex gap-2 rounded-xl bg-stone-50 px-3 py-2">
          <Package className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" aria-hidden />
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Age range</dt>
            <dd className="text-slate-800">{kit.ageRange}</dd>
          </div>
        </div>
      </dl>

      <details className="mt-5 group rounded-xl border border-slate-100 bg-stone-50/60 p-4">
        <summary className="cursor-pointer text-sm font-semibold text-slate-900 marker:content-none [&::-webkit-details-marker]:hidden">
          What&apos;s inside · quick scan
        </summary>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {kit.contents.slice(0, 6).map((c) => (
            <li key={c.label} className="flex items-start gap-2 text-sm text-slate-700">
              <c.icon className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" aria-hidden />
              <span>{c.label}</span>
            </li>
          ))}
        </ul>
      </details>

      <details className="mt-3 group rounded-xl border border-slate-100 bg-stone-50/60 p-4">
        <summary className="cursor-pointer text-sm font-semibold text-slate-900 marker:content-none [&::-webkit-details-marker]:hidden">
          Outcomes learners ship
        </summary>
        <ul className="mt-3 flex flex-wrap gap-2">
          {kit.skillOutcomes.map((s) => (
            <li key={s} className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-800 ring-1 ring-slate-200">
              {s}
            </li>
          ))}
        </ul>
      </details>

      {showActions ? (
        <div className="mt-6 flex flex-wrap gap-2">
          <Button variant="primary" href={`/kits#${kit.id}`}>
            View journey
          </Button>
          <Button variant="outline" href="/find-my-kit" className="bg-white">
            Refine match
          </Button>
        </div>
      ) : null}
    </div>
  );
}
