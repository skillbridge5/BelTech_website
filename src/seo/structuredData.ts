import {
  COMPANY,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
  type PageSeo,
} from "./config";

export function organizationJsonLd() {
  return {
    "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
    "@id": `${SITE_URL}/#organization`,
    name: COMPANY.legalName,
    legalName: COMPANY.legalName,
    url: SITE_URL,
    logo: absoluteUrl("/favicon.png"),
    image: absoluteUrl("/og-default.jpg"),
    email: COMPANY.email,
    telephone: COMPANY.telephone,
    priceRange: COMPANY.priceRange,
    openingHours: COMPANY.openingHours,
    foundingDate: COMPANY.foundingDate,
    description: COMPANY.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: COMPANY.address.streetAddress,
      addressLocality: COMPANY.address.addressLocality,
      addressRegion: COMPANY.address.addressRegion,
      postalCode: COMPANY.address.postalCode,
      addressCountry: COMPANY.address.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: COMPANY.geo.latitude,
      longitude: COMPANY.geo.longitude,
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
      {
        "@type": "ContactPoint",
        telephone: COMPANY.telephone[1],
        contactType: "customer service",
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
    priceRange: COMPANY.priceRange,
    openingHours: COMPANY.openingHours,
    description: COMPANY.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: COMPANY.address.streetAddress,
      addressLocality: COMPANY.address.addressLocality,
      addressRegion: COMPANY.address.addressRegion,
      postalCode: COMPANY.address.postalCode,
      addressCountry: COMPANY.address.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: COMPANY.geo.latitude,
      longitude: COMPANY.geo.longitude,
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

export function homepageFaqJsonLd() {
  return {
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What ERP systems does BelTech Solutions implement in Ethiopia?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "BelTech Solutions is an ERP implementer based in Addis Ababa specializing in Odoo and ERPNext. We configure modules for accounting, inventory, supply chain, manufacturing, and HR tailored specifically to Ethiopian business regulations and tax requirements.",
        },
      },
      {
        "@type": "Question",
        name: "Does BelTech provide support for Ethiopian payroll and biometric attendance?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. We offer BelTech Ethiopian HRMS, which features native Ethiopian income tax calculations (0% to 35%), 7% employee pension, 11% employer pension, and direct integration with ZKTeco biometric attendance hardware.",
        },
      },
      {
        "@type": "Question",
        name: "Can our company deploy Odoo or ERPNext on-premise in Addis Ababa?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. BelTech supports both secure Cloud SaaS hosting and on-premise local server deployments for businesses requiring complete data residency, offline reliability, or internal network compliance.",
        },
      },
      {
        "@type": "Question",
        name: "Do you train non-technical staff and provide ongoing support?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Corporate team training is a core pillar of our implementations. We provide hands-on, role-based training for finance, inventory, sales, and HR teams in both English and Amharic, alongside SLA-backed local technical support.",
        },
      },
      {
        "@type": "Question",
        name: "How can Ethiopian businesses get a quotation or consultation?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can request a custom quotation or schedule a consultation by visiting our Contact page, calling +251 955 935 455 or +251 932 058 398, or emailing beltechsolns@gmail.com. Our team typically delivers tailored proposals within 24 hours.",
        },
      },
    ],
  };
}

export function productFaqJsonLd(pathname: string) {
  if (pathname.includes("ethiopian-hrms") || pathname.includes("hrms")) {
    return {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Is BelTech Ethiopian HRMS fully compliant with Ethiopian labor and tax laws?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. It automates Ethiopian progressive income tax brackets, mandatory 7% employee and 11% employer pension contributions, severance calculations, and holiday leave policies according to current Ethiopian labor proclamations.",
          },
        },
        {
          "@type": "Question",
          name: "Does BelTech HRMS connect with ZKTeco biometric attendance devices?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. BelTech Ethiopian HRMS connects directly with ZKTeco biometric fingerprint and face recognition devices over local network or cloud sync, automatically feeding punches into shift schedules, overtime, and monthly payroll.",
          },
        },
        {
          "@type": "Question",
          name: "Can employees access their payslips and request leave on mobile?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. The self-service portal lets employees view payslips, check remaining leave balances, submit leave and advance requests, and track supervisor approvals from web and mobile devices.",
          },
        },
      ],
    };
  }

  if (pathname.includes("carecentral")) {
    return {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What hospital departments does CareCentral ERP support in Ethiopia?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "CareCentral supports outpatient (OPD), inpatient (IPD), emergency triage, operating theatre, electronic medical records (EMR), laboratory diagnostics, pharmacy dispensary, and unified medical billing.",
          },
        },
        {
          "@type": "Question",
          name: "Does CareCentral support offline or on-premise hospital deployment?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. CareCentral can be installed directly on local hospital servers to ensure uninterrupted clinical operations, fast patient record retrieval, and local network privacy even during internet downtime.",
          },
        },
      ],
    };
  }

  if (pathname.includes("school360")) {
    return {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How does School360 help Ethiopian schools manage student fees and reports?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "School360 tracks student admissions, tuition fees, bus transport billing, exam grading, report cards, and automated SMS / portal notifications for parents in one unified school management ERP.",
          },
        },
        {
          "@type": "Question",
          name: "Can parents view student academic performance online?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Parents can log into the School360 portal on smartphone or computer to check attendance records, exam results, disciplinary notices, and fee receipts.",
          },
        },
      ],
    };
  }

  return null;
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

  if (pathname === "/") {
    graph.push(homepageFaqJsonLd());
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

    const productFaq = productFaqJsonLd(pathname);
    if (productFaq) {
      graph.push(productFaq);
    }
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}
