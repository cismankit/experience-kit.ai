import { NextResponse } from "next/server";
import { z } from "zod";
import { requireApiAuth } from "@/lib/api-auth";
import { db } from "@/lib/db";

const schema = z.object({
  currentStage: z.enum(["onboarding", "kit", "mission", "support"]),
  completedStages: z.array(z.string()).default([]),
  recommendedKitId: z.string().optional(),
});

export async function GET() {
  const authResult = await requireApiAuth();
  if (!authResult.ok) return authResult.response;
  const ctx = authResult.context;

  const progress = await db.journeyProgress.findUnique({
    where: { workspaceId_userId: { workspaceId: ctx.workspaceId, userId: ctx.userId } },
  });
  return NextResponse.json({ progress });
}

export async function POST(req: Request) {
  const authResult = await requireApiAuth();
  if (!authResult.ok) return authResult.response;
  const ctx = authResult.context;

  const raw = await req.json().catch(() => null);
  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid journey payload" }, { status: 400 });
  }

  const progress = await db.journeyProgress.upsert({
    where: { workspaceId_userId: { workspaceId: ctx.workspaceId, userId: ctx.userId } },
    create: {
      workspaceId: ctx.workspaceId,
      userId: ctx.userId,
      currentStage: parsed.data.currentStage,
      completedStages: parsed.data.completedStages,
      recommendedKitId: parsed.data.recommendedKitId,
    },
    update: {
      currentStage: parsed.data.currentStage,
      completedStages: parsed.data.completedStages,
      recommendedKitId: parsed.data.recommendedKitId,
    },
  });

  return NextResponse.json({ progress });
}

