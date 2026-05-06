import { Container } from "@/components/container";
import { FeaturedKitsExplorer } from "@/components/home/featured-kits-explorer";
import { KitFinderWithSync } from "@/components/kit-finder/kit-finder-with-sync";

/** Single “match & compare” band: finder then featured, shared context for wayfinding. */
export function KitMatchSection() {
  return (
    <section
      id="kit-match"
      className="scroll-mt-28 border-b border-slate-200/70 bg-white py-12 sm:py-14 lg:py-16"
      aria-labelledby="kit-match-heading"
    >
      <Container>
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-800">Match & compare</p>
          <h2 id="kit-match-heading" className="mt-2 text-balance text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Find a fit, then inspect the journey
          </h2>
          <p className="mt-3 text-pretty text-sm leading-relaxed text-slate-600 sm:text-base">
            The finder narrows the field; featured kits show what a pathway feels like—same flow, less page hopping.
          </p>
        </div>

        <div id="kit-finder" className="mt-10 scroll-mt-28">
          <div className="max-w-2xl">
            <h3 className="text-base font-semibold text-slate-900">Kit Finder</h3>
            <p className="mt-1 text-sm text-slate-600">Five quick choices—your best match updates as you go.</p>
          </div>
          <div className="mt-6">
            <KitFinderWithSync />
          </div>
        </div>

        <div id="featured-kits" className="mt-14 scroll-mt-28 border-t border-slate-200/80 pt-12 lg:mt-16 lg:pt-14">
          <FeaturedKitsExplorer compactHeader />
        </div>
      </Container>
    </section>
  );
}
