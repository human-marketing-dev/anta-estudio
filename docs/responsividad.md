# Responsividad

## Escala de breakpoints (convención)

De aquí en adelante, **todo CSS nuevo** usa esta escala de 4 valores en lugar de
inventar anchos sueltos. Son `max-width` (diseño de escritorio hacia abajo):

| Nombre  | Valor    | Uso típico                                  |
|---------|----------|---------------------------------------------|
| `lg`    | `1040px` | reflujos de rejillas anchas (reseñas, logos)|
| `md`    | `860px`  | escritorio → tablet (2 columnas → 1)        |
| `sm`    | `760px`  | tablet → móvil grande                        |
| `xs`    | `560px`  | ajustes de móvil                             |

El par `min-width: 861px` sigue siendo el "gate" de escritorio de la galería
horizontal y el scroll con pin (va emparejado con `md: 860`).

> **Nota:** los media queries de CSS **no aceptan `var()`**, así que esto es una
> convención de valores literales, no tokens reales. Escribe el número tal cual
> (`@media (max-width: 860px)`), eligiéndolo de esta tabla.

### Estado actual

El código existente todavía tiene ~12 valores heredados (`320, 520, 600, 620,
640, 780, 820, 900`, etc.). **No se renumeraron** para no mover el punto exacto
donde cada bloque salta (eso alteraría el layout en esas franjas de ancho). Se
migran a la escala **solo cuando ya se toca ese archivo por otra razón**, nunca
en masa.

## Áreas táctiles (mínimo 44px)

- **Botón outline "Servicios"** (`.blockBtn`) y **enlaces "ver más"** (`.link`):
  el área de toque se amplía con un pseudo-elemento `::before` absoluto
  (`inset` negativo), **sin cambiar nada visible**. Así el objetivo táctil pasa
  de ~41/18px a ≥44px conservando el diseño de escritorio intacto.
- El CTA del nav y el menú móvil se resuelven en el rediseño responsive del nav
  (ver más abajo cuando se implemente).

## Reseñas en móvil (slider)

En `≤560px` la rejilla de reseñas se vuelve un **slider horizontal nativo**
(scroll-snap, sin librería); tablet/desktop mantienen la rejilla. Indicadores:
**puntos** (`components/home/ReviewsSection.tsx`) que solo aparecen en ≤560,
son botones reales con área de toque ≥44px (`::before` invisible), respetan
`prefers-reduced-motion` (salto instantáneo) y el scroller es navegable por
teclado (`tabindex`, flechas, Home/End). El punto activo se sincroniza con la
tarjeta centrada vía `IntersectionObserver`.

## Menú móvil del nav

- **Breakpoint:** `≤860px`. A 800px la nav completa del home (logo + 4 links +
  CTA "Solicitar propuesta") necesita ~710px de contenido y solo hay ~704px
  disponibles (`viewport − 96px` de gutter), así que se desborda; a 860px cabe
  con holgura. Por eso el corte es 860 (no 760).
- **Patrón:** hamburguesa → panel overlay a pantalla completa
  (`components/NavBar.module.css`). El layout de escritorio (≥861px) queda
  intacto: sus estilos inline no se tocaron; solo el `display` del cluster
  desktop vive en la clase `.desktopNav` para poder ocultarlo en móvil.
- **Accesibilidad:** hamburguesa con `aria-expanded`/`aria-controls`; panel
  `role="dialog" aria-modal`; **foco atrapado** (Tab cicla, Shift+Tab envuelve);
  **Escape** cierra y devuelve el foco a la hamburguesa; **scroll del body
  bloqueado** mientras está abierto. "Servicios" es un **acordeón** (no hover).
