import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { MdBlock } from "react-icons/md";

const users = [
  {
    id: 1,
    name: "Jack Thompson",
    email: "bockelboy@att.com",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    id: 2,
    name: "Jack Thompson",
    email: "bockelboy@att.com",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    id: 3,
    name: "Jack Thompson",
    email: "bockelboy@att.com",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
  },
];

const AdminUser = () => {
  return (
    <div className="p-6 bg-[#f9fafb] font-sans">
      <h2 className="text-2xl font-bold text-[#1F762C] mb-6 poppins ">
        User Management
      </h2>

      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="text-left text-[#989898] font-normal text-base border-b poppins">
              <th className="px-6 py-3">User name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="text-sm text-gray-800 hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4 flex items-center space-x-3">
                  <img
                    src={user.image}
                    alt={user.name}
                    className="w-12 h-12 rounded-md object-cover"
                  />
                  <span className="font-semibold poppins text-xl ">
                    {user.name}
                  </span>
                </td>
                <td className="px-6 py-4 text-[#707070] text-xl poppins fonr-normal">
                  {user.email}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-4 text-xl">
                    <MdBlock className="text-[#202224] cursor-pointer hover:text-yellow-600" />
                    <FaTrashAlt className="text-[#FF0E06] cursor-pointer hover:text-red-700" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUser;
