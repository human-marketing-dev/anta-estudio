import type { Metadata } from "next";
import { SITE_URL, CONTACT } from "./site";

/** Build a schema.org BreadcrumbList from an ordered list of crumbs. */
export function breadcrumbList(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path}`,
    })),
  };
}

/**
 * Organization + LocalBusiness del despacho. Se inyecta una vez en el layout.
 * `geo` y el horario vienen del schema del sitio anterior. name/address/
 * telephone deben coincidir con el perfil de Google Business.
 */
export function businessLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    "@id": `${SITE_URL}/#business`,
    name: CONTACT.nombre,
    url: SITE_URL,
    email: CONTACT.correo,
    telephone: `+${CONTACT.telefono}`,
    image: `${SITE_URL}/anta-logo.webp`,
    logo: `${SITE_URL}/anta-logo.webp`,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${CONTACT.direccion.calle}, ${CONTACT.direccion.colonia}`,
      addressLocality: CONTACT.direccion.ciudad,
      addressRegion: "Nuevo León",
      postalCode: CONTACT.direccion.cp,
      addressCountry: "MX",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 25.65319,
      longitude: -100.37931,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "10:00",
        closes: "19:00",
      },
    ],
    areaServed: "Monterrey",
    sameAs: [CONTACT.instagram],
    founder: [
      { "@type": "Person", name: "Janeth Galindo Páez", jobTitle: "Dirección de Ejecución de Proyectos" },
      { "@type": "Person", name: "Jessica González Cavazos", jobTitle: "Dirección de Diseño de Proyectos" },
    ],
  };
}

const DEFAULT_OG = "/og.jpg";

interface PageMetaInput {
  title: string;
  description: string;
  /** Ruta absoluta del sitio (relativa al dominio), ej. "/proyectos". */
  path: string;
  /** Imagen OG específica (ej. portada de proyecto). Default: /og.jpg. */
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
}

/**
 * Metadata consistente por página: canonical + Open Graph + Twitter card.
 * `path` es relativa; `metadataBase` (SITE_URL) la vuelve absoluta.
 */
export function buildMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG,
  imageWidth = 1200,
  imageHeight = 630,
}: PageMetaInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: "Anta Estudio",
      locale: "es_MX",
      url: path,
      title,
      description,
      images: [{ url: image, width: imageWidth, height: imageHeight, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
