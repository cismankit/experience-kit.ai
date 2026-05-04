import { Container } from "@/components/container";
import { FadeIn } from "@/components/fade-in";
import { SectionHeading } from "@/components/section-heading";

const faqs = [
  {
    q: "What is ExperienceKit.ai?",
    a: "Smart learning kits that combine hands-on work, guided challenges, and AI support so learners explore, build, and apply—not just consume.",
  },
  {
    q: "Who is it for?",
    a: "Schools, parents, educators, and learners who want practical, experience-led learning with a premium, grounded tone.",
  },
  {
    q: "Only for schools?",
    a: "No—classrooms and structured home learning both work. Kits stay coherent across contexts.",
  },
  {
    q: "What does AI do?",
    a: "Scaffolding, explanations, and reflection prompts that enrich the hands-on arc—without replacing the learner’s thinking.",
  },
  {
    q: "Demo or pilot for schools?",
    a: "Yes. Use the contact form with your goals—we’ll reply with clear next steps.",
  },
  {
    q: "How do I get started?",
    a: "Skim the kit journey, then message us with your role and outcome. We’ll point you to the right path.",
  },
] as const;

export function FaqSection() {
  return (
    <section
      id="faq"
      className="scroll-mt-28 bg-white py-14 sm:py-16 lg:py-20"
      aria-labelledby="faq-heading"
    >
      <Container>
        <FadeIn>
          <SectionHeading
            id="faq-heading"
            eyebrow="FAQ"
            title="Quick answers"
            description={<p>Short responses—expand only what you need.</p>}
          />
        </FadeIn>
        <div className="mt-8 divide-y divide-slate-200 rounded-2xl border border-slate-200/90 bg-stone-50/50 lg:mt-10">
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
