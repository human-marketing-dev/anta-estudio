"use client";

import Link from "next/link";
import { useState } from "react";
import type { CSSProperties } from "react";
import { Logo } from "@/components/Logo";

type NavLinkItem = { label: string; href: string };

const DEFAULT_LINKS: NavLinkItem[] = [
  { label: "Nosotros", href: "#nosotros" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Servicios", href: "#servicios" },
  { label: "Contacto", href: "/contacto" },
];

/** Sub-items shown when hovering the "Servicios" nav item. */
const SERVICE_LINKS: NavLinkItem[] = [
  { label: "Arquitectura Comercial", href: "/servicios/arquitectura-comercial" },
  { label: "Arquitectura Corporativa", href: "/servicios/arquitectura-corporativa" },
  { label: "Arquitectura Residencial", href: "/servicios/arquitectura-residencial" },
];

/**
 * Website top bar — logo left, nav links right. `theme` inverts for dark heroes.
 */
export function NavBar({
  theme = "light",
  links = DEFAULT_LINKS,
  cta = "Cotizar",
  ctaHref = "/contacto",
  style = {},
}: {
  theme?: "light" | "dark";
  links?: NavLinkItem[];
  cta?: string | null;
  ctaHref?: string;
  style?: CSSProperties;
}) {
  const inverse = theme === "dark";
  const fg = inverse ? "var(--anta-white)" : "var(--anta-ink)";
  return (
    <nav
      style={{
        background: inverse ? "transparent" : "var(--anta-white)",
        borderBottom: inverse ? "none" : "1px solid var(--color-border-subtle)",
        ...style,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: "var(--content-max)",
          margin: "0 auto",
          padding: "24px var(--section-pad-x)",
        }}
      >
        <Link href="/" aria-label="Anta Estudio — inicio" style={{ display: "inline-flex" }}>
          <Logo color={inverse ? "white" : "black"} height={24} />
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
        <ul style={{ display: "flex", gap: 32, listStyle: "none", margin: 0, padding: 0 }}>
          {links.map((l) =>
            l.label === "Servicios" ? (
              <NavDropdown key={l.href} label={l.label} fg={fg} items={SERVICE_LINKS} />
            ) : (
              <NavLink key={l.href} {...l} fg={fg} />
            ),
          )}
        </ul>
        {cta && (
          <Link
            href={ctaHref}
            style={{
              fontFamily: "var(--font-text)",
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.8px",
              textTransform: "uppercase",
              color: "var(--anta-white)",
              background: "var(--anta-pink)",
              padding: "12px 22px",
              textDecoration: "none",
              borderRadius: 0,
            }}
          >
            {cta}
          </Link>
        )}
        </div>
      </div>
    </nav>
  );
}

function NavDropdown({ label, fg, items }: { label: string; fg: string; items: NavLinkItem[] }) {
  const [open, setOpen] = useState(false);
  return (
    <li
      style={{ position: "relative" }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 7,
          fontFamily: "var(--font-text)",
          fontSize: 14,
          letterSpacing: "0.5px",
          color: fg,
          background: "none",
          border: "none",
          borderBottom: `1px solid ${open ? "var(--anta-pink)" : "transparent"}`,
          padding: 0,
          paddingBottom: 4,
          cursor: "pointer",
          transition: "border-color var(--dur-fast) var(--ease)",
        }}
      >
        {label}
        <svg
          aria-hidden="true"
          width="11"
          height="11"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            transform: open ? "rotate(180deg)" : "none",
            transition: "transform var(--dur-fast) var(--ease)",
          }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        // Transparent padding-top acts as a "bridge" so moving from the button
        // to the panel never leaves the <li> (the gap is part of the hover area).
        <div style={{ position: "absolute", top: "100%", left: 0, paddingTop: 14, zIndex: 30 }}>
          <div
            style={{
              minWidth: 250,
              padding: "8px 0",
              background: "var(--anta-white)",
              border: "1px solid var(--color-border-subtle)",
              boxShadow: "0 14px 40px rgba(26, 23, 22, 0.12)",
            }}
          >
            {items.map((it) => (
              <DropdownItem key={it.href} {...it} />
            ))}
          </div>
        </div>
      )}
    </li>
  );
}

function DropdownItem({ label, href }: NavLinkItem) {
  const [hover, setHover] = useState(false);
  return (
    <Link
      href={href}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "block",
        padding: "11px 22px",
        fontFamily: "var(--font-text)",
        fontSize: 14,
        letterSpacing: "0.3px",
        color: hover ? "var(--anta-white)" : "var(--anta-ink)",
        background: hover ? "var(--anta-pink)" : "transparent",
        textDecoration: "none",
        whiteSpace: "nowrap",
        transition: "color var(--dur-fast) var(--ease), background var(--dur-fast) var(--ease)",
      }}
    >
      {label}
    </Link>
  );
}

function NavLink({ label, href, fg }: NavLinkItem & { fg: string }) {
  const [hover, setHover] = useState(false);
  const internal = href.startsWith("/");
  const sharedStyle: CSSProperties = {
    fontFamily: "var(--font-text)",
    fontSize: 14,
    letterSpacing: "0.5px",
    color: fg,
    textDecoration: "none",
    paddingBottom: 4,
    borderBottom: `1px solid ${hover ? "var(--anta-pink)" : "transparent"}`,
    transition: "border-color var(--dur-fast) var(--ease)",
  };
  return (
    <li>
      {internal ? (
        <Link
          href={href}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          style={sharedStyle}
        >
          {label}
        </Link>
      ) : (
        <a
          href={href}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          style={sharedStyle}
        >
          {label}
        </a>
      )}
    </li>
  );
}
