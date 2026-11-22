import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, User, Clock, Share2 } from "lucide-react";
import { loadInsight, loadInsights } from "../api/client";
import type { Insight } from "../api/client";
import { resolveImageUrl } from "../lib/image";
import { Button } from "../components/ui/button";
import above_the_footer from "../assets/above_the_footer.jpg";
import toast from "react-hot-toast";
import {
  isHtmlContent,
  sanitizeBlogHtml,
  calculateReadingTime,
} from "../lib/sanitizeHtml";

const defaultInsights: Insight[] = [
  {
    _id: "odoo-vs-erpnext-ethiopian-companies",
    id: "odoo-vs-erpnext-ethiopian-companies",
    title: "Odoo vs. ERPNext for Ethiopian Import/Export & Manufacturing Companies",
    description:
      "A comprehensive comparison of Odoo and ERPNext for Ethiopian businesses: local tax support, multi-currency customs, license costs, and flexibility.",
    detail:
      "Choosing between Odoo and ERPNext is one of the most common dilemmas faced by Ethiopian trade and manufacturing businesses in Addis Ababa. While both platforms are open-core, Odoo provides a mature modular marketplace with pre-built Ethiopian HRMS extensions, while ERPNext offers an all-inclusive open-source licensing model. For businesses handling multi-currency imports, customs clearance landed costs, and tiered VAT reporting, Odoo's automated landed-cost costing methods offer greater accuracy. When planning your ERP rollout, partner expertise and team training in Addis Ababa are the critical success factors.",
    date: "2026-11-15T00:00:00.000Z",
    imageUrl: "/assets/homepage/business-operations.png",
  },
  {
    _id: "automate-ethiopian-payroll-pension-odoo",
    id: "automate-ethiopian-payroll-pension-odoo",
    title: "How to Automate Ethiopian Payroll & Pension Calculations in Odoo",
    description:
      "Step-by-step guide on configuring Ethiopian income tax brackets, 7% employee and 11% employer pension contributions, and biometric attendance sync in Odoo.",
    detail:
      "Manual payroll processing using Excel spreadsheets remains a major source of calculation errors and compliance penalties for Ethiopian organizations. Under Ethiopian labor regulations, employee income tax follows a progressive scale from 0% to 35%, alongside mandatory 7% employee pension and 11% employer private organization pension fund contributions. By integrating BelTech Ethiopian HRMS with Odoo, companies automate monthly tax deductions, generate official tax summary schedules for the Ministry of Revenues, and link attendance punches directly to payslip line items.",
    date: "2026-11-10T00:00:00.000Z",
    imageUrl: "/assets/payroll.jpeg",
  },
  {
    _id: "biometric-attendance-zkteco-ethiopia",
    id: "biometric-attendance-zkteco-ethiopia",
    title: "Integrating ZKTeco Biometric Devices with Odoo HRMS in Ethiopia",
    description:
      "How to connect ZKTeco fingerprint and face recognition attendance hardware with Odoo for accurate timesheets, shift management, and automated payroll.",
    detail:
      "Buddy punching and unrecorded tardiness cost Ethiopian enterprises thousands of birr every month. Connecting ZKTeco biometric time-clocks to Odoo via automated push sync (ADMS) enables real-time attendance validation. BelTech HRMS captures device punches, correlates them with assigned shift schedules (standard, night, or rotational shifts), and automatically calculates overtime according to Ethiopian proclamation rates before pushing the final totals to payroll.",
    date: "2026-11-05T00:00:00.000Z",
    imageUrl: "/assets/homepage/attendance.jpg",
  },
  {
    _id: "insight-erp-ethiopia",
    id: "insight-erp-ethiopia",
    title: "How ERP Systems Transform Ethiopian Businesses",
    description:
      "Why integrating sales, inventory, and finance into a single platform like Odoo or ERPNext accelerates business growth.",
    detail:
      "Implementing an ERP system allows companies to eliminate redundant data entry, ensure compliance with Ethiopian tax and payroll laws, and make data-driven operational decisions across retail, wholesale, and service operations.",
    date: "2026-10-25T00:00:00.000Z",
    imageUrl: "/assets/homepage/business-operations.png",
  },
];

const BlogDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [insight, setInsight] = useState<Insight | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    if (!id) return;

    const normalized = id.toLowerCase().trim();
    const matches = (item: Insight) => {
      const itemId = (item._id || item.id || "").toLowerCase();
      const itemSlug = (item.title || "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      return itemId === normalized || itemSlug === normalized;
    };

    loadInsight(id)
      .then((item) => {
        if (!active) return;
        if (item && (item.title || item.detail)) {
          setInsight(item);
          setLoading(false);
          return;
        }
        return loadInsights(true).then((items) => {
          if (!active) return;
          const match =
            (Array.isArray(items) ? items.find(matches) : undefined) ||
            defaultInsights.find(matches);
          if (match) setInsight(match);
          setLoading(false);
        });
      })
      .catch(() => {
        if (!active) return;
        const normalized = id.toLowerCase().trim();
        const fallback = defaultInsights.find((i) => {
          const iId = (i._id || i.id || "").toLowerCase();
          const iSlug = (i.title || "")
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");
          return iId === normalized || iSlug === normalized;
        });
        if (fallback) setInsight(fallback);
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [id]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!", {
        style: { background: "#0078B7", color: "#ffffff" },
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center pt-24">
        <div className="text-center">
          <div className="h-8 w-8 border-3 border-gray-300 border-t-[#0078B7] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 font-medium">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!insight) {
    return (
      <div className="min-h-screen bg-white px-4 pb-20 pt-32 text-gray-800">
        <div className="site-shell text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            The article you are looking for does not exist or has been removed.
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 font-semibold text-[#0078B7] hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to all articles
          </Link>
        </div>
      </div>
    );
  }

  const rawDetail = insight.detail || insight.description || "";
  const hasHtml = isHtmlContent(rawDetail);
  const sanitizedContent = hasHtml ? sanitizeBlogHtml(rawDetail) : "";
  const paragraphs = !hasHtml
    ? rawDetail
        .split("\n\n")
        .map((p) => p.trim())
        .filter(Boolean)
    : [];

  const readMinutes = calculateReadingTime(rawDetail);

  const formattedDate = insight.date
    ? new Date(insight.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Recently published";

  return (
    <div className="min-h-screen bg-white text-gray-900 antialiased pt-28">
      {/* Article Header */}
      <article className="site-wide max-w-4xl mx-auto px-4 pb-16">
        <div className="mb-6">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#0078B7] hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to all articles
          </Link>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
          <span className="inline-flex items-center gap-1.5 bg-[#E8F4FB] text-[#0078B7] px-3 py-1 rounded-full font-semibold text-xs">
            BelTech Insights
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-gray-400" />
            {formattedDate}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <User className="h-4 w-4 text-gray-400" />
            BelTech Editorial Team
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-gray-400" />
            {readMinutes} min read
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight mb-6">
          {insight.title}
        </h1>

        {insight.description && (
          <p className="text-xl text-gray-600 font-medium leading-relaxed mb-8 border-l-3 border-[#0078B7]/40 pl-4 py-0.5">
            {insight.description}
          </p>
        )}

        {/* Cover Image */}
        {insight.imageUrl && (
          <div className="mb-12 overflow-hidden rounded-2xl border border-gray-100 shadow-md bg-gray-50">
            <img
              src={resolveImageUrl(insight.imageUrl)}
              alt={insight.title}
              className="w-full max-h-[500px] object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/assets/new-logo-free.png";
              }}
            />
          </div>
        )}

        {/* Article Body - Supports rich HTML (multiple inline images, fonts, colors, headings) or plain text */}
        {hasHtml ? (
          <div
            className="blog-content leading-relaxed"
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          />
        ) : (
          <div className="blog-content space-y-6 leading-relaxed">
            {paragraphs.map((p, idx) => (
              <p key={idx} className="text-lg leading-relaxed text-gray-700">
                {p}
              </p>
            ))}
          </div>
        )}

        {/* Share & Actions */}
        <div className="mt-14 pt-6 border-t border-gray-200 flex items-center justify-between">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 font-semibold text-[#0078B7] hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            More Articles
          </Link>
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-2xs"
          >
            <Share2 className="h-4 w-4 text-[#0078B7]" />
            Share Article
          </button>
        </div>
      </article>

      {/* Bottom CTA */}
      <section
        className="relative py-20 text-white"
        style={{
          backgroundImage: `url(${above_the_footer})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0078B7]/80 to-[#005C8A]/80" />
        <div className="site-shell relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            Ready to Accelerate Your Digital Operations?
          </h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8 leading-relaxed">
            Partner with BelTech to engineer scalable ERP, custom software, and corporate digital systems.
          </p>
          <div className="flex justify-center">
            <Link to="/contact">
              <Button size="lg" className="bg-white text-[#0078B7] hover:bg-gray-100 font-bold px-8">
                Speak to our consultants
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogDetail;
