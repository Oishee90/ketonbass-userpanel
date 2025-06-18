import React from "react";
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
];

const Replacement = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-xl sm:text-2xl font-bold main-color poppins mb-1">
        Welcome Oishe !
      </h1>
      <p className="text-gray-600 text-xs sm:text-sm mb-4 sm:mb-6 poppins">
        Track your purchases and all details
      </p>

      <div className="bg-white p-4 sm:p-6 rounded-lg shadow ">
        <h2 className="text-lg sm:text-xl font-semibold main-color poppins mb-4 sm:mb-6">
          Purchases Details
        </h2>
        <div className="overflow-auto">
          <table className="w-full table-auto border-separate border-spacing-y-2">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="py-2 px-2 sm:px-4 font-bold text-gray-800 sticky top-0 bg-gray-200 text-lg poppins">
                  Original Purchase
                </th>
                <th className="py-3 px-4 font-semibold bg-gray-200 text-lg poppins">
                  Replacement parts
                </th>
                <th className="py-3 px-4 font-semibold bg-gray-200 text-lg poppins">
                  Timeline
                </th>
                <th className="py-3 px-4 font-semibold bg-gray-200 text-lg poppins">
                  Link to replacement parts
                </th>
                <th className="py-3 px-4 font-semibold bg-gray-200 text-lg poppins">
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              {purchaseData.map((purchase, index) =>
                purchase.replacements.map((item, idx) => (
                  <tr key={idx} className="border-t border-gray-200">
                    {idx === 0 && (
                      <td
                        rowSpan={purchase.replacements.length}
                        className="py-4 px-4 align-top font-medium text-gray-700 border-r border-b border-gray-300  border-gray-300"
                      >
                        {purchase.original}
                      </td>
                    )}
                    <td className="py-4 px-4 text-gray-700 border-b border-gray-300  poppins">
                      {item.part}
                    </td>
                    <td className="py-4 px-4 text-gray-700 border-b border-gray-300 poppins ">
                      {item.timeline}
                    </td>
                    <td className="py-4 px-4 text-blue-600 underline cursor-pointer border-b border-gray-300 poppins">
                      {item.link}
                    </td>
                    <td className="py-4 px-4 text-gray-700 border-b border-gray-300 poppins">
                      {item.price}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 flex justify-center items-center space-x-2">
        <button className="p-2 rounded text-gray-500 hover:bg-gray-200">
          &lt;
        </button>
        <button className="p-2 rounded bg-green-600 text-white">1</button>
        <button className="p-2 rounded text-gray-700 hover:bg-gray-200">
          2
        </button>
        <button className="p-2 rounded text-gray-700 hover:bg-gray-200">
          3
        </button>
        <span className="text-gray-400">...</span>
        <button className="p-2 rounded text-gray-700 hover:bg-gray-200">
          12
        </button>
        <button className="p-2 rounded text-gray-500 hover:bg-gray-200">
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Replacement;
