"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties, KeyboardEvent } from "react";
import { Logo } from "@/components/Logo";
import styles from "./NavBar.module.css";

type NavLinkItem = { label: string; href: string };

const DEFAULT_LINKS: NavLinkItem[] = [
  { label: "Nosotros", href: "/nosotros" },
  { label: "Proyectos", href: "/proyectos" },
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
 * Below 860px the links + CTA collapse into a hamburger + full-screen panel;
 * the desktop layout (>=861px) is unchanged.
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

  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    setServicesOpen(false);
  }, []);

  // While the menu is open: lock body scroll, focus the close button, and on
  // close restore scroll and return focus to the hamburger.
  useEffect(() => {
    if (!menuOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      hamburgerRef.current?.focus();
    };
  }, [menuOpen]);

  // Trap focus inside the panel and close on Escape.
  const handlePanelKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Escape") {
        closeMenu();
        return;
      }
      if (e.key !== "Tab") return;
      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (!focusables || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    },
    [closeMenu],
  );

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

        {/* Desktop cluster — hidden below 860px (see NavBar.module.css). */}
        <div className={styles.desktopNav} style={{ alignItems: "center", gap: 40 }}>
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

        {/* Hamburger — hidden on desktop, shown below 860px. */}
        <button
          ref={hamburgerRef}
          type="button"
          className={styles.hamburger}
          aria-label="Abrir menú"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMenuOpen(true)}
          style={{ color: fg }}
        >
          <svg
            aria-hidden="true"
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          >
            <line x1="3" y1="7" x2="21" y2="7" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="17" x2="21" y2="17" />
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div
          id="mobile-nav"
          ref={panelRef}
          className={styles.panel}
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegación"
          onKeyDown={handlePanelKeyDown}
        >
          <div className={styles.panelBar}>
            <Link
              href="/"
              aria-label="Anta Estudio — inicio"
              onClick={closeMenu}
              style={{ display: "inline-flex" }}
            >
              <Logo color="black" height={24} />
            </Link>
            <button
              ref={closeRef}
              type="button"
              className={styles.close}
              aria-label="Cerrar menú"
              onClick={closeMenu}
            >
              <svg
                aria-hidden="true"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              >
                <line x1="5" y1="5" x2="19" y2="19" />
                <line x1="19" y1="5" x2="5" y2="19" />
              </svg>
            </button>
          </div>

          <nav className={styles.panelList} aria-label="Principal">
            {links.map((l) =>
              l.label === "Servicios" ? (
                <div key={l.href} className={styles.accItem}>
                  <button
                    type="button"
                    className={`${styles.accToggle} ${servicesOpen ? styles.accToggleOpen : ""}`}
                    aria-expanded={servicesOpen}
                    onClick={() => setServicesOpen((o) => !o)}
                  >
                    Servicios
                    <svg
                      aria-hidden="true"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                  {servicesOpen && (
                    <div className={styles.accPanel}>
                      {SERVICE_LINKS.map((s) => (
                        <Link key={s.href} href={s.href} className={styles.accSub} onClick={closeMenu}>
                          {s.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : l.href.startsWith("/") ? (
                <Link key={l.href} href={l.href} className={styles.panelItem} onClick={closeMenu}>
                  {l.label}
                </Link>
              ) : (
                <a key={l.href} href={l.href} className={styles.panelItem} onClick={closeMenu}>
                  {l.label}
                </a>
              ),
            )}
          </nav>

          {cta && (
            <Link href={ctaHref} className={styles.panelCta} onClick={closeMenu}>
              {cta}
            </Link>
          )}
        </div>
      )}
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
