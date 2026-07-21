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
  { label: "Contacto", href: "#cta" },
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
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "24px 48px",
        background: inverse ? "transparent" : "var(--anta-white)",
        borderBottom: inverse ? "none" : "1px solid var(--color-border-subtle)",
        ...style,
      }}
    >
      <Link href="/" aria-label="Anta Estudio — inicio" style={{ display: "inline-flex" }}>
        <Logo color={inverse ? "white" : "black"} height={24} />
      </Link>
      <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
        <ul style={{ display: "flex", gap: 32, listStyle: "none", margin: 0, padding: 0 }}>
          {links.map((l) => (
            <NavLink key={l.href} {...l} fg={fg} />
          ))}
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
              color: inverse ? "var(--anta-ink)" : "var(--anta-white)",
              background: inverse ? "var(--anta-white)" : "var(--anta-ink)",
              padding: "12px 22px",
              textDecoration: "none",
              borderRadius: 0,
            }}
          >
            {cta}
          </Link>
        )}
      </div>
    </nav>
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
