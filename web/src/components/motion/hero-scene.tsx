"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export function HeroScene() {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className="relative mx-auto w-full max-w-[min(100%,28rem)]"
      initial={reduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
    >
      <motion.div
        className="relative overflow-hidden rounded-[2rem] ring-1 ring-slate-900/10 shadow-2xl shadow-amber-900/10"
        animate={
          reduce
            ? { y: 0 }
            : {
                y: [0, -6, 0],
              }
        }
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-amber-200/30 via-transparent to-sky-200/20 mix-blend-multiply" />
        {/* Local SVG: plain img avoids next/image edge cases with Turbopack + animated wrappers */}
        {/* eslint-disable-next-line @next/next/no-img-element -- vector hero art */}
        <img
          src="/brand/experiencekit-hero-scene.svg"
          alt=""
          width={800}
          height={640}
          className="h-auto w-full select-none"
          fetchPriority="high"
          decoding="async"
          role="presentation"
        />
      </motion.div>
      {!reduce ? (
        <motion.div
          className={cn(
            "pointer-events-none absolute -bottom-6 -right-4 h-24 w-24 rounded-full bg-amber-400/50 blur-2xl",
          )}
          animate={{ opacity: [0.35, 0.65, 0.35], scale: [1, 1.08, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden
        />
      ) : null}
    </motion.div>
  );
}
