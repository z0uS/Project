import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "../../api/axiosClient";

const BookAppointment = () => {
  const { user } = useContext(AuthContext);
  const [specialties, setSpecialties] = useState([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [calendarData, setCalendarData] = useState([]);
  const [services, setServices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [bookingInfo, setBookingInfo] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]); 
  const [note, setNote] = useState("");
  const [message, setMessage] = useState("");

  // Load chuyên khoa & dịch vụ
  useEffect(() => {
    axios.get("/specialties").then(res => setSpecialties(res.data));
    axios.get("/services").then(res => setServices(res.data));
  }, []);

  // Load lịch tổng hợp khi chọn chuyên khoa và ngày
  useEffect(() => {
    if (selectedSpecialty && date) {
      axios.get(`/available-schedules?specialtyId=${selectedSpecialty}&date=${date}`)
        .then(res => setCalendarData(res.data));
    } else {
      setCalendarData([]);
    }
  }, [selectedSpecialty, date]);

  // Mở modal đặt lịch
  const openBookingModal = (doctor, shift) => {
    setBookingInfo({ doctor, shift });
    setShowModal(true);
    setSelectedServices([]);
    setNote("");
    setMessage("");
  };

  // Xác nhận đặt lịch
  const handleBook = async () => {
    try {
      // user.id là id trong bảng users với role='patient'
      if (!user?.id || !bookingInfo?.doctor?.doctorId || !bookingInfo?.shift?.scheduleId) {
        setMessage("Thiếu dữ liệu! Đăng nhập lại hoặc kiểm tra tài khoản.");
        return;
      }

      await axios.post("/appointments", {
        patientId: user.id, // SỬ DỤNG user.id (User PK)
        doctorId: bookingInfo.doctor.doctorId,
        scheduleId: bookingInfo.shift.scheduleId,
        date,
        shiftId: bookingInfo.shift.shiftId,
        serviceIds: selectedServices,
        note,
      });

      setMessage("Đặt lịch thành công!");
      setShowModal(false);
      axios.get(`/available-schedules?specialtyId=${selectedSpecialty}&date=${date}`)
        .then(res => setCalendarData(res.data));
    } catch (err) {
      setMessage(err?.response?.data?.message || "Lỗi đặt lịch!");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-5">Đặt lịch khám bệnh</h2>
      <div className="flex items-center gap-4 mb-6">
        <select
          className="border px-3 py-2 rounded"
          value={selectedSpecialty}
          onChange={e => setSelectedSpecialty(e.target.value)}
        >
          <option value="">Chọn chuyên khoa</option>
          {specialties.map(sp => (
            <option key={sp.id} value={sp.id}>{sp.name}</option>
          ))}
        </select>
        <input
          type="date"
          className="border px-3 py-2 rounded"
          value={date}
          onChange={e => setDate(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto rounded-xl shadow bg-white">
        <table className="min-w-full text-center">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4">Bác sĩ</th>
              {calendarData[0]?.shifts.map(shift => (
                <th key={shift.shiftId} className="py-2 px-4">
                  {shift.shiftName}
                  <br />
                  <span className="text-xs text-gray-400">{shift.startTime} - {shift.endTime}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {calendarData.map((doc, idx) => (
              <tr key={doc.doctorId}>
                <td className="py-2 px-4 font-semibold text-blue-700">{doc.doctorName}</td>
                {doc.shifts.map(shift => (
                  <td key={shift.shiftId} className="py-2 px-4">
                    {shift.maxPatients > 0 ? (
                      shift.available ? (
                        <>
                          <span className="block text-green-600 font-bold">Còn {shift.maxPatients - shift.currentBooked}/{shift.maxPatients}</span>
                          <button
                            className="mt-1 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-800 text-sm"
                            onClick={() => openBookingModal(doc, { ...shift, scheduleId: shift.scheduleId })}
                          >
                            Đặt lịch
                          </button>
                        </>
                      ) : (
                        <span className="text-red-500 font-bold">Full</span>
                      )
                    ) : (
                      <span className="text-gray-400">Không làm</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
            {calendarData.length === 0 && (
              <tr>
                <td colSpan={10} className="py-4 text-center text-gray-400">Chưa có lịch làm việc</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal đặt lịch */}
      {showModal && bookingInfo && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-xl min-w-[350px]">
            <h3 className="text-xl font-bold mb-3">Xác nhận đặt lịch</h3>
            <div className="mb-3">
              <div>Bác sĩ: <span className="font-semibold">{bookingInfo.doctor.doctorName}</span></div>
              <div>Ca: <span className="font-semibold">{bookingInfo.shift.shiftName} ({bookingInfo.shift.startTime} - {bookingInfo.shift.endTime})</span></div>
              <div>Ngày: <span className="font-semibold">{date}</span></div>
            </div>
            <div className="mb-2">
              <label>Dịch vụ khám:</label>
              <select multiple className="border w-full px-2 py-1 rounded mt-1"
                value={selectedServices}
                onChange={e => setSelectedServices(Array.from(e.target.selectedOptions, o => +o.value))}
              >
                {services.map(sv => (
                  <option key={sv.id} value={sv.id}>{sv.name}</option>
                ))}
              </select>
            </div>
            <div className="mb-2">
              <label>Ghi chú/Lý do khám:</label>
              <input
                type="text"
                className="border w-full px-2 py-1 rounded mt-1"
                value={note}
                onChange={e => setNote(e.target.value)}
              />
            </div>
            {message && <div className="mb-2 text-red-500">{message}</div>}
            <div className="flex gap-2 justify-end pt-2">
              <button
                className="px-4 py-2 border rounded"
                onClick={() => setShowModal(false)}
              >Đóng</button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded"
                onClick={handleBook}
              >Xác nhận</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookAppointment;
