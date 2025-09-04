import React from "react";
import { Link } from "react-router-dom";
import logo from '../../assets/logo.png';

const footerLinks = {
  COMPANY: [
    { label: "Features", href: "/features" },
    { label: "Pricing", href: "/pricing" },
    { label: "Affiliate Program", href: "/affiliate" },
    { label: "Press Kit", href: "/press-kit" },
  ],
  SUPPORT: [
    { label: "Account", href: "/account" },
    { label: "Help", href: "/help" },
    { label: "Contact Us", href: "/contact" },
    { label: "Customer Support", href: "/support" },
  ],
  LEGALS: [
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Licensing", href: "/licensing" },
  ],
};

const Footer = () => (
  <footer className="bg-white border-t border-gray-200">
    <div className="mobile-container py-10">
      <div className="mb-8 flex flex-col items-center md:items-start">
        <Link to="/" className="flex items-center gap-2 mb-6">
          <img src={logo} alt="Logo" className="h-10 w-10 object-contain" />
          <span className="text-lg font-bold text-gray-900">Better Blog</span>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-10">
        {Object.entries(footerLinks).map(([category, links]) => (
          <div key={category}>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
              {category}
            </h3>
            <ul className="space-y-2">
              {links.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-sm text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t pt-6">
        <p className="text-xs text-gray-500 text-center md:text-left">
          © Copyright 2025. All Rights Reserved by Better Blog.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
