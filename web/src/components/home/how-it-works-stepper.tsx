"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Bot, Camera, Compass, Hammer, TrendingUp } from "lucide-react";
import { Container } from "@/components/container";
import { FadeIn } from "@/components/fade-in";
import { cn } from "@/lib/utils";
import { cardSurface } from "@/lib/ui";

const STEPS = [
  {
    id: "pick",
    title: "Pick pathway",
    icon: Compass,
    body: "Choose a kit arc that matches age, goals, and where learning happens—home, class, or club.",
  },
  {
    id: "build",
    title: "Run build",
    icon: Hammer,
    body: "Hands-on missions keep learners in motion. Short cycles, tangible parts, clear next steps.",
  },
  {
    id: "reflect",
    title: "Reflect with AI",
    icon: Bot,
    body: "Short prompts that sharpen thinking—scaffolding and questions, not answers that replace the build.",
  },
  {
    id: "proof",
    title: "Capture proof",
    icon: Camera,
    body: "Photos, reflections, mini demos—evidence stacks into a story mentors and families can understand.",
  },
  {
    id: "level",
    title: "Level up",
    icon: TrendingUp,
    body: "Unlock the next mission, deepen skills, and export portfolio-ready outcomes when you are ready to showcase.",
  },
] as const;

export function HowItWorksStepper() {
  const [open, setOpen] = useState<(typeof STEPS)[number]["id"]>("pick");
  const reduce = useReducedMotion();

  return (
    <section
      id="how-it-works"
      className="scroll-mt-28 border-b border-slate-200/70 bg-white py-12 sm:py-14 lg:py-16"
      aria-labelledby="how-heading"
    >
      <Container>
        <FadeIn>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-800">How it works</p>
          <h2 id="how-heading" className="mt-2 text-balance text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            A loop learners can actually finish
          </h2>
          <p className="mt-3 max-w-2xl text-pretty text-sm text-slate-600 sm:text-base">
            Five beats—tap to expand. Same loop learners feel in the product: build, reflect, prove, progress.
          </p>
        </FadeIn>

        <ol className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            const expanded = open === step.id;
            return (
              <li key={step.id}>
                <FadeIn delay={idx * 0.05}>
                  <button
                    type="button"
                    className={cn(
                      cardSurface(),
                      "ek-card-lift flex w-full flex-col rounded-2xl p-4 text-left shadow-sm ring-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2",
                      expanded ? "bg-amber-50/60 ring-amber-300/70" : "ring-transparent",
                    )}
                    onClick={() => setOpen(step.id)}
                    aria-expanded={expanded}
                  >
                    <span className="flex items-center gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-inner ring-1 ring-slate-200">
                        <Icon className="h-5 w-5 text-amber-800" aria-hidden />
                      </span>
                      <span>
                        <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Step {idx + 1}</span>
                        <span className="mt-0.5 block text-base font-semibold text-slate-900">{step.title}</span>
                      </span>
                    </span>
                    <div className="min-h-[4.75rem]">
                      {expanded ? (
                        <motion.p
                          className="mt-3 text-sm leading-relaxed text-slate-700"
                          initial={reduce ? false : { opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: reduce ? 0 : 0.2 }}
                        >
                          {step.body}
                        </motion.p>
                      ) : null}
                    </div>
                  </button>
                </FadeIn>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
