"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { AmbientOrbs } from "@/components/motion/ambient-orbs";
import { HeroScene } from "@/components/motion/hero-scene";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/container";
import { cn } from "@/lib/utils";
import { cardSurface } from "@/lib/ui";

const bullets = [
  "Built for schools, parents, and future-ready learners",
  "Structured for practical, guided learning",
  "Designed to turn curiosity into capability",
] as const;

export function HeroSection() {
  const reduce = useReducedMotion();

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden border-b border-slate-200/80 bg-gradient-to-b from-amber-50/60 via-white to-stone-50"
    >
      <AmbientOrbs className="opacity-90" />
      <div
        className="pointer-events-none absolute inset-x-0 -top-40 z-[1] h-[32rem] bg-[radial-gradient(ellipse_85%_55%_at_50%_-5%,rgba(251,191,36,0.28),transparent_58%)]"
        aria-hidden
      />
      <Container className="relative z-10 py-14 sm:py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] lg:items-center lg:gap-16">
          <div>
            <motion.p
              className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-800 sm:text-sm"
              initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              Learn by doing. Build by exploring. Earn by applying.
            </motion.p>
            <motion.h1
              id="hero-heading"
              className="mt-4 text-balance text-[2.1rem] font-semibold leading-[1.12] tracking-tight text-slate-900 sm:text-5xl lg:text-[3.15rem]"
              initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.04 }}
            >
              AI-powered kits that turn learning into{" "}
              <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                hands-on experience
              </span>
              .
            </motion.h1>
            <motion.p
              className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-slate-600 sm:text-xl"
              initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
            >
              From curiosity to capability: guided builds, AI support when it helps, and outcomes you
              can show—not passive content.
            </motion.p>
            <motion.ul
              className="mt-8 max-w-xl space-y-3 text-sm leading-relaxed text-slate-700 sm:text-base"
              initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.14 }}
            >
              {bullets.map((t) => (
                <li key={t} className="flex gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-900 ring-1 ring-amber-200/90">
                    <Check className="h-3.5 w-3.5" aria-hidden />
                  </span>
                  <span>{t}</span>
                </li>
              ))}
            </motion.ul>
            <motion.div
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
              initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.18 }}
            >
              <Button variant="primary" size="lg" className="w-full min-[480px]:w-auto" href="#contact">
                Request a Demo
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
              <Button variant="outline" size="lg" className="w-full min-[480px]:w-auto" href="#kits">
                Explore Kits
              </Button>
              <Button variant="secondary" size="lg" className="w-full min-[480px]:w-auto" href="#contact">
                Join the Pilot
              </Button>
            </motion.div>
            <motion.p
              className="mt-6 text-xs font-medium uppercase tracking-wider text-slate-500"
              initial={reduce ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.22 }}
            >
              No gimmicks—just guided, outcome-driven learning you can run with confidence.
            </motion.p>
          </div>
          <motion.div
            className="relative flex flex-col gap-8"
            initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="relative">
              <HeroScene />
            </div>
            <div
              className={cn(
                cardSurface(),
                "rounded-3xl p-6 shadow-lg shadow-slate-900/10 sm:p-8",
              )}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                At a glance
              </p>
              <p className="mt-3 text-lg font-semibold leading-snug text-slate-900 sm:text-xl">
                Kits + challenges + AI support—structured for real outcomes.
              </p>
              <div className="mt-6 grid gap-3 border-t border-slate-100 pt-6 text-sm text-slate-600">
                <div className="flex justify-between gap-4 border-b border-slate-100 pb-3">
                  <span className="text-slate-500">Focus</span>
                  <span className="text-right font-semibold text-slate-900">Experience-led learning</span>
                </div>
                <div className="flex justify-between gap-4 border-b border-slate-100 pb-3">
                  <span className="text-slate-500">Built for</span>
                  <span className="max-w-[12rem] text-right font-semibold text-slate-900">
                    Schools, homes, future-ready ecosystems
                  </span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-slate-500">Motion</span>
                  <span className="max-w-[12rem] text-right font-semibold text-slate-900">
                    Explore → build → apply
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
