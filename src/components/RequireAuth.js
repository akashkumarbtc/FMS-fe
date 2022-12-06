import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
    // const { auth } = useAuth();

    // const auth = { roles: ["accounts"], user:"string" };
  const location = useLocation();
  const data = localStorage.getItem("auth");
  const auth = JSON.parse(data);

  return auth.roles.find((role) => allowedRoles.includes(role)) ? (
    <Outlet />
  ) : auth.user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
