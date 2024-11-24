import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRouter = ({ children }) => {
  const userId = localStorage.getItem("userId");
  console.log("USER ID: ", userId)
  if (!userId) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default PrivateRouter;
