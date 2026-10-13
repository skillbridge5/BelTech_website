import { Button } from '../components/ui/button';
import { useEffect, type ComponentType, type ReactNode } from 'react';
import { CheckCircle, Zap, Users, Globe, Settings, GraduationCap } from 'lucide-react';
import Hero from "./../assets/servicepage/hero1.png";
import HeroMobile from "./../assets/servicepage/heroMobile.png";
import ERPImp from "./../assets/homepage/oddoNew.png";
import customSoft from "./../assets/servicepage/customSoftNew.png";
import bussinesAuto from "./../assets/servicepage/businessAuto.png";
import above_the_footer from "./../assets/above_the_footer.png";
import { motion } from "framer-motion";
import PageIntro from "../components/PageIntro";

const trainingImg = "/training.jpg";

type IconType = ComponentType<{ className?: string }>;

const CheckItem = ({ children }: { children: ReactNode }) => (
  <li className="flex items-start gap-3">
    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#0078B7]" />
    <span className="text-base leading-relaxed text-gray-700">{children}</span>
  </li>
);

const FeatureCard = ({
  icon: Icon,
  title,
  description,
}: {
  icon: IconType;
  title: string;
  description?: string;
}) => (
  <article className="flex h-full flex-col items-center rounded-2xl border border-gray-200 bg-white px-5 py-6 text-center shadow-sm transition duration-300 hover:border-[#0078B7] hover:shadow-md">
    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E8F4FB] text-[#0078B7]">
      <Icon className="h-6 w-6" />
    </div>
    <h3 className="mt-4 text-base font-bold leading-snug text-gray-900">{title}</h3>
    {description ? (
      <p className="mt-2 text-sm leading-relaxed text-gray-600">{description}</p>
    ) : null}
  </article>
);

const ServicePhoto = ({ src, alt, fromLeft = false }: { src: string; alt: string; fromLeft?: boolean }) => (
  <motion.div
    initial={{ opacity: 0, x: fromLeft ? -20 : 20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: 0.2 }}
    className={`w-full overflow-hidden rounded-2xl border border-gray-200 bg-[#f4f7fb] shadow-md lg:w-1/2 ${fromLeft ? "lg:order-1" : ""}`}
  >
    <img
      src={src}
      alt={alt}
      className="h-[280px] w-full object-cover sm:h-[360px] lg:h-[425px]"
      style={{ objectPosition: "center top" }}
    />
  </motion.div>
);

