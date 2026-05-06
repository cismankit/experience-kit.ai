import { NextResponse } from "next/server";
import { z } from "zod";
import { requireApiAuth } from "@/lib/api-auth";
import { db } from "@/lib/db";

const createOrderSchema = z.object({
  orderNumber: z.string().min(3),
  customerEmail: z.string().email(),
  kitName: z.string().min(1),
  externalRef: z.string().optional(),
});

export async function GET() {
  const authResult = await requireApiAuth();
  if (!authResult.ok) return authResult.response;

  const orders = await db.commerceOrder.findMany({
    where: { workspaceId: authResult.context.workspaceId },
    orderBy: { placedAt: "desc" },
    take: 100,
  });

  return NextResponse.json({ orders });
}

export async function POST(req: Request) {
  const authResult = await requireApiAuth("educator");
  if (!authResult.ok) return authResult.response;

  let rawBody: unknown;
  try {
    rawBody = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const parsed = createOrderSchema.safeParse(rawBody);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid order payload" }, { status: 400 });
  }

  const order = await db.commerceOrder.create({
    data: {
      workspaceId: authResult.context.workspaceId,
      orderNumber: parsed.data.orderNumber,
      customerEmail: parsed.data.customerEmail.toLowerCase(),
      kitName: parsed.data.kitName,
      externalRef: parsed.data.externalRef,
      status: "processing",
    },
  });

  return NextResponse.json({ order }, { status: 201 });
}
