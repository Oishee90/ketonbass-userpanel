/* eslint-disable react/prop-types */
import React from "react";

const ErrorPage = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-3xl font-bold text-red-600 mb-4">
        Oops! Something went wrong
      </h1>
      <p className="text-gray-600 mb-6">
        {message || "Please try again later."}
      </p>
      <button
        onClick={() => window.location.reload()}
        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
      >
        Reload Page
      </button>
    </div>
  );
};

export default ErrorPage;
