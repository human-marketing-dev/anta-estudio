import type { Metadata } from "next";
import { ViewTransition } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/Button";
import { HorizontalGallery } from "@/components/HorizontalGallery";
import { AboutStudio } from "@/components/AboutStudio";
import { ClientsSection } from "@/components/home/ClientsSection";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { ClosingCta } from "@/components/home/ClosingCta";
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
    <ViewTransition enter="slide-in-right" exit="slide-out-right" default="none">
      <NavBar theme="light" cta="Solicitar propuesta" />

      <main>
        <header className={styles.head}>
          <Link href="/proyectos" className={styles.back}>
            ← Proyectos
          </Link>
          <h1 className={styles.title}>{project.nombre}</h1>
        </header>

        <HorizontalGallery images={images} alt={project.nombre} />

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

      <AboutStudio />
      <ClientsSection />
      <ReviewsSection />
      <ClosingCta />

      <Footer />
    </ViewTransition>
  );
}
