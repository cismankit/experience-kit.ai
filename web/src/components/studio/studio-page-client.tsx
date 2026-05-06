"use client";

import { useSyncExternalStore } from "react";
import { Container } from "@/components/container";
import { DashboardPreview } from "@/components/product/dashboard-preview";
import { Button } from "@/components/ui/button";
import {
  getServerSnapshotDemoAuthed,
  readDemoAuthed,
  setDemoAuthed,
  subscribeDemoAuthed,
} from "@/lib/demo-auth";

export function StudioPageClient() {
  const authed = useSyncExternalStore(subscribeDemoAuthed, readDemoAuthed, getServerSnapshotDemoAuthed);

  const signInDemo = () => {
    setDemoAuthed(true);
    window.dispatchEvent(new Event("ek-demo-auth"));
  };

  const signOutDemo = () => {
    setDemoAuthed(false);
    window.dispatchEvent(new Event("ek-demo-auth"));
  };

  if (!authed) {
    return (
      <Container className="py-16 sm:py-20">
        <div id="account" className="mx-auto max-w-lg rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-800">Studio</p>
          <h1 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Your learner studio
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            Missions, proof, reflections, and journeys will live here. For now, open a demo space to see the layout—no
            password.
          </p>
          <Button variant="primary" size="lg" className="mt-8 w-full sm:w-auto" onClick={signInDemo}>
            Open demo studio
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-12 sm:py-16">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-800">Studio</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">Demo dashboard</h1>
          <p className="mt-2 max-w-xl text-sm text-slate-600">
            Preview of missions, proof, and progress—swap in live data when your account connects.
          </p>
        </div>
        <Button variant="outline" size="md" className="w-full bg-white sm:w-auto" onClick={signOutDemo}>
          Sign out (demo)
        </Button>
      </div>
      <div className="mt-10">
        <DashboardPreview variant="full" />
      </div>
    </Container>
  );
}
