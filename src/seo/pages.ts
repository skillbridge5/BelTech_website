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
    title: "BelTech Solutions Ethiopia | Odoo & ERPNext Implementation in Addis Ababa",
    description:
      "BelTech Solutions is an ERP implementer in Addis Ababa, Ethiopia. We set up Odoo and ERPNext, train corporate teams, and build automation and custom software for African enterprises.",
    keywords: [
      "BelTech Solutions Ethiopia",
      "ERP implementer Addis Ababa",
      "Odoo Ethiopia",
      "ERPNext Ethiopia",
      "ERP software Addis Ababa",
      "Odoo partner Addis Ababa",
      "business automation Ethiopia",
      "Ethiopian ERP system",
    ],
  },
  "/about": {
    path: "/about",
    title: title("About Us — ERP & Digital Solutions in Addis Ababa"),
    description:
      "BelTech Solutions was founded in 2024 in Addis Ababa to help African businesses modernize with Odoo, ERPNext, corporate ERP training, and tailored digital solutions.",
    keywords: ["BelTech Solutions Addis Ababa", "ERP company Ethiopia", "Odoo developers Addis Ababa"],
  },
  "/services": {
    path: "/services",
    title: title("ERP Implementation, Training, Automation & Software in Ethiopia"),
    description:
      "Odoo and ERPNext implementation, corporate team training, business automation, and custom software development from BelTech Solutions in Addis Ababa, Ethiopia.",
    keywords: [
      "Odoo implementation Ethiopia",
      "ERPNext training Addis Ababa",
      "business automation Addis Ababa",
      "custom software Ethiopia",
      "ERP consultant Ethiopia",
    ],
  },
  "/solutions": {
    path: "/solutions",
    title: title("Projects & Case Studies — ERP Implementations in Ethiopia"),
    description:
      "Explore BelTech ERP case studies and enterprise digital systems, including Diligent Trade on Odoo, SkillBridge Institute, and Eyoha Digitals in Addis Ababa.",
    keywords: ["Odoo case study Ethiopia", "ERP projects Addis Ababa", "ERP implementation portfolio"],
  },
  "/industries": {
    path: "/industries",
    title: title("Industries We Serve — Retail, Manufacturing & Healthcare ERP Ethiopia"),
    description:
      "ERP and digital operations tailored for retail, manufacturing, import-export, construction, accounting firms, healthcare, and schools in Ethiopia and East Africa.",
    keywords: ["ERP for retail Ethiopia", "manufacturing ERP Addis Ababa", "import export ERP Ethiopia", "hospital ERP Ethiopia"],
  },
  "/blog": {
    path: "/blog",
    title: title("ERP & Digital Operations Blog — Guides for Ethiopian Businesses"),
    description:
      "Practical articles and guides on Odoo, ERPNext, biometric payroll, tax compliance, and digital business operations in Ethiopia.",
    keywords: ["ERP blog Ethiopia", "Odoo tips Africa", "Ethiopian payroll automation", "ERPNext vs Odoo Ethiopia"],
  },
  "/insights": {
    path: "/blog",
    title: title("ERP & Digital Operations Blog — Guides for Ethiopian Businesses"),
    description:
      "Practical articles and guides on Odoo, ERPNext, biometric payroll, tax compliance, and digital business operations in Ethiopia.",
  },
  "/contact": {
    path: "/contact",
    title: title("Contact BelTech Solutions — Addis Ababa, Ethiopia"),
    description:
      "Talk with the BelTech Solutions engineering team in Bole Sub-City, Addis Ababa for ERP implementation, corporate training, automation, or custom software. Call +251 955 935 455 or email beltechsolns@gmail.com.",
    keywords: ["contact BelTech", "ERP consultant Addis Ababa", "Odoo support Ethiopia"],
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
    title: "BelTech Ethiopian HRMS | Ethiopian Payroll & Biometric Attendance Software",
    description:
      "BelTech Ethiopian HRMS: Complete Odoo-based HR and payroll software engineered for Ethiopian labor laws. Automated tax brackets, pension deductions, ZKTeco biometric sync, and self-service.",
    type: "product",
    keywords: [
      "Ethiopian payroll software",
      "biometric attendance Ethiopia",
      "Odoo HRMS Ethiopia",
      "Ethiopian pension tax calculator",
      "HR software Addis Ababa",
      "ZKTeco integration Ethiopia",
    ],
  },
  "/products/carecentral": {
    path: "/products/carecentral",
    title: "CareCentral | Hospital & Clinic Management System in Ethiopia",
    description:
      "CareCentral is BelTech’s specialized healthcare ERP for hospitals and clinics in Ethiopia: patient records, OPD/IPD, laboratory, pharmacy, and unified administration in one system.",
    type: "product",
    keywords: [
      "hospital management system Ethiopia",
      "clinic ERP Addis Ababa",
      "healthcare software Ethiopia",
      "EMR Ethiopia",
      "hospital information system Addis Ababa",
    ],
  },
  "/products/school360": {
    path: "/products/school360",
    title: "School360 | School Management System & ERP in Ethiopia",
    description:
      "School360 digitizes admissions, student records, biometric attendance, examinations, fee collection, and parent communication on an integrated Odoo school management platform in Ethiopia.",
    type: "product",
    keywords: [
      "school management system Ethiopia",
      "school ERP Addis Ababa",
      "Odoo education Ethiopia",
      "school fees software Ethiopia",
      "student information system Ethiopia",
    ],
  },
  "/blog/insight-erp-ethiopia": {
    path: "/blog/insight-erp-ethiopia",
    title: title("How ERP Systems Transform Ethiopian Businesses"),
    description:
      "Why integrating sales, inventory, and finance into a single platform like Odoo or ERPNext accelerates business growth in Ethiopia.",
    type: "article",
    keywords: ["ERP Ethiopia", "Odoo benefits Addis Ababa", "business operations Ethiopia"],
  },
  "/blog/odoo-vs-erpnext-ethiopian-companies": {
    path: "/blog/odoo-vs-erpnext-ethiopian-companies",
    title: title("Odoo vs. ERPNext for Ethiopian Import/Export & Manufacturing Companies"),
    description:
      "A comprehensive comparison of Odoo and ERPNext for Ethiopian businesses: local tax support, multi-currency customs, license costs, and flexibility.",
    type: "article",
    keywords: ["Odoo vs ERPNext Ethiopia", "ERP comparison Ethiopia", "import export software Addis Ababa"],
  },
  "/blog/automate-ethiopian-payroll-pension-odoo": {
    path: "/blog/automate-ethiopian-payroll-pension-odoo",
    title: title("How to Automate Ethiopian Payroll & Pension Calculations in Odoo"),
    description:
      "Step-by-step guide on configuring Ethiopian income tax brackets, 7% employee and 11% employer pension contributions, and biometric attendance sync in Odoo.",
    type: "article",
    keywords: ["Ethiopian payroll in Odoo", "Ethiopian tax bracket calculation", "Ethiopian pension automation"],
  },
  "/blog/biometric-attendance-zkteco-ethiopia": {
    path: "/blog/biometric-attendance-zkteco-ethiopia",
    title: title("Integrating ZKTeco Biometric Devices with Odoo HRMS in Ethiopia"),
    description:
      "How to connect ZKTeco fingerprint and face recognition attendance hardware with Odoo for accurate timesheets, shift management, and automated payroll.",
    type: "article",
    keywords: ["ZKTeco Odoo Ethiopia", "biometric attendance Addis Ababa", "time and attendance sync"],
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
  "/blog/insight-erp-ethiopia",
  "/blog/odoo-vs-erpnext-ethiopian-companies",
  "/blog/automate-ethiopian-payroll-pension-odoo",
  "/blog/biometric-attendance-zkteco-ethiopia",
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
