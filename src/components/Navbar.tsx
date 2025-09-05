"use client";

import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "About", path: "/about" },
    { name: "Solutions", path: "/solutions" },
    { name: "Insights", path: "/insights" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="bg-white shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-2">
            <Link to="/">
              <img
                src={logo}
                alt="BelTech Logo"
                className="w-28 h-12 rounded-lg"
              />
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-8 ml-auto">
            <div className="flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`
                    font-medium transition-colors duration-200 py-2
                    ${
                      pathname === link.path
                        ? "text-[#61C7D5] border-b-2 border-[#61C7D5]"
                        : "text-gray-700 hover:text-[#61C7D5] hover:border-b-2 hover:border-[#61C7D5]"
                    }
                  `}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <Button
              className="text-white px-8 py-3 text-lg transition-all duration-200 hover:scale-105 bg-[#61C7D5] hover:bg-[#4FB3C1]"
              onClick={() => (window.location.href = "/contact")}
            >
              Get Demo
            </Button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-[#61C7D5] transition-colors duration-200"
            >
              {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`
                    block font-medium px-3 py-2 text-base transition-colors duration-200
                    ${
                      pathname === link.path
                        ? "text-[#61C7D5] border-b-2 border-[#61C7D5]"
                        : "text-gray-700 hover:text-[#61C7D5]"
                    }
                  `}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="px-3 py-2">
                <Button className="w-full text-white transition-all duration-200 hover:scale-105 bg-[#61C7D5] hover:bg-[#4FB3C1]">
                  Get Demo
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;