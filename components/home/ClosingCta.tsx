"use client";

import { useState } from "react";
import { RevealLines } from "@/components/anim";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Textarea } from "@/components/Textarea";
import { WhatsAppIcon } from "@/components/site";
import { sendContact } from "@/lib/sendContact";
import shared from "./home.module.css";
import styles from "./ClosingCta.module.css";

interface ClosingCtaProps {
  /** H2 copy. Defaults to the home closing headline. */
  title?: string;
  /** Supporting paragraph. */
  body?: string;
  whatsappHref?: string;
}

const DEFAULT_TITLE = "¿Necesitas un Despacho de Arquitectura en Monterrey?";
const DEFAULT_BODY =
  "Nos encantaría conocer tu proyecto. En Anta Estudio combinamos diseño, ejecución y más de 15 años de experiencia para llevarlo a la realidad con la mayor tranquilidad.";

type Status = "idle" | "sending" | "success" | "error";

const hpStyle = {
  position: "absolute" as const,
  left: "-9999px",
  width: "1px",
  height: "1px",
  opacity: 0,
  overflow: "hidden",
};

/**
 * Closing CTA on ink (blends into the footer): headline + copy on the left,
 * a short contact form on the right.
 */
export function ClosingCta({
  title = DEFAULT_TITLE,
  body = DEFAULT_BODY,
  whatsappHref = "https://wa.me/528100000000",
}: ClosingCtaProps) {
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
      tipoProyecto: String(fd.get("tipoProyecto") ?? ""),
      mensaje: String(fd.get("mensaje") ?? ""),
      confirmacion: String(fd.get("confirmacion") ?? ""),
      origen: "CTA de cierre",
    });
    if (res.ok) {
      setStatus("success");
    } else {
      setStatus("error");
      setError(res.error ?? "No se pudo enviar. Intenta de nuevo.");
    }
  }

  return (
    <section id="cta" className={`${shared.section} ${shared.sectionInk} ${styles.section}`}>
      <div className={shared.wrap}>
        <div className={styles.grid}>
          <div>
            <RevealLines as="h2" className={`${shared.h2} ${styles.title}`}>
              {title}
            </RevealLines>
            <p className={styles.body}>{body}</p>
            <div className={styles.ctas}>
              <Button
                as="a"
                href={whatsappHref}
                variant="outline"
                style={{ borderColor: "#fff", color: "#fff" }}
              >
                <WhatsAppIcon />
                Hablar por WhatsApp
              </Button>
            </div>
          </div>

          <div className={styles.formPanel}>
            {status === "success" ? (
              <div className={styles.thanks}>
                <p className={styles.thanksTitle}>Gracias.</p>
                <p className={styles.thanksBody}>
                  Hemos recibido tu mensaje. Te contactaremos pronto.
                </p>
                <Button
                  variant="outline"
                  style={{ borderColor: "#fff", color: "#fff" }}
                  onClick={() => setStatus("idle")}
                >
                  Enviar otro
                </Button>
              </div>
            ) : (
              <form className={styles.form} onSubmit={onSubmit}>
                <Input tone="ink" name="nombre" label="Nombre" placeholder="Tu nombre" required />
                <Input tone="ink" name="correo" label="Correo" type="email" placeholder="tu@correo.com" required />
                <Input tone="ink" name="tipoProyecto" label="Tipo de proyecto" placeholder="Comercial, corporativo…" />
                <Textarea tone="ink" name="mensaje" label="Mensaje" rows={3} placeholder="Cuéntanos sobre tu proyecto" />

                {/* Honeypot anti-spam — invisible para humanos. */}
                <div style={hpStyle} aria-hidden="true">
                  <label htmlFor="cta-confirmacion">No llenar</label>
                  <input id="cta-confirmacion" name="confirmacion" type="text" tabIndex={-1} autoComplete="off" />
                </div>

                {status === "error" && <p className={styles.formError}>{error}</p>}

                <Button type="submit" disabled={status === "sending"} style={{ alignSelf: "flex-start" }}>
                  {status === "sending" ? "Enviando…" : "Solicitar propuesta"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
