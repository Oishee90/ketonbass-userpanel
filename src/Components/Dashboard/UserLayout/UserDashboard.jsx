import React from "react";
import { FaPlus, FaSync, FaUpload } from "react-icons/fa";
import { recentPurchases, upcomingReminders } from "../../../fakeData";
const statsData = [
  {
    title: "Total Purchases",
    value: "$89,000",
    description: "+12% from last month",
    valueColor: "text-green-700",
    descColor: "text-green-500",
  },
  {
    title: "Active Warranties",
    value: "9",
    description: "3 expiring soon",
    valueColor: "text-green-700",
    descColor: "text-orange-500",
  },
  {
    title: "Upcoming Reminders",
    value: "7",
    description: "Next in 2 days",
    valueColor: "text-green-700",
    descColor: "text-blue-500",
  },
  {
    title: "Total Value",
    value: "$89,000",
    description: "Protected by warranty",
    valueColor: "text-green-700",
    descColor: "text-gray-500",
  },
];

const UserDashboard = () => {
  return (
    <div className="bg-[#f9f9f9] min-h-screen p-6 font-sans">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-bold  main-color poppins mb-1">
            Dashboard Overview
          </h1>
          <p className="poppins text-base font-normal tittle-color">
            Track your purchases, warranties, and upcoming reminders
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {statsData.map((item, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow">
            <p className="text-sbase tittle-color font-medium mb-1 ">
              {item.title}
            </p>
            <h2
              className={`text-2xl font-bold tittle-color mb-1 ${item.valueColor}`}
            >
              {item.value}
            </h2>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="!mt-12 !mb-10">
        <h1 className="text-xl font-semibold  main-color poppins mb-1">
          Quick Actions
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 !mb-10">
        <button className="flex items-center gap-2 bg-blue-100 text-[#111827] px-4 py-3 rounded-lg poppins text-base font-medium">
          <FaPlus /> Add New Purchase
        </button>
        <button className="flex items-center gap-2 bg-orange-100 text-[#111827] px-4 py-3 rounded-lg poppins text-base font-medium">
          <FaSync className="text-[#EA580C]" /> Sync Email
        </button>
        <button className="flex items-center gap-2 bg-green-100 text-[#111827] px-4 py-3 rounded-lg poppins text-base font-medium">
          <FaUpload className="text-[#16A34A]" /> Upload Receipt
        </button>
      </div>

      {/* Recent Purchases & Reminders */}
      <div className="grid grid-cols-1 lg:grid-cols-2  gap-6">
        {/* Recent Purchases */}
        <div className="md:col-span-2 bg-white  rounded-lg shadow border border-[#E5E7EB] ">
          <div className="flex md:flex-row flex-col justify-between items-center mb-4  border border-b-[#E5E7EB] p-4">
            <h2 className="text-lg font-semibold main-color poppins ">
              Recent Purchases
            </h2>
            <a
              href="#"
              className="text-base font-semibold hover:underline main-color poppins "
            >
              View All
            </a>
          </div>

          <div className="space-y-4 p-6 ">
            {recentPurchases.map((purchase) => (
              <div
                key={purchase.id}
                className="flex md:flex-row flex-col justify-between items-start md:items-center p-3 rounded-lg shadow bg-[#F9FAFB] border border-[#E5E7EB]"
              >
                <div>
                  <p className="font-medium text-[#111827] poppins text-base ">
                    {purchase.name}
                  </p>
                  <p className="text-sm text-[#6B7280] font-normal poppins ">
                    {purchase.store} • {purchase.date}
                  </p>
                </div>
                <div className="md:text-right">
                  <p className="text-gray-800 font-bold poppins">
                    {purchase.price}
                  </p>
                  <span
                    className={`text-xs text-${purchase.statusColor}-600 bg-${purchase.statusColor}-100 px-2 py-1 rounded`}
                  >
                    {purchase.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Reminders */}
        <div className="bg-white p-4 rounded-lg shadow poppins w-full">
          <h2 className="lg:text-lg font-semibold main-color mb-4">
            Upcoming Reminders
          </h2>

          <div className="space-y-4">
            {upcomingReminders.map((reminder) => (
              <div
                key={reminder.id}
                className={`p-3  bg-${reminder.color}-100 border-l-4 border-${reminder.color}-500 rounded`}
              >
                <p
                  className={`font-medium text-base text-${reminder.color}-800`}
                >
                  {reminder.title}
                </p>
                <p className={`text-sm text-${reminder.color}-600`}>
                  {reminder.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
