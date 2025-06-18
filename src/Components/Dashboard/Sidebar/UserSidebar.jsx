import { FaSignOutAlt } from "react-icons/fa";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { FaRegHeart, FaRegClock, FaRegClipboard } from "react-icons/fa";
import { BiPurchaseTag } from "react-icons/bi";
import { TbMessages, TbReplaceFilled } from "react-icons/tb";
import { BiArrowToLeft, BiArrowToRight } from "react-icons/bi";
import logo from "../../../assets/logo.png";
import { useEffect, useRef } from "react";

const UserSidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  // Active states for navigation links
  const isActiveDashboard = location.pathname === "/dashboard";
  const isActivePurchase = location.pathname === "/dashboard/purchase";
  const isActiveWarranties = location.pathname === "/dashboard/warranties";
  const isActiveReminders = location.pathname === "/dashboard/reminders";
  const isActiveReceipts = location.pathname === "/dashboard/receipts";
  const isActiveReplacement = location.pathname === "/dashboard/replacement";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        // Assuming isDropdownOpen state is managed elsewhere if needed
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login", { replace: true });
  };

  return (
    <div
      className={`${
        isSidebarOpen ? "w-64" : "w-16"
      } bg-white dark:bg-[#374151] dark:text-white border-r-2 border-r-white min-h-screen flex flex-col justify-between transition-all duration-300`}
    >
      {/* Top Section: Logo and Toggle */}
      <div className="flex flex-col py-4">
        <div className="flex items-center justify-between px-4 pb-4 mt-9 gap-3">
          {isSidebarOpen && <img src={logo} alt="Logo" className=" " />}
          <div onClick={toggleSidebar} className="cursor-pointer">
            {isSidebarOpen ? (
              <BiArrowToLeft className="w-[24px] h-[24px]" />
            ) : (
              <BiArrowToRight className="w-[24px] h-[24px]" />
            )}
          </div>
        </div>

        {/* Menu Items */}
        {isSidebarOpen ? (
          <nav className="flex flex-col text-[#364636] dark:text-white mt-9">
            <NavLink
              to="/dashboard"
              className="flex items-center justify-between w-full p-2"
            >
              <div
                className={`flex items-center justify-start gap-2 w-full h-[50px] p-2 ${
                  isActiveDashboard
                    ? "bg-[#1F762C] text-white rounded-xl"
                    : "text-[#4B5563] dark:text-white"
                }`}
              >
                <FaRegClock className="w-[18px] h-[18px]" />
                <h1 className="poppins font-semibold text-base">Dashboard</h1>
              </div>
            </NavLink>

            <NavLink
              to="/dashboard/purchase"
              className="flex items-center justify-between w-full p-2"
            >
              <div
                className={`flex items-center justify-start gap-2 w-full h-[50px] p-2 ${
                  isActivePurchase
                    ? "bg-[#1F762C] text-white rounded-xl"
                    : "text-[#4B5563] dark:text-white"
                }`}
              >
                <BiPurchaseTag className="w-[18px] h-[18px]" />
                <h1 className="poppins font-semibold text-base">Purchase</h1>
              </div>
            </NavLink>

            <NavLink
              to="/dashboard/warranties"
              className="flex items-center justify-between w-full p-2"
            >
              <div
                className={`flex items-center justify-start gap-2 w-full h-[50px] p-2 ${
                  isActiveWarranties
                    ? "bg-[#1F762C] text-white rounded-xl"
                    : "text-[#4B5563] dark:text-white"
                }`}
              >
                <FaRegHeart className="w-[18px] h-[18px]" />
                <h1 className="poppins font-semibold text-base">Warranties</h1>
              </div>
            </NavLink>

            <NavLink
              to="/dashboard/reminders"
              className="flex items-center justify-between w-full p-2"
            >
              <div
                className={`flex items-center justify-start gap-2 w-full h-[50px] p-2 ${
                  isActiveReminders
                    ? "bg-[#1F762C] text-white rounded-xl"
                    : "text-[#4B5563] dark:text-white"
                }`}
              >
                <TbMessages className="w-[18px] h-[18px]" />
                <h1 className="poppins font-semibold text-base">Reminders</h1>
              </div>
            </NavLink>

            <NavLink
              to="/dashboard/receipts"
              className="flex items-center justify-between w-full p-2"
            >
              <div
                className={`flex items-center justify-start gap-2 w-full h-[50px] p-2 ${
                  isActiveReceipts
                    ? "bg-[#1F762C] text-white rounded-xl"
                    : "text-[#4B5563] dark:text-white"
                }`}
              >
                <FaRegClipboard className="w-[18px] h-[18px]" />
                <h1 className="poppins font-semibold text-base">Receipts</h1>
              </div>
            </NavLink>

            <NavLink
              to="/dashboard/replacement"
              className="flex items-center justify-between w-full p-2"
            >
              <div
                className={`flex items-center justify-start gap-2 w-full h-[50px] p-2 ${
                  isActiveReplacement
                    ? "bg-[#1F762C] text-white rounded-xl"
                    : "text-[#4B5563] dark:text-white"
                }`}
              >
                <TbReplaceFilled className="w-[18px] h-[18px]" />
                <h1 className="poppins font-semibold text-base">Replacement</h1>
              </div>
            </NavLink>
          </nav>
        ) : (
          <nav className="flex flex-col text-[#364636] dark:text-white mt-9">
            <NavLink
              to="/dashboard"
              className="flex items-center justify-center w-full p-2 relative group"
              aria-label="Dashboard"
            >
              <div
                className={`flex items-center justify-center w-full h-[50px] p-2 ${
                  isActiveDashboard
                    ? "bg-[#1F762C] text-white rounded-xl"
                    : "text-[#4B5563] dark:text-white"
                }`}
              >
                <FaRegClock className="w-[18px] h-[18px]" />
              </div>
              <span className="absolute left-16 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 z-10">
                Dashboard
              </span>
            </NavLink>

            <NavLink
              to="/dashboard/purchase"
              className="flex items-center justify-center w-full p-2 relative group"
              aria-label="Purchase"
            >
              <div
                className={`flex items-center justify-center w-full h-[50px] p-2 ${
                  isActivePurchase
                    ? "bg-[#1F762C] text-white rounded-xl"
                    : "text-[#4B5563] dark:text-white"
                }`}
              >
                <BiPurchaseTag className="w-[18px] h-[18px]" />
              </div>
              <span className="absolute left-16 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 z-10">
                Purchase
              </span>
            </NavLink>

            <NavLink
              to="/dashboard/warranties"
              className="flex items-center justify-center w-full p-2 relative group"
              aria-label="Warranties"
            >
              <div
                className={`flex items-center justify-center w-full h-[50px] p-2 ${
                  isActiveWarranties
                    ? "bg-[#1F762C] text-white rounded-xl"
                    : "text-[#4B5563] dark:text-white"
                }`}
              >
                <FaRegHeart className="w-[18px] h-[18px]" />
              </div>
              <span className="absolute left-16 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 z-10">
                Warranties
              </span>
            </NavLink>

            <NavLink
              to="/dashboard/reminders"
              className="flex items-center justify-center w-full p-2 relative group"
              aria-label="Reminders"
            >
              <div
                className={`flex items-center justify-center w-full h-[50px] p-2 ${
                  isActiveReminders
                    ? "bg-[#1F762C] text-white rounded-xl"
                    : "text-[#4B5563] dark:text-white"
                }`}
              >
                <TbMessages className="w-[18px] h-[18px]" />
              </div>
              <span className="absolute left-16 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 z-10">
                Reminders
              </span>
            </NavLink>

            <NavLink
              to="/dashboard/receipts"
              className="flex items-center justify-center w-full p-2 relative group"
              aria-label="Receipts"
            >
              <div
                className={`flex items-center justify-center w-full h-[50px] p-2 ${
                  isActiveReceipts
                    ? "bg-[#1F762C] text-white rounded-xl"
                    : "text-[#4B5563] dark:text-white"
                }`}
              >
                <FaRegClipboard className="w-[18px] h-[18px]" />
              </div>
              <span className="absolute left-16 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 z-10">
                Receipts
              </span>
            </NavLink>

            <NavLink
              to="/dashboard/replacement"
              className="flex items-center justify-center w-full p-2 relative group"
              aria-label="Replacement"
            >
              <div
                className={`flex items-center justify-center w-full h-[50px] p-2 ${
                  isActiveReplacement
                    ? "bg-[#1F762C] text-white rounded-xl"
                    : "text-[#4B5563] dark:text-white"
                }`}
              >
                <TbReplaceFilled className="w-[18px] h-[18px]" />
              </div>
              <span className="absolute left-16 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 z-10">
                Replacement
              </span>
            </NavLink>
          </nav>
        )}
      </div>

      {/* Logout */}
      <div
        onClick={handleLogout}
        className={`flex items-center ${
          isSidebarOpen ? "space-x-3 pl-10" : "justify-center"
        } p-2 text-red-500 cursor-pointer rounded-lg pb-10`}
      >
        <FaSignOutAlt className="w-[18px] h-[18px]" />
        {isSidebarOpen && (
          <span className="poppins font-semibold text-base">Log Out</span>
        )}
      </div>
    </div>
  );
};

export default UserSidebar;
