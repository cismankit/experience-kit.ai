"use client";

import { useState } from "react";
import { PackageSearch } from "lucide-react";
import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { cardSurface } from "@/lib/ui";
import { cn } from "@/lib/utils";

type TimelineItem = { state: string; label: string; detail: string };

type TrackResult = {
  orderId: string;
  status: string;
  headline: string;
  etaWindow: string;
  timeline: TimelineItem[];
};

export default function TrackPage() {
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<TrackResult | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: orderId.trim(), email: email.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(typeof data.error === "string" ? data.error : "Lookup failed");
        setResult(null);
        return;
      }
      setResult(data as TrackResult);
    } catch {
      setError("Network error—try again.");
      setResult(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main id="top" className="flex-1 bg-stone-50">
      <Container className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-xl">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-amber-300 shadow-md">
              <PackageSearch className="h-5 w-5" aria-hidden />
            </span>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">Track your order</h1>
              <p className="mt-1 text-sm text-slate-600">Order ID + email on file. Demo responses until OMS is wired.</p>
            </div>
          </div>

          <form onSubmit={onSubmit} className={cn(cardSurface(), "mt-8 rounded-2xl p-6 sm:p-8")}>
            <div className="space-y-4">
              <div>
                <label htmlFor="order-id" className="text-sm font-medium text-slate-800">
                  Order ID
                </label>
                <input
                  id="order-id"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none ring-amber-500/0 focus:border-amber-400 focus:ring-2 focus:ring-amber-500/25"
                  placeholder="e.g. EK-20481"
                  autoComplete="off"
                  required
                />
              </div>
              <div>
                <label htmlFor="track-email" className="text-sm font-medium text-slate-800">
                  Email
                </label>
                <input
                  id="track-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none ring-amber-500/0 focus:border-amber-400 focus:ring-2 focus:ring-amber-500/25"
                  placeholder="you@school.org"
                  autoComplete="email"
                  required
                />
              </div>
            </div>
            {error ? (
              <p className="mt-3 text-sm font-medium text-red-700" role="alert">
                {error}
              </p>
            ) : null}
            <Button variant="primary" size="md" className="mt-6 w-full sm:w-auto" type="submit" disabled={loading}>
              {loading ? "Looking up…" : "Track shipment"}
            </Button>
          </form>
        </div>

        {result ? (
          <div className={cn(cardSurface(), "mx-auto mt-10 max-w-xl rounded-2xl p-6 sm:p-8")}>
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-800">
              {result.status.replace(/_/g, " ")}
            </p>
            <h2 className="mt-2 text-lg font-semibold text-slate-900">Order {result.orderId}</h2>
            <p className="mt-1 text-sm text-slate-600">{result.headline}</p>
            <p className="mt-2 text-sm font-medium text-slate-800">{result.etaWindow}</p>
            <ol className="mt-6 space-y-4 border-t border-slate-100 pt-6">
              {result.timeline.map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span
                    className={cn(
                      "mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full",
                      step.state === "done" && "bg-emerald-500",
                      step.state === "active" && "bg-amber-500 ring-4 ring-amber-200",
                      step.state === "pending" && "bg-slate-200",
                    )}
                    aria-hidden
                  />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{step.label}</p>
                    <p className="text-xs text-slate-600">{step.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-xs text-slate-500">
              Manage receipts and reorders from{" "}
              <a className="font-semibold text-amber-800 underline" href="/orders">
                Orders
              </a>
              .
            </p>
          </div>
        ) : null}
      </Container>
    </main>
  );
}
