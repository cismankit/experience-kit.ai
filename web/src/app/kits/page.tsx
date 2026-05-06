import type { Metadata } from "next";
import { Container } from "@/components/container";
import { KitCardEnhanced } from "@/components/kits/kit-card-enhanced";
import { KITS } from "@/lib/kits-catalog";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Kits",
  description:
    "Explore ExperienceKit.ai journeys—hands-on missions, AI reflection, and portfolio-ready outcomes for homes, schools, and cohorts.",
};

export default function KitsPage() {
  return (
    <main id="top" className="flex-1 border-b border-slate-200/80 bg-gradient-to-b from-amber-50/50 via-white to-stone-50">
      <Container className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-800">Kits</p>
          <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Pick a learning journey—not a mystery box.
          </h1>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-slate-600">
            Every kit lists missions, age fit, what ships in the box, and what learners build. Request a quote when
            you&apos;re ready—we&apos;ll align pacing and cohort size with your team.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            <Button variant="primary" size="md" href="/#contact">
              Request quote
            </Button>
            <Button variant="outline" size="md" href="/track" className="bg-white">
              Track an order
            </Button>
          </div>
        </div>
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {KITS.map((kit) => (
            <KitCardEnhanced key={kit.id} kit={kit} variant="catalog" />
          ))}
        </div>
      </Container>
    </main>
  );
}
