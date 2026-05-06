"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { GraduationCap, HeartHandshake, School, Sparkles, User } from "lucide-react";
import { Container } from "@/components/container";
import { FadeIn } from "@/components/fade-in";
import { useHomePersona } from "@/components/home/persona-provider";
import type { KitFinderPersona } from "@/lib/kit-finder-logic";
import { cn } from "@/lib/utils";
import { cardSurface } from "@/lib/ui";

const CARDS: {
  id: KitFinderPersona;
  title: string;
  icon: typeof HeartHandshake;
  tagline: string;
  detail: string;
}[] = [
  {
    id: "parent",
    title: "Parents",
    icon: HeartHandshake,
    tagline: "Rhythms that stick at home—without turning you into the curriculum.",
    detail:
      "Lean on guided missions, gentle pacing, and proof you can celebrate together. We bias recommendations toward welcoming first journeys.",
  },
  {
    id: "school",
    title: "Schools",
    icon: School,
    tagline: "Pilots that feel premium to learners and workable for your team.",
    detail:
      "Cohort-friendly pathways, facilitator-ready structure, and visibility into momentum—so pilots stay grounded in learner outcomes.",
  },
  {
    id: "learner",
    title: "Learners",
    icon: Sparkles,
    tagline: "Build real things, reflect with support, and see progress add up.",
    detail:
      "Hands-on kits plus AI-guided reflection that never replaces the build. Featured picks highlight creative and STEM-forward journeys.",
  },
  {
    id: "educator",
    title: "Educators",
    icon: GraduationCap,
    tagline: "Facilitation-ready flows, clear outcomes, and artifacts worth showcasing.",
    detail:
      "Short missions, observable milestones, and language you can use with families or leadership—without extra busywork.",
  },
];

export function PersonaSelectorSection() {
  const { persona, setPersona } = useHomePersona();
  const reduce = useReducedMotion();
  const active = persona ? CARDS.find((c) => c.id === persona) : null;

  return (
    <section
      id="personas"
      className="scroll-mt-28 border-b border-slate-200/70 bg-white py-12 sm:py-14 lg:py-16"
      aria-labelledby="personas-heading"
    >
      <Container>
        <FadeIn>
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-800">Start here</p>
            <h2 id="personas-heading" className="mt-2 text-balance text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Who are you planning for?
            </h2>
            <p className="mt-3 text-pretty text-sm leading-relaxed text-slate-600 sm:text-base">
              Choose a path—we&apos;ll tune kit highlights and your finder answers. Everything stays skimmable.
            </p>
          </div>
        </FadeIn>

        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {CARDS.map((c, idx) => {
            const selected = persona === c.id;
            const Icon = c.icon;
            return (
              <li key={c.id}>
                <FadeIn delay={idx * 0.04}>
                  <motion.button
                    type="button"
                    onClick={() => setPersona(selected ? null : c.id)}
                    className={cn(
                      cardSurface(),
                      "ek-card-lift w-full rounded-2xl p-4 text-left shadow-sm ring-1 transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2",
                      selected ? "ring-amber-400/80 bg-amber-50/50" : "ring-transparent",
                    )}
                    whileHover={reduce ? undefined : { y: -2 }}
                    whileTap={reduce ? undefined : { scale: 0.99 }}
                    aria-pressed={selected}
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-inner ring-1 ring-slate-200">
                      <Icon className="h-5 w-5 text-amber-800" aria-hidden />
                    </span>
                    <span className="mt-3 block text-base font-semibold text-slate-900">{c.title}</span>
                    <span className="mt-1 block text-sm leading-snug text-slate-600">{c.tagline}</span>
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-amber-900">
                      <User className="h-3.5 w-3.5" aria-hidden />
                      {selected ? "Selected · tap to clear" : "Tap to personalize"}
                    </span>
                  </motion.button>
                </FadeIn>
              </li>
            );
          })}
        </ul>

        {active ? (
          <motion.div
            className="mt-8 rounded-2xl border border-slate-200/90 bg-stone-50/80 px-4 py-4 sm:px-6"
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-sm font-semibold text-slate-900">Tailored for {active.title.toLowerCase()}</p>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-700">{active.detail}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/find-my-kit"
                className="inline-flex items-center rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-sm hover:bg-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              >
                Open Kit Finder
              </Link>
              <Link
                href="/kits"
                className="inline-flex items-center rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:border-amber-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              >
                Compare kits
              </Link>
            </div>
          </motion.div>
        ) : (
          <p className="mt-6 text-sm text-slate-500">
            Optional: select a card to reorder featured kits and align the finder with your context.
          </p>
        )}
      </Container>
    </section>
  );
}
