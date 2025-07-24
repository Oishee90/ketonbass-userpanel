import { useState } from "react";
import AddPurchaseModal from "./AddPurchaseModal";
import { FaPlus, FaSync } from "react-icons/fa";

import { FaTrashAlt, FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import EditPurchase from "./EditPurchase";
import {
  useDeleteOrderMutation,
  useGetPurchaseQuery,
  useSyncGoogleDataQuery,
} from "../../../Redux/feature/auth/aithapi";

const Purchase = () => {
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const {
    data: purchase,
    error,
    isLoading,
    refetch: refetchPurchase,
  } = useGetPurchaseQuery();
  console.log("purchase", purchase);
  // Pagination calculations
  const [deleteOrder] = useDeleteOrderMutation();
  const totalItems = purchase ? purchase.length : 0; // Ensure purchase data exists
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = purchase
    ? purchase.slice(startIndex, startIndex + itemsPerPage)
    : [];

  const handlePageChange = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
    }
  };
  const handleEditClick = (item) => {
    setEditData(item);
    setEditModalOpen(true);
  };
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
          await deleteOrder(orderId).unwrap();
          refetchPurchase();
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

  const [spinning, setSpinning] = useState(false);
  const {
    data: syncData,
    error: syncError,
    isLoading: syncLoading,
    refetch: refetch,
  } = useSyncGoogleDataQuery(); // Sync API for GET request

  const handleSync = async () => {
    setSpinning(true); // Start spinning when clicked

    try {
      // Trigger the sync API request
      console.log("Syncing with Google API...");
      await refetch(); // Call the refetch function from RTK Query to trigger the sync

      console.log("Sync successful!");
    } catch (err) {
      console.error("Failed to sync data:", err);
    } finally {
      setSpinning(false); // Stop spinning when done
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Something went wrong. Please try again later.</p>;
  }

  return (
    <div className="p-4 font-sans sm:p-6">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div className="">
          <h1 className="mb-1 text-xl font-bold text-green-800 sm:text-2xl poppins">
            Welcome Oishe!
          </h1>
          <p className="text-xs text-gray-600 sm:text-sm poppins">
            Track your purchases and all details
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleSync} // Trigger the sync when clicked
            className="bg-orange-100 text-[#111827] px-4 py-3 rounded-lg poppins text-base font-medium flex items-center gap-2"
          >
            <FaSync
              className={`text-[#EA580C] ${
                syncLoading || spinning ? "animate-spin" : ""
              }`} // Conditionally apply spinning class
            />
            {syncLoading || spinning ? "Syncing..." : "Refresh Purchases"}
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-blue-100 text-[#111827] px-4 py-3 rounded-lg poppins text-base font-medium"
          >
            <FaPlus /> Add New Purchase
          </button>
        </div>
      </div>

      <div className="p-4 bg-white rounded-lg shadow sm:p-6">
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
                  <td className="px-2 py-3 ">
                    {item.product_name || "Not Provided"}
                  </td>
                  <td className="px-2 py-3 ">
                    {item.shop_name || "Not Provided"}
                  </td>
                  <td className="hidden px-2 py-3 text-base sm:px-4 sm:text-sm whitespace-nowrap sm:table-cell">
                    {item.purchase_date || "Not Provided"}
                  </td>

                  <td className="px-2 py-3 ">{item.price || "N/A"}</td>
                  <td className="flex items-center gap-4 px-2 py-3 sm:px-4">
                    <button
                      onClick={() => handleEditClick(item)}
                      className="text-xl text-blue-600 hover:text-blue-800"
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(item.order_id)}
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
