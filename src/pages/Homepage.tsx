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
  Code,
  Smartphone,
  Globe,
  Shield,
  ArrowDown,
  Award,
  Sparkles,
} from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import hero from "./../assets/homepage/hero.png";
import odoo from "./../assets/homepage/odoo.png";
import odooErp from "./../assets/homepage/odooErp.png";
import custom_soft_dev from "./../assets/homepage/customSoft.png";
import bussiness_automation_int from "./../assets/homepage/bussinessAuto.png";
import aastu from "./../assets/clientLogo/aastu.png";
import awash from "./../assets/clientLogo/awash.png";
import kacha from "./../assets/clientLogo/kacha.png";
import nationalOil from "./../assets/clientLogo/nationalOil.png";
import tomoca from "./../assets/clientLogo/tomoca.png";
import tourismeth from "./../assets/clientLogo/tourismeth.png";
import above_the_footer from "./../assets/above_the_footer.png";
import beltechImpact from "./../assets/homepage/beltechImpact.png";

const Homepage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#F0F5F9]">
      <main className="flex-grow">
        <section
          className="relative text-white overflow-hidden"
          style={{
            backgroundImage: `url(${hero})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-8 flex flex-col items-center justify-center text-center">
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 flex items-center justify-center">
                <div className="h-0.5 w-16 bg-[#61C7D5] mr-4 hidden md:block"></div>
                <span className="inline-block px-0 py-0 text-sm font-medium text-[#61C7D5]">
                  DIGITAL TRANSFORMATION EXPERTS
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Streamline. Automate. Scale.
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Empowering African businesses with tailored ERP, automation, and
                digital transformation solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="text-white px-8 py-3 text-lg transition-all duration-200 hover:scale-105 bg-[#61C7D5] hover:bg-[#4FB3C1]"
                  onClick={() => (window.location.href = "/Contact")}
                >
                  Get a Free Consultation
                </Button>
                <a href="/Contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 text-lg transition-all duration-200 hover:scale-105 bg-transparent"
                    onClick={() => (window.location.href = "/Contact")}
                  >
                    See Live Demo
                  </Button>
                </a>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 text-lg transition-all duration-200 hover:scale-105 bg-transparent"
                  onClick={() => (window.location.href = "/Contact")}
                >
                  Book a Demo
                </Button>
              </div>
            </div>
            <div className="mt-16 text-center flex flex-col items-center">
              <span className="text-sm text-white mb-2">
                Discover Our Solutions
              </span>
              <button
                className="p-0 bg-transparent hover:bg-transparent transition-colors duration-200"
                onClick={() => {
                  const solutionsSection =
                    document.getElementById("solutions-section");
                  if (solutionsSection) {
                    solutionsSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                <ArrowDown className="w-8 h-8 text-[#61C7D5]" />
              </button>
            </div>
          </div>
        </section>

        <section id="solutions-section" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Solutions
              </h2>
              <p className="text-xl text-black max-w-3xl mx-auto">
                We provide comprehensive digital transformation solutions that
                help African businesses thrive in the modern economy.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 rounded-2xl">
                <CardContent className="p-0">
                  <img
                    src={odooErp}
                    alt="Odoo ERP Implementation"
                    className="w-full h-64 object-cover rounded-t-2xl"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-black mb-3">
                      Odoo ERP Implementation
                    </h3>
                    <p className="text-black mb-6">
                      Complete ERP solutions tailored for African businesses
                      with full implementation support and training.
                    </p>
                    <a
                      onClick={() => (window.location.href = "/Services") }
                      className="text-[#61C7D5] font-medium flex items-center space-x-2 hover:underline"
                    >
                      <span>Learn More</span>
                      <span className="text-xl">→</span>
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 rounded-2xl">
                <CardContent className="p-0">
                  <img
                    src={bussiness_automation_int}
                    alt="Business Automation & Integration"
                    className="w-full h-64 object-cover rounded-t-2xl"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-black mb-3">
                      Business Automation & Integration
                    </h3>
                    <p className="text-black mb-4">
                      Complete ERP solutions tailored for African businesses
                      with full implementation support and training.
                    </p>
                    <a
                      onClick={() => (window.location.href = "/Services") }
                      className="text-[#61C7D5] font-medium flex items-center space-x-2 hover:underline"
                    >
                      <span>Learn More</span>
                      <span className="text-xl">→</span>
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 rounded-2xl">
                <CardContent className="p-0">
                  <img
                    src={custom_soft_dev}
                    alt="Custom Software Development"
                    className="w-full h-64 object-cover rounded-t-2xl"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-black mb-3">
                      Custom Software Development
                    </h3>
                    <p className="text-black mb-4">
                      Tailored solutions built to scale with your business needs
                      and requirements.
                    </p>
                    <a
                      onClick={() => (window.location.href = "/Services") }
                      className="text-[#61C7D5] font-medium flex items-center space-x-2 hover:underline"
                    >
    
                      <span>Learn More</span>
                      <span className="text-xl" >→</span>
                </a>
                  
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-6 bg-[#f7f8fa] ">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Odoo?
              </h2>
              <p className="text-xl text-black max-w-3xl mx-auto">
                Odoo is the world's most popular open-source ERP system, trusted
                by millions of businesses worldwide.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div className="flex flex-col justify-between h-full space-y-4">
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 flex items-start space-x-4 flex-1">
                  <div className="flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-[#61C7D5]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-black mb-2">
                      All-in-One Solution
                    </h3>
                    <p className="text-black">
                      Manage sales, inventory, accounting, HR, and more from a
                      single platform.
                    </p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 flex items-start space-x-4 flex-1">
                  <div className="flex-shrink-0">
                    <Users className="w-6 h-6 text-[#61C7D5]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-black mb-2">
                      User-Friendly Interface
                    </h3>
                    <p className="text-black">
                      Intuitive design that requires minimal training for your
                      team.
                    </p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 flex items-start space-x-4 flex-1">
                  <div className="flex-shrink-0">
                    <Layers className="w-6 h-6 text-[#61C7D5]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-black mb-2">
                      Modular Architecture
                    </h3>
                    <p className="text-black">
                      Start with what you need and add modules as your business
                      grows.
                    </p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 flex items-start space-x-4 flex-1">
                  <div className="flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-[#61C7D5]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-black mb-2">
                      Scalable Growth
                    </h3>
                    <p className="text-black">
                      From startups to enterprises, Odoo scales with your
                      business needs.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col flex-1 h-full">
                <img
                  src={odoo}
                  alt="Odoo Interface"
                  className="h-full w-full object-cover rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                BelTech Impact
              </h2>
              <p className="text-xl text-black max-w-3xl mx-auto">
                We combine technical expertise with deep understanding of
                African business needs to deliver exceptional results.
              </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-12 items-stretch">
              <div className="lg:flex-1 flex items-stretch">
                <img
                  src={beltechImpact}
                  alt="BelTech Impact"
                  className="rounded-lg shadow-2xl w-full h-full object-cover"
                />
              </div>
              <div className="lg:flex-1 flex flex-col space-y-4 h-full">
                <div className="relative bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200 flex items-start space-x-4 flex-1 overflow-hidden before:absolute before:inset-y-0 before:left-0 before:w-1 before:bg-[#61C7D5]">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#E5F5F9] flex items-center justify-center">
                    <Award className="w-6 h-6 text-[#61C7D5]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-black mb-2">
                      Odoo-certified ERP experts
                    </h3>
                    <p className="text-black">
                      Our team holds official Odoo certifications and deep
                      expertise in ERP implementation.
                    </p>
                  </div>
                </div>
                <div className="relative bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200 flex items-start space-x-4 flex-1 overflow-hidden before:absolute before:inset-y-0 before:left-0 before:w-1 before:bg-[#61C7D5]">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#E5F5F9] flex items-center justify-center">
                    <Globe className="w-6 h-6 text-[#61C7D5]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-black mb-2">
                      Real-world African business focus
                    </h3>
                    <p className="text-black">
                      We understand the unique challenges and opportunities of
                      African markets.
                    </p>
                  </div>
                </div>
                <div className="relative bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200 flex items-start space-x-4 flex-1 overflow-hidden before:absolute before:inset-y-0 before:left-0 before:w-1 before:bg-[#61C7D5]">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#E5F5F9] flex items-center justify-center">
                    <Zap className="w-6 h-6 text-[#61C7D5]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-black mb-2">
                      Open-source innovation at your service
                    </h3>
                    <p className="text-black">
                      Leveraging the power of open-source technology for maximum
                      flexibility and value.
                    </p>
                  </div>
                </div>
                <div className="relative bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200 flex items-start space-x-4 flex-1 overflow-hidden before:absolute before:inset-y-0 before:left-0 before:w-1 before:bg-[#61C7D5]">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#E5F5F9] flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-[#61C7D5]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-black mb-2">
                      Agile, scalable, and cost-effective
                    </h3>
                    <p className="text-black">
                      Solutions that grow with your business while maintaining
                      cost efficiency.
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
              <h6 className="flex justify-center items-center text-md md:text-md   text-black-100 mb-2">
                <Sparkles className="h-6 w-6 mr-0.5 text-[#61C7D5] " />
                SOFTWARE DEVELOPMENT
              </h6>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                We Build Digital Solutions
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
              <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex flex-col items-start">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#E5F5F9]">
                    <Smartphone className="h-6 w-6 text-[#61C7D5]" />
                  </div>
                  <h3 className="text-black font-semibold text-xl mb-2">
                    Mobile App Development
                  </h3>
                  <p className="text-black text-sm">
                    Native and cross-platform mobile applications for iOS and
                    Android
                  </p>
                  <ul className="mt-2 list-disc list-inside text-black">
                    <li>iOS Development</li>
                    <li>Android Development</li>
                    <li>Cross-Platform Apps</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col justify-center row-span-2 self-center">
                <div className="flex flex-col items-start">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#E5F5F9]">
                    <Globe className="h-6 w-6 text-[#61C7D5]" />
                  </div>
                  <h3 className="text-black font-semibold text-xl mb-2">
                    Web Development
                  </h3>
                  <p className="text-black text-sm">
                    Modern, responsive websites and web applications with
                    cutting-edge technology
                  </p>
                  <ul className="mt-2 list-disc list-inside text-black">
                    <li>Responsive Design</li>
                    <li>Progressive Web Apps</li>
                    <li>E-commerce Solutions</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex flex-col items-start">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#E5F5F9]">
                    <Code className="h-6 w-6 text-[#61C7D5]" />
                  </div>
                  <h3 className="text-black font-semibold text-xl mb-2">
                    API Development & Integrations
                  </h3>
                  <p className="text-black text-sm">
                    Seamless integrations for secure, real-time connectivity.
                  </p>
                  <ul className="mt-2 list-disc list-inside text-black">
                    <li>Custom API Developments</li>
                    <li>Third-Party Integrations</li>
                    <li>Data Synchronization</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex flex-col items-start">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#E5F5F9]">
                    <Shield className="h-6 w-6 text-[#61C7D5]" />
                  </div>
                  <h3 className="text-black font-semibold text-xl mb-2">
                    Security Solutions
                  </h3>
                  <p className="text-black text-sm">
                    Robust security implementation and compliance-ready
                    applications
                  </p>
                  <ul className="mt-2 list-disc list-inside text-black">
                    <li>Data Protection</li>
                    <li>Security Audits</li>
                    <li>Compliance Standards</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex flex-col items-start">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#E5F5F9]">
                    <Zap className="h-6 w-6 text-[#61C7D5]" />
                  </div>
                  <h3 className="text-black font-semibold text-xl mb-2">
                    AI, Bots & Automation
                  </h3>
                  <p className="text-black text-sm">
                    Smarter systems that automate, assist, and optimize.
                  </p>
                  <ul className="mt-2 list-disc list-inside text-black">
                    <li>AI chatbots for instant support</li>
                    <li>Automation to cut manual work</li>
                    <li>Insights that drive decisions</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Happy Clients
              </h2>
              <p className="text-xl text-black max-w-3xl mx-auto">
                See what our clients say about their digital transformation
                journey with BelTech Solutions.
              </p>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-12 relative overflow-visible">
              {[
                {
                  name: "Aastu",
                  img: aastu,
                  testimonial: "Aastu loved our digital transformation solutions!",
                },
                {
                  name: "Awash",
                  img: awash,
                  testimonial:
                    "Awash experienced amazing growth with BelTech Solutions!",
                },
                {
                  name: "Tomoca",
                  img: tomoca,
                  testimonial: "Tomoca praises our innovative approach!",
                },
                {
                  name: "TourismEth",
                  img: tourismeth,
                  testimonial: "TourismEth saw remarkable results!",
                },
                {
                  name: "National Oil",
                  img: nationalOil,
                  testimonial: "National Oil appreciated our efficiency!",
                },
                {
                  name: "Kacha",
                  img: kacha,
                  testimonial: "Kacha loves our seamless ERP integration!",
                },
              ].map((client, idx) => (
                <div key={idx} className="relative flex flex-col items-center group">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center transition-transform duration-200 group-hover:scale-110 z-10 shadow-lg">
                    <img
                      src={client.img}
                      alt={client.name}
                      className="w-16 h-16 object-contain rounded-full"
                    />
                  </div>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 group-hover:translate-y-2 transition-all duration-300 w-64 bg-white shadow-lg rounded-lg p-4 text-center z-50 pointer-events-none">
                    <p className="text-black text-sm">
                      "{client.testimonial}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
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
          <div className="absolute inset-0 bg-[#61C7D5]/50 z-0"></div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Join hundreds of African businesses that have streamlined their
              operations with BelTech Solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="px-8 py-3 text-lg transition-all duration-200 hover:scale-105 bg-[#61C7D5]  text-white hover:bg-[#61C7D5]-100"
                onClick={() => (window.location.href = "/contact")}
              >
                Start Your Digital Journey
              </Button>
              <Button
                size="lg"
                className="px-8 py-3 text-lg transition-all duration-200 hover:scale-105 bg-[#61C7D5]  text-white hover:bg-[#61C7D5]-100"
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