import React from "react";
import { Link } from "react-router-dom";
import {
  FiMail,
  FiPhone,
  FiMapPin,
} from "react-icons/fi";

/* ================= FOOTER DATA ================= */

const productLinks = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Energy Analytics", path: "/analytics" },
  { label: "Reports", path: "/reports" },
  { label: "Alerts & Notifications", path: "/alerts" },
  { label: "IoT Devices", path: "/devices" },
];

const companyLinks = [
  { label: "About EnerSense", path: "/about" },
  { label: "How It Works", path: "/how-it-works" },
  { label: "Careers", path: "/careers" },
  { label: "Contact Us", path: "/contact" },
];

const resourceLinks = [
  { label: "Documentation", path: "/docs" },
  { label: "API Reference", path: "/api-docs" },
  { label: "User Guide", path: "/user-guide" },
  { label: "FAQs", path: "/faq" },
  { label: "Support Center", path: "/support" },
];

const legalLinks = [
  { label: "Privacy Policy", path: "/privacy" },
  { label: "Terms of Service", path: "/terms" },
  { label: "Security", path: "/security" },
  { label: "Compliance", path: "/compliance" },
];

/* ================= FOOTER COMPONENT ================= */

const Footer = () => {
  return (
    <footer className="bg-[#020617] text-slate-300">
      <div className="max-w-7xl mx-auto px-6 py-14">

        {/* Top Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10">

          {/* Brand */}
          <div>
            <h2 className="text-xl font-bold text-green-400">
              EnerSense
            </h2>
            <p className="mt-4 text-sm text-slate-400 leading-relaxed">
              Smart Energy Monitoring System that helps homes and industries
              track, analyze, and optimize energy consumption efficiently.
            </p>

            <div className="mt-4 space-y-2 text-sm">
              <p className="flex items-center gap-2">
                <FiMail /> support@enersense.com
              </p>
              <p className="flex items-center gap-2">
                <FiPhone /> +91 9XXXXXXXXX
              </p>
              <p className="flex items-center gap-2">
                <FiMapPin /> India
              </p>
            </div>
          </div>

          {/* Product */}
          <FooterColumn title="Product" links={productLinks} />

          {/* Company */}
          <FooterColumn title="Company" links={companyLinks} />

          {/* Resources */}
          <FooterColumn title="Resources" links={resourceLinks} />

          {/* Legal */}
          <FooterColumn title="Legal" links={legalLinks} />

        </div>

        {/* Divider */}
        <div className="my-8 border-t border-white/10" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p className="text-slate-400 ">
            Built with ❤️ for smart energy management
          </p>
          <p className="text-center md:text-left mb-10">
            © 2026 EnerSense. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};

/* ================= REUSABLE COLUMN ================= */

const FooterColumn = ({ title, links }) => (
  <div>
    <h3 className="text-sm font-semibold text-green-400 uppercase tracking-wide">
      {title}
    </h3>
    <ul className="mt-4 space-y-2 text-sm">
      {links.map(({ label, path }) => (
        <li key={label}>
          <Link
            to={path}
            className="hover:text-green-400 transition"
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default Footer;
