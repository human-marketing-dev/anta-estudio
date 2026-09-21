"use client";

import { useState } from "react";
import { Input } from "@/components/Input";
import { Textarea } from "@/components/Textarea";
import { Button } from "@/components/Button";
import { sendContact } from "@/lib/sendContact";
import styles from "./contacto.module.css";

type Status = "idle" | "sending" | "success" | "error";

const hpStyle = {
  position: "absolute" as const,
  left: "-9999px",
  width: "1px",
  height: "1px",
  opacity: 0,
  overflow: "hidden",
};

/** Contact form → /api/contact (Brevo server-side). */
export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setStatus("sending");
    setError("");
    const res = await sendContact({
      nombre: String(fd.get("nombre") ?? ""),
      correo: String(fd.get("correo") ?? ""),
      telefono: String(fd.get("telefono") ?? ""),
      tipoProyecto: String(fd.get("tipoProyecto") ?? ""),
      mensaje: String(fd.get("mensaje") ?? ""),
      confirmacion: String(fd.get("confirmacion") ?? ""),
      origen: "Contacto",
    });
    if (res.ok) {
      setStatus("success");
    } else {
      setStatus("error");
      setError(res.error ?? "No se pudo enviar. Intenta de nuevo.");
    }
  }

  return (
    <div className={styles.formPanel}>
      {status === "success" ? (
        <div className={styles.thanks}>
          <p className={styles.thanksTitle}>Gracias.</p>
          <p className={styles.thanksBody}>Hemos recibido tu mensaje. Te contactaremos pronto.</p>
          <Button variant="outline" onClick={() => setStatus("idle")}>
            Enviar otro
          </Button>
        </div>
      ) : (
        <form className={styles.form} onSubmit={onSubmit}>
          <Input name="nombre" label="Nombre" placeholder="Tu nombre" required />
          <Input name="correo" label="Correo" type="email" placeholder="tu@correo.com" required />
          <Input name="telefono" label="Teléfono" type="tel" placeholder="81 0000 0000" />
          <Input name="tipoProyecto" label="Tipo de proyecto" placeholder="Comercial, corporativo, residencial…" />
          <Textarea name="mensaje" label="Mensaje" rows={4} placeholder="Cuéntanos sobre tu proyecto" />

          {/* Honeypot anti-spam — invisible para humanos. */}
          <div style={hpStyle} aria-hidden="true">
            <label htmlFor="confirmacion">No llenar</label>
            <input id="confirmacion" name="confirmacion" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          {status === "error" && <p className={styles.formError}>{error}</p>}

          <Button type="submit" disabled={status === "sending"} style={{ alignSelf: "flex-start" }}>
            {status === "sending" ? "Enviando…" : "Solicitar propuesta"}
          </Button>
        </form>
      )}
    </div>
  );
}
