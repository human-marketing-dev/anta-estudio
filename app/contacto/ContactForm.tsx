"use client";

import { useState } from "react";
import { Input } from "@/components/Input";
import { Textarea } from "@/components/Textarea";
import { Button } from "@/components/Button";
import styles from "./contacto.module.css";

/** Contact form with an in-place "thank you" state (no backend yet). */
export function ContactForm() {
  const [sent, setSent] = useState(false);

  return (
    <div className={styles.formPanel}>
      {sent ? (
        <div className={styles.thanks}>
          <p className={styles.thanksTitle}>Gracias.</p>
          <p className={styles.thanksBody}>Hemos recibido tu mensaje. Te contactaremos pronto.</p>
          <Button variant="outline" onClick={() => setSent(false)}>
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
          <Input label="Nombre" placeholder="Tu nombre" required />
          <Input label="Correo" type="email" placeholder="tu@correo.com" required />
          <Input label="Teléfono" type="tel" placeholder="81 0000 0000" />
          <Input label="Tipo de proyecto" placeholder="Comercial, corporativo, residencial…" />
          <Textarea label="Mensaje" rows={4} placeholder="Cuéntanos sobre tu proyecto" />
          <Button type="submit" style={{ alignSelf: "flex-start" }}>
            Solicitar propuesta
          </Button>
        </form>
      )}
    </div>
  );
}
