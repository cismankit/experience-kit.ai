import { NextResponse } from "next/server";
import { requireApiAuth } from "@/lib/api-auth";
import { db } from "@/lib/db";

export async function GET() {
  const authResult = await requireApiAuth();
  if (!authResult.ok) return authResult.response;

  const workspace = await db.workspace.findUnique({
    where: { id: authResult.context.workspaceId },
    include: {
      memberships: {
        select: { id: true, role: true, userId: true },
      },
      subscriptions: {
        orderBy: { createdAt: "desc" },
        take: 1,
      },
      seats: {
        where: { active: true },
      },
    },
  });

  if (!workspace) {
    return NextResponse.json({ error: "Workspace not found" }, { status: 404 });
  }

  return NextResponse.json({
    workspace,
    auth: authResult.context,
  });
}
