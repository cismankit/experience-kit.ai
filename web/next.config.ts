import path from "node:path";
import { fileURLToPath } from "node:url";

import type { NextConfig } from "next";

const appDir = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  // Monorepo: lockfile at repo root would otherwise be picked as Turbopack workspace root.
  turbopack: {
    root: appDir,
  },
  // Leave off: React Compiler can break subtle animation/ref timing used by Framer Motion.
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
