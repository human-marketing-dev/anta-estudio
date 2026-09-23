import type { CSSProperties } from "react";
import { Logo } from "@/components/Logo";
import { FooterLink } from "@/components/FooterLink";
import { CONTACT } from "@/lib/site";

/** Site footer on ink. Wordmark, columns, contact, fine print. */
export function Footer({ style = {} }: { style?: CSSProperties }) {
  // gap trimmed to 2 because each FooterLink now carries 12px vertical padding
  // (the padding supplies the row spacing + the 44px tap target).
  const col: CSSProperties = { display: "flex", flexDirection: "column", gap: 2 };
  const head: CSSProperties = {
    fontFamily: "var(--font-text)",
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: "2px",
    textTransform: "uppercase",
    color: "var(--anta-ink-50)",
    textDecoration: "none",
    // No vertical padding: heading links stay top-aligned with the <span>
    // headings (Estudio, Contacto) across all columns.
    padding: 0,
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
      style={{ background: "var(--anta-ink)", color: "var(--anta-white)", padding: "0 0 40px", ...style }}
    >
      {/* Divider between the closing CTA above and the footer. */}
      <div style={{ maxWidth: "var(--content-max)", paddingInline: "var(--section-pad-x)", margin: "0 auto" }}>
        <div style={{ height: 1, background: "var(--anta-ink-90)" }} />
      </div>
      <div
        style={{
          display: "grid",
          // auto-fit + minmax lets the 5 columns wrap onto multiple rows on
          // tablet/mobile instead of getting cramped (no media queries inline).
          gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
          alignItems: "start",
          gap: 48,
          maxWidth: "var(--content-max)", paddingInline: "var(--section-pad-x)",
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
          <FooterLink href="/nosotros" style={link}>Nosotros</FooterLink>
          <FooterLink href="/#servicios" style={link}>Servicios</FooterLink>
          <FooterLink href="/#proyectos" style={link}>Proyectos</FooterLink>
        </div>
        <div style={col}>
          <FooterLink href="/#servicios" style={head}>Servicios</FooterLink>
          <FooterLink href="/servicios/arquitectura-comercial" style={link}>Arquitectura Comercial</FooterLink>
          <FooterLink href="/servicios/arquitectura-corporativa" style={link}>Arquitectura Corporativa</FooterLink>
          <FooterLink href="/servicios/arquitectura-residencial" style={link}>Arquitectura Residencial</FooterLink>
        </div>
        <div style={col}>
          <FooterLink href="/interiorismo" style={head}>Interiorismo</FooterLink>
          <FooterLink href="/interiorismo/diseno-de-oficinas" style={link}>Diseño de Oficinas</FooterLink>
          <FooterLink href="/interiorismo/diseno-de-restaurantes" style={link}>Diseño de Restaurantes</FooterLink>
          <FooterLink href="/interiorismo/diseno-de-interiores-casas" style={link}>Diseño de Interiores de Casas</FooterLink>
        </div>
        <div style={col}>
          <span style={head}>Contacto</span>
          <FooterLink href={`mailto:${CONTACT.correo}`} style={link}>{CONTACT.correo}</FooterLink>
          <FooterLink href={CONTACT.direccion.mapsUrl} style={link}>
            Av. José Vasconcelos 430, San Pedro Garza García, N.L.
          </FooterLink>
          <FooterLink href={CONTACT.instagram} style={{ ...link, color: "var(--anta-pink)" }}>Instagram ↗</FooterLink>
        </div>
      </div>
      <div
        style={{
          maxWidth: "var(--content-max)", paddingInline: "var(--section-pad-x)",
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
