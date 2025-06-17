import {
  FaEnvelope,
  FaBell,
  FaFileAlt,
  FaCalendarAlt,
  FaRedoAlt,
  FaLock,
} from "react-icons/fa";
import { BsPatchQuestion } from "react-icons/bs";
import { FaFilePdf } from "react-icons/fa6";
const features = [
  {
    id: 1,
    title: "Auto Email Tracking",
    description:
      "Automatically extract purchase data from Gmail, Outlook, and other email providers.",
    icon: <FaEnvelope className="text-[#3B82F6] text-2xl" />,
    bg: "bg-blue-100",
  },
  {
    id: 2,
    title: "Warranty Alerts",
    description:
      "Never miss warranty expiration dates with smart reminders and notifications.",
    icon: <BsPatchQuestion className="text-[#22C55E] text-2xl" />,
    bg: "bg-green-100",
  },
  {
    id: 3,
    title: "Document Storage",
    description:
      "Securely store receipts, warranties, and manuals in encrypted cloud storage.",
    icon: <FaFilePdf className="text-[#A855F7] text-2xl" />,
    bg: "bg-purple-100",
  },
  {
    id: 4,
    title: "Calendar Integration",
    description: "Sync with Google and Apple calendars.",
    icon: <FaCalendarAlt className="text-[#F97316] text-2xl" />,
    bg: "bg-orange-100",
  },
  {
    id: 5,
    title: "Recurring Reminders",
    description:
      "Track recurring needs like filter replacements and maintenance schedules.",
    icon: <FaRedoAlt className="text-[#EF4444] text-2xl" />,
    bg: "bg-red-100",
  },
  {
    id: 6,
    title: "Privacy & Security",
    description: "OAuth 2.0 authentication and encrypted",
    icon: <FaLock className="text-[#6366F1] text-2xl" />,
    bg: "bg-indigo-100",
  },
];

const Powerfulfeatures = () => {
  return (
    <div className=" container mx-auto  p-4">
      <h1 className="text-[#16A34A] poppins w-full text-center text-3xl leading-none lg:text-[64px] ">
        Powerful Features for Smart Consumers
      </h1>
      <p className="text-[#979797] rubik w-full text-center text-xl leading-none lg:text-[32px] !mt-5 lg:!mt-10 leading-0">
        Everything you need to stay on top of your purchases and warranties
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 lg:mt-20">
        {features.map(({ id, title, description, icon, bg }) => (
          <div
            key={id}
            className="flex  flex-col items-start gap-4 border rounded-xl p-6 sha   dow-sm hover:shadow-md transition duration-300 cursor-pointer"
          >
            <div className={`p-3 rounded-md ${bg}`}>{icon}</div>
            <div>
              <h3 className="text-xl font-medium text-[#111827] poppins ">
                {title}
              </h3>
              <p className="text-base text-[#4B5563] mt-1 rubik">
                {description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Powerfulfeatures;
