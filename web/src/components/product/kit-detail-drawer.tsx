"use client";

import { useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import type { KitProduct } from "@/lib/kits-catalog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { cardSurface } from "@/lib/ui";

export type KitDetailDrawerProps = {
  kit: KitProduct | null;
  open: boolean;
  onClose: () => void;
};

export function KitDetailDrawer({ kit, open, onClose }: KitDetailDrawerProps) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open || !kit) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <button
        type="button"
        aria-label="Close kit details"
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]"
        onClick={onClose}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby={`kit-drawer-${kit.id}-title`}
        className={cn(
          cardSurface(),
          "relative flex h-full w-full max-w-lg flex-col overflow-y-auto border-l border-slate-200 bg-stone-50 shadow-2xl motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out sm:max-w-xl",
        )}
      >
        <div className="sticky top-0 z-[1] flex items-start justify-between gap-3 border-b border-slate-200/80 bg-stone-50/95 px-5 py-4 backdrop-blur-sm">
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-widest text-amber-800">{kit.tier}</p>
            <h2 id={`kit-drawer-${kit.id}-title`} className="mt-1 text-xl font-semibold tracking-tight text-slate-900">
              {kit.name}
            </h2>
            <p className="mt-0.5 text-sm font-medium text-slate-600">{kit.tagline}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>

        <div className="flex-1 space-y-6 px-5 py-6">
          <div className="grid gap-2 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-100 bg-white px-3 py-2.5">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Age range</p>
              <p className="mt-1 text-sm font-medium text-slate-900">{kit.ageRange}</p>
            </div>
            <div className="rounded-xl border border-slate-100 bg-white px-3 py-2.5">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Difficulty</p>
              <p className="mt-1 text-sm font-medium text-slate-900">{kit.difficulty}</p>
            </div>
            <div className="rounded-xl border border-slate-100 bg-white px-3 py-2.5 sm:col-span-2">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Best for</p>
              <p className="mt-1 text-sm font-medium text-slate-900">{kit.bestFor}</p>
            </div>
          </div>

          <div className="rounded-xl border border-amber-100 bg-amber-50/60 px-4 py-3">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-amber-900">First mission</p>
            <p className="mt-1 text-sm font-semibold text-slate-900">{kit.firstMissionTitle}</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">{kit.firstMissionSummary}</p>
            <p className="mt-2 text-xs text-slate-600">Typical time: ~{kit.firstMissionMinutes} min</p>
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Mission arc</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">
              {kit.dailyMissionCount} guided missions from open-box rituals to a share-ready capstone—structured so
              learners ship proof, not just consume steps.
            </p>
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">What&apos;s in the box</p>
            <ul className="mt-2 grid gap-2 sm:grid-cols-2">
              {kit.contents.map((c) => (
                <li
                  key={c.label}
                  className="flex items-center gap-2 rounded-lg border border-slate-100 bg-white px-2.5 py-2 text-xs font-medium text-slate-800"
                >
                  <c.icon className="h-3.5 w-3.5 shrink-0 text-amber-700" aria-hidden />
                  {c.label}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Skill outcomes</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {kit.skillOutcomes.map((s) => (
                <li
                  key={s}
                  className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-800"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-slate-100 bg-white px-4 py-3">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Final proof</p>
            <p className="mt-1 text-sm font-medium text-slate-900">{kit.finalArtifact}</p>
            <p className="mt-2 text-sm text-slate-600">{kit.whatLearnerBuilds}</p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white px-4 py-3">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Parent / teacher guide</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">
              Each path includes facilitator cues, pacing options, and how to celebrate proof without turning missions
              into busywork—details ship with your kit.
            </p>
          </div>

          <div className="flex flex-col gap-2 pb-4 sm:flex-row">
            <Button variant="primary" size="md" href="/missions" className="w-full sm:w-auto" onClick={onClose}>
              Start with missions
            </Button>
            <Button variant="outline" size="md" href="/support" className="w-full bg-white sm:w-auto" onClick={onClose}>
              Request quote
            </Button>
          </div>
          <p className="text-center text-xs text-slate-500">
            <Link href={`/kits#${kit.id}`} className="font-semibold text-amber-800 underline-offset-2 hover:underline" onClick={onClose}>
              Permalink to this journey
            </Link>
          </p>
        </div>
      </aside>
    </div>
  );
}
