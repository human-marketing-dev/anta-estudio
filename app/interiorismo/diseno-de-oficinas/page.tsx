import type { Metadata } from "next";
import Link from "next/link";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/Button";
import { WhatsAppIcon, Arrow } from "@/components/site";
import { RevealLines, StaggerReveal, ParallaxImage, ProcessTimeline } from "@/components/anim";
import { ProjectTile } from "@/components/ProjectTile";
import { IntegralSection } from "@/components/home/IntegralSection";
import { ClientsSection } from "@/components/home/ClientsSection";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { ClosingCta } from "@/components/home/ClosingCta";
import { getProject, type Project } from "@/lib/projects";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbList } from "@/lib/seo";
import shared from "@/components/home/home.module.css";
// Same design as the service pages — reuse the module so they stay in sync.
import styles from "../../servicios/arquitectura-comercial/arquitectura-comercial.module.css";

export const metadata: Metadata = {
  title: "Diseño de Oficinas e Interiorismo Corporativo | Anta Estudio",
  description:
    "Diseño de oficinas e interiorismo corporativo en Monterrey. Layout, materialidad y mobiliario para espacios de trabajo que reflejan tu marca. +15 años de experiencia.",
};

const navLinks = [
  { label: "Nosotros", href: "/#nosotros" },
  { label: "Proyectos", href: "/proyectos" },
  { label: "Servicios", href: "/#servicios" },
  { label: "Contacto", href: "/contacto" },
];

const perfiles = [
  { title: "Empresas que se mudan a un nuevo espacio", desc: "Tienen la oficina y necesitan definir cómo distribuirla y darle carácter." },
  { title: "Marcas que quieren elevar su percepción", desc: "Buscan que el espacio comunique solidez y profesionalismo a clientes y talento." },
  { title: "Equipos que necesitan más eficiencia", desc: "Quieren optimizar el layout, los flujos y las áreas clave del día a día." },
  { title: "Oficinas que necesitan una renovación", desc: "Quieren actualizar imagen y funcionalidad sin empezar de cero." },
];

// Line icons per profile (outline, inherit color from .perfilIcon → pink).
const svgProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};
const perfilIconos = [
  // Nuevo espacio — building
  <svg key="nuevo" {...svgProps}>
    <path d="M4 3h10v18H4z" />
    <path d="M14 8h6v13h-6" />
    <path d="M7 7h4M7 11h4M7 15h4" />
  </svg>,
  // Percepción — sparkle
  <svg key="percepcion" {...svgProps}>
    <path d="M12 3c.6 4 1.9 5.4 6 6-4.1.6-5.4 2-6 6-.6-4-1.9-5.4-6-6 4.1-.6 5.4-2 6-6Z" />
  </svg>,
  // Eficiencia — floor plan / layout
  <svg key="eficiencia" {...svgProps}>
    <path d="M4 4h16v16H4z" />
    <path d="M4 10h16" />
    <path d="M11 10v10" />
  </svg>,
  // Renovación — refresh
  <svg key="renovar" {...svgProps}>
    <polyline points="21 4 21 9 16 9" />
    <polyline points="3 20 3 15 8 15" />
    <path d="M19.5 9A8 8 0 0 0 6 5.7L3 9m18 6-3 3.3A8 8 0 0 1 4.5 15" />
  </svg>,
];

const pasos = [
  { title: "Diagnóstico y objetivos", desc: "Entendemos cómo trabaja tu equipo, qué necesita el espacio y qué quieres proyectar." },
  { title: "Concepto y anteproyecto", desc: "Definimos la dirección estética y el layout de la oficina." },
  { title: "Alcance y especificaciones", desc: "Aterrizamos materiales, acabados, iluminación y mobiliario." },
  { title: "Presupuesto y calendario", desc: "Presentamos un presupuesto preciso y tiempos realistas." },
  { title: "Ejecución, supervisión y entrega", desc: "Coordinamos la implementación de principio a fin y entregamos listo para usar." },
];

