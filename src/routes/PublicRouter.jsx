import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import PrivateRouter from "./PrivateRouter";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import Dashboard from "../pages/Dashboard";
import Slot from "../pages/Slot";
import Reservation from "../pages/Reservation";
import Customer from "../pages/Customer";
import Event from "../pages/Event";
import Profile from "../pages/Profile";
import Onboard from "../pages/Onboard";
import ResetPassword from "../pages/ResetPassword";

const PublicRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route
        path="/onboard"
        element={
          <PrivateRouter>
            <Onboard />
          </PrivateRouter>
        }
      />
      <Route
        path="/slots"
        element={
          <PrivateRouter>
            <Slot />
          </PrivateRouter>
        }
      />
      <Route
        path="/reservations"
        element={
          <PrivateRouter>
            <Reservation />
          </PrivateRouter>
        }
      />
      <Route
        path="/customers"
        element={
          <PrivateRouter>
            <Customer />
          </PrivateRouter>
        }
      />
      <Route
        path="/events"
        element={
          <PrivateRouter>
            <Event />
          </PrivateRouter>
        }
      />
      <Route
        path="/"
        element={
          <PrivateRouter>
            <Dashboard />
          </PrivateRouter>
        }
      />
      <Route
        path="/me"
        element={
          <PrivateRouter>
            <Profile />
          </PrivateRouter>
        }
      />
    </Routes>
  );
};

export default PublicRouter;
