import type { LucideIcon } from "lucide-react";
import { GraduationCap, HeartHandshake, School, UserRound } from "lucide-react";
import { Container } from "@/components/container";
import { FadeIn } from "@/components/fade-in";
import { SectionHeading } from "@/components/section-heading";
import { cardSurface } from "@/lib/ui";
import { cn } from "@/lib/utils";

type Audience = { id?: string; title: string; body: string; icon: LucideIcon };

const audiences: Audience[] = [
  {
    id: "for-schools",
    title: "Schools",
    body: "Classrooms and programs with kit-based momentum.",
    icon: School,
  },
  {
    id: "for-parents",
    title: "Parents",
    body: "Guided activities beyond passive screen time.",
    icon: HeartHandshake,
  },
  {
    title: "Learners",
    body: "Explore, build, and ship something worth showing.",
    icon: UserRound,
  },
  {
    title: "Educators",
    body: "Facilitation that stays interactive and outcome-led.",
    icon: GraduationCap,
  },
];

const ladder = [
  { name: "Starter", desc: "Early curiosity & foundations." },
  { name: "Discovery", desc: "Observation & guided experimentation." },
  { name: "Explorer", desc: "Deeper builds and applied practice." },
  { name: "Advanced", desc: "Systems thinking & tougher problems." },
  { name: "Mastery", desc: "Portfolio-ready depth & readiness." },
] as const;

export function AudienceKitsSection() {
  return (
    <section
      id="audience"
      className="scroll-mt-28 border-b border-slate-200/70 bg-white py-14 sm:py-16 lg:py-20"
      aria-labelledby="audience-heading"
    >
      <Container>
        <FadeIn>
          <SectionHeading
            id="audience-heading"
            eyebrow="Who & paths"
            title="Built for your ecosystem—then leveled with intention"
            description={
              <p>
                Same premium kit philosophy for schools, homes, and motivated learners—organized as
                a ladder you can climb without getting lost.
              </p>
            }
          />
        </FadeIn>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:mt-10 lg:grid-cols-4">
          {audiences.map((a, i) => (
            <li
              key={a.title}
              id={a.id}
              className={cn(cardSurface(), "scroll-mt-32 rounded-2xl p-4 ek-card-lift")}
            >
              <FadeIn delay={0.04 * i}>
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-900 ring-1 ring-amber-200/80">
                    <a.icon className="h-4 w-4" aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">{a.title}</h3>
                    <p className="mt-0.5 text-xs leading-relaxed text-slate-600">{a.body}</p>
                  </div>
                </div>
              </FadeIn>
            </li>
          ))}
        </ul>
        <div id="kits" className="mt-10 scroll-mt-32 lg:mt-12">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-800">Kit journey</p>
            <p className="mt-1 text-sm text-slate-600">Swipe on mobile—each stage widens autonomy and depth.</p>
          </FadeIn>
          <div className="mt-4 flex gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory">
            {ladder.map((k, i) => (
              <div
                key={k.name}
                className={cn(
                  cardSurface(),
                  "min-w-[11.5rem] shrink-0 snap-start rounded-2xl p-4 sm:min-w-[13rem]",
                )}
              >
                <p className="text-[10px] font-bold uppercase tracking-widest text-amber-700">
                  Stage {i + 1}
                </p>
                <h3 className="mt-1 text-sm font-semibold text-slate-900">{k.name}</h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-600">{k.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
