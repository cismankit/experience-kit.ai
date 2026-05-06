import { BarChart3, Boxes, Headphones, LayoutDashboard, Users } from "lucide-react";
import { Container } from "@/components/container";
import { DashboardPreview } from "@/components/product/dashboard-preview";
import { FadeIn } from "@/components/fade-in";
import { Button } from "@/components/ui/button";
import { cardSurface } from "@/lib/ui";
import { cn } from "@/lib/utils";

export function SchoolsDeploymentModel({ contactHref }: { contactHref: string }) {
  const rows = [
    {
      title: "Cohort-sized kits",
      body: "Mixes aligned to facilitator count, room layout, and how many learners touch materials each week.",
      Icon: Boxes,
    },
    {
      title: "Rhythm, not chaos",
      body: "Weekly mission cadence with clear “done” signals—so leadership sees momentum without micromanaging classrooms.",
      Icon: BarChart3,
    },
    {
      title: "Replenish & scale",
      body: "Spares, storage, and refresh paths when you’re ready to extend the pilot or bring a new site online.",
      Icon: Users,
    },
  ];
  return (
    <section
      className="border-b border-slate-200/80 bg-white py-12 sm:py-14 lg:py-16"
      aria-labelledby="schools-deploy-heading"
    >
      <Container>
        <FadeIn>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-800">Deployment</p>
          <h2 id="schools-deploy-heading" className="mt-2 text-balance text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Kit deployment that matches how schools actually run
          </h2>
          <p className="mt-3 max-w-2xl text-pretty text-sm text-slate-600 sm:text-base">
            We align inventory, facilitator load, and showcase timing before day one—so the pilot reads as a program, not
            a one-off shipment.
          </p>
        </FadeIn>
        <ul className="mt-10 grid gap-4 lg:grid-cols-3">
          {rows.map(({ title, body, Icon }) => (
            <li key={title} className={cn(cardSurface(), "rounded-2xl p-5 shadow-sm")}>
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 ring-1 ring-amber-200/60">
                <Icon className="h-5 w-5 text-amber-900" aria-hidden />
              </span>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{body}</p>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex justify-center">
          <Button variant="outline" size="lg" href={contactHref} className="bg-white">
            Scope your pilot
          </Button>
        </div>
      </Container>
    </section>
  );
}

export function SchoolsFacilitatorSupport() {
  return (
    <section
      className="border-b border-slate-200/80 bg-gradient-to-b from-stone-50 to-white py-12 sm:py-14 lg:py-16"
      aria-labelledby="schools-facilitator-heading"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-800">Facilitators</p>
            <h2 id="schools-facilitator-heading" className="mt-2 text-balance text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Teacher and facilitator support built in
            </h2>
            <p className="mt-3 text-pretty text-sm leading-relaxed text-slate-600 sm:text-base">
              Guides for pacing, discussion prompts, and how to celebrate proof—without turning missions into extra
              grading. Your team gets language for leadership updates and parent nights.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-slate-700">
              <li className="flex gap-2">
                <Headphones className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" aria-hidden />
                Office-hour style check-ins during the pilot window
              </li>
              <li className="flex gap-2">
                <LayoutDashboard className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" aria-hidden />
                Snapshot-friendly progress views for coaches and admins
              </li>
            </ul>
          </FadeIn>
          <FadeIn delay={0.06}>
            <div className={cn(cardSurface(), "rounded-2xl p-6 shadow-sm")}>
              <p className="text-sm font-semibold text-slate-900">What facilitators receive</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li>Week-by-week mission map tied to your kit mix</li>
                <li>Rubrics framed around artifacts, not busywork</li>
                <li>AI reflection cues that support thinking—learners still ship the build</li>
              </ul>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}

export function SchoolsMeasurableOutcomes() {
  const metrics = [
    { k: "Artifacts shipped", v: "Photo + reflection bundles per learner" },
    { k: "Cadence", v: "Visible weekly progress without cramming" },
    { k: "Showcase", v: "Demo-ready capstone tied to the kit path" },
  ];
  return (
    <section className="border-b border-slate-200/80 bg-white py-12 sm:py-14 lg:py-16" aria-labelledby="schools-outcomes-heading">
      <Container>
        <FadeIn>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-800">Outcomes</p>
          <h2 id="schools-outcomes-heading" className="mt-2 text-balance text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Measurable in the ways your board actually reads
          </h2>
          <p className="mt-3 max-w-2xl text-pretty text-sm text-slate-600 sm:text-base">
            Learners build real things, reflect with structure, and upload proof—so you can point to evidence, not just
            participation.
          </p>
        </FadeIn>
        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {metrics.map((m) => (
            <li key={m.k} className={cn(cardSurface(), "rounded-2xl p-5 shadow-sm")}>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{m.k}</p>
              <p className="mt-2 text-sm font-medium text-slate-900">{m.v}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export function SchoolsClassroomDashboardPreview() {
  return (
    <section
      className="border-b border-slate-200/80 bg-gradient-to-b from-amber-50/40 via-white to-stone-50 py-12 sm:py-14 lg:py-16"
      aria-labelledby="schools-dash-heading"
    >
      <Container>
        <FadeIn>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-800">Classroom view</p>
          <h2 id="schools-dash-heading" className="mt-2 text-balance text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            What a cohort dashboard can look like
          </h2>
          <p className="mt-3 max-w-2xl text-pretty text-sm text-slate-600 sm:text-base">
            Preview of learner-facing progress—your branding and roster tools connect when the program is live.
          </p>
        </FadeIn>
        <div className="mt-10">
          <DashboardPreview variant="compact" />
        </div>
      </Container>
    </section>
  );
}
