// Contact form endpoint — sends via Brevo transactional API (server-side only).
// The API key never reaches the client. Without BREVO_API_KEY it logs and
// returns a controlled error so the flow can be tested before the key exists.

const WINDOW_MS = 10 * 60 * 1000; // 10 min
const MAX_PER_WINDOW = 5;
const MAX = { nombre: 120, correo: 160, telefono: 40, tipoProyecto: 120, mensaje: 5000, origen: 80 };

// In-memory rate limit (per server instance; resets on restart — suficiente
// como primera barrera junto al honeypot).
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const clean = (v: unknown, max: number): string =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

const isEmail = (s: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

function json(body: Record<string, unknown>, status = 200) {
  return Response.json(body, { status });
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (rateLimited(ip)) {
    return json({ ok: false, error: "Demasiados envíos. Intenta de nuevo en unos minutos." }, 429);
  }

  let raw: Record<string, unknown>;
  try {
    raw = await request.json();
  } catch {
    return json({ ok: false, error: "Solicitud inválida." }, 400);
  }

  // Honeypot: si viene lleno, es bot → fingimos éxito sin enviar.
  if (clean(raw.confirmacion, 100)) {
    return json({ ok: true });
  }

  const data = {
    nombre: clean(raw.nombre, MAX.nombre),
    correo: clean(raw.correo, MAX.correo),
    telefono: clean(raw.telefono, MAX.telefono),
    tipoProyecto: clean(raw.tipoProyecto, MAX.tipoProyecto),
    mensaje: clean(raw.mensaje, MAX.mensaje),
    origen: clean(raw.origen, MAX.origen) || "Sitio web",
  };

  if (!data.nombre) return json({ ok: false, error: "El nombre es obligatorio." }, 400);
  if (!isEmail(data.correo)) return json({ ok: false, error: "Escribe un correo válido." }, 400);

  const rows: [string, string][] = [
    ["Nombre", data.nombre],
    ["Correo", data.correo],
    ["Teléfono", data.telefono],
    ["Tipo de proyecto", data.tipoProyecto],
    ["Mensaje", data.mensaje],
    ["Origen", data.origen],
  ].filter(([, v]) => v) as [string, string][];

  const htmlContent = `<!doctype html><html><body style="font-family:Arial,Helvetica,sans-serif;color:#1a1716">
<h2 style="margin:0 0 16px">Nuevo mensaje desde el sitio</h2>
<table cellpadding="6" style="border-collapse:collapse">
${rows
  .map(
    ([k, v]) =>
      `<tr><td style="font-weight:bold;vertical-align:top;padding-right:12px">${esc(k)}</td><td>${esc(v).replace(/\n/g, "<br>")}</td></tr>`,
  )
  .join("\n")}
</table>
</body></html>`;

  const key = process.env.BREVO_API_KEY;
  const sender = process.env.BREVO_SENDER_EMAIL;
  const to = process.env.BREVO_TO_EMAIL;

  // Sin llave (o sin remitente/destino): no truena, registra y responde error controlado.
  if (!key || !sender || !to) {
    console.log("[contact] Brevo no configurado (falta BREVO_API_KEY/SENDER/TO). Envío recibido:", data);
    return json({ ok: false, error: "El envío de correo aún no está configurado." }, 503);
  }

  try {
    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: { "api-key": key, "content-type": "application/json", accept: "application/json" },
      body: JSON.stringify({
        sender: { email: sender, name: "Sitio Anta Estudio" },
        to: [{ email: to }],
        replyTo: { email: data.correo, name: data.nombre },
        subject: `Nuevo contacto — Anta Estudio: ${data.nombre}`,
        htmlContent,
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("[contact] Brevo respondió", res.status, detail);
      return json({ ok: false, error: "No se pudo enviar el mensaje. Intenta más tarde." }, 502);
    }

    return json({ ok: true });
  } catch (err) {
    console.error("[contact] Error llamando a Brevo:", err);
    return json({ ok: false, error: "No se pudo enviar el mensaje. Intenta más tarde." }, 502);
  }
}
