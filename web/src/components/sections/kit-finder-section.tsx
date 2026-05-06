import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { KitFinder } from "@/components/kit-finder/kit-finder";

export function KitFinderSection() {
  return (
    <section
      id="kit-finder"
      className="scroll-mt-28 border-b border-slate-200/70 bg-white py-14 sm:py-16 lg:py-20"
      aria-labelledby="kit-finder-heading"
    >
      <Container>
        <SectionHeading
          id="kit-finder-heading"
          eyebrow="Matchmaking"
          title="Kit Finder"
          description={
            <p className="max-w-2xl">
              Tell us who you&apos;re planning for and how you like to learn—we&apos;ll suggest a kit alignment before you
              talk to our team or request a quote.
            </p>
          }
        />
        <div className="mt-10">
          <KitFinder />
        </div>
      </Container>
    </section>
  );
}
