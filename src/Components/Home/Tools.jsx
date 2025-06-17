import { div } from "framer-motion/client";
import {
  FaUsersCog,
  FaChartBar,
  FaCogs,
  FaBug,
  FaFlask,
  FaEye,
} from "react-icons/fa";
import { BsPatchQuestion } from "react-icons/bs";

const adminItems = [
  {
    icon: <FaUsersCog className="text-blue-600 text-2xl" />,
    title: "User Management",
    desc: "Manage accounts, view usage logs, and monitor activity",
  },
  {
    icon: <FaChartBar className="text-green-600 text-2xl" />,
    title: "Analytics & Reports",
    desc: "Track engagement, parser success rates, and platform metrics",
  },
  {
    icon: <FaCogs className="text-purple-600 text-2xl" />,
    title: "System Configuration",
    desc: "Manage integrations, data retention, and access controls",
  },
];

const qaItems = [
  {
    icon: <FaBug className="text-red-600 text-2xl" />,
    title: "Debug Logs",
    desc: "Monitor system errors and device responsiveness",
  },
  {
    icon: <BsPatchQuestion className="text-orange-600 text-2xl" />,
    title: "Test Modules",
    desc: "Test email parsing, notifications, and upload handling",
  },
  {
    icon: <FaEye className="text-indigo-600 text-2xl" />,
    title: "Data Oversight",
    desc: "Monitor and validate parsed data accuracy",
  },
];

const Tools = () => {
  return (
    <div className="container mx-auto mt-20 lg:mt-40   p-4">
      <div className="py-10  bg-white">
        {/* Heading */}
        <div className="text-center mb-24">
          <h1 className="text-[#16A34A] poppins w-full text-center text-3xl leading-none lg:text-[64px] ">
            Powerful Admin Tools
          </h1>
          <p className="text-[#979797] rubik text-xl lg:text-[32px] !mt-6">
            Complete platform management and analytics for administrators
          </p>
        </div>

        {/* Tools Grid */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Admin Dashboard */}
          <div className="bg-gray-50 p-6 rounded-xl shadow-md w-full lg:w-1/2">
            <h2 className=" poppins text-3xl lg:text-[36px]  mb-7 text-[#111827]">
              Admin Dashboard
            </h2>
            <div className="space-y-4">
              {adminItems.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-4 bg-white rounded-lg shadow hover:shadow-md transition text-xl"
                >
                  {item.icon}
                  <div>
                    <h3 className="font-medium text-#111827] text-[22px]  rubik">
                      {item.title}
                    </h3>
                    <p className="text-lg text-[#4B5563] rubik ">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* QA & Testing Tools */}
          <div className="bg-gradient-to-br from-[#DCFCE7] to-[#F0FDF4] p-6 rounded-xl shadow-md w-full lg:w-1/2">
            <h2 className="text-3xl lg:text-[36px]  mb-7 text-[#111827]">
              QA & Testing Tools
            </h2>
            <div className="space-y-4 mt-5">
              {qaItems.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-4 bg-white rounded-lg shadow hover:shadow-md transition text-xl"
                >
                  {item.icon}
                  <div>
                    <h3 className="font-medium text-#111827] text-[22px]  rubik ">
                      {item.title}
                    </h3>
                    <p className="text-lg text-[#4B5563] rubik ">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tools;
