/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const CalenderPopup = ({
  calendarDate,
  months,
  yearRange,
  onClose,
  onDateSelect,
  isYearDropdownOpen,
  isMonthDropdownOpen,
  setIsYearDropdownOpen,
  setIsMonthDropdownOpen,
  handleYearSelect,
  handleMonthSelect,
}) => {
  const popupRef = useRef(null);

  // Detect outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20">
      <div
        ref={popupRef}
        className="relative w-full max-w-xs p-4 bg-white rounded-lg shadow-lg top-[25%] left-[16%]"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-2">
          <div className="mx-auto text-2xl font-bold text-green-700">
            {months[calendarDate.getMonth()]} {calendarDate.getFullYear()}
          </div>
        </div>

        {/* Dropdowns */}
        <div className="flex justify-center gap-4 mb-2">
          {/* Year */}
          <div className="relative">
            <button
              onClick={() => {
                setIsYearDropdownOpen(!isYearDropdownOpen);
                setIsMonthDropdownOpen(false);
              }}
              className="px-3 py-1 text-green-700 bg-green-100 border border-green-300 rounded shadow hover:bg-green-200"
            >
              Select Year ▼
            </button>
            {isYearDropdownOpen && (
              <div className="absolute z-10 w-32 mt-2 overflow-y-auto bg-white border border-gray-300 rounded shadow max-h-60">
                {yearRange.map((year) => (
                  <button
                    key={year}
                    onClick={() => handleYearSelect(year)}
                    className="w-full px-4 py-2 text-left text-gray-800 hover:bg-green-100"
                  >
                    {year}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Month */}
          <div className="relative">
            <button
              onClick={() => {
                setIsMonthDropdownOpen(!isMonthDropdownOpen);
                setIsYearDropdownOpen(false);
              }}
              className="px-3 py-1 text-green-700 bg-green-100 border border-green-300 rounded shadow hover:bg-green-200"
            >
              Select Month ▼
            </button>
            {isMonthDropdownOpen && (
              <div className="absolute z-10 w-40 mt-2 overflow-y-auto bg-white border border-gray-300 rounded shadow max-h-60">
                {months.map((month, index) => (
                  <button
                    key={month}
                    onClick={() => handleMonthSelect(index)}
                    className="w-full px-4 py-2 text-left text-gray-800 hover:bg-green-100"
                  >
                    {month}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Calendar */}
        <Calendar
          className="w-full calender"
          onChange={onDateSelect}
          value={calendarDate}
          showNavigation={false}
        />
      </div>
    </div>
  );
};

export default CalenderPopup;
