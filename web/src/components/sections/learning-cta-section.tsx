import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";

export function LearningCtaSection() {
  return (
    <section className="border-b border-slate-200/70 bg-slate-900 py-12 text-white sm:py-14" aria-labelledby="learning-cta-heading">
      <Container className="flex flex-col gap-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
        <div className="max-w-xl">
          <h2 id="learning-cta-heading" className="text-xl font-semibold tracking-tight sm:text-2xl">
            Ready to pick a kit and start today&apos;s mission?
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">
            Match in Kit Finder, browse full journeys on the kit page, or message Support—quotes and pilot questions route
            to humans; most replies within <strong className="font-semibold text-slate-200">one business day</strong>.
          </p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Button variant="primary" size="lg" href="/kits" className="w-full sm:w-auto">
            Browse kits
          </Button>
          <Button variant="outline" size="lg" href="/#daily-missions" className="w-full border-white/30 bg-transparent text-white hover:bg-white/10 sm:w-auto">
            Explore daily missions
          </Button>
        </div>
      </Container>
    </section>
  );
}
