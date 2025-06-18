import React, { useState } from "react";
import { FaRegFileAlt } from "react-icons/fa";

// Dummy warranty data (you can extend this as needed)
const warrantyData = [
  {
    id: 1,
    productName: "Apple Watch",
    purchaseDate: "1 June, 2025",
    warrantyDate: "1 June, 2027",
    documents: 2,
    status: "Active",
  },
  {
    id: 2,
    productName: "Mac Book Pro",
    purchaseDate: "1 June, 2025",
    warrantyDate: "1 June, 2027",
    documents: 1,
    status: "Expired",
  },
  {
    id: 3,
    productName: "AirPods Pro",
    purchaseDate: "2 June, 2025",
    warrantyDate: "2 June, 2027",
    documents: 1,
    status: "Soon",
  },
  {
    id: 4,
    productName: "iPad Air",
    purchaseDate: "3 June, 2025",
    warrantyDate: "3 June, 2027",
    documents: 2,
    status: "Active",
  },
  {
    id: 5,
    productName: "iPhone 14",
    purchaseDate: "4 June, 2025",
    warrantyDate: "4 June, 2026",
    documents: 1,
    status: "Soon",
  },
  {
    id: 6,
    productName: "Apple TV",
    purchaseDate: "5 June, 2025",
    warrantyDate: "5 June, 2026",
    documents: 1,
    status: "Expired",
  },
  {
    id: 7,
    productName: "Magic Keyboard",
    purchaseDate: "6 June, 2025",
    warrantyDate: "6 June, 2026",
    documents: 2,
    status: "Active",
  },
  {
    id: 8,
    productName: "Mac Mini",
    purchaseDate: "7 June, 2025",
    warrantyDate: "7 June, 2027",
    documents: 2,
    status: "Soon",
  },
];

const Warranty = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6;

  const totalPages = Math.ceil(warrantyData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = warrantyData.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="bg-[#f9f9f9] min-h-screen p-6 font-sans">
      <h1 className="text-2xl font-bold text-green-800 mb-1">Welcome Susan!</h1>
      <p className="text-gray-600 text-sm mb-6">
        Track your warranties and all details
      </p>

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-200 text-gray-600 text-2xl sm:text-sm rounded-xl">
                <th className="py-2 px-4 font-bold text-gray-800 text-lg">
                  Product Name
                </th>
                <th className="py-2 px-4 font-bold text-gray-800 text-lg">
                  Purchase Date
                </th>
                <th className="py-2 px-4 font-bold text-gray-800 text-lg">
                  Warranty Date
                </th>
                <th className="py-2 px-4 font-bold text-gray-800 text-lg">
                  Documents
                </th>
                <th className="py-2 px-4 font-bold text-gray-800 text-lg">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{item.productName}</td>
                  <td className="py-3 px-4">{item.purchaseDate}</td>
                  <td className="py-3 px-4">{item.warrantyDate}</td>
                  <td className="py-3 px-4 flex items-center gap-2">
                    <FaRegFileAlt className="text-gray-600" /> {item.documents}
                  </td>
                  <td className="py-3 px-4">
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
