"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { Package } from "lucide-react";
import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import {
  getServerSnapshotDemoAuthed,
  readDemoAuthed,
  subscribeDemoAuthed,
} from "@/lib/demo-auth";
import { cardSurface } from "@/lib/ui";
import { cn } from "@/lib/utils";

export function OrdersPageClient() {
  const authed = useSyncExternalStore(subscribeDemoAuthed, readDemoAuthed, getServerSnapshotDemoAuthed);

  if (!authed) {
    return (
      <main id="top" className="flex-1 bg-gradient-to-b from-stone-50 to-white">
        <Container className="py-14 sm:py-16">
          <div className="mx-auto max-w-lg">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-900 ring-1 ring-amber-200/80">
              <Package className="h-6 w-6" aria-hidden />
            </span>
            <h1 className="mt-6 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">Orders</h1>
            <p className="mt-3 text-pretty text-slate-600">
              Sign in to see orders linked to your account. Shipment status is always available from Track—no sign-in
              required.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button variant="primary" size="lg" href="/studio" className="w-full sm:w-auto">
                Sign in (demo)
              </Button>
              <Button variant="outline" size="lg" href="/track" className="w-full bg-white sm:w-auto">
                Track a shipment
              </Button>
            </div>
            <p className="mt-6 text-sm text-slate-500">
              Need help?{" "}
              <Link href="/support?topic=order_issue" className="font-semibold text-amber-900 underline-offset-2 hover:underline">
                Order support
              </Link>
            </p>
          </div>
        </Container>
      </main>
    );
  }

  return (
    <main id="top" className="flex-1 bg-gradient-to-b from-stone-50 to-white">
      <Container className="py-14 sm:py-16">
        <div className={cn(cardSurface(), "mx-auto max-w-lg rounded-2xl p-8 shadow-sm")}>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Orders</h1>
          <p className="mt-3 text-pretty text-slate-600">
            Order history for your account will show here when checkout is connected. Use Track for live shipment
            updates today.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button variant="primary" size="lg" href="/track" className="w-full sm:w-auto">
              Track a shipment
            </Button>
            <Button variant="outline" size="lg" href="/studio" className="w-full bg-white sm:w-auto">
              Back to Studio
            </Button>
          </div>
        </div>
      </Container>
    </main>
  );
}
