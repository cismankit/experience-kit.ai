"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ClipboardList, Package } from "lucide-react";
import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { DEMO_SEED_ORDERS, LS_ORDERS_KEY, type DemoOrder } from "@/lib/order-demo";
import { cardSurface } from "@/lib/ui";
import { cn } from "@/lib/utils";

function readOrders(): DemoOrder[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(LS_ORDERS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (o): o is DemoOrder =>
        typeof o === "object" &&
        o !== null &&
        typeof (o as DemoOrder).id === "string" &&
        typeof (o as DemoOrder).kitName === "string" &&
        typeof (o as DemoOrder).status === "string",
    );
  } catch {
    return [];
  }
}

function writeOrders(orders: DemoOrder[]) {
  window.localStorage.setItem(LS_ORDERS_KEY, JSON.stringify(orders));
}

const statusLabel: Record<DemoOrder["status"], string> = {
  processing: "Processing",
  in_transit: "In transit",
  delivered: "Delivered",
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<DemoOrder[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      let list = readOrders();
      if (list.length === 0) {
        list = [...DEMO_SEED_ORDERS];
        writeOrders(list);
      }
      setOrders(list);
      setReady(true);
    });
  }, []);

  function simulateDelivered(id: string) {
    const next = orders.map((o) => (o.id === id ? { ...o, status: "delivered" as const } : o));
    setOrders(next);
    writeOrders(next);
  }

  return (
    <main id="top" className="flex-1 bg-white">
      <Container className="py-12 sm:py-16 lg:py-20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-amber-300 shadow-md">
              <ClipboardList className="h-5 w-5" aria-hidden />
            </span>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">Order desk</h1>
              <p className="mt-1 text-sm text-slate-600">
                Demo history in this browser—swap for signed-in accounts when you connect your OMS.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="md" href="/track" className="bg-white">
              Track shipment
            </Button>
            <Button variant="primary" size="md" href="/kits">
              Shop again
            </Button>
          </div>
        </div>

        {!ready ? (
          <p className="mt-10 text-sm text-slate-500">Loading orders…</p>
        ) : orders.length === 0 ? (
          <div className={cn(cardSurface(), "mt-10 max-w-lg rounded-2xl p-8 text-center")}>
            <Package className="mx-auto h-10 w-10 text-slate-300" aria-hidden />
            <p className="mt-4 text-sm text-slate-600">No orders yet. Browse the catalog and start a quote.</p>
            <Button variant="primary" size="md" className="mt-6" href="/kits">
              Open shop
            </Button>
          </div>
        ) : (
          <ul className="mt-10 space-y-4">
            {orders.map((o) => (
              <li key={o.id} className={cn(cardSurface(), "rounded-2xl p-5 sm:flex sm:items-center sm:justify-between sm:gap-6")}>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-amber-800">{statusLabel[o.status]}</p>
                  <p className="mt-1 text-lg font-semibold text-slate-900">{o.kitName}</p>
                  <p className="mt-0.5 text-sm text-slate-600">
                    Order <span className="font-mono text-slate-800">{o.id}</span> · placed{" "}
                    {new Date(o.placedAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="mt-4 flex flex-wrap gap-2 sm:mt-0">
                  <Button variant="outline" size="sm" href="/track" className="bg-white">
                    Track
                  </Button>
                  <Button variant="secondary" size="sm" href="/#contact">
                    Reorder / change
                  </Button>
                  {o.status !== "delivered" ? (
                    <button
                      type="button"
                      onClick={() => simulateDelivered(o.id)}
                      className="inline-flex h-9 items-center rounded-xl border border-dashed border-slate-300 px-3 text-xs font-semibold text-slate-600 hover:border-amber-400 hover:text-slate-900"
                    >
                      Mark delivered (demo)
                    </button>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        )}

        <p className="mt-10 max-w-2xl text-xs leading-relaxed text-slate-500">
          Need invoices, W-9, or PO references?{" "}
          <Link href="/#contact" className="font-semibold text-amber-800 underline-offset-2 hover:underline">
            Open Support
          </Link>{" "}
          with your order IDs—we route finance the same day when possible.
        </p>
      </Container>
    </main>
  );
}
