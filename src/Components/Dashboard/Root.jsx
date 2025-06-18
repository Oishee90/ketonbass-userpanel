import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import getRole from "../../utils/role";
import AdminDashboard from "./AdminLayout/AdminDashboard";
import UserDashboard from "./UserLayout/UserDashboard";
import AdminSidebar from "./Sidebar/AdminSidebar";
import UserSidebar from "./Sidebar/UserSidebar";
import Header from "./Header";

const Root = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const verify_email = getRole();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Redirect to login if no role is found
  useEffect(() => {
    if (!verify_email) {
      navigate("/login");
    }
  }, [verify_email, navigate]);

  // Collapse sidebar on smaller screens
  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  if (verify_email === null) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  const renderDefaultDashboard = () => {
    switch (verify_email) {
    
      case true:
        return <UserDashboard />;
      default:
        return <div>Unauthorized or invalid role</div>;
    }
  };

  const isDashboardRoot = location.pathname === "/dashboard";

  return (
    <div className="flex h-screen overflow-hidden bg-white dark:bg-white">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-16"
        } fixed left-0 top-0 h-screen transition-all duration-300`}
      >
     
        {verify_email === true && (
          <UserSidebar
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
          />
        )}
      </div>

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col h-screen transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-16"
        }`}
      >
        {/* Header */}
        <Header />

        {/* Main Scrollable Area */}
<main className="flex-1 overflow-y-auto bg-white dark:bg-white h-[calc(100vh-64px)]">

          {isDashboardRoot ? renderDefaultDashboard() : <Outlet />}
        </main>
      </div>
    </div>
  );
};

export default Root;
