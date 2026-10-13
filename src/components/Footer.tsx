import { Mail, Linkedin, Send, Youtube, MapPin, Phone, type LucideIcon } from "lucide-react";
import { Button } from "./ui/button";
import { WhatsAppIcon } from "./WhatsAppButton";
import logo from "../assets/new-logo-free.png";
import { Link } from "react-router-dom";

const Footer = () => {
  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "About", path: "/about" },
    { name: "Projects", path: "/solutions" },
    { name: "Industries", path: "/industries" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  const socialLinks: { icon: LucideIcon | typeof WhatsAppIcon; url: string; label: string }[] = [
    { icon: Mail, url: "mailto:beltechsolns@gmail.com", label: "Email" },
    { icon: Linkedin, url: "https://www.linkedin.com/company/beltech-solution/", label: "LinkedIn" },
    { icon: Send, url: "https://t.me/belTechSolns", label: "Telegram" },
    { icon: Youtube, url: "https://www.youtube.com/@BeltechSolns", label: "YouTube" },
    { icon: WhatsAppIcon, url: "https://wa.me/251955935455", label: "WhatsApp" },
  ];

  return (
    <footer className="w-full bg-[#041824] text-white">
      <div className="site-wide py-14">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-white p-2">
                <img src={logo} alt="" className="h-full w-full object-contain" />
              </div>
              <div>
                <p className="text-lg font-semibold">BelTech Solutions</p>
                <p className="text-sm text-white/70">ERP, Training & Software</p>
              </div>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-white/80">
              Empowering African businesses with tailored ERP, corporate team training, automation, and digital solutions. Based in Addis Ababa, serving businesses across Africa.
            </p>
            <div className="mt-5 flex gap-3">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-[#0078B7]"
                >
                  <item.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-wide text-white">Explore</h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-sm text-white/80 transition-colors hover:text-white">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-wide text-white">Contact</h3>
            <ul className="space-y-3 text-sm text-white/80">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#7ec8ea]" />
                <span>Addis Ababa, Ethiopia</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#7ec8ea]" />
                <span className="flex flex-col gap-1">
                  <a href="tel:+251955935455" className="hover:text-white">+251 955 935 455</a>
                  <a href="tel:+251932058398" className="hover:text-white">+251 932 058 398</a>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#7ec8ea]" />
                <a href="mailto:beltechsolns@gmail.com" className="hover:text-white">
                  beltechsolns@gmail.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-2 text-sm font-semibold tracking-wide text-white">Try Our ERP System</h3>
            <p className="text-sm text-white/80">Experience our ERP platform in action.</p>
            <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4 text-sm">
              <p className="mb-2 text-white/70">Use the demo credentials below:</p>
              <p>Username: <strong>erp-demo</strong></p>
              <p className="mt-1">Password: <strong>erp-demo</strong></p>
            </div>
            <Button
              onClick={() => window.open("https://beltech-erp.blsglob.com/", "_blank")}
              className="mt-4 bg-[#0078B7] text-white hover:bg-[#005C8A]"
            >
              Watch Live Demo
            </Button>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6">
          <p className="text-sm text-white/60">
            © {new Date().getFullYear()} BelTech Solutions. All rights reserved. | Addis Ababa, Ethiopia
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
