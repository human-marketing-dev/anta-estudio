"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { RevealLines } from "@/components/anim";
import shared from "./home.module.css";
import styles from "./ClientsSection.module.css";

// White, transparent client logos. [file, alt]
const clientes: [string, string][] = [
  ["grupo-pangea-logo.webp", "Grupo Pangea"],
  ["grupo-kampai-logo.webp", "Grupo Kampai"],
  ["group-80-logo.webp", "Group 80"],
  ["majadma-logo.webp", "MAJADMA"],
  ["valle-alto-club-de-golf-logo.webp", "Valle Alto Club de Golf"],
  ["teleperformance-logo.webp", "Teleperformance"],
  ["cavimex-logo.webp", "Cavimex"],
  ["sibau-logo.webp", "Sibau"],
  ["casa-liebre-logo.webp", "Casa Liebre"],
  ["oh-darling-logo.webp", "Oh Darling"],
  ["nikkori-logo.webp", "Nikkori"],
  ["viva-pizza-logo.webp", "Viva Pizza"],
  ["line-2u-logo.webp", "Line 2U"],
  ["rg-mx-logo.webp", "RG MX"],
  ["latin-american-school-of-monterrey-logo.png", "Latin American School of Monterrey"],
];

const rowA = clientes.slice(0, 8);
const rowB = clientes.slice(8);

function Row({ logos, dirRef }: { logos: [string, string][]; dirRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div ref={dirRef} className={styles.row}>
      {logos.map(([file, name]) => (
        <div key={file} className={styles.logoCell}>
          <Image
            src={`/clientes/${file}`}
            alt={name}
            fill
            sizes="150px"
            style={{ objectFit: "contain" }}
            className={styles.logo}
          />
        </div>
      ))}
    </div>
  );
}

/**
 * Section 6 · Nuestros Clientes (horizontal, on ink): big square Anta mark on
 * the left, title + copy next to it, then two marquee rows of client logos
 * scrolling in opposite directions. Reduced motion / no-JS → static rows.
 */
export function ClientsSection() {
  const rootRef = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const rowARef = useRef<HTMLDivElement>(null);
  const rowBRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const rows: [HTMLDivElement | null, number, 1 | -1][] = [
          [rowARef.current, 46, 1],
          [rowBRef.current, 56, -1],
        ];
        const added: Element[] = [];
        const tweens: gsap.core.Tween[] = [];

        rows.forEach(([el, dur, dir]) => {
          if (!el) return;
          Array.from(el.children).forEach((child) => {
            const clone = child.cloneNode(true) as Element;
            el.appendChild(clone);
            added.push(clone);
          });
          tweens.push(
            gsap.fromTo(
              el,
              { xPercent: dir === 1 ? 0 : -50 },
              { xPercent: dir === 1 ? -50 : 0, duration: dur, ease: "none", repeat: -1 },
            ),
          );
        });

        const marquee = marqueeRef.current;
        const pause = () => tweens.forEach((t) => t.pause());
        const play = () => tweens.forEach((t) => t.play());
        marquee?.addEventListener("mouseenter", pause);
        marquee?.addEventListener("mouseleave", play);

        return () => {
          marquee?.removeEventListener("mouseenter", pause);
          marquee?.removeEventListener("mouseleave", play);
          tweens.forEach((t) => t.kill());
          added.forEach((c) => c.remove());
        };
      });
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} id="clientes" className={`${shared.section} ${shared.sectionInk} ${styles.section}`}>
      <div className={styles.layout}>
        <div className={styles.mark}>
          <Image
            src="/Logo-Anta-blanco-cuadrado-1000x1000.webp"
            alt="Anta Estudio"
            width={1000}
            height={1000}
            className={styles.markImg}
            sizes="(max-width: 900px) 120px, 220px"
          />
        </div>

        <div className={styles.head}>
          <RevealLines as="h2" className={shared.h2}>
            Nuestros Clientes
          </RevealLines>
          <p className={`${shared.sub} ${styles.headSub}`}>
            Marcas y empresas que han confiado en nosotros para diseñar y construir sus espacios.
          </p>
        </div>

        <div ref={marqueeRef} className={styles.marquee}>
          <Row logos={rowA} dirRef={rowARef} />
          <Row logos={rowB} dirRef={rowBRef} />
        </div>
      </div>
    </section>
  );
}
