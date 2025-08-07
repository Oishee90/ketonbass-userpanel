import React, { useEffect, useState } from "react";
import { FaPlus, FaSync, FaUpload } from "react-icons/fa";

import AddPurchaseModal from "./AddPurchaseModal";
import EditPurchaseModal from "./EditPurchaseModal";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import {
  useGetActiveWarrantiesQuery,
  useGetEventsQuery,
  useGetPurchaseQuery,
  useGetTotalPurchasePriceQuery,
  useGetUpcomingRemindersQuery,
  useSyncGoogleDataQuery,
} from "../../../Redux/feature/auth/aithapi";
import {
  FaBell,
  FaTools,
  FaExclamationTriangle,
  FaCalendarPlus,
} from "react-icons/fa";
import Spinner from "../../../Shared/Spinner";
import ErrorPage from "../../../Shared/ErrorPage";
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [spinning, setSpinning] = useState(false);
  const {
    data: syncData,
    error: syncError,
    isLoading: syncLoading,
    refetch: refetch,
  } = useSyncGoogleDataQuery(); // Sync API for GET request
  const {
    data: totalPurchase,
    refetch: refetchTotalPurchase,
    isLoading: isLoadingTotalPurchase,
  } = useGetTotalPurchasePriceQuery();

  const {
    data: activeWarranty,
    refetch: refetchActiveWarranty,
    isLoading: isLoadingWarranty,
  } = useGetActiveWarrantiesQuery();
  const { data, isLoading } = useGetEventsQuery();
  const {
    data: upcomingWarranty,
    refetch: refetchUpcomingWarranty,
    error: upcomingError,
  } = useGetUpcomingRemindersQuery();
  const { data: purchase, error } = useGetPurchaseQuery();
  console.log("purchase", purchase);

  const handleAddPurchaseSuccess = () => {
    // Refetch after adding a new purchase to get the updated data
    refetchTotalPurchase();
    refetchActiveWarranty();
    refetchUpcomingWarranty();
    setIsModalOpen(true);
  };

  const handleFileUploadSuccess = () => {
    // Refetch after successful file upload to get the updated data
    refetchTotalPurchase();
    refetchActiveWarranty();
    refetchUpcomingWarranty();
    setIsEditModalOpen(true);
  };
  const recentPurchases = purchase ? purchase.slice(0, 3) : [];
  // refresh or synch

  const handleSync = async () => {
    setSpinning(true); // Start spinning when clicked

    try {
      // Trigger the sync API request
      console.log("Syncing with Google API...");
      await refetch(); // Call the refetch function from RTK Query to trigger the sync

      console.log("Sync successful!");
    } catch (err) {
      console.error("Failed to sync data:", err);
    } finally {
      setSpinning(false); // Stop spinning when done
    }
  };

  if (isLoading) {
    return <Spinner />;
  }
  console.log(error, "error");
  if (error) {
    return (
      <ErrorPage message="Failed to load data. Please try again."></ErrorPage>
    );
  }
  // UPCOMING REMINDERS   const now = new Date();
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
  return (
    <div className="bg-[#f9f9f9] min-h-screen p-4 sm:p-6 font-sans">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="mb-2 text-xl font-bold sm:text-2xl main-color poppins">
            Dashboard Overview
          </h1>
          <p className="text-sm font-normal sm:text-base poppins tittle-color">
            Track your purchases, warranties, and upcoming reminders
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-4">
        <div className="p-4 bg-white rounded-lg shadow tittle-color">
          <p className="mb-1 text-base font-medium ">Total Purchases</p>
          <h2 className={`text-2xl font-bold text-green-900 mb-1 `}>
            ${totalPurchase?.total_purchase_price}
          </h2>
        </div>
        <div className="p-4 bg-white rounded-lg shadow tittle-color">
          <p className="mb-1 text-base font-medium ">Active Warranties</p>
          <h2 className={`text-2xl font-bold text-green-900 mb-1 `}>
            {activeWarranty?.total_active_products}
          </h2>
        </div>
        <div className="p-4 bg-white rounded-lg shadow tittle-color">
          <p className="mb-1 text-base font-medium ">Upcoming Reminders</p>
          <h2 className={`text-2xl font-bold text-green-900 mb-1 `}>
            {upcomingWarranty?.total_upcoming_warranty}
          </h2>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="!mt-12 !mb-10">
        <h1 className="mb-1 text-xl font-semibold main-color poppins">
          Quick Actions
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 !mb-10">
        <div className="w-full">
          <button
            onClick={handleAddPurchaseSuccess}
            className="flex items-center gap-1 md:gap-2 bg-blue-100 text-[#111827] px-2 py-3 rounded-lg poppins text-sm sm:text-base font-medium md:w-full"
          >
            <FaPlus /> Add New Purchase
          </button>
        </div>
        <div className="w-full">
          <button
            onClick={handleSync}
            className="bg-orange-100 text-[#111827] px-2 py-3 rounded-lg poppins text-sm sm:text-base font-medium flex items-center gap-2 md:w-full"
          >
            <FaSync
              className={`text-[#EA580C] ${
                syncLoading || spinning ? "animate-spin" : ""
              }`}
            />
            {syncLoading || spinning
              ? "Syncing Purchases"
              : "Refresh Purchases"}
          </button>
        </div>
        <div className="w-full">
          <button
            onClick={handleFileUploadSuccess}
            className="flex items-center gap-2 bg-green-100 text-[#111827] px-4 py-3 rounded-lg poppins text-sm sm:text-base font-medium md:w-full"
          >
            <FaUpload className="text-[#16A34A]" /> Upload Receipt
          </button>
        </div>
      </div>

      {/* Recent Purchases & Reminders */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Purchases */}
        <div className="md:col-span-2 bg-white rounded-lg shadow border border-[#E5E7EB]">
          <div className="flex justify-between md:items-center mb-4 border border-b-[#E5E7EB] p-4">
            <h2 className="text-sm font-semibold sm:text-lg main-color poppins">
              Recent Purchases
            </h2>
            <NavLink
              to="/dashboard/purchase"
              className="text-sm font-semibold sm:text-base hover:underline main-color poppins whitespace-nowrap"
            >
              View All
            </NavLink>
          </div>

          <div className="p-2 space-y-4 sm:p-6">
            {recentPurchases.map((purchase) => (
              <div
                key={purchase.id}
                className="flex md:flex-row flex-col justify-between items-start md:items-center p-3 g shadow bg-[#F9FAFB] border border-[#E5E7EB]"
              >
                <div>
                  <p className="font-medium text-[#111827] poppins sm:text-base text-sm mb-2">
                    {purchase.product_name}
                  </p>
                  <p className="sm:text-sm  text-xs text-[#6B7280] font-normal poppins mb-2">
                    {purchase.shop_name} • {purchase.purchase_date}
                  </p>
                </div>
                <div className="md:text-right">
                  <p className="mb-2 text-sm font-bold text-gray-800 sm:text-base poppins">
                    {purchase.price}
                  </p>
                  <span
                    className={`text-xs rounded-lg mt-6 text-${
                      purchase.warranty_status === "Active" ? "green" : "red"
                    }-600 bg-${
                      purchase.warranty_status === "Active" ? "green" : "red"
                    }-100 px-2 py-1 rounded`}
                  >
                    {purchase.warranty_status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Upcoming Reminders */}
        {/* Reminders */}
        <div className="space-y-4">
          <h3 className="text-base font-semibold sm:text-lg">
            Upcoming Reminders
          </h3>
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
      <AddPurchaseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        refetchTotalPurchase={refetchTotalPurchase}
        refetchActiveWarranty={refetchActiveWarranty}
        refetchUpcomingWarranty={refetchUpcomingWarranty}
      />
      <EditPurchaseModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        refetchTotalPurchase={refetchTotalPurchase}
        refetchActiveWarranty={refetchActiveWarranty}
        refetchUpcomingWarranty={refetchUpcomingWarranty}
      />
    </div>
  );
};

export default UserDashboard;
