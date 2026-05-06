"use client";

import Link from "next/link";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Compass, Images, Sparkles } from "lucide-react";
import { useEffect } from "react";
import { AmbientOrbs } from "@/components/motion/ambient-orbs";
import { ProductLoopVisual } from "@/components/motion/product-loop-visual";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/container";
import { cn } from "@/lib/utils";
import { cardSurface } from "@/lib/ui";

const chips = ["Physical kits", "Guided missions", "Portfolio-ready proof"] as const;

export function HeroSection() {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const parallaxX = useSpring(useTransform(mx, [-0.5, 0.5], reduce ? [0, 0] : [-10, 10]), { stiffness: 26, damping: 18 });
  const parallaxY = useSpring(useTransform(my, [-0.5, 0.5], reduce ? [0, 0] : [-8, 8]), { stiffness: 26, damping: 18 });

  useEffect(() => {
    if (reduce) return;
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) return;
    const reset = () => {
      mx.set(0);
      my.set(0);
    };
    mq.addEventListener("change", reset);
    return () => mq.removeEventListener("change", reset);
  }, [reduce, mx, my]);

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden border-b border-slate-200/80 bg-gradient-to-b from-amber-50/60 via-white to-stone-50"
      onMouseMove={(e) => {
        if (reduce) return;
        if (!window.matchMedia("(pointer: fine)").matches) return;
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
    >
      <AmbientOrbs className="opacity-90" />
      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 -top-40 z-[1] h-[32rem] bg-[radial-gradient(ellipse_85%_55%_at_50%_-5%,rgba(251,191,36,0.28),transparent_58%)]",
          "ek-hero-breathe",
        )}
        aria-hidden
      />
      <Container className="relative z-10 py-12 sm:py-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center lg:gap-12">
          <div>
            <motion.p
              className="inline-flex items-center gap-2 rounded-full border border-amber-200/80 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-amber-900 shadow-sm"
              initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              <Sparkles className="h-3.5 w-3.5" aria-hidden />
              Build · explore · reflect
            </motion.p>
            <motion.h1
              id="hero-heading"
              className="mt-4 text-balance text-[2rem] font-semibold leading-[1.12] tracking-tight text-slate-900 sm:text-5xl lg:text-[3.05rem]"
              initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.04 }}
            >
              Hands-on kits.{" "}
              <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                AI-guided journeys.
              </span>{" "}
              Real-world proof.
            </motion.h1>
            <motion.p
              className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-slate-600 sm:text-lg"
              initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.08 }}
            >
              Kits arrive as real materials. Missions keep learners building. AI reflects with them—then proof and progress
              compound into a portfolio story.
            </motion.p>
            <motion.ul
              className="mt-6 flex flex-wrap gap-2"
              initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
            >
              {chips.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-slate-200/90 bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm"
                >
                  {t}
                </li>
              ))}
            </motion.ul>
            <motion.div
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
              initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.14 }}
            >
              <Button variant="primary" size="lg" className="w-full min-[480px]:w-auto ek-cta-lift" href="/find-my-kit">
                Find my kit
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
              <Button variant="outline" size="lg" className="w-full min-[480px]:w-auto bg-white ek-cta-lift" href="/missions">
                <Compass className="h-4 w-4" aria-hidden />
                Today&apos;s missions
              </Button>
            </motion.div>
            <p className="mt-4 text-sm text-slate-500">
              Prefer to browse?{" "}
              <Link href="/kits" className="font-semibold text-amber-800 underline-offset-2 hover:underline">
                Compare kits
              </Link>{" "}
              ·{" "}
              <Link href="/support" className="font-semibold text-amber-800 underline-offset-2 hover:underline">
                Talk with us
              </Link>
              .
            </p>
          </div>
          <motion.div
            className="relative flex flex-col gap-6"
            style={{ x: parallaxX, y: parallaxY }}
            initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
          >
            <div className="relative">
              <ProductLoopVisual />
            </div>
            <div className={cn(cardSurface(), "rounded-3xl p-5 shadow-lg shadow-slate-900/10 sm:p-6")}>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Shortcuts</p>
              <p className="mt-2 text-base font-semibold leading-snug text-slate-900 sm:text-lg">
                Jump to the job you need done—no endless scrolling required.
              </p>
              <div className="mt-4 grid gap-2 text-sm text-slate-600 sm:grid-cols-3">
                <Link
                  href="/find-my-kit"
                  className="rounded-xl border border-slate-100 bg-stone-50 px-3 py-2 font-medium text-slate-900 hover:border-amber-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                >
                  Guided match
                </Link>
                <Link
                  href="/schools"
                  className="rounded-xl border border-slate-100 bg-stone-50 px-3 py-2 font-medium text-slate-900 hover:border-amber-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                >
                  For schools
                </Link>
                <Link
                  href="/#outcome-proof"
                  className="rounded-xl border border-slate-100 bg-stone-50 px-3 py-2 font-medium text-slate-900 hover:border-amber-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                >
                  <span className="inline-flex items-center gap-1.5">
                    <Images className="h-4 w-4 shrink-0" aria-hidden />
                    Proof
                  </span>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
