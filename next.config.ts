import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    viewTransition: true,
  },
  images: {
    // Local SVG placeholders are rendered via `unoptimized` at the call site.
    // When real hero/project assets arrive from a CDN, whitelist the host here:
    // remotePatterns: [{ protocol: "https", hostname: "cdn.antaestudio.com" }],
  },
};

export default nextConfig;
