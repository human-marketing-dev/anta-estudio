import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/Button";
import { projects, getProject, getNextProject } from "@/lib/projects";
import styles from "./detail.module.css";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.nombre} | Proyectos | Anta Estudio`,
    description: `${project.nombre} — proyecto de arquitectura e interiorismo de Anta Estudio en Monterrey.`,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const next = getNextProject(slug);
  const images = [project.cover, ...project.galeria];

  return (
    <>
      <NavBar theme="light" cta="Solicitar propuesta" />

      <main>
        <header className={styles.head}>
          <Link href="/proyectos" className={styles.back}>
            ← Proyectos
          </Link>
          <h1 className={styles.title}>{project.nombre}</h1>
        </header>

        <section className={styles.gallery}>
          {images.map((img, i) => (
            <div key={i} className={styles.item}>
              <Image
                src={img}
                alt={`${project.nombre} — fotografía ${i + 1}`}
                placeholder="blur"
                sizes="(max-width: 860px) 100vw, 50vw"
                style={{ width: "100%", height: "auto" }}
                priority={i === 0}
              />
            </div>
          ))}
        </section>

        <section className={styles.next}>
          <div className={styles.nextInner}>
            <div>
              <span className={styles.nextLabel}>Siguiente proyecto</span>
              <div className={styles.nextName}>{next.nombre} →</div>
            </div>
            <div className={styles.nextActions}>
              <Button as="a" href={`/proyectos/${next.slug}`} variant="outline">
                Ver siguiente
              </Button>
              <Button as="a" href="/">
                Volver al inicio
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
