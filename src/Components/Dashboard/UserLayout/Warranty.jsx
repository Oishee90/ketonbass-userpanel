import React, { useState } from "react";
import { FaRegFileAlt } from "react-icons/fa";
import { format, parse } from "date-fns";

const warrantyData = [
  {
    id: 1,
    productName: "Apple Watch",
    purchaseDate: "1 June, 2025",
    warrantyDate: "1 June, 2027",
    documents: 2,
  },
  {
    id: 2,
    productName: "Mac Book Pro",
    purchaseDate: "1 June, 2025",
    warrantyDate: "1 June, 2027",
    documents: 1,
  },
  {
    id: 3,
    productName: "AirPods Pro",
    purchaseDate: "2 June, 2025",
    warrantyDate: "2 June, 2027",
    documents: 1,
  },
  {
    id: 4,
    productName: "iPad Air",
    purchaseDate: "3 June, 2025",
    warrantyDate: "3 June, 2027",
    documents: 2,
  },
  {
    id: 5,
    productName: "iPhone 14",
    purchaseDate: "4 June, 2025",
    warrantyDate: "4 June, 2026",
    documents: 1,
  },
  {
    id: 6,
    productName: "Apple TV",
    purchaseDate: "5 June, 2025",
    warrantyDate: "5 June, 2026",
    documents: 1,
  },
  {
    id: 7,
    productName: "Magic Keyboard",
    purchaseDate: "6 June, 2025",
    warrantyDate: "6 June, 2026",
    documents: 2,
  },
  {
    id: 8,
    productName: "Mac Mini",
    purchaseDate: "7 June, 2025",
    warrantyDate: "7 June, 2027",
    documents: 2,
  },
];

const Warranty = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6;

  const today = new Date();

  const getStatus = (warrantyDateStr) => {
    const warrantyDate = new Date(warrantyDateStr);
    const twoWeeksBefore = new Date(warrantyDate);
    twoWeeksBefore.setDate(warrantyDate.getDate() - 14);

    if (today > warrantyDate) return "Expired";
    if (today >= twoWeeksBefore) return "Expires Soon";
    return "Active";
  };

  const sortedWarrantyData = [...warrantyData]
    .map((item) => ({
      ...item,
      status: getStatus(item.warrantyDate),
    }))
    .sort(
      (a, b) =>
        new Date(a.purchaseDate).getTime() - new Date(b.purchaseDate).getTime()
    );

  const totalPages = Math.ceil(sortedWarrantyData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = sortedWarrantyData.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "MM/dd/yyyy");
  };

  return (
    <div className="bg-[#f9f9f9] min-h-screen p-6 font-sans">
      <h1 className="mb-1 text-2xl font-bold text-green-800">
        Oishee Khan’s Warranties
      </h1>
      <p className="mb-6 text-sm text-gray-600">
        Track your warranties and all details
      </p>

      <div className="p-6 bg-white rounded-lg shadow">
        <h2 className="mb-4 text-lg font-semibold text-green-800 sm:text-xl poppins sm:mb-6">
          Warranties Details
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left border-collapse">
            <thead>
              <tr className="text-2xl text-gray-600 bg-gray-200 sm:text-sm rounded-xl">
                <th className="px-4 py-2 text-lg font-bold text-gray-800">
                  Product Name
                </th>
                <th className="px-4 py-2 text-lg font-bold text-gray-800">
                  Purchase Date
                </th>
                <th className="px-4 py-2 text-lg font-bold text-gray-800">
                  Warranty Date
                </th>
                <th className="px-4 py-2 text-lg font-bold text-center text-gray-800">
                  Documents
                </th>
                <th className="px-4 py-2 text-lg font-bold text-gray-800">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">{item.productName}</td>
                  <td className="px-4 py-3">{formatDate(item.purchaseDate)}</td>
                  <td className="px-4 py-3">{formatDate(item.warrantyDate)}</td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <FaRegFileAlt className="text-gray-600" />{" "}
                      {item.documents}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 text-base font-medium rounded-full ${
                        item.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : item.status === "Expired"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-end mt-6">
          <ul className="flex space-x-2 text-sm">
            <li>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded hover:bg-gray-200 disabled:text-gray-400"
              >
                &lt;
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index}>
                <button
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-3 py-1 rounded ${
                    currentPage === index + 1
                      ? "bg-green-800 text-white"
                      : "hover:bg-gray-200"
                  }`}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded hover:bg-gray-200 disabled:text-gray-400"
              >
                &gt;
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Warranty;
