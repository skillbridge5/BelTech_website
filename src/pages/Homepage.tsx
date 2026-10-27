"use client";

import React from "react";
import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import {
  CheckCircle, Users, Zap, Layers, TrendingUp, DollarSign, Globe, Award, ShoppingCart, GraduationCap,
  Factory, Truck, Building2, FileText, Hospital, UtensilsCrossed, ChevronLeft,
  ChevronRight, ArrowRight,
  BarChart3,
  Handshake,
  Boxes, ListTodo, Cloud, Bot, Workflow, Rocket, Receipt
} from "lucide-react";
import { motion } from "framer-motion";
import hero from "./../assets/homepage/beltech-hero.jpg";
import odoo from "./../assets/homepage/odoo.jpeg";
import odooErp from "./../assets/homepage/oddoNew.jpg";
import bussiness_automation_int from "./../assets/homepage/automationAndIntegration.jpg";
import custom_soft_dev from "./../assets/homepage/customSoftNew.jpg";
import eyoha from "./../assets/clientLogo/eyoha.png";
import Roha from "./../assets/clientLogo/RohaCake.png";
import SkillsBridge from "./../assets/clientLogo/skillBridge.png";
import diligent from "./../assets/clientLogo/diligent.png";
import firma from "./../assets/clientLogo/firma.jpg";
import above_the_footer from "./../assets/above_the_footer.jpg";
import operationsScene from "./../assets/homepage/operations-scene.jpg";
import beltechMark from "./../assets/new-logo-free.png";
import market from "../../src/assets/in/market.jpg";
import importexport from "../../src/assets/in/import.jpg";
import acc from "../../src/assets/in/acc.jpg";
import hos from "../../src/assets/in/hospital.jpg";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/ui/tooltip";
import school from "./../assets/homepage/school.jpg";
import humanResource from "./../assets/homepage/human-resource.svg";
import care from "./../assets/homepage/care.jpg";
import solutionTraining from "./../assets/homepage/erp-training-card.jpg";
import erpnextShot from "./../assets/homepage/erpnext.jpg";
import { Link } from "react-router-dom";
import { fetchTestimonials, getProducts } from "../api/client";
import type { Product } from "../api/client";
import { resolveImageUrl } from "../lib/image";

const defaultClients = [
  { name: "Eyoha Digitals", img: eyoha, testimonial: "Eyoha Digitals loved our website!" },
  { name: "Roha Cake and Bread Bakery", img: Roha, testimonial: "Roha Bakery saw amazing growth with our product." },
  { name: "SkillBridge Institute of Technology", img: SkillsBridge, testimonial: "SkillBridge praises the website we built." },
  { name: "Diligent Trade Solutions", img: diligent, testimonial: "Diligent Trade saw great results from our ERP." },
  { name: "Firma media and communications", img: firma, testimonial: "Odoo ERP Enterprise - Finance, Sales, Project" },
];

const defaultProducts = [
  {
    _id: "default-human-resource",
    title: "Ethiopian HRMS",
    description:
      "An Odoo-based HR and payroll system for Ethiopian businesses, from employees and biometric attendance through payroll, leave, and self-service.",
    imageUrl: humanResource,
    link: "/products/ethiopian-hrms",
    priority: 0,
  },
  {
    _id: "default-carecentral",
    title: "CareCentral",
    description: "A healthcare ERP and hospital management system for patients, clinical work, staff, and administration.",
    imageUrl: care,
    link: "/products/carecentral",
    priority: 1,
  },
  {
    _id: "default-school360",
    title: "School360",
    description:
      "Digitize academics, admissions, attendance, examinations, fees, communication, and administration—all from one integrated, modular ERP platform engineered for educational institutions.",
    imageUrl: school,
    link: "/products/school360",
    priority: 2,
  },
];


const productDetailPaths: Record<string, string> = {
  "Ethiopian HRMS": "/products/ethiopian-hrms",
  "Human Resource": "/products/ethiopian-hrms",
  CareCentral: "/products/carecentral",
  School360: "/products/school360",
};

const productHref = (product: Product) => {
  const link = (product.link || "").trim();
  if (link) {
    if (link.startsWith("http://") || link.startsWith("https://")) {
      try {
        const u = new URL(link);
        if (
          u.hostname === "localhost" ||
          u.hostname === "127.0.0.1" ||
          (typeof window !== "undefined" && u.host === window.location.host)
        ) {
          return u.pathname;
        }
      } catch {}
      return link;
    }
    return link.startsWith("/") ? link : `/${link}`;
  }
  const title = product.title.replace(/CareCental/g, "CareCentral");
  if (productDetailPaths[title]) return productDetailPaths[title];
  const slug = product.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return `/products/${slug}`;
};

