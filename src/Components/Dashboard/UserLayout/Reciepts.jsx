import React from "react";

import { FaCalendarAlt, FaClipboardList, FaTags } from "react-icons/fa";

const receipts = [
  {
    id: 1,
    category: "Food & Dining",
    name: "McDonald's",
    amount: "$12.50",
    date: "Dec 15, 2024",
    status: "Verified",
  },
  {
    id: 2,
    category: "Transportation",
    name: "Uber",
    amount: "$18.75",
    date: "Dec 14, 2024",
    status: "Verified",
  },
  {
    id: 3,
    category: "Shopping",
    name: "Amazon",
    amount: "$89.99",
    date: "Dec 13, 2024",
    status: "Pending",
  },
  {
    id: 4,
    category: "Utilities",
    name: "Electric Bill",
    amount: "$156.42",
    date: "Dec 12, 2024",
    status: "Verified",
  },
  {
    id: 5,
    category: "Food & Dining",
    name: "Starbucks",
    amount: "$5.75",
    date: "Dec 11, 2024",
    status: "Verified",
  },
  {
    id: 6,
    category: "Healthcare",
    name: "CVS Pharmacy",
    amount: "$24.99",
    date: "Dec 10, 2024",
    status: "Verified",
  },
];
const Reciepts = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-green-700 mb-1">
        Welcome Susan !
      </h1>
      <p className="text-gray-500 mb-6">Track your Receipts Collection</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white shadow rounded-lg p-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Receipts</p>
            <h2 className="text-xl font-bold">247</h2>
          </div>
          <FaClipboardList className="text-blue-500 text-2xl" />
        </div>
        <div className="bg-white shadow rounded-lg p-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">This Month</p>
            <h2 className="text-xl font-bold">42</h2>
          </div>
          <FaCalendarAlt className="text-green-500 text-2xl" />
        </div>
        <div className="bg-white shadow rounded-lg p-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Categories</p>
            <h2 className="text-xl font-bold">12</h2>
          </div>
          <FaTags className="text-orange-400 text-2xl" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {receipts.map((receipt) => (
          <div
            key={receipt.id}
            className="bg-white shadow rounded-lg p-4 flex flex-col justify-between"
          >
            <div className="mb-2">
              <span className="inline-block text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700 font-medium mb-2">
                {receipt.category}
              </span>
              <h3 className="text-md font-semibold">{receipt.name}</h3>
              <p className="text-xl font-bold">{receipt.amount}</p>
              <p className="text-xs text-gray-400 mt-1">{receipt.date}</p>
            </div>
            <div className="flex items-center justify-between mt-4">
              <span
                className={`text-xs font-medium px-2 py-1 rounded-full ${
                  receipt.status === "Verified"
                    ? "text-green-600 bg-green-100"
                    : "text-yellow-700 bg-yellow-100"
                }`}
              >
                {receipt.status}
              </span>
              <button className="text-green-700 text-sm font-medium">
                View
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-center items-center space-x-2">
        <button className="p-2 rounded text-gray-500 hover:bg-gray-200">
          &lt;
        </button>
        <button className="p-2 rounded bg-green-600 text-white">1</button>
        <button className="p-2 rounded text-gray-700 hover:bg-gray-200">
          2
        </button>
        <button className="p-2 rounded text-gray-700 hover:bg-gray-200">
          3
        </button>
        <span className="text-gray-400">...</span>
        <button className="p-2 rounded text-gray-700 hover:bg-gray-200">
          12
        </button>
        <button className="p-2 rounded text-gray-500 hover:bg-gray-200">
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Reciepts;
