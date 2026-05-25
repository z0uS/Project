import React, { useEffect, useState } from "react";
import axios from "../../api/axiosClient";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Pie, PieChart, Cell, Tooltip } from "recharts";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const pieColors = ["#2563eb", "#f59e42", "#10b981", "#eab308", "#f43f5e", "#818cf8"];

const AdminDashboard = () => {
  // State tổng hợp
  const [stats, setStats] = useState({
    totalPatients: 0,
    totalDoctors: 0,
    totalAppointmentsToday: 0,
    totalRevenue: 0,
    recentPatients: [],
    recentAppointments: [],
    chartAppointments: [],
    chartSpecialties: [],
  });

  useEffect(() => {
    // Gọi API thật để lấy stats, recent, chart...
    const fetchData = async () => {
      try {
        const [statsRes, chartAppRes, chartSpecRes, recentPatRes, recentAppRes] = await Promise.all([
          axios.get("/admin/dashboard-stats"),
          axios.get("/admin/appointments-chart"),  // 7 ngày gần nhất
          axios.get("/admin/specialties-chart"),   // Tỷ lệ chuyên khoa
          axios.get("/admin/recent-patients"),
          axios.get("/admin/recent-appointments"),
        ]);
        setStats({
          ...statsRes.data,
          chartAppointments: chartAppRes.data,
          chartSpecialties: chartSpecRes.data,
          recentPatients: recentPatRes.data,
          recentAppointments: recentAppRes.data,
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  // Dữ liệu fake nếu backend chưa trả về
  const chartAppointments = stats.chartAppointments.length
    ? stats.chartAppointments
    : [
      { date: "T2", count: 12 },
      { date: "T3", count: 16 },
      { date: "T4", count: 9 },
      { date: "T5", count: 13 },
      { date: "T6", count: 17 },
      { date: "T7", count: 7 },
      { date: "CN", count: 11 },
    ];

  const chartSpecialties = stats.chartSpecialties.length
    ? stats.chartSpecialties
    : [
      { name: "Nội", value: 40 },
      { name: "Nhi", value: 20 },
      { name: "Răng", value: 10 },
      { name: "Mắt", value: 15 },
      { name: "Da liễu", value: 15 },
    ];

  const recentPatients = stats.recentPatients.length
    ? stats.recentPatients
    : [
      { id: 1, fullName: "Nguyễn Văn A", createdAt: "2025-06-10" },
      { id: 2, fullName: "Trần Thị B", createdAt: "2025-06-09" },
    ];
  const recentAppointments = stats.recentAppointments.length
    ? stats.recentAppointments
    : [
      { id: 1, patient: "Nguyễn Văn A", doctor: "Bs. Sơn", time: "2025-06-11 10:00" },
      { id: 2, patient: "Trần Thị B", doctor: "Bs. Hồng", time: "2025-06-11 14:30" },
    ];

  return (
    <div className="space-y-10 max-w-7xl mx-auto px-2">
      {/* Welcome */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h2 className="text-4xl font-black text-blue-800 mb-2 drop-shadow tracking-tight">Chào mừng, Admin!</h2>
          <div className="text-gray-600 text-lg font-medium">
            Bạn đang quản trị hệ thống đặt lịch <span className="text-blue-600 font-bold">Phòng khám 24/7</span>.
          </div>
        </div>
        <div className="flex gap-2">
          <Link to="/" className="bg-gray-600 text-white rounded-xl px-5 py-2 font-bold shadow hover:bg-gray-700 transition flex items-center gap-2">
            <FaHome />
            Về trang chủ
          </Link>
          <Link to="/admin/manage-schedules" state={{ openModal: true }} className="bg-blue-600 text-white rounded-xl px-5 py-2 font-bold shadow hover:bg-blue-700 transition flex items-center gap-2">
            + Tạo lịch hẹn mới
          </Link>
          <Link to="/admin/manage-patients" state={{ openModal: true }} className="bg-orange-500 text-white rounded-xl px-5 py-2 font-bold shadow hover:bg-orange-600 transition flex items-center gap-2">
            + Thêm bệnh nhân
          </Link>
          <Link to="/admin/notifications" state={{ openModal: true }} className="bg-green-500 text-white rounded-xl px-5 py-2 font-bold shadow hover:bg-green-600 transition flex items-center gap-2">
            Gửi thông báo
          </Link>
        </div>
      </div>

      {/* Card thống kê */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-3xl shadow-xl p-8 text-center border-2 border-blue-100">
          <div className="text-5xl font-black text-white drop-shadow-lg mb-2">{stats.totalPatients}</div>
          <div className="text-lg font-bold text-white opacity-90">Bệnh nhân</div>
        </div>
        <div className="bg-gradient-to-br from-orange-400 to-orange-500 rounded-3xl shadow-xl p-8 text-center border-2 border-orange-100">
          <div className="text-5xl font-black text-white drop-shadow-lg mb-2">{stats.totalDoctors}</div>
          <div className="text-lg font-bold text-white opacity-90">Bác sĩ</div>
        </div>
        <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-3xl shadow-xl p-8 text-center border-2 border-green-100">
          <div className="text-5xl font-black text-white drop-shadow-lg mb-2">{stats.totalAppointmentsToday}</div>
          <div className="text-lg font-bold text-white opacity-90">Lịch hẹn hôm nay</div>
        </div>
        <div className="bg-gradient-to-br from-pink-400 to-pink-600 rounded-3xl shadow-xl p-8 text-center border-2 border-pink-100">
          <div className="text-5xl font-black text-white drop-shadow-lg mb-2">{stats.totalRevenue || 0}</div>
          <div className="text-lg font-bold text-white opacity-90">Doanh thu</div>
        </div>
      </div>

      {/* Biểu đồ + Recent */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Chart appointments */}
        <div className="bg-white rounded-2xl shadow-lg p-5 col-span-2 flex flex-col justify-between">
          <div className="font-bold text-blue-700 mb-2">Lịch hẹn 7 ngày gần nhất</div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={chartAppointments}>
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <Bar dataKey="count" fill="#2563eb" radius={[8,8,0,0]} />
              <Tooltip />
            </BarChart>
          </ResponsiveContainer>
        </div>
        {/* Pie specialties */}
        <div className="bg-white rounded-2xl shadow-lg p-5 flex flex-col items-center justify-center">
          <div className="font-bold text-blue-700 mb-2">Tỷ lệ chuyên khoa</div>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={chartSpecialties}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                fill="#2563eb"
                label
              >
                {chartSpecialties.map((entry, idx) => (
                  <Cell key={`cell-${idx}`} fill={pieColors[idx % pieColors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Bệnh nhân mới */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="font-bold text-blue-700 mb-4">Bệnh nhân mới</div>
          <ul className="space-y-2">
            {recentPatients.map(p => (
              <li key={p.id} className="flex justify-between items-center border-b pb-1 last:border-b-0">
                <span className="font-medium text-gray-800">{p.fullName}</span>
                <span className="text-sm text-gray-400">{p.createdAt}</span>
              </li>
            ))}
          </ul>
        </div>
        {/* Lịch hẹn sắp tới */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="font-bold text-blue-700 mb-4">Lịch hẹn sắp tới</div>
          <ul className="space-y-2">
            {recentAppointments.map(app => (
              <li key={app.id} className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b pb-1 last:border-b-0">
                <div>
                  <span className="font-medium text-gray-800">{app.patient}</span>
                  <span className="ml-2 text-gray-500">- {app.doctor}</span>
                </div>
                <span className="text-sm text-gray-400">{app.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
