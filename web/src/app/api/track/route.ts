import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

const bodySchema = z.object({
  orderId: z.string().min(1),
  email: z.string().email(),
});

export async function POST(req: Request) {
  let rawBody: unknown;
  try {
    rawBody = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(rawBody);
  if (!parsed.success) {
    return NextResponse.json({ error: "orderId and email required" }, { status: 400 });
  }

  const orderId = parsed.data.orderId.trim();
  const email = parsed.data.email.trim().toLowerCase();
  const order = await db.commerceOrder.findFirst({
    where: {
      orderNumber: orderId,
      customerEmail: email,
    },
  });
  if (!order) {
    return NextResponse.json({ error: "Order not found for that email" }, { status: 404 });
  }

  const timelineByStatus = {
    processing: [
      { state: "done", label: "Order confirmed", detail: "Your order is recorded and queued for fulfillment." },
      { state: "active", label: "Fulfillment", detail: "Materials are being allocated and packed." },
      { state: "pending", label: "In transit", detail: "Carrier handoff is pending." },
      { state: "pending", label: "Delivered", detail: "Completes when delivery is confirmed at destination." },
    ],
    in_transit: [
      { state: "done", label: "Order confirmed", detail: "Your order is recorded and queued for fulfillment." },
      { state: "done", label: "Fulfillment", detail: "Materials are allocated, packed, and picked up." },
      { state: "active", label: "In transit", detail: "Carrier has the shipment; milestones update on scan." },
      { state: "pending", label: "Delivered", detail: "Completes when delivery is confirmed at destination." },
    ],
    delivered: [
      { state: "done", label: "Order confirmed", detail: "Your order is recorded and queued for fulfillment." },
      { state: "done", label: "Fulfillment", detail: "Materials are allocated and packed." },
      { state: "done", label: "In transit", detail: "Carrier completed delivery route." },
      { state: "done", label: "Delivered", detail: "Delivery confirmed." },
    ],
    canceled: [
      { state: "done", label: "Order confirmed", detail: "Order originally accepted." },
      { state: "active", label: "Canceled", detail: "This order was canceled before completion." },
    ],
  } as const;


  const statusKey = (order.status in timelineByStatus ? order.status : "processing") as keyof typeof timelineByStatus;

  return NextResponse.json({
    orderId: order.orderNumber,
    email,
    status: order.status,
    headline: order.status === "in_transit" ? "Shipment in transit" : `Order ${order.status.replace("_", " ")}`,
    etaWindow:
      "Delivery timing updates when the carrier scans your package. Watch your inbox for tracking messages from ExperienceKit.ai and the carrier.",
    timeline: timelineByStatus[statusKey],
  });
}
