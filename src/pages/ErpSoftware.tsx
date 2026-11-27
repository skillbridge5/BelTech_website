import { Link } from "react-router-dom";
// @ts-ignore
import { CheckCircle, Server, Cloud, GraduationCap, Boxes, Workflow } from "lucide-react";
import PageIntro from "../components/PageIntro";
import { Button } from "../components/ui/button";
import servicesIntro from "../assets/servicepage/services-intro.jpg";
import aboveTheFooter from "../assets/above_the_footer.jpg";

const modules = [
  {
    icon: Boxes,
    title: "Inventory and procurement",
    text: "Track stock across warehouses, manage purchase orders, valuation and low-stock alerts in real time.",
  },
  {
    icon: Workflow,
    title: "Sales and finance",
    text: "Quotations, orders, invoicing and ledgers share one record, so reporting never depends on reconciliation.",
  },
  {
    icon: GraduationCap,
    title: "HR and Ethiopian payroll",
    text: "Attendance, income tax, pension and leave handled in one system built for local requirements.",
  },
  {
    icon: Server,
    title: "Manufacturing and projects",
    text: "Bills of materials, production orders, job costing and service delivery tracked from start to finish.",
  },
];

const features = [
  "Odoo and ERPNext implementation in Addis Ababa",
  "Local tax, pension and import-export configuration",
  "Clean migration from spreadsheets and legacy systems",
  "Role-based training in English and Amharic",
  "Cloud or on-premise deployment in Ethiopia",
  "Integration with biometric devices and third-party tools",
  "Ongoing local support and system improvements",
];

const ErpSoftware = () => (
  <div className="bg-white font-sans text-gray-900 antialiased">
    <PageIntro
      image={servicesIntro}
      title="ERP software in Ethiopia"
      overlayClassName="bg-gradient-to-b from-[#041824]/85 via-[#041824]/70 to-[#041824]/85"
    >
      One system for finance, inventory, sales, HR and operations — implemented and supported by a local team.
    </PageIntro>

    <section className="site-wide py-16 md:py-20">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
          ERP software that fits how Ethiopian businesses work
        </h2>
        <p className="mt-5 text-lg leading-relaxed text-gray-700">
          BelTech Solutions implements Odoo and ERPNext for companies in Addis Ababa and across Ethiopia. We
          configure the system around your actual buying, selling, storing and payroll processes, migrate your
          existing data, and train every team that uses the software.
        </p>
        <p className="mt-4 text-base leading-relaxed text-gray-600">
          If your business has outgrown spreadsheets and disconnected accounting tools, an ERP system gives
          everyone the same numbers. Managers see live stock and cash positions, finance closes the month from
          one ledger, and HR runs payroll from approved attendance rather than manual sheets.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild className="rounded-full bg-[#0078B7] px-6 text-white hover:bg-[#005C8A]">
            <Link to="/contact">Request an ERP quotation</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full px-6">
            <Link to="/services">See our ERP services</Link>
          </Button>
        </div>
      </div>
    </section>

    <section className="bg-[#f4f8fb] py-16 md:py-20">
      <div className="site-wide">
        <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
          What the system manages
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {modules.map(({ icon: Icon, title, text }) => (
            <article
              key={title}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-[#0078B7] hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E8F4FB] text-[#0078B7]">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="site-wide py-16 md:py-20">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            Odoo or ERPNext: we help you choose
          </h2>
          <p className="mt-5 leading-relaxed text-gray-700">
            Odoo offers a wide module catalogue and a fast rollout across sales, inventory, accounting and HR.
            ERPNext offers deep manufacturing and inventory features with an open-source licence. We look at
            your processes, reporting, user count and budget before recommending one.
          </p>
          <p className="mt-4 leading-relaxed text-gray-600">
            Both can run in the cloud or on servers inside your organisation. On-premise deployment keeps data
            local and allows work to continue when the internet is unavailable.
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {features.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#0078B7]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-md">
          <img
            src={aboveTheFooter}
            alt="BelTech ERP implementation team working with a client in Addis Ababa"
            loading="lazy"
            decoding="async"
            className="h-full max-h-[520px] w-full object-cover"
          />
        </div>
      </div>
    </section>

    <section className="bg-[#041824] py-16 text-white md:py-20">
      <div className="site-wide text-center">
        <h2 className="text-3xl font-bold md:text-4xl">See the system with your own processes</h2>
        <p className="mx-auto mt-4 max-w-2xl text-white/80">
          Book a demonstration in Addis Ababa or remotely. We will show how your orders, stock, payroll and
          reports would work in one ERP system, then provide a written estimate.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild className="rounded-full bg-[#27A2D8] px-6 text-white hover:bg-[#0078B7]">
            <Link to="/contact">Contact our ERP team</Link>
          </Button>
          <a
            href="https://beltech-erp.blsglob.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full border border-white/30 px-6 py-2 text-sm font-semibold transition hover:bg-white/10"
          >
            Try the live demo
          </a>
        </div>
        <p className="mt-6 text-sm text-white/60">
          Also explore <Link to="/products/ethiopian-hrms" className="underline">Ethiopian HRMS</Link>,{" "}
          <Link to="/products/carecentral" className="underline">CareCentral</Link> and{" "}
          <Link to="/products/school360" className="underline">School360</Link>.
        </p>
      </div>
    </section>
  </div>
);

export default ErpSoftware;
