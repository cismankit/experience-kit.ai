import Link from "next/link";
import { Container } from "@/components/container";
import { KitCard } from "@/components/kits/kit-card";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { FEATURED_KIT_IDS, KITS } from "@/lib/kits-catalog";

export function HomeKitsSpotlight() {
  const featured = FEATURED_KIT_IDS.map((id) => KITS.find((k) => k.id === id)).filter(Boolean);

  return (
    <section
      id="kits-spotlight"
      className="scroll-mt-28 border-b border-slate-200/70 bg-stone-50 py-12 sm:py-14 lg:py-16"
      aria-labelledby="kits-spotlight-heading"
    >
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            id="kits-spotlight-heading"
            eyebrow="Catalog"
            title="Kits you can see before you buy"
            description={
              <p className="max-w-xl">
                Every SKU lists what ships in the box—components, cards, digital spine, and AI touchpoints—so procurement
                and learners know exactly what they’re getting.
              </p>
            }
          />
          <Button variant="secondary" size="md" href="/kits" className="w-full shrink-0 sm:w-auto">
            View full shop
          </Button>
        </div>
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {featured.map((kit) => (kit ? <KitCard key={kit.id} kit={kit} /> : null))}
        </div>
        <p id="kits" className="mt-8 scroll-mt-32 text-center text-xs text-slate-500">
          Need a custom wave? Mention volume and timeline in{" "}
          <Link href="/#contact" className="font-semibold text-amber-800 underline-offset-2 hover:underline">
            Support
          </Link>
          .
        </p>
      </Container>
    </section>
  );
}
