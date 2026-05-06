"use client";

import { useId, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Bot, Clock, Medal, Sparkles } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/container";
import { MissionCard } from "@/components/product/mission-card";
import { ProofUploadPreview } from "@/components/product/proof-upload-preview";
import { Button } from "@/components/ui/button";
import { allMissionLibraryItems, type MissionCategory } from "@/lib/missions-library";
import { cn } from "@/lib/utils";
import { cardSurface } from "@/lib/ui";

const TABS: { id: MissionCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "build", label: "Build" },
  { id: "observe", label: "Observe" },
  { id: "explain", label: "Explain" },
  { id: "share", label: "Share" },
];

function TodayProgressRing({ pct }: { pct: number }) {
  const rid = useId();
  const gradId = `ring-grad-${rid.replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const reduce = useReducedMotion();
  const r = 20;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - pct / 100);

  return (
    <svg width="52" height="52" viewBox="0 0 52 52" className="shrink-0" aria-hidden>
      <circle cx="26" cy="26" r={r} fill="none" stroke="rgb(241 245 249)" strokeWidth="4" />
      <motion.circle
        cx="26"
        cy="26"
        r={r}
        fill="none"
        stroke={`url(#${gradId})`}
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray={c}
        initial={reduce ? { strokeDashoffset: offset } : { strokeDashoffset: c }}
        whileInView={reduce ? undefined : { strokeDashoffset: offset }}
        viewport={{ once: true, margin: "-20px" }}
        transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
        transform="rotate(-90 26 26)"
      />
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#ea580c" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function MissionsPageClient() {
  const reduce = useReducedMotion();
  const [tab, setTab] = useState<MissionCategory | "all">("all");
  const items = useMemo(() => allMissionLibraryItems(), []);
  /* Rotates by UTC calendar day for a fresh “today” without fixed mock data. */
  // eslint-disable-next-line react-hooks/purity -- client-only marketing demo; SSR not used for this value in practice
  const daySeed = Math.floor(Date.now() / 86_400_000);
  const today = items[daySeed % items.length];

  const filtered = useMemo(
    () => (tab === "all" ? items : items.filter((i) => i.category === tab)),
    [items, tab],
  );

  return (
    <>
      <section className="border-b border-slate-200/80 bg-gradient-to-b from-amber-50/50 via-white to-white py-12 sm:py-14">
        <Container>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-800">Today&apos;s mission</p>
          <h1 className="mt-2 text-balance text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Do something real today
          </h1>
          <p className="mt-3 max-w-2xl text-pretty text-sm leading-snug text-slate-600 sm:text-base">
            One clear output, one reflection, one progress cue—same rhythm as inside a kit path.
          </p>

          <motion.article
            className={cn(cardSurface(), "mt-8 max-w-3xl rounded-3xl p-6 shadow-lg shadow-slate-900/10 sm:p-8")}
            initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex flex-1 flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-amber-950">
                  <Sparkles className="h-3.5 w-3.5" aria-hidden />
                  Today
                </span>
                {today.kitId !== "library" ? (
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-800 ring-1 ring-slate-200">
                    {today.kitName}
                  </span>
                ) : null}
                <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-800 ring-1 ring-slate-200">
                  <Clock className="h-3.5 w-3.5" aria-hidden />~{today.minutes} min · {today.difficulty}
                </span>
              </div>
              <div className="flex items-center gap-3 sm:flex-col sm:items-end">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 sm:text-right">
                  Daily rhythm
                </span>
                <TodayProgressRing pct={42} />
              </div>
            </div>
            <h2 className="mt-5 text-xl font-semibold text-slate-900 sm:text-2xl">{today.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-base">{today.summary}</p>
            <div className="mt-6 grid gap-4 border-t border-slate-200/80 pt-5 sm:grid-cols-2">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Output</p>
                <p className="mt-1 text-sm text-slate-800">{today.output}</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Reflect</p>
                <p className="mt-1 text-sm text-slate-800">{today.reflectionPrompt}</p>
              </div>
            </div>
            <p className="mt-4 text-xs font-semibold text-amber-900">{today.badgeHint}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Button variant="primary" href="/find-my-kit">
                Match a kit
              </Button>
              <Button variant="outline" href="/studio" className="bg-white">
                Open studio preview
              </Button>
            </div>
          </motion.article>
        </Container>
      </section>

      <section className="border-b border-slate-200/80 bg-white py-12" aria-labelledby="mission-categories-heading">
        <Container>
          <h2 id="mission-categories-heading" className="text-lg font-semibold text-slate-900 sm:text-xl">
            Mission categories
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">
            Build, observe, explain, share—pick the kind of thinking you want to practice today.
          </p>
          <div
            className="mt-6 inline-flex max-w-full flex-wrap gap-1 overflow-x-auto rounded-full bg-slate-100/90 p-1 ring-1 ring-slate-200/80"
            role="tablist"
            aria-label="Mission categories"
          >
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={tab === t.id}
                className={cn(
                  "relative rounded-full px-4 py-2 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 sm:text-sm",
                  tab === t.id ? "text-amber-950" : "text-slate-600 hover:text-slate-900",
                )}
                onClick={() => setTab(t.id)}
              >
                {tab === t.id ? (
                  <motion.span
                    layoutId="missions-tab-pill"
                    className="absolute inset-0 z-0 rounded-full bg-white shadow-sm ring-1 ring-amber-300/60"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                ) : null}
                <span className="relative z-[1]">{t.label}</span>
              </button>
            ))}
          </div>
        </Container>
      </section>

      <section id="sample-mission" className="border-b border-slate-200/80 bg-stone-50/80 py-12 sm:py-14">
        <Container>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-800">Sample mission</p>
          <h2 className="mt-2 text-xl font-semibold text-slate-900 sm:text-2xl">Try this in ~20 minutes</h2>
          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_280px]">
            <MissionCard
              title="Build a bridge from limited materials"
              skill="Creative problem solving"
              minutes={20}
              difficulty="Moderate"
              kitLabel="Any kit / open build"
              output="Photo + 3-line reflection"
              reflection="What did you try, what failed, and what would you improve next?"
              badge="Sample complete · Explorer badge +1 (demo)"
            />
            <div className="space-y-4">
              <ProofUploadPreview />
              <div className={cn(cardSurface(), "rounded-2xl p-4 shadow-sm")}>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Progress</p>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                  <motion.div
                    className="h-full w-1/3 origin-left rounded-full bg-gradient-to-r from-amber-500 to-orange-500"
                    initial={reduce ? { scaleX: 1 } : { scaleX: 0 }}
                    whileInView={reduce ? undefined : { scaleX: 1 }}
                    viewport={{ once: true, margin: "-24px" }}
                    transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
                <p className="mt-2 flex items-center gap-1 text-xs text-slate-600">
                  <Medal className="h-3.5 w-3.5 text-amber-700" aria-hidden />
                  Next unlock: Explain your trade-off in one paragraph
                </p>
              </div>
            </div>
          </div>
          <Button variant="primary" size="lg" className="mt-8" href="/studio">
            Start sample mission
          </Button>
        </Container>
      </section>

      <section className="border-b border-slate-200/80 bg-white py-12" aria-labelledby="ai-reflection-heading">
        <Container>
          <h2 id="ai-reflection-heading" className="text-lg font-semibold text-slate-900 sm:text-xl">
            Sample AI reflection
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">
            The copilot asks better questions—it doesn&apos;t replace your build. Example tone:
          </p>
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <div className={cn(cardSurface(), "rounded-2xl p-5 shadow-sm")}>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">You might say</p>
              <p className="mt-2 text-sm text-slate-800">
                “My first bridge collapsed when I added weight—too thin on the span.”
              </p>
            </div>
            <div className={cn(cardSurface(), "rounded-2xl border-amber-100 bg-amber-50/50 p-5 shadow-sm")}>
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-900">
                <Bot className="h-4 w-4" aria-hidden />
                Coach prompt
              </p>
              <p className="mt-2 text-sm text-slate-800">
                What constraint did you relax to get the second version to hold? If you had one more material, where
                would you spend it—and why?
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-14" aria-labelledby="mission-library-heading">
        <Container>
          <h2 id="mission-library-heading" className="text-xl font-semibold text-slate-900 sm:text-2xl">
            Mission library
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-600 sm:text-base">
            Pulled from real kit paths—open the journey for the full arc.
          </p>

          <AnimatePresence mode="wait">
            <motion.ul
              key={tab}
              className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            >
              {filtered.map((m) => (
                <motion.li
                  key={m.id}
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <MissionCard
                    title={m.title}
                    skill={m.category.charAt(0).toUpperCase() + m.category.slice(1)}
                    minutes={m.minutes}
                    difficulty={m.difficulty}
                    kitLabel={m.kitId === "library" ? "Any path" : m.kitName}
                    output={m.output}
                    reflection={m.reflectionPrompt}
                    badge={m.badgeHint}
                  />
                  <p className="mt-2 text-center text-xs">
                    {m.kitId !== "library" ? (
                      <Link href={`/kits#${m.kitId}`} className="font-semibold text-amber-900 underline-offset-2 hover:underline">
                        View kit journey
                      </Link>
                    ) : null}
                  </p>
                </motion.li>
              ))}
            </motion.ul>
          </AnimatePresence>
        </Container>
      </section>
    </>
  );
}
