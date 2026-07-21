"use client";

import Link from "next/link";
import { useState } from "react";
import type { CSSProperties } from "react";

/**
 * Project card — full-bleed square image, meta below. Hover eases the image.
 * With no `image`, shows a brand-honest mist placeholder labelled "Fotografía".
 */
export function Card({
  image,
  category,
  title,
  place,
  href = "#",
  label = "Fotografía",
  style = {},
}: {
  image?: string;
  category?: string;
  title?: string;
  place?: string;
  href?: string;
  label?: string;
  style?: CSSProperties;
}) {
  const [hover, setHover] = useState(false);
  return (
    <Link
      href={href}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ display: "block", textDecoration: "none", color: "var(--anta-ink)", ...style }}
    >
      <div
        style={{
          overflow: "hidden",
          aspectRatio: "4 / 5",
          background: "var(--anta-mist)",
          position: "relative",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            background: image
              ? `url(${image}) center/cover no-repeat`
              : "var(--anta-mist)",
            transform: hover ? "scale(1.03)" : "scale(1)",
            opacity: hover ? 0.92 : 1,
            transition:
              "transform var(--dur) var(--ease), opacity var(--dur) var(--ease)",
          }}
        />
        {!image && (
          <span
            style={{
              position: "absolute",
              left: 16,
              bottom: 14,
              fontFamily: "var(--font-text)",
              fontSize: 11,
              letterSpacing: "2.5px",
              textTransform: "uppercase",
              color: "var(--anta-ink-50)",
            }}
          >
            {label}
          </span>
        )}
      </div>
      <div style={{ paddingTop: 16, display: "flex", flexDirection: "column", gap: 6 }}>
        {category && (
          <span
            style={{
              fontFamily: "var(--font-text)",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              color: "var(--anta-pink)",
            }}
          >
            {category}
          </span>
        )}
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: 24.88, lineHeight: 1.2 }}>
          {title}
        </span>
        {place && (
          <span
            style={{
              fontFamily: "var(--font-text)",
              fontSize: 14,
              color: "var(--anta-ink-70)",
              letterSpacing: "0.5px",
            }}
          >
            {place}
          </span>
        )}
      </div>
    </Link>
  );
}
