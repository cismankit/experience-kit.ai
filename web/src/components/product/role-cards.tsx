"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, GraduationCap, School, User, Users } from "lucide-react";
import { Container } from "@/components/container";
import type { KitFinderPersona } from "@/lib/kit-finder-logic";
import { cn } from "@/lib/utils";

const CARDS: {
  id: KitFinderPersona;
  title: string;
  blurb: string;
  Icon: typeof Users;
}[] = [
  {
    id: "parent",
    title: "Parent / guardian",
    blurb: "Home rhythms, clear missions, and wins you can show—not just finish.",
    Icon: Users,
  },
  {
    id: "learner",
    title: "Learner",
    blurb: "Build artifacts, reflect with structure, and see progress compound.",
    Icon: User,
  },
  {
    id: "educator",
    title: "Educator",
    blurb: "Facilitation-ready pacing and artifacts worth assessing.",
    Icon: GraduationCap,
  },
  {
    id: "school",
    title: "School / district",
    blurb: "Pilot scope, cohort kits, and timelines leadership can follow.",
    Icon: School,
  },
];

export function RoleCards() {
  const reduce = useReducedMotion();

  return (
    <section
      id="roles"
      className="ek-section-surface-alt scroll-mt-28 border-b border-slate-200/80 py-14 sm:py-16"
      aria-labelledby="roles-heading"
    >
      <Container>
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">Audience</p>
        <h2
          id="roles-heading"
          className="mt-2 text-[clamp(1.5rem,1.05rem+1.8vw,1.875rem)] font-semibold leading-[1.15] tracking-tight text-slate-900 sm:text-[clamp(1.625rem,1.1rem+2vw,2rem)]"
        >
          Who is this for?
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600">
          Open Kit Finder with your context pre-selected—same flow, sharper defaults.
        </p>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CARDS.map((c, idx) => {
            const Icon = c.Icon;
            return (
              <motion.li
                key={c.id}
                initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: reduce ? 0 : idx * 0.04 }}
              >
                <Link
                  href={`/find-my-kit?persona=${c.id}`}
                  className={cn(
                    "group flex h-full flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:border-slate-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2",
                  )}
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-700">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <span className="mt-4 text-sm font-semibold text-slate-900">{c.title}</span>
                  <span className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{c.blurb}</span>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-slate-900">
                    Continue
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </span>
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
