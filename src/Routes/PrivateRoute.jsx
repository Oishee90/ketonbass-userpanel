/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export function PrivateRoute({ children }) {
  const accessToken = useSelector((state) => state.auth?.accessToken);
  const refreshToken = useSelector((state) => state.auth?.refreshToken);
  const location = useLocation();

  if (!accessToken || !refreshToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
