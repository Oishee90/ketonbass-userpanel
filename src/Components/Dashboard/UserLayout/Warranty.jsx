import React from 'react';
import { FaRegFileAlt } from 'react-icons/fa';

const warrantyData = [
  {
    id: 1,
    productName: 'Apple Watch',
    purchaseDate: '1 June, 2025',
    warrantyDate: '1 June, 2027',
    documents: 2,
    status: 'Active',
  },
  {
    id: 2,
    productName: 'Mac Book Pro',
    purchaseDate: '1 June, 2025',
    warrantyDate: '1 June, 2027',
    documents: 1,
    status: 'Expired',
  },
  {
    id: 3,
    productName: 'Apple Watch',
    purchaseDate: '1 June, 2025',
    warrantyDate: '1 June, 2027',
    documents: 3,
    status: 'Soon',
  },
];

const Warranty = () => {
    return (
       <div className="bg-[#f9f9f9] min-h-screen p-6 font-sans">
      <h1 className="text-2xl font-bold text-green-800 mb-1">Welcome Susan !</h1>
      <p className="text-gray-600 text-sm mb-6">Track your warranties and all details</p>

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-600 text-sm">
                <th className="py-2 px-4">Product Name</th>
                <th className="py-2 px-4">Purchase Date</th>
                <th className="py-2 px-4">Warranty Date</th>
                <th className="py-2 px-4">Documents</th>
                <th className="py-2 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {warrantyData.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4 text-sm text-gray-800">{item.productName}</td>
                  <td className="py-2 px-4 text-sm text-gray-800">{item.purchaseDate}</td>
                  <td className="py-2 px-4 text-sm text-gray-800">{item.warrantyDate}</td>
                  <td className="py-2 px-4 text-sm text-gray-800 flex items-center gap-1">
                    <FaRegFileAlt className="text-gray-600" /> {item.documents}
                  </td>
                  <td className="py-2 px-4">
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
                        item.status === 'Active'
                          ? 'bg-green-100 text-green-700'
                          : item.status === 'Expired'
                          ? 'bg-orange-100 text-orange-700'
                          : 'bg-yellow-100 text-yellow-700'
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
              <button className="px-3 py-1 rounded hover:bg-gray-200">&lt;</button>
            </li>
            {[1, 2, 3].map((num) => (
              <li key={num}>
                <button
                  className={`px-3 py-1 rounded ${
                    num === 1 ? 'bg-green-800 text-white' : 'hover:bg-gray-200'
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
              <button className="px-3 py-1 rounded hover:bg-gray-200">12</button>
            </li>
            <li>
              <button className="px-3 py-1 rounded hover:bg-gray-200">&gt;</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
    );
}

export default Warranty;
