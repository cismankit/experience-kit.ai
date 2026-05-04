import { NextResponse } from "next/server";

type Body = { message?: string };

function replyFor(text: string): string {
  const m = text.toLowerCase();
  if (m.includes("track") || m.includes("order")) {
    return "Use Track in the header: enter your order ID and email to see status, carrier handoff, and milestones. For enterprise POs, mention your district in Support.";
  }
  if (m.includes("kit") && (m.includes("which") || m.includes("pick") || m.includes("choose"))) {
    return "Open Shop for the full matrix. Quick steer: Launch Pad Core onboards groups, Design Sprint Kit optimizes iteration, Signal Lab focuses on sensing systems, Systems Navigator is for advanced ownership.";
  }
  if (m.includes("school") || m.includes("district") || m.includes("bulk")) {
    return "Message Support with “district rollout” and rough learner counts—we coordinate kit waves, spare consumables, and educator enablement.";
  }
  if (m.includes("ai") || m.includes("assistant")) {
    return "Kits pair tactile work with AI scaffolding—explain, reflect, and stress-test ideas. Humans stay in the loop; AI never replaces the build.";
  }
  if (m.includes("price") || m.includes("cost") || m.includes("quote")) {
    return "Pricing tracks volume and pathway—send role plus kit interest through Support and we’ll return a line-item quote when possible.";
  }
  return "I’m here for kit fit, logistics, and rollout questions. Try: which kit for a STEM lab, how tracking works, or how to stage a pilot—short answers, zero fluff.";
}

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const message = typeof body.message === "string" ? body.message.trim() : "";
  if (!message) {
    return NextResponse.json({ error: "message required" }, { status: 400 });
  }
  return NextResponse.json({ reply: replyFor(message) });
}
