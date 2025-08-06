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
        <div className="flex items-center justify-between gap-3 px-4 pb-4 mt-9">
          {isSidebarOpen && <img src={logo} alt="Logo" />}
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
          // ✅ Expanded Sidebar
          <nav className="flex flex-col text-[#364636] dark:text-white mt-9">
            {[
              {
                path: "/dashboard",
                icon: <FaRegClock className="w-[18px] h-[18px]" />,
                label: "Dashboard",
                active: isActiveDashboard,
              },
              {
                path: "/dashboard/purchase",
                icon: <BiPurchaseTag className="w-[18px] h-[18px]" />,
                label: "Purchase",
                active: isActivePurchase,
              },
              {
                path: "/dashboard/warranties",
                icon: <FaRegHeart className="w-[18px] h-[18px]" />,
                label: "Warranties",
                active: isActiveWarranties,
              },
              {
                path: "/dashboard/reminders",
                icon: <TbMessages className="w-[18px] h-[18px]" />,
                label: "Reminders",
                active: isActiveReminders,
              },
              {
                path: "/dashboard/receipts",
                icon: <FaRegClipboard className="w-[18px] h-[18px]" />,
                label: "Receipts",
                active: isActiveReceipts,
              },
              {
                path: "/dashboard/replacement",
                icon: <TbReplaceFilled className="w-[18px] h-[18px]" />,
                label: "Replacement",
                active: isActiveReplacement,
              },
            ].map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                className="flex items-center justify-between w-full p-2"
              >
                <div
                  className={`flex items-center gap-2 w-full h-[50px] p-2 ${
                    item.active
                      ? "bg-[#1F762C] text-white rounded-xl"
                      : "text-[#4B5563] dark:text-white"
                  }`}
                >
                  {item.icon}
                  <h1 className="text-base font-semibold poppins">
                    {item.label}
                  </h1>
                </div>
              </NavLink>
            ))}
          </nav>
        ) : (
          // ✅ Collapsed Sidebar
          <nav className="flex flex-col text-[#364636] dark:text-white mt-9">
            {[
              {
                path: "/dashboard",
                icon: <FaRegClock className="w-[18px] h-[18px]" />,
                label: "Dashboard",
                active: isActiveDashboard,
              },
              {
                path: "/dashboard/purchase",
                icon: <BiPurchaseTag className="w-[18px] h-[18px]" />,
                label: "Purchase",
                active: isActivePurchase,
              },
              {
                path: "/dashboard/warranties",
                icon: <FaRegHeart className="w-[18px] h-[18px]" />,
                label: "Warranties",
                active: isActiveWarranties,
              },
              {
                path: "/dashboard/reminders",
                icon: <TbMessages className="w-[18px] h-[18px]" />,
                label: "Reminders",
                active: isActiveReminders,
              },
              {
                path: "/dashboard/receipts",
                icon: <FaRegClipboard className="w-[18px] h-[18px]" />,
                label: "Receipts",
                active: isActiveReceipts,
              },
              {
                path: "/dashboard/replacement",
                icon: <TbReplaceFilled className="w-[18px] h-[18px]" />,
                label: "Replacement",
                active: isActiveReplacement,
              },
            ].map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                className="relative flex items-center justify-center w-full p-2 group"
                aria-label={item.label}
              >
                <div
                  className={`flex items-center justify-center w-full h-[50px] p-2 ${
                    item.active
                      ? "bg-[#1F762C] text-white rounded-xl"
                      : "text-[#4B5563] dark:text-white"
                  }`}
                >
                  {item.icon}
                </div>
                {/* Tooltip on Hover */}
                <span className="absolute z-10 hidden px-2 py-1 text-xs text-white bg-gray-800 rounded left-16 group-hover:block whitespace-nowrap">
                  {item.label}
                </span>
              </NavLink>
            ))}
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
          <span className="text-base font-semibold poppins">Log Out</span>
        )}
      </div>
    </div>
  );
};

export default UserSidebar;
