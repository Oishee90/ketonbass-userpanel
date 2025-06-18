import React, { useEffect, useState } from "react";

import getRole from "../../utils/role";

const Header = () => {
  const verify_email = getRole();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSchoolModalOpen, setIsSchoolModalOpen] = useState(false);

  return (
    <div className="flex items-center border-b  border-b-[#E8E8E8] justify-between p-6 bg-white dark:bg-white text-[#020202] dark:text-white">
      {/* Title */}
      <div></div>

      {/* Profile Section based on role */}
      <div className="flex justify-around items-center gap-4">
        {verify_email === true && (
          <div
            className="cursor-pointer flex items-center gap-2"
            onClick={() => setIsSchoolModalOpen(true)}
          >
            <img
              src={
                "https://res.cloudinary.com/dwycwft99/image/upload/v1746606936/Profile_Image_Placeholder_2_1_znuysa.png"
              }
              alt="Student Profile"
              className="w-10 h-10 rounded-full"
            />
            <div className=" font-medium poppins flex flex-col text-base ">
              Oishee Khan <span className="text-sm text-[#565656] font-normal">user</span>
            </div>
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
