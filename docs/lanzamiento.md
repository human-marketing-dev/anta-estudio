# Checklist de lanzamiento (apuntar el dominio)

El sitio corre en un ambiente de prueba con la indexación **bloqueada**. Al
apuntar el dominio real y estar listo para lanzar, en este orden: dominio (0),
luego el resto.

## 0. Dominio definitivo: `https://www.antaestudio.com`

El dominio del sitio es **`https://www.antaestudio.com`**, el mismo que el sitio
anterior tenía indexado. `SITE_URL` (`lib/site.ts`) ya lo usa: canonical,
sitemap, robots, Open Graph y JSON-LD salen de ahí.

- En nginx/RunCloud: `antaestudio.com` → **301** → `https://www.antaestudio.com`
  (y `http://` → `https://`), conservando la ruta.
- Verificar: `curl -sI https://antaestudio.com/nosotros` responde `301` con
  `location: https://www.antaestudio.com/nosotros`.

## 1. Quitar el bloqueo de indexación (`NOINDEX`)

En el ambiente de prueba, `NOINDEX=true` hace dos cosas:
- Emite `X-Robots-Tag: noindex, nofollow` en todas las respuestas.
- `robots.txt` responde `Disallow: /` (bloquea todo).

Para lanzar: **quita** la variable `NOINDEX` (o déjala vacía) en el env del
servidor (RunCloud → Environment Variables) y **redeploy** (rebuild). Se evalúa
en build/arranque, así que sin redeploy no toma efecto.

Verifica después:
- `https://www.antaestudio.com/robots.txt` → debe permitir (`Allow: /`) y listar el
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

- Usar una propiedad de **dominio** (`antaestudio.com`, verificación por DNS),
  que cubre `https://www.antaestudio.com`. Si ya existe la del sitio anterior,
  usar esa.
- Enviar el sitemap: `https://www.antaestudio.com/sitemap.xml`.
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

## 8. Redirecciones del sitio anterior

`next.config.ts` → `redirects()` manda con **301** las 15 URLs `.html` del sitio
anterior y `/descargas/portafolio-anta.pdf` a su página equivalente. Verifica
después del deploy (debe responder `301` y `location` con la ruta nueva):

```
curl -sI https://www.antaestudio.com/servicio-de-remodelacion-en-monterrey.html | grep -iE "^HTTP|^location"
```

En Search Console, revisa durante 2 a 4 semanas el reporte de páginas con 404.

## 9. Google Tag Manager

Define `NEXT_PUBLIC_GTM_ID` (formato `GTM-XXXXXXX`) en el env del servidor de
**producción** y haz rebuild: la variable se incrusta en el build. Vacía = GTM
desactivado. Déjala vacía en el ambiente de prueba. En GA4, confirma que la
medición mejorada tenga activado "Cambios de página basados en eventos del
historial del navegador" para contar la navegación interna del sitio.

Contenedor de GTM **nuevo** y propiedad de GA4 **nueva** (cuenta propia). La
propiedad del sitio anterior (`G-PZ20SJKD35`) no se usa porque no hay acceso a
esa cuenta: el historial de visitas empieza de cero con el lanzamiento. En el
contenedor, crear la etiqueta "Google tag" con el ID de medición de la nueva
propiedad y activarla en "All Pages".

## 10. Después del deploy

- Medir en PageSpeed Insights (móvil y escritorio) la home, /nosotros y un
  proyecto. Con esos datos se decide el recorte vertical del hero en móvil y el
  `quality` 60.
- Actualizar el sitio web en el perfil de Google Business y en redes si apunta
  a otra URL.
- Revisar la consola del navegador (CSP Report-Only) con GTM ya activo, antes
  de pasar la CSP a enforce (paso 3).
