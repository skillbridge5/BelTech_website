import { ArrowLeft } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  Ambulance,
  Baby,
  Banknote,
  BedDouble,
  Boxes,
  Building2,
  CalendarCheck,
  CalendarClock,
  CalendarDays,
  CalendarOff,
  Calculator,
  Clock,
  Cloud,
  Droplet,
  Dumbbell,
  Fingerprint,
  FlaskConical,
  Gift,
  GraduationCap,
  HandCoins,
  Heart,
  HeartPulse,
  IdCard,
  Landmark,
  LayoutDashboard,
  MessageSquare,
  MessagesSquare,
  Pill,
  PieChart,
  ScanLine,
  Scissors,
  Server,
  Siren,
  Smile,
  Syringe,
  Shield,
  ShieldAlert,
  Stethoscope,
  Target,
  TrendingUp,
  UserRound,
  Users,
  Wallet,
  Workflow,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Button } from "../components/ui/button";
import above_the_footer from "../assets/above_the_footer.png";
import humanResource from "../assets/homepage/human-resource.svg";
import care from "../assets/homepage/care.jpg";
import school from "../assets/homepage/school.jpg";

type ProductModule = {
  title: string;
  body: string;
  icon: LucideIcon;
};

type ProductPage = {
  title: string;
  kicker: string;
  summary: string;
  image: string;
  modules: ProductModule[];
  more?: { intro: string; items: { title: string; icon: LucideIcon }[] };
  closing?: { title: string; body: string; options?: { title: string; body: string; icon: LucideIcon }[] };
};

const tones = ["#0078B7", "#1493D4", "#0C6A8A", "#3D8EB5"];

