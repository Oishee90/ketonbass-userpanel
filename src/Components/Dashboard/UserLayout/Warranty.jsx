import React, { useState } from "react";
import { FaRegFileAlt } from "react-icons/fa";
import { format, parse } from "date-fns";
import { IoDocumentTextOutline } from "react-icons/io5";
import {
  useGetInboxQuery,
  useGetPurchaseQuery,
} from "../../../Redux/feature/auth/aithapi";

const Warranty = () => {
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const { data: purchase, error, isLoading } = useGetPurchaseQuery();
  console.log("purchase", purchase);
  // Pagination calculations
  const totalItems = purchase ? purchase.length : 0; // Ensure purchase data exists
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = purchase
    ? purchase.slice(startIndex, startIndex + itemsPerPage)
    : [];
  // const backendBaseURL = import.meta.env.REACT_APP_BACKEND_BASE_URL;
  const frontendBaseURL = "https://server.156-67-218-177.sslip.io/";
  console.log("backendBaseURL", frontendBaseURL);
  const handlePageChange = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
    }
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
              {currentData.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">
                    {" "}
                    {item.product_name || "Not Provided"}
                  </td>
                  <td className="px-4 py-3">
                    {" "}
                    {item.purchase_date || "Not Provided"}
                  </td>
                  <td className="px-4 py-3">
                    {" "}
                    {item.warranty_expire_date || "Not Provided"}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center ">
                      {/* Always displaying the PDF icon */}
                      <IoDocumentTextOutline className="w-6 h-6 text-red-600" />{" "}
                      {/* Customize size and color */}
                      {/* Checking if the invoice exists */}
                      {item.invoice ? (
                        // Displaying the clickable number of files if invoice exists
                        <a
                          href={frontendBaseURL + item.invoice} // Link to the PDF or document
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-2 text-blue-600 hover:text-blue-800"
                        >
                          {item.files ? item.files.length : 1} file
                          {item.files && item.files.length > 1 ? "s" : ""}
                        </a>
                      ) : (
                        // Displaying "Not Provided" when invoice is not available
                        <span className="ml-2 text-gray-500">Not Provided</span>
                      )}
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 text-base font-medium rounded-full ${
                        item.warranty_status === "Active"
                          ? "bg-green-100 text-green-700"
                          : item.warranty_status === "Expiring_Soon"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {item.warranty_status}
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
