import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;
    const isPublicSupportCreate = path === "/api/support/tickets" && req.method === "POST";

    if (!token && !isPublicSupportCreate) {
      const signInUrl = new URL("/auth/sign-in", req.url);
      signInUrl.searchParams.set("callbackUrl", req.url);
      return NextResponse.redirect(signInUrl);
    }

    if (
      (path.startsWith("/platform") || path.startsWith("/api/support/tickets")) &&
      token &&
      token.role !== "school_admin" &&
      token.role !== "educator"
    ) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => true,
    },
  },
);

export const config = {
  matcher: ["/orders/:path*", "/platform/:path*", "/api/support/tickets/:path*", "/api/commerce/:path*"],
};
