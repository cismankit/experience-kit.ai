import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";

export function requestContext(req: Request, area: string) {
  const requestId = req.headers.get("x-request-id") ?? randomUUID();
  const startedAt = Date.now();

  function log(event: string, details?: Record<string, unknown>) {
    const elapsedMs = Date.now() - startedAt;
    console.log(JSON.stringify({ area, event, requestId, elapsedMs, ...details }));
  }

  function json(body: unknown, init?: ResponseInit) {
    const res = NextResponse.json(body, init);
    res.headers.set("x-request-id", requestId);
    return res;
  }

  return { requestId, log, json };
}

