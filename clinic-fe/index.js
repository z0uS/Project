// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./contexts/AuthContext";
import "./index.css"; // nếu bạn có file CSS toàn cục

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* Bọc AuthProvider quanh toàn bộ App */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