const products: Record<string, ProductPage> = {
  "ethiopian-hrms": {
    title: "Ethiopian HRMS",
    kicker: "Human resource management on Odoo",
    summary:
      "A configurable HR system on Odoo for the full employee lifecycle. Each company sets its own schedules, leave, overtime, and approvals, while contracts, biometric attendance, and payroll follow Ethiopian labor, tax, and pension rules.",
    image: humanResource,
    modules: [
      { title: "Employees and contracts", body: "Records, contracts, departments, positions, and employment history.", icon: IdCard },
      { title: "Attendance", body: "Fingerprint and face devices, lateness, and absences.", icon: Fingerprint },
      { title: "Payroll", body: "Ethiopian income tax, pension, allowances, deductions, and payslips.", icon: Banknote },
      { title: "Time off", body: "Leave policies, accruals, balances, requests, and approvals.", icon: CalendarOff },
      { title: "Appraisals", body: "Evaluations, KPIs, scoring, and reviews.", icon: Target },
      { title: "Shifts", body: "Calendars, fixed and rotating shifts, and scheduling.", icon: CalendarClock },
      { title: "Overtime", body: "Requests, approvals, calculations, and payroll.", icon: Clock },
      { title: "Loans", body: "Requests, repayment schedules, and payroll deductions.", icon: HandCoins },
      { title: "Self-service", body: "Payslips, attendance, leave, and HR requests for each employee.", icon: UserRound },
      { title: "Approvals", body: "Approval processes across HR operations.", icon: Workflow },
      { title: "Reports", body: "Workforce, payroll, attendance, leave, and performance.", icon: PieChart },
      { title: "Calendar", body: "Ethiopian and Gregorian dates, and public holidays.", icon: CalendarDays },
      { title: "Discipline", body: "Cases, warnings, investigations, and actions.", icon: ShieldAlert },
      { title: "Grievances", body: "Confidential complaints, escalation, and resolution.", icon: MessageSquare },
      { title: "Promotions", body: "Job-grade changes, salary revisions, and approvals.", icon: TrendingUp },
      { title: "Bonuses", body: "Incentives, eligibility rules, and payroll.", icon: Gift },
    ],
    closing: {
      title: "Each company sets its own policy",
      body: "Schedules, leave, overtime, allowances, loans, approvals, performance, and promotions are configured without changing the source code. Mandatory Ethiopian labor, tax, and pension rules stay in place.",
    },
  },
  carecentral: {
    title: "CareCentral",
    kicker: "Healthcare ERP and hospital management system",
    summary:
      "CareCentral is a modular healthcare ERP for hospitals, clinics, and medical centers. It brings patient information, clinical work, medical services, staff, and administration into one platform.",
    image: care,
    modules: [
      { title: "Patients", body: "Registration, medical records, history, and profiles.", icon: Users },
      { title: "Outpatient", body: "Consultations, appointments, diagnoses, prescriptions, and follow-ups.", icon: Stethoscope },
      { title: "Laboratory", body: "Requests, sample tracking, results, and reporting.", icon: FlaskConical },
      { title: "Intensive care", body: "Admissions, monitoring, observations, and treatment records.", icon: HeartPulse },
      { title: "Dashboards", body: "Operational statistics, analytics, and management reports.", icon: LayoutDashboard },
      { title: "Access", body: "Staff accounts, role-based permissions, and administration.", icon: Shield },
    ],
    more: {
      intro: "A hospital can start with the core and add these as the operation grows.",
      items: [
        { title: "Inpatient department", icon: BedDouble },
        { title: "Emergency department", icon: Siren },
        { title: "Pharmacy and medication", icon: Pill },
        { title: "Radiology", icon: ScanLine },
        { title: "Surgery and operating theatre", icon: Scissors },
        { title: "Dental, ophthalmology, and ENT", icon: Smile },
        { title: "Physiotherapy", icon: Dumbbell },
        { title: "Gynecology and pediatrics", icon: Baby },
        { title: "Cardiology, dermatology, and oncology", icon: Heart },
        { title: "Dialysis and blood bank", icon: Droplet },
        { title: "Vaccination and insurance", icon: Syringe },
        { title: "Inventory and procurement", icon: Boxes },
        { title: "Accounting and finance", icon: Calculator },
        { title: "Human resources, payroll, and attendance", icon: Users },
        { title: "Asset management", icon: Landmark },
        { title: "Fleet and ambulance", icon: Ambulance },
      ],
    },
    closing: {
      title: "Run it your way",
      body: "CareCentral is available as a cloud subscription or a self-hosted system, so an institution can start with the essential modules and expand as it needs to.",
      options: [
        { title: "Cloud", body: "A subscription, run for the hospital without hosting the system itself.", icon: Cloud },
        { title: "Self-hosted", body: "Installed for the institution, on the infrastructure it chooses to run.", icon: Server },
      ],
    },
  },
  school360: {
    title: "School360",
    kicker: "End-to-end school management on Odoo",
    summary:
      "School360 is an end-to-end school management system on Odoo. Administration, attendance, exams, fees, and parent communication run in one system.",
    image: school,
    modules: [
      { title: "Administration", body: "School records and the day-to-day running of the school.", icon: Building2 },
      { title: "Attendance", body: "Attendance kept with the rest of the student record.", icon: CalendarCheck },
      { title: "Exams", body: "Exams recorded in the same system as attendance and fees.", icon: GraduationCap },
      { title: "Fees", body: "School fees handled with administration and the student record.", icon: Wallet },
      { title: "Parents", body: "The school reaches parents from the same system.", icon: MessagesSquare },
    ],
  },
};

const AppMark = ({ icon: Icon, tone, size = "lg" }: { icon: LucideIcon; tone: string; size?: "lg" | "sm" }) => (
  <div
    className={`flex items-center justify-center text-white ${
      size === "lg" ? "h-[4.75rem] w-[4.75rem] rounded-[1.4rem]" : "h-11 w-11 rounded-2xl"
    }`}
    style={{ backgroundColor: tone, boxShadow: "0 12px 28px rgba(0, 90, 140, 0.18)" }}
  >
    <Icon className={size === "lg" ? "h-8 w-8" : "h-5 w-5"} strokeWidth={1.75} />
  </div>
);

