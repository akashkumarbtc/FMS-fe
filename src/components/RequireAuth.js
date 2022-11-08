import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  debugger;
  //   const { auth } = useAuth();
    const auth = { roles: ["accounts"], user:"string" };
  const location = useLocation();
  // const auth = localStorage.getItem("auth");

  return auth.roles.find((role) => allowedRoles.includes(role)) ? (
    <Outlet />
  ) : auth.user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
