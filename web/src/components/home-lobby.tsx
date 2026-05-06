import Link from "next/link";
import { ArrowRight, Compass, HeadphonesIcon, Sparkles } from "lucide-react";
import { Container } from "@/components/container";
import { HeroProductLoop } from "@/components/product/hero-product-loop";
import { RoleCards } from "@/components/product/role-cards";
import { Button } from "@/components/ui/button";
import { FEATURED_KIT_IDS, getKitById } from "@/lib/kits-catalog";
import { cn } from "@/lib/utils";
import { cardSurface } from "@/lib/ui";

function TodayMissionBand({ kitId }: { kitId: string }) {
  const kit = getKitById(kitId);
  if (!kit) return null;
  return (
    <section className="border-b border-slate-200/80 bg-white py-12 sm:py-14" aria-labelledby="lobby-mission-heading">
      <Container>
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Today&apos;s mission</p>
            <h2 id="lobby-mission-heading" className="mt-2 text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
              One focused build you can finish today
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
              {kit.firstMissionTitle} · ~{kit.firstMissionMinutes} min · {kit.name}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="primary" href="/missions">
              Open missions
            </Button>
            <Button variant="outline" href="/find-my-kit" className="bg-white">
              Match a kit first
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

function KitFinderPreviewBand() {
  return (
    <section
      className="ek-section-surface-alt border-b border-slate-200/80 py-12 sm:py-14"
      aria-labelledby="lobby-finder-heading"
    >
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Kit Finder</p>
            <h2 id="lobby-finder-heading" className="mt-2 text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
              Six quick choices. One clear recommendation.
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
              Age, goal, setting, pace, and comfort—then see your journey, first mission, and what ships.
            </p>
          </div>
          <Button variant="primary" size="lg" href="/find-my-kit" className="shrink-0">
            Start Kit Finder
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Button>
        </div>
      </Container>
    </section>
  );
}

function FeaturedPathwaysBand() {
  return (
    <section className="border-b border-slate-200/80 bg-white py-12 sm:py-14" aria-labelledby="lobby-paths-heading">
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Featured pathways</p>
            <h2 id="lobby-paths-heading" className="mt-2 text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
              Compare journeys—open details on the Kits page
            </h2>
          </div>
          <Link
            href="/kits"
            className="text-sm font-semibold text-emerald-800 underline-offset-4 transition-colors hover:text-emerald-950 hover:underline"
          >
            View all kits
          </Link>
        </div>
        <div className="mt-6 flex gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-4">
          {FEATURED_KIT_IDS.map((id) => {
            const kit = getKitById(id);
            if (!kit) return null;
            return (
              <Link
                key={id}
                href={`/kits#${id}`}
                className={cn(
                  cardSurface(),
                  "ek-card-lift min-w-[240px] shrink-0 rounded-2xl p-4 shadow-sm sm:min-w-0",
                )}
              >
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{kit.tier}</p>
                <p className="mt-1 font-semibold text-slate-900">{kit.name}</p>
                <p className="mt-1 text-xs leading-snug text-slate-600 line-clamp-2">{kit.tagline}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-emerald-800">
                  View journey <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </span>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function ProgressProofBand() {
  return (
    <section
      className="border-b border-slate-200/80 bg-gradient-to-b from-emerald-50/35 via-white to-white py-12 sm:py-14"
      aria-labelledby="lobby-progress-heading"
    >
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Proof &amp; progress</p>
            <h2 id="lobby-progress-heading" className="mt-2 text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
              See how missions become a portfolio story
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
              Uploads, reflections, streaks, and next unlocks—preview the learner studio (demo data).
            </p>
            <Button variant="primary" className="mt-6" href="/studio">
              Open Studio preview
            </Button>
          </div>
          <div className={cn(cardSurface(), "grid max-w-md grid-cols-3 gap-3 rounded-2xl p-4 text-center text-sm shadow-sm")}>
            <div>
              <p className="text-2xl font-semibold tabular-nums text-slate-900">5</p>
              <p className="text-xs text-slate-600">Day rhythm</p>
            </div>
            <div>
              <p className="text-2xl font-semibold tabular-nums text-slate-900">12</p>
              <p className="text-xs text-slate-600">Missions</p>
            </div>
            <div>
              <p className="text-2xl font-semibold tabular-nums text-slate-900">3</p>
              <p className="text-xs text-slate-600">Proofs</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function LobbyCtaStrip() {
  return (
    <section className="bg-slate-950 py-10 text-white" aria-label="Next actions">
      <Container>
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300/90">
          What&apos;s next?
        </p>
        <ul className="mt-6 flex flex-col flex-wrap items-stretch justify-center gap-3 sm:flex-row sm:gap-4">
          <li className="flex-1 sm:min-w-[10rem] sm:flex-none">
            <Link
              href="/find-my-kit"
              className="flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-semibold transition-colors hover:bg-white/15"
            >
              <Compass className="h-4 w-4" aria-hidden />
              Find my kit
            </Link>
          </li>
          <li className="flex-1 sm:min-w-[10rem] sm:flex-none">
            <Link
              href="/missions"
              className="flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-semibold transition-colors hover:bg-white/15"
            >
              <Sparkles className="h-4 w-4" aria-hidden />
              Today&apos;s mission
            </Link>
          </li>
          <li className="flex-1 sm:min-w-[10rem] sm:flex-none">
            <Link
              href="/schools"
              className="flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-semibold transition-colors hover:bg-white/15"
            >
              School pilot
            </Link>
          </li>
          <li className="flex-1 sm:min-w-[10rem] sm:flex-none">
            <Link
              href="/track"
              className="flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-semibold transition-colors hover:bg-white/15"
            >
              Track order
            </Link>
          </li>
          <li className="flex-1 sm:min-w-[10rem] sm:flex-none">
            <Link
              href="/support"
              className="flex items-center justify-center gap-2 rounded-xl border border-emerald-400/45 bg-emerald-500 px-4 py-3 text-sm font-semibold text-white shadow-sm shadow-emerald-950/30 transition-colors hover:bg-emerald-400"
            >
              <HeadphonesIcon className="h-4 w-4" aria-hidden />
              Support
            </Link>
          </li>
        </ul>
      </Container>
    </section>
  );
}

type HomeLobbyProps = {
  /** Resolved server-side from `HOME_SPOTLIGHT_KIT_ID` when set and valid. */
  spotlightKitId: string;
};

/** Product lobby — max 7 sections, no embedded school wall / FAQ / support form. */
export function HomeLobby({ spotlightKitId }: HomeLobbyProps) {
  return (
    <>
      <HeroProductLoop />
      <RoleCards />
      <TodayMissionBand kitId={spotlightKitId} />
      <KitFinderPreviewBand />
      <FeaturedPathwaysBand />
      <ProgressProofBand />
      <LobbyCtaStrip />
    </>
  );
}
