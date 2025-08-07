import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSchoolModalOpen, setIsSchoolModalOpen] = useState(false);
  const username = useSelector((state) => state.auth?.user?.name);
  const userEmail = useSelector((state) => state.auth?.user?.email);
  console.log(username, "username");

  return (
    <div className="flex items-center border-b  border-b-[#E8E8E8] justify-between p-6 bg-white dark:bg-white text-[#020202] ">
      {/* Title */}
      <div></div>

      {/* Profile Section based on role */}
      <div className="flex items-center justify-around gap-4">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setIsSchoolModalOpen(true)}
        >
          <div className="flex flex-col text-base font-medium poppins">
            {username}
            <span className="text-xs text-[#565656] font-normal">
              {userEmail}
            </span>
            <span className="text-sm text-[#565656] font-normal">user</span>
          </div>
        </div>
      </div>

      {/* {isModalOpen && <AdminProfile onClose={() => setIsModalOpen(false)} />}
      {isSchoolModalOpen && (
        <SchoolProfile onClose={() => setIsSchoolModalOpen(false)} />
      )} */}
    </div>
  );
};

export default Header;
