"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Clock, Package, Sparkles } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/container";
import { FadeIn } from "@/components/fade-in";
import { Button } from "@/components/ui/button";
import { KITS, type KitProduct } from "@/lib/kits-catalog";
import { cn } from "@/lib/utils";
import { cardSurface } from "@/lib/ui";

const MISSION_FOCUS: Record<string, string> = {
  "launch-pad-core": "Build",
  "design-sprint-kit": "Prototype",
  "signal-lab": "Observe",
  "systems-navigator": "Analyze",
};

function focusLabel(kit: KitProduct) {
  return MISSION_FOCUS[kit.id] ?? "Build";
}

export function DailyMissionPreview() {
  const reduce = useReducedMotion();
  const kits = useMemo(() => [...KITS], []);
  const [i, setI] = useState(0);
  const kit = kits[i % kits.length];

  useEffect(() => {
    if (reduce || kits.length <= 1) return;
    const t = window.setInterval(() => setI((v) => (v + 1) % kits.length), 10000);
    return () => window.clearInterval(t);
  }, [reduce, kits.length]);

  return (
    <section
      id="daily-mission-preview"
      className="scroll-mt-28 border-b border-slate-200/70 bg-gradient-to-b from-amber-50/40 via-white to-stone-50 py-12 sm:py-14 lg:py-16"
      aria-labelledby="mission-preview-heading"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:items-center">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-800">Daily missions</p>
            <h2
              id="mission-preview-heading"
              className="mt-2 text-balance text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl"
            >
              How missions read in each kit
            </h2>
            <p className="mt-3 max-w-xl text-pretty text-sm text-slate-600 sm:text-base">
              Each kit&apos;s first mission is listed in the catalog; this preview rotates through the same copy you&apos;ll
              see when you open a journey—short, physical, and reflective.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Button variant="primary" href="/missions">
                Mission library
              </Button>
              <Button variant="outline" href="/find-my-kit" className="bg-white">
                Find my kit
              </Button>
            </div>
          </FadeIn>

          <AnimatePresence mode="wait">
            <motion.div
              key={kit.id}
              className={cn(cardSurface(), "relative overflow-hidden rounded-3xl p-6 shadow-lg shadow-slate-900/10 sm:p-8")}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-amber-300/25 blur-3xl" aria-hidden />
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-amber-950">
                  <Package className="h-3.5 w-3.5" aria-hidden />
                  {kit.name}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-800 ring-1 ring-slate-200">
                  {focusLabel(kit)}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-800 ring-1 ring-slate-200">
                  <Clock className="h-3.5 w-3.5" aria-hidden />
                  ~{kit.firstMissionMinutes} min
                </span>
              </div>
              <h3 className="mt-5 text-xl font-semibold text-slate-900 sm:text-2xl">{kit.firstMissionTitle}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-base">{kit.firstMissionSummary}</p>
              <div className="mt-6 flex flex-wrap items-start gap-4 border-t border-slate-200/80 pt-5 text-sm">
                <span className="inline-flex items-center gap-2 font-semibold text-slate-900">
                  <Sparkles className="h-4 w-4 shrink-0 text-amber-700" aria-hidden />
                  {kit.dailyMissionCount} missions in arc
                </span>
                <span className="min-w-0 text-slate-600">
                  <span className="font-semibold text-slate-800">Capstone: </span>
                  {kit.finalArtifact}
                </span>
              </div>
              <p className="mt-4 text-xs text-slate-500">
                Open the full journey on the kit page.{" "}
                <Link href={`/kits#${kit.id}`} className="font-semibold text-amber-900 underline-offset-2 hover:underline">
                  View {kit.name}
                </Link>
                .
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}
