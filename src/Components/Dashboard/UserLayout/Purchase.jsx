import React from "react";

const purchaseData = [
  {
    id: 1,
    productName: "Apple Watch",
    storeName: "Mac shop",
    dateTime: "12.09.2019 - 12.53 PM",
    quantity: 423,
    amount: "$34,295",
    status: "Delivered",
  },
  {
    id: 2,
    productName: "Apple Watch",
    storeName: "Aspire shop",
    dateTime: "12.09.2019 - 12.53 PM",
    quantity: 423,
    amount: "$34,295",
    status: "Rejected",
  },
];

const Purchase = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-6 font-sans">
      <h1 className="text-xl sm:text-2xl font-bold text-green-800 poppins mb-1">
        Welcome Oishe!
      </h1>
      <p className="text-gray-600 text-xs sm:text-sm mb-4 sm:mb-6">
        Track your purchases and all details
      </p>

      <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
        <h2 className="text-lg sm:text-xl font-semibold text-green-800 poppins mb-4 sm:mb-6">
          Purchases Details
        </h2>

        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-gray-200 text-gray-600 text-xs sm:text-sm rounded-xl">
                <th className="py-2 px-2 sm:px-4 font-bold text-gray-800 sticky top-0 bg-gray-200">
                  Product Name
                </th>
                <th className="py-2 px-2 sm:px-4 font-bold text-gray-800 sticky top-0 bg-gray-200">
                  Store Name
                </th>
                <th className="py-2 px-2 sm:px-4 font-bold text-gray-800 sticky top-0 bg-gray-200 hidden sm:table-cell">
                  Date - Time
                </th>
                <th className="py-2 px-2 sm:px-4 font-bold text-gray-800 sticky top-0 bg-gray-200">
                  Quantity
                </th>
                <th className="py-2 px-2 sm:px-4 font-bold text-gray-800 sticky top-0 bg-gray-200">
                  Amount
                </th>
                <th className="py-2 px-2 sm:px-4 font-bold text-gray-800 sticky top-0 bg-gray-200">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {purchaseData.map((item) => (
                <tr
                  key={item.id}
                  className="border-b hover:bg-gray-50 text-gray-800"
                >
                  <td className="py-2 px-2 sm:px-4 text-xs sm:text-sm whitespace-nowrap">
                    {item.productName}
                  </td>
                  <td className="py-2 px-2 sm:px-4 text-xs sm:text-sm whitespace-nowrap">
                    {item.storeName}
                  </td>
                  <td className="py-2 px-2 sm:px-4 text-xs sm:text-sm whitespace-nowrap hidden sm:table-cell">
                    {item.dateTime}
                  </td>
                  <td className="py-2 px-2 sm:px-4 text-xs sm:text-sm whitespace-nowrap">
                    {item.quantity}
                  </td>
                  <td className="py-2 px-2 sm:px-4 text-xs sm:text-sm whitespace-nowrap">
                    {item.amount}
                  </td>
                  <td className="py-2 px-2 sm:px-4">
                    <span
                      className={`px-2 sm:px-3 py-1 text-xs font-medium rounded-full ${
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
              <button className="px-2 py-1 sm:px-3 sm:py-2 rounded hover:bg-gray-200 text-lg">
                &lt;
              </button>
            </li>
            {[1, 2, 3].map((num) => (
              <li key={num}>
                <button
                  className={`px-2 py-1 sm:px-3 sm:py-2 rounded ${
                    num === 1 ? "bg-green-800 text-white" : "hover:bg-gray-200"
                  }`}
                >
                  {num}
                </button>
              </li>
            ))}
            <li>
              <span className="px-2 py-1 sm:px-3 sm:py-2">...</span>
            </li>
            <li>
              <button className="px-2 py-1 sm:px-3 sm:py-2 rounded hover:bg-gray-200">
                12
              </button>
            </li>
            <li>
              <button className="px-2 py-1 sm:px-3 sm:py-2 rounded hover:bg-gray-200 text-lg">
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
