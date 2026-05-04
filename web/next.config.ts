import path from "node:path";
import { fileURLToPath } from "node:url";

import type { NextConfig } from "next";

const webDir = path.dirname(fileURLToPath(import.meta.url));
// Monorepo: single root so Turbopack resolves `next` from repo or `web/node_modules`
// after hot reloads (e.g. .env.local); `web/` alone can break resolution with dual lockfiles.
const turbopackRoot = path.join(webDir, "..");

const nextConfig: NextConfig = {
  turbopack: {
    root: turbopackRoot,
  },
  // Leave off: React Compiler can break subtle animation/ref timing used by Framer Motion.
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
