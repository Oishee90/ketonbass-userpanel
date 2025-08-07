import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { microsoftLoggedIn } from "../../Redux/feature/auth/authSlice";

const MicrosoftLoginSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    // Extract query params from the URL
    const queryParams = new URLSearchParams(location.search);

    const accessToken = queryParams.get("access_token");
    const refreshToken = queryParams.get("refresh_token");
    const email = queryParams.get("email");
    const name = queryParams.get("name");
    const picture = queryParams.get("picture");
    const messages = queryParams.get("messages");
    if (accessToken && refreshToken) {
      console.log("Tokens from URL:", { accessToken, refreshToken, messages });
      console.log(" User info:", { email, name, picture });

      // Save tokens and user info in localStorage
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem(
        "user",
        JSON.stringify({ email, name, picture, messages })
      );

      // Dispatch to Redux to save user and tokens
      dispatch(
        microsoftLoggedIn({
          access_token: accessToken,
          refresh_token: refreshToken,
          email: email,
          name: name,
          profile_picture: picture,
          messages: messages,
        })
      );
      // Trigger refetch for upcoming reminders

      // Optionally clean URL (remove tokens from query)
      const cleanUrl = window.location.origin + window.location.pathname;
      window.history.replaceState({}, document.title, cleanUrl);
    }
  }, [location, dispatch, navigate]);
  const handleGoToDashboard = () => {
    navigate("/dashboard"); // Redirect to dashboard
  };

  return (
    <div className="container flex flex-col items-center justify-center min-h-screen px-4 mx-auto 0">
      {/* Card */}
      <div className="max-w-md p-8 text-center bg-white shadow-xl rounded-2xl animate-fadeIn">
        {/* Success Icon */}
        <div className="flex justify-center mb-4">
          <FaCheckCircle className="text-6xl text-green-500 animate-bounce" />
        </div>

        {/* Success Text */}
        <h1 className="mb-2 text-2xl font-bold text-gray-800">
          Successfully Logged in!
        </h1>
        <p className="mb-6 text-gray-600">
          You have logged in with Microsoft. Click below to continue.
        </p>

        {/* Button */}
        <button
          onClick={handleGoToDashboard}
          className="w-full px-6 py-3 text-lg font-semibold text-white transition-all duration-300 bg-green-600 shadow rounded-xl hover:bg-green-700"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default MicrosoftLoginSuccess;
