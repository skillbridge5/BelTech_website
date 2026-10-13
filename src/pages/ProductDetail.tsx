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
  LogOut,
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
  UserRound,
  Users,
  Wallet,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Button } from "../components/ui/button";
import above_the_footer from "../assets/above_the_footer.png";
import humanResource from "../assets/homepage/human-resource.svg";
import care from "../assets/homepage/care.jpg";
import school from "../assets/homepage/school.jpg";
import attendanceShot from "../assets/homepage/attendance.jpg";
import payrollShot from "../assets/homepage/payroll-month.jpg";

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
  more?: { heading?: string; intro: string; items: { title: string; icon: LucideIcon }[] };
  flow?: {
    heading: string;
    intro: string;
    steps: { title: string; body: string; icon: LucideIcon }[];
  };
  spotlight?: { kicker: string; title: string; titleAccent?: string; body: string; image: string; imageAlt: string; flip?: boolean };
  companion?: { kicker: string; title: string; titleAccent?: string; body: string; image: string; imageAlt: string; flip?: boolean };
  closing?: { title: string; body: string; options?: { title: string; body: string; icon: LucideIcon }[] };
};

const tones = ["#0078B7", "#1493D4", "#0C6A8A", "#3D8EB5"];

const products: Record<string, ProductPage> = {
  "ethiopian-hrms": {
    title: "BelTech Ethiopian HRMS",
    kicker: "Complete HR and payroll management for Ethiopian businesses",
    summary:
      "BelTech Ethiopian HRMS is an Odoo-based human resource management system designed to automate HR operations, simplify employee management, and support Ethiopian labor regulations.",
    image: humanResource,
    modules: [
      { title: "Employee management", body: "Employee profiles, contracts, departments, promotions, and career history.", icon: IdCard },
      { title: "Biometric attendance", body: "ZKTeco integration, attendance tracking, lateness, absences, and corrections.", icon: Fingerprint },
      { title: "Shift management", body: "Fixed, rotating, and overnight shifts with flexible work schedules.", icon: CalendarClock },
      { title: "Ethiopian payroll and pension", body: "Salary calculations, income tax, pension contributions, allowances, deductions, and payslips.", icon: Banknote },
      { title: "Leave management", body: "Annual, sick, maternity, and other leave types with automated balances and approvals.", icon: CalendarOff },
      { title: "Overtime management", body: "Overtime calculations, approvals, and payroll integration.", icon: Clock },
      { title: "Loans and salary advances", body: "Employee loans, repayment schedules, and payroll deductions.", icon: HandCoins },
      { title: "Performance and promotions", body: "KPI evaluations, appraisals, promotions, and salary adjustments.", icon: Target },
      { title: "Bonuses and incentives", body: "Performance bonuses, incentives, and approval workflows.", icon: Gift },
      { title: "Disciplinary and grievance management", body: "Employee complaints, warnings, investigations, and resolutions.", icon: ShieldAlert },
      { title: "Employee self-service", body: "Leave requests, attendance history, payslips, HR requests, and approvals.", icon: UserRound },
      { title: "Ethiopian calendar", body: "Ethiopian date conversion and public holiday management.", icon: CalendarDays },
      { title: "HR reports and dashboards", body: "Workforce analytics, attendance, payroll, tax, pension, and performance reports.", icon: PieChart },
      { title: "Employee offboarding", body: "Resignations, clearance, final settlements, and exit management.", icon: LogOut },
    ],
    flow: {
      heading: "The HRMS flow",
      intro: "One path from the employee record through attendance, time, and payroll.",
      steps: [
        {
          title: "Employee record",
          body: "Profiles, contracts, departments, promotions, and career history sit in one record.",
          icon: IdCard,
        },
        {
          title: "Biometric attendance",
          body: "Staff check in on a ZKTeco device. The system records attendance, lateness, absences, and corrections.",
          icon: Fingerprint,
        },
        {
          title: "Shifts, leave, and overtime",
          body: "Fixed, rotating, and overnight shifts, leave balances, and overtime feed the same time record.",
          icon: CalendarClock,
        },
        {
          title: "Payroll and pension",
          body: "Salary, income tax, pension, allowances, deductions, loans, and bonuses become the payslip.",
          icon: Banknote,
        },
        {
          title: "Self-service",
          body: "Employees request leave, read attendance, open payslips, and follow approvals.",
          icon: UserRound,
        },
        {
          title: "Offboarding",
          body: "Resignation, clearance, and the final settlement close the record.",
          icon: LogOut,
        },
      ],
    },
    spotlight: {
      kicker: "Attendance",
      title: "The day starts",
      titleAccent: "at the fingerprint.",
      body: "One check-in, and lateness, absences, and corrections are already on the record. Managers stop collecting paper timesheets.",
      image: attendanceShot,
      imageAlt: "Fingerprint attendance device showing Check-In",
    },
    companion: {
      kicker: "Payroll",
      title: "The month closes",
      titleAccent: "on one payslip.",
      body: "Salary, income tax, pension, allowances, and deductions come together when the month ends. The payslip is ready without a second spreadsheet.",
      image: payrollShot,
      imageAlt: "A month closing into one payslip",
      flip: true,
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
    spotlight: {
      kicker: "Patients and clinical work",
      title: "From the front desk to the ward.",
      body: "Registration, the outpatient visit, the laboratory, and intensive care stay on one patient record. The people running the hospital see that work on the same dashboards.",
      image: care,
      imageAlt: "CareCentral healthcare management system",
    },
    flow: {
      heading: "The CareCentral flow",
      intro: "One path from the patient arriving to the team running the hospital.",
      steps: [
        {
          title: "Patient record",
          body: "Registration, medical history, and the profile open the record.",
          icon: Users,
        },
        {
          title: "Outpatient visit",
          body: "Consultations, appointments, diagnoses, prescriptions, and follow-ups stay on that record.",
          icon: Stethoscope,
        },
        {
          title: "Laboratory",
          body: "Requests, sample tracking, results, and reports come back to the same patient.",
          icon: FlaskConical,
        },
        {
          title: "Intensive care",
          body: "Admissions, monitoring, observations, and treatment records continue the chart.",
          icon: HeartPulse,
        },
        {
          title: "Dashboards",
          body: "Operational statistics and management reports show how the hospital is running.",
          icon: LayoutDashboard,
        },
        {
          title: "Access",
          body: "Staff accounts and role-based permissions decide who can see and change each part.",
          icon: Shield,
        },
      ],
    },
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
      "Digitize academics, admissions, attendance, examinations, fees, communication, and administration—all from one integrated, modular ERP platform engineered for educational institutions.",
    image: school,
    modules: [
      { title: "Administration", body: "School records and the day-to-day running of the school.", icon: Building2 },
      { title: "Attendance", body: "Attendance kept with the rest of the student record.", icon: CalendarCheck },
      { title: "Exams", body: "Exams recorded in the same system as attendance and fees.", icon: GraduationCap },
      { title: "Fees", body: "School fees handled with administration and the student record.", icon: Wallet },
      { title: "Parents", body: "The school reaches parents from the same system.", icon: MessagesSquare },
    ],
    spotlight: {
      kicker: "The school day",
      title: "From the register to the parent.",
      body: "Attendance, exams, and fees sit with the student record. The school reaches parents from that same system, so the day is not split across separate books.",
      image: school,
      imageAlt: "School360 school management system",
    },
    flow: {
      heading: "The School360 flow",
      intro: "One path from the school office to the parent.",
      steps: [
        {
          title: "Administration",
          body: "School records and the day-to-day running of the school sit in one place.",
          icon: Building2,
        },
        {
          title: "Attendance",
          body: "Attendance is kept with the rest of the student record.",
          icon: CalendarCheck,
        },
        {
          title: "Exams",
          body: "Exams are recorded in the same system as attendance and fees.",
          icon: GraduationCap,
        },
        {
          title: "Fees",
          body: "School fees are handled with administration and the student record.",
          icon: Wallet,
        },
        {
          title: "Parents",
          body: "The school reaches parents from the same system.",
          icon: MessagesSquare,
        },
      ],
    },
    closing: {
      title: "One system for the school day",
      body: "Built on Odoo. Administration, attendance, exams, fees, and parents in one place.",
    },
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

      {[product.spotlight, product.companion].some(Boolean) ? (
        <section className="bg-white py-8">
          <div className="site-wide space-y-8">
            {[product.spotlight, product.companion].filter(Boolean).map((panel) => (
              <div key={panel!.kicker} className="grid items-center overflow-hidden rounded-[2rem] bg-[#f3f8fb] lg:grid-cols-5">
                <div className={`flex items-center justify-center bg-white px-8 py-10 lg:col-span-2 ${panel!.flip ? "order-2 lg:order-2" : ""}`}>
                  <img
                    src={panel!.image}
                    alt={panel!.imageAlt}
                    className={product.companion ? "h-80 w-full object-contain sm:h-96" : "h-72 w-full object-contain sm:h-80"}
                  />
                </div>
                <div className={`px-8 lg:col-span-3 ${panel!.flip ? "order-1 lg:order-1 lg:pl-14" : "lg:pr-14"} ${product.companion ? "py-12 lg:py-16" : "py-10 lg:py-12"}`}>
                  <p className="text-sm font-bold tracking-wide text-[#0078B7]">{panel!.kicker}</p>
                  <h2 className={`mt-3 max-w-xl font-bold tracking-tight text-gray-900 ${product.companion ? "text-4xl md:text-5xl" : "text-3xl md:text-4xl"}`}>
                    {panel!.title}
                    {panel!.titleAccent ? <span className="text-[#0078B7]"> {panel!.titleAccent}</span> : null}
                  </h2>
                  <p className="mt-4 max-w-xl text-lg leading-relaxed text-gray-600">{panel!.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {product.flow ? (
        <section className="bg-[#f3f8fb] py-20">
          <div className="site-wide">
            <h2 className="text-center text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">{product.flow.heading}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-gray-600">{product.flow.intro}</p>
            <ol className="mx-auto mt-16 max-w-5xl">
              {product.flow.steps.map((step, index) => {
                const Icon = step.icon;
                const last = index === product.flow!.steps.length - 1;
                return (
                  <li key={step.title} className="flex gap-5">
                    <div className="flex w-14 shrink-0 flex-col items-center">
                      <div className="transition duration-300 hover:-translate-y-1">
                        <AppMark icon={Icon} tone={tones[index % tones.length]} size="sm" />
                      </div>
                      {last ? null : <div className="my-2 w-px flex-1 bg-[#0078B7]/25" aria-hidden="true" />}
                    </div>
                    <div className={`min-w-0 flex-1 ${last ? "pb-0" : "pb-10"}`}>
                      <p className="text-sm font-bold text-[#0078B7]">Step {index + 1}</p>
                      <h3 className="mt-1 text-xl font-bold text-gray-900">{step.title}</h3>
                      <p className="mt-2 max-w-xl text-base leading-relaxed text-gray-600">{step.body}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>
      ) : null}

      {product.more ? (
        <section className="bg-[#f3f8fb] py-20">
          <div className="site-wide">
            <h2 className="text-center text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">{product.more.heading ?? "Expand as you grow"}</h2>
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
