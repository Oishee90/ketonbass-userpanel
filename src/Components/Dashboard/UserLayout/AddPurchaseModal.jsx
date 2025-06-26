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
  const [pdfFile, setPdfFile] = useState(null);
  const [errors, setErrors] = useState({
    productName: "",
    date: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  if (!isOpen) return null;
  const handleFileChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { productName, date } = formData;

    let newErrors = {};
    if (!productName.trim()) {
      newErrors.productName = "Product name must be requiered";
    }
    if (!date.trim()) {
      newErrors.date = "Date must be requiered";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({ productName: "", date: "" });

    Swal.fire({
      icon: "success",
      title: "Success!",
      text: "Purchase added successfully!",
    });

    setFormData({
      productName: "",
      storeName: "",
      date: "",
      amount: "",
      warranty: "",
    });
    setPdfFile(null);
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

        <form className="" onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-3 py-2"
              placeholder="Product name*"
            />
            {errors.productName && (
              <p className="text-red-600 text-sm mt-1 ">{errors.productName}</p>
            )}
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="storeName"
              value={formData.storeName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-3 py-2"
              placeholder="Store name"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-3 py-2"
              placeholder="Date*"
            />
            {errors.date && (
              <p className="text-red-600 text-sm mt-1 ">{errors.date}</p>
            )}
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-3 py-2"
              placeholder="Amount"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="warranty"
              value={formData.warranty}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-3 py-2"
              placeholder="Warranty"
            />
          </div>
          <div className="mt-4 mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Upload PDF (optional)
            </label>

            <div className="flex items-center gap-3 ">
              <label className="cursor-pointer inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                Browse File
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
              {pdfFile && (
                <div className=" flex items-center justify-between bg-gray-100 px-4 py-2 rounded">
                  <span className="text-sm text-gray-700">{pdfFile.name}</span>
                  <button
                    type="button"
                    onClick={() => setPdfFile(null)}
                    className="text-red-500 hover:text-red-700 text-lg font-bold"
                    title="Remove file"
                  >
                    &times;
                  </button>
                </div>
              )}
            </div>
          </div>

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
