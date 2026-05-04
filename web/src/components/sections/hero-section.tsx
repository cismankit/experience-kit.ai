"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Package, Radar } from "lucide-react";
import { AmbientOrbs } from "@/components/motion/ambient-orbs";
import { HeroScene } from "@/components/motion/hero-scene";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/container";
import { cn } from "@/lib/utils";
import { cardSurface } from "@/lib/ui";

const chips = ["Transparent manifests", "Track every shipment", "AI copilot included"] as const;

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
      <Container className="relative z-10 py-12 sm:py-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center lg:gap-12">
          <div>
            <motion.p
              className="inline-flex items-center gap-2 rounded-full border border-amber-200/80 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-amber-900 shadow-sm"
              initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              <Radar className="h-3.5 w-3.5" aria-hidden />
              Ops-ready commerce
            </motion.p>
            <motion.h1
              id="hero-heading"
              className="mt-4 text-balance text-[2rem] font-semibold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl lg:text-[3.05rem]"
              initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.04 }}
            >
              Kits built for velocity,{" "}
              <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                shipped with precision
              </span>
              .
            </motion.h1>
            <motion.p
              className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-slate-600 sm:text-lg"
              initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.08 }}
            >
              See exactly what is inside each SKU, spin up quotes, track fulfillment, and let learners loose on tactile +
              AI workflows—all from one surface.
            </motion.p>
            <motion.ul
              className="mt-6 flex flex-wrap gap-2"
              initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.12 }}
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
              transition={{ duration: 0.45, delay: 0.16 }}
            >
              <Button variant="primary" size="lg" className="w-full min-[480px]:w-auto" href="/kits">
                Shop kits
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
              <Button variant="outline" size="lg" className="w-full min-[480px]:w-auto bg-white" href="/track">
                <Package className="h-4 w-4" aria-hidden />
                Track order
              </Button>
              <Button variant="secondary" size="lg" className="w-full min-[480px]:w-auto" href="/#contact">
                Talk to sales
              </Button>
            </motion.div>
          </div>
          <motion.div
            className="relative flex flex-col gap-6"
            initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
          >
            <div className="relative">
              <HeroScene />
            </div>
            <div className={cn(cardSurface(), "rounded-3xl p-5 shadow-lg shadow-slate-900/10 sm:p-6")}>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Live desk</p>
              <p className="mt-2 text-base font-semibold leading-snug text-slate-900 sm:text-lg">
                Orders · tracking · copilot—one stack for procurement and learners.
              </p>
              <div className="mt-4 grid gap-2 text-sm text-slate-600 sm:grid-cols-3">
                <Link
                  href="/orders"
                  className="rounded-xl border border-slate-100 bg-stone-50 px-3 py-2 font-medium text-slate-900 hover:border-amber-200"
                >
                  Manage orders
                </Link>
                <Link
                  href="/track"
                  className="rounded-xl border border-slate-100 bg-stone-50 px-3 py-2 font-medium text-slate-900 hover:border-amber-200"
                >
                  Track status
                </Link>
                <Link
                  href="/#platform"
                  className="rounded-xl border border-slate-100 bg-stone-50 px-3 py-2 font-medium text-slate-900 hover:border-amber-200"
                >
                  Platform tour
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