const operationArt: Record<string, React.ReactNode> = {
  finance: (
    <svg viewBox="0 0 80 80" className="h-full w-full" aria-hidden="true">
      <rect x="8" y="46" width="12" height="22" rx="3" fill="currentColor" />
      <rect x="26" y="32" width="12" height="36" rx="3" fill="currentColor" opacity="0.7" />
      <rect x="44" y="18" width="12" height="50" rx="3" fill="currentColor" opacity="0.45" />
      <path d="M10 28c14-16 28-8 46-22" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  ),
  sales: (
    <svg viewBox="0 0 80 80" className="h-full w-full" aria-hidden="true">
      <circle cx="28" cy="40" r="16" fill="currentColor" opacity="0.35" />
      <circle cx="52" cy="40" r="16" fill="currentColor" opacity="0.7" />
      <path d="M22 40h36" stroke="white" strokeWidth="4" strokeLinecap="round" />
    </svg>
  ),
  procurement: (
    <svg viewBox="0 0 80 80" className="h-full w-full" aria-hidden="true">
      <rect x="8" y="34" width="40" height="22" rx="4" fill="currentColor" />
      <path d="M48 42h16l8 10H48z" fill="currentColor" opacity="0.55" />
      <circle cx="24" cy="60" r="6" fill="currentColor" opacity="0.8" />
      <circle cx="58" cy="60" r="6" fill="currentColor" opacity="0.45" />
    </svg>
  ),
  people: (
    <svg viewBox="0 0 80 80" className="h-full w-full" aria-hidden="true">
      <circle cx="40" cy="24" r="10" fill="currentColor" />
      <circle cx="18" cy="32" r="8" fill="currentColor" opacity="0.45" />
      <circle cx="62" cy="32" r="8" fill="currentColor" opacity="0.45" />
      <path d="M24 66c0-12 8-18 16-18s16 6 16 18" fill="currentColor" opacity="0.75" />
    </svg>
  ),
  inventory: (
    <svg viewBox="0 0 80 80" className="h-full w-full" aria-hidden="true">
      <rect x="14" y="40" width="34" height="24" rx="3" fill="currentColor" />
      <rect x="32" y="18" width="34" height="24" rx="3" fill="currentColor" opacity="0.45" />
      <path d="M32 30h34M49 18v24" stroke="white" strokeWidth="2" opacity="0.8" />
    </svg>
  ),
  project: (
    <svg viewBox="0 0 80 80" className="h-full w-full" aria-hidden="true">
      <rect x="8" y="16" width="18" height="48" rx="4" fill="currentColor" opacity="0.35" />
      <rect x="31" y="16" width="18" height="48" rx="4" fill="currentColor" opacity="0.6" />
      <rect x="54" y="16" width="18" height="48" rx="4" fill="currentColor" />
      <rect x="58" y="24" width="10" height="8" rx="2" fill="white" />
      <rect x="58" y="38" width="10" height="8" rx="2" fill="white" opacity="0.7" />
    </svg>
  ),
};

