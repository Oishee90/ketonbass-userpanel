import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import image from "../../assets/ketonregister.png";
import logo from "../../assets/logo.png";
import google from "../../assets/google.png";
import Swal from "sweetalert2";
import { useGoogleLogin } from "@react-oauth/google";
export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Reza's Code:

  const login = useGoogleLogin({
    flow: "auth-code", // use authorization code flow
    onSuccess: async (codeResponse) => {
      try {
        const res = await fetch(
          "http://192.168.10.40:13000/api/google-login/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ code: codeResponse.code }),
          }
        );

        const data = await res.json();

        if (res.ok) {
          // Save user to localStorage
          localStorage.setItem("user", JSON.stringify(data.google_data));

          // Show success message, then redirect using full page reload
          Swal.fire({
            icon: "success",
            title: "Google Sign-In Successful",
            text: `Welcome ${data.google_data.email}`,
            timer: 1500,
            showConfirmButton: false,
          }).then(() => {
            // Use full page reload to reinitialize app with user data
            window.location.href = "/dashboard";
          });
        } else {
          Swal.fire("Error", data.message || "Google login failed", "error");
        }
      } catch (error) {
        console.error("Login Error:", error);
        Swal.fire("Error", "Something went wrong", "error");
      }
    },

    onError: (errorResponse) => {
      console.error("Google Login Error", errorResponse);
      Swal.fire("Error", "Google login failed", "error");
    },
    ux_mode: "popup", // popup is ideal for SPAs
    redirect_uri: "http://localhost:5173", // Match with OAuth client settings in Google Console
  });
  //

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email: "user@gmail.com", // Dummy email
     
    };

    localStorage.setItem("user", JSON.stringify(userData));

    Swal.fire({
      icon: "success",
      title: "Sign in Successful",
      text: "Signed in as user",
    }).then(() => {
      navigate("/dashboard");
    });
  };

  return (
    <div className="flex 2xl:flex-row flex-col justify-between items-center h-full 2xl:h-screen">
      {/* Back Button */}
      <NavLink
        to="/"
        className="absolute top-5 left-5 text-3xl text-[#1F762C] hover:text-green-800"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </NavLink>

      {/* Left Form Section */}
      <div className="w-full max-w-3xl bg-gradient-to-b from-[#F5FFF9] to-[#E3FFED] rounded-lg p-[6rem] mx-auto">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-2 mb-2">
            <img src={logo} alt="Logo" />
          </div>
          <p className="text-[#1C6A28] text-2xl font-semibold poppins">
            Create your account
          </p>
        </div>

        {/* Social Button */}
        <div className="space-y-4 mb-6">
          <button
            // onClick={handleSubmit}
            onClick={() => login()}
            className="w-full flex items-center justify-center gap-4 border border-gray-300 px-5 py-2 rounded-md bg-white hover:bg-gray-50"
          >
            <span className="text-[#979797] text-base poppins">
              Create account with Google
            </span>
            <img src={google} alt="Google" />
          </button>
        </div>

        {/* Form */}
      </div>

      {/* Right Image Section */}
      <div className="w-full 2xl:w-1/2 2xl:h-screen">
        <img
          src={image}
          alt="Signup visual"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
