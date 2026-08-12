import type { CSSProperties } from "react";
import Link from "next/link";
import { Logo } from "@/components/Logo";

/** Site footer on ink. Wordmark, columns, contact, fine print. */
export function Footer({ style = {} }: { style?: CSSProperties }) {
  const col: CSSProperties = { display: "flex", flexDirection: "column", gap: 12 };
  const head: CSSProperties = {
    fontFamily: "var(--font-text)",
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: "2px",
    textTransform: "uppercase",
    color: "var(--anta-ink-50)",
    marginBottom: 6,
  };
  const link: CSSProperties = {
    fontFamily: "var(--font-text)",
    fontSize: 14,
    color: "var(--anta-mist)",
    textDecoration: "none",
    letterSpacing: "0.3px",
  };
  return (
    <footer
      style={{ background: "var(--anta-ink)", color: "var(--anta-white)", padding: "0 48px 40px", ...style }}
    >
      {/* Divider between the closing CTA above and the footer. */}
      <div style={{ maxWidth: 1320, margin: "0 auto" }}>
        <div style={{ height: 1, background: "var(--anta-ink-90)" }} />
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1.4fr",
          gap: 48,
          maxWidth: 1320,
          margin: "96px auto 0",
        }}
      >
        <div style={col}>
          <Logo color="white" height={26} />
          <p style={{ ...link, maxWidth: 260, lineHeight: 1.6, color: "var(--anta-ink-30)", marginTop: 8 }}>
            Despacho de arquitectura en San Pedro, Nuevo León.
          </p>
        </div>
        <div style={col}>
          <span style={head}>Estudio</span>
          <Link href="/#nosotros" style={link}>Nosotros</Link>
          <Link href="/#servicios" style={link}>Servicios</Link>
          <Link href="/#proyectos" style={link}>Proyectos</Link>
        </div>
        <div style={col}>
          <span style={head}>Servicios</span>
          <a href="#" style={link}>Arquitectura</a>
          <a href="#" style={link}>Interiores</a>
          <a href="#" style={link}>Gestión de obra</a>
        </div>
        <div style={col}>
          <span style={head}>Contacto</span>
          <a href="mailto:hola@antaestudio.com" style={link}>hola@antaestudio.com</a>
          <a href="#" style={link}>San Pedro Garza García, N.L.</a>
          <a href="#" style={{ ...link, color: "var(--anta-pink)" }}>Instagram ↗</a>
        </div>
      </div>
      <div
        style={{
          maxWidth: 1320,
          margin: "64px auto 0",
          paddingTop: 24,
          borderTop: "1px solid var(--anta-ink-90)",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span style={{ ...link, fontSize: 12, color: "var(--anta-ink-50)" }}>
          © {new Date().getFullYear()} Anta Estudio
        </span>
        <span style={{ ...link, fontSize: 12, color: "var(--anta-ink-50)" }}>Monterrey · México</span>
      </div>
    </footer>
  );
}
