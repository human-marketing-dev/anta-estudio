# Notas de seguridad

## Cabeceras (`next.config.ts` → `headers()`)

Activas hoy en todas las rutas:

- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `X-Frame-Options: DENY` (anti-clickjacking)
- `Content-Security-Policy-Report-Only` (CSP moderada, ver abajo)

### CSP: pasar de Report-Only a enforce

La CSP se emite como **`Content-Security-Policy-Report-Only`**: el navegador
**no bloquea** nada, solo reporta violaciones en la consola. Para validarla,
navega el sitio y revisa la consola (ver checklist más abajo).

Cuando confirmes que no hay violaciones legítimas, cambia en `next.config.ts`
la key `Content-Security-Policy-Report-Only` por **`Content-Security-Policy`**
(modo enforce). El valor (`csp`) no cambia.

### HSTS — activar tras el lanzamiento

`Strict-Transport-Security` está **comentado** en `next.config.ts`. Actívalo
**solo** cuando el sitio ya esté en su **dominio definitivo con HTTPS estable**
(HSTS obliga HTTPS en el navegador por 2 años; activarlo antes de tiempo o con
HTTPS inestable puede dejar el sitio inaccesible). Al lanzar, descomenta:

```
{ key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" }
```

## Formulario de contacto (`app/api/contact/route.ts`)

- **IP para rate limit**: se toma de `x-real-ip` (lo fija Nginx/RunCloud con el
  IP real). Fallback: último valor de `x-forwarded-for`. Si no hay ninguno, el
  límite se aplica de forma **global** (fail-closed), nunca se deja pasar.
  → Verificar que el proxy de RunCloud fije `X-Real-IP` con `$remote_addr`.
- **Tope de body**: 10 KB (rechaza `413`). Nginx además limita por su lado.
- **Solo `POST`**: otros métodos devuelven `405`.
- Honeypot, escape de HTML y errores genéricos al cliente (detalles solo en
  consola del servidor). Ver `docs/brevo.md`.

## Validar la CSP en el navegador

1. Abre el sitio y la consola (DevTools → Console).
2. Navega Home, un servicio, interiorismo, un proyecto y **contacto** (envía el
   formulario).
3. Busca mensajes tipo *"Content Security Policy … would block …"* (Report-Only
   solo **avisa**, no rompe). Si algo legítimo aparece bloqueado, avísame y
   ajusto la política antes de pasar a enforce.
4. En DevTools → Network → doc principal → **Response Headers**, confirma que
   aparecen `content-security-policy-report-only`, `x-frame-options`,
   `x-content-type-options` y `referrer-policy`.
