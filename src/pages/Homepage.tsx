"use client";

import React from "react";
import { Button } from "../components/ui/button";
import {
  CheckCircle, Users, Zap, Layers, TrendingUp, DollarSign, Globe, Award, ShoppingCart,
  Factory, Truck, Building2, FileText, Hospital, UtensilsCrossed, ChevronLeft,
  ChevronRight, ArrowRight,
  BarChart3,
  Handshake,
  Boxes, ListTodo, Network, Cloud
} from "lucide-react";
import { motion } from "framer-motion";
import hero from "./../assets/homepage/hero.png";
import odoo from "./../assets/homepage/odoo.png";
import odooErp from "./../assets/homepage/oddoNew.png";
import custom_soft_dev from "./../assets/homepage/customSoftNew.png";
import bussiness_automation_int from "./../assets/homepage/automationAndIntegration.jpg";
import eyoha from "./../assets/clientLogo/eyoha.png";
import Roha from "./../assets/clientLogo/RohaCake.png";
import SkillsBridge from "./../assets/clientLogo/skillBridge.png";
import diligent from "./../assets/clientLogo/diligent.png";
import above_the_footer from "./../assets/above_the_footer.png";
import beltechImpact from "./../assets/homepage/beltechImpact.png";
import businessOperationsImg from "./../assets/homepage/business-operations.png";
import market from "../../src/assets/in/market.png";
import importexport from "../../src/assets/in/import.png";
import acc from "../../src/assets/in/acc.png";
import hos from "../../src/assets/in/hospital.png";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/ui/tooltip";


