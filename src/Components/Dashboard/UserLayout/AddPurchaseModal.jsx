import React from "react";

const AddPurchaseModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-lg relative">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold mb-6 main-color text-center poppins">
          Manual Purchase
        </h2>
        {/* Form Input Fields */}
        <form className="space-y-4">
          <div className="flex justify-center items-center w-full ">
            <input
              type="text"
              className="w-full border border-gray-300 rounded-xl  px-3 py-2"
              placeholder="Product name*  "
            />
          </div>
          <div className="flex justify-center items-center w-full ">
            <input
              type="text"
              className="w-full border border-gray-300 rounded-xl   px-3 py-2"
              placeholder="Store name*"
            />
          </div>
          <div className="flex justify-center items-center w-full ">
            <input
              type="text"
              className="w-full border border-gray-300 rounded-xl  px-3 py-2  "
              placeholder="Date*"
            />
          </div>
          <div className="flex justify-center items-center w-full ">
            <input
              type="text"
              className="w-full border border-gray-300 rounded-xl  px-3 py-2"
              placeholder="Amount*"
            />
          </div>
          <div className="flex justify-center items-center w-full ">
            <input
              type="text"
              className="w-full border border-gray-300 rounded-xl px-3 py-2"
              placeholder="Warranty*"
            />
          </div>
          <div className="w-full ">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded w-full hover:bg-green-700 w-1/2 mx-auto flex justify-center"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPurchaseModal;
