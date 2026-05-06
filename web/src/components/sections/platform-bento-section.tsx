"use client";

import {
  BookOpen,
  Bot,
  GraduationCap,
  HeartHandshake,
  Layers,
  QrCode,
  Route,
  School,
  Target,
  UserRound,
} from "lucide-react";
import { useState } from "react";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { cardSurface } from "@/lib/ui";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "unbox", label: "Unbox" },
  { id: "operate", label: "Operate" },
  { id: "scale", label: "Scale" },
] as const;

type TabId = (typeof tabs)[number]["id"];

const tabCopy: Record<
  TabId,
  { title: string; body: string; bullets: readonly string[] }
> = {
  unbox: {
    title: "Everything in one orchestrated layer",
    body: "Hardware, guided briefs, QR-linked journeys, and AI scaffolding arrive together—no scavenger hunts.",
    bullets: [
      "Premium components + consumables staged for classrooms or homes",
      "Challenge cards sequenced for momentum, not overwhelm",
      "Onboarding QR takes learners from zero to first build fast",
    ],
  },
  operate: {
    title: "Run sessions with signal, not noise",
    body: "Facilitators get predictable pacing; learners get autonomy within guardrails.",
    bullets: [
      "AI supports explain / reflect modes—never replaces the build",
      "Progress signals keep cohorts aligned without micromanagement",
      "Swap pathways when a group outpaces the plan",
    ],
  },
  scale: {
    title: "Volume-ready without diluting the experience",
    body: "Districts and networks reorder, track, and replenish through the same surface you use for pilots.",
    bullets: [
      "Batch-friendly manifests with clear spare-part lines for busy labs",
      "Track and order history stay in the same place you run pilots from",
      "Support routing for purchase orders, pilots, and custom kit waves",
    ],
  },
};

const steps = [
  { n: "1", title: "Pick pathway", body: "Match kit tier to cohort." },
  { n: "2", title: "Run build", body: "Hands-on first, AI second." },
  { n: "3", title: "Ship proof", body: "Artifact + reflection captured." },
  { n: "4", title: "Level up", body: "Reorder the next tier." },
] as const;

const inside = [
  { title: "Hands-on", icon: Layers },
  { title: "Challenges", icon: BookOpen },
  { title: "QR spine", icon: QrCode },
  { title: "AI prompts", icon: Bot },
  { title: "Reflection", icon: Route },
  { title: "Signals", icon: Target },
] as const;

const buyers = [
  { title: "Schools", body: "Labs & cohort programs", icon: School, id: "for-schools" as const },
  { title: "Parents", body: "Structured home builds", icon: HeartHandshake, id: "for-parents" as const },
  { title: "Learners", body: "Portfolio-ready depth", icon: UserRound, id: undefined },
  { title: "Educators", body: "Facilitation, not babysitting", icon: GraduationCap, id: undefined },
] as const;

export function PlatformBentoSection() {
  const [tab, setTab] = useState<TabId>("unbox");
  const copy = tabCopy[tab];

  return (
    <section
      id="platform"
      className="scroll-mt-28 border-b border-slate-200/70 bg-white py-12 sm:py-14 lg:py-16"
      aria-labelledby="platform-heading"
    >
      <Container>
        <SectionHeading
          id="platform-heading"
          eyebrow="Platform"
          title="One operating system for premium kits"
          description={
            <p className="max-w-2xl">
              Shop, fulfill, track, and replenish from the same surface learners touch—built for the next decade of
              blended learning.
            </p>
          }
        />

        <div className="mt-8 grid gap-4 lg:grid-cols-12 lg:gap-5">
          <div className={cn(cardSurface(), "lg:col-span-7 rounded-2xl p-5 sm:p-6")}>
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Platform views">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={tab === t.id}
                  onClick={() => setTab(t.id)}
                  className={cn(
                    "rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors",
                    tab === t.id
                      ? "bg-slate-900 text-amber-200"
                      : "bg-stone-100 text-slate-600 hover:bg-stone-200",
                  )}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <h3 className="mt-5 text-lg font-semibold text-slate-900">{copy.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{copy.body}</p>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              {copy.bullets.map((b) => (
                <li key={b} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" aria-hidden />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-2">
              <Button variant="primary" size="md" href="/kits">
                Open shop
              </Button>
              <Button variant="outline" size="md" href="/orders" className="bg-white">
                Order desk
              </Button>
            </div>
          </div>

          <div className="grid gap-4 lg:col-span-5">
            <div className={cn(cardSurface(), "rounded-2xl p-4 sm:p-5")}>
              <p className="text-xs font-semibold uppercase tracking-wider text-amber-800">Flow</p>
              <ol className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-2">
                {steps.map((s) => (
                  <li key={s.n} className="rounded-xl border border-slate-100 bg-stone-50/80 p-3">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-amber-700">Step {s.n}</p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">{s.title}</p>
                    <p className="mt-0.5 text-[11px] leading-snug text-slate-600">{s.body}</p>
                  </li>
                ))}
              </ol>
            </div>
            <div className={cn(cardSurface(), "rounded-2xl p-4 sm:p-5")}>
              <p className="text-xs font-semibold uppercase tracking-wider text-amber-800">Inside every kit</p>
              <ul className="mt-3 grid grid-cols-3 gap-2">
                {inside.map((f) => (
                  <li
                    key={f.title}
                    className="flex flex-col items-center rounded-lg border border-slate-100 bg-white px-2 py-2 text-center"
                  >
                    <f.icon className="h-4 w-4 text-amber-700" aria-hidden />
                    <span className="mt-1 text-[10px] font-semibold leading-tight text-slate-800">{f.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {buyers.map((b) => (
            <li
              key={b.title}
              id={b.id}
              className={cn(cardSurface(), "rounded-2xl p-4 ek-card-lift")}
            >
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-900 ring-1 ring-amber-200/80">
                  <b.icon className="h-4 w-4" aria-hidden />
                </span>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">{b.title}</h4>
                  <p className="text-xs text-slate-600">{b.body}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
