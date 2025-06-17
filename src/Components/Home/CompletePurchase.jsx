import { BsPatchQuestion } from "react-icons/bs";
import { FaClock } from "react-icons/fa6";
import dashboard from "../../assets/dashboard-img.png";
const CompletePurchase = () => {
  return (
    <div className=" container mx-auto mt-20 lg:mt-40 p-4">
      <h1 className="text-[#16A34A] poppins w-full text-center text-3xl leading-none lg:text-[64px] ">
        Your Complete Purchase Dashboard
      </h1>
      <p className="text-[#979797] rubik w-full text-center text-xl leading-none lg:text-[32px] !mt-5 lg:!mt-10 leading-0">
        Everything you need to manage your purchases and warranties in one place
      </p>
      <div className="p-6 space-y-8">
        {/* Top Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 lg:mt-28">
          {/* Active Warranties */}
          <div className="p-6 rounded-xl bg-gradient-to-b from-[#DCFCE7] to-[#F0FDF4] shadow cursor-pointer">
            <h2 className="text-[#3FAD69]  text-2xl flex items-center justify-between gap-2  font-bold rubik ">
              Active Warranties
              <span className="text-green-900 text-xl">
                <BsPatchQuestion />
              </span>
            </h2>
            <p className="text-3xl font-bold mt-2 text-green-900 rubik">24</p>
            <p className="text-lg mt-1 text-green-700 rubik">
              3 expiring this month
            </p>
          </div>

          {/* Reminders */}
          <div className="p-6 rounded-xl  bg-gradient-to-b from-[#FFF7EC] to-[#FFEED6] cursor-pointer shadow">
            <h2 className="text-[#EA580C] text-2xl flex items-center justify-between gap-2  font-bold rubik">
              Reminders
              <span className="text-[#EA580C] text-xl">
                <FaClock />
              </span>
            </h2>
            <p className="text-3xl font-bold mt-2 text-[#EA580C]">4</p>
            <p className="text-sm mt-1 text-[#EA580C] rubik">
              Next: iPhone warranty expires
            </p>
          </div>

          {/* Total Purchase */}
          <div className="p-6 rounded-xl  bg-gradient-to-b from-[#FFF7EC] to-[#FFEED6] cursor-pointer shadow">
            <h2 className="text-[#2563EB] text-2xl flex items-center justify-between gap-2  font-bold rubik">
              Total Purchase
              <span className="text-[#2563EB] text-xl">
                <BsPatchQuestion />
              </span>
            </h2>
            <p className="text-xl font-bold mt-2 text-[#2563EB]">24</p>
            <p className="text-sm mt-1 text-blue-600 rubik">
              3 expiring this month
            </p>
          </div>

          {/* Total Value */}
          <div className="p-6 rounded-xl bg-gradient-to-b from-[#E9EBF8] to-[#F3E8FF] cursor-pointer shadow">
            <h2 className="text-[#9333EA] text-2xl flex items-center justify-between gap-2  font-bold rubik">
              Total Value
              <span className="text-[#9333EA] text-xl">
                <BsPatchQuestion />
              </span>
            </h2>
            <p className="text-xl font-bold mt-2 text-[#9333EA] rubik">26</p>
            <p className="text-sm mt-1 text-[#9333EA] rubik">
              3 expiring this month
            </p>
          </div>
        </div>

        {/* Welcome Message */}
        <div className="container mx-auto w-full flex  items-center justify-center mt-20  lg:!mt-32 ">
          <div>
            <img src={dashboard} alt="" className="w-full h-full" />
          </div>
        </div>

        {/* Table */}
      </div>
    </div>
  );
};

export default CompletePurchase;
