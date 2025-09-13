import React from "react";
import { Link } from "react-router-dom";
import logo from '../../assets/logo.png';

const footerLinks = {
  COMPANY: [
    { label: "Features", href: "/" },
    { label: "Pricing", href: "/" },
    { label: "Affiliate Program", href: "/" },
    { label: "Press Kit", href: "/press-kit" },
  ],
  SUPPORT: [
    { label: "Account", href: "/" },
    { label: "Help", href: "/" },
    { label: "Contact Us", href: "/" },
    { label: "Customer Support", href: "/" },
  ],
  LEGALS: [
    { label: "Terms & Conditions", href: "/" },
    { label: "Privacy Policy", href: "/" },
    { label: "Licensing", href: "/" },
  ],
};

const Footer = () => (
  <div className="w-full bg-white">
    <footer className="bg-white border-t border-gray-200">
      <div className="responsive-container py-10">
        <div className="max-w-7xl mx-auto px-4">
          {/* Logo & Title */}
          <div className="mb-8 flex flex-col items-center md:items-start">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <img src={logo} alt="Logo" className="h-10 w-10 object-contain" />
              <span className="text-lg font-bold text-gray-900">Scholar Circle</span>
            </Link>

            {/* Link Sections */}
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

            {/* Copyright */}
            <div className="border-t pt-6">
              <p className="text-xs text-gray-500 text-center md:text-left">
                © Copyright 2025. All Rights Reserved by Scholar Circle.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
);

export default Footer;
