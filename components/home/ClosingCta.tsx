"use client";

import { useState } from "react";
import { RevealLines } from "@/components/anim";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Textarea } from "@/components/Textarea";
import { WhatsAppIcon } from "@/components/site";
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

/**
 * Closing CTA on ink (blends into the footer): headline + copy on the left,
 * a short contact form on the right.
 */
export function ClosingCta({
  title = DEFAULT_TITLE,
  body = DEFAULT_BODY,
  whatsappHref = "https://wa.me/528100000000",
}: ClosingCtaProps) {
  const [sent, setSent] = useState(false);

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
            {sent ? (
              <div className={styles.thanks}>
                <p className={styles.thanksTitle}>Gracias.</p>
                <p className={styles.thanksBody}>
                  Hemos recibido tu mensaje. Te contactaremos pronto.
                </p>
                <Button
                  variant="outline"
                  style={{ borderColor: "#fff", color: "#fff" }}
                  onClick={() => setSent(false)}
                >
                  Enviar otro
                </Button>
              </div>
            ) : (
              <form
                className={styles.form}
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
              >
                <Input tone="ink" label="Nombre" placeholder="Tu nombre" required />
                <Input tone="ink" label="Correo" type="email" placeholder="tu@correo.com" required />
                <Input tone="ink" label="Tipo de proyecto" placeholder="Comercial, corporativo…" />
                <Textarea tone="ink" label="Mensaje" rows={3} placeholder="Cuéntanos sobre tu proyecto" />
                <Button type="submit" style={{ alignSelf: "flex-start" }}>
                  Solicitar propuesta
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
