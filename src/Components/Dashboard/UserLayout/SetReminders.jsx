import React, { useState } from "react";
import Swal from "sweetalert2";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import CalenderPopup from "../CalenderPopup";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCreateEventMutation, useGetEventsQuery } from "../../../Redux/feature/auth/aithapi";
const SetReminders = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    productName: "",
    date: "",
    title: "", // <-- Custom title
  });
  const productOptions = [
    "Apple Watch",
    "MacBook Pro",
    "iPhone 14",
    "AirPods Pro",
    "iPad Air",
  ];

  const [pdfFile, setPdfFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);
  const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState(false);

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
  const [createEvent, { isLoading }] = useCreateEventMutation();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
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
    const formattedDate = selectedDate.toLocaleDateString("en-CA"); // Local timezone
    setFormData((prev) => ({ ...prev, date: formattedDate }));
    setErrors((prev) => ({ ...prev, date: "" }));
    setIsCalendarOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { productName, date } = formData;
    const newErrors = {};

    if (!productName.trim()) newErrors.productName = "Product name is required";
    if (!date.trim()) newErrors.date = "Date is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const payload = {
        product_name: productName,
        event_date: date,
      };

      const response = await createEvent(payload).unwrap();
      console.log("API Response:", response);

      toast.success("Reminder added successfully!");
      
      setFormData({ productName: "", date: "" });
      setPdfFile(null);

      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (error) {
      console.error("Error creating event:", error);
      toast.error("Failed to add reminder!");
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-lg relative">
          <button
            className="absolute text-xl text-gray-600 top-2 right-2 hover:text-black"
            onClick={onClose}
          >
            &times;
          </button>
          <h2 className="mb-6 text-2xl font-semibold text-center main-color poppins">
            Set Reminders
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
                placeholder="Product name*"
              />
              {errors.productName && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.productName}
                </p>
              )}
            </div>
            {/* <div className="relative mb-4">
              <div
                onClick={() => setDropdownOpen((prev) => !prev)}
                className={`w-full px-4 py-2 bg-white border ${
                  errors.productName ? "border-red-500" : "border-gray-300"
                } rounded-xl text-gray-800 cursor-pointer flex justify-between items-center`}
              >
                <span className={formData.productName ? "" : "text-gray-400"}>
                  {formData.productName || "-- Choose a product --"}
                </span>
                <FaChevronDown className="ml-2 text-gray-500" />
              </div>

              {dropdownOpen && (
                <ul className="absolute z-10 w-full mt-1 overflow-y-auto bg-white border border-gray-300 shadow rounded-xl max-h-52">
                  {productOptions.map((product) => (
                    <li
                      key={product}
                      onClick={() => handleSelect(product)}
                      className="px-4 py-2 text-sm text-gray-800 cursor-pointer hover:bg-green-100"
                    >
                      {product}
                    </li>
                  ))}
                </ul>
              )}

              {errors.productName && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.productName}
                </p>
              )}
            </div> */}

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

            {/* Submit Button */}
            <div className="w-1/2 mx-auto mb-4">
              <button
                type="submit"
                className="w-full py-2 text-white bg-green-600 rounded-2xl hover:bg-green-700"
              >
                Add
              </button>
            </div>
          </form>
        </div>
        <ToastContainer position="top-center" autoClose={3000} />
      </div>
    )
  );
};

export default SetReminders;
