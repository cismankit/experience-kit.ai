"use client";

import { useCallback, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/container";
import { ContactForm } from "@/components/contact-form";
import { SectionHeading } from "@/components/section-heading";
import { cardSurface } from "@/lib/ui";
import { SUPPORT_CATEGORIES, type SupportCategoryId } from "@/lib/support-categories";
import { cn } from "@/lib/utils";

export function SupportPageClient({ initialTopic }: { initialTopic: SupportCategoryId | null }) {
  const [selected, setSelected] = useState<SupportCategoryId | null>(initialTopic);

  const scrollToForm = useCallback(() => {
    document.getElementById("support-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <>
      <Container className="py-12 sm:py-14 lg:py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-800">Support</p>
        <h1 className="mt-2 text-balance text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          Pick a lane—we&apos;ll route you quickly
        </h1>
        <p className="mt-3 max-w-2xl text-pretty text-slate-600 sm:text-lg">
          Choose what matches your situation. Your message opens with the right context—no generic queue.
        </p>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SUPPORT_CATEGORIES.map((cat) => {
            const active = selected === cat.id;
            return (
              <li key={cat.id}>
                <button
                  type="button"
                  onClick={() => {
                    setSelected(cat.id);
                    queueMicrotask(scrollToForm);
                  }}
                  className={cn(
                    cardSurface(),
                    "ek-card-lift flex h-full w-full flex-col rounded-2xl p-5 text-left shadow-sm ring-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2",
                    active ? "ring-amber-400/80 bg-amber-50/40" : "ring-transparent hover:ring-amber-200/60",
                  )}
                >
                  <h2 className="text-lg font-semibold text-slate-900">{cat.title}</h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{cat.description}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-amber-900">
                    Use this form
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </Container>

      <section
        id="support-form"
        className="scroll-mt-28 border-t border-slate-200/80 bg-gradient-to-b from-stone-50 to-white py-12 sm:py-14 lg:py-16"
        aria-labelledby="support-form-heading"
      >
        <Container>
          <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-10">
            <div>
              <SectionHeading
                id="support-form-heading"
                eyebrow="Message"
                title="Tell us what you need"
                description={
                  <p className="max-w-md text-slate-600">
                    {selected
                      ? SUPPORT_CATEGORIES.find((c) => c.id === selected)?.messageHint
                      : "Tap a category above to prefill context, or pick one in the form—we read every message."}
                  </p>
                }
              />
              <p className="mt-4 text-sm text-slate-600">
                Fastest for shipments: use{" "}
                <a href="/track" className="font-semibold text-amber-900 underline-offset-2 hover:underline">
                  Track
                </a>{" "}
                with the email from your confirmation.
              </p>
            </div>
            <div className={cn(cardSurface(), "rounded-3xl p-6 sm:p-8")}>
              <ContactForm key={selected ?? "none"} variant="support" presetCategory={selected} />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
