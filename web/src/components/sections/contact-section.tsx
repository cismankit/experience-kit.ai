import { Container } from "@/components/container";
import { ContactForm } from "@/components/contact-form";
import { FadeIn } from "@/components/fade-in";
import { SectionHeading } from "@/components/section-heading";
import { cn } from "@/lib/utils";
import { cardSurface } from "@/lib/ui";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="scroll-mt-28 border-t border-slate-200/80 bg-gradient-to-b from-stone-50 to-white py-14 sm:py-16 lg:py-20"
      aria-labelledby="contact-heading"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-12">
          <FadeIn>
            <SectionHeading
              id="contact-heading"
              eyebrow="Contact"
              title="Tell us what you’re building"
              description={
                <p>
                  A few lines is enough—role, goals, timeline. We’ll reply with practical next steps
                  (demo, pilot, or the right kit path).
                </p>
              }
            />
            <p className="mt-6 text-sm text-slate-600">
              Same form for <strong className="text-slate-800">Request a Demo</strong> or{" "}
              <strong className="text-slate-800">Join the Pilot</strong>—say which in your message.
            </p>
          </FadeIn>
          <FadeIn delay={0.06}>
            <div className={cn(cardSurface(), "rounded-3xl p-6 sm:p-8")}>
              <ContactForm />
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
