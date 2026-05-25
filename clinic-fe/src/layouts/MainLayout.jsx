// src/layouts/MainLayout.jsx
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header ở trên cùng */}
      <Header />

      {/* Khối nội dung chính, Outlet sẽ render page tương ứng */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer ở dưới cùng */}
      <Footer />
    </div>
  );
};

export default MainLayout;
