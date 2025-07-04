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
import Purchase from "./Components/Dashboard/UserLayout/Purchase";
import Warranty from "./Components/Dashboard/UserLayout/Warranty";
import Reciepts from "./Components/Dashboard/UserLayout/Reciepts";
import Replacement from "./Components/Dashboard/UserLayout/Replacement";
import CalendarDashboard from "./Components/Dashboard/UserLayout/CalendarDashboard";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { clientId } from "./constants";
const verify_email = getRole();
console.log(verify_email, "check mainjsx role ");
function DefaultDashboard() {
  const verify_email = getRole();

  if (verify_email === true) {
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
    path: "/login",
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
        element: <AdminUser />,
      },
      {
        path: "purchase",
        element: <Purchase></Purchase>,
      },
      {
        path: "warranties",
        element: <Warranty></Warranty>,
      },
      {
        path: "reminders",
        element: <CalendarDashboard></CalendarDashboard>,
      },
      {
        path: "receipts",
        element: <Reciepts></Reciepts>,
      },
      {
        path: "replacement",
        element: <Replacement></Replacement>,
      },
    ],
  },
]);

const client_id = clientId;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={client_id}>
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </StrictMode>
);
