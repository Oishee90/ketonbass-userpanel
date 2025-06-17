import React from "react";
import { FaUsers } from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Fake Data
const dashboardCards = [
  {
    title: "Total Users",
    value: "12,847",
    change: "+12% from last month",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    icon: <FaUsers className="text-lg" />,
    changeColor: "text-green-600",
  },
  {
    title: "Total Failed",
    value: "127",
    change: "Needs attention",
    iconBg: "bg-red-100",
    iconColor: "text-red-500",
    icon: <MdErrorOutline className="text-xl" />,
    changeColor: "text-red-500",
  },
  // চাইলে আরও যুক্ত করো...
];

const userActivityData = [
  {
    name: "Sarah Johnson",
    action: "Added new warranty",
    time: "2 min ago",
    status: "Active",
    color: "green",
  },
  {
    name: "Mike Chen",
    action: "Email parser failed",
    time: "5 min ago",
    status: "Error",
    color: "red",
  },
  {
    name: "Emma Davis",
    action: "Document uploaded",
    time: "8 min ago",
    status: "Upload",
    color: "blue",
  },
  {
    name: "Emma Davis",
    action: "Document uploaded",
    time: "8 min ago",
    status: "Upload",
    color: "blue",
  },
  {
    name: "Mike Chen",
    action: "Email parser failed",
    time: "5 min ago",
    status: "Error",
    color: "red",
  },
];

const systemAlerts = [
  {
    title: "Email Parser Failure",
    description: "Amazon parser failed for 23 emails",
    time: "2 minutes ago",
    bg: "bg-red-100",

    icon: "📧",
  },
  {
    title: "High API Usage",
    description: "Email API approaching limit",
    time: "15 minutes ago",
    bg: "bg-yellow-100",

    icon: "⚠️",
  },
];

const userMapData = [
  { month: "Jan", users: 60 },
  { month: "Feb", users: 70 },
  { month: "Mar", users: 65 },
  { month: "Apr", users: 80 },
  { month: "May", users: 45 },
  { month: "Jun", users: 70 },
  { month: "Jul", users: 75 },
];

// ✅ Fixed class mapping
const colorClasses = {
  green: "bg-green-100 text-green-600",
  red: "bg-red-100 text-red-600",
  blue: "bg-blue-100 text-blue-600",
};

const AdminDashboard = () => {
  return (
    <div className="p-6 bg-[#f9fafb] min-h-screen font-sans">
      <h1 className="text-2xl font-bold text-[#1F762C] mb-6 poppins">
        Dashboard
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {dashboardCards.map((card, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-white rounded-2xl p-5 shadow-sm border border-gray-200"
          >
            <div>
              <p className="text-[#4B5563] text-sm poppins">{card.title}</p>
              <h2 className="text-2xl font-extrabold text-[#111827]">
                {card.value}
              </h2>
              <p className={`text-sm mt-1 ${card.changeColor}`}>
                {card.change}
              </p>
            </div>
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-xl ${card.iconBg}`}
            >
              <div className={card.iconColor}>{card.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* User Map */}
        <div className="bg-white rounded-xl shadow-md p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-[#464255] poppins">
              User Map
            </h3>
            <select className="text-sm border rounded px-2 py-1">
              <option>Yearly</option>
              <option>Monthly</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={userMapData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="users"
                fill="#1C6A28"
                radius={[4, 4, 0, 0]}
                barSize={20}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent User Activity */}
        <div className="bg-white rounded-xl shadow-md p-5">
          <h3 className="text-lg font-bold mb-4 text-[#464255]  poppins">
            Recent User Activity
          </h3>
          <ul className="space-y-4">
            {userActivityData.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <p className="font-medium text-[#111827] poppins">
                    {item.name}
                  </p>
                  <p className="text-sm text-[#6B7280] poppins">
                    {item.action} • {item.time}
                  </p>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    colorClasses[item.color]
                  }`}
                >
                  {item.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* System Alerts */}
      <div className="bg-white rounded-xl shadow-md p-5">
        <h3 className="text-lg font-semibold mb-4">System Alerts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {systemAlerts.map((alert, idx) => (
            <div key={idx} className={`${alert.bg} p-4 rounded-lg`}>
              <div className="flex flex-row items-start gap-2">
                <div>{alert.icon}</div>
                <div>
                  <p
                    className={`font-medium text-base ${
                      alert.title === "Email Parser Failure"
                        ? "text-[#7F1D1D]"
                        : "text-[#713F12]"
                    }`}
                  >
                    {alert.title}
                  </p>
                  <p
                    className={`font-normal text-xs poppins mt-1   ${
                      alert.title === "Email Parser Failure"
                        ? "text-[#B91C1C]"
                        : "text-[#A16207]"
                    }`}
                  >
                    {alert.description}
                  </p>
                  <p
                    className={`font-normal text-xs poppins mt-1 ${
                      alert.title === "Email Parser Failure"
                        ? "text-[#DC2626]"
                        : "text-[#CA8A04]"
                    }`}
                  >
                    {alert.time}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
