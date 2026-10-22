/** Canonical site identity used for meta tags, sitemap URLs, and JSON-LD. */
export const SITE_NAME = "BelTech Solutions";
export const SITE_TAGLINE = "ERP Implementer | Software Developer | Automation Specialist";

/** Override in .env with the live marketing domain (no trailing slash). */
export const SITE_URL = (
  import.meta.env.VITE_SITE_URL || "https://beltechsolns.et"
).replace(/\/$/, "");

export const SITE_LOCALE = "en";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.jpg`;

export const COMPANY = {
  legalName: "BelTech Solutions",
  foundingDate: "2024",
  description:
    "BelTech Solutions implements Odoo and ERPNext, trains company teams, and builds automation and custom software for businesses in Ethiopia and across Africa.",
  email: "beltechsolns@gmail.com",
  telephone: ["+251955935455", "+251932058398"],
  whatsapp: "https://wa.me/251955935455",
  address: {
    addressLocality: "Addis Ababa",
    addressRegion: "Addis Ababa",
    addressCountry: "ET",
  },
  areaServed: ["Ethiopia", "Africa"],
  sameAs: [
    "https://www.linkedin.com/company/beltech-solution/",
    "https://t.me/belTechSolns",
    "https://www.youtube.com/@BeltechSolns",
    "https://wa.me/251955935455",
  ],
  demoUrl: "https://beltech-erp.blsglob.com/",
} as const;

export type PageSeo = {
  title: string;
  description: string;
  path: string;
  /** Relative to SITE_URL, e.g. /og-default.jpg */
  image?: string;
  type?: "website" | "article" | "product";
  noindex?: boolean;
  keywords?: string[];
};

export const absoluteUrl = (path: string) => {
  if (!path || path === "/") return SITE_URL;
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
};
