import { NextResponse } from "next/server";

type Body = { orderId?: string; email?: string };

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const orderId = typeof body.orderId === "string" ? body.orderId.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  if (!orderId || !email) {
    return NextResponse.json({ error: "orderId and email required" }, { status: 400 });
  }

  // Demo payload — replace with OMS / Shopify / internal fulfillment query.
  return NextResponse.json({
    orderId,
    email,
    status: "in_transit",
    headline: "Demo lookup — wire this endpoint to your order system.",
    etaWindow: "Arriving this week (placeholder)",
    timeline: [
      { state: "done", label: "Confirmed", detail: "Inventory allocated" },
      { state: "done", label: "Packed", detail: "QC + serialization" },
      { state: "active", label: "In transit", detail: "Carrier handoff (connect webhooks)" },
      { state: "pending", label: "Delivered", detail: "Awaiting scan" },
    ],
  });
}
