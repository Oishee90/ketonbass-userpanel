import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux"; // Import useSelector
import AdminDashboard from "./AdminLayout/AdminDashboard"; // Example, can be removed if only one dashboard exists
import UserDashboard from "./UserLayout/UserDashboard";
import AdminSidebar from "./Sidebar/AdminSidebar"; // Example, can be removed if only one sidebar exists
import UserSidebar from "./Sidebar/UserSidebar";
import Header from "./Header";

const Root = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Retrieve user info from Redux persist
  const user = useSelector((state) => state.auth.user);

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

  // Redirect to login if no user is found
  useEffect(() => {
    if (!user) {
      navigate("/login"); // Navigate to login if no user is found
    }
  }, [user, navigate]);

  const isDashboardRoot = location.pathname === "/dashboard";

  return (
    <div className="flex h-screen overflow-hidden bg-white dark:bg-white">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-16"
        } fixed left-0 top-0 h-screen transition-all duration-300`}
      >
        {user && (
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
          {isDashboardRoot ? (
            user ? (
              <UserDashboard />
            ) : (
              <div>Unauthorized or invalid role</div> // If no user data, show error
            )
          ) : (
            <Outlet />
          )}
        </main>
      </div>
    </div>
  );
};

export default Root;
