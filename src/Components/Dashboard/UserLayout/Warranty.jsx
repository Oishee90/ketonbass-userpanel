import React, { useState } from "react";
import { FaRegFileAlt } from "react-icons/fa";
import { format, parse } from "date-fns";
import { IoDocumentTextOutline } from "react-icons/io5";
import {
  useDeleteOrderMutation,
  useGetInboxQuery,
  useGetPurchaseQuery,
} from "../../../Redux/feature/auth/aithapi";
import AddPurchaseModal from "./AddPurchaseModal";
import { FaPlus, FaSync, FaTrashAlt, FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import EditPurchase from "./EditPurchase";
import Spinner from "../../../Shared/Spinner";
import ErrorPage from "../../../Shared/ErrorPage";
import { useSelector } from "react-redux";

const Warranty = () => {
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [showAllPages, setShowAllPages] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    data: purchase,
    error,
    isLoading,
    refetch: refetchPurchase,
  } = useGetPurchaseQuery();
  const user = useSelector((state) => state.auth.user);
  const totalItems = purchase ? purchase.length : 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [editData, setEditData] = useState(null);
  const [deleteOrder] = useDeleteOrderMutation();
  const [editModalOpen, setEditModalOpen] = useState(false);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = purchase
    ? purchase.slice(startIndex, startIndex + itemsPerPage)
    : [];

  const frontendBaseURL = "https://api-server.purtrack.com/";

  const handlePageChange = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
    }
  };

  const handleDotsClick = () => {
    setShowAllPages(true);
  };

  const handleEditClick = (item) => {
    setEditData(item);
    setEditModalOpen(true);
  };

  const handleDelete = (orderId) => {
    console.log("Deleting order with ID:", orderId);
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
  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <ErrorPage message="Failed to load data. Please try again."></ErrorPage>
    );
  }

  return (
    <div className="bg-[#f9f9f9] min-h-screen p-2 sm:p-6 font-sans">
      <div className="flex flex-col items-start justify-between gap-6 mb-4 2xl:flex-row 2xl:items-center sm:mb-6">
        <div>
          <h1 className="mb-1 text-xl font-bold main-color sm:text-2xl poppins">
            {user?.name}'s Warranties
          </h1>
          <p className="mb-6 text-sm tittle-color sm:text-base">
            Track your warranties and all details
          </p>
        </div>

        <div className="flex flex-col items-start 2xl:flex-row">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-blue-100 text-[#111827] px-2 py-3 rounded-lg poppins text-sm sm:text-base font-medium"
          >
            <FaPlus /> Add New Purchase
          </button>
        </div>
      </div>

      <div className="p-6 bg-white rounded-lg shadow">
        <h2 className="mb-4 text-lg font-semibold main-color sm:text-xl poppins sm:mb-6">
          Warranties Details
        </h2>

        <div className="hidden overflow-x-auto lg:block">
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
                {/* <th className="px-4 py-2 text-lg font-bold text-center text-gray-800">
                  Documents
                </th> */}

                <th className="px-4 py-2 text-lg font-bold text-gray-800">
                  Status
                </th>
                <th className="px-4 py-2 text-base font-bold text-gray-800 bg-gray-200 min-w-[100px]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">
                    {item.product_name || "Not Provided"}
                  </td>
                  <td className="px-4 py-3">
                    {item.purchase_date || "Not Provided"}
                  </td>
                  <td className="px-4 py-3">
                    {item.warranty_expire_date || "Not Provided"}
                  </td>
                  {/* <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center">
                      <IoDocumentTextOutline className="w-6 h-6 text-red-600" />
                      {item.invoice ? (
                        <a
                          href={frontendBaseURL + item.invoice}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-2 text-blue-600 hover:text-blue-800"
                        >
                          {item.files ? item.files.length : 1} file
                          {item.files && item.files.length > 1 ? "s" : ""}
                        </a>
                      ) : (
                        <span className="ml-2 text-gray-500">Not Provided</span>
                      )}
                    </div>
                  </td> */}
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
                  <td className="flex items-center gap-3 px-4 py-2">
                    <button
                      onClick={() => handleEditClick(item)}
                      className="text-2xl main-color hover:text-green-800"
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(item.order_id)}
                      className="text-2xl text-red-600 hover:text-red-800"
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
        {/* Responsive Card Layout for Tablet  */}
        <div className="hidden space-y-4 sm:block lg:hidden">
          {currentData.map((item) => (
            <div
              key={item.id}
              className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow"
            >
              <div className="flex flex-wrap py-2 border-b">
                <p className="w-1/3 text-sm font-semibold md:text-base">Name</p>
                <p className="w-2/3 text-sm md:text-base">
                  {item.product_name || "Not Provided"}
                </p>
              </div>
              <div className="flex flex-wrap py-2 border-b">
                <p className="w-1/3 text-sm font-semibold md:text-base">
                  Purchase Date
                </p>
                <p className="w-2/3 text-sm md:text-base">
                  {item.purchase_date || "Not Provided"}
                </p>
              </div>
              <div className="flex flex-wrap py-2 border-b">
                <p className="w-1/3 text-sm font-semibold md:text-base">
                  Warranty Date
                </p>
                <p className="w-2/3 text-sm md:text-base">
                  {item.warranty_expire_date || "Not Provided"}
                </p>
              </div>

              {/* <div className="flex flex-wrap py-2 border-b">
                <p className="w-1/3 text-sm font-semibold md:text-base">
                  Doccument
                </p>
                <p className="w-2/3 text-sm md:text-base">
                  {item.invoice ? item.invoice : "Not Provided"}
                </p>
              </div> */}
              <div className="flex flex-wrap py-2">
                <p className="w-1/3 text-sm font-semibold md:text-base">
                  Status
                </p>
                <p className="w-2/3 text-sm md:text-base">
                  {item.warranty_status || "Not Provided"}
                </p>
              </div>
              <div className="flex justify-start gap-3 py-2 poppins ">
                <p className="w-1/3 font-semibold md:text-base lg:text-lg">
                  Actions
                </p>
                <button
                  onClick={() => handleEditClick(item)}
                  className=" main-color hover:text-green-800 md:text-base lg:text-lg"
                  title="Edit"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(item.order_id)}
                  className="text-base text-red-600 lg:text-lg hover:text-red-800"
                  title="Delete"
                >
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Responsive Card Layout for  Mobile */}
        <div className="space-y-2 sm:hidden lg:hidden">
          {currentData.map((item) => (
            <div
              key={item.id}
              className="w-full p-4 transition-shadow duration-300 bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl"
            >
              <h3 className="mb-3 text-lg font-semibold text-green-800">
                {item.product_name || "Not Provided"}
              </h3>

              <div className="flex flex-wrap justify-between mb-3">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Purchase Date:</span>{" "}
                  {item.purchase_date || "Not Provided"}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Warranty Date:</span>{" "}
                  {item.warranty_expire_date || "Not Provided"}
                </p>
              </div>

              {/* <div className="flex flex-wrap items-center justify-between mb-3">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Documents:</span>
                </p>
                <div className="flex items-center">
                  <IoDocumentTextOutline className="w-5 h-5 text-red-600" />
                  {item.invoice ? (
                    <a
                      href={frontendBaseURL + item.invoice}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2 text-sm text-blue-600 hover:text-blue-800"
                    >
                      {item.files ? item.files.length : 1} file
                      {item.files && item.files.length > 1 ? "s" : ""}
                    </a>
                  ) : (
                    <span className="ml-2 text-sm text-gray-500">
                      Not Provided
                    </span>
                  )}
                </div>
              </div> */}

              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Status:</span>
                </p>
                <span
                  className={`px-3 py-1 text-sm font-medium rounded-full ${
                    item.warranty_status === "Active"
                      ? "bg-green-100 text-green-700"
                      : item.warranty_status === "Expiring_Soon"
                      ? "bg-orange-100 text-orange-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {item.warranty_status || "Not Provided"}
                </span>
              </div>
              <div className="flex items-center gap-3 mt-3">
                <button
                  onClick={() => handleEditClick(item)}
                  className="text-lg main-color hover:text-green-800"
                  title="Edit"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(item.order_id)}
                  className="text-lg text-red-600 hover:text-red-800"
                  title="Delete"
                >
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          ))}
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

export default Warranty;
