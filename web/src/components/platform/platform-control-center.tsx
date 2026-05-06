"use client";

import { useMemo, useState } from "react";
import { Activity, ArrowRight, Bot, Boxes, ClipboardCheck, CreditCard, Hammer, Headset, Rocket, ShieldCheck, TestTube2, Users } from "lucide-react";
import { Container } from "@/components/container";
import { DashboardPreview } from "@/components/product/dashboard-preview";
import { Button } from "@/components/ui/button";
import { cardSurface } from "@/lib/ui";
import { cn } from "@/lib/utils";
import { AUTH_PROVIDERS, PERSONA_ROLES, PLATFORM_METRICS, WORKSPACES } from "@/lib/saas-foundation";

type TrackKey = "auth" | "workspace" | "ai" | "commerce" | "support";

const TRACKS: { key: TrackKey; label: string }[] = [
  { key: "auth", label: "Auth & roles" },
  { key: "workspace", label: "Workspaces" },
  { key: "ai", label: "AI copilot" },
  { key: "commerce", label: "Commerce" },
  { key: "support", label: "Support" },
];

const TRANSFORMATION_STEPS: {
  key: string;
  title: string;
  detail: string;
  Icon: typeof ClipboardCheck;
}[] = [
  {
    key: "assess",
    title: "Assess current state",
    detail: "Adaptive intake captures role, maturity, constraints, and readiness signals in one guided flow.",
    Icon: ClipboardCheck,
  },
  {
    key: "design",
    title: "Design target state",
    detail: "AI co-designs a transformation blueprint: capabilities, milestones, controls, and ownership.",
    Icon: Hammer,
  },
  {
    key: "build-test-secure",
    title: "Develop, test, secure",
    detail: "Mission-based execution pairs build plans with quality gates, test evidence, and security checkpoints.",
    Icon: TestTube2,
  },
  {
    key: "operate-monitor",
    title: "Operationalize + monitor",
    detail: "Runbooks, alerts, and KPI telemetry keep rollout stable and measurable across teams.",
    Icon: Activity,
  },
  {
    key: "transform",
    title: "Enable transformation",
    detail: "Executive-ready scorecards and learning loops turn delivery into repeatable transformation outcomes.",
    Icon: Rocket,
  },
];

