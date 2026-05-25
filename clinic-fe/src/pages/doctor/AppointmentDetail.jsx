import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/axiosClient";

const statusVN = {
  pending: "Chờ xác nhận",
  confirmed: "Đã xác nhận",
  done: "Hoàn thành",
  cancelled: "Đã hủy"
};

const AppointmentDetail = () => {
  const { id } = useParams();
  const [appointment, setAppointment] = useState(null);
  // Thêm các trường cho bệnh án
  const [symptoms, setSymptoms] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [notes, setNotes] = useState("");
  const [message, setMessage] = useState("");

  // Lấy chi tiết lịch hẹn
  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const res = await axios.get(`/appointments/${id}`);
        setAppointment(res.data);
      } catch (err) {
        setMessage("Không thể tải chi tiết lịch hẹn!");
      }
    };
    fetchAppointment();
  }, [id]);

  // Lấy bệnh án nếu đã tồn tại
  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const res = await axios.get(`/medical/appointment/${id}/record`);
        if (res.data) {
          setSymptoms(res.data.symptoms || "");
          setDiagnosis(res.data.diagnosis || "");
          setNotes(res.data.notes || "");
        }
      } catch (err) {
        // Không có bệnh án -> bỏ qua
      }
    };
    if (id) fetchRecord();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/medical/record`, {
        appointmentId: id,
        symptoms,
        diagnosis,
        notes,
      });
      setMessage("Lưu bệnh án thành công!");
    } catch (err) {
      setMessage("Có lỗi, vui lòng thử lại.");
    }
  };

  if (!appointment) return <div>Đang tải...</div>;

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Chi tiết lịch hẹn</h2>
      <p>
        <strong>Bệnh nhân:</strong>{" "}
        {appointment.patient?.fullName || appointment.patient?.email || "Không rõ"}
      </p>
      <p>
        <strong>Ngày:</strong>{" "}
        {appointment.schedule
          ? new Date(appointment.schedule.date).toLocaleDateString()
          : appointment.date}
      </p>
      <p>
        <strong>Giờ:</strong>{" "}
        {appointment.shift
          ? `${appointment.shift.name} (${appointment.shift.startTime} - ${appointment.shift.endTime})`
          : "Không rõ"}
      </p>
      <p>
        <strong>Trạng thái:</strong>{" "}
        {statusVN[appointment.status] || appointment.status}
      </p>
      <p>
        <strong>Ghi chú:</strong> {appointment.note || "Không có"}
      </p>
      <p>
        <strong>Dịch vụ khám:</strong>{" "}
        {appointment.services && appointment.services.length > 0
          ? appointment.services.map(sv => sv.name).join(", ")
          : "Không có"}
      </p>
      <hr className="my-4" />
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Triệu chứng
          </label>
          <textarea
            rows="2"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Chẩn đoán
          </label>
          <textarea
            rows="2"
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ghi chú bổ sung (khác)
          </label>
          <textarea
            rows="2"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
        {message && <p className="text-green-500">{message}</p>}
        <button
          type="submit"
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Lưu bệnh án
        </button>
      </form>
    </div>
  );
};

export default AppointmentDetail;