const pic = (slug: string, i = 0) => {
  const p = getProject(slug)!;
  return p.galeria[i] ?? p.cover;
};

const alcances = [
  { title: "Layout y Distribución", desc: "Organización de áreas, estaciones de trabajo y flujos según la operación de tu empresa.", image: pic("majadma", 0) },
  { title: "Diseño de Interiores de Oficinas", desc: "Materiales, acabados, color e iluminación que dan carácter y confort al espacio.", image: pic("e-80", 0) },
  { title: "Áreas Comunes y Salas de Juntas", desc: "Espacios de reunión, colaboración y recepción que reflejan profesionalismo.", image: pic("tp-zentralia", 0) },
  { title: "Mobiliario a Medida", desc: "Piezas y carpinterías especiales diseñadas para el espacio y la forma de trabajar del equipo.", image: pic("valle-alto-club-de-golf-areas-comunes", 0) },
  { title: "Diseño de Oficinas Modernas", desc: "Propuestas contemporáneas que equilibran estética, funcionalidad y durabilidad.", image: pic("e-80", 1) },
  { title: "Implementación y Coordinación", desc: "Supervisión de proveedores y seguimiento en sitio para que el diseño se ejecute tal como se planeó.", image: pic("majadma", 1) },
];

const diferenciadores = [
  { title: "Diseño + ejecución", desc: "Un solo estándar de principio a fin, sin fragmentar responsabilidades." },
  { title: "Planeación y precisión", desc: "Claridad de alcances que permite presupuestos precisos." },
  { title: "Enfoque premium", desc: "Detalle, materialidad y coherencia estética." },
  { title: "Coordinación integral", desc: "Menos fricción entre proveedores, más control de tiempos y calidad." },
];

const subInk = { color: "var(--anta-ink-30)" };

