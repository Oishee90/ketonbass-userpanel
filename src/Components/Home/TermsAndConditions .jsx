import React from "react";
import { FaArrowLeft } from "react-icons/fa";

const TermsAndConditions = () => {
  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="max-w-4xl px-6 py-10 mx-auto font-poppins">
      {/* Arrow Button and Heading */}
      <div className="flex items-center mb-8 space-x-4">
        <button
          onClick={handleBack}
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          aria-label="Go Back"
        >
          <FaArrowLeft className="text-2xl text-green-600" />
        </button>
        <h1 className="text-3xl font-semibold">Terms & Conditions</h1>
      </div>

      {/* Content */}
      <div className="prose text-gray-700 max-w-none">
        <p>
          {/* এখানে Terms and Conditions এর বিস্তারিত লিখবে */}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui
          mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor
          neque eu tellus rhoncus ut eleifend nibh porttitor.
        </p>
        <p>
          {/* তুমি এখানে তোমার আসল Terms & Conditions এর কন্টেন্ট দিবে */}
          Duis malesuada elit nec leo convallis, et pretium ex commodo.
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