export function PlatformControlCenter() {
  const [track, setTrack] = useState<TrackKey>("auth");
  const [checkoutBusy, setCheckoutBusy] = useState(false);
  const [checkoutMessage, setCheckoutMessage] = useState("");
  const workspace = WORKSPACES[1];

  const billingHealth = useMemo(() => {
    const ratio = workspace.seatsUsed / workspace.seatsTotal;
    if (ratio >= 0.9) return "Seat capacity almost full";
    if (ratio >= 0.7) return "Healthy usage with room to grow";
    return "Plenty of seat headroom";
  }, [workspace.seatsTotal, workspace.seatsUsed]);

  async function startCheckout(plan: "starter" | "growth" | "district", seats: number) {
    setCheckoutBusy(true);
    setCheckoutMessage("");
    try {
      const res = await fetch("/api/commerce/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, seats }),
      });
      const json = await res.json();
      if (!res.ok) {
        setCheckoutMessage(typeof json?.error === "string" ? json.error : "Could not start checkout.");
        return;
      }
      setCheckoutMessage(`Checkout initialized (${plan}, ${seats} seats). Ref: ${json.checkoutRef}`);
    } catch {
      setCheckoutMessage("Network issue while starting checkout.");
    } finally {
      setCheckoutBusy(false);
    }
  }

  return (
    <main id="top" className="flex-1 border-b border-slate-200/80 bg-gradient-to-b from-white via-stone-50/30 to-white">
      <Container className="py-10 sm:py-12 lg:py-14">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">SaaS control center</p>
          <h1 className="mt-2 text-balance text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Experience platform for AI + learning kits
          </h1>
          <p className="mt-3 text-pretty text-base leading-relaxed text-slate-600">
            All tracks live in parallel: onboarding and auth, tenant workspaces, mission copilot, kit commerce, and
            customer support operations.
          </p>
        </div>

        <section className={cn(cardSurface(), "mt-8 rounded-3xl p-6 sm:p-7 lg:p-8")} aria-labelledby="transformation-journey-heading">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Transformation journey</p>
              <h2 id="transformation-journey-heading" className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-[1.75rem]">
                One platform for onboarding, delivery, security, and operations
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
                Smart onboarding assesses where each user is today, then guides them through design, implementation,
                validation, and operational monitoring toward a measurable target state.
              </p>
            </div>
            <div className="w-full max-w-sm rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4 sm:w-auto">
              <p className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-900">
                <CreditCard className="h-4 w-4" aria-hidden />
                Payments + plans in-product
              </p>
              <p className="mt-1 text-xs leading-relaxed text-emerald-900/80">
                Subscription upgrades, seat expansion, and order-linked support all live in the same workflow.
              </p>
            </div>
          </div>
          <ol className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {TRANSFORMATION_STEPS.map((step, idx) => (
              <li key={step.key} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Stage {idx + 1}</p>
                <p className="mt-2 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 ring-1 ring-slate-200/80">
                  <step.Icon className="h-4 w-4 text-slate-700" aria-hidden />
                </p>
                <p className="mt-3 text-sm font-semibold text-slate-900">{step.title}</p>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-600">{step.detail}</p>
              </li>
            ))}
          </ol>
          <div className="mt-6 flex flex-wrap gap-2">
            <Button variant="primary" size="sm" href="/find-my-kit">
              Start smart assessment
            </Button>
            <Button variant="outline" size="sm" href="/platform">
              Open transformation workspace
            </Button>
            <Button variant="secondary" size="sm" href="/orders">
              Manage plan & billing
            </Button>
          </div>
        </section>

        <div className="mt-8 flex flex-wrap gap-2">
          {TRACKS.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTrack(t.key)}
              className={cn(
                "rounded-full border px-3 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2",
                track === t.key
                  ? "border-emerald-300 bg-emerald-50 text-emerald-900"
                  : "border-slate-200 bg-white text-slate-700 hover:border-slate-300",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-label="Platform metrics">
          {PLATFORM_METRICS.map((m) => (
            <article key={m.label} className={cn(cardSurface(), "rounded-2xl p-4")}>
              <p className="text-xs uppercase tracking-[0.15em] text-slate-500">{m.label}</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">{m.value}</p>
              <p className="mt-1 text-xs font-medium text-emerald-700">{m.change}</p>
            </article>
          ))}
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <article className={cn(cardSurface(), "rounded-2xl p-6 sm:p-7")}>
            {track === "auth" ? (
              <>
                <h2 className="flex items-center gap-2 text-xl font-semibold text-slate-900">
                  <ShieldCheck className="h-5 w-5 text-emerald-700" aria-hidden />
                  Auth + role onboarding
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  SSO options and persona-specific flows route users directly to the right learning path.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {AUTH_PROVIDERS.map((p) => (
                    <span key={p.id} className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700">
                      {p.label}
                    </span>
                  ))}
                </div>
                <div className="mt-5 space-y-2">
                  {PERSONA_ROLES.map((r) => (
                    <a
                      key={r.id}
                      href={r.onboardingPath}
                      className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-800 hover:border-slate-300"
                    >
                      {r.label}
                      <ArrowRight className="h-4 w-4 text-slate-400" aria-hidden />
                    </a>
                  ))}
                </div>
              </>
            ) : null}

            {track === "workspace" ? (
              <>
                <h2 className="flex items-center gap-2 text-xl font-semibold text-slate-900">
                  <Users className="h-5 w-5 text-emerald-700" aria-hidden />
                  Multi-tenant workspace model
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Families and schools run in separate workspaces with seat tracking, role scopes, and pilot readiness.
                </p>
                <div className="mt-5 grid gap-3">
                  {WORKSPACES.map((w) => (
                    <div key={w.id} className="rounded-xl border border-slate-200 bg-white p-4">
                      <p className="text-sm font-semibold text-slate-900">{w.name}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.14em] text-slate-500">
                        {w.type} · {w.plan} plan
                      </p>
                      <p className="mt-2 text-sm text-slate-600">
                        {w.seatsUsed} / {w.seatsTotal} seats active
                      </p>
                    </div>
                  ))}
                </div>
              </>
            ) : null}

            {track === "ai" ? (
              <>
                <h2 className="flex items-center gap-2 text-xl font-semibold text-slate-900">
                  <Bot className="h-5 w-5 text-emerald-700" aria-hidden />
                  AI mission copilot
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Copilot responses are grounded in mission context to support reflection, artifacts, and next-step
                  coaching.
                </p>
                <ul className="mt-5 space-y-2 text-sm text-slate-700">
                  <li className="rounded-lg border border-slate-200 bg-white px-3 py-2">Mission-aware prompting</li>
                  <li className="rounded-lg border border-slate-200 bg-white px-3 py-2">Reflection quality scoring</li>
                  <li className="rounded-lg border border-slate-200 bg-white px-3 py-2">Portfolio-ready summaries</li>
                </ul>
                <div className="mt-5">
                  <Button variant="primary" size="sm" href="/missions">
                    Open mission library
                  </Button>
                </div>
              </>
            ) : null}

            {track === "commerce" ? (
              <>
                <h2 className="flex items-center gap-2 text-xl font-semibold text-slate-900">
                  <Boxes className="h-5 w-5 text-emerald-700" aria-hidden />
                  Commerce + fulfillment ops
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Catalog, order tracking, and seat-aware plan expansion keep buyer journeys connected to learning
                  outcomes.
                </p>
                <div className="mt-5 rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-sm font-semibold text-slate-900">{workspace.name}</p>
                  <p className="mt-1 text-sm text-slate-600">{billingHealth}</p>
                  <div className="mt-3 flex gap-2">
                    <Button variant="primary" size="sm" href="/orders">
                      Open orders
                    </Button>
                    <Button variant="outline" size="sm" href="/track">
                      Track shipment
                    </Button>
                  </div>
                  <div className="mt-4 border-t border-slate-100 pt-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Plan & billing</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => void startCheckout("growth", Math.max(workspace.seatsUsed + 10, 25))}
                        disabled={checkoutBusy}
                      >
                        Upgrade to Growth
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => void startCheckout("district", Math.max(workspace.seatsUsed + 30, 75))}
                        disabled={checkoutBusy}
                      >
                        Upgrade to District
                      </Button>
                    </div>
                    {checkoutMessage ? <p className="mt-2 text-xs text-slate-600">{checkoutMessage}</p> : null}
                  </div>
                </div>
              </>
            ) : null}

            {track === "support" ? (
              <>
                <h2 className="flex items-center gap-2 text-xl font-semibold text-slate-900">
                  <Headset className="h-5 w-5 text-emerald-700" aria-hidden />
                  Customer support command
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Ticket routing ties every request to order and learner context for fast first response and clean
                  escalation.
                </p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <a href="/support?topic=order_issue" className="rounded-xl border border-slate-200 bg-white p-4 text-sm font-medium text-slate-800 hover:border-slate-300">
                    Order incident queue
                  </a>
                  <a href="/support?topic=school_pilot" className="rounded-xl border border-slate-200 bg-white p-4 text-sm font-medium text-slate-800 hover:border-slate-300">
                    School pilot queue
                  </a>
                </div>
                <div className="mt-4">
                  <Button variant="secondary" size="sm" href="/support">
                    Open support workspace
                  </Button>
                </div>
              </>
            ) : null}
          </article>

          <article className={cn(cardSurface(), "rounded-2xl p-6 sm:p-7")}>
            <h2 className="text-xl font-semibold text-slate-900">Live learner dashboard</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Real-time student journey preview, reusable across family and school tenants.
            </p>
            <div className="mt-5">
              <DashboardPreview variant="compact" />
            </div>
          </article>
        </section>
      </Container>
    </main>
  );
}
