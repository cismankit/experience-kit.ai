"use client";

import Link from "next/link";
import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";

type SchoolsLaneHeroProps = {
  contactHref?: string;
  primaryCtaLabel?: string;
};

export function SchoolsLaneHero({
  contactHref = "/#contact",
  primaryCtaLabel = "Request a school pilot",
}: SchoolsLaneHeroProps) {
  return (
    <section
      className="border-b border-slate-200/80 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 py-12 text-white sm:py-14"
      aria-labelledby="schools-lane-hero-heading"
    >
      <Container>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300/90">For schools & districts</p>
        <h1 id="schools-lane-hero-heading" className="mt-3 max-w-3xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          Pilots that feel premium to learners—and clear to your team
        </h1>
        <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-slate-300 sm:text-lg">
          A focused lane: how pilots run, what you receive, and a direct line to scope cohorts, timelines, and rollout—
          without wading through the full consumer path.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button variant="primary" size="lg" href={contactHref}>
            {primaryCtaLabel}
          </Button>
          <Button variant="outline" size="lg" href="/kits" className="border-white/30 bg-transparent text-white hover:bg-white/10">
            Browse kits
          </Button>
        </div>
        <p className="mt-6 text-sm text-slate-400">
          Prefer the family path?{" "}
          <Link
            href="/"
            className="font-semibold text-amber-300 underline-offset-2 hover:underline"
            onClick={(e) => {
              e.preventDefault();
              window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
              window.dispatchEvent(new Event("ek-home-discover"));
            }}
          >
            Switch to Discover kits
          </Link>
          .
        </p>
      </Container>
    </section>
  );
}
