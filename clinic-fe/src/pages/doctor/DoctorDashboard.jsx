import React, { useEffect, useState, useContext } from "react";
import axios from "../../api/axiosClient";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const DoctorDashboard = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({
    todayPatients: 0,
    prescriptionsCount: 0,
    upcomingAppointments: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("/doctors/me/dashboard");
        setStats(res.data);
      } catch (err) {
        console.error("Lỗi lấy thống kê:", err.response?.data || err.message);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Thống kê tổng quan</h2>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-gray-100 hover:bg-blue-50 text-blue-700 font-semibold rounded-lg border border-blue-100 transition"
        >
          Quay về trang chủ
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-100 border-l-4 border-blue-500 p-4 rounded shadow">
          <h3 className="text-xl font-semibold">Bệnh nhân hôm nay</h3>
          <p className="text-3xl mt-2">{stats.todayPatients}</p>
        </div>

        <div className="bg-green-100 border-l-4 border-green-500 p-4 rounded shadow">
          <h3 className="text-xl font-semibold">Đơn thuốc đã kê</h3>
          <p className="text-3xl mt-2">{stats.prescriptionsCount}</p>
        </div>

        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded shadow">
          <h3 className="text-xl font-semibold">Lịch hẹn sắp tới</h3>
          <p className="text-3xl mt-2">{stats.upcomingAppointments}</p>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
