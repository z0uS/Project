import React, { useEffect, useState, useRef } from "react";
import {
  FaFacebookF,
  FaYoutube,
  FaTiktok,
  FaPhoneAlt,
  FaUser,
  FaChevronDown,
  FaUserCircle,
  FaNotesMedical,
  FaFileMedical,
  FaSignOutAlt,
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import logoClinic from "../assets/clinic-login.png";

// Giả định lấy user từ localStorage, hoặc thay bằng Context nếu dùng Context
const getUser = () => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) return null;
    const payload = JSON.parse(atob(token.split(".")[1]));
    return {
      fullName: payload.fullName || "Tài khoản",
      // ...các thông tin khác nếu có
    };
  } catch {
    return null;
  }
};

const MENU_ITEMS = [
  { label: "Trang chủ", to: "/" },
  { label: "Giới thiệu", to: "/about" },
  {
    label: "Đặt lịch",
    to: "#",
    items: [
      { label: "Đặt khám tại cơ sở", to: "/patient/book-appointment" },
      { label: "Đặt khám theo bác sĩ", to: "/patient/book-appointment" },
      { label: "Đặt khám theo chuyên khoa", to: "/patient/book-appointment" },
    ],
  },
  {
    label: "Bác sĩ & Chuyên khoa",
    to: "#",
    items: [
      { label: "Danh sách bác sĩ", to: "/doctors" },
      { label: "Danh sách chuyên khoa", to: "/specialties" },
    ],
  },
  {
    label: "Dịch vụ",
    to: "#",
    items: [
      { label: "Khám tổng quát", to: "/services" },
      { label: "Xét nghiệm", to: "/services" },
      { label: "Tiêm chủng", to: "/services" },
      { label: "Chăm sóc sức khỏe doanh nghiệp", to: "/services" },
    ],
  },
  { label: "Tin tức & Kiến thức", to: "/news" },
  { label: "Hướng dẫn", to: "/guide" },
  { label: "Liên hệ", to: "/contact" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [accountMenu, setAccountMenu] = useState(false);
  const navRef = useRef(null);
  const accountRef = useRef(null);
  const navigate = useNavigate();

  // Lấy user từ localStorage hoặc context
  const [user, setUser] = useState(getUser());

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        (navRef.current && !navRef.current.contains(e.target)) &&
        (accountRef.current && !accountRef.current.contains(e.target))
      ) {
        setOpenMenu(null);
        setAccountMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = (index) => {
    setOpenMenu((prev) => (prev === index ? null : index));
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
    setAccountMenu(false);
    navigate("/login");
  };

  return (
    <header className={`sticky top-0 z-50 w-full bg-white/95 backdrop-blur-lg transition-all duration-300 ${scrolled ? "shadow-xl" : "shadow"}`}>
      {/* Topbar */}
      <div className="bg-gradient-to-r from-blue-50 to-white border-b px-4 md:px-16 py-2 flex justify-between items-center text-xs md:text-sm text-gray-700">
        <div className="flex items-center space-x-6">
          <a href="https://www.tiktok.com" target="_blank" rel="noreferrer" className="flex items-center space-x-1 hover:text-blue-600 transition"><FaTiktok /><span>TikTok</span></a>
          <a href="https://www.facebook.com" target="_blank" rel="noreferrer" className="flex items-center space-x-1 hover:text-blue-600 transition"><FaFacebookF /><span>Facebook</span></a>
          <a href="https://www.youtube.com" target="_blank" rel="noreferrer" className="flex items-center space-x-1 hover:text-blue-600 transition"><FaYoutube /><span>YouTube</span></a>
        </div>
        <div className="flex items-center space-x-1 text-red-600 font-medium"><FaPhoneAlt /><span>Hỗ trợ: 1900 2115</span></div>
      </div>

      {/* Navbar chính */}
      <div ref={navRef} className="flex items-center justify-between px-4 md:px-16 py-4">
        {/* Logo + Slogan */}
        <div className="flex flex-col select-none">
          <NavLink to="/" className={`text-2xl md:text-3xl font-black tracking-tight transition-colors duration-300 group flex items-center gap-2 ${scrolled ? "text-blue-600" : "text-blue-700"}`}>
            <span className="inline-block h-10 w-10 bg-white rounded-2xl flex items-center justify-center mr-2 shadow-lg border border-blue-200 group-hover:rotate-12 transition-transform duration-300">
              <img src={logoClinic} alt="Logo" className="h-8 w-8 object-contain" />
            </span>
            Phòng Khám <span className="text-blue-500 group-hover:text-blue-600 transition">ĐS</span>
          </NavLink>
          <p className={`mt-1 text-xs italic font-medium slogan-text transition-all duration-500 ease-in ${scrolled ? "opacity-100 text-gray-600" : "opacity-90 text-blue-400 animate-pulse"}`}>Chăm sóc tận tâm – Kết nối niềm tin sức khỏe</p>
        </div>
        {/* Menu chính */}
        <nav className="hidden lg:flex lg:items-center lg:space-x-2 xl:space-x-4">
          {MENU_ITEMS.map((menu, idx) => (
            <div key={idx} className="relative group">
              {menu.items && menu.items.length > 0 ? (
                <>
                  <button
                    onClick={() => toggleMenu(idx)}
                    className={`flex items-center gap-1 px-4 py-2 text-gray-800 text-sm font-semibold rounded-2xl border border-transparent hover:bg-blue-50 hover:text-blue-600 hover:border-blue-100 transition-all ${openMenu === idx ? "bg-blue-50 text-blue-600 border-blue-200 shadow" : ""}`}
                  >
                    {menu.label}
                    <FaChevronDown className="ml-1 text-xs" />
                  </button>
                  {openMenu === idx && (
                    <ul className="absolute left-0 top-full mt-2 min-w-[220px] bg-white shadow-xl rounded-xl z-20 overflow-hidden animate-fadeIn border border-blue-50">
                      {menu.items.map((sub, subIdx) => (
                        <li key={subIdx}>
                          <NavLink
                            to={sub.to}
                            className="block px-5 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition"
                          >
                            {sub.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <NavLink
                  to={menu.to}
                  className={({ isActive }) =>
                    `px-4 py-2 text-gray-800 text-sm font-semibold rounded-2xl border border-transparent hover:bg-blue-50 hover:text-blue-600 hover:border-blue-100 transition-all ${isActive ? "bg-blue-50 text-blue-600 border-blue-200 shadow" : ""}`
                  }
                >
                  {menu.label}
                </NavLink>
              )}
            </div>
          ))}
        </nav>
        {/* Nút tài khoản */}
        <div className="flex items-center" ref={accountRef}>
          {!user ? (
            <NavLink
              to="/login"
              className="flex items-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 rounded-2xl font-bold bg-white hover:bg-blue-50 hover:border-blue-700 transition-all shadow-sm"
            >
              <FaUser className="text-blue-500" />
              <span className="hidden lg:inline-block">Đăng nhập</span>
            </NavLink>
          ) : (
            <div className="relative">
              <button
                className="flex items-center gap-2 px-4 py-2 border border-blue-600 text-blue-700 rounded-2xl font-bold bg-white hover:bg-blue-50 hover:border-blue-700 transition-all shadow-sm"
                onClick={() => setAccountMenu((v) => !v)}
              >
                <FaUserCircle className="text-blue-500 text-xl" />
                <span className="hidden md:inline">{user.fullName || "Tài khoản"}</span>
                <FaChevronDown className="ml-1 text-xs" />
              </button>
              {accountMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-blue-100 z-40 animate-fadeIn">
                  <NavLink
                    to="/patient/profile"
                    className="block px-5 py-3 hover:bg-blue-50 text-blue-700 font-semibold flex items-center gap-2"
                    onClick={() => setAccountMenu(false)}
                  >
                    <FaNotesMedical /> Hồ sơ bệnh nhân
                  </NavLink>
                  <NavLink
                    to="/patient/medical-records"
                    className="block px-5 py-3 hover:bg-blue-50 text-blue-700 font-semibold flex items-center gap-2"
                    onClick={() => setAccountMenu(false)}
                  >
                    <FaFileMedical /> Phiếu khám bệnh
                  </NavLink>
                  <button
                    className="w-full text-left px-5 py-3 hover:bg-red-50 text-red-600 font-semibold flex items-center gap-2 border-t"
                    onClick={handleLogout}
                  >
                    <FaSignOutAlt /> Đăng xuất
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
