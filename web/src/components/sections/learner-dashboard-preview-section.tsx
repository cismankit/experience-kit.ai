import { Award, BookMarked, Camera, Flame, LayoutDashboard, Sparkles } from "lucide-react";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { cn } from "@/lib/utils";
import { cardSurface } from "@/lib/ui";

export function LearnerDashboardPreviewSection() {
  return (
    <section
      id="dashboard-preview"
      className="scroll-mt-28 border-b border-slate-200/70 bg-slate-950 py-14 text-slate-100 sm:py-16 lg:py-20"
      aria-labelledby="dashboard-preview-heading"
    >
      <Container>
        <SectionHeading
          id="dashboard-preview-heading"
          eyebrow="Rhythm"
          title="Where progress lives"
          align="center"
          tone="dark"
          description={
            <p className="mx-auto max-w-2xl text-slate-300">
              An example of the rhythm learners feel—today&apos;s mission, streaks, proof, and what unlocks next. Built
              to reward showing up daily.
            </p>
          }
        />

        <div
          className={cn(
            cardSurface(),
            "mx-auto mt-10 max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-2xl backdrop-blur sm:p-8",
          )}
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-amber-300">Current mission</p>
              <p className="mt-1 text-lg font-semibold text-white">Observe · Map one signal in the wild</p>
              <p className="mt-2 text-sm text-slate-400">Signal Lab · Day 6 of 24</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white">
                <Flame className="h-3.5 w-3.5 text-amber-400" aria-hidden />
                Streak 5 days
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white">
                <Sparkles className="h-3.5 w-3.5 text-sky-300" aria-hidden />
                12 missions done
              </span>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-white">
                <Award className="h-4 w-4 text-amber-300" aria-hidden />
                Badges earned
              </div>
              <p className="mt-3 text-3xl font-semibold text-white">6</p>
              <p className="mt-1 text-xs text-slate-400">Explorer paths unlocked</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-white">
                <Camera className="h-4 w-4 text-amber-300" aria-hidden />
                Proof uploaded
              </div>
              <p className="mt-3 text-3xl font-semibold text-white">14</p>
              <p className="mt-1 text-xs text-slate-400">Photos, clips, and notes</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2 text-sm font-semibold text-white">
                <BookMarked className="h-4 w-4 text-amber-300" aria-hidden />
                Reflection journal
              </div>
              <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-300">
                “I expected noise—instead I saw a pattern. That changed my hypothesis for Day 7…”
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-amber-400/30 bg-amber-500/10 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <LayoutDashboard className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" aria-hidden />
              <div>
                <p className="font-semibold text-white">Next recommended kit</p>
                <p className="text-sm text-slate-300">
                  After Signal Lab → <span className="text-white">Systems Navigator</span> for stakeholder narratives.
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-400">
              Illustrative example — sign-in and live sync ship with your program rollout.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
