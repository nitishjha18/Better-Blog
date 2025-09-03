import React from "react";
import { Link } from "react-router-dom";
import { PenTool } from "react-feather";
import logo from '../../assets/logo.png';


const Footer = () => {
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

  return (
    <footer className="bg-footer-bg border-t border-border">
      <div className=" min-h-screen bg-gradient-to-br bg-white border-b border-gray-200 shadow-sm mx-auto px-6 py-12">
        {/* Logo and links */}
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-4">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.href}
                      className="text-foreground hover:text-primary transition-colors text-sm"
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
        <div className="pt-8 border-t border-border">
          <p className="text-sm text-text-muted">
            © Copyright 2025 Rights Reserved by Better Blog
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;





// import React from "react";
// import { Link } from "react-router-dom";
// import logo from "../../assets/logo.png";

// function Footer() {
//   return (
//     <section className="relative overflow-hidden py-10 bg-gray-400 border-t-2 border-black">
//       {/* Full-width container without centering */}
//       <div className="w-full px-4 md:px-8">
//         {/* Main flex row: logo left, links right */}
//         <div className="flex flex-wrap justify-between">
//           {/* Logo & copyright (LEFT) */}
//           <div className="flex-shrink-0 mb-8">
//             <img src={logo} alt="Logo" className="h-12 w-auto" />
//           </div>

//           {/* Link groups (RIGHT) */}
//           <div className="flex ml-auto w-1/2 justify-between flex-wrap gap-12">
//             {/* Company */}
//             <div className="min-w-[120px]">
//               <h3 className="mb-4 text-xs font-semibold uppercase text-gray-500">
//                 Company
//               </h3>
//               <ul className="space-y-2">
//                 <li>
//                   <Link
//                     to="/"
//                     className="text-base font-medium text-gray-900 hover:text-gray-700"
//                   >
//                     Features
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="/"
//                     className="text-base font-medium text-gray-900 hover:text-gray-700"
//                   >
//                     Pricing
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="/"
//                     className="text-base font-medium text-gray-900 hover:text-gray-700"
//                   >
//                     Affiliate Program
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="/"
//                     className="text-base font-medium text-gray-900 hover:text-gray-700"
//                   >
//                     Press Kit
//                   </Link>
//                 </li>
//               </ul>
//             </div>

//             {/* Support */}
//             <div className="min-w-[120px]">
//               <h3 className="mb-4 text-xs font-semibold uppercase text-gray-500">
//                 Support
//               </h3>
//               <ul className="space-y-2">
//                 <li>
//                   <Link
//                     to="/"
//                     className="text-base font-medium text-gray-900 hover:text-gray-700"
//                   >
//                     Account
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="/"
//                     className="text-base font-medium text-gray-900 hover:text-gray-700"
//                   >
//                     Help
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="/"
//                     className="text-base font-medium text-gray-900 hover:text-gray-700"
//                   >
//                     Contact Us
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="/"
//                     className="text-base font-medium text-gray-900 hover:text-gray-700"
//                   >
//                     Customer Support
//                   </Link>
//                 </li>
//               </ul>
//             </div>

//             {/* Legals */}
//             <div className="min-w-[120px]">
//               <h3 className="mb-4 text-xs font-semibold uppercase text-gray-500">
//                 Legals
//               </h3>
//               <ul className="space-y-2">
//                 <li>
//                   <Link
//                     to="/"
//                     className="text-base font-medium text-gray-900 hover:text-gray-700"
//                   >
//                     Terms & Conditions
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="/"
//                     className="text-base font-medium text-gray-900 hover:text-gray-700"
//                   >
//                     Privacy Policy
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="/"
//                     className="text-base font-medium text-gray-900 hover:text-gray-700"
//                   >
//                     Licensing
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div>
//       </div>
//       <p className="px-8 py -my-4 text-sm text-left text-gray-600">
//           &copy; Copyright 2023. All Rights Reserved by Better Blog
//         </p>
//     </section>
//   );
// }

// export default Footer;
