import { Container } from "@/components/container";
import { ContactForm } from "@/components/contact-form";
import { FadeIn } from "@/components/fade-in";
import { SectionHeading } from "@/components/section-heading";
import { cn } from "@/lib/utils";
import { cardSurface } from "@/lib/ui";

export type ContactSectionProps = {
  /** Tunes defaults and helper copy for school vs. consumer paths. */
  defaultLane?: "discover" | "school";
  /** Unique when multiple contact sections exist (e.g. home lanes). */
  anchorId?: string;
};

export function ContactSection({ defaultLane = "discover", anchorId = "contact" }: ContactSectionProps) {
  const school = defaultLane === "school";

  return (
    <section
      id={anchorId}
      className="scroll-mt-28 border-t border-slate-200/80 bg-gradient-to-b from-stone-50 to-white py-12 sm:py-14 lg:py-16"
      aria-labelledby="contact-heading"
    >
      <Container>
        <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-10">
          <FadeIn>
            <SectionHeading
              id="contact-heading"
              eyebrow="Support"
              title={school ? "Plan a pilot or cohort" : "Quotes, kits, and questions"}
              description={
                <p className="max-w-md">
                  {school
                    ? "Share timeline, approximate cohort size, and kit interest—we’ll respond with next steps and what good looks like for your team."
                    : "Drop your role, kit interest, and timeline—we route to the right person the same day when possible."}
                </p>
              }
            />
            <p className="mt-4 text-sm text-slate-600">
              {school ? (
                <>
                  Mention <strong className="text-slate-800">pilot window</strong>,{" "}
                  <strong className="text-slate-800">sites</strong>, and{" "}
                  <strong className="text-slate-800">facilitator count</strong> so we can respond with a realistic arc.
                </>
              ) : (
                <>
                  Mention <strong className="text-slate-800">learner age</strong>,{" "}
                  <strong className="text-slate-800">setting</strong>, or{" "}
                  <strong className="text-slate-800">district</strong> if it applies—context gets you a sharper reply.
                </>
              )}
            </p>
          </FadeIn>
          <FadeIn delay={0.06}>
            <div className={cn(cardSurface(), "rounded-3xl p-6 sm:p-8")}>
              <ContactForm key={defaultLane} defaultIntent={school ? "school" : "family"} />
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
