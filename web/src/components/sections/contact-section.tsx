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
      className="scroll-mt-28 border-t border-slate-200/80 bg-gradient-to-b from-stone-50 to-white py-12 sm:py-14 lg:py-16"
      aria-labelledby="contact-heading"
    >
      <Container>
        <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-10">
          <FadeIn>
            <SectionHeading
              id="contact-heading"
              eyebrow="Support"
              title="Quotes, pilots, and custom waves"
              description={
                <p className="max-w-md">
                  Drop role, kit interest, and timeline—we route to the right desk the same day when possible.
                </p>
              }
            />
            <p className="mt-4 text-sm text-slate-600">
              Mention <strong className="text-slate-800">district</strong>, <strong className="text-slate-800">PO</strong>, or{" "}
              <strong className="text-slate-800">pilot</strong> in the message so finance and field teams see it immediately.
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
