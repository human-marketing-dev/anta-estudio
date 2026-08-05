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

/**
 * Section 6 · Nuestros Clientes (horizontal, on ink): big square Anta mark, the
 * title + copy next to it, then a single marquee row of client logos.
 * Reduced motion / no-JS → static wrapping row.
 */
export function ClientsSection() {
  const rootRef = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const row = rowRef.current;
      const marquee = marqueeRef.current;
      if (!row) return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const added: Element[] = [];
        Array.from(row.children).forEach((child) => {
          const clone = child.cloneNode(true) as Element;
          row.appendChild(clone);
          added.push(clone);
        });

        const tween = gsap.fromTo(
          row,
          { xPercent: 0 },
          { xPercent: -50, duration: 55, ease: "none", repeat: -1 },
        );

        const pause = () => tween.pause();
        const play = () => tween.play();
        marquee?.addEventListener("mouseenter", pause);
        marquee?.addEventListener("mouseleave", play);

        return () => {
          marquee?.removeEventListener("mouseenter", pause);
          marquee?.removeEventListener("mouseleave", play);
          tween.kill();
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
          <div ref={rowRef} className={styles.row}>
            {clientes.map(([file, name]) => (
              <div key={file} className={styles.logoCell}>
                <Image
                  src={`/clientes/${file}`}
                  alt={name}
                  fill
                  sizes="180px"
                  style={{ objectFit: "contain" }}
                  className={styles.logo}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
