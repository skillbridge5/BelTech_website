// @ts-ignore
// @ts-nocheck
"use client";

import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { getProducts } from "../api/client";
import type { Product } from "../api/client";
import { resolveImageUrl } from "../lib/image";
import above_the_footer from "../assets/above_the_footer.jpg";
import humanResource from "../assets/homepage/human-resource.svg";
import care from "../assets/homepage/care.jpg";
import school from "../assets/homepage/school.jpg";
import attendanceShot from "../assets/homepage/attendance.jpg";
import payrollShot from "../assets/payroll.jpeg";

type ProductModule = {
  title: string;
  body: string;
  icon: any;
};

type ProductPage = {
  title: string;
  kicker: string;
  summary: string;
  detail?: string;
  image: string;
  modules: ProductModule[];
  more?: { heading?: string; intro: string; items: { title: any; icon: any }[] };
  flow?: {
    heading: string;
    intro: string;
    steps: { title: any; body: any; icon: any }[];
  };
  spotlight?: { kicker: string; title: any; titleAccent?: any; body: any; image: any; imageAlt: any; flip?: boolean; objectPosition?: any };
  companion?: { kicker: string; title: any; titleAccent?: any; body: any; image: any; imageAlt: any; flip?: boolean; objectPosition?: any };
  closing?: { title: any; body: any; options?: { title: any; body: any; icon: any }[] };
};

const tones = ["#0078B7", "#1493D4", "#0C6A8A", "#3D8EB5"];

const products: Record<string, ProductPage> = {};

const AppMark = ({ icon: Icon, tone, size = "lg" }: { icon: any; tone: string; size?: "lg" | "sm" }) => (
  <div
    className={`flex items-center justify-center text-white ${
      size === "lg" ? "h-[4.75rem] w-[4.75rem] rounded-[1.4rem]" : "h-11 w-11 rounded-2xl"
    }`}
    style={{ backgroundColor: tone, boxShadow: "0 12px 28px rgba(0, 90, 140, 0.18)" }}
  >
    <Icon className={size === "lg" ? "h-8 w-8" : "h-5 w-5"} strokeWidth={1.75} />
  </div>
);

const defaultModuleIcons: any[] = [
  "Boxes",
  "Building2",
  "CalendarCheck",
  "Fingerprint",
  "Shield",
  "Target",
  "Users",
  "PieChart",
  "Wallet",
  "Calculator",
  "Clock",
];

