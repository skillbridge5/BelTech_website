/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { ComponentType } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
// @ts-ignore - lucide-react types are not resolvable in this project's TS setup
import { ArrowRight, ArrowUpRight, Boxes, Check, CheckCircle2, ChevronDown, ClipboardCheck, Cloud, Database, Factory, GraduationCap, Layers, LineChart, MapPin, Phone, Server, ShieldCheck, Sparkles, Users, Workflow } from "lucide-react";
import servicesIntro from "../assets/servicepage/services-intro.jpg";
import erpImplementation from "../assets/servicepage/erp_implementation.jpg";
import aboveTheFooter from "../assets/above_the_footer.jpg";

type IconType = ComponentType<{ className?: string }>;

const modules: { icon: IconType; title: string; text: string }[] = [
  {
    icon: Database,
    title: "Accounting & finance",
    text: "Invoices, ledgers, tax reporting and multi-currency accounts that close from the same live data.",
  },
  {
    icon: Boxes,
    title: "Inventory & procurement",
    text: "Warehouses, purchase orders, stock valuation and low-stock alerts across every location.",
  },
  {
    icon: Workflow,
    title: "Sales & CRM",
    text: "Quotations, orders, receivables and follow-ups connected to the warehouse and finance team.",
  },
  {
    icon: Factory,
    title: "Manufacturing",
    text: "Bills of materials, production orders, work centres and planning for growing factories.",
  },
  {
    icon: GraduationCap,
    title: "HR & Ethiopian payroll",
    text: "Attendance, income tax, pension, leave and biometric devices handled in one localised module.",
  },
  {
    icon: LineChart,
    title: "Projects & dashboards",
    text: "Job costing, service delivery and management reports that show the same numbers everywhere.",
  },
];

const platforms: {
  name: string;
  tagline: string;
  icon: IconType;
  points: string[];
  bestFor: string;
  featured?: boolean;
}[] = [
  {
    name: "Odoo",
    tagline: "Fast, modular rollout",
    icon: Layers,
    points: [
      "Large catalogue of business apps",
      "Modern, familiar interface",
      "Quick deployment for sales and inventory",
      "Easy to extend as teams grow",
    ],
    bestFor: "Sales, inventory and accounting teams that want to move quickly.",
    featured: true,
  },
  {
    name: "ERPNext",
    tagline: "Open-source depth",
    icon: Workflow,
    points: [
      "Strong manufacturing and inventory tools",
      "Open-source licence with no per-user fee",
      "Customisable workflows and reports",
      "Well suited to multi-site operations",
    ],
    bestFor: "Manufacturers and organisations that prefer an open-source platform.",
  },
];

const steps: { icon: IconType; title: string; text: string }[] = [
  { icon: ClipboardCheck, title: "Discover", text: "We map how your teams actually buy, sell, store and pay." },
  { icon: Layers, title: "Configure", text: "Modules, roles, tax rules and reports are set up around those processes." },
  { icon: Database, title: "Migrate & train", text: "Opening balances and historical records move in; users practise real tasks." },
  { icon: CheckCircle2, title: "Go live", text: "A phased launch keeps critical operations running throughout the switch." },
  { icon: ShieldCheck, title: "Support", text: "Local help, backups and system improvements after launch." },
];

const faqs = [
  {
    question: "Which ERP software is best for a growing business in Ethiopia?",
    answer:
      "Odoo is often the fastest route for sales, inventory and accounting teams, while ERPNext is a strong fit for manufacturers and organisations that prefer an open-source licence. We assess your processes before recommending either platform.",
  },
  {
    question: "How long does ERP implementation take?",
    answer:
      "A focused deployment for one or two departments can go live in a few weeks. Larger rollouts with multiple sites, data migration and customisation are planned in phases so teams adopt the system gradually.",
  },
  {
    question: "Can the ERP run without reliable internet?",
    answer:
      "Yes. On-premise deployments run on local servers and continue operating during internet downtime, with synchronisation when connectivity returns.",
  },
  {
    question: "Do you offer ERP training in Addis Ababa?",
    answer:
      "Yes. We provide role-based corporate training in English and Amharic, both on site and remotely, for finance, sales, inventory, HR and management users.",
  },
];

