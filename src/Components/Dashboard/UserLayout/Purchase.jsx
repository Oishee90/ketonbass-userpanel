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
    <div className="bg-[#f9f9f9] min-h-screen p-6 font-sans">
      <h1 className="text-2xl font-bold text-green-800 mb-1">
        Welcome Susan !
      </h1>
      <p className="text-gray-600 text-sm mb-6">
        Track your purchases and all details
      </p>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-green-800 mb-4">
          Purchases Details
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-600 text-sm">
                <th className="py-2 px-4">Product Name</th>
                <th className="py-2 px-4">Store Name</th>
                <th className="py-2 px-4">Date - Time</th>
                <th className="py-2 px-4">Quantity</th>
                <th className="py-2 px-4">Amount</th>
                <th className="py-2 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {purchaseData.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4 text-sm text-gray-800">
                    {item.productName}
                  </td>
                  <td className="py-2 px-4 text-sm text-gray-800">
                    {item.storeName}
                  </td>
                  <td className="py-2 px-4 text-sm text-gray-800">
                    {item.dateTime}
                  </td>
                  <td className="py-2 px-4 text-sm text-gray-800">
                    {item.quantity}
                  </td>
                  <td className="py-2 px-4 text-sm text-gray-800">
                    {item.amount}
                  </td>
                  <td className="py-2 px-4">
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
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
        <div className="flex justify-end mt-6">
          <ul className="flex space-x-2 text-sm">
            <li>
              <button className="px-3 py-1 rounded hover:bg-gray-200">
                &lt;
              </button>
            </li>
            {[1, 2, 3].map((num) => (
              <li key={num}>
                <button
                  className={`px-3 py-1 rounded ${
                    num === 1 ? "bg-green-800 text-white" : "hover:bg-gray-200"
                  }`}
                >
                  {num}
                </button>
              </li>
            ))}
            <li>
              <span className="px-2 py-1">...</span>
            </li>
            <li>
              <button className="px-3 py-1 rounded hover:bg-gray-200">
                12
              </button>
            </li>
            <li>
              <button className="px-3 py-1 rounded hover:bg-gray-200">
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