const YesPos: ProductPage = {
  title: "Yes POS",
  kicker: "Point of Sale System for African Businesses",
  summary: "A modern point of sale system designed to streamline retail operations, manage inventory, and process transactions efficiently.",
  detail: "<p class=\"lead\"><strong>Yes POS</strong> is a modern point of sale system designed for African businesses, enabling seamless retail operations, inventory management, and secure transaction processing.</p>\n\n<div class=\"callout-box callout-info\">\n  <h4>🇪🇹 Ethiopian & African Business Friendly</h4>\n  <p>Supports local payment methods, Ethiopian tax compliance, and multi-currency transactions for businesses across the continent.</p>\n</div>\n\n<h2>Core Features</h2>\n<ul>\n  <li><strong>Sales & Transaction Management:</strong> Process sales, returns, and refunds with ease. Track daily revenue and generate sales reports.</li>\n  <li><strong>Inventory Control:</strong> Real-time stock tracking, low-stock alerts, and product variant management.</li>\n  <li><strong>Customer Management:</strong> Maintain customer profiles, purchase history, and loyalty programs.</li>\n  <li><strong>Tax Compliance:</strong> Automatic Ethiopian tax calculation (VAT, income tax bands) for compliant operations.</li>\n  <li><strong>Multi-Device Support:</strong> Cloud-synced data accessible from tablets, smartphones, and desktop computers.</li>\n  <li><strong>Integration Ready:</strong> Connect with accounting software, HR systems, and BelTech ERP for unified business management.</li>\n</ul>\n\n<h2>Benefits</h2>\n<p>Yes POS helps African businesses reduce manual errors, improve cash flow visibility, and make data-driven decisions. From small retail shops to growing enterprises, the system scales with your business needs.</p>\n\n<h2>Integration</h2>\n<p>Yes POS integrates seamlessly with BelTech's Ethiopian HRMS and ERP solutions, providing a complete business management suite from the point of sale to payroll and operations.</p>",
  image: "/assets/homepage/yespos.jpg",
  modules: [
    { title: "Sales Dashboard", body: "Overview of daily/weekly/monthly sales performance", icon: "PieChart" },
    { title: "Inventory Tracker", body: "Real-time stock levels and low-stock alerts", icon: "Boxes" },
    { title: "Customer Database", body: "Customer profiles and purchase history", icon: "Users" },
    { title: "Tax Reports", body: "Automatic Ethiopian tax compliance reports", icon: "Calculator" },
  ],
  more: {
    heading: "Why Choose Yes POS?",
    intro: "Built specifically for the African market with local needs in mind.",
    items: [
      { title: "Local Payment Support", icon: "DollarSign" },
      { title: "Ethiopian Tax Compliant", icon: "Calendar" },
      { title: "Multi-Device Sync", icon: "LayoutDashboard" },
      { title: "ERP Integration", icon: "Building2" },
    ],
  },
  flow: {
    heading: "The Yes POS Workflow",
    intro: "From sale to payment, see how easy business management can be.",
    steps: [
      { title: "Scan Items", body: "Add products via barcode or manual search", icon: "Search" },
      { title: "Apply Discounts", body: "Instant discounts and promotions", icon: "DollarSign" },
      { title: "Process Payment", body: "Accept cash, card, or mobile money", icon: "CreditCard" },
      { title: "Update Inventory", body: "Automatic stock reduction", icon: "Boxes" },
      { title: "Generate Report", body: "Daily sales and performance summary", icon: "PieChart" },
    ],
  },
  closing: {
    title: "Ready to modernize your business?",
    body: "Talk to our engineering team for a full demonstration, architecture review, and deployment roadmap.",
    options: [
      { title: "Cloud SaaS", body: "Fully managed, secure cloud hosting with automatic updates, high availability, and 24/7 monitoring.", icon: "Shield" },
      { title: "On-Premise Deployment", body: "Deploy directly on your local servers for complete data residency and internal network compliance.", icon: "Building2" },
    ],
  },
};

