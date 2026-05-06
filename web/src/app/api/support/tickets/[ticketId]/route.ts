import { NextResponse } from "next/server";
import { z } from "zod";
import { requireApiAuth } from "@/lib/api-auth";
import { db } from "@/lib/db";

const patchSchema = z.object({
  status: z.enum(["open", "in_progress", "resolved", "closed"]).optional(),
  priority: z.enum(["low", "medium", "high", "urgent"]).optional(),
});

export async function PATCH(req: Request, { params }: { params: Promise<{ ticketId: string }> }) {
  const authResult = await requireApiAuth("educator");
  if (!authResult.ok) return authResult.response;

  const { ticketId } = await params;

  let rawBody: unknown;
  try {
    rawBody = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const parsed = patchSchema.safeParse(rawBody);
  if (!parsed.success || (!parsed.data.status && !parsed.data.priority)) {
    return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
  }

  const existing = await db.supportTicket.findFirst({
    where: { id: ticketId, workspaceId: authResult.context.workspaceId },
    select: { id: true },
  });
  if (!existing) {
    return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
  }

  const ticket = await db.supportTicket.update({
    where: { id: existing.id },
    data: {
      status: parsed.data.status,
      priority: parsed.data.priority,
    },
  });
  return NextResponse.json({ ticket });
}
