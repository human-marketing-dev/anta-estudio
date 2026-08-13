import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { projects } from "@/lib/projects";

// Static routes (folder-based). Kept explicit so the sitemap is auditable.
const STATIC_ROUTES = [
  "/",
  "/proyectos",
  "/contacto",
  "/servicios/arquitectura-comercial",
  "/servicios/arquitectura-corporativa",
  "/servicios/arquitectura-residencial",
  "/interiorismo",
  "/interiorismo/diseno-de-oficinas",
  "/interiorismo/diseno-de-restaurantes",
  "/interiorismo/diseno-de-interiores-casas",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = STATIC_ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
  }));

  const projectEntries = projects.map((p) => ({
    url: `${SITE_URL}/proyectos/${p.slug}`,
  }));

  return [...staticEntries, ...projectEntries];
}
