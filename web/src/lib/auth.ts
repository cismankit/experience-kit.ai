import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { db } from "@/lib/db";

export type MembershipRole = "learner" | "parent" | "educator" | "school_admin";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  workspaceSlug: z.string().min(1),
});

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/auth/sign-in",
  },
  providers: [
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          }),
        ]
      : []),
    CredentialsProvider({
      name: "Email and password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        workspaceSlug: { label: "Workspace", type: "text" },
      },
      async authorize(rawCredentials) {
        const parsed = credentialsSchema.safeParse(rawCredentials);
        if (!parsed.success) return null;

        const { email, password, workspaceSlug } = parsed.data;
        const user = await db.user.findUnique({
          where: { email },
          include: {
            memberships: {
              include: { workspace: true },
            },
          },
        });
        if (!user?.passwordHash) return null;

        const valid = await bcrypt.compare(password, user.passwordHash);
        if (!valid) return null;

        const membership = user.memberships.find(
          (m: { workspace: { slug: string }; workspaceId: string; role: MembershipRole }) =>
            m.workspace.slug === workspaceSlug,
        );
        if (!membership) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          workspaceId: membership.workspaceId,
          workspaceSlug: membership.workspace.slug,
          role: membership.role,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "google" || !user.email) return true;

      const email = user.email.toLowerCase();
      const existingUser = await db.user.findUnique({
        where: { email },
        include: { memberships: { include: { workspace: true } } },
      });
      if (!existingUser) return true;
      if (existingUser.memberships.length > 0) return true;

      const domain = email.split("@")[1] ?? "workspace";
      const baseSlug = domain.replace(/[^a-z0-9-]/gi, "-").toLowerCase();
      const workspace = await db.workspace.create({
        data: {
          name: `${existingUser.name ?? "New"} Workspace`,
          slug: `${baseSlug}-${existingUser.id.slice(-5)}`,
          type: "family",
          plan: "starter",
        },
      });
      await db.workspaceMembership.create({
        data: {
          workspaceId: workspace.id,
          userId: existingUser.id,
          role: "parent",
        },
      });
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.workspaceId = (user as { workspaceId?: string }).workspaceId;
        token.workspaceSlug = (user as { workspaceSlug?: string }).workspaceSlug;
        token.role = (user as { role?: MembershipRole }).role;
      }
      if ((!token.workspaceId || !token.role) && token.sub) {
        const membership = await db.workspaceMembership.findFirst({
          where: { userId: token.sub },
          include: { workspace: true },
          orderBy: { createdAt: "asc" },
        });
        if (membership) {
          token.workspaceId = membership.workspaceId;
          token.workspaceSlug = membership.workspace.slug;
          token.role = membership.role;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? "";
        session.user.workspaceId = typeof token.workspaceId === "string" ? token.workspaceId : "";
        session.user.workspaceSlug = typeof token.workspaceSlug === "string" ? token.workspaceSlug : "";
        session.user.role =
          token.role === "learner" ||
          token.role === "parent" ||
          token.role === "educator" ||
          token.role === "school_admin"
            ? token.role
            : "learner";
      }
      return session;
    },
  },
};

export function auth() {
  return getServerSession(authOptions);
}

export const ROLE_PRIORITY: Record<MembershipRole, number> = {
  learner: 0,
  parent: 1,
  educator: 2,
  school_admin: 3,
};

export function hasAtLeastRole(current: MembershipRole, minimum: MembershipRole) {
  return ROLE_PRIORITY[current] >= ROLE_PRIORITY[minimum];
}
