// src/routes/ProtectedRoute.jsx
import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const ProtectedRoute = ({ role, children }) => {
  const { user, loading } = useContext(AuthContext);

  // Nếu đang loading (kiểm tra token), chờ
  if (loading) return <div>Loading...</div>;

  // Nếu chưa đăng nhập, chuyển về /login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Nếu role không khớp, chuyển về trang tương ứng
  if (user.role !== role) {
    switch (user.role) {
      case "patient":
        return <Navigate to="/patient" replace />;
      case "doctor":
        return <Navigate to="/doctor" replace />;
      case "admin":
        return <Navigate to="/admin" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  // Nếu đúng role, render children hoặc Outlet
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
