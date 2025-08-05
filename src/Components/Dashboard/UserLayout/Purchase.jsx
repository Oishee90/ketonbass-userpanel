import { useState } from "react";
import AddPurchaseModal from "./AddPurchaseModal";
import { FaPlus, FaSync, FaTrashAlt, FaEdit } from "react-icons/fa";
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
  const [showAllPages, setShowAllPages] = useState(false);
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
  const totalItems = purchase ? purchase.length : 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = purchase
    ? purchase.slice(startIndex, startIndex + itemsPerPage)
    : [];

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
  } = useSyncGoogleDataQuery();

  const handleSync = async () => {
    setSpinning(true);
    try {
      console.log("Syncing with Google API...");
      await refetch();
      console.log("Sync successful!");
    } catch (err) {
      console.error("Failed to sync data:", err);
    } finally {
      setSpinning(false);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Something went wrong. Please try again later.</p>;
  }

  const handlePageChange = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
    }
  };

  const handleDotsClick = () => {
    setShowAllPages(true);
  };

  const renderPages = () => {
    if (showAllPages || totalPages <= 6) {
      return Array.from({ length: totalPages }, (_, index) => (
        <li key={index}>
          <button
            onClick={() => handlePageChange(index + 1)}
            className={`px-2 py-1 rounded ${
              currentPage === index + 1
                ? "bg-green-800 text-white"
                : "hover:bg-gray-200"
            } sm:px-3`}
          >
            {index + 1}
          </button>
        </li>
      ));
    } else {
      return (
        <>
          <li>
            <button
              onClick={() => handlePageChange(1)}
              className={`px-2 py-1 rounded ${
                currentPage === 1
                  ? "bg-green-800 text-white"
                  : "hover:bg-gray-200"
              } sm:px-3`}
            >
              1
            </button>
          </li>
          <li>
            <button
              onClick={() => handlePageChange(2)}
              className={`px-2 py-1 rounded ${
                currentPage === 2
                  ? "bg-green-800 text-white"
                  : "hover:bg-gray-200"
              } sm:px-3`}
            >
              2
            </button>
          </li>
          <li>
            <span
              onClick={handleDotsClick}
              className="px-2 py-1 cursor-pointer select-none"
            >
              ...
            </span>
          </li>
          <li>
            <button
              onClick={() => handlePageChange(totalPages)}
              className={`px-2 py-1 rounded ${
                currentPage === totalPages
                  ? "bg-green-800 text-white"
                  : "hover:bg-gray-200"
              } sm:px-3`}
            >
              {totalPages}
            </button>
          </li>
        </>
      );
    }
  };
  return (
    <div className="p-2 font-sans sm:p-6">
      <div className="flex flex-col items-start justify-between gap-6 mb-4 2xl:flex-row 2xl:items-center sm:mb-6">
        <div>
          <h1 className="mb-1 text-xl font-bold text-green-800 sm:text-2xl poppins">
            Oishee Khan’s Purchases
          </h1>
          <p className="text-xs text-gray-600 sm:text-sm poppins">
            Track your purchases and all details
          </p>
        </div>
        <div className="flex flex-col items-start gap-2 md:items-center 2xl:flex-row">
          <button
            onClick={handleSync}
            className="bg-orange-100 text-[#111827] px-2 md:px-4 py-3 rounded-lg poppins text-base font-medium flex items-center gap-1 md:gap-2"
          >
            <FaSync
              className={`text-[#EA580C] ${
                syncLoading || spinning ? "animate-spin" : ""
              }`}
            />
            {syncLoading || spinning
              ? "Syncing Purchases"
              : "Refresh Purchases"}
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

        {/* Mobile Card Layout (Visible on Small Screens) */}
        {/* ✅ Mobile View (sm:hidden) */}
        <div className="space-y-2 sm:hidden">
          {currentData.map((item) => (
            <div
              key={item.id}
              className="w-full p-4 transition-shadow duration-300 bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl"
            >
              <h3 className="mb-3 text-lg font-semibold text-green-800">
                {item.product_name || "Not Provided"}
              </h3>

              <div className="mb-2 text-sm text-gray-700">
                <p>
                  <span className="font-semibold">Store:</span>{" "}
                  {item.shop_name || "Not Provided"}
                </p>
                <p>
                  <span className="font-semibold">Date:</span>{" "}
                  {item.purchase_date || "Not Provided"}
                </p>
                <p>
                  <span className="font-semibold">Amount:</span>{" "}
                  {item.price || "N/A"}
                </p>
              </div>

              <div className="flex items-center gap-3 mt-3">
                <button
                  onClick={() => handleEditClick(item)}
                  className="text-base text-blue-600 hover:text-blue-800"
                  title="Edit"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(item.order_id)}
                  className="text-base text-red-600 hover:text-red-800"
                  title="Delete"
                >
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ✅ Tablet View (sm:block lg:hidden) */}
        <div className="hidden space-y-4 sm:block 2xl:hidden">
          {currentData.map((item) => (
            <div
              key={item.id}
              className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow"
            >
              <div className="flex flex-wrap py-2 border-b">
                <p className="w-1/3 text-sm font-semibold md:text-base">
                  Product
                </p>
                <p className="w-2/3 text-sm md:text-base">
                  {item.product_name || "Not Provided"}
                </p>
              </div>
              <div className="flex flex-wrap py-2 border-b">
                <p className="w-1/3 text-sm font-semibold md:text-base">
                  Store
                </p>
                <p className="w-2/3 text-sm md:text-base">
                  {item.shop_name || "Not Provided"}
                </p>
              </div>
              <div className="flex flex-wrap py-2 border-b">
                <p className="w-1/3 text-sm font-semibold md:text-base">Date</p>
                <p className="w-2/3 text-sm md:text-base">
                  {item.purchase_date || "Not Provided"}
                </p>
              </div>
              <div className="flex flex-wrap py-2 border-b">
                <p className="w-1/3 text-sm font-semibold md:text-base">
                  Amount
                </p>
                <p className="w-2/3 text-sm md:text-base">
                  {item.price || "N/A"}
                </p>
              </div>
              <div className="flex justify-start gap-3 py-2">
                <p className="w-1/3 text-sm font-semibold md:text-base">
                  Actions
                </p>
                <button
                  onClick={() => handleEditClick(item)}
                  className="text-base text-blue-600 hover:text-blue-800"
                  title="Edit"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(item.order_id)}
                  className="text-base text-red-600 hover:text-red-800"
                  title="Delete"
                >
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ✅ Large Screen Table View (lg:block) */}
        <div className="hidden w-full overflow-x-auto 2xl:block">
          <table className="min-w-[800px] w-full text-left table-auto">
            <thead>
              <tr className="text-gray-600 bg-gray-200 rounded-xl">
                <th className="px-4 py-2 text-base font-bold text-gray-800 bg-gray-200 min-w-[150px]">
                  Product Name
                </th>
                <th className="px-4 py-2 text-base font-bold text-gray-800 bg-gray-200 min-w-[150px]">
                  Store Name
                </th>
                <th className="px-4 py-2 text-base font-bold text-gray-800 bg-gray-200 min-w-[150px] ">
                  Date
                </th>
                <th className="px-4 py-2 text-base font-bold text-gray-800 bg-gray-200 min-w-[100px]">
                  Amount
                </th>
                <th className="px-4 py-2 text-base font-bold text-gray-800 bg-gray-200 min-w-[100px]">
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
                  <td className="px-4 py-2 text-sm">
                    {item.product_name || "Not Provided"}
                  </td>
                  <td className="px-4 py-2 text-sm">
                    {item.shop_name || "Not Provided"}
                  </td>
                  <td className="px-4 py-2 text-sm ">
                    {item.purchase_date || "Not Provided"}
                  </td>
                  <td className="px-4 py-2 text-sm">{item.price || "N/A"}</td>
                  <td className="flex items-center gap-3 px-4 py-2">
                    <button
                      onClick={() => handleEditClick(item)}
                      className="text-base text-blue-600 hover:text-blue-800"
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(item.order_id)}
                      className="text-base text-red-600 hover:text-red-800"
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
        <div className="flex justify-center mt-6">
          <ul className="flex flex-wrap justify-center gap-1 text-sm">
            <li>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-2 py-1 rounded hover:bg-gray-200 disabled:text-gray-400 sm:px-3"
              >
                &lt;
              </button>
            </li>
            {renderPages()}
            <li>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-2 py-1 rounded hover:bg-gray-200 disabled:text-gray-400 sm:px-3"
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
