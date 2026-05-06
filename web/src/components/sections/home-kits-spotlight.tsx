import Link from "next/link";
import { Container } from "@/components/container";
import { KitCardEnhanced } from "@/components/kits/kit-card-enhanced";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { FEATURED_KIT_IDS, KITS } from "@/lib/kits-catalog";

export function HomeKitsSpotlight() {
  const featured = FEATURED_KIT_IDS.map((id) => KITS.find((k) => k.id === id)).filter(Boolean);

  return (
    <section
      id="kits-spotlight"
      className="scroll-mt-28 border-b border-slate-200/70 bg-stone-50 py-14 sm:py-16 lg:py-20"
      aria-labelledby="kits-spotlight-heading"
    >
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            id="kits-spotlight-heading"
            eyebrow="Catalog"
            title="Find the journey that fits"
            description={
              <p className="max-w-xl">
                Each kit spells out ages, cadence, artifacts, and what learners build—so families and teams can decide
                with confidence before requesting a quote.
              </p>
            }
          />
          <Button variant="secondary" size="md" href="/kits" className="w-full shrink-0 sm:w-auto">
            Browse all kits
          </Button>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {featured.map((kit) => (kit ? <KitCardEnhanced key={kit.id} kit={kit} variant="spotlight" /> : null))}
        </div>
        <p id="kits" className="mt-10 scroll-mt-32 text-center text-sm text-slate-500">
          Piloting at scale or need a custom wave? Share timing and learners in{" "}
          <Link href="/#contact" className="font-semibold text-amber-800 underline-offset-2 hover:underline">
            Support
          </Link>
          —we&apos;ll outline next steps.
        </p>
      </Container>
    </section>
  );
}
