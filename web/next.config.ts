import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Leave off: React Compiler can break subtle animation/ref timing used by Framer Motion.
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
