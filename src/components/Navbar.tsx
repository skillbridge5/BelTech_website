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
    <nav className="bg-white/90 backdrop-blur-md border-b border-gray-100 fixed top-0 w-full z-50 shadow-[0_1px_10px_rgba(0,0,0,0.06)]">
      <div className="flex items-center justify-between h-16 px-4 lg:px-8">
        {/* Logo — left side */}
        <Link to="/" className="flex-shrink-0">
          <img
            src={logo}
            alt="BelTech Logo"
            className="h-12 w-auto object-contain drop-shadow-sm transition-transform duration-200 hover:scale-105"
          />
        </Link>

        {/* Links + button — right side */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`group relative text-[15px] font-medium py-2 transition-colors duration-300 ${
                isActiveLink(link.path)
                  ? "text-[#0078B7]"
                  : "text-gray-700 hover:text-[#0078B7]"
              }`}
            >
              {link.name}
              <span
                className={`absolute left-0 -bottom-px h-0.5 bg-gradient-to-r from-[#0078B7] to-[#27A2D8] rounded-full transition-all duration-300 ${
                  isActiveLink(link.path)
                    ? "w-full"
                    : "w-0 group-hover:w-full"
                }`}
              ></span>
            </Link>
          ))}

          <Button
            className="ml-2 text-white px-6 py-2 text-sm font-semibold rounded-full shadow-md shadow-[#0078B7]/30 bg-gradient-to-r from-[#0078B7] to-[#27A2D8] transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#0078B7]/40"
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
        <div className="md:hidden border-t border-gray-100 bg-white/95 backdrop-blur-md shadow-lg">
          <div className="px-6 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`block font-medium px-4 py-2.5 rounded-lg transition-colors duration-200 ${
                  isActiveLink(link.path)
                    ? "text-[#0078B7] bg-[#0078B7]/10"
                    : "text-gray-700 hover:text-[#0078B7] hover:bg-gray-50"
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