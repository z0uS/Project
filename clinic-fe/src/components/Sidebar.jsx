import React from "react";
import { NavLink, Link } from "react-router-dom";
import {
  FaUser,
  FaCalendarCheck,
  FaComments,
  FaFileMedical,
  FaStar,
  FaClipboardList,
  FaCog,
  FaBell,
  FaChartBar,
  FaHospitalUser,
  FaMoneyCheckAlt,
  FaReceipt,
  FaHome,
} from "react-icons/fa";

const ICONS = {
  "Dashboard": <FaChartBar />,
  "Hồ sơ của tôi": <FaUser />,
  "Đặt lịch khám": <FaCalendarCheck />,
  "Lịch hẹn của tôi": <FaClipboardList />,
  "Hồ sơ bệnh án": <FaFileMedical />,
  "Chat với bác sĩ": <FaComments />,
  "Đơn thuốc": <FaFileMedical />,
  "Đánh giá bác sĩ": <FaStar />,
  "Quản lý bác sĩ": <FaHospitalUser />,
  "Quản lý bệnh nhân": <FaUser />,
  "Quản lý chuyên khoa": <FaFileMedical />,
  "Quản lý dịch vụ": <FaClipboardList />,
  "Quản lý lịch làm việc": <FaCalendarCheck />,
  "Thông báo": <FaBell />,
  "Báo cáo": <FaChartBar />,
  "Cài đặt hệ thống": <FaCog />,
  "Chat với bệnh nhân": <FaComments />,
  "Đánh giá & Thống kê": <FaStar />,
  "Thanh toán": <FaMoneyCheckAlt />,
  "Quản lý hóa đơn": <FaReceipt />,
};

const Sidebar = ({ role }) => {
  let menuItems = [];
  if (role === "patient") {
    menuItems = [
      //{ label: "Dashboard", to: "/patient" },
      { label: "Hồ sơ của tôi", to: "/patient/profile" },
      { label: "Đặt lịch khám", to: "/patient/book-appointment" },
      { label: "Lịch hẹn của tôi", to: "/patient/appointments" },
      { label: "Hồ sơ bệnh án", to: "/patient/medical-records" },
      { label: "Chat với bác sĩ", to: "/patient/chat/:id" },
      { label: "Đơn thuốc", to: "/patient/prescriptions" },
      { label: "Đánh giá bác sĩ", to: "/patient/ratings" },
      { label: "Thanh toán", to: "/patient/payments" }, // Thêm trang thanh toán
    ];
  } else if (role === "doctor") {
    menuItems = [
      { label: "Dashboard", to: "/doctor" },
      { label: "Hồ sơ của tôi", to: "/doctor/profile" },
      { label: "Lịch làm việc", to: "/doctor/schedule" },
      { label: "Lịch hẹn", to: "/doctor/appointments" },
      { label: "Bệnh án", to: "/doctor/medical-records" },
      { label: "Chat với bệnh nhân", to: "/doctor/chat" },
      { label: "Đánh giá & Thống kê", to: "/doctor/ratings" },
    ];
  } else if (role === "admin") {
    menuItems = [
      //{ label: "Dashboard", to: "/admin" },
      { label: "Quản lý bác sĩ", to: "/admin/manage-doctors" },
      { label: "Quản lý bệnh nhân", to: "/admin/manage-patients" },
      { label: "Quản lý chuyên khoa", to: "/admin/manage-specialties" },
      { label: "Quản lý dịch vụ", to: "/admin/manage-services" },
      { label: "Quản lý lịch làm việc", to: "/admin/manage-schedules" },
      { label: "Thông báo", to: "/admin/notifications" },
      { label: "Báo cáo", to: "/admin/reports" },
      { label: "Quản lý hóa đơn", to: "/admin/payments" }, // Thêm trang quản lý hóa đơn
      { label: "Cài đặt hệ thống", to: "/admin/settings" },
    ];
  }

  return (
    <aside className="w-64 bg-white shadow-xl min-h-screen rounded-r-3xl border-r border-blue-50 flex flex-col justify-between">
      <div className="flex flex-col flex-grow">
        <Link
          to={role === "admin" ? "/admin" : role === "doctor" ? "/doctor" : "/patient"}
          className="block py-8 font-extrabold text-2xl text-center border-b bg-blue-50 text-blue-700 rounded-tr-3xl hover:bg-blue-100 transition"
        >
          {role === "patient"
            ? "Bệnh nhân"
            : role === "doctor"
            ? "Bác sĩ"
            : "Admin"}
        </Link>
        <nav className="flex flex-col mt-3 px-2 flex-grow overflow-y-auto max-h-[calc(100vh-220px)]">
          {menuItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 my-1 rounded-xl font-medium transition-all hover:bg-blue-50 hover:text-blue-700
                ${isActive ? "bg-blue-100 text-blue-700 shadow" : "text-gray-700"}`
              }
              end
            >
              <span className="text-base">{ICONS[item.label] || <FaCog />}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="p-4 border-t border-blue-50 bg-gray-50 rounded-br-3xl">
        <Link
          to="/"
          className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow hover:shadow-lg transition-all duration-200"
        >
          <FaHome className="text-lg" />
          <span>Về Trang Chủ</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
