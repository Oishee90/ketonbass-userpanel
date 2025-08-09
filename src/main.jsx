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
import { Provider } from "react-redux";
import { persistor, store } from "./Redux/store";
import GoogleCallback from "./Components/Pages/GoogleCallback";
import { PersistGate } from "redux-persist/integration/react";
import GoogleLoginSuccess from "./Components/Pages/GoogleLoginSuccess";
import MicrosoftLoginSuccess from "./Components/Pages/MicrosoftLoginSuccess";
import { PrivateRoute } from "./Routes/PrivateRoute";
import GoogleLoginSuccessRoute from "./Routes/GoogleLoginSuccessRoute";
import MicrosoftLoginSuccessRoute from "./Routes/MicrosoftLoginSuccessRoute";

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
    path: "/success",
    element: <GoogleLoginSuccessRoute></GoogleLoginSuccessRoute>,
  },
  {
    path: "/successlogin",
    element: <MicrosoftLoginSuccessRoute></MicrosoftLoginSuccessRoute>,
  },
  {
    path: "/google/callback",
    element: <GoogleCallback></GoogleCallback>,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        {" "}
        <Root />{" "}
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <UserDashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "adminuser",
        element: (
          <PrivateRoute>
            {" "}
            <AdminUser />{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "purchase",
        element: (
          <PrivateRoute>
            {" "}
            <Purchase></Purchase>{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "warranties",
        element: (
          <PrivateRoute>
            {" "}
            <Warranty></Warranty>{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "reminders",
        element: (
          <PrivateRoute>
            {" "}
            <CalendarDashboard></CalendarDashboard>{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "receipts",
        element: (
          <PrivateRoute>
            <Reciepts></Reciepts>{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "replacement",
        element: (
          <PrivateRoute>
            <Replacement></Replacement>{" "}
          </PrivateRoute>
        ),
      },
    ],
  },
]);

const client_id = clientId;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GoogleOAuthProvider clientId={client_id}>
          <RouterProvider router={router} />
        </GoogleOAuthProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);
