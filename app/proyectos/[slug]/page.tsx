import type { Metadata } from "next";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { SectionLabel } from "@/components/SectionLabel";
import { Tag } from "@/components/Tag";
import { Button } from "@/components/Button";
import { Divider } from "@/components/Divider";
import { Photo } from "@/components/site";

type Project = {
  label: string;
  title: string;
  tags: { text: string; tone?: "ink" | "accent" }[];
  facts: [string, string][];
  heading: string;
  narrative: string;
  next: { title: string; slug: string };
};

const PROJECTS: Record<string, Project> = {
  "casa-sierra": {
    label: "Residencial · 2025",
    title: "Casa Sierra",
    tags: [
      { text: "Arquitectura" },
      { text: "Interiores" },
      { text: "San Pedro, N.L.", tone: "accent" },
    ],
    facts: [
      ["Ubicación", "San Pedro, N.L."],
      ["Superficie", "420 m²"],
      ["Año", "2025"],
      ["Servicios", "Arquitectura, Interiores"],
    ],
    heading: "Una casa que respira con la sierra.",
    narrative:
      "El proyecto ordena los espacios alrededor de un patio central que introduce luz natural a lo largo del día. Los materiales — concreto, madera y piedra local — se dejan expuestos para dialogar con el paisaje. Cada vano enmarca una vista específica hacia la Sierra Madre.",
    next: { title: "Café Nogal", slug: "cafe-nogal" },
  },
  "cafe-nogal": {
    label: "Comercial · 2024",
    title: "Café Nogal",
    tags: [
      { text: "Arquitectura" },
      { text: "Interiores" },
      { text: "San Pedro, N.L.", tone: "accent" },
    ],
    facts: [
      ["Ubicación", "San Pedro, N.L."],
      ["Superficie", "180 m²"],
      ["Año", "2024"],
      ["Servicios", "Interiorismo, Mobiliario"],
    ],
    heading: "Un café que representa su marca.",
    narrative:
      "El local traduce la identidad de la marca en una atmósfera cálida y ordenada. La distribución acompaña la operación diaria, mientras que materiales, iluminación y mobiliario a medida construyen una experiencia coherente para el cliente.",
    next: { title: "Oficinas Lumen", slug: "oficinas-lumen" },
  },
  "oficinas-lumen": {
    label: "Corporativo · 2024",
    title: "Oficinas Lumen",
    tags: [
      { text: "Arquitectura" },
      { text: "Corporativo" },
      { text: "San Pedro, N.L.", tone: "accent" },
    ],
    facts: [
      ["Ubicación", "San Pedro, N.L."],
      ["Superficie", "640 m²"],
      ["Año", "2024"],
      ["Servicios", "Diseño de oficinas, Obra"],
    ],
    heading: "Un espacio de trabajo con identidad.",
    narrative:
      "El proyecto reconfigura la planta para fortalecer la cultura del equipo y la eficiencia operativa. Las áreas comunes, la iluminación y los acabados traducen la identidad corporativa en un ambiente funcional y representativo.",
    next: { title: "Casa Sierra", slug: "casa-sierra" },
  },
};

const titleize = (slug: string) =>
  slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

function getProject(slug: string): Project {
  return (
    PROJECTS[slug] ?? {
      label: "Proyecto",
      title: titleize(slug),
      tags: [{ text: "Arquitectura" }, { text: "Interiores" }],
      facts: [
        ["Ubicación", "Monterrey, N.L."],
        ["Año", "2025"],
      ],
      heading: "Un proyecto de Anta Estudio.",
      narrative:
        "Detalle de proyecto en preparación. Las imágenes y la ficha técnica serán provistas por el cliente.",
      next: { title: "Casa Sierra", slug: "casa-sierra" },
    }
  );
}

export function generateStaticParams() {
  return Object.keys(PROJECTS).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  return {
    title: `${p.title} — Anta Estudio`,
    description: p.heading,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getProject(slug);

  return (
    <div>
      <NavBar theme="light" cta="Solicitar propuesta" />

      <section style={{ background: "var(--anta-white)", padding: "80px 48px 56px" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <SectionLabel>{p.label}</SectionLabel>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 300,
              fontSize: 78.54,
              lineHeight: 1.2,
              letterSpacing: "-1.5px",
              margin: "20px 0 0",
            }}
          >
            {p.title}
          </h1>
          <div style={{ display: "flex", gap: 12, marginTop: 24, flexWrap: "wrap" }}>
            {p.tags.map((t) => (
              <Tag key={t.text} tone={t.tone ?? "ink"}>
                {t.text}
              </Tag>
            ))}
          </div>
        </div>
      </section>

      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 48px" }}>
        <Photo ratio="16 / 8" label="Fotografía principal" />
      </div>

      <section style={{ background: "var(--anta-white)", padding: "96px 48px" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 96, alignItems: "start" }}>
            <div>
              <span
                style={{
                  fontFamily: "var(--font-text)",
                  fontSize: 13,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  color: "var(--anta-ink-50)",
                }}
              >
                El proyecto
              </span>
              <Divider tone="strong" style={{ margin: "20px 0" }} />
              <dl
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "20px 16px",
                  margin: 0,
                  fontFamily: "var(--font-text)",
                }}
              >
                {p.facts.map(([k, v]) => (
                  <div key={k}>
                    <dt
                      style={{
                        fontSize: 12,
                        letterSpacing: "1px",
                        textTransform: "uppercase",
                        color: "var(--anta-ink-50)",
                      }}
                    >
                      {k}
                    </dt>
                    <dd style={{ margin: "6px 0 0", fontSize: 15, color: "var(--anta-ink)" }}>{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 300,
                  fontSize: 44.2,
                  lineHeight: 1.2,
                  letterSpacing: "-0.5px",
                  margin: "0 0 24px",
                }}
              >
                {p.heading}
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-text)",
                  fontSize: 16,
                  lineHeight: 1.5,
                  letterSpacing: "0.5px",
                  color: "var(--anta-ink-70)",
                  margin: 0,
                }}
              >
                {p.narrative}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div
        style={{
          maxWidth: 1320,
          margin: "0 auto",
          padding: "0 48px 96px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 32,
        }}
      >
        <Photo ratio="4 / 3" label="Interior" />
        <Photo ratio="4 / 3" label="Patio central" />
        <Photo ratio="16 / 7" label="Fachada" style={{ gridColumn: "1 / -1" }} />
      </div>

      <section style={{ background: "var(--anta-mist)", padding: "80px 48px" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 32,
              flexWrap: "wrap",
            }}
          >
            <div>
              <span
                style={{
                  fontFamily: "var(--font-text)",
                  fontSize: 12,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  color: "var(--anta-ink-50)",
                }}
              >
                Siguiente proyecto
              </span>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: 44.2, lineHeight: 1.2, marginTop: 10 }}>
                {p.next.title} →
              </div>
            </div>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Button as="a" href={`/proyectos/${p.next.slug}`} variant="outline">
                Ver siguiente
              </Button>
              <Button as="a" href="/">
                Volver al inicio
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
