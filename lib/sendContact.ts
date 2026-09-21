export interface ContactPayload {
  nombre: string;
  correo: string;
  telefono?: string;
  tipoProyecto?: string;
  mensaje?: string;
  /** Página/sección desde donde se envía (para el correo). */
  origen?: string;
  /** Honeypot — debe ir vacío. */
  confirmacion?: string;
}

export interface ContactResult {
  ok: boolean;
  error?: string;
}

/** Envía el formulario al route handler. Nunca toca la API key. */
export async function sendContact(payload: ContactPayload): Promise<ContactResult> {
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = (await res.json().catch(() => ({}))) as ContactResult;
    if (!res.ok || !data.ok) {
      return { ok: false, error: data.error ?? "No se pudo enviar. Intenta de nuevo." };
    }
    return { ok: true };
  } catch {
    return { ok: false, error: "Error de conexión. Intenta de nuevo." };
  }
}
