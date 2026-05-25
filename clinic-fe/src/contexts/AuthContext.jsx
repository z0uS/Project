// src/contexts/AuthContext.jsx
import React, { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from '../api/axiosClient';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState("");
  const [loading, setLoading] = useState(true);

  // Hàm đăng nhập
  const login = async (email, password) => {
    try {
      const res = await axios.post("/auth/login", { email, password });
      const token = res.data.token;
      const decoded = jwtDecode(token);
      setAccessToken(token);
      setUser({ 
        id: decoded.id, 
        email: res.data.user?.email || "", 
        role: decoded.role 
      });
      localStorage.setItem("accessToken", token);
      return { success: true };
    } catch (err) {
      console.error(err);
      return {
        success: false,
        message: err.response?.data?.message || "Login thất bại",
      };
    }
  };

  // Hàm đăng xuất
  const logout = () => {
    setUser(null);
    setAccessToken("");
    localStorage.removeItem("accessToken");
  };

  // Khi load lại trang, kiểm tra token từ localStorage
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) {
          logout();
        } else {
          setAccessToken(token);
          setUser({ id: decoded.id, email: "", role: decoded.role });
        }
      } catch (err) {
        console.error("Token không hợp lệ", err);
        logout();
      }
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};
