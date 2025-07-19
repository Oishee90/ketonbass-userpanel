import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  FaBell,
  FaTools,
  FaExclamationTriangle,
  FaCalendarPlus,
} from "react-icons/fa";
import "tailwindcss/tailwind.css";
import SetReminders from "./SetReminders";

const CalendarDashboard = () => {
  const [date, setDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);
  const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState(false);

  // Sample events
  const events = [
    { date: new Date(2025, 5, 10), label: "Filter Change", type: "extend" },
    { date: new Date(2025, 5, 27), label: "TV warranty", type: "warranty" },
  ];

  // Raw reminder data with dueDate
  const rawReminders = [
    {
      title: "TV Warranty Expires",
      description: 'Samsung 65" QLED',
      dueDate: new Date("2025-06-21"),
    },
    {
      title: "Car Maintenance",
      description: "Oil Change Due",
      dueDate: new Date("2025-06-25"),
    },
    {
      title: "Filter Replacement",
      description: "Water Filter System",
      dueDate: new Date("2025-07-02"),
    },
  ];

  // Calculate time difference and decorate reminders
  const now = new Date();
  const decoratedReminders = rawReminders
    .map((reminder) => {
      const diffTime = reminder.dueDate - now;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      let color = "blue";
      let icon = <FaBell />;

      if (diffDays <= 3) {
        color = "red";
        icon = <FaExclamationTriangle />;
      } else if (diffDays <= 7) {
        color = "yellow";
        icon = <FaTools />;
      }

      return {
        ...reminder,
        time: `In ${diffDays} day${diffDays > 1 ? "s" : ""}`,
        color,
        icon,
      };
    })
    .sort((a, b) => {
      const aDays = parseInt(a.time.split(" ")[1]);
      const bDays = parseInt(b.time.split(" ")[1]);
      return aDays - bDays;
    });

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const formattedDate = date.toISOString().split("T")[0]; // 'YYYY-MM-DD'
      const hasEvent = events.find((e) => {
        const eventDate = e.date.toISOString().split("T")[0];
        return eventDate === formattedDate;
      });

      return hasEvent ? (
        <div
          className={`mt-1 text-[10px] rounded-full text-center text-white px-1 py-0.5 ${
            hasEvent.type === "extend" ? "bg-red-500" : "bg-green-500"
          }`}
        >
          {hasEvent.label}
        </div>
      ) : null;
    }
    return null;
  };

  // Generate a range of years for the dropdown (±5 years from current year)
  const currentYear = new Date().getFullYear();
  const yearRange = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i);

  // List of months
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

  // Handle year selection
  const handleYearSelect = (year) => {
    setDate(new Date(year, date.getMonth(), 1)); // Preserve current month
    setIsYearDropdownOpen(false); // Close year dropdown
  };

  // Handle month selection
  const handleMonthSelect = (monthIndex) => {
    setDate(new Date(date.getFullYear(), monthIndex, 1)); // Set to first day of selected month
    setIsMonthDropdownOpen(false); // Close month dropdown
  };

  return (
    <div className="p-6 font-sans text-gray-800">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-green-700">Welcome Oishe !</h1>
          <p className="mb-4 text-xs text-gray-600 sm:text-sm sm:mb-6 poppins">
            Track your warranties and all details
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-3 py-1 text-green-700 bg-green-100 border border-green-300 rounded shadow"
        >
          <FaCalendarPlus /> Set Reminder
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Calendar */}
        <div className="border rounded-lg shadow md:col-span-2 calender">
          {/* Custom Header with Select Year and Month Buttons */}
          <div className="flex items-center justify-between p-2 bg-white ">
            <div></div>
            <div className="text-2xl font-bold text-green-700">
              {months[date.getMonth()]} {date.getFullYear()}
            </div>
            <div className="relative flex gap-2">
              {/* Select Year Button */}
              <div className="relative">
                <button
                  onClick={() => {
                    setIsYearDropdownOpen(!isYearDropdownOpen);
                    setIsMonthDropdownOpen(false); // Close month dropdown if open
                  }}
                  className="flex items-center gap-2 px-3 py-1 text-green-700 transition bg-green-100 border border-green-300 rounded shadow hover:bg-green-200"
                >
                  Select Year ▼
                </button>
                {isYearDropdownOpen && (
                  <div className="absolute right-0 z-10 w-32 overflow-y-auto bg-white border border-gray-300 rounded shadow-lg top-10 max-h-60">
                    {yearRange.map((year) => (
                      <button
                        key={year}
                        onClick={() => handleYearSelect(year)}
                        className="block w-full px-4 py-2 text-left text-gray-800 hover:bg-green-100"
                      >
                        {year}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {/* Select Month Button */}
              <div className="relative">
                <button
                  onClick={() => {
                    setIsMonthDropdownOpen(!isMonthDropdownOpen);
                    setIsYearDropdownOpen(false); // Close year dropdown if open
                  }}
                  className="flex items-center gap-2 px-3 py-1 text-green-700 transition bg-green-100 border border-green-300 rounded shadow hover:bg-green-200"
                >
                  Select Month ▼
                </button>
                {isMonthDropdownOpen && (
                  <div className="absolute right-0 z-10 w-40 overflow-y-auto bg-white border border-gray-300 rounded shadow-lg top-10 max-h-60">
                    {months.map((month, index) => (
                      <button
                        key={month}
                        onClick={() => handleMonthSelect(index)}
                        className="block w-full px-4 py-2 text-left text-gray-800 hover:bg-green-100"
                      >
                        {month}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <Calendar
            className="w-full"
            onChange={setDate}
            value={date}
            tileContent={tileContent}
            showNavigation={false} // Disable default navigation
          />
        </div>

        {/* Reminders */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Upcoming Reminders</h3>
          <div className="pr-2 space-y-4 overflow-y-auto max-h-82">
            {decoratedReminders.map((reminder, index) => (
              <div
                key={index}
                className={`bg-${reminder.color}-100 border border-${reminder.color}-300 p-3 rounded`}
              >
                <div
                  className={`flex items-center gap-2 text-${reminder.color}-700 font-semibold`}
                >
                  {reminder.icon} {reminder.title}
                </div>
                <p className="text-sm">{reminder.description}</p>
                <p className={`text-xs text-${reminder.color}-600`}>
                  {reminder.time}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <SetReminders
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default CalendarDashboard;
