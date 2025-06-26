import React, { useState } from "react";
import {
  FaTrash,
  FaCalendarAlt,
  FaClipboardList,
  FaTags,
  FaUpload,
} from "react-icons/fa";
import Swal from "sweetalert2";
import ReceiptModal from "./ReceiptModal";
import EditPurchaseModal from "./EditPurchaseModal";

const receiptsData = [
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

const fakeStatsData = [
  { title: "Total Receipts", value: 247 },
  { title: "This Month", value: 42 },
  { title: "Categories", value: 12 },
];

const getIconByTitle = (title) => {
  switch (title) {
    case "Total Receipts":
      return <FaClipboardList className="text-blue-500 text-2xl" />;
    case "This Month":
      return <FaCalendarAlt className="text-green-500 text-2xl" />;
    case "Categories":
      return <FaTags className="text-orange-400 text-2xl" />;
    default:
      return null;
  }
};

const Reciepts = () => {
  const [receiptList, setReceiptList] = useState(receiptsData);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const receiptsPerPage = 6;

  const indexOfLastReceipt = currentPage * receiptsPerPage;
  const indexOfFirstReceipt = indexOfLastReceipt - receiptsPerPage;
  const currentReceipts = receiptList.slice(
    indexOfFirstReceipt,
    indexOfLastReceipt
  );
  const totalPages = Math.ceil(receiptList.length / receiptsPerPage);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setReceiptList((prev) => prev.filter((r) => r.id !== id));
        Swal.fire("Deleted!", "Your receipt has been deleted.", "success");
      }
    });
  };

  const handleView = (receipt) => {
    setSelectedReceipt(receipt);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedReceipt(null);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-green-800 poppins mb-2">
            Welcome Oishe!
          </h1>
          <p className="text-gray-600 text-sm  poppins">
            Track your Receipts Collection
          </p>
        </div>

        <div>
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="flex items-center gap-2 bg-green-100 text-[#111827] px-4 py-3 rounded-lg poppins text-base font-medium"
          >
            <FaUpload className="text-[#16A34A]" /> Upload Receipt
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {fakeStatsData.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow rounded-lg p-4 flex items-center justify-between"
          >
            <div>
              <p className="text-sm text-gray-500">{item.title}</p>
              <h2 className="text-xl font-bold">{item.value}</h2>
            </div>
            {getIconByTitle(item.title)}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {currentReceipts.map((receipt) => (
          <div
            key={receipt.id}
            className="bg-white shadow rounded-lg p-4 flex flex-col justify-between"
          >
            <div className="flex items-start justify-between">
              <div className="mb-2 poppins">
                <span className="inline-block text-xs px-2 py-1 rounded-lg bg-blue-100 text-gray-700 font-medium mb-2">
                  {receipt.category}
                </span>
                <h3 className="text-base font-semibold">{receipt.name}</h3>
                <p className="text-xl font-bold">{receipt.amount}</p>
                <p className="text-sm text-gray-400 mt-1">{receipt.date}</p>
              </div>
              <button
                onClick={() => handleDelete(receipt.id)}
                className="text-red-500 hover:text-red-700 text-lg mt-1"
                title="Delete Receipt"
              >
                <FaTrash />
              </button>
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
              <button
                onClick={() => handleView(receipt)}
                className="text-green-700 text-sm font-medium"
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center items-center space-x-2">
        <button
          className="p-2 rounded text-gray-500 hover:bg-gray-200"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          &lt;
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            className={`p-2 rounded ${
              currentPage === i + 1
                ? "bg-green-600 text-white"
                : "text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          className="p-2 rounded text-gray-500 hover:bg-gray-200"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>

      {/* Modal */}
      <ReceiptModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        receipt={selectedReceipt}
      />
      <EditPurchaseModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
    </div>
  );
};

export default Reciepts;
