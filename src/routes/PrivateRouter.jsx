import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRouter = ({ children }) => {
  const userId = localStorage.getItem("userId");
  const hasOnboarded = sessionStorage.getItem("hasUserOnboarded");
  if (!userId) {
    return <Navigate to="/login" />;
  }
  else if(userId && !hasOnboarded){
    return <Navigate to="/login" />;
  }
  // else if(userId && hasOnboarded){
  //   return <Navigate to="/" />;
  // }
  return children;
};

export default PrivateRouter;
