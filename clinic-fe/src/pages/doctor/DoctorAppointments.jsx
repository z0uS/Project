import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "../../api/axiosClient";
import { Link } from "react-router-dom";

// Map trạng thái sang tiếng Việt và màu sắc
const STATUS_MAP = {
  pending: { label: "Chờ xác nhận", color: "bg-yellow-100 text-yellow-700 border-yellow-300" },
  confirmed: { label: "Đã xác nhận", color: "bg-blue-100 text-blue-700 border-blue-300" },
  done: { label: "Hoàn thành", color: "bg-green-100 text-green-700 border-green-300" },
  cancelled: { label: "Đã hủy", color: "bg-red-100 text-red-700 border-red-300" },
};

const DoctorAppointments = () => {
  const { user } = useContext(AuthContext);
  const [doctor, setDoctor] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        if (!user) return;
        const res = await axios.get("/doctors/me");
        setDoctor(res.data);
      } catch (err) {
        setError("Không thể tải thông tin bác sĩ!");
        setLoading(false);
      }
    };
    fetchDoctor();
  }, [user]);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!doctor) return;
      try {
        const res = await axios.get(`/appointments/doctor/${doctor.id}`);
        setAppointments(res.data);
      } catch (err) {
        setError(
          err?.response?.data?.message || "Lỗi khi tải danh sách lịch hẹn!"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, [doctor]);

  if (loading) return <div className="text-center pt-32 text-lg text-blue-600">Đang tải lịch hẹn...</div>;
  if (error) return <div className="text-center pt-32 text-red-600">{error}</div>;

  return (
    <div className="min-h-[50vh] w-full py-8 px-2 bg-gradient-to-tr from-blue-50 via-green-50 to-yellow-50">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6">
        <h2 className="text-2xl font-bold mb-6 text-blue-900 text-center tracking-wide drop-shadow">
          Lịch hẹn của tôi
        </h2>
        {appointments.length === 0 ? (
          <p className="text-gray-600 text-center py-8">Không có lịch hẹn nào.</p>
        ) : (
          <ul className="space-y-5">
            {appointments.map((app) => {
              const statusObj = STATUS_MAP[app.status] || { label: app.status, color: "" };
              return (
                <li
                  key={app.id}
                  className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b pb-4 gap-2"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-lg text-blue-800">
                        {app.patient?.fullName || "Bệnh nhân không rõ"}
                      </span>
                      <span className={`ml-2 px-3 py-1 rounded-full border text-xs font-semibold ${statusObj.color}`}>
                        {statusObj.label}
                      </span>
                    </div>
                    <div className="text-gray-700">
                      Ngày: <span className="font-medium">{new Date(app.date).toLocaleDateString()}</span>
                      {" | "}
                      Ca: <span className="font-medium">{app.shift?.name || "?"}</span>
                      {" "}
                      ({app.shift?.startTime?.slice(0,5)} - {app.shift?.endTime?.slice(0,5)})
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      to={`/doctor/appointments/${app.id}`}
                      className="text-white bg-blue-600 hover:bg-blue-700 rounded px-4 py-2 text-sm shadow transition"
                    >
                      Xem chi tiết
                    </Link>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DoctorAppointments;
