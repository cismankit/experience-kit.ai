import { z } from "zod";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { requestContext } from "@/lib/observability";

const bodySchema = z.object({
  message: z.string().min(1).max(1500),
  workspaceSlug: z.string().min(1).optional(),
});

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
  const obs = requestContext(req, "api.assistant.post");
  let rawBody: unknown;
  try {
    rawBody = await req.json();
  } catch {
    obs.log("invalid_json");
    return obs.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(rawBody);
  if (!parsed.success) {
    obs.log("invalid_payload");
    return obs.json({ error: "message is required" }, { status: 400 });
  }

  const message = parsed.data.message.trim();
  const session = await auth();

  let workspaceId: string | null = session?.user?.workspaceId ?? null;
  if (!workspaceId) {
    const publicWorkspace = await db.workspace.findFirst({
      where: { slug: parsed.data.workspaceSlug ?? "public-experiencekit" },
      select: { id: true },
    });
    workspaceId = publicWorkspace?.id ?? null;
  }

  if (!workspaceId) {
    obs.log("workspace_not_found");
    return obs.json({ error: "Workspace not found" }, { status: 404 });
  }

  const reply = replyFor(message);
  const interaction = await db.copilotInteraction.create({
    data: {
      workspaceId,
      userId: session?.user?.id ?? null,
      requestText: message,
      responseText: reply,
    },
    select: { id: true, createdAt: true },
  });

  obs.log("assistant_reply", { workspaceId, hasUser: Boolean(session?.user?.id) });
  return obs.json({
    reply,
    interactionId: interaction.id,
    createdAt: interaction.createdAt.toISOString(),
  });
}
