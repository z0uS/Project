import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FaUserCircle,
  FaCalendarCheck,
  FaFileMedical,
  FaUserEdit,
  FaChevronRight,
  FaPlusCircle,
  FaStethoscope,
  FaComments,
  FaBell,
  FaCheckCircle,
} from "react-icons/fa";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

// Dummy data
const mockStats = [
  {
    icon: <FaCalendarCheck className="text-blue-500 text-3xl" />,
    label: "Lịch hẹn sắp tới",
    value: 1,
    color: "bg-blue-50",
  },
  {
    icon: <FaFileMedical className="text-green-500 text-3xl" />,
    label: "Lịch sử khám",
    value: 3,
    color: "bg-green-50",
  },
];

const mockAppointments = [
  {
    id: "A12345",
    date: "2025-06-12",
    time: "09:00",
    doctor: "BS. Nguyễn Văn A",
    status: "Đang chờ khám",
    department: "Nội tổng quát",
  },
  {
    id: "A12233",
    date: "2025-05-29",
    time: "14:30",
    doctor: "BS. Trần Thị B",
    status: "Đã hoàn thành",
    department: "Tim mạch",
  },
];

const historyData = [
  { month: "1/25", visits: 1 },
  { month: "2/25", visits: 2 },
  { month: "3/25", visits: 2 },
  { month: "4/25", visits: 3 },
  { month: "5/25", visits: 1 },
  { month: "6/25", visits: 0 },
];

const feedbacks = [
  {
    name: "Nguyễn Thị Hoa",
    doctor: "BS. Nguyễn Văn A",
    date: "29/05/2025",
    content: "Bác sĩ tư vấn kỹ, phòng khám sạch sẽ, thủ tục nhanh gọn.",
    rating: 5,
  },
  {
    name: "Lê Văn B",
    doctor: "BS. Trần Thị B",
    date: "10/05/2025",
    content: "Rất hài lòng, nhân viên nhiệt tình, sẽ giới thiệu cho bạn bè.",
    rating: 4,
  },
];

const notifications = [
  {
    content: "Bạn có lịch khám với BS. Nguyễn Văn A vào 09:00 12/06/2025.",
    time: "1 ngày trước",
    type: "appointment",
  },
  {
    content: "Cập nhật: Dịch vụ xét nghiệm giảm 10% tháng 6.",
    time: "2 ngày trước",
    type: "promotion",
  },
  {
    content: "Đơn thuốc mới đã được thêm vào hồ sơ của bạn.",
    time: "5 ngày trước",
    type: "medical",
  },
];

const mockHistory = [
  {
    id: "KH123",
    date: "29/05/2025",
    doctor: "BS. Trần Thị B",
    department: "Tim mạch",
    result: "Đã khám",
    prescription: true,
  },
  {
    id: "KH122",
    date: "03/03/2025",
    doctor: "BS. Nguyễn Văn A",
    department: "Nội tổng quát",
    result: "Đã khám",
    prescription: false,
  },
];

const PatientDashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  let payload = null;
  if (token) {
    try {
      payload = JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      payload = null;
    }
  }
  useEffect(() => {
    if (!token || !payload) navigate("/login");
  }, [token, payload, navigate]);
  if (!token || !payload) return null;

  // Lấy info profile
  const fullName = payload?.fullName || "Bệnh nhân";
  const email = payload?.email || "";

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-blue-100 min-h-screen py-10 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Tiêu đề + Profile card */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-blue-800 mb-1">
              Xin chào, {fullName}!
            </h1>
            <div className="flex items-center text-gray-500 mb-2">
              <FaUserCircle className="mr-2" />
              {email}
            </div>
          </div>
          <Link
  to="/"
  className="flex items-center gap-2 bg-white border border-blue-100 shadow px-5 py-2 rounded-xl text-blue-600 font-bold hover:bg-blue-50 hover:text-blue-800 transition"
>
  <FaChevronRight />
  Trang chủ
