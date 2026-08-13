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
