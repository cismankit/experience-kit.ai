import type { Metadata } from "next";
import { SignInClient } from "@/components/auth/sign-in-client";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your ExperienceKit workspace.",
};

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const sp = await searchParams;
  const callbackUrl = sp.callbackUrl ?? "/platform";
  return (
    <main id="top" className="flex-1 bg-gradient-to-b from-stone-50 to-white">
      <SignInClient callbackUrl={callbackUrl} />
    </main>
  );
}
