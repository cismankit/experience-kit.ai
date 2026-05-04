import {
  BookOpen,
  Bot,
  Layers,
  QrCode,
  Route,
  Target,
} from "lucide-react";
import { Container } from "@/components/container";
import { FadeIn } from "@/components/fade-in";
import { SectionHeading } from "@/components/section-heading";
import { cardSurface } from "@/lib/ui";
import { cn } from "@/lib/utils";

const steps = [
  { n: "1", title: "Choose a kit", body: "Match level and pathway to your learner or program." },
  { n: "2", title: "Start the journey", body: "Open materials and begin hands-on exploration." },
  { n: "3", title: "Activate AI", body: "Scaffold, explain, and reflect—without taking over." },
  { n: "4", title: "Apply & grow", body: "Ship outcomes, then climb to the next challenge." },
] as const;

const features = [
  { title: "Hands-on components", icon: Layers },
  { title: "Challenge cards", icon: BookOpen },
  { title: "QR-linked journeys", icon: QrCode },
  { title: "AI-assisted prompts", icon: Bot },
  { title: "Reflection & application", icon: Route },
  { title: "Progress signals", icon: Target },
] as const;

export function ExperienceSection() {
  return (
    <section
      id="experience"
      className="scroll-mt-28 bg-stone-50 py-14 sm:py-16 lg:py-20"
      aria-labelledby="experience-heading"
    >
      <Container>
        <FadeIn>
          <SectionHeading
            id="experience-heading"
            eyebrow="How it works"
            title="The kit experience—start to finish"
            description={
              <p>
                One flow you can explain in a sentence: choose, build with guidance, strengthen with
                AI, then apply what stuck.
              </p>
            }
          />
        </FadeIn>
        <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:mt-10 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.n} className={cn(cardSurface(), "rounded-2xl p-4 lg:p-5")}>
              <FadeIn delay={0.04 * i}>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-amber-700">Step {s.n}</p>
                  <h3 className="mt-1 text-sm font-semibold text-slate-900">{s.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600 sm:text-sm">{s.body}</p>
                </div>
              </FadeIn>
            </li>
          ))}
        </ol>
        <div className="mt-10 lg:mt-12">
          <p className="text-xs font-semibold uppercase tracking-wider text-amber-800">Inside each kit</p>
          <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {features.map((f, i) => (
              <li key={f.title} className={cn(cardSurface(), "rounded-xl px-3 py-3 text-center ek-card-lift")}>
                <FadeIn delay={0.02 * i}>
                  <div>
                    <f.icon className="mx-auto h-5 w-5 text-amber-700" aria-hidden />
                    <p className="mt-2 text-[11px] font-medium leading-tight text-slate-800 sm:text-xs">{f.title}</p>
                  </div>
                </FadeIn>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
