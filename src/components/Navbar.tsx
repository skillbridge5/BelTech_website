"use client";

import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/new_logo.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const solutionsPaths = [
    "/solutions",
    "/ERPDetail",
    "/CharityPlatform",
    "/DigitalMarketingDetail",
  ];

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "About", path: "/about" },
    { name: "Solutions", path: "/solutions" },
    { name: "Industries", path: "/industries" },
    { name: "Insights", path: "/insights" },
    { name: "Contact", path: "/contact" },
  ];

  const isActiveLink = (linkPath: string) => {
    if (linkPath === "/solutions") {
      return solutionsPaths.includes(pathname);
    }
    return pathname === linkPath;
  };

  return (
    <nav className="bg-white fixed top-0 w-full z-50">
      <div className="w-full px-4 lg:px-8">
        <div className="flex items-center justify-between h-20 min-h-[55px]">
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt="BelTech Logo"
              className="h-36 w-auto object-contain"
            />
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-md font-medium transition-colors duration-200 ${
                  isActiveLink(link.path)
                    ? "text-[#0078B7] border-b-2 border-[#0078B7]"
                    : "text-gray-900 hover:text-[#0078B7]"
                }`}
              >
                {link.name}
              </Link>
            ))}

            <Button
              className="ml-2 text-white px-5 py-2 text-sm font-medium transition-all duration-200 hover:scale-105 bg-[#0078B7]"
              onClick={() =>
                window.open("https://beltech-erp.blsglob.com/", "_blank")
              }
            >
              Get Demo
            </Button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-[#0078B7] transition-colors duration-200"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t bg-white">
          <div className="px-4 py-3 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`block font-medium px-2 py-1 transition-colors duration-200 ${
                  isActiveLink(link.path)
                    ? "text-[#0078B7] border-b border-[#0078B7]"
                    : "text-gray-700 hover:text-[#0078B7]"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            <Button
              className="w-full mt-2 text-white bg-[#0078B7] hover:bg-[#005C8A]"
              onClick={() => {
                setIsMenuOpen(false);
                window.open("https://beltech-erp.blsglob.com/", "_blank");
              }}
            >
              Get Demo
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
