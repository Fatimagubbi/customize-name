// src/pages/routes/ProtectedRoutes.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element, requiredRole = null }) => {
  // Function to get user role from sessionStorage
  const getRole = () => {
    try {
      const userStr = sessionStorage.getItem("user");
      if (userStr) {
        const user = JSON.parse(userStr);
        return user?.role || "USER";
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
    return null;
  };

  // Function to get user token
  const getToken = () => {
    try {
      const userStr = sessionStorage.getItem("user");
      if (userStr) {
        const user = JSON.parse(userStr);
        return user?.token || user?.accessToken;
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
    return null;
  };

  const role = getRole();
  const token = getToken();

  // If no token, redirect to login
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // If role is required, check authorization
  if (requiredRole) {
    const allowedRoles = Array.isArray(requiredRole)
      ? requiredRole
      : [requiredRole];

    if (!role || !allowedRoles.includes(role.toUpperCase())) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  // Render the protected element
  return element;
};

// Make sure this line exists at the end:
export default ProtectedRoute; // This is the default export
