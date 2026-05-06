import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

const eventSchema = z.object({
  checkoutRef: z.string().min(1),
  workspaceSlug: z.string().min(1),
  eventType: z.enum(["checkout_completed", "seat_upgrade", "subscription_canceled"]),
  seatsPurchased: z.number().int().min(1).optional(),
});

export async function POST(req: Request) {
  const providedSecret = req.headers.get("x-ek-webhook-secret");
  if (!process.env.PAYMENTS_WEBHOOK_SECRET || providedSecret !== process.env.PAYMENTS_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Unauthorized webhook" }, { status: 401 });
  }

  const raw = await req.json().catch(() => null);
  const parsed = eventSchema.safeParse(raw);
  if (!parsed.success) return NextResponse.json({ error: "Invalid webhook payload" }, { status: 400 });

  const workspace = await db.workspace.findUnique({ where: { slug: parsed.data.workspaceSlug } });
  if (!workspace) return NextResponse.json({ error: "Workspace not found" }, { status: 404 });

  const subscription = await db.subscription.findFirst({
    where: { workspaceId: workspace.id },
    orderBy: { createdAt: "desc" },
  });

  if (subscription) {
    if (parsed.data.eventType === "subscription_canceled") {
      await db.subscription.update({
        where: { id: subscription.id },
        data: { status: "canceled" },
      });
    } else {
      await db.subscription.update({
        where: { id: subscription.id },
        data: {
          status: "active",
          seatsPurchased: parsed.data.seatsPurchased ?? subscription.seatsPurchased,
          providerRef: parsed.data.checkoutRef,
        },
      });
    }
  }

  await db.billingEvent.create({
    data: {
      workspaceId: workspace.id,
      eventType: parsed.data.eventType,
      provider: "internal_checkout",
      providerRef: parsed.data.checkoutRef,
      metadata: parsed.data,
    },
  });

  return NextResponse.json({ received: true });
}

