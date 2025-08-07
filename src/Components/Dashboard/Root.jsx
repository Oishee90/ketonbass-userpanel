import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserDashboard from "./UserLayout/UserDashboard";
import UserSidebar from "./Sidebar/UserSidebar";
import Header from "./Header";
import TrackTabInteraction from "../Pages/TrackTabInteraction";

const Root = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Desktop expand/collapse
  const [isOverlayOpen, setIsOverlayOpen] = useState(false); // Mobile overlay
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  // Detect screen resize
  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 1024;
      setIsDesktop(desktop);
      if (desktop) {
        setIsOverlayOpen(false);
        setIsSidebarOpen(true); // Desktop default expanded
      } else {
        setIsSidebarOpen(false); // Mobile default collapsed
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    if (isDesktop) {
      setIsSidebarOpen((prev) => !prev); // Desktop: expand/collapse
    } else {
      setIsOverlayOpen((prev) => !prev); // Mobile: overlay open/close
    }
  };

  const isDashboardRoot = location.pathname === "/dashboard";

  return (
    <div className="relative flex h-screen overflow-hidden bg-white dark:bg-white">
      {/* Overlay for mobile */}
      {!isDesktop && isOverlayOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-40"
          onClick={() => setIsOverlayOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`
          ${
            isDesktop ? "fixed" : "absolute"
          } top-0 left-0 h-full transition-all duration-300 z-30
          ${
            isDesktop
              ? isSidebarOpen
                ? "w-64"
                : "w-16"
              : isOverlayOpen
              ? "w-64"
              : "w-16"
          }
          bg-white dark:bg-white border-r border-gray-200 shadow
        `}
      >
        <UserSidebar
          isSidebarOpen={isDesktop ? isSidebarOpen : isOverlayOpen}
          toggleSidebar={toggleSidebar}
        />
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col h-screen transition-all duration-300 ${
          isDesktop ? (isSidebarOpen ? "ml-64" : "ml-16") : "ml-16"
        }`}
      >
        <Header toggleSidebar={toggleSidebar} />
        <TrackTabInteraction />
        <main className="flex-1 overflow-y-auto bg-white h-[calc(100vh-64px)]">
          {isDashboardRoot ? <UserDashboard /> : <Outlet />}
        </main>
      </div>
    </div>
  );
};

export default Root;
