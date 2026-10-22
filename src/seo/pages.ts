import type { PageSeo } from "./config";
import { SITE_NAME, SITE_TAGLINE } from "./config";

const title = (page: string) => `${page} | ${SITE_NAME}`;

/**
 * Keyword-to-page map (primary intent → page).
 * Commercial: Odoo/ERPNext implementation Addis Ababa, ERP Ethiopia
 * Products: Ethiopian HRMS / payroll, hospital ERP, school management
 * Services: corporate ERP training, business automation, custom software
 */
export const STATIC_PAGE_SEO: Record<string, PageSeo> = {
  "/": {
    path: "/",
    title: `${SITE_NAME} | ${SITE_TAGLINE}`,
    description:
      "BelTech Solutions is an ERP implementer in Addis Ababa. We set up Odoo and ERPNext, train company teams, and build automation and custom software for African businesses.",
    keywords: [
      "ERP implementer Addis Ababa",
      "Odoo Ethiopia",
      "ERPNext Ethiopia",
      "BelTech Solutions",
    ],
  },
  "/about": {
    path: "/about",
    title: title("About Us — ERP & Digital Solutions in Addis Ababa"),
    description:
      "BelTech Solutions was founded in 2024 in Addis Ababa to help African businesses modernize with Odoo, ERPNext, corporate ERP training, and tailored digital solutions.",
    keywords: ["BelTech Solutions Addis Ababa", "ERP company Ethiopia"],
  },
  "/services": {
    path: "/services",
    title: title("ERP Implementation, Training, Automation & Software"),
    description:
      "Odoo and ERPNext implementation, corporate team training, business automation, and custom software development from BelTech Solutions in Addis Ababa.",
    keywords: [
      "Odoo implementation Ethiopia",
      "ERPNext training",
      "business automation Addis Ababa",
      "custom software Ethiopia",
    ],
  },
  "/solutions": {
    path: "/solutions",
    title: title("Projects & Case Studies"),
    description:
      "See BelTech ERP and website projects, including Diligent Trade on Odoo, SkillBridge Institute, and Eyoha Digitals.",
    keywords: ["Odoo case study Ethiopia", "ERP projects Addis Ababa"],
  },
  "/industries": {
    path: "/industries",
    title: title("Industries We Serve"),
    description:
      "ERP and digital operations for retail, manufacturing, import-export, construction, accounting firms, healthcare, restaurants, and schools in Ethiopia and Africa.",
    keywords: ["ERP for retail Ethiopia", "manufacturing ERP Addis Ababa"],
  },
  "/blog": {
    path: "/blog",
    title: title("Insights on ERP & Digital Operations"),
    description:
      "Articles and notes from BelTech on ERP, corporate team training, and digital operations for businesses in Africa.",
    keywords: ["ERP blog Ethiopia", "Odoo tips Africa"],
  },
  "/insights": {
    path: "/blog",
    title: title("Insights on ERP & Digital Operations"),
    description:
      "Articles and notes from BelTech on ERP, corporate team training, and digital operations for businesses in Africa.",
  },
  "/contact": {
    path: "/contact",
    title: title("Contact — Talk with the BelTech Team"),
    description:
      "Contact BelTech Solutions in Addis Ababa for ERP implementation, corporate training, automation, or custom software. Call +251 955 935 455 or email beltechsolns@gmail.com.",
    keywords: ["contact BelTech", "ERP consultant Addis Ababa"],
  },
  "/projects/diligent-trade": {
    path: "/projects/diligent-trade",
    title: title("Diligent Trade — Odoo ERP Case Study"),
    description:
      "How BelTech implemented Odoo ERP for Diligent Trade, connecting import-export orders, inventory, and finance in one system.",
    type: "article",
  },
  "/projects/skillbridge": {
    path: "/projects/skillbridge",
    title: title("SkillBridge Institute — Website Case Study"),
    description:
      "Website BelTech built for SkillBridge Institute of Technology so programs and student enquiries live in one place.",
    type: "article",
  },
  "/projects/eyoha-digitals": {
    path: "/projects/eyoha-digitals",
    title: title("Eyoha Digitals — Website Case Study"),
    description:
      "Website BelTech built for Eyoha Digitals covering services, portfolio, and consultation requests.",
    type: "article",
  },
  "/products/ethiopian-hrms": {
    path: "/products/ethiopian-hrms",
    title: title("Ethiopian HRMS — Odoo HR & Payroll"),
    description:
      "BelTech Ethiopian HRMS: Odoo-based HR and payroll with biometric attendance, Ethiopian tax and pension, leave, and employee self-service.",
    type: "product",
    keywords: [
      "Ethiopian payroll software",
      "Odoo HRMS Ethiopia",
      "biometric attendance Ethiopia",
    ],
  },
  "/products/carecentral": {
    path: "/products/carecentral",
    title: title("CareCentral — Hospital & Clinic ERP"),
    description:
      "CareCentral is BelTech’s healthcare ERP for hospitals and clinics: patients, outpatient, laboratory, intensive care, and administration in one system.",
    type: "product",
    keywords: ["hospital management system Ethiopia", "clinic ERP"],
  },
  "/products/school360": {
    path: "/products/school360",
    title: title("School360 — School Management on Odoo"),
    description:
      "School360 digitizes admissions, attendance, exams, fees, and parent communication on an Odoo-based school management platform from BelTech.",
    type: "product",
    keywords: ["school management system Ethiopia", "Odoo school ERP"],
  },
};

/** Legacy paths that should canonicalize to a primary URL. */
export const CANONICAL_ALIASES: Record<string, string> = {
  "/Contact": "/contact",
  "/Solutions": "/solutions",
  "/ERPDetail": "/projects/diligent-trade",
  "/CharityPlatform": "/projects/skillbridge",
  "/RetailAuto": "/projects/eyoha-digitals",
  "/insights": "/blog",
};

export const INDEXABLE_PATHS = [
  "/",
  "/about",
  "/services",
  "/solutions",
  "/industries",
  "/blog",
  "/contact",
  "/projects/diligent-trade",
  "/projects/skillbridge",
  "/projects/eyoha-digitals",
  "/products/ethiopian-hrms",
  "/products/carecentral",
  "/products/school360",
] as const;

export function resolvePageSeo(pathname: string): PageSeo {
  const normalized =
    pathname.length > 1 && pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname;

  if (normalized.startsWith("/admin")) {
    return {
      path: normalized,
      title: `Admin | ${SITE_NAME}`,
      description: "BelTech Solutions administration.",
      noindex: true,
    };
  }

  const aliasTarget = CANONICAL_ALIASES[normalized];
  const lookup = aliasTarget || normalized;

  if (STATIC_PAGE_SEO[lookup]) {
    return { ...STATIC_PAGE_SEO[lookup] };
  }

  if (lookup.startsWith("/products/")) {
    return {
      path: lookup,
      title: title("Products"),
      description:
        "Explore BelTech software products for HR, healthcare, and schools built on Odoo.",
      type: "product",
    };
  }

  return {
    path: normalized || "/",
    title: `${SITE_NAME} | ${SITE_TAGLINE}`,
    description: STATIC_PAGE_SEO["/"].description,
    noindex: true,
  };
}
