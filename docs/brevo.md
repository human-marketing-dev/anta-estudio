# Formularios de contacto (Brevo)

Los formularios (`/contacto` y el CTA de cierre) envían por el route handler
`app/api/contact/route.ts`, que usa la **API transaccional de Brevo**. La API
key vive solo en el servidor; nunca llega al cliente.

## Variables de entorno

| Variable | Descripción |
| --- | --- |
| `BREVO_API_KEY` | API key transaccional de Brevo (Brevo → SMTP & API → API Keys). |
| `BREVO_SENDER_EMAIL` | Remitente **verificado** en Brevo (Senders & IP). Sugerencia: `info@antaestudio.com`. |
| `BREVO_TO_EMAIL` | Correo que recibe los mensajes. Sugerencia: `info@antaestudio.com`. |

Plantilla en [`.env.example`](../.env.example).

## Dónde ponerlas en el servidor

**Opción A — Panel de RunCloud:**
Web App → **Environment Variables** (o **ENV**) → agrega las 3 variables con sus
valores → guarda.

**Opción B — archivo `.env`:**
En la raíz de la app en el servidor (junto a `package.json`), edita/crea `.env`
con las 3 líneas y guarda. No lo subas al repositorio.

## Reiniciar después de cambiar variables

Las variables se leen al **arrancar** el proceso. Tras agregarlas o cambiarlas,
reinicia el proceso de PM2 de esta app:

```
pm2 restart <nombre-o-id-de-la-app>
```

(`pm2 list` muestra el nombre/id.) Si RunCloud administra el proceso, usa su
botón **Restart** de la Web App.

## Comportamiento sin API key

Si falta `BREVO_API_KEY` (o el remitente/destino), el endpoint **no truena**:
registra el envío en la consola del servidor y responde con un error controlado.
El formulario muestra su estado de error. Al cargar las variables y reiniciar,
empieza a enviar de verdad sin más cambios de código.

## Notas de seguridad

- **Honeypot**: campo oculto `confirmacion`; si llega lleno se descarta como spam.
- **Rate limit**: 5 envíos por IP cada 10 minutos (en memoria, por instancia).
- Todos los valores del formulario se **escapan** antes de armar el HTML del correo.
- `reply-to` = correo de quien llena el formulario, para responder directo.
