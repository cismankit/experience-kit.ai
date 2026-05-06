import { BarChart3, BookMarked, Boxes, Package, QrCode, RefreshCw, School, Truck } from "lucide-react";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { cardSurface } from "@/lib/ui";

const items = [
  { icon: Package, label: "Cohort kits" },
  { icon: BookMarked, label: "Teacher guides" },
  { icon: School, label: "Rubrics" },
  { icon: QrCode, label: "QR onboarding" },
  { icon: BarChart3, label: "Progress dashboard" },
  { icon: Truck, label: "Quote support" },
  { icon: RefreshCw, label: "Order tracking" },
  { icon: Boxes, label: "Replenishment planning" },
] as const;

export function SchoolPilotSection() {
  return (
    <section
      id="schools"
      className="scroll-mt-28 border-b border-slate-200/70 bg-gradient-to-b from-amber-50/60 via-white to-stone-50 py-14 sm:py-16 lg:py-20"
      aria-labelledby="schools-heading"
    >
      <Container>
        <SectionHeading
          id="schools-heading"
          eyebrow="Institutions"
          title="Pilot-ready for classrooms, labs, and learning centers"
          description={
            <p className="max-w-2xl">
              Bring kits that feel premium to learners while staying workable for educators—structured onboarding,
              visible progress, and hands-on support when you scale a pilot.
            </p>
          }
        />
        <div className="mt-8 max-w-3xl rounded-2xl border border-amber-200/80 bg-amber-50/40 px-5 py-4 text-sm leading-relaxed text-slate-800">
          <p className="font-semibold text-slate-900">How pilots typically run</p>
          <p className="mt-2">
            Most cohort pilots span <strong>4–8 weeks</strong>: onboard educators → weekly missions → learner showcase →
            replenish or expand. We align <strong>kit mix</strong>, <strong>cohort size</strong>, and{" "}
            <strong>facilitator capacity</strong> before anything ships—then quote, PO, ship, and track in the same flow.
          </p>
        </div>
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, idx) => (
            <li key={`${it.label}-${idx}`}>
              <div className={cn(cardSurface(), "flex items-center gap-3 rounded-2xl p-4 shadow-sm")}>
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white ring-1 ring-slate-200">
                  <it.icon className="h-5 w-5 text-amber-700" aria-hidden />
                </span>
                <span className="text-sm font-semibold text-slate-900">{it.label}</span>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button variant="primary" size="lg" href="/#contact">
            Request school pilot
          </Button>
          <Button variant="outline" size="lg" href="/kits" className="bg-white">
            Browse kits
          </Button>
        </div>
      </Container>
    </section>
  );
}
