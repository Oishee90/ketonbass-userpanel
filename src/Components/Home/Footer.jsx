import React from "react";
import footer from "../../assets/footerlogo.png";
import { FaTwitter } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-[#46BF70] to-[#1F762C] text-[#FFFFFF] px-8 py-12 mt-20 lg:mt-40 ">
      <div className="container  mx-auto flex lg:flex-row flex-col  justify-between gap-8">
        {/* Logo and description */}
        <div>
          <div className="flex items-center  mb-2">
            {/* Replace with your actual logo */}
            <img src={footer} alt="Purtrack Logo" />
          </div>
          <p className="text-xl rubik leading-relaxed  font-normal !mt-7">
            Your complete purchase and warranty management solution.
          </p>
        </div>

        {/* Features */}
        <div>
          <h3 className=" rubik text-2xl mb-2 ">Features</h3>
          <ul className="space-y-1 text-base font-normal ">
            <li>Auto Email Tracking</li>
            <li>Warranty Management</li>
            <li>Document Storage</li>
            <li>Calendar Integration</li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="rubik text-2xl mb-2 ">Company</h3>
          <ul className="space-y-1 text-base font-normal ">
            <li>About Us</li>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* Connect */}
      </div>
    </footer>
  );
};

export default Footer;
