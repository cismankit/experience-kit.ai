import { Container } from "@/components/container";
import { FadeIn } from "@/components/fade-in";
import { SectionHeading } from "@/components/section-heading";

const faqs = [
  {
    q: "What ships in each kit?",
    a: "Every kit lists physical components, challenge decks, QR-linked journeys, and AI touchpoints—transparent manifests, no opaque bundles.",
  },
  {
    q: "How do tracking and orders work today?",
    a: "Track uses your order ID and email on file (demo lookup here—your team can wire production systems later). Orders shows a preview desk today and can plug into accounts when you’re ready.",
  },
  {
    q: "Can districts standardize across schools?",
    a: "Yes—tell us cohort sizes and timelines in Support. We stage waves, spare parts, and educator enablement alongside classroom pilots.",
  },
  {
    q: "What does the copilot help with?",
    a: "Short answers for kit fit, rollouts, and day-to-day questions. It hands off to humans for quotes, legal, and custom kit waves.",
  },
] as const;

export function FaqSection() {
  return (
    <section
      id="faq"
      className="scroll-mt-28 bg-white py-12 sm:py-14 lg:py-16"
      aria-labelledby="faq-heading"
    >
      <Container>
        <FadeIn>
          <SectionHeading
            id="faq-heading"
            eyebrow="FAQ"
            title="Straight answers"
            description={<p>Four high-signal questions—everything else goes to Support.</p>}
          />
        </FadeIn>
        <div className="mt-6 divide-y divide-slate-200 rounded-2xl border border-slate-200/90 bg-stone-50/50 lg:mt-8">
          {faqs.map((item, i) => (
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
      </Container>
    </section>
  );
}
