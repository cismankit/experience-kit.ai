import { Container } from "@/components/container";
import { FadeIn } from "@/components/fade-in";
import { SectionHeading } from "@/components/section-heading";

const faqs = [
  {
    q: "What ships in each kit?",
    a: "Every SKU lists physical components, challenge decks, QR-linked journeys, and AI touchpoints—no opaque bundles.",
  },
  {
    q: "How do tracking and orders work today?",
    a: "Track uses your order ID + email (demo lookup until your OMS webhooks land). Orders shows a browser-based desk preview—swap in auth when ready.",
  },
  {
    q: "Can districts standardize across schools?",
    a: "Yes—use Support with cohort sizes and timelines. We stage waves, spares, and educator enablement in the same motion as classroom pilots.",
  },
  {
    q: "What does the copilot handle?",
    a: "Logistics, kit fit, and rollout questions with short answers. It routes to humans for quotes, legal, and custom SKUs.",
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
