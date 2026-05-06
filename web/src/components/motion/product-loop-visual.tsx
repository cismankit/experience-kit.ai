"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Bot, Box, Camera, Compass, TrendingUp } from "lucide-react";
const NODES = [
  { key: "kit", label: "Kit", sub: "Materials arrive", Icon: Box },
  { key: "mission", label: "Mission", sub: "Guided build", Icon: Compass },
  { key: "reflect", label: "Reflect", sub: "AI coaching", Icon: Bot },
  { key: "proof", label: "Proof", sub: "Artifact + journal", Icon: Camera },
  { key: "progress", label: "Progress", sub: "Next unlock", Icon: TrendingUp },
] as const;

/** Editorial journey card—neutral chrome, one brand accent possible in parent CTAs. */
export function ProductLoopVisual() {
  const reduce = useReducedMotion();

  return (
    <div className="relative mx-auto w-full max-w-md xl:mx-0 xl:max-w-[22rem]">
      <motion.div
        className="rounded-2xl border border-slate-200/90 bg-white/80 p-6 shadow-sm shadow-slate-900/[0.04] ring-1 ring-slate-900/[0.03] backdrop-blur-sm sm:p-7"
        initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
          How it works
        </p>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          A repeatable loop from box to proof—built for classrooms and homes.
        </p>

        <ol className="mt-8 space-y-0">
          {NODES.map((node, idx) => {
            const Icon = node.Icon;
            return (
              <motion.li
                key={node.key}
                className="relative flex gap-4"
                initial={reduce ? { opacity: 1, x: 0 } : { opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: reduce ? 0 : 0.04 + idx * 0.04, duration: 0.3 }}
              >
                {idx < NODES.length - 1 ? (
                  <span
                    className="absolute left-[1.125rem] top-[2.75rem] bottom-0 w-px bg-slate-200"
                    aria-hidden
                  />
                ) : null}
                <span className="relative z-[1] flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 shadow-sm">
                  <Icon className="h-4 w-4" aria-hidden />
                </span>
                <div className="min-w-0 flex-1 border-b border-slate-100 py-2.5 last:border-b-0">
                  <p className="text-[15px] font-semibold text-slate-900">{node.label}</p>
                  <p className="mt-0.5 text-sm text-slate-600">{node.sub}</p>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </motion.div>
    </div>
  );
}
