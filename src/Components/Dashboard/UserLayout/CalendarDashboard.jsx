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
import { useGetEventsQuery } from "../../../Redux/feature/auth/aithapi";

const CalendarDashboard = () => {
  const [date, setDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);
  const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState(false);

  const { data, error, isLoading } = useGetEventsQuery();

  if (isLoading) {
    return <div>Loading events...</div>;
  }

  if (error) {
    return <div>Error loading events</div>;
  }

  const events = data?.events || [];
  const now = new Date();

  const decoratedReminders = events
    .filter((event) => {
      const eventDate = new Date(event.end.date || event.end.dateTime);
      return eventDate >= now; // Past date বাদ
    })
    .map((event) => {
      const eventDate = new Date(event.end.date || event.end.dateTime);
      const diffTime = eventDate - now;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      let color = "green"; // default
      let icon = <FaBell />;

      if (diffDays <= 3) {
        color = "red";
        icon = <FaExclamationTriangle />;
      } else if (diffDays <= 7) {
        color = "yellow";
        icon = <FaTools />;
      } else {
        color = "green";
        icon = <FaBell />;
      }

      return {
        ...event,
        time:
          diffDays === 0
            ? "Today"
            : `In ${diffDays} day${diffDays > 1 ? "s" : ""}`,
        color,
        icon,
      };
    })
    .sort((a, b) => {
      const aDate = new Date(a.end.date || a.end.dateTime);
      const bDate = new Date(b.end.date || b.end.dateTime);
      return aDate - bDate; // earliest first
    });

  //  Updated tileContent
  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const formattedDate = date.toLocaleDateString("en-CA");
      const todayDate = new Date().toLocaleDateString("en-CA");

      const hasEvent = events.find((e) => {
        const eventDate = new Date(
          e.start.date || e.start.dateTime
        ).toLocaleDateString("en-CA");
        return eventDate === formattedDate;
      });

      if (hasEvent) {
        const eventDateObj = new Date(
          hasEvent.start.date || hasEvent.start.dateTime
        );
        const calendarDate = new Date(date);

        // Strip time for accurate comparison
        const eventTime = new Date(
          eventDateObj.getFullYear(),
          eventDateObj.getMonth(),
          eventDateObj.getDate()
        ).getTime();
        const currentTime = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate()
        ).getTime();

        let bgColor = "bg-green-500"; // default: future
        if (eventTime < currentTime) {
          bgColor = "bg-red-500"; // past
        } else if (eventTime === currentTime) {
          bgColor = "bg-yellow-500"; // today
        }

        return (
          <div
            className={`mt-1 text-[10px] rounded-full text-center text-white px-1 py-0.5 ${bgColor}`}
          >
            {hasEvent.summary}
          </div>
        );
      }

      return null;
    }
    return null;
  };

  const currentYear = new Date().getFullYear();
  const yearRange = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i);

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

  const handleYearSelect = (year) => {
    setDate(new Date(year, date.getMonth(), 1));
    setIsYearDropdownOpen(false);
  };

  const handleMonthSelect = (monthIndex) => {
    setDate(new Date(date.getFullYear(), monthIndex, 1));
    setIsMonthDropdownOpen(false);
  };

  return (
    <div className="p-6 font-sans text-gray-800">
      {/* Header */}
      <div className="flex flex-col justify-between mb-4 lg:items-center lg:flex-row">
        <div>
          <h1 className="text-2xl font-bold text-green-700">Welcome Oishe !</h1>
          <p className="mb-4 text-xs text-gray-600 sm:text-sm sm:mb-6 poppins">
            Track your warranties and all details
          </p>
        </div>
        <div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-3 py-1 text-green-700 bg-green-100 border border-green-300 rounded shadow"
          >
            <FaCalendarPlus /> Set Reminder
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 2xl:grid-cols-3">
        {/* Calendar */}
        <div className="border rounded-lg shadow md:col-span-2 calender">
          <div className="">
            {" "}
            {/* ✅ Fixed minimum width for scroll */}
            {/* Header */}
            <div className="flex flex-col items-center justify-between gap-4 p-2 bg-white sm:flex-row">
              <div></div>
              <div className="text-xl font-bold text-green-700 sm:text-2xl">
                {months[date.getMonth()]} {date.getFullYear()}
              </div>
              <div className="relative flex gap-2">
                {/* Year Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => {
                      setIsYearDropdownOpen(!isYearDropdownOpen);
                      setIsMonthDropdownOpen(false);
                    }}
                    className="flex flex-col items-center px-1 py-1 text-sm text-green-700 transition bg-green-100 border border-green-300 rounded shadow lg:gap-2 lg:text-base lg:px-3 hover:bg-green-200"
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

                {/* Month Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => {
                      setIsMonthDropdownOpen(!isMonthDropdownOpen);
                      setIsYearDropdownOpen(false);
                    }}
                    className="flex items-center gap-2 px-1 py-1 text-sm text-green-700 transition bg-green-100 border border-green-300 rounded shadow lg:text-base lg:px-3 hover:bg-green-200"
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
            {/* Calendar */}
            <div className="p-2 overflow-x-auto ">
              <Calendar
                className="w-full min-w-[800px]"
                onChange={setDate}
                value={date}
                tileContent={tileContent}
                showNavigation={false}
              />
            </div>
          </div>
        </div>

        {/* Reminders */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Upcoming Reminders</h3>
          <div className="pr-2 space-y-4 overflow-y-auto h-[440px] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
            {decoratedReminders.map((reminder, index) => (
              <div
                key={index}
                className={`p-3  bg-${reminder.color}-100 border-l-4 border-${reminder.color}-500 rounded`}
              >
                <div
                  className={`flex  items-center gap-2 text-${reminder.color}-700 font-semibold`}
                >
                  {reminder.icon} {reminder.title}
                </div>
                <p
                  className={`font-medium text-base text-${reminder.color}-800`}
                >
                  {reminder.description}
                </p>
                <p className={`text-sm text-${reminder.color}-600`}>
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
