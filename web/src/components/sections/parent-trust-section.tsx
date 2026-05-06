import { Check, HeartHandshake } from "lucide-react";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";

const bullets = [
  "Hands-on first",
  "AI second",
  "Parent-friendly guide",
  "Clear daily structure",
  "Real outcomes",
  "No mystery boxes",
] as const;

export function ParentTrustSection() {
  return (
    <section
      id="parent-trust"
      className="scroll-mt-28 border-b border-slate-200/70 bg-white py-14 sm:py-16 lg:py-20"
      aria-labelledby="parent-trust-heading"
    >
      <Container className="max-w-4xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-10">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-900">
            <HeartHandshake className="h-7 w-7" aria-hidden />
          </div>
          <div className="flex-1">
            <SectionHeading
              id="parent-trust-heading"
              eyebrow="For families"
              title="Not screen time. Skill time."
              description={
                <p className="max-w-2xl">
                  ExperienceKit.ai uses AI as a guide, not a replacement for thinking. Learners touch, build, test,
                  explain, and reflect. The screen supports the activity — it does not become the activity.
                </p>
              }
            />
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {bullets.map((b) => (
                <li key={b} className="flex items-center gap-2 text-sm font-medium text-slate-800">
                  <Check className="h-4 w-4 shrink-0 text-emerald-600" aria-hidden />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
