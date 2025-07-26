/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import React from "react";
import { useGetReceiptDetailsQuery } from "../../../Redux/feature/auth/aithapi";

const ReceiptModal = ({ isOpen, onClose, orderId }) => {
  const {
    data: receipt,
    isLoading,
    isError,
  } = useGetReceiptDetailsQuery(orderId, {
    skip: !isOpen || !orderId,
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black bg-opacity-40">
      <div className="relative w-full max-w-md overflow-hidden bg-white rounded-lg shadow-xl">
        {/* Close Button */}
        <button
          className="absolute text-2xl text-white hover:text-gray-800 top-4 right-4"
          onClick={onClose}
        >
          &times;
        </button>

        {isLoading ? (
          <div className="p-6 text-center text-gray-500">Loading...</div>
        ) : isError ? (
          <div className="p-6 text-center text-red-500">
            Failed to load details
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="py-4 text-center text-white bg-green-600">
              <h1 className="text-xl font-bold tracking-wide uppercase">
                Payment Receipt
              </h1>
            </div>

            {/* Body */}
            <div className="p-6 space-y-4 text-gray-700">
              {/* Highlighted Order & Amount */}
              <div className="flex justify-between pb-2 border-b">
                <span className="font-semibold">Order ID:</span>
                <span className="font-mono">{receipt.order_id}</span>
              </div>
              <div className="flex justify-between pb-2 text-lg font-bold text-green-700 border-b">
                <span>Total Amount:</span>
                <span>৳ {receipt.price}</span>
              </div>

              {/* Details */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="font-semibold">Product:</span>
                  <span>{receipt.product_name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Purchase Date:</span>
                  <span>{receipt.purchase_date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Warranty:</span>
                  <span>{receipt.warranty_status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Warranty Expire:</span>
                  <span>{receipt.warranty_expire_date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Status:</span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      receipt.status === "success"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {receipt.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="py-3 text-xs text-center text-gray-500 bg-gray-100">
              Thank you for your purchase!
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ReceiptModal;