const ProductDetail = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState<ProductPage | undefined>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let active = true;
    getProducts()
      .then((items: any[]) => {
        if (!active || !Array.isArray(items) || !slug) return;
        const normalizedSlug = slug.toLowerCase().trim();

        // Find backend product matching slug, link, or id
        const match = items.find((p) => {
          const pId = (p._id || p.id || "").toLowerCase();
          const pLink = (p.link || "").toLowerCase().replace(/^\/products\//, "").replace(/^\//, "");
          const pTitleSlug = (p.title || "")
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");

          return (
            pId === normalizedSlug ||
            pLink === normalizedSlug ||
            pTitleSlug === normalizedSlug ||
            p.link === `/products/${slug}` ||
            p.link === slug
          );
        });

        if (match) {
          setProduct(match);
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
      <div className="min-h-screen bg-[#f3f8fb] px-4 pb-20 pt-32 text-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 border-3 border-gray-300 border-t-[#0078B7] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 font-medium">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#f3f8fb] px-4 pb-20 pt-32 text-gray-800">
        <div className="site-shell">
          <h1 className="text-3xl font-bold text-gray-900">This product is not listed.</h1>
          <Link to="/#products" className="mt-6 inline-flex items-center gap-2 font-semibold text-[#0078B7]">
            <span className="h-4 w-4"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 6.25a5.75 5.75 0 1 0 0 11.5 5.75 5.75 0 0 0 0-11.5Z"/></svg></span>/Back to products
          </Link>
        </div>
      </div>
    );
  }

  const rawDetail = product.detail || "";
  const hasHtml = true; // simplified for this example
  const detailHtml = hasHtml ? rawDetail : "";

  return (
    <div className="min-h-screen bg-white text-gray-800 antialiased">
      <section className="relative overflow-hidden bg-[#f3f8fb] pt-28">
        <div className="pointer-events-none absolute -left-24 top-28 h-72 w-72 rounded-full bg-[#0078B7]/10" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-20 top-48 h-80 w-80 rounded-full bg-[#2B9AD4]/20" aria-hidden="true" />
        <div className="site-wide relative pb-20 pt-4">
          <Link to="/#products" className="inline-flex items-center gap-2 text-sm font-semibold text-[#0078B7]">
            <span className="h-4 w-4"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 6.25a5.75 5.75 0 1 0 0 11.5 5.75 5.75 0 0 0 0-11.5Z"/></svg></span>/Back to products
          </Link>
          <div className="mx-auto mt-10 max-w-3xl text-center">
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 md:text-6xl">{product.title}</h1>
            <p className="mt-4 text-xl font-medium text-[#0078B7]">{product.kicker}</p>
            <p className="mt-5 text-lg leading-relaxed text-gray-600">{product.summary}</p>
          </div>
          <div className="relative mx-auto mt-14 max-w-3xl">
            <div className="absolute inset-x-8 top-8 h-44 rounded-[2.75rem] bg-[#0078B7] md:inset-x-16" aria-hidden="true" />
            <div className="relative flex min-h-72 items-center justify-center rounded-[2rem] bg-white px-8 py-10 shadow-[0_28px_70px_rgba(0,70,110,0.14)]">
              <img
                src={resolveImageUrl(product.image)}
                alt={product.title}
                className="max-h-60 w-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = humanResource;
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {product.modules && product.modules.length > 0 ? (
        <section className="py-20">
          <div className="site-wide">
            <h2 className="text-center text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">One system</h2>
            <p className="mx-auto mt-4 max-w-xl text-center text-lg text-gray-600">The modules this product is built around.</p>
            <div className="mt-16 grid grid-cols-2 gap-x-6 gap-y-14 sm:grid-cols-3 lg:grid-cols-4">
              {product.modules.map((module, index) => {
                const Icon = module.icon;
                return (
                  <div key={index} className="flex flex-col items-center text-center space-y-3">
                    <Icon className="w-10 h-10 text-[#0078B7] mb-2" />
                    <h3 className="text-xl font-bold text-gray-900">{module.title}</h3>
                    <p className="text-base leading-relaxed text-gray-600">{module.body}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      ) : (
        <div className="py-20 bg-gray-50">
          <div className="site-wide text-center">
            <p className="text-gray-500 text-sm">No modules defined for this product yet.</p>
          </div>
        </div>
      )}

      {product.flow && product.flow.steps.length > 0 ? (
        <section className="py-20 bg-[#f7f8fa]">
          <div className="site-wide">
            <h2 className="text-center text-4xl font-bold tracking-tight text-gray-900">The {product.title} Flow</h2>
            <p className="mx-auto mt-4 max-w-xl text-center text-lg text-gray-600">A connected path through your core operational lifecycle.</p>
            <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-3 lg:grid-cols-4">
              {product.flow.steps.map((step, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="w-12 h-12 rounded-bg text-center mb-4 flex items-center justify-center">
                    {step.icon ? (
                      <span className={`w-6 h-6 ${step.icon === "Search" ? "text-emerald-600" : step.icon === "DollarSign" ? "text-amber-500" : step.icon === "CreditCard" ? "text-red-600" : step.icon === "PieChart" ? "text-purple-600" : "text-[#0078B7]"}`}>
                        {step.icon === "Search" ? "🔍" : step.icon === "DollarSign" ? "$" : step.icon === "CreditCard" ? "💳" : step.icon === "PieChart" ? "📊" : "⚙️"}
                      </span>
                    ) : (
                      <div className="w-12 h-12 rounded-bg flex items-center justify-center text-gray-300">
                        <span className="text-lg">Step {idx + 1}</span>
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <div className="py-20 bg-white">
          <div className="site-wide text-center">
            <p className="text-gray-500 text-sm">No workflow defined for this product yet.</p>
          </div>
        </div>
      )}

      {product.closing && (
        <section className="py-20 bg-[#0078B7] text-white">
          <div className="site-wide">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold tracking-[0.22em] text-white/80">WHY BELTECH</p>
              <h2 className="mt-4 text-4xl leading-tight text-white md:text-5xl">{product.closing.title}</h2>
              <p className="mt-6 text-lg leading-relaxed text-white/90">{product.closing.body}</p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#0078B7] hover:bg-[#005C8A]"
                >
                  Talk to Our Team
                  <span className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                </a>
                <a
                  href="/#products"
                  className="inline-flex items-center gap-2 rounded-full border border-white px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
                >
                  Back to Products
                  <span className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                </a>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default YesPos;

export const metadata = {
  title: "Yes POS - Point of Sale System for African Businesses",
  description:
    "Yes POS is a modern point of sale system designed for African businesses, enabling seamless retail operations, inventory management, and secure transaction processing with Ethiopian tax compliance.",
};