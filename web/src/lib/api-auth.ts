import { MembershipRole } from "@prisma/client";
import { NextResponse } from "next/server";
import { auth, hasAtLeastRole } from "@/lib/auth";

type AuthContext = {
  userId: string;
  workspaceId: string;
  workspaceSlug: string;
  role: MembershipRole;
};

export async function requireApiAuth(minRole?: MembershipRole) {
  const session = await auth();
  if (!session?.user?.id || !session.user.workspaceId) {
    return {
      ok: false as const,
      response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }

  const context: AuthContext = {
    userId: session.user.id,
    workspaceId: session.user.workspaceId,
    workspaceSlug: session.user.workspaceSlug,
    role: session.user.role,
  };

  if (minRole && !hasAtLeastRole(context.role, minRole)) {
    return {
      ok: false as const,
      response: NextResponse.json({ error: "Forbidden" }, { status: 403 }),
    };
  }

  return { ok: true as const, context };
}
