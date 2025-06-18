import React, { useState } from "react";
import Swal from "sweetalert2";

const AddPurchaseModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    productName: "",
    storeName: "",
    date: "",
    amount: "",
    warranty: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { productName, storeName, date, amount, warranty } = formData;

    if (!productName || !storeName || !date || !amount || !warranty) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill in all required fields!",
      });
      return;
    }

    // Submit logic here (API call, state update, etc.)
    Swal.fire({
      icon: "success",
      title: "Success!",
      text: "Purchase added successfully!",
    });

    // Reset form and close modal
    setFormData({
      productName: "",
      storeName: "",
      date: "",
      amount: "",
      warranty: "",
    });
    onClose();
  };

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

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-3 py-2"
            placeholder="Product name*"
          />
          <input
            type="text"
            name="storeName"
            value={formData.storeName}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-3 py-2"
            placeholder="Store name*"
          />
          <input
            type="text"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-3 py-2"
            placeholder="Date*"
          />
          <input
            type="text"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-3 py-2"
            placeholder="Amount*"
          />
          <input
            type="text"
            name="warranty"
            value={formData.warranty}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-3 py-2"
            placeholder="Warranty*"
          />

          <div>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded w-full hover:bg-green-700"
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
