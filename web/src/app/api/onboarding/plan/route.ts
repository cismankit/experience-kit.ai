import { NextResponse } from "next/server";
import { z } from "zod";
import { requireApiAuth } from "@/lib/api-auth";
import { db } from "@/lib/db";
import { requestContext } from "@/lib/observability";

const payloadSchema = z.object({
  objective: z.enum(["modernize", "launch", "scale", "stabilize", "transform"]),
  teamSize: z.enum(["solo", "small", "mid", "large"]),
  deliveryCadence: z.enum(["ad_hoc", "monthly", "biweekly", "weekly", "daily"]),
  testingMaturity: z.enum(["none", "manual", "partial", "automated", "continuous"]),
  securityPosture: z.enum(["reactive", "baseline", "policy", "integrated", "zero_trust"]),
  observability: z.enum(["none", "logs", "metrics", "alerts", "slo"]),
  changeManagement: z.enum(["informal", "defined", "repeatable", "program", "portfolio"]),
  budgetBand: z.enum(["starter", "growth", "scale", "enterprise"]),
  timelineDays: z.union([z.literal(30), z.literal(90), z.literal(180), z.literal(365)]),
});

const saveSchema = z.object({
  mode: z.enum(["draft", "generate"]).default("generate"),
  payload: payloadSchema,
});

const toScore = {
  deliveryCadence: { ad_hoc: 1, monthly: 2, biweekly: 3, weekly: 4, daily: 5 },
  testingMaturity: { none: 1, manual: 2, partial: 3, automated: 4, continuous: 5 },
  securityPosture: { reactive: 1, baseline: 2, policy: 3, integrated: 4, zero_trust: 5 },
  observability: { none: 1, logs: 2, metrics: 3, alerts: 4, slo: 5 },
  changeManagement: { informal: 1, defined: 2, repeatable: 3, program: 4, portfolio: 5 },
} as const;

function levelFromScore(score: number) {
  if (score < 40) return "emerging";
  if (score < 65) return "developing";
  if (score < 82) return "maturing";
  return "advanced";
}

function recommendedKitForObjective(objective: z.infer<typeof payloadSchema>["objective"]) {
  switch (objective) {
    case "modernize":
      return "design-sprint-kit";
    case "launch":
      return "launch-pad-core";
    case "scale":
      return "systems-navigator";
    case "stabilize":
      return "signal-lab";
    case "transform":
      return "systems-navigator";
    default:
      return "launch-pad-core";
  }
}

async function buildPlan(ctx: { workspaceId: string }, input: z.infer<typeof payloadSchema>) {
  const [workspace, openTickets, recentOrders, recentCopilot] = await Promise.all([
    db.workspace.findUnique({
      where: { id: ctx.workspaceId },
      include: {
        subscriptions: { orderBy: { createdAt: "desc" }, take: 1 },
        seats: { where: { active: true } },
      },
    }),
    db.supportTicket.count({ where: { workspaceId: ctx.workspaceId, status: { in: ["open", "in_progress"] } } }),
    db.commerceOrder.count({
      where: { workspaceId: ctx.workspaceId, placedAt: { gte: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30) } },
    }),
    db.copilotInteraction.count({
      where: { workspaceId: ctx.workspaceId, createdAt: { gte: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14) } },
    }),
  ]);

  if (!workspace) {
    return { ok: false as const, response: NextResponse.json({ error: "Workspace not found" }, { status: 404 }) };
  }

  const capabilityScores = {
    delivery: toScore.deliveryCadence[input.deliveryCadence] * 20,
    quality: toScore.testingMaturity[input.testingMaturity] * 20,
    security: toScore.securityPosture[input.securityPosture] * 20,
    observability: toScore.observability[input.observability] * 20,
    transformation: toScore.changeManagement[input.changeManagement] * 20,
  };

  const maturityScore = Math.round(
    (capabilityScores.delivery +
      capabilityScores.quality +
      capabilityScores.security +
      capabilityScores.observability +
      capabilityScores.transformation) /
      5,
  );

  const seatsUsed = workspace.seats.length;
  const seatsPurchased = workspace.subscriptions[0]?.seatsPurchased ?? seatsUsed;
  const seatPressure = seatsPurchased > 0 ? Math.round((seatsUsed / seatsPurchased) * 100) : 0;

  const phase1 = [
    "Complete role + tenant intake and baseline scorecard",
    "Map current delivery constraints and risk hotspots",
    input.objective === "transform"
      ? "Define executive transformation outcomes and adoption KPIs"
      : "Define near-term outcome and 90-day success criteria",
  ];
  const phase2 = [
    "Generate target-state blueprint with AI copilot",
    "Prioritize top 3 capability gaps by impact",
    "Assign owners for delivery, quality, security, and operations",
  ];
  const phase3 = [
    "Ship guided build/test/security missions against the target state",
    "Create evidence artifacts and operational runbooks",
    recentCopilot < 10 ? "Increase copilot coaching usage for team enablement" : "Maintain high-frequency copilot coaching loops",
  ];
  const phase4 = [
    "Operationalize dashboards, alerts, and service-level checkpoints",
    openTickets > 5 ? "Stabilize ticket backlog with weekly resolution targets" : "Maintain support response health and proactive issue prevention",
    "Review maturity score monthly and iterate transformation plan",
  ];

  const paymentRecommendation =
    seatPressure >= 90
      ? "Upgrade subscription seats now to avoid onboarding bottlenecks."
      : seatPressure >= 70
        ? "Plan seat expansion in the next billing cycle to support growth."
        : "Current seat capacity is healthy for planned onboarding.";

  const recommendedKitId = recommendedKitForObjective(input.objective);

  const plan = {
    workspace: {
      id: workspace.id,
      name: workspace.name,
      slug: workspace.slug,
      plan: workspace.plan,
    },
    maturity: {
      score: maturityScore,
      level: levelFromScore(maturityScore),
      capabilities: capabilityScores,
    },
    context: {
      objective: input.objective,
      teamSize: input.teamSize,
      timelineDays: input.timelineDays,
      recentOrders,
      openTickets,
      recentCopilotInteractions: recentCopilot,
      seatsUsed,
      seatsPurchased,
      seatPressurePercent: seatPressure,
    },
    targetStatePlan: {
      phases: [
        { title: "Assess current state", activities: phase1 },
        { title: "Design target state", activities: phase2 },
        { title: "Develop, test, and secure", activities: phase3 },
        { title: "Operationalize and transform", activities: phase4 },
      ],
      paymentRecommendation,
      nextActions: [
        "Launch workspace onboarding with role-specific paths",
        "Move into kit selection and confirm your recommended path",
        "Run first guided mission and capture baseline evidence",
        "Review transformation score and subscription fit at day 30",
      ],
      journeyLinks: {
        onboarding: "/onboarding",
        kitFinder: `/find-my-kit?recommended=${recommendedKitId}&objective=${input.objective}`,
        missions: "/missions?source=onboarding",
        support: "/support?topic=onboarding_help",
      },
    },
    recommendation: {
      kitId: recommendedKitId,
    },
  };

  return {
    ok: true as const,
    plan,
    maturityScore,
  };
}