export default function DisenoDeOficinasPage() {
  const heroImg = getProject("majadma")!.cover;
  const queEsImg = getProject("e-80")!.cover;
  const nosotrosImg = getProject("tp-zentralia")!.cover;
  const proyectos = ["e-80", "valle-alto-club-de-golf-areas-comunes", "majadma", "tp-zentralia"].flatMap((s) => {
    const p = getProject(s);
    return p ? [p as Project] : [];
  });

  return (
    <>
      <JsonLd
        data={breadcrumbList([
          { name: "Inicio", path: "/" },
          { name: "Interiorismo", path: "/interiorismo" },
          { name: "Diseño de Oficinas", path: "/interiorismo/diseno-de-oficinas" },
        ])}
      />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 20 }}>
        <NavBar theme="dark" links={navLinks} cta="Solicitar propuesta" />
      </div>

      {/* 1 · HERO */}
      <header className={styles.hero}>
        <ParallaxImage src={heroImg} alt="Oficina — diseño e interiorismo de Anta Estudio" priority sizes="100vw" className={styles.heroMedia} />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <RevealLines as="h1" className={styles.heroTitle}>
            Diseño de Oficinas e Interiorismo Corporativo
          </RevealLines>
          <StaggerReveal>
            <p className={styles.heroSub}>
              Diseñamos oficinas que reflejan la identidad de tu empresa y hacen más fácil el día a
              día del equipo. Layout, materialidad, iluminación y detalle pensados para trabajar
              mejor. Más de 15 años de experiencia en Monterrey.
            </p>
            <div className={styles.ctas}>
              <Button as="a" href="/contacto">
                Solicitar propuesta
              </Button>
              <Button as="a" href="https://wa.me/528100000000" variant="outline" style={{ borderColor: "#fff", color: "#fff" }}>
                <WhatsAppIcon />
                Hablar por WhatsApp
              </Button>
            </div>
          </StaggerReveal>
        </div>
      </header>

      {/* 2 · ¿QUÉ ES? */}
      <section className={shared.section}>
        <div className={styles.queEs}>
          <div className={styles.queEsText}>
            <p className={styles.eyebrow}>
              <span className={styles.eyebrowTick} />
              Diseño e interiorismo de oficinas
            </p>
            <RevealLines as="h2" className={shared.h2}>
              ¿Qué es el Diseño de Oficinas?
            </RevealLines>
            <p className={`${shared.body} ${styles.lead}`}>
              El diseño de oficinas es la disciplina que organiza y da carácter al espacio de trabajo.
              Define cómo se distribuyen las áreas, cómo circula la gente, qué materiales y qué luz
              acompañan cada zona, y cómo todo eso comunica la identidad de la empresa. Un buen diseño
              de oficinas no solo se ve bien: hace que el equipo trabaje con más comodidad y que quien
              te visita entienda quién eres.
            </p>
            <p className={`${shared.body} ${styles.leadBody}`}>
              En Anta Estudio trabajamos el interiorismo corporativo con criterio arquitectónico: cada
              decisión de layout, acabado o mobiliario responde a la forma en que tu empresa opera y a
              la imagen que quiere proyectar.
            </p>
            <p className={`${shared.body} ${styles.leadBody}`}>
              ¿Tu proyecto incluye obra y remodelación completa?{" "}
              <Link href="/servicios/arquitectura-corporativa" style={{ color: "var(--anta-pink)", fontWeight: 600, textDecoration: "none" }}>
                Conoce nuestro servicio de Arquitectura Corporativa →
              </Link>
            </p>
          </div>

          <div className={styles.queEsMedia}>
            <ParallaxImage
              src={queEsImg}
              alt="Interiorismo de oficinas de Anta Estudio"
              className={styles.queEsImg}
              sizes="(max-width: 860px) 100vw, 50vw"
            />
            <span className={styles.composeTag}>+15 años</span>
          </div>
        </div>
      </section>

      {/* 3 · ¿PARA QUIÉN? */}
      <section className={`${shared.section} ${shared.sectionMist}`}>
        <div className={shared.wrap}>
          <div className={styles.perfilSplit}>
            <div className={styles.perfilAside}>
              <RevealLines as="h2" className={shared.h2}>
                ¿Para quién es este servicio?
              </RevealLines>
              <p className={`${shared.body} ${styles.perfilIntro}`}>
                Pensado para quienes ya tienen el espacio y necesitan resolverlo: empresas que se
                mudan, marcas que quieren elevar su percepción y equipos que buscan más eficiencia.
              </p>
            </div>
            <StaggerReveal
              as="ul"
              className={styles.perfilStack}
              childSelector={`.${styles.perfilItem}`}
              stagger={0.08}
              start="top 82%"
            >
              {perfiles.map((p, i) => (
                <li key={p.title} className={styles.perfilItem}>
                  <span className={styles.perfilIcon} aria-hidden="true">
                    {perfilIconos[i]}
                  </span>
                  <div className={styles.perfilBody}>
                    <h3 className={styles.perfilItemTitle}>{p.title}</h3>
                    <p className={styles.perfilItemDesc}>{p.desc}</p>
                  </div>
                </li>
              ))}
            </StaggerReveal>
          </div>
        </div>
      </section>

      {/* 4 · OFICINAS QUE HEMOS DISEÑADO */}
      <section className={shared.section}>
        <div className={shared.wrap}>
          <div className={styles.headRow}>
            <div className={styles.headText}>
              <RevealLines as="h2" className={shared.h2}>
                Oficinas que Hemos Diseñado
              </RevealLines>
              <p className={`${shared.sub} ${styles.headSub}`}>
                Una selección de espacios de trabajo donde el layout, los materiales y el detalle se
                alinean con la identidad de cada empresa.
              </p>
            </div>
            <Link href="/proyectos" className={shared.link}>
              Ver más proyectos corporativos
              <span className={shared.arrow}>
                <Arrow s={15} />
              </span>
            </Link>
          </div>
        </div>
        <div className={styles.projectsGrid}>
          {proyectos.map((p) => (
            <ProjectTile key={p.slug} project={p} />
          ))}
        </div>
      </section>

      {/* 5 · NUESTRO PROCESO */}
      <section className={`${shared.section} ${shared.sectionInk}`}>
        <div className={shared.wrap}>
          <div className={styles.headText}>
            <RevealLines as="h2" className={shared.h2}>
              Nuestro Proceso
            </RevealLines>
            <p className={`${shared.sub} ${styles.headSub}`} style={subInk}>
              Un proceso claro para alinear expectativas, definir alcances y ejecutar con control.
            </p>
          </div>
          <div className={styles.listWrap}>
            <ProcessTimeline steps={pasos} />
          </div>
        </div>
      </section>

      {/* 6 · ALCANCE DEL SERVICIO */}
      <IntegralSection
        id="alcance"
        tone="white"
        heading="Alcance del Servicio"
        intro="Contigo en cada etapa: nos encargamos de todo lo que el diseño de tu oficina necesita, bajo un mismo estándar de calidad."
        items={alcances}
      />

      {/* 7 · POR QUÉ ANTA ESTUDIO */}
      <section className={`${shared.section} ${shared.sectionMist}`}>
        <div className={shared.wrap}>
          <div className={styles.headText}>
            <RevealLines as="h2" className={shared.h2}>
              Por qué Anta Estudio
            </RevealLines>
            <p className={`${shared.sub} ${styles.headSub}`}>
              Por qué las empresas nos eligen para diseñar sus oficinas.
            </p>
          </div>
          <StaggerReveal className={styles.whyStrip} childSelector={`.${styles.whyItem}`} stagger={0.1}>
            {diferenciadores.map((d) => (
              <div key={d.title} className={styles.whyItem}>
                <span className={styles.whyDash} aria-hidden="true" />
                <span className={styles.whyTitle}>{d.title}</span>
                <p className={styles.whyDesc}>{d.desc}</p>
              </div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* 8 · SOBRE NOSOTROS */}
      <section className={shared.section}>
        <div className={styles.queEsRev}>
          <div className={styles.queEsMedia}>
            <ParallaxImage
              src={nosotrosImg}
              alt="Oficina diseñada por Anta Estudio"
              className={styles.queEsImg}
              sizes="(max-width: 860px) 100vw, 50vw"
            />
          </div>
          <div className={styles.queEsText}>
            <RevealLines as="h2" className={shared.h2}>
              Sobre Nosotros
            </RevealLines>
            <RevealLines as="h3" className={`${shared.h3big} ${styles.aboutSub}`}>
              Un despacho de arquitectura e interiorismo con más de 15 años de experiencia
            </RevealLines>
            <p className={`${shared.body} ${styles.aboutBody}`}>
              Somos un equipo de arquitectos en Monterrey especializado en el diseño de espacios que
              funcionan, comunican y perduran. Durante más de 15 años hemos desarrollado proyectos
              corporativos, comerciales y residenciales, con una misma forma de trabajar: entender
              primero cómo se usa el espacio y después darle forma. En el diseño de oficinas, esto
              significa lugares de trabajo cómodos, coherentes con la marca y pensados para durar.
            </p>
          </div>
        </div>
      </section>

      {/* 9 · NUESTROS CLIENTES */}
      <ClientsSection />

      {/* 10 · RESEÑAS */}
      <ReviewsSection />

      {/* 11 · CTA DE CIERRE */}
      <ClosingCta
        title="¿Buscas Diseño de Oficinas en Monterrey?"
        body="Nos encantaría conocer tu proyecto. En Anta Estudio combinamos diseño, criterio arquitectónico y más de 15 años de experiencia para crear oficinas que reflejan tu marca y hacen mejor el día a día de tu equipo."
      />

      <Footer />
    </>
  );
}
