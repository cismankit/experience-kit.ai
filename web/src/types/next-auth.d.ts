import type { MembershipRole } from "@/lib/auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      workspaceId: string;
      workspaceSlug: string;
      role: MembershipRole;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    workspaceId?: string;
    workspaceSlug?: string;
    role?: MembershipRole;
  }
}
