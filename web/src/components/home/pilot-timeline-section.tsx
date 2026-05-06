import { CalendarCheck, LineChart, Presentation, Rocket, Users } from "lucide-react";
import { Container } from "@/components/container";
import { FadeIn } from "@/components/fade-in";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { cardSurface } from "@/lib/ui";

const WEEKS = [
  {
    title: "Week 1–2 · Align",
    body: "Kit mix, facilitator capacity, and success signals—so the pilot has a clear story before learners touch materials.",
    icon: Users,
  },
  {
    title: "Week 3–5 · Run missions",
    body: "Weekly builds with visible momentum—educator guides, rubrics, and progress snapshots your team can share.",
    icon: Rocket,
  },
  {
    title: "Week 6–8 · Showcase",
    body: "Learner demos, artifact gallery, and a retrospective you can take to leadership or the next cohort.",
    icon: Presentation,
  },
  {
    title: "After · Scale or refresh",
    body: "Decide what to expand, what to replenish, and how to reuse the same journey structure across sites.",
    icon: LineChart,
  },
] as const;

type PilotTimelineSectionProps = {
  sectionId?: string;
  contactHref?: string;
  faqHref?: string;
  secondaryCtaLabel?: string;
};

export function PilotTimelineSection({
  sectionId = "schools",
  contactHref = "/#contact",
  faqHref = "/#faq",
  secondaryCtaLabel = "Read school FAQs",
}: PilotTimelineSectionProps) {
  return (
    <section
      id={sectionId}
      className="scroll-mt-28 border-b border-slate-200/70 bg-gradient-to-b from-amber-50/50 via-white to-stone-50 py-12 sm:py-14 lg:py-16"
      aria-labelledby="pilot-timeline-heading"
    >
      <Container>
        <FadeIn>
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-800">Pilot timeline</p>
            <h2 id="pilot-timeline-heading" className="mt-2 text-balance text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              A typical 4–8 week arc
            </h2>
            <p className="mt-3 text-pretty text-sm leading-relaxed text-slate-600 sm:text-base">
              Structured enough for leadership updates; flexible enough for real classrooms. Details expand only when you
              need them.
            </p>
          </div>
        </FadeIn>

        <ol className="relative mt-10 space-y-6 pl-2 sm:pl-4">
          <div
            className="absolute bottom-4 left-[1.15rem] top-4 w-px bg-gradient-to-b from-amber-300/80 via-amber-200/50 to-transparent sm:left-[1.35rem]"
            aria-hidden
          />
          {WEEKS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <li key={step.title} className="relative flex gap-4 sm:gap-5">
                <span
                  className={cn(
                    cardSurface(),
                    "z-[1] flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-amber-200/80",
                  )}
                >
                  <Icon className="h-5 w-5 text-amber-800" aria-hidden />
                </span>
                <div className={cn(cardSurface(), "flex-1 rounded-2xl p-5 shadow-sm")}>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Phase {idx + 1}</p>
                  <h3 className="mt-1 text-lg font-semibold text-slate-900">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.body}</p>
                </div>
              </li>
            );
          })}
        </ol>

        <details className="mt-10 group rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm sm:p-6">
          <summary className="flex cursor-pointer list-none items-center gap-2 text-sm font-semibold text-slate-900 marker:content-none [&::-webkit-details-marker]:hidden">
            <CalendarCheck className="h-4 w-4 text-amber-700" aria-hidden />
            What we usually align on before day one
            <span className="ml-auto text-xs font-normal text-slate-500 group-open:hidden">Expand</span>
            <span className="ml-auto hidden text-xs font-normal text-slate-500 group-open:inline">Collapse</span>
          </summary>
          <ul className="mt-4 grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
            <li>Cohort size and facilitator ratio</li>
            <li>Kit mix per classroom or lab</li>
            <li>Onboarding window and showcase date</li>
            <li>Spares, storage, and replenishment cadence</li>
          </ul>
        </details>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button variant="primary" size="lg" href={contactHref}>
            Start a school conversation
          </Button>
          <Button variant="outline" size="lg" href={faqHref} className="bg-white">
            {secondaryCtaLabel}
          </Button>
        </div>
      </Container>
    </section>
  );
}
