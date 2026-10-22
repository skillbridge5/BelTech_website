import {
  COMPANY,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
  type PageSeo,
} from "./config";

export function organizationJsonLd() {
  return {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: COMPANY.legalName,
    legalName: COMPANY.legalName,
    url: SITE_URL,
    logo: absoluteUrl("/favicon.png"),
    email: COMPANY.email,
    telephone: COMPANY.telephone,
    foundingDate: COMPANY.foundingDate,
    description: COMPANY.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: COMPANY.address.addressLocality,
      addressRegion: COMPANY.address.addressRegion,
      addressCountry: COMPANY.address.addressCountry,
    },
    areaServed: COMPANY.areaServed.map((name) => ({
      "@type": "Place",
      name,
    })),
    sameAs: [...COMPANY.sameAs],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: COMPANY.telephone[0],
        contactType: "sales",
        areaServed: "ET",
        availableLanguage: ["English", "Amharic"],
      },
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en",
  };
}

export function professionalServiceJsonLd() {
  return {
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#localservice`,
    name: COMPANY.legalName,
    url: SITE_URL,
    image: absoluteUrl("/og-default.jpg"),
    email: COMPANY.email,
    telephone: COMPANY.telephone[0],
    description: COMPANY.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: COMPANY.address.addressLocality,
      addressRegion: COMPANY.address.addressRegion,
      addressCountry: COMPANY.address.addressCountry,
    },
    areaServed: [
      { "@type": "City", name: "Addis Ababa" },
      { "@type": "Country", name: "Ethiopia" },
    ],
    sameAs: [...COMPANY.sameAs],
    parentOrganization: { "@id": `${SITE_URL}/#organization` },
  };
}

const BREADCRUMB_LABELS: Record<string, string> = {
  "": "Home",
  about: "About",
  services: "Services",
  solutions: "Projects",
  industries: "Industries",
  blog: "Blog",
  contact: "Contact",
  projects: "Projects",
  products: "Products",
  "diligent-trade": "Diligent Trade",
  skillbridge: "SkillBridge",
  "eyoha-digitals": "Eyoha Digitals",
  "ethiopian-hrms": "Ethiopian HRMS",
  carecentral: "CareCentral",
  school360: "School360",
};

export function breadcrumbJsonLd(pathname: string) {
  const parts = pathname.split("/").filter(Boolean);
  const items = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SITE_URL,
    },
  ];

  let cumulative = "";
  parts.forEach((part, index) => {
    cumulative += `/${part}`;
    items.push({
      "@type": "ListItem",
      position: index + 2,
      name: BREADCRUMB_LABELS[part] || part.replace(/-/g, " "),
      item: absoluteUrl(cumulative),
    });
  });

  return {
    "@type": "BreadcrumbList",
    itemListElement: items,
  };
}

export function servicePageJsonLd() {
  return {
    "@type": "ItemList",
    name: "BelTech Solutions Services",
    itemListElement: [
      {
        "@type": "Service",
        position: 1,
        name: "ERP Implementation",
        description:
          "Odoo and ERPNext implementation for manufacturing, inventory, sales, HR, and accounting.",
        provider: { "@id": `${SITE_URL}/#organization` },
        areaServed: "Ethiopia",
        url: absoluteUrl("/services#erp-implementation"),
      },
      {
        "@type": "Service",
        position: 2,
        name: "Business Automation & Integration",
        description:
          "Connect systems and automate operational workflows around ERP.",
        provider: { "@id": `${SITE_URL}/#organization` },
        url: absoluteUrl("/services#business-process-automation"),
      },
      {
        "@type": "Service",
        position: 3,
        name: "Custom Software Development",
        description:
          "Custom business applications, dashboards, and API integrations.",
        provider: { "@id": `${SITE_URL}/#organization` },
        url: absoluteUrl("/services#custom-software-development"),
      },
      {
        "@type": "Service",
        position: 4,
        name: "Corporate ERP Training",
        description:
          "Role-based Odoo and ERPNext training for finance, sales, inventory, and HR teams.",
        provider: { "@id": `${SITE_URL}/#organization` },
        url: absoluteUrl("/services#corporate-erp-training"),
      },
    ],
  };
}

export function softwareProductJsonLd(page: PageSeo, productName: string) {
  return {
    "@type": "SoftwareApplication",
    name: productName,
    description: page.description,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: absoluteUrl(page.path),
    provider: { "@id": `${SITE_URL}/#organization` },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      url: absoluteUrl("/contact"),
    },
  };
}

export function buildJsonLdGraph(pathname: string, page: PageSeo) {
  const graph: Record<string, unknown>[] = [
    organizationJsonLd(),
    websiteJsonLd(),
    breadcrumbJsonLd(page.path || pathname),
  ];

  if (pathname === "/" || pathname === "/contact") {
    graph.push(professionalServiceJsonLd());
  }

  if (pathname === "/services") {
    graph.push(servicePageJsonLd());
    graph.push({
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What ERP systems does BelTech implement?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "BelTech implements and customizes Odoo and ERPNext for finance, sales, inventory, HR, manufacturing, and related operations.",
          },
        },
        {
          "@type": "Question",
          name: "Do you train the company team after go-live?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Corporate ERP training is part of how BelTech works. Sessions are organised by role for the people who will use the system every day, not only for IT.",
          },
        },
        {
          "@type": "Question",
          name: "Where is BelTech based, and who do you work with?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "BelTech Solutions is based in Addis Ababa, Ethiopia, and supports businesses across Africa that need ERP, automation, training, or custom software.",
          },
        },
        {
          "@type": "Question",
          name: "What products does BelTech offer besides implementation?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Products include Ethiopian HRMS for payroll and attendance, CareCentral for hospitals and clinics, and School360 for school management.",
          },
        },
      ],
    });
  }

  if (pathname.startsWith("/products/")) {
    const productName = pathname.includes("ethiopian-hrms")
      ? "BelTech Ethiopian HRMS"
      : pathname.includes("carecentral")
        ? "CareCentral"
        : pathname.includes("school360")
          ? "School360"
          : page.title;
    graph.push(softwareProductJsonLd(page, productName));
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}
