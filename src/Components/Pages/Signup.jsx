// src/pages/SignUpPage.jsx

import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import google from "../../assets/google.png";
import microsoft from "../../assets/outlook.png";
import image from "../../assets/ketonregister.png";

import { FaMicrosoft } from "react-icons/fa";

import { useDispatch } from "react-redux";
import { useState } from "react";

export default function SignUpPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedProvider, setSelectedProvider] = useState(null);

  const handleLoginClick = (provider, redirectPath) => {
    setSelectedProvider(provider);
    localStorage.setItem("loginProvider", provider);
    localStorage.setItem("redirectAfterLogin", redirectPath);
  };
  return (
    <div className="flex flex-col items-center justify-between h-full 2xl:flex-row 2xl:h-screen">
      {/* Back Button */}
      <NavLink
        to="/"
        className="absolute top-5 left-5 text-3xl text-[#1F762C] hover:text-green-800"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </NavLink>

      {/* Form Section */}
      <div className="w-full max-w-3xl bg-gradient-to-b from-[#F5FFF9] to-[#E3FFED] rounded-lg p-[6rem] mx-auto">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <img src={logo} alt="Logo" />
          </div>
          <p className="text-[#1C6A28] text-lg lg:text-2xl font-semibold poppins">
            Create your account
          </p>
        </div>

        <Link
          to="https://api-server.purtrack.com/google-auth/google/login "
          onClick={() => handleLoginClick("google", "/success")}
        >
          <div className="mb-6 space-y-4">
            <button className="flex items-center justify-center w-full gap-4 px-2 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              <span className="text-[#979797] md:block text-base hidden poppins">
                Login with Google
              </span>
              <img src={google} alt="Google" />
            </button>
          </div>
        </Link>
        <Link
          to="https://api-server.purtrack.com/microsoft-auth/login/"
          onClick={() => handleLoginClick("microsoft", "/successlogin")}
        >
          <div className="mb-6 space-y-4">
            <button className="flex items-center justify-center w-full gap-4 px-2 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              <span className="text-[#979797] md:block text-base hidden poppins">
                Login with Outlook
              </span>
              <img src={microsoft} alt="Outlook" />
            </button>
          </div>
        </Link>
      </div>

      <div className="w-full 2xl:w-1/2 2xl:h-screen">
        <img
          src={image}
          alt="Signup visual"
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
}
