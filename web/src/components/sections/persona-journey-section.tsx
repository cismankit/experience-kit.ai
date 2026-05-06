import Link from "next/link";
import { Building2, GraduationCap, Presentation, Sparkles } from "lucide-react";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { cn } from "@/lib/utils";
import { cardSurface } from "@/lib/ui";

const personas = [
  {
    title: "For parents",
    icon: GraduationCap,
    copy: "Help your child build confidence, creativity, and real-world skills at home.",
    cta: "Family promise & trust",
    href: "/#parent-trust",
  },
  {
    title: "For schools",
    icon: Building2,
    copy: "Launch hands-on learning programs with kits, dashboards, and guided implementation.",
    cta: "Pilot & deployment",
    href: "/#schools",
  },
  {
    title: "For learners",
    icon: Sparkles,
    copy: "Complete missions, earn badges, build projects, and create your personal portfolio.",
    cta: "Learner experience",
    href: "/#dashboard-preview",
  },
  {
    title: "For educators",
    icon: Presentation,
    copy: "Run activities with guides, rubrics, AI prompts, and classroom-ready structure.",
    cta: "Classroom toolkit",
    href: "/#schools",
  },
] as const;

export function PersonaJourneySection() {
  return (
    <section
      id="choose-journey"
      className="scroll-mt-28 border-b border-slate-200/70 bg-white py-14 sm:py-16 lg:py-20"
      aria-labelledby="choose-journey-heading"
    >
      <Container>
        <SectionHeading
          id="choose-journey-heading"
          eyebrow="Your path"
          title="Choose your journey"
          description={
            <p className="max-w-2xl">
              Everyone touches the same kit story—pick where you&apos;re starting so we can meet you with the right
              rhythm, language, and next step.
            </p>
          }
        />
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {personas.map((p) => (
            <li key={p.title}>
              <article
                className={cn(
                  cardSurface(),
                  "flex h-full flex-col rounded-2xl p-6 shadow-sm transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-md",
                )}
              >
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-900"
                  aria-hidden
                >
                  <p.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">{p.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{p.copy}</p>
                <Link
                  href={p.href}
                  className="mt-5 inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 shadow-sm transition-colors hover:border-amber-200 hover:bg-amber-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
                >
                  {p.cta}
                </Link>
              </article>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