const trustItems: { icon: IconType; title: string; text: string }[] = [
  { icon: Layers, title: "Odoo & ERPNext", text: "Certified implementation team" },
  { icon: Users, title: "Local support", text: "Based in Addis Ababa" },
  { icon: Server, title: "Cloud or on-premise", text: "Deployment that fits your IT" },
  { icon: GraduationCap, title: "Practical training", text: "English and Amharic sessions" },
];

const DashboardPreview = () => (
  <div className="relative mx-auto w-full max-w-xl">
    <div className="pointer-events-none absolute -inset-8 rounded-[3rem] bg-gradient-to-tr from-[#0078B7]/40 via-transparent to-[#5FD0FF]/20 blur-3xl" />
    <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/[0.07] p-3 shadow-2xl shadow-black/30 backdrop-blur">
      <div className="flex items-center gap-2 border-b border-white/10 px-2 pb-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff6b6b]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#f7c948]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#51cf66]" />
        <span className="ml-2 text-[11px] font-medium tracking-wide text-white/60">
          beltech · operations overview
        </span>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {[
          { label: "Sales orders", value: "248", note: "+12% this month" },
          { label: "Stock value", value: "ETB 8.4M", note: "Across 3 warehouses" },
          { label: "Payroll", value: "Ready", note: "126 employees" },
        ].map((item) => (
          <div key={item.label} className="rounded-xl bg-white/[0.07] p-3.5">
            <p className="text-[11px] font-medium uppercase tracking-wide text-white/55">{item.label}</p>
            <p className="mt-1.5 text-lg font-semibold text-white">{item.value}</p>
            <p className="mt-0.5 text-[11px] text-[#8ddcff]">{item.note}</p>
          </div>
        ))}
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-[1.35fr_1fr]">
        <div className="rounded-xl bg-white/[0.07] p-4">
          <div className="flex items-center justify-between gap-2 text-[11px] text-white/55">
            <span>Revenue trend</span>
            <span>Last 6 months</span>
          </div>
          <div className="mt-3 flex h-24 items-end gap-2">
            {[38, 52, 45, 68, 74, 92].map((height, index) => (
              <span
                key={index}
                className="flex-1 rounded-t-md bg-gradient-to-t from-[#0078B7] to-[#5FD0FF]"
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
        </div>
        <div className="rounded-xl bg-white/[0.07] p-4">
          <p className="text-[11px] font-medium uppercase tracking-wide text-white/55">Modules live</p>
          <ul className="mt-3 space-y-2 text-xs text-white/85">
            {["Finance", "Inventory", "Sales", "Payroll"].map((label) => (
              <li key={label} className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-[#5FD0FF]" />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>

    <div className="absolute -bottom-5 -left-3 hidden rounded-xl border border-white/15 bg-[#082c3e] px-4 py-3 shadow-xl sm:block">
      <p className="text-[11px] uppercase tracking-wide text-white/55">Local compliance</p>
      <p className="mt-0.5 text-sm font-semibold text-white">Tax · Pension · Biometric</p>
    </div>
  </div>
);

const ErpSoftware = () => (
  <div className="min-h-screen bg-white font-sans text-gray-800 antialiased">
    {/* Hero */}
    <section className="relative overflow-hidden bg-[#041824] pt-28 text-white md:pt-32">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${servicesIntro})` }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#041824] via-[#041824]/95 to-[#0b4966]/85"
        aria-hidden="true"
      />
      <div className="site-wide relative grid items-center gap-12 pb-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80">
            <span className="h-1.5 w-1.5 rounded-full bg-[#5FD0FF]" />
            ERP software · Ethiopia
          </div>
          <h1
            className="mt-6 text-4xl font-semibold leading-[1.1] tracking-tight md:text-5xl lg:text-[3.35rem]"
            style={{ fontFamily: "Poppins" }}
          >
            ERP software in Ethiopia,{" "}
            <span className="text-[#5FD0FF]">implemented by a local team</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">
            Finance, inventory, sales, HR and operations in one system — configured around Ethiopian business
            requirements and supported from Addis Ababa.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-[#27A2D8] px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-[#27A2D8]/20 transition hover:bg-[#0078B7]"
            >
              Book an ERP demo <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-7 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
            >
              Explore our services
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/70">
            {["Odoo & ERPNext", "Local payroll & tax", "Phased go-live"].map((item) => (
              <span key={item} className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#5FD0FF]" />
                {item}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative"
        >
          <DashboardPreview />
        </motion.div>
      </div>
    </section>

    {/* Trust strip */}
    <section className="border-b border-gray-100 bg-white">
      <div className="site-wide grid gap-6 py-8 sm:grid-cols-2 lg:grid-cols-4">
        {trustItems.map(({ icon: Icon, title, text }) => (
          <div key={title} className="flex items-center gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E8F4FB] text-[#0078B7]">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">{title}</p>
              <p className="mt-0.5 text-xs text-gray-500">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* Modules */}
    <section className="bg-[#f4f8fb] py-20">
      <div className="site-wide">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0078B7]">One connected system</p>
          <h2
            className="mt-3 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl"
            style={{ fontFamily: "Poppins" }}
          >
            What our ERP software manages
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-gray-600">
            Replace spreadsheets and disconnected tools with shared records that every department can trust.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {modules.map(({ icon: Icon, title, text }, index) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              className="group overflow-hidden rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#0078B7]/40 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E8F4FB] text-[#0078B7]">
                  <Icon className="h-6 w-6" />
                </div>
                <span className="text-xs font-bold text-gray-300">0{index + 1}</span>
              </div>
              <h3 className="mt-5 text-lg font-bold text-gray-900">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{text}</p>
              <div className="mt-5 h-1 w-10 rounded-full bg-[#0078B7]/20 transition-all duration-300 group-hover:w-16 group-hover:bg-[#0078B7]" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>

    {/* Platform choice */}
    <section className="bg-white py-20">
      <div className="site-wide grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0078B7]">Choose the right platform</p>
          <h2
            className="mt-3 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl"
            style={{ fontFamily: "Poppins" }}
          >
            Odoo or ERPNext? We help you decide.
          </h2>
          <p className="mt-4 leading-relaxed text-gray-600">
            Odoo offers a large module catalogue and a fast rollout across sales, inventory, accounting and HR.
            ERPNext offers deep manufacturing and inventory features with an open-source licence. We look at your
            processes, reporting, user count and budget before recommending one.
          </p>

          <div className="mt-7 overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
            <img
              src={erpImplementation}
              alt="BelTech ERP implementation with a client team in Addis Ababa"
              loading="lazy"
              decoding="async"
              className="h-60 w-full object-cover"
            />
          </div>

          <div className="mt-6 rounded-2xl bg-[#e8f4fb] p-5">
            <p className="flex items-start gap-3 text-sm leading-relaxed text-gray-700">
              <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-[#0078B7]" />
              <span>
                Need something more specific? We build custom modules and connect them to your ERP through
                documented APIs.
              </span>
            </p>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {platforms.map(({ name, tagline, icon: Icon, points, bestFor, featured }) => (
            <article
              key={name}
              className={`flex h-full flex-col rounded-2xl border p-6 shadow-sm ${
                featured ? "border-[#0078B7]/30 bg-[#f0f9ff]" : "border-gray-200 bg-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                    featured ? "bg-[#0078B7] text-white" : "bg-[#E8F4FB] text-[#0078B7]"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{name}</h3>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-[#0078B7]">{tagline}</p>
                </div>
              </div>

              <ul className="mt-6 space-y-3">
                {points.map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-sm text-gray-700">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#0078B7]" />
                    {point}
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-6">
                <p className="text-[11px] font-bold uppercase tracking-wide text-gray-500">Best for</p>
                <p className="mt-1 text-sm leading-relaxed text-gray-700">{bestFor}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>

    {/* Deployment & delivery */}
    <section className="bg-[#f4f8fb] py-20">
      <div className="site-wide">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0078B7]">Deployment & delivery</p>
          <h2
            className="mt-3 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl"
            style={{ fontFamily: "Poppins" }}
          >
            Cloud or on-premise. Always local support.
          </h2>
          <p className="mt-4 leading-relaxed text-gray-600">
            Cloud ERP is faster to launch and easier to maintain, while on-premise keeps data on servers inside
            your organisation. We help you decide based on connectivity, compliance and disaster recovery — then
            handle installation, backup and training.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-4xl gap-5 md:grid-cols-2">
          {[
            {
              icon: Cloud,
              title: "Cloud ERP",
              text: "Rapid setup, automatic updates and access from any location with an internet connection.",
            },
            {
              icon: Server,
              title: "On-premise ERP",
              text: "Data stays on your servers and operations continue during internet downtime.",
            },
          ].map(({ icon: Icon, title, text }) => (
            <article key={title} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8F4FB] text-[#0078B7]">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-gray-900">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{text}</p>
            </article>
          ))}
        </div>

        <ol className="mx-auto mt-14 grid max-w-6xl gap-8 md:grid-cols-5">
          {steps.map(({ icon: Icon, title, text }, index) => (
            <li key={title} className="relative text-center">
              {index !== steps.length - 1 ? (
                <span className="absolute left-1/2 top-6 hidden h-px w-full bg-[#0078B7]/20 md:block" aria-hidden="true" />
              ) : null}
              <div className="relative mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[#0078B7]/20 bg-white text-[#0078B7] shadow-sm">
                <Icon className="h-5 w-5" />
              </div>
              <p className="mt-3 text-[11px] font-bold uppercase tracking-wide text-[#0078B7]">
                Step {index + 1}
              </p>
              <h3 className="mt-1 text-base font-bold text-gray-900">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>

    {/* FAQ & pricing */}
    <section className="bg-white py-20">
      <div className="site-wide grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0078B7]">Straight answers</p>
          <h2
            className="mt-3 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl"
            style={{ fontFamily: "Poppins" }}
          >
            ERP software questions, answered
          </h2>
          <p className="mt-4 leading-relaxed text-gray-600">
            ERP cost depends on the number of users, modules, deployment model and integration work. We provide a
            written quotation after a short discovery session, with clear separation between platform licences,
            implementation effort and optional support.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {["User count", "Modules", "Deployment", "Integrations"].map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-[#0078B7]/20 bg-[#f0f9ff] px-3 py-1.5 text-xs font-semibold text-[#0078B7]"
              >
                {chip}
              </span>
            ))}
          </div>
          <Link
            to="/contact"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#0078B7] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#005C8A]"
          >
            Ask for a written estimate <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="space-y-3">
          {faqs.map(({ question, answer }) => (
            <details
              key={question}
              className="group rounded-xl border border-gray-200 bg-[#f8fbfd] transition open:border-[#0078B7]/40 open:bg-white"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-gray-900 [&::-webkit-details-marker]:hidden">
                {question}
                <ChevronDown className="h-5 w-5 shrink-0 text-[#0078B7] transition-transform duration-200 group-open:rotate-180" />
              </summary>
              <p className="px-5 pb-5 text-sm leading-relaxed text-gray-600">{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>

    {/* Closing CTA */}
    <section className="relative overflow-hidden py-20 text-white">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${aboveTheFooter})` }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-[#041824]/85" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0078B7]/80 to-transparent" aria-hidden="true" />

      <div className="site-shell relative">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8ddcff]">See it with your own processes</p>
          <h2
            className="mt-3 text-3xl font-bold leading-tight md:text-4xl"
            style={{ fontFamily: "Poppins" }}
          >
            Let&apos;s map your orders, stock and payroll into one ERP system.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-white/80">
            Book a demonstration in Addis Ababa or remotely. We will show how your daily work would run in one
            system, then provide a written estimate.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-[#27A2D8] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#0078B7]"
            >
              Contact our ERP team <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="tel:+251955935455"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-7 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
            >
              <Phone className="h-4 w-4" /> +251 955 935 455
            </a>
            <a
              href="https://beltech-erp.blsglob.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-7 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
            >
              Try the live demo <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-sm text-white/75">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-[#8ddcff]" /> Bole, Addis Ababa
            </span>
            <Link to="/products/ethiopian-hrms" className="underline decoration-white/40 underline-offset-4 hover:text-white">
              Ethiopian HRMS
            </Link>
            <Link to="/products/carecentral" className="underline decoration-white/40 underline-offset-4 hover:text-white">
              CareCentral
            </Link>
            <Link to="/products/school360" className="underline decoration-white/40 underline-offset-4 hover:text-white">
              School360
            </Link>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default ErpSoftware;
