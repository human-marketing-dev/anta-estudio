# Checklist de lanzamiento (apuntar el dominio)

El sitio ya usa `SITE_URL = "https://antaestudio.com"` (definitivo), pero corre
en un ambiente de prueba con la indexación **bloqueada**. Al apuntar el dominio
real y estar listo para lanzar:

## 1. Quitar el bloqueo de indexación (`NOINDEX`)

En el ambiente de prueba, `NOINDEX=true` hace dos cosas:
- Emite `X-Robots-Tag: noindex, nofollow` en todas las respuestas.
- `robots.txt` responde `Disallow: /` (bloquea todo).

Para lanzar: **quita** la variable `NOINDEX` (o déjala vacía) en el env del
servidor (RunCloud → Environment Variables) y **redeploy** (rebuild). Se evalúa
en build/arranque, así que sin redeploy no toma efecto.

Verifica después:
- `https://antaestudio.com/robots.txt` → debe permitir (`Allow: /`) y listar el
  `Sitemap:`.
- Response headers de cualquier página → **no** debe aparecer `X-Robots-Tag`.

## 2. Activar HSTS

En `next.config.ts` está comentada la cabecera `Strict-Transport-Security`.
Actívala **solo** cuando el dominio ya sirva 100% por HTTPS estable (ver
`docs/security.md`), descomentando:

```
{ key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" }
```

## 3. Pasar la CSP a enforce

Cuando confirmes en consola que no hay violaciones (ver `docs/security.md`),
cambia `Content-Security-Policy-Report-Only` por `Content-Security-Policy`.

## 4. Verificar NAP (nombre, dirección, teléfono)

El JSON-LD `LocalBusiness` (`lib/seo.ts` → `businessLd`) toma nombre, dirección
y teléfono de `CONTACT` (`lib/site.ts`). **Antes de lanzar, confirmar que son
idénticos a los del perfil de Google Business de Anta** (mismo formato de calle,
CP, teléfono). Un NAP inconsistente daña el SEO local.

**Pendientes del LocalBusiness** (no van en el código hasta tenerlos):
- `geo` (latitud/longitud) — el enlace de Maps en `CONTACT` es una **búsqueda por
  dirección**, no trae coordenadas; hace falta la lat/lng del lugar.
- `openingHoursSpecification` (horario) — lo pasa el cliente.

## 5. Search Console

- Dar de alta la propiedad `https://antaestudio.com` y verificarla.
- Enviar el sitemap: `https://antaestudio.com/sitemap.xml`.
- Confirmar que las URLs se indexan (Inspección de URL) y que ya **no** salen
  como "Excluida por noindex".

## 6. Brevo

- Cargar `BREVO_API_KEY` (rotada) en el env del servidor y `pm2 restart`
  (ver `docs/brevo.md`). Probar el formulario en producción.

## 7. Contenido a verificar antes de lanzar

- **Reseñas (bloqueante):** confirmar que las 4 reseñas de `ReviewsSection.tsx`
  son reales del perfil de Google de Anta (no texto de ejemplo). Si alguna no lo
  es, quitarla. Cuando exista, poner la **URL real del perfil de Google Business**
  y volver a enlazar el badge de rating (hoy está sin enlace a propósito).
- **Página `/nosotros`:** ya está creada y **en el sitemap** (`app/sitemap.ts`);
  el nav y el footer apuntan a ella. El `Organization` incluye a las socias como
  `founder`. Confirmar que los nombres/roles de las socias son los definitivos.
