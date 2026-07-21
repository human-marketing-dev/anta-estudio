"use client";

import Image from "next/image";
import Link from "next/link";
import { RevealLines, MaskReveal } from "@/components/anim";
import { Arrow } from "@/components/site";
import shared from "./home.module.css";
import styles from "./ProjectsSection.module.css";

const projects = [
  { category: "Comercial", title: "Café Nogal", place: "San Pedro, N.L.", slug: "cafe-nogal" },
  { category: "Residencial", title: "Casa Sierra", place: "Monterrey, N.L.", slug: "casa-sierra" },
  { category: "Corporativo", title: "Oficinas Lumen", place: "San Pedro, N.L.", slug: "oficinas-lumen" },
];

/** Section 3 · Proyectos Recientes. Card titles are spans, not headings (SEO). */
export function ProjectsSection() {
  return (
    <section id="proyectos" className={`${shared.section} ${shared.sectionMist}`}>
      <div className={shared.wrap}>
        <div className={styles.head}>
          <div>
            <RevealLines as="h2" className={shared.h2}>
              Proyectos Recientes
            </RevealLines>
            <p className={`${shared.sub} ${styles.headSub}`}>
              Una selección de proyectos donde el diseño, los materiales y la ejecución se alinean
              con la marca y la experiencia. Explora nuestro trabajo en espacios comerciales,
              corporativos y residenciales.
            </p>
          </div>
          <Link href="/proyectos" className={`${shared.link} ${styles.headLink}`}>
            Ver portafolio completo
            <span className={shared.arrow}>
              <Arrow s={15} />
            </span>
          </Link>
        </div>

        <div className={styles.grid}>
          {projects.map((p, i) => (
            <article key={p.slug} className={styles.card}>
              <Link href={`/proyectos/${p.slug}`} className={styles.cardLink}>
                <MaskReveal variant="clip" direction="up" delay={i * 0.08} className={styles.frame}>
                  <span className={styles.imgScale}>
                    <Image
                      src="/placeholder/frame-4x5.svg"
                      alt={`${p.title} — ${p.category}`}
                      fill
                      unoptimized
                      sizes="(max-width: 860px) 100vw, 33vw"
                      style={{ objectFit: "cover" }}
                    />
                  </span>
                </MaskReveal>
                <div className={styles.meta}>
                  <span className={styles.cat}>{p.category}</span>
                  <span className={styles.title}>{p.title}</span>
                  <span className={styles.place}>{p.place}</span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
