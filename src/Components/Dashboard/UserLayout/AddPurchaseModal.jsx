import React, { useState } from "react";
import Swal from "sweetalert2";
import CalenderPopup from "../CalenderPopup";
import { useCreatePurchaseMutation } from "../../../Redux/feature/auth/aithapi";

const AddPurchaseModal = ({ isOpen, onClose }) => {
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
  const [isWarrantyCalendarOpen, setIsWarrantyCalendarOpen] = useState(false);
  const [warrantycalendarDate, setWarrantyCalendarDate] = useState(new Date());
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);
  const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState(false);
  const [createPackage, { isLoading, error }] = useCreatePurchaseMutation();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentYear = new Date().getFullYear();
  const yearRange = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i);
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

  const handleYearSelect = (year) => {
    setCalendarDate(new Date(year, calendarDate.getMonth(), 1));
    setIsYearDropdownOpen(false);
  };

  const handleWarrantyYearSelect = (year) => {
    setWarrantyCalendarDate(new Date(year, warrantycalendarDate.getMonth(), 1));
    setIsYearDropdownOpen(false);
  };

  const handleMonthSelect = (monthIndex) => {
    setCalendarDate(new Date(calendarDate.getFullYear(), monthIndex, 1));
    setIsMonthDropdownOpen(false);
  };

  const handleWarrantyMonthSelect = (monthIndex) => {
    setWarrantyCalendarDate(
      new Date(warrantycalendarDate.getFullYear(), monthIndex, 1)
    );
    setIsMonthDropdownOpen(false);
  };
  const handleDateSelect = (selectedDate) => {
    const date = new Date(selectedDate);
    // Format to YYYY-MM-DD using local date components
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(date.getDate()).padStart(2, "0");
    const dateString = `${year}-${month}-${day}`;

    setFormData((prev) => ({ ...prev, date: dateString }));
    setErrors((prev) => ({ ...prev, date: "" }));
    setIsCalendarOpen(false);
    setIsWarrantyCalendarOpen(false);
  };

  const handleWarrantyDateSelect = (selectedDate) => {
    const date = new Date(selectedDate);
    // Format to YYYY-MM-DD using local date components
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const dateString = `${year}-${month}-${day}`;

    setFormData((prev) => ({ ...prev, warranty: dateString }));
    setErrors((prev) => ({ ...prev, warranty: "" }));
    setIsWarrantyCalendarOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { productName, date } = formData;

    let newErrors = {};
    if (!productName.trim()) {
      newErrors.productName = "Product name is required";
    }
    if (!date.trim()) {
      newErrors.date = "Date is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({ productName: "", date: "" });

    // Prepare data to be sent to the API
    const newPackage = {
      product_name: formData.productName,
      purchase_date: formData.date,

    };

    try {
      // Call the mutation to create the package
      const response = await createPackage(newPackage).unwrap();

      // Log the response from the API
      console.log("Success:", response);

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Purchase added successfully!",
      });

      // Reset form
      setFormData({
        productName: "",
        storeName: "",
        date: "",
        amount: "",
        warranty: "",
      });
      setPdfFile(null);
      onClose();
    } catch (err) {
      // Log error if any
      console.error("Error:", err);

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Something went wrong: ${err.message}`,
      });
    }
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
          Manual Purchase
        </h2>

        <form className="" onSubmit={handleSubmit}>
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
              <p className="mt-1 text-sm text-red-600 ">{errors.productName}</p>
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
          {/* Date Input */}
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

            {/* Calendar Popup */}
            <div>
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
          </div>

          {/* Warranty Input */}
          <div className="relative mb-4">
            <input
              type="text"
              name="warranty"
              value={formData.warranty}
              placeholder="Warranty Date"
              onClick={() => setIsWarrantyCalendarOpen(true)}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl"
            />
            {isWarrantyCalendarOpen && (
              <CalenderPopup
                calendarDate={warrantycalendarDate}
                setCalendarDate={setWarrantyCalendarDate}
                months={months}
                yearRange={yearRange}
                onClose={() => setIsWarrantyCalendarOpen(false)}
                onDateSelect={handleWarrantyDateSelect}
                isYearDropdownOpen={isYearDropdownOpen}
                isMonthDropdownOpen={isMonthDropdownOpen}
                setIsYearDropdownOpen={setIsYearDropdownOpen}
                setIsMonthDropdownOpen={setIsMonthDropdownOpen}
                handleYearSelect={handleWarrantyYearSelect}
                handleMonthSelect={handleWarrantyMonthSelect}
              />
            )}
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
                <div className="flex items-center justify-between px-4 bg-gray-100 rounded ">
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
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPurchaseModal;
