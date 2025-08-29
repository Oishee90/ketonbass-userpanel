/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import CalenderPopup from "../CalenderPopup";
import {
  useGetPurchaseQuery,
  useUpdateOrderMutation,
} from "../../../Redux/feature/auth/aithapi";

const EditPurchase = ({ isOpen, onClose, data }) => {
  const [updateOrder, { isLoading }] = useUpdateOrderMutation();
  console.log("data", data);
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
  const [isWarrantyCalendarOpen, setIsWarrantyCalendarOpen] = useState(false);
  const [warrantycalendarDate, setWarrantyCalendarDate] = useState(new Date());

  const { data: purchase, refetch } = useGetPurchaseQuery();
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

  //  Populate current values from API data
  useEffect(() => {
    if (data) {
      console.log(data);
      setFormData({
        productName: data.product_name || "",
        storeName: data.shop_name || "",
        date: data.purchase_date || "",
        amount: data.price || "",
        warranty: data.warranty_expire_date || "",
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
    setIsCalendarOpen(false);
  };
  const handleWarrantyDateSelect = (selectedDate) => {
    const date = new Date(selectedDate);
    // Format to YYYY-MM-DD using local date components
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const dateString = `${year}-${month}-${day}`;

    setFormData((prev) => ({ ...prev, warranty: dateString }));

    setIsWarrantyCalendarOpen(false);
  };
  const handleWarrantyMonthSelect = (monthIndex) => {
    setWarrantyCalendarDate(
      new Date(warrantycalendarDate.getFullYear(), monthIndex, 1)
    );
    setIsMonthDropdownOpen(false);
  };
  const handleWarrantyYearSelect = (year) => {
    setWarrantyCalendarDate(new Date(year, warrantycalendarDate.getMonth(), 1));
    setIsYearDropdownOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = new FormData();
      payload.append("product_name", formData.productName);
      payload.append("shop_name", formData.storeName);
      payload.append("purchase_date", formData.date);
      payload.append("price", formData.amount);
      payload.append("warranty_expire_date", formData.warranty);
      if (pdfFile) {
        payload.append("invoice_pdf", pdfFile);
      }

      await updateOrder({ orderId: data.order_id, formData: payload }).unwrap();

      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Purchase details updated successfully.",
      });

      onClose();
      refetch();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error?.data?.message || "Failed to update order.",
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
          Edit Purchase
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Product Name */}
          <div className="mb-4">
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl"
              placeholder="Product name"
            />
          </div>

          {/* Store Name */}
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

          {/* Amount */}
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

          {/* Date */}
          <div className="relative mb-4">
            <input
              type="text"
              name="date"
              value={formData.date}
              onClick={() => setIsCalendarOpen(true)}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-300"
              placeholder="Date"
              readOnly
            />

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

          {/* Warranty */}
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

          {/* PDF Upload */}
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

          {/* Submit */}
          <div className="justify-center w-1/2 mx-auto mt-6">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-4 py-2 text-white bg-green-600 rounded-2xl hover:bg-green-700"
            >
              {isLoading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPurchase;
