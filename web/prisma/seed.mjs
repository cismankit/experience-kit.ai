import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("Password123!", 10);

  const publicWorkspace = await prisma.workspace.upsert({
    where: { slug: "public-experiencekit" },
    update: {},
    create: {
      slug: "public-experiencekit",
      name: "ExperienceKit Public",
      type: "family",
      plan: "starter",
    },
  });

  const schoolWorkspace = await prisma.workspace.upsert({
    where: { slug: "north-ridge-school" },
    update: {},
    create: {
      slug: "north-ridge-school",
      name: "North Ridge School",
      type: "school",
      plan: "growth",
    },
  });

  const adminUser = await prisma.user.upsert({
    where: { email: "admin@experiencekit.ai" },
    update: { passwordHash, name: "North Ridge Admin" },
    create: {
      email: "admin@experiencekit.ai",
      name: "North Ridge Admin",
      passwordHash,
    },
  });

  const educatorUser = await prisma.user.upsert({
    where: { email: "educator@experiencekit.ai" },
    update: { passwordHash, name: "Science Educator" },
    create: {
      email: "educator@experiencekit.ai",
      name: "Science Educator",
      passwordHash,
    },
  });

  await prisma.workspaceMembership.upsert({
    where: {
      workspaceId_userId: {
        workspaceId: schoolWorkspace.id,
        userId: adminUser.id,
      },
    },
    update: { role: "school_admin" },
    create: {
      workspaceId: schoolWorkspace.id,
      userId: adminUser.id,
      role: "school_admin",
    },
  });

  await prisma.workspaceMembership.upsert({
    where: {
      workspaceId_userId: {
        workspaceId: schoolWorkspace.id,
        userId: educatorUser.id,
      },
    },
    update: { role: "educator" },
    create: {
      workspaceId: schoolWorkspace.id,
      userId: educatorUser.id,
      role: "educator",
    },
  });

  await prisma.subscription.upsert({
    where: { id: "seed-subscription-growth" },
    update: {},
    create: {
      id: "seed-subscription-growth",
      workspaceId: schoolWorkspace.id,
      provider: "manual",
      providerRef: "seed-local",
      status: "active",
      seatsPurchased: 180,
    },
  });

  await prisma.seat.deleteMany({ where: { workspaceId: schoolWorkspace.id } });
  await prisma.seat.createMany({
    data: [
      { workspaceId: schoolWorkspace.id, label: "Seat A01", assignedTo: adminUser.email },
      { workspaceId: schoolWorkspace.id, label: "Seat A02", assignedTo: educatorUser.email },
      { workspaceId: schoolWorkspace.id, label: "Seat A03" },
    ],
  });

  const order = await prisma.commerceOrder.upsert({
    where: { orderNumber: "EK-20481" },
    update: {},
    create: {
      workspaceId: schoolWorkspace.id,
      orderNumber: "EK-20481",
      customerEmail: "admin@experiencekit.ai",
      kitName: "Signal Lab",
      status: "in_transit",
      externalRef: "stripe_pi_seed_001",
    },
  });

  await prisma.supportTicket.upsert({
    where: { id: "seed-ticket-order-1" },
    update: {},
    create: {
      id: "seed-ticket-order-1",
      workspaceId: schoolWorkspace.id,
      requesterId: adminUser.id,
      requesterName: "North Ridge Admin",
      requesterEmail: "admin@experiencekit.ai",
      category: "order_issue",
      message: "Carrier scan delayed for science wing delivery.",
      status: "open",
      priority: "high",
      orderId: order.id,
    },
  });

  await prisma.copilotInteraction.create({
    data: {
      workspaceId: publicWorkspace.id,
      requestText: "How do we start a school pilot?",
      responseText: "Share timeline, grade levels, and seat estimate. We stage pilot kits in waves.",
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
