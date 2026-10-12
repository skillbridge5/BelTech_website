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
    "/Solutions",
    "/ERPDetail",
    "/CharityPlatform",
    "/RetailAuto",
    "/DigitalMarketingDetail",
    "/projects/diligent-trade",
    "/projects/skillbridge",
    "/projects/eyoha-digitals",
  ];

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "About", path: "/about" },
    { name: "Projects", path: "/solutions" },
    { name: "Industries", path: "/industries" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  const isActiveLink = (linkPath: string) => {
    if (linkPath === "/solutions") {
      return solutionsPaths.includes(pathname);
    }
    return pathname === linkPath;
  };

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-gray-200/80 bg-white/95 backdrop-blur-md">
      <div className="site-wide flex h-20 items-center justify-between">
        <Link to="/" className="flex-shrink-0">
          <img
            src={logo}
            alt="BelTech Logo"
            className="h-[4.5rem] w-auto object-contain"
          />
        </Link>

        <div className="hidden items-center gap-8 md:flex lg:gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`relative py-1 text-[15px] font-medium transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:bg-[#0078B7] after:transition-transform after:duration-200 ${
                isActiveLink(link.path)
                  ? "text-[#0078B7] after:scale-x-100"
                  : "text-gray-700 after:scale-x-0 hover:text-[#0078B7] hover:after:scale-x-100"
              }`}
            >
              {link.name}
            </Link>
          ))}

          <Button
            className="ml-2 rounded-full bg-[#0078B7] px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#005C8A]"
            onClick={() =>
              window.open("https://beltech-erp.blsglob.com/", "_blank")
            }
          >
            Get Demo
          </Button>
        </div>

        {/* Mobile hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-700 hover:text-[#0078B7] transition-colors duration-200 p-2 rounded-md hover:bg-gray-100"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="border-t border-gray-100 bg-white shadow-lg md:hidden">
          <div className="space-y-2 px-6 py-5">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`block border-l-2 px-4 py-2.5 text-[15px] font-medium transition-colors duration-200 ${
                  isActiveLink(link.path)
                    ? "border-[#0078B7] text-[#0078B7]"
                    : "border-transparent text-gray-700 hover:border-[#0078B7] hover:text-[#0078B7]"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            <Button
              className="w-full mt-3 text-white rounded-full bg-gradient-to-r from-[#0078B7] to-[#27A2D8] shadow-md shadow-[#0078B7]/30"
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