
import { Navigate } from "react-router-dom";
import GoogleLoginSuccess from "../Components/Pages/GoogleLoginSuccess";

export default function GoogleLoginSuccessRoute() {
  const provider = localStorage.getItem("loginProvider");
  if (provider !== "google") {
    return <Navigate to="/login" replace />;
  }
  return <GoogleLoginSuccess />;
}

