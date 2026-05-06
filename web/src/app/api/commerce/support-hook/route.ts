import { NextResponse } from "next/server";
import { z } from "zod";
import { requireApiAuth } from "@/lib/api-auth";
import { db } from "@/lib/db";

const supportHookSchema = z.object({
  orderNumber: z.string().min(1),
  category: z.string().default("order_issue"),
  message: z.string().min(1),
  requesterName: z.string().min(1),
  requesterEmail: z.string().email(),
});

export async function POST(req: Request) {
  const authResult = await requireApiAuth();
  if (!authResult.ok) return authResult.response;

  let rawBody: unknown;
  try {
    rawBody = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const parsed = supportHookSchema.safeParse(rawBody);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid support hook payload" }, { status: 400 });
  }

  const order = await db.commerceOrder.findFirst({
    where: {
      workspaceId: authResult.context.workspaceId,
      orderNumber: parsed.data.orderNumber,
    },
  });
  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  const ticket = await db.supportTicket.create({
    data: {
      workspaceId: authResult.context.workspaceId,
      requesterId: authResult.context.userId,
      requesterName: parsed.data.requesterName,
      requesterEmail: parsed.data.requesterEmail.toLowerCase(),
      category: parsed.data.category,
      message: parsed.data.message,
      priority: "high",
      orderId: order.id,
    },
  });

  return NextResponse.json({ ticket }, { status: 201 });
}
