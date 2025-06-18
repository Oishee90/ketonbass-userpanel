import React from "react";

const ReceiptModal = ({ isOpen, onClose, receipt }) => {
  if (!isOpen || !receipt) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 px-4">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 relative">
        {/* Close Button */}
        <button
          className="absolute top-3 right-4 text-gray-500 hover:text-black text-2xl"
          onClick={onClose}
        >
          &times;
        </button>

        {/* Content */}
        <h2 className="text-xl font-bold text-gray-800 mb-4 poppins text-center">
          Receipt Details
        </h2>
        <div className="space-y-2 text-sm text-gray-700 poppins">
          <p>
            <strong>Category:</strong> {receipt.category}
          </p>
          <p>
            <strong>Name:</strong> {receipt.name}
          </p>
          <p>
            <strong>Amount:</strong> {receipt.amount}
          </p>
          <p>
            <strong>Date:</strong> {receipt.date}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span
              className={`inline-block px-2 py-1 rounded-full text-xs ${
                receipt.status === "Verified"
                  ? "text-green-600 bg-green-100"
                  : "text-yellow-700 bg-yellow-100"
              }`}
            >
              {receipt.status}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReceiptModal;
