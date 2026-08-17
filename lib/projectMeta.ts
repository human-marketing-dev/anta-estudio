/**
 * Ficha técnica por proyecto (mantenido a mano). Se llena conforme haya datos;
 * los campos ausentes muestran un placeholder en la UI.
 *
 * Ejemplo:
 *   "oh-darling": {
 *     uso: "Comercial",
 *     servicio: { label: "Arquitectura e Interiorismo Comercial", href: "/servicios/arquitectura-comercial" },
 *     ubicacion: "Monterrey, Nuevo León",
 *     alcance: "Diseño y ejecución",
 *     superficie: "150 m²",
 *     colaboracion: "LOL Arquitectura",
 *   },
 */
export interface ProjectMeta {
  /** Comercial · Corporativo · Residencial (exactamente estas tres, para filtrar). */
  uso?: "Comercial" | "Corporativo" | "Residencial";
  /** Nombre completo del servicio + su service page. */
  servicio?: { label: string; href: string };
  /** "Ciudad, Estado" — ej. "Monterrey, Nuevo León". */
  ubicacion?: string;
  alcance?: "Diseño" | "Diseño y ejecución" | "Ejecución";
  /** Con espacio y ² real — ej. "150 m²". */
  superficie?: string;
  /** Opcional — solo cuando aplica. Ej. "LOL Arquitectura". */
  colaboracion?: string;
}

const COMERCIAL = { label: "Arquitectura e Interiorismo Comercial", href: "/servicios/arquitectura-comercial" };
const CORPORATIVO = { label: "Arquitectura e Interiorismo Corporativo", href: "/servicios/arquitectura-corporativa" };

export const projectMeta: Record<string, ProjectMeta> = {
  // Corporativo
  "tp-zentralia": { uso: "Corporativo", servicio: CORPORATIVO },
  "oficinas-majadma": { uso: "Corporativo", servicio: CORPORATIVO },
  "ludoteca-valle-alto": { uso: "Corporativo", servicio: CORPORATIVO },
  "edificio-vh": { uso: "Corporativo", servicio: CORPORATIVO },
  "valle-alto-club-de-golf": { uso: "Corporativo", servicio: CORPORATIVO },
  "e-80": { uso: "Corporativo", servicio: CORPORATIVO },
  // Comercial
  "terraza-pangea": { uso: "Comercial", servicio: COMERCIAL },
  kampai: { uso: "Comercial", servicio: COMERCIAL },
  nailz: { uso: "Comercial", servicio: COMERCIAL },
  "crispy-pollo": { uso: "Comercial", servicio: COMERCIAL },
  "cafe-laurel": { uso: "Comercial", servicio: COMERCIAL },
  "valle-alto-club-de-golf-gimnasio": { uso: "Comercial", servicio: COMERCIAL },
};

export function getProjectMeta(slug: string): ProjectMeta {
  return projectMeta[slug] ?? {};
}
