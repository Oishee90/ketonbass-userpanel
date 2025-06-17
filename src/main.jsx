import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Components/Home/Home";
import SignUpPage from "./Components/Pages/Signup";
import getRole from "./utils/role";
import Root from "./Components/Dashboard/Root";
import AdminDashboard from "./Components/Dashboard/AdminLayout/AdminDashboard";
import UserDashboard from "./Components/Dashboard/UserLayout/UserDashboard";
import AdminUser from "./Components/Dashboard/AdminLayout/AdminUser";
const role = getRole();
console.log(role, "check mainjsx role ");
function DefaultDashboard() {
  const role = getRole();

  if (role === "admin") {
    return <AdminDashboard />;
  } else if (role === "user") {
    return <UserDashboard />;
  } else {
    return <div>Unauthorized Access</div>;
  }
}
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
  },
  {
    path: "/register",
    element: <SignUpPage></SignUpPage>,
  },
  {
    path: "/dashboard",
    element: <Root />,
    children: [
      {
        index: true,
        element: <DefaultDashboard />,
      },
       {
        path: "adminuser",
        element: (
      
            <AdminUser/>
      
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
