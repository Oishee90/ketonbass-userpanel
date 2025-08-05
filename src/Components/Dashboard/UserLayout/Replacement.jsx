import React, { useState } from "react";
import { useGetMainProductsQuery } from "../../../Redux/feature/auth/aithapi";

const purchaseData = [
  {
    original: "Dyson V7 Vacuum",
    replacements: [
      {
        part: "Pre-Filter",
        timeline: "6 months",
        link: "Dyson Link",
        price: "$11.99",
      },
      {
        part: "Post-Filter",
        timeline: "6 months",
        link: "Dyson Link",
        price: "$134.99",
      },
      {
        part: "Battery",
        timeline: "6 months",
        link: "Dyson Link",
        price: "$55.99",
      },
    ],
  },
  {
    original: "iRobot Roomba 960",
    replacements: [
      {
        part: "Side Brush",
        timeline: "3 months",
        link: "iRobot Store",
        price: "$9.99",
      },
      {
        part: "Filter",
        timeline: "6 months",
        link: "iRobot Store",
        price: "$14.99",
      },
    ],
  },
  {
    original: "Nespresso VertuoPlus",
    replacements: [
      {
        part: "Water Tank",
        timeline: "12 months",
        link: "Nespresso Shop",
        price: "$24.99",
      },
      {
        part: "Drip Tray",
        timeline: "12 months",
        link: "Nespresso Shop",
        price: "$15.00",
      },
    ],
  },

  // New 4 fake purchases:
  {
    original: "Sony WH-1000XM4 Headphones",
    replacements: [
      {
        part: "Ear Pads",
        timeline: "12 months",
        link: "Sony Store",
        price: "$29.99",
      },
      {
        part: "Battery",
        timeline: "24 months",
        link: "Sony Store",
        price: "$79.99",
      },
    ],
  },
  {
    original: "KitchenAid Mixer",
    replacements: [
      {
        part: "Beater Attachment",
        timeline: "18 months",
        link: "KitchenAid Parts",
        price: "$19.99",
      },
      {
        part: "Motor",
        timeline: "36 months",
        link: "KitchenAid Parts",
        price: "$199.99",
      },
    ],
  },
  {
    original: "Fitbit Charge 5",
    replacements: [
      {
        part: "Charging Cable",
        timeline: "12 months",
        link: "Fitbit Store",
        price: "$14.99",
      },
      {
        part: "Strap",
        timeline: "6 months",
        link: "Fitbit Store",
        price: "$24.99",
      },
    ],
  },
  {
    original: "Canon EOS M50 Camera",
    replacements: [
      {
        part: "Battery",
        timeline: "12 months",
        link: "Canon Parts",
        price: "$59.99",
      },
      {
        part: "Lens Cap",
        timeline: "18 months",
        link: "Canon Parts",
        price: "$9.99",
      },
    ],
  },
];

const ITEMS_PER_PAGE = 3;

const Replacement = () => {
  const { data, error, isLoading } = useGetMainProductsQuery();
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
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-semibold text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">Failed to load data!</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50">
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
        <div className="overflow-auto">
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
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-center mt-6 space-x-2">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`p-2 rounded ${
            currentPage === 1
              ? "text-gray-300 cursor-not-allowed"
              : "text-gray-500 hover:bg-gray-200"
          }`}
        >
          &lt;
        </button>

        {/* Show page numbers */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => goToPage(pageNum)}
            className={`p-2 rounded ${
              currentPage === pageNum
                ? "bg-green-600 text-white"
                : "text-gray-700 hover:bg-gray-200"
            }`}
          >
            {pageNum}
          </button>
        ))}

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`p-2 rounded ${
            currentPage === totalPages
              ? "text-gray-300 cursor-not-allowed"
              : "text-gray-500 hover:bg-gray-200"
          }`}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Replacement;
