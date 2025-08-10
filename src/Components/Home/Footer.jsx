import React from "react";
import footer from "../../assets/footerlogo.png";
import { FaTwitter, FaFacebookF, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-[#46BF70] to-[#1F762C] text-white px-8 py-12 mt-20 lg:mt-40 shadow-lg">
      <div className="container flex flex-col items-center justify-between gap-10 mx-auto lg:flex-row lg:items-center">
        {/* Logo and description */}
        <div className="flex flex-col items-center max-w-xs lg:items-start">
          <img src={footer} alt="Purtrack Logo" className="mb-4 h-14" />
          {/* <p className="text-lg font-light leading-relaxed text-center rubik lg:text-left">
            Your complete purchase and warranty management solution.
          </p> */}
        </div>

        {/* Footer Links */}
        <nav className="flex flex-col space-y-4 text-base font-medium lg:flex-row lg:space-y-0 lg:space-x-12">
          <a
            href="/privarcy"
            className="transition-colors duration-300 hover:text-gray-300"
          >
            Privacy Policy
          </a>
          <a
            href="/terms"
            className="transition-colors duration-300 hover:text-gray-300"
          >
            Terms of Service
          </a>
          <a
            href="/feedback"
            className="transition-colors duration-300 hover:text-gray-300"
          >
            Contact
          </a>
        </nav>

        {/* Social Media Icons */}
        <div className="flex space-x-6">
          {[
            {
              href: "https://twitter.com/yourprofile",
              label: "Twitter",
              icon: <FaTwitter />,
            },
            {
              href: "https://facebook.com/yourprofile",
              label: "Facebook",
              icon: <FaFacebookF />,
            },
            {
              href: "https://linkedin.com/in/yourprofile",
              label: "LinkedIn",
              icon: <FaLinkedinIn />,
            },
          ].map(({ href, label, icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex items-center justify-center w-10 h-10 text-white transition duration-300 bg-white rounded-full shadow-md bg-opacity-20 hover:bg-opacity-40"
            >
              {icon}
            </a>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="mt-10 border-t border-white border-opacity-30"></div>

      {/* Copyright */}
      <p className="mt-6 text-sm font-light text-center opacity-75">
        &copy; {new Date().getFullYear()} Purtrack. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
