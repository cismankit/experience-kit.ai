import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/container";
import { FadeIn } from "@/components/fade-in";
import { cardSurface } from "@/lib/ui";
import { cn } from "@/lib/utils";

export function CompactCtaSection() {
  return (
    <section
      className="scroll-mt-28 border-b border-slate-200/80 bg-gradient-to-br from-amber-50/90 via-white to-stone-50 py-10 sm:py-12"
      aria-labelledby="compact-cta-heading"
    >
      <Container>
        <FadeIn>
          <div className={cn(cardSurface(), "rounded-3xl p-6 sm:flex sm:items-center sm:justify-between sm:gap-8 sm:p-8")}>
            <div className="max-w-xl">
              <h2
                id="compact-cta-heading"
                className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl"
              >
                Ready when your learners are.
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
                Browse SKUs, track shipments, or pull us in for a scoped pilot—same stack, no runaround.
              </p>
            </div>
            <div className="mt-5 flex flex-col gap-2 sm:mt-0 sm:min-w-[11rem]">
              <Button variant="primary" size="md" href="/kits" className="w-full sm:w-auto">
                Shop kits
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
              <Button variant="outline" size="md" className="w-full bg-white sm:w-auto" href="/track">
                Track order
              </Button>
              <Button variant="secondary" size="md" className="w-full sm:w-auto" href="/#contact">
                Contact sales
              </Button>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
