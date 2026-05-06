"use client";

import { useState } from "react";
import { Container } from "@/components/container";
import { FadeIn } from "@/components/fade-in";
import { cn } from "@/lib/utils";

type FaqItem = { q: string; a: string };
type FaqGroup = { id: "families" | "schools" | "orders"; label: string; items: FaqItem[] };

const GROUPS: FaqGroup[] = [
  {
    id: "families",
    label: "Families & learners",
    items: [
      {
        q: "What ships in each kit?",
        a: "Transparent manifests: physical components, challenge decks, QR-linked journeys, and light AI touchpoints—so you always know what’s in the box.",
      },
      {
        q: "What does the copilot help with?",
        a: "Short, practical answers on kit fit, pacing, and day-to-day questions. It hands off to humans for quotes, legal, and custom cohort plans.",
      },
    ],
  },
  {
    id: "schools",
    label: "Schools & teams",
    items: [
      {
        q: "Can districts standardize across schools?",
        a: "Yes—share cohort sizes, timelines, and facilitator capacity. We help stage waves, spares, and educator enablement alongside classroom pilots.",
      },
      {
        q: "How do classroom pilots usually run?",
        a: "Most teams plan a 4–8 week arc: align on goals and kit mix, run weekly missions with visible momentum, then host a learner showcase before scaling or refreshing.",
      },
    ],
  },
  {
    id: "orders",
    label: "Orders & tracking",
    items: [
      {
        q: "How do tracking and orders work?",
        a: "Use Track with the details from your order confirmation. Organizations can run pilots through the same flow today—and connect internal tools when your team is ready.",
      },
    ],
  },
];

export type FaqSectionProps = {
  /** Opens this group first (e.g. schools lane). */
  defaultGroup?: FaqGroup["id"];
  /** Unique when multiple FAQ blocks exist on one document (e.g. home lanes). */
  anchorId?: string;
};

export function FaqSection({ defaultGroup = "families", anchorId = "faq" }: FaqSectionProps) {
  const [active, setActive] = useState<FaqGroup["id"]>(defaultGroup);

  return (
    <section id={anchorId} className="scroll-mt-28 bg-white py-12 sm:py-14 lg:py-16" aria-labelledby="faq-heading">
      <Container>
        <FadeIn>
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-700 sm:text-sm">FAQ</p>
            <h2 id="faq-heading" className="mt-3 text-balance text-[1.65rem] font-semibold leading-snug tracking-tight text-slate-900 sm:text-3xl lg:text-[2.125rem] lg:leading-tight">
              Straight answers
            </h2>
            <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-slate-600 sm:text-lg">
              Pick your context—everything else routes to Support.
            </p>
          </div>
        </FadeIn>

        <div
          className="mt-6 flex flex-wrap gap-2 border-b border-slate-200/80 pb-3"
          role="tablist"
          aria-label="FAQ categories"
        >
          {GROUPS.map((g) => (
            <button
              key={g.id}
              type="button"
              role="tab"
              aria-selected={active === g.id}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500",
                active === g.id
                  ? "border-amber-400 bg-amber-50 text-amber-950"
                  : "border-transparent bg-stone-100 text-slate-700 hover:border-slate-200",
              )}
              onClick={() => setActive(g.id)}
            >
              {g.label}
            </button>
          ))}
        </div>

        {GROUPS.map((g) =>
          g.id === active ? (
            <div
              key={g.id}
              role="tabpanel"
              aria-label={g.label}
              className="mt-6 divide-y divide-slate-200 rounded-2xl border border-slate-200/90 bg-stone-50/50"
            >
              {g.items.map((item, i) => (
                <FadeIn key={item.q} delay={0.02 * i}>
                  <details className="group p-4 sm:p-5">
                    <summary className="cursor-pointer list-none rounded-lg text-left text-sm font-semibold text-slate-900 outline-none marker:content-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:text-base [&::-webkit-details-marker]:hidden">
                      <span className="flex items-start justify-between gap-3">
                        <span>{item.q}</span>
                        <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-700 transition-transform group-open:rotate-45">
                          <span className="sr-only">Toggle answer</span>
                          <span aria-hidden className="text-base leading-none">
                            +
                          </span>
                        </span>
                      </span>
                    </summary>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.a}</p>
                  </details>
                </FadeIn>
              ))}
            </div>
          ) : null,
        )}
      </Container>
    </section>
  );
}
