import type { NextConfig } from "next";

// CSP moderada. El sitio es same-origin (next/font auto-hospeda las fuentes,
// GSAP va empaquetado, imágenes locales) salvo Google Tag Manager + GA4, cuyos
// dominios se permiten abajo. Se usan 'unsafe-inline' en style/script por los
// estilos inline (style={{…}}), los scripts de arranque de Next y el snippet de
// GTM. Se emite en modo Report-Only para verificar en consola que no rompe nada
// antes de pasar a enforce.
//
// GTM/GA4 (dominios según la guía de CSP de Google Tag Manager):
// - script-src: gtm.js y gtag.js.
// - img-src / connect-src: los hits de GA4 (pixel y fetch/beacon).
// - frame-src: el <noscript><iframe> de GTM (solo sin JavaScript).
// Cualquier etiqueta de terceros que se agregue DENTRO del contenedor de GTM
// (Meta Pixel, Hotjar, etc.) necesita sus propios dominios aquí, y las
// "variables de JavaScript personalizado" de GTM requieren 'unsafe-eval'.
const GTM = "https://*.googletagmanager.com";
const GA = "https://*.google-analytics.com https://*.analytics.google.com";
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  `img-src 'self' data: blob: ${GTM} https://*.google-analytics.com`,
  "font-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  `script-src 'self' 'unsafe-inline' ${GTM}`,
  `connect-src 'self' ${GTM} ${GA}`,
  "frame-src https://www.googletagmanager.com",
].join("; ");

// Ambiente de prueba: con NOINDEX=true se bloquea la indexación (cabecera +
// robots.txt). Quitar la variable al lanzar. Se evalúa en build/arranque, así
// que cambiarla requiere redeploy (ver docs/lanzamiento.md).
const noindex = process.env.NOINDEX === "true";

const nextConfig: NextConfig = {
  experimental: {
    viewTransition: true,
    // CSS goes into a <style> in the HTML instead of <link> tags: removes the
    // render-blocking stylesheet requests (≈750 ms on mobile Lighthouse). The
    // whole site's CSS is ~11 KB gzip, so the per-page cost is small.
    inlineCss: true,
  },
  images: {
    // Local SVG placeholders are rendered via `unoptimized` at the call site.
    // When real hero/project assets arrive from a CDN, whitelist the host here:
    // remotePatterns: [{ protocol: "https", hostname: "cdn.antaestudio.com" }],
  },
  // 301 del sitio anterior (www.antaestudio.com, HTML estático) a su página
  // equivalente. statusCode 301 explícito: `permanent: true` emitiría 308.
  // Las marcadas "aproximación" no tienen página equivalente en el sitio nuevo;
  // van a la página que cubre ese servicio dentro de su contenido.
  async redirects() {
    const r = (source: string, destination: string) => ({ source, destination, statusCode: 301 as const });
    return [
      r("/index.html", "/"),
      r("/arquitectos-en-monterrey.html", "/nosotros"),
      // Aproximación: el sitio nuevo no tiene índice de servicios; la home los
      // presenta todos (secciones Servicios y "Un servicio integral").
      r("/servicios-de-arquitectura-en-monterrey.html", "/"),
      r("/estudio-de-arquitectura.html", "/proyectos"), // era el portafolio
      // Aproximación: página de contacto con poco texto, orientada a San Pedro.
      r("/arquitectos-en-san-pedro.html", "/contacto"),
      r("/presupuesto-arquitectonico-monterrey.html", "/contacto"),
      // Aproximación: diseño arquitectónico → servicio residencial, cuyo alcance
      // abre con "Diseño Arquitectónico Residencial".
      r("/diseno-arquitectonico-en-monterrey.html", "/servicios/arquitectura-residencial"),
      r("/diseno-de-interiores-en-monterrey.html", "/interiorismo"),
      r("/interiorismo-en-monterrey.html", "/interiorismo"),
      // Aproximación: remodelación → servicio residencial (alcance "Remodelación
      // y Adecuaciones"); la mayoría de estas búsquedas son de vivienda.
      r("/servicio-de-remodelacion-en-monterrey.html", "/servicios/arquitectura-residencial"),
      // Aproximación: administración / supervisión / gestión de obra y análisis
      // arquitectónico → home, donde "Un servicio integral" tiene "Project
      // Management de Obra" y "Análisis Arquitectónico".
      r("/administracion-de-obra-en-monterrey.html", "/"),
      r("/supervision-y-coordinacion-de-obra-en-monterrey.html", "/"),
      r("/gestion-de-obra-en-monterrey.html", "/"),
      r("/analisis-arquitectonico-en-monterrey.html", "/"),
      // Aproximación: diseño de muebles → interiorismo (mobiliario a medida).
      r("/diseno-de-muebles-en-monterrey.html", "/interiorismo"),
      r("/descargas/portafolio-anta.pdf", "/proyectos"),
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          // Ambiente de prueba: no indexar mientras NOINDEX=true.
          ...(noindex ? [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] : []),
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
