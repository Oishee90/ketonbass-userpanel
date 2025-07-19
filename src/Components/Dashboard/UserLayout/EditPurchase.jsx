/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import CalenderPopup from "../CalenderPopup";

const EditPurchase = ({ isOpen, onClose, data }) => {
  const [formData, setFormData] = useState({
    productName: "",
    storeName: "",
    date: "",
    amount: "",
    warranty: "",
  });

  const [pdfFile, setPdfFile] = useState(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);
  const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState(false);
  const [errors, setErrors] = useState({ productName: "", date: "" });

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const currentYear = new Date().getFullYear();
  const yearRange = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i);

  // Populate form with data when modal opens
  useEffect(() => {
    if (data) {
      setFormData({
        productName: data.productName || "",
        storeName: data.storeName || "",
        date: data.dateTime?.split(" - ")[0] || "",
        amount: data.amount || "",
        warranty: data.warranty || "",
      });
    }
  }, [data]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  const handleYearSelect = (year) => {
    setCalendarDate(new Date(year, calendarDate.getMonth(), 1));
    setIsYearDropdownOpen(false);
  };

  const handleMonthSelect = (monthIndex) => {
    setCalendarDate(new Date(calendarDate.getFullYear(), monthIndex, 1));
    setIsMonthDropdownOpen(false);
  };

  const handleDateSelect = (selectedDate) => {
    const formattedDate = selectedDate.toISOString().split("T")[0];
    setFormData((prev) => ({ ...prev, date: formattedDate }));
    setErrors((prev) => ({ ...prev, date: "" }));
    setIsCalendarOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { productName, date } = formData;

    let newErrors = {};
    if (!productName.trim()) newErrors.productName = "Product name is required";
    if (!date.trim()) newErrors.date = "Date is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({ productName: "", date: "" });

    // Show success message (actual update logic can be added later)
    Swal.fire({
      icon: "success",
      title: "Success!",
      text: "Purchase updated successfully!",
    });

    // Optionally clear the form and close modal
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-lg relative">
        <button
          className="absolute text-xl text-gray-600 top-2 right-2 hover:text-black"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="mb-6 text-2xl font-semibold text-center main-color poppins">
          Edit Purchase
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl"
              placeholder="Product name*"
            />
            {errors.productName && (
              <p className="mt-1 text-sm text-red-600">{errors.productName}</p>
            )}
          </div>

          <div className="mb-4">
            <input
              type="text"
              name="storeName"
              value={formData.storeName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl"
              placeholder="Store name"
            />
          </div>

          <div className="mb-4">
            <input
              type="text"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl"
              placeholder="Amount"
            />
          </div>

          <div className="relative mb-4">
            <input
              type="text"
              name="date"
              value={formData.date}
              onClick={() => setIsCalendarOpen(true)}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-300"
              placeholder="Date*"
              readOnly
            />
            {errors.date && (
              <p className="mt-1 text-sm text-red-500">{errors.date}</p>
            )}

            {isCalendarOpen && (
              <CalenderPopup
                calendarDate={calendarDate}
                setCalendarDate={setCalendarDate}
                months={months}
                yearRange={yearRange}
                onClose={() => setIsCalendarOpen(false)}
                onDateSelect={handleDateSelect}
                isYearDropdownOpen={isYearDropdownOpen}
                isMonthDropdownOpen={isMonthDropdownOpen}
                setIsYearDropdownOpen={setIsYearDropdownOpen}
                setIsMonthDropdownOpen={setIsMonthDropdownOpen}
                handleYearSelect={handleYearSelect}
                handleMonthSelect={handleMonthSelect}
              />
            )}
          </div>

          <div className="mb-4">
            <input
              type="text"
              name="warranty"
              value={formData.warranty}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl"
              placeholder="Warranty"
            />
          </div>

          <div className="mt-4 mb-4">
            <label className="block mb-3 text-sm font-medium text-gray-700">
              Upload PDF (optional)
            </label>

            <div className="flex items-center gap-3 bg-gray-100 border border-gray-300 rounded-lg">
              <label className="inline-block p-2 text-white bg-green-600 cursor-pointer rounded-l-md">
                Browse File
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
              {pdfFile && (
                <div className="flex items-center justify-between px-4 bg-gray-100 rounded">
                  <span className="text-sm text-gray-700">{pdfFile.name}</span>
                  <button
                    type="button"
                    onClick={() => setPdfFile(null)}
                    className="text-lg font-bold text-red-500 hover:text-red-700"
                    title="Remove file"
                  >
                    &times;
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="justify-center w-1/2 mx-auto mt-6">
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-green-600 rounded-2xl hover:bg-green-700"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPurchase;
