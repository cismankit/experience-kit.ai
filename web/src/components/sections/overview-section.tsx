import { Eye, Lightbulb, Rocket, Sparkles } from "lucide-react";
import { Container } from "@/components/container";
import { FadeIn } from "@/components/fade-in";
import { SectionHeading } from "@/components/section-heading";
import { cardSurface } from "@/lib/ui";
import { cn } from "@/lib/utils";

const values = [
  {
    title: "Learn actively",
    body: "Build, test, and revise—so ideas behave like real problems worth solving.",
    icon: Rocket,
  },
  {
    title: "Build confidence",
    body: "Evidence matters: a clear explanation, a repeatable process, proof you can point to.",
    icon: Lightbulb,
  },
  {
    title: "Curiosity → capability",
    body: "Structure channels interest into skills that compound—without killing momentum.",
    icon: Sparkles,
  },
  {
    title: "Visible progress",
    body: "Reflection and application make growth legible—for learners, families, and leaders.",
    icon: Eye,
  },
] as const;

export function OverviewSection() {
  return (
    <section
      id="overview"
      className="scroll-mt-28 border-b border-slate-200/70 bg-white py-14 sm:py-16 lg:py-20"
      aria-labelledby="overview-heading"
    >
      <Container>
        <FadeIn>
          <SectionHeading
            id="overview-heading"
            eyebrow="Product"
            title="What is ExperienceKit.ai?"
            description={
              <p>
                A smart kit platform that blends hands-on tools, guided challenges, and AI-enhanced
                support—so learners explore, build, and apply instead of passively consuming content.
              </p>
            }
          />
        </FadeIn>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-12 lg:gap-5">
          {values.map((v, i) => (
            <li key={v.title} className={cn(cardSurface(), "rounded-2xl p-5 ek-card-lift")}>
              <FadeIn delay={0.04 * i}>
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-amber-300">
                    <v.icon className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-slate-900">{v.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{v.body}</p>
                  </div>
                </div>
              </FadeIn>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
