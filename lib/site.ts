// Single source of truth for the production origin. Read by sitemap.ts,
// robots.ts, layout metadataBase y el structured data JSON-LD.
export const SITE_URL = "https://antaestudio.com";

// Datos de contacto — fuente única (footer, contacto, JSON-LD).
export const CONTACT = {
  nombre: "Anta Estudio",
  telefono: "528136091999", // E.164 sin "+"
  telefonoDisplay: "+52 81 3609 1999",
  whatsapp: "https://wa.me/528136091999",
  correo: "info@antaestudio.com",
  instagram: "https://www.instagram.com/antaestudio.arq/",
  instagramHandle: "@antaestudio.arq",
  direccion: {
    calle: "Av. José Vasconcelos 430",
    colonia: "Del Valle",
    cp: "66220",
    ciudad: "San Pedro Garza García",
    estado: "N.L.",
    // Línea completa para mostrar.
    completa: "Av. José Vasconcelos 430, Del Valle, 66220 San Pedro Garza García, N.L.",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Av.%20Jos%C3%A9%20Vasconcelos%20430%2C%20Del%20Valle%2C%2066220%20San%20Pedro%20Garza%20Garc%C3%ADa%2C%20N.L.",
  },
} as const;
