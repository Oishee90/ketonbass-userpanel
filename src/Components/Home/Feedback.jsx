import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Feedback = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    description: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // এখানে API কল বা অন্য কাজ করতে পারো

    setSubmitted(true);
    setFormData({ name: "", email: "", description: "" });
  };

  return (
    <div className="max-w-4xl px-6 py-10 mx-auto font-poppins">
      {/* Arrow Icon and Heading */}
      <div className="flex items-center mb-8 space-x-4">
        <FaArrowLeft
          onClick={() => navigate("/")}
          className="text-3xl text-green-600 transition cursor-pointer hover:text-green-800"
          title="Go back to Home"
        />
        <h1 className="text-3xl font-semibold">Feedback</h1>
      </div>

      {/* Content */}
      <div className="mb-8 text-gray-700">
        <p>We’d love to hear your thoughts! Please fill out the form below:</p>
      </div>

      {/* Feedback Form Card */}
      <form
        onSubmit={handleSubmit}
        className="max-w-lg p-8 mx-auto space-y-6 bg-white border border-gray-200 rounded-lg shadow-lg"
      >
        <div>
          <label
            htmlFor="name"
            className="block mb-2 font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block mb-2 font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block mb-2 font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows="5"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded resize-y focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <button
          type="submit"
          className="w-full px-6 py-2 font-semibold text-white transition bg-green-600 rounded hover:bg-green-700"
        >
          Submit Feedback
        </button>

        {submitted && (
          <p className="mt-4 font-medium text-center text-green-600">
            Thank you for your feedback!
          </p>
        )}
      </form>
    </div>
  );
};

export default Feedback;
