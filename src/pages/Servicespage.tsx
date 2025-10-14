import { Button } from '../components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { CheckCircle, Zap, Users, Globe, Settings } from 'lucide-react';
import Hero from "./../assets/servicepage/heroNew.png";
import HeroMobile from "./../assets/servicepage/heroMobile.png";
import ERPImp from "./../assets/homepage/oddoNew.png";
import customSoft from "./../assets/servicepage/customSoftware.png";
import bussinesAuto from "./../assets/servicepage/businessAuto.png";
import above_the_footer from "./../assets/above_the_footer.png";

const Servicespage = () => {
  return (
    <div className="min-h-screen font-sans text-gray-800 antialiased">
 <section className="relative w-full h-screen overflow-hidden">

      <div
        className="absolute inset-0 w-full h-full bg-center bg-no-repeat bg-cover hidden md:block"
        style={{
          backgroundImage: `url(${Hero})`,
          backgroundPosition: "center 20%",
          backgroundColor: "black",
          transform: "scale(1.15)",
          transformOrigin: "center",
        }}
      ></div>
      <div
        className="absolute inset-0 w-full h-full bg-center bg-no-repeat bg-cover block md:hidden"
        style={{
          backgroundImage: `url(${HeroMobile})`,
          backgroundPosition: "center center",
          backgroundColor: "black",
          transform: "scale(1.1)",
          transformOrigin: "center",
        }}
      ></div>
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.2)),
            linear-gradient(to left, rgba(39,162,216,0.5) 0%, rgba(39,162,216,0.0) 40%)
          `,
        }}
      ></div>

      <div className="absolute inset-0 flex items-center">
        <div className="w-full px-4 lg:px-8 text-white">
          <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl">
            Our Services
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl">
            Transforming business operations through smart ERP, system
            integration, and custom software solutions.
          </p>
        </div>
      </div>
    </section>


     <section className="bg-white py-11 container mx-auto px-4 md:px-8 lg:px-12">
  <div className="flex flex-col lg:flex-row items-start gap-12">
    
    <div className="flex-1 flex flex-col justify-between">
      <div>
        <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
          ERP Implementation
        </h2>
        <p className="mb-8 text-gray-600">
          Integrate all your core departments: manufacturing, inventory, sales, HR, and accounting with tailored ERP solutions built on Odoo. The service includes:
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-start border-l-4 border-[#27A2D8] bg-white p-4 rounded-xl shadow-md hover:shadow-lg">
          <div className="ml-3">
            <h4 className="text-lg font-semibold text-gray-900">Department Integration</h4>
            <p className="text-sm text-gray-600">
              Sales, inventory, manufacturing, HR, and accounting modules working seamlessly together.
            </p>
          </div>
        </div>

        <div className="flex items-start border-l-4 border-[#27A2D8] bg-white p-4 rounded-xl shadow-md hover:shadow-lg">
          <div className="ml-3">
            <h4 className="text-lg font-semibold text-gray-900">Local Compliance</h4>
            <p className="text-sm text-gray-600">
              Support for local regulations, tax requirements, and multi-language features.
            </p>
          </div>
        </div>

        <div className="flex items-start border-l-4 border-[#27A2D8] bg-white p-4 rounded-xl shadow-md hover:shadow-lg">
          <div className="ml-3">
            <h4 className="text-lg font-semibold text-gray-900">Full Support</h4>
            <p className="text-sm text-gray-600">
              Training, go-live support, ongoing maintenance, and system upgrades.
            </p>
          </div>
        </div>
      </div>
    </div>

    <div className="flex-1 flex justify-center items-start">
      <img
        src={ERPImp}
        alt="ERP Implementation"
        className="rounded-lg object-contain w-full max-h-[500px] lg:max-h-[450px]"
        style={{ objectPosition: 'top' }}
      />
    </div>
  </div>
</section>


      <section className="bg-gray-100 py-10">
        <div className="container mx-auto px-4 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-start gap-12">
            <div className="flex justify-center lg:justify-end">
              <img
                src={bussinesAuto}
                alt="Business Process Automation"
                className="rounded-lg object-cover w-full h-full max-h-[500px]"
              />
            </div>

            <div>
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">Business Process Automation</h2>
              <p className="mb-8 text-gray-900">
               Streamline your operations with intelligent automation that reduces manual work and increases efficiency. We help you connect systems and automate everyday tasks — reducing manual work and boosting efficiency.  </p>

              <h4 className="text-lg font-semibold text-gray-900 mb-3">You can request:</h4>
              <ul className="list-disc list-inside space-y-2 text-gray-900">
                <li>Data Syncing & Real-Time Dashboards</li>
                <li>Workflow Automation</li>
                <li>Smart Dashboards</li>
                <li>Payment Integration</li>
                <li>System Integration</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-10 container mx-auto px-4 md:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row items-stretch gap-12">
          <div className="flex-1 flex flex-col justify-start">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">Custom Software Development</h2>
            <p className="mb-8 text-gray-600">
            Get bespoke software solutions that perfectly fit your business processes and requirements, built with modern technologies and best practices. We deliver:

</p>

            <ul className="space-y-4">
              <li className="flex items-start">
                <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-[#27A2D8]" />
                <span className="ml-3 text-gray-600">Custom Web & Mobile Applications
</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-[#27A2D8]" />
                <span className="ml-3 text-gray-600">Ongoing Support & Maintenance</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-[#27A2D8]" />
                <span className="ml-3 text-gray-600">Enterprise Software Solutions</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-[#27A2D8]" />
                <span className="ml-3 text-gray-600">API Design & System Integration</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-[#27A2D8]" />
                <span className="ml-3 text-gray-600">Security-first approach</span>
              </li>
            </ul>
          </div>

          <div className="flex-1 flex justify-center items-center lg:justify-end">
            <img
              src={customSoft}
              alt="Custom Software Development"
              className="rounded-lg object-cover w-full h-full max-h-[500px]"
            />
          </div>
        </div>

     <div className="grid grid-cols-1 gap-8 mt-12 md:grid-cols-2 lg:grid-cols-4">
   <Card className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
    <CardHeader className="px-4 pt-1 pb-0">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
        <Users className="h-6 w-6 text-[#27A2D8]" />
      </div>
      <CardTitle className="mt-1 font-bold text-base">User Portals</CardTitle>
      <CardDescription className="mt-1 text-sm text-gray-700">
        Customer and employee self-service portals
      </CardDescription>
    </CardHeader>
  </Card>
  <Card className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
    <CardHeader className="px-4 pt-1 pb-1">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
        <Zap className="h-6 w-6 text-[#27A2D8]" />
      </div>
      <CardTitle className="mt-1 font-bold text-base">Internal Tools</CardTitle>
      <CardDescription className="mt-1 text-sm text-gray-700">
        Custom business applications and dashboards
      </CardDescription>
    </CardHeader>
  </Card>

  <Card className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
    <CardHeader className="px-4 pt-1 pb-1">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
        <Globe className="h-6 w-6 text-[#27A2D8]" />
      </div>
      <CardTitle className="mt-1 font-bold text-base">Responsive Design</CardTitle>
      <CardDescription className="mt-1 text-sm text-gray-700">
        Mobile-first applications that work on all devices
      </CardDescription>
    </CardHeader>
  </Card>

  <Card className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
    <CardHeader className="px-4 pt-1 pb-1">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
        <Settings className="h-6 w-6 text-[#27A2D8]" />
      </div>
      <CardTitle className="mt-1 font-bold text-base">
        API Design & System Integration
      </CardTitle>
      <CardDescription className="mt-1 text-sm text-gray-700">
        Extend ERP and connect systems with custom APIs.
      </CardDescription>
    </CardHeader>
  </Card>
</div>

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
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join hundreds of African businesses that have streamlined their operations with BelTech Solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="px-8 py-3 text-lg transition-all duration-200 hover:scale-105 bg-[#27A2D8] text-white"
              onClick={() => window.location.href = '/contact'}
            >
              Start Your Digital Journey
            </Button>
            <Button
              size="lg"
              className="px-8 py-3 text-lg transition-all duration-200 hover:scale-105 bg-[#27A2D8] text-white"
              onClick={() => window.location.href = '/solutions'}
            >
              View Success Stories
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Servicespage;
