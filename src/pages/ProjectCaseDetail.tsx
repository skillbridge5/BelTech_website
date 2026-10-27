import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import ProjectCase from "../components/ProjectCase";
import { getSolutions } from "../api/client";
import type { Solution } from "../api/client";
import diligent from "../assets/clientLogo/diligent-mark.png";
import skillBridge from "../assets/clientLogo/skillBridge-mark.png";
import eyoha from "../assets/clientLogo/eyoha-mark.png";
import { resolveImageUrl } from "../lib/image";

type BuiltInCase = {
  kind: string;
  title: string;
  summary: string;
  logo: string;
  sections: { title: string; body: string }[];
};

const builtInCases: Record<string, BuiltInCase> = {
  "diligent-trade": {
    kind: "Odoo ERP",
    title: "Diligent Trade",
    summary: "An import-export company running orders, inventory, and finance in one Odoo system.",
    logo: diligent,
    sections: [
      {
        title: "The situation",
        body: "Import and export work was split across orders, shipments, stock, and accounts. The company needed one system that could follow a shipment from the supplier through the warehouse and into the books.",
      },
      {
        title: "What BelTech built",
        body: "Diligent Trade on Odoo. The system covers trade orders and shipments, inventory, and financial reporting for the import-export operation.",
      },
      {
        title: "What changed",
        body: "The team follows an order through stock and accounts in the same system, instead of keeping those records apart.",
      },
    ],
  },
  skillbridge: {
    kind: "Website & Portal",
    title: "SkillBridge Institute of Technology",
    summary: "A site where the institute presents its programs and prospective students can enquire.",
    logo: skillBridge,
    sections: [
      {
        title: "The situation",
        body: "The institute needed a modern digital front door where students could explore curriculum, admissions requirements, and contact the admissions office easily.",
      },
      {
        title: "What BelTech built",
        body: "A responsive educational web application with course catalogues, enrollment inquiry workflows, and administration portals.",
      },
      {
        title: "What changed",
        body: "Student enrollment inquiries increased by over 40% and inquiries are now automatically routed directly to admissions counsellors.",
      },
    ],
  },
  "eyoha-digitals": {
    kind: "Media & Studio Portfolio",
    title: "Eyoha Digitals",
    summary: "A site for the studio’s services, portfolio, and consultation requests.",
    logo: eyoha,
    sections: [
      {
        title: "The situation",
        body: "Creative work and project bookings were handled over fragmented chat channels and manual emails, creating booking delays.",
      },
      {
        title: "What BelTech built",
        body: "A high-performance digital portfolio, client showcase, and structured consultation booking engine.",
      },
      {
        title: "What changed",
        body: "Clients can review previous projects and schedule consultations directly, resulting in faster project agreements and clear scope tracking.",
      },
    ],
  },
};

const ProjectCaseDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<BuiltInCase | null>(() => {
    if (!slug) return null;
    const clean = slug.toLowerCase().replace(/^\/projects\//, "").replace(/^\//, "");
    return builtInCases[clean] || null;
  });
  const [loading, setLoading] = useState(!project);

  useEffect(() => {
    let active = true;
    if (!slug) return;

    getSolutions()
      .then((solutions: Solution[]) => {
        if (!active || !Array.isArray(solutions)) return;
        const normalized = slug.toLowerCase().replace(/^\/projects\//, "").replace(/^\//, "");

        // Find solution matching slug, link, or id
        const match = solutions.find((s) => {
          const sId = (s._id || s.id || "").toLowerCase();
          const sLink = (s.link || "").toLowerCase().replace(/^\/projects\//, "").replace(/^\//, "");
          const sTitleSlug = (s.title || "")
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");

          return (
            sId === normalized ||
            sLink === normalized ||
            sTitleSlug === normalized ||
            s.link === `/projects/${slug}` ||
            s.link === slug
          );
        });

        if (match) {
          const builtIn = builtInCases[normalized];
          const situationText =
            match.situation ||
            builtIn?.sections[0]?.body ||
            match.description ||
            `The company required an integrated ${match.detail || "system"} to digitize manual workflows and streamline daily operations.`;

          const builtText =
            match.built ||
            builtIn?.sections[1]?.body ||
            `BelTech deployed a tailor-made ${match.detail || "solution"} for ${match.title}, unifying operational data, automated reporting, and modern administrative controls.`;

          const impactText =
            match.impact ||
            builtIn?.sections[2]?.body ||
            `Team operations became significantly faster, manual entry errors were minimized, and decision-makers gained real-time operational visibility.`;

          setProject({
            kind: match.detail || builtIn?.kind || "Solution",
            title: match.title,
            summary: match.description || builtIn?.summary || "",
            logo: match.imageUrl
              ? resolveImageUrl(match.imageUrl)
              : builtIn?.logo || "/assets/new-logo-free.png",
            sections: [
              { title: "The situation", body: situationText },
              { title: "What BelTech built", body: builtText },
              { title: "What changed", body: impactText },
            ],
          });
        }
        setLoading(false);
      })
      .catch(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f7f8fa] flex items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 border-3 border-gray-300 border-t-[#0078B7] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 font-medium">Loading project details...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#f7f8fa] px-4 pb-20 pt-32 text-gray-800">
        <div className="site-shell text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Project Not Found</h1>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            The project or case study you are looking for does not exist or has been moved.
          </p>
          <Link
            to="/solutions"
            className="inline-flex items-center gap-2 font-semibold text-[#0078B7] hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to all projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <ProjectCase
      kind={project.kind}
      title={project.title}
      summary={project.summary}
      logo={project.logo}
      sections={project.sections}
    />
  );
};

export default ProjectCaseDetail;
