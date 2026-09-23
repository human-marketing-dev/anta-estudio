"use client";

import Link from "next/link";
import { useState } from "react";
import type { CSSProperties, ReactNode } from "react";

/** Footer menu link — turns pink on hover. Uses Next Link for internal hrefs. */
export function FooterLink({
  href,
  style = {},
  children,
}: {
  href: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  const [hover, setHover] = useState(false);
  const internal = href.startsWith("/");
  const s: CSSProperties = {
    // Default vertical padding raises body links to a ~44px tap target (each is
    // a flex item in the footer columns, so the padding produces real height).
    // `...style` comes after so a caller — e.g. a column heading — can override
    // it back to 0 and stay top-aligned with the plain <span> headings.
    padding: "12px 0",
    ...style,
    color: hover ? "var(--anta-pink)" : style.color,
    transition: "color var(--dur-fast) var(--ease)",
  };
  const shared = {
    style: s,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
  };

  return internal ? (
    <Link href={href} {...shared}>
      {children}
    </Link>
  ) : (
    <a href={href} {...shared}>
      {children}
    </a>
  );
}
