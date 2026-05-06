import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Container } from "@/components/container";
import { FadeIn } from "@/components/fade-in";
import { Button } from "@/components/ui/button";
import { FEATURED_KIT_IDS, getKitById, type KitProduct } from "@/lib/kits-catalog";
import { cn } from "@/lib/utils";
import { cardSurface } from "@/lib/ui";

const OUTCOME_KIT_IDS = FEATURED_KIT_IDS.slice(0, 3);

export function PortfolioProofSection() {
  const kits = OUTCOME_KIT_IDS.map((id) => getKitById(id)).filter((k): k is KitProduct => k != null);

  return (
    <section
      id="outcome-proof"
      className="scroll-mt-28 border-b border-slate-200/70 bg-stone-50 py-12 sm:py-14 lg:py-16"
      aria-labelledby="outcome-proof-heading"
    >
      <Container>
        <span id="portfolio-proof" className="sr-only" aria-hidden="true" />
        <FadeIn>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-800">Outcomes</p>
              <h2 id="outcome-proof-heading" className="mt-2 text-balance text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                What learners ship in each pathway
              </h2>
              <p className="mt-3 text-pretty text-sm leading-relaxed text-slate-600 sm:text-base">
                Pulled from the same kit definitions as the catalog—capstone targets and learner-facing outcomes.
              </p>
            </div>
            <Button variant="outline" size="sm" href="/kits" className="shrink-0 bg-white">
              Full catalog
            </Button>
          </div>
        </FadeIn>

        <div className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] sm:grid sm:grid-cols-3 sm:overflow-visible [&::-webkit-scrollbar]:hidden">
          {kits.map((kit, idx) => (
            <article
              key={kit.id}
              className={cn(
                cardSurface(),
                "ek-card-lift min-w-[min(100%,18rem)] snap-center rounded-2xl p-5 shadow-sm sm:min-w-0",
              )}
            >
              <FadeIn delay={idx * 0.05}>
                <p className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-amber-800">
                  <Sparkles className="h-3.5 w-3.5" aria-hidden />
                  {kit.tier}
                </p>
                <h3 className="mt-3 text-lg font-semibold text-slate-900">{kit.name}</h3>
                <p className="mt-2 text-sm font-medium text-slate-800">{kit.whatLearnerBuilds}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  <span className="font-semibold text-slate-800">Capstone: </span>
                  {kit.finalArtifact}
                </p>
                <p className="mt-4 text-sm font-semibold text-amber-900">
                  <Link
                    href={`/kits#${kit.id}`}
                    className="inline-flex items-center gap-1 underline-offset-2 hover:underline"
                  >
                    View kit journey
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </p>
              </FadeIn>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
