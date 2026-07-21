# Anta Estudio — Home: Handoff de assets

Qué tocar cuando lleguen las imágenes reales (hoy hay placeholders SVG en
`public/placeholder/`, servidos con `unoptimized` porque son SVG).

## 1. Dónde se configura el host remoto (CDN)

Si los assets llegan por URL (no en `public/`), agrega el host en
[`next.config.ts`](../../next.config.ts) → `images.remotePatterns`:

```ts
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.antaestudio.com" }],
  },
};
```

Si en cambio se colocan en `public/…`, no hace falta configurar nada.

En cualquier caso, al pasar de SVG a raster (`.webp`/`.jpg`) **quita el `unoptimized`**:
- Hero: automático — detecta `.svg` (`isSvg`); un `.webp` se optimiza solo.
- Proyectos: el `<Image>` tiene `unoptimized` hardcodeado → **quítalo**.

## 2. Props / dónde viven las imágenes por sección

| Sección | Archivo | Recibe imágenes | Cómo se pasan |
|---|---|---|---|
| **Hero** | `components/home/Hero.tsx` | **Sí (2)** | Props `image` y `mobileImage`: `{ src, alt, width, height }`. Se pasan desde [`app/page.tsx`](../../app/page.tsx). Otras props: `kicker="Anta Estudio"`, `scrollDistance="150%"`, `primaryHref="/contacto"`, `whatsappHref`, `debug`. |
| **Proyectos** | `components/home/ProjectsSection.tsx` | **Sí (1 por proyecto)** | El array `projects` está inline (title/category/place/slug). Añade un campo `image` por proyecto y pásalo al `<Image>` (hoy todas usan `/placeholder/frame-4x5.svg`). |
| **Clientes** | `components/home/ClientsSection.tsx` | **Sí (logos)** | 10 celdas con un `<span>LOGO</span>`. Sustituye el span por `<Image>` (logo, `object-fit: contain`). |
| Sobre Nosotros | `AboutSection.tsx` | No | — |
| Servicios | `ServicesSection.tsx` | No | — |
| Servicio Integral | `IntegralSection.tsx` | No | — |
| Reseñas | `ReviewsSection.tsx` | No (widget) | El widget de Google Business monta en el div `[data-google-reviews]`. **No animar su DOM.** |
| CTA cierre | `ClosingCta.tsx` | No | — |

## 3. Tamaños recomendados por imagen

| Imagen | Ratio | `sizes` (ya puesto en el código) | Export recomendado | Notas |
|---|---|---|---|---|
| **Hero panorámica (desktop)** | ≥ 2:1 (panorámica) | `120vw` | **≥ 2880 px de ancho** (ideal 3000–3200) | El contenedor mide 120vw y recorre lateralmente; necesita ancho de sobra. WebP/AVIF. |
| **Hero retrato (móvil)** | 3:4 o 2:3 | `100vw` | **1080 × 1620** (2:3) | Art direction: crop vertical, llena `100svh`. |
| **Proyecto (tarjeta)** | 4:5 | `(max-width: 860px) 100vw, 33vw` | **1000 × 1250** | Cubre 3-col en desktop, full en móvil. |
| **Logo cliente** | contain en celda 3:2 | — | **SVG** (ideal) o PNG transparente ~500 × 334 | Marca monocroma; preferible SVG. `object-fit: contain` con padding. |

> Recuerda: el Hero es el **LCP**. Mantén `priority` y sirve la panorámica solo en
> desktop (el `<picture>` con `getImageProps` ya evita descargarla en móvil).
