"use client";

import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import {
  ChevronRight,
  Compass,
  HeadphonesIcon,
  LayoutGrid,
  Layers,
  LifeBuoy,
  MapPin,
  Package,
  ScanSearch,
} from "lucide-react";
import { HeroBrilliantDecorations } from "@/components/product/hero-brilliant-decorations";
import { ProductLoopVisual } from "@/components/motion/product-loop-visual";
import { Container } from "@/components/container";
import { cn } from "@/lib/utils";
import { cardSurface } from "@/lib/ui";

const CATEGORIES: readonly { href: string; label: string; Icon: LucideIcon }[] = [
  { href: "/missions", label: "Missions", Icon: Compass },
  { href: "/kits", label: "Kits", Icon: Package },
  { href: "/find-my-kit", label: "Kit Finder", Icon: ScanSearch },
  { href: "/studio", label: "Studio", Icon: LayoutGrid },
  { href: "/support", label: "Support", Icon: HeadphonesIcon },
] as const;

/**
 * Keywords stay readable text — cinematic motion via stagger + shimmer + soft bloom (no text↔icon swap).
 */
function HeroKeyword({
  children,
  gradientClassName,
  glowClassName,
  shimmerClassName = "ek-title-shimmer",
  glowPhaseClassName,
  revealDelay = 0,
}: {
  children: ReactNode;
  gradientClassName: string;
  glowClassName: string;
  shimmerClassName?: string;
  /** Offsets glow pulse timing per word */
  glowPhaseClassName?: string;
  revealDelay?: number;
}) {
  const reduce = useReducedMotion();

  return (
    <span className="relative mx-0.5 inline-block align-baseline">
      {!reduce ? (
        <span
          className={cn(
            "ek-kw-glow pointer-events-none absolute left-1/2 top-[52%] -z-10 h-[1.15em] w-[118%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-xl motion-reduce:opacity-0",
            glowClassName,
            glowPhaseClassName,
          )}
          aria-hidden
        />
      ) : null}
      <motion.span
        className={cn(
          "relative inline-block bg-clip-text pb-[0.04em] text-transparent leading-none",
          shimmerClassName,
          gradientClassName,
        )}
        initial={reduce ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.62, delay: revealDelay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.span>
      {!reduce ? (
        <motion.span
          className="absolute inset-x-0 bottom-[0.02em] mx-auto h-[0.055em] max-w-[100%] origin-center rounded-full opacity-60 motion-reduce:hidden"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgb(255 255 255 / 0.55) 45%, rgb(255 255 255 / 0.55) 55%, transparent 100%)",
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.85, delay: revealDelay + 0.12, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden
        />
      ) : null}
    </span>
  );
}

