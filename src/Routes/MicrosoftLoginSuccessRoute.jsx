import React from 'react';
import { Navigate } from 'react-router-dom';
import MicrosoftLoginSuccess from '../Components/Pages/MicrosoftLoginSuccess';

const MicrosoftLoginSuccessRoute = () => {
    const provider = localStorage.getItem("loginProvider");
  if (provider !== "microsoft") {
    return <Navigate to="/login" replace />;
  }
  return <MicrosoftLoginSuccess />;
}

export default MicrosoftLoginSuccessRoute;
