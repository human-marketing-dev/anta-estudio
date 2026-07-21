"use client";

import { useState } from "react";
import type { CSSProperties } from "react";

/** Flat photo placeholder (brand-honest: no real imagery yet). */
export function Photo({
  ratio = "4 / 5",
  label = "Fotografía",
  tone = "mist",
  style = {},
}: {
  ratio?: string;
  label?: string;
  tone?: "mist" | "ink";
  style?: CSSProperties;
}) {
  const [hover, setHover] = useState(false);
  const dark = tone === "ink";
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        aspectRatio: ratio,
        background: dark ? "var(--anta-ink)" : "var(--anta-mist)",
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: dark ? "var(--anta-ink)" : "var(--anta-mist)",
          transform: hover ? "scale(1.04)" : "scale(1)",
          transition: "transform 1.1s var(--ease)",
        }}
      />
      <span
        style={{
          position: "absolute",
          left: 16,
          bottom: 14,
          fontFamily: "var(--font-text)",
          fontSize: 11,
          letterSpacing: "2.5px",
          textTransform: "uppercase",
          color: dark ? "rgba(255,255,255,.32)" : "var(--anta-ink-50)",
        }}
      >
        {label}
      </span>
      <span
        style={{
          position: "absolute",
          right: 16,
          top: 14,
          width: 8,
          height: 8,
          background: "var(--anta-pink)",
          opacity: hover ? 1 : 0,
          transition: "opacity .5s var(--ease)",
        }}
      />
    </div>
  );
}

export const WhatsAppIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" style={{ flex: "none" }}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export const Arrow = ({ s = 16 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
