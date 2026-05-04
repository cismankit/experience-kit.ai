import { Box, Cpu, Home, Map, Sparkles } from "lucide-react";
import { Container } from "@/components/container";
import { FadeIn } from "@/components/fade-in";
import { AiMotionPanel } from "@/components/motion/ai-motion-panel";
import { AmbientOrbs } from "@/components/motion/ambient-orbs";
import { SectionHeading } from "@/components/section-heading";
import { SectionWaveDivider } from "@/components/section-wave-divider";

const points = [
  { title: "Real interaction—not just content", icon: Sparkles },
  { title: "Human-centered—not AI alone", icon: Cpu },
  { title: "Structured journeys—not loose parts", icon: Map },
  { title: "Outcomes—not busywork", icon: Box },
  { title: "Schools, homes, future-focused teams", icon: Home },
] as const;

export function ApproachSection() {
  return (
    <>
      <section
        id="approach"
        className="relative scroll-mt-28 overflow-hidden bg-slate-950 py-14 text-white sm:py-16 lg:py-20"
        aria-labelledby="approach-heading"
      >
        <AmbientOrbs className="opacity-40" subtle />
        <Container className="relative z-10">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-12">
            <div>
              <FadeIn>
                <SectionHeading
                  id="approach-heading"
                  tone="dark"
                  eyebrow="Approach"
                  title="More than a box. A guided experience."
                  description={
                    <p>
                      AI strengthens the loop—clarity, scaffolding, reflection—while hands-on work
                      keeps thinking grounded in reality.
                    </p>
                  }
                />
              </FadeIn>
              <ul className="mt-8 space-y-3">
                {points.map((p, i) => (
                  <li key={p.title}>
                    <FadeIn delay={0.03 * i}>
                      <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-slate-200">
                        <p.icon className="h-4 w-4 shrink-0 text-amber-300" aria-hidden />
                        <span className="font-medium text-white">{p.title}</span>
                      </div>
                    </FadeIn>
                  </li>
                ))}
              </ul>
            </div>
            <FadeIn delay={0.06}>
              <AiMotionPanel />
            </FadeIn>
          </div>
        </Container>
      </section>
      <div className="bg-slate-950">
        <SectionWaveDivider />
      </div>
    </>
  );
}
