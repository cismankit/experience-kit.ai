import { NextResponse } from "next/server";
import { z } from "zod";
import { requireApiAuth } from "@/lib/api-auth";
import { db } from "@/lib/db";

const schema = z.object({
  seats: z.number().int().min(1).max(500),
  plan: z.enum(["starter", "growth", "district"]),
});

export async function POST(req: Request) {
  const authResult = await requireApiAuth("educator");
  if (!authResult.ok) return authResult.response;
  const ctx = authResult.context;

  const raw = await req.json().catch(() => null);
  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid checkout payload" }, { status: 400 });
  }

  const subscription = await db.subscription.findFirst({
    where: { workspaceId: ctx.workspaceId },
    orderBy: { createdAt: "desc" },
  });

  const record = await db.billingEvent.create({
    data: {
      workspaceId: ctx.workspaceId,
      eventType: "checkout_started",
      provider: "internal_checkout",
      providerRef: `chk_${Date.now()}`,
      amountCents: parsed.data.seats * (parsed.data.plan === "starter" ? 2500 : parsed.data.plan === "growth" ? 4900 : 9900),
      currency: "usd",
      metadata: parsed.data,
    },
  });

  if (!subscription) {
    await db.subscription.create({
      data: {
        workspaceId: ctx.workspaceId,
        provider: "internal_checkout",
        providerRef: record.providerRef,
        status: "trialing",
        seatsPurchased: parsed.data.seats,
      },
    });
  }

  const checkoutUrl = `/platform?checkoutRef=${record.providerRef}&plan=${parsed.data.plan}&seats=${parsed.data.seats}`;
  return NextResponse.json({ checkoutRef: record.providerRef, checkoutUrl, message: "Checkout initialized." }, { status: 201 });
}

