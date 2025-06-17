import { FaSignOutAlt } from "react-icons/fa";

import { NavLink, useNavigate } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { FaRegClock } from "react-icons/fa";
import { FaRegClipboard } from "react-icons/fa";
import { PiClockCountdownLight } from "react-icons/pi";
import logo from "../../../assets/logo.png";
import { BiPurchaseTag } from "react-icons/bi";
import { TbMessages } from "react-icons/tb";
import { TbReplaceFilled } from "react-icons/tb";
const UserSidebar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSeetingsDropdownOpen, setSeetingsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  // console.log(user);
  const dropdownRef = useRef(null);

  const isActiveDashboard = location.pathname === "/dashboard";
  const isActivePurchase = location.pathname === "/dashboard/purchase";
  const isActiveWarranties = location.pathname === "/dashboard/warranties";
  const isActiveReminders = location.pathname === "/dashboard/reminders";
  const isActiveReceipts = location.pathname === "/dashboard/receipts";
  const isActiveReplacement = location.pathname === "/dashboard/replacement";
  // const isActiveSettings =
  //   location.pathname.startsWith("/terms") ||
  //   location.pathname.startsWith("/privacy");
  // const isActiveUser = location.pathname.startsWith("/user");
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    // Add event listener for click outside
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("accessToken"); // Remove token from localStorage
    navigate("/login", { replace: true }); // Redirect to login page
  };
  const toggleDropdownSettings = () => setSeetingsDropdownOpen((prev) => !prev);
  return (
    <div className="bg-[#FFFFFF]  border-r-2  border-r-[#FFFFFF]  min-h-screen flex flex-col justify-between  open-sns">
      {/* Logo Section */}
      <div className="flex flex-col  py-4">
        <div className="flex px-6 items-center justify-center  pb-4 mt-9">
          <img src={logo} alt="Logo" />
        </div>
        {/* Menu Items */}
        <nav className="flex flex-col  text-[#364636] mt-9">
          <NavLink
            to="/dashboard"
            className="flex items-center justify-between w-[280px]"
          >
            <div className="flex items-center justify-between w-[280px] font-semibold  p-2 ">
              {/* Left Indicator Bar */}

              {/* Main Button Area */}
              <div
                className={`flex items-center space-x-2 justify-start gap-2 w-[250px] h-[50px]  p-5 text-centfer
                  ${
                    isActiveDashboard
                      ? "bg-[#1F762C] text-[#FFFFFF] rounded-xl"
                      : "text-[#4B5563]"
                  }`}
              >
                <FaRegClock className="w-[18px] h-[18px] font-semibold   " />{" "}
                <h1 className="poppins font-semibold   text-base">Dashboard</h1>
              </div>
            </div>
          </NavLink>
          <NavLink
            to="/dashboard/purchase"
            className="flex items-center justify-between w-[280px]"
          >
            <div className="flex items-center justify-between w-[280px] font-semibold  p-2">
              {/* Left Indicator Bar */}

              {/* Main Button Area */}
              <div
                className={`flex items-center space-x-2 justify-start gap-2 w-[250px] h-[50px]  p-5 text-centfer
                  ${
                    isActivePurchase
                      ? "bg-[#1F762C] text-[#FFFFFF] rounded-xl"
                      : "text-[#4B5563]"
                  }`}
              >
                <BiPurchaseTag className="w-[18px] h-[18px] font-semibold   " />{" "}
                <h1 className="poppins font-semibold   text-base">Purchase</h1>
              </div>
            </div>
          </NavLink>
          <NavLink
            to="/dashboard/warranties"
            className="flex items-center justify-between w-[280px]"
          >
            <div className="flex items-center justify-between w-[280px] font-semibold  p-2 ">
              <div
                className={`flex items-center space-x-2 justify-start gap-2 w-[250px] h-[50px]  p-5 text-centfer
                  ${
                    isActiveWarranties
                      ? "bg-[#1F762C] text-[#FFFFFF] rounded-xl"
                      : "text-[#4B5563]"
                  }`}
              >
                <FaRegHeart className="w-[18px] h-[18px] font-semibold   " />{" "}
                <h1 className="poppins font-semibold   text-base">
                  Warranties
                </h1>
              </div>
            </div>
          </NavLink>
          <NavLink
            to="/dashboard/reminders"
            className="flex items-center justify-between w-[280px]"
          >
            <div className="flex items-center justify-between w-[280px] font-semibold  p-2">
              {/* Left Indicator Bar */}

              {/* Main Button Area */}
              <div
                className={`flex items-center space-x-2 justify-start gap-2 w-[250px] h-[50px]  p-5 text-centfer
                  ${
                    isActiveReminders
                      ? "bg-[#1F762C] text-[#FFFFFF] rounded-xl"
                      : "text-[#4B5563]"
                  }`}
              >
                <TbMessages className="w-[18px] h-[18px] font-semibold   " />{" "}
                <h1 className="poppins font-semibold   text-base">Reminders</h1>
              </div>
            </div>
          </NavLink>
          <NavLink
            to="/dashboard/receipts"
            className="flex items-center justify-between w-[280px]"
          >
            <div className="flex items-center justify-between w-[280px] font-semibold  p-2">
              {/* Left Indicator Bar */}

              {/* Main Button Area */}
              <div
                className={`flex items-center space-x-2 justify-start gap-2 w-[250px] h-[50px]  p-5 text-centfer
                  ${
                    isActiveReceipts
                      ? "bg-[#1F762C] text-[#FFFFFF] rounded-xl"
                      : "text-[#4B5563]"
                  }`}
              >
                <FaRegClipboard className="w-[18px] h-[18px] font-semibold   " />{" "}
                <h1 className="poppins  font-semibold   text-base">Receipts</h1>
              </div>
            </div>
          </NavLink>
          <NavLink
            to="/dashboard/replacement"
            className="flex items-center justify-between w-[280px]"
          >
            <div className="flex items-center justify-between w-[280px] font-semibold  p-2">
              {/* Left Indicator Bar */}

              {/* Main Button Area */}
              <div
                className={`flex items-center space-x-2 justify-start gap-2 w-[250px] h-[50px]  p-5 text-centfer
                  ${
                    isActiveReplacement
                      ? "bg-[#1F762C] text-[#FFFFFF] rounded-xl"
                      : "text-[#4B5563]"
                  }`}
              >
                <TbReplaceFilled className="w-[18px] h-[18px] font-semibold   " />{" "}
                <h1 className="poppins  font-semibold   text-base">
                  Replacement
                </h1>
              </div>
            </div>
          </NavLink>
        </nav>
      </div>

      {/* Logout */}
      <div
        onClick={handleLogout}
        className="flex items-center space-x-3 p-2 text-red-500 cursor-pointer rounded-lg pb-10 pl-10"
      >
        <FaSignOutAlt />
        <span>Log Out</span>
      </div>
    </div>
  );
};

export default UserSidebar;