const BusinessOperations = () => {
  const operationCategories = [
    { title: "Finance & Decision Making", desc: "Cash flow, expenses, profitability, and performance clarity.", icon: BarChart3, art: "finance" },
    { title: "Sales & Customer Handling", desc: "Lead tracking, deal management, faster responses.", icon: Handshake, art: "sales" },
    { title: "Procurement & Supplier Management", desc: "Purchasing, approvals, vendors, cost transparency.", icon: Truck, art: "procurement" },
    { title: "People & Workforce Management", desc: "Employees, attendance, performance, payroll.", icon: Users, art: "people" },
    { title: "Inventory & Operational Control", desc: "Stock accuracy, movement tracking, loss reduction.", icon: Boxes, art: "inventory" },
    { title: "Project & Service Delivery", desc: "Task planning, ownership, progress tracking, accountability.", icon: ListTodo, art: "project" },
  ];

  return (
    <section className="relative overflow-hidden bg-[#f7f8fa] py-20">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -left-24 top-8 h-72 w-72 rounded-full border-[18px] border-[#0078B7]/10" />
        <div className="absolute -right-16 top-24 h-56 w-56 rounded-full bg-[#0078B7]/10" />
        <div className="absolute bottom-10 left-1/3 h-40 w-40 rounded-full border-[14px] border-[#0078B7]/10" />
        <svg className="absolute right-[8%] top-16 h-28 w-28 text-[#0078B7]/15" viewBox="0 0 80 80">
          <rect x="8" y="44" width="14" height="24" rx="3" fill="currentColor" />
          <rect x="28" y="28" width="14" height="40" rx="3" fill="currentColor" />
          <rect x="48" y="12" width="14" height="56" rx="3" fill="currentColor" />
        </svg>
      </div>

      <div className="site-wide relative">
        <div className="mb-16 text-center">
          <SectionHeading>
            Business Operations We <span className="text-[#0078B7]">Transform</span>
          </SectionHeading>
          <p className="mx-auto max-w-3xl text-xl font-normal text-black">
            Streamline your business processes with our comprehensive suite of operational tools designed for modern enterprises.
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl bg-white shadow-md lg:grid lg:h-[38rem] lg:grid-cols-5 lg:items-stretch">
          <div className="flex items-center justify-center bg-[#d7e8f4] p-4 sm:p-6 lg:col-span-2 lg:h-full lg:min-h-0">
            <img
              src={operationsScene}
              alt="Illustration of finance, teams, delivery, inventory, and project work in one workspace"
              className="h-auto w-full object-contain lg:max-h-full lg:w-auto lg:max-w-full"
            />
          </div>
          <div className="grid gap-4 p-5 sm:grid-cols-2 lg:col-span-3 lg:h-full lg:min-h-0 lg:grid-rows-3 lg:p-6">
            {operationCategories.map((item) => (
              <article key={item.title} className="relative flex flex-col justify-center overflow-hidden rounded-2xl bg-[#f4f7fb] p-5 lg:h-full lg:p-6">
                <div className="pointer-events-none absolute bottom-3 right-3 h-14 w-14 text-[#0078B7]/25">
                  {operationArt[item.art]}
                </div>
                <div className="relative flex items-center gap-3 pr-12">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#0078B7] shadow-sm">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-bold leading-snug text-gray-900">{item.title}</h3>
                </div>
                <p className="relative mt-3 pr-16 text-sm leading-relaxed text-gray-600">{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const industries = [
  {
    id: "retail",
    icon: ShoppingCart,
    title: "Retail & Supermarkets",
    lead: "Run your shop like a modern chain.",
    bullets: [
      "Multi-branch POS",
      "Barcode inventory + automated stock alerts",
      "Real-time sales dashboards",
    ],
    quote: "Know exactly what's selling, what's missing, and what's making money — from your phone.",
    image: market,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: "manufacturing",
    icon: Factory,
    title: "Manufacturing",
    lead: "Turn production into a controlled, measurable process.",
    bullets: [
      "BoM, work orders, quality control",
      "Batch & lot tracking for compliance",
      "Production cost analysis",
    ],
    quote: "No more guesswork. Know your cost per product before you produce.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop",
    gradient: "from-cyan-500 to-teal-500",
  },
  {
    id: "import",
    icon: Truck,
    title: "Import, Export & Distribution",
    lead: "Visibility from shipment to warehouse shelf.",
    bullets: [
      "Landed cost (tax, transport, freight, insurance)",
      "Multi-currency vendor management",
      "Warehouse + delivery tracking",
    ],
    quote: "Stop losing profit on hidden costs. Track every birr from customs to customer.",
    image: importexport,
    gradient: "from-teal-500 to-green-500",
  },
  {
    id: "construction",
    icon: Building2,
    title: "Construction & Real Estate",
    lead: "Control project costs and eliminate leakage.",
    bullets: [
      "Material usage tracking + supplier invoicing",
      "Project budget vs. actual cost monitoring",
      "Timesheets & subcontractor management",
    ],
    quote: "See where money is going — before it disappears.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    id: "services",
    icon: FileText,
    title: "Service Businesses & Accounting Firms",
    lead: "Get paid without chasing clients.",
    bullets: [
      "CRM + Projects + Invoicing in one system",
      "Subscription billing (perfect for retainers)",
      "Automated follow-ups for unpaid invoices",
    ],
    quote: "Invoice smarter — not harder.",
    image: acc,
    gradient: "from-emerald-500 to-blue-500",
  },
  {
    id: "health",
    icon: Hospital,
    title: "Hospitals, Clinics & Pharmacies",
    lead: "Less paper. More patient care.",
    bullets: [
      "Patient management + appointment scheduling",
      "Pharmacy stock expiry tracking",
      "Integrated billing + accounting",
    ],
    quote: "Your whole facility in one system — zero paperwork.",
    image: hos,
    gradient: "from-blue-500 to-indigo-500",
  },
  {
    id: "restaurants",
    icon: UtensilsCrossed,
    title: "Restaurants & Cafés",
    lead: "Fast service. Zero wastage.",
    bullets: [
      "POS + kitchen display",
      "Recipe costing and ingredient consumption",
      "Delivery, takeaway, and table management",
    ],
    quote: "Know your profit per plate — not just your daily sales.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop",
    gradient: "from-indigo-500 to-purple-500",
  },
];

const IndustriesCarousel: React.FC<{ industries: typeof industries }> = ({ industries }) => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const nextCard = () => {
    setActiveIndex((prev) => (prev + 1) % industries.length);
  };

  const prevCard = () => {
    setActiveIndex((prev) => (prev - 1 + industries.length) % industries.length);
  };

  const activeIndustry = industries[activeIndex];
  const waitingIndustries = industries.filter((_, index) => index !== activeIndex);

  return (
    <div className="relative">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Active Card - Left Side */}
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.5 }}
          className="flex-1 w-full lg:w-2/3"
        >
          <div className="relative group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#0078B7]/30 transition-all duration-300">
            <div className="relative h-[400px] lg:h-[500px] overflow-hidden">
              <img
                src={activeIndustry.image}
                alt={activeIndustry.title}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-opacity duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

              {/* Content Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex items-center gap-4 mb-3">
                  <div className="p-3 bg-[#0078B7] rounded-xl">
                    <activeIndustry.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white" style={{ fontFamily: 'Inter', fontWeight: 700 }}>
                    {activeIndustry.title}
                  </h3>
                </div>
                <p className="text-white/90 text-lg mb-4" style={{ fontFamily: 'Inter', fontSize: '18px', fontWeight: 400 }}>
                  {activeIndustry.lead}
                </p>

                {/* Features */}
                <div className="space-y-2 mb-4">
                  {activeIndustry.bullets.slice(0, 2).map((bullet) => (
                    <div key={bullet} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-[#0078B7] shrink-0" />
                      <span className="text-white/90 text-sm" style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 400 }}>
                        {bullet}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Waiting Cards - Right Side */}
        <div className="w-full lg:w-1/3 space-y-4">
          {waitingIndustries.slice(0, 3).map((industry) => {
            const Icon = industry.icon;
            const originalIndex = industries.findIndex((ind) => ind.id === industry.id);
            const isNext = originalIndex === (activeIndex + 1) % industries.length;

            return (
              <motion.div
                key={industry.id}
                initial={{ opacity: 0.6, x: 20 }}
                animate={{
                  opacity: isNext ? 0.9 : 0.6,
                  x: 0,
                  scale: isNext ? 1.02 : 1
                }}
                whileHover={{ opacity: 1, scale: 1.05 }}
                transition={{ duration: 0.3 }}
                onClick={() => setActiveIndex(originalIndex)}
                className="cursor-pointer"
              >
                <div className="bg-white rounded-xl p-4 border border-gray-100 hover:border-[#0078B7]/30 transition-all duration-300 flex items-center gap-4">
                  <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                    <img
                      src={industry.image}
                      alt={industry.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white relative z-10" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-gray-900 mb-1 truncate" style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 600 }}>
                      {industry.title}
                    </h4>
                    <p className="text-xs text-gray-600 line-clamp-2" style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 400 }}>
                      {industry.lead}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between mt-8">
        <div className="flex items-center gap-2">
          <button
            onClick={prevCard}
            className="p-3 rounded-full bg-white border border-gray-200 hover:border-[#0078B7] hover:bg-[#0078B7]/10 transition-all duration-300 group"
            aria-label="Previous industry"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600 group-hover:text-[#0078B7]" />
          </button>
          <button
            onClick={nextCard}
            className="p-3 rounded-full bg-white border border-gray-200 hover:border-[#0078B7] hover:bg-[#0078B7]/10 transition-all duration-300 group"
            aria-label="Next industry"
          >
            <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-[#0078B7]" />
          </button>
        </div>

        {/* See More Button */}
        <a
          href="/industries"
          className="inline-flex items-center gap-2 text-[#0078B7] font-semibold hover:gap-3 transition-all duration-300 group"
          style={{ fontFamily: 'Inter', fontSize: '16px', fontWeight: 600 }}
        >
          <span>See More</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>

      {/* Dots Indicator */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {industries.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${index === activeIndex
              ? 'bg-[#0078B7] w-8'
              : 'bg-gray-300 hover:bg-gray-400'
              }`}
            aria-label={`Go to industry ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

const solutionItems = [
  {
    img: odooErp,
    alt: "ERP Implementation",
    title: "ERP Implementation",
    hash: "erp-implementation",
    desc: "Odoo and ERPNext shaped around finance, sales, HR, and operations, so the business can see its work in one place.",
    points: ["Odoo and ERPNext setup", "Finance, sales, inventory, and HR", "A system matched to how you work"],
  },
  {
    img: bussiness_automation_int,
    alt: "Automation & Integration",
    title: "Automation & Integration",
    hash: "business-process-automation",
    desc: "Workflows that cut repeated manual work and keep data moving between the tools your team already uses.",
    points: ["Connected daily workflows", "Fewer repeated manual steps", "Live data between systems"],
  },
  {
    img: custom_soft_dev,
    alt: "Custom Software Development",
    title: "Custom Software Development",
    hash: "custom-software-development",
    desc: "Web and mobile tools built for a specific process, when a standard package does not cover the work.",
    points: ["Web and mobile applications", "Tools for one clear process", "Built around the team using them"],
  },
  {
    img: solutionTraining,
    objectPosition: "center top",
    alt: "Corporate ERP Training",
    title: "Corporate ERP Training",
    hash: "corporate-erp-training",
    desc: "Hands-on Odoo and ERPNext training for the people who will use the system, so the company can run it after go-live.",
    points: ["Sessions by role", "Practice on your own system", "A team that can keep the ERP moving"],
  },
];

const SectionHeading = ({
  children,
  className = "text-3xl text-gray-900 md:text-4xl",
  barClassName = "bg-[#0078B7]",
}: {
  children: React.ReactNode;
  className?: string;
  barClassName?: string;
}) => (
  <h2 className={`mb-4 font-bold ${className}`}>
    {children}
    <span className={`mx-auto mt-4 block h-1 w-16 rounded-full ${barClassName}`} aria-hidden="true" />
  </h2>
);

const SolutionsSection = () => {
  return (
    <section id="solutions-section" className="relative overflow-hidden bg-[#f7f8fa] py-20">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <img
          src={beltechMark}
          alt=""
          className="w-[min(62rem,120%)] max-w-none select-none opacity-[0.2] blur-[6px] mix-blend-multiply"
          style={{
            maskImage: "radial-gradient(circle, black 32%, transparent 72%)",
            WebkitMaskImage: "radial-gradient(circle, black 32%, transparent 72%)",
          }}
        />
      </div>
      <div className="site-wide relative">
        <div className="mb-16 text-center">
          <SectionHeading>
            Our <span className="text-[#0078B7]">Solutions</span>
          </SectionHeading>
          <p className="mx-auto max-w-3xl text-xl font-normal text-black">
            ERP implementation, automation, and custom software for African businesses.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {solutionItems.map((item) => (
            <Link
              key={item.title}
              to={"/services#" + item.hash}
              className="group grid overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm outline-none transition duration-300 hover:-translate-y-1 hover:border-[#0078B7] hover:shadow-lg focus-visible:ring-2 focus-visible:ring-[#0078B7] focus-visible:ring-offset-2 lg:grid-cols-5"
            >
              <div className="relative h-52 overflow-hidden bg-[#01143f] lg:col-span-2 lg:h-full lg:min-h-64">
                <img
                  src={item.img}
                  alt={item.alt}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  style={"objectPosition" in item ? { objectPosition: item.objectPosition } : undefined}
                />
                <div className="absolute inset-0 bg-[#0078B7]/0 transition duration-300 group-hover:bg-[#0078B7]/15" />
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-[#0078B7] transition-all duration-300 group-hover:w-full" />
              </div>
              <div className="flex flex-col p-6 lg:col-span-3">
                <h3 className="text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-[#0078B7]">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{item.desc}</p>
                <ul className="mt-4 space-y-2">
                  {item.points.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#0078B7] transition-transform duration-300 group-hover:scale-110" />
                      {point}
                    </li>
                  ))}
                </ul>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-[#0078B7]">
                  Learn More
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

const Homepage: React.FC = () => {
  const [clients, setClients] = useState(defaultClients);
  const [products, setProducts] = useState<Product[]>(defaultProducts);

  useEffect(() => {
    let active = true;
    fetchTestimonials()
      .then((testimonials) => {
        if (!active || !testimonials.length) return;
        setClients(
          testimonials.map((t) => ({
            name: t.name,
            img: t.imageUrl || "",
            testimonial: t.testimonial,
          }))
        );
      })
      .catch(() => setClients(defaultClients));
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (window.location.hash !== "#products") return;
    const timer = window.setTimeout(() => {
      document.getElementById("products")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    let active = true;
    getProducts()
      .then((data) => {
        if (!active) return;
        if (Array.isArray(data) && data.length) {
          setProducts(data);
        }
      })
      .catch(() => {
        if (active) setProducts(defaultProducts);
      });
    return () => {
      active = false;
    };
  }, []);

  const marqueeClients = [...clients, ...clients, ...clients];

  return (
    <div className="flex flex-col min-h-screen bg-[#F0F5F9]">
      <main className="flex-grow">
        {/* hero section */}
        <section
          id="hero-section"
          className="relative text-white flex items-center justify-center"
          style={{
            backgroundImage: `url(${hero})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundColor: "black",
            minHeight: "100vh",
          }}
        >
          <div className="absolute inset-0 bg-black/45" aria-hidden="true" />
          <div className="site-shell relative z-10 flex flex-col items-center justify-center pt-28">
            <div className="flex flex-col items-center text-center w-full">
              <div className="mb-6 relative w-full max-w-3xl mx-auto flex justify-center md:justify-start">
                <div className="relative inline-flex items-center text-left -translate-x-6 md:-translate-x-25">
                  <div className="hidden md:block h-0.5 w-16 bg-[#0078B7] mr-6"></div>
                  <span className="inline-block text-sm font-medium text-[#0078B7]">
                    DIGITAL TRANSFORMATION EXPERTS
                  </span>
                </div>
              </div>
              <h1 className="text-4xl md:text-[64px] mb-6 leading-tight" style={{ fontFamily: 'Poppins', fontWeight: 90 }}>
                BelTech Solutions
              </h1>
              <p className="text-2xl md:text-3xl text-white/95 max-w-2xl mx-auto mb-4 font-semibold" style={{ fontFamily: 'Poppins', fontWeight: 600 }}>
                Streamline. Automate. Scale.
              </p>
              <p className="text-[20px] text-white max-w-2xl mx-auto mb-0" style={{ fontFamily: 'Open Sans', fontWeight: 200 }}>
                ERP implementer in Addis Ababa — Odoo, ERPNext, corporate training, automation, and custom software for African businesses.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">

              <Button
                size="lg"
                data-analytics-cta="hero_free_consultation"
                className="w-full sm:w-auto text-white px-8 py-3 transition-all duration-200 hover:scale-105 bg-[#0078B7]"
                style={{ fontFamily: 'Inter', fontSize: '18px', fontWeight: 200 }}
                onClick={() => (window.location.href = "/contact")}
              >
                Get a Free Consultation
              </Button>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="relative w-full sm:w-max">
                      <Button
                        size="lg"
                        variant="outline"
                        className="w-full sm:w-auto border-white text-white px-8 py-3 transition-all duration-200 hover:scale-105 bg-transparent"
                        style={{ fontFamily: "Inter", fontSize: "18px", fontWeight: 200 }}
                        onClick={() =>
                          window.open("https://beltech-erp.blsglob.com/", "_blank")
                        }
                      >
                        See Live Demo
                      </Button>

                      <TooltipContent
                        side="bottom"
                        sideOffset={4}
                        className="absolute left-1/2 -translate-x-1/2 bg-gray-900 border border-gray-800 rounded-lg p-3 text-sm text-white shadow-md w-max text-left"
                      >
                        <p className="mb-1">Use the demo credentials below:</p>
                        <p className="mb-1">
                          Username: <strong>erp-demo</strong>
                        </p>
                        <p>
                          Password: <strong>erp-demo</strong>
                        </p>
                      </TooltipContent>
                    </div>
                  </TooltipTrigger>
                </Tooltip>
              </TooltipProvider>


              <Button
                size="lg"
                variant="outline"
                data-analytics-cta="hero_book_demo"
                className="w-full sm:w-auto border-white text-white px-8 py-3 transition-all duration-200 hover:scale-105 bg-transparent"
                style={{ fontFamily: 'Inter', fontSize: '18px', fontWeight: 200 }}
                onClick={() => (window.location.href = "/contact")}
              >
                Book a Demo
              </Button>

            </div>
          </div>
          {/* <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-center flex flex-col items-center pointer-events-auto">
            <span className="text-sm text-white mb-2">Discover Our Solutions</span>
            <button
              className="p-0 bg-transparent hover:bg-transparent transition-colors duration-200"
              onClick={() => {
                const solutionsSection = document.getElementById("solutions-section");
                if (solutionsSection) {
                  solutionsSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              <ArrowDown className="w-8 h-8 text-[#0078B7]" />
            </button>
          </div> */}
        </section>

        <SolutionsSection />

          {/* why oddo part */}
        <section id="features-section" className="py-20 bg-white">
          <div className="site-wide">
            <div className="text-center mb-16">
              <SectionHeading>
                Why <span className="text-[#0078B7]">Odoo?</span>
              </SectionHeading>
              <p className="text-xl font-normal text-black max-w-3xl mx-auto">
                Odoo is the world's most popular open-source ERP system, trusted
                by millions of businesses worldwide.
              </p>
            </div>

            <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-2 lg:gap-16">

              <div className="flex flex-col gap-5">
                <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-200 flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-[#0078B7] flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      All-in-One Solution
                    </h3>
                    <p className="text-base font-normal text-gray-700">
                      Manage sales, inventory, accounting, HR, and more from a
                      single platform.
                    </p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-200 flex items-start space-x-4">
                  <Users className="w-6 h-6 text-[#0078B7] flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      User-Friendly Interface
                    </h3>
                    <p className="text-base font-normal text-gray-700">
                      Empower your team with an intuitive interface that is
                      easy to navigate.

                    </p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-200 flex items-start space-x-4">
                  <Layers className="w-6 h-6 text-[#0078B7] flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      Modular Architecture
                    </h3>
                    <p className="text-base font-normal text-gray-700">
                      Start with what you need and add modules as your business grows.
                    </p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-200 flex items-start space-x-4">
                  <TrendingUp className="w-6 h-6 text-[#0078B7] flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      Scalable Growth
                    </h3>
                    <p className="text-base font-normal text-gray-700">
                      Handle more tasks with the same or fewer human resources
                      as your business grows.

                    </p>
                  </div>
                </div>
              </div>

              <img
                src={odoo}
                alt="Odoo Interface"
                loading="lazy"
                decoding="async"
                className="h-full min-h-[24rem] w-full rounded-2xl object-cover sm:min-h-[28rem] lg:min-h-[36rem]"
              />
            </div>
          </div>
        </section>

          {/* why erp next part */}
        <section id="erpnext-section" className="py-20 bg-white">
          <div className="site-wide">
            <div className="text-center mb-16">
              <SectionHeading>
                Advantages of <span className="text-[#0078B7]">ERPNext?</span>
              </SectionHeading>
              <p className="text-xl font-normal text-black max-w-3xl mx-auto">
                ERPNext is a powerful open-source ERP trusted by businesses across the globe.
              </p>
            </div>

            <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-2 lg:gap-16">

              <img
                src={erpnextShot}
                alt="ERPNext modules"
                loading="lazy"
                decoding="async"
                className="h-auto w-full self-center rounded-2xl bg-white object-contain"
              />

              <div className="flex flex-col gap-5">
                <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-200 flex items-start space-x-4">
                  <Zap className="w-6 h-6 text-[#0078B7] flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      Free & Open Source
                    </h3>
                    <p className="text-base font-normal text-gray-700">
                      No licensing fees—invest your budget where it matters: customization and support.
                    </p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-200 flex items-start space-x-4">
                  <Boxes className="w-6 h-6 text-[#0078B7] flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      Complete Business Suite
                    </h3>
                    <p className="text-base font-normal text-gray-700">
                      Accounting, CRM, inventory, HR, and manufacturing in a single, connected platform.
                    </p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-200 flex items-start space-x-4">
                  <Cloud className="w-6 h-6 text-[#0078B7] flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      Modern & Flexible
                    </h3>
                    <p className="text-base font-normal text-gray-700">
                      Built on a modern web stack that adapts to your workflows and scales as your business grows.
                    </p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-200 flex items-start space-x-4">
                  <Globe className="w-6 h-6 text-[#0078B7] flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      Thriving Community
                    </h3>
                    <p className="text-base font-normal text-gray-700">
                      Backed by a global open-source community with rich documentation, extensions, and expert support.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* beltech impact section*/}
        <section className="bg-[#0078B7] py-20 text-white">
          <div className="site-wide">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold tracking-[0.22em] text-white/80">
                WHY BELTECH
              </p>
              <SectionHeading
                className="mt-4 text-4xl leading-tight text-white md:text-5xl"
                barClassName="bg-white"
              >
                BelTech <span className="text-[#E8F4FB]">Impact</span>
              </SectionHeading>
              <p className="mt-6 text-lg leading-relaxed text-white/90">
                We combine ERP expertise, corporate team training, and a close reading of how African businesses actually operate.
              </p>
            </div>

            <div className="mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-6">
              {[
                {
                  icon: Award,
                  title: "Odoo ERP experts",
                  desc: "Our team has deep expertise in Odoo and extensive experience in ERP implementation.",
                },
                {
                  icon: Layers,
                  title: "ERPNext experts",
                  desc: "ERPNext specialists delivering open-source ERP implementations at any scale.",
                },
                {
                  icon: Globe,
                  title: "Real-world African business focus",
                  desc: "We understand the unique challenges and opportunities of African markets.",
                },
                {
                  icon: Zap,
                  title: "Open-source innovation at your service",
                  desc: "Leveraging the power of open-source technology for maximum flexibility and value.",
                },
                {
                  icon: DollarSign,
                  title: "Agile, scalable, and cost-effective",
                  desc: "Solutions that grow with your business while maintaining cost efficiency.",
                },
              ].map((item, index) => (
                <article
                  key={item.title}
                  className={`rounded-2xl bg-white p-6 text-gray-900 shadow-md ${
                    index < 3 ? "xl:col-span-2" : "xl:col-span-3"
                  }`}
                >
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8F4FB] text-[#0078B7]">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-semibold tracking-widest text-[#0078B7]">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{item.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

      

        {/* Our Products section */}
        <section id="products" className="scroll-mt-24 bg-[#f7f8fa] py-20">
          <div className="site-wide">
            <div className="text-center mb-16">
              <SectionHeading>
                Our <span className="text-[#0078B7]">Products</span>
              </SectionHeading>
              <p className="text-xl font-normal text-black max-w-3xl mx-auto">
                Explore our flagship products built to streamline operations and deliver value.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {products.map((product) => (
                <div key={product._id} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col">
                  <div className="flex h-56 w-full items-center justify-center overflow-hidden bg-white">
                    {product.imageUrl ? (
                      <img
                        src={resolveImageUrl(product.imageUrl)}
                        alt={product.title}
                        className="h-full w-full object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = humanResource;
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-sm">
                        No image
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="mb-3" style={{ fontFamily: 'Inter', fontSize: '21px', fontWeight: 800 }}>{product.title.replace(/CareCental/g, "CareCentral")}</h3>
                    <p className="mb-6 flex-1" style={{ fontFamily: 'Inter', fontSize: '16px', fontWeight: 400 }}>{product.description}</p>
                    {productHref(product).startsWith("http") ? (
                      <a
                        href={productHref(product)}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[#0078B7] font-semibold hover:gap-2 transition-all"
                      >
                        Learn More
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    ) : (
                      <Link
                        to={productHref(product)}
                        className="inline-flex items-center gap-1 text-[#0078B7] font-semibold hover:gap-2 transition-all"
                      >
                        Learn More
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* corporate erp training */}
        <section className="bg-white py-20">
          <div className="site-wide">
            <div className="mb-16 text-center">
              <SectionHeading>
                Corporate <span className="text-[#0078B7]">Training</span>
              </SectionHeading>
              <p className="mx-auto max-w-3xl text-xl font-normal text-black">
                BelTech runs corporate ERP training on Odoo and ERPNext, so finance, sales, inventory, and HR staff can work in the system themselves.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  title: "Odoo for daily work",
                  desc: "Practical sessions for the teams who post invoices, manage stock, follow sales, and handle people records.",
                },
                {
                  title: "ERPNext across operations",
                  desc: "Hands-on sessions for the teams who run finance, sales, stock, and people records in ERPNext.",
                },
                {
                  title: "After go-live",
                  desc: "Training for the staff who stay with the system, so the company is not dependent on a single person.",
                },
              ].map((item) => (
                <article key={item.title} className="rounded-3xl bg-[#0078B7] p-8 text-white">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-white">
                    <GraduationCap className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-white/90">{item.desc}</p>
                </article>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                to="/services#corporate-erp-training"
                className="inline-flex items-center gap-2 rounded-full bg-[#0078B7] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#005C8A]"
              >
                See the training
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-[#0078B7] px-5 py-2.5 text-sm font-semibold text-[#0078B7] hover:bg-[#E8F4FB]"
              >
                Ask about a session
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Automation Tools section */}
        <section id="automation-section" className="py-20 bg-[#F0F5F9]">
          <div className="site-wide">
            <div className="text-center mb-16">
              <SectionHeading>Automation</SectionHeading>
              <p className="text-xl font-normal text-black max-w-3xl mx-auto">
                We integrate and automate your workflows using the world's leading automation platforms.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-200 flex flex-col items-center text-center space-y-3">
                <Bot className="w-10 h-10 text-[#0078B7]" />
                <h3 className="text-xl font-bold text-gray-900">AI</h3>
                <p className="text-base font-normal text-gray-700">
                  Intelligent automation that understands, predicts, and decides—20x faster than manual work.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-200 flex flex-col items-center text-center space-y-3">
                <Workflow className="w-10 h-10 text-[#0078B7]" />
                <h3 className="text-xl font-bold text-gray-900">n8n</h3>
                <p className="text-base font-normal text-gray-700">
                  Fair-code workflow automation that connects your apps with 400+ integrations.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-200 flex flex-col items-center text-center space-y-3">
                <Zap className="w-10 h-10 text-[#0078B7]" />
                <h3 className="text-xl font-bold text-gray-900">Zapier</h3>
                <p className="text-base font-normal text-gray-700">
                  Automate repetitive tasks between 6,000+ apps without writing a single line of code.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-200 flex flex-col items-center text-center space-y-3">
                <Building2 className="w-10 h-10 text-[#0078B7]" />
                <h3 className="text-xl font-bold text-gray-900">Zoho</h3>
                <p className="text-base font-normal text-gray-700">
                  A complete suite of business apps—CRM, books, and workflows—working together seamlessly.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-200 flex flex-col items-center text-center space-y-3">
                <Rocket className="w-10 h-10 text-[#0078B7]" />
                <h3 className="text-xl font-bold text-gray-900">Make</h3>
                <p className="text-base font-normal text-gray-700">
                  Visual automation builder that creates powerful scenarios across 2,000+ apps.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-200 flex flex-col items-center text-center space-y-3">
                <Receipt className="w-10 h-10 text-[#0078B7]" />
                <h3 className="text-xl font-bold text-gray-900">Xero</h3>
                <p className="text-base font-normal text-gray-700">
                  Beautiful cloud accounting that automates invoicing, bookkeeping, and finances for growing teams.
                </p>
              </div>
            </div>
          </div>
        </section>

        
        {/* Business Operations We Transform */}

        <BusinessOperations />

        {/*  Industries We Serve section*/}
        <section id="industries-section" className="py-24 bg-white">
          <div className="site-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <SectionHeading>
                Industries <span className="text-[#0078B7]">We Serve</span>
              </SectionHeading>
              <p className="text-xl font-normal text-black max-w-3xl mx-auto">
                We implement ERP, train your team, and automate operations so daily work is easier to run.
              </p>
            </motion.div>

            <IndustriesCarousel industries={industries} />
          </div>
        </section>

        <section id="pricing-section" className="py-24 bg-[#f7f8fa]">
          <div className="site-wide">
            <div className="text-center mb-16">
              <SectionHeading>
                Our <span className="text-[#0078B7]">Packages</span>
              </SectionHeading>
              <p className="text-xl font-normal text-black max-w-3xl mx-auto">
                Pick the right ERP package designed for your business size and growth goals.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Starter */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white p-8 rounded-2xl border-2 border-gray-100 hover:border-[#0078B7] transition-all duration-300 hover:shadow-xl relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#0078B7]/5 rounded-full -mr-16 -mt-16 group-hover:bg-[#0078B7]/10 transition-colors duration-300"></div>
                <div className="relative">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Starter</h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    For small businesses getting started with ERP
                  </p>
                  <div className="mb-6 pb-6 border-b border-gray-100">
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold text-gray-900">Ideal for:</span> Startups, small retail or service businesses
                    </p>
                  </div>

                  {/* Features */}
                  <h4 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wide">Features:</h4>
                  <ul className="space-y-3 mb-8">
                    {[
                      "Sales & Purchase Management",
                      "Inventory Tracking",
                      "Basic Accounting & Reporting",
                      "Standard Dashboards",
                    ].map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="text-[#0078B7] w-5 h-5 shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    size="lg"
                    data-analytics-cta="pricing_starter_get_started"
                    className="w-full text-white bg-[#0078B7] hover:bg-[#005C8A] transition-all duration-200 font-semibold"
                    onClick={() => (window.location.href = "/contact")}
                  >
                    Get Started
                  </Button>
                </div>
              </motion.div>

              {/* Professional */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-gradient-to-br from-[#0078B7] to-[#005C8A] p-8 rounded-2xl border-2 border-[#0078B7] hover:shadow-2xl transition-all duration-300 relative overflow-hidden group transform hover:-translate-y-1"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:bg-white/15 transition-colors duration-300"></div>
                <div className="relative">
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-white/20 text-white text-xs font-semibold rounded-full mb-3">
                      MOST POPULAR
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">Professional</h3>
                  <p className="text-white/90 mb-4 text-sm">
                    For growing SMEs that need more automation
                  </p>
                  <div className="mb-6 pb-6 border-b border-white/20">
                    <p className="text-sm text-white/90">
                      <span className="font-semibold text-white">Ideal for:</span> Medium businesses expanding operations
                    </p>
                  </div>

                  <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wide">Features:</h4>
                  <ul className="space-y-3 mb-8">
                    {[
                      "All Starter modules",
                      "HR & Payroll",
                      "POS & eCommerce",
                      "Workflow Automation",
                      "Customizable Reports & Dashboards",
                    ].map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="text-white w-5 h-5 shrink-0 mt-0.5" />
                        <span className="text-white/90 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    size="lg"
                    data-analytics-cta="pricing_pro_request_demo"
                    className="w-full bg-white text-[#0078B7] hover:bg-gray-50 transition-all duration-200 font-semibold"
                    onClick={() => (window.location.href = "/contact")}
                  >
                    Request a Demo
                  </Button>
                </div>
              </motion.div>

              {/* Enterprise */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white p-8 rounded-2xl border-2 border-gray-100 hover:border-[#0078B7] transition-all duration-300 hover:shadow-xl relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#0078B7]/5 rounded-full -mr-16 -mt-16 group-hover:bg-[#0078B7]/10 transition-colors duration-300"></div>
                <div className="relative">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Enterprise</h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    For large organizations with advanced needs
                  </p>
                  <div className="mb-6 pb-6 border-b border-gray-100">
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold text-gray-900">Ideal for:</span> Multi-branch operations, complex workflows, large teams
                    </p>
                  </div>

                  <h4 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wide">Features:</h4>
                  <ul className="space-y-3 mb-8">
                    {[
                      "All Professional modules",
                      "Manufacturing (MRP)",
                      "Marketing & Campaigns",
                      "Project Management",
                      "Multi-branch support",
                      "Custom Integrations & Automation",
                    ].map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="text-[#0078B7] w-5 h-5 shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    size="lg"
                    data-analytics-cta="pricing_enterprise_contact_sales"
                    className="w-full text-white bg-[#0078B7] hover:bg-[#005C8A] transition-all duration-200 font-semibold"
                    onClick={() => (window.location.href = "/contact")}
                  >
                    Contact Sales
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>


        {/* testimonial section */}
        <section id="testimonials-section" className="py-20 bg-white relative overflow-hidden">
          <div className="site-wide">
            <div className="text-center mb-16">
              <SectionHeading>
                Our Happy <span className="text-[#0078B7]">Clients</span>
              </SectionHeading>
              <p className="text-xl font-normal text-black max-w-3xl mx-auto">
                See what our clients say about their digital transformation journey with BelTech Solutions.
              </p>
            </div>

            <div className="relative overflow-hidden">
              {/*  Perfectly seamless marquee */}
              <div className="flex gap-12 whitespace-nowrap animate-marquee will-change-transform">
                {marqueeClients.map((client, idx) => (
                    <div
                      key={idx}
                      className="relative flex flex-col items-center group flex-shrink-0"
                    >
                      {/* Logo */}
                      <div
                        className="flex items-center justify-center transition-transform duration-200 group-hover:scale-110 z-10 w-44 h-44 md:w-48 md:h-48"
                      >
                        {client.img ? (
                          <img
                            src={resolveImageUrl(client.img)}
                            alt={client.name}
                            className="h-full w-full object-contain"
                          />
                        ) : (
                          <div className="h-32 w-32 rounded-full bg-[#0078B7] text-white flex items-center justify-center text-4xl font-semibold">
                            {client.name.charAt(0)}
                          </div>
                        )}
                      </div>

                      {/* Tooltip */}
                      <div
                        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full 
                opacity-0 group-hover:opacity-100 group-hover:translate-y-2 
                transition-all duration-300 
                w-64 max-w-xs bg-white shadow-lg rounded-lg 
                p-4 text-center z-50 pointer-events-none"
                      >
                        <p className="text-base font-normal text-black whitespace-normal break-words line-clamp-2">
                          "{client.testimonial}"
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Custom animation styles */}
          <style>
            {`
      @keyframes marquee {
        0% { transform: translateX(0); }
        100% { transform: translateX(-33.333%); } /* Matches 3 duplicates for perfect loop */
      }

      .animate-marquee {
        display: flex;
        width: max-content;
        animation: marquee 40s linear infinite;
        gap: 8rem; /* Nicely spaced but still smooth */
      }

      /* Keep hover working without stopping animation */
      .animate-marquee * {
        pointer-events: auto;
      }

      /* Optimize GPU performance */
      .will-change-transform {
        will-change: transform;
      }
    `}
          </style>
        </section>




        <section
          className="relative py-20 text-white"
          style={{
            backgroundImage: `url(${above_the_footer})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.6)",
            }}
          ></div>
          <div
            className="absolute inset-0 z-0"
            style={{
              background: "linear-gradient(to right, #0078B7, #005C8A)",
              opacity: 0.5,
            }}
          ></div>
          <div className="site-shell relative z-10 text-center">
            <SectionHeading className="text-3xl text-white md:text-4xl">
              Ready to <span className="text-[#0078B7]">Transform</span> Your Business?
            </SectionHeading>
            <p className="text-xl font-normal mb-8 max-w-3xl mx-auto">
              Join hundreds of African businesses that have streamlined their
              operations with BelTech Solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                data-analytics-cta="footer_cta_start_journey"
                className="px-8 py-3 text-lg transition-all duration-200 hover:scale-105 bg-[#0078B7]  text-white hover:bg-[#005C8A]"
                onClick={() => (window.location.href = "/contact")}
              >
                Start Your Digital Journey
              </Button>
              <Button
                size="lg"
                data-analytics-cta="footer_cta_success_stories"
                className="px-8 py-3 text-lg transition-all duration-200 hover:scale-105 bg-[#0078B7]  text-white hover:bg-[#005C8A]"
                onClick={() => (window.location.href = "/solutions")}
              >
                View Success Stories
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Homepage;