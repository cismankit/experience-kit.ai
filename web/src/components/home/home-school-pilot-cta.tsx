import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";

/** Compact institutional path on the Discover lane — avoids burying schools under consumer scroll. */
export function HomeSchoolPilotCta() {
  return (
    <section
      className="border-b border-slate-200/80 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 py-10 text-white sm:py-12"
      aria-labelledby="school-pilot-cta-heading"
    >
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300/90">For schools & districts</p>
            <h2 id="school-pilot-cta-heading" className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">
              Pilots with guides, timelines, and visible learner progress
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-300 sm:text-base">
              See cohort deployment, facilitator supports, and what a typical 4–8 week arc looks like—without wading through
              the family path.
            </p>
          </div>
          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-end">
            <Button variant="primary" size="lg" href="/schools" className="w-full sm:w-auto">
              Explore school pilots
            </Button>
            <Button
              variant="outline"
              size="lg"
              href="/schools#contact"
              className="w-full border-white/35 bg-transparent text-white hover:bg-white/10 sm:w-auto"
            >
              Plan a cohort
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
