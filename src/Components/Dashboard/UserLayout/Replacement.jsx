import React, { useState } from "react";
import { useGetMainProductsQuery } from "../../../Redux/feature/auth/aithapi";
import Spinner from "../../../Shared/Spinner";
import ErrorPage from "../../../Shared/ErrorPage";

const ITEMS_PER_PAGE = 3;

const Replacement = () => {
  const { data, error, isLoading } = useGetMainProductsQuery();
  const [showAllPages, setShowAllPages] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const orders = data?.orders || [];
  const totalPages = Math.ceil(orders.length / ITEMS_PER_PAGE);

  const currentData = orders.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const goToPage = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
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
    <div className="min-h-screen p-2 sm:p-6 bg-gray-50">
      <h1 className="mb-1 text-xl font-bold sm:text-2xl main-color poppins">
        Oishee Khan’s Replacement Parts
      </h1>
      <p className="mb-4 text-xs text-gray-600 sm:text-sm sm:mb-6 poppins">
        Track replacement parts for all of your purchases
      </p>

      <div className="p-4 bg-white rounded-lg shadow sm:p-6 ">
        <h2 className="mb-4 text-lg font-semibold sm:text-xl main-color poppins sm:mb-6">
          Purchases Details
        </h2>
        <div className="hidden overflow-auto overflow-x-auto 2xl:block">
          <table className="w-full border-separate table-auto border-spacing-y-2">
            <thead className="text-left bg-gray-100">
              <tr>
                <th className="sticky top-0 px-2 py-2 text-lg font-bold text-gray-800 bg-gray-200 sm:px-4 poppins">
                  Original Purchase
                </th>
                <th className="px-4 py-3 text-lg font-semibold bg-gray-200 poppins">
                  Replacement parts
                </th>
                <th className="px-4 py-3 text-lg font-semibold bg-gray-200 poppins">
                  Timeline
                </th>
                <th className="px-4 py-3 text-lg font-semibold bg-gray-200 poppins">
                  Link to replacement parts
                </th>
                <th className="px-4 py-3 text-lg font-semibold bg-gray-200 poppins">
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((order, index) =>
                (order.products.length > 0
                  ? order.products
                  : [
                      {
                        product_name: null,
                        purchased_date: null,
                        store_link: null,
                        price: null,
                      },
                    ]
                ).map((item, idx) => (
                  <tr
                    key={`${index}-${idx}`}
                    className="border-t border-gray-200"
                  >
                    {idx === 0 && (
                      <td
                        rowSpan={
                          order.products.length > 0 ? order.products.length : 1
                        }
                        className="px-4 py-4 font-medium text-gray-700 align-top border-b border-r border-gray-300"
                      >
                        {order.main_product || "No Main Product"}
                      </td>
                    )}
                    <td className="px-4 py-4 text-gray-700 border-b border-gray-300 poppins">
                      {item.product_name || "null"}
                    </td>
                    <td className="px-4 py-4 text-gray-700 border-b border-gray-300 poppins">
                      {item.purchased_date || "null"}
                    </td>
                    <td className="px-4 py-4 text-blue-600 underline border-b border-gray-300 cursor-pointer poppins">
                      {item.store_link ? (
                        <a
                          href={item.store_link}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {item.store_link}
                        </a>
                      ) : (
                        "null"
                      )}
                    </td>
                    <td className="px-4 py-4 text-gray-700 border-b border-gray-300 poppins">
                      {item.price !== null ? `$${item.price}` : "null"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {/* ✅ tablet view - Card Layout */}
        <div className="hidden space-y-4 sm:block 2xl:hidden">
          {currentData.map((order, index) => (
            <div
              key={index}
              className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow"
            >
              {/* ✅ Original Purchase */}
              <div className="flex flex-wrap py-2 border-b">
                <p className="w-1/3 text-sm font-semibold poppins lg:text-lg md:text-base">
                  Original Purchase
                </p>
                <p className="w-2/3 text-sm md:text-base lg:text-lg">
                  {order.main_product || "Not Provided"}
                </p>
              </div>

              {/* ✅ Replacement Parts List */}
              {(order.products.length > 0
                ? order.products
                : [
                    {
                      product_name: null,
                      purchased_date: null,
                      store_link: null,
                      price: null,
                    },
                  ]
              ).map((item, idx) => (
                <div key={idx} className="py-2 border-b">
                  <div className="flex flex-wrap mb-1">
                    <p className="w-1/3 text-sm font-semibold poppins md:text-base">
                      Replacement Part
                    </p>
                    <p className="w-2/3 text-sm md:text-base poppins">
                      {item.product_name || "Not Provided"}
                    </p>
                  </div>
                  <div className="flex flex-wrap mb-1">
                    <p className="w-1/3 text-sm font-semibold poppins md:text-base">
                      Timeline
                    </p>
                    <p className="w-2/3 text-sm md:text-base poppins">
                      {item.purchased_date || "Not Provided"}
                    </p>
                  </div>
                  <div className="flex flex-wrap mb-1">
                    <p className="w-1/3 text-sm font-semibold poppins md:text-base">
                      Link
                    </p>
                    <p className="w-2/3 text-sm text-blue-600 underline break-all md:text-base">
                      {item.store_link ? (
                        <a
                          href={item.store_link}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {item.store_link}
                        </a>
                      ) : (
                        "Not Provided"
                      )}
                    </p>
                  </div>
                  <div className="flex flex-wrap">
                    <p className="w-1/3 text-sm font-semibold poppins md:text-base">
                      Price
                    </p>
                    <p className="w-2/3 text-sm md:text-base poppins">
                      {item.price !== null ? `$${item.price}` : "N/A"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
        {/* mobile-view */}
        <div className="block space-y-4 sm:hidden 2xl:hidden">
          {currentData.map((order, index) => (
            <div
              key={index}
              className="w-full p-4 bg-white border border-gray-300 shadow-lg rounded-xl"
            >
              {/* ✅ Original Purchase */}
              <div className="mb-3 ">
                <h3 className="text-base font-bold text-gray-800 poppins md:text-lg">
                  Original Purchase
                </h3>
                <p className="text-sm title-color md:text-base">
                  {order.main_product || "Not Provided"}
                </p>
              </div>

              {/* ✅ Replacement Parts */}
              <div className="space-y-3">
                {(order.products.length > 0
                  ? order.products
                  : [
                      {
                        product_name: null,
                        purchased_date: null,
                        store_link: null,
                        price: null,
                      },
                    ]
                ).map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 border border-gray-200 rounded-lg bg-gray-50"
                  >
                    <div className="mb-2">
                      <p className="text-sm font-semibold title-color poppins">
                        Replacement Part:
                      </p>
                      <p className="text-sm title-color">
                        {item.product_name || "Not Provided"}
                      </p>
                    </div>
                    <div className="mb-2">
                      <p className="text-sm font-semibold title-color poppins">
                        Timeline:
                      </p>
                      <p className="text-sm title-color">
                        {item.purchased_date || "Not Provided"}
                      </p>
                    </div>
                    <div className="mb-2">
                      <p className="text-sm font-semibold title-color poppins">
                        Link:
                      </p>
                      <p className="text-sm text-blue-600 underline break-all">
                        {item.store_link ? (
                          <a
                            href={item.store_link}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {item.store_link}
                          </a>
                        ) : (
                          "Not Provided"
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold title-color poppins">
                        Price:
                      </p>
                      <p className="text-sm title-color">
                        {item.price !== null ? `$${item.price}` : "N/A"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6 poppins">
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
  );
};

export default Replacement;
