import React, { useState } from "react";
import AddPurchaseModal from "./AddPurchaseModal";
import { FaPlus, FaSync } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import EditPurchaseModal from "./EditPurchaseModal";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import EditPurchase from "./EditPurchase";
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
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
  const [spinning, setSpinning] = useState(false);

  const handleClick = () => {
    setSpinning(true);

    setTimeout(() => {
      window.location.reload();
    }, 300);
  };

  const handleEditClick = (item) => {
    setEditData(item);
    setEditModalOpen(true);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your purchase has been deleted.", "success");

        // const newData = purchaseData.filter(item => item.id !== id);
        // setPurchaseData(newData);
      }
    });
  };

  return (
    <div className="p-4 font-sans sm:p-6">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div className="">
          <h1 className="mb-1 text-xl font-bold text-green-800 sm:text-2xl poppins">
            Welcome Oishe!
          </h1>
          <p className="text-xs text-gray-600 sm:text-sm poppins">
            Track your purchases and all details
          </p>{" "}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleClick}
            className="bg-orange-100 text-[#111827] px-4 py-3 rounded-lg poppins text-base font-medium flex items-center gap-2"
          >
            <FaSync
              className={`text-[#EA580C] ${spinning ? "animate-spin" : ""}`}
            />
            Refresh Purchases
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-blue-100 text-[#111827] px-4 py-3 rounded-lg poppins text-base font-medium"
          >
            <FaPlus /> Add New Purchase
          </button>
        </div>
      </div>

      <div className="p-4 bg-white rounded-lg shadow sm:p-6 ">
        <h2 className="mb-4 text-lg font-semibold text-green-800 sm:text-xl poppins sm:mb-6">
          Purchases Details
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left border-collapse">
            <thead>
              <tr className="text-2xl text-gray-600 bg-gray-200 sm:text-sm rounded-xl">
                <th className="sticky top-0 px-2 py-2 text-lg font-bold text-gray-800 bg-gray-200 sm:px-4">
                  Product Name
                </th>
                <th className="sticky top-0 px-2 py-2 text-lg font-bold text-gray-800 bg-gray-200 sm:px-4">
                  Store Name
                </th>
                <th className="sticky top-0 hidden px-2 py-2 text-lg font-bold text-gray-800 bg-gray-200 sm:px-4 sm:table-cell">
                  Date - Time
                </th>
                <th className="sticky top-0 px-2 py-2 text-lg font-bold text-gray-800 bg-gray-200 sm:px-4">
                  Quantity
                </th>
                <th className="sticky top-0 px-2 py-2 text-lg font-bold text-gray-800 bg-gray-200 sm:px-4">
                  Amount
                </th>
                <th className="px-2 py-2 text-lg font-bold text-gray-800 sm:px-4">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item) => (
                <tr
                  key={item.id}
                  className="text-gray-800 border-b hover:bg-gray-50"
                >
                  <td className="px-2 py-3 text-base sm:px-4 sm:text-sm whitespace-nowrap">
                    {item.productName}
                  </td>
                  <td className="px-2 py-3 text-base sm:px-4 sm:text-sm whitespace-nowrap">
                    {item.storeName}
                  </td>
                  <td className="hidden px-2 py-3 text-base sm:px-4 sm:text-sm whitespace-nowrap sm:table-cell">
                    {item.dateTime}
                  </td>
                  <td className="px-2 py-3 text-base sm:px-4 sm:text-sm whitespace-nowrap">
                    {item.quantity}
                  </td>
                  <td className="px-2 py-3 text-base sm:px-4 sm:text-sm whitespace-nowrap">
                    {item.amount}
                  </td>
                  <td className="flex items-center gap-4 px-2 py-3 sm:px-4">
                    <button
                      onClick={() => handleEditClick(item)}
                      className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800"
                      title="Edit"
                    >
                      <FaEdit className="text-xl" />
                    </button>

                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-xl text-red-600 hover:text-red-800"
                      title="Delete"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-end mt-4 sm:mt-6">
          <ul className="flex space-x-1 text-xs sm:space-x-2 sm:text-sm">
            <li>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                className="px-2 py-1 text-lg rounded sm:px-3 sm:py-2 hover:bg-gray-200"
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
                className="px-2 py-1 text-lg rounded sm:px-3 sm:py-2 hover:bg-gray-200"
                disabled={currentPage === totalPages}
              >
                &gt;
              </button>
            </li>
          </ul>
        </div>
      </div>
      <AddPurchaseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      {editModalOpen && (
      <EditPurchase
  isOpen={editModalOpen}
  onClose={() => setEditModalOpen(false)}
  data={editData}
/>

      )}
    </div>
  );
};

export default Purchase;