export async function GET(req: Request) {
  const obs = requestContext(req, "api.onboarding.get");
  const authResult = await requireApiAuth();
  if (!authResult.ok) return authResult.response;
  const ctx = authResult.context;

  const [latestDraft, latestCompleted] = await Promise.all([
    db.onboardingPlan.findFirst({
      where: { workspaceId: ctx.workspaceId, userId: ctx.userId, status: "draft" },
      orderBy: { createdAt: "desc" },
    }),
    db.onboardingPlan.findFirst({
      where: { workspaceId: ctx.workspaceId, userId: ctx.userId, status: "completed" },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  obs.log("loaded_latest_plan", { workspaceId: ctx.workspaceId });
  return obs.json({
    draft:
      latestDraft == null
        ? null
        : {
            id: latestDraft.id,
            version: latestDraft.version,
            inputState: latestDraft.inputState,
            updatedAt: latestDraft.updatedAt,
          },
    latestPlan:
      latestCompleted == null
        ? null
        : {
            id: latestCompleted.id,
            version: latestCompleted.version,
            maturityScore: latestCompleted.maturityScore,
            resultState: latestCompleted.resultState,
            updatedAt: latestCompleted.updatedAt,
          },
  });
}

export async function POST(req: Request) {
  const obs = requestContext(req, "api.onboarding.post");
  const authResult = await requireApiAuth();
  if (!authResult.ok) return authResult.response;
  const ctx = authResult.context;

  const json = await req.json().catch(() => null);
  const parsed = saveSchema.safeParse(json);
  if (!parsed.success) {
    obs.log("invalid_payload");
    return obs.json({ error: "Invalid onboarding payload", details: parsed.error.flatten() }, { status: 400 });
  }

  const { mode, payload } = parsed.data;
  const nextVersion = ((await db.onboardingPlan.aggregate({
    where: { workspaceId: ctx.workspaceId },
    _max: { version: true },
  }))._max.version ?? 0) + 1;

  if (mode === "draft") {
    const draft = await db.onboardingPlan.create({
      data: {
        workspaceId: ctx.workspaceId,
        userId: ctx.userId,
        version: nextVersion,
        status: "draft",
        inputState: payload,
      },
    });
    obs.log("saved_draft", { workspaceId: ctx.workspaceId, version: draft.version });
    return obs.json({ saved: true, draftId: draft.id, version: draft.version });
  }

  const built = await buildPlan(ctx, payload);
  if (!built.ok) return built.response;

  const record = await db.onboardingPlan.create({
    data: {
      workspaceId: ctx.workspaceId,
      userId: ctx.userId,
      version: nextVersion,
      status: "completed",
      inputState: payload,
      resultState: built.plan,
      maturityScore: built.maturityScore,
    },
  });

  await db.recommendationSnapshot.create({
    data: {
      workspaceId: ctx.workspaceId,
      userId: ctx.userId,
      source: "onboarding_plan",
      recommendedKitId: built.plan.recommendation.kitId,
      confidence: Math.min(95, Math.max(65, Math.round(built.maturityScore * 0.9))),
      rationale: {
        objective: payload.objective,
        maturityLevel: built.plan.maturity.level,
      },
    },
  });

  obs.log("generated_plan", { workspaceId: ctx.workspaceId, version: record.version, maturityScore: built.maturityScore });
  return obs.json({
    ...built.plan,
    persistence: {
      planId: record.id,
      version: record.version,
      savedAt: record.createdAt,
    },
  });
}

