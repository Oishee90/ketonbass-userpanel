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
  const events = [
    { date: new Date(2025, 5, 10), label: "Filter Change", type: "extend" },
    { date: new Date(2025, 5, 27), label: "TV warranty", type: "warranty" },
  ];

  // 🔥 Raw reminder data with dueDate
  const rawReminders = [
    {
      title: "TV Warranty Expires",
      description: 'Samsung 65" QLED',
      dueDate: new Date("2025-06-21"),
    },
    {
      title: "Car Maintenance",
      description: "Oil Change Due",
      dueDate: new Date("2025-06-25"), // 1 week
    },
    {
      title: "Filter Replacement",
      description: "Water Filter System",
      dueDate: new Date("2025-07-02"), // more than 1 week
    },
  ];

  //  Calculate time difference and decorate
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
      const event = events.find(
        (e) =>
          e.date.getFullYear() === date.getFullYear() &&
          e.date.getMonth() === date.getMonth() &&
          e.date.getDate() === date.getDate()
      );
      return event ? (
        <div
          className={`mt-1 text-xs rounded-full px-1 py-1 text-white mt-3cla ${
            event.type === "extend" ? "bg-red-500" : "bg-green-500"
          }`}
        >
          {event.label}
        </div>
      ) : null;
    }
    return null;
  };

  return (
    <div className="p-6 font-sans text-gray-800">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold text-green-700">Welcome Oishe !</h1>
          <p className="text-gray-600 text-xs sm:text-sm mb-4 sm:mb-6 poppins">
            Track your warranties and all details
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-green-100 text-green-700 border border-green-300 px-3 py-1 rounded shadow"
        >
          <FaCalendarPlus /> Set Reminder
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="md:col-span-2 border rounded-lg shadow calender">
          <Calendar
            className="w-full"
            onChange={setDate}
            value={date}
            tileContent={tileContent}
          />
        </div>

        {/* Reminders */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Upcoming Reminders</h3>
          <div className="max-h-82 overflow-y-auto space-y-4 pr-2">
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

      {/* Upcoming Events */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-red-50 border border-red-200 p-4 rounded shadow">
          <h4 className="text-md font-bold">
            Samsung QLED TV Warranty Expiration
          </h4>
          <p className="text-sm mt-1">
            Your Samsung QLED 65" 4K TV warranty is expiring in 13 days.
            Consider extending the warranty or purchasing a protection plan.
          </p>
          <button className="mt-2 text-sm text-white bg-red-500 px-3 py-1 rounded">
            Extend Warranty
          </button>
        </div>

        <div className="bg-blue-50 border border-blue-200 p-4 rounded shadow">
          <h4 className="text-md font-bold">
            Water Filter Purchase Anniversary
          </h4>
          <p className="text-sm mt-1">
            Your Samsung QLED 65" 4K TV warranty is expiring in 13 days.
            Consider extending the warranty or purchasing a protection plan.
          </p>
          <button className="mt-2 text-sm text-white bg-blue-500 px-3 py-1 rounded">
            Extend Warranty
          </button>
        </div>
      </div> */}
      <SetReminders
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default CalendarDashboard;
