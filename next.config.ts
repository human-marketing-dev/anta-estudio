import type { NextConfig } from "next";

// CSP moderada. Todo el sitio es same-origin (next/font auto-hospeda las
// fuentes, GSAP va empaquetado, sin analytics/CDN, imágenes locales). Se usan
// 'unsafe-inline' en style/script por los estilos inline (style={{…}}) y los
// scripts de arranque de Next. Se emite en modo Report-Only para verificar en
// consola que no rompe nada antes de pasar a enforce.
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  "script-src 'self' 'unsafe-inline'",
  "connect-src 'self'",
].join("; ");

const nextConfig: NextConfig = {
  experimental: {
    viewTransition: true,
  },
  images: {
    // Local SVG placeholders are rendered via `unoptimized` at the call site.
    // When real hero/project assets arrive from a CDN, whitelist the host here:
    // remotePatterns: [{ protocol: "https", hostname: "cdn.antaestudio.com" }],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          // Report-Only por ahora: no bloquea, solo reporta en consola.
          // Al confirmar que no rompe nada, renombrar a "Content-Security-Policy".
          { key: "Content-Security-Policy-Report-Only", value: csp },
          // HSTS: activar SOLO tras el lanzamiento en el dominio definitivo con
          // HTTPS estable (ver docs/security.md). Descomentar entonces:
          // { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
        ],
      },
    ];
  },
};

export default nextConfig;
