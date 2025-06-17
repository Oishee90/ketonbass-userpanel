import React from "react";
import { FaPlus, FaSync, FaUpload } from "react-icons/fa";
import { recentPurchases, upcomingReminders } from "../../../fakeData";

const UserDashboard = () => {
  return (
    <div className="bg-[#f9f9f9] min-h-screen p-6 font-sans">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-bold text-green-800 mb-1">
            Dashboard Overview
          </h1>
          <p className="text-gray-600 text-sm">
            Track your purchases, warranties, and upcoming reminders
          </p>
        </div>
        <button className="bg-green-800 text-white px-4 py-2 rounded-lg shadow">
          Add Manual Purchase
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-600">Total Purchases</p>
          <h2 className="text-2xl font-bold text-green-700">$89,000</h2>
          <p className="text-xs text-green-500 mt-1">+12% from last month</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-600">Active Warranties</p>
          <h2 className="text-2xl font-bold text-green-700">9</h2>
          <p className="text-xs text-orange-500 mt-1">3 expiring soon</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-600">Upcoming Reminders</p>
          <h2 className="text-2xl font-bold text-green-700">7</h2>
          <p className="text-xs text-blue-500 mt-1">Next in 2 days</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-600">Total Value</p>
          <h2 className="text-2xl font-bold text-green-700">$89,000</h2>
          <p className="text-xs text-gray-500 mt-1">Protected by warranty</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <button className="flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-3 rounded-lg">
          <FaPlus /> Add New Purchase
        </button>
        <button className="flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-3 rounded-lg">
          <FaSync /> Sync Email
        </button>
        <button className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-3 rounded-lg">
          <FaUpload /> Upload Receipt
        </button>
      </div>

      {/* Recent Purchases & Reminders */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Recent Purchases */}
        <div className="md:col-span-2 bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-green-800">
              Recent Purchases
            </h2>
            <a href="#" className="text-sm text-blue-600 hover:underline">
              View All
            </a>
          </div>

          <div className="space-y-4">
            {recentPurchases.map((purchase) => (
              <div
                key={purchase.id}
                className="flex justify-between items-center"
              >
                <div>
                  <p className="font-medium text-gray-800">{purchase.name}</p>
                  <p className="text-sm text-gray-500">
                    {purchase.store} • {purchase.date}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-gray-800 font-semibold">
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
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-green-800 mb-4">
            Upcoming Reminders
          </h2>

          <div className="space-y-4">
            {upcomingReminders.map((reminder) => (
              <div
                key={reminder.id}
                className={`p-3 bg-${reminder.color}-100 border-l-4 border-${reminder.color}-500 rounded`}
              >
                <p className={`font-medium text-${reminder.color}-800`}>
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
