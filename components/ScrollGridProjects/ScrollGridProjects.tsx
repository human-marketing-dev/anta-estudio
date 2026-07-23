"use client";

import Image, { getImageProps } from "next/image";
import type { StaticImageData } from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";
import { getProject } from "@/lib/projects";
import styles from "./ScrollGridProjects.module.css";

const P = (slug: string) => {
  const p = getProject(slug);
  if (!p) throw new Error(`ScrollGridProjects: unknown project "${slug}"`);
  return p;
};
const cover = (slug: string) => P(slug).cover;
const gal = (slug: string, i = 0) => P(slug).galeria[i] ?? P(slug).cover;

type Cell = { slug: string; img: StaticImageData };

// 15 slots (desktop). Mobile hides Layer 1, showing Layer 2 + Layer 3 + scaler (9).
// Scaler uses a landscape Terraza shot so the main image reads horizontal.
const scaler: Cell = { slug: "terraza-pangea", img: gal("terraza-pangea", 0) };

// Natural aspect of the scaler photo — used so it starts FULL-WIDTH HORIZONTAL
// (never a tall/cropped box on tall viewports).
const SCALER_ASPECT = scaler.img.width / scaler.img.height;

const layer3: Cell[] = [
  { slug: "kampai", img: cover("kampai") },
  { slug: "cafe-laurel", img: cover("cafe-laurel") },
];

const layer2: Cell[] = [
  { slug: "nailz", img: cover("nailz") },
  { slug: "ludoteca-valle-alto", img: cover("ludoteca-valle-alto") },
  { slug: "valle-alto-club-de-golf", img: cover("valle-alto-club-de-golf") },
  { slug: "oficinas-majadma", img: cover("oficinas-majadma") },
  { slug: "crispy-pollo", img: cover("crispy-pollo") },
  { slug: "e-80", img: cover("e-80") },
];

const layer1: Cell[] = [
  { slug: "edificio-vh", img: cover("edificio-vh") },
  { slug: "tp-zentralia", img: cover("tp-zentralia") },
  { slug: "valle-alto-club-de-golf", img: gal("valle-alto-club-de-golf", 0) },
  { slug: "oficinas-majadma", img: gal("oficinas-majadma", 0) },
  { slug: "kampai", img: gal("kampai", 1) },
  { slug: "terraza-pangea", img: gal("terraza-pangea", 1) },
];

function Cells({ cells }: { cells: Cell[] }) {
  return (
    <>
      {cells.map((c, i) => (
        <div key={`${c.slug}-${i}`}>
          <Link href={`/proyectos/${c.slug}`} className={styles.cellLink}>
            <Image
              src={c.img}
              alt={P(c.slug).nombre}
              sizes="(max-width: 600px) 33vw, 300px"
              placeholder="blur"
              className={styles.cellImg}
            />
            <span className={styles.cellName}>{P(c.slug).nombre}</span>
          </Link>
        </div>
      ))}
    </>
  );
}

/**
 * Scroll-driven showcase: the center image starts full-viewport and shrinks to
 * its cell while three layers fade + scale in with staggered, per-layer easing.
 * At the end all projects sit in a uniform grid that fits the viewport. Hover
 * reveals each project's name. Reduced motion / no-JS render it finished, static.
 */
export function ScrollGridProjects({ debug = false }: { debug?: boolean }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const scalerCellRef = useRef<HTMLAnchorElement>(null);
  const scalerImgRef = useRef<HTMLImageElement>(null);

  useGSAP(
    () => {
      const stage = stageRef.current;
      const cell = scalerCellRef.current;
      const img = scalerImgRef.current;
      // No need to wait for the image to load — the start/end sizes are measured
      // from the viewport and the grid cell, which are laid out by CSS.
      if (!stage || !cell || !img) return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const q = gsap.utils.selector(stage);
        const layers = q(`.${styles.layer}`);
        // Function-based (re-measured on refresh) — start state vs natural cell.
        // Start: full viewport width at the photo's own (horizontal) aspect,
        // capped to the viewport height so it never overflows.
        const vw = () => window.innerWidth;
        const vh = () => Math.min(window.innerWidth / SCALER_ASPECT, window.innerHeight);
        const nw = () => cell.clientWidth;
        const nh = () => cell.clientHeight;

        // Disable hover-names while the grid is animating; re-enable once the
        // main image has settled to its cell (same size as the others).
        const grid = gridRef.current;
        let scrubbing = true;
        grid?.classList.add(styles.scrubbing);

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: stage,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            invalidateOnRefresh: true,
            markers: debug,
            onUpdate: (self) => {
              const next = self.progress < 0.85;
              if (next !== scrubbing && grid) {
                scrubbing = next;
                grid.classList.toggle(styles.scrubbing, next);
              }
            },
          },
        });

        // Center image: full viewport → natural cell. Per-axis easing (width
        // power2.inOut, height power1.inOut). Real width/height keeps it crisp.
        tl.fromTo(img, { width: vw }, { width: nw, ease: "power2.inOut", duration: 0.8 }, 0);
        tl.fromTo(img, { height: vh }, { height: nh, ease: "power1.inOut", duration: 0.8 }, 0);

        // Layers: opacity holds 0 until 55%, scale holds 0 until 30%, each layer
        // ending a touch earlier (stagger). Distinct ease per layer for scale.
        const scaleEase = ["power1.inOut", "power3.inOut", "power4.inOut"];
        layers.forEach((layer, i) => {
          const end = 1 - i * 0.05;
          gsap.set(layer, { opacity: 0, scale: 0 });
          tl.to(layer, { opacity: 1, ease: "sine.out", duration: end - 0.55 * end }, 0.55 * end);
          tl.to(
            layer,
            { scale: 1, ease: scaleEase[i] ?? "power1.inOut", duration: end - 0.3 * end },
            0.3 * end,
          );
        });

        ScrollTrigger.refresh();

        return () => grid?.classList.remove(styles.scrubbing);
      });
    },
    { scope: stageRef },
  );

  const { props: scalerProps } = getImageProps({
    src: scaler.img,
    alt: P(scaler.slug).nombre,
    sizes: "100vw",
    loading: "eager", // it opens full-bleed — don't lazy-load it
  });

  return (
    <div ref={stageRef} className={styles.stage}>
      <div className={styles.content}>
        <div ref={gridRef} className={styles.grid}>
          <div className={styles.layer}>
            <Cells cells={layer1} />
          </div>
          <div className={styles.layer}>
            <Cells cells={layer2} />
          </div>
          <div className={styles.layer}>
            <Cells cells={layer3} />
          </div>
          <Link href={`/proyectos/${scaler.slug}`} ref={scalerCellRef} className={styles.scaler}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              {...scalerProps}
              ref={scalerImgRef}
              onLoad={() => ScrollTrigger.refresh()}
              className={styles.scalerImg}
              alt={P(scaler.slug).nombre}
            />
            <span className={styles.scalerName}>{P(scaler.slug).nombre}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
