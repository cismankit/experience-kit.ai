import { FileText, ImageIcon, Medal, MonitorPlay, ScrollText, Sparkles } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { cardSurface } from "@/lib/ui";

const items = [
  { icon: ImageIcon, label: "Photos of builds" },
  { icon: ScrollText, label: "Short reflections" },
  { icon: FileText, label: "Mini reports" },
  { icon: MonitorPlay, label: "Project demos" },
  { icon: Medal, label: "Skill badges" },
  { icon: Sparkles, label: "Portfolio entries" },
] as const;

export function PortfolioProofSection() {
  return (
    <section
      id="portfolio-proof"
      className="scroll-mt-28 border-b border-slate-200/70 bg-stone-50 py-14 sm:py-16 lg:py-20"
      aria-labelledby="portfolio-proof-heading"
    >
      <Container>
        <SectionHeading
          id="portfolio-proof-heading"
          eyebrow="Evidence"
          title="From activity to proof"
          description={
            <p className="max-w-2xl">
              Every kit helps learners stack tangible outcomes—not busywork. Proof becomes part of a growing story you can
              share with families, mentors, and schools.
            </p>
          }
        />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <li key={it.label}>
              <div className={cn(cardSurface(), "flex items-center gap-3 rounded-2xl p-5 shadow-sm")}>
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-inner ring-1 ring-slate-200">
                  <it.icon className="h-5 w-5 text-amber-700" aria-hidden />
                </span>
                <span className="font-medium text-slate-900">{it.label}</span>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex justify-center">
          <Button variant="primary" size="lg" href="/#contact">
            See sample portfolio
          </Button>
        </div>
        <p className="mt-6 text-center text-sm text-slate-500">
          We&apos;ll walk through artifacts and pacing on a quick call—{" "}
          <Link href="/#contact" className="font-semibold text-amber-800 underline-offset-2 hover:underline">
            request a session
          </Link>
          .
        </p>
      </Container>
    </section>
  );
}