const BusinessOperations = () => {
  const operationCategories = [
    { title: "Finance & Decision Making", desc: "Cash flow, expenses, profitability, and performance clarity.", icon: <BarChart3 className="w-5 h-5 text-[#27A2D8]" /> },
    { title: "Sales & Customer Handling", desc: "Lead tracking, deal management, faster responses.", icon: <Handshake className="w-5 h-5 text-[#27A2D8]" /> },
    { title: "Procurement & Supplier Management", desc: "Purchasing, approvals, vendors, cost transparency.", icon: <Truck className="w-5 h-5 text-[#27A2D8]" /> },
    { title: "People & Workforce Management", desc: "Employees, attendance, performance, payroll.", icon: <Users className="w-5 h-5 text-[#27A2D8]" /> },
    { title: "Inventory & Operational Control", desc: "Stock accuracy, movement tracking, loss reduction.", icon: <Boxes className="w-5 h-5 text-[#27A2D8]" /> },
    { title: "Project & Service Delivery", desc: "Task planning, ownership, progress tracking, accountability.", icon: <ListTodo className="w-5 h-5 text-[#27A2D8]" /> }
  ];


  const pillIcons = [
    { icon: BarChart3, color: "text-blue-500" },
    { icon: Network, color: "text-purple-500" },
    { icon: Cloud, color: "text-sky-500" },
    { icon: Users, color: "text-green-500" },
    { icon: ListTodo, color: "text-orange-500" },
    { icon: TrendingUp, color: "text-pink-500" },
  ];

  return (
    <section className="py-24 bg-[#F9FAFB] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            style={{ fontFamily: "Inter" }}
          >
            Business Operations We{" "}
            <span className="text-[#27A2D8]">Transform</span>
          </h2>
          <p
            className="text-xl font-normal text-black max-w-3xl mx-auto"
            style={{ fontFamily: "Inter" }}
          >
            Streamline your business processes with our comprehensive suite of
            operational tools designed for modern enterprises.
          </p>
        </div>

        {/* Pill Icon Row  */}
        <div className="w-full lg:w-[calc(50%-1.5rem)] mb-6">
          <div className="flex flex-wrap justify-center gap-4 md:gap-5">
            {pillIcons.map((item, idx) => (
              <div
                key={idx}
                className="w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center  border border-gray-100 shadow-[0_8px_20px_rgba(15,23,42,0.1)] hover:shadow-[0_12px_30px_rgba(15,23,42,0.15)] hover:-translate-y-0.5 transition-all cursor-default"
              >
                <item.icon
                  className={`w-5 h-5 ${item.color}`}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-14 lg:gap-12 items-stretch justify-between px-2 sm:px-0">
          {/* Left Image Section */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <div className="relative overflow-visible flex-1">
              <img
                src={businessOperationsImg}
                alt="Business operations dashboard"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Right Content Section */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <div className="space-y-4">
              {operationCategories.map((item, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-center px-6 py-4 md:px-7 md:py-5 bg-white rounded-xl border-l-4 border-l-[#60A5FA] shadow-md hover:shadow-xl transition duration-200"
                >
                  <div className="mr-4 md:mr-5 flex-shrink-0">
                    <div className="w-12 h-12 md:w-12 md:h-12 rounded-lg bg-[#E5F1FF] flex items-center justify-center">
                      {item.icon}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-base md:text-lg leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-gray-600 text-sm md:text-sm mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
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
          <div className="relative group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#27A2D8]/30 transition-all duration-300">
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
                  <div className="p-3 bg-[#27A2D8] rounded-xl">
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
                      <CheckCircle className="w-4 h-4 text-[#27A2D8] shrink-0" />
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
                <div className="bg-white rounded-xl p-4 border border-gray-100 hover:border-[#27A2D8]/30 transition-all duration-300 flex items-center gap-4">
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
            className="p-3 rounded-full bg-white border border-gray-200 hover:border-[#27A2D8] hover:bg-[#27A2D8]/10 transition-all duration-300 group"
            aria-label="Previous industry"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600 group-hover:text-[#27A2D8]" />
          </button>
          <button
            onClick={nextCard}
            className="p-3 rounded-full bg-white border border-gray-200 hover:border-[#27A2D8] hover:bg-[#27A2D8]/10 transition-all duration-300 group"
            aria-label="Next industry"
          >
            <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-[#27A2D8]" />
          </button>
        </div>

        {/* See More Button */}
        <a
          href="/industries"
          className="inline-flex items-center gap-2 text-[#27A2D8] font-semibold hover:gap-3 transition-all duration-300 group"
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
              ? 'bg-[#27A2D8] w-8'
              : 'bg-gray-300 hover:bg-gray-400'
              }`}
            aria-label={`Go to industry ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

const Homepage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#F0F5F9]">
      <main className="flex-grow">
        {/* hero section */}
        <section
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
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center pt-28">
            <div className="flex flex-col items-center text-center w-full">
              <div className="mb-6 relative w-full max-w-3xl mx-auto flex justify-center md:justify-start">
                <div className="relative inline-flex items-center text-left -translate-x-6 md:-translate-x-25">
                  <div className="hidden md:block h-0.5 w-16 bg-[#27A2D8] mr-6"></div>
                  <span className="inline-block text-sm font-medium text-[#27A2D8]">
                    DIGITAL TRANSFORMATION EXPERTS
                  </span>
                </div>
              </div>
              <h1 className="text-4xl md:text-[64px] mb-6 leading-tight" style={{ fontFamily: 'Poppins', fontWeight: 90 }}>
                Streamline. Automate. Scale.
              </h1>
              <p className="text-[20px] text-white max-w-2xl mx-auto mb-0" style={{ fontFamily: 'Open Sans', fontWeight: 200 }}>
                Transforming African businesses with ERP, automation, and smart software solutions.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">

              <Button
                size="lg"
                className="w-full sm:w-auto text-white px-8 py-3 transition-all duration-200 hover:scale-105 bg-[#27A2D8]"
                style={{ fontFamily: 'Inter', fontSize: '18px', fontWeight: 200 }}
                onClick={() => (window.location.href = "/Contact")}
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
                className="w-full sm:w-auto border-white text-white px-8 py-3 transition-all duration-200 hover:scale-105 bg-transparent"
                style={{ fontFamily: 'Inter', fontSize: '18px', fontWeight: 200 }}
                onClick={() => (window.location.href = "/Contact")}
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
              <ArrowDown className="w-8 h-8 text-[#27A2D8]" />
            </button>
          </div> */}
        </section>



        {/* our soluton section*/}
        <section id="solutions-section" className="py-10 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="mb-4" style={{ fontFamily: 'Inter', fontSize: '36px', fontWeight: 700 }}>
                Our Solutions
              </h2>
              <p className="text-lg font-normal text-black max-w-3xl mx-auto">
                We provide comprehensive digital transformation solutions that
                help African businesses thrive in the modern economy.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

              <div className="bg-white rounded-2xl overflow-hidden shadow-md shadow-gray-200/50 hover:shadow-xl transition-all duration-300">
                <div className="w-full h-65 overflow-hidden">
                  <img
                    src={odooErp}
                    alt="Odoo ERP Implementation"
                    className="w-full h-full object-cover rounded-t-2xl"
                  />
                </div>
                <div className="p-8">
                  <h3 className="mb-3" style={{ fontFamily: 'Inter', fontSize: '21px', fontWeight: 800 }}>
                    Odoo ERP Implementation
                  </h3>
                  <p className="mb-6" style={{ fontFamily: 'Inter', fontSize: '16px', fontWeight: 400 }}>
                    A tailored Odoo ERP system to
                    streamline your entire workflow and
                    gain real-time insights.

                  </p>
                  <a
                    onClick={() => (window.location.href = "/Services")}
                    className="text-[#27A2D8] font-bold flex items-center space-x-2 hover:underline cursor-pointer"
                  >
                    <span>Learn More</span>
                  </a>
                </div>
              </div>

              <div className="bg-white rounded-2xl overflow-hidden shadow-md shadow-gray-200/50 hover:shadow-xl transition-all duration-300">
                <div className="w-full h-65 overflow-hidden">
                  <img
                    src={bussiness_automation_int}
                    alt="Business Automation & Integration"
                    className="w-full h-full object-cover rounded-t-2xl"
                  />
                </div>
                <div className="p-8">
                  <h3 className="mb-3" style={{ fontFamily: 'Inter', fontSize: '21px', fontWeight: 800 }}>
                    Automation & Integration
                  </h3>
                  <p className="mb-6" style={{ fontFamily: 'Inter', fontSize: '16px', fontWeight: 400 }}>
                    Automation workflows that reduce
                    errors, cut down on costs, and free your
                    team's time.

                  </p>
                  <a
                    onClick={() => (window.location.href = "/Services")}
                    className="text-[#27A2D8] font-bold flex items-center space-x-2 hover:underline cursor-pointer"
                  >
                    <span>Learn More</span>
                  </a>
                </div>
              </div>

              <div className="bg-white rounded-2xl overflow-hidden shadow-md shadow-gray-200/50 hover:shadow-xl transition-all duration-300">
                <div className="w-full h-65 overflow-hidden">
                  <img
                    src={custom_soft_dev}
                    alt="Custom Software Development"
                    className="w-full h-full object-cover rounded-t-2xl"
                  />
                </div>
                <div className="p-8">
                  <h3 className="mb-3 whitespace-nowrap" style={{ fontFamily: 'Inter', fontSize: '21px', fontWeight: 800 }}>
                    Custom Software Development
                  </h3>
                  <p className="mb-6" style={{ fontFamily: 'Inter', fontSize: '16px', fontWeight: 400 }}>
                    Web and mobile applications designed
                    to enhance your operations and solve
                    specific challenges.

                  </p>
                  <a
                    onClick={() => (window.location.href = "/Services")}
                    className="text-[#27A2D8] font-bold flex items-center space-x-2 hover:underline cursor-pointer"
                  >
                    <span>Learn More</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* why oddo part */}
        <section className="py-10 bg-[#f7f8fa]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Odoo?
              </h2>
              <p className="text-xl font-normal text-black max-w-3xl mx-auto">
                Odoo is the world's most popular open-source ERP system, trusted
                by millions of businesses worldwide.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">

              <div className="flex flex-col gap-6 h-full">
                <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-200 flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-[#27A2D8] flex-shrink-0" />
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
                  <Users className="w-6 h-6 text-[#27A2D8] flex-shrink-0" />
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
                  <Layers className="w-6 h-6 text-[#27A2D8] flex-shrink-0" />
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
                  <TrendingUp className="w-6 h-6 text-[#27A2D8] flex-shrink-0" />
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

              <div className="flex h-full">
                <img
                  src={odoo}
                  alt="Odoo Interface"
                  className="w-full h-full rounded-2xl"
                  style={{ height: "108%", width: "108%" }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* beltech impact section*/}
        <section className="py-10 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">BelTech Impact</h2>
              <p className="text-xl font-normal text-black max-w-3xl mx-auto">
                We combine technical expertise with deep understanding of African business needs to deliver exceptional results.
              </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-12 items-stretch">
              <div className="lg:flex-1 flex items-stretch">
                <img src={beltechImpact} alt="BelTech Impact" className="rounded-3xl w-full h-full object-cover" />
              </div>

              <div className="lg:flex-1 flex flex-col space-y-6 h-full">
                <div
                  className="bg-white p-6 rounded-3xl flex items-start space-x-4 flex-1 border-l-4 border-[#27A2D8] transform transition-transform duration-300 hover:-translate-y-0.5"
                  style={{ boxShadow: '4px 4px 10px rgba(0,0,0,0.1)' }}
                >
                  <div className="flex-shrink-0 h-12 w-12 bg-[#27A2D8] flex items-center justify-center rounded-sm">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-black mb-2">Odoo ERP experts</h3>
                    <p className="text-base font-normal text-black">
                      Our team has deep expertise in Odoo and extensive experience in ERP implementation.
                    </p>
                  </div>
                </div>

                <div
                  className="bg-white p-6 rounded-3xl flex items-start space-x-4 flex-1 border-l-4 border-[#27A2D8] transform transition-transform duration-300 hover:-translate-y-0.5"
                  style={{ boxShadow: '4px 4px 10px rgba(0,0,0,0.1)' }}
                >
                  <div className="flex-shrink-0 h-12 w-12 bg-[#27A2D8] flex items-center justify-center rounded-sm">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-black mb-2">Real-world African business focus</h3>
                    <p className="text-base font-normal text-black">
                      We understand the unique challenges and opportunities of African markets.
                    </p>
                  </div>
                </div>

                <div
                  className="bg-white p-6 rounded-3xl flex items-start space-x-4 flex-1 border-l-4 border-[#27A2D8] transform transition-transform duration-300 hover:-translate-y-0.5"
                  style={{ boxShadow: '4px 4px 10px rgba(0,0,0,0.1)' }}
                >
                  <div className="flex-shrink-0 h-12 w-12 bg-[#27A2D8] flex items-center justify-center rounded-sm">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-black mb-2">Open-source innovation at your service</h3>
                    <p className="text-base font-normal text-black">
                      Leveraging the power of open-source technology for maximum flexibility and value.
                    </p>
                  </div>
                </div>

                <div
                  className="bg-white p-6 rounded-3xl flex items-start space-x-4 flex-1 border-l-4 border-[#27A2D8] transform transition-transform duration-300 hover:-translate-y-0.5"
                  style={{ boxShadow: '4px 4px 10px rgba(0,0,0,0.1)' }}
                >
                  <div className="flex-shrink-0 h-12 w-12 bg-[#27A2D8] flex items-center justify-center rounded-sm">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-black mb-2">Agile, scalable, and cost-effective</h3>
                    <p className="text-base font-normal text-black">
                      Solutions that grow with your business while maintaining cost efficiency.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Business Operations We Transform */}

        <BusinessOperations />

        {/*  Industries We Serve section*/}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Industries We Serve
              </h2>
              <p className="text-xl font-normal text-black max-w-3xl mx-auto">
                We automate business operations so you stop managing chaos and start managing growth.
              </p>
            </motion.div>

            <IndustriesCarousel industries={industries} />
          </div>
        </section>

        <section className="py-16 bg-[#f7f8fa]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Packages
              </h2>
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
                className="bg-white p-8 rounded-2xl border-2 border-gray-100 hover:border-[#27A2D8] transition-all duration-300 hover:shadow-xl relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#27A2D8]/5 rounded-full -mr-16 -mt-16 group-hover:bg-[#27A2D8]/10 transition-colors duration-300"></div>
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
                        <CheckCircle className="text-[#27A2D8] w-5 h-5 shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    size="lg"
                    className="w-full text-white bg-[#27A2D8] hover:bg-[#1f8cb8] transition-all duration-200 font-semibold"
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
                className="bg-gradient-to-br from-[#27A2D8] to-[#1f8cb8] p-8 rounded-2xl border-2 border-[#27A2D8] hover:shadow-2xl transition-all duration-300 relative overflow-hidden group transform hover:-translate-y-1"
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
                    className="w-full bg-white text-[#27A2D8] hover:bg-gray-50 transition-all duration-200 font-semibold"
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
                className="bg-white p-8 rounded-2xl border-2 border-gray-100 hover:border-[#27A2D8] transition-all duration-300 hover:shadow-xl relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#27A2D8]/5 rounded-full -mr-16 -mt-16 group-hover:bg-[#27A2D8]/10 transition-colors duration-300"></div>
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
                        <CheckCircle className="text-[#27A2D8] w-5 h-5 shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    size="lg"
                    className="w-full text-white bg-[#27A2D8] hover:bg-[#1f8cb8] transition-all duration-200 font-semibold"
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
        <section className="py-8 bg-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Happy Clients
              </h2>
              <p className="text-xl font-normal text-black max-w-3xl mx-auto">
                See what our clients say about their digital transformation journey with BelTech Solutions.
              </p>
            </div>

            <div className="relative overflow-hidden">
              {/*  Perfectly seamless marquee */}
              <div className="flex gap-12 whitespace-nowrap animate-marquee will-change-transform">
                {[
                  { name: "Eyoha Digitals", img: eyoha, testimonial: "Eyoha Digitals loved our website!" },
                  { name: "Roha Cake and Bread Bakery", img: Roha, testimonial: "Roha Bakery saw amazing growth with our product." },
                  { name: "SkillBridge Institute of Technology", img: SkillsBridge, testimonial: "SkillBridge praises the website we built." },
                  { name: "Diligent Trade Solutions", img: diligent, testimonial: "Diligent Trade saw great results from our ERP." },
                ]
                  // Duplicate twice for a continuous flow
                  .concat([
                    { name: "Eyoha Digitals", img: eyoha, testimonial: "Eyoha Digitals loved our website!" },
                    { name: "Roha Cake and Bread Bakery", img: Roha, testimonial: "Roha Bakery saw amazing growth with our product." },
                    { name: "SkillBridge Institute of Technology", img: SkillsBridge, testimonial: "SkillBridge praises the website we built." },
                    { name: "Diligent Trade Solutions", img: diligent, testimonial: "Diligent Trade saw great results from our ERP." },
                  ])

                  .concat([
                    { name: "Eyoha Digitals", img: eyoha, testimonial: "Eyoha Digitals loved our website!" },
                    { name: "Roha Cake and Bread Bakery", img: Roha, testimonial: "Roha Bakery saw amazing growth with our product." },
                    { name: "SkillBridge Institute of Technology", img: SkillsBridge, testimonial: "SkillBridge praises the website we built." },
                    { name: "Diligent Trade Solutions", img: diligent, testimonial: "Diligent Trade saw great results from our ERP." },
                  ])

                  .map((client, idx) => (
                    <div
                      key={idx}
                      className="relative flex flex-col items-center group flex-shrink-0"
                    >
                      {/* Logo */}
                      <div
                        className="flex items-center justify-center transition-transform duration-200 group-hover:scale-110 z-10 w-44 h-44 md:w-48 md:h-48"
                      >
                        <img
                          src={client.img}
                          alt={client.name}
                          className="h-full w-full object-contain"
                        />
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
          className="relative py-10 text-white"
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
              background: "linear-gradient(to right, #31A8EB, #61C7D5)",
              opacity: 0.5,
            }}
          ></div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl font-normal mb-8 max-w-3xl mx-auto">
              Join hundreds of African businesses that have streamlined their
              operations with BelTech Solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="px-8 py-3 text-lg transition-all duration-200 hover:scale-105 bg-[#27A2D8]  text-white hover:bg-[#27A2D8]-100"
                onClick={() => (window.location.href = "/contact")}
              >
                Start Your Digital Journey
              </Button>
              <Button
                size="lg"
                className="px-8 py-3 text-lg transition-all duration-200 hover:scale-105 bg-[#27A2D8]  text-white hover:bg-[#27A2D8]-100"
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