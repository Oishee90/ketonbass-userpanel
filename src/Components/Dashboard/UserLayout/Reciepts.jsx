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

import {
  useDeleteReciptsMutation,
  useGetRecieptsQuery,
} from "../../../Redux/feature/auth/aithapi";

const getIconByTitle = (title) => {
  switch (title) {
    case "Total Receipts":
      return <FaClipboardList className="text-2xl text-blue-500" />;
    case "This Month":
      return <FaCalendarAlt className="text-2xl text-green-500" />;
    case "Categories":
      return <FaTags className="text-2xl text-orange-400" />;
    default:
      return null;
  }
};

const Reciepts = () => {
  const { data, isLoading, isError, refetch } = useGetRecieptsQuery();
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [deleteRecipts] = useDeleteReciptsMutation();
  const [selectedReceiptId, setSelectedReceiptId] = useState(null);
  console.log("data", data);
  const receiptsPerPage = 6;

  if (isLoading) return <p>Loading data...</p>;
  if (isError) return <p>Failed to load data!</p>;

  const receipts = data?.orders || [];
  const statsData = [
    { title: "Total Receipts", value: data?.total_invoice || 0 },
    { title: "This Month", value: data?.total_orders_this_month || 0 },
    { title: "Categories", value: data?.total_categories || 0 },
  ];

  // Pagination
  const indexOfLastReceipt = currentPage * receiptsPerPage;
  const indexOfFirstReceipt = indexOfLastReceipt - receiptsPerPage;
  const currentReceipts = receipts.slice(
    indexOfFirstReceipt,
    indexOfLastReceipt
  );
  const totalPages = Math.ceil(receipts.length / receiptsPerPage);

  const handleDelete = (orderId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteRecipts(orderId).unwrap();
          refetch();
          Swal.fire("Deleted!", "Your purchase has been deleted.", "success");
        } catch (error) {
          Swal.fire(
            "Error!",
            error?.data?.message || "Failed to delete order.",
            "error"
          );
        }
      }
    });
  };

  const handleView = (orderId) => {
    setSelectedReceiptId(orderId);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedReceipt(null);
    setSelectedReceiptId(null);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="mb-2 text-2xl font-bold text-green-800 poppins">
            Welcome Oishe!
          </h1>
          <p className="text-sm text-gray-600 poppins">
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

      {/* Stats Section */}
      <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-3">
        {statsData.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-white rounded-lg shadow"
          >
            <div>
              <p className="text-sm text-gray-500">{item.title}</p>
              <h2 className="text-xl font-bold">{item.value}</h2>
            </div>
            {getIconByTitle(item.title)}
          </div>
        ))}
      </div>

      {/* Receipts List */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {currentReceipts.map((receipt) => (
          <div
            key={receipt.id}
            className="flex flex-col justify-between p-4 bg-white rounded-lg shadow"
          >
            <div className="flex items-start justify-between">
              <div className="mb-2 poppins">
                <span className="inline-block px-2 py-1 mb-2 text-xs font-medium text-gray-700 bg-blue-100 rounded-lg">
                  {receipt.category || "Uncategorized"}
                </span>
                <h3 className="text-base font-semibold">
                  {receipt.product_name}
                </h3>
                <p className="text-xl font-bold">৳ {receipt.price}</p>
                <p className="mt-1 text-sm text-gray-400">
                  {receipt.purchase_date}
                </p>
              </div>
              <button
                onClick={() => handleDelete(receipt.order_id)}
                className="mt-1 text-lg text-red-500 hover:text-red-700"
                title="Delete Receipt"
              >
                <FaTrash />
              </button>
            </div>
            <div className="flex items-center justify-between mt-4">
              <span
                className={`text-xs font-medium px-2 py-1 rounded-full ${
                  receipt.warranty_status === "Expired"
                    ? "text-red-600 bg-red-100"
                    : "text-green-600 bg-green-100"
                }`}
              >
                {receipt.warranty_status}
              </span>
              <button
                onClick={() => handleView(receipt.order_id)}
                className="text-sm font-medium text-green-700"
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center mt-6 space-x-2">
        <button
          className="p-2 text-gray-500 rounded hover:bg-gray-200"
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
          className="p-2 text-gray-500 rounded hover:bg-gray-200"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>

      {/* Modals */}
      <ReceiptModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        orderId={selectedReceiptId}
      />
      <EditPurchaseModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
    </div>
  );
};

export default Reciepts;
