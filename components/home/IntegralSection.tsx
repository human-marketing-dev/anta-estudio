"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { StaticImageData } from "next/image";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";
import { RevealLines } from "@/components/anim";
import { getProject } from "@/lib/projects";
import shared from "./home.module.css";
import styles from "./IntegralSection.module.css";

const img = (slug: string, i = 0): StaticImageData => {
  const p = getProject(slug)!;
  return p.galeria[i] ?? p.cover;
};

export interface Capability {
  title: string;
  desc: string;
  image: StaticImageData;
}

const DEFAULT_ITEMS: Capability[] = [
  {
    title: "Diseño Arquitectónico",
    desc: "Distribución, reconfiguración y soluciones espaciales que ordenan el proyecto desde su lógica: función, luz y recorrido.",
    image: img("e-80", 1),
  },
  {
    title: "Diseño de Interiores",
    desc: "Materiales, acabados, iluminación y atmósfera con estándar premium, coherentes con la marca y con la experiencia del espacio.",
    image: img("kampai", 0),
  },
  {
    title: "Remodelación y Adecuaciones",
    desc: "Renovación que optimiza lo que ya funciona, sin perder control ni coherencia, para dar un nuevo paso al espacio existente.",
    image: img("cafe-laurel", 0),
  },
  {
    title: "Project Management de Obra",
    desc: "Administración, supervisión, coordinación y gestión de obra para entregar en tiempo y presupuesto, listo para operar.",
    image: img("oficinas-majadma", 1),
  },
  {
    title: "Diseño de Mobiliario a Medida",
    desc: "Piezas y carpinterías especiales, diseñadas y ejecutadas a la medida del concepto de cada espacio.",
    image: img("nailz", 0),
  },
  {
    title: "Análisis Arquitectónico",
    desc: "Evaluación del inmueble para anticipar implicaciones, alcances y costos, y tomar decisiones con claridad desde el inicio.",
    image: img("valle-alto-club-de-golf", 0),
  },
];

const DEFAULT_HEADING = "Un Servicio Integral: del Diseño a la Obra";
const DEFAULT_INTRO =
  "Contigo en cada etapa: nos encargamos de todo el proceso —diseño arquitectónico, diseño de interiores, remodelación, ejecución y coordinación— bajo un mismo estándar de calidad.";

export interface IntegralSectionProps {
  /** H2 copy. */
  heading?: string;
  /** Supporting paragraph under the H2. */
  intro?: string;
  /** Tabs (title + desc + image). H3 titles are preserved for SEO. */
  items?: Capability[];
  /** Section anchor id. */
  id?: string;
  /** Background tone. Default "mist" (home). Use "white" to keep contrast. */
  tone?: "mist" | "white";
}

/**
 * Servicio Integral — tabs that advance as you scroll (the section pins and each
 * item takes over in turn). Reduced motion / mobile fall back to click. The H2
 * and every H3 tab title are real headings (SEO). Reusable via props.
 */
export function IntegralSection({
  heading = DEFAULT_HEADING,
  intro = DEFAULT_INTRO,
  items = DEFAULT_ITEMS,
  id = "servicio-integral",
  tone = "mist",
}: IntegralSectionProps = {}) {
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const stRef = useRef<ScrollTrigger | null>(null);

  useGSAP(
    () => {
      const tabs = tabsRef.current;
      if (!tabs) return;
      const mm = gsap.matchMedia();
      // Scroll-driven only on desktop with motion allowed.
      mm.add("(min-width: 861px) and (prefers-reduced-motion: no-preference)", () => {
        let cur = 0;
        const st = ScrollTrigger.create({
          trigger: tabs,
          start: "top 14%",
          end: "+=" + items.length * 34 + "%",
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = Math.min(items.length - 1, Math.floor(self.progress * items.length));
            if (idx !== cur) {
              cur = idx;
              setActive(idx);
            }
          },
        });
        stRef.current = st;
        return () => {
          stRef.current = null;
          st.kill();
        };
      });
    },
    { scope: rootRef },
  );

  // Click a tab: on desktop scroll to its slice; otherwise just select it.
  const goTo = (i: number) => {
    const st = stRef.current;
    if (st) {
      const y = st.start + ((i + 0.5) / items.length) * (st.end - st.start);
      window.scrollTo({ top: y, behavior: "smooth" });
    } else {
      setActive(i);
    }
  };

  return (
    <section
      ref={rootRef}
      id={id}
      className={`${shared.section} ${tone === "mist" ? shared.sectionMist : ""}`}
    >
      <div className={shared.wrap}>
        <div className={styles.head}>
          <RevealLines as="h2" className={shared.h2}>
            {heading}
          </RevealLines>
          <p className={`${shared.body} ${styles.headBody}`}>{intro}</p>
        </div>

        <div ref={tabsRef} className={styles.tabs}>
          <ul className={styles.list} role="tablist" aria-label={heading}>
            {items.map((c, i) => (
              <li key={c.title}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={active === i}
                  className={`${styles.tab} ${active === i ? styles.tabActive : ""}`}
                  onClick={() => goTo(i)}
                >
                  <span className={styles.tabNum}>{String(i + 1).padStart(2, "0")}</span>
                  <h3 className={styles.tabTitle}>{c.title}</h3>
                </button>
              </li>
            ))}
          </ul>

          <div className={styles.panel}>
            <div className={styles.panelImg}>
              {items.map((c, i) => (
                <Image
                  key={c.title}
                  src={c.image}
                  alt={c.title}
                  fill
                  placeholder="blur"
                  sizes="(max-width: 860px) 100vw, 55vw"
                  style={{ objectFit: "cover", opacity: active === i ? 1 : 0 }}
                  className={styles.panelImgEl}
                />
              ))}
              <span className={styles.panelCount}>
                {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
              </span>
            </div>
            <p key={active} className={styles.panelDesc}>
              {items[active].desc}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
