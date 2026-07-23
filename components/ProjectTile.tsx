"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Project } from "@/lib/projects";
import styles from "./ProjectTile.module.css";

const CYCLE_MS = 800;
const MAX_IMAGES = 4; // cover + up to 3 gallery frames

/**
 * Portfolio tile (bottega53-style): portrait image, edge-to-edge (no gaps).
 * On hover the image cycles through the project's gallery photos and the name +
 * location appear overlaid. Gallery frames mount on first hover. No scroll
 * reveal — images are present from the start.
 */
export function ProjectTile({ project }: { project: Project }) {
  const images = [project.cover, ...project.galeria].slice(0, MAX_IMAGES);
  const [idx, setIdx] = useState(0);
  const [activated, setActivated] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const stop = () => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
    setIdx(0);
  };

  const start = () => {
    if (reduced || images.length < 2) return;
    setActivated(true);
    timer.current = setInterval(() => setIdx((i) => (i + 1) % images.length), CYCLE_MS);
  };

  useEffect(() => () => {
    if (timer.current) clearInterval(timer.current);
  }, []);

  return (
    <article className={styles.tile}>
      <Link
        href={`/proyectos/${project.slug}`}
        className={styles.link}
        onMouseEnter={start}
        onMouseLeave={stop}
      >
        <div className={styles.frame}>
          {images.map((img, i) =>
            i === 0 || activated ? (
              <Image
                key={i}
                src={img}
                alt={i === 0 ? project.nombre : ""}
                fill
                placeholder="blur"
                sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 33vw"
                className={styles.img}
                style={{ opacity: i === idx ? 1 : 0, zIndex: i === idx ? 2 : 1 }}
              />
            ) : null,
          )}
          <div className={styles.info}>
            <span className={styles.name}>{project.nombre}</span>
            <span className={styles.loc}>Monterrey, N.L.</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
