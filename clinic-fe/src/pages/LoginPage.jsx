import React, { useState, useContext } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import logoClinic from "../assets/clinic-login.png"; // Đổi đúng path logo bạn
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(email, password);
    if (res.success) {
      const token = localStorage.getItem("accessToken");
      const payload = token ? JSON.parse(atob(token.split(".")[1])) : null;
      const storedRole = payload?.role;
      if (storedRole === "patient") navigate("/patient");
      else if (storedRole === "doctor") navigate("/doctor");
      else if (storedRole === "admin") navigate("/admin");
      else navigate("/");
    } else {
      setError(res.message);
    }
  };


  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 to-white">
      {/* Form đăng nhập */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-4 md:px-8 py-8">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-blue-100 p-10 relative animate-fadeIn">
          {/* Logo brand + slogan nhỏ */}
          <div className="flex flex-col items-center mb-6">
            <img
              src={logoClinic}
              alt="Logo"
              className="w-14 h-14 rounded-full mb-2 shadow border border-blue-200 object-contain"
            />
            <span className="text-lg font-extrabold text-blue-800 tracking-tight">PHÒNG KHÁM ĐS</span>
            <span className="text-blue-400 text-xs mt-1">Chăm sóc tận tâm – Kết nối niềm tin sức khỏe</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-blue-700 text-center mb-6">
            Đăng nhập tài khoản
          </h2>
          {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-1">
                Email
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300 text-lg" />
                <input
                  type="email"
                  placeholder="example@email.com"
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition font-medium"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            {/* Mật khẩu */}
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-1">
                Mật khẩu
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300 text-lg" />
                <input
                  type={showPwd ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition font-medium"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-300 hover:text-blue-600 transition"
                  tabIndex={-1}
                >
                  {showPwd ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            {/* Check & Forgot */}
            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center gap-2 select-none">
                <input type="checkbox" className="rounded accent-blue-600" /> Ghi nhớ đăng nhập
              </label>
              <NavLink to="/forgot-password" className="text-blue-500 hover:underline">
                Quên mật khẩu?
              </NavLink>
            </div>
            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2.5 rounded-xl font-extrabold text-lg shadow-md hover:bg-blue-700 transition"
            >
              Đăng nhập
            </button>
          </form>
          <div className="text-center text-sm mt-6 text-gray-600">
            Chưa có tài khoản?
            <NavLink to="/register" className="text-blue-600 font-bold hover:underline ml-1">
              Đăng ký ngay
            </NavLink>
          </div>
        </div>
      </div>
      {/* Ảnh/banner bên phải */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-tr from-blue-100 via-white to-blue-200 p-8 items-center justify-center relative">
        <img
          src={logoClinic}
          alt="Đăng nhập"
          className="w-full max-w-lg object-contain drop-shadow-2xl rounded-3xl border border-blue-100 animate-fadeIn"
        />
      </div>
    </div>
  );
};

export default LoginPage;
