import React, { useState } from "react";

const purchaseData = [
  {
    id: 1,
    productName: "Apple Watch",
    storeName: "Mac Shop",
    dateTime: "12.09.2019 - 12.53 PM",
    quantity: 423,
    amount: "$34,295",
    status: "Delivered",
  },
  {
    id: 2,
    productName: "Apple Watch",
    storeName: "Aspire Shop",
    dateTime: "13.09.2019 - 01.20 PM",
    quantity: 305,
    amount: "$28,765",
    status: "Rejected",
  },
  {
    id: 3,
    productName: "Apple Watch",
    storeName: "Tech World",
    dateTime: "14.09.2019 - 10.45 AM",
    quantity: 212,
    amount: "$22,450",
    status: "Pending",
  },
  {
    id: 4,
    productName: "Apple Watch",
    storeName: "Gadget Hub",
    dateTime: "15.09.2019 - 09.15 AM",
    quantity: 150,
    amount: "$17,550",
    status: "Delivered",
  },
  {
    id: 5,
    productName: "Apple Watch",
    storeName: "iCorner",
    dateTime: "16.09.2019 - 03.30 PM",
    quantity: 488,
    amount: "$50,120",
    status: "Rejected",
  },
  {
    id: 6,
    productName: "Apple Watch",
    storeName: "Smart Deals",
    dateTime: "17.09.2019 - 02.05 PM",
    quantity: 390,
    amount: "$42,875",
    status: "Delivered",
  },
  {
    id: 7,
    productName: "Apple Watch",
    storeName: "Tech World",
    dateTime: "18.09.2019 - 11.45 AM",
    quantity: 220,
    amount: "$24,300",
    status: "Pending",
  },
];

const Purchase = () => {
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  // Pagination calculations
  const totalItems = purchaseData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = purchaseData.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
    }
  };

  return (
    <div className="p-4 sm:p-6 font-sans">
      <h1 className="text-xl sm:text-2xl font-bold text-green-800 poppins mb-1">
        Welcome Oishe!
      </h1>
      <p className="text-gray-600 text-xs sm:text-sm mb-4 sm:mb-6 poppins">
        Track your purchases and all details
      </p>

      <div className="bg-white p-4 sm:p-6 rounded-lg shadow ">
        <h2 className="text-lg sm:text-xl font-semibold text-green-800 poppins mb-4 sm:mb-6">
          Purchases Details
        </h2>

        <div className="overflow-x-auto">
          <table className="text-left border-collapse min-w-full">
            <thead>
              <tr className="bg-gray-200 text-gray-600 text-2xl sm:text-sm rounded-xl">
                <th className="py-2 px-2 sm:px-4 font-bold text-gray-800 sticky top-0 bg-gray-200 text-lg">
                  Product Name
                </th>
                <th className="py-2 px-2 sm:px-4 font-bold text-gray-800 sticky top-0 bg-gray-200 text-lg">
                  Store Name
                </th>
                <th className="py-2 px-2 sm:px-4 font-bold text-gray-800 sticky top-0 bg-gray-200 hidden sm:table-cell text-lg">
                  Date - Time
                </th>
                <th className="py-2 px-2 sm:px-4 font-bold text-gray-800 sticky top-0 bg-gray-200 text-lg">
                  Quantity
                </th>
                <th className="py-2 px-2 sm:px-4 font-bold text-gray-800 sticky top-0 bg-gray-200 text-lg">
                  Amount
                </th>
                <th className="py-2 px-2 sm:px-4 font-bold text-gray-800 sticky top-0 bg-gray-200 text-lg">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item) => (
                <tr
                  key={item.id}
                  className="border-b hover:bg-gray-50 text-gray-800"
                >
                  <td className="py-3 px-2 sm:px-4 text-base sm:text-sm whitespace-nowrap">
                    {item.productName}
                  </td>
                  <td className="py-3 px-2 sm:px-4 text-base sm:text-sm whitespace-nowrap">
                    {item.storeName}
                  </td>
                  <td className="py-3 px-2 sm:px-4 text-base sm:text-sm whitespace-nowrap hidden sm:table-cell">
                    {item.dateTime}
                  </td>
                  <td className="py-3 px-2 sm:px-4 text-base sm:text-sm whitespace-nowrap">
                    {item.quantity}
                  </td>
                  <td className="py-3 px-2 sm:px-4 text-base sm:text-sm whitespace-nowrap">
                    {item.amount}
                  </td>
                  <td className="py-3 px-2 sm:px-4">
                    <span
                      className={`px-2 sm:px-3 py-1 text-base font-medium rounded-full ${
                        item.status === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
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
        <div className="flex justify-end mt-4 sm:mt-6">
          <ul className="flex space-x-1 sm:space-x-2 text-xs sm:text-sm">
            <li>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                className="px-2 py-1 sm:px-3 sm:py-2 rounded hover:bg-gray-200 text-lg"
                disabled={currentPage === 1}
              >
                &lt;
              </button>
            </li>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <li key={page}>
                <button
                  onClick={() => handlePageChange(page)}
                  className={`px-2 py-1 sm:px-3 sm:py-2 rounded ${
                    page === currentPage
                      ? "bg-green-800 text-white"
                      : "hover:bg-gray-200"
                  }`}
                >
                  {page}
                </button>
              </li>
            ))}

            <li>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                className="px-2 py-1 sm:px-3 sm:py-2 rounded hover:bg-gray-200 text-lg"
                disabled={currentPage === totalPages}
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

export default Purchase;
