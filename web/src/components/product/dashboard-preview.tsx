"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Camera, Flame, Medal, NotebookPen, Package, Sparkles, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { cardSurface } from "@/lib/ui";

export type DashboardPreviewProps = {
  /** Tighter layout when embedded on marketing pages */
  variant?: "full" | "compact";
};

/** Demo learner studio — swap data source when backend is ready. */
export function DashboardPreview({ variant = "full" }: DashboardPreviewProps) {
  const compact = variant === "compact";
  const reduce = useReducedMotion();

  return (
    <div className={cn("grid gap-4", compact ? "sm:grid-cols-2" : "lg:grid-cols-3")}>
      <div className={cn(cardSurface(), "rounded-2xl p-5 shadow-sm lg:col-span-2")}>
        <p className="text-xs font-semibold uppercase tracking-wider text-amber-800">Current mission</p>
        <p className="mt-2 text-lg font-semibold text-slate-900">Observe · Map one signal in the wild</p>
        <p className="mt-1 text-sm text-slate-600">Signal Lab · Day 6 of 24 · ~35 min</p>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
          <motion.div
            className="h-full w-[40%] origin-left rounded-full bg-gradient-to-r from-amber-500 to-orange-500"
            initial={reduce ? { scaleX: 1 } : { scaleX: 0 }}
            whileInView={reduce ? undefined : { scaleX: 1 }}
            viewport={{ once: true, margin: "-24px" }}
            transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
        <p className="mt-2 text-xs text-slate-500">Demo preview—your cohort connects here when live.</p>
      </div>
      <div className={cn(cardSurface(), "flex flex-col justify-between rounded-2xl p-5 shadow-sm")}>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Streak</p>
          <p className="mt-2 flex items-center gap-2 text-2xl font-semibold text-slate-900">
            <Flame className="h-6 w-6 text-orange-500" aria-hidden />
            5 days
          </p>
        </div>
        <p className="mt-3 text-xs text-slate-600">Encouraging rhythm—no penalties for missing a day.</p>
      </div>
      <div className={cn(cardSurface(), "rounded-2xl p-5 shadow-sm")}>
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Completed</p>
        <p className="mt-2 text-2xl font-semibold text-slate-900">12</p>
        <p className="text-xs text-slate-600">Missions in this kit path</p>
      </div>
      <div className={cn(cardSurface(), "rounded-2xl p-5 shadow-sm")}>
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Proof uploaded</p>
        <p className="mt-2 flex items-center gap-2 text-2xl font-semibold text-slate-900">
          <Camera className="h-5 w-5 text-amber-700" aria-hidden />
          3
        </p>
      </div>
      <div className={cn(cardSurface(), "rounded-2xl p-5 shadow-sm")}>
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Reflections</p>
        <p className="mt-2 flex items-center gap-2 text-2xl font-semibold text-slate-900">
          <NotebookPen className="h-5 w-5 text-amber-700" aria-hidden />
          8
        </p>
      </div>
      <div className={cn(cardSurface(), "rounded-2xl p-5 shadow-sm lg:col-span-3")}>
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Badges</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {["Builder", "Observer", "Explainer"].map((b) => (
            <span
              key={b}
              className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-950"
            >
              <Medal className="h-3.5 w-3.5" aria-hidden />
              {b}
            </span>
          ))}
        </div>
      </div>
      <div className={cn(cardSurface(), "rounded-2xl p-5 shadow-sm lg:col-span-2")}>
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Kit journey</p>
        <p className="mt-2 flex items-center gap-2 font-semibold text-slate-900">
          <Package className="h-4 w-4 text-amber-800" aria-hidden />
          Signal Lab → next: Systems Navigator
        </p>
        <p className="mt-2 text-sm text-slate-600">When your arc completes, we suggest the pathway that deepens evidence and narrative.</p>
      </div>
      <div className={cn(cardSurface(), "rounded-2xl p-5 shadow-sm")}>
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Next mission</p>
        <p className="mt-2 flex items-start gap-2 text-sm font-medium text-slate-900">
          <TrendingUp className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" aria-hidden />
          Mission 07 · Compare two readings honestly
        </p>
        <p className="mt-2 flex items-center gap-1 text-xs text-amber-900">
          <Sparkles className="h-3.5 w-3.5" aria-hidden />
          Unlocks after proof on Mission 06
        </p>
      </div>
    </div>
  );
}