const ProductDetail = () => {
  const { slug } = useParams();
  const product = slug ? products[slug] : undefined;

  if (!product) {
    return (
      <div className="min-h-screen bg-[#f3f8fb] px-4 pb-20 pt-32 text-gray-800">
        <div className="site-shell">
          <h1 className="text-3xl font-bold text-gray-900">This product is not listed.</h1>
          <Link to="/#products" className="mt-6 inline-flex items-center gap-2 font-semibold text-[#0078B7]">
            <ArrowLeft className="h-4 w-4" />
            Back to products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-800 antialiased">
      <section className="relative overflow-hidden bg-[#f3f8fb] pt-28">
        <div className="pointer-events-none absolute -left-24 top-28 h-72 w-72 rounded-full bg-[#0078B7]/10" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-20 top-48 h-80 w-80 rounded-full bg-[#2B9AD4]/20" aria-hidden="true" />
        <div className="site-wide relative pb-20 pt-4">
          <Link to="/#products" className="inline-flex items-center gap-2 text-sm font-semibold text-[#0078B7]">
            <ArrowLeft className="h-4 w-4" />
            Back to products
          </Link>
          <div className="mx-auto mt-10 max-w-3xl text-center">
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 md:text-6xl">{product.title}</h1>
            <p className="mt-4 text-xl font-medium text-[#0078B7]">{product.kicker}</p>
            <p className="mt-5 text-lg leading-relaxed text-gray-600">{product.summary}</p>
          </div>
          <div className="relative mx-auto mt-14 max-w-3xl">
            <div className="absolute inset-x-8 top-8 h-44 rounded-[2.75rem] bg-[#0078B7] md:inset-x-16" aria-hidden="true" />
            <div className="relative flex min-h-72 items-center justify-center rounded-[2rem] bg-white px-8 py-10 shadow-[0_28px_70px_rgba(0,70,110,0.14)]">
              <img src={product.image} alt={product.title} className="max-h-60 w-full object-contain" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="site-wide">
          <h2 className="text-center text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">One system</h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-lg text-gray-600">The modules this product is built around.</p>
          <div className="mt-16 grid grid-cols-2 gap-x-6 gap-y-14 sm:grid-cols-3 lg:grid-cols-4">
            {product.modules.map((module, index) => {
              const Icon = module.icon;
              return (
                <article key={module.title} className="text-center">
                  <div className="mx-auto w-fit transition duration-300 hover:-translate-y-1">
                    <AppMark icon={Icon} tone={tones[index % tones.length]} />
                  </div>
                  <h3 className="mt-4 text-base font-bold text-gray-900">{module.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-gray-600">{module.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {product.more ? (
        <section className="bg-[#f3f8fb] py-20">
          <div className="site-wide">
            <h2 className="text-center text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">Expand as you grow</h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-gray-600">{product.more.intro}</p>
            <ul className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
              {product.more.items.map((item, index) => (
                <li key={item.title} className="text-center">
                  <div className="mx-auto w-fit">
                    <AppMark icon={item.icon} tone={tones[index % tones.length]} size="sm" />
                  </div>
                  <p className="mt-3 text-sm font-semibold leading-snug text-gray-900">{item.title}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {product.closing ? (
        <section className="py-20">
          <div className="site-wide">
            <h2 className="text-center text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">{product.closing.title}</h2>
            <p className="mx-auto mt-4 max-w-3xl text-center text-lg leading-relaxed text-gray-600">{product.closing.body}</p>
            {product.closing.options ? (
              <div className="mt-12 grid gap-6 md:grid-cols-2">
                {product.closing.options.map((option, index) => {
                  const Icon = option.icon;
                  const lead = index === 0;
                  return (
                    <article key={option.title} className={`rounded-[2rem] p-10 ${lead ? "bg-[#0078B7] text-white" : "bg-[#e8f4fb] text-gray-900"}`}>
                      <Icon className="h-8 w-8" />
                      <h3 className="mt-6 text-3xl font-bold">{option.title}</h3>
                      <p className={`mt-3 text-lg leading-relaxed ${lead ? "text-white/90" : "text-gray-600"}`}>{option.body}</p>
                    </article>
                  );
                })}
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      <section
        className="relative py-20 text-white"
        style={{
          backgroundImage: `url(${above_the_footer})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0078B7] to-[#005C8A] opacity-50" />
        <div className="site-shell relative z-10 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Let's discuss your project.</h2>
          <p className="mx-auto mb-8 max-w-3xl text-xl font-normal">
            Based in Addis Ababa, BelTech helps businesses put ERP, corporate training, automation, and custom software into daily operations.
          </p>
          <Button
            size="lg"
            className="bg-[#0078B7] px-8 py-3 text-lg text-white hover:bg-[#005C8A]"
            onClick={() => {
              window.location.href = "/contact";
            }}
          >
            Contact the team
          </Button>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