</Link>

        </div>

        {/* Block số liệu */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          {mockStats.map((s) => (
            <div
              key={s.label}
              className={`flex items-center gap-5 ${s.color} p-7 rounded-2xl shadow-md border-t-4 border-blue-200`}
            >
              <div>{s.icon}</div>
              <div>
                <div className="text-3xl font-extrabold text-blue-700">{s.value}</div>
                <div className="text-base text-gray-600">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Biểu đồ lịch sử khám */}
        <div className="bg-white rounded-2xl shadow-xl border-t-4 border-blue-200 p-8 mb-10">
          <h2 className="font-bold text-lg text-blue-700 mb-4 flex items-center gap-2">
            <FaStethoscope /> Thống kê lịch sử khám
          </h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={historyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="visits" fill="#3B82F6" radius={[8,8,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Bảng lịch hẹn sắp tới */}
        <div className="bg-white rounded-2xl shadow-xl border-t-4 border-blue-200 p-8 mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-bold text-lg text-blue-700">Lịch hẹn của bạn</h2>
            <Link
              to="/patient/book-appointment"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition"
            >
              <FaPlusCircle /> Đặt lịch mới
            </Link>
          </div>
          {mockAppointments.length === 0 ? (
            <p className="text-gray-500 text-center">Bạn chưa có lịch hẹn nào.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="bg-blue-50">
                    <th className="p-3 text-left font-bold text-gray-700">Mã lịch</th>
                    <th className="p-3 text-left font-bold text-gray-700">Ngày</th>
                    <th className="p-3 text-left font-bold text-gray-700">Giờ</th>
                    <th className="p-3 text-left font-bold text-gray-700">Bác sĩ</th>
                    <th className="p-3 text-left font-bold text-gray-700">Chuyên khoa</th>
                    <th className="p-3 text-left font-bold text-gray-700">Trạng thái</th>
                    <th className="p-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {mockAppointments.map((appt) => (
                    <tr
                      key={appt.id}
                      className="border-b hover:bg-blue-50 transition"
                    >
                      <td className="p-3">{appt.id}</td>
                      <td className="p-3">{appt.date}</td>
                      <td className="p-3">{appt.time}</td>
                      <td className="p-3">{appt.doctor}</td>
                      <td className="p-3">{appt.department}</td>
                      <td className="p-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            appt.status === "Đang chờ khám"
                              ? "bg-yellow-100 text-yellow-700"
                              : appt.status === "Đã hoàn thành"
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {appt.status}
                        </span>
                      </td>
                      <td className="p-3">
                        <Link
                          to={`/patient/appointments/${appt.id}`}
                          className="flex items-center gap-1 text-blue-600 hover:underline font-semibold"
                        >
                          Chi tiết <FaChevronRight />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Lịch sử khám bệnh */}
        <div className="bg-white rounded-2xl shadow-xl border-t-4 border-green-200 p-8 mb-10">
          <h2 className="font-bold text-lg text-green-700 mb-4 flex items-center gap-2">
            <FaFileMedical /> Lịch sử khám bệnh
          </h2>
          {mockHistory.length === 0 ? (
            <p className="text-gray-500">Bạn chưa có lịch sử khám bệnh.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {mockHistory.map((item) => (
                <div
                  key={item.id}
                  className="bg-green-50 border border-green-100 rounded-2xl p-5 flex flex-col shadow hover:shadow-lg transition"
                >
                  <div className="flex items-center gap-2 mb-2 text-base text-green-800 font-bold">
                    <FaCheckCircle className="text-green-500" />
                    {item.result}
                  </div>
                  <div className="flex items-center mb-1">
                    <span className="text-gray-700 font-semibold w-24">Mã:</span>
                    <span>{item.id}</span>
                  </div>
                  <div className="flex items-center mb-1">
                    <span className="text-gray-700 font-semibold w-24">Ngày khám:</span>
                    <span>{item.date}</span>
                  </div>
                  <div className="flex items-center mb-1">
                    <span className="text-gray-700 font-semibold w-24">Bác sĩ:</span>
                    <span>{item.doctor}</span>
                  </div>
                  <div className="flex items-center mb-1">
                    <span className="text-gray-700 font-semibold w-24">Chuyên khoa:</span>
                    <span>{item.department}</span>
                  </div>
                  <div className="mt-2">
                    {item.prescription ? (
                      <span className="inline-block px-3 py-1 text-xs font-bold bg-blue-100 text-blue-700 rounded-full">
                        Có đơn thuốc
                      </span>
                    ) : (
                      <span className="inline-block px-3 py-1 text-xs font-bold bg-gray-100 text-gray-500 rounded-full">
                        Không có đơn thuốc
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Feedback/Đánh giá */}
        <div className="bg-white rounded-2xl shadow-xl border-t-4 border-blue-200 p-8 mb-10">
          <h2 className="font-bold text-lg text-blue-700 mb-4 flex items-center gap-2">
            <FaComments /> Phản hồi của bạn
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {feedbacks.map((f, idx) => (
              <div
                key={idx}
                className="bg-blue-50 border border-blue-100 rounded-2xl p-5 flex flex-col shadow hover:shadow-lg transition"
              >
                <div className="flex items-center mb-2">
                  <span className="text-blue-700 font-bold mr-2">{f.name}</span>
                  <span className="bg-blue-100 text-blue-700 rounded-full px-3 py-1 text-xs ml-auto">
                    {f.date}
                  </span>
                </div>
                <div className="text-gray-700 mb-2 italic">
                  {f.content}
                </div>
                <div className="flex items-center text-sm gap-1">
                  <span className="text-blue-600">Bác sĩ:</span> {f.doctor}
                  <span className="ml-3 text-yellow-400">{'★'.repeat(f.rating)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Thông báo mới nhất */}
        <div className="bg-white rounded-2xl shadow-xl border-t-4 border-blue-200 p-8 mb-4">
          <h2 className="font-bold text-lg text-blue-700 mb-4 flex items-center gap-2">
            <FaBell /> Thông báo mới nhất
          </h2>
          <ul className="space-y-3">
            {notifications.map((n, idx) => (
              <li
                key={idx}
                className="flex items-center gap-3 bg-blue-50 border border-blue-100 rounded-xl px-5 py-3 shadow hover:bg-blue-100 transition"
              >
                <span>
                  {n.type === "appointment" && <FaCalendarCheck className="text-blue-400" />}
                  {n.type === "promotion" && <FaFileMedical className="text-green-500" />}
                  {n.type === "medical" && <FaStethoscope className="text-pink-500" />}
                </span>
                <span className="flex-1 text-gray-800">{n.content}</span>
                <span className="text-xs text-gray-500">{n.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
