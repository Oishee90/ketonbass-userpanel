import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import image from "../../assets/ketonregister.png";
import logo from "../../assets/logo.png";
import google from "../../assets/google.png";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Determine role
    const role = email === "admin@gmail.com" ? "admin" : "user";

    // Save user info in localStorage
    const userData = {
      email,
      password, // ⚠️ For production, never store plain passwords!
      role,
    };
    localStorage.setItem("user", JSON.stringify(userData));

    alert(`Sign in successful as ${role}`);
    navigate("/dashboard"); // redirect to homepage or dashboard
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
            Create an account
          </p>
        </div>

        {/* Social Button */}
        <div className="space-y-4 mb-6">
          <button className="w-full flex items-center justify-center gap-4 border border-gray-300 px-5 py-2 rounded-md bg-white hover:bg-gray-50">
            <span className="text-[#979797] text-base poppins">
              Create account with Google
            </span>
            <img src={google} alt="Google" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your email"
            />
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your password"
            />
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            className="mt-4 w-full bg-[#1F762C] text-white py-3 rounded-lg text-base poppins hover:bg-green-800 transition"
          >
            Sign Up
          </button>
        </form>
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
