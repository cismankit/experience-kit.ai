"use client";

import { motion, useReducedMotion } from "framer-motion";

export function AiMotionPanel() {
  const reduce = useReducedMotion();

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 shadow-2xl shadow-black/40">
      <div className="ek-ai-grid-bg pointer-events-none absolute inset-0 opacity-40" aria-hidden />
      <motion.div
        className="relative"
        initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-12%" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />
        {/* eslint-disable-next-line @next/next/no-img-element -- vector panel art */}
        <img
          src="/brand/experiencekit-learning-path.svg"
          alt=""
          width={720}
          height={400}
          className="h-auto w-full opacity-95"
          loading="lazy"
          decoding="async"
          role="presentation"
        />
        {!reduce ? (
          <motion.div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(251,191,36,0.12),transparent_55%)]"
            animate={{ opacity: [0.5, 0.85, 0.5] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden
          />
        ) : null}
      </motion.div>
      <div className="border-t border-white/10 bg-slate-950/40 px-5 py-4 text-center text-xs font-medium uppercase tracking-[0.2em] text-amber-200/90">
        Guided path · Human creativity · Measurable progress
      </div>
    </div>
  );
}
