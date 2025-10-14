"use client";

import React from "react";
import { Button } from "../components/ui/button";
import {
  CheckCircle,
  Users,
  Zap,
  Layers,
  TrendingUp,
  DollarSign,
  Smartphone,
  Globe,
  Shield,
  ArrowDown,
  Award,
} from "lucide-react";
import hero from "./../assets/homepage/hero.png";
import odoo from "./../assets/homepage/odoo.png";
import odooErp from "./../assets/homepage/oddoNew.png";
import custom_soft_dev from "./../assets/homepage/customSoftNew.jpg";
import bussiness_automation_int from "./../assets/homepage/automationAndIntegration.jpg";
import emointel from "./../assets/clientLogo/emointel.png";
import frontline from "./../assets/clientLogo/frontline.png";
import mPower from "./../assets/clientLogo/mPower.png";
import fewis from "./../assets/clientLogo/fewis.png";
import osiri from "./../assets/clientLogo/osiri.png";
import above_the_footer from "./../assets/above_the_footer.png";
import beltechImpact from "./../assets/homepage/beltechImpact.png";

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
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center pt-32 pb-24">
            <div className="flex flex-col items-center text-center w-full">
              <div className="mb-6 relative w-full max-w-3xl mx-auto flex justify-center md:justify-start">
                <div className="relative inline-flex items-center text-left -translate-x-6 md:-translate-x-25">
                  <div className="hidden md:block h-0.5 w-16 bg-[#27A2D8] mr-6"></div>
                  <span className="inline-block text-sm font-medium text-[#27A2D8]">
                    DIGITAL TRANSFORMATION EXPERTS
                  </span>
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-light mb-6 leading-tight">
                Streamline. Automate. Scale.
              </h1>
              <p className="text-lg md:text-xl text-white max-w-3xl mx-auto mb-0">
                Transforming African businesses with ERP, automation, and smart software solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Button
                  size="lg"
                  className="text-white px-8 py-3 text-lg transition-all duration-200 hover:scale-105 bg-[#27A2D8]"
                  onClick={() => (window.location.href = "/Contact")}
                >
                  Get a Free Consultation
                </Button>

                <a href="/Contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white px-8 py-3 text-lg transition-all duration-200 hover:scale-105 bg-transparent"
                  >
                    See Live Demo
                  </Button>
                </a>

                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white px-8 py-3 text-lg transition-all duration-200 hover:scale-105 bg-transparent"
                  onClick={() => (window.location.href = "/Contact")}
                >
                  Book a Demo
                </Button>
              </div>
            </div>
          </div>
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-center flex flex-col items-center pointer-events-auto">
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
          </div>
        </section>



        {/* our soluton section*/}
        <section id="solutions-section" className="py-10 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Solutions
              </h2>
              <p className="text-xl font-normal text-black max-w-3xl mx-auto">
                We provide comprehensive digital transformation solutions that
                help African businesses thrive in the modern economy.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

              <div className="group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0">
                <div className="w-full h-64 overflow-hidden">
                  <img
                    src={odooErp}
                    alt="Odoo ERP Implementation"
                    className="w-full h-full object-cover object-top block"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-black mb-3">
                    Odoo ERP Implementation
                  </h3>
                  <p className="text-base font-normal text-black mb-6">
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

              <div className="group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0">
                <div className="w-full h-64 overflow-hidden">
                  <img
                    src={bussiness_automation_int}
                    alt="Business Automation & Integration"
                    className="w-full h-full object-cover object-top block"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-black mb-3">
                    Automation & Integration
                  </h3>
                  <p className="text-base font-normal text-black mb-4">
                    Automation workflows that reduce
                    errors, cut down on costs, and free your
                    team’s time.

                  </p>
                  <a
                    onClick={() => (window.location.href = "/Services")}
                    className="text-[#27A2D8] font-bold flex items-center space-x-2 hover:underline cursor-pointer"
                  >
                    <span>Learn More</span>
                  </a>
                </div>
              </div>

              <div className="group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0">
                <div className="w-full h-64 overflow-hidden">
                  <img
                    src={custom_soft_dev}
                    alt="Custom Software Development"
                    className="w-full h-full object-cover object-top block"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-black mb-3">
                    Custom Software Development
                  </h3>
                  <p className="text-base font-normal text-black mb-4">
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

        {/* beltech impact section*/}<section className="py-10 bg-white">
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
                    <h3 className="text-xl font-bold text-black mb-2">Odoo-certified ERP experts</h3>
                    <p className="text-base font-normal text-black">
                      Our team holds official Odoo certifications and deep expertise in ERP implementation.
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

        <section className="py-10 bg-[#f7f8fa]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
                We Build Digital Solutions
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">

              <div className="bg-white p-6 rounded-2xl shadow-md transition-shadow duration-300">
                <div className="flex flex-col items-start">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center bg-[#f7f8fa]">
                    <Smartphone className="h-6 w-6 text-[#27A2D8]" />
                  </div>
                  <h3 className="text-xl font-bold text-black mb-2">
                    Mobile App Development
                  </h3>
                  <p className="text-base font-normal text-black">
                    Native and cross-platform mobile applications for iOS and Android.
                  </p>
                  <ul className="mt-2 list-disc list-inside text-base font-normal text-black">
                    <li>iOS Development</li>
                    <li>Android Development</li>
                    <li>Cross-Platform Apps</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-md transition-shadow duration-300 flex flex-col justify-center row-span-2 self-center">
                <div className="flex flex-col items-start">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center bg-[#f7f8fa]">
                    <Globe className="h-6 w-6 text-[#27A2D8]" />
                  </div>
                  <h3 className="text-xl font-bold text-black mb-2">
                    Web Development
                  </h3>
                  <p className="text-base font-normal text-black">
                    Modern, responsive websites and web applications with cutting-edge technology.
                  </p>
                  <ul className="mt-2 list-disc list-inside text-base font-normal text-black">
                    <li>Responsive Design</li>
                    <li>Progressive Web Apps</li>
                    <li>E-commerce Solutions</li>
                  </ul>
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-md transition-shadow duration-300">
                <div className="flex flex-col items-start">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center bg-[#f7f8fa]">
                    <Zap className="h-6 w-6 text-[#27A2D8]" />
                  </div>
                  <h3 className="text-xl font-bold text-black mb-2">
                    API Development & Integrations
                  </h3>
                  <p className="text-base font-normal text-black">
                    Seamless integrations for secure, real-time connectivity.
                  </p>
                  <ul className="mt-2 list-disc list-inside text-base font-normal text-black">
                    <li>Custom API Developments</li>
                    <li>Third-Party Integrations</li>
                    <li>Data Synchronization</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-md transition-shadow duration-300">
                <div className="flex flex-col items-start">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center bg-[#f7f8fa]">
                    <Shield className="h-6 w-6 text-[#27A2D8]" />
                  </div>
                  <h3 className="text-xl font-bold text-black mb-2">
                    Security Solutions
                  </h3>
                  <p className="text-base font-normal text-black">
                    Robust security implementation and compliance-ready applications.
                  </p>
                  <ul className="mt-2 list-disc list-inside text-base font-normal text-black">
                    <li>Data Protection</li>
                    <li>Security Audits</li>
                    <li>Compliance Standards</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-md transition-shadow duration-300">
                <div className="flex flex-col items-start">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center bg-[#f7f8fa]">
                    <Zap className="h-6 w-6 text-[#27A2D8]" />
                  </div>
                  <h3 className="text-xl font-bold text-black mb-2">
                    AI, Bots & Automation
                  </h3>
                  <p className="text-base font-normal text-black">
                    Smarter systems that automate, assist, and optimize.
                  </p>
                  <ul className="mt-2 list-disc list-inside text-base font-normal text-black">
                    <li>AI chatbots for instant support</li>
                    <li>Automation to cut manual work</li>
                    <li>Insights that drive decisions</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* testimonial section */}
        <section className="py-10 bg-white relative overflow-hidden">
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
              {/* 👇 This flex container scrolls smoothly forever */}
              <div className="flex gap-12 whitespace-nowrap animate-marquee will-change-transform">
                {[
                  { name: "Emointel leaders corner", img: emointel, testimonial: "Emointel leaders corner loved our digital transformation solutions!" },
                  { name: "Frontline Estate Solution LLC", img: frontline, testimonial: "Frontline Estate Solution LLC experienced amazing growth with BelTech Solutions!" },
                  { name: "M Power Financing", img: mPower, testimonial: "M Power Financing praises our innovative approach!" },
                  { name: "Fewis Digital Medical Solutions", img: fewis, testimonial: "Fewis Digital Medical Solutions saw remarkable results!" },
                  { name: "Osiri University", img: osiri, testimonial: "Osiri University appreciated our efficiency!" },
                ]
                  // duplicate once for seamless flow
                  .concat([
                    { name: "Emointel leaders corner", img: emointel, testimonial: "Emointel leaders corner loved our digital transformation solutions!" },
                    { name: "Frontline Estate Solution LLC", img: frontline, testimonial: "Frontline Estate Solution LLC experienced amazing growth with BelTech Solutions!" },
                    { name: "M Power Financing", img: mPower, testimonial: "M Power Financing praises our innovative approach!" },
                    { name: "Fewis Digital Medical Solutions", img: fewis, testimonial: "Fewis Digital Medical Solutions saw remarkable results!" },
                    { name: "Osiri University", img: osiri, testimonial: "Osiri University appreciated our efficiency!" },
                  ])
                  .map((client, idx) => {
                    let height = "h-40";
                    let width = "w-40";
                    if (idx % 5 === 2) width = "w-98";

                    return (
                      <div
                        key={idx}
                        className="relative flex flex-col items-center group flex-shrink-0"
                      >
                        {/* Logo */}
                        <div
                          className={`flex items-center justify-center transition-transform duration-200 group-hover:scale-110 z-10 ${width} ${height}`}
                        >
                          <img
                            src={client.img}
                            alt={client.name}
                            className="h-full w-full object-contain"
                          />
                        </div>

                        {/* Testimonial tooltip */}
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
                    );
                  })}
              </div>
            </div>
          </div>

          {/* Custom animation styles */}
          <style>
            {`
      @keyframes marquee {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }

      .animate-marquee {
        display: flex;
        width: max-content;
        animation: marquee 30s linear infinite;
      }

      /* 👇 This eliminates the visible "jump" at the loop point */
      .animate-marquee::after {
        content: '';
        display: block;
        width: 50%;
      }

      /* Optimize for smooth GPU rendering */
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