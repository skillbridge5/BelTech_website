"use client";

import { Mail, Linkedin, Github, Send, Youtube } from "lucide-react";
import { Button } from "./ui/button";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "About Us", path: "/about" },
    { name: "Solutions", path: "/solutions" },
    { name: "Insights", path: "/insights" },
    { name: "Contact", path: "/contact" },
  ];

  const socialLinks = [
    { icon: Mail, url: "mailto:beltechsolns@gmail.com" },
    {
      icon: Linkedin,
      url: "https://www.linkedin.com/company/beltech-solution/",
    },
    { icon: Github, url: "#" },
    { icon: Send, url: "https://t.me/belTechSolns" },
    { icon: Youtube, url: "https://www.youtube.com/@BeltechSolns" },
  ];

  return (
    <footer className="bg-black text-white w-full">
      <div className="w-full pt-8 pb-12 px-6 md:px-8 lg:px-12 relative">
        <div className="flex flex-col md:flex-row justify-between items-start w-full relative">
          {/* Logo + About */}
          <div className="flex-1 flex flex-col items-start">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-white rounded-full p-2 flex items-center justify-center">
                <img
                  src={logo}
                  alt="BelTech Logo"
                  className="h-16 w-16 object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-lg text-white">
                  BelTech Solutions
                </span>
                <span className="text-white text-sm">
                  ERP & Software Development
                </span>
              </div>
            </div>

            <p className="text-white mb-4 max-w-md text-sm leading-relaxed">
              Empowering African businesses with tailored ERP, automation, and
              digital transformation solutions. Based in Addis Ababa, serving
              businesses across Africa.
            </p>

            {/* Social Icons */}
            <div className="flex space-x-5">
              {socialLinks.map((item, i) => (
                <a
                  key={i}
                  href={item.url}
                  target={item.url !== "#" ? "_blank" : undefined}
                  rel={item.url !== "#" ? "noopener noreferrer" : undefined}
                  className="text-white hover:text-[#27A2D8] transition-colors"
                >
                  <item.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex-1 md:absolute md:left-1/2 md:-translate-x-1/2 flex flex-col items-center text-center mt-8 md:mt-0 z-10">
            <h3 className="text-base font-medium mb-3 text-white">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-white hover:text-[#27A2D8] text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Live Demo Section */}
          <div className="flex-1 flex flex-col items-start md:items-end text-left md:text-right mt-8 md:mt-0">
            <div className="flex flex-col space-y-3 w-full max-w-xs">
              <h3 className="text-base font-medium text-white text-left">
                Try Our ERP System
              </h3>
              <p className="text-white text-sm text-left">
                Experience our ERP platform in action.
              </p>

              {/* Credentials Box */}
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-3 text-sm text-white shadow-md">
                <p className="text-left mb-2">
                  Use the demo credentials below:
                </p>
                <div className="text-left space-y-1">
                  <p>
                    <strong>Username:</strong> erp-demo
                  </p>
                  <p>
                    <strong>Password:</strong> erp-demo
                  </p>
                </div>
              </div>

              <Button
                onClick={() =>
                  window.open("https://google.com", "_blank")
                }
                className="px-4 bg-[#27A2D8] hover:bg-[#1f8cb8] text-white rounded-md text-sm shadow-md transition-all"
              >
                Watch Live Demo
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="border-t border-gray-800 mt-16 pt-8 text-center">
          <p className="text-[#9CA3AF] text-sm">
            © 2025 BelTech Solutions. All rights reserved. | Addis Ababa,
            Ethiopia
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