export function HeroProductLoop() {
  const reduce = useReducedMotion();

  return (
    <section
      aria-labelledby="lobby-hero-heading"
      className="ek-hero-atmosphere border-b border-slate-200/80"
    >
      <Container className="py-16 sm:py-20 lg:py-24">
        <div className="relative mx-auto max-w-5xl pb-8 text-center sm:pb-12">
          <div className="relative min-h-[15rem] sm:min-h-[17rem] lg:min-h-[18rem]">
            {!reduce ? <HeroBrilliantDecorations /> : null}
            <motion.p
              className="relative z-10 mx-auto mb-7 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 sm:mb-8 sm:text-sm sm:tracking-[0.2em]"
              initial={reduce ? { opacity: 1 } : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="hidden h-px w-8 bg-slate-300 sm:block" aria-hidden />
              Hands-on learning platform
              <span className="hidden h-px w-8 bg-slate-300 sm:block" aria-hidden />
            </motion.p>
            <motion.h1
              id="lobby-hero-heading"
              className="relative z-10 mx-auto w-full max-w-[58rem] text-balance font-serif text-[clamp(2.45rem,7.4vw,4.75rem)] font-bold leading-[1.02] tracking-[-0.038em] text-slate-950 sm:leading-[1.01] lg:tracking-[-0.042em]"
              initial={reduce ? { opacity: 1 } : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.04, ease: [0.22, 1, 0.36, 1] }}
            >
              Hands-on{" "}
              <HeroKeyword
                gradientClassName="bg-gradient-to-r from-amber-700 via-orange-500 to-amber-800"
                glowClassName="bg-gradient-to-r from-amber-400/55 via-orange-400/45 to-amber-500/40"
                shimmerClassName="ek-title-shimmer ek-title-shimmer-slow"
                glowPhaseClassName="ek-kw-glow-phase-a"
                revealDelay={0.06}
              >
                kits
              </HeroKeyword>
              . Daily{" "}
              <HeroKeyword
                gradientClassName="bg-gradient-to-r from-emerald-700 via-teal-500 to-sky-600"
                glowClassName="bg-gradient-to-r from-emerald-400/45 via-teal-400/40 to-sky-400/35"
                shimmerClassName="ek-title-shimmer ek-title-shimmer-mid"
                glowPhaseClassName="ek-kw-glow-phase-b"
                revealDelay={0.14}
              >
                missions
              </HeroKeyword>
              . Real-world{" "}
              <HeroKeyword
                gradientClassName="bg-gradient-to-r from-violet-700 via-fuchsia-500 to-indigo-700"
                glowClassName="bg-gradient-to-r from-violet-400/45 via-fuchsia-400/38 to-indigo-400/35"
                shimmerClassName="ek-title-shimmer ek-title-shimmer-fast"
                glowPhaseClassName="ek-kw-glow-phase-c"
                revealDelay={0.22}
              >
                proof
              </HeroKeyword>
              .
            </motion.h1>
          </div>

          <motion.p
            className="relative z-10 mx-auto mt-7 max-w-[48rem] text-pretty text-[1.16rem] font-medium leading-relaxed text-slate-700 sm:mt-8 sm:text-[1.38rem] sm:leading-[1.48] lg:mt-9 lg:text-[1.62rem] lg:leading-[1.5]"
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            Interactive missions on physical materials—structured reflection and proof so learners ship work
            they&apos;re proud of.
          </motion.p>

          <motion.div
            className="relative z-10 mx-auto mt-11 flex max-w-lg flex-col gap-3 sm:flex-row sm:justify-center"
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href="/missions"
              className="ek-cta-lift inline-flex min-h-[3rem] items-center justify-center rounded-full bg-emerald-600 px-8 text-base font-semibold text-white shadow-md shadow-emerald-900/15 ring-1 ring-emerald-700/20 transition-colors hover:bg-emerald-500 active:scale-[0.99] motion-reduce:active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
            >
              I&apos;m a learner
            </Link>
            <Link
              href="/find-my-kit?persona=parent"
              className="ek-cta-lift inline-flex min-h-[3rem] items-center justify-center rounded-full border border-slate-300/90 bg-white/90 px-8 text-base font-semibold text-slate-900 shadow-sm shadow-slate-900/[0.03] ring-1 ring-slate-900/[0.04] backdrop-blur-sm transition-colors hover:border-slate-400 hover:bg-white active:scale-[0.99] motion-reduce:active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
            >
              I&apos;m a parent or educator
            </Link>
          </motion.div>

          <p className="relative z-10 mt-5 text-center text-sm text-slate-500">
            <Link
              href="/find-my-kit"
              className="font-medium text-slate-700 underline decoration-slate-300 underline-offset-4 transition-colors hover:text-slate-950 hover:decoration-slate-400"
            >
              Start with Kit Finder
            </Link>
            <span className="mx-2 text-slate-300" aria-hidden>
              ·
            </span>
            <Link
              href="/track"
              className="font-medium text-slate-700 underline decoration-slate-300 underline-offset-4 transition-colors hover:text-slate-950 hover:decoration-slate-400"
            >
              Track an order
            </Link>
          </p>

          <motion.nav
            className="relative z-10 mx-auto mt-14 flex max-w-3xl flex-wrap justify-center gap-2.5 sm:gap-3"
            aria-label="Explore product areas"
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
          >
            {CATEGORIES.map(({ href, label, Icon }) => (
              <Link
                key={href}
                href={href}
                className="group inline-flex min-w-[5.75rem] flex-col items-center gap-2.5 rounded-2xl border border-slate-200/90 bg-white/70 px-3.5 py-3.5 text-center text-xs font-semibold text-slate-800 shadow-sm shadow-slate-900/[0.03] ring-1 ring-slate-900/[0.03] backdrop-blur-sm transition-[box-shadow,transform,border-color,background-color] hover:-translate-y-0.5 hover:border-slate-300/90 hover:bg-white hover:shadow-md motion-reduce:hover:translate-y-0 sm:min-w-[6rem] sm:px-4 sm:py-4 sm:text-[13px]"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-600 ring-1 ring-slate-200/80 transition-[color,background-color,box-shadow] group-hover:bg-emerald-50 group-hover:text-emerald-800 group-hover:ring-emerald-200/70">
                  <Icon className="h-[1.125rem] w-[1.125rem] shrink-0" strokeWidth={2} aria-hidden />
                </span>
                {label}
              </Link>
            ))}
          </motion.nav>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl gap-12 border-t border-slate-200/60 pt-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,21rem)] lg:items-start lg:gap-14">
          <div className="min-w-0">
            <ProductLoopVisual />
          </div>
          <aside
            className={cn(
              cardSurface(),
              "rounded-2xl border-slate-200/90 bg-white/90 p-7 shadow-sm shadow-slate-900/[0.04] backdrop-blur-sm",
            )}
            aria-labelledby="hero-support-heading"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 ring-1 ring-slate-200/80">
              <HeadphonesIcon className="h-5 w-5 text-slate-700" aria-hidden />
            </div>
            <h2 id="hero-support-heading" className="mt-5 text-lg font-semibold tracking-tight text-slate-900">
              Help for buyers &amp; pilots
            </h2>
            <p className="mt-2.5 text-sm leading-relaxed text-slate-600">
              Orders, replacements, school pilots, and kit questions route to the right inbox—include your order email
              and kit name for a faster first reply.
            </p>
            <ul className="mt-6 space-y-1">
              <li>
                <Link
                  href="/support"
                  className="group flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-800 transition-colors hover:bg-slate-50"
                >
                  <span className="inline-flex items-center gap-2">
                    <LifeBuoy className="h-4 w-4 shrink-0 text-slate-500" aria-hidden />
                    Support &amp; contact
                  </span>
                  <ChevronRight
                    className="h-4 w-4 shrink-0 text-slate-300 transition-transform group-hover:translate-x-0.5 motion-reduce:group-hover:translate-x-0"
                    aria-hidden
                  />
                </Link>
              </li>
              <li>
                <Link
                  href="/track"
                  className="group flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-800 transition-colors hover:bg-slate-50"
                >
                  <span className="inline-flex items-center gap-2">
                    <MapPin className="h-4 w-4 shrink-0 text-slate-500" aria-hidden />
                    Track a shipment
                  </span>
                  <ChevronRight
                    className="h-4 w-4 shrink-0 text-slate-300 transition-transform group-hover:translate-x-0.5 motion-reduce:group-hover:translate-x-0"
                    aria-hidden
                  />
                </Link>
              </li>
              <li>
                <Link
                  href="/schools"
                  className="group flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-800 transition-colors hover:bg-slate-50"
                >
                  <span className="inline-flex items-center gap-2">
                    <Layers className="h-4 w-4 shrink-0 text-slate-500" aria-hidden />
                    School &amp; district pilots
                  </span>
                  <ChevronRight
                    className="h-4 w-4 shrink-0 text-slate-300 transition-transform group-hover:translate-x-0.5 motion-reduce:group-hover:translate-x-0"
                    aria-hidden
                  />
                </Link>
              </li>
            </ul>
            <p className="mt-6 border-t border-slate-100 pt-5 text-xs leading-relaxed text-slate-500">
              Self-serve first: <strong className="font-medium text-slate-700">Track</strong> works best with the
              email from your order confirmation.
            </p>
          </aside>
        </div>
      </Container>
    </section>
  );
}
