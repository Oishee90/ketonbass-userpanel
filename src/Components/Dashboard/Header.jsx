import React, { useEffect, useState } from "react";

import getRole from "../../utils/role";

const Header = () => {
  const role = getRole();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSchoolModalOpen, setIsSchoolModalOpen] = useState(false);

  return (
    <div className="flex items-center border-b  border-b-[#E8E8E8] justify-between p-6 bg-white dark:bg-white text-[#020202] dark:text-white">
      {/* Title */}
      <div></div>

      {/* Profile Section based on role */}
      <div className="flex justify-around items-center gap-4">
        {role === "admin" && (
          <div className="curosr-pointer" onClick={() => setIsModalOpen(true)}>
            <img
              src={
                "https://res.cloudinary.com/dwycwft99/image/upload/v1746606936/Profile_Image_Placeholder_2_1_znuysa.png"
              }
              alt="Admin Profile"
              className="w-10 h-10 rounded-full cursor-pointer"
            />
          </div>
        )}
        {role === "user" && (
          <div
            className="curosr-pointer"
            onClick={() => setIsSchoolModalOpen(true)}
          >
            <img
              src={
                "https://res.cloudinary.com/dwycwft99/image/upload/v1746606936/Profile_Image_Placeholder_2_1_znuysa.png"
              }
              alt="Student Profile"
              className="w-10 h-10 rounded-full"
            />
          </div>
        )}
      </div>

      {/* {isModalOpen && <AdminProfile onClose={() => setIsModalOpen(false)} />}
      {isSchoolModalOpen && (
        <SchoolProfile onClose={() => setIsSchoolModalOpen(false)} />
      )} */}
    </div>
  );
};

export default Header;