const Servicespage = () => {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#f7f8fa] font-sans text-gray-800 antialiased">
      <PageIntro
        image={Hero}
        mobileImage={HeroMobile}
        title="ERP, training, automation, and software for your operations."
      >
        ERP setup, corporate team training, system integration, and custom software for daily operations.
      </PageIntro>

      <section id="erp-implementation" className="scroll-mt-24 bg-white py-20">
        <div className="site-wide">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center gap-10 lg:flex-row lg:gap-14"
          >
            <div className="w-full lg:w-1/2">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">ERP Implementation</h2>
              <p className="mb-8 text-base leading-relaxed text-gray-600">
                Integrate all your core departments: manufacturing, inventory, sales, HR, and accounting with tailored ERP solutions built on Odoo. The service includes:
              </p>
              <ul className="space-y-3">
                <CheckItem>Department Integration</CheckItem>
                <CheckItem>Local Compliance</CheckItem>
                <CheckItem>Full Support</CheckItem>
              </ul>
            </div>
            <ServicePhoto src={ERPImp} alt="ERP Implementation" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
          >
            <FeatureCard
              icon={Users}
              title="Department Integration"
              description="Sales, inventory, manufacturing, HR, and accounting modules working seamlessly together."
            />
            <FeatureCard
              icon={Globe}
              title="Local Compliance"
              description="Support for local regulations, tax requirements, and multi-language features."
            />
            <FeatureCard
              icon={Settings}
              title="Full Support"
              description="Training, go-live support, ongoing maintenance, and system upgrades."
            />
          </motion.div>
        </div>
      </section>

      <section id="business-process-automation" className="scroll-mt-24 bg-[#f7f8fa] py-20">
        <div className="site-wide">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center gap-10 lg:flex-row lg:gap-14"
          >
            <div className="w-full lg:order-2 lg:w-1/2">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">Business Process Automation</h2>
              <p className="mb-8 text-base leading-relaxed text-gray-600">
                Streamline your operations with intelligent automation that reduces manual work and increases efficiency. We help you connect systems and automate everyday tasks — reducing manual work and boosting efficiency. You can request:
              </p>
              <ul className="space-y-3">
                <CheckItem>Data Syncing & Real-Time Dashboards</CheckItem>
                <CheckItem>Workflow Automation</CheckItem>
                <CheckItem>Smart Dashboards</CheckItem>
                <CheckItem>Payment Integration</CheckItem>
                <CheckItem>System Integration</CheckItem>
              </ul>
            </div>
            <ServicePhoto src={bussinesAuto} alt="Business Process Automation" fromLeft />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5"
          >
            <FeatureCard icon={Zap} title="Data Syncing & Real-Time Dashboards" />
            <FeatureCard icon={Settings} title="Workflow Automation" />
            <FeatureCard icon={Globe} title="Smart Dashboards" />
            <FeatureCard icon={CheckCircle} title="Payment Integration" />
            <FeatureCard icon={Users} title="System Integration" />
          </motion.div>
        </div>
      </section>

      <section id="custom-software-development" className="scroll-mt-24 bg-white py-20">
        <div className="site-wide">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center gap-10 lg:flex-row lg:gap-14"
          >
            <div className="w-full lg:w-1/2">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">Custom Software Development</h2>
              <p className="mb-8 text-base leading-relaxed text-gray-600">
                Get bespoke software solutions that perfectly fit your business processes and requirements, built with modern technologies and best practices. We deliver:
              </p>
              <ul className="space-y-3">
                <CheckItem>Custom Web & Mobile Applications</CheckItem>
                <CheckItem>Ongoing Support & Maintenance</CheckItem>
                <CheckItem>Enterprise Software Solutions</CheckItem>
                <CheckItem>API Design & System Integration</CheckItem>
                <CheckItem>Security-first approach</CheckItem>
              </ul>
            </div>
            <ServicePhoto src={customSoft} alt="Custom Software Development" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4"
          >
            <FeatureCard
              icon={Users}
              title="User Portals"
              description="Customer and employee self-service portals"
            />
            <FeatureCard
              icon={Zap}
              title="Internal Tools"
              description="Custom business applications and dashboards"
            />
            <FeatureCard
              icon={Globe}
              title="Responsive Design"
              description="Mobile-first applications that work on all devices"
            />
            <FeatureCard
              icon={Settings}
              title="API Design & System Integration"
              description="Extend ERP and connect systems with custom APIs."
            />
          </motion.div>
        </div>
      </section>

      <section id="corporate-erp-training" className="scroll-mt-24 bg-[#f7f8fa] py-20">
        <div className="site-wide">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center gap-10 lg:flex-row lg:gap-14"
          >
            <div className="w-full lg:order-2 lg:w-1/2">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">Corporate ERP Training</h2>
              <p className="mb-8 text-base leading-relaxed text-gray-600">
                BelTech trains company teams on Odoo and ERPNext. Sessions are for the people who will use the system every day, not only for IT. The training includes:
              </p>
              <ul className="space-y-3">
                <CheckItem>Sessions by role for finance, sales, inventory, and HR</CheckItem>
                <CheckItem>Practice on the Odoo or ERPNext system the company will run</CheckItem>
                <CheckItem>Training for the team that stays with the ERP after go-live</CheckItem>
                <CheckItem>Daily work covered for the people who use the system, not only IT</CheckItem>
              </ul>
            </div>
            <ServicePhoto src={trainingImg} alt="Corporate ERP Training" fromLeft />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4"
          >
            <FeatureCard
              icon={Users}
              title="By role"
              description="Finance, sales, inventory, and HR practice the screens they own"
            />
            <FeatureCard
              icon={Settings}
              title="On your system"
              description="Training follows the Odoo or ERPNext setup the company will run"
            />
            <FeatureCard
              icon={CheckCircle}
              title="After go-live"
              description="The team learns how to keep daily work moving"
            />
            <FeatureCard
              icon={GraduationCap}
              title="For daily users"
              description="Sessions are for the people who use the system, not only IT"
            />
          </motion.div>
        </div>
      </section>

      <section
        className="relative py-20 text-white"
        style={{
          backgroundImage: `url(${above_the_footer})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 z-0 bg-black/60" />
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#0078B7] to-[#005C8A] opacity-50" />
        <div className="site-shell relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Let's discuss your project.</h2>
            <p className="mx-auto mb-8 max-w-3xl text-xl font-normal">
              Based in Addis Ababa, BelTech helps businesses put ERP, corporate training, automation, and custom software into daily operations.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="bg-[#0078B7] px-8 py-3 text-lg text-white hover:bg-[#005C8A]"
                onClick={() => { window.location.href = '/contact'; }}
              >
                Contact the team
              </Button>
              <Button
                size="lg"
                className="bg-[#0078B7] px-8 py-3 text-lg text-white hover:bg-[#005C8A]"
                onClick={() => { window.location.href = '/solutions'; }}
              >
                View Success Stories
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Servicespage;
