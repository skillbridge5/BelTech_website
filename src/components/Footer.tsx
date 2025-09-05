import { Facebook, Twitter, Linkedin, Instagram, Youtube } from "lucide-react";
import { Button } from './ui/button';
import logo from '../assets/logo.png';
import { Link } from "react-router-dom";

const Footer = () => {
  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "About Us", path: "/about" },
    { name: "Solutions in Action", path: "/solutions" },
    { name: "Insights", path: "/insights" },
    { name: "Contact", path: "/contact" },
  ];

  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#000000] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-15 h-15 bg-white rounded-full flex items-center justify-center">
                <img
                  src={logo}
                  alt="BelTech Logo"
                  className="w-13 h-13 rounded-full"
                />
              </div>
              <span className="font-bold text-xl">BelTech Solutions</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">ERP & Software Development</h3>
            <p className="text-gray-300 mb-4 max-w-md">
              Empowering African businesses with tailored ERP, automation, and digital transformation solutions. Based in Addis Ababa, serving businesses across Africa.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-[#61C7D5] transition-colors duration-200"><Facebook size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-[#61C7D5] transition-colors duration-200"><Twitter size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-[#61C7D5] transition-colors duration-200"><Linkedin size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-[#61C7D5] transition-colors duration-200"><Instagram size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-[#61C7D5] transition-colors duration-200"><Youtube size={20} /></a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    onClick={handleLinkClick}
                    className="text-gray-300 hover:text-[#61C7D5] transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-gray-300 mb-4">Get the latest insights on digital transformation and ERP solutions.</p>
        
            <div className="flex flex-col sm:flex-row items-stretch gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md sm:rounded-r-none focus:outline-none focus:ring-2 focus:ring-[#61C7D5]"
              />
              <Button className="px-3 py-2 rounded-md sm:rounded-l-none bg-[#61C7D5] hover:bg-[#4aa1c8] text-white transition-colors duration-200 flex items-center justify-center h-10">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 BelTech Solutions. All rights reserved. | Addis Ababa, Ethiopia
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;