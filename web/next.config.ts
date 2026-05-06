import path from "node:path";
import { fileURLToPath } from "node:url";

import type { NextConfig } from "next";

const webDir = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  // App root must stay `web/` so Turbopack’s project directory is not mis-inferred as
  // `web/src/app` (breaks `next` resolution). Repo-root lockfile is outside this root but
  // `web/node_modules/next` remains inside.
  turbopack: {
    root: webDir,
  },
  // Leave off: React Compiler can break subtle animation/ref timing used by Framer Motion.
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  async redirects() {
    return [{ source: "/find-kit", destination: "/find-my-kit", permanent: true }];
  },
};

export default nextConfig;
