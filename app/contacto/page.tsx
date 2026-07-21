"use client";

import { useState } from "react";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { SectionLabel } from "@/components/SectionLabel";
import { Input } from "@/components/Input";
import { Textarea } from "@/components/Textarea";
import { Button } from "@/components/Button";
import { Divider } from "@/components/Divider";

const contactMeta: [string, string][] = [
  ["Correo", "hola@antaestudio.com"],
  ["Ubicación", "San Pedro Garza García, N.L."],
  ["Instagram", "@antaestudio"],
];

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <div>
      <NavBar theme="light" cta="Solicitar propuesta" />
      <section style={{ background: "var(--anta-white)", padding: "96px 48px 120px" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 96 }}>
            <div>
              <SectionLabel>Contacto</SectionLabel>
              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 300,
                  fontSize: 58.92,
                  lineHeight: 1.1,
                  letterSpacing: "-0.5px",
                  margin: "24px 0 0",
                }}
              >
                Conversemos
                <br />
                sobre tu proyecto.
              </h1>
              <p
                style={{
                  fontFamily: "var(--font-text)",
                  fontSize: 16,
                  lineHeight: 1.5,
                  letterSpacing: "0.5px",
                  color: "var(--anta-ink-70)",
                  maxWidth: 420,
                  marginTop: 28,
                }}
              >
                Cuéntanos qué tienes en mente. Respondemos en un plazo de 48 horas hábiles.
              </p>
              <Divider style={{ margin: "48px 0" }} />
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {contactMeta.map(([k, v]) => (
                  <div
                    key={k}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      maxWidth: 360,
                      fontFamily: "var(--font-text)",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 12,
                        letterSpacing: "1.5px",
                        textTransform: "uppercase",
                        color: "var(--anta-ink-50)",
                      }}
                    >
                      {k}
                    </span>
                    <span style={{ fontSize: 15, color: "var(--anta-ink)" }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: "var(--anta-mist)", padding: "48px" }}>
              {sent ? (
                <div
                  style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: 44.2, lineHeight: 1.2 }}>
                    Gracias.
                  </div>
                  <p style={{ fontFamily: "var(--font-text)", fontSize: 16, color: "var(--anta-ink-70)", marginTop: 12 }}>
                    Hemos recibido tu mensaje. Te contactaremos pronto.
                  </p>
                  <div style={{ marginTop: 28 }}>
                    <Button variant="outline" onClick={() => setSent(false)}>
                      Enviar otro
                    </Button>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSent(true);
                  }}
                  style={{ display: "flex", flexDirection: "column", gap: 28 }}
                >
                  <Input label="Nombre" placeholder="Tu nombre" required />
                  <Input label="Correo" type="email" placeholder="tu@correo.com" required />
                  <Input label="Tipo de proyecto" placeholder="Residencial, comercial…" />
                  <Textarea label="Mensaje" rows={4} placeholder="Cuéntanos sobre tu proyecto" />
                  <Button type="submit" style={{ alignSelf: "flex-start" }}>
                    Enviar mensaje
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
