import React, { useEffect, useState } from "react";


const Header = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSchoolModalOpen, setIsSchoolModalOpen] = useState(false);

  return (
    <div className="flex items-center border-b  border-b-[#E8E8E8] justify-between p-6 bg-white dark:bg-white text-[#020202] dark:text-white">
      {/* Title */}
      <div></div>

      {/* Profile Section based on role */}
      <div className="flex items-center justify-around gap-4">
    
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setIsSchoolModalOpen(true)}
          >
            <div className="flex flex-col text-base font-medium poppins">
              Oishee Khan{" "}
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
