"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Camera, Compass, MessageCircle, Sparkles, Upload } from "lucide-react";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { cn } from "@/lib/utils";
import { cardSurface } from "@/lib/ui";

const loopSteps = [
  { step: 1, title: "Pick mission", icon: Compass, detail: "Choose one focused card from your kit path." },
  { step: 2, title: "Build or observe", icon: Sparkles, detail: "Use hands-on materials—touch, test, iterate." },
  { step: 3, title: "Capture proof", icon: Camera, detail: "Photos, notes, or short clips for your journal." },
  { step: 4, title: "Reflect with AI", icon: MessageCircle, detail: "Explain what shifted and why—it sharpens thinking." },
  { step: 5, title: "Earn progress", icon: Upload, detail: "Unlock the next mission and grow your portfolio." },
] as const;

const samples = [
  { kind: "Build", body: "Create a mini prototype" },
  { kind: "Observe", body: "Record one real-world signal" },
  { kind: "Explain", body: "Tell the AI what changed and why" },
  { kind: "Share", body: "Upload proof to your learning journal" },
] as const;

export function TodayMissionSection() {
  const reduce = useReducedMotion();

  return (
    <section
      id="daily-missions"
      className="scroll-mt-28 border-b border-slate-200/70 bg-gradient-to-b from-stone-50 to-white py-14 sm:py-16 lg:py-20"
      aria-labelledby="today-mission-heading"
    >
      <Container>
        <SectionHeading
          id="today-mission-heading"
          eyebrow="Daily rhythm"
          title="Today’s Mission"
          description={
            <p className="max-w-2xl">
              Open your kit. Scan the QR. Complete one focused activity. Reflect with AI. Upload proof. Unlock the next
              step.
            </p>
          }
        />

        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {loopSteps.map((s, i) => (
            <motion.li
              key={s.step}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: reduce ? 0 : i * 0.06 }}
            >
              <div
                className={cn(
                  cardSurface(),
                  "flex h-full flex-col rounded-2xl p-5 shadow-sm ring-1 ring-slate-900/5 transition-transform duration-300 hover:-translate-y-0.5",
                )}
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-500 text-sm font-bold text-slate-950">
                  {s.step}
                </span>
                <span className="mt-3 flex items-center gap-2 text-slate-900">
                  <s.icon className="h-4 w-4 text-amber-700" aria-hidden />
                  <span className="font-semibold">{s.title}</span>
                </span>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.detail}</p>
              </div>
            </motion.li>
          ))}
        </ol>

        <div className="mt-12">
          <h3 className="text-lg font-semibold text-slate-900">Sample missions</h3>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {samples.map((m) => (
              <li key={m.kind}>
                <div className={cn(cardSurface(), "rounded-2xl p-5 shadow-sm")}>
                  <p className="text-xs font-semibold uppercase tracking-wider text-amber-800">{m.kind}</p>
                  <p className="mt-2 text-sm font-medium leading-snug text-slate-800">{m.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
