"use client"

import React from 'react';
import { Button } from "../components/ui/button";
import { CheckCircle, Users, Zap, Layers, TrendingUp, Target, DollarSign, Code, Smartphone, Globe, Shield, Cylinder, } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import hero from "./../assets/homepage/hero.png"
import odoo from "./../assets/homepage/odoo.png"
import odooErp from "./../assets/homepage/odooErp.png"
import custom_soft_dev from "./../assets/homepage/custom_soft_dev.png"
import bussiness_automation_int from "./../assets/homepage/bussiness_automation_int.png"
import aastu from "./../assets/clientLogo/aastu.png"
import awash from "./../assets/clientLogo/awash.png"
import kacha from "./../assets/clientLogo/kacha.png"
import nationalOil from "./../assets/clientLogo/nationalOil.png"
import tomoca from "./../assets/clientLogo/tomoca.png"
import tourismeth from "./../assets/clientLogo/tourismeth.png"
import above_the_footer from "./../assets/above_the_footer.png"
import beltechImpact from "./../assets/homepage/beltechImpact.png"



const Homepage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <section className="relative bg-gray-900 text-white overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${hero})`,
            }}
          ></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <div className="mb-6">
                <span className="inline-block px-4 py-2 rounded-full text-sm font-medium border border-teal-400/30 text-[#61C7D5] bg-teal-500/20">
                  DIGITAL TRANSFORMATION EXPERTS
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">Streamline. Automate. Scale.</h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Empowering African businesses with tailored ERP, automation, and digital transformation solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">

                <Button
                  size="lg"
                  className="text-white px-8 py-3 text-lg transition-all duration-200 hover:scale-105 bg-[#61C7D5] hover:bg-[#4FB3C1]"
                  onClick={() => window.location.href = '/contact'}
                >
                  Get a Free Consultation
                </Button>
                <a href='/Contact'>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 text-lg transition-all duration-200 hover:scale-105 bg-transparent"
                    onClick={() => window.location.href = '/contact'}
                  >

                    See Live Demo
                  </Button>
                </a>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 text-lg transition-all duration-200 hover:scale-105 bg-transparent"
                  onClick={() => window.location.href = '/contact'}
                >
                  Book a Demo
                </Button>
              </div>
            </div>
          </div>
        </section>


        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Solutions</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We provide comprehensive digital transformation solutions that help African businesses thrive in the
                modern economy.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <img
                      src={odooErp}
                      alt="Odoo ERP Implementation"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Odoo ERP Implementation</h3>
                  <p className="text-gray-600 mb-4">
                    Complete ERP solutions tailored for African businesses, with full implementation support and training.
                  </p>
                  <a href="#" className="text-[#61C7D5] font-medium flex items-center space-x-2 hover:underline">
                    <span>Learn More</span>
                    <span className="text-xl">→</span>
                  </a>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <img
                      src={custom_soft_dev}
                      alt="Custom Software Development"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Custom Software Development</h3>
                  <p className="text-gray-600 mb-4">
                    Bespoke ERP solutions tailored for your unique business with full implementation support and training.
                  </p>
                  <a href="#" className="text-[#61C7D5] font-medium flex items-center space-x-2 hover:underline">
                    <span>Learn More</span>
                    <span className="text-xl">→</span>
                  </a>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <img
                      src={bussiness_automation_int}
                      alt="Business Automation & Integration"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Business Automation & Integration</h3>
                  <p className="text-gray-600 mb-4">
                    Complete ERP solutions tailored for African businesses, with full implementation support and training.
                  </p>
                  <a href="#" className="text-[#61C7D5] font-medium flex items-center space-x-2 hover:underline">
                    <span>Learn More</span>
                    <span className="text-xl">→</span>
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>



        <section className="py-20 bg-gray-100 ">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Odoo?</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Odoo is the world's most popular open-source ERP system, trusted by millions of businesses worldwide.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div className="flex flex-col justify-between h-full space-y-4">
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 flex items-start space-x-4 flex-1">
                  <div className="flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-[#61C7D5]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">All-in-One Solution</h3>
                    <p className="text-gray-600">
                      Manage sales, inventory, accounting, HR, and more from a single platform.
                    </p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 flex items-start space-x-4 flex-1">
                  <div className="flex-shrink-0">
                    <Users className="w-6 h-6 text-[#61C7D5]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">User-Friendly Interface</h3>
                    <p className="text-gray-600">
                      Intuitive design that requires minimal training for your team.
                    </p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 flex items-start space-x-4 flex-1">
                  <div className="flex-shrink-0">
                    <Layers className="w-6 h-6 text-[#61C7D5]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Modular Architecture</h3>
                    <p className="text-gray-600">
                      Start with what you need and add modules as your business grows.
                    </p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 flex items-start space-x-4 flex-1">
                  <div className="flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-[#61C7D5]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Scalable Growth</h3>
                    <p className="text-gray-600">
                      From startups to enterprises, Odoo scales with your business needs.
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


        <section className="py-20 bg-white ">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">BelTech Impact</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We combine technical expertise with deep understanding of African business needs to deliver exceptional
                results.
              </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-12 items-stretch">
              <div className="lg:flex-1 flex items-stretch">
                <img
                  src={beltechImpact}
                  alt="BelTech Impact"
                  className="rounded-lg shadow-2xl"
                  style={{ height: '100%' }}
                />
              </div>
              <div className="lg:flex-1 flex flex-col space-y-4 h-full">
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 flex items-start space-x-4 flex-1">
                  <div className="flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-[#61C7D5]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Odoo-certified ERP experts</h3>
                    <p className="text-gray-600">
                      Our team holds official Odoo certifications and deep expertise in ERP implementation.
                    </p>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 flex items-start space-x-4 flex-1">
                  <div className="flex-shrink-0">
                    <Target className="w-6 h-6 text-[#61C7D5]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Real-world African business focus</h3>
                    <p className="text-gray-600">
                      We understand the unique challenges and opportunities of African markets.
                    </p>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 flex items-start space-x-4 flex-1">
                  <div className="flex-shrink-0">
                    <Zap className="w-6 h-6 text-[#61C7D5]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Open-source innovation at your service</h3>
                    <p className="text-gray-600">
                      Leveraging the power of open-source technology for maximum flexibility and value.
                    </p>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 flex items-start space-x-4 flex-1">
                  <div className="flex-shrink-0">
                    <DollarSign className="w-6 h-6 text-[#61C7D5]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Agile, scalable, and cost-effective</h3>
                    <p className="text-gray-600">
                      Solutions that grow with your business while maintaining cost efficiency.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        <section className="container mx-auto my-16 px-4 md:px-8 lg:px-12 bg-gray-100 py-16 rounded-2xl">
          <h6 className="mb-2 text-center text-xl md:text-2xl">✨ Software Development</h6>
          <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">We Build Digital Solutions</h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="bg-white border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="flex flex-col items-start">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                  <Code className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Custom Software Development</CardTitle>
                <CardDescription className="text-gray-900">
                  Tailored solutions built to scale with your business needs and requirements
                  <ul className="mt-2 list-disc list-inside">
                    <li>iOS Development</li>
                    <li>Android Development</li>
                    <li>Cross-Platform Apps</li>
                  </ul>
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="flex flex-col items-start">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                  <Smartphone className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Web Development</CardTitle>
                <CardDescription className="text-gray-900">
                  Modern, responsive websites and web applications with cutting-edge technology
                  <ul className="mt-2 list-disc list-inside">
                    <li>Responsive Design</li>
                    <li>Progressive Web Apps</li>
                    <li>E-commerce Solutions</li>
                  </ul>
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="flex flex-col items-start">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                  <Globe className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>ERP Implementation</CardTitle>
                <CardDescription className="text-gray-900">
                  Enterprise resource planning solutions and business process automation
                  <ul className="mt-2 list-disc list-inside">
                    <li>Business Automation</li>
                    <li>Workflow Management</li>
                    <li>Data Integration</li>
                  </ul>
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="flex flex-col items-start">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                  <Cylinder className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Security Solutions</CardTitle>
                <CardDescription className="text-gray-900">
                  Robust security implementation and compliance-ready applications
                  <ul className="mt-2 list-disc list-inside">
                    <li>Data Protection</li>
                    <li>Security Audits</li>
                    <li>Compliance Standards</li>
                  </ul>
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="flex flex-col items-start">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Performance Optimization</CardTitle>
                <CardDescription className="text-gray-900">
                  High-performance applications optimized for speed and scalability
                  <ul className="mt-2 list-disc list-inside">
                    <li>Speed Optimization</li>
                    <li>Scalable Architecture</li>
                    <li>Performance Monitoring</li>
                  </ul>
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="flex flex-col items-start">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                  <Zap className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Mobile App Development</CardTitle>
                <CardDescription className="text-gray-900">
                  Native and cross-platform mobile applications for iOS and Android
                  <ul className="mt-2 list-disc list-inside">
                    <li>Enterprise Applications</li>
                    <li>API Development</li>
                    <li>System Integration</li>
                  </ul>
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>





        <section className="py-20 bg-white relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Happy Clients</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                See what our clients say about their digital transformation journey with BelTech Solutions.
              </p>
            </div>

            {/* don't forget to ask for actual logos and testimonies  */}
            <div className="flex flex-wrap justify-center items-center gap-12 relative overflow-visible">
              {[
                { name: "Aastu", img: aastu, testimonial: "Aastu loved our digital transformation solutions!" },
                { name: "Awash", img: awash, testimonial: "Awash experienced amazing growth with BelTech Solutions!" },
                { name: "Tomoca", img: tomoca, testimonial: "Tomoca praises our innovative approach!" },
                { name: "TourismEth", img: tourismeth, testimonial: "TourismEth saw remarkable results!" },
                { name: "National Oil", img: nationalOil, testimonial: "National Oil appreciated our efficiency!" },
                { name: "Kacha", img: kacha, testimonial: "Kacha loves our seamless ERP integration!" }
              ].map((client, idx) => (
                <div key={idx} className="relative flex flex-col items-center group">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center transition-transform duration-200 group-hover:scale-110 z-10">
                    <img
                      src={client.img}
                      alt={client.name}
                      className="w-16 h-16 object-contain rounded-full"
                    />
                  </div>

                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 group-hover:translate-y-2 transition-all duration-300 w-64 bg-white shadow-lg rounded-lg p-4 text-center z-50 pointer-events-none">
                    <p className="text-gray-700 text-sm">
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
              Join hundreds of African businesses that have streamlined their operations with BelTech Solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="px-8 py-3 text-lg transition-all duration-200 hover:scale-105 bg-[#61C7D5] text-white"
                onClick={() => window.location.href = '/contact'}
              >
                Start Your Digital Journey
              </Button>
              <Button
                size="lg"
                className="px-8 py-3 text-lg transition-all duration-200 hover:scale-105 bg-[#61C7D5] text-white"
                onClick={() => window.location.href = '/solutions'}
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
