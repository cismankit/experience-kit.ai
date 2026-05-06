import { TicketPriority, TicketStatus } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";
import { requireApiAuth } from "@/lib/api-auth";
import { db } from "@/lib/db";

const createTicketSchema = z.object({
  requesterName: z.string().min(1),
  requesterEmail: z.string().email(),
  role: z.string().optional(),
  category: z.string().min(1),
  message: z.string().min(1),
  orderNumber: z.string().optional(),
  priority: z.enum(["low", "medium", "high", "urgent"]).optional(),
  workspaceSlug: z.string().optional(),
});

export async function GET(request: Request) {
  const authResult = await requireApiAuth("educator");
  if (!authResult.ok) return authResult.response;

  const url = new URL(request.url);
  const status = url.searchParams.get("status");
  const category = url.searchParams.get("category");
  const limit = Math.min(Number(url.searchParams.get("limit") ?? "20"), 100);

  const tickets = await db.supportTicket.findMany({
    where: {
      workspaceId: authResult.context.workspaceId,
      ...(status ? { status: status as TicketStatus } : {}),
      ...(category ? { category } : {}),
    },
    include: {
      order: {
        select: { orderNumber: true, status: true },
      },
      requester: {
        select: { id: true, email: true, name: true },
      },
    },
    orderBy: { createdAt: "desc" },
    take: Number.isFinite(limit) ? limit : 20,
  });

  return NextResponse.json({ tickets });
}

export async function POST(req: Request) {
  let rawBody: unknown;
  try {
    rawBody = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const parsed = createTicketSchema.safeParse(rawBody);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid ticket payload" }, { status: 400 });
  }

  const authResult = await requireApiAuth();
  const workspaceId = authResult.ok
    ? authResult.context.workspaceId
    : (
        await db.workspace.findFirst({
          where: { slug: parsed.data.workspaceSlug ?? "public-experiencekit" },
          select: { id: true },
        })
      )?.id;

  if (!workspaceId) {
    return NextResponse.json({ error: "Workspace not found" }, { status: 404 });
  }

  const linkedOrder = parsed.data.orderNumber
    ? await db.commerceOrder.findFirst({
        where: {
          workspaceId,
          orderNumber: parsed.data.orderNumber,
        },
      })
    : null;

  const ticket = await db.supportTicket.create({
    data: {
      workspaceId,
      requesterId: authResult.ok ? authResult.context.userId : null,
      requesterName: parsed.data.requesterName,
      requesterEmail: parsed.data.requesterEmail.toLowerCase(),
      role: parsed.data.role,
      category: parsed.data.category,
      message: parsed.data.message,
      priority: (parsed.data.priority as TicketPriority | undefined) ?? "medium",
      orderId: linkedOrder?.id ?? null,
    },
  });

  return NextResponse.json({ ticket }, { status: 201 });
}
