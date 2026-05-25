import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { getAppointmentsByPatientApi, cancelAppointmentApi } from "../../api/appointments";
import axios from "../../api/axiosClient";

const statusText = {
  pending: "Chờ xác nhận",
  confirmed: "Đã xác nhận",
  done: "Đã hoàn thành",
  completed: "Đã hoàn tất",
  cancelled: "Đã hủy",
};

const statusColor = {
  pending: "text-yellow-500 border-yellow-300 bg-yellow-50",
  confirmed: "text-blue-600 border-blue-300 bg-blue-50",
  done: "text-green-600 border-green-300 bg-green-50",
  completed: "text-green-600 border-green-300 bg-green-50",
  cancelled: "text-red-500 border-red-300 bg-red-50",
};

const MyAppointments = () => {
  const { user } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [confirmCancelId, setConfirmCancelId] = useState(null);
  const [servicesMap, setServicesMap] = useState({});
  const [ratedIds, setRatedIds] = useState([]);

  const [showRating, setShowRating] = useState(false);
  const [ratingAppointmentId, setRatingAppointmentId] = useState(null);
  const [ratingDoctorName, setRatingDoctorName] = useState("");
  const [score, setScore] = useState(5);
  const [comment, setComment] = useState("");

  useEffect(() => {
    axios.get("/services")
      .then(res => {
        const map = {};
        res.data.forEach(sv => { map[sv.id] = sv.name; });
        setServicesMap(map);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      try {
        const res = await getAppointmentsByPatientApi(user.id);
        setAppointments(res.data);
      } catch (err) {
        setMessage("Không thể tải lịch hẹn.");
      } finally {
        setLoading(false);
      }
    };

    const fetchRated = async () => {
      try {
        const res = await axios.get(`/patients/${user.id}/ratings`);
        const ids = res.data.map(r => r.appointmentId);
        setRatedIds(ids);
      } catch (err) {
        console.error("Không thể tải đánh giá:", err);
      }
    };

    if (user?.id) {
      fetchAppointments();
      fetchRated();
    }
  }, [user]);

  const handleCancel = async (id) => {
    try {
      await cancelAppointmentApi(id);
      setAppointments((prev) =>
        prev.map((app) => (app.id === id ? { ...app, status: "cancelled" } : app))
      );
      setMessage("Đã hủy lịch hẹn thành công.");
    } catch (err) {
      setMessage("Không thể hủy lịch hẹn.");
    } finally {
      setConfirmCancelId(null);
    }
  };

  const renderServiceNames = (serviceIds) => {
    if (!serviceIds || !Array.isArray(serviceIds) || Object.keys(servicesMap).length === 0)
      return null;
    const names = serviceIds
      .map((id) => servicesMap[id])
      .filter(Boolean);
    return names.length ? names.join(", ") : null;
  };

  const handleOpenRating = (id, doctorName) => {
    setRatingAppointmentId(id);
    setRatingDoctorName(doctorName);
    setScore(5);
    setComment("");
    setShowRating(true);
  };

  const handleSubmitRating = async () => {
    try {
      await axios.post("/ratings", {
        appointmentId: ratingAppointmentId,
        score,
        comment
      });
      alert("Đánh giá thành công!");
      setRatedIds(prev => [...prev, ratingAppointmentId]);
      setShowRating(false);
    } catch (err) {
      alert(err?.response?.data?.message || "Lỗi khi gửi đánh giá.");
    }
  };

  useEffect(() => {
    if (message) {
      const t = setTimeout(() => setMessage(""), 4000);
      return () => clearTimeout(t);
    }
  }, [message]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-tr from-blue-100 via-purple-100 to-pink-100 py-10">
      <div className="max-w-4xl mx-auto bg-white/80 rounded-xl shadow p-6 backdrop-blur-sm border border-blue-200">
        <h2 className="text-3xl font-bold mb-2 text-center text-blue-800 drop-shadow">
          Lịch hẹn của tôi
        </h2>
        <div className="text-center text-lg font-semibold text-blue-700 mb-6">
          {user?.fullName && <>Bệnh nhân: <span className="font-bold">{user.fullName}</span></>}
        </div>
        {message && (
          <div className="mb-4 text-center text-base font-semibold text-blue-600">{message}</div>
        )}
        {loading ? (
          <p className="text-gray-400">Đang tải dữ liệu...</p>
        ) : appointments.length === 0 ? (
          <p className="text-gray-600">Chưa có lịch hẹn nào.</p>
        ) : (
          <ul className="space-y-4">
            {appointments.map((app) => (
              <li key={app.id} className="flex justify-between items-start border-b pb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-gray-800">
                      Bác sĩ: {app.doctor?.fullName || "?"}
                    </span>
                    <span className={`ml-2 text-xs px-2 py-1 rounded border ${statusColor[app.status] || "bg-gray-100 border-gray-300 text-gray-700"}`}>
                      {statusText[app.status] || app.status}
                    </span>
                  </div>
                  <p className="text-gray-600">
                    Ngày: {new Date(app.date).toLocaleDateString()} | Ca:{" "}
                    {app.shift?.name
                      ? `${app.shift.name} (${app.shift.startTime?.slice(0, 5)} - ${app.shift.endTime?.slice(0, 5)})`
                      : "?"}
                  </p>
                  {app.serviceIds && Array.isArray(app.serviceIds) && renderServiceNames(app.serviceIds) && (
                    <p className="text-xs text-gray-500 mt-1">
                      Dịch vụ: {renderServiceNames(app.serviceIds)}
                    </p>
                  )}
                  {app.note && <p className="text-xs text-gray-500 mt-1">Ghi chú: {app.note}</p>}

                  {/* Hiển thị nút đánh giá */}
                  {["done", "completed"].includes(app.status) &&
                    !ratedIds.includes(app.id) && (
                      <button
                        onClick={() => handleOpenRating(app.id, app.doctor?.fullName)}
                        className="mt-2 text-sm bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                      >
                        Đánh giá bác sĩ
                      </button>
                    )}
                </div>

                {/* Nút hủy lịch */}
                <div className="flex flex-col gap-2 items-end">
                  {app.status === "pending" && (
                    <>
                      <button
                        onClick={() => setConfirmCancelId(app.id)}
                        className="text-red-600 hover:underline text-sm"
                      >
                        Hủy
                      </button>
                      {confirmCancelId === app.id && (
                        <div className="bg-white p-3 rounded-lg shadow-xl border mt-2 flex flex-col items-center z-50">
                          <span className="text-sm mb-2">Bạn chắc chắn muốn hủy?</span>
                          <div className="flex gap-2">
                            <button
                              className="text-gray-700 px-3 py-1 border rounded"
                              onClick={() => setConfirmCancelId(null)}
                            >Không</button>
                            <button
                              className="text-red-600 px-3 py-1 border rounded"
                              onClick={() => handleCancel(app.id)}
                            >Hủy</button>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Popup đánh giá */}
      {showRating && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow max-w-md w-full">
            <h3 className="text-lg font-bold mb-2">Đánh giá bác sĩ {ratingDoctorName}</h3>
            <input
              type="number"
              min={1}
              max={5}
              value={score}
              onChange={(e) => setScore(Number(e.target.value))}
              className="w-full border p-2 rounded mb-3"
              placeholder="Điểm đánh giá (1-5)"
            />
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full border p-2 rounded mb-3"
              placeholder="Nhận xét"
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowRating(false)} className="px-4 py-1 rounded border">
                Hủy
              </button>
              <button onClick={handleSubmitRating} className="bg-blue-600 text-white px-4 py-1 rounded">
                Gửi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAppointments;
